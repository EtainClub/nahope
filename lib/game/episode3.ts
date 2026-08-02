// Episode 3 — 해에서 자로 되감기는 역굿.
import type { EndingDescriptor, EndingId, GameDefinition, Interaction, Item, Scene, SceneId } from "./types";
import { RITUAL_PRESENCE_EVENTS, ZODIAC_MARKERS } from "./ritual";

export const EP3_MAX_TURNS = 38;

export const EP3_ITEMS: Record<string, Item> = {
  RITUAL_CLOCK: { id: "RITUAL_CLOCK", name: "역회전하는 의식 원판", short: "해에서 술로 돌아가기 시작한 12간지 무구.", art: "/images/game/ep2/items/hull_fragment.svg", artifact: true },
  HAESUL_REVERSE_SEAL: { id: "HAESUL_REVERSE_SEAL", name: "해술 역행 인장", short: "끝에서 시작하라는 해술의 몸짓과 증언.", art: "/images/game/ep2/items/ceasefire_flare.svg", artifact: true },
  ZERO_HOUR_GAP_RECORD: { id: "ZERO_HOUR_GAP_RECORD", name: "자시 공백 기록", short: "아직 발신되지 않은 미래 구조 신호의 빈 파형.", art: "/images/game/ep2/items/report.svg", artifact: true },
  KEROSENE_CAN: { id: "KEROSENE_CAN", name: "등잔용 석유통", short: "살아 있는 양기를 태워 잠시 길을 밝힐 수 있다. 그 뒤에는 새벽이 오지 않는다.", art: "/images/game/ep2/items/workshop_clue.svg", losable: true },
  ANCHORED_WITNESS_LEDGER: { id: "ANCHORED_WITNESS_LEDGER", name: "고정된 목격자 장부", short: "역행해도 이름이 지워지지 않도록 해술이 손도장을 찍었다.", art: "/images/game/ep2/items/report.svg" },
  DOG_SURVIVOR_ROUTE: { id: "DOG_SURVIVOR_ROUTE", name: "개의 생존자 경로", short: "짖음이 이어지는 집마다 아직 살아 있는 사람이 있다.", art: "/images/game/ep2/items/search_map.svg" },
  ROOSTER_CALL_TAPE: { id: "ROOSTER_CALL_TAPE", name: "보존된 장닭 울음", short: "저쪽 세계의 소리를 밀어내는 살아 있는 새벽 표식.", art: "/images/game/ep2/items/report.svg", artifact: true },
  MONGCHI_NAME_TAG: { id: "MONGCHI_NAME_TAG", name: "몽치 이름표", short: "동물의 몸보다 이름이 먼저 시간 칸을 연다는 증거.", art: "/images/game/ep2/items/workshop_clue.svg" },
  HUMAN_FIRST_SHOT_RECORD: { id: "HUMAN_FIRST_SHOT_RECORD", name: "인간 최초 발포 기록", short: "양배의 탄환은 지울 수 없는 고정점이지만 다음 총성은 아직 선택이다.", art: "/images/game/ep2/items/report.svg", artifact: true },
  HORSE_PASSAGE_LOG: { id: "HORSE_PASSAGE_LOG", name: "살아 있는 말의 통로", short: "말이 지나간 길은 역행 속에서도 이쪽 세계에 붙어 있다.", art: "/images/game/ep2/items/search_map.svg", artifact: true },
  WORM_TIME_SAMPLE: { id: "WORM_TIME_SAMPLE", name: "역행 지렁이 표본", short: "죽은 몸 안에서 원판과 반대 방향으로 움직인다.", art: "/images/game/ep2/items/workshop_clue.svg" },
  CRASH_DISTRESS_WAVE: { id: "CRASH_DISTRESS_WAVE", name: "추락 조난 파형", short: "침공 명령처럼 들렸던 신호는 미래의 구조 좌표에 답한 조난 응답이다.", art: "/images/game/ep2/items/hull_fragment.svg", artifact: true },
  RABBIT_HIDE_ROUTE: { id: "RABBIT_HIDE_ROUTE", name: "토끼 가죽 우회로", short: "사냥대를 저쪽 존재의 이동선 밖으로 돌릴 수 있는 좁은 길.", art: "/images/game/ep2/items/search_map.svg" },
  SECOND_HUNT_REBUTTAL: { id: "SECOND_HUNT_REBUTTAL", name: "두 번째 사냥 반박서", short: "첫 총성은 고정됐지만 두 번째 총성까지 운명일 필요는 없다.", art: "/images/game/ep2/items/report.svg", artifact: true },
  COW_HOUR_RECORD: { id: "COW_HOUR_RECORD", name: "원위치한 소 사체 기록", short: "모든 이름보다 앞에 놓인 축시의 물리 증거.", art: "/images/game/ep1/items/cow_photo.svg", artifact: true },
  OMEGA_ZERO_SIGNAL: { id: "OMEGA_ZERO_SIGNAL", name: "오메가 영시 신호", short: "미래의 구조 요청이 과거의 함선을 호포로 불러들였다.", art: "/images/game/ep2/items/hull_fragment.svg", artifact: true },
  TWELVE_LIVING_WITNESSES: { id: "TWELVE_LIVING_WITNESSES", name: "열두 살아 있는 목격자", short: "사람과 동물과 증거가 이름을 잃지 않고 말의 길을 건넜다.", art: "/images/game/ep2/items/report.svg", artifact: true },
  FIXED_POINT_LEDGER: { id: "FIXED_POINT_LEDGER", name: "고정점 장부", short: "추락, 말의 출발, 최초 총성은 바꿀 수 없다. 그 이후의 폭력은 아직 바뀔 수 있다.", art: "/images/game/ep2/items/report.svg", artifact: true },
};

