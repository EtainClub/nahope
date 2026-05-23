"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useWallet } from "@solana/wallet-adapter-react";
import { database, UserProfile } from "../../lib/firebase";
import WalletConnectModal from "../../components/WalletConnectModal";
import { Shield, Key, Compass, MessageSquare, Terminal, Archive, Check, Wallet } from "lucide-react";

// Web Audio API Synthesizer
const playSound = (type: "beep" | "dissonant" | "unlock" | "ambient" | "move") => {
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
      osc1.frequency.setValueAtTime(80, ctx.currentTime);
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(82.5, ctx.currentTime);
      gain.gain.setValueAtTime(0.03, ctx.currentTime);
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
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.025, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    } else if (type === "move") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(150, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(100, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    }
  } catch (e) {
    console.warn("Audio Context blocked or unsupported:", e);
  }
};

type RoomId = "FRONT_YARD" | "OFFICE" | "STORAGE";

interface GameHotspot {
  id: string;
  name: string;
  top: string;
  left: string;
  width: string;
  height: string;
  hoverText: string;
  onClick: (activeItem: string | null) => { text: string; pickUpItem?: string; unlocks?: string };
}

export default function GamePage() {
  const { connected } = useWallet();
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const profileRef = useRef<UserProfile | null>(null);
  const [currentRoom, setCurrentRoom] = useState<RoomId>("OFFICE");
  const [logs, setLogs] = useState<string[]>([
    "[SYSTEM INITIALIZED] connection established.",
    "[LOG 18:40] Bum-seok: 'We are completely blocked. No phones, no police radios. The fog is crawling in... Keep your eyes open.'",
    "[TUTORIAL] Move through rooms using the navigation console. Equipping items and clicking hotspots yields secrets.",
  ]);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [currentText, setCurrentText] = useState(
    "You are inside the police substation office. Officer Bum-seok is sitting at his desk. A heavy fog covers the window."
  );
  const [discoveryQueue, setDiscoveryQueue] = useState<string[]>([]);
  const [mobileTab, setMobileTab] = useState<"canvas" | "logs" | "inventory">("canvas");
  const [showEndOverlay, setShowEndOverlay] = useState(false);
  const logContainerRef = useRef<HTMLDivElement>(null);
  const hasClosedOverlay = useRef(false);

  // Load and sync profile — only on mount and cross-tab storage events.
  // Does NOT trigger the end overlay — that only fires when the user actually
  // picks up Green Alien Slime during the current session (inside secureItem).
  const syncProfile = () => {
    if (typeof window === "undefined") return;
    const wallet = localStorage.getItem("active_wallet_address") || "Hopo...7XzP";
    const data = database.getUserProfile(wallet);
    profileRef.current = data;
    setProfile(data);
  };

  // Keep profileRef in sync whenever profile state changes
  useEffect(() => {
    profileRef.current = profile;
  }, [profile]);

  useEffect(() => {
    syncProfile();
    // Only listen for true cross-tab storage changes
    window.addEventListener("storage", syncProfile);
    return () => window.removeEventListener("storage", syncProfile);
  }, []);

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  // DB Sync Helper for Items
  const secureItem = async (itemName: string, message: string) => {
    if (typeof window === "undefined") return;

    const wallet = localStorage.getItem("active_wallet_address") || "Hopo...7XzP";

    // profileRef.current can be null if syncProfile hasn't resolved yet
    // (user clicked a hotspot before the async load finished).
    // In that case, fetch the profile right now instead of silently bailing.
    if (!profileRef.current) {
      const data = database.getUserProfile(wallet);
      profileRef.current = data;
      setProfile(data);
    }

    const currentProfile = profileRef.current!;

    if (currentProfile.inventory.includes(itemName)) {
      setLogs((p) => [...p, `[INFO] ${itemName} already in your possession.`]);
      return;
    }

    const updatedProfile = {
      ...currentProfile,
      inventory: [...currentProfile.inventory, itemName],
    };

    // Write to ref immediately — sequential secureItem calls (e.g. "BOTH") read this
    // before React re-renders, so they always see the freshest inventory.
    profileRef.current = updatedProfile;
    setProfile(updatedProfile);
    setDiscoveryQueue((q) => [...q, itemName]);
    setLogs((p) => [...p, `[SECURED] ${itemName} added to artifact deck.`, `[STORY] ${message}`]);
    playSound("unlock");

    // Start the end-overlay timer immediately on item pickup — before the async save —
    // so Firestore latency doesn't delay it. The overlay itself is gated by
    // discoveryQueue.length === 0, so it only appears after the discovery modal is dismissed.
    if (itemName === "Green Alien Slime" && !hasClosedOverlay.current) {
      setTimeout(() => {
        setShowEndOverlay(true);
        playSound("unlock");
      }, 1200);
    }

    await database.saveUserProfile(wallet, updatedProfile);

    // Notify navbar to refresh token balance display
    window.dispatchEvent(new Event("profileUpdated"));
  };

  const dismissDiscovery = () => {
    playSound("beep");
    setDiscoveryQueue((q) => q.slice(1));
  };

  // Rooms and Hotspots Configuration
  const hotspots: Record<RoomId, GameHotspot[]> = {
    OFFICE: [
      {
        id: "bum-seok",
        name: "Chief Officer Bum-seok",
        top: "45%",
        left: "62%",
        width: "20%",
        height: "35%",
        hoverText: "Speak with Chief Bum-seok",
        onClick: () => {
          if (!profile) return { text: "Error loading user clearance." };
          const hasTokens = profile.tokenBalance >= 5000;
          if (hasTokens) {
            return {
              text: "Bum-seok whispers: '아이복판이 죽어 있냐 씨 (Are its eyes dead, damn)... 성기 (Sung-ki) is staying up all night on that storage terminal. He claims it's telemetry data, but I suspect he is a collaborator. Look at the radar screen on the left—our radio frequency has been completely high-jacked by an internal signal. Someone in this building is coordinates-broadcasting us...'",
            };
          } else {
            return {
              text: "Bum-seok says: 'Stay back. This is an official quarantine command post. I cannot share classified log files unless you have 5,000 $NAHOPE clearance to prove you are a defender.'",
            };
          }
        },
      },
      {
        id: "substation-typewriter",
        name: "Goldstar Retro Typewriter",
        top: "62%",
        left: "30%",
        width: "24%",
        height: "22%",
        hoverText: "Inspect Goldstar Typewriter",
        onClick: (item) => {
          if (profile?.inventory.includes("Green Alien Slime")) {
            return { text: "The typewriter lies disassembled, its keys covered in green residue." };
          }
          if (item === "Screwdriver") {
            return {
              text: "⚡ [Synergy Success] You used the Screwdriver to unscrew the typewriter's outer metal casing. Inside the key mechanism, you scraped off a vial of glowing Green Alien Slime!",
              pickUpItem: "Green Alien Slime",
            };
          }
          return {
            text: "A Goldstar retro typewriter. Some keys are jammed with a sticky, glowing green alien slime, and the carriage returns with an odd metallic screech. The outer casing is screwed tight; you need a tool to open it.",
          };
        },
      },
      {
        id: "rotary-phone",
        name: "Blue House Rotary Phone",
        top: "72%",
        left: "70%",
        width: "18%",
        height: "22%",
        hoverText: "Inspect Rotary Phone",
        onClick: () => {
          return {
            text: "A black rotary telephone with a label reading '청와대 범죄신고 112'. Lifting the receiver yields static noise and a low, garbled frequency repeating: 'July 23... the sky turned purple... it is calling from the deep...'",
          };
        },
      },
      {
        id: "radar-screen",
        name: "Green Anomaly Radar",
        top: "42%",
        left: "2%",
        width: "30%",
        height: "32%",
        hoverText: "Inspect Glitched Radar Screen",
        onClick: () => {
          return {
            text: "The green CRT monitor is showing severe electromagnetic interference. A glowing circle pulses rhythmically, printing: [SYS ERROR: OUTPOST SOURCE TRANSMITTING]. Someone inside this substation is actively beaconing our location.",
          };
        },
      },
    ],
    FRONT_YARD: [
      {
        id: "sung-ae",
        name: "Officer Sung-ae",
        top: "35%",
        left: "60%",
        width: "18%",
        height: "38%",
        hoverText: "Speak with Officer Sung-ae",
        onClick: () => {
          if (!profile) return { text: "Error loading user clearance." };
          const hasTokens = profile.tokenBalance >= 5000;
          if (hasTokens) {
            return {
              text: "Sung-ae: 'Private Choi went missing near the fence last night. I found his metallic ID tags, but they are carbonized and glow purple in the dark. It is like the entity is absorbing the bio-electricity from our soldiers.'",
            };
          } else {
            return {
              text: "Sung-ae: 'I am guarding the fence. Move along unless you have 5,000 $NAHOPE clearance to check our logs.'",
            };
          }
        },
      },
      {
        id: "cow-carcass",
        name: "Mutilated Cow Carcass",
        top: "68%",
        left: "30%",
        width: "30%",
        height: "25%",
        hoverText: "Examine anomalous carcass",
        onClick: () => {
          return {
            text: "A cow carcass with severe cellular warp and dimensional disintegration. A strange symbol is carved into its hide: Omega (Ω). The blood has evaporated, leaving the carcass brittle and dry. Background music shifts into static noise.",
          };
        },
      },
      {
        id: "torn-tag",
        name: "Shiny Metallic Object",
        top: "50%",
        left: "80%",
        width: "8%",
        height: "10%",
        hoverText: "Investigate fence post",
        onClick: () => {
          if (profile?.inventory.includes("Torn ID Tag")) {
            return { text: "Nothing left but rusted wire and glowing purple residue." };
          }
          return {
            text: "You found a military tag snagged on the barbed wire fence. It belongs to Private Choi, crusted with a bright, glassy purple residue. Secured the Torn ID Tag!",
            pickUpItem: "Torn ID Tag",
          };
        },
      },
    ],
    STORAGE: [
      {
        id: "sung-ki",
        name: "Outcast Sung-ki",
        top: "35%",
        left: "48%",
        width: "18%",
        height: "30%",
        hoverText: "Speak with Sung-ki",
        onClick: () => {
          if (!profile) return { text: "Error loading user clearance." };
          const hasTokens = profile.tokenBalance >= 5000;
          if (hasTokens) {
            return {
              text: "Sung-ki: 'I've deciphered the signal. It's a cosmic beacon loop. The beacon is coming from this very substation! Someone here is broadcasting our bio-signatures. They are trying to feed us to the humanoid creature in the forest.'",
            };
          } else {
            return {
              text: "Sung-ki: 'This terminal is processing telemetry arrays. Go away unless you have 5,000 $NAHOPE tokens.'",
            };
          }
        },
      },
      {
        id: "workbench",
        name: "Substation Workbench",
        top: "60%",
        left: "2%",
        width: "45%",
        height: "38%",
        hoverText: "Search Workbench",
        onClick: () => {
          const hasScrewdriver = profile?.inventory.includes("Screwdriver");
          const hasKey = profile?.inventory.includes("Cabinet Key");

          if (hasScrewdriver && hasKey) {
            return { text: "The workbench is empty, scattered with old blueprints, copper wires and dust." };
          }

          let responseText = "You searched the drawer of the workbench. ";
          let pickedItem = "";

          if (!hasScrewdriver && !hasKey) {
            responseText += "You found a heavy flathead Screwdriver and a small Cabinet Key!";
            pickedItem = "BOTH";
          } else if (!hasScrewdriver) {
            responseText += "You found a heavy flathead Screwdriver!";
            pickedItem = "Screwdriver";
          } else if (!hasKey) {
            responseText += "You found a small Cabinet Key!";
            pickedItem = "Cabinet Key";
          }

          return {
            text: responseText,
            pickUpItem: pickedItem,
          };
        },
      },
      {
        id: "locked-cabinet",
        name: "Locked Weapon Cabinet",
        top: "18%",
        left: "72%",
        width: "26%",
        height: "80%",
        hoverText: "Open Weapon Cabinet",
        onClick: (item) => {
          if (profile?.inventory.includes("80s Radio")) {
            return { text: "The weapon cabinet is open. You've already taken the 80s Radio." };
          }
          if (item === "Cabinet Key") {
            return {
              text: "⚡ [Synergy Success] You inserted the Cabinet Key. The lock turns with a rusty screech! Inside is a working military-grade 80s Radio.",
              pickUpItem: "80s Radio",
            };
          }
          return {
            text: "A locked steel ammunition cabinet labeled 'COMMUNICATION GEAR'. You need a key to open it.",
          };
        },
      },
    ],
  };

  const handleHotspotClick = async (h: GameHotspot) => {
    playSound("dissonant");
    const result = h.onClick(activeItem);

    setCurrentText(result.text);
    setLogs((p) => [...p, `[ACTION] Checked ${h.name}.`, `[TEXT] ${result.text}`]);

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
    let description = "";
    if (room === "OFFICE") {
      description = "You are inside the police substation office. Chief Bum-seok is sitting at his desk. A heavy fog covers the window.";
    } else if (room === "FRONT_YARD") {
      description = "You are in the forest yard outside Hopo Outpost. Barbed wire fences line the perimeter. Officer Sung-ae is standing guard.";
    } else if (room === "STORAGE") {
      description = "You enter the dark storage room. Outcast Sung-ki is typing on a glowing terminal screen. Metal cabinets line the walls.";
    }
    setCurrentText(description);
    setLogs((p) => [...p, `[MOVE] Entered ${room.replace("_", " ")}.`]);
  };

  const ITEM_SYMBOLS: Record<string, string> = {
    "Screwdriver": "⚙",
    "Cabinet Key": "⬡",
    "80s Radio": "◎",
    "Torn ID Tag": "≡",
    "Green Alien Slime": "Ω",
  };

  const ITEM_IMAGES: Record<string, string> = {
    "Screwdriver": "/images/items/screwdriver.png",
    "Cabinet Key": "/images/items/cabinet_key.png",
    "80s Radio": "/images/items/80s_radio.png",
    "Torn ID Tag": "/images/items/torn_id_tag.png",
    "Green Alien Slime": "/images/items/green_alien_slime.png",
  };

  const currentDiscovery = discoveryQueue[0] ?? null;

  return (
    <div className="fixed inset-x-0 top-[56px] bottom-[88px] md:top-[72px] md:bottom-0 flex flex-col bg-black text-gray-200 p-4 font-mono select-none overflow-hidden touch-none">

      {/* Top Title Banner */}
      <div className="text-center text-[10px] text-neon-pink mb-2 tracking-widest uppercase animate-pulse">
        ⚠️ PROTOCOL OMEGA: EPISODE 1 - THE COGNITIVE SEARCH INTERACTIVE ⚠️
      </div>

      {/* MOBILE TABS HEADER */}
      <div className="md:hidden flex border-b border-space-850 mb-3 text-xs bg-space-950/80 rounded-xl overflow-hidden p-1 gap-1">
        <button
          onClick={() => setMobileTab("canvas")}
          className={`flex-1 py-2 rounded-lg font-bold transition-all ${mobileTab === "canvas" ? "bg-neon-pink text-white" : "text-gray-400"
            }`}
        >
          🎮 GAME SCREEN
        </button>
        <button
          onClick={() => setMobileTab("logs")}
          className={`flex-1 py-2 rounded-lg font-bold transition-all ${mobileTab === "logs" ? "bg-neon-purple text-white" : "text-gray-400"
            }`}
        >
          📝 LOGS ({logs.length})
        </button>
        <button
          onClick={() => setMobileTab("inventory")}
          className={`flex-1 py-2 rounded-lg font-bold transition-all ${mobileTab === "inventory" ? "bg-alien-cyan text-black" : "text-gray-400"
            }`}
        >
          🎒 INVENTORY ({profile?.inventory.length || 0})
        </button>
      </div>

      {/* Main Board Layout */}
      <div className="flex flex-1 gap-4 overflow-hidden h-[calc(100%-80px)]">

        {/* LEFT COLUMN: Terminal Logs (25% - Hidden on mobile unless active) */}
        <div
          className={`${mobileTab === "logs" ? "flex" : "hidden"
            } md:flex w-full md:w-1/4 border-2 border-space-800 bg-[#080112] rounded-xl p-3 flex-col justify-between overflow-hidden relative shadow-[0_0_20px_rgba(216,0,255,0.05)]`}
        >
          <div className="crt-scanlines absolute inset-0 opacity-[0.04] pointer-events-none" />
          <div ref={logContainerRef} className="flex flex-col gap-2 h-full overflow-y-auto pr-1 touch-auto">
            <span className="text-[9px] text-gray-500 border-b border-space-850 pb-1.5 uppercase">
              // TELEMETRY TERMINAL LOG
            </span>
            <div className="flex flex-col gap-2.5 text-[10px] text-term-green">
              {logs.map((log, idx) => (
                <div key={idx} className="border-b border-space-950 pb-1.5 leading-relaxed">
                  {log}
                </div>
              ))}
            </div>
          </div>
          <span className="text-[8px] text-gray-600 border-t border-space-850 pt-2 text-center">
            SYSTEM STATUS: MONITORING SIGNALS
          </span>
        </div>

        {/* CENTER COLUMN: Point-and-Click Canvas (50% - Hidden on mobile unless active) */}
        <div
          className={`${mobileTab === "canvas" ? "flex" : "hidden"
            } md:flex w-full md:w-1/2 border-2 border-space-700 bg-space-950 rounded-xl relative flex-col items-center justify-between overflow-hidden`}
        >
          <div className="crt-scanlines absolute inset-0 opacity-[0.06] pointer-events-none z-10" />

          {/* Navigation Overlay */}
          <div className="absolute top-3 left-3 right-3 z-20 flex gap-2 justify-between pointer-events-auto">
            <div className="flex gap-1.5 bg-space-950/95 border border-space-800 px-3 py-1.5 rounded-lg items-center text-[10px] font-bold">
              <Compass className="w-3.5 h-3.5 text-neon-pink" />
              <span>ROOM: <span className="text-white font-bold">{currentRoom.replace("_", " ")}</span></span>
            </div>

            <div className="flex gap-2">
              {currentRoom !== "FRONT_YARD" && (
                <button
                  onClick={() => changeRoom("FRONT_YARD")}
                  className="bg-space-900 border border-space-700 hover:border-neon-pink text-white hover:text-neon-pink px-2.5 py-1.5 rounded-lg text-[9px] font-bold transition-colors cursor-pointer"
                >
                  MOVE OUTSIDE
                </button>
              )}
              {currentRoom !== "OFFICE" && (
                <button
                  onClick={() => changeRoom("OFFICE")}
                  className="bg-space-900 border border-space-700 hover:border-neon-pink text-white hover:text-neon-pink px-2.5 py-1.5 rounded-lg text-[9px] font-bold transition-colors cursor-pointer"
                >
                  GO TO OFFICE
                </button>
              )}
              {currentRoom !== "STORAGE" && (
                <button
                  onClick={() => changeRoom("STORAGE")}
                  className="bg-space-900 border border-space-700 hover:border-neon-pink text-white hover:text-neon-pink px-2.5 py-1.5 rounded-lg text-[9px] font-bold transition-colors cursor-pointer"
                >
                  ENTER BACKROOM
                </button>
              )}
            </div>
          </div>

          {/* Core Interactive Backdrop */}
          <div
            style={{ touchAction: "manipulation" }}
            className="relative w-full flex-1 flex items-center justify-center bg-black mt-14 overflow-hidden border-b border-space-900 select-none touch-manipulation"
          >

            {/* Background Image depending on currentRoom */}
            <img
              src={
                currentRoom === "OFFICE"
                  ? "/images/substation_office.png"
                  : currentRoom === "FRONT_YARD"
                    ? "/images/hopo_farm_road_bg.png"
                    : "/images/substation_storage.png"
              }
              alt={currentRoom}
              className="absolute inset-0 w-full h-full object-cover opacity-80 transition-all duration-500 z-0 select-none pointer-events-none"
            />

            {/* Dark vignette overlay */}
            <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#040108]/30 to-[#040108]/90 z-1 pointer-events-none" />

            {/* Visual outlines for objects/hotspots */}
            <div className="absolute inset-0 z-10 pointer-events-auto">
              {hotspots[currentRoom].map((spot) => (
                <button
                  key={spot.id}
                  onMouseEnter={() => playSound("beep")}
                  onClick={() => handleHotspotClick(spot)}
                  className="absolute border border-dashed border-white/10 hover:border-neon-pink bg-white/0 hover:bg-neon-pink/10 transition-all rounded cursor-crosshair-target flex items-center justify-center group/spot"
                  style={{
                    top: spot.top,
                    left: spot.left,
                    width: spot.width,
                    height: spot.height,
                  }}
                >
                  <span className="hidden group-hover/spot:inline text-[8px] font-mono text-neon-pink bg-[#040108]/95 border border-neon-pink/60 px-2 py-1 rounded absolute -top-7 whitespace-nowrap shadow-[0_0_10px_rgba(255,0,127,0.6)] animate-pulse">
                    {spot.hoverText}
                  </span>
                  <span className="w-1.5 h-1.5 bg-neon-pink rounded-full opacity-0 group-hover/spot:opacity-100 transition-opacity animate-ping" />
                </button>
              ))}
            </div>

            {/* HUD Status label */}
            <div className="absolute bottom-2 right-2 z-10 font-mono text-[8px] text-gray-500 uppercase tracking-widest bg-black/45 px-1.5 py-0.5 rounded border border-white/5 pointer-events-none">
              FEED ACTIVE: {currentRoom.replace("_", " ")}
            </div>
          </div>

          {/* Lower Story Text Box */}
          <div className="w-full bg-[#080112] border-t-2 border-space-850 p-4 h-[120px] shrink-0 relative z-20 flex flex-col gap-1 text-[11px] leading-relaxed text-term-amber">
            <span className="text-[8px] text-gray-500 font-bold uppercase tracking-wider mb-0.5">
              // SEARCH LOG DIALOGUE
            </span>
            <p className="flex-1 font-sans overflow-y-auto touch-auto">{currentText}</p>
          </div>
        </div>

        {/* RIGHT COLUMN: UGC Inventory (25% - Hidden on mobile unless active) */}
        <div
          className={`${mobileTab === "inventory" ? "flex" : "hidden"
            } md:flex w-full md:w-1/4 border-2 border-space-800 bg-[#0a0114] rounded-xl p-3 flex-col justify-between overflow-hidden relative shadow-[0_0_20px_rgba(216,0,255,0.05)]`}
        >
          <div className="crt-scanlines absolute inset-0 opacity-[0.04] pointer-events-none" />

          <div className="flex flex-col gap-3 h-full overflow-y-auto pr-1">
            <div className="border-b border-space-850 pb-2 flex justify-between items-center">
              <span className="text-[9px] text-gray-500 uppercase font-mono tracking-widest">
                // ARTIFACT DECK
              </span>
              <span className="text-[9px] text-neon-pink font-bold">
                {profile?.inventory.length || 0} / 5
              </span>
            </div>

            {/* Inventory Items list */}
            <div className="flex flex-col gap-2.5">
              {["Screwdriver", "Cabinet Key", "80s Radio", "Torn ID Tag", "Green Alien Slime"].map((item) => {
                const isSecured = profile?.inventory.includes(item);
                const isActive = activeItem === item;

                return (
                  <button
                    key={item}
                    disabled={!isSecured}
                    onClick={() => {
                      playSound("beep");
                      setActiveItem(isActive ? null : item);
                    }}
                    className={`border text-left rounded-xl p-2 flex gap-3 items-center transition-all ${isSecured
                      ? isActive
                        ? "bg-neon-pink/15 border-neon-pink shadow-[0_0_12px_rgba(255,0,127,0.2)]"
                        : "bg-space-950 border-space-850 hover:border-space-700 cursor-pointer"
                      : "bg-space-950/20 border-space-900 border-dashed opacity-35 cursor-not-allowed"
                      }`}
                  >
                    <div className="w-10 h-10 rounded-lg bg-black/40 border border-space-800 flex items-center justify-center overflow-hidden shrink-0">
                      {isSecured ? (
                        <img src={ITEM_IMAGES[item]} alt={item} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-gray-700 text-[10px] font-bold">LKD</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center w-full">
                        <span className={`text-[10px] font-bold truncate ${isActive ? "text-neon-pink" : "text-white"}`}>
                          {item}
                        </span>
                        {isActive && <Check className="w-3 h-3 text-neon-pink shrink-0 ml-1" />}
                      </div>
                      {isSecured && (
                        <span className="text-[8px] font-mono text-gray-500 uppercase tracking-widest mt-0.5 block truncate">
                          {isActive ? "[ EQUIPPED ]" : "[ CLICK TO EQUIP ]"}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="border-t border-space-850 pt-2 text-[9px] text-gray-600 flex justify-between uppercase">
            <span>SLOTS: READY</span>
            <span>UGC SYSTEM LOCK</span>
          </div>
        </div>

      </div>

      {/* BOTTOM STATUS BAR */}
      <div className="w-full bg-[#080112] border-2 border-space-850 rounded-xl px-4 py-2 mt-3 flex flex-col sm:flex-row justify-between items-center gap-2 font-mono text-[9px] text-gray-400 relative overflow-hidden shadow-inner">
        <div className="crt-scanlines absolute inset-0 opacity-[0.04] pointer-events-none" />

        <div className="flex items-center gap-1.5 relative z-10">
          <span className="w-1.5 h-1.5 rounded-full bg-term-green animate-ping" />
          <span>NETWORK: <span className="text-term-green font-bold">SOLANA CLOUD ACTIVE</span></span>
        </div>

        <div className="relative z-10 text-center sm:text-left">
          CLEARANCE LEVEL: <span className="text-white font-bold">{profile && profile.tokenBalance >= 5000 ? "SECRET (>=5000)" : "RESTRICTED (<5000)"}</span>
        </div>

        <div className="flex items-center gap-3 relative z-10">
          <span>BALANCE: <span className="text-alien-cyan font-bold">{profile?.tokenBalance.toLocaleString()} $NAHOPE</span></span>
          <span className="text-gray-700">|</span>
          <span className="text-neon-pink font-bold">EPISODE 01</span>
        </div>
      </div>

      {/* Item Discovery Modal — z-50, always takes priority over end overlay */}
      {discoveryQueue.length > 0 && (
        <div className="fixed inset-0 z-50 bg-[#040108]/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative max-w-xs w-full bg-[#080112] border-2 border-alien-cyan/60 rounded-2xl p-6 font-mono shadow-[0_0_50px_rgba(0,255,200,0.12)] flex flex-col gap-4">
            <div className="crt-scanlines absolute inset-0 opacity-[0.06] pointer-events-none rounded-2xl" />

            {/* Header */}
            <div className="flex items-center gap-2 border-b border-space-800 pb-3 relative z-10">
              <span className="w-2 h-2 bg-alien-cyan rounded-full animate-ping shrink-0" />
              <span className="text-[9px] text-alien-cyan uppercase tracking-widest font-bold">// ARTIFACT ACQUIRED</span>
            </div>

            {/* Item display */}
            <div className="flex flex-col items-center gap-3 py-5 border border-dashed border-alien-cyan/30 rounded-xl bg-space-900/60 relative z-10 w-full px-4">
              <div className="w-24 h-24 rounded-xl border border-alien-cyan/40 bg-black/60 flex items-center justify-center shadow-[0_0_20px_rgba(0,255,200,0.15)] overflow-hidden">
                <img src={ITEM_IMAGES[currentDiscovery]} alt={currentDiscovery} className="w-full h-full object-cover" />
              </div>
              <span className="text-base font-bold text-white text-center px-2 leading-snug">{currentDiscovery}</span>
              <span className="text-[8px] text-gray-500 uppercase tracking-widest">SECURED TO ARTIFACT DECK</span>
            </div>

            {/* Inventory count */}
            <div className="flex justify-between items-center text-[9px] text-gray-600 relative z-10">
              <span>ARTIFACT DECK</span>
              <span className="text-alien-cyan font-bold">{profile?.inventory.length ?? 0} / 5 SLOTS FILLED</span>
            </div>

            {/* Confirm button */}
            <button
              onClick={dismissDiscovery}
              className="w-full bg-alien-cyan/10 hover:bg-alien-cyan/20 border border-alien-cyan/40 hover:border-alien-cyan text-alien-cyan font-bold py-3 rounded-xl text-[10px] uppercase tracking-widest transition-all cursor-pointer relative z-10 shadow-[0_0_15px_rgba(0,255,200,0.05)]"
            >
              [ CONFIRM ACQUISITION ]
            </button>
          </div>
        </div>
      )}

      {/* WALLET CONNECT MODAL */}
      <WalletConnectModal
        isOpen={showWalletModal}
        onClose={() => setShowWalletModal(false)}
        onSuccess={() => setShowWalletModal(false)}
        reason="episode2"
      />

      {/* Episode complete overlay — only when no discovery modal is queued */}
      {showEndOverlay && discoveryQueue.length === 0 && (
        <div className="fixed inset-0 z-50 bg-[#040108]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="crt-screen max-w-xl w-full rounded-2xl p-6 border-2 border-neon-pink/40 shadow-[0_0_40px_rgba(255,0,127,0.2)] relative flex flex-col gap-5 font-mono text-gray-200 text-left">
            <div className="crt-scanlines absolute inset-0 opacity-[0.08] pointer-events-none" />

            {/* Header */}
            <div className="flex items-center justify-between border-b border-space-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-alert-red animate-ping" />
                <h2 className="text-xs sm:text-sm font-bold text-neon-pink uppercase tracking-widest">
                  PROTOCOL OMEGA: DECIPHER COMPLETE
                </h2>
              </div>
              <span className="text-[10px] text-gray-500 font-bold">STATUS: TERMINATED</span>
            </div>

            {/* Dossier Body */}
            <div className="flex flex-col gap-4 text-xs leading-relaxed">
              <div className="bg-space-950/60 p-4 border border-space-900 rounded-xl flex flex-col gap-3">
                <span className="text-[9px] text-neon-purple font-bold tracking-widest uppercase">
                  // DECLASSIFIED SIGNAL ANALYSIS //
                </span>
                <p className="text-gray-300 font-sans">
                  The <span className="text-alien-cyan font-bold">Green Alien Slime</span> scraped from the typewriter was the final link.
                  By injecting its molecular resonance data into the 80s military radio, the glitched radar suddenly resolves...
                </p>
                <p className="text-gray-300 font-sans">
                  Officer Bum-seok stares at the pulsing CRT screen, his eyes hollow and dead.
                  <span className="text-term-amber font-mono italic"> &quot;아이복판이 죽어 있냐 씨 (Are its eyes dead, damn)...&quot; </span>
                  he whispers as the power grid short-circuits.
                </p>
                <p className="text-gray-300 font-sans border-t border-space-900/60 pt-2.5">
                  The incoming signal wasn&apos;t an SOS from the mainland. It was an orbital beacon broadcasting the outpost&apos;s bio-signatures.
                  Outcast Sung-ki has disappeared into the freezing fog of the DMZ, and a towering, dark humanoid silhouette is rising from the coastal waters of Hopo Port.
                </p>
              </div>

              {/* Status and Gate requirement */}
              <div className="border border-dashed border-space-800 rounded-xl p-3 bg-space-900/40 flex flex-col gap-2">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-gray-500 font-bold uppercase">NEXT STAGE:</span>
                  <span className="text-white font-bold text-neon-purple tracking-wider uppercase text-[10px]">EPISODE 02: DISCONNECTED SIGNALS</span>
                </div>
                <div className="flex justify-between items-center text-[10px] border-t border-space-950 pt-2">
                  <span className="text-gray-500 font-bold uppercase">REQUIRED CLEARANCE:</span>
                  <span className="text-alien-cyan font-bold">5,000 $NAHOPE TOKENS</span>
                </div>
                <div className="flex justify-between items-center text-[10px] border-t border-space-950 pt-2">
                  <span className="text-gray-500 font-bold uppercase">YOUR BALANCE:</span>
                  <span className={`font-bold ${profile && profile.tokenBalance >= 5000 ? "text-term-green" : "text-alert-red"}`}>
                    {profile?.tokenBalance.toLocaleString() || "0"} $NAHOPE
                  </span>
                </div>
                <div className="flex justify-between items-center text-[10px] border-t border-space-950 pt-2">
                  <span className="text-gray-500 font-bold uppercase">WALLET:</span>
                  {connected ? (
                    <span className="text-term-green font-bold uppercase">// CONNECTED //</span>
                  ) : (
                    <span className="text-alert-red font-bold uppercase">// NOT CONNECTED //</span>
                  )}
                </div>
                <div className="flex justify-between items-center text-[10px] border-t border-space-950 pt-2">
                  <span className="text-gray-500 font-bold uppercase">STAGE ACCESS:</span>
                  {connected && profile && profile.tokenBalance >= 5000 ? (
                    <span className="text-term-green font-bold uppercase animate-pulse">// ACCESS GRANTED //</span>
                  ) : (
                    <span className="text-alert-red font-bold uppercase animate-pulse">// ACCESS DENIED //</span>
                  )}
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-2 mt-2">
              <Link
                href="/community"
                onClick={() => {
                  playSound("unlock");
                  hasClosedOverlay.current = true;
                  setShowEndOverlay(false);
                }}
                className="w-full bg-gradient-to-r from-neon-pink to-neon-purple hover:scale-[1.01] active:scale-[0.99] text-white font-bold py-3 px-4 rounded-xl text-center text-xs tracking-wider transition-all shadow-[0_0_15px_rgba(255,0,127,0.2)] border border-white/10 uppercase"
              >
                PROPOSE PART 2 STORY TO NA HONG-JIN (GO TO COMMUNITY)
              </Link>

              <div className="grid grid-cols-2 gap-2">
                {!connected && (
                  <button
                    onClick={() => setShowWalletModal(true)}
                    className="col-span-2 flex items-center justify-center gap-2 bg-space-900 border border-neon-purple/30 hover:border-neon-purple/60 text-neon-purple font-bold py-2.5 px-4 rounded-xl text-[10px] tracking-wider transition-colors cursor-pointer uppercase"
                  >
                    <Wallet className="w-3.5 h-3.5" />
                    CONNECT WALLET FOR EP.2
                  </button>
                )}
                <button
                  onClick={() => {
                    playSound("move");
                    hasClosedOverlay.current = true;
                    setShowEndOverlay(false);
                  }}
                  className="bg-space-950 border border-space-850 hover:border-gray-500 text-gray-400 hover:text-white font-bold py-2.5 px-4 rounded-xl text-center text-[10px] tracking-wider transition-colors cursor-pointer uppercase"
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
