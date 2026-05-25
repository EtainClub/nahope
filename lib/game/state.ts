"use client";

import { useReducer, useCallback, useEffect, useRef } from "react";
import { play as playSound } from "./sound";
import {
  ENDINGS,
  INITIAL_LOGS,
  INITIAL_SCENE,
  INTERACTIONS,
  MAX_TURNS,
  SCENES,
} from "./episode1";
import type {
  Action,
  EndingId,
  GameState,
  Interaction,
  ItemId,
  LogEntry,
  SceneId,
} from "./types";

const STORAGE_KEY = "hope-ep1-state";

function makeInitialState(): GameState {
  return {
    turn: 1,
    scene: INITIAL_SCENE,
    inventory: [],
    activeItem: null,
    flags: [],
    firedOnce: [],
    lostItems: [],
    logs: [...INITIAL_LOGS],
    endingId: null,
    visitedScenes: [INITIAL_SCENE],
  };
}

function hasAll(arr: string[], required?: string[]): boolean {
  if (!required || required.length === 0) return true;
  return required.every((r) => arr.includes(r));
}

function hasNone(arr: string[], forbidden?: string[]): boolean {
  if (!forbidden || forbidden.length === 0) return true;
  return forbidden.every((f) => !arr.includes(f));
}

function findRule(
  state: GameState,
  action: { kind: "INSPECT" | "USE"; scene: SceneId; hotspot: string; item?: ItemId | null },
): Interaction | null {
  for (const rule of INTERACTIONS) {
    if (rule.scene !== action.scene) continue;
    if (rule.hotspot !== action.hotspot) continue;
    if (rule.once && state.firedOnce.includes(rule.id)) continue;
    // USE actions only fire rules that explicitly require *this* item.
    // INSPECT actions only fire rules with no item requirement.
    // This is what stops "drawer is stuck" from firing when the player USE-s
    // an unrelated item — they correctly get "that doesn't fit" instead.
    const ruleItem = rule.requires?.item;
    if (action.kind === "USE") {
      if (ruleItem !== action.item) continue;
    } else {
      if (ruleItem !== undefined) continue;
    }
    if (!matchRequires(state, action, rule)) continue;
    return rule;
  }
  return null;
}

function matchRequires(
  state: GameState,
  action: { item?: ItemId | null },
  rule: Interaction,
): boolean {
  const r = rule.requires;
  if (!r) return true;
  if (r.item !== undefined && r.item !== action.item) return false;
  if (!hasAll(state.inventory as string[], r.has)) return false;
  if (!hasNone(state.inventory as string[], r.missing)) return false;
  if (r.flag) {
    if (r.flag.startsWith("!")) {
      if (state.flags.includes(r.flag.slice(1))) return false;
    } else if (!state.flags.includes(r.flag)) {
      return false;
    }
  }
  if (!hasAll(state.flags, r.flagsAll)) return false;
  if (!hasNone(state.flags, r.flagsNone)) return false;
  if (r.turnLte !== undefined && state.turn > r.turnLte) return false;
  if (r.turnGte !== undefined && state.turn < r.turnGte) return false;
  return true;
}

function applyRule(state: GameState, rule: Interaction): GameState {
  let inventory = [...state.inventory];
  const lost = [...state.lostItems];
  let flags = [...state.flags];

  if (rule.consumes) {
    inventory = inventory.filter((i) => !rule.consumes!.includes(i));
  }
  if (rule.destroys) {
    for (const d of rule.destroys) {
      inventory = inventory.filter((i) => i !== d);
      if (!lost.includes(d)) lost.push(d);
    }
  }
  if (rule.grants) {
    for (const g of rule.grants) {
      if (lost.includes(g)) continue; // can't re-grant a destroyed item
      if (!inventory.includes(g)) inventory.push(g);
    }
  }
  if (rule.setFlags) {
    for (const f of rule.setFlags) if (!flags.includes(f)) flags.push(f);
  }
  if (rule.clearFlags) {
    flags = flags.filter((f) => !rule.clearFlags!.includes(f));
  }

  const turnCost = rule.turnCost ?? 1;
  const nextTurn = Math.min(state.turn + turnCost, MAX_TURNS + 1);

  const log: LogEntry = { turn: nextTurn, ...rule.log };

  let activeItem = state.activeItem;
  if (activeItem && rule.consumes?.includes(activeItem)) activeItem = null;
  if (activeItem && rule.destroys?.includes(activeItem)) activeItem = null;

  let scene = state.scene;
  let visited = state.visitedScenes;
  if (rule.moveTo && SCENES[rule.moveTo]) {
    scene = rule.moveTo;
    if (!visited.includes(scene)) visited = [...visited, scene];
  }

  const firedOnce = rule.once ? [...state.firedOnce, rule.id] : state.firedOnce;

  // Determine ending (explicit or implicit time-out at TURN > MAX_TURNS).
  let endingId: EndingId | null = state.endingId;
  if (rule.triggersEnding) endingId = rule.triggersEnding;
  if (!endingId && nextTurn > MAX_TURNS) endingId = "A";

  return {
    ...state,
    turn: nextTurn,
    scene,
    inventory,
    activeItem,
    flags,
    firedOnce,
    lostItems: lost,
    logs: [...state.logs, log],
    endingId,
    visitedScenes: visited,
  };
}

