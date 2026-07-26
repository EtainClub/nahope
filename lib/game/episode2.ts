// Episode 2 — "The Hunt Reverses"
// A game adaptation of the film's mountain-search and Kali revelation.

import type {
  EndingDescriptor,
  EndingId,
  GameDefinition,
  Interaction,
  Item,
  Scene,
  SceneId,
} from "./types";

export const EP2_MAX_TURNS = 34;

export const EP2_ITEMS: Record<string, Item> = {
  CASE_FILE: { id: "CASE_FILE", name: "Bum-seok's Case File", short: "Not a tiger. The first wounded subject cried before it died.", art: "/images/game/ep1/items/case_file.svg" },
  CAMERA: { id: "CAMERA", name: "Police Evidence Camera", short: "The remaining frames must establish cause, not merely damage.", art: "/images/game/ep1/items/camera.svg" },
  SEARCH_MAP: { id: "SEARCH_MAP", name: "Mountain Search Map", short: "Sung-ki's sweep line and every known road out of the basin.", art: "/images/game/ep2/items/search_map.svg" },
  TRAUMA_KIT: { id: "TRAUMA_KIT", name: "Sung-ae's Trauma Kit", short: "Bandages, forceps, and a field card for distinguishing wounds.", art: "/images/game/ep2/items/trauma_kit.svg" },
  CEASEFIRE_FLARE: { id: "CEASEFIRE_FLARE", name: "Ceasefire Flare", short: "A red signal Sung-ae orders the hunters not to fire through.", art: "/images/game/ep2/items/ceasefire_flare.svg" },
  HUNTING_AMMO: { id: "HUNTING_AMMO", name: "Hunter Ammunition", short: "A fast answer to a question nobody has understood.", art: "/images/game/ep2/items/hunting_ammo.svg", losable: true },
  WORKSHOP_KEY: { id: "WORKSHOP_KEY", name: "Cold-room Key", short: "Found behind the blank face of one of Yang-bae's mannequins.", art: "/images/game/ep2/items/workshop_clue.svg" },
  MANNEQUIN_TAG: { id: "MANNEQUIN_TAG", name: "Mud-stained Mannequin Tag", short: "Pine resin and silver-grey soil cling to the carpenter's inventory tag.", art: "/images/game/ep2/items/workshop_clue.svg" },
  KALI_PHOTO: { id: "KALI_PHOTO", name: "Kali Evidence Photograph", short: "A small childlike body in a freezer, killed by a human bullet.", art: "/images/game/ep2/items/kali_photo.svg", artifact: true },
  SPENT_CASING: { id: "SPENT_CASING", name: "Spent Hunting Casing", short: "The firing-pin mark matches Yang-bae's hunting gun.", art: "/images/game/ep2/items/workshop_clue.svg" },
  YANGBAE_STATEMENT: { id: "YANGBAE_STATEMENT", name: "Yang-bae's Statement", short: "He saw something small in the forest, fired without warning, and hid it in the freezer.", art: "/images/game/ep2/items/report.svg", artifact: true },
  MULTI_TRACK_SKETCH: { id: "MULTI_TRACK_SKETCH", name: "Multiple-subject Track Sketch", short: "Several anatomies crossed the same trail from one impact basin.", art: "/images/game/ep2/items/search_map.svg" },
  HULL_FRAGMENT: { id: "HULL_FRAGMENT", name: "Silver Hull Fragment", short: "Metal folded outward by a crash, not arranged for an invasion landing.", art: "/images/game/ep2/items/hull_fragment.svg", artifact: true },
  FIRST_SHOT_REPORT: { id: "FIRST_SHOT_REPORT", name: "First-shot Causality Report", short: "The royal survivors searched for Kali; Yang-bae's bullet came before their encirclement.", art: "/images/game/ep2/items/report.svg", artifact: true },
  EVAC_ROUTE: { id: "EVAC_ROUTE", name: "Forest Withdrawal Route", short: "A flare-marked path that extracts the hunters without firing through the encirclement.", art: "/images/game/ep2/items/search_map.svg", artifact: true },
};

