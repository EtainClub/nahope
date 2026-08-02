// Episode 2 — 열두 존재를 부르는 12시간 의식.
import type { EndingDescriptor, EndingId, GameDefinition, Interaction, Item, Scene, SceneId } from "./types";
import { RITUAL_PRESENCE_EVENTS, ZODIAC_MARKERS } from "./ritual";

export const EP2_MAX_TURNS = 34;

export const EP2_ITEMS: Record<string, Item> = {
  CASE_FILE: { id: "CASE_FILE", name: "범석의 미확인 대상 사건철", short: "호랑이가 아니라는 결론과 바미기르의 눈물이 기록되어 있다.", art: "/images/game/ep1/items/case_file.svg" },
  HUNTING_AMMO: { id: "HUNTING_AMMO", name: "봉인하지 않은 사냥탄", short: "형체를 이해하기 전에 결론을 낼 수 있는 가장 빠른 도구.", art: "/images/game/ep2/items/hunting_ammo.svg", losable: true },
  COW_HOUR_RECORD: { id: "COW_HOUR_RECORD", name: "축시 소 사체 기록", short: "첫 사진의 시각과 갈비뼈 주변의 마른 상처를 묶은 기록.", art: "/images/game/ep1/items/cow_photo.svg", artifact: true },
  TIGER_NAME_ORDER: { id: "TIGER_NAME_ORDER", name: "인시 호랑이 명령서", short: "증거보다 먼저 도착해 마을을 사냥대로 바꾼 이름.", art: "/images/game/ep2/items/report.svg" },
  RABBIT_HIDE_ROUTE: { id: "RABBIT_HIDE_ROUTE", name: "묘시 토끼 가죽길", short: "가죽의 털 방향이 은빛 추락지로 이어진다.", art: "/images/game/ep2/items/search_map.svg" },
  DRAGON_CRASH_TRACE: { id: "DRAGON_CRASH_TRACE", name: "진시 추락 흔적", short: "용이라 불린 형체는 정복군이 아니라 추락한 생존자에게서 시작됐다.", art: "/images/game/ep2/items/hull_fragment.svg", artifact: true },
  WORM_TIME_SAMPLE: { id: "WORM_TIME_SAMPLE", name: "사시 지렁이 표본", short: "바미기르의 체온이 사라진 뒤에도 한 방향으로만 꿈틀거린다.", art: "/images/game/ep2/items/workshop_clue.svg" },
  HORSE_PASSAGE_LOG: { id: "HORSE_PASSAGE_LOG", name: "오시 말 통과 기록", short: "말이 지나간 길에는 역행 노이즈가 침범하지 못했다.", art: "/images/game/ep2/items/search_map.svg", artifact: true },
  YANGBAE_CAUSAL_NOTE: { id: "YANGBAE_CAUSAL_NOTE", name: "미시 양배 인과 메모", short: "양배라는 이름과 인간의 최초 총성이 같은 시간 칸에 놓인다.", art: "/images/game/ep2/items/report.svg" },
  MONGCHI_NAME_TAG: { id: "MONGCHI_NAME_TAG", name: "신시 몽치 이름표", short: "동물의 몸과 이름이 서로 다른 간지를 가리킨다.", art: "/images/game/ep2/items/workshop_clue.svg" },
  ROOSTER_CALL_TAPE: { id: "ROOSTER_CALL_TAPE", name: "유시 장닭 울음 테이프", short: "울음 직전 모든 외계 주파수가 한 박자 멎는다.", art: "/images/game/ep2/items/report.svg", artifact: true },
  DOG_SURVIVOR_ROUTE: { id: "DOG_SURVIVOR_ROUTE", name: "술시 생존자 경로", short: "개의 짖음은 괴물이 아니라 숨어 있는 사람을 향했다.", art: "/images/game/ep2/items/search_map.svg" },
  HAESUL_REVERSE_SEAL: { id: "HAESUL_REVERSE_SEAL", name: "해술 역행 인장", short: "술해가 아니라 해에서 술로. 의식의 방향을 뒤집는 증언.", art: "/images/game/ep2/items/ceasefire_flare.svg", artifact: true },
  TWELVE_CALLS_RECORD: { id: "TWELVE_CALLS_RECORD", name: "열두 호명 기록", short: "동물, 이름, 사체와 소리가 12시간의 굿판을 완성했다.", art: "/images/game/ep2/items/report.svg", artifact: true },
  RITUAL_CLOCK: { id: "RITUAL_CLOCK", name: "12간지 의식 원판", short: "조사 도구처럼 보이지만 열두 존재를 차례로 불러낸 무구.", art: "/images/game/ep2/items/hull_fragment.svg", artifact: true },
  ZERO_HOUR_GAP_RECORD: { id: "ZERO_HOUR_GAP_RECORD", name: "자시 공백 기록", short: "쥐의 자리에서 아직 보내지지 않은 미래 신호가 들린다.", art: "/images/game/ep2/items/report.svg", artifact: true },
};

