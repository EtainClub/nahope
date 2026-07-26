import type { AppLanguage } from "../i18n";
import type { EndingId, ItemId, Scene, SceneId } from "./types";

const ITEMS_KO: Record<ItemId, { name: string; short: string }> = {
  ARMORY_KEY: { name: "무기고 열쇠", short: "성기 하사의 놋쇠 열쇠. 꼬리표도 번호도 없다." },
  LIGHTER: { name: "놋쇠 라이터", short: "'HOPO 1971' 각인. 연료는 절반 남았다." },
  OIL: { name: "윤활유", short: "평택에서 생산된 냉전 시대 보급품." },
  SPARE_MAG: { name: "예비 탄창", short: "구경이 맞지 않는다. 절대 장전하지 말 것." },
  SCREWDRIVER: { name: "압수된 드라이버", short: "십자형. 꼬리표에는 아이에게서 압수했다고 적혀 있다." },
  POLAROID_1950: { name: "폴라로이드 (1950)", short: "이마에 Ω가 새겨진 소년. 웃고 있다." },
  MAGNIFIER: { name: "확대경", short: "폴라로이드 액자 뒤에서 떼어냈다." },
  GREEN_SLIME: { name: "녹색 외계 점액", short: "굳어 있다. 오존과 송진 냄새가 난다." },
  TRANSLATOR_FRAG: { name: "번역기 파편", short: "그리스 문자 카드. Ω가 붉은 밀랍으로 표시되어 있다." },
  FIELD_REPORT_P1: { name: "현장 보고서 1쪽", short: "'그 문양은 33년마다 돌아온다.' 2쪽과 3쪽은 사라졌다." },
  LICENSE_PLATE: { name: "호포 차량 번호판", short: "소 옆에 반쯤 묻혀 있었다. 'HOPO 4-9'." },
  RADIO_80S: { name: "80년대 야전 무전기", short: "88~108MHz. 그리고 그보다 높은 어느 채널." },
  OMEGA_MARK: { name: "오메가 표식", short: "Ω 모양의 백랍 펜던트. 손에 닿으면 따뜻하다." },
  OMEGA_MARK_APOSTATE: { name: "Ω 표식 (배교자)", short: "뒷면에는 그리스어가 아닌 단어가 새겨져 있다." },
};

const ITEM_NAME_TO_ID: Record<string, ItemId> = {
  "Armory Key": "ARMORY_KEY",
  "Brass Lighter": "LIGHTER",
  "Lubricating Oil": "OIL",
  "Spare Magazine": "SPARE_MAG",
  "Confiscated Screwdriver": "SCREWDRIVER",
  "Polaroid (1950)": "POLAROID_1950",
  "Magnifying Glass": "MAGNIFIER",
  "Green Alien Slime": "GREEN_SLIME",
  "Translator Fragment": "TRANSLATOR_FRAG",
  "Field Report p.1": "FIELD_REPORT_P1",
  "Hopo License Plate": "LICENSE_PLATE",
  "80s Field Radio": "RADIO_80S",
  "Omega Mark": "OMEGA_MARK",
  "Ω Mark (Apostate)": "OMEGA_MARK_APOSTATE",
};

