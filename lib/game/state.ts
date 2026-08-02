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
  const presenceSeed = Array.from(definition.storageKey).reduce(
    (total, character) => (total * 31 + character.charCodeAt(0)) % 100_003,
    definition.version,
  );
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
    cycleIndex: definition.ritual?.initialCycleIndex ?? 0,
    loopCount: 0,
    anchoredEvidence: [],
    boundaryIntegrity: 100,
    roosterAlive: true,
    horsePathOpen: true,
    witnessedPresence: [],
    presenceSeed,
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
  if (requirements.cycleIndex !== undefined && state.cycleIndex !== requirements.cycleIndex) return false;
  if (!hasAll(state.anchoredEvidence, requirements.anchoredAll)) return false;
  return true;
}

function moveCycle(index: number, shift: number) {
  const raw = index + shift;
  const wrapped = raw < 0 || raw > 11;
  return {
    index: ((raw % 12) + 12) % 12,
    wrapped,
  };
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
  const anchoredEvidence = [...state.anchoredEvidence];
  const witnessedPresence = [...state.witnessedPresence];

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
  for (const evidence of rule.anchorEvidence ?? []) {
    if (!anchoredEvidence.includes(evidence)) anchoredEvidence.push(evidence);
  }
  if (rule.presenceId && !witnessedPresence.includes(rule.presenceId)) {
    witnessedPresence.push(rule.presenceId);
  }

  const cycle = rule.shiftCycle === undefined
    ? { index: state.cycleIndex, wrapped: false }
    : moveCycle(state.cycleIndex, rule.shiftCycle);
  const boundaryIntegrity = Math.max(0, Math.min(100, state.boundaryIntegrity + (rule.boundaryDelta ?? 0)));
  const roosterAlive = rule.extinguishesYang === "rooster" ? false : state.roosterAlive;
  const horsePathOpen = rule.extinguishesYang === "horse" ? false : state.horsePathOpen;

  const nextTurn = Math.min(state.turn + (rule.turnCost ?? 1), definition.maxTurns + 1);
  const nextScene = rule.moveTo && definition.scenes[rule.moveTo] ? rule.moveTo : state.scene;
  const visitedScenes = nextScene !== state.scene && !state.visitedScenes.includes(nextScene)
    ? [...state.visitedScenes, nextScene]
    : state.visitedScenes;
  const activeItem = state.activeItem && [...(rule.consumes ?? []), ...(rule.destroys ?? [])].includes(state.activeItem)
    ? null
    : state.activeItem;
  const collapseEnding = definition.ritual?.boundaryCollapseEnding ?? "B";
  const endingId = rule.triggersEnding
    ?? (boundaryIntegrity <= 0 ? collapseEnding : null)
    ?? (nextTurn > definition.maxTurns ? "A" : state.endingId);

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
    cycleIndex: cycle.index,
    loopCount: state.loopCount + (cycle.wrapped ? 1 : 0),
    anchoredEvidence,
    boundaryIntegrity,
    roosterAlive,
    horsePathOpen,
    witnessedPresence,
  };
}

function advanceWithoutRule(state: GameState, definition: GameDefinition, text: string): GameState {
  const turn = Math.min(state.turn + 1, definition.maxTurns + 1);
  const boundaryIntegrity = definition.ritual
    ? Math.max(0, state.boundaryIntegrity - 4)
    : state.boundaryIntegrity;
  const collapseEnding = definition.ritual?.boundaryCollapseEnding ?? "B";
  return {
    ...state,
    turn,
    boundaryIntegrity,
    logs: [...state.logs, { turn, role: "시스템", text, kind: "default" }],
    endingId: boundaryIntegrity <= 0
      ? collapseEnding
      : turn > definition.maxTurns
        ? "A"
        : state.endingId,
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
          logs: [...state.logs, { turn: state.turn, role: "시스템", text: "아무 일도 일어나지 않는다.", kind: "default" }],
        };
      }
      return applyRule(state, rule, definition);
    }
    case "USE": {
      const rule = findRule(definition, state, action);
      return rule ? applyRule(state, rule, definition) : advanceWithoutRule(state, definition, "여기에는 사용할 수 없다.");
    }
    case "MOVE": {
      const current = definition.scenes[state.scene];
      const target = definition.scenes[action.to];
      if (!current || !target || !current.exits.includes(action.to)) return state;
      if (target.lockedUntil && !state.flags.includes(target.lockedUntil)) {
        return {
          ...state,
          logs: [...state.logs, { turn: state.turn, role: "시스템", text: "그쪽 길은 아직 닫혀 있다.", kind: "default" }],
        };
      }
      const turn = Math.min(state.turn + 1, definition.maxTurns + 1);
      return {
        ...state,
        scene: action.to,
        turn,
        visitedScenes: state.visitedScenes.includes(action.to) ? state.visitedScenes : [...state.visitedScenes, action.to],
        logs: [...state.logs, { turn, role: "시스템", text: `→ ${target.title}`, kind: "system" }],
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
    const initial = makeInitialState(definition);
    return {
      ...initial,
      ...parsed,
      cycleIndex: typeof parsed.cycleIndex === "number" ? parsed.cycleIndex : initial.cycleIndex,
      loopCount: typeof parsed.loopCount === "number" ? parsed.loopCount : 0,
      anchoredEvidence: Array.isArray(parsed.anchoredEvidence) ? parsed.anchoredEvidence : [],
      boundaryIntegrity: typeof parsed.boundaryIntegrity === "number" ? parsed.boundaryIntegrity : 100,
      roosterAlive: parsed.roosterAlive !== false,
      horsePathOpen: parsed.horsePathOpen !== false,
      witnessedPresence: Array.isArray(parsed.witnessedPresence) ? parsed.witnessedPresence : [],
      presenceSeed: typeof parsed.presenceSeed === "number" ? parsed.presenceSeed : initial.presenceSeed,
    };
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
