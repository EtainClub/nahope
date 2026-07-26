"use client";

import { useReducer, useCallback, useEffect, useRef } from "react";
import { EPISODE_1 } from "./episode1";
import { play as playSound } from "./sound";
import type {
  Action,
  EndingId,
  GameDefinition,
  GameState,
  Interaction,
  ItemId,
  SceneId,
} from "./types";

function makeInitialState(definition: GameDefinition): GameState {
  return {
    turn: 1,
    scene: definition.initialScene,
    inventory: [...(definition.initialInventory ?? [])],
    activeItem: null,
    flags: [],
    firedOnce: [],
    lostItems: [],
    logs: [...definition.initialLogs],
    endingId: null,
    visitedScenes: [definition.initialScene],
  };
}

function hasAll(arr: string[], required?: string[]): boolean {
  return !required || required.every((value) => arr.includes(value));
}

function hasNone(arr: string[], forbidden?: string[]): boolean {
  return !forbidden || forbidden.every((value) => !arr.includes(value));
}

function matchRequires(
  state: GameState,
  action: { item?: ItemId | null },
  rule: Interaction,
): boolean {
  const requirements = rule.requires;
  if (!requirements) return true;
  if (requirements.item !== undefined && requirements.item !== action.item) return false;
  if (!hasAll(state.inventory, requirements.has)) return false;
  if (!hasNone(state.inventory, requirements.missing)) return false;
  if (requirements.flag) {
    const inverted = requirements.flag.startsWith("!");
    const flag = inverted ? requirements.flag.slice(1) : requirements.flag;
    if (inverted ? state.flags.includes(flag) : !state.flags.includes(flag)) return false;
  }
  if (!hasAll(state.flags, requirements.flagsAll)) return false;
  if (!hasNone(state.flags, requirements.flagsNone)) return false;
  if (requirements.turnLte !== undefined && state.turn > requirements.turnLte) return false;
  if (requirements.turnGte !== undefined && state.turn < requirements.turnGte) return false;
  return true;
}

function findRule(
  definition: GameDefinition,
  state: GameState,
  action: { kind: "INSPECT" | "USE"; scene: SceneId; hotspot: string; item?: ItemId | null },
): Interaction | null {
  for (const rule of definition.interactions) {
    if (rule.scene !== action.scene || rule.hotspot !== action.hotspot) continue;
    if (rule.once && state.firedOnce.includes(rule.id)) continue;
    const requiredItem = rule.requires?.item;
    if (action.kind === "USE" ? requiredItem !== action.item : requiredItem !== undefined) continue;
    if (matchRequires(state, action, rule)) return rule;
  }
  return null;
}

function applyRule(state: GameState, rule: Interaction, definition: GameDefinition): GameState {
  let inventory = [...state.inventory];
  const lostItems = [...state.lostItems];
  let flags = [...state.flags];

  for (const item of rule.consumes ?? []) inventory = inventory.filter((id) => id !== item);
  for (const item of rule.destroys ?? []) {
    inventory = inventory.filter((id) => id !== item);
    if (!lostItems.includes(item)) lostItems.push(item);
  }
  for (const item of rule.grants ?? []) {
    if (!inventory.includes(item) && !lostItems.includes(item)) inventory.push(item);
  }
  for (const flag of rule.setFlags ?? []) if (!flags.includes(flag)) flags.push(flag);
  if (rule.clearFlags) flags = flags.filter((flag) => !rule.clearFlags?.includes(flag));

  const nextTurn = Math.min(state.turn + (rule.turnCost ?? 1), definition.maxTurns + 1);
  const nextScene = rule.moveTo && definition.scenes[rule.moveTo] ? rule.moveTo : state.scene;
  const visitedScenes = nextScene !== state.scene && !state.visitedScenes.includes(nextScene)
    ? [...state.visitedScenes, nextScene]
    : state.visitedScenes;
  const activeItem = state.activeItem && [...(rule.consumes ?? []), ...(rule.destroys ?? [])].includes(state.activeItem)
    ? null
    : state.activeItem;
  const endingId = rule.triggersEnding ?? (nextTurn > definition.maxTurns ? "A" : state.endingId);

  return {
    ...state,
    turn: nextTurn,
    scene: nextScene,
    inventory,
    activeItem,
    flags,
    firedOnce: rule.once ? [...state.firedOnce, rule.id] : state.firedOnce,
    lostItems,
    logs: [...state.logs, { turn: nextTurn, ...rule.log }],
    endingId,
    visitedScenes,
  };
}

