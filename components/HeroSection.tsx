"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function HeroSection() {
  const [bondingProgress, setBondingProgress] = useState(74.28);
  const [solValue, setSolValue] = useState(63.15);

  // Simulate real-time bonding curve progress typical on pump.fun
  useEffect(() => {
    const interval = setInterval(() => {
      setBondingProgress((prev) => {
        if (prev >= 100) return 74.28;
        const increment = Math.random() * 0.05;
        return parseFloat((prev + increment).toFixed(2));
      });
      setSolValue((prev) => {
        const increment = Math.random() * 0.04;
        return parseFloat((prev + increment).toFixed(2));
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-between overflow-hidden px-4 md:px-8 py-6">
      {/* Background neon glows in Jeroin style (violet/purple/pink) */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#110018] to-[#110018] z-0" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[600px] h-[350px] md:h-[600px] bg-neon-purple/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[250px] h-[250px] bg-alien-cyan/5 rounded-full blur-[80px] pointer-events-none animate-pulse-slow" />
      <div className="absolute top-1/2 right-1/4 w-[250px] h-[250px] bg-neon-pink/5 rounded-full blur-[80px] pointer-events-none animate-pulse-slow" style={{ animationDelay: "2s" }} />

      {/* Header / Navbar */}
      <header className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-between py-4 border-b border-space-800/40">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-neon-purple/40">
            <Image
              src="/images/nahope_logo.png"
              alt="NAHOPE Logo"
              fill
              className="object-cover"
            />
          </div>
          <span className="font-righteous text-xl font-bold tracking-wider text-white">
            NA<span className="text-neon-pink">HOPE</span>
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="hidden sm:flex items-center gap-8 text-sm font-medium text-gray-400">
          <a href="#story" className="hover:text-white transition-colors">STORY</a>
          <a href="#casting" className="hover:text-white transition-colors">CASTING</a>
          <a href="#tokenomics" className="hover:text-white transition-colors">TOKENOMICS</a>
        </nav>

        {/* Socials & Action Button */}
        <div className="flex items-center gap-4">
          <a
            href="https://x.com/nahope_sol"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-gray-400 hover:text-white transition-colors"
            title="Twitter / X"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <a
            href="https://t.me/nahope_sol"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-gray-400 hover:text-white transition-colors"
            title="Telegram"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.11.02-1.93 1.23-5.46 3.62-.51.35-.98.53-1.39.51-.46-.01-1.35-.26-2.01-.48-.81-.27-1.46-.42-1.4-.88.03-.24.38-.49 1.04-.75 4.08-1.77 6.8-2.94 8.16-3.5 3.88-1.61 4.68-1.89 5.21-1.9.12 0 .37.03.54.17.14.11.18.28.2.42-.02.07-.02.13-.03.22z" />
            </svg>
          </a>
          <a
            href="#pump"
            className="relative overflow-hidden rounded-lg bg-space-900 border border-neon-purple/50 px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-space-850"
          >
            CONNECT WALLET
          </a>
        </div>
      </header>

      {/* Hero Body */}
      <main className="relative z-10 flex-1 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-12 md:py-20">
        
        {/* Left: Text & CTA */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left gap-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-pink/30 bg-neon-pink/10 text-neon-pink text-xs font-semibold tracking-wider uppercase animate-pulse">
            ⚠️ WARNING: OUT OF HUMAN CONTROL
          </div>

          <h1 className="font-righteous text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-tight">
            SUMMER 2026.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neon-pink to-neon-purple text-neon-pink">
              SOMETHING IS COMING.
            </span>
          </h1>

          <p className="max-w-xl text-base sm:text-lg text-gray-450 leading-relaxed font-sans">
            From the visionary mind of director Na Hong-jin (creator of thriller masterpieces <em>&apos;The Wailing&apos;</em> and <em>&apos;The Chaser&apos;</em>) comes 2026&apos;s most anticipated mystery sci-fi thriller: <strong>&apos;HOPE&apos;</strong>. 
            As an alien presence isolates a rural village, the struggle for survival begins. Amidst this ultimate dread, <strong>$NAHOPE</strong> rises on Solana.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mt-4">
            <a
              href="https://pump.fun"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-neon-pink to-neon-purple px-8 py-4 text-sm font-bold text-white transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,0,127,0.3)] animate-neon-pulse-pink"
            >
              BUY $NAHOPE ON PUMP.FUN
            </a>
            <a
              href="https://www.youtube.com/watch?v=KgwHb2qNo8k"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-white/10 hover:border-white/20"
            >
              WATCH TRAILER
            </a>
          </div>

          <div className="flex items-center gap-6 mt-4 text-xs text-gray-500">
            <div>DEVELOPER SUPPLY: <span className="text-neon-pink font-bold">1.5% ONLY</span></div>
            <div className="w-1 h-1 rounded-full bg-gray-700" />
            <div>LIQUIDITY: <span className="text-white font-bold">100% BURNED ON LAUNCH</span></div>
          </div>
        </div>

        {/* Right: Interactive Widget / Logo Emblem */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center w-full">
          <div className="w-full max-w-[420px] glass-panel rounded-2xl p-6 border border-white/5 flex flex-col gap-6 relative shadow-2xl">
            {/* Corner styling corners */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-neon-purple/40 rounded-tl-lg" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-neon-purple/40 rounded-tr-lg" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-neon-purple/40 rounded-bl-lg" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-neon-purple/40 rounded-br-lg" />

            {/* Glowing Logo Circle */}
            <div className="flex justify-center py-4">
              <div className="relative w-48 h-48 rounded-full overflow-hidden border-2 border-neon-purple/30 shadow-[0_0_40px_rgba(216,0,255,0.15)] animate-alien-float">
                <Image
                  src="/images/nahope_logo.png"
                  alt="NAHOPE Coin Logo"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Pump.fun Bonding Curve Simulated Widget */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center text-xs font-semibold text-gray-400">
                <span className="flex items-center gap-1.5 font-righteous">
                  <span className="w-2 h-2 rounded-full bg-neon-pink animate-ping" />
                  BONDING CURVE PROGRESS
                </span>
                <span className="text-white text-sm font-bold font-mono">{bondingProgress}%</span>
              </div>

              {/* Progress bar wrapper */}
              <div className="h-3 w-full bg-space-950 rounded-full overflow-hidden border border-space-800/40 p-[2px]">
                <div 
                  className="h-full bg-gradient-to-r from-neon-pink to-neon-purple rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(255,0,127,0.4)]"
                  style={{ width: `${bondingProgress}%` }}
                />
              </div>

              <div className="flex justify-between items-center text-[10px] text-gray-500 font-mono mt-1">
                <span>REACHED: {solValue} SOL / 85 SOL</span>
                <span>TO SOLANA RAYDIUM POOL</span>
              </div>
            </div>

            {/* Simulated Price Stats */}
            <div className="grid grid-cols-2 gap-4 border-t border-space-800/30 pt-4 text-center">
              <div>
                <div className="text-[10px] text-gray-500 font-medium uppercase">TICKER</div>
                <div className="text-sm font-bold text-white font-mono">$NAHOPE</div>
              </div>
              <div>
                <div className="text-[10px] text-gray-500 font-medium uppercase">INITIAL SUPPLY</div>
                <div className="text-sm font-bold text-white font-mono">1,000,000,000</div>
              </div>
            </div>
          </div>
        </div>

      </main>

      {/* Decorative footer label */}
      <div className="relative z-10 w-full text-center text-[10px] tracking-[0.2em] font-bold text-gray-600 uppercase py-4">
        👽 WE ARE NOT ALONE. BUT WE HAVE $NAHOPE.
      </div>
    </section>
  );
}