export const EP3_SCENES: Record<string, Scene> = {
  EP3_HAESUL_HOUSE: { id: "EP3_HAESUL_HOUSE", title: "해술의 집 · 해와 술", ambient: "해술의 문장이 끝에서부터 지워진다. 개의 짖음만 집 밖으로 이어진다.", art: "/images/game/ep3/village.svg", exits: ["EP3_DAWN_YARD"], hotspots: [
    { id: "HAESUL", label: "지워지는 해술의 증언", top: "18%", left: "12%", width: "30%", height: "58%" },
    { id: "DOG_ROUTE", label: "거꾸로 이어지는 짖음", top: "48%", left: "62%", width: "28%", height: "34%" },
  ] },
  EP3_DAWN_YARD: { id: "EP3_DAWN_YARD", title: "역행하는 새벽 · 유와 신", ambient: "새벽빛이 먼저 사라지고 장닭이 나중에 숨을 들이킨다. 몽치의 이름표가 땅에서 손으로 돌아간다.", art: "/images/game/ep3/withdrawal.svg", exits: ["EP3_HAESUL_HOUSE", "EP3_YANGBAE_WORKSHOP"], lockedUntil: "DAWN_REVERSE_OPEN", hotspots: [
    { id: "ROOSTER", label: "살아 있는 장닭", top: "16%", left: "10%", width: "30%", height: "58%" },
    { id: "MONGCHI", label: "되돌아오는 이름표", top: "50%", left: "62%", width: "26%", height: "30%" },
  ] },
  EP3_YANGBAE_WORKSHOP: { id: "EP3_YANGBAE_WORKSHOP", title: "양배의 역행 작업장 · 미와 오", ambient: "탄환은 총구로 돌아가려 하지만 상처는 닫히지 않는다. 말은 홀로 정상 방향으로 걷는다.", art: "/images/game/ep3/cold_room.svg", exits: ["EP3_DAWN_YARD", "EP3_AUTOPSY_TENT"], lockedUntil: "WORKSHOP_REVERSE_OPEN", hotspots: [
    { id: "FIRST_SHOT", label: "되돌아가지 않는 탄환", top: "28%", left: "10%", width: "34%", height: "44%" },
    { id: "HORSE", label: "앞으로 걷는 말", top: "18%", left: "62%", width: "28%", height: "60%" },
  ] },
  EP3_AUTOPSY_TENT: { id: "EP3_AUTOPSY_TENT", title: "거꾸로 닫히는 검시 천막 · 사와 진", ambient: "지렁이가 상처 안으로 돌아가고 추락선의 파편이 하늘을 향해 들린다.", art: "/images/game/ep3/clinic.svg", exits: ["EP3_YANGBAE_WORKSHOP", "EP3_RABBIT_RIDGE"], lockedUntil: "AUTOPSY_REVERSE_OPEN", hotspots: [
    { id: "WORMS", label: "역행하는 지렁이", top: "50%", left: "10%", width: "32%", height: "28%" },
    { id: "CRASH_WAVE", label: "추락 이전의 조난 신호", top: "12%", left: "60%", width: "30%", height: "58%" },
  ] },
  EP3_RABBIT_RIDGE: { id: "EP3_RABBIT_RIDGE", title: "사냥 이전의 능선 · 묘와 인", ambient: "토끼 가죽이 다시 짐승의 몸을 향하고 호랑이라는 글자가 명령서에서 빠져나온다.", art: "/images/game/ep3/forest_gate.svg", exits: ["EP3_AUTOPSY_TENT", "EP3_ZERO_HOUR"], lockedUntil: "RIDGE_REVERSE_OPEN", hotspots: [
    { id: "RABBIT", label: "접히는 토끼 가죽길", top: "56%", left: "10%", width: "30%", height: "26%" },
    { id: "TIGER", label: "사라지지 않는 호랑이 명령", top: "16%", left: "62%", width: "28%", height: "56%" },
  ] },
  EP3_ZERO_HOUR: { id: "EP3_ZERO_HOUR", title: "영시 소 사체터 · 축과 자", ambient: "소는 아직 발견되지 않았다. 파출소 안테나는 미래를 향해 켜져 있다.", art: "/images/game/ep3/exchange.svg", exits: ["EP3_RABBIT_RIDGE"], lockedUntil: "ZERO_HOUR_OPEN", hotspots: [
    { id: "COW", label: "발견 이전의 소", top: "52%", left: "8%", width: "34%", height: "30%" },
    { id: "EVAC_ROUTE", label: "말의 길로 향하는 생존자", top: "62%", left: "42%", width: "26%", height: "22%" },
    { id: "OMEGA_ANTENNA", label: "미래를 향한 오메가 안테나", top: "8%", left: "70%", width: "22%", height: "60%" },
  ] },
};

