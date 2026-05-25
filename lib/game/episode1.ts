// Episode 1 — "Ignorance: The Omega Mark on the Cow"
// All puzzle, dialogue, and ending data lives here. The reducer in
// ./state.ts treats this file as the source of truth.

import type {
  EndingDescriptor,
  EndingId,
  Interaction,
  Item,
  ItemId,
  Scene,
  SceneId,
} from "./types";

// Tuning notes (Isaku-style, but playable):
//   · Canonical solve uses ~17 turns of intentional actions (5 moves +
//     12 hotspot interactions).  MAX_TURNS = 20 gives ~3 turns of slack for
//     red herrings / wrong-item probes before Ending A.
//   · YOUTH_LEAVES_AT is a *narrative* anchor, not a forced turn-burn.
export const MAX_TURNS = 20;
export const YOUTH_LEAVES_AT = 14;

// ── Items ───────────────────────────────────────────────────────────────
export const ITEMS: Record<ItemId, Item> = {
  ARMORY_KEY: { id: "ARMORY_KEY", name: "Armory Key", short: "Sgt. Sung-ki's brass key.  No tag, no number.", art: "/images/game/ep1/items/armory_key.png" },
  LIGHTER: { id: "LIGHTER", name: "Brass Lighter", short: "Engraved 'HOPO 1971'.  Half a tank of fluid.", art: "/images/game/ep1/items/lighter.png" },
  OIL: { id: "OIL", name: "Lubricating Oil", short: "Cold-war issue, made in Pyeongtaek.", art: "/images/game/ep1/items/oil.png" },
  SPARE_MAG: { id: "SPARE_MAG", name: "Spare Magazine", short: "Wrong caliber.  Do NOT load this.", art: "/images/game/ep1/items/spare_mag.png" },
  SCREWDRIVER: { id: "SCREWDRIVER", name: "Confiscated Screwdriver", short: "Crosshead.  Confiscated from a child, the tag says.", art: "/images/game/ep1/items/screwdriver.png" },
  POLAROID_1950: { id: "POLAROID_1950", name: "Polaroid (1950)", short: "A boy with the Ω carved into his forehead.  Smiling.", art: "/images/game/ep1/items/polaroid_1950.svg" },
  MAGNIFIER: { id: "MAGNIFIER", name: "Magnifying Glass", short: "Pried from the back of the Polaroid frame.", art: "/images/game/ep1/items/magnifier.svg" },
  GREEN_SLIME: { id: "GREEN_SLIME", name: "Green Alien Slime", short: "Hardened.  Smells of ozone and pine sap.", artifact: true, art: "/images/game/ep1/items/green_slime.svg" },
  TRANSLATOR_FRAG: { id: "TRANSLATOR_FRAG", name: "Translator Fragment", short: "Greek alphabet card.  Ω is circled in red wax.", artifact: true, art: "/images/game/ep1/items/translator_frag.svg" },
  FIELD_REPORT_P1: { id: "FIELD_REPORT_P1", name: "Field Report p.1", short: "'The symbol returns every 33 years.'  Pages 2 and 3 are missing.", losable: true, art: "/images/game/ep1/items/field_report_p1.svg" },
  LICENSE_PLATE: { id: "LICENSE_PLATE", name: "Hopo License Plate", short: "Half-buried beside the cow.  Reads 'HOPO 4-9'.", losable: true, art: "/images/game/ep1/items/license_plate.svg" },
  RADIO_80S: { id: "RADIO_80S", name: "80s Field Radio", short: "Tunes from 88 to 108 MHz.  And one channel above that.", art: "/images/game/ep1/items/radio_80s.svg" },
  OMEGA_MARK: { id: "OMEGA_MARK", name: "Omega Mark", short: "A pewter pendant in the shape of Ω.  Warm to the touch.", artifact: true, art: "/images/game/ep1/items/omega_mark.svg" },
  OMEGA_MARK_APOSTATE: { id: "OMEGA_MARK_APOSTATE", name: "Ω Mark (Apostate)", short: "Inscribed on the back: a word that is not Greek.", artifact: true, art: "/images/game/ep1/items/omega_mark_apostate.svg" },
};

