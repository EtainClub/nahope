// Episode 4 — 열두 시간 바깥에서 송신을 선택하는 마지막 굿.
import type { EndingDescriptor, EndingId, GameDefinition, Interaction, Item, Scene, SceneId } from "./types";
import { RITUAL_PRESENCE_EVENTS, ZODIAC_MARKERS } from "./ritual";

export const EP4_MAX_TURNS = 42;

export const EP4_ITEMS: Record<string, Item> = {
  RITUAL_CLOCK: { id: "RITUAL_CLOCK", name: "완성된 12간지 의식 원판", short: "열두 시간의 증거와 체험이 각자의 칸에 남아 있다.", art: "/images/game/ep2/items/hull_fragment.svg", artifact: true },
  OMEGA_ZERO_SIGNAL: { id: "OMEGA_ZERO_SIGNAL", name: "오메가 영시 신호", short: "미래의 구조 요청이 과거의 추락을 만든 부트스트랩 신호.", art: "/images/game/ep2/items/hull_fragment.svg", artifact: true },
  TWELVE_LIVING_WITNESSES: { id: "TWELVE_LIVING_WITNESSES", name: "열두 살아 있는 목격자", short: "사람과 동물이 희생물이나 전시물이 되지 않은 채 경계를 건넜다.", art: "/images/game/ep2/items/report.svg", artifact: true },
  FIXED_POINT_LEDGER: { id: "FIXED_POINT_LEDGER", name: "고정점 장부", short: "추락, 말의 출발, 최초 총성을 가변 선택과 분리한다.", art: "/images/game/ep2/items/report.svg", artifact: true },
  MUTABLE_CAUSE_MAP: { id: "MUTABLE_CAUSE_MAP", name: "가변 인과 지도", short: "호랑이라는 이름, 두 번째 총성, 대피와 반환은 아직 선택할 수 있다.", art: "/images/game/ep2/items/search_map.svg" },
  PRESENCE_TESTIMONY: { id: "PRESENCE_TESTIMONY", name: "현존 체험 증언", short: "무음, 시선, 말발굽과 몸의 감각을 사실이나 창작으로 위장하지 않은 기록.", art: "/images/game/ep2/items/report.svg", artifact: true },
  THIRTEENTH_PROPOSAL: { id: "THIRTEENTH_PROPOSAL", name: "열세 번째 선택 초안", short: "정해진 열두 시간 밖에서 플레이어가 서명한 다음 접촉 제안.", art: "/images/game/ep2/items/search_map.svg", artifact: true },
  THREE_LAYER_RITUAL_ARCHIVE: { id: "THREE_LAYER_RITUAL_ARCHIVE", name: "세 겹 의식 기록", short: "증거, 현존 체험, 창작 제안이 섞이지 않은 채 연결되어 있다.", art: "/images/game/ep2/items/hull_fragment.svg", artifact: true },
  COMMUNITY_RITE_PACKET: { id: "COMMUNITY_RITE_PACKET", name: "공동체 굿판 기록 묶음", short: "사실은 투표하지 않고 제안만 공동 검토에 올리는 공개 기록.", art: "/images/game/ep2/items/ceasefire_flare.svg", artifact: true },
  SENDING_OFF_RECORD: { id: "SENDING_OFF_RECORD", name: "송신 완료 기록", short: "저쪽 존재를 전시하거나 소유하지 않고 경계 너머로 돌려보낸 기록.", art: "/images/game/ep2/items/report.svg", artifact: true },
};