export const EP3_ENDINGS: Record<EndingId, EndingDescriptor> = {
  A: { id: "A", title: "엔딩 A — 목격자 없는 굿", body: "원판이 다시 해시로 돌아간다. 반복될 때마다 장부에서 사람의 이름 하나가 지워진다." },
  B: { id: "B", title: "엔딩 B — 빌린 양기", body: "장닭이나 말을 태워 잠시 경계를 밝힌다. 길은 열리지만 다음 순환에는 새벽도 말발굽도 돌아오지 않는다.", isRestart: true },
  C: { id: "C", title: "엔딩 C — 열두 살아 있는 목격자", body: "장닭의 울음이 저쪽 소리를 밀어내는 동안 사람들은 말이 연 길을 건넌다. 증거와 이름이 다음 순환까지 살아남는다.", grantsArtifacts: ["TWELVE_LIVING_WITNESSES", "HORSE_PASSAGE_LOG", "ROOSTER_CALL_TAPE"], unlocksNextEpisode: true },
  D: { id: "D", title: "엔딩 D — 사라진 쥐의 자리", body: "자시의 정체는 미래 오메가 구조 신호였다. 미래가 함선을 불렀고 추락한 함선이 다시 그 미래를 만들었다.", grantsArtifacts: ["OMEGA_ZERO_SIGNAL", "FIXED_POINT_LEDGER", "TWELVE_LIVING_WITNESSES"], unlocksNextEpisode: true },
};