const SCENES_KO: Record<SceneId, { title: string; ambient: string; hotspots: Record<string, string> }> = {
  OFFICE: {
    title: "파출소 · 사무실",
    ambient: "기름등 하나. 코를 고는 성기 하사. 벽시계는 18시 40분에 멈췄다.",
    hotspots: {
      SUNGKI_POCKET: "성기의 주머니",
      CHIEF_DRAWER: "소장 책상 서랍",
      RIFLE_RACK: "칼리반 소총",
      TYPEWRITER: "금성 타자기",
      RADIO: "야전 무전기",
    },
  },
  ARMORY: {
    title: "파출소 · 무기고 사물함",
    ambient: "먼지. 화약 냄새. 수년간 열린 적 없는 사물함.",
    hotspots: { LOCKER: "철제 사물함", BEHIND_LOCKER: "사물함 뒤편", SHELF: "윗선반" },
  },
  YARD: {
    title: "파출소 · 앞마당",
    ambient: "철조망. 안개가 바람을 거슬러 움직인다.",
    hotspots: { ANTENNA: "무전 안테나", BONG_SIK: "마을 청년", GATE: "밭으로 가는 문" },
  },
  FIELD: {
    title: "DMZ · 조밭",
    ambient: "훼손된 소. 피는 증발했다. 파리조차 내려앉지 않는다.",
    hotspots: { COW: "소 사체", PLATE_DIRT: "뒤집힌 흙", FOREST_EDGE: "숲 가장자리" },
  },
  FOREST: {
    title: "소나무 숲 · 안개 장벽",
    ambient: "소나무지만 송진이 이상하다. 안개에는 온도가 있다.",
    hotspots: { FOG_WALL: "안개", CLEARING: "빈터", COAST_PATH: "해안으로 가는 길" },
  },
  COAST: {
    title: "안개 낀 해안 · 은폐 구역",
    ambient: "소금 냄새. 그 아래에는 그리스어가 아닌 무언가가 있다.",
    hotspots: { HATCH: "철제 해치", INSCRIPTION: "비문" },
  },
};

const ENDINGS_KO: Record<EndingId, { title: string; body: string }> = {
  A: {
    title: "엔딩 A — 무지에서 태어난 비극",
    body: "봉식은 끝내 돌아오지 않는다. 새벽에 성기 하사가 시신을 발견해 낮게 중얼거리는 순간, 채널은 잡음 속으로 끊긴다.",
  },
  B: {
    title: "엔딩 B — 군법회의",
    body: "성기 하사가 밖에서 사무실 문을 잠근다. 에피소드는 끝났다. 다시 시작해야 한다.",
  },
  C: {
    title: "엔딩 C — 목격자",
    body: "봉식은 살아남았다. 당신의 손에는 Ω 표식이 들려 있다. 다음 에피소드가 열린다.",
  },
  D: {
    title: "엔딩 D — 배교자",
    body: "당신은 그를 남겨 둔 채 해안으로 향한다. 비문은 이 마을 누구도 읽을 수 없는 언어로 대답한다.",
  },
};