export const EP2_SCENES: Record<string, Scene> = {
  EP2_CATTLE_GROUND: { id: "EP2_CATTLE_GROUND", title: "소 사체터 · 축과 인", ambient: "성애가 순찰차 문 뒤에서 카빈을 내리지 않는다. 마른 사체 위로 낮빛이 남아 있고, 호랑이라는 말만 아직 살아 움직인다.", art: "/images/game/ep2/sungae-cattle-ground-v2.webp", exits: ["EP2_RABBIT_RIDGE"], hotspots: [
    { id: "COW", label: "소 사체 사진", top: "42%", left: "10%", width: "34%", height: "38%" },
    { id: "TIGER_ORDER", label: "호랑이 수색 명령서", top: "18%", left: "62%", width: "25%", height: "52%" },
  ] },
  EP2_RABBIT_RIDGE: { id: "EP2_RABBIT_RIDGE", title: "토끼 능선 · 묘와 진", ambient: "찢긴 토끼 가죽 너머로 은빛 선체가 용의 등처럼 솟아 있다.", art: "/images/game/ep2/trail.webp", exits: ["EP2_CATTLE_GROUND", "EP2_AUTOPSY_TENT"], lockedUntil: "RIDGE_OPEN", hotspots: [
    { id: "RABBIT_HIDE", label: "토끼 가죽", top: "60%", left: "8%", width: "28%", height: "24%" },
    { id: "DRAGON_TRACE", label: "추락한 형체", top: "8%", left: "52%", width: "38%", height: "48%" },
  ] },
  EP2_AUTOPSY_TENT: { id: "EP2_AUTOPSY_TENT", title: "검시 천막 · 사와 오", ambient: "바미기르의 몸속에서 지렁이가 꿈틀거린다. 천막 밖 말은 안쪽을 보지 않는다.", art: "/images/game/ep2/freezer.webp", exits: ["EP2_RABBIT_RIDGE", "EP2_YANGBAE_WORKSHOP"], lockedUntil: "AUTOPSY_OPEN", hotspots: [
    { id: "WORMS", label: "몸속의 지렁이", top: "48%", left: "12%", width: "34%", height: "30%" },
    { id: "HORSE", label: "살아 있는 말", top: "14%", left: "62%", width: "28%", height: "60%" },
  ] },
  EP2_YANGBAE_WORKSHOP: { id: "EP2_YANGBAE_WORKSHOP", title: "양배의 작업장 · 미와 신", ambient: "마네킹 얼굴 사이에서 양배와 몽치라는 두 이름이 서로를 피한다.", art: "/images/game/ep2/workshop.webp", exits: ["EP2_AUTOPSY_TENT", "EP2_DAWN_YARD"], lockedUntil: "WORKSHOP_OPEN", hotspots: [
    { id: "YANGBAE_NOTE", label: "양배의 총격 메모", top: "18%", left: "10%", width: "30%", height: "52%" },
    { id: "MONGCHI_TAG", label: "몽치 이름표", top: "38%", left: "62%", width: "25%", height: "32%" },
  ] },
  EP2_DAWN_YARD: { id: "EP2_DAWN_YARD", title: "새벽 마당 · 유와 술", ambient: "장닭이 울기 전 무음이 내려앉는다. 개는 빈 축사가 아니라 사람 사는 집을 향해 짖는다.", art: "/images/game/ep2/glade.webp", exits: ["EP2_YANGBAE_WORKSHOP", "EP2_HAESUL_HOUSE"], lockedUntil: "DAWN_OPEN", hotspots: [
    { id: "ROOSTER", label: "울기 직전의 장닭", top: "18%", left: "12%", width: "30%", height: "55%" },
    { id: "DOG", label: "생존자를 향한 개", top: "46%", left: "62%", width: "28%", height: "34%" },
  ] },
  EP2_HAESUL_HOUSE: { id: "EP2_HAESUL_HOUSE", title: "해술의 집 · 해와 자", ambient: "열한 칸이 채워졌다. 마지막 빈칸은 아직 일어나지 않은 시간을 수신한다.", art: "/images/game/ep2/wreck.webp", exits: ["EP2_DAWN_YARD"], lockedUntil: "HAESUL_OPEN", hotspots: [
    { id: "HAESUL", label: "해술의 역순 증언", top: "16%", left: "10%", width: "32%", height: "58%" },
    { id: "RECORD_DESK", label: "열두 시간 사건철", top: "58%", left: "38%", width: "24%", height: "26%" },
    { id: "ZERO_SIGNAL", label: "자시 무전 공백", top: "12%", left: "68%", width: "24%", height: "56%" },
  ] },
};

