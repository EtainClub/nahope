"use client";

import Link from "next/link";
import { useLanguage } from "../lib/i18n";

export default function EpisodeRoadmap() {
  const { tr } = useLanguage();

  return (
    <section id="roadmap" className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 py-16 border-t border-space-800/40">
      
      {/* Ambient glow decoration */}
      <div className="absolute left-1/4 bottom-0 w-[300px] h-[300px] bg-neon-purple/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="text-center max-w-3xl mx-auto flex flex-col items-center gap-4 mb-16">
        <div className="eyebrow" style={{ color: "var(--acc-primary)" }}>
          {tr("// 복호화 로드맵", "// DECRYPTION ROADMAP")}
        </div>
        <h2 className="display text-3xl sm:text-4xl uppercase" style={{ color: "var(--ink-0)" }}>
          {tr("에피소드 및 보유 프로토콜", "EPISODES & HOLDING PROTOCOLS")}
        </h2>
        <div className="w-12 h-[2px]" style={{ background: "linear-gradient(90deg, var(--acc-primary), var(--acc-violet))" }} />
        <p className="text-gray-400 font-sans text-sm sm:text-base leading-relaxed">
          {tr(
            "$NAHOPE 토큰 보유자는 심우주 조사 기록에 접근할 기밀 권한을 얻습니다. 토큰을 확보해 호포항의 모든 미스터리를 복호화하세요.",
            "Holders of $NAHOPE tokens gain classified clearance to proceed with deep-space investigation files. Secure your holdings to decrypt the full mystery of Hopo Port.",
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Episode 1 Card */}
        <Link href="/game" className="panel panel-bracket p-5 relative overflow-hidden flex flex-col justify-between min-h-[300px] cursor-pointer transition-all hover:scale-[1.02] hover:brightness-110" style={{ borderColor: "var(--acc-primary)", boxShadow: "var(--glow-primary)" }}>
          <span className="br-bl" /><span className="br-br" />
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-start">
              <span className="font-mono font-bold px-2 py-0.5" style={{ fontSize: 10, color: "var(--acc-primary)", background: "color-mix(in srgb, var(--acc-primary) 10%, transparent)", border: "1px solid color-mix(in srgb, var(--acc-primary) 30%, transparent)" }}>
                {tr("에피소드 01", "EPISODE 01")}
              </span>
              <span className="font-mono font-bold" style={{ fontSize: 9, color: "var(--acc-cyan)" }}>
                {tr("무료 플레이", "FREE PLAY")}
              </span>
            </div>
            <h3 className="display text-base uppercase mt-2" style={{ color: "var(--ink-0)" }}>
              {tr("호포항의 호랑이", "Hopo Port Tiger")}
            </h3>
            <p className="text-xs text-gray-400 font-sans leading-relaxed">
              {tr("안개가 내려앉기 전 기이한 소 훼손 사건을 조사하고 불법 카빈 소총을 압수하세요.", "Investigate the bizarre cattle mutilation and confiscate illicit Carbine rifles before the fog sets in.")}
            </p>
          </div>
          <div className="pt-3 mt-4 eyebrow" style={{ borderTop: "1px solid var(--line-bright)", color: "var(--acc-primary)" }}>
            {tr("상태: 활성 · 티저 플레이 가능 →", "STATUS: ACTIVE TEASER PLAYABLE →")}
          </div>
        </Link>

        {/* Episode 2 Card */}
        <div className="panel panel-bracket p-5 relative overflow-hidden flex flex-col justify-between min-h-[300px] opacity-80">
          <span className="br-bl" /><span className="br-br" />
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-start">
              <span className="font-mono font-bold px-2 py-0.5" style={{ fontSize: 10, color: "var(--ink-2)", background: "var(--bg-2)" }}>
                {tr("에피소드 02", "EPISODE 02")}
              </span>
              <span className="font-mono font-bold" style={{ fontSize: 9, color: "var(--acc-violet)" }}>
                {tr("5,000 $NAHOPE 필요", "5,000 $NAHOPE GATED")}
              </span>
            </div>
            <h3 className="display text-base uppercase mt-2" style={{ color: "var(--ink-1)" }}>
              {tr("끊어진 신호", "Disconnected Signals")}
            </h3>
            <p className="text-xs text-gray-500 font-sans leading-relaxed">
              {tr("통신이 두절되었습니다. 초소의 노인들을 보호하고 잡음 속 외계 전파를 가로채세요.", "Communications are severed. Protect the elders in the outpost and intercept static foreign transmissions.")}
            </p>
          </div>
          <div className="pt-3 mt-4 eyebrow" style={{ borderTop: "1px solid var(--line)", color: "var(--acc-violet)" }}>
            {tr("상태: 보유량 제한", "STATUS: GATED BY HOLDINGS")}
          </div>
        </div>

        {/* Episode 3 Card */}
        <div className="panel panel-bracket p-5 relative overflow-hidden flex flex-col justify-between min-h-[300px]" style={{ opacity: 0.85 }}>
          <span className="br-bl" /><span className="br-br" />
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-start">
              <span className="font-mono font-bold px-2 py-0.5" style={{ fontSize: 10, color: "var(--ink-2)", background: "var(--bg-2)" }}>
                {tr("에피소드 03", "EPISODE 03")}
              </span>
              <span className="font-mono font-bold" style={{ fontSize: 9, color: "var(--acc-violet)" }}>
                {tr("20,000 $NAHOPE 필요", "20,000 $NAHOPE GATED")}
              </span>
            </div>
            <h3 className="display text-base uppercase mt-2" style={{ color: "var(--ink-1)" }}>
              {tr("인간의 먼지", "Human Dust")}
            </h3>
            <p className="text-xs text-gray-500 font-sans leading-relaxed">
              {tr("4.5~6미터 크기의 인간형 존재와 마주하고 호포의 어두운 숲에서 사냥을 견뎌 내세요.", "Facing the 15-20ft tall humanoid entity. Surviving the hunt in the dark forest of Hopo.")}
            </p>
          </div>
          <div className="pt-3 mt-4 eyebrow" style={{ borderTop: "1px solid var(--line)", color: "var(--acc-violet)" }}>
            {tr("상태: 보유량 제한", "STATUS: GATED BY HOLDINGS")}
          </div>
        </div>

        {/* Episode 4 Card */}
        <div className="panel panel-bracket p-5 relative overflow-hidden flex flex-col justify-between min-h-[300px]" style={{ opacity: 0.9 }}>
          <span className="br-bl" /><span className="br-br" />
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-start">
              <span className="font-mono font-bold px-2 py-0.5" style={{ fontSize: 10, color: "var(--ink-2)", background: "var(--bg-2)" }}>
                {tr("에피소드 04", "EPISODE 04")}
              </span>
              <span className="font-mono font-bold" style={{ fontSize: 9, color: "var(--acc-danger)" }}>
                {tr("100,000 $NAHOPE 에스크로", "100,000 $NAHOPE ESCROW")}
              </span>
            </div>
            <h3 className="display text-base uppercase mt-2" style={{ color: "var(--ink-1)" }}>
              {tr("오메가 프로토콜", "Omega Protocol")}
            </h3>
            <p className="text-xs text-gray-500 font-sans leading-relaxed">
              {tr("시나리오 제출 에스크로에 접근해 아이템 세계관을 조합하고 제안서 초안을 작성하세요.", "Gain access to the Scenario Submission Escrow. Synthesize item lore and write the proposal draft.")}
            </p>
          </div>
          <div className="pt-3 mt-4 eyebrow" style={{ borderTop: "1px solid var(--line)", color: "var(--acc-danger)" }}>
            {tr("상태: 에스크로 시간 잠금 필요", "STATUS: ESCROW TIME-LOCK REQUIRED")}
          </div>
        </div>

      </div>
    </section>
  );
}
