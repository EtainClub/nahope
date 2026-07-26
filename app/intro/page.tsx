"use client";

import Image from "next/image";
import {
  Shield,
  Radio,
  Eye,
  Clapperboard,
  FlaskConical,
  Wrench,
  Globe,
  FileText,
  Hammer,
  MessageCircle,
  UsersRound,
  Stethoscope,
} from "lucide-react";
import { useLanguage } from "../../lib/i18n";

// JSON-LD for the movie
const movieJsonLd = {
  "@context": "https://schema.org",
  "@type": "Movie",
  name: "HOPE",
  alternateName: "Hope",
  description:
    "A cosmic horror thriller about extraterrestrial beings and survivors in the fog-shrouded coastal village of Hopo Port.",
  director: {
    "@type": "Person",
    name: "Na Hong-jin",
  },
  actor: [
    { "@type": "Person", name: "Hwang Jung-min" },
    { "@type": "Person", name: "Jo In-sung" },
    { "@type": "Person", name: "Jung Ho-yeon" },
    { "@type": "Person", name: "Taylor Russell" },
    { "@type": "Person", name: "Cameron Britton" },
    { "@type": "Person", name: "Alicia Vikander" },
    { "@type": "Person", name: "Michael Fassbender" },
    { "@type": "Person", name: "Eum Moon-suk" },
    { "@type": "Person", name: "Lim Hyun-sik" },
    { "@type": "Person", name: "Lee Sang-hee" },
    { "@type": "Person", name: "Hwang Seok-jeong" },
  ],
  genre: ["Sci-Fi", "Cosmic Horror", "Thriller"],
  productionCompany: [
    { "@type": "Organization", name: "Forged Films" },
    { "@type": "Organization", name: "Plus M Entertainment" },
  ],
  image: "https://nahope.com/images/og-banner.png",
  url: "https://nahope.com/intro",
};

const pageCopy = {
  ko: {
    languageLabel: "언어 선택",
    classifiedProfile: "// 기밀 영화 기록 //",
    pageTitle: "영화 정보: HOPE",
    synopsisTitle: "기밀 시놉시스",
    synopsis: [
      "짙은 안개에 잠긴 외딴 해안 마을 호포항. 일상적인 군 순찰 도중 기이하게 훼손된 동물 사체들이 연이어 발견된다. 불과 몇 시간 만에 육지와 연결된 모든 통신망이 완전히 끊기고, 하늘은 짙은 보랏빛 황혼으로 변한다. 거대한 전자기 장막이 마을 전체를 외부 세계로부터 고립시킨다.",
      "공포가 항구를 집어삼키자 생존자들은 지역 경찰서로 몸을 피한다. 그러나 정체불명의 무선 신호는 더 끔찍한 진실을 암시한다. 키 4.5~6미터에 이르는 거대한 변형 생명체가 숲에 내려왔고, 이미 무리 안의 누군가를 장악했을지도 모른다. 불신이 번지며 생존은 서로의 신경을 겨누는 심리전으로 변한다.",
    ],
    quote:
      "하늘이 어두워지고 모든 신호가 끊겼을 때, 당신은 누구를 믿을 것인가? 우주적 고립 앞에서 인간의 나약함은 가장 깊은 약점이 된다.",
    trailerTitle: "HOPE 공식 예고편",
    ensembleTitle: "등장인물 및 주요 출연진",
    roleLabel: "역할",
    alienArchive: "외계 생명체 기록 // 게르투",
    alienSectionTitle: "외계 세계관 및 캐릭터 도감",
    spoilerWarning: "경고 // 영화 전체 스포일러 포함",
    encounterAlt: "영화 HOPE에서 숲속의 기마인을 추격하는 게르투 외계 생명체",
    firstContactRecord: "최초 조우 기록",
    incursionTitle: "호포항 침공 사건",
    archiveDate: "기록 보관 // 197X",
    biologyReport: "제국 생물학 보고서",
    gertuTitle: "게르투: 임무를 위해 태어난 육체",
    gertuDescription:
      "이 방문자들은 하나의 괴물 종이 아니다. 서로 완전히 다른 육체에 계급과 노동, 황실과의 거리가 새겨진 신분제 문명의 구성원들이다. 무작위로 모인 괴물처럼 보이는 존재들은 사실 인간의 공포 속에 고립된 황실 가족과 호위병, 시종들이다.",
    sourceLink: "공개 정보 열람 // 팬마음 기록 보관소 ↗",
    specimenLabel: "개체",
    directorRole: "감독 및 각본",
    directorHeadline: "샤머니즘 스릴러의 선구자",
    directorDescription: [
      "나홍진 감독은 타협하지 않는 거친 연출, 강렬한 속도감, 오컬트 이미지로 세계적인 명성을 얻었다. 대표작으로는 한국 스릴러의 고전으로 평가받는 《추격자》(2008), 《황해》(2010), 오컬트 호러 걸작 《곡성》(2016)이 있다.",
      "《HOPE》는 나홍진 감독이 처음으로 본격적인 SF 코즈믹 스릴러에 도전한 작품이다. 한국의 플러스엠 엔터테인먼트와 마이클 패스벤더, 알리시아 비칸데르를 비롯한 글로벌 배우들이 참여한 대규모 공동 제작으로, 외딴 항구를 무대로 인간과 외계 생명체 사이의 폐쇄적인 공성전을 그린다. 작품은 극한의 고립 속에서 인간의 회복력과 협력, 불신의 한계를 탐구한다.",
    ],
  },
  en: {
    languageLabel: "Select language",
    classifiedProfile: "// CLASSIFIED MOVIE PROFILE //",
    pageTitle: "FILM PROFILE: HOPE",
    synopsisTitle: "CLASSIFIED SYNOPSIS",
    synopsis: [
      "In the desolate, fog-shrouded coastal village of Hopo Port, a routine military patrol discovers a sequence of bizarre animal mutilations. Within hours, all communication networks to the mainland are completely severed. The sky turns into a deep purple twilight as a massive electromagnetic dome locks the region in complete isolation.",
      "As panic sweeps through the port, the survivors seek refuge inside the local police substation. However, strange radio transmissions hint at a terrifying reality: a giant, 15-20ft tall shapeshifting cosmic entity has landed in the surrounding forest. Worse, the entity has already seized control of someone within the group. Mutual suspicion grows, and survival becomes a psychological war of nerves.",
    ],
    quote:
      "When the sky falls dark and the signals go silent, who do you trust? In the face of cosmic isolation, human fragility is our deepest vulnerability.",
    trailerTitle: "HOPE Official Trailer",
    ensembleTitle: "THE ENSEMBLE (CAST & CHARACTERS)",
    roleLabel: "ROLE",
    alienArchive: "EXTRATERRESTRIAL ARCHIVE // GERTU",
    alienSectionTitle: "ALIEN WORLD & CHARACTER DOSSIERS",
    spoilerWarning: "WARNING // FULL FILM SPOILERS",
    encounterAlt: "A Gertu alien pursuing a rider through the forest in HOPE",
    firstContactRecord: "FIRST-CONTACT RECORD",
    incursionTitle: "THE HOPO PORT INCURSION",
    archiveDate: "ARCHIVE // 197X",
    biologyReport: "IMPERIAL BIOLOGY REPORT",
    gertuTitle: "GERTU: A BODY FOR EVERY DUTY",
    gertuDescription:
      "The visitors are not a single monster type. They are members of a stratified civilization whose radically different bodies reveal rank, labor, and proximity to the throne. What looks like a random bestiary is an imperial family, its guard, and its servants stranded inside a human panic.",
    sourceLink: "OPEN SOURCE INTELLIGENCE // FANMAUM ARCHIVE ↗",
    specimenLabel: "SPECIMEN",
    directorRole: "DIRECTOR & SCREENPLAY",
    directorHeadline: "THE VISIONARY OF SHAMANIC THRILLERS",
    directorDescription: [
      "Director Na Hong-jin is celebrated internationally for his uncompromising grit, intense pacing, and occult imagery, establishing his name with classic Korean thrillers such as The Chaser (2008), The Yellow Sea (2010), and the occult horror masterpiece The Wailing (2016).",
      "With Hope, Na Hong-jin embarks on his first major sci-fi cosmic thriller venture. The movie features a groundbreaking co-production involving Korean studio Plus M Entertainment and global stars, including Michael Fassbender and Alicia Vikander. It delivers a highly claustrophobic human-versus-extraterrestrial siege drama in a remote port, exploring the limits of human resilience, coordination, and isolation.",
    ],
  },
} as const;

