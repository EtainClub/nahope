"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

// Web Audio API for retro-horror sound synthesizers
const playSound = (type: "beep" | "dissonant" | "unlock" | "ambient") => {
  if (typeof window === "undefined") return;
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    if (type === "beep") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(520, ctx.currentTime);
      gain.gain.setValueAtTime(0.015, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } else if (type === "dissonant") {
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc1.type = "sawtooth";
      osc1.frequency.setValueAtTime(90, ctx.currentTime);
      
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(92.5, ctx.currentTime);

      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start();
      osc2.start();
      osc1.stop(ctx.currentTime + 0.5);
      osc2.stop(ctx.currentTime + 0.5);
    } else if (type === "unlock") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(330, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(660, ctx.currentTime + 0.25);
      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    }
  } catch (e) {
    console.warn("Audio Context blocked or unsupported:", e);
  }
};

interface Hotspot {
  id: string;
  name: string;
  top: string;
  left: string;
  width: string;
  height: string;
  lore: string;
  glitchLabel: string;
  investigationText: string;
}

const HOTSPOTS: Hotspot[] = [
  {
    id: "carbine",
    name: "Lost Carbine Rifle",
    top: "70%",
    left: "15%",
    width: "15%",
    height: "15%",
    glitchLabel: "!! WEAPON DETECTED !!",
    investigationText: "Bum-seok: 'An illegal military M1 Carbine. The youth were using it to hunt the beast, but dropped it in the mud. The barrel is still warm... and there is a faint smell of burnt ozone.'",
    lore: "A modified Carbine rifle, illegally kept by village hunters. Found discarded in the wild grass. Smells of unknown cosmic discharge.",
  },
  {
    id: "carcass",
    name: "Mutated Livestock Carcass",
    top: "78%",
    left: "45%",
    width: "18%",
    height: "14%",
    glitchLabel: "!! ANOMALOUS BIOMASS !!",
    investigationText: "Bum-seok: 'A cow carcass from the Kim family farm. Ripped open with savage force. The blood is strangely warm and fluoresces under our flashlights.'",
    lore: "A mutilated cow carcass showing severe dimensional warping and cellular disintegration, emitting a faint radioactive violet glow.",
  },
  {
    id: "tag",
    name: "Torn ID Tag of a Defense Soldier",
    top: "35%",
    left: "75%",
    width: "8%",
    height: "15%",
    glitchLabel: "!! MILITARY ARTIFACT !!",
    investigationText: "Sung-ae: 'A local defense reservist's ID tag. Snagged on the barbed wire. The metal is warped and carbonized with bright violet carbon residue.'",
    lore: "A shredded ID tag belonging to a missing local reservist. The tags are crusted with a bright, glassy purple residue.",
  },
];

interface IsakuGameTeaserProps {
  onScenarioSubmit?: (newScen: { items: string[]; text: string; id: number }) => void;
}