function reducer(state: GameState, action: Action): GameState {
  if (state.endingId && action.kind !== "RESET") return state;

  switch (action.kind) {
    case "RESET":
      return makeInitialState();

    case "EQUIP":
      return { ...state, activeItem: action.item };

    case "INSPECT": {
      const rule = findRule(state, { kind: "INSPECT", scene: action.scene, hotspot: action.hotspot, item: null });
      if (!rule) {
        return {
          ...state,
          logs: [...state.logs, { turn: state.turn, role: "SYSTEM", text: "Nothing happens.", kind: "default" }],
        };
      }
      return applyRule(state, rule);
    }

    case "USE": {
      const rule = findRule(state, { kind: "USE", scene: action.scene, hotspot: action.hotspot, item: action.item });
      if (!rule) {
        // Wrong item for this hotspot — burn a turn, give a clear message.
        const advanced = Math.min(state.turn + 1, MAX_TURNS + 1);
        const logs: LogEntry[] = [
          ...state.logs,
          { turn: advanced, role: "SYSTEM", text: "That doesn't fit here.", kind: "default" },
        ];
        const endingId = !state.endingId && advanced > MAX_TURNS ? "A" : state.endingId;
        return { ...state, turn: advanced, logs, endingId };
      }
      return applyRule(state, rule);
    }

    case "MOVE": {
      const here = SCENES[state.scene];
      const target = SCENES[action.to];
      if (!here.exits.includes(action.to)) return state;
      if (target.lockedUntil && !state.flags.includes(target.lockedUntil)) {
        return {
          ...state,
          logs: [
            ...state.logs,
            { turn: state.turn, role: "SYSTEM", text: "That way is closed.", kind: "default" },
          ],
        };
      }
      const advanced = Math.min(state.turn + 1, MAX_TURNS + 1);
      const visited = state.visitedScenes.includes(action.to)
        ? state.visitedScenes
        : [...state.visitedScenes, action.to];
      const endingId = !state.endingId && advanced > MAX_TURNS ? "A" : state.endingId;
      return {
        ...state,
        scene: action.to,
        turn: advanced,
        visitedScenes: visited,
        logs: [
          ...state.logs,
          { turn: advanced, role: "SYSTEM", text: `→ ${target.title}`, kind: "system" },
        ],
        endingId,
      };
    }

    case "WAIT": {
      const advanced = Math.min(state.turn + 1, MAX_TURNS + 1);
      const endingId = !state.endingId && advanced > MAX_TURNS ? "A" : state.endingId;
      return {
        ...state,
        turn: advanced,
        logs: [
          ...state.logs,
          { turn: advanced, role: "SYSTEM", text: "You wait.  The fog moves.", kind: "default" },
        ],
        endingId,
      };
    }
  }
}

function loadSaved(): GameState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as GameState;
    if (typeof parsed.turn !== "number") return null;
    return parsed;
  } catch {
    return null;
  }
}

export function useGameState() {
  const [state, dispatch] = useReducer(reducer, undefined, () => loadSaved() ?? makeInitialState());
  const prev = useRef<GameState | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignore quota */
    }
  }, [state]);

  // Sound cues — derived from state diffs so they fire exactly once per change.
  useEffect(() => {
    const before = prev.current;
    prev.current = state;
    if (!before) return;
    if (state.endingId && !before.endingId) {
      playSound(state.endingId === "C" || state.endingId === "D" ? "unlock" : "dissonant");
      return;
    }
    if (state.inventory.length > before.inventory.length) {
      playSound("unlock");
    } else if (state.lostItems.length > before.lostItems.length) {
      playSound("dissonant");
    } else if (state.scene !== before.scene) {
      playSound("move");
    } else if (state.turn > before.turn) {
      playSound("tick");
    }
  }, [state]);

  // NOTE: The previous version had a useEffect that auto-dispatched WAIT once
  // turn >= YOUTH_LEAVES_AT, which created a runaway turn-advance loop
  // (effect → dispatch → state change → effect → dispatch …) and force-ended
  // every playthrough on Ending A around turn 8.  Removed.
  //
  // Bong-sik's "leaving" narrative is now handled passively:
  //   · player-driven: `yard.bongsik.second` rule sets BONG_SIK_LEFT
  //   · time-driven : the natural turn-12 cap fires Ending A via applyRule
  // Both flow through the reducer; no side effect needed here.

  const inspect = useCallback((scene: SceneId, hotspot: string) => {
    if (state.activeItem) {
      dispatch({ kind: "USE", scene, hotspot, item: state.activeItem });
    } else {
      dispatch({ kind: "INSPECT", scene, hotspot });
    }
  }, [state.activeItem]);

  const move = useCallback((to: SceneId) => dispatch({ kind: "MOVE", to }), []);
  const equip = useCallback((item: ItemId | null) => dispatch({ kind: "EQUIP", item }), []);
  const wait = useCallback(() => dispatch({ kind: "WAIT" }), []);
  const reset = useCallback(() => {
    if (typeof window !== "undefined") window.localStorage.removeItem(STORAGE_KEY);
    dispatch({ kind: "RESET" });
  }, []);

  const ending = state.endingId ? ENDINGS[state.endingId] : null;

  return { state, ending, inspect, move, equip, wait, reset };
}