const gertuLore = [
  {
    index: "01",
    title: "CASTE IS ANATOMY",
    titleKo: "계급은 곧 해부학이다",
    description:
      "Gertu is governed by a rigid imperial order. Rank is not merely social: every body is shaped around its assigned duty, from a tunnel-running sentry to a spine-armored empress.",
    descriptionKo:
      "게르투는 엄격한 황실 신분제로 통치된다. 계급은 단순한 사회적 지위가 아니다. 지하 통로를 달리는 보초병부터 가시 갑주를 지닌 황후까지, 모든 육체가 맡은 임무에 맞춰 형성된다.",
  },
  {
    index: "02",
    title: "THE LOST HEIR",
    titleKo: "사라진 후계자",
    description:
      "The royal party reaches Earth while searching for Kali, the missing crown prince. Emperor Kuer is lost in the crash, leaving Empress Zor and her guard trapped far from home.",
    descriptionKo:
      "황실 일행은 실종된 황태자 칼리를 찾아 지구에 도착한다. 황제 쿠얼은 추락 사고로 목숨을 잃고, 황후 조르와 호위대는 고향에서 멀리 떨어진 지구에 고립된다.",
  },
  {
    index: "03",
    title: "A WAR WITHOUT TRANSLATION",
    titleKo: "번역되지 못한 전쟁",
    description:
      "Their language follows a coherent alien grammar, yet no common vocabulary survives first contact. Fear becomes evidence, restraint is read as threat, and Hopo Port turns into a battlefield.",
    descriptionKo:
      "그들의 언어에는 일관된 외계 문법이 있지만 최초 조우를 이어 줄 공통 어휘는 존재하지 않는다. 공포는 증거가 되고, 절제는 위협으로 오해되며, 호포항은 전쟁터로 변한다.",
  },
];

