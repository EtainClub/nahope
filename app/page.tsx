"use client";

import { useState } from "react";
import CannesCountdown from "../components/CannesCountdown";
import IsakuGameTeaser from "../components/IsakuGameTeaser";
import EpisodeRoadmap from "../components/EpisodeRoadmap";
import ScenarioFeed, { INITIAL_SCENARIOS, Scenario } from "../components/ScenarioFeed";

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
      <div className="relative z-20 w-full bg-neon-pink text-white text-[10px] font-mono font-bold tracking-[0.2em] py-2 text-center uppercase animate-pulse">
        ⚠️ ALERT: HOPO PORT CONTROL ZONE - OMEGA PROTOCOL ACTIVE ⚠️
      </div>

      <header className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-0 py-8 flex items-center justify-between border-b border-space-900">
        
        {/* Film HOPE Logo styling: H O P E blurred in different directions */}
        <div className="flex items-center gap-1 select-none">
          <span className="font-righteous text-3xl tracking-widest text-white flex items-center gap-1 bg-clip-text">
            <span className="blur-h chromatic-text inline-block">H</span>
            <span className="blur-o chromatic-text inline-block">O</span>
            <span className="blur-p chromatic-text inline-block">P</span>
            <span className="blur-e chromatic-text inline-block">E</span>
          </span>
          <span className="text-[10px] text-gray-600 font-mono self-end mb-1 ml-2">CODENAME: HOPO_PORT</span>
        </div>

        <span className="text-xs font-mono text-gray-500">// OMEGA_SYS_ONLINE</span>
      </header>

      <main className="relative z-10 flex-1 flex flex-col py-8">
        {/* Section 1: Cannes Countdown Ceremony Timer & Progress Bar */}
        <CannesCountdown />

        {/* Section 2: RPG Interface (Isaku-style Point-and-Click Teaser) */}
        <IsakuGameTeaser onScenarioSubmit={handleScenarioSubmit} />

        {/* Section 3: Gated Episode Roadmap */}
        <EpisodeRoadmap />

        {/* Section 4: Scenario Feed list */}
        <ScenarioFeed scenarios={scenarios} onVote={handleVote} />

        {/* Section 4: Performance Campaign Info */}
        <section className="w-full max-w-7xl mx-auto px-4 md:px-0 py-12 border-t border-space-800/40 text-center">
          <div className="max-w-2xl mx-auto flex flex-col gap-6">
            <h4 className="font-righteous text-xl font-bold text-white uppercase tracking-wider">
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
              <span className="font-righteous text-sm font-bold tracking-wider text-white">
                HOPO<span className="text-neon-pink">PORT</span>
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
            &copy; {new Date().getFullYear()} Hopo Port. All rights reserved.
          </div>

        </div>
      </footer>
    </div>
  );
}
