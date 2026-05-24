"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useWallet } from "@solana/wallet-adapter-react";
import { database, UserProfile } from "../../lib/firebase";
import WalletConnectModal from "../../components/WalletConnectModal";
import { Shield, Compass, Wallet } from "lucide-react";

// ── Web Audio API Synthesizer ────────────────────────────────────────────
const playSound = (type: "beep" | "dissonant" | "unlock" | "ambient" | "move") => {
  if (typeof window === "undefined") return;
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    if (type === "beep") {
      const osc = ctx.createOscillator(); const gain = ctx.createGain();
      osc.type = "sine"; osc.frequency.setValueAtTime(520, ctx.currentTime);
      gain.gain.setValueAtTime(0.015, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.1);
      osc.connect(gain); gain.connect(ctx.destination); osc.start(); osc.stop(ctx.currentTime + 0.1);
    } else if (type === "dissonant") {
      const osc1 = ctx.createOscillator(); const osc2 = ctx.createOscillator(); const gain = ctx.createGain();
      osc1.type = "sawtooth"; osc1.frequency.setValueAtTime(80, ctx.currentTime);
      osc2.type = "sine"; osc2.frequency.setValueAtTime(82.5, ctx.currentTime);
      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6);
      osc1.connect(gain); osc2.connect(gain); gain.connect(ctx.destination);
      osc1.start(); osc2.start(); osc1.stop(ctx.currentTime + 0.6); osc2.stop(ctx.currentTime + 0.6);
    } else if (type === "unlock") {
      const osc = ctx.createOscillator(); const gain = ctx.createGain();
      osc.type = "triangle"; osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.025, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.2);
      osc.connect(gain); gain.connect(ctx.destination); osc.start(); osc.stop(ctx.currentTime + 0.2);
    } else if (type === "move") {
      const osc = ctx.createOscillator(); const gain = ctx.createGain();
      osc.type = "sine"; osc.frequency.setValueAtTime(150, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(100, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.15);
      osc.connect(gain); gain.connect(ctx.destination); osc.start(); osc.stop(ctx.currentTime + 0.15);
    }
  } catch (e) { console.warn("Audio Context blocked or unsupported:", e); }
};

type RoomId = "FRONT_YARD" | "OFFICE" | "STORAGE";

interface GameHotspot {
  id: string; name: string;
  top: string; left: string; width: string; height: string;
  hoverText: string;
  onClick: (activeItem: string | null) => { text: string; pickUpItem?: string; unlocks?: string };
}

