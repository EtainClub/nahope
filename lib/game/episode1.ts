// Episode 1 — "The Hopo Tiger"
// A film-canon reconstruction of the first Hopo Port incident.

import type {
  EndingDescriptor,
  EndingId,
  GameDefinition,
  Interaction,
  Item,
  Scene,
  SceneId,
} from "./types";

// The intended route costs roughly 23 turns. Seven turns of slack preserve
// the Isaku-style pressure without making careful observation a trap.
export const MAX_TURNS = 30;

export const ITEMS: Record<string, Item> = {
  EQUIPMENT_KEY: { id: "EQUIPMENT_KEY", name: "Equipment Cabinet Key", short: "Tagged HOPO SUBSTATION. Returned after every shift.", art: "/images/game/ep1/items/equipment_key.svg" },
  DUTY_ROSTER: { id: "DUTY_ROSTER", name: "Resident Duty Roster", short: "Households, elders, and the eight reservists currently in Hopo Port.", art: "/images/game/ep1/items/duty_roster.svg" },
  CAMERA: { id: "CAMERA", name: "Police Evidence Camera", short: "One roll loaded. Photographs before conclusions.", art: "/images/game/ep1/items/camera.svg" },
  FIELD_RULER: { id: "FIELD_RULER", name: "Field Measuring Rule", short: "A folding rule marked in centimeters.", art: "/images/game/ep1/items/field_ruler.svg" },
  EVIDENCE_BAG: { id: "EVIDENCE_BAG", name: "Plaster Evidence Kit", short: "Canvas bag with plaster, water vial, and specimen envelopes.", art: "/images/game/ep1/items/evidence_bag.svg" },
  TIGER_GUIDE: { id: "TIGER_GUIDE", name: "Predator Field Guide", short: "Field notes compare wound spacing, prints, and feeding behavior.", art: "/images/game/ep1/items/tiger_guide.svg" },
  CARBINE_AMMO: { id: "CARBINE_AMMO", name: "Carbine Ammunition", short: "Live rounds. A conclusion made of brass and lead.", art: "/images/game/ep1/items/carbine_ammo.svg", losable: true },
  BINOCULARS: { id: "BINOCULARS", name: "Field Binoculars", short: "Military surplus. The right lens is chipped.", art: "/images/game/ep1/items/binoculars.svg" },
  COW_PHOTO: { id: "COW_PHOTO", name: "Carcass Photograph", short: "The hide is raked open, but no flesh has been eaten.", art: "/images/game/ep1/items/cow_photo.svg", artifact: true },
  WOUND_MEASUREMENTS: { id: "WOUND_MEASUREMENTS", name: "Wound Measurements", short: "Parallel wounds wider and higher than the field guide permits.", art: "/images/game/ep1/items/wound_measurements.svg" },
  SOIL_CAST: { id: "SOIL_CAST", name: "Unknown Track Cast", short: "A partial impression too deep for a tiger of any recorded size.", art: "/images/game/ep1/items/soil_cast.svg", artifact: true },
  ENCOUNTER_PHOTO: { id: "ENCOUNTER_PHOTO", name: "Bamigir Encounter Photograph", short: "The wounded sentry is crying. Bum-seok's rifle remains lowered.", art: "/images/game/ep1/items/encounter_photo.svg", artifact: true },
  CASE_FILE: { id: "CASE_FILE", name: "Unknown Subject Case File", short: "Official classification: not a tiger, motive unknown, threat moving toward Hopo Port.", art: "/images/game/ep1/items/case_file.svg", artifact: true },
  UNFIRED_CARTRIDGE: { id: "UNFIRED_CARTRIDGE", name: "Unfired Cartridge", short: "Bum-seok saw grief in the unknown subject and lowered the rifle.", art: "/images/game/ep1/items/unfired_cartridge.svg", artifact: true },
};