export const EP2_ENDINGS: Record<EndingId, EndingDescriptor> = {
  A: { id: "A", title: "엔딩 A — 반복되는 사냥", body: "열두 시간이 닫힌다. 마을은 다시 소 사체 앞에 서고, 누군가 또 호랑이라는 말을 먼저 꺼낸다." },
  B: { id: "B", title: "엔딩 B — 잘못 부른 존재", body: "추락한 생존자를 용이라 확정하고 총을 건넨다. 인간이 부른 형체가 인간이 두려워한 모습으로 굳어진다.", isRestart: true },
  C: { id: "C", title: "엔딩 C — 열두 시간의 굿", body: "열두 표식이 하나의 시간 원판에 놓인다. 호포의 사건은 우연이 아니라 반복되는 의식이었음이 기록된다.", grantsArtifacts: ["TWELVE_CALLS_RECORD", "RITUAL_CLOCK", "ROOSTER_CALL_TAPE"], unlocksNextEpisode: true },
  D: { id: "D", title: "엔딩 D — 해술의 역행", body: "해에서 술로, 원판이 거꾸로 돈다. 쥐의 빈자리에서 미래의 구조 신호가 들리고 관객은 굿판의 참여자가 된다.", grantsArtifacts: ["HAESUL_REVERSE_SEAL", "RITUAL_CLOCK", "ZERO_HOUR_GAP_RECORD"], unlocksNextEpisode: true },
};

