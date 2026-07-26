"use client";

import { useLanguage } from "../lib/i18n";

interface Scenario {
  id: number;
  author: string;
  items: string[];
  itemsKo?: string[];
  text: string;
  textKo?: string;
  votes: number;
  timestamp: string;
  timestampKo?: string;
  voted?: boolean;
}

const INITIAL_SCENARIOS: Scenario[] = [
  {
    id: 1,
    author: "HopoSurvivor_88",
    items: ["Lost Carbine Rifle", "Omega (Ω) Amulet", "Translator Fragment"],
    itemsKo: ["분실된 카빈 소총", "오메가(Ω) 부적", "번역기 파편"],
    text: "Part 2 opens in a hidden military bunker beneath Hopo Port. Sung-ki discovers that the Korean Defense Unit was secretly experimenting on the extraterrestrial debris since the 1970s. Utilizing the translator fragment, he hacks into the alien hive mind frequency, planning to weaponize the cosmic radiation against the mothership using his modified Carbine rifle.",
    textKo: "파트 2는 호포항 아래 숨겨진 군사 벙커에서 시작된다. 성기는 한국 방위대가 1970년대부터 외계 잔해를 비밀리에 실험해 왔다는 사실을 발견한다. 번역기 파편으로 외계 군체 의식의 주파수에 침투한 그는 개조한 카빈 소총을 이용해 우주 방사선을 모선에 되돌려 보낼 계획을 세운다.",
    votes: 14820,
    timestamp: "2 hours ago",
    timestampKo: "2시간 전",
  },
  {
    id: 2,
    author: "K_Occultist",
    items: ["Dead Rotary Phone", "Sun-like Red Emblem", "Torn ID Tag of a Defense Soldier"],
    itemsKo: ["죽은 다이얼 전화기", "태양 모양 붉은 문장", "찢어진 방위병 인식표"],
    text: "The 'Red Silhouette' entity is actually an ancient shamanic deity from Korean folklore that was awakened by the alien electromagnetic pulse. Bum-seok tries to call the mainland using a dead phone, only to hear the voices of deceased soldiers. In Part 2, the conflict escalates into a three-way war between human survivors, the ancient deity, and the cosmic entities.",
    textKo: "‘붉은 실루엣’은 외계 전자기 파동에 깨어난 한국 설화 속 고대 샤머니즘 신이었다. 범석은 죽은 전화기로 육지에 연락하려 하지만 수화기에서는 사망한 병사들의 목소리만 들린다. 파트 2에서 갈등은 인간 생존자와 고대 신, 우주 존재 사이의 삼파전으로 확대된다.",
    votes: 9340,
    timestamp: "5 hours ago",
    timestampKo: "5시간 전",
  },
  {
    id: 3,
    author: "ChickenSlayer",
    items: ["Lost Carbine Rifle", "Bloodstained Reservist Cap"],
    itemsKo: ["분실된 카빈 소총", "피 묻은 예비군 모자"],
    text: "The legendary chicken is indeed the key. It was mutated by the initial meteorite collision, making it completely immune to the alien beam attacks. In Part 2, the surviving villagers attach remote sensors onto the chicken, using it to smuggle explosives into the giant mothership hovering over the village.",
    textKo: "전설의 닭이 진짜 열쇠였다. 최초 운석 충돌로 돌연변이가 된 닭은 외계 광선 공격에 완전히 면역이다. 파트 2에서 생존한 주민들은 닭에게 원격 센서를 달아 마을 위 거대 모선으로 폭발물을 운반한다.",
    votes: 7210,
    timestamp: "1 day ago",
    timestampKo: "1일 전",
  },
];

interface ScenarioFeedProps {
  scenarios: Scenario[];
  onVote: (id: number) => void;
}