export const SCENES: Record<string, Scene> = {
  OFFICE: {
    id: "OFFICE", title: "Hopo Substation · Duty Room",
    ambient: "Daylight on old paperwork. Both the telephone and police radio are silent.",
    art: "/images/game/ep1/office.png", exits: ["ARMORY", "YARD"],
    hotspots: [
      { id: "DUTY_LOG", label: "Duty Log", top: "58%", left: "25%", width: "16%", height: "22%" },
      { id: "CAMERA_CABINET", label: "Evidence Cabinet", top: "62%", left: "0%", width: "10%", height: "18%" },
      { id: "RIFLE_RACK", label: "Service Carbine", top: "35%", left: "70%", width: "18%", height: "32%" },
      { id: "TELEPHONE", label: "Telephone", top: "75%", left: "32%", width: "14%", height: "16%" },
      { id: "RADIO", label: "Police Radio", top: "65%", left: "55%", width: "12%", height: "14%" },
    ],
  },
  ARMORY: {
    id: "ARMORY", title: "Hopo Substation · Equipment Room",
    ambient: "Survey tools, reserve ammunition, and yesterday's maintenance sheet.",
    art: "/images/game/ep1/armory.png", exits: ["OFFICE"],
    hotspots: [
      { id: "LOCKER", label: "Equipment Locker", top: "25%", left: "8%", width: "10%", height: "60%" },
      { id: "BEHIND_LOCKER", label: "Maintenance Sheet", top: "30%", left: "42%", width: "12%", height: "40%" },
      { id: "SHELF", label: "Field Shelf", top: "2%", left: "10%", width: "60%", height: "12%" },
    ],
  },
  YARD: {
    id: "YARD", title: "Hopo Substation · Front Yard",
    ambient: "Sung-gi and the village hunters wait beside the patrol car, already calling it a tiger.",
    art: "/images/game/ep1/yard.png", exits: ["OFFICE", "FIELD"],
    hotspots: [
      { id: "ANTENNA", label: "Radio Antenna", top: "10%", left: "70%", width: "16%", height: "60%" },
      { id: "SUNG_GI", label: "Sung-gi · Hunter", top: "55%", left: "45%", width: "12%", height: "40%" },
      { id: "PATROL_CAR", label: "Patrol Car", top: "60%", left: "5%", width: "16%", height: "32%" },
    ],
  },
  FIELD: {
    id: "FIELD", title: "Hopo Fields · Cattle Site",
    ambient: "A cow lies opened in broad daylight. Nothing has fed on it.",
    art: "/images/game/ep1/field.png", exits: ["YARD", "FOREST"],
    hotspots: [
      { id: "COW", label: "Cattle Carcass", top: "55%", left: "15%", width: "30%", height: "30%" },
      { id: "SOIL", label: "Compressed Soil", top: "80%", left: "70%", width: "16%", height: "16%" },
      { id: "FOREST_EDGE", label: "Pine Ridge", top: "10%", left: "70%", width: "20%", height: "40%" },
    ],
  },
  FOREST: {
    id: "FOREST", title: "Pine Ridge · Search Line",
    ambient: "Broken branches rise above a man's head. The tracks turn back toward the village.",
    art: "/images/game/ep1/forest.png", exits: ["FIELD", "COAST"], lockedUntil: "FOREST_AUTHORIZED",
    hotspots: [
      { id: "TRACKS", label: "Deep Tracks", top: "10%", left: "20%", width: "30%", height: "70%" },
      { id: "LOOKOUT", label: "Ridge Lookout", top: "30%", left: "50%", width: "20%", height: "40%" },
      { id: "DESCENT", label: "Descent to Hopo", top: "60%", left: "80%", width: "14%", height: "32%" },
    ],
  },
  COAST: {
    id: "COAST", title: "Hopo Port · Ruined Main Road",
    ambient: "Vehicles and walls lie wrecked in daylight. The wounded Bamigir is still moving.",
    art: "/images/game/ep1/coast.png", exits: ["FOREST"], lockedUntil: "ROAD_OPEN",
    hotspots: [
      { id: "WRECKAGE", label: "Impact Wreckage", top: "55%", left: "40%", width: "20%", height: "30%" },
      { id: "BAMIGIR", label: "Wounded Bamigir", top: "15%", left: "65%", width: "35%", height: "20%" },
    ],
  },
};

