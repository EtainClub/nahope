// Episode 1 — type definitions for the Isaku-style trigger-belt engine.
// All puzzle data is declarative; the reducer in ./state.ts is data-driven.

export type SceneId =
  | "OFFICE"
  | "ARMORY"
  | "YARD"
  | "FIELD"
  | "FOREST"
  | "COAST";

export type ItemId =
  | "ARMORY_KEY"
  | "LIGHTER"
  | "OIL"
  | "SPARE_MAG"
  | "SCREWDRIVER"
  | "POLAROID_1950"
  | "MAGNIFIER"
  | "GREEN_SLIME"
  | "TRANSLATOR_FRAG"
  | "FIELD_REPORT_P1"
  | "LICENSE_PLATE"
  | "RADIO_80S"
  | "OMEGA_MARK"
  | "OMEGA_MARK_APOSTATE";

export type EndingId = "A" | "B" | "C" | "D";

export type LogKind = "system" | "voice" | "omega" | "danger" | "default";

export interface LogEntry {
  turn: number;
  role: string;
  text: string;
  kind: LogKind;
}

export interface Hotspot {
  id: string;
  label: string;
  // % positions inside the plate.
  top: string;
  left: string;
  width: string;
  height: string;
}

export interface Scene {
  id: SceneId;
  title: string;
  ambient: string;            // one-line atmosphere description
  art: string;                // path under /public
  hotspots: Hotspot[];
  // Neighbors the player can MOVE to from this scene.
  exits: SceneId[];
  // If set, scene is locked until the flag is present.
  lockedUntil?: string;
}

export interface Item {
  id: ItemId;
  name: string;
  short: string;
  art?: string;               // path under /public
  losable?: boolean;
  // Cosmic / alien artifacts that persist to Ep.2+ on ending C.
  artifact?: boolean;
}

// A single declarative rule. The reducer scans INTERACTIONS in order and
// applies the first rule whose `scene` / `hotspot` / `requires` match.
export interface Interaction {
  id: string;
  scene: SceneId;
  hotspot: string;
  requires?: {
    item?: ItemId;            // active item required (null = bare inspect)
    has?: ItemId[];           // must be in inventory
    missing?: ItemId[];       // must NOT be in inventory
    flag?: string;            // single flag (prefix "!" → must be absent)
    flagsAll?: string[];      // all must be present
    flagsNone?: string[];     // none must be present
    turnLte?: number;
    turnGte?: number;
  };
  consumes?: ItemId[];        // moved out of active inventory after firing
  destroys?: ItemId[];        // permanently removed (lost forever)
  grants?: ItemId[];
  setFlags?: string[];
  clearFlags?: string[];
  moveTo?: SceneId;
  log: Omit<LogEntry, "turn">;
  turnCost?: number;          // default 1; correct clues are usually 0
  triggersEnding?: EndingId;
  // Marks the interaction as a one-shot. If true the rule cannot fire twice.
  once?: boolean;
}

export interface EndingDescriptor {
  id: EndingId;
  title: string;
  body: string;
  // What gets persisted to the user's profile when this ending fires.
  grantsArtifacts?: ItemId[];
  unlocksNextEpisode?: boolean;
  isRestart?: boolean;        // ending B forces a restart
}

export interface GameState {
  turn: number;
  scene: SceneId;
  inventory: ItemId[];
  activeItem: ItemId | null;
  flags: string[];
  firedOnce: string[];        // interaction ids that have already fired (for `once`)
  lostItems: ItemId[];        // permanently destroyed
  logs: LogEntry[];
  endingId: EndingId | null;
  visitedScenes: SceneId[];
}

export type Action =
  | { kind: "INSPECT"; scene: SceneId; hotspot: string }
  | { kind: "USE"; scene: SceneId; hotspot: string; item: ItemId }
  | { kind: "MOVE"; to: SceneId }
  | { kind: "EQUIP"; item: ItemId | null }
  | { kind: "WAIT" }
  | { kind: "RESET" };