const alienDossiers = [
  {
    name: "BAMIGIR",
    nameKo: "바미기르",
    designation: "LOWER-CASTE SENTRY",
    designationKo: "하층 계급 보초병",
    performer: "Performance by Cameron Britton",
    performerKo: "카메론 브리튼 퍼포먼스",
    image: "/images/intro/aliens/bamigir.webp",
    accentColor: "var(--acc-danger)",
    status: "FRONTLINE / HOSTILE",
    statusKo: "전선 / 적대적",
    traits: ["3+ meter frame", "Quadrupedal pursuit", "Extreme lifting strength"],
    traitsKo: ["3미터 이상 거구", "사족 추격", "괴력"],
    description:
      "The first Gertu being to surface at Hopo Port. Bamigir can throw vehicles, sprint on all fours, and move through underground passages, but its momentum makes tight turns dangerously imprecise. Its final tears leave open the question of whether rage, fear, or duty drove the attack.",
    descriptionKo:
      "호포항에 가장 먼저 모습을 드러낸 게르투 생명체. 차량을 집어 던지고 네 발로 전력 질주하며 지하 통로를 통해 이동한다. 다만 거대한 관성 탓에 급격한 방향 전환에는 서툴다. 죽기 직전 흘린 눈물은 그 공격이 분노와 공포, 의무 중 무엇에서 비롯되었는지 의문을 남긴다.",
  },
  {
    name: "MABEYO",
    nameKo: "마베이요",
    designation: "CROWN GUARD",
    designationKo: "황태자 호위무사",
    performer: "Performance by Michael Fassbender",
    performerKo: "마이클 패스벤더 퍼포먼스",
    image: "/images/intro/aliens/mabeyo.webp",
    accentColor: "var(--acc-amber)",
    status: "ELITE / REGENERATIVE",
    statusKo: "정예 / 재생형",
    traits: ["Combat transformation", "Blind hunt form", "Living slime heart"],
    traitsKo: ["전투 변형", "맹목 사냥 형태", "살아 있는 슬라임 심장"],
    description:
      "A legendary warrior sworn to protect Kali. Mabeyo shifts from a composed humanoid body into a sightless quadrupedal predator built for speed and killing. Its removable, self-sustaining heart may be capable of restoring the dead prince.",
    descriptionKo:
      "칼리를 지키기로 맹세한 전설적인 전사. 평소의 절제된 인간형 육체에서 시력을 잃는 대신 속도와 살상력에 특화된 사족 포식자로 변한다. 몸 밖에서도 스스로 살아 움직이는 심장은 죽은 황태자를 되살릴 수 있을지도 모른다.",
  },
  {
    name: "AIDOBOR",
    nameKo: "아이도보르",
    designation: "IMPERIAL ATTENDANT",
    designationKo: "황실 시종",
    performer: "Performance by Taylor Russell",
    performerKo: "테일러 러셀 퍼포먼스",
    image: "/images/intro/aliens/aidobor.webp",
    accentColor: "var(--acc-cyan)",
    status: "AMBUSH / TRACKER",
    statusKo: "매복 / 추적형",
    traits: ["Axe weapon", "Arboreal concealment", "Decoy tactics"],
    traitsKo: ["도끼 무장", "수목 위장", "유인 전술"],
    description:
      "Zor's attendant and Kali's caretaker. Aidobor waits above the forest floor, using the canopy for concealment before drawing targets into range of an axe. Less durable than the royal adults, it survives through patience, positioning, and relentless loyalty.",
    descriptionKo:
      "조르의 시종이자 칼리의 양육자. 숲의 수관에 몸을 숨긴 채 기다리다가 목표를 도끼의 사정거리 안으로 유인한다. 황실 성체들보다 내구력은 약하지만 인내와 위치 선정, 흔들리지 않는 충성심으로 살아남는다.",
  },
  {
    name: "ZOR",
    nameKo: "조르",
    designation: "EMPRESS OF GERTU",
    designationKo: "게르투 황후",
    performer: "Performance by Alicia Vikander",
    performerKo: "알리시아 비칸데르 퍼포먼스",
    image: "/images/intro/aliens/zor.webp",
    accentColor: "var(--acc-violet)",
    status: "ROYAL / ARMORED",
    statusKo: "황족 / 장갑형",
    traits: ["Antler-spine barrier", "Projectile spines", "Royal command"],
    traitsKo: ["사슴뿔 가시 방벽", "투사형 가시", "황실 지휘권"],
    description:
      "A commoner who rose to become empress, Zor descends to Earth to recover her child. The antler-like organs along her back form a ballistic shield and can be detached as lethal spears, giving her both regal poise and devastating range.",
    descriptionKo:
      "평민에서 황후의 자리에 오른 조르는 아이를 되찾기 위해 지구로 내려온다. 등에 난 사슴뿔 모양의 기관은 총탄을 막는 방벽이 되며, 분리해 치명적인 창처럼 던질 수도 있다. 우아한 위엄과 압도적인 원거리 전투력을 동시에 지녔다.",
  },
  {
    name: "KALI",
    nameKo: "칼리",
    designation: "CROWN PRINCE",
    designationKo: "황태자",
    performer: "Creature performance",
    performerKo: "크리처 퍼포먼스",
    image: "/images/intro/aliens/kali.webp",
    accentColor: "#a3e635",
    status: "JUVENILE / RECOVERABLE",
    statusKo: "유체 / 소생 가능",
    traits: ["Childlike morphology", "Royal bloodline", "Possible reanimation"],
    traitsKo: ["어린아이형 형태", "황실 혈통", "소생 가능성"],
    description:
      "The juvenile heir whose disappearance pulls the Gertu royal party toward Hopo Port. Kali's body becomes the center of the conflict after a human hunter mistakes the childlike being for prey. Mabeyo's regenerative heart makes death feel disturbingly provisional.",
    descriptionKo:
      "실종 사건으로 게르투 황실 일행을 호포항까지 이끈 어린 후계자. 인간 사냥꾼이 아이처럼 보이는 칼리를 사냥감으로 오인하면서 시신은 갈등의 중심이 된다. 마베이요의 재생 심장은 죽음조차 잠정적인 상태처럼 보이게 만든다.",
  },
  {
    name: "KUER",
    nameKo: "쿠얼",
    designation: "EMPEROR OF GERTU",
    designationKo: "게르투 황제",
    performer: "Imperial archive image",
    performerKo: "황실 기록 이미지",
    image: "/images/intro/aliens/kuer.webp",
    accentColor: "var(--ink-0)",
    status: "ROYAL / DECEASED",
    statusKo: "황족 / 사망",
    traits: ["Imperial sovereign", "Ark commander", "Lost on impact"],
    traitsKo: ["제국의 군주", "방주 지휘관", "추락 시 사망"],
    description:
      "The sovereign behind the vast Gertu vessel. Kuer dies in the explosion that follows the ship's crash, turning a rescue mission into an irreversible succession crisis and leaving the surviving aliens isolated under Zor's command.",
    descriptionKo:
      "거대한 게르투 함선을 이끈 제국의 군주. 함선 추락 직후 발생한 폭발로 사망하면서 구조 임무는 돌이킬 수 없는 왕위 계승 위기로 변한다. 살아남은 외계인들은 조르의 지휘 아래 지구에 고립된다.",
  },
];