export const EP2_SCENES: Record<string, Scene> = {
  EP2_RUINS: {
    id: "EP2_RUINS",
    title: "Hopo Port · Triage Line",
    ambient: "Bamigir is down. Sung-ae treats the living while Sung-ki prepares to sweep the mountain.",
    art: "/images/game/ep2/ruins.svg",
    exits: ["EP2_WORKSHOP"],
    hotspots: [
      { id: "COMMAND_POST", label: "Search Command Post", top: "10%", left: "6%", width: "30%", height: "32%" },
      { id: "SUNG_AE", label: "Sung-ae · Field Triage", top: "35%", left: "58%", width: "18%", height: "45%" },
      { id: "BAMIGIR", label: "Bamigir Aftermath", top: "56%", left: "18%", width: "28%", height: "28%" },
      { id: "AMMO_CRATE", label: "Hunter Ammunition", top: "68%", left: "78%", width: "16%", height: "22%" },
    ],
  },
  EP2_WORKSHOP: {
    id: "EP2_WORKSHOP",
    title: "Hopo Port · Yang-bae's Workshop",
    ambient: "Unfinished mannequins face a humming cold-room door. Yang-bae will not meet your eyes.",
    art: "/images/game/ep2/workshop.svg",
    exits: ["EP2_RUINS", "EP2_FREEZER", "EP2_TRAIL"],
    hotspots: [
      { id: "MANNEQUINS", label: "Mannequin Row", top: "12%", left: "6%", width: "30%", height: "58%" },
      { id: "FREEZER_DOOR", label: "Locked Cold Room", top: "18%", left: "68%", width: "22%", height: "55%" },
      { id: "YANGBAE", label: "Yang-bae · Carpenter", top: "45%", left: "42%", width: "16%", height: "42%" },
      { id: "WALL_MAP", label: "Carpenter's Delivery Map", top: "8%", left: "40%", width: "20%", height: "25%" },
    ],
  },
  EP2_FREEZER: {
    id: "EP2_FREEZER",
    title: "Workshop · Cold Room",
    ambient: "The compressor drowns the village outside. Something small lies beneath a canvas sheet.",
    art: "/images/game/ep2/freezer.svg",
    exits: ["EP2_WORKSHOP"],
    lockedUntil: "FREEZER_OPEN",
    hotspots: [
      { id: "KALI", label: "Covered Small Body", top: "34%", left: "24%", width: "38%", height: "42%" },
      { id: "FLOOR", label: "Frost beneath the Rack", top: "75%", left: "52%", width: "30%", height: "18%" },
      { id: "COMPRESSOR", label: "Cold-room Compressor", top: "10%", left: "70%", width: "20%", height: "35%" },
    ],
  },
  EP2_TRAIL: {
    id: "EP2_TRAIL",
    title: "Mountain Trail · Hunter Line",
    ambient: "Sung-ki's party moves uphill. Yang-bae knows this path better than he admitted.",
    art: "/images/game/ep2/trail.svg",
    exits: ["EP2_WORKSHOP", "EP2_WRECK"],
    lockedUntil: "TRAIL_OPEN",
    hotspots: [
      { id: "MUD", label: "Silver-grey Trail Mud", top: "66%", left: "8%", width: "28%", height: "22%" },
      { id: "TRACKS", label: "Overlapping Tracks", top: "52%", left: "42%", width: "28%", height: "30%" },
      { id: "HUNTERS", label: "Sung-ki's Hunters", top: "30%", left: "68%", width: "22%", height: "48%" },
      { id: "RIDGE_GLINT", label: "Glint beyond the Ridge", top: "6%", left: "35%", width: "28%", height: "25%" },
    ],
  },
  EP2_WRECK: {
    id: "EP2_WRECK",
    title: "Pine Basin · Silver Wreck",
    ambient: "A silver vessel has torn a trench through the forest. Tracks lead away from its ruptured hull.",
    art: "/images/game/ep2/wreck.svg",
    exits: ["EP2_TRAIL", "EP2_GLADE"],
    lockedUntil: "WRECK_OPEN",
    hotspots: [
      { id: "HULL", label: "Ruptured Silver Hull", top: "18%", left: "8%", width: "48%", height: "48%" },
      { id: "FOOTPRINTS", label: "Tracks from the Wreck", top: "66%", left: "50%", width: "30%", height: "22%" },
      { id: "OPEN_HATCH", label: "Child-sized Compartment", top: "25%", left: "62%", width: "24%", height: "30%" },
      { id: "DESCENT", label: "Voices below the Basin", top: "58%", left: "82%", width: "14%", height: "34%" },
    ],
  },
  EP2_GLADE: {
    id: "EP2_GLADE",
    title: "Deep Forest · Encirclement",
    ambient: "Three different figures surround the hunters. They speak to one another, but none has struck first.",
    art: "/images/game/ep2/glade.svg",
    exits: ["EP2_WRECK"],
    lockedUntil: "GLADE_OPEN",
    hotspots: [
      { id: "MAVEYYO", label: "Ma'veyyo · Royal Guard", top: "24%", left: "40%", width: "24%", height: "56%" },
      { id: "ROYAL_PAIR", label: "Zor and Aydobor", top: "12%", left: "6%", width: "28%", height: "52%" },
      { id: "ESCAPE_ROUTE", label: "Hunter Withdrawal Line", top: "70%", left: "68%", width: "28%", height: "22%" },
    ],
  },
};

