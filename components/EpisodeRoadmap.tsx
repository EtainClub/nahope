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
              {tr("Investigate the mutilated cow, challenge the tiger theory, and keep Sung-gi's hunters out of the forest.", "Investigate the mutilated cow, challenge the tiger theory, and keep Sung-gi's hunters out of the forest.")}
            </p>
          </div>
          <div className="pt-3 mt-4 eyebrow" style={{ borderTop: "1px solid var(--line-bright)", color: "var(--acc-primary)" }}>
            {tr("상태: 활성 · 티저 플레이 가능 →", "STATUS: ACTIVE TEASER PLAYABLE →")}
          </div>
        </Link>

        {/* Episode 2 Card */}
        <Link href="/game?episode=2" className="panel panel-bracket p-5 relative overflow-hidden flex flex-col justify-between min-h-[300px] cursor-pointer transition-all hover:scale-[1.02] hover:brightness-110" style={{ borderColor: "var(--acc-violet)", boxShadow: "0 0 20px color-mix(in srgb, var(--acc-violet) 18%, transparent)" }}>
          <span className="br-bl" /><span className="br-br" />
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-start">
              <span className="font-mono font-bold px-2 py-0.5" style={{ fontSize: 10, color: "var(--acc-violet)", background: "var(--bg-2)" }}>
                EPISODE 02
              </span>
              <span className="font-mono font-bold" style={{ fontSize: 9, color: "var(--acc-violet)" }}>
                5,000 $NAHOPE GATED
              </span>
            </div>
            <h3 className="display text-base uppercase mt-2" style={{ color: "var(--ink-0)" }}>
              The Hunt Reverses
            </h3>
            <p className="text-xs text-gray-400 font-sans leading-relaxed">
              Trace Yang-bae&apos;s first shot from Kali&apos;s cold room to the crashed royal vessel, then stop the mountain search from firing again.
            </p>
          </div>
          <div className="pt-3 mt-4 eyebrow" style={{ borderTop: "1px solid var(--line)", color: "var(--acc-violet)" }}>
            STATUS: PLAYABLE · EP.1 CLEAR REQUIRED →
          </div>
        </Link>

        {/* Episode 3 Card */}
        <Link href="/game?episode=3" className="panel panel-bracket p-5 relative overflow-hidden flex flex-col justify-between min-h-[300px] cursor-pointer transition-all hover:scale-[1.02] hover:brightness-110" style={{ borderColor: "var(--acc-danger)", boxShadow: "0 0 20px color-mix(in srgb, var(--acc-danger) 16%, transparent)" }}>
          <span className="br-bl" /><span className="br-br" />
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-start">
              <span className="font-mono font-bold px-2 py-0.5" style={{ fontSize: 10, color: "var(--acc-danger)", background: "var(--bg-2)" }}>
                EPISODE 03
              </span>
              <span className="font-mono font-bold" style={{ fontSize: 9, color: "var(--acc-danger)" }}>
                20,000 $NAHOPE GATED
              </span>
            </div>
            <h3 className="display text-base uppercase mt-2" style={{ color: "var(--ink-0)" }}>
              Human Dust
            </h3>
            <p className="text-xs text-gray-400 font-sans leading-relaxed">
              Evacuate Hopo, recover Kali from the cold room, and turn disarmament, evidence, and the returned child into a wordless truce.
            </p>
          </div>
          <div className="pt-3 mt-4 eyebrow" style={{ borderTop: "1px solid var(--line)", color: "var(--acc-danger)" }}>
            STATUS: PLAYABLE · EP.2 CLEAR REQUIRED →
          </div>
        </Link>

        {/* Episode 4 Card */}
        <Link href="/game?episode=4" className="panel panel-bracket p-5 relative overflow-hidden flex flex-col justify-between min-h-[300px] cursor-pointer transition-all hover:scale-[1.02] hover:brightness-110" style={{ borderColor: "var(--acc-cyan)", boxShadow: "0 0 20px color-mix(in srgb, var(--acc-cyan) 16%, transparent)" }}>
          <span className="br-bl" /><span className="br-br" />
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-start">
              <span className="font-mono font-bold px-2 py-0.5" style={{ fontSize: 10, color: "var(--acc-cyan)", background: "var(--bg-2)" }}>
                EPISODE 04
              </span>
              <span className="font-mono font-bold" style={{ fontSize: 9, color: "var(--acc-cyan)" }}>
                100,000 $NAHOPE GATED
              </span>
            </div>
            <h3 className="display text-base uppercase mt-2" style={{ color: "var(--ink-0)" }}>
              Omega Protocol
            </h3>
            <p className="text-xs text-gray-400 font-sans leading-relaxed">
              Rebuild the Hopo archive, separate fact from inference and invention, then submit a three-artifact Humans in Space proposal for community review.
            </p>
          </div>
          <div className="pt-3 mt-4 eyebrow" style={{ borderTop: "1px solid var(--line)", color: "var(--acc-cyan)" }}>
            STATUS: PLAYABLE · EP.3 CLEAR + 3 ARTIFACTS →
          </div>
        </Link>

      </div>
    </section>
  );
}