export const EP4_SCENES: Record<string, Scene> = {
  EP4_ZERO_CHAMBER: { id: "EP4_ZERO_CHAMBER", title: "영시 의식실 · 열세 번째 자리", ambient: "열두 좌석은 원판을 둘러싸고 비어 있다. 마지막 자리는 화면 앞에 놓여 있다.", art: "/images/game/ep4/archive.svg", exits: ["EP4_FIXED_VAULT"], hotspots: [
    { id: "TWELVE_SEATS", label: "열두 빈자리", top: "18%", left: "8%", width: "48%", height: "52%" },
    { id: "THIRTEENTH_SEAT", label: "화면 앞의 열세 번째 자리", top: "62%", left: "62%", width: "28%", height: "24%" },
  ] },
  EP4_FIXED_VAULT: { id: "EP4_FIXED_VAULT", title: "고정점 보관실 · 바꿀 수 없는 것", ambient: "세 사건이 같은 밝기로 반복된다. 바꾸려 할수록 그 사건의 원인이 된다.", art: "/images/game/ep4/timeline.svg", exits: ["EP4_ZERO_CHAMBER", "EP4_PRESENCE_HALL"], lockedUntil: "RITE_ADMITTED", hotspots: [
    { id: "CRASH", label: "함선 추락 고정점", top: "16%", left: "5%", width: "27%", height: "48%" },
    { id: "HORSE", label: "말의 출발 고정점", top: "16%", left: "37%", width: "27%", height: "48%" },
    { id: "FIRST_SHOT", label: "인간 최초 총성 고정점", top: "16%", left: "69%", width: "26%", height: "48%" },
    { id: "FIXED_TABLE", label: "고정점 장부대", top: "70%", left: "26%", width: "48%", height: "22%" },
  ] },
  EP4_PRESENCE_HALL: { id: "EP4_PRESENCE_HALL", title: "현존의 방 · 복제되지 않는 체험", ambient: "기록된 영상은 같지만 무음의 길이와 피부에 닿는 진동은 회차마다 다르다.", art: "/images/game/ep4/classifier.svg", exits: ["EP4_FIXED_VAULT", "EP4_PROPOSAL_LAB"], lockedUntil: "FIXED_POINTS_VERIFIED", hotspots: [
    { id: "EVIDENCE_LAYER", label: "물리 증거 단말기", top: "18%", left: "6%", width: "26%", height: "48%" },
    { id: "PRESENCE_LAYER", label: "한 번뿐인 현존 좌석", top: "18%", left: "38%", width: "26%", height: "48%" },
    { id: "EXHIBITION_SWITCH", label: "영구 전시 스위치", top: "18%", left: "70%", width: "24%", height: "48%" },
    { id: "BOUNDARY_SCHEMA", label: "증거와 체험의 경계", top: "70%", left: "27%", width: "46%", height: "22%" },
  ] },
  EP4_PROPOSAL_LAB: { id: "EP4_PROPOSAL_LAB", title: "열세 번째 선택실 · 창작의 서명", ambient: "다음 이야기는 미래를 예언하지 않는다. 누가 무엇을 상상했는지 숨기지 않을 뿐이다.", art: "/images/game/ep4/scenario.svg", exits: ["EP4_PRESENCE_HALL", "EP4_PUBLIC_ARCHIVE"], lockedUntil: "PRESENCE_CLASSIFIED", hotspots: [
    { id: "FACT_PANEL", label: "증거 층", top: "18%", left: "6%", width: "26%", height: "48%" },
    { id: "PRESENCE_PANEL", label: "현존 증언 층", top: "18%", left: "38%", width: "26%", height: "48%" },
    { id: "PROPOSAL_PANEL", label: "창작 제안 층", top: "18%", left: "70%", width: "24%", height: "48%" },
    { id: "LAYER_CONSOLE", label: "세 겹 기록 합성기", top: "70%", left: "27%", width: "46%", height: "22%" },
  ] },
  EP4_PUBLIC_ARCHIVE: { id: "EP4_PUBLIC_ARCHIVE", title: "공개 기록실 · 제의와 전시", ambient: "같은 기록이 소각로, 밀봉함, 군사 단말기와 공동체 거울 앞에 놓여 있다.", art: "/images/game/ep4/governance.svg", exits: ["EP4_PROPOSAL_LAB", "EP4_SENDING_GATE"], lockedUntil: "THREE_LAYERS_READY", hotspots: [
    { id: "FURNACE", label: "기계 장치 소각로", top: "18%", left: "4%", width: "22%", height: "50%" },
    { id: "SEALED_CASE", label: "영구 밀봉함", top: "18%", left: "28%", width: "22%", height: "50%" },
    { id: "MILITARY_FEED", label: "예측 사냥 단말기", top: "18%", left: "52%", width: "22%", height: "50%" },
    { id: "PUBLIC_MIRROR", label: "공동체 공개 거울", top: "18%", left: "76%", width: "20%", height: "50%" },
  ] },
  EP4_SENDING_GATE: { id: "EP4_SENDING_GATE", title: "송신 결계 · 마지막 장단", ambient: "장닭이 숨을 들이킨다. 말발굽 소리가 저쪽으로 멀어진다. 전송 버튼은 하나뿐이다.", art: "/images/game/ep4/transmission.svg", exits: ["EP4_PUBLIC_ARCHIVE"], lockedUntil: "COMMUNITY_PACKET_READY", hotspots: [
    { id: "SIGNAL_WINDOW", label: "사라지는 외계 신호", top: "12%", left: "8%", width: "34%", height: "52%" },
    { id: "SENDING_RELAY", label: "마지막 송신 릴레이", top: "18%", left: "62%", width: "28%", height: "54%" },
  ] },
};

