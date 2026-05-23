"use client";

import { useState, useEffect, useRef } from "react";

// Web Audio API helper for retro-horror dissonant sound effects
const playSound = (type: "beep" | "dissonant" | "unlock" | "error") => {
  if (typeof window === "undefined") return;
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    if (type === "beep") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      gain.gain.setValueAtTime(0.02, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } else if (type === "dissonant") {
      // Plays two slightly detuned oscillators to make a creepy chord
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc1.type = "sawtooth";
      osc1.frequency.setValueAtTime(80, ctx.currentTime);
      
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(83, ctx.currentTime);

      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start();
      osc2.start();
      osc1.stop(ctx.currentTime + 0.6);
      osc2.stop(ctx.currentTime + 0.6);
    } else if (type === "unlock") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } else if (type === "error") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "square";
      osc.frequency.setValueAtTime(100, ctx.currentTime);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    }
  } catch (e) {
    console.warn("Audio Context blocked or unsupported:", e);
  }
};

interface GameStep {
  title: string;
  narrative: string;
  choices: {
    text: string;
    nextStep: number;
    awardItem?: string;
  }[];
}

const EPISODES: Record<number, GameStep> = {
  1: {
    title: "EPISODE 1: Hopo Port Tiger (Ignorance & Omen)",
    narrative: "1980s, a remote police outpost in Hopo Port. Officer Bum-seok (played by Hwang Jung-min) shrugs off reports from local fishermen claiming to have spotted a tiger in the DMZ forest. But the next morning, mutilated livestock and torn military fences are discovered. Some village boys have ventured deep into the woods, hiding something illegal.",
    choices: [
      {
        text: "Search the woods to confiscate the boys' illegal weaponry.",
        nextStep: 2,
        awardItem: "Lost Carbine Rifle",
      },
      {
        text: "Inspect the bizarrely mutated livestock carcass first.",
        nextStep: 2,
        awardItem: "Torn ID Tag of a Defense Soldier",
      },
    ],
  },
  2: {
    title: "EPISODE 2: Disconnected Signals (Isolation Begins)",
    narrative: "A sudden electromagnetic surge hits. Every telephone line and radio frequency goes dead. The military units outside Hopo Port are completely unreachable. Only a few elders and police officers remain in the dark village as an unnatural fog rolls in from the shoreline. Faint static is picked up by a retired receiver.",
    choices: [
      {
        text: "Head to the communication transmitter tower in the fog.",
        nextStep: 3,
        awardItem: "Static 80s Walkie-Talkie",
      },
      {
        text: "Stay at the police desk and attempt to repair the rotary lines.",
        nextStep: 3,
        awardItem: "Dead Rotary Phone",
      },
    ],
  },
  3: {
    title: "EPISODE 3: The Targeted Hunter (The Chase)",
    narrative: "Sung-ki and the village youth believe they are the hunters, armed with the Carbine rifle. They track the entity into the thick forest. But as the fog thickens, the environment bends. Whispers in corrupted English echo from the trees. One by one, the youth are hunted by a colossal, multi-limbed red silhouette.",
    choices: [
      {
        text: "Hold your ground, fire into the blinding fog.",
        nextStep: 4,
        awardItem: "Sun-like Red Emblem",
      },
      {
        text: "Discard the weapon and run blindly towards the headlights.",
        nextStep: 4,
        awardItem: "Bloodstained Reservist Cap",
      },
    ],
  },
  4: {
    title: "EPISODE 4: Alpha and Omega (Cosmic Cataclysm)",
    narrative: "The entity reveals its true shape over Hopo Port, warping the clouds into a terrifying rainbow of cosmic energy. Human weapons are useless. The village graveyard begins displaying strange glowing carvings, and the Omega (Ω) symbol burns into the soil. An alien device rests in the impact crater.",
    choices: [
      {
        text: "Approach the graveyard and touch the glowing Omega symbol.",
        nextStep: 5,
        awardItem: "Omega (Ω) Amulet",
      },
      {
        text: "Analyze the foreign wreckage and retrieve the metallic shard.",
        nextStep: 5,
        awardItem: "Translator Fragment",
      },
    ],
  },
};

interface TerminalGameProps {
  onScenarioSubmit: (scenario: { items: string[]; text: string; id: number }) => void;
}