export default function IsakuGameTeaser({ onScenarioSubmit }: IsakuGameTeaserProps) {
  const [logs, setLogs] = useState<string[]>([
    "[SYSTEM INITIALIZED] connection established.",
    "[LOG 12:00] Bum-seok: 'A fisherman reported seeing a giant tiger in the forest. Ridiculous. But now local farmers are reporting mutilated cattle on the road.'",
    "[TUTORIAL] Move your cursor over the screen below to search for anomalous hotspots.",
  ]);

  const [inventory, setInventory] = useState<string[]>([]);
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);
  const [scenarioText, setScenarioText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showScenarioForm, setShowScenarioForm] = useState(false);
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const handleHotspotHover = () => {
    playSound("beep");
  };

  const handleHotspotClick = (h: Hotspot) => {
    playSound("dissonant");
    setSelectedHotspot(h);
  };

  const handleSecureArtifact = () => {
    if (selectedHotspot) {
      const item = selectedHotspot.name;
      if (!inventory.includes(item)) {
        setInventory((prev) => [...prev, item]);
        setLogs((prev) => [
          ...prev,
          `[SECURED] ${item} added to UGC slots.`,
          `[LOG] ${selectedHotspot.investigationText}`,
        ]);
        playSound("unlock");
      }
      setSelectedHotspot(null);
    }
  };

  const handleShareOnX = (itemName: string) => {
    playSound("beep");
    let tweetText = "";
    if (itemName === "Lost Carbine Rifle") {
      tweetText = `"Is this gun even reportable?!" I secured the Lost Carbine Rifle in Hopo Outpost: Omega Protocol! Decrypting Na Hong-jin's OMEGA PROTOCOL at nahope.com %23NAHOPE %23Solana %23NaHongJin`;
    } else {
      tweetText = `I secured the [${itemName}] at Hopo Outpost! Decrypting Na Hong-jin's OMEGA PROTOCOL at nahope.com %23NAHOPE %23Solana %23NaHongJin`;
    }
    const url = `https://twitter.com/intent/tweet?text=${tweetText}`;
    window.open(url, "_blank");
  };

  const handleReset = () => {
    playSound("dissonant");
    setInventory([]);
    setLogs([
      "[SYSTEM INITIALIZED] connection established.",
      "[LOG 12:00] Bum-seok: 'A fisherman reported seeing a giant tiger in the forest. Ridiculous. But now local farmers are reporting mutilated cattle on the road.'",
      "[TUTORIAL] Move your cursor over the screen below to search for anomalous hotspots.",
    ]);
    setSelectedHotspot(null);
    setScenarioText("");
    setSubmitted(false);
    setShowScenarioForm(false);
  };

  const handleSubmitScenario = (e: React.FormEvent) => {
    e.preventDefault();
    if (inventory.length < 3) return;
    if (onScenarioSubmit) {
      onScenarioSubmit({
        items: inventory,
        text: scenarioText,
        id: Date.now(),
      });
    }
    setLogs((prev) => [
      ...prev,
      `[TRANSMITTED] Scenario submitted to the public dashboard feed.`,
    ]);
    setSubmitted(true);
    playSound("unlock");
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-0 mb-12">
      <div className="text-center mb-6">
        <h2 className="font-righteous text-3xl font-bold text-white tracking-widest uppercase">
          HOPO OUTPOST SEARCH TERMINAL
        </h2>
        <p className="text-xs text-gray-500 font-sans mt-1 uppercase tracking-widest">
          // Episode 1 Interactive Point-and-Click Teaser (Isaku Style)
        </p>
        <div className="w-24 h-[2px] bg-neon-pink mx-auto mt-2" />
      </div>

      {/* 4-Panel Grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        
        {/* Panel 1: Left Story Log (3 columns) */}
        <div className="lg:col-span-3 crt-screen rounded-xl p-4 flex flex-col justify-between h-[450px] lg:h-[550px]">
          <div className="crt-scanlines absolute inset-0 opacity-[0.05] pointer-events-none" />
          
          <div className="flex flex-col gap-3 h-full overflow-y-auto pr-1">
            <div className="border-b border-space-800/40 pb-2 text-[9px] text-gray-500 font-mono">
              // INVESTIGATION DIARIES
            </div>
            
            <div className="flex flex-col gap-2 font-mono text-[11px] leading-relaxed text-term-green">
              {logs.map((log, idx) => (
                <div key={idx} className="border-b border-space-900/30 pb-1.5">
                  {log}
                </div>
              ))}
              <div ref={logEndRef} />
            </div>
          </div>

          <div className="border-t border-space-850 pt-2 text-[9px] text-gray-600 font-mono text-center">
            SYS STATUS: TRANSMITTING LOGS
          </div>
        </div>

        {/* Panel 2: Center Search Canvas (6 columns) */}
        <div className="lg:col-span-6 crt-screen rounded-xl relative h-[450px] lg:h-[550px] flex items-center justify-center cursor-crosshair-target group">
          <div className="crt-scanlines absolute inset-0 opacity-[0.08] pointer-events-none z-10" />

          {/* Eerie Backdrop Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/hopo_farm_road_bg.png"
              alt="Hopo Farm Road"
              fill
              className="object-cover opacity-90 group-hover:scale-[1.01] transition-transform duration-700"
              priority
            />
            {/* Dark vignette overlay */}
            <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#090010]/70 to-[#090010] mix-blend-multiply" />
            <div className="absolute inset-0 bg-black/35 pointer-events-none" />
          </div>

          {/* Interactive Hotspots */}
          <div className="absolute inset-0 z-10">
            {HOTSPOTS.map((spot) => (
              <button
                key={spot.id}
                onMouseEnter={handleHotspotHover}
                onClick={() => handleHotspotClick(spot)}
                className="absolute border border-dashed border-alien-cyan/15 hover:border-neon-pink bg-white/0 hover:bg-neon-pink/15 transition-all duration-150 rounded cursor-crosshair-target flex items-center justify-center group/spot glitch-hover"
                style={{
                  top: spot.top,
                  left: spot.left,
                  width: spot.width,
                  height: spot.height,
                }}
              >
                {/* Micro target HUD */}
                <span className="hidden group-hover/spot:inline text-[9px] font-mono text-neon-pink bg-space-950/90 border border-neon-pink px-1 rounded absolute -top-6 whitespace-nowrap shadow-[0_0_8px_rgba(255,0,127,0.5)]">
                  {spot.glitchLabel}
                </span>
                <span className="w-1.5 h-1.5 bg-neon-pink/70 rounded-full scale-0 group-hover/spot:scale-100 transition-transform" />
              </button>
            ))}
          </div>

          {/* Floating write scenario button when 3 items collected */}
          {inventory.length === 3 && !showScenarioForm && !submitted && (
            <div className="absolute inset-x-0 bottom-8 z-20 flex justify-center px-4 pointer-events-auto">
              <button
                onClick={() => {
                  playSound("unlock");
                  setShowScenarioForm(true);
                }}
                className="bg-gradient-to-r from-neon-pink via-neon-purple to-alien-cyan text-white font-bold font-righteous px-6 py-3.5 rounded-xl text-xs tracking-widest hover:scale-[1.03] transition-all shadow-[0_0_20px_rgba(255,0,127,0.5)] border border-white/20 animate-bounce"
              >
                🔓 OMEGA PROTOCOL ACTIVE: WRITE SCENARIO
              </button>
            </div>
          )}

          {/* Investigative Popup */}
          {selectedHotspot && !showScenarioForm && !submitted && (
            <div className="absolute inset-0 bg-black/85 z-20 flex items-center justify-center p-6 transition-all">
              <div className="w-full max-w-[360px] glass-panel border border-neon-pink/40 rounded-xl p-5 relative shadow-2xl flex flex-col gap-4 font-mono text-xs">
                {/* Corner crosshairs decoration */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-neon-pink" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-neon-pink" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-neon-pink" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-neon-pink" />

                <div className="flex justify-between items-center border-b border-space-800 pb-2">
                  <span className="text-neon-pink font-bold uppercase tracking-wider">
                    // EXAMINING ARTIFACT
                  </span>
                  <button 
                    onClick={() => { playSound("beep"); setSelectedHotspot(null); }}
                    className="text-gray-500 hover:text-white font-bold"
                  >
                    CLOSE [X]
                  </button>
                </div>

                <div className="text-white font-righteous text-sm tracking-wide">
                  {selectedHotspot.name}
                </div>

                <p className="text-gray-400 font-sans text-[11px] leading-relaxed">
                  {selectedHotspot.lore}
                </p>

                <div className="bg-space-950 p-2.5 rounded border border-space-850 text-term-green text-[10px] leading-normal italic">
                  {selectedHotspot.investigationText}
                </div>

                <button
                  onClick={handleSecureArtifact}
                  className="w-full bg-gradient-to-r from-neon-pink to-neon-purple text-white font-bold py-2.5 rounded-lg text-[11px] tracking-wider hover:scale-[1.02] transition-transform shadow-[0_0_10px_rgba(255,0,127,0.3)]"
                >
                  {inventory.includes(selectedHotspot.name) 
                    ? "ALREADY SECURED" 
                    : "SECURE & LOCK TO INVENTORY"}
                </button>
              </div>
            </div>
          )}

          {/* Scenario Submission Form Overlay */}
          {showScenarioForm && !submitted && (
            <div className="absolute inset-0 bg-black/90 z-20 flex items-center justify-center p-6">
              <form 
                onSubmit={handleSubmitScenario}
                className="w-full max-w-[420px] glass-panel border border-neon-purple/40 rounded-xl p-5 relative flex flex-col gap-4 font-mono text-xs"
              >
                {/* Corner crosshairs decoration */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-neon-purple" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-neon-purple" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-neon-purple" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-neon-purple" />

                <div className="flex justify-between items-center border-b border-space-800 pb-2">
                  <span className="text-neon-purple font-bold uppercase tracking-wider">
                    // OMEGA SCENARIO TRANSMITTER
                  </span>
                  <button 
                    type="button"
                    onClick={() => { playSound("beep"); setShowScenarioForm(false); }}
                    className="text-gray-500 hover:text-white font-bold"
                  >
                    CANCEL [X]
                  </button>
                </div>

                <p className="text-gray-400 font-sans text-[11px] leading-relaxed">
                  Use the secured items (**{inventory.join(", ")}**) to propose how the survivors fight the cosmic threat in Part 2.
                </p>

                <textarea
                  required
                  value={scenarioText}
                  onChange={(e) => setScenarioText(e.target.value)}
                  placeholder="Write your English proposal for 'HOPE Part 2' scenario (e.g. Sung-ki discovers the military's underground bunker, utilizing salvaged translator frequencies...)"
                  rows={6}
                  maxLength={1000}
                  className="w-full bg-space-950/80 border border-space-800 rounded-xl p-3 text-xs font-sans text-white focus:outline-none focus:border-neon-pink/40 focus:ring-1 focus:ring-neon-pink/20 resize-none leading-relaxed"
                />

                <div className="flex justify-between items-center mt-2">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="text-[10px] text-alert-red hover:underline"
                  >
                    RESET ALL
                  </button>
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-neon-pink to-neon-purple text-white font-bold px-4 py-2 rounded-lg text-[10px] tracking-wider hover:scale-[1.02] transition-transform shadow-[0_0_10px_rgba(255,0,127,0.3)]"
                  >
                    TRANSMIT TO FEED
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Submitted Success Screen Overlay */}
          {submitted && (
            <div className="absolute inset-0 bg-black/90 z-20 flex flex-col items-center justify-center p-6 text-center gap-4">
              <div className="text-alien-cyan font-righteous text-2xl font-bold tracking-widest uppercase animate-pulse">
                📡 SCENARIO TRANSMITTED
              </div>
              <p className="max-w-md text-xs text-gray-400 font-sans leading-relaxed">
                Your scenario proposal for &quot;HOPE Part 2&quot; has been successfully encrypted and posted to the public dashboard feed. 
                Let the community review your theory!
              </p>
              <div className="flex gap-4 mt-2">
                <button
                  onClick={handleReset}
                  className="px-6 py-2 border border-space-800 hover:border-white/20 text-gray-400 hover:text-white rounded-lg text-xs font-mono transition-colors"
                >
                  RESET AREA
                </button>
                <a
                  href="#feed"
                  className="bg-space-900 border border-neon-purple/40 hover:bg-space-850 px-6 py-2 rounded-lg text-xs font-bold text-white font-mono transition-colors"
                >
                  VIEW PUBLIC FEED
                </a>
              </div>
            </div>
          )}

          {/* Center scanline filter overlay */}
          <div className="vignette-overlay absolute inset-0 z-10 pointer-events-none" />
        </div>

        {/* Panel 3: Right UGC Inventory (3 columns) */}
        <div className="lg:col-span-3 glass-panel rounded-xl p-4 flex flex-col justify-between h-[450px] lg:h-[550px] border border-white/5">
          <div className="flex flex-col gap-4">
            <div>
              <div className="text-neon-purple font-mono text-[9px] tracking-widest uppercase mb-1">
                // SECURED ARTIFACTS
              </div>
              <h3 className="font-righteous text-lg font-bold text-white uppercase tracking-wider">
                UGC INVENTORY
              </h3>
            </div>

            {/* Inventory Slots list */}
            <div className="flex flex-col gap-2">
              {HOTSPOTS.map((spot, idx) => {
                const isSecured = inventory.includes(spot.name);
                return (
                  <div 
                    key={idx} 
                    className={`border rounded-xl p-3 flex flex-col gap-2 transition-all ${
                      isSecured 
                        ? "bg-space-950/60 border-neon-purple/30 shadow-[0_0_10px_rgba(216,0,255,0.05)]" 
                        : "bg-space-950/20 border-space-850 border-dashed opacity-50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-white truncate max-w-[150px]">
                        {isSecured ? spot.name : "LOCKED SLOT 0" + (idx + 1)}
                      </span>
                      <span className="text-[9px] font-mono font-bold text-neon-pink">
                        {isSecured ? "SECURED" : "EMPTY"}
                      </span>
                    </div>

                    {isSecured && (
                      <button
                        onClick={() => handleShareOnX(spot.name)}
                        className="w-full text-[10px] font-mono bg-neon-purple/10 border border-neon-purple/30 text-neon-purple hover:bg-neon-purple hover:text-white py-1 rounded transition-all flex items-center justify-center gap-1.5"
                      >
                        <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                        SHARE MEME ON X
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="border-t border-space-850 pt-3 text-[10px] text-gray-500 font-mono flex justify-between">
            <span>SECURED: {inventory.length} / 3</span>
            <span>UGC SLOTS READY</span>
          </div>
        </div>

      </div>

      {/* Panel 4: Bottom Status Bar */}
      <div className="w-full bg-[#080112] border-2 border-[#220538] rounded-xl px-4 py-2 mt-4 flex flex-col sm:flex-row justify-between items-center gap-3 font-mono text-[10px] text-gray-400 relative overflow-hidden shadow-md">
        <div className="crt-scanlines absolute inset-0 opacity-[0.04] pointer-events-none" />
        
        <div className="flex items-center gap-2 relative z-10">
          <span className="w-1.5 h-1.5 rounded-full bg-term-green animate-ping" />
          <span>SYS STATE: <span className="text-term-green font-bold">SOLANA LOGGED IN</span></span>
        </div>

        <div className="relative z-10 text-center sm:text-left">
          CURRENT LOCATION: <span className="text-white font-bold uppercase">HOPO FARM ROAD - SECTION 01</span>
        </div>

        <div className="flex items-center gap-3 relative z-10">
          <span>BALANCE: <span className="text-alien-cyan font-bold">25,000 $NAHOPE</span></span>
          <span className="text-gray-700">|</span>
          <span className="text-neon-pink font-bold">EPISODE 1 STAGE UNLOCKED</span>
        </div>
      </div>
    </div>
  );
}