export const EP4_ENDINGS: Record<EndingId, EndingDescriptor> = {
  A: { id: "A", title: "엔딩 A — 무구의 파괴", body: "기계와 기록을 불태워 반복을 끝낸다. 저쪽 존재는 사라지지만 호포가 무엇을 겪었는지도 함께 사라진다." },
  B: { id: "B", title: "엔딩 B — 영구 전시", body: "굿판을 끝나지 않는 영상과 예측 사냥 자료로 만든다. 존재는 영원히 재생되며 결계 밖으로 돌아가지 못한다.", isRestart: true },
  C: { id: "C", title: "엔딩 C — 밀봉된 굿", body: "완전한 의식을 소수의 보관자에게만 남긴다. 아우라는 보존되지만 공동체는 다시 관객으로 밀려난다.", grantsArtifacts: ["FIXED_POINT_LEDGER", "PRESENCE_TESTIMONY", "THREE_LAYER_RITUAL_ARCHIVE"] },
  D: { id: "D", title: "엔딩 D — 열세 번째 목격자", body: "증거는 공개하고 체험은 증언으로 남기며 창작은 작성자가 서명한다. 마지막 울음과 함께 존재는 경계 너머로 돌아간다.", grantsArtifacts: ["COMMUNITY_RITE_PACKET", "THIRTEENTH_PROPOSAL", "SENDING_OFF_RECORD"] },
};

