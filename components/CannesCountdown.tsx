"use client";

import { useState, useEffect } from "react";

export default function CannesCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [statusText, setStatusText] = useState("STATUS: SPECTRAL SIGNALS BROADCASTING FROM LA CROISETTE");

  const [bondingProgress, setBondingProgress] = useState(74.28);

  // Countdown timer to the actual Cannes Film Festival closing awards ceremony
  useEffect(() => {
    const targetDate = new Date("2026-05-23T17:15:00Z"); // May 23, 2026, 19:15 CEST

    const updateCountdown = () => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        const twoHours = 2 * 60 * 60 * 1000;
        if (Math.abs(diff) < twoHours) {
          setStatusText("STATUS: CEREMONY IN PROGRESS - LIVE STREAM ACTIVE");
        } else {
          setStatusText("STATUS: CEREMONY CONCLUDED - OMEGA DOSSIER FINALIZED");
        }
        return false;
      } else {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft({ hours, minutes, seconds });
        setStatusText("STATUS: SPECTRAL SIGNALS BROADCASTING FROM LA CROISETTE");
        return true;
      }
    };

    updateCountdown();

    const timer = setInterval(() => {
      const active = updateCountdown();
      if (!active) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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

    // Initial fetch
    fetchProgress();

    // Refresh every 60 seconds to avoid hitting rate limits
    const interval = setInterval(fetchProgress, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch mb-8 px-4 md:px-0">
      
      {/* 24h Cannes Countdown Box */}
      <div className="panel panel-bracket p-6 relative overflow-hidden flex flex-col justify-between" style={{ boxShadow: "var(--glow-primary)" }}>
        <span className="br-bl" /><span className="br-br" />

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ background: "var(--acc-primary)", animation: "pulse-glow 1s ease infinite" }} />
            <span className="eyebrow" style={{ color: "var(--acc-primary)" }}>// LIVE COUNTDOWN TIMER</span>
          </div>
          <h3 className="display text-2xl" style={{ color: "var(--ink-0)" }}>
            CANNES CLOSING CEREMONY COUNTDOWN
          </h3>
          <p className="text-xs text-gray-400 font-sans leading-relaxed">
            Франции Канны. The clock is ticking down to the Cannes Film Festival closing awards ceremony. 
            Will director Na Hong-jin claim the Golden Palm (Palme d&apos;Or) for this 160-minute masterpiece?
          </p>
        </div>

        {/* Timer display */}
        <div className="grid grid-cols-3 gap-4 py-6 text-center">
          <div className="p-3" style={{ background: "var(--bg-0)", border: "1px solid var(--line)" }}>
            <div className="display text-4xl sm:text-5xl font-mono" style={{ color: "var(--acc-primary)" }}>
              {String(timeLeft.hours).padStart(2, "0")}
            </div>
            <div className="eyebrow mt-1" style={{ fontSize: 9 }}>HOURS</div>
          </div>
          <div className="p-3" style={{ background: "var(--bg-0)", border: "1px solid var(--line)" }}>
            <div className="display text-4xl sm:text-5xl font-mono" style={{ color: "var(--acc-violet)" }}>
              {String(timeLeft.minutes).padStart(2, "0")}
            </div>
            <div className="eyebrow mt-1" style={{ fontSize: 9 }}>MINUTES</div>
          </div>
          <div className="p-3" style={{ background: "var(--bg-0)", border: "1px solid var(--line)" }}>
            <div className="display text-4xl sm:text-5xl font-mono" style={{ color: "var(--acc-cyan)" }}>
              {String(timeLeft.seconds).padStart(2, "0")}
            </div>
            <div className="eyebrow mt-1" style={{ fontSize: 9 }}>SECONDS</div>
          </div>
        </div>

        <div className="font-mono text-center" style={{ fontSize: 10, color: "var(--acc-primary)", letterSpacing: "0.12em" }}>
          {statusText}
        </div>
      </div>

      {/* Pump.fun Graduation progress */}
      <div className="panel panel-bracket p-6 relative overflow-hidden flex flex-col justify-between" style={{ boxShadow: "var(--glow-violet)" }}>
        <span className="br-bl" /><span className="br-br" />


        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ background: "var(--acc-cyan)", animation: "pulse-glow 1s ease infinite" }} />
            <span className="eyebrow" style={{ color: "var(--acc-cyan)" }}>// PUMP.FUN POOL ALIGNMENT</span>
          </div>
          <h3 className="display text-2xl" style={{ color: "var(--ink-0)" }}>
            BONDING CURVE GRADUATION BAR
          </h3>
          <p className="text-xs text-gray-400 font-sans leading-relaxed">
            The token pool is bonding. Upon reaching 100% progress, $NAHOPE will graduate to the Raydium liquidity pool, 
            automatically triggering the **Episode 1: Golden Palm Hope Release Event**.
          </p>
          <div className="mt-1 flex items-center justify-between p-2.5" style={{ background: "var(--bg-0)", border: "1px solid var(--line-bright)" }}>
            <span className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">Contract Address</span>
            <code className="text-xs text-alien-cyan font-mono select-all cursor-copy" title="Click to select">
              CvKFHHfXqusmcrU18d6pvCWhJrWyteziqi99xJgjpump
            </code>
          </div>
        </div>

        {/* Bonding gauge */}
        <div className="py-6 flex flex-col gap-2">
          <div className="flex justify-between font-mono text-xs" style={{ color: "var(--ink-1)" }}>
            <span>BONDING CURVE PROGRESS</span>
            <span style={{ color: "var(--acc-cyan)" }}>{bondingProgress}%</span>
          </div>

          <div className="h-4 w-full overflow-hidden" style={{ background: "var(--bg-0)", border: "1px solid var(--line-bright)" }}>
            <div
              className="h-full transition-all duration-1000 ease-out"
              style={{ width: `${bondingProgress}%`, background: "linear-gradient(90deg, var(--acc-primary), var(--acc-violet), var(--acc-cyan))", boxShadow: "0 0 15px var(--acc-cyan)" }}
            />
          </div>

          <div className="flex justify-between font-mono mt-1" style={{ fontSize: 10, color: "var(--ink-3)" }}>
            <span>CURRENT STAGE: GRADUATING</span>
            <span>TARGET: 85 SOL (100%)</span>
          </div>
        </div>

        <div className="font-mono text-center" style={{ fontSize: 10, color: "var(--acc-cyan)", letterSpacing: "0.12em" }}>
          UNLOCKED AT 100%: EPISODE 1 SCENARIO PLAYROOM EVENT
        </div>
      </div>

    </div>
  );
}