export const EP3_INTERACTIONS: Interaction[] = [
  { id: "ep3.hae.anchor", scene: "EP3_HAESUL_HOUSE", hotspot: "HAESUL", requires: { cycleIndex: 11, flagsNone: ["SIGN_HAE"] }, grants: ["ANCHORED_WITNESS_LEDGER"], setFlags: ["SIGN_HAE"], anchorEvidence: ["HAESUL_NAME"], shiftCycle: -1, log: { role: "해술", text: "해시. 내 말이 지워져도 손도장은 남겨. 이름부터 붙들어야 혀.", kind: "voice" }, once: true },
  { id: "ep3.sul.route", scene: "EP3_HAESUL_HOUSE", hotspot: "DOG_ROUTE", requires: { item: "ANCHORED_WITNESS_LEDGER", cycleIndex: 10, anchoredAll: ["HAESUL_NAME"], flagsNone: ["SIGN_SUL"] }, grants: ["DOG_SURVIVOR_ROUTE", "MONGCHI_NAME_TAG"], setFlags: ["SIGN_SUL", "DAWN_REVERSE_OPEN"], anchorEvidence: ["SURVIVOR_NAMES"], shiftCycle: -1, log: { role: "시스템", text: "술시. 짖음이 닿은 집의 이름을 장부에 묶는다. 역행해도 사람은 지워지지 않는다.", kind: "system" }, once: true },
  { id: "ep3.haesul.idle", scene: "EP3_HAESUL_HOUSE", hotspot: "HAESUL", log: { role: "시스템", text: "현재 간지의 증언부터 고정해야 다음 소리를 따라갈 수 있다.", kind: "default" }, turnCost: 0 },
  { id: "ep3.rooster.burn", scene: "EP3_DAWN_YARD", hotspot: "ROOSTER", requires: { item: "KEROSENE_CAN" }, destroys: ["KEROSENE_CAN"], extinguishesYang: "rooster", boundaryDelta: -100, triggersEnding: "B", log: { role: "시스템", text: "장닭의 양기를 불쏘시개로 쓴다. 불은 밝지만 새벽의 출구가 함께 탄다.", kind: "danger" }, once: true },
  { id: "ep3.yu.protect", scene: "EP3_DAWN_YARD", hotspot: "ROOSTER", requires: { cycleIndex: 9, flagsNone: ["SIGN_YU"] }, grants: ["ROOSTER_CALL_TAPE"], setFlags: ["SIGN_YU"], anchorEvidence: ["ROOSTER_ALIVE"], shiftCycle: -1, presenceId: "rooster_silence", log: { role: "시스템", text: "유시. 철망을 열어 장닭이 스스로 높은 곳에 오른다. 울음은 소유할 수 없는 결계가 된다.", kind: "omega" }, once: true },
  { id: "ep3.sin.name", scene: "EP3_DAWN_YARD", hotspot: "MONGCHI", requires: { item: "MONGCHI_NAME_TAG", cycleIndex: 8, anchoredAll: ["ROOSTER_ALIVE"], flagsNone: ["SIGN_SIN"] }, setFlags: ["SIGN_SIN", "WORKSHOP_REVERSE_OPEN"], anchorEvidence: ["NAME_BEFORE_BODY"], shiftCycle: -1, log: { role: "범석", text: "신시. 몸이 아니라 이름이 시간 칸을 열었다. 호명은 분류가 아니라 행위다.", kind: "omega" }, once: true },
  { id: "ep3.rooster.idle", scene: "EP3_DAWN_YARD", hotspot: "ROOSTER", log: { role: "시스템", text: "장닭을 소유하거나 희생하지 말고 살아 있는 채로 길을 열게 해야 한다.", kind: "default" }, turnCost: 0 },
  { id: "ep3.mi.shot", scene: "EP3_YANGBAE_WORKSHOP", hotspot: "FIRST_SHOT", requires: { cycleIndex: 7, flagsNone: ["SIGN_MI"] }, grants: ["HUMAN_FIRST_SHOT_RECORD"], setFlags: ["SIGN_MI"], anchorEvidence: ["FIRST_SHOT_FIXED"], shiftCycle: -1, log: { role: "양배", text: "미시. 탄환은 돌아가도 내가 쐈다는 사실은 돌아가지 않아. 그다음 총만은 막아.", kind: "danger" }, once: true },
  { id: "ep3.horse.burn", scene: "EP3_YANGBAE_WORKSHOP", hotspot: "HORSE", requires: { item: "KEROSENE_CAN" }, destroys: ["KEROSENE_CAN"], extinguishesYang: "horse", boundaryDelta: -100, triggersEnding: "B", log: { role: "시스템", text: "말의 길에 석유를 붓는다. 저쪽 존재는 물러나지만 이쪽 세계로 돌아갈 길도 함께 닫힌다.", kind: "danger" }, once: true },
  { id: "ep3.o.horse", scene: "EP3_YANGBAE_WORKSHOP", hotspot: "HORSE", requires: { item: "HUMAN_FIRST_SHOT_RECORD", cycleIndex: 6, anchoredAll: ["FIRST_SHOT_FIXED"], flagsNone: ["SIGN_O"] }, grants: ["HORSE_PASSAGE_LOG"], setFlags: ["SIGN_O", "AUTOPSY_REVERSE_OPEN"], anchorEvidence: ["HORSE_ALIVE"], shiftCycle: -1, presenceId: "horse_passage", log: { role: "시스템", text: "오시. 말을 붙잡지 않는다. 떠나는 사건을 지키자 살아 있는 통로가 열린다.", kind: "system" }, once: true },
  { id: "ep3.horse.idle", scene: "EP3_YANGBAE_WORKSHOP", hotspot: "HORSE", log: { role: "시스템", text: "말의 출발은 바꿀 수 없는 고정점이다. 양배의 기록을 먼저 인정해야 한다.", kind: "default" }, turnCost: 0 },
  { id: "ep3.sa.worm", scene: "EP3_AUTOPSY_TENT", hotspot: "WORMS", requires: { cycleIndex: 5, flagsNone: ["SIGN_SA"] }, grants: ["WORM_TIME_SAMPLE"], setFlags: ["SIGN_SA"], anchorEvidence: ["ALIEN_BODY_TIME"], shiftCycle: -1, log: { role: "보건소장", text: "사시. 지렁이만 역행을 거슬러 간다. 저 몸의 시간은 인간의 시계와 다르다.", kind: "omega" }, once: true },
  { id: "ep3.jin.wave", scene: "EP3_AUTOPSY_TENT", hotspot: "CRASH_WAVE", requires: { item: "WORM_TIME_SAMPLE", cycleIndex: 4, flagsNone: ["SIGN_JIN"] }, grants: ["CRASH_DISTRESS_WAVE"], setFlags: ["SIGN_JIN", "RIDGE_REVERSE_OPEN"], anchorEvidence: ["CRASH_FIXED"], shiftCycle: -1, presenceId: "reverse_gaze", log: { role: "무전", text: "진시. 침공 명령이라 부른 파형은 구조 좌표에 답한 조난 신호였다.", kind: "omega" }, once: true },
  { id: "ep3.wave.idle", scene: "EP3_AUTOPSY_TENT", hotspot: "CRASH_WAVE", log: { role: "시스템", text: "생물의 시간 방향을 확인해야 신호의 앞뒤를 구별할 수 있다.", kind: "default" }, turnCost: 0 },
  { id: "ep3.myo.route", scene: "EP3_RABBIT_RIDGE", hotspot: "RABBIT", requires: { cycleIndex: 3, flagsNone: ["SIGN_MYO"] }, grants: ["RABBIT_HIDE_ROUTE"], setFlags: ["SIGN_MYO"], anchorEvidence: ["RABBIT_BYPASS"], shiftCycle: -1, log: { role: "시스템", text: "묘시. 토끼 가죽길을 사냥로가 아니라 우회로로 다시 읽는다.", kind: "system" }, once: true },
  { id: "ep3.in.rebut", scene: "EP3_RABBIT_RIDGE", hotspot: "TIGER", requires: { item: "RABBIT_HIDE_ROUTE", cycleIndex: 2, anchoredAll: ["RABBIT_BYPASS"], flagsNone: ["SIGN_IN"] }, grants: ["SECOND_HUNT_REBUTTAL"], setFlags: ["SIGN_IN", "ZERO_HOUR_OPEN"], anchorEvidence: ["SECOND_SHOT_MUTABLE"], shiftCycle: -1, log: { role: "범석", text: "인시. 첫 총성은 고정됐지만 호랑이라는 두 번째 명령은 지울 수 있다.", kind: "system" }, once: true },
  { id: "ep3.tiger.idle", scene: "EP3_RABBIT_RIDGE", hotspot: "TIGER", log: { role: "시스템", text: "사냥대를 돌릴 실제 우회 경로가 없으면 명령만 지워도 사람들은 다시 총을 든다.", kind: "default" }, turnCost: 0 },
  { id: "ep3.chuk.cow", scene: "EP3_ZERO_HOUR", hotspot: "COW", requires: { cycleIndex: 1, flagsNone: ["SIGN_CHUK"] }, grants: ["COW_HOUR_RECORD"], setFlags: ["SIGN_CHUK", "ZERO_READY"], anchorEvidence: ["PHYSICAL_ORIGIN"], shiftCycle: -1, presenceId: "cow_breath", log: { role: "범석", text: "축시. 호랑이도 용도 아닌 물리 증거를 모든 이름보다 앞에 되돌려 놓는다.", kind: "omega" }, once: true },
  { id: "ep3.evac.complete", scene: "EP3_ZERO_HOUR", hotspot: "EVAC_ROUTE", requires: { item: "HORSE_PASSAGE_LOG", cycleIndex: 0, anchoredAll: ["HAESUL_NAME", "SURVIVOR_NAMES", "ROOSTER_ALIVE", "HORSE_ALIVE", "RABBIT_BYPASS", "PHYSICAL_ORIGIN"] }, grants: ["TWELVE_LIVING_WITNESSES"], setFlags: ["SIGN_JA", "WITNESSES_CROSSED"], triggersEnding: "C", log: { role: "시스템", text: "자시. 장닭이 울고 말의 길이 열린다. 마지막 이름이 경계를 건넌다.", kind: "system" }, once: true },
  { id: "ep3.zero.receive", scene: "EP3_ZERO_HOUR", hotspot: "OMEGA_ANTENNA", requires: { item: "RITUAL_CLOCK", cycleIndex: 0, anchoredAll: ["FIRST_SHOT_FIXED", "CRASH_FIXED", "SECOND_SHOT_MUTABLE", "PHYSICAL_ORIGIN"], flagsAll: ["ZERO_READY"] }, grants: ["OMEGA_ZERO_SIGNAL", "FIXED_POINT_LEDGER", "TWELVE_LIVING_WITNESSES"], setFlags: ["SIGN_JA", "ZERO_SIGNAL_PROVEN"], presenceId: "zero_seat", triggersEnding: "D", log: { role: "오메가 영시", text: "발신자는 미래의 우리다. 구조 요청이 함선을 불렀고 추락이 다시 이 요청을 만들었다.", kind: "omega" }, once: true },
  { id: "ep3.zero.idle", scene: "EP3_ZERO_HOUR", hotspot: "OMEGA_ANTENNA", log: { role: "무전", text: "추락과 최초 총성, 바꿀 수 있는 두 번째 총성을 각각 고정해야 발신자를 볼 수 있다.", kind: "default" }, turnCost: 0 },
];