export const EP2_INTERACTIONS: Interaction[] = [
  { id: "ep2.cow.record", scene: "EP2_CATTLE_GROUND", hotspot: "COW", requires: { cycleIndex: 1, flagsNone: ["SIGN_CHUK"] }, grants: ["COW_HOUR_RECORD"], setFlags: ["SIGN_CHUK"], shiftCycle: 1, presenceId: "cow_breath", log: { role: "범석", text: "축시. 사체보다 먼저 죽은 것은 설명이었다. 사진의 시각을 첫 칸에 고정한다.", kind: "omega" }, once: true },
  { id: "ep2.cow.idle", scene: "EP2_CATTLE_GROUND", hotspot: "COW", log: { role: "시스템", text: "상처보다 먼저 시간을 기록해야 한다.", kind: "default" }, turnCost: 0 },
  { id: "ep2.tiger.classify", scene: "EP2_CATTLE_GROUND", hotspot: "TIGER_ORDER", requires: { item: "CASE_FILE", cycleIndex: 2, flagsAll: ["SIGN_CHUK"], flagsNone: ["SIGN_IN"] }, grants: ["TIGER_NAME_ORDER"], setFlags: ["SIGN_IN", "RIDGE_OPEN"], shiftCycle: 1, log: { role: "범석", text: "인시. 호랑이는 짐승이 아니라 사람을 움직인 명령이었다.", kind: "danger" }, once: true },
  { id: "ep2.tiger.idle", scene: "EP2_CATTLE_GROUND", hotspot: "TIGER_ORDER", log: { role: "시스템", text: "미확인 대상 사건철로 이 이름의 근거를 먼저 반박해야 한다.", kind: "default" }, turnCost: 0 },
  { id: "ep2.rabbit.route", scene: "EP2_RABBIT_RIDGE", hotspot: "RABBIT_HIDE", requires: { cycleIndex: 3, flagsNone: ["SIGN_MYO"] }, grants: ["RABBIT_HIDE_ROUTE"], setFlags: ["SIGN_MYO"], shiftCycle: 1, log: { role: "시스템", text: "묘시. 토끼 가죽의 털이 눕는 방향이 추락 골을 가리킨다.", kind: "system" }, once: true },
  { id: "ep2.dragon.fire", scene: "EP2_RABBIT_RIDGE", hotspot: "DRAGON_TRACE", requires: { item: "HUNTING_AMMO" }, destroys: ["HUNTING_AMMO"], boundaryDelta: -100, triggersEnding: "B", log: { role: "시스템", text: "용이라는 이름에 탄환이 답한다. 굿판은 사냥터로 굳어진다.", kind: "danger" }, once: true },
  { id: "ep2.dragon.read", scene: "EP2_RABBIT_RIDGE", hotspot: "DRAGON_TRACE", requires: { item: "RABBIT_HIDE_ROUTE", cycleIndex: 4, flagsAll: ["SIGN_MYO"], flagsNone: ["SIGN_JIN"] }, grants: ["DRAGON_CRASH_TRACE"], setFlags: ["SIGN_JIN", "AUTOPSY_OPEN"], shiftCycle: 1, presenceId: "reverse_gaze", log: { role: "범석", text: "진시. 용처럼 보인 등뼈는 안쪽에서 파열된 선체였다. 침입이 아니라 추락이다.", kind: "omega" }, once: true },
  { id: "ep2.dragon.idle", scene: "EP2_RABBIT_RIDGE", hotspot: "DRAGON_TRACE", log: { role: "시스템", text: "형체에 이름을 붙이기 전에 토끼 가죽이 가리킨 경로를 대조해야 한다.", kind: "default" }, turnCost: 0 },
  { id: "ep2.worm.sample", scene: "EP2_AUTOPSY_TENT", hotspot: "WORMS", requires: { cycleIndex: 5, flagsNone: ["SIGN_SA"] }, grants: ["WORM_TIME_SAMPLE"], setFlags: ["SIGN_SA"], shiftCycle: 1, log: { role: "보건소장", text: "사시. 지렁이는 체온이 아니라 원판의 다음 칸을 향해 움직인다.", kind: "omega" }, once: true },
  { id: "ep2.horse.observe", scene: "EP2_AUTOPSY_TENT", hotspot: "HORSE", requires: { item: "WORM_TIME_SAMPLE", cycleIndex: 6, flagsAll: ["SIGN_SA"], flagsNone: ["SIGN_O"] }, grants: ["HORSE_PASSAGE_LOG"], setFlags: ["SIGN_O", "WORKSHOP_OPEN"], shiftCycle: 1, presenceId: "horse_passage", log: { role: "시스템", text: "오시. 말이 지나간 길만 시간이 앞으로 흐른다. 저쪽 존재는 그 생명을 건드리지 못한다.", kind: "system" }, once: true },
  { id: "ep2.horse.idle", scene: "EP2_AUTOPSY_TENT", hotspot: "HORSE", log: { role: "시스템", text: "말은 천막을 보지 않는다. 먼저 지렁이의 시간 방향을 확인해야 한다.", kind: "default" }, turnCost: 0 },
  { id: "ep2.yangbae.note", scene: "EP2_YANGBAE_WORKSHOP", hotspot: "YANGBAE_NOTE", requires: { cycleIndex: 7, flagsNone: ["SIGN_MI"] }, grants: ["YANGBAE_CAUSAL_NOTE"], setFlags: ["SIGN_MI"], shiftCycle: 1, log: { role: "양배", text: "미시. 내 이름의 양이 그 칸에 있었어. 내가 먼저 쏜 것도 그때였고.", kind: "danger" }, once: true },
  { id: "ep2.mongchi.tag", scene: "EP2_YANGBAE_WORKSHOP", hotspot: "MONGCHI_TAG", requires: { item: "YANGBAE_CAUSAL_NOTE", cycleIndex: 8, flagsAll: ["SIGN_MI"], flagsNone: ["SIGN_SIN"] }, grants: ["MONGCHI_NAME_TAG"], setFlags: ["SIGN_SIN", "DAWN_OPEN"], shiftCycle: 1, log: { role: "시스템", text: "신시. 몸은 개지만 이름은 원숭이의 자리를 연다. 이 원판은 동물 도감이 아니다.", kind: "omega" }, once: true },
  { id: "ep2.mongchi.idle", scene: "EP2_YANGBAE_WORKSHOP", hotspot: "MONGCHI_TAG", log: { role: "시스템", text: "이름표의 발음과 양배가 적은 시간 칸을 함께 읽어야 한다.", kind: "default" }, turnCost: 0 },
  { id: "ep2.rooster.record", scene: "EP2_DAWN_YARD", hotspot: "ROOSTER", requires: { cycleIndex: 9, flagsNone: ["SIGN_YU"] }, grants: ["ROOSTER_CALL_TAPE"], setFlags: ["SIGN_YU"], shiftCycle: 1, presenceId: "rooster_silence", log: { role: "무전", text: "유시. 장닭이 울기 직전 모든 주파수가 멎었다. 그 무음이 시간 표식이다.", kind: "omega" }, once: true },
  { id: "ep2.dog.route", scene: "EP2_DAWN_YARD", hotspot: "DOG", requires: { item: "ROOSTER_CALL_TAPE", cycleIndex: 10, flagsAll: ["SIGN_YU"], flagsNone: ["SIGN_SUL"] }, grants: ["DOG_SURVIVOR_ROUTE"], setFlags: ["SIGN_SUL", "HAESUL_OPEN"], shiftCycle: 1, log: { role: "시스템", text: "술시. 개의 짖음은 어둠이 아니라 숨은 사람들의 집을 차례로 가리킨다.", kind: "system" }, once: true },
  { id: "ep2.dog.idle", scene: "EP2_DAWN_YARD", hotspot: "DOG", log: { role: "시스템", text: "장닭의 울음 간격을 기록해야 짖음의 순서를 읽을 수 있다.", kind: "default" }, turnCost: 0 },
  { id: "ep2.haesul.reverse", scene: "EP2_HAESUL_HOUSE", hotspot: "HAESUL", requires: { cycleIndex: 11, flagsNone: ["SIGN_HAE"] }, grants: ["HAESUL_REVERSE_SEAL"], setFlags: ["SIGN_HAE", "TWELVE_READY"], shiftCycle: 1, log: { role: "해술", text: "술해가 아니여. 해에서 술로 가는 겨. 끝에서 거꾸로 와야 보여.", kind: "voice" }, once: true },
  { id: "ep2.record.complete", scene: "EP2_HAESUL_HOUSE", hotspot: "RECORD_DESK", requires: { item: "HAESUL_REVERSE_SEAL", flagsAll: ["TWELVE_READY"], flagsNone: ["SIGN_JA"] }, grants: ["TWELVE_CALLS_RECORD", "RITUAL_CLOCK"], triggersEnding: "C", log: { role: "범석", text: "열한 표식과 하나의 공백. 호포의 12시간을 사건철로 봉인한다.", kind: "system" }, once: true },
  { id: "ep2.zero.receive", scene: "EP2_HAESUL_HOUSE", hotspot: "ZERO_SIGNAL", requires: { item: "HAESUL_REVERSE_SEAL", cycleIndex: 0, flagsAll: ["TWELVE_READY"], flagsNone: ["SIGN_JA"] }, grants: ["TWELVE_CALLS_RECORD", "RITUAL_CLOCK", "ZERO_HOUR_GAP_RECORD"], setFlags: ["SIGN_JA", "REVERSE_RITE_OPEN"], presenceId: "zero_seat", triggersEnding: "D", log: { role: "미래 신호", text: "자시. 구조 좌표가 수신된다. 발신 시각은 아직 오지 않았다.", kind: "omega" }, once: true },
  { id: "ep2.haesul.idle", scene: "EP2_HAESUL_HOUSE", hotspot: "HAESUL", log: { role: "해술", text: "열두 칸을 순서대로 밟아야 내 이름이 왜 거꾸로인지 알어.", kind: "default" }, turnCost: 0 },
  { id: "ep2.zero.idle", scene: "EP2_HAESUL_HOUSE", hotspot: "ZERO_SIGNAL", log: { role: "무전", text: "공백은 열려 있지만 역행 인장이 없으면 발신자를 읽을 수 없다.", kind: "default" }, turnCost: 0 },
];

