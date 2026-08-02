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
  | "EP4_TRANSMISSION"
  | "EP2_CATTLE_GROUND"
  | "EP2_RABBIT_RIDGE"
  | "EP2_AUTOPSY_TENT"
  | "EP2_YANGBAE_WORKSHOP"
  | "EP2_DAWN_YARD"
  | "EP2_HAESUL_HOUSE"
  | "EP3_HAESUL_HOUSE"
  | "EP3_DAWN_YARD"
  | "EP3_YANGBAE_WORKSHOP"
  | "EP3_AUTOPSY_TENT"
  | "EP3_RABBIT_RIDGE"
  | "EP3_ZERO_HOUR"
  | "EP4_ZERO_CHAMBER"
  | "EP4_FIXED_VAULT"
  | "EP4_PRESENCE_HALL"
  | "EP4_PROPOSAL_LAB"
  | "EP4_PUBLIC_ARCHIVE"
  | "EP4_SENDING_GATE";

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
  | "HOPE_PROTOCOL"
  | "COW_HOUR_RECORD"
  | "TIGER_NAME_ORDER"
  | "RABBIT_HIDE_ROUTE"
  | "DRAGON_CRASH_TRACE"
  | "WORM_TIME_SAMPLE"
  | "HORSE_PASSAGE_LOG"
  | "YANGBAE_CAUSAL_NOTE"
  | "MONGCHI_NAME_TAG"
  | "ROOSTER_CALL_TAPE"
  | "DOG_SURVIVOR_ROUTE"
  | "HAESUL_REVERSE_SEAL"
  | "TWELVE_CALLS_RECORD"
  | "RITUAL_CLOCK"
  | "ZERO_HOUR_GAP_RECORD"
  | "ANCHORED_WITNESS_LEDGER"
  | "HUMAN_FIRST_SHOT_RECORD"
  | "YANG_PATH_MAP"
  | "CRASH_DISTRESS_WAVE"
  | "SECOND_HUNT_REBUTTAL"
  | "OMEGA_ZERO_SIGNAL"
  | "TWELVE_LIVING_WITNESSES"
  | "FIXED_POINT_LEDGER"
  | "MUTABLE_CAUSE_MAP"
  | "PRESENCE_TESTIMONY"
  | "THREE_LAYER_RITUAL_ARCHIVE"
  | "THIRTEENTH_PROPOSAL"
  | "COMMUNITY_RITE_PACKET"
  | "SENDING_OFF_RECORD";

export type ZodiacSign =
  | "JA"
  | "CHUK"
  | "IN"
  | "MYO"
  | "JIN"
  | "SA"
  | "O"
  | "MI"
  | "SIN"
  | "YU"
  | "SUL"
  | "HAE";

export type RitualPhase = "invocation" | "reverse" | "sending";
export type CycleDirection = "forward" | "reverse" | "outside";
export type YangAnchor = "rooster" | "horse";

export interface ZodiacMarker {
  sign: ZodiacSign;
  animal: string;
  label: string;
  revealFlag: string;
}

export interface PresenceEvent {
  id: string;
  title: string;
  text: string;
  visualCue: string;
}

export interface RitualDefinition {
  phase: RitualPhase;
  direction: CycleDirection;
  initialCycleIndex: number;
  markers: ZodiacMarker[];
  presenceEvents?: Record<string, PresenceEvent>;
  boundaryCollapseEnding?: EndingId;
}

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
    cycleIndex?: number;
    anchoredAll?: string[];
  };
  consumes?: ItemId[];
  destroys?: ItemId[];
  grants?: ItemId[];
  setFlags?: string[];
  clearFlags?: string[];
  shiftCycle?: number;
  anchorEvidence?: string[];
  boundaryDelta?: number;
  extinguishesYang?: YangAnchor;
  presenceId?: string;
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
  ritual?: RitualDefinition;
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
  cycleIndex: number;
  loopCount: number;
  anchoredEvidence: string[];
  boundaryIntegrity: number;
  roosterAlive: boolean;
  horsePathOpen: boolean;
  witnessedPresence: string[];
  presenceSeed: number;
}

export type Action =
  | { kind: "INSPECT"; scene: SceneId; hotspot: string }
  | { kind: "USE"; scene: SceneId; hotspot: string; item: ItemId }
  | { kind: "MOVE"; to: SceneId }
  | { kind: "EQUIP"; item: ItemId | null }
  | { kind: "WAIT" }
  | { kind: "RESET" };