export const EP2_ENDINGS: Record<EndingId, EndingDescriptor> = {
  A: {
    id: "A",
    title: "Ending A — The Hunt Reverses",
    body: "The search line advances under the old tiger story. In the mountain, Sung-ki's hunters discover that they were never the only ones following tracks.",
  },
  B: {
    id: "B",
    title: "Ending B — First Shot, Again",
    body: "Another human weapon answers a voice nobody understands. The royal survivors stop searching and Ma'veyyo begins the pursuit.",
    isRestart: true,
  },
  C: {
    id: "C",
    title: "Ending C — Break the Encirclement",
    body: "The flare holds the firing line long enough to withdraw Sung-ki's hunters. Hopo survives the encounter knowing the vessel crashed and the strangers were searching for a child.",
    grantsArtifacts: ["EVAC_ROUTE", "HULL_FRAGMENT", "FIRST_SHOT_REPORT"],
    unlocksNextEpisode: true,
  },
  D: {
    id: "D",
    title: "Ending D — The Child in the Freezer",
    body: "Yang-bae's statement, Kali's photograph, and the wreck establish the first causal chain Hopo cannot bear to read: a human bullet preceded the royal survivors' violence.",
    grantsArtifacts: ["KALI_PHOTO", "YANGBAE_STATEMENT", "FIRST_SHOT_REPORT"],
    unlocksNextEpisode: true,
  },
};