export const EP2_INITIAL_LOGS = [
  { turn: 1, role: "시스템", text: "에피소드 2 · 열두 존재를 부르다", kind: "system" as const },
  { turn: 1, role: "성애", text: "카빈은 내가 맡을게요. 이름부터 붙이고 쏘는 실수는 두 번 안 해요. 쏴야 할 순간이 오면 내가 먼저 알아요.", kind: "voice" as const },
  { turn: 1, role: "범석", text: "소 사체 사진과 닭 울음 사이가 정확히 열두 시간이다. 우연이라면 너무 반듯하다.", kind: "voice" as const },
  { turn: 1, role: "안내", text: "증거를 시간 순서대로 고정하십시오. 잘못된 호명은 다른 존재를 부릅니다.", kind: "danger" as const },
];

export const EPISODE_2: GameDefinition = {
  id: "ep2", number: 2, version: 2, title: "열두 존재를 부르다", headerLabel: "호포 12시간 의식 · 에피소드 2", maxTurns: EP2_MAX_TURNS,
  storageKey: "nahope_ep2_ritual_v2", scenes: EP2_SCENES,
  sceneOrder: ["EP2_CATTLE_GROUND", "EP2_RABBIT_RIDGE", "EP2_AUTOPSY_TENT", "EP2_YANGBAE_WORKSHOP", "EP2_DAWN_YARD", "EP2_HAESUL_HOUSE"],
  items: EP2_ITEMS, interactions: EP2_INTERACTIONS, endings: EP2_ENDINGS, initialScene: "EP2_CATTLE_GROUND" as SceneId,
  initialLogs: EP2_INITIAL_LOGS, initialInventory: ["CASE_FILE", "HUNTING_AMMO"], waitText: "기다린다. 원판은 움직이지 않지만 굿판의 결계가 한 겹 얇아진다.", successfulEndings: ["C", "D"],
  ritual: { phase: "invocation", direction: "forward", initialCycleIndex: 1, markers: ZODIAC_MARKERS, presenceEvents: RITUAL_PRESENCE_EVENTS, boundaryCollapseEnding: "B" },
  caseRecord: { title: "열두 호명 사건철", rows: ZODIAC_MARKERS.map((marker) => ({ label: marker.label, text: "시간 표식 확인", revealFlag: marker.revealFlag })), notes: [
    { text: "증거는 체험을 대신하지 못하고, 체험은 증거인 척할 수 없다.", revealFlag: "TWELVE_READY" },
    { text: "해술 · 해에서 술로, 의식이 역행한다.", revealFlag: "REVERSE_RITE_OPEN" },
  ] },
};