export default function ScenarioFeed({ scenarios, onVote }: ScenarioFeedProps) {
  const { language, tr } = useLanguage();

  return (
    <section id="feed" className="w-full max-w-7xl mx-auto px-4 md:px-0 py-12 border-t border-space-800/40">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <div className="eyebrow mb-1" style={{ color: "var(--acc-primary)" }}>
            {tr("// 집단 지성 시나리오실", "// COLLECTIVE INTELLIGENCE SCENARIO ROOM")}
          </div>
          <h3 className="display text-2xl" style={{ color: "var(--ink-0)" }}>
            {tr("공개 시나리오 전송", "PUBLIC SCENARIO TRANSMISSIONS")}
          </h3>
          <p className="text-xs text-gray-400 font-sans mt-1">
            {tr("커뮤니티가 제안한 《HOPE》 파트 2 이야기들을 검토하고 최고의 시나리오에 투표하세요.", "Review and vote on the best community-proposed storylines for HOPE Part 2.")}
          </p>
        </div>

        {/* Info card */}
        <div className="px-4 py-2 text-right" style={{ background: "var(--bg-0)", border: "1px solid var(--line-bright)" }}>
          <div className="eyebrow" style={{ fontSize: 9 }}>
            {tr("최우수 시나리오 이벤트", "TOP SCENARIO EVENT")}
          </div>
          <div className="font-mono font-bold" style={{ fontSize: 11, color: "var(--acc-cyan)" }}>
            {tr("편집 후 나홍진 감독에게 전달", "COMPILED & DELIVERED TO NA HONG-JIN")}
          </div>
        </div>
      </div>

      {/* Feed list */}
      <div className="flex flex-col gap-6">
        {scenarios.map((scenario) => (
          <div
            key={scenario.id}
            className="panel panel-bracket p-6 flex flex-col md:flex-row gap-6 items-start justify-between relative transition-all"
          >
            <span className="br-bl" /><span className="br-br" />
            {/* Left: Votes */}
            <div className="flex md:flex-col items-center gap-2 px-3 py-2 min-w-[70px] text-center" style={{ background: "var(--bg-0)", border: "1px solid var(--line-bright)" }}>
              <button
                onClick={() => onVote(scenario.id)}
                className="text-lg transition-transform active:scale-95"
                style={{ color: scenario.voted ? "var(--acc-primary)" : "var(--ink-3)" }}
                title={tr("추천", "Vote up")}
              >
                ▲
              </button>
              <div className="font-mono text-xs font-bold text-white">
                {scenario.votes.toLocaleString()}
              </div>
              <span className="text-[8px] text-gray-600 font-mono uppercase tracking-wider hidden md:inline">
                {tr("투표", "VOTES")}
              </span>
            </div>

            {/* Right: Content */}
            <div className="flex-1 flex flex-col gap-3">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-space-800/40 pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: "var(--acc-violet)" }} />
                  <span className="font-mono font-bold" style={{ fontSize: 11, color: "var(--ink-1)" }}>
                    {tr("전송자", "TRANSMISSION BY")} @{scenario.author}
                  </span>
                </div>
                <span className="text-[10px] text-gray-500 font-mono">
                  {language === "ko" ? scenario.timestampKo ?? scenario.timestamp : scenario.timestamp}
                </span>
              </div>

              {/* Text */}
              <p className="text-xs text-gray-300 font-sans leading-relaxed">
                {language === "ko" ? scenario.textKo ?? scenario.text : scenario.text}
              </p>

              {/* Selected items badges */}
              <div className="flex flex-wrap gap-2 mt-2">
                {(language === "ko" ? scenario.itemsKo ?? scenario.items : scenario.items).map((item, idx) => (
                  <span
                    key={idx}
                    className="font-mono px-2 py-0.5"
                    style={{ fontSize: 9, color: "var(--acc-violet)", border: "1px solid color-mix(in srgb, var(--acc-violet) 30%, transparent)", background: "var(--bg-1)" }}
                  >
                    🧩 {item}
                  </span>
                ))}
              </div>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
}

export { INITIAL_SCENARIOS };
export type { Scenario };
