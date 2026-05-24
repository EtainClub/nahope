"use client";

import { useState } from "react";
import Link from "next/link";
import CannesCountdown from "../components/CannesCountdown";
import IsakuGameTeaser from "../components/IsakuGameTeaser";
import EpisodeRoadmap from "../components/EpisodeRoadmap";
import ScenarioFeed, { INITIAL_SCENARIOS, Scenario } from "../components/ScenarioFeed";
import { ArrowRight, Film, Gamepad2, Users } from "lucide-react";

export default function Home() {
  const [scenarios, setScenarios] = useState<Scenario[]>(INITIAL_SCENARIOS);

  const handleScenarioSubmit = (newScen: { items: string[]; text: string; id: number }) => {
    const newEntry: Scenario = {
      id: newScen.id,
      author: "Hopo_Survivor_" + Math.floor(Math.random() * 900 + 100),
      items: newScen.items,
      text: newScen.text,
      votes: 1,
      timestamp: "Just now",
      voted: true,
    };
    setScenarios((prev) => [newEntry, ...prev]);
  };

  const handleVote = (id: number) => {
    setScenarios((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          const alreadyVoted = s.voted;
          return {
            ...s,
            votes: alreadyVoted ? s.votes - 1 : s.votes + 1,
            voted: !alreadyVoted,
          };
        }
        return s;
      })
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-space-950 text-gray-100 selection:bg-neon-pink selection:text-white">
      
      {/* Ambient background decoration */}
      <div className="absolute top-0 inset-x-0 h-[600px] bg-gradient-to-b from-space-900/30 to-transparent pointer-events-none z-0" />

      {/* Top Warning Ribbon */}
      <div className="relative z-20 w-full py-2 text-center font-mono font-bold uppercase flicker" style={{ background: "var(--acc-primary)", color: "var(--bg-0)", fontSize: 10, letterSpacing: "0.2em" }}>
        ALERT: HOPO PORT CONTROL ZONE - OMEGA PROTOCOL ACTIVE
      </div>

      <main className="relative z-10 flex-1 flex flex-col py-8">
        
        {/* Cinematic Welcome Banner & Quick Links */}
        <section className="w-full max-w-7xl mx-auto px-4 md:px-0 mb-8 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center gap-6 border-b border-space-900/40 pb-8">
          <div>
            <h2 className="display text-2xl uppercase" style={{ color: "var(--ink-0)" }}>
              WELCOME TO HOPO PORT OUTPOST
            </h2>
            <p className="font-sans mt-1" style={{ fontSize: 12, color: "var(--ink-3)" }}>
              Select a classified terminal frequency below to begin your decryption sequence.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/intro"
              className="flex items-center gap-2 px-4 py-2.5 font-mono text-xs transition-all cursor-pointer"
              style={{ background: "var(--bg-1)", border: "1px solid var(--line-bright)", color: "var(--ink-2)" }}
            >
              <Film className="w-3.5 h-3.5" />
              MOVIE INFO
            </Link>
            <Link
              href="/game"
              className="flex items-center gap-2 px-4 py-2.5 font-mono text-xs uppercase tracking-widest hover:scale-[1.02] transition-all cursor-pointer"
              style={{ background: "var(--acc-primary)", color: "var(--bg-0)", boxShadow: "var(--glow-primary)" }}
            >
              <Gamepad2 className="w-3.5 h-3.5" />
              PLAY ROOM ESCAPE
            </Link>
            <Link
              href="/community"
              className="flex items-center gap-2 px-4 py-2.5 font-mono text-xs transition-all cursor-pointer"
              style={{ background: "var(--bg-1)", border: "1px solid var(--line-bright)", color: "var(--ink-2)" }}
            >
              <Users className="w-3.5 h-3.5" />
              COMMUNITY FEED
            </Link>
          </div>
        </section>

        {/* Section 1: Cannes Countdown Ceremony Timer & Progress Bar */}
        <CannesCountdown />

        {/* Section 2: RPG Interface (Isaku-style Point-and-Click Teaser with redirection banner) */}
        <div className="relative">
          <IsakuGameTeaser onScenarioSubmit={handleScenarioSubmit} />
          
          <div className="w-full max-w-7xl mx-auto px-4 md:px-0 mb-12 -mt-4">
            <Link
              href="/game"
              className="w-full px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 font-mono text-xs transition-all cursor-pointer"
              style={{ background: "var(--bg-1)", border: "1px solid var(--line-bright)", color: "var(--ink-2)" }}
            >
              <div className="flex items-center gap-3">
                <span className="p-2" style={{ background: "color-mix(in srgb, var(--acc-primary) 10%, transparent)", border: "1px solid color-mix(in srgb, var(--acc-primary) 30%, transparent)" }}>
                  🎮
                </span>
                <div className="text-left">
                  <div className="display uppercase tracking-wider" style={{ color: "var(--ink-0)" }}>EPISODE 1 MULTI-ROOM EDITION IS READY</div>
                  <div className="font-sans mt-0.5" style={{ fontSize: 10, color: "var(--ink-3)" }}>Explore the full police substation office, farm roads, and storage room. Search for tools and unlock deep lore.</div>
                </div>
              </div>
              <div className="flex items-center gap-1.5 font-bold uppercase tracking-widest" style={{ fontSize: 10, color: "var(--acc-primary)" }}>
                PLAY FULL INTERACTIVE GAME
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          </div>
        </div>

        {/* Section 3: Gated Episode Roadmap */}
        <div className="relative">
          <EpisodeRoadmap />
          
          <div className="w-full max-w-7xl mx-auto px-4 md:px-0 mb-12 -mt-4 text-center">
            <Link
              href="/game"
              className="inline-flex items-center gap-2 text-xs font-mono text-neon-purple hover:underline"
            >
              🧩 Open the Episode 1 Search Terminal to secure tools and begin investigations
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Section 4: Scenario Feed list with redirection */}
        <div className="relative">
          <ScenarioFeed scenarios={scenarios} onVote={handleVote} />

          <div className="w-full max-w-7xl mx-auto px-4 md:px-0 mb-12 -mt-4 text-center">
            <Link
              href="/community"
              className="inline-flex items-center gap-2 bg-space-900 border border-space-850 hover:bg-space-850 text-white font-mono px-5 py-3 rounded-xl text-xs transition-colors cursor-pointer"
            >
              💬 View all community brag posts and scenarios on the Transmissions board
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Section 5: Performance Campaign Info */}
        <section className="w-full max-w-7xl mx-auto px-4 md:px-0 py-12 border-t border-space-800/40 text-center">
          <div className="max-w-2xl mx-auto flex flex-col gap-6">
            <h4 className="display text-xl uppercase" style={{ color: "var(--ink-0)" }}>
              Deliver the Scenario Book to Director Na Hong-jin
            </h4>
            <p className="text-xs text-gray-400 font-sans leading-relaxed">
              The highest-voted storyline on our dashboard will be compiled, designed, and professionally printed 
              as a high-fidelity &quot;Cosmic Classified Dossier&quot; book.
            </p>
            <p className="text-xs text-gray-400 font-sans leading-relaxed">
              Just ahead of the film&apos;s release, the Hopo Port Survivor Community will deliver this physical scenario book, 
              along with a donation receipt funded by project proceeds, directly to Na Hong-jin&apos;s production office (Forged Films). 
              Let your voice shape the future of the trilogy.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-space-950 border-t border-space-900/80 py-12 px-4 md:px-8 text-center text-gray-500 text-xs font-sans">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          
          <div className="flex flex-col items-center md:items-start gap-1">
            <div className="flex items-center gap-2">
              <span className="display text-sm" style={{ color: "var(--ink-0)" }}>
                HOPO<span style={{ color: "var(--acc-primary)" }}>PORT</span>
              </span>
              <span>|</span>
              <span>EST. 2026</span>
            </div>
            <span className="text-[9px] text-gray-600 font-mono tracking-widest uppercase">
              CO-PRODUCTION: FORGED FILMS &amp; PLUS M ENTERTAINMENT
            </span>
          </div>

          <p className="max-w-md text-[10px] text-gray-600 leading-relaxed md:text-left">
            Disclaimer: Hopo Port: Omega Protocol is a community-driven campaign inspired by the movie &apos;HOPE&apos;. 
            It holds no official partnership with director Na Hong-jin or Forged Films. 
            All crypto assets involved are purely speculative in nature. Do Your Own Research.
          </p>

          <div>
            &copy; 2026 Hopo Port. All rights reserved.
          </div>

        </div>
      </footer>
    </div>
  );
}