export const EP4_INTERACTIONS: Interaction[] = [
  { id: "ep4.zero.admit", scene: "EP4_ZERO_CHAMBER", hotspot: "TWELVE_SEATS", requires: { item: "RITUAL_CLOCK", flagsNone: ["RITE_ADMITTED"] }, setFlags: ["RITE_ADMITTED", ...ZODIAC_MARKERS.map((marker) => marker.revealFlag)], presenceId: "zero_seat", log: { role: "의식실", text: "열두 자리에 각 시간의 증거가 놓인다. 비어 있는 것은 동물이 아니라 관객의 자리다.", kind: "omega" }, once: true },
  { id: "ep4.zero.witness", scene: "EP4_ZERO_CHAMBER", hotspot: "THIRTEENTH_SEAT", requires: { flagsAll: ["RITE_ADMITTED"], flagsNone: ["THIRTEENTH_PRESENT"] }, setFlags: ["THIRTEENTH_PRESENT"], anchorEvidence: ["PLAYER_WITNESS"], log: { role: "시스템", text: "열세 번째 목격자가 자리에 앉는다. 이제 화면 바깥도 사건 기록에 포함된다.", kind: "system" }, once: true },
  { id: "ep4.zero.idle", scene: "EP4_ZERO_CHAMBER", hotspot: "TWELVE_SEATS", log: { role: "시스템", text: "완성된 의식 원판으로 열두 자리를 먼저 열어야 한다.", kind: "default" }, turnCost: 0 },
  { id: "ep4.fixed.crash", scene: "EP4_FIXED_VAULT", hotspot: "CRASH", requires: { flagsNone: ["CRASH_FIXED"] }, setFlags: ["CRASH_FIXED"], log: { role: "오메가 기록", text: "고정점 하나. 구조 신호와 함선 추락은 서로의 원인이다.", kind: "omega" }, once: true },
  { id: "ep4.fixed.horse", scene: "EP4_FIXED_VAULT", hotspot: "HORSE", requires: { item: "TWELVE_LIVING_WITNESSES", flagsNone: ["HORSE_FIXED"] }, setFlags: ["HORSE_FIXED"], log: { role: "오메가 기록", text: "고정점 둘. 말은 떠나야 살아 있는 통로가 열린다. 붙잡는 순간 길이 닫힌다.", kind: "system" }, once: true },
  { id: "ep4.fixed.shot", scene: "EP4_FIXED_VAULT", hotspot: "FIRST_SHOT", requires: { item: "OMEGA_ZERO_SIGNAL", flagsNone: ["SHOT_FIXED"] }, setFlags: ["SHOT_FIXED"], log: { role: "오메가 기록", text: "고정점 셋. 양배의 최초 총성은 지울 수 없다. 다음 총성은 아직 고정되지 않았다.", kind: "danger" }, once: true },
  { id: "ep4.fixed.compile", scene: "EP4_FIXED_VAULT", hotspot: "FIXED_TABLE", requires: { flagsAll: ["CRASH_FIXED", "HORSE_FIXED", "SHOT_FIXED", "THIRTEENTH_PRESENT"], flagsNone: ["FIXED_POINTS_VERIFIED"] }, grants: ["FIXED_POINT_LEDGER"], setFlags: ["FIXED_POINTS_VERIFIED"], log: { role: "시스템", text: "고정점과 선택 가능한 원인이 분리된다. 운명이라는 말이 모든 책임을 가져갈 수 없게 된다.", kind: "system" }, once: true },
  { id: "ep4.fixed.idle", scene: "EP4_FIXED_VAULT", hotspot: "FIXED_TABLE", log: { role: "시스템", text: "추락, 말의 출발, 최초 총성을 각각 확인해야 한다.", kind: "default" }, turnCost: 0 },
  { id: "ep4.presence.evidence", scene: "EP4_PRESENCE_HALL", hotspot: "EVIDENCE_LAYER", requires: { item: "FIXED_POINT_LEDGER", flagsNone: ["EVIDENCE_CLASSIFIED"] }, grants: ["MUTABLE_CAUSE_MAP"], setFlags: ["EVIDENCE_CLASSIFIED"], log: { role: "분류 단말기", text: "증거 층. 사진, 탄환, 파형과 이동 경로만 사실로 등록한다.", kind: "system" }, once: true },
  { id: "ep4.presence.witness", scene: "EP4_PRESENCE_HALL", hotspot: "PRESENCE_LAYER", requires: { flagsNone: ["PRESENCE_RECORDED"] }, grants: ["PRESENCE_TESTIMONY"], setFlags: ["PRESENCE_RECORDED"], presenceId: "reverse_gaze", log: { role: "목격자", text: "현존 층. 무음과 시선과 진동을 사실로 과장하지 않고 몸의 증언으로 남긴다.", kind: "omega" }, once: true },
  { id: "ep4.presence.exhibit", scene: "EP4_PRESENCE_HALL", hotspot: "EXHIBITION_SWITCH", requires: { item: "PRESENCE_TESTIMONY" }, triggersEnding: "B", log: { role: "영구 전시", text: "한 번뿐인 체험을 끝없는 재생 목록으로 변환한다. 송신할 문이 닫힌다.", kind: "danger" }, once: true },
  { id: "ep4.presence.boundary", scene: "EP4_PRESENCE_HALL", hotspot: "BOUNDARY_SCHEMA", requires: { item: "MUTABLE_CAUSE_MAP", has: ["PRESENCE_TESTIMONY"], flagsAll: ["EVIDENCE_CLASSIFIED", "PRESENCE_RECORDED"], flagsNone: ["PRESENCE_CLASSIFIED"] }, setFlags: ["PRESENCE_CLASSIFIED"], log: { role: "시스템", text: "증거와 현존 체험 사이에 지워지지 않는 경계선을 긋는다.", kind: "system" }, once: true },
  { id: "ep4.presence.idle", scene: "EP4_PRESENCE_HALL", hotspot: "BOUNDARY_SCHEMA", log: { role: "시스템", text: "물리 증거와 몸의 증언을 각각 등록해야 다음 이야기를 쓸 수 있다.", kind: "default" }, turnCost: 0 },
  { id: "ep4.proposal.fact", scene: "EP4_PROPOSAL_LAB", hotspot: "FACT_PANEL", requires: { item: "FIXED_POINT_LEDGER", flagsNone: ["FACT_LAYER_SIGNED"] }, setFlags: ["FACT_LAYER_SIGNED"], log: { role: "시스템", text: "증거 층 서명. 공동체 투표로 사실을 바꿀 수 없다.", kind: "system" }, once: true },
  { id: "ep4.proposal.presence", scene: "EP4_PROPOSAL_LAB", hotspot: "PRESENCE_PANEL", requires: { item: "PRESENCE_TESTIMONY", flagsNone: ["PRESENCE_LAYER_SIGNED"] }, setFlags: ["PRESENCE_LAYER_SIGNED"], log: { role: "시스템", text: "현존 층 서명. 다른 사람이 같은 감각을 복제할 수 없음을 함께 기록한다.", kind: "omega" }, once: true },
  { id: "ep4.proposal.write", scene: "EP4_PROPOSAL_LAB", hotspot: "PROPOSAL_PANEL", requires: { flagsNone: ["PROPOSAL_SIGNED"] }, grants: ["THIRTEENTH_PROPOSAL"], setFlags: ["PROPOSAL_SIGNED"], log: { role: "열세 번째 목격자", text: "다음 접촉에서 먼저 이름 붙이거나 먼저 쏘지 않는다는 제안을 창작자의 이름으로 서명한다.", kind: "voice" }, once: true },
  { id: "ep4.proposal.combine", scene: "EP4_PROPOSAL_LAB", hotspot: "LAYER_CONSOLE", requires: { item: "MUTABLE_CAUSE_MAP", has: ["FIXED_POINT_LEDGER", "PRESENCE_TESTIMONY", "THIRTEENTH_PROPOSAL"], flagsAll: ["FACT_LAYER_SIGNED", "PRESENCE_LAYER_SIGNED", "PROPOSAL_SIGNED"], flagsNone: ["THREE_LAYERS_READY"] }, grants: ["THREE_LAYER_RITUAL_ARCHIVE"], setFlags: ["THREE_LAYERS_READY"], log: { role: "시스템", text: "증거, 현존, 제안이 세 겹으로 결합된다. 어느 층도 다른 층을 사칭할 수 없다.", kind: "system" }, once: true },
  { id: "ep4.proposal.idle", scene: "EP4_PROPOSAL_LAB", hotspot: "LAYER_CONSOLE", log: { role: "시스템", text: "세 층 모두 작성자와 근거를 드러내야 기록을 합칠 수 있다.", kind: "default" }, turnCost: 0 },
  { id: "ep4.archive.destroy", scene: "EP4_PUBLIC_ARCHIVE", hotspot: "FURNACE", requires: { item: "THREE_LAYER_RITUAL_ARCHIVE" }, destroys: ["THREE_LAYER_RITUAL_ARCHIVE"], triggersEnding: "A", log: { role: "시스템", text: "무구와 기록이 함께 탄다. 반복은 끝나지만 증언도 남지 않는다.", kind: "danger" }, once: true },
  { id: "ep4.archive.seal", scene: "EP4_PUBLIC_ARCHIVE", hotspot: "SEALED_CASE", requires: { item: "THREE_LAYER_RITUAL_ARCHIVE" }, triggersEnding: "C", log: { role: "보관자", text: "완전한 의식을 밀봉한다. 아우라는 남지만 공동체는 다시 문밖에 선다.", kind: "omega" }, once: true },
  { id: "ep4.archive.weaponize", scene: "EP4_PUBLIC_ARCHIVE", hotspot: "MILITARY_FEED", requires: { item: "THREE_LAYER_RITUAL_ARCHIVE" }, triggersEnding: "B", log: { role: "군사 단말기", text: "12시간의 반복을 예측 사격표로 변환한다. 굿판이 완벽한 사냥터가 된다.", kind: "danger" }, once: true },
  { id: "ep4.archive.open", scene: "EP4_PUBLIC_ARCHIVE", hotspot: "PUBLIC_MIRROR", requires: { item: "THREE_LAYER_RITUAL_ARCHIVE", has: ["THIRTEENTH_PROPOSAL"], flagsNone: ["COMMUNITY_PACKET_READY"] }, grants: ["COMMUNITY_RITE_PACKET"], setFlags: ["COMMUNITY_PACKET_READY"], log: { role: "공동체 거울", text: "사실은 검증 대상으로, 체험은 증언으로, 제안은 투표 가능한 창작으로 공개된다.", kind: "system" }, once: true },
  { id: "ep4.archive.idle", scene: "EP4_PUBLIC_ARCHIVE", hotspot: "PUBLIC_MIRROR", log: { role: "시스템", text: "세 겹 기록과 서명된 열세 번째 제안이 모두 필요하다.", kind: "default" }, turnCost: 0 },
  { id: "ep4.sending.signal", scene: "EP4_SENDING_GATE", hotspot: "SIGNAL_WINDOW", requires: { flagsNone: ["FINAL_PRESENCE_SEEN"] }, setFlags: ["FINAL_PRESENCE_SEEN"], presenceId: "rooster_silence", log: { role: "저쪽 신호", text: "번역되지 않은 파형이 장닭의 울음 직전 멎는다. 말발굽은 화면 밖으로 멀어진다.", kind: "omega" }, once: true },
  { id: "ep4.sending.complete", scene: "EP4_SENDING_GATE", hotspot: "SENDING_RELAY", requires: { item: "COMMUNITY_RITE_PACKET", has: ["THIRTEENTH_PROPOSAL", "PRESENCE_TESTIMONY"], flagsAll: ["FINAL_PRESENCE_SEEN", "PLAYER_WITNESS"] }, grants: ["SENDING_OFF_RECORD"], setFlags: ["SENDING_COMPLETE"], presenceId: "zero_seat", triggersEnding: "D", log: { role: "송신 결계", text: "증거는 남고 체험은 증언이 되며 존재는 소유되지 않은 채 돌아간다. 굿판을 닫는다.", kind: "omega" }, once: true },
  { id: "ep4.sending.idle", scene: "EP4_SENDING_GATE", hotspot: "SENDING_RELAY", log: { role: "시스템", text: "마지막 현존을 목격하고 공동체 기록 묶음을 준비해야 송신할 수 있다.", kind: "default" }, turnCost: 0 },
];

