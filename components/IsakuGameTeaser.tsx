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
  const [mobileTab, setMobileTab] = useState<"logs" | "canvas" | "inventory">("canvas");
  const [scenarioText, setScenarioText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showScenarioForm, setShowScenarioForm] = useState(false);
  const logEndRef = useRef<HTMLDivElement>(null);
  const logContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = logContainerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
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
        <h2 className="display text-3xl uppercase" style={{ color: "var(--ink-0)", letterSpacing: "0.1em" }}>
          HOPO OUTPOST SEARCH TERMINAL
        </h2>
        <p className="eyebrow mt-1">// Episode 1 Interactive Point-and-Click Teaser (Isaku Style)</p>
        <div className="w-24 h-[2px] mx-auto mt-2" style={{ background: "var(--acc-primary)" }} />
      </div>

      {/* Mobile tab switcher — hidden on lg+ */}
      <div className="lg:hidden flex gap-1 mb-3" style={{ borderBottom: "1px solid var(--line)" }}>
        {([
          { id: "logs", label: `LOGS (${logs.length})` },
          { id: "canvas", label: "SEARCH" },
          { id: "inventory", label: `ITEMS (${inventory.length}/3)` },
        ] as const).map((t) => {
          const isActive = mobileTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => { playSound("beep"); setMobileTab(t.id); }}
              className="flex-1 py-2 px-2 font-mono uppercase transition-all"
              style={{
                fontSize: 10,
                letterSpacing: "0.14em",
                color: isActive ? "var(--acc-primary)" : "var(--ink-3)",
                background: isActive ? "color-mix(in srgb, var(--acc-primary) 8%, transparent)" : "transparent",
                borderBottom: `2px solid ${isActive ? "var(--acc-primary)" : "transparent"}`,
              }}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* 4-Panel Grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">

        {/* Panel 1: Left Story Log (3 columns) */}
        <div className={`${mobileTab === "logs" ? "flex" : "hidden"} lg:flex panel panel-bracket lg:col-span-3 crt-scan p-4 flex-col justify-between h-[450px] lg:h-[550px]`} style={{ position: "relative" }}>
          <span className="br-bl" /><span className="br-br" />
          
          <div ref={logContainerRef} className="flex flex-col gap-3 h-full overflow-y-auto pr-1">
            <div className="pb-2 eyebrow" style={{ borderBottom: "1px solid var(--line-bright)" }}>
              // INVESTIGATION DIARIES
            </div>

            <div className="flex flex-col gap-2 font-mono leading-relaxed" style={{ fontSize: 11, color: "var(--acc-primary)" }}>
              {logs.map((log, idx) => (
                <div key={idx} className="pb-1.5" style={{ borderBottom: "1px solid var(--line)" }}>
                  {log}
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 text-center eyebrow" style={{ borderTop: "1px solid var(--line-bright)" }}>
            SYS STATUS: TRANSMITTING LOGS
          </div>
        </div>

        {/* Panel 2: Center Search Canvas (6 columns) */}
        <div className={`${mobileTab === "canvas" ? "flex" : "hidden"} lg:flex lg:col-span-6 panel crt-scan crt-vignette relative h-[450px] lg:h-[550px] items-center justify-center cursor-crosshair-target group`} style={{ overflow: "hidden" }}>

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
                className="absolute cursor-crosshair-target flex items-center justify-center group/spot"
                style={{
                  top: spot.top,
                  left: spot.left,
                  width: spot.width,
                  height: spot.height,
                  background: "transparent",
                  border: "none",
                }}
              >
                {/* SVG crosshair marker */}
                <svg width="100%" height="100%" viewBox="0 0 60 60" fill="none" className="absolute inset-0" style={{ opacity: 0.5 }}>
                  {/* Corner brackets */}
                  <path d="M0 12 L0 0 L12 0" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
                  <path d="M48 0 L60 0 L60 12" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
                  <path d="M0 48 L0 60 L12 60" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
                  <path d="M60 48 L60 60 L48 60" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
                  <circle cx="30" cy="30" r="6" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                  <circle cx="30" cy="30" r="1.5" fill="rgba(255,255,255,0.4)" />
                </svg>
                <svg width="100%" height="100%" viewBox="0 0 60 60" fill="none" className="absolute inset-0 opacity-0 group-hover/spot:opacity-100 transition-opacity duration-150">
                  <path d="M0 12 L0 0 L12 0" strokeWidth="1.5" stroke="var(--acc-primary)" />
                  <path d="M48 0 L60 0 L60 12" strokeWidth="1.5" stroke="var(--acc-primary)" />
                  <path d="M0 48 L0 60 L12 60" strokeWidth="1.5" stroke="var(--acc-primary)" />
                  <path d="M60 48 L60 60 L48 60" strokeWidth="1.5" stroke="var(--acc-primary)" />
                  <circle cx="30" cy="30" r="6" stroke="var(--acc-primary)" strokeWidth="1" />
                  <line x1="30" y1="20" x2="30" y2="24" stroke="var(--acc-primary)" strokeWidth="1" />
                  <line x1="30" y1="36" x2="30" y2="40" stroke="var(--acc-primary)" strokeWidth="1" />
                  <line x1="20" y1="30" x2="24" y2="30" stroke="var(--acc-primary)" strokeWidth="1" />
                  <line x1="36" y1="30" x2="40" y2="30" stroke="var(--acc-primary)" strokeWidth="1" />
                  <circle cx="30" cy="30" r="1.5" fill="var(--acc-primary)" />
                </svg>
                {/* Label */}
                <span
                  className="hidden group-hover/spot:inline font-mono absolute -top-7 whitespace-nowrap px-1.5 py-0.5"
                  style={{ fontSize: 9, color: "var(--acc-primary)", border: "1px solid var(--acc-primary)", background: "var(--bg-0)", boxShadow: "var(--glow-primary)" }}
                >
                  {spot.glitchLabel}
                </span>
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
                className="display font-bold px-6 py-3.5 text-xs uppercase tracking-widest hover:scale-[1.03] transition-all"
                style={{ background: "var(--acc-primary)", color: "var(--bg-0)", boxShadow: "var(--glow-primary)", animation: "pulse-glow 1.5s ease infinite" }}
              >
                OMEGA PROTOCOL ACTIVE: WRITE SCENARIO
              </button>
            </div>
          )}

          {/* Investigative Popup */}
          {selectedHotspot && !showScenarioForm && !submitted && (
            <div className="absolute inset-0 z-20 flex items-center justify-center p-6 transition-all" style={{ background: "rgba(0,0,0,0.85)" }}>
              <div className="panel panel-bracket w-full max-w-[360px] p-5 relative flex flex-col gap-4 font-mono text-xs" style={{ boxShadow: "var(--glow-primary)" }}>
                <span className="br-bl" /><span className="br-br" />

                <div className="flex justify-between items-center pb-2" style={{ borderBottom: "1px solid var(--line-bright)" }}>
                  <span className="font-bold uppercase tracking-wider" style={{ color: "var(--acc-primary)" }}>
                    // EXAMINING ARTIFACT
                  </span>
                  <button
                    onClick={() => { playSound("beep"); setSelectedHotspot(null); }}
                    className="font-bold transition-colors"
                    style={{ color: "var(--ink-3)" }}
                  >
                    CLOSE [X]
                  </button>
                </div>

                <div className="display text-sm" style={{ color: "var(--ink-0)", letterSpacing: "0.05em" }}>
                  {selectedHotspot.name}
                </div>

                <p className="font-sans leading-relaxed" style={{ fontSize: 11, color: "var(--ink-2)" }}>
                  {selectedHotspot.lore}
                </p>

                <div className="p-2.5 italic" style={{ background: "var(--bg-0)", border: "1px solid var(--line)", color: "var(--acc-primary)", fontSize: 10, lineHeight: 1.6 }}>
                  {selectedHotspot.investigationText}
                </div>

                <button
                  onClick={handleSecureArtifact}
                  className="w-full font-bold py-2.5 text-xs tracking-wider hover:scale-[1.02] transition-transform"
                  style={{ background: "var(--acc-primary)", color: "var(--bg-0)", boxShadow: "var(--glow-primary)" }}
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
            <div className="absolute inset-0 z-20 flex items-center justify-center p-6" style={{ background: "rgba(0,0,0,0.9)" }}>
              <form
                onSubmit={handleSubmitScenario}
                className="panel panel-bracket w-full max-w-[420px] p-5 relative flex flex-col gap-4 font-mono text-xs"
                style={{ borderColor: "var(--acc-violet)", boxShadow: "var(--glow-violet)", "--acc-primary": "var(--acc-violet)" } as React.CSSProperties}
              >
                <span className="br-bl" /><span className="br-br" />

                <div className="flex justify-between items-center pb-2" style={{ borderBottom: "1px solid var(--line-bright)" }}>
                  <span className="font-bold uppercase tracking-wider" style={{ color: "var(--acc-violet)" }}>
                    // OMEGA SCENARIO TRANSMITTER
                  </span>
                  <button
                    type="button"
                    onClick={() => { playSound("beep"); setShowScenarioForm(false); }}
                    className="font-bold"
                    style={{ color: "var(--ink-3)" }}
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
                  className="w-full p-3 font-sans text-xs resize-none leading-relaxed focus:outline-none"
                  style={{ background: "var(--bg-0)", border: "1px solid var(--line-bright)", color: "var(--ink-0)" }}
                />

                <div className="flex justify-between items-center mt-2">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="font-mono hover:underline"
                    style={{ fontSize: 10, color: "var(--acc-danger)" }}
                  >
                    RESET ALL
                  </button>
                  <button
                    type="submit"
                    className="font-bold px-4 py-2 font-mono tracking-wider hover:scale-[1.02] transition-transform"
                    style={{ fontSize: 10, background: "var(--acc-violet)", color: "var(--bg-0)", boxShadow: "var(--glow-violet)" }}
                  >
                    TRANSMIT TO FEED
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Submitted Success Screen Overlay */}
          {submitted && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center gap-4" style={{ background: "rgba(0,0,0,0.9)" }}>
              <div className="display text-2xl uppercase tracking-widest" style={{ color: "var(--acc-cyan)", animation: "pulse-glow 1.5s ease infinite" }}>
                SCENARIO TRANSMITTED
              </div>
              <p className="max-w-md font-sans leading-relaxed" style={{ fontSize: 11, color: "var(--ink-2)" }}>
                Your scenario proposal for &quot;HOPE Part 2&quot; has been successfully encrypted and posted to the public dashboard feed.
                Let the community review your theory!
              </p>
              <div className="flex gap-4 mt-2">
                <button
                  onClick={handleReset}
                  className="px-6 py-2 font-mono text-xs transition-colors"
                  style={{ border: "1px solid var(--line-bright)", color: "var(--ink-2)" }}
                >
                  RESET AREA
                </button>
                <a
                  href="#feed"
                  className="px-6 py-2 font-mono font-bold text-xs transition-colors"
                  style={{ background: "var(--bg-1)", border: "1px solid color-mix(in srgb, var(--acc-violet) 40%, transparent)", color: "var(--ink-0)" }}
                >
                  VIEW PUBLIC FEED
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Panel 3: Right UGC Inventory (3 columns) */}
        <div className={`${mobileTab === "inventory" ? "flex" : "hidden"} lg:flex panel panel-bracket lg:col-span-3 p-4 flex-col justify-between h-[450px] lg:h-[550px]`} style={{ position: "relative" }}>
          <span className="br-bl" /><span className="br-br" />
          <div className="flex flex-col gap-4">
            <div>
              <div className="eyebrow mb-1" style={{ color: "var(--acc-violet)" }}>// SECURED ARTIFACTS</div>
              <h3 className="display text-lg uppercase" style={{ color: "var(--ink-0)" }}>
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
                    className="p-3 flex flex-col gap-2 transition-all"
                    style={isSecured ? {
                      border: "1px solid color-mix(in srgb, var(--acc-violet) 30%, transparent)",
                      background: "var(--bg-0)",
                      boxShadow: "0 0 10px color-mix(in srgb, var(--acc-violet) 8%, transparent)",
                    } : {
                      border: "1px dashed var(--line-bright)",
                      background: "transparent",
                      opacity: 0.5,
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold truncate max-w-[150px]" style={{ fontSize: 11, color: "var(--ink-0)" }}>
                        {isSecured ? spot.name : "LOCKED SLOT 0" + (idx + 1)}
                      </span>
                      <span className="font-mono font-bold" style={{ fontSize: 9, color: "var(--acc-primary)" }}>
                        {isSecured ? "SECURED" : "EMPTY"}
                      </span>
                    </div>

                    {isSecured && (
                      <button
                        onClick={() => handleShareOnX(spot.name)}
                        className="w-full font-mono py-1 transition-all flex items-center justify-center gap-1.5"
                        style={{ fontSize: 10, background: "color-mix(in srgb, var(--acc-violet) 10%, transparent)", border: "1px solid color-mix(in srgb, var(--acc-violet) 30%, transparent)", color: "var(--acc-violet)" }}
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

          <div className="pt-3 font-mono flex justify-between eyebrow" style={{ borderTop: "1px solid var(--line-bright)" }}>
            <span>SECURED: {inventory.length} / 3</span>
            <span>UGC SLOTS READY</span>
          </div>
        </div>

      </div>

      {/* Panel 4: Bottom Status Bar */}
      <div className="w-full px-4 py-2 mt-4 flex flex-col sm:flex-row justify-between items-center gap-3 font-mono relative overflow-hidden" style={{ background: "var(--bg-1)", border: "1px solid var(--line-bright)", fontSize: 10, color: "var(--ink-2)" }}>
        <div className="flex items-center gap-2 relative z-10">
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--acc-primary)", animation: "pulse-glow 1s ease infinite" }} />
          <span>SYS STATE: <span className="font-bold" style={{ color: "var(--acc-primary)" }}>SOLANA LOGGED IN</span></span>
        </div>

        <div className="relative z-10 text-center sm:text-left">
          CURRENT LOCATION: <span className="font-bold uppercase" style={{ color: "var(--ink-0)" }}>HOPO FARM ROAD - SECTION 01</span>
        </div>

        <div className="flex items-center gap-3 relative z-10">
          <span>BALANCE: <span className="font-bold" style={{ color: "var(--acc-cyan)" }}>25,000 $NAHOPE</span></span>
          <span style={{ color: "var(--line-bright)" }}>|</span>
          <span className="font-bold" style={{ color: "var(--acc-primary)" }}>EPISODE 1 STAGE UNLOCKED</span>
        </div>
      </div>
    </div>
  );
}
