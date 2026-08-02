import type { PresenceEvent, ZodiacMarker } from "./types";

export const ZODIAC_MARKERS: ZodiacMarker[] = [
  { sign: "JA", animal: "쥐", label: "자 · 쥐 · 영시", revealFlag: "SIGN_JA" },
  { sign: "CHUK", animal: "소", label: "축 · 소 · 사체", revealFlag: "SIGN_CHUK" },
  { sign: "IN", animal: "호랑이", label: "인 · 호랑이 · 잘못된 이름", revealFlag: "SIGN_IN" },
  { sign: "MYO", animal: "토끼", label: "묘 · 토끼 · 가죽길", revealFlag: "SIGN_MYO" },
  { sign: "JIN", animal: "용", label: "진 · 용 · 추락한 형체", revealFlag: "SIGN_JIN" },
  { sign: "SA", animal: "뱀", label: "사 · 뱀 · 몸속의 지렁이", revealFlag: "SIGN_SA" },
  { sign: "O", animal: "말", label: "오 · 말 · 살아 있는 통로", revealFlag: "SIGN_O" },
  { sign: "MI", animal: "양", label: "미 · 양 · 양배의 총성", revealFlag: "SIGN_MI" },
  { sign: "SIN", animal: "원숭이", label: "신 · 원숭이 · 몽치의 이름", revealFlag: "SIGN_SIN" },
  { sign: "YU", animal: "닭", label: "유 · 닭 · 새벽의 울음", revealFlag: "SIGN_YU" },
  { sign: "SUL", animal: "개", label: "술 · 개 · 생존자의 방향", revealFlag: "SIGN_SUL" },
  { sign: "HAE", animal: "돼지", label: "해 · 돼지 · 해술의 역순", revealFlag: "SIGN_HAE" },
];

export const RITUAL_PRESENCE_EVENTS: Record<string, PresenceEvent> = {
  cow_breath: {
    id: "cow_breath",
    title: "남아 있는 숨",
    text: "사체의 갈비뼈가 한 번 들린다. 카메라에는 움직임이 남지 않는다.",
    visualCue: "화면 가장자리의 암부가 한 차례 안쪽으로 수축한다.",
  },
  rooster_silence: {
    id: "rooster_silence",
    title: "울음 전의 무음",
    text: "장닭이 목을 세운다. 울기 직전, 무전기와 바람과 사람의 숨이 동시에 멎는다.",
    visualCue: "CRT 주사선이 잠시 사라지고 붉은 볏만 남는다.",
  },
  horse_passage: {
    id: "horse_passage",
    title: "말이 지나간 자리",
    text: "말발굽 소리가 화면 밖을 가로지른다. 그 길만 시간이 앞으로 흐른다.",
    visualCue: "장면의 한 줄기 길에서만 노이즈가 걷힌다.",
  },
  reverse_gaze: {
    id: "reverse_gaze",
    title: "거꾸로 도착한 시선",
    text: "형체는 범석이 아니라 화면 바깥의 목격자를 바라본다.",
    visualCue: "초점이 핫스폿이 아닌 화면 정중앙으로 천천히 이동한다.",
  },
  zero_seat: {
    id: "zero_seat",
    title: "열세 번째 자리",
    text: "열두 자리는 비어 있다. 마지막 한 자리는 화면 앞에 놓여 있다.",
    visualCue: "검은 화면에 플레이어 자리 높이의 희미한 윤곽이 반사된다.",
  },
};