export const ENDINGS: Record<EndingId, EndingDescriptor> = {
  A: { id: "A", title: "Ending A — The Tiger Hunt", body: "The report says tiger. Sung-gi leads the young men into the forest with live ammunition. By the time Hopo learns the word was wrong, they have become the hunted." },
  B: { id: "B", title: "Ending B — Premature Fire", body: "Bum-seok fires before identifying the subject. The report becomes a weapon, and Hopo loses its only chance to understand why the wounded creature was crying.", isRestart: true },
  C: { id: "C", title: "Ending C — Unknown Subject", body: "The case file rejects the tiger theory, the elders are marked for evacuation, and Sung-gi's hunt is delayed. Hopo has not understood the visitor, but it has stopped pretending that it has.", grantsArtifacts: ["CASE_FILE", "COW_PHOTO", "SOIL_CAST"], unlocksNextEpisode: true },
  D: { id: "D", title: "Ending D — The Creature Was Crying", body: "Bum-seok records the wounded sentry's tears and the shot he chose not to fire. The evidence cannot prove innocence, but it destroys the comforting lie that Hopo faced a mindless beast.", grantsArtifacts: ["CASE_FILE", "ENCOUNTER_PHOTO", "UNFIRED_CARTRIDGE"], unlocksNextEpisode: true },
};