export default function MovieIntroPage() {
  const { language } = useLanguage();
  const isKorean = language === "ko";
  const copy = pageCopy[language];
  const localizedGertuLore = gertuLore.map((entry) =>
    isKorean
      ? { ...entry, title: entry.titleKo, description: entry.descriptionKo }
      : entry,
  );
  const localizedAlienDossiers = alienDossiers.map((alien) =>
    isKorean
      ? {
          ...alien,
          name: alien.nameKo,
          designation: alien.designationKo,
          performer: alien.performerKo,
          status: alien.statusKo,
          traits: alien.traitsKo,
          description: alien.descriptionKo,
        }
      : alien,
  );

  const castList = [
    {
      name: isKorean ? "범석" : "Bum-seok",
      actor: isKorean ? "황정민 연기" : "played by Hwang Jung-min",
      role: isKorean ? "경찰서장" : "Police Chief",
      icon: Shield,
      image: "https://firebasestorage.googleapis.com/v0/b/nahope-port.firebasestorage.app/o/intro%2Fhwang_jung_min.jpg?alt=media&token=436ddb03-f6fe-4cb6-8e33-f7e1f17c31e4",
      accentColor: "var(--acc-primary)",
      description:
        isKorean
          ? "지친 기색이 역력한 호포항 경찰서장. 모든 통신이 끊기고 공포가 번지는 가운데 질서를 지키려 하지만, 위협이 마을 공동체 내부에서 시작되었을지도 모른다는 끔찍한 가능성과 마주한다."
          : "The weary police chief of Hopo Port. As communications go completely dark and panic spreads, Bum-seok tries to maintain order, only to face the horrifying realization that the threat might be coming from within his own community.",
    },
    {
      name: isKorean ? "성기" : "Sung-ki",
      actor: isKorean ? "조인성 연기" : "played by Jo In-sung",
      role: isKorean ? "기밀 신호 운용관" : "Classified Signal Operator",
      icon: Radio,
      image: "https://firebasestorage.googleapis.com/v0/b/nahope-port.firebasestorage.app/o/intro%2Fjo_in_sung.jpg?alt=media&token=0e1627f8-3ee9-462b-b35b-bcbb497a2ed4",
      accentColor: "var(--acc-cyan)",
      description:
        isKorean
          ? "낡은 무전기를 소유한 과묵하고 고립된 항구 주민. 일정한 리듬으로 반복되는 외계 신호를 가장 먼저 포착한다. 다른 주민들은 그가 이상 현상과 내통하고 있다고 의심한다."
          : "A quiet, reclusive resident of the port who owns an old radio receiver. He is the first to detect the rhythmic extraterrestrial signal broadcasts. The other villagers suspect him of coordinating with the anomaly.",
    },
    {
      name: isKorean ? "성애" : "Sung-ae",
      actor: isKorean ? "정호연 연기" : "played by Jung Ho-yeon",
      role: isKorean ? "초소 경비 장교" : "Outpost Guard Officer",
      icon: Eye,
      image: "https://firebasestorage.googleapis.com/v0/b/nahope-port.firebasestorage.app/o/intro%2Fjung_ho_yeon.jpg?alt=media&token=feefe734-4e45-4480-9d72-4b2975cae74e",
      accentColor: "var(--acc-violet)",
      description:
        isKorean
          ? "호포 초소에 배치된 관찰력 뛰어난 젊은 경비 장교. 훼손된 소 사체와 존재가 남긴 물리적 잔해를 발견하고, 정전 속 수색과 구조 작전을 이끈다."
          : "A highly observant young defense officer stationed at Hopo Outpost. She uncovers the mutilated cattle carcass and physical debris left by the entity, leading the search and rescue efforts during the blackout.",
    },
    {
      name: isKorean ? "양배" : "Yang-bae",
      actor: isKorean ? "음문석 연기" : "played by Eum Moon-suk",
      role: isKorean ? "호포항 목수" : "Hopo Port Carpenter",
      icon: Hammer,
      image: "/images/intro/cast/yang-bae.jpg",
      photoCredit: isKorean
        ? "사진 제공: 플러스엠·포지드필름스"
        : "Photo: Plus M · Forged Films",
      accentColor: "var(--acc-amber)",
      description:
        isKorean
          ? "충청도 사투리와 좀처럼 속을 읽을 수 없는 표정으로 등장하는 호포항의 목수. 악의 없이 저지른 듯한 사소한 행동이 마을 전체를 뒤흔드는 거대한 사건의 발단이 되며, 예측하기 어려운 선택으로 이야기의 흐름을 바꾼다."
          : "Hopo Port's carpenter, marked by a Chungcheong dialect and an unreadable expression. A seemingly small act, committed without obvious malice, becomes the catalyst for the catastrophe engulfing the village, and his unpredictable choices redirect the story.",
    },
    {
      name: isKorean ? "해술" : "Hae-sul",
      actor: isKorean ? "임현식 연기" : "played by Lim Hyun-sik",
      role: isKorean ? "괴물 목격 주민" : "Monster Witness",
      icon: MessageCircle,
      image: "/images/intro/cast/hae-sul.jpg",
      photoCredit: isKorean
        ? "사진 제공: 플러스엠·포지드필름스"
        : "Photo: Plus M · Forged Films",
      accentColor: "var(--acc-primary)",
      description:
        isKorean
          ? "숲에서 정체불명의 괴물을 목격한 호포항 주민. 성애에게 자신의 목격담을 온몸으로 재현하며 웃음과 불안을 동시에 만들어 내고, 믿기 힘든 이야기가 사실일 가능성을 마을 사람들 앞에 처음 펼쳐 보인다."
          : "A Hopo Port resident who witnesses the unidentified creature in the forest. His vivid reenactment for Sung-ae moves between comedy and dread, placing the possibility that his unbelievable account is true directly before the villagers.",
    },
    {
      name: isKorean ? "낙연" : "Nak-yeon",
      actor: isKorean ? "이상희 연기" : "played by Lee Sang-hee",
      role: isKorean ? "호포항 주민" : "Hopo Port Resident",
      icon: UsersRound,
      image: "/images/intro/cast/nak-yeon.jpg",
      photoCredit: isKorean
        ? "사진 제공: 플러스엠·포지드필름스"
        : "Photo: Plus M · Forged Films",
      accentColor: "var(--acc-cyan)",
      description:
        isKorean
          ? "외계 존재의 출현으로 무너진 마을에서 범석과 함께 사건을 헤쳐 나가는 주민. 생활력과 능청스러운 태도로 극도의 혼란 속에서도 현실적인 감각을 잃지 않으며, 범석과의 거침없는 호흡으로 긴장에 균열을 낸다."
          : "A villager who struggles alongside Bum-seok after the extraterrestrial arrival throws Hopo Port into chaos. Nak-yeon's grounded instincts and sly composure preserve a sense of ordinary life, while the blunt rapport with Bum-seok punctures the mounting tension.",
    },
    {
      name: isKorean ? "보건소장" : "Health Center Chief",
      actor: isKorean ? "황석정 연기" : "played by Hwang Seok-jeong",
      role: isKorean ? "호포항 보건소 책임자" : "Hopo Port Medical Officer",
      icon: Stethoscope,
      image: "/images/intro/cast/health-center-chief.jpg",
      photoCredit: isKorean
        ? "사진 제공: 플러스엠·포지드필름스"
        : "Photo: Plus M · Forged Films",
      accentColor: "var(--acc-danger)",
      description:
        isKorean
          ? "호포항 보건소를 책임지는 의료인. 인간의 상식으로 설명할 수 없는 생명체를 직접 부검하며 공포를 물질적인 증거로 바꾸고, 마을의 소문과 추측을 되돌릴 수 없는 과학적 현실로 만드는 전환점에 선다."
          : "The medical officer responsible for Hopo Port's health center. By performing an autopsy on a life-form beyond ordinary human explanation, she turns fear into physical evidence and transforms village rumor into an irreversible scientific reality.",
    },
    {
      name: "Taylor Russell",
      actor: isKorean ? "테일러 러셀 연기" : "played by Taylor Russell",
      role: isKorean ? "퍼포먼스 캡처: 아이도보르" : "Performance Capture: Aidobor",
      icon: FlaskConical,
      image: "https://firebasestorage.googleapis.com/v0/b/nahope-port.firebasestorage.app/o/intro%2Ftaylor_russell.jpg?alt=media&token=1c36890c-b8d1-4835-818e-264cf32e908d",
      accentColor: "#10b981",
      description:
        isKorean
          ? "황실 시종 아이도보르의 육체를 퍼포먼스로 구현한다. 나무 위에서 천천히 움직이는 인내심과 갑작스러운 근접 폭력성을 함께 표현한다."
          : "Brings the imperial attendant Aidobor to life through physical performance, balancing patient arboreal movement with sudden, close-range violence.",
    },
    {
      name: "Cameron Britton",
      actor: isKorean ? "카메론 브리튼 연기" : "played by Cameron Britton",
      role: isKorean ? "퍼포먼스 캡처: 바미기르" : "Performance Capture: Bamigir",
      icon: Wrench,
      image: "https://firebasestorage.googleapis.com/v0/b/nahope-port.firebasestorage.app/o/intro%2Fcameron_britton.jpg?alt=media&token=b434aada-73fd-4dc4-930e-104b85f6ab22",
      accentColor: "var(--acc-amber)",
      description:
        isKorean
          ? "거대한 하층 계급 보초병 바미기르를 연기한다. 육중한 무게감과 사족 질주, 순간적으로 드러나는 슬픔을 통해 최초 조우를 괴물 같으면서도 비극적으로 살아 있게 만든다."
          : "Performs Bamigir, the towering lower-caste sentry whose weight, four-limbed sprint, and flashes of grief make first contact feel both monstrous and tragically alive.",
    },
    {
      name: "Alicia Vikander",
      actor: isKorean ? "알리시아 비칸데르 연기" : "played by Alicia Vikander",
      role: isKorean ? "퍼포먼스 캡처: 조르" : "Performance Capture: Zor",
      icon: Globe,
      image: "https://firebasestorage.googleapis.com/v0/b/nahope-port.firebasestorage.app/o/intro%2Falicia_vikander.jpg?alt=media&token=665880b8-6005-4f49-894c-9d7148b41e18",
      accentColor: "#38bdf8",
      description:
        isKorean
          ? "절제된 위엄 뒤에 아이를 잃은 부모의 절박함을 감춘 황후 조르를 연기한다. 장갑 방어와 원거리 공격을 위해 진화한 육체의 무게까지 함께 표현한다."
          : "Performs Zor, the empress whose controlled bearing masks a parent's desperation and a body engineered for both armored defense and ranged attack.",
    },
    {
      name: "Michael Fassbender",
      actor: isKorean ? "마이클 패스벤더 연기" : "played by Michael Fassbender",
      role: isKorean ? "퍼포먼스 캡처: 마베이요" : "Performance Capture: Mabeyo",
      icon: FileText,
      image: "https://firebasestorage.googleapis.com/v0/b/nahope-port.firebasestorage.app/o/intro%2Fmichael_fassbender.jpg?alt=media&token=a6e97578-c277-4c64-866f-e54d548f8e3a",
      accentColor: "var(--acc-danger)",
      description:
        isKorean
          ? "절제된 호위무사와 야수 같은 전투 형태를 오가는 마베이요를 연기한다. 그의 몸에는 황실을 되살릴 마지막 가능성이 담겨 있다."
          : "Performs Mabeyo, the crown guard who moves between disciplined restraint and a feral combat form while carrying the royal family's last chance at restoration.",
    },
  ];

  return (
    <div
      className="flex-1 flex flex-col bg-space-950 py-12 px-4 md:px-8 relative overflow-hidden font-sans select-none"
      data-language={language}
      lang={language}
    >
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(movieJsonLd) }}
      />
      {/* Ambient background glow */}
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none" style={{ background: "color-mix(in srgb, var(--acc-primary) 5%, transparent)" }} />
      <div className="absolute bottom-1/4 left-0 w-[450px] h-[450px] rounded-full blur-[140px] pointer-events-none" style={{ background: "color-mix(in srgb, var(--acc-violet) 4%, transparent)" }} />

      {/* Top Title */}
      <div className="w-full max-w-5xl mx-auto text-center mb-16 relative z-10">
        <span className="eyebrow block mb-3 flicker" style={{ color: "var(--acc-primary)" }}>
          {copy.classifiedProfile}
        </span>
        <h1 className="display text-4xl sm:text-5xl uppercase mb-4" style={{ color: "var(--ink-0)" }}>
          {copy.pageTitle}
        </h1>
        <div className="w-24 h-[2px] mx-auto" style={{ background: "linear-gradient(90deg, var(--acc-primary), var(--acc-violet))" }} />
      </div>

      <div className="w-full max-w-5xl mx-auto flex flex-col gap-16 relative z-10">
        {/* Section 1: Plot & Synopsis */}
        <section className="panel panel-bracket p-6 md:p-8 relative" style={{ borderColor: "var(--acc-primary)", boxShadow: "var(--glow-primary)" }}>
          <span className="br-bl" /><span className="br-br" />

          <div className="flex items-center gap-3 mb-4">
            <span className="w-2.5 h-2.5 rounded-full flicker" style={{ background: "var(--acc-primary)" }} />
            <h2 className="display text-xl uppercase" style={{ color: "var(--ink-0)" }}>
              {copy.synopsisTitle}
            </h2>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-center">
            {/* Holographic Lore Text */}
            <div className="flex-1 flex flex-col gap-4 text-xs sm:text-sm text-gray-300 leading-relaxed font-sans">
              <p>{copy.synopsis[0]}</p>
              <p>{copy.synopsis[1]}</p>
              <p className="pl-3 italic text-gray-400" style={{ borderLeft: "2px solid color-mix(in srgb, var(--acc-primary) 50%, transparent)" }}>
                &ldquo;{copy.quote}&rdquo;
              </p>
            </div>

            {/* YouTube Trailer Embed */}
            <div className="w-full md:w-[440px] aspect-video overflow-hidden relative shadow-2xl" style={{ background: "var(--bg-0)", border: "1px solid var(--line)" }}>
              <iframe
                src="https://www.youtube.com/embed/_oFfYIskj2Y"
                title={copy.trailerTitle}
                className="w-full h-full border-0 relative z-20"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </section>

        {/* Section 2: Cast & Roles */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full flicker" style={{ background: "var(--acc-cyan)" }} />
            <h2 className="display text-xl uppercase" style={{ color: "var(--ink-0)" }}>
              {copy.ensembleTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {castList.map((cast) => {
              const Icon = cast.icon;
              return (
                <div
                  key={cast.name}
                  className="panel panel-bracket p-5 relative flex flex-col gap-4 hover:scale-[1.02] transition-transform duration-300"
                  style={{
                    borderColor: `color-mix(in srgb, ${cast.accentColor} 30%, transparent)`,
                    boxShadow: `0 0 15px color-mix(in srgb, ${cast.accentColor} 15%, transparent)`,
                  }}
                >
                  <span className="br-bl" /><span className="br-br" />

                  {/* Retro Character Portrait */}
                  <div className="w-full aspect-[4/3] overflow-hidden relative" style={{ border: "1px solid var(--line)", background: "var(--bg-0)" }}>
                    <img
                      src={cast.image}
                      alt={cast.name}
                      className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition duration-500"
                      loading="lazy"
                    />
                    {"photoCredit" in cast && cast.photoCredit ? (
                      <span className="absolute bottom-0 left-0 right-0 px-2 py-1 text-[8px] font-mono text-gray-300 bg-black/75">
                        {cast.photoCredit}
                      </span>
                    ) : null}
                  </div>

                  <div className="flex justify-between items-start pb-3" style={{ borderBottom: "1px solid var(--line)" }}>
                    <div className="flex flex-col">
                      <span className="display text-sm" style={{ color: "var(--ink-0)" }}>
                        {cast.name}
                      </span>
                      <span className="text-[10px] text-gray-500 font-mono mt-0.5">
                        {cast.actor}
                      </span>
                    </div>
                    <div className="p-2" style={{ background: "var(--bg-0)", border: "1px solid var(--line)", color: cast.accentColor }}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <span className="text-[10px] font-mono font-bold tracking-widest uppercase" style={{ color: cast.accentColor }}>
                    {copy.roleLabel}: {cast.role}
                  </span>

                  <p className="text-[11px] text-gray-400 font-sans leading-relaxed flex-1">
                    {cast.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 3: Gertu World Lore & Alien Dossiers */}
        <section
          className="flex flex-col gap-6"
          style={{ contentVisibility: "auto", containIntrinsicSize: "1200px" }}
        >
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full flicker" style={{ background: "#a3e635" }} />
              <div>
                <span className="text-[10px] font-mono tracking-[0.24em]" style={{ color: "#a3e635" }}>
                  {copy.alienArchive}
                </span>
                <h2 className="display text-xl uppercase mt-1" style={{ color: "var(--ink-0)" }}>
                  {copy.alienSectionTitle}
                </h2>
              </div>
            </div>
            <span
              className="w-fit px-3 py-1.5 text-[9px] font-mono tracking-widest"
              style={{
                color: "var(--acc-danger)",
                border: "1px solid color-mix(in srgb, var(--acc-danger) 45%, transparent)",
                background: "color-mix(in srgb, var(--acc-danger) 8%, transparent)",
              }}
            >
              {copy.spoilerWarning}
            </span>
          </div>

          <div
            className="panel panel-bracket p-5 md:p-7 relative overflow-hidden"
            style={{
              borderColor: "color-mix(in srgb, #a3e635 40%, transparent)",
              boxShadow: "0 0 28px color-mix(in srgb, #a3e635 8%, transparent)",
            }}
          >
            <span className="br-bl" /><span className="br-br" />
            <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-7 items-stretch">
              <div
                className="relative min-h-[280px] sm:min-h-[340px] overflow-hidden"
                style={{ border: "1px solid var(--line)", background: "var(--bg-0)" }}
              >
                <Image
                  src="/images/intro/aliens/gertu-encounter.webp"
                  alt={copy.encounterAlt}
                  fill
                  priority={false}
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover opacity-75 grayscale-[25%]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
                <div className="absolute left-4 right-4 bottom-4 flex items-end justify-between gap-4">
                  <div>
                    <span className="text-[9px] font-mono tracking-[0.22em]" style={{ color: "#a3e635" }}>
                      {copy.firstContactRecord}
                    </span>
                    <p className="display text-sm sm:text-base mt-1 text-white">
                      {copy.incursionTitle}
                    </p>
                  </div>
                  <span className="text-[9px] font-mono text-gray-400">{copy.archiveDate}</span>
                </div>
              </div>

              <div className="flex flex-col justify-center gap-5">
                <div>
                  <span className="eyebrow" style={{ color: "#a3e635" }}>
                    {copy.biologyReport}
                  </span>
                  <h3 className="display text-2xl sm:text-3xl uppercase mt-2" style={{ color: "var(--ink-0)" }}>
                    {copy.gertuTitle}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  {copy.gertuDescription}
                </p>
                <a
                  href="https://fanmaum.com/community/freeboard/133217321"
                  target="_blank"
                  rel="noreferrer"
                  className="w-fit text-[10px] font-mono tracking-widest uppercase transition-opacity hover:opacity-70"
                  style={{ color: "var(--acc-cyan)" }}
                >
                  {copy.sourceLink}
                </a>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mt-6">
              {localizedGertuLore.map((entry) => (
                <div
                  key={entry.index}
                  className="p-4"
                  style={{
                    background: "color-mix(in srgb, var(--bg-0) 82%, transparent)",
                    border: "1px solid var(--line)",
                  }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-mono text-[10px]" style={{ color: "#a3e635" }}>
                      {entry.index}
                    </span>
                    <span className="h-px flex-1" style={{ background: "var(--line)" }} />
                  </div>
                  <h3 className="display text-xs mb-2" style={{ color: "var(--ink-0)" }}>
                    {entry.title}
                  </h3>
                  <p className="text-[11px] text-gray-400 leading-relaxed">{entry.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {localizedAlienDossiers.map((alien, index) => (
              <article
                key={alien.name}
                className="panel panel-bracket relative overflow-hidden flex flex-col group"
                style={{
                  borderColor: `color-mix(in srgb, ${alien.accentColor} 34%, transparent)`,
                  boxShadow: `0 0 18px color-mix(in srgb, ${alien.accentColor} 8%, transparent)`,
                }}
              >
                <span className="br-bl" /><span className="br-br" />
                <div
                  className="relative w-full aspect-[16/9] overflow-hidden"
                  style={{ background: "var(--bg-0)", borderBottom: "1px solid var(--line)" }}
                >
                  <Image
                    src={alien.image}
                    alt={
                      isKorean
                        ? `영화 HOPE의 ${alien.name}, ${alien.designation}`
                        : `${alien.name}, ${alien.designation.toLowerCase()}, in HOPE`
                    }
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover grayscale-[35%] opacity-80 transition duration-500 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-[1.025]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                  <span
                    className="absolute top-3 left-3 px-2 py-1 text-[8px] font-mono tracking-widest"
                    style={{
                      color: alien.accentColor,
                      border: `1px solid color-mix(in srgb, ${alien.accentColor} 45%, transparent)`,
                      background: "rgba(0,0,0,0.78)",
                    }}
                  >
                    {copy.specimenLabel}
                    {" // "}
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="absolute bottom-3 right-3 text-[8px] font-mono text-gray-300 tracking-widest">
                    {alien.status}
                  </span>
                </div>

                <div className="p-5 flex flex-col gap-4 flex-1">
                  <header className="flex items-start justify-between gap-4 pb-4" style={{ borderBottom: "1px solid var(--line)" }}>
                    <div>
                      <h3 className="display text-lg" style={{ color: "var(--ink-0)" }}>
                        {alien.name}
                      </h3>
                      <p className="text-[9px] font-mono text-gray-500 mt-1">{alien.performer}</p>
                    </div>
                    <span
                      className="text-[9px] font-mono font-bold tracking-wider text-right"
                      style={{ color: alien.accentColor }}
                    >
                      {alien.designation}
                    </span>
                  </header>

                  <ul className="flex flex-wrap gap-2">
                    {alien.traits.map((trait) => (
                      <li
                        key={trait}
                        className="px-2 py-1 text-[8px] font-mono tracking-wide uppercase"
                        style={{
                          color: "var(--ink-1)",
                          border: "1px solid var(--line)",
                          background: "var(--bg-0)",
                        }}
                      >
                        {trait}
                      </li>
                    ))}
                  </ul>

                  <p className="text-[11px] text-gray-400 leading-relaxed flex-1">
                    {alien.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Section 4: Director Spotlight */}
        <section className="panel panel-bracket p-6 relative flex flex-col md:flex-row gap-8 items-stretch shadow-2xl" style={{ borderColor: "var(--acc-violet)", boxShadow: "var(--glow-violet)" }}>
          <span className="br-bl" /><span className="br-br" />

          <div className="md:w-1/3 overflow-hidden relative min-h-[260px] flex flex-col" style={{ background: "var(--bg-0)", border: "1px solid var(--line)" }}>
            <div className="w-full h-48 relative overflow-hidden" style={{ borderBottom: "1px solid var(--line)" }}>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/nahope-port.firebasestorage.app/o/intro%2Fna_hong_jin.jpg?alt=media&token=20cca7e1-a940-461d-b7d9-5deb668e154e"
                alt={isKorean ? "나홍진 감독" : "Na Hong-jin"}
                className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition duration-500"
                loading="lazy"
              />
              <div className="absolute top-3 right-3 p-2 z-20" style={{ background: "rgba(0,0,0,0.8)", border: "1px solid color-mix(in srgb, var(--acc-violet) 30%, transparent)", color: "var(--acc-violet)" }}>
                <Clapperboard className="w-4 h-4" />
              </div>
            </div>
            <div className="p-4 flex flex-col items-center text-center justify-center flex-1 z-10">
              <h3 className="display text-lg uppercase" style={{ color: "var(--ink-0)" }}>
                {isKorean ? "나홍진" : "NA HONG-JIN"}
              </h3>
              <span className="text-[10px] text-gray-500 font-mono mt-0.5">{copy.directorRole}</span>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-center gap-4 text-xs sm:text-sm text-gray-300 leading-relaxed font-sans">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full flicker" style={{ background: "var(--acc-violet)" }} />
              <h3 className="display text-base uppercase" style={{ color: "var(--ink-0)" }}>
                {copy.directorHeadline}
              </h3>
            </div>
            <p>{copy.directorDescription[0]}</p>
            <p>{copy.directorDescription[1]}</p>
          </div>
        </section>
      </div>
    </div>
  );
}