function advanceWithoutRule(state: GameState, definition: GameDefinition, text: string): GameState {
  const turn = Math.min(state.turn + 1, definition.maxTurns + 1);
  return {
    ...state,
    turn,
    logs: [...state.logs, { turn, role: "SYSTEM", text, kind: "default" }],
    endingId: turn > definition.maxTurns ? "A" : state.endingId,
  };
}

function reduceGame(state: GameState, action: Action, definition: GameDefinition): GameState {
  if (state.endingId && action.kind !== "RESET") return state;

  switch (action.kind) {
    case "RESET":
      return makeInitialState(definition);
    case "EQUIP":
      return { ...state, activeItem: action.item };
    case "INSPECT": {
      const rule = findRule(definition, state, { ...action, item: null });
      if (!rule) {
        return {
          ...state,
          logs: [...state.logs, { turn: state.turn, role: "SYSTEM", text: "Nothing happens.", kind: "default" }],
        };
      }
      return applyRule(state, rule, definition);
    }
    case "USE": {
      const rule = findRule(definition, state, action);
      return rule ? applyRule(state, rule, definition) : advanceWithoutRule(state, definition, "That doesn't fit here.");
    }
    case "MOVE": {
      const current = definition.scenes[state.scene];
      const target = definition.scenes[action.to];
      if (!current || !target || !current.exits.includes(action.to)) return state;
      if (target.lockedUntil && !state.flags.includes(target.lockedUntil)) {
        return {
          ...state,
          logs: [...state.logs, { turn: state.turn, role: "SYSTEM", text: "That way is closed.", kind: "default" }],
        };
      }
      const turn = Math.min(state.turn + 1, definition.maxTurns + 1);
      return {
        ...state,
        scene: action.to,
        turn,
        visitedScenes: state.visitedScenes.includes(action.to) ? state.visitedScenes : [...state.visitedScenes, action.to],
        logs: [...state.logs, { turn, role: "SYSTEM", text: `→ ${target.title}`, kind: "system" }],
        endingId: turn > definition.maxTurns ? "A" : state.endingId,
      };
    }
    case "WAIT":
      return advanceWithoutRule(state, definition, definition.waitText);
  }
}

function loadSaved(definition: GameDefinition): GameState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(definition.storageKey);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as GameState;
    if (typeof parsed.turn !== "number" || !definition.scenes[parsed.scene]) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function useGameState(definition: GameDefinition = EPISODE_1) {
  const episodeReducer = useCallback(
    (state: GameState, action: Action) => reduceGame(state, action, definition),
    [definition],
  );
  const [state, dispatch] = useReducer(episodeReducer, undefined, () => loadSaved(definition) ?? makeInitialState(definition));
  const previous = useRef<GameState | null>(null);

  useEffect(() => {
    try {
      window.localStorage.setItem(definition.storageKey, JSON.stringify(state));
    } catch {
      // Ignore private-mode and storage quota failures.
    }
  }, [definition.storageKey, state]);

  useEffect(() => {
    const before = previous.current;
    previous.current = state;
    if (!before) return;
    if (state.endingId && !before.endingId) {
      playSound(definition.successfulEndings.includes(state.endingId) ? "unlock" : "dissonant");
    } else if (state.inventory.length > before.inventory.length) {
      playSound("unlock");
    } else if (state.lostItems.length > before.lostItems.length) {
      playSound("dissonant");
    } else if (state.scene !== before.scene) {
      playSound("move");
    } else if (state.turn > before.turn) {
      playSound("tick");
    }
  }, [definition.successfulEndings, state]);

  const inspect = useCallback((scene: SceneId, hotspot: string) => {
    dispatch(state.activeItem
      ? { kind: "USE", scene, hotspot, item: state.activeItem }
      : { kind: "INSPECT", scene, hotspot });
  }, [state.activeItem]);
  const move = useCallback((to: SceneId) => dispatch({ kind: "MOVE", to }), []);
  const equip = useCallback((item: ItemId | null) => dispatch({ kind: "EQUIP", item }), []);
  const wait = useCallback(() => dispatch({ kind: "WAIT" }), []);
  const reset = useCallback(() => {
    window.localStorage.removeItem(definition.storageKey);
    dispatch({ kind: "RESET" });
  }, [definition.storageKey]);

  const ending = state.endingId ? definition.endings[state.endingId as EndingId] : null;
  return { state, ending, inspect, move, equip, wait, reset };
}