export const INTERACTIONS: Interaction[] = [
  // OFFICE
  {
    id: "office.case.compile", scene: "OFFICE", hotspot: "DUTY_LOG",
    requires: { item: "COW_PHOTO", has: ["SOIL_CAST", "WOUND_MEASUREMENTS"], flagsAll: ["EVAC_READY", "SIGNAL_EXTERNAL", "NOT_TIGER", "HELD_FIRE"], flagsNone: ["CASE_FILED"] },
    grants: ["CASE_FILE"], setFlags: ["CASE_FILED"], triggersEnding: "C",
    log: { role: "BUM-SEOK", text: "'Strike tiger from the report. Unknown subject. Protect the elders and keep Sung-gi out of that forest.'", kind: "system" }, once: true,
  },
  {
    id: "office.duty.open", scene: "OFFICE", hotspot: "DUTY_LOG", requires: { flagsNone: ["SHIFT_REVIEWED"] },
    grants: ["EQUIPMENT_KEY", "DUTY_ROSTER"], setFlags: ["SHIFT_REVIEWED"],
    log: { role: "SYSTEM", text: "Eight reservists are away at the wildfire. The roster leaves mostly elders in Hopo. The cabinet key is clipped inside.", kind: "system" }, once: true,
  },
  { id: "office.duty.idle", scene: "OFFICE", hotspot: "DUTY_LOG", log: { role: "SYSTEM", text: "The blank incident line waits for a noun. Tiger is only Sung-gi's guess.", kind: "default" }, turnCost: 0 },
  {
    id: "office.camera.open", scene: "OFFICE", hotspot: "CAMERA_CABINET", requires: { item: "EQUIPMENT_KEY", flagsNone: ["CAMERA_TAKEN"] },
    grants: ["CAMERA"], setFlags: ["CAMERA_TAKEN"], log: { role: "SYSTEM", text: "Evidence camera, one roll. The label says: photograph before moving anything.", kind: "system" }, once: true,
  },
  { id: "office.camera.locked", scene: "OFFICE", hotspot: "CAMERA_CABINET", requires: { flagsNone: ["CAMERA_TAKEN"] }, log: { role: "SYSTEM", text: "Locked. The duty officer keeps the key with the roster.", kind: "default" } },
  { id: "office.camera.empty", scene: "OFFICE", hotspot: "CAMERA_CABINET", log: { role: "SYSTEM", text: "The evidence cabinet is empty.", kind: "default" }, turnCost: 0 },
  {
    id: "office.rifle.load", scene: "OFFICE", hotspot: "RIFLE_RACK", requires: { item: "CARBINE_AMMO" }, destroys: ["CARBINE_AMMO"], triggersEnding: "B",
    log: { role: "SYSTEM", text: "A round chambers. Movement crosses the window. Bum-seok fires before the shape has a name; the shot disappears into Hopo and the pursuit begins.", kind: "danger" }, once: true,
  },
  { id: "office.rifle.idle", scene: "OFFICE", hotspot: "RIFLE_RACK", log: { role: "BUM-SEOK", text: "'A dead cow is evidence. It is not permission to shoot the next thing that moves.'", kind: "voice" }, turnCost: 0 },
  {
    id: "office.telephone.check", scene: "OFFICE", hotspot: "TELEPHONE", requires: { flagsNone: ["LANDLINE_CHECKED"] }, setFlags: ["LANDLINE_CHECKED"],
    log: { role: "SYSTEM", text: "No dial tone. The line is intact inside the room; the failure lies beyond the substation.", kind: "system" }, turnCost: 0, once: true,
  },
  { id: "office.telephone.idle", scene: "OFFICE", hotspot: "TELEPHONE", log: { role: "SYSTEM", text: "The receiver carries only the room's own silence.", kind: "default" }, turnCost: 0 },
  {
    id: "office.radio.check", scene: "OFFICE", hotspot: "RADIO", requires: { flagsNone: ["RADIO_CHECKED"] }, setFlags: ["RADIO_CHECKED"],
    log: { role: "RADIO", text: "The set powers on. No carrier, no district station, no wildfire crews. Communications are severed beyond Hopo.", kind: "danger" }, turnCost: 0, once: true,
  },
  { id: "office.radio.idle", scene: "OFFICE", hotspot: "RADIO", log: { role: "RADIO", text: "Dead air. Not static—absence.", kind: "default" }, turnCost: 0 },

  // EQUIPMENT ROOM
  {
    id: "armory.locker.open", scene: "ARMORY", hotspot: "LOCKER", requires: { item: "EQUIPMENT_KEY", flagsNone: ["LOCKER_OPEN"] },
    grants: ["FIELD_RULER", "EVIDENCE_BAG", "CARBINE_AMMO"], setFlags: ["LOCKER_OPEN"],
    log: { role: "SYSTEM", text: "A measuring rule, plaster kit, and sealed carbine ammunition. Observation and force stored on the same shelf.", kind: "system" }, once: true,
  },
  { id: "armory.locker.closed", scene: "ARMORY", hotspot: "LOCKER", requires: { flagsNone: ["LOCKER_OPEN"] }, log: { role: "SYSTEM", text: "The equipment locker is locked.", kind: "default" } },
  { id: "armory.locker.empty", scene: "ARMORY", hotspot: "LOCKER", log: { role: "SYSTEM", text: "Only empty hooks remain.", kind: "default" }, turnCost: 0 },
  {
    id: "armory.maintenance.read", scene: "ARMORY", hotspot: "BEHIND_LOCKER", requires: { flag: "LOCKER_OPEN", flagsNone: ["FEED_LINE_SERVICED"] }, setFlags: ["FEED_LINE_SERVICED"],
    log: { role: "SYSTEM", text: "Maintenance sheet: radio feed line and antenna tested yesterday. Both passed.", kind: "system" }, turnCost: 0, once: true,
  },
  { id: "armory.maintenance.blocked", scene: "ARMORY", hotspot: "BEHIND_LOCKER", log: { role: "SYSTEM", text: "The sheet is pinned behind the locker door.", kind: "default" }, turnCost: 0 },
  {
    id: "armory.shelf.take", scene: "ARMORY", hotspot: "SHELF", requires: { flagsNone: ["FIELD_GEAR_TAKEN"] }, grants: ["TIGER_GUIDE", "BINOCULARS"], setFlags: ["FIELD_GEAR_TAKEN"],
    log: { role: "SYSTEM", text: "A predator guide and chipped binoculars. The tiger diagrams are smaller than Sung-gi's story.", kind: "system" }, once: true,
  },
  { id: "armory.shelf.empty", scene: "ARMORY", hotspot: "SHELF", log: { role: "SYSTEM", text: "Dust outlines the gear you removed.", kind: "default" }, turnCost: 0 },

  // YARD
  {
    id: "yard.sunggi.arm", scene: "YARD", hotspot: "SUNG_GI", requires: { item: "CARBINE_AMMO", flagsNone: ["HUNT_DEPARTED"] }, consumes: ["CARBINE_AMMO"], setFlags: ["HUNT_DEPARTED"], triggersEnding: "A",
    log: { role: "SUNG-GI", text: "'Tiger, bear, whatever. We have rifles.' Sung-gi takes the ammunition and leads the young men into the pines.", kind: "danger" }, once: true,
  },
  {
    id: "yard.sunggi.compare", scene: "YARD", hotspot: "SUNG_GI", requires: { item: "TIGER_GUIDE", flag: "SUNGGI_STATEMENT", flagsNone: ["HUNT_DELAYED"] }, setFlags: ["HUNT_DELAYED", "NO_FEEDING_REPORTED"],
    log: { role: "SUNG-GI", text: "'Fine. It clawed the cow, but it didn't eat a bite. We'll wait until you see it.'", kind: "voice" }, once: true,
  },
  {
    id: "yard.sunggi.statement", scene: "YARD", hotspot: "SUNG_GI", requires: { flagsNone: ["SUNGGI_STATEMENT"] }, setFlags: ["SUNGGI_STATEMENT"],
    log: { role: "SUNG-GI", text: "'Something tore up a cow by the millet field. Looks like a tiger, but the marks are too high.'", kind: "voice" }, once: true,
  },
  { id: "yard.sunggi.waits", scene: "YARD", hotspot: "SUNG_GI", log: { role: "SUNG-GI", text: "'Bring me a fact, hyung. Then decide what we are hunting.'", kind: "default" }, turnCost: 0 },
  {
    id: "yard.antenna.trace", scene: "YARD", hotspot: "ANTENNA", requires: { flagsAll: ["RADIO_CHECKED", "FEED_LINE_SERVICED"], flagsNone: ["SIGNAL_EXTERNAL"] }, setFlags: ["SIGNAL_EXTERNAL"],
    log: { role: "SYSTEM", text: "The antenna and feed line are undamaged. Hopo is isolated, but the substation equipment did not cause it.", kind: "danger" }, turnCost: 0, once: true,
  },
  { id: "yard.antenna.idle", scene: "YARD", hotspot: "ANTENNA", log: { role: "SYSTEM", text: "The mast is upright. Check the set and its maintenance history before blaming the hardware.", kind: "default" }, turnCost: 0 },
  {
    id: "yard.car.evacuate", scene: "YARD", hotspot: "PATROL_CAR", requires: { item: "DUTY_ROSTER", flagsAll: ["FIGURE_SEEN", "HELD_FIRE", "NOT_TIGER"], flagsNone: ["EVAC_READY"] }, setFlags: ["EVAC_READY"],
    log: { role: "BUM-SEOK", text: "'Circle the elder households. No siren. Move everyone to the concrete clinic before panic names this thing for us.'", kind: "system" }, once: true,
  },
  { id: "yard.car.idle", scene: "YARD", hotspot: "PATROL_CAR", log: { role: "SYSTEM", text: "The patrol car can carry a warning or spread a panic. It needs a plan and a roster.", kind: "default" }, turnCost: 0 },

  // FIELD
  {
    id: "field.cow.photo", scene: "FIELD", hotspot: "COW", requires: { item: "CAMERA", flagsNone: ["COW_PHOTOGRAPHED"] }, grants: ["COW_PHOTO"], setFlags: ["COW_PHOTOGRAPHED"],
    log: { role: "SYSTEM", text: "The shutter records parallel wounds and an untouched carcass. Whatever killed the cow did not feed.", kind: "system" }, once: true,
  },
  {
    id: "field.cow.measure", scene: "FIELD", hotspot: "COW", requires: { item: "FIELD_RULER", flag: "COW_PHOTOGRAPHED", flagsNone: ["WOUNDS_MEASURED"] }, grants: ["WOUND_MEASUREMENTS"], setFlags: ["WOUNDS_MEASURED"],
    log: { role: "SYSTEM", text: "The wound span exceeds the largest tiger diagram. The highest strike landed above a standing man's shoulder.", kind: "danger" }, once: true,
  },
  {
    id: "field.cow.compare", scene: "FIELD", hotspot: "COW", requires: { item: "TIGER_GUIDE", has: ["WOUND_MEASUREMENTS"], flagsAll: ["NO_FEEDING_REPORTED"], flagsNone: ["NOT_TIGER"] }, setFlags: ["NOT_TIGER", "FOREST_AUTHORIZED"],
    log: { role: "BUM-SEOK", text: "'It did not feed. Wrong height, wrong span. Write unknown subject—not tiger.'", kind: "system" }, once: true,
  },
  { id: "field.cow.idle", scene: "FIELD", hotspot: "COW", log: { role: "SYSTEM", text: "The cow was killed with overwhelming force. A guess will not explain why it was left uneaten.", kind: "default" }, turnCost: 0 },
  {
    id: "field.soil.cast", scene: "FIELD", hotspot: "SOIL", requires: { item: "EVIDENCE_BAG", flag: "COW_PHOTOGRAPHED", flagsNone: ["SOIL_CAST_TAKEN"] }, grants: ["SOIL_CAST"], setFlags: ["SOIL_CAST_TAKEN"],
    log: { role: "SYSTEM", text: "The plaster hardens around a partial track. Its depth suggests a mass no local predator could carry.", kind: "system" }, once: true,
  },
  { id: "field.soil.idle", scene: "FIELD", hotspot: "SOIL", log: { role: "SYSTEM", text: "Compressed earth, not a clean print. Preserve it before comparing it.", kind: "default" }, turnCost: 0 },
  { id: "field.forest.enter", scene: "FIELD", hotspot: "FOREST_EDGE", requires: { flag: "FOREST_AUTHORIZED" }, moveTo: "FOREST", log: { role: "SYSTEM", text: "You enter the pines only after striking tiger from the report.", kind: "system" } },
  { id: "field.forest.locked", scene: "FIELD", hotspot: "FOREST_EDGE", log: { role: "SYSTEM", text: "Do not send another armed man into the trees until the carcass contradicts the tiger story.", kind: "default" }, turnCost: 0 },

  // FOREST
  {
    id: "forest.tracks.compare", scene: "FOREST", hotspot: "TRACKS", requires: { item: "SOIL_CAST", flagsNone: ["TRACK_COMPARED"] }, setFlags: ["TRACK_COMPARED"],
    log: { role: "SYSTEM", text: "The field impression matches. The stride crosses broken branches at human head height, then turns back toward Hopo.", kind: "danger" }, once: true,
  },
  { id: "forest.tracks.idle", scene: "FOREST", hotspot: "TRACKS", log: { role: "SYSTEM", text: "Deep, incomplete impressions. A cast from the field would establish whether the same subject made them.", kind: "default" }, turnCost: 0 },
  {
    id: "forest.lookout.fire", scene: "FOREST", hotspot: "LOOKOUT", requires: { item: "CARBINE_AMMO", flag: "FIGURE_SEEN", flagsNone: ["HELD_FIRE"] }, destroys: ["CARBINE_AMMO"], triggersEnding: "B",
    log: { role: "SYSTEM", text: "Bum-seok fires at the moving outline before identifying it. The subject vanishes into Hopo, and fear becomes the only evidence left.", kind: "danger" }, once: true,
  },
  {
    id: "forest.lookout.observe", scene: "FOREST", hotspot: "LOOKOUT", requires: { item: "BINOCULARS", flag: "TRACK_COMPARED", flagsNone: ["FIGURE_SEEN"] }, setFlags: ["FIGURE_SEEN"],
    log: { role: "SYSTEM", text: "An immense upright figure crosses the road below. It is moving toward Hopo, not hiding in the forest.", kind: "omega" }, once: true,
  },
  {
    id: "forest.lookout.hold", scene: "FOREST", hotspot: "LOOKOUT", requires: { flag: "FIGURE_SEEN", flagsNone: ["HELD_FIRE"] }, grants: ["UNFIRED_CARTRIDGE"], setFlags: ["HELD_FIRE"],
    log: { role: "BUM-SEOK", text: "The subject turns. There is grief in its face. Bum-seok lowers the rifle before fear can become evidence.", kind: "omega" }, turnCost: 0, once: true,
  },
  { id: "forest.lookout.idle", scene: "FOREST", hotspot: "LOOKOUT", log: { role: "SYSTEM", text: "The ridge overlooks too much country for the naked eye. Tracks first, then distance.", kind: "default" }, turnCost: 0 },
  {
    id: "forest.descent.open", scene: "FOREST", hotspot: "DESCENT", requires: { flag: "HELD_FIRE", flagsNone: ["ROAD_OPEN"] }, setFlags: ["ROAD_OPEN"], moveTo: "COAST",
    log: { role: "SYSTEM", text: "You follow the subject's route down to Hopo's ruined main road.", kind: "system" }, once: true,
  },
  { id: "forest.descent.locked", scene: "FOREST", hotspot: "DESCENT", log: { role: "SYSTEM", text: "Something is below, but pursuing it before deciding whether to fire would only repeat the mistake.", kind: "default" }, turnCost: 0 },

  // RUINED HOPO MAIN ROAD
  {
    id: "road.wreckage.compare", scene: "COAST", hotspot: "WRECKAGE", requires: { item: "WOUND_MEASUREMENTS", flag: "FIGURE_SEEN", flagsNone: ["SAME_SUBJECT"] }, setFlags: ["SAME_SUBJECT"],
    log: { role: "SYSTEM", text: "The reach and impact height match the cattle-site measurements. The figure from the ridge has entered Hopo.", kind: "danger" }, once: true,
  },
  { id: "road.wreckage.idle", scene: "COAST", hotspot: "WRECKAGE", log: { role: "SYSTEM", text: "Metal and concrete failed above a man's reach. Compare the damage with the cattle-site measurements.", kind: "default" }, turnCost: 0 },
  {
    id: "road.bamigir.photo", scene: "COAST", hotspot: "BAMIGIR", requires: { item: "CAMERA", flag: "SAME_SUBJECT", flagsAll: ["HELD_FIRE"], flagsNone: ["TEARS_DOCUMENTED"] }, grants: ["ENCOUNTER_PHOTO"], setFlags: ["TEARS_DOCUMENTED"],
    log: { role: "SYSTEM", text: "Through the lens, the wounded sentry is crying. The photograph explains neither motive nor innocence; it only records that the 'beast' can grieve.", kind: "omega" }, once: true,
  },
  {
    id: "road.bamigir.witness", scene: "COAST", hotspot: "BAMIGIR", requires: { item: "UNFIRED_CARTRIDGE", has: ["ENCOUNTER_PHOTO"], flagsAll: ["TEARS_DOCUMENTED", "HELD_FIRE", "NOT_TIGER"] }, grants: ["CASE_FILE"], triggersEnding: "D",
    log: { role: "BUM-SEOK", text: "Bum-seok seals the photograph with the unfired cartridge. His report begins: 'The creature was crying. I could not pull the trigger.'", kind: "omega" }, once: true,
  },
  { id: "road.bamigir.idle", scene: "COAST", hotspot: "BAMIGIR", log: { role: "SYSTEM", text: "The towering wounded figure watches Hopo through tears. Observation must come before judgment.", kind: "default" }, turnCost: 0 },
];