export default function TerminalGame({ onScenarioSubmit }: TerminalGameProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [inventory, setInventory] = useState<string[]>([]);
  const [typedText, setTypedText] = useState("");
  const [scenarioText, setScenarioText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Typewriter effect
  useEffect(() => {
    if (currentStep > 4) return;
    setTypedText("");
    const fullText = EPISODES[currentStep].narrative;
    let i = 0;
    const interval = setInterval(() => {
      setTypedText((prev) => prev + fullText.charAt(i));
      i++;
      if (i >= fullText.length) {
        clearInterval(interval);
      }
    }, 15);

    return () => clearInterval(interval);
  }, [currentStep]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [typedText]);

  const handleChoice = (nextStep: number, item?: string) => {
    if (item && !inventory.includes(item)) {
      setInventory((prev) => [...prev, item]);
      playSound("unlock");
    } else {
      playSound("beep");
    }
    setCurrentStep(nextStep);
  };

  const handleReset = () => {
    playSound("dissonant");
    setCurrentStep(1);
    setInventory([]);
    setScenarioText("");
    setSubmitted(false);
  };

  const handleSubmitScenario = (e: React.FormEvent) => {
    e.preventDefault();
    if (inventory.length < 3) {
      playSound("error");
      return;
    }
    playSound("unlock");
    onScenarioSubmit({
      items: inventory,
      text: scenarioText,
      id: Date.now(),
    });
    setSubmitted(true);
  };

  const shareItemOnX = (itemName: string) => {
    playSound("beep");
    const tweetText = `I found the [${itemName}] in Hopo Port Control Zone: Omega Protocol! Join the investigation at nahope.com %23NAHOPE %23Solana %23NaHongJin`;
    const url = `https://twitter.com/intent/tweet?text=${tweetText}`;
    window.open(url, "_blank");
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-0 mb-12">
      <div className="text-center mb-8">
        <h2 className="font-righteous text-3xl font-bold text-white tracking-widest uppercase">
          SYSTEM INTERFACE: OMEGA PROTOCOL
        </h2>
        <div className="w-24 h-[2px] bg-neon-purple mx-auto mt-2" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Col: CRT Terminal Console (Game) */}
        <div className="lg:col-span-8 crt-screen rounded-2xl p-6 relative flex flex-col justify-between min-h-[500px]">
          <div className="crt-scanlines absolute inset-0 opacity-[0.07] pointer-events-none z-10" />
          
          {/* Audio trigger disclaimer for ambient feel */}
          <div className="absolute top-2 right-4 flex items-center gap-2 z-10">
            <button 
              onClick={() => playSound("dissonant")} 
              className="text-[9px] font-mono text-neon-purple hover:text-white border border-neon-purple/20 px-2 py-0.5 rounded bg-space-950/50"
            >
              🔈 SYSTEM FREQ TEST
            </button>
          </div>

          <div className="flex-1 flex flex-col gap-6 font-mono text-xs md:text-sm">
            
            {/* Terminal Header */}
            <div className="border-b border-space-800/40 pb-4 text-[10px] text-gray-500 flex justify-between">
              <span>HOPO_PORT_OUTPOST_CONSOLE v0.80</span>
              <span className="text-term-green animate-pulse">● SECURE CONNECTION</span>
            </div>

            {currentStep <= 4 ? (
              <div className="flex flex-col gap-4 flex-1">
                {/* Episode title */}
                <div className="text-term-amber font-bold text-sm tracking-wider">
                  {EPISODES[currentStep].title}
                </div>

                {/* Narrative block */}
                <div className="text-term-green leading-relaxed min-h-[120px]">
                  {typedText}
                  <span className="inline-block w-2 h-4 bg-term-green ml-1 animate-pulse" />
                </div>

                {/* Decision Choices */}
                <div className="flex flex-col gap-3 mt-auto">
                  <div className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">
                    // SELECT INITIATIVE:
                  </div>
                  {EPISODES[currentStep].choices.map((choice, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleChoice(choice.nextStep, choice.awardItem)}
                      className="w-full text-left p-3 rounded-lg border border-space-800 bg-space-950/60 hover:bg-space-900/60 hover:border-term-green/40 hover:text-term-green transition-all duration-150 flex items-start gap-3"
                    >
                      <span className="text-term-green font-bold">[{idx + 1}]</span>
                      <span className="font-sans font-medium text-xs leading-normal">{choice.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              /* Episode 5: Scenario Room */
              <div className="flex flex-col gap-6 flex-1">
                <div className="text-term-amber font-bold text-sm tracking-wider uppercase">
                  EPISODE 5: Toward Part 2 (Collective Intelligence Scenario Room)
                </div>

                {inventory.length < 3 ? (
                  <div className="flex-1 flex flex-col justify-center items-center text-center gap-4 py-8">
                    <div className="text-alert-red text-2xl font-bold tracking-widest uppercase">
                      ⚠️ ACCESS DENIED
                    </div>
                    <p className="max-w-md text-xs text-gray-400 font-sans leading-relaxed">
                      You do not possess enough intelligence artifacts. Hopo Port requires at least **3 items** 
                      in your inventory to unlock the Scenario Transmission console.
                    </p>
                    <button
                      onClick={handleReset}
                      className="mt-4 px-6 py-2 border border-alert-red text-alert-red hover:bg-alert-red/10 rounded-lg font-bold tracking-wider"
                    >
                      RESET MISSION AND GATHER DATA
                    </button>
                  </div>
                ) : !submitted ? (
                  <form onSubmit={handleSubmitScenario} className="flex flex-col gap-4 flex-1">
                    <p className="text-xs text-gray-400 font-sans leading-relaxed">
                      Access Granted. You have collected **{inventory.length}** artifacts. 
                      Synthesize your findings and write the next script: How will Sung-ki fight back in **Part 2**? 
                      Your proposed storyline will be submitted and reviewed by the community.
                    </p>

                    {/* Selected items indicator */}
                    <div className="flex flex-wrap gap-2 py-2">
                      {inventory.map((item, idx) => (
                        <span key={idx} className="text-[10px] bg-space-900 text-alien-cyan border border-alien-cyan/20 px-2 py-1 rounded">
                          🔗 {item}
                        </span>
                      ))}
                    </div>

                    <textarea
                      required
                      value={scenarioText}
                      onChange={(e) => setScenarioText(e.target.value)}
                      placeholder="Write your English proposal for 'HOPE Part 2' scenario (e.g. Sung-ki discovers the military's underground bunker, utilizing salvaged translator frequencies to intercept alien frequencies...)"
                      rows={5}
                      maxLength={1000}
                      className="w-full bg-space-950/80 border border-space-800 rounded-xl p-4 text-xs font-sans text-white focus:outline-none focus:border-neon-pink/40 focus:ring-1 focus:ring-neon-pink/20 resize-none leading-relaxed"
                    />

                    <div className="flex justify-between items-center mt-auto">
                      <button
                        type="button"
                        onClick={handleReset}
                        className="text-xs text-gray-500 hover:text-white"
                      >
                        RESET GAME
                      </button>
                      <button
                        type="submit"
                        className="bg-gradient-to-r from-neon-pink to-neon-purple px-6 py-3 rounded-lg text-xs font-bold text-white hover:scale-105 transition-all shadow-[0_0_15px_rgba(255,0,127,0.3)]"
                      >
                        TRANSMIT SCENARIO TO THE FEED
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="flex-1 flex flex-col justify-center items-center text-center gap-4 py-8">
                    <div className="text-alien-cyan text-2xl font-bold tracking-widest uppercase">
                      📡 SCENARIO TRANSMITTED
                    </div>
                    <p className="max-w-md text-xs text-gray-400 font-sans leading-relaxed">
                      Your scenario proposal has been successfully encrypted and posted onto the public dashboard feed. 
                      Let the community review your theory!
                    </p>
                    <div className="flex gap-4 mt-4">
                      <button
                        onClick={handleReset}
                        className="px-6 py-2 border border-space-800 hover:border-white/20 text-gray-400 hover:text-white rounded-lg text-xs"
                      >
                        PLAY AGAIN
                      </button>
                      <a
                        href="#feed"
                        className="bg-space-900 border border-neon-purple/40 hover:bg-space-800 px-6 py-2 rounded-lg text-xs font-bold text-white"
                      >
                        VIEW PUBLIC FEED
                      </a>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div ref={terminalEndRef} />
          </div>
        </div>


        {/* Right Col: Inventory Panel */}
        <div className="lg:col-span-4 glass-panel rounded-2xl p-6 border border-white/5 flex flex-col justify-between shadow-xl">
          <div className="flex flex-col gap-6">
            
            {/* Header */}
            <div>
              <div className="text-neon-purple font-mono text-[10px] tracking-widest uppercase mb-1">
                // DATA COLLECTOR
              </div>
              <h3 className="font-righteous text-xl font-bold text-white">
                INVENTORY STATE
              </h3>
              <p className="text-[10px] text-gray-500 font-sans mt-1">
                Gather artifacts by navigating choices. Collect at least **3 items** to decrypt Episode 5.
              </p>
            </div>

            {/* Slots list */}
            <div className="flex flex-col gap-3">
              {inventory.length === 0 ? (
                <div className="border border-dashed border-space-800 rounded-xl p-8 text-center text-xs text-gray-600 font-mono">
                  INVENTORY EMPTY.<br />
                  MAKE A DECISION TO SECURE ITEMS.
                </div>
              ) : (
                <div className="flex flex-col gap-2.5">
                  {inventory.map((item, idx) => (
                    <div 
                      key={idx} 
                      className="bg-space-950/60 border border-neon-purple/20 rounded-xl p-3 flex items-center justify-between gap-3 transition-all hover:bg-space-900"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">📁</span>
                        <div className="flex flex-col">
                          <span className="text-xs font-semibold text-white truncate max-w-[150px]">
                            {item}
                          </span>
                          <span className="text-[8px] font-mono text-neon-pink">SECURED</span>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => shareItemOnX(item)}
                        className="text-[10px] font-mono bg-neon-purple/10 border border-neon-purple/30 text-neon-purple hover:bg-neon-purple hover:text-white px-2.5 py-1 rounded transition-all flex items-center gap-1"
                        title="Share on X"
                      >
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                        SHARE
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Reset / Status bar */}
          <div className="border-t border-space-800/40 pt-4 mt-6 flex justify-between items-center text-[10px] text-gray-500 font-mono">
            <span>COLLECTED: {inventory.length} / 4 MAX</span>
            {inventory.length > 0 && (
              <button 
                onClick={handleReset}
                className="text-alert-red hover:underline uppercase"
              >
                RESET DATA
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