const LOGS_KO: Record<string, string> = {
  "'…야 이 새끼야, 너 지금 뭐 만지냐?'": "'…야 이 새끼야, 너 지금 뭐 만지냐?'",
  "Sung-ki's breathing is deep.  Two keys, a brass lighter.": "성기의 숨소리는 깊다. 열쇠 두 개와 놋쇠 라이터.",
  "His pockets are empty now.  He turns in his sleep.": "이제 주머니는 비었다. 그가 잠결에 몸을 뒤척인다.",
  "Static.  And under the static, a sound like breathing.": "잡음. 그 아래로 숨 쉬는 듯한 소리가 들린다.",
  "You kill the radio.  The room is too quiet now.": "무전기를 끈다. 이제 방 안은 지나치게 조용하다.",
  "The drawer slides open.  A screwdriver.  A Polaroid from 1950.": "서랍이 미끄러지듯 열린다. 드라이버 하나. 1950년의 폴라로이드 한 장.",
  "The drawer is stuck.  Rust, or something thicker.": "서랍이 붙었다. 녹, 아니면 그보다 더 끈적한 무언가.",
  "The drawer is empty.": "서랍은 비어 있다.",
  "You pry the back of the Polaroid frame off against the typewriter.  A magnifier was hidden inside.": "타자기 모서리에 폴라로이드 액자 뒷면을 걸어 뜯는다. 안에 확대경이 숨겨져 있었다.",
  "Goldstar typewriter.  The ribbon is dry.  It will not type.": "금성 타자기. 리본은 말라붙어 글자가 찍히지 않는다.",
  "Wrong caliber.  The chamber jams open with a crack — and any green residue inside is now ash.": "구경이 맞지 않는다. 파열음과 함께 약실이 걸려 열린다. 안쪽의 녹색 잔여물은 모두 재가 됐다.",
  "You unscrew the receiver.  In the barrel: hardened green slime, and a folded card with the Greek alphabet.  Ω is circled.": "총몸의 나사를 푼다. 총열 안에는 굳은 녹색 점액과 접힌 그리스 문자 카드가 있다. Ω에 동그라미가 쳐져 있다.",
  "The Calivan is locked to the rack.  You can see something inside the barrel.": "칼리반 소총은 거치대에 잠겨 있다. 총열 안에 무언가가 보인다.",
  "The locker swings open.  Oil.  A spare magazine.  Something pale behind the locker.": "사물함이 열린다. 윤활유. 예비 탄창. 그리고 사물함 뒤의 창백한 무언가.",
  "Locked.  You need a key.": "잠겨 있다. 열쇠가 필요하다.",
  "A torn page is wedged behind the locker.  '…the symbol returns every 33 years.'  Pages 2 and 3 are not here.": "찢긴 종이 한 장이 사물함 뒤에 끼어 있다. '…그 문양은 33년마다 돌아온다.' 2쪽과 3쪽은 없다.",
  "The locker hasn't been moved in years.  You can't reach behind it yet.": "사물함은 수년간 움직인 흔적이 없다. 아직 뒤쪽에 손이 닿지 않는다.",
  "Empty ammo crates and a calendar from 1979.": "빈 탄약 상자들과 1979년 달력.",
  "You smear the slime across the contact, line up the Greek card.  Coordinates resolve: 38°N, the field.": "접점에 점액을 바르고 그리스 문자 카드를 맞춘다. 좌표가 잡힌다. 북위 38도, 밭.",
  "The antenna hums.  Nothing answers yet.": "안테나가 낮게 울린다. 아직 응답은 없다.",
  "'분대장님, 형들이 농로로 갔어요.  저도 가야 돼요.'": "'분대장님, 형들이 농로로 갔어요. 저도 가야 돼요.'",
  "'…아니에요.  됐어요.'  He leaves before you can stop him.": "'…아니에요. 됐어요.' 막기도 전에 그가 떠난다.",
  "The fog is too thick to risk it without coordinates.": "좌표 없이 들어가기에는 안개가 너무 짙다.",
  "You step through the gate.  The fog parts, briefly.": "문을 통과한다. 잠시 안개가 갈라진다.",
  "Under magnification: an Ω burned into the hide, with smaller letters around it that are not Greek.": "확대해 보니 가죽에 Ω가 그을려 있다. 주위의 작은 글자들은 그리스어가 아니다.",
  "A mutilated cow.  The blood seems to have evaporated.  The flies will not land.": "훼손된 소. 피가 증발한 듯하다. 파리조차 내려앉지 않는다.",
  "Half-buried beside the cow: a license plate.  'HOPO 4-9'.": "소 옆에 반쯤 묻힌 번호판. 'HOPO 4-9'.",
  "Crows lift off as you approach.  Whatever was here, they've taken it.": "다가가자 까마귀들이 날아오른다. 여기에 있던 것은 무엇이든 그들이 가져갔다.",
  "Disturbed soil.  Nothing left.": "뒤집힌 흙. 남은 것은 없다.",
  "You don't go into a forest until you understand the field.": "밭에서 무슨 일이 있었는지 알기 전에는 숲으로 들어갈 수 없다.",
  "You step under the pines.  The fog has a temperature.": "소나무 아래로 들어선다. 안개에는 온도가 있다.",
  "Page 1 catches.  The fog reels back from the flame as if it could feel it.": "보고서 1쪽에 불이 붙는다. 안개가 불꽃을 느끼기라도 한 듯 뒤로 물러난다.",
  "The fog is solid.  Not a substance — a refusal.": "안개는 단단하다. 물질이 아니라, 거부 그 자체다.",
  "You hold the Greek card up to the light.  You do not move toward him.": "그리스 문자 카드를 빛에 비춰 본다. 그에게 다가가지는 않는다.",
  "Bong-sik is standing in the clearing — smiling wrong.  You pull him back by the collar.  The Ω falls into your palm.": "봉식이 빈터에 서 있다. 잘못된 방식으로 웃고 있다. 멱살을 잡아 끌어내자 Ω가 손바닥으로 떨어진다.",
  "'…아이복판이 죽어 있냐 씨.'": "'…아이복판이 죽어 있냐 씨.'",
  "A path you didn't see before.  It goes seaward.": "전에는 보이지 않던 길. 바다 쪽으로 이어진다.",
  "You follow the path seaward.": "바다 쪽 길을 따라간다.",
  "The card refuses to fit.  The letters lean the wrong way — and yet you understand half of one word.": "카드는 맞아 들어가기를 거부한다. 글자들은 반대 방향으로 기울어 있는데, 이상하게도 한 단어의 절반을 이해할 수 있다.",
  "Letters that lean the wrong way.  Pages 2 and 3 would have helped.": "반대 방향으로 기운 글자들. 2쪽과 3쪽이 있었다면 도움이 됐을 것이다.",
  "The hatch reads you back.  It is not Greek.  It is older, and it knows you left him.": "해치가 오히려 당신을 읽는다. 그리스어가 아니다. 더 오래된 것이며, 당신이 그를 버렸다는 사실을 안다.",
  "The wheel does not turn.  The inscription is watching.": "회전 손잡이는 움직이지 않는다. 비문이 지켜보고 있다.",
  "The hatch is heavier than the world.  Something is missing.": "해치는 세계보다 무겁다. 무언가 빠져 있다.",
  "1983.08.◯◯ · 18:40 · ω-channel synced.": "1983.08.◯◯ · 18:40 · ω-채널 동기화 완료.",
  "'We are completely blocked.  No phones, no police radios.  Keep your eyes open.'": "'완전히 고립됐다. 전화도 경찰 무전도 안 된다. 눈 크게 뜨고 있어.'",
  "Move between rooms · equip items on the deck · click hotspots to act.": "공간 사이를 이동하고 · 증거판의 물품을 장착한 뒤 · 조사 지점을 클릭해 행동하십시오.",
  "Nothing happens.": "아무 일도 일어나지 않는다.",
  "That doesn't fit here.": "여기에는 사용할 수 없다.",
  "That way is closed.": "그쪽 길은 막혀 있다.",
  "You wait.  The fog moves.": "기다린다. 안개가 움직인다.",
};

