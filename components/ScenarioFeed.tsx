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
          <div className="eyebrow mb-1" style={{ color: "var(--acc-primary)" }}>
            // COLLECTIVE INTELLIGENCE SCENARIO ROOM
          </div>
          <h3 className="display text-2xl" style={{ color: "var(--ink-0)" }}>
            PUBLIC SCENARIO TRANSMISSIONS
          </h3>
          <p className="text-xs text-gray-400 font-sans mt-1">
            Review and vote on the best community-proposed storylines for HOPE Part 2.
          </p>
        </div>

        {/* Info card */}
        <div className="px-4 py-2 text-right" style={{ background: "var(--bg-0)", border: "1px solid var(--line-bright)" }}>
          <div className="eyebrow" style={{ fontSize: 9 }}>TOP SCENARIO EVENT</div>
          <div className="font-mono font-bold" style={{ fontSize: 11, color: "var(--acc-cyan)" }}>COMPILED & DELIVERED TO NA HONG-JIN</div>
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
                  <span className="w-2 h-2 rounded-full" style={{ background: "var(--acc-violet)" }} />
                  <span className="font-mono font-bold" style={{ fontSize: 11, color: "var(--ink-1)" }}>
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