// ── Scenes ──────────────────────────────────────────────────────────────
export const SCENES: Record<SceneId, Scene> = {
  OFFICE: {
    id: "OFFICE",
    title: "Substation · Office",
    ambient: "An oil lamp.  Sgt. Sung-ki snoring.  The wall clock has stopped at 18:40.",
    art: "/images/game/ep1/office.png",
    exits: ["ARMORY", "YARD"],
    hotspots: [
      { id: "SUNGKI_POCKET", label: "Sung-ki's Pocket", top: "58%", left: "25%", width: "16%", height: "22%" },
      { id: "CHIEF_DRAWER", label: "Chief's Drawer", top: "62%", left: "0%", width: "10%", height: "18%" },
      { id: "RIFLE_RACK", label: "Calivan Rifle", top: "35%", left: "70%", width: "18%", height: "32%" },
      { id: "TYPEWRITER", label: "Goldstar Typewriter", top: "75%", left: "32%", width: "14%", height: "16%" },
      { id: "RADIO", label: "Field Radio", top: "65%", left: "55%", width: "12%", height: "14%" },
    ],
  },
  ARMORY: {
    id: "ARMORY",
    title: "Substation · Armory Locker",
    ambient: "Dust.  Cordite.  A locker that hasn't been opened in years.",
    art: "/images/game/ep1/armory.png",
    exits: ["OFFICE"],
    hotspots: [
      { id: "LOCKER", label: "Steel Locker", top: "25%", left: "8%", width: "10%", height: "60%" },
      { id: "BEHIND_LOCKER", label: "Behind the Locker", top: "30%", left: "42%", width: "12%", height: "40%" },
      { id: "SHELF", label: "Top Shelf", top: "2%", left: "10%", width: "60%", height: "12%" },
    ],
  },
  YARD: {
    id: "YARD",
    title: "Substation · Front Yard",
    ambient: "Barbed wire.  The fog is moving against the wind.",
    art: "/images/game/ep1/yard.png",
    exits: ["OFFICE", "FIELD"],
    hotspots: [
      { id: "ANTENNA", label: "Radio Antenna", top: "10%", left: "70%", width: "16%", height: "60%" },
      { id: "BONG_SIK", label: "Village Youth", top: "55%", left: "45%", width: "12%", height: "40%" },
      { id: "GATE", label: "Gate to Field", top: "60%", left: "5%", width: "16%", height: "32%" },
    ],
  },
  FIELD: {
    id: "FIELD",
    title: "DMZ · Millet Field",
    ambient: "A mutilated cow.  The blood has evaporated.  The flies will not land.",
    art: "/images/game/ep1/field.png",
    exits: ["YARD", "FOREST"],
    hotspots: [
      { id: "COW", label: "The Cow", top: "55%", left: "15%", width: "30%", height: "30%" },
      { id: "PLATE_DIRT", label: "Disturbed Soil", top: "80%", left: "70%", width: "16%", height: "16%" },
      { id: "FOREST_EDGE", label: "Forest Edge", top: "10%", left: "70%", width: "20%", height: "40%" },
    ],
  },
  FOREST: {
    id: "FOREST",
    title: "Pine Forest · Fog Wall",
    ambient: "Pines, but the resin is wrong.  The fog has a temperature.",
    art: "/images/game/ep1/forest.png",
    exits: ["FIELD", "COAST"],
    lockedUntil: "FOG_BURNED",
    hotspots: [
      { id: "FOG_WALL", label: "The Fog", top: "10%", left: "20%", width: "30%", height: "70%" },
      { id: "CLEARING", label: "The Clearing", top: "30%", left: "50%", width: "20%", height: "40%" },
      { id: "COAST_PATH", label: "Path to the Coast", top: "60%", left: "80%", width: "14%", height: "32%" },
    ],
  },
  COAST: {
    id: "COAST",
    title: "Foggy Coast · Hidden",
    ambient: "Salt.  And under the salt, something that isn't Greek.",
    art: "/images/game/ep1/coast.png",
    exits: ["FOREST"],
    lockedUntil: "COAST_OPEN",
    hotspots: [
      { id: "HATCH", label: "Iron Hatch", top: "55%", left: "40%", width: "20%", height: "30%" },
      { id: "INSCRIPTION", label: "Inscription", top: "15%", left: "65%", width: "35%", height: "20%" },
    ],
  },
};

