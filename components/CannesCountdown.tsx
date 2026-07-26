"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "../lib/i18n";

export default function CannesCountdown() {
  const [bondingProgress, setBondingProgress] = useState(74.28);
  const { tr } = useLanguage();

  // Fetch real bonding curve progress from GeckoTerminal API
  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await fetch("https://api.geckoterminal.com/api/v2/networks/solana/tokens/CvKFHHfXqusmcrU18d6pvCWhJrWyteziqi99xJgjpump");
        if (res.ok) {
          const data = await res.json();
          const progress = data?.data?.attributes?.launchpad_details?.graduation_percentage;
          if (progress !== undefined && progress !== null) {
            setBondingProgress(parseFloat(progress.toFixed(2)));
          }
        }
      } catch (err) {
        console.error("Error fetching bonding curve progress:", err);
      }
    };

    fetchProgress();
    const interval = setInterval(fetchProgress, 60000);
    return () => clearInterval(interval);
  }, []);

  const remaining = Math.max(0, 100 - bondingProgress);
  const solRemaining = Math.max(0, (85 * remaining) / 100);
  const isGraduated = bondingProgress >= 100;

  const ep2StatusText = isGraduated
    ? tr("상태: 졸업 완료 — 에피소드 02 해제 · 끊어진 신호 활성", "STATUS: GRADUATED — EPISODE 02 UNLOCKED · DISCONNECTED SIGNALS LIVE")
    : tr("상태: 본딩 진행 중 — 졸업 전까지 에피소드 02 봉인", "STATUS: BONDING IN PROGRESS — EPISODE 02 SEALED UNTIL GRADUATION");

  return (
    <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch mb-8 px-4 md:px-0">

      {/* Episode 2 Unlock Countdown — driven by bonding curve graduation */}
      <div className="panel panel-bracket p-6 relative overflow-hidden flex flex-col justify-between" style={{ boxShadow: "var(--glow-primary)" }}>
        <span className="br-bl" /><span className="br-br" />

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ background: isGraduated ? "var(--acc-primary)" : "var(--acc-amber)", animation: "pulse-glow 1s ease infinite" }} />
            <span className="eyebrow" style={{ color: isGraduated ? "var(--acc-primary)" : "var(--acc-amber)" }}>
              {tr("// 에피소드 02 · 해제 절차", "// EPISODE 02 · UNLOCK SEQUENCE")}
            </span>
          </div>
          <h3 className="display text-2xl" style={{ color: "var(--ink-0)" }}>
            {tr("에피소드 02 졸업 카운트다운", "EPISODE 02 GRADUATION COUNTDOWN")}
          </h3>
          <p className="text-xs text-gray-400 font-sans leading-relaxed">
            {tr(
              "《에피소드 02: 끊어진 신호》는 오메가 금고에 봉인되어 있습니다. $NAHOPE 본딩 커브가 100%에 도달해 레이디움 풀로 졸업하는 즉시 자동으로 해제됩니다. 시계도, 출시일도 없습니다. 오직 풀만이 결정합니다.",
              "Episode 02: Disconnected Signals is sealed inside the omega vault. It unlocks automatically the instant the $NAHOPE bonding curve graduates to the Raydium pool at 100%. No clock. No release date. Only the pool decides.",
            )}
          </p>
        </div>

        {/* Countdown display — progress-based, not time-based */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 py-6 text-center">
          <div className="p-2 sm:p-3 min-w-0 overflow-hidden" style={{ background: "var(--bg-0)", border: "1px solid var(--line)" }}>
            <div className="display font-mono text-2xl sm:text-3xl lg:text-4xl tabular-nums truncate" style={{ color: "var(--acc-primary)" }}>
              {bondingProgress.toFixed(1)}
            </div>
            <div className="eyebrow mt-1" style={{ fontSize: 9 }}>{tr("본딩 %", "BONDED %")}</div>
          </div>
          <div className="p-2 sm:p-3 min-w-0 overflow-hidden" style={{ background: "var(--bg-0)", border: "1px solid var(--line)" }}>
            <div className="display font-mono text-2xl sm:text-3xl lg:text-4xl tabular-nums truncate" style={{ color: "var(--acc-violet)" }}>
              {remaining.toFixed(1)}
            </div>
            <div className="eyebrow mt-1" style={{ fontSize: 9 }}>{tr("남은 %", "REMAINING %")}</div>
          </div>
          <div className="p-2 sm:p-3 min-w-0 overflow-hidden" style={{ background: "var(--bg-0)", border: "1px solid var(--line)" }}>
            <div className="display font-mono text-2xl sm:text-3xl lg:text-4xl tabular-nums truncate" style={{ color: "var(--acc-cyan)" }}>
              {solRemaining.toFixed(1)}
            </div>
            <div className="eyebrow mt-1" style={{ fontSize: 9 }}>{tr("남은 SOL", "SOL TO GO")}</div>
          </div>
        </div>

        <div className="font-mono text-center" style={{ fontSize: 10, color: isGraduated ? "var(--acc-primary)" : "var(--acc-amber)", letterSpacing: "0.12em" }}>
          {ep2StatusText}
        </div>
      </div>

      {/* Pump.fun Graduation progress */}
      <div className="panel panel-bracket p-6 relative overflow-hidden flex flex-col justify-between" style={{ boxShadow: "var(--glow-violet)" }}>
        <span className="br-bl" /><span className="br-br" />


        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ background: "var(--acc-cyan)", animation: "pulse-glow 1s ease infinite" }} />
            <span className="eyebrow" style={{ color: "var(--acc-cyan)" }}>
              {tr("// PUMP.FUN 풀 정렬", "// PUMP.FUN POOL ALIGNMENT")}
            </span>
          </div>
          <h3 className="display text-2xl" style={{ color: "var(--ink-0)" }}>
            {tr("본딩 커브 졸업 진행도", "BONDING CURVE GRADUATION BAR")}
          </h3>
          <p className="text-xs text-gray-400 font-sans leading-relaxed">
            {tr(
              "토큰 풀이 본딩 중입니다. 진행률이 100%에 도달하면 $NAHOPE가 레이디움 유동성 풀로 졸업하고 《에피소드 02: 끊어진 신호》 해제 이벤트가 자동으로 실행됩니다.",
              "The token pool is bonding. Upon reaching 100% progress, $NAHOPE will graduate to the Raydium liquidity pool, automatically triggering the Episode 02: Disconnected Signals unlock event.",
            )}
          </p>
          <div className="mt-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2 p-2.5 min-w-0 overflow-hidden" style={{ background: "var(--bg-0)", border: "1px solid var(--line-bright)" }}>
            <span className="text-[10px] text-gray-500 font-mono uppercase tracking-wider flex-shrink-0">
              {tr("컨트랙트 주소", "Contract Address")}
            </span>
            <code className="text-[10px] sm:text-xs text-alien-cyan font-mono select-all cursor-copy block w-full sm:w-auto min-w-0 truncate sm:text-right" title={tr("클릭하여 선택", "Click to select")}>
              CvKFHHfXqusmcrU18d6pvCWhJrWyteziqi99xJgjpump
            </code>
          </div>
        </div>

        {/* Bonding gauge */}
        <div className="py-6 flex flex-col gap-2">
          <div className="flex justify-between font-mono text-xs" style={{ color: "var(--ink-1)" }}>
            <span>{tr("본딩 커브 진행률", "BONDING CURVE PROGRESS")}</span>
            <span style={{ color: "var(--acc-cyan)" }}>{bondingProgress}%</span>
          </div>

          <div className="h-4 w-full overflow-hidden" style={{ background: "var(--bg-0)", border: "1px solid var(--line-bright)" }}>
            <div
              className="h-full transition-all duration-1000 ease-out"
              style={{ width: `${bondingProgress}%`, background: "linear-gradient(90deg, var(--acc-primary), var(--acc-violet), var(--acc-cyan))", boxShadow: "0 0 15px var(--acc-cyan)" }}
            />
          </div>

          <div className="flex justify-between font-mono mt-1" style={{ fontSize: 10, color: "var(--ink-3)" }}>
            <span>
              {tr("현재 단계", "CURRENT STAGE")}: {isGraduated ? tr("졸업 완료", "GRADUATED") : tr("졸업 진행 중", "GRADUATING")}
            </span>
            <span>{tr("목표", "TARGET")}: 85 SOL (100%)</span>
          </div>
        </div>

        <div className="font-mono text-center" style={{ fontSize: 10, color: "var(--acc-cyan)", letterSpacing: "0.12em" }}>
          {tr("100% 달성 시 해제: 에피소드 02 — 끊어진 신호", "UNLOCKED AT 100%: EPISODE 02 — DISCONNECTED SIGNALS")}
        </div>
      </div>

    </div>
  );
}