export const EP2_INTERACTIONS: Interaction[] = [
  // TRIAGE LINE
  {
    id: "ep2.ruins.command.open", scene: "EP2_RUINS", hotspot: "COMMAND_POST", requires: { flagsNone: ["SEARCH_OPENED"] },
    grants: ["SEARCH_MAP", "CAMERA"], setFlags: ["SEARCH_OPENED"],
    log: { role: "BUM-SEOK", text: "The mountain sweep begins with a map and an evidence camera. No one fires at a silhouette.", kind: "system" }, once: true,
  },
  { id: "ep2.ruins.command.idle", scene: "EP2_RUINS", hotspot: "COMMAND_POST", log: { role: "SYSTEM", text: "Sung-ki's search line is marked, but the reason for the visitors' movement is still blank.", kind: "default" }, turnCost: 0 },
  {
    id: "ep2.ruins.sungae.prepare", scene: "EP2_RUINS", hotspot: "SUNG_AE", requires: { flagsNone: ["TRIAGE_READY"] },
    grants: ["TRAUMA_KIT", "CEASEFIRE_FLARE"], setFlags: ["TRIAGE_READY"],
    log: { role: "SUNG-AE", text: "'I will keep the wounded breathing. Take the red flare—if it burns, every muzzle stays down.'", kind: "voice" }, once: true,
  },
  { id: "ep2.ruins.sungae.idle", scene: "EP2_RUINS", hotspot: "SUNG_AE", log: { role: "SUNG-AE", text: "'The village is not safe. It is only between attacks.'", kind: "default" }, turnCost: 0 },
  {
    id: "ep2.ruins.bamigir.photo", scene: "EP2_RUINS", hotspot: "BAMIGIR", requires: { item: "CAMERA", flagsNone: ["BAMIGIR_AFTERMATH"] },
    setFlags: ["BAMIGIR_AFTERMATH"],
    log: { role: "SYSTEM", text: "The frame records impact wounds, a missing leg, and tear tracks. Rage explains the damage no better than tiger did.", kind: "omega" }, once: true,
  },
  { id: "ep2.ruins.bamigir.idle", scene: "EP2_RUINS", hotspot: "BAMIGIR", log: { role: "BUM-SEOK", text: "'It was crying before the truck. Write that down before we decide what it was.'", kind: "default" }, turnCost: 0 },
  {
    id: "ep2.ruins.ammo.take", scene: "EP2_RUINS", hotspot: "AMMO_CRATE", requires: { flagsNone: ["AMMO_TAKEN"] }, grants: ["HUNTING_AMMO"], setFlags: ["AMMO_TAKEN"],
    log: { role: "SYSTEM", text: "Live hunting rounds. Useful against a threat; disastrous as a substitute for identifying one.", kind: "danger" }, once: true,
  },
  { id: "ep2.ruins.ammo.idle", scene: "EP2_RUINS", hotspot: "AMMO_CRATE", log: { role: "SYSTEM", text: "The empty crate is lighter than the decision it created.", kind: "default" }, turnCost: 0 },

  // YANG-BAE'S WORKSHOP
  {
    id: "ep2.workshop.mannequins.search", scene: "EP2_WORKSHOP", hotspot: "MANNEQUINS", requires: { flagsNone: ["MANNEQUINS_SEARCHED"] },
    grants: ["WORKSHOP_KEY", "MANNEQUIN_TAG"], setFlags: ["MANNEQUINS_SEARCHED"],
    log: { role: "SYSTEM", text: "A cold-room key is taped behind a mannequin face. Its stock tag carries pine resin and silver-grey mountain soil.", kind: "system" }, once: true,
  },
  { id: "ep2.workshop.mannequins.idle", scene: "EP2_WORKSHOP", hotspot: "MANNEQUINS", log: { role: "SYSTEM", text: "Blank human faces in rows. Yang-bae has practiced making bodies look harmless.", kind: "default" }, turnCost: 0 },
  {
    id: "ep2.workshop.freezer.open", scene: "EP2_WORKSHOP", hotspot: "FREEZER_DOOR", requires: { item: "WORKSHOP_KEY", flagsNone: ["FREEZER_OPEN"] },
    setFlags: ["FREEZER_OPEN"], moveTo: "EP2_FREEZER",
    log: { role: "SYSTEM", text: "The lock opens. Cold air carries the smell of pine soil and gun oil.", kind: "danger" }, once: true,
  },
  { id: "ep2.workshop.freezer.locked", scene: "EP2_WORKSHOP", hotspot: "FREEZER_DOOR", requires: { flagsNone: ["FREEZER_OPEN"] }, log: { role: "SYSTEM", text: "The cold room is locked. Yang-bae says the key was lost among his mannequins.", kind: "default" }, turnCost: 0 },
  {
    id: "ep2.workshop.yangbae.confess", scene: "EP2_WORKSHOP", hotspot: "YANGBAE", requires: { item: "SPENT_CASING", has: ["KALI_PHOTO"], flagsAll: ["BULLET_WOUND_CONFIRMED"], flagsNone: ["YANGBAE_CONFESSED"] },
    grants: ["YANGBAE_STATEMENT"], setFlags: ["YANGBAE_CONFESSED", "TRAIL_OPEN"],
    log: { role: "YANG-BAE", text: "'It was small. I saw it in the woods and just fired. Then I put it on ice. I did not know anyone would come looking.'", kind: "danger" }, once: true,
  },
  { id: "ep2.workshop.yangbae.idle", scene: "EP2_WORKSHOP", hotspot: "YANGBAE", log: { role: "YANG-BAE", text: "'Why are you looking at my freezer? There is nothing in there worth naming.'", kind: "default" }, turnCost: 0 },
  {
    id: "ep2.workshop.map.mark", scene: "EP2_WORKSHOP", hotspot: "WALL_MAP", requires: { item: "SEARCH_MAP", has: ["YANGBAE_STATEMENT"], flagsNone: ["ROUTE_MARKED"] },
    setFlags: ["ROUTE_MARKED"],
    log: { role: "SYSTEM", text: "Yang-bae's delivery marks overlap the place where he says he fired. Sung-ki's sweep is heading toward the same basin.", kind: "system" }, once: true,
  },
  { id: "ep2.workshop.map.idle", scene: "EP2_WORKSHOP", hotspot: "WALL_MAP", log: { role: "SYSTEM", text: "A carpenter's delivery route. It needs the official search map and an honest statement.", kind: "default" }, turnCost: 0 },

  // COLD ROOM
  {
    id: "ep2.freezer.kali.photo", scene: "EP2_FREEZER", hotspot: "KALI", requires: { item: "CAMERA", flagsNone: ["KALI_DOCUMENTED"] },
    grants: ["KALI_PHOTO"], setFlags: ["KALI_DOCUMENTED"],
    log: { role: "SYSTEM", text: "Beneath the canvas is a child-sized green body. The shutter fixes the fact Yang-bae tried to freeze outside time.", kind: "omega" }, once: true,
  },
  {
    id: "ep2.freezer.kali.examine", scene: "EP2_FREEZER", hotspot: "KALI", requires: { item: "TRAUMA_KIT", flag: "KALI_DOCUMENTED", flagsNone: ["BULLET_WOUND_CONFIRMED"] },
    setFlags: ["BULLET_WOUND_CONFIRMED"],
    log: { role: "SYSTEM", text: "Sung-ae's field card leaves no ambiguity: a single projectile entered before the body was frozen.", kind: "danger" }, once: true,
  },
  { id: "ep2.freezer.kali.idle", scene: "EP2_FREEZER", hotspot: "KALI", log: { role: "SYSTEM", text: "Small hands. No visible weapon. Document the body before deciding what it was.", kind: "default" }, turnCost: 0 },
  {
    id: "ep2.freezer.floor.casing", scene: "EP2_FREEZER", hotspot: "FLOOR", requires: { flagsNone: ["CASING_FOUND"] }, grants: ["SPENT_CASING"], setFlags: ["CASING_FOUND"],
    log: { role: "SYSTEM", text: "A spent hunting casing is frozen into runoff beneath the rack. The firing-pin mark is distinctive.", kind: "system" }, once: true,
  },
  { id: "ep2.freezer.floor.idle", scene: "EP2_FREEZER", hotspot: "FLOOR", log: { role: "SYSTEM", text: "Meltwater runs toward the door, carrying a trace Yang-bae missed.", kind: "default" }, turnCost: 0 },
  { id: "ep2.freezer.compressor", scene: "EP2_FREEZER", hotspot: "COMPRESSOR", log: { role: "SYSTEM", text: "The compressor has run for days. Kali was hidden before Bamigir reached the village.", kind: "omega" }, turnCost: 0 },

  // MOUNTAIN TRAIL
  {
    id: "ep2.trail.mud.compare", scene: "EP2_TRAIL", hotspot: "MUD", requires: { item: "MANNEQUIN_TAG", flagsAll: ["ROUTE_MARKED"], flagsNone: ["YANGBAE_PATH"] },
    setFlags: ["YANGBAE_PATH"],
    log: { role: "SYSTEM", text: "The tag's silver-grey soil is identical. Yang-bae carried something from this trail back to his workshop.", kind: "system" }, once: true,
  },
  { id: "ep2.trail.mud.idle", scene: "EP2_TRAIL", hotspot: "MUD", log: { role: "SYSTEM", text: "Unusual grey soil. Something from the workshop may connect Yang-bae to this route.", kind: "default" }, turnCost: 0 },
  {
    id: "ep2.trail.tracks.document", scene: "EP2_TRAIL", hotspot: "TRACKS", requires: { item: "CAMERA", flag: "YANGBAE_PATH", flagsNone: ["MULTIPLE_SUBJECTS"] },
    grants: ["MULTI_TRACK_SKETCH"], setFlags: ["MULTIPLE_SUBJECTS"],
    log: { role: "SYSTEM", text: "At least four anatomies crossed here: upright, hoof-like, clawed, and child-sized. This is not one beast's territory.", kind: "omega" }, once: true,
  },
  { id: "ep2.trail.tracks.idle", scene: "EP2_TRAIL", hotspot: "TRACKS", log: { role: "SYSTEM", text: "Too many overlapping impressions for the naked eye. Establish Yang-bae's path, then document them.", kind: "default" }, turnCost: 0 },
  {
    id: "ep2.trail.hunters.arm", scene: "EP2_TRAIL", hotspot: "HUNTERS", requires: { item: "HUNTING_AMMO", flagsNone: ["HUNTERS_WARNED"] }, destroys: ["HUNTING_AMMO"], triggersEnding: "B",
    log: { role: "SYSTEM", text: "The ammunition passes down the line. A voice sounds ahead; Yang-bae fires before Sung-ki can stop him.", kind: "danger" }, once: true,
  },
  {
    id: "ep2.trail.hunters.warn", scene: "EP2_TRAIL", hotspot: "HUNTERS", requires: { item: "YANGBAE_STATEMENT", flag: "MULTIPLE_SUBJECTS", flagsNone: ["HUNTERS_WARNED"] },
    setFlags: ["HUNTERS_WARNED"],
    log: { role: "SUNG-KI", text: "'Yang-bae fired first once already. Safeties on. We find out who followed that child before we make it happen again.'", kind: "voice" }, once: true,
  },
  { id: "ep2.trail.hunters.idle", scene: "EP2_TRAIL", hotspot: "HUNTERS", log: { role: "SYSTEM", text: "The hunters still think they are pursuing one creature. Bring them evidence before the ridge closes behind them.", kind: "default" }, turnCost: 0 },
  {
    id: "ep2.trail.glint.observe", scene: "EP2_TRAIL", hotspot: "RIDGE_GLINT", requires: { flagsAll: ["MULTIPLE_SUBJECTS", "HUNTERS_WARNED"], flagsNone: ["WRECK_OPEN"] },
    setFlags: ["WRECK_OPEN"],
    log: { role: "SYSTEM", text: "Beyond the ridge, sunlight runs across a silver structure far larger than any vehicle in Hopo.", kind: "omega" }, once: true,
  },
  { id: "ep2.trail.glint.idle", scene: "EP2_TRAIL", hotspot: "RIDGE_GLINT", log: { role: "SYSTEM", text: "Something reflects beyond the ridge. The search line is not ready to approach it armed and uninformed.", kind: "default" }, turnCost: 0 },

  // SILVER WRECK
  {
    id: "ep2.wreck.hull.inspect", scene: "EP2_WRECK", hotspot: "HULL", requires: { flagsNone: ["CRASH_CONFIRMED"] }, grants: ["HULL_FRAGMENT"], setFlags: ["CRASH_CONFIRMED"],
    log: { role: "SYSTEM", text: "Trees are sheared along the approach trench and the hull is folded outward. The vessel crashed; it did not land in formation.", kind: "system" }, once: true,
  },
  { id: "ep2.wreck.hull.idle", scene: "EP2_WRECK", hotspot: "HULL", log: { role: "SYSTEM", text: "The silver structure is damaged from within and without. Read the terrain before calling it an invasion craft.", kind: "default" }, turnCost: 0 },
  {
    id: "ep2.wreck.tracks.compare", scene: "EP2_WRECK", hotspot: "FOOTPRINTS", requires: { item: "MULTI_TRACK_SKETCH", flag: "CRASH_CONFIRMED", flagsNone: ["WRECK_SURVIVORS"] },
    setFlags: ["WRECK_SURVIVORS"],
    log: { role: "SYSTEM", text: "Every trail print begins at the ruptured vessel. The figures in the mountain are survivors of the same crash.", kind: "omega" }, once: true,
  },
  { id: "ep2.wreck.tracks.idle", scene: "EP2_WRECK", hotspot: "FOOTPRINTS", log: { role: "SYSTEM", text: "Several paths leave the wreck. Compare them with the documented trail anatomies.", kind: "default" }, turnCost: 0 },
  {
    id: "ep2.wreck.hatch.link", scene: "EP2_WRECK", hotspot: "OPEN_HATCH", requires: { item: "KALI_PHOTO", flag: "WRECK_SURVIVORS", flagsNone: ["KALI_LINKED"] },
    setFlags: ["KALI_LINKED"],
    log: { role: "BUM-SEOK", text: "'This compartment fits the child in Yang-bae's freezer. They did not come to Hopo looking for us. They are looking for Kali.'", kind: "omega" }, once: true,
  },
  { id: "ep2.wreck.hatch.idle", scene: "EP2_WRECK", hotspot: "OPEN_HATCH", log: { role: "SYSTEM", text: "A small restraint and an empty cradle. Evidence from the freezer could identify who is missing.", kind: "default" }, turnCost: 0 },
  {
    id: "ep2.wreck.descent.open", scene: "EP2_WRECK", hotspot: "DESCENT", requires: { flagsAll: ["KALI_LINKED", "HUNTERS_WARNED"], flagsNone: ["GLADE_OPEN"] }, setFlags: ["GLADE_OPEN"], moveTo: "EP2_GLADE",
    log: { role: "SYSTEM", text: "Sung-ki leads the hunters down with safeties engaged. Voices—structured, repeated, unanswered—rise from the glade.", kind: "danger" }, once: true,
  },
  { id: "ep2.wreck.descent.idle", scene: "EP2_WRECK", hotspot: "DESCENT", log: { role: "SYSTEM", text: "Figures wait below. Do not enter until the missing child and the first shot are connected.", kind: "default" }, turnCost: 0 },

  // ENCIRCLEMENT
  {
    id: "ep2.glade.maveyyo.observe", scene: "EP2_GLADE", hotspot: "MAVEYYO", requires: { flagsNone: ["NO_FIRST_STRIKE"] }, setFlags: ["NO_FIRST_STRIKE"],
    log: { role: "SYSTEM", text: "Ma'veyyo steps forward and speaks. Zor and Aydobor hold position. The hunters are surrounded, but the strangers do not strike first.", kind: "omega" }, turnCost: 0, once: true,
  },
  {
    id: "ep2.glade.maveyyo.fire", scene: "EP2_GLADE", hotspot: "MAVEYYO", requires: { item: "HUNTING_AMMO", flag: "NO_FIRST_STRIKE", flagsNone: ["CEASEFIRE_SIGNALED"] }, destroys: ["HUNTING_AMMO"], triggersEnding: "B",
    log: { role: "SYSTEM", text: "A rifle answers Ma'veyyo's voice. His body changes for pursuit, and the hunt reverses in a single shot.", kind: "danger" }, once: true,
  },
  {
    id: "ep2.glade.maveyyo.flare", scene: "EP2_GLADE", hotspot: "MAVEYYO", requires: { item: "CEASEFIRE_FLARE", flag: "NO_FIRST_STRIKE", flagsNone: ["CEASEFIRE_SIGNALED"] }, consumes: ["CEASEFIRE_FLARE"], setFlags: ["CEASEFIRE_SIGNALED"],
    log: { role: "SUNG-KI", text: "The red flare burns between both groups. Every human muzzle lowers. For one breath, nobody crosses the line.", kind: "system" }, once: true,
  },
  {
    id: "ep2.glade.maveyyo.kali", scene: "EP2_GLADE", hotspot: "MAVEYYO", requires: { item: "KALI_PHOTO", flagsAll: ["NO_FIRST_STRIKE", "CEASEFIRE_SIGNALED", "KALI_LINKED"], flagsNone: ["FIRST_SHOT_RECORDED"] },
    grants: ["FIRST_SHOT_REPORT"], setFlags: ["FIRST_SHOT_RECORDED"],
    log: { role: "SYSTEM", text: "Ma'veyyo recognizes Kali. The sound he makes is not a battle cry. The causal chain is finally visible: crash, missing child, human bullet, search, panic.", kind: "omega" }, once: true,
  },
  {
    id: "ep2.glade.maveyyo.truth", scene: "EP2_GLADE", hotspot: "MAVEYYO", requires: { item: "YANGBAE_STATEMENT", has: ["FIRST_SHOT_REPORT"], flagsAll: ["FIRST_SHOT_RECORDED", "CEASEFIRE_SIGNALED"] }, triggersEnding: "D",
    log: { role: "BUM-SEOK", text: "Bum-seok places Yang-bae's statement beside Kali's photograph. Hopo's report begins with the shot its own hunter fired.", kind: "omega" }, once: true,
  },
  { id: "ep2.glade.maveyyo.idle", scene: "EP2_GLADE", hotspot: "MAVEYYO", log: { role: "SYSTEM", text: "The royal guard watches the hunters and waits. Observation has bought seconds, not understanding.", kind: "default" }, turnCost: 0 },
  { id: "ep2.glade.royal.observe", scene: "EP2_GLADE", hotspot: "ROYAL_PAIR", log: { role: "SYSTEM", text: "Zor shields the smaller Aydobor. Their bodies and ranks differ, but both keep looking past the hunters toward Hopo.", kind: "omega" }, turnCost: 0 },
  {
    id: "ep2.glade.escape.route", scene: "EP2_GLADE", hotspot: "ESCAPE_ROUTE", requires: { item: "SEARCH_MAP", has: ["FIRST_SHOT_REPORT"], flagsAll: ["FIRST_SHOT_RECORDED", "CEASEFIRE_SIGNALED"], flagsNone: ["WITHDRAWAL_MARKED"] },
    grants: ["EVAC_ROUTE"], setFlags: ["WITHDRAWAL_MARKED"], triggersEnding: "C",
    log: { role: "SUNG-KI", text: "Sung-ki marks a withdrawal behind the flare. The hunters leave the encirclement without adding another body to the misunderstanding.", kind: "system" }, once: true,
  },
  { id: "ep2.glade.escape.idle", scene: "EP2_GLADE", hotspot: "ESCAPE_ROUTE", log: { role: "SYSTEM", text: "The withdrawal line crosses open ground. It needs a ceasefire signal and a complete cause report.", kind: "default" }, turnCost: 0 },
];