// ── SVG Crosshair Hotspot marker ────────────────────────────────────────
function HotspotMarker({ x, y, w, h, label, status, onEnter, onClick }: {
  x: string; y: string; w: string; h: string; label: string;
  status: "idle" | "hover";
  onEnter: () => void; onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const color = hovered ? "var(--acc-primary)" : "rgba(255,255,255,0.12)";
  return (
    <button
      onMouseEnter={() => { setHovered(true); onEnter(); }}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      style={{
        position: "absolute", top: y, left: x, width: w, height: h,
        background: hovered ? "color-mix(in srgb, var(--acc-primary) 6%, transparent)" : "transparent",
        border: "none", cursor: "crosshair", padding: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}
    >
      {/* Corner brackets */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M 0 18 L 0 0 L 18 0" stroke={color} strokeWidth="1.5" fill="none" vectorEffect="non-scaling-stroke" />
        <path d="M 100 18 L 100 0 L 82 0" stroke={color} strokeWidth="1.5" fill="none" vectorEffect="non-scaling-stroke" />
        <path d="M 0 82 L 0 100 L 18 100" stroke={color} strokeWidth="1.5" fill="none" vectorEffect="non-scaling-stroke" />
        <path d="M 100 82 L 100 100 L 82 100" stroke={color} strokeWidth="1.5" fill="none" vectorEffect="non-scaling-stroke" />
        {hovered && <>
          <circle cx="50" cy="50" r="12" stroke={color} strokeWidth="0.8" fill="none" opacity="0.5" />
          <line x1="50" y1="36" x2="50" y2="42" stroke={color} strokeWidth="1" />
          <line x1="50" y1="58" x2="50" y2="64" stroke={color} strokeWidth="1" />
          <line x1="36" y1="50" x2="42" y2="50" stroke={color} strokeWidth="1" />
          <line x1="58" y1="50" x2="64" y2="50" stroke={color} strokeWidth="1" />
          <circle cx="50" cy="50" r="2" fill={color} />
        </>}
      </svg>
      {/* Label tooltip */}
      {hovered && (
        <span style={{
          position: "absolute", top: -26, left: "50%", transform: "translateX(-50%)",
          fontFamily: "var(--font-mono)", fontSize: 9,
          color: "var(--acc-primary)", textTransform: "uppercase", letterSpacing: "0.14em",
          padding: "2px 8px", border: "1px solid var(--acc-primary)",
          background: "var(--bg-0)", whiteSpace: "nowrap",
          pointerEvents: "none", zIndex: 20,
          boxShadow: "0 0 8px color-mix(in srgb, var(--acc-primary) 40%, transparent)",
        }}>
          {label}
        </span>
      )}
    </button>
  );
}

export default function GamePage() {
  const { connected } = useWallet();
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const profileRef = useRef<UserProfile | null>(null);
  const [currentRoom, setCurrentRoom] = useState<RoomId>("OFFICE");
  const [logs, setLogs] = useState<Array<{ time: string; role: string; text: string; kind: "system" | "voice" | "omega" | "danger" | "default" }>>([
    { time: "18:40:02", role: "SYSTEM", text: "connection established · ω-channel synced", kind: "system" },
    { time: "18:40:18", role: "BUM-SEOK", text: "'We are completely blocked. No phones, no police radios. Keep your eyes open.'", kind: "voice" },
    { time: "18:40:32", role: "TUTORIAL", text: "Move through rooms · equip items · click hotspots to reveal secrets", kind: "default" },
  ]);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [currentText, setCurrentText] = useState(
    "You are inside the police substation office. Officer Bum-seok is sitting at his desk. A heavy fog covers the window."
  );
  const [discoveryQueue, setDiscoveryQueue] = useState<string[]>([]);
  const [mobileTab, setMobileTab] = useState<"canvas" | "logs" | "inventory">("canvas");
  const [calibMode, setCalibMode] = useState(false);
  const [calibCursor, setCalibCursor] = useState<{ x: number; y: number } | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [showEndOverlay, setShowEndOverlay] = useState(false);
  const logContainerRef = useRef<HTMLDivElement>(null);
  const hasClosedOverlay = useRef(false);

  const syncProfile = () => {
    if (typeof window === "undefined") return;
    const wallet = localStorage.getItem("active_wallet_address") || "Hopo...7XzP";
    const data = database.getUserProfile(wallet);
    profileRef.current = data;
    setProfile(data);
  };

  useEffect(() => { profileRef.current = profile; }, [profile]);

  useEffect(() => {
    syncProfile();
    window.addEventListener("storage", syncProfile);
    return () => window.removeEventListener("storage", syncProfile);
  }, []);

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const addLog = (role: string, text: string, kind: "system" | "voice" | "omega" | "danger" | "default" = "default") => {
    const now = new Date();
    const time = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;
    setLogs((p) => [...p, { time, role, text, kind }]);
  };

  const secureItem = async (itemName: string, message: string) => {
    if (typeof window === "undefined") return;
    const wallet = localStorage.getItem("active_wallet_address") || "Hopo...7XzP";
    if (!profileRef.current) {
      const data = database.getUserProfile(wallet);
      profileRef.current = data;
      setProfile(data);
    }
    const currentProfile = profileRef.current!;
    if (currentProfile.inventory.includes(itemName)) {
      addLog("INFO", `${itemName} already in your possession.`, "system");
      return;
    }
    const updatedProfile = { ...currentProfile, inventory: [...currentProfile.inventory, itemName] };
    profileRef.current = updatedProfile;
    setProfile(updatedProfile);
    setDiscoveryQueue((q) => [...q, itemName]);
    addLog("SECURED", `${itemName} added to artifact deck.`, "system");
    addLog("STORY", message, "voice");
    playSound("unlock");
    if (itemName === "Green Alien Slime" && !hasClosedOverlay.current) {
      setTimeout(() => { setShowEndOverlay(true); playSound("unlock"); }, 1200);
    }
    await database.saveUserProfile(wallet, updatedProfile);
    window.dispatchEvent(new Event("profileUpdated"));
  };

  const dismissDiscovery = () => { playSound("beep"); setDiscoveryQueue((q) => q.slice(1)); };

  const hotspots: Record<RoomId, GameHotspot[]> = {
    OFFICE: [
      {
        id: "bum-seok", name: "Chief Officer Bum-seok", top: "26%", left: "65%", width: "20%", height: "35%",
        hoverText: "Speak with Chief Bum-seok",
        onClick: () => {
          if (!profile) return { text: "Error loading user clearance." };
          return profile.tokenBalance >= 5000
            ? { text: "Bum-seok whispers: '아이복판이 죽어 있냐 씨 (Are its eyes dead, damn)... 성기 (Sung-ki) is staying up all night on that storage terminal. He claims it's telemetry data, but I suspect he is a collaborator. Look at the radar screen on the left—our radio frequency has been completely high-jacked by an internal signal. Someone in this building is coordinates-broadcasting us...'" }
            : { text: "Bum-seok says: 'Stay back. This is an official quarantine command post. I cannot share classified log files unless you have 5,000 $NAHOPE clearance to prove you are a defender.'" };
        },
      },
      {
        id: "substation-typewriter", name: "Goldstar Retro Typewriter", top: "80%", left: "40%", width: "24%", height: "22%",
        hoverText: "Inspect Goldstar Typewriter",
        onClick: (item) => {
          if (profile?.inventory.includes("Green Alien Slime")) return { text: "The typewriter lies disassembled, its keys covered in green residue." };
          if (item === "Screwdriver") return { text: "⚡ [Synergy Success] You used the Screwdriver to unscrew the typewriter's outer metal casing. Inside the key mechanism, you scraped off a vial of glowing Green Alien Slime!", pickUpItem: "Green Alien Slime" };
          return { text: "A Goldstar retro typewriter. Some keys are jammed with a sticky, glowing green alien slime, and the carriage returns with an odd metallic screech. The outer casing is screwed tight; you need a tool to open it." };
        },
      },
      {
        id: "rotary-phone", name: "Blue House Rotary Phone", top: "84%", left: "72%", width: "18%", height: "22%",
        hoverText: "Inspect Rotary Phone",
        onClick: () => ({ text: "A black rotary telephone with a label reading '청와대 범죄신고 112'. Lifting the receiver yields static noise and a low, garbled frequency repeating: 'July 23... the sky turned purple... it is calling from the deep...'" }),
      },
      {
        id: "radar-screen", name: "Green Anomaly Radar", top: "42%", left: "2%", width: "30%", height: "32%",
        hoverText: "Inspect Glitched Radar Screen",
        onClick: () => ({ text: "The green CRT monitor is showing severe electromagnetic interference. A glowing circle pulses rhythmically, printing: [SYS ERROR: OUTPOST SOURCE TRANSMITTING]. Someone inside this substation is actively beaconing our location." }),
      },
    ],
    FRONT_YARD: [
      {
        id: "sung-ae", name: "Officer Sung-ae", top: "35%", left: "60%", width: "18%", height: "38%",
        hoverText: "Speak with Officer Sung-ae",
        onClick: () => {
          if (!profile) return { text: "Error loading user clearance." };
          return profile.tokenBalance >= 5000
            ? { text: "Sung-ae: 'Private Choi went missing near the fence last night. I found his metallic ID tags, but they are carbonized and glow purple in the dark. It is like the entity is absorbing the bio-electricity from our soldiers.'" }
            : { text: "Sung-ae: 'I am guarding the fence. Move along unless you have 5,000 $NAHOPE clearance to check our logs.'" };
        },
      },
      {
        id: "cow-carcass", name: "Mutilated Cow Carcass", top: "68%", left: "30%", width: "30%", height: "25%",
        hoverText: "Examine anomalous carcass",
        onClick: () => ({ text: "A cow carcass with severe cellular warp and dimensional disintegration. A strange symbol is carved into its hide: Omega (Ω). The blood has evaporated, leaving the carcass brittle and dry. Background music shifts into static noise." }),
      },
      {
        id: "torn-tag", name: "Shiny Metallic Object", top: "50%", left: "80%", width: "8%", height: "10%",
        hoverText: "Investigate fence post",
        onClick: () => {
          if (profile?.inventory.includes("Torn ID Tag")) return { text: "Nothing left but rusted wire and glowing purple residue." };
          return { text: "You found a military tag snagged on the barbed wire fence. It belongs to Private Choi, crusted with a bright, glassy purple residue. Secured the Torn ID Tag!", pickUpItem: "Torn ID Tag" };
        },
      },
    ],
    STORAGE: [
      {
        id: "sung-ki", name: "Outcast Sung-ki", top: "35%", left: "48%", width: "18%", height: "30%",
        hoverText: "Speak with Sung-ki",
        onClick: () => {
          if (!profile) return { text: "Error loading user clearance." };
          return profile.tokenBalance >= 5000
            ? { text: "Sung-ki: 'I've deciphered the signal. It's a cosmic beacon loop. The beacon is coming from this very substation! Someone here is broadcasting our bio-signatures. They are trying to feed us to the humanoid creature in the forest.'" }
            : { text: "Sung-ki: 'This terminal is processing telemetry arrays. Go away unless you have 5,000 $NAHOPE tokens.'" };
        },
      },
      {
        id: "workbench", name: "Substation Workbench", top: "60%", left: "2%", width: "45%", height: "38%",
        hoverText: "Search Workbench",
        onClick: () => {
          const hasScrewdriver = profile?.inventory.includes("Screwdriver");
          const hasKey = profile?.inventory.includes("Cabinet Key");
          if (hasScrewdriver && hasKey) return { text: "The workbench is empty, scattered with old blueprints, copper wires and dust." };
          if (!hasScrewdriver && !hasKey) return { text: "You searched the drawer of the workbench. You found a heavy flathead Screwdriver and a small Cabinet Key!", pickUpItem: "BOTH" };
          if (!hasScrewdriver) return { text: "You searched the drawer of the workbench. You found a heavy flathead Screwdriver!", pickUpItem: "Screwdriver" };
          return { text: "You searched the drawer of the workbench. You found a small Cabinet Key!", pickUpItem: "Cabinet Key" };
        },
      },
      {
        id: "locked-cabinet", name: "Locked Weapon Cabinet", top: "18%", left: "72%", width: "26%", height: "80%",
        hoverText: "Open Weapon Cabinet",
        onClick: (item) => {
          if (profile?.inventory.includes("80s Radio")) return { text: "The weapon cabinet is open. You've already taken the 80s Radio." };
          if (item === "Cabinet Key") return { text: "⚡ [Synergy Success] You inserted the Cabinet Key. The lock turns with a rusty screech! Inside is a working military-grade 80s Radio.", pickUpItem: "80s Radio" };
          return { text: "A locked steel ammunition cabinet labeled 'COMMUNICATION GEAR'. You need a key to open it." };
        },
      },
    ],
  };

  const handleHotspotClick = async (h: GameHotspot) => {
    playSound("dissonant");
    const result = h.onClick(activeItem);
    setCurrentText(result.text);
    addLog("ACTION", `Checked ${h.name}.`, "default");
    addLog("TEXT", result.text, "voice");
    if (result.pickUpItem) {
      if (result.pickUpItem === "BOTH") {
        await secureItem("Screwdriver", "Found a flathead screwdriver on the workbench.");
        await secureItem("Cabinet Key", "Found a small copper key labeled 'CABINET' on the workbench.");
      } else {
        await secureItem(result.pickUpItem, `Discovered and secured the ${result.pickUpItem}.`);
      }
    }
  };

  const changeRoom = (room: RoomId) => {
    playSound("move");
    setCurrentRoom(room);
    const desc: Record<RoomId, string> = {
      OFFICE: "You are inside the police substation office. Chief Bum-seok is sitting at his desk. A heavy fog covers the window.",
      FRONT_YARD: "You are in the forest yard outside Hopo Outpost. Barbed wire fences line the perimeter. Officer Sung-ae is standing guard.",
      STORAGE: "You enter the dark storage room. Outcast Sung-ki is typing on a glowing terminal screen. Metal cabinets line the walls.",
    };
    setCurrentText(desc[room]);
    addLog("MOVE", `Entered ${room.replace("_", " ")}.`, "system");
  };

  const ITEM_GLYPHS: Record<string, string> = {
    "Screwdriver": "⏃",
    "Cabinet Key": "✪",
    "80s Radio": "⏁",
    "Torn ID Tag": "◊",
    "Green Alien Slime": "⌬",
  };

  const ITEM_IMAGES: Record<string, string> = {
    "Screwdriver": "/images/items/screwdriver.png",
    "Cabinet Key": "/images/items/cabinet_key.png",
    "80s Radio": "/images/items/80s_radio.png",
    "Torn ID Tag": "/images/items/torn_id_tag.png",
    "Green Alien Slime": "/images/items/green_alien_slime.png",
  };

  const LOG_COLORS: Record<string, string> = {
    system: "var(--acc-primary)",
    voice: "var(--ink-0)",
    omega: "var(--acc-violet)",
    danger: "var(--acc-danger)",
    default: "var(--ink-1)",
  };

  const currentDiscovery = discoveryQueue[0] ?? null;

  return (
    <div style={{
      position: "fixed", inset: 0, top: 56, bottom: 88,
      display: "flex", flexDirection: "column",
      background: "var(--bg-0)", color: "var(--ink-0)",
      fontFamily: "var(--font-mono)",
      userSelect: "none", overflow: "hidden", touchAction: "none",
      padding: "12px 16px 8px",
    }} className="md:top-[72px] md:bottom-0">

      {/* Episode title rail */}
      <div style={{
        textAlign: "center", marginBottom: 8, padding: "6px 0",
        fontFamily: "var(--font-mono)", fontSize: 11,
        textTransform: "uppercase", letterSpacing: "0.32em",
        color: "var(--acc-amber)",
        textShadow: "0 0 12px var(--acc-amber)",
      }} className="caps-omega flicker">
        ⚠ PROTOCOL OMEGA · EPISODE 01 — THE COGNITIVE SEARCH · INTERACTIVE ⚠
      </div>

      {/* Tab bar — mobile: switches panels · desktop: highlights selected panel */}
      <div style={{
        display: "flex", gap: 4, marginBottom: 10,
        borderBottom: "1px solid var(--line)", paddingBottom: 0,
        flexShrink: 0,
      }}>
        {(["canvas", "logs", "inventory"] as const).map((tab) => {
          const isActive = mobileTab === tab;
          return (
            <button key={tab} onClick={() => setMobileTab(tab)} style={{
              flex: 1, padding: "8px 4px",
              fontFamily: "var(--font-mono)", fontSize: 10,
              textTransform: "uppercase", letterSpacing: "0.16em",
              color: isActive ? "var(--acc-primary)" : "var(--ink-3)",
              background: isActive ? "color-mix(in srgb, var(--acc-primary) 8%, transparent)" : "transparent",
              border: "none",
              borderBottom: `2px solid ${isActive ? "var(--acc-primary)" : "transparent"}`,
              cursor: "pointer", transition: "all 0.15s",
            }}>
              {tab === "canvas" ? "GAME" : tab === "logs" ? `LOGS (${logs.length})` : `ITEMS (${profile?.inventory.length ?? 0})`}
            </button>
          );
        })}
      </div>

      {/* Main 3-panel grid */}
      <div style={{ display: "flex", flex: 1, gap: 8, overflow: "hidden", minHeight: 0 }}>

        {/* ── LEFT: Terminal log ──────────────────────────────────────── */}
        <div
          className={`${mobileTab === "logs" ? "flex" : "hidden"} md:flex flex-col w-full md:w-60 flex-none`}
        >
          <div className="panel panel-bracket" style={{
            flex: 1, display: "flex", flexDirection: "column",
            overflow: "hidden", width: "100%",
            boxShadow: mobileTab === "logs" ? "var(--glow-primary)" : undefined,
            borderColor: mobileTab === "logs" ? "var(--acc-primary)" : undefined,
          }}>
            <span className="br-bl" /><span className="br-br" />
            {/* Panel header */}
            <div style={{
              padding: "8px 14px", borderBottom: "1px solid var(--line)",
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <span className="eyebrow" style={{ fontSize: 10 }}>// TELEMETRY · TERMINAL</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--acc-primary)", letterSpacing: "0.2em" }}>● LIVE</span>
            </div>
            {/* Log entries */}
            <div ref={logContainerRef} style={{ flex: 1, overflowY: "auto", padding: "8px 14px 12px", touchAction: "auto" }}>
              {logs.map((log, idx) => (
                <div key={idx} style={{
                  padding: "4px 0",
                  borderBottom: "1px dashed var(--ink-4)",
                  fontFamily: "var(--font-mono)",
                  fontSize: 11, lineHeight: 1.55,
                  color: LOG_COLORS[log.kind],
                }}>
                  <span style={{
                    fontSize: 9, textTransform: "uppercase", letterSpacing: "0.1em",
                    marginRight: 5, opacity: 0.7,
                  }}>[{log.role}]</span>
                  {log.text}
                </div>
              ))}
            </div>
            <div style={{
              padding: "6px 14px", borderTop: "1px solid var(--line)",
              fontFamily: "var(--font-mono)", fontSize: 9,
              color: "var(--ink-3)", textTransform: "uppercase", letterSpacing: "0.16em",
            }}>
              SYSTEM STATUS: MONITORING SIGNALS
            </div>
          </div>
        </div>

        {/* ── CENTER: Game canvas ─────────────────────────────────────── */}
        <div
          className={`${mobileTab === "canvas" ? "flex" : "hidden"} md:flex flex-col flex-1 min-w-0 relative`}
        >
          {/* Room nav bar */}
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "8px 12px", borderBottom: "1px solid var(--line)",
            background: "var(--bg-1)", flexShrink: 0,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Compass size={12} style={{ color: "var(--acc-primary)" }} />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--ink-2)", letterSpacing: "0.14em" }}>
                ROOM: <span style={{ color: "var(--ink-0)", fontWeight: 500 }}>{currentRoom.replace("_", " ")}</span>
              </span>
            </div>
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              {/* Hotspot calibration toggle — dev only */}
              {process.env.NODE_ENV === "development" && (
                <button
                  onClick={() => setCalibMode((v) => !v)}
                  title="Toggle hotspot calibration overlay"
                  style={{
                    padding: "4px 8px", fontFamily: "var(--font-mono)", fontSize: 8,
                    textTransform: "uppercase", letterSpacing: "0.12em", cursor: "pointer",
                    border: `1px solid ${calibMode ? "var(--acc-amber)" : "var(--line)"}`,
                    background: calibMode ? "color-mix(in srgb, var(--acc-amber) 15%, transparent)" : "transparent",
                    color: calibMode ? "var(--acc-amber)" : "var(--ink-3)",
                    transition: "all 0.15s",
                  }}
                >
                  {calibMode ? "✕ CALIB" : "⊕ CALIB"}
                </button>
              )}
              {currentRoom !== "FRONT_YARD" && (
                <button onClick={() => changeRoom("FRONT_YARD")} style={{
                  padding: "5px 10px", fontFamily: "var(--font-mono)", fontSize: 9,
                  textTransform: "uppercase", letterSpacing: "0.14em",
                  border: "1px solid var(--line-bright)", color: "var(--ink-2)",
                  background: "transparent", cursor: "pointer",
                  transition: "all 0.15s",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--acc-primary)"; e.currentTarget.style.color = "var(--acc-primary)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--line-bright)"; e.currentTarget.style.color = "var(--ink-2)"; }}>
                  MOVE OUTSIDE
                </button>
              )}
              {currentRoom !== "OFFICE" && (
                <button onClick={() => changeRoom("OFFICE")} style={{
                  padding: "5px 10px", fontFamily: "var(--font-mono)", fontSize: 9,
                  textTransform: "uppercase", letterSpacing: "0.14em",
                  border: "1px solid var(--line-bright)", color: "var(--ink-2)",
                  background: "transparent", cursor: "pointer", transition: "all 0.15s",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--acc-primary)"; e.currentTarget.style.color = "var(--acc-primary)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--line-bright)"; e.currentTarget.style.color = "var(--ink-2)"; }}>
                  GO TO OFFICE
                </button>
              )}
              {currentRoom !== "STORAGE" && (
                <button onClick={() => changeRoom("STORAGE")} style={{
                  padding: "5px 10px", fontFamily: "var(--font-mono)", fontSize: 9,
                  textTransform: "uppercase", letterSpacing: "0.14em",
                  border: "1px solid var(--line-bright)", color: "var(--ink-2)",
                  background: "transparent", cursor: "pointer", transition: "all 0.15s",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--acc-primary)"; e.currentTarget.style.color = "var(--acc-primary)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--line-bright)"; e.currentTarget.style.color = "var(--ink-2)"; }}>
                  ENTER BACKROOM
                </button>
              )}
            </div>
          </div>

          {/* Interactive canvas */}
          <div
            ref={canvasRef}
            className="crt-scan crt-vignette"
            style={{
              flex: 1, position: "relative", overflow: "hidden",
              background: "var(--bg-0)", touchAction: "manipulation",
              boxShadow: mobileTab === "canvas" ? "var(--glow-primary)" : undefined,
              outline: mobileTab === "canvas" ? "1px solid var(--acc-primary)" : undefined,
            }}
            onMouseMove={calibMode ? (e) => {
              const rect = canvasRef.current?.getBoundingClientRect();
              if (!rect) return;
              const x = ((e.clientX - rect.left) / rect.width * 100);
              const y = ((e.clientY - rect.top) / rect.height * 100);
              setCalibCursor({ x, y });
            } : undefined}
            onMouseLeave={calibMode ? () => setCalibCursor(null) : undefined}
          >
            {/* Scan-roll beam */}
            <div style={{
              position: "absolute", left: 0, right: 0, height: 80, zIndex: 41,
              background: "linear-gradient(180deg, transparent, rgba(158,255,94,0.05), transparent)",
              animation: "scan-roll 6s linear infinite", pointerEvents: "none",
            }} />

            {/* Room background */}
            <img
              src={currentRoom === "OFFICE" ? "/images/substation_office.png"
                : currentRoom === "FRONT_YARD" ? "/images/hopo_farm_road_bg.png"
                  : "/images/substation_storage.png"}
              alt={currentRoom}
              style={{
                position: "absolute", inset: 0, width: "100%", height: "100%",
                objectFit: "cover", opacity: 0.8, transition: "all 0.5s", zIndex: 0,
                pointerEvents: "none", userSelect: "none",
              }}
            />

            {/* Vignette */}
            <div style={{
              position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
              background: "radial-gradient(ellipse at center, transparent 40%, rgba(3,3,9,0.7) 100%)",
            }} />

            {/* Hotspots */}
            <div style={{ position: "absolute", inset: 0, zIndex: 10 }}>
              {hotspots[currentRoom].map((spot) => (
                <HotspotMarker
                  key={spot.id}
                  x={spot.left} y={spot.top} w={spot.width} h={spot.height}
                  label={spot.hoverText}
                  status="idle"
                  onEnter={() => !calibMode && playSound("beep")}
                  onClick={() => !calibMode && handleHotspotClick(spot)}
                />
              ))}
            </div>

            {/* ── CALIBRATION OVERLAY ─────────────────────────────────── */}
            {calibMode && (
              <div style={{ position: "absolute", inset: 0, zIndex: 50, pointerEvents: "none" }}>
                {hotspots[currentRoom].map((spot, i) => {
                  const COLORS = ["rgba(255,60,60,0.55)", "rgba(60,200,255,0.55)", "rgba(255,200,0,0.55)", "rgba(180,80,255,0.55)"];
                  const c = COLORS[i % COLORS.length];
                  return (
                    <div key={spot.id} style={{
                      position: "absolute",
                      top: spot.top, left: spot.left,
                      width: spot.width, height: spot.height,
                      background: c.replace("0.55", "0.12"),
                      border: `2px solid ${c.replace("0.55", "0.85")}`,
                      boxSizing: "border-box",
                    }}>
                      <div style={{
                        position: "absolute", top: 2, left: 2,
                        fontFamily: "var(--font-mono)", fontSize: 9, color: "#fff",
                        background: "rgba(0,0,0,0.75)", padding: "1px 5px",
                        lineHeight: 1.5, pointerEvents: "none",
                        maxWidth: "calc(100% - 4px)", overflow: "hidden",
                      }}>
                        <span style={{ color: c.replace("0.55", "1"), fontWeight: "bold" }}>#{i + 1} {spot.id}</span><br />
                        top:{spot.top} left:{spot.left}<br />
                        w:{spot.width} h:{spot.height}
                      </div>
                    </div>
                  );
                })}
                {/* Cursor readout */}
                {calibCursor && (
                  <div style={{
                    position: "absolute",
                    top: `${calibCursor.y}%`, left: `${calibCursor.x}%`,
                    transform: "translate(8px, 8px)", pointerEvents: "none", zIndex: 60,
                    fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--acc-primary)",
                    background: "rgba(0,0,0,0.85)", padding: "2px 8px",
                    border: "1px solid var(--acc-primary)",
                    whiteSpace: "nowrap",
                  }}>
                    x: {calibCursor.x.toFixed(1)}% · y: {calibCursor.y.toFixed(1)}%
                  </div>
                )}
                {/* Crosshair lines */}
                {calibCursor && <>
                  <div style={{ position: "absolute", top: `${calibCursor.y}%`, left: 0, right: 0, height: 1, background: "rgba(158,255,94,0.3)", pointerEvents: "none" }} />
                  <div style={{ position: "absolute", left: `${calibCursor.x}%`, top: 0, bottom: 0, width: 1, background: "rgba(158,255,94,0.3)", pointerEvents: "none" }} />
                </>}
              </div>
            )}

            {/* HUD corner label */}
            <div style={{
              position: "absolute", bottom: 10, right: 10, zIndex: 15, pointerEvents: "none",
              fontFamily: "var(--font-mono)", fontSize: 8, color: "var(--ink-3)",
              textTransform: "uppercase", letterSpacing: "0.18em",
              padding: "2px 8px", background: "var(--bg-0)", border: "1px solid var(--line)",
            }}>
              FEED ACTIVE · {currentRoom.replace("_", " ")}
            </div>
          </div>

          {/* Story text box */}
          <div style={{
            background: "var(--bg-1)", borderTop: "1px solid var(--line)",
            padding: "14px 16px", minHeight: 110, flexShrink: 0,
          }}>
            <span className="eyebrow" style={{ fontSize: 9, marginBottom: 6, display: "block" }}>
              // SEARCH LOG · DIALOGUE
            </span>
            <p style={{
              fontFamily: "var(--font-serif)", fontStyle: "italic",
              fontSize: 14, color: "var(--ink-0)", lineHeight: 1.55,
              overflowY: "auto", maxHeight: 72, touchAction: "auto",
            }}>
              {currentText}
            </p>
          </div>
        </div>

        {/* ── RIGHT: Inventory / Artifact Deck ────────────────────────── */}
        <div
          className={`${mobileTab === "inventory" ? "flex" : "hidden"} md:flex flex-col w-full md:w-56 flex-none`}
        >
          <div className="panel panel-bracket" style={{
            flex: 1, display: "flex", flexDirection: "column", overflow: "hidden",
            boxShadow: mobileTab === "inventory" ? "var(--glow-primary)" : undefined,
            borderColor: mobileTab === "inventory" ? "var(--acc-primary)" : undefined,
          }}>
            <span className="br-bl" /><span className="br-br" />
            <div style={{
              padding: "8px 14px", borderBottom: "1px solid var(--line)",
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <span className="eyebrow" style={{ fontSize: 10 }}>// ARTIFACT DECK</span>
              <span style={{
                fontFamily: "var(--font-mono)", fontSize: 10,
                color: "var(--acc-primary)", letterSpacing: "0.12em",
              }}>{profile?.inventory.length ?? 0} / 5</span>
            </div>

            <div style={{ flex: 1, overflowY: "auto", padding: "10px 12px", display: "flex", flexDirection: "column", gap: 8 }}>
              {["Screwdriver", "Cabinet Key", "80s Radio", "Torn ID Tag", "Green Alien Slime"].map((item) => {
                const isSecured = profile?.inventory.includes(item) ?? false;
                const isActive = activeItem === item;
                return (
                  <button
                    key={item}
                    disabled={!isSecured}
                    onClick={() => { playSound("beep"); setActiveItem(isActive ? null : item); }}
                    style={{
                      display: "flex", alignItems: "stretch", gap: 10, padding: 10,
                      border: `1px solid ${isActive ? "var(--acc-primary)" : isSecured ? "var(--line)" : "var(--line)"}`,
                      background: isActive ? "color-mix(in srgb, var(--acc-primary) 4%, transparent)"
                        : isSecured ? "var(--bg-2)" : "var(--bg-1)",
                      boxShadow: isActive ? "var(--glow-primary)" : "none",
                      opacity: isSecured ? 1 : 0.35,
                      cursor: isSecured ? "pointer" : "not-allowed",
                      textAlign: "left", transition: "all 0.15s",
                    }}
                  >
                    {/* Glyph slot */}
                    <div style={{
                      width: 48, height: 48, flexShrink: 0,
                      background: "var(--bg-3)", border: "1px solid var(--line)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: "var(--font-display)", fontSize: 22,
                      color: isActive ? "var(--acc-primary)" : isSecured ? "var(--ink-1)" : "var(--ink-4)",
                      textShadow: isActive ? "0 0 12px var(--acc-primary)" : "none",
                      position: "relative",
                      overflow: "hidden",
                    }}>
                      {isSecured ? (
                        <>
                          <img
                            src={ITEM_IMAGES[item]} alt=""
                            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.45 }}
                          />
                          <span style={{ position: "relative", zIndex: 1 }}>{ITEM_GLYPHS[item]}</span>
                        </>
                      ) : (
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--ink-4)" }}>LKD</span>
                      )}
                      <span style={{ position: "absolute", top: 2, left: 2, fontFamily: "var(--font-mono)", fontSize: 6, color: "var(--ink-4)" }}>+</span>
                      <span style={{ position: "absolute", bottom: 2, right: 2, fontFamily: "var(--font-mono)", fontSize: 6, color: "var(--ink-4)" }}>+</span>
                    </div>
                    {/* Text info */}
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 2, minWidth: 0 }}>
                      <span style={{
                        fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 500,
                        color: isActive ? "var(--acc-primary)" : "var(--ink-0)", display: "block",
                      }}>{item}</span>
                      <span style={{
                        fontFamily: "var(--font-mono)", fontSize: 9,
                        color: "var(--ink-2)", textTransform: "uppercase", letterSpacing: "0.14em",
                      }}>
                        {isSecured ? (isActive ? "▸ EQUIPPED" : "[ TAP TO EQUIP ]") : "LOCKED"}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div style={{
              padding: "6px 14px", borderTop: "1px solid var(--line)",
              display: "flex", justifyContent: "space-between",
              fontFamily: "var(--font-mono)", fontSize: 9,
              color: "var(--ink-3)", textTransform: "uppercase", letterSpacing: "0.14em",
            }}>
              <span>SLOTS: READY</span>
              <span>UGC LOCK</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Status bar ──────────────────────────────────────────────────── */}
      <div style={{
        marginTop: 8, flexShrink: 0,
        border: "1px solid var(--line-bright)",
        background: "var(--bg-1)",
        padding: "10px 16px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: 12,
      }}>
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          {/* Network */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "var(--font-mono)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.14em" }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--acc-primary)", boxShadow: "0 0 6px var(--acc-primary)", animation: "pulse-glow 2s infinite", flexShrink: 0 }} />
            <span style={{ color: "var(--ink-3)" }}>NETWORK:</span>
            <span style={{ color: "var(--acc-primary)", textShadow: "0 0 8px var(--acc-primary)" }}>SOLANA · ACTIVE</span>
          </div>
          {/* Location */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "var(--font-mono)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.14em" }}>
            <span style={{ color: "var(--ink-3)" }}>LOCATION:</span>
            <span style={{ color: "var(--ink-1)" }}>HOPO SUBSTATION</span>
          </div>
          {/* Clearance */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "var(--font-mono)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.14em" }}>
            <span style={{ color: "var(--ink-3)" }}>CLEARANCE:</span>
            <span style={{ color: "var(--acc-amber)", textShadow: "0 0 6px var(--acc-amber)" }}>
              {profile && profile.tokenBalance >= 5000 ? "SECRET (≥5000)" : "RESTRICTED (<5000)"}
            </span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          {/* Balance */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "var(--font-mono)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.14em" }}>
            <span style={{ color: "var(--ink-3)" }}>BALANCE:</span>
            <span style={{ color: "var(--acc-violet)", textShadow: "0 0 8px var(--acc-violet)" }}>
              {profile?.tokenBalance.toLocaleString() ?? "0"} $NAHOPE
            </span>
          </div>
          {/* Episode */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "var(--font-mono)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.14em" }}>
            <span style={{ color: "var(--ink-3)" }}>EPISODE:</span>
            <span style={{ color: "var(--acc-danger)", textShadow: "0 0 6px var(--acc-danger)" }}>01</span>
          </div>
        </div>
      </div>

      {/* ── Item Discovery Modal ─────────────────────────────────────────── */}
      {discoveryQueue.length > 0 && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 50,
          background: "rgba(3,3,9,0.88)", backdropFilter: "blur(4px)",
          display: "flex", alignItems: "center", justifyContent: "center", padding: 16,
        }}>
          <div className="panel panel-bracket" style={{
            maxWidth: 320, width: "100%",
            borderColor: "var(--acc-violet)", padding: 0,
            "--acc-primary": "var(--acc-violet)",
          } as React.CSSProperties}>
            <span className="br-bl" /><span className="br-br" />
            {/* Header tab */}
            <div style={{
              padding: "10px 16px", borderBottom: "1px solid var(--line)",
              display: "flex", alignItems: "center", gap: 8,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--acc-violet)", boxShadow: "0 0 8px var(--acc-violet)", animation: "pulse-glow 2s infinite" }} />
              <span className="eyebrow" style={{ fontSize: 9, color: "var(--acc-violet)" }}>// DISCOVERY · ARTIFACT</span>
            </div>
            {/* Item display */}
            <div style={{ padding: "20px 16px", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
              <div style={{
                width: 96, height: 96,
                background: "var(--bg-3)", border: "1px solid var(--acc-violet)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "var(--font-display)", fontSize: 40,
                color: "var(--acc-violet)",
                textShadow: "0 0 20px var(--acc-violet)",
                position: "relative", overflow: "hidden",
                boxShadow: "var(--glow-violet)",
              }}>
                {currentDiscovery && (
                  <img src={ITEM_IMAGES[currentDiscovery]} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.4 }} />
                )}
                <span style={{ position: "relative", zIndex: 1 }}>{currentDiscovery ? ITEM_GLYPHS[currentDiscovery] : "⌬"}</span>
              </div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 14, fontWeight: 500, color: "var(--ink-0)", textAlign: "center" }}>{currentDiscovery}</span>
              <span className="eyebrow" style={{ fontSize: 9 }}>SECURED TO ARTIFACT DECK</span>
              <div style={{ display: "flex", justifyContent: "space-between", width: "100%", paddingTop: 8, borderTop: "1px solid var(--line)" }}>
                <span className="eyebrow" style={{ fontSize: 9 }}>ARTIFACT DECK</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--acc-violet)" }}>{profile?.inventory.length ?? 0} / 5</span>
              </div>
            </div>
            {/* Confirm */}
            <div style={{ padding: "0 16px 16px" }}>
              <button
                onClick={dismissDiscovery}
                style={{
                  width: "100%", padding: "11px 16px",
                  fontFamily: "var(--font-mono)", fontSize: 10,
                  textTransform: "uppercase", letterSpacing: "0.18em",
                  border: "1px solid var(--acc-violet)", color: "var(--acc-violet)",
                  background: "transparent", cursor: "pointer", transition: "all 0.15s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "var(--acc-violet)"; e.currentTarget.style.color = "var(--bg-0)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--acc-violet)"; }}
              >
                [ CONFIRM ACQUISITION ]
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Wallet Connect Modal ─────────────────────────────────────────── */}
      <WalletConnectModal
        isOpen={showWalletModal}
        onClose={() => setShowWalletModal(false)}
        onSuccess={() => setShowWalletModal(false)}
        reason="episode2"
      />

      {/* ── Episode complete overlay ─────────────────────────────────────── */}
      {showEndOverlay && discoveryQueue.length === 0 && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 50,
          background: "rgba(3,3,9,0.96)", backdropFilter: "blur(6px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: 16, overflowY: "auto",
        }}>
          <div className="panel panel-bracket crt-scan" style={{
            maxWidth: 560, width: "100%", borderColor: "var(--acc-danger)",
            "--acc-primary": "var(--acc-danger)",
          } as React.CSSProperties}>
            <span className="br-bl" /><span className="br-br" />
            {/* Header */}
            <div style={{
              padding: "12px 20px", borderBottom: "1px solid var(--line)",
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--acc-danger)", boxShadow: "0 0 10px var(--acc-danger)", animation: "pulse-glow 1s infinite" }} />
                <span className="eyebrow" style={{ fontSize: 10, color: "var(--acc-danger)" }}>// TRANSMISSION · INTERCEPTED · PROTOCOL OMEGA COMPLETE</span>
              </div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--ink-3)", letterSpacing: "0.14em" }}>STATUS: TERMINATED</span>
            </div>

            <div style={{ padding: "20px 20px 0" }}>
              {/* Declassified body */}
              <div style={{
                background: "var(--bg-1)", border: "1px solid var(--line)",
                padding: 16, marginBottom: 16, display: "flex", flexDirection: "column", gap: 10,
              }}>
                <span className="eyebrow" style={{ fontSize: 9, color: "var(--acc-violet)" }}>// DECLASSIFIED SIGNAL ANALYSIS //</span>
                <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 14, color: "var(--ink-1)", lineHeight: 1.6 }}>
                  The <span style={{ color: "var(--acc-cyan)", fontStyle: "normal", fontFamily: "var(--font-mono)", fontSize: 12 }}>Green Alien Slime</span> scraped from the typewriter was the final link. By injecting its molecular resonance data into the 80s military radio, the glitched radar suddenly resolves...
                </p>
                <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 14, color: "var(--ink-1)", lineHeight: 1.6 }}>
                  Officer Bum-seok stares at the pulsing CRT screen, his eyes hollow and dead.{" "}
                  <span style={{ color: "var(--acc-amber)", fontStyle: "italic" }}>&quot;아이복판이 죽어 있냐 씨 (Are its eyes dead, damn)...&quot;</span>{" "}he whispers as the power grid short-circuits.
                </p>
                <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 14, color: "var(--ink-1)", lineHeight: 1.6, borderTop: "1px solid var(--line)", paddingTop: 10 }}>
                  The incoming signal wasn&apos;t an SOS from the mainland. It was an orbital beacon broadcasting the outpost&apos;s bio-signatures. Outcast Sung-ki has disappeared into the freezing fog of the DMZ, and a towering, dark humanoid silhouette is rising from the coastal waters of Hopo Port.
                </p>
              </div>

              {/* Gate requirements */}
              <div style={{ border: "1px solid var(--line-bright)", padding: 14, marginBottom: 16, display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  { label: "NEXT STAGE", value: "EPISODE 02: DISCONNECTED SIGNALS", color: "var(--acc-violet)" },
                  { label: "REQUIRED CLEARANCE", value: "5,000 $NAHOPE TOKENS", color: "var(--acc-cyan)" },
                  { label: "YOUR BALANCE", value: `${profile?.tokenBalance.toLocaleString() || "0"} $NAHOPE`, color: profile && profile.tokenBalance >= 5000 ? "var(--acc-primary)" : "var(--acc-danger)" },
                  { label: "WALLET", value: connected ? "// CONNECTED //" : "// NOT CONNECTED //", color: connected ? "var(--acc-primary)" : "var(--acc-danger)" },
                  { label: "STAGE ACCESS", value: connected && profile && profile.tokenBalance >= 5000 ? "// ACCESS GRANTED //" : "// ACCESS DENIED //", color: connected && profile && profile.tokenBalance >= 5000 ? "var(--acc-primary)" : "var(--acc-danger)" },
                ].map((row) => (
                  <div key={row.label} style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    fontFamily: "var(--font-mono)", fontSize: 10,
                    textTransform: "uppercase", letterSpacing: "0.14em",
                    borderBottom: "1px dashed var(--ink-4)", paddingBottom: 6,
                  }}>
                    <span style={{ color: "var(--ink-3)" }}>{row.label}</span>
                    <span style={{ color: row.color, textShadow: `0 0 6px ${row.color}` }}>{row.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div style={{ padding: "0 20px 20px", display: "flex", flexDirection: "column", gap: 8 }}>
              <Link
                href="/community"
                onClick={() => { playSound("unlock"); hasClosedOverlay.current = true; setShowEndOverlay(false); }}
                style={{
                  display: "block", width: "100%", padding: "12px 16px",
                  fontFamily: "var(--font-mono)", fontSize: 10,
                  textTransform: "uppercase", letterSpacing: "0.18em",
                  background: "var(--acc-primary)", color: "var(--bg-0)",
                  border: "1px solid var(--acc-primary)", textDecoration: "none",
                  textAlign: "center", cursor: "pointer", transition: "all 0.15s",
                  boxShadow: "var(--glow-primary)",
                }}
              >
                PROPOSE PART 2 STORY TO NA HONG-JIN — GO TO COMMUNITY
              </Link>
              <div style={{ display: "grid", gridTemplateColumns: connected ? "1fr" : "1fr 1fr", gap: 8 }}>
                {!connected && (
                  <button
                    onClick={() => setShowWalletModal(true)}
                    style={{
                      padding: "10px 16px", fontFamily: "var(--font-mono)", fontSize: 10,
                      textTransform: "uppercase", letterSpacing: "0.16em",
                      border: "1px solid var(--acc-violet)", color: "var(--acc-violet)",
                      background: "transparent", cursor: "pointer", display: "flex",
                      alignItems: "center", justifyContent: "center", gap: 8, transition: "all 0.15s",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "var(--acc-violet)"; e.currentTarget.style.color = "var(--bg-0)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--acc-violet)"; }}
                  >
                    <Wallet size={11} /> CONNECT WALLET FOR EP.2
                  </button>
                )}
                <button
                  onClick={() => { playSound("move"); hasClosedOverlay.current = true; setShowEndOverlay(false); }}
                  style={{
                    padding: "10px 16px", fontFamily: "var(--font-mono)", fontSize: 10,
                    textTransform: "uppercase", letterSpacing: "0.16em",
                    border: "1px solid var(--line-bright)", color: "var(--ink-2)",
                    background: "transparent", cursor: "pointer", transition: "all 0.15s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--ink-1)"; e.currentTarget.style.color = "var(--ink-0)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--line-bright)"; e.currentTarget.style.color = "var(--ink-2)"; }}
                >
                  CLOSE FILE & EXPLORE
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
