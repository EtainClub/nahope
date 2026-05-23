"use client";

import { useState } from "react";

interface Scenario {
  id: number;
  author: string;
  items: string[];
  text: string;
  votes: number;
  timestamp: string;
  voted?: boolean;
}

const INITIAL_SCENARIOS: Scenario[] = [
  {
    id: 1,
    author: "HopoSurvivor_88",
    items: ["Lost Carbine Rifle", "Omega (Ω) Amulet", "Translator Fragment"],
    text: "Part 2 opens in a hidden military bunker beneath Hopo Port. Sung-ki discovers that the Korean Defense Unit was secretly experimenting on the extraterrestrial debris since the 1970s. Utilizing the translator fragment, he hacks into the alien hive mind frequency, planning to weaponize the cosmic radiation against the mothership using his modified Carbine rifle.",
    votes: 14820,
    timestamp: "2 hours ago",
  },
  {
    id: 2,
    author: "K_Occultist",
    items: ["Dead Rotary Phone", "Sun-like Red Emblem", "Torn ID Tag of a Defense Soldier"],
    text: "The 'Red Silhouette' entity is actually an ancient shamanic deity from Korean folklore that was awakened by the alien electromagnetic pulse. Bum-seok tries to call the mainland using a dead phone, only to hear the voices of deceased soldiers. In Part 2, the conflict escalates into a three-way war between human survivors, the ancient deity, and the cosmic entities.",
    votes: 9340,
    timestamp: "5 hours ago",
  },
  {
    id: 3,
    author: "ChickenSlayer",
    items: ["Lost Carbine Rifle", "Bloodstained Reservist Cap"],
    text: "The legendary chicken is indeed the key. It was mutated by the initial meteorite collision, making it completely immune to the alien beam attacks. In Part 2, the surviving villagers attach remote sensors onto the chicken, using it to smuggle explosives into the giant mothership hovering over the village.",
    votes: 7210,
    timestamp: "1 day ago",
  },
];

interface ScenarioFeedProps {
  scenarios: Scenario[];
  onVote: (id: number) => void;
}

export default function ScenarioFeed({ scenarios, onVote }: ScenarioFeedProps) {
  return (
    <section id="feed" className="w-full max-w-7xl mx-auto px-4 md:px-0 py-12 border-t border-space-800/40">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <div className="text-neon-pink font-mono text-[10px] tracking-widest uppercase mb-1">
            // COLLECTIVE INTELLIGENCE SCENARIO ROOM
          </div>
          <h3 className="font-righteous text-2xl font-bold text-white tracking-wide">
            PUBLIC SCENARIO TRANSMISSIONS
          </h3>
          <p className="text-xs text-gray-400 font-sans mt-1">
            Review and vote on the best community-proposed storylines for HOPE Part 2.
          </p>
        </div>

        {/* Info card */}
        <div className="bg-space-950/80 border border-space-800 rounded-xl px-4 py-2 text-right">
          <div className="text-[10px] text-gray-500 font-mono">TOP SCENARIO EVENT</div>
          <div className="text-xs text-alien-cyan font-bold font-sans">COMPILED & DELIVERED TO NA HONG-JIN</div>
        </div>
      </div>

      {/* Feed list */}
      <div className="flex flex-col gap-6">
        {scenarios.map((scenario) => (
          <div 
            key={scenario.id} 
            className="glass-panel rounded-2xl p-6 border border-white/5 flex flex-col md:flex-row gap-6 items-start justify-between relative transition-all hover:border-space-700/40"
          >
            {/* Left: Votes */}
            <div className="flex md:flex-col items-center gap-2 bg-space-950/60 border border-space-850 px-3 py-2 rounded-xl min-w-[70px] text-center">
              <button 
                onClick={() => onVote(scenario.id)}
                className={`text-lg transition-transform active:scale-95 ${scenario.voted ? "text-neon-pink" : "text-gray-500 hover:text-white"}`}
                title="Vote up"
              >
                ▲
              </button>
              <div className="font-mono text-xs font-bold text-white">
                {scenario.votes.toLocaleString()}
              </div>
              <span className="text-[8px] text-gray-600 font-mono uppercase tracking-wider hidden md:inline">VOTES</span>
            </div>

            {/* Right: Content */}
            <div className="flex-1 flex flex-col gap-3">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-space-800/40 pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-neon-purple" />
                  <span className="text-xs font-bold text-gray-300 font-mono">
                    TRANSMISSION BY @{scenario.author}
                  </span>
                </div>
                <span className="text-[10px] text-gray-500 font-mono">{scenario.timestamp}</span>
              </div>

              {/* Text */}
              <p className="text-xs text-gray-300 font-sans leading-relaxed">
                {scenario.text}
              </p>

              {/* Selected items badges */}
              <div className="flex flex-wrap gap-2 mt-2">
                {scenario.items.map((item, idx) => (
                  <span 
                    key={idx} 
                    className="text-[9px] font-mono bg-space-900/80 border border-neon-purple/20 text-neon-purple px-2 py-0.5 rounded-full"
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