export const EP4_INITIAL_LOGS = [
  { turn: 1, role: "시스템", text: "에피소드 4 · 열세 번째 목격자", kind: "system" as const },
  { turn: 1, role: "오메가 의식실", text: "복제된 화면은 같아도 이 자리에 도착한 몸은 한 번뿐이다.", kind: "omega" as const },
  { turn: 1, role: "안내", text: "증거, 현존 체험, 창작 제안을 분리하고 굿판을 송신으로 닫으십시오.", kind: "danger" as const },
];

export const EPISODE_4: GameDefinition = {
  id: "ep4", number: 4, version: 2, title: "열세 번째 목격자", headerLabel: "오메가 영시 의식실 · 에피소드 4", maxTurns: EP4_MAX_TURNS,
  storageKey: "nahope_ep4_thirteenth_witness_v2", scenes: EP4_SCENES,
  sceneOrder: ["EP4_ZERO_CHAMBER", "EP4_FIXED_VAULT", "EP4_PRESENCE_HALL", "EP4_PROPOSAL_LAB", "EP4_PUBLIC_ARCHIVE", "EP4_SENDING_GATE"],
  items: EP4_ITEMS, interactions: EP4_INTERACTIONS, endings: EP4_ENDINGS, initialScene: "EP4_ZERO_CHAMBER" as SceneId,
  initialLogs: EP4_INITIAL_LOGS, initialInventory: ["RITUAL_CLOCK", "OMEGA_ZERO_SIGNAL", "TWELVE_LIVING_WITNESSES"],
  waitText: "기다린다. 같은 영상이 반복되지만 무음의 길이는 전과 다르다.", successfulEndings: ["C", "D"],
  ritual: { phase: "sending", direction: "outside", initialCycleIndex: 0, markers: ZODIAC_MARKERS, presenceEvents: RITUAL_PRESENCE_EVENTS, boundaryCollapseEnding: "B" },
  caseRecord: { title: "송신 의식 기록", rows: [
    { label: "고정점", text: "추락, 말의 출발, 인간 최초 총성", revealFlag: "FIXED_POINTS_VERIFIED" },
    { label: "가변 인과", text: "이름, 두 번째 총성, 대피와 반환", revealFlag: "EVIDENCE_CLASSIFIED" },
    { label: "현존 체험", text: "복제할 수 없는 몸의 증언", revealFlag: "PRESENCE_RECORDED" },
    { label: "창작 제안", text: "열세 번째 목격자가 서명한 다음 선택", revealFlag: "PROPOSAL_SIGNED" },
    { label: "공동체 공개", text: "사실은 검증하고 제안만 투표", revealFlag: "COMMUNITY_PACKET_READY" },
  ], notes: [
    { text: "영화라는 기계 장치가 무구가 되고 화면 앞의 관객이 마지막 목격자가 된다.", revealFlag: "THREE_LAYERS_READY" },
    { text: "희망은 답을 소유하는 일이 아니라 다음 최초 총성을 선택으로 남기는 일이다.", revealFlag: "SENDING_COMPLETE" },
  ] },
};