// ── Endings ─────────────────────────────────────────────────────────────
export const ENDINGS: Record<EndingId, EndingDescriptor> = {
  A: {
    id: "A",
    title: "Ending A — Ignorance-Born Tragedy",
    body: "Bong-sik never comes back.  Sgt. Sung-ki finds the body at dawn, mutters something under his breath, and the channel cuts to static.",
  },
  B: {
    id: "B",
    title: "Ending B — Court-Martial",
    body: "Sgt. Sung-ki locks the office door from the outside.  The episode is over.  Restart.",
    isRestart: true,
  },
  C: {
    id: "C",
    title: "Ending C — Witness",
    body: "Bong-sik lives.  You hold the Ω Mark in your hand.  The next episode opens.",
    grantsArtifacts: ["OMEGA_MARK", "GREEN_SLIME", "TRANSLATOR_FRAG"],
    unlocksNextEpisode: true,
  },
  D: {
    id: "D",
    title: "Ending D — Apostate",
    body: "You walk to the coast and leave him behind.  The inscription answers in a language no one in this village can read.",
    grantsArtifacts: ["OMEGA_MARK_APOSTATE", "GREEN_SLIME", "TRANSLATOR_FRAG"],
    unlocksNextEpisode: true,
  },
};

// ── Interactions (the trigger belt) ─────────────────────────────────────
// Rule scan order matters.  More specific rules (with `requires`) MUST come
// before their fallback variants, and `once: true` rules MUST come before
// the bare "nothing happens" fallbacks.
export const INTERACTIONS: Interaction[] = [
  // --- OFFICE ------------------------------------------------------------
  {
    id: "office.sungki.wakes",
    scene: "OFFICE", hotspot: "SUNGKI_POCKET",
    requires: { flag: "RADIO_ON" },
    setFlags: ["SUNGKI_AWAKE"],
    triggersEnding: "B",
    log: { role: "SUNG-KI", text: "'…야 이 새끼야, 너 지금 뭐 만지냐?'", kind: "danger" },
  },
  {
    id: "office.sungki.picked",
    scene: "OFFICE", hotspot: "SUNGKI_POCKET",
    requires: { flagsNone: ["SUNGKI_PICKED", "SUNGKI_AWAKE"] },
    grants: ["ARMORY_KEY", "LIGHTER"],
    setFlags: ["SUNGKI_PICKED"],
    turnCost: 1,
    log: { role: "SYSTEM", text: "Sung-ki's breathing is deep.  Two keys, a brass lighter.", kind: "system" },
    once: true,
  },
  {
    id: "office.sungki.empty",
    scene: "OFFICE", hotspot: "SUNGKI_POCKET",
    log: { role: "SYSTEM", text: "His pockets are empty now.  He turns in his sleep.", kind: "default" },
    turnCost: 0,
  },

  {
    id: "office.radio.toggle.on",
    scene: "OFFICE", hotspot: "RADIO",
    requires: { flagsNone: ["RADIO_ON"] },
    setFlags: ["RADIO_ON"],
    log: { role: "RADIO", text: "Static.  And under the static, a sound like breathing.", kind: "omega" },
    turnCost: 0,
  },
  {
    id: "office.radio.toggle.off",
    scene: "OFFICE", hotspot: "RADIO",
    requires: { flag: "RADIO_ON" },
    clearFlags: ["RADIO_ON"],
    log: { role: "SYSTEM", text: "You kill the radio.  The room is too quiet now.", kind: "system" },
    turnCost: 0,
  },

  {
    id: "office.drawer.oil",
    scene: "OFFICE", hotspot: "CHIEF_DRAWER",
    requires: { item: "OIL", flagsNone: ["DRAWER_OPEN"] },
    consumes: [],
    grants: ["SCREWDRIVER", "POLAROID_1950"],
    setFlags: ["DRAWER_OPEN"],
    log: { role: "SYSTEM", text: "The drawer slides open.  A screwdriver.  A Polaroid from 1950.", kind: "system" },
    once: true,
  },
  {
    id: "office.drawer.stuck",
    scene: "OFFICE", hotspot: "CHIEF_DRAWER",
    requires: { flagsNone: ["DRAWER_OPEN"] },
    log: { role: "SYSTEM", text: "The drawer is stuck.  Rust, or something thicker.", kind: "default" },
    turnCost: 1,
  },
  {
    id: "office.drawer.empty",
    scene: "OFFICE", hotspot: "CHIEF_DRAWER",
    log: { role: "SYSTEM", text: "The drawer is empty.", kind: "default" },
    turnCost: 0,
  },

  {
    id: "office.polaroid.magnifier",
    scene: "OFFICE", hotspot: "TYPEWRITER",
    requires: { item: "POLAROID_1950", has: ["POLAROID_1950"], flagsNone: ["MAGNIFIER_PRIED"] },
    grants: ["MAGNIFIER"],
    setFlags: ["MAGNIFIER_PRIED"],
    log: { role: "SYSTEM", text: "You pry the back of the Polaroid frame off against the typewriter.  A magnifier was hidden inside.", kind: "system" },
    once: true,
  },
  {
    id: "office.typewriter.idle",
    scene: "OFFICE", hotspot: "TYPEWRITER",
    log: { role: "SYSTEM", text: "Goldstar typewriter.  The ribbon is dry.  It will not type.", kind: "default" },
    turnCost: 0,
  },

  {
    id: "office.rifle.mag.destroy",
    scene: "OFFICE", hotspot: "RIFLE_RACK",
    requires: { item: "SPARE_MAG", flagsNone: ["RIFLE_DISASSEMBLED"] },
    consumes: [],
    destroys: ["GREEN_SLIME"],   // future-destroys; harmless if not yet held
    setFlags: ["RIFLE_FIRED"],
    log: { role: "SYSTEM", text: "Wrong caliber.  The chamber jams open with a crack — and any green residue inside is now ash.", kind: "danger" },
    turnCost: 2,
    once: true,
  },
  {
    id: "office.rifle.screwdriver",
    scene: "OFFICE", hotspot: "RIFLE_RACK",
    requires: { item: "SCREWDRIVER", flagsNone: ["RIFLE_DISASSEMBLED", "RIFLE_FIRED"] },
    consumes: [],
    grants: ["GREEN_SLIME", "TRANSLATOR_FRAG"],
    setFlags: ["RIFLE_DISASSEMBLED"],
    log: { role: "SYSTEM", text: "You unscrew the receiver.  In the barrel: hardened green slime, and a folded card with the Greek alphabet.  Ω is circled.", kind: "omega" },
    once: true,
  },
  {
    id: "office.rifle.locked",
    scene: "OFFICE", hotspot: "RIFLE_RACK",
    log: { role: "SYSTEM", text: "The Calivan is locked to the rack.  You can see something inside the barrel.", kind: "default" },
    turnCost: 0,
  },

  // --- ARMORY ------------------------------------------------------------
  {
    id: "armory.locker.open",
    scene: "ARMORY", hotspot: "LOCKER",
    requires: { item: "ARMORY_KEY", flagsNone: ["LOCKER_OPEN"] },
    grants: ["OIL", "SPARE_MAG"],
    setFlags: ["LOCKER_OPEN"],
    log: { role: "SYSTEM", text: "The locker swings open.  Oil.  A spare magazine.  Something pale behind the locker.", kind: "system" },
    once: true,
  },
  {
    id: "armory.locker.closed",
    scene: "ARMORY", hotspot: "LOCKER",
    requires: { flagsNone: ["LOCKER_OPEN"] },
    log: { role: "SYSTEM", text: "Locked.  You need a key.", kind: "default" },
    turnCost: 1,
  },
  {
    id: "armory.behind.locker",
    scene: "ARMORY", hotspot: "BEHIND_LOCKER",
    requires: { flag: "LOCKER_OPEN", flagsNone: ["REPORT_FOUND"] },
    grants: ["FIELD_REPORT_P1"],
    setFlags: ["REPORT_FOUND"],
    log: { role: "SYSTEM", text: "A torn page is wedged behind the locker.  '…the symbol returns every 33 years.'  Pages 2 and 3 are not here.", kind: "system" },
    once: true,
  },
  {
    id: "armory.behind.blocked",
    scene: "ARMORY", hotspot: "BEHIND_LOCKER",
    log: { role: "SYSTEM", text: "The locker hasn't been moved in years.  You can't reach behind it yet.", kind: "default" },
    turnCost: 0,
  },
  {
    id: "armory.shelf",
    scene: "ARMORY", hotspot: "SHELF",
    log: { role: "SYSTEM", text: "Empty ammo crates and a calendar from 1979.", kind: "default" },
    turnCost: 0,
  },

  // --- YARD --------------------------------------------------------------
  {
    id: "yard.antenna.tune",
    scene: "YARD", hotspot: "ANTENNA",
    requires: { has: ["GREEN_SLIME", "TRANSLATOR_FRAG"], flagsNone: ["RADIO_TUNED"] },
    setFlags: ["RADIO_TUNED"],
    grants: ["RADIO_80S"],
    log: { role: "RADIO", text: "You smear the slime across the contact, line up the Greek card.  Coordinates resolve: 38°N, the field.", kind: "omega" },
    once: true,
  },
  {
    id: "yard.antenna.idle",
    scene: "YARD", hotspot: "ANTENNA",
    log: { role: "SYSTEM", text: "The antenna hums.  Nothing answers yet.", kind: "default" },
    turnCost: 0,
  },
  {
    id: "yard.bongsik.first",
    scene: "YARD", hotspot: "BONG_SIK",
    requires: { flagsNone: ["BONG_SIK_TALKED"] },
    setFlags: ["BONG_SIK_TALKED"],
    log: { role: "BONG-SIK", text: "'분대장님, 형들이 농로로 갔어요.  저도 가야 돼요.'", kind: "voice" },
    turnCost: 1,
  },
  {
    id: "yard.bongsik.second",
    scene: "YARD", hotspot: "BONG_SIK",
    requires: { flag: "BONG_SIK_TALKED", flagsNone: ["BONG_SIK_LEFT"] },
    setFlags: ["BONG_SIK_LEFT"],
    log: { role: "BONG-SIK", text: "'…아니에요.  됐어요.'  He leaves before you can stop him.", kind: "danger" },
    turnCost: 3,
    once: true,
  },
  {
    id: "yard.gate.locked",
    scene: "YARD", hotspot: "GATE",
    requires: { flagsNone: ["RADIO_TUNED"] },
    log: { role: "SYSTEM", text: "The fog is too thick to risk it without coordinates.", kind: "default" },
    turnCost: 0,
  },
  {
    id: "yard.gate.open",
    scene: "YARD", hotspot: "GATE",
    requires: { flag: "RADIO_TUNED" },
    moveTo: "FIELD",
    log: { role: "SYSTEM", text: "You step through the gate.  The fog parts, briefly.", kind: "system" },
    turnCost: 1,
  },

  // --- FIELD -------------------------------------------------------------
  {
    id: "field.cow.magnifier",
    scene: "FIELD", hotspot: "COW",
    requires: { item: "MAGNIFIER", flagsNone: ["COW_INSPECTED"] },
    setFlags: ["COW_INSPECTED"],
    log: { role: "SYSTEM", text: "Under magnification: an Ω burned into the hide, with smaller letters around it that are not Greek.", kind: "omega" },
    once: true,
  },
  {
    id: "field.cow.idle",
    scene: "FIELD", hotspot: "COW",
    log: { role: "SYSTEM", text: "A mutilated cow.  The blood seems to have evaporated.  The flies will not land.", kind: "default" },
    turnCost: 0,
  },
  {
    id: "field.plate.found",
    scene: "FIELD", hotspot: "PLATE_DIRT",
    requires: { flag: "COW_INSPECTED", turnLte: 16, flagsNone: ["PLATE_TAKEN", "PLATE_LOST"] },
    grants: ["LICENSE_PLATE"],
    setFlags: ["PLATE_TAKEN"],
    log: { role: "SYSTEM", text: "Half-buried beside the cow: a license plate.  'HOPO 4-9'.", kind: "system" },
    once: true,
  },
  {
    id: "field.plate.lost",
    scene: "FIELD", hotspot: "PLATE_DIRT",
    requires: { turnGte: 17, flagsNone: ["PLATE_TAKEN", "PLATE_LOST"] },
    destroys: ["LICENSE_PLATE"],
    setFlags: ["PLATE_LOST"],
    log: { role: "SYSTEM", text: "Crows lift off as you approach.  Whatever was here, they've taken it.", kind: "danger" },
    once: true,
  },
  {
    id: "field.plate.empty",
    scene: "FIELD", hotspot: "PLATE_DIRT",
    log: { role: "SYSTEM", text: "Disturbed soil.  Nothing left.", kind: "default" },
    turnCost: 0,
  },
  {
    id: "field.forest.locked",
    scene: "FIELD", hotspot: "FOREST_EDGE",
    requires: { flagsNone: ["COW_INSPECTED"] },
    log: { role: "SYSTEM", text: "You don't go into a forest until you understand the field.", kind: "default" },
    turnCost: 0,
  },
  {
    id: "field.forest.enter",
    scene: "FIELD", hotspot: "FOREST_EDGE",
    requires: { flag: "COW_INSPECTED" },
    moveTo: "FOREST",
    log: { role: "SYSTEM", text: "You step under the pines.  The fog has a temperature.", kind: "system" },
    turnCost: 1,
  },

  // --- FOREST ------------------------------------------------------------
  {
    id: "forest.fog.burn",
    scene: "FOREST", hotspot: "FOG_WALL",
    requires: { item: "LIGHTER", has: ["FIELD_REPORT_P1"], flagsNone: ["FOG_BURNED"] },
    consumes: [],
    setFlags: ["FOG_BURNED"],
    log: { role: "SYSTEM", text: "Page 1 catches.  The fog reels back from the flame as if it could feel it.", kind: "omega" },
    once: true,
  },
  {
    id: "forest.fog.idle",
    scene: "FOREST", hotspot: "FOG_WALL",
    log: { role: "SYSTEM", text: "The fog is solid.  Not a substance — a refusal.", kind: "default" },
    turnCost: 0,
  },
  {
    // Apostate prelude: walk into the clearing with TRANSLATOR equipped → you
    // hesitate, you read the air, you choose not to save him.  This is the
    // first of the three Ending D triggers; it is intentionally not signposted.
    id: "forest.clearing.apostate-step",
    scene: "FOREST", hotspot: "CLEARING",
    requires: { item: "TRANSLATOR_FRAG", flag: "FOG_BURNED", flagsNone: ["CLEARING_DONE", "BONG_SIK_SAVED"] },
    setFlags: ["APOSTATE_STEP_1", "CLEARING_DONE"],
    log: { role: "SYSTEM", text: "You hold the Greek card up to the light.  You do not move toward him.", kind: "omega" },
    turnCost: 1,
    once: true,
  },
  {
    id: "forest.clearing.save",
    scene: "FOREST", hotspot: "CLEARING",
    requires: { flag: "FOG_BURNED", turnLte: 19, flagsNone: ["CLEARING_DONE"] },
    grants: ["OMEGA_MARK"],
    setFlags: ["CLEARING_DONE", "BONG_SIK_SAVED"],
    triggersEnding: "C",
    log: { role: "SYSTEM", text: "Bong-sik is standing in the clearing — smiling wrong.  You pull him back by the collar.  The Ω falls into your palm.", kind: "system" },
    once: true,
  },
  {
    id: "forest.clearing.late",
    scene: "FOREST", hotspot: "CLEARING",
    requires: { flag: "FOG_BURNED", turnGte: 20, flagsNone: ["CLEARING_DONE"] },
    setFlags: ["CLEARING_DONE"],
    triggersEnding: "A",
    log: { role: "SUNG-KI", text: "'…아이복판이 죽어 있냐 씨.'", kind: "danger" },
    once: true,
  },
  {
    id: "forest.coast.open",
    scene: "FOREST", hotspot: "COAST_PATH",
    requires: { flag: "FOG_BURNED", flagsNone: ["COAST_OPEN"] },
    setFlags: ["COAST_OPEN"],
    log: { role: "SYSTEM", text: "A path you didn't see before.  It goes seaward.", kind: "omega" },
    once: true,
  },
  {
    id: "forest.coast.enter",
    scene: "FOREST", hotspot: "COAST_PATH",
    requires: { flag: "COAST_OPEN" },
    moveTo: "COAST",
    log: { role: "SYSTEM", text: "You follow the path seaward.", kind: "system" },
    turnCost: 1,
  },

  // --- COAST (hidden Ending D path) -------------------------------------
  // Step 2 of three: study the inscription *first*, before approaching the
  // hatch.  Order matters.  Inspecting in the wrong sequence does nothing.
  {
    id: "coast.inscription.read",
    scene: "COAST", hotspot: "INSCRIPTION",
    requires: { item: "TRANSLATOR_FRAG", flag: "APOSTATE_STEP_1", flagsNone: ["APOSTATE_STEP_2"] },
    setFlags: ["APOSTATE_STEP_2"],
    log: { role: "OMEGA", text: "The card refuses to fit.  The letters lean the wrong way — and yet you understand half of one word.", kind: "omega" },
    turnCost: 0,
    once: true,
  },
  {
    id: "coast.inscription.idle",
    scene: "COAST", hotspot: "INSCRIPTION",
    log: { role: "SYSTEM", text: "Letters that lean the wrong way.  Pages 2 and 3 would have helped.", kind: "default" },
    turnCost: 0,
  },
  // Step 3 (final) of three: open the hatch with Slime smeared on the wheel
  // — and only after step 2 has been read.
  {
    id: "coast.hatch.apostate",
    scene: "COAST", hotspot: "HATCH",
    requires: {
      item: "GREEN_SLIME",
      has: ["TRANSLATOR_FRAG"],
      flagsAll: ["APOSTATE_STEP_1", "APOSTATE_STEP_2"],
      flagsNone: ["BONG_SIK_SAVED"],
    },
    consumes: [],
    grants: ["OMEGA_MARK_APOSTATE"],
    triggersEnding: "D",
    log: { role: "OMEGA", text: "The hatch reads you back.  It is not Greek.  It is older, and it knows you left him.", kind: "omega" },
    once: true,
  },
  {
    // Half-knowing attempt — gives a one-line hint without firing the ending.
    id: "coast.hatch.hint",
    scene: "COAST", hotspot: "HATCH",
    requires: { has: ["TRANSLATOR_FRAG"], flag: "APOSTATE_STEP_1", flagsNone: ["APOSTATE_STEP_2", "BONG_SIK_SAVED"] },
    log: { role: "SYSTEM", text: "The wheel does not turn.  The inscription is watching.", kind: "default" },
    turnCost: 1,
  },
  {
    id: "coast.hatch.locked",
    scene: "COAST", hotspot: "HATCH",
    log: { role: "SYSTEM", text: "The hatch is heavier than the world.  Something is missing.", kind: "default" },
    turnCost: 0,
  },
];

// ── Convenience: starting state ─────────────────────────────────────────
export const INITIAL_LOGS = [
  { turn: 1, role: "SYSTEM", text: "1983.08.◯◯ · 18:40 · ω-channel synced.", kind: "system" as const },
  { turn: 1, role: "BUM-SEOK", text: "'We are completely blocked.  No phones, no police radios.  Keep your eyes open.'", kind: "voice" as const },
  { turn: 1, role: "TUTORIAL", text: "Move between rooms · equip items on the deck · click hotspots to act.", kind: "default" as const },
];

export const INITIAL_SCENE: SceneId = "OFFICE";