const ROLES_KO: Record<string, string> = {
  SYSTEM: "시스템",
  RADIO: "무전",
  "SUNG-KI": "성기",
  "BONG-SIK": "봉식",
  "BUM-SEOK": "범석",
  TUTORIAL: "안내",
  OMEGA: "오메가",
};

export function getItemCopy(id: ItemId, language: AppLanguage, fallback: { name: string; short: string }) {
  return language === "ko" ? ITEMS_KO[id] : fallback;
}

export function localizeStoredItemName(name: string, language: AppLanguage) {
  if (language === "en") return name;
  const id = ITEM_NAME_TO_ID[name];
  return id ? ITEMS_KO[id].name : name;
}

export function getSceneCopy(
  id: SceneId,
  language: AppLanguage,
  fallback: Scene,
): Scene {
  if (language === "en") return fallback;
  const copy = SCENES_KO[id];
  return {
    ...fallback,
    title: copy.title,
    ambient: copy.ambient,
    hotspots: fallback.hotspots.map((hotspot) => ({
      ...hotspot,
      label: copy.hotspots[hotspot.id] ?? hotspot.label,
    })),
  };
}

export function getEndingCopy(
  id: EndingId,
  language: AppLanguage,
  fallback: { title: string; body: string },
) {
  return language === "ko" ? ENDINGS_KO[id] : fallback;
}

export function localizeGameRole(role: string, language: AppLanguage) {
  return language === "ko" ? (ROLES_KO[role] ?? role) : role;
}

export function localizeGameLog(text: string, language: AppLanguage) {
  if (language === "en") return text;
  if (text.startsWith("→ ")) {
    const englishTitle = text.slice(2);
    const sceneId = (Object.keys(SCENES_KO) as SceneId[]).find(
      (id) => ENGLISH_SCENE_TITLES[id] === englishTitle,
    );
    return sceneId ? `→ ${SCENES_KO[sceneId].title}` : text;
  }
  return LOGS_KO[text] ?? text;
}

const ENGLISH_SCENE_TITLES: Record<SceneId, string> = {
  OFFICE: "Substation · Office",
  ARMORY: "Substation · Armory Locker",
  YARD: "Substation · Front Yard",
  FIELD: "DMZ · Millet Field",
  FOREST: "Pine Forest · Fog Wall",
  COAST: "Foggy Coast · Hidden",
};
