// Shared type definitions for the Isaku-style, data-driven episode engine.
// Episode files declare scenes, evidence, rules, records, and endings.

export type SceneId =
  | "OFFICE"
  | "ARMORY"
  | "YARD"
  | "FIELD"
  | "FOREST"
  | "COAST"
  | "EP2_RUINS"
  | "EP2_WORKSHOP"
  | "EP2_FREEZER"
  | "EP2_TRAIL"
  | "EP2_WRECK"
  | "EP2_GLADE"
  | "EP3_WITHDRAWAL"
  | "EP3_CLINIC"
  | "EP3_VILLAGE"
  | "EP3_COLD_ROOM"
  | "EP3_FOREST_GATE"
  | "EP3_EXCHANGE"
  | "EP4_ARCHIVE"
  | "EP4_TIMELINE"
  | "EP4_CLASSIFIER"
  | "EP4_SCENARIO"
  | "EP4_GOVERNANCE"
  | "EP4_TRANSMISSION";

export type ItemId =
  | "EQUIPMENT_KEY"
  | "DUTY_ROSTER"
  | "CAMERA"
  | "FIELD_RULER"
  | "EVIDENCE_BAG"
  | "TIGER_GUIDE"
  | "CARBINE_AMMO"
  | "BINOCULARS"
  | "COW_PHOTO"
  | "WOUND_MEASUREMENTS"
  | "SOIL_CAST"
  | "ENCOUNTER_PHOTO"
  | "CASE_FILE"
  | "UNFIRED_CARTRIDGE"
  | "SEARCH_MAP"
  | "TRAUMA_KIT"
  | "CEASEFIRE_FLARE"
  | "HUNTING_AMMO"
  | "WORKSHOP_KEY"
  | "MANNEQUIN_TAG"
  | "KALI_PHOTO"
  | "SPENT_CASING"
  | "YANGBAE_STATEMENT"
  | "MULTI_TRACK_SKETCH"
  | "HULL_FRAGMENT"
  | "FIRST_SHOT_REPORT"
  | "EVAC_ROUTE"
  | "RIFLE_BOLTS"
  | "CASUALTY_LEDGER"
  | "TRANSFER_ORDER"
  | "EVAC_MAP"
  | "HAESUL_SKETCH"
  | "CIVILIAN_MANIFEST"
  | "KEROSENE_CAN"
  | "KALI_STATUS_RECORD"
  | "HUMAN_BULLET"
  | "TRANSPORT_CRADLE"
  | "KALI_IN_CRADLE"
  | "CONTACT_RECORD"
  | "WORDLESS_RETURN"
  | "OMEGA_DIRECTIVE"
  | "ELITE_ARTIFACT_LEDGER"
  | "CHAIN_OF_CUSTODY"
  | "FIELD_TESTIMONY"
  | "INCIDENT_ARCHIVE"
  | "TIGER_REBUTTAL"
  | "CAUSALITY_SEQUENCE"
  | "CONTACT_OUTCOME"
  | "VERIFIED_TIMELINE"
  | "PROVEN_FACTS"
  | "SUPPORTED_INFERENCES"
  | "CREATIVE_BOUNDARY"
  | "LAYERED_ARCHIVE"
  | "KALI_QUESTION"
  | "ZOR_QUESTION"
  | "WITNESS_QUESTION"
  | "HUMANS_IN_SPACE_DRAFT"
  | "ARTIFACT_TRIAD"
  | "AUTHORSHIP_RECORD"
  | "GOVERNANCE_PACKET"
  | "OPEN_ARCHIVE_INDEX"
  | "HOPE_PROTOCOL";

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
  top: string;
  left: string;
  width: string;
  height: string;
}

export interface Scene {
  id: SceneId;
  title: string;
  ambient: string;
  art: string;
  hotspots: Hotspot[];
  exits: SceneId[];
  lockedUntil?: string;
}

export interface Item {
  id: ItemId;
  name: string;
  short: string;
  art?: string;
  losable?: boolean;
  artifact?: boolean;
}

export interface Interaction {
  id: string;
  scene: SceneId;
  hotspot: string;
  requires?: {
    item?: ItemId;
    has?: ItemId[];
    missing?: ItemId[];
    flag?: string;
    flagsAll?: string[];
    flagsNone?: string[];
    turnLte?: number;
    turnGte?: number;
  };
  consumes?: ItemId[];
  destroys?: ItemId[];
  grants?: ItemId[];
  setFlags?: string[];
  clearFlags?: string[];
  moveTo?: SceneId;
  log: Omit<LogEntry, "turn">;
  turnCost?: number;
  triggersEnding?: EndingId;
  once?: boolean;
}

export interface EndingDescriptor {
  id: EndingId;
  title: string;
  body: string;
  grantsArtifacts?: ItemId[];
  unlocksNextEpisode?: boolean;
  isRestart?: boolean;
}

export interface CaseRecordRow {
  label: string;
  text: string;
  revealFlag: string;
}

export interface CaseRecordNote {
  text: string;
  revealFlag: string;
}

export interface CaseRecord {
  title: string;
  rows: CaseRecordRow[];
  notes?: CaseRecordNote[];
}

export interface GameDefinition {
  id: "ep1" | "ep2" | "ep3" | "ep4";
  number: 1 | 2 | 3 | 4;
  version: number;
  title: string;
  headerLabel: string;
  maxTurns: number;
  storageKey: string;
  scenes: Record<string, Scene>;
  sceneOrder: SceneId[];
  items: Record<string, Item>;
  interactions: Interaction[];
  endings: Record<EndingId, EndingDescriptor>;
  initialScene: SceneId;
  initialLogs: LogEntry[];
  initialInventory?: ItemId[];
  waitText: string;
  caseRecord: CaseRecord;
  successfulEndings: EndingId[];
}

export interface GameState {
  turn: number;
  scene: SceneId;
  inventory: ItemId[];
  activeItem: ItemId | null;
  flags: string[];
  firedOnce: string[];
  lostItems: ItemId[];
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
