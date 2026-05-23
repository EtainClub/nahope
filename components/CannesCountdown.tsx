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

  // Bonding Curve progress simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setBondingProgress((prev) => {
        if (prev >= 100) return 74.28;
        const increment = Math.random() * 0.03;
        return parseFloat((prev + increment).toFixed(2));
      });
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch mb-8 px-4 md:px-0">
      
      {/* 24h Cannes Countdown Box */}
      <div className="glass-panel rounded-2xl p-6 border border-neon-pink/30 relative overflow-hidden flex flex-col justify-between shadow-[0_0_30px_rgba(255,0,127,0.08)]">
        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-neon-pink rounded-tl" />
        <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-neon-purple rounded-tr" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-alien-cyan rounded-bl" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-neon-pink rounded-br" />

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-neon-pink animate-pulse" />
            <span className="text-neon-pink font-mono text-[10px] tracking-widest uppercase">
              {"// LIVE COUNTDOWN TIMER"}
            </span>
          </div>
          <h3 className="font-righteous text-2xl font-bold text-white tracking-wide">
            CANNES CLOSING CEREMONY COUNTDOWN
          </h3>
          <p className="text-xs text-gray-400 font-sans leading-relaxed">
            Франции Канны. The clock is ticking down to the Cannes Film Festival closing awards ceremony. 
            Will director Na Hong-jin claim the Golden Palm (Palme d&apos;Or) for this 160-minute masterpiece?
          </p>
        </div>

        {/* Timer display */}
        <div className="grid grid-cols-3 gap-4 py-6 text-center">
          <div className="bg-space-950/80 rounded-xl p-3 border border-space-800">
            <div className="font-righteous text-4xl sm:text-5xl text-neon-pink font-bold font-mono tracking-tight">
              {String(timeLeft.hours).padStart(2, "0")}
            </div>
            <div className="text-[10px] text-gray-500 font-mono font-bold mt-1 uppercase">HOURS</div>
          </div>
          <div className="bg-space-950/80 rounded-xl p-3 border border-space-800">
            <div className="font-righteous text-4xl sm:text-5xl text-neon-purple font-bold font-mono tracking-tight">
              {String(timeLeft.minutes).padStart(2, "0")}
            </div>
            <div className="text-[10px] text-gray-500 font-mono font-bold mt-1 uppercase">MINUTES</div>
          </div>
          <div className="bg-space-950/80 rounded-xl p-3 border border-space-800">
            <div className="font-righteous text-4xl sm:text-5xl text-alien-cyan font-bold font-mono tracking-tight">
              {String(timeLeft.seconds).padStart(2, "0")}
            </div>
            <div className="text-[10px] text-gray-500 font-mono font-bold mt-1 uppercase">SECONDS</div>
          </div>
        </div>

        <div className="text-[10px] text-neon-pink font-mono text-center tracking-wider">
          {statusText}
        </div>
      </div>

      {/* Pump.fun Graduation progress */}
      <div className="glass-panel rounded-2xl p-6 border border-neon-purple/30 relative overflow-hidden flex flex-col justify-between shadow-[0_0_30px_rgba(216,0,255,0.08)]">
        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-alien-cyan rounded-tl" />
        <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-neon-pink rounded-tr" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-neon-purple rounded-bl" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-alien-cyan rounded-br" />


        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-alien-cyan animate-ping" />
            <span className="text-alien-cyan font-mono text-[10px] tracking-widest uppercase">
              {"// PUMP.FUN POOL ALIGNMENT"}
            </span>
          </div>
          <h3 className="font-righteous text-2xl font-bold text-white tracking-wide">
            BONDING CURVE GRADUATION BAR
          </h3>
          <p className="text-xs text-gray-400 font-sans leading-relaxed">
            The token pool is bonding. Upon reaching 100% progress, $NAHOPE will graduate to the Raydium liquidity pool, 
            automatically triggering the **Episode 1: Golden Palm Hope Release Event**.
          </p>
        </div>

        {/* Bonding gauge */}
        <div className="py-6 flex flex-col gap-2">
          <div className="flex justify-between text-xs font-semibold text-gray-300">
            <span>BONDING CURVE PROGRESS</span>
            <span className="text-alien-cyan font-mono">{bondingProgress}%</span>
          </div>
          
          <div className="h-4 w-full bg-space-950 rounded-full overflow-hidden p-[2px] border border-space-850">
            <div 
              className="h-full bg-gradient-to-r from-neon-pink via-neon-purple to-alien-cyan rounded-full transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(0,245,212,0.4)]"
              style={{ width: `${bondingProgress}%` }}
            />
          </div>

          <div className="flex justify-between text-[10px] text-gray-500 font-mono mt-1">
            <span>CURRENT STAGE: GRADUATING</span>
            <span>TARGET: 85 SOL (100%)</span>
          </div>
        </div>

        <div className="text-[10px] text-alien-cyan font-mono text-center tracking-wider">
          UNLOCKED AT 100%: EPISODE 1 SCENARIO PLAYROOM EVENT
        </div>
      </div>

    </div>
  );
}