export const EP3_INITIAL_LOGS = [
  { turn: 1, role: "시스템", text: "에피소드 3 · 역굿", kind: "system" as const },
  { turn: 1, role: "해술", text: "끝났다고 생각한 데서 시작혀. 해에서 술로, 술에서 유로.", kind: "voice" as const },
  { turn: 1, role: "안내", text: "고정점을 바꾸지 말고 살아 있는 양기를 지키십시오. 잘못된 희생은 새벽을 없앱니다.", kind: "danger" as const },
];

export const EPISODE_3: GameDefinition = {
  id: "ep3", number: 3, version: 2, title: "역굿", headerLabel: "호포 역행 의식 · 에피소드 3", maxTurns: EP3_MAX_TURNS,
  storageKey: "nahope_ep3_reverse_rite_v2", scenes: EP3_SCENES,
  sceneOrder: ["EP3_HAESUL_HOUSE", "EP3_DAWN_YARD", "EP3_YANGBAE_WORKSHOP", "EP3_AUTOPSY_TENT", "EP3_RABBIT_RIDGE", "EP3_ZERO_HOUR"],
  items: EP3_ITEMS, interactions: EP3_INTERACTIONS, endings: EP3_ENDINGS, initialScene: "EP3_HAESUL_HOUSE" as SceneId,
  initialLogs: EP3_INITIAL_LOGS, initialInventory: ["RITUAL_CLOCK", "HAESUL_REVERSE_SEAL", "ZERO_HOUR_GAP_RECORD", "KEROSENE_CAN"],
  waitText: "기다린다. 문장의 끝이 먼저 사라지고 결계 안정도가 낮아진다.", successfulEndings: ["C", "D"],
  ritual: { phase: "reverse", direction: "reverse", initialCycleIndex: 11, markers: ZODIAC_MARKERS, presenceEvents: RITUAL_PRESENCE_EVENTS, boundaryCollapseEnding: "B" },
  caseRecord: { title: "역굿 고정 장부", rows: ZODIAC_MARKERS.map((marker) => ({ label: marker.label, text: "역행 목격 고정", revealFlag: marker.revealFlag })), notes: [
    { text: "양기 고정점 · 장닭은 살아 있고 말의 길은 열려 있어야 한다.", revealFlag: "SIGN_O" },
    { text: "고정점 · 추락, 말의 출발, 최초 총성. 가변점 · 이름, 두 번째 총성, 대피.", revealFlag: "ZERO_SIGNAL_PROVEN" },
  ] },
};