export const INITIAL_LOGS = [
  { turn: 1, role: "SYSTEM", text: "HOPO PORT · DAY OF INCIDENT · 10:17", kind: "system" as const },
  { turn: 1, role: "SUNG-GI", text: "'Hyung, something tore up a cow by the millet field. The others are calling it a tiger.'", kind: "voice" as const },
  { turn: 1, role: "BUM-SEOK", text: "'Do not name it before I see it. Nobody goes into the forest yet.'", kind: "voice" as const },
  { turn: 1, role: "TUTORIAL", text: "Move between locations · equip evidence · select hotspots to investigate.", kind: "default" as const },
];

export const INITIAL_SCENE: SceneId = "OFFICE";

export const EPISODE_1: GameDefinition = {
  id: "ep1",
  number: 1,
  version: 3,
  title: "The Hopo Tiger",
  headerLabel: "HOPO PORT · DAY OF INCIDENT",
  maxTurns: MAX_TURNS,
  storageKey: "hope-ep1-canon-v3-state",
  scenes: SCENES,
  sceneOrder: ["OFFICE", "ARMORY", "YARD", "FIELD", "FOREST", "COAST"],
  items: ITEMS,
  interactions: INTERACTIONS,
  endings: ENDINGS,
  initialScene: INITIAL_SCENE,
  initialLogs: INITIAL_LOGS,
  waitText: "You wait. The dead radio stays silent while the village grows louder.",
  successfulEndings: ["C", "D"],
  caseRecord: {
    title: "Incident Record · Hopo Port",
    rows: [
      { label: "Initial report — cattle carcass", text: "claw trauma; carcass left uneaten", revealFlag: "COW_PHOTOGRAPHED" },
      { label: "Classification", text: "NOT A TIGER · unknown subject", revealFlag: "NOT_TIGER" },
      { label: "Communications", text: "telephone and police radio severed beyond local hardware", revealFlag: "SIGNAL_EXTERNAL" },
      { label: "Search direction", text: "oversized tracks return toward Hopo Port", revealFlag: "TRACK_COMPARED" },
    ],
    notes: [
      { text: "margin note · subject displayed grief; fire withheld", revealFlag: "HELD_FIRE" },
      { text: "encounter note · tears visible; intent remains unknown", revealFlag: "TEARS_DOCUMENTED" },
    ],
  },
};