export const EP2_INITIAL_LOGS = [
  { turn: 1, role: "SYSTEM", text: "HOPO PORT · AFTER THE FIRST ATTACK · 13:42", kind: "system" as const },
  { turn: 1, role: "SUNG-AE", text: "'Bamigir is down. That does not mean it came alone.'", kind: "voice" as const },
  { turn: 1, role: "SUNG-KI", text: "'The tracks go into the mountain. We move before they circle back.'", kind: "voice" as const },
  { turn: 1, role: "TUTORIAL", text: "Establish cause before arming the search line. A second first shot ends the investigation.", kind: "default" as const },
];

export const EPISODE_2: GameDefinition = {
  id: "ep2",
  number: 2,
  version: 1,
  title: "The Hunt Reverses",
  headerLabel: "HOPO PORT · MOUNTAIN SEARCH",
  maxTurns: EP2_MAX_TURNS,
  storageKey: "hope-ep2-canon-v1-state",
  scenes: EP2_SCENES,
  sceneOrder: ["EP2_RUINS", "EP2_WORKSHOP", "EP2_FREEZER", "EP2_TRAIL", "EP2_WRECK", "EP2_GLADE"],
  items: EP2_ITEMS,
  interactions: EP2_INTERACTIONS,
  endings: EP2_ENDINGS,
  initialScene: "EP2_RUINS" as SceneId,
  initialLogs: EP2_INITIAL_LOGS,
  initialInventory: ["CASE_FILE"],
  waitText: "You wait. Sung-ki's search line climbs while the mountain answers with unfamiliar voices.",
  successfulEndings: ["C", "D"],
  caseRecord: {
    title: "Causality Record · Mountain Search",
    rows: [
      { label: "Preceding event", text: "Kali killed by a human projectile before the village attack", revealFlag: "BULLET_WOUND_CONFIRMED" },
      { label: "Search party", text: "multiple anatomies; one crashed vessel", revealFlag: "WRECK_SURVIVORS" },
      { label: "Missing subject", text: "child-sized compartment linked to Kali", revealFlag: "KALI_LINKED" },
      { label: "Contact behavior", text: "royal survivors spoke and held position before human fire", revealFlag: "NO_FIRST_STRIKE" },
    ],
    notes: [
      { text: "Yang-bae statement · fired without warning; concealed the body", revealFlag: "YANGBAE_CONFESSED" },
      { text: "causality note · humans were victims and unknowing aggressors", revealFlag: "FIRST_SHOT_RECORDED" },
    ],
  },
};
