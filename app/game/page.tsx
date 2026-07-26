"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useWallet } from "@solana/wallet-adapter-react";

import { database, UserProfile } from "../../lib/firebase";
import WalletConnectModal from "../../components/WalletConnectModal";
import GameShell from "../../components/game/GameShell";
import PlateCanvas from "../../components/game/PlateCanvas";
import Dossier from "../../components/game/Dossier";
import EvidenceBoard from "../../components/game/EvidenceBoard";
import { useGameState } from "../../lib/game/state";
import { EPISODE_1 } from "../../lib/game/episode1";
import { EPISODE_2 } from "../../lib/game/episode2";
import { EPISODE_3 } from "../../lib/game/episode3";
import { EPISODE_4 } from "../../lib/game/episode4";
import type { GameDefinition, ItemId, SceneId } from "../../lib/game/types";
import { play as playSound, startBgm, stopBgm } from "../../lib/game/sound";
import { useLanguage } from "../../lib/i18n";
import {
  getEndingCopy,
  getItemCopy,
  getSceneCopy,
  localizeGameLog,
  localizeGameRole,
} from "../../lib/game/i18n";

const EP3_GATE = 20_000;
const EP4_GATE = 100_000;
const EPISODE_DEFINITIONS: Record<GameDefinition["number"], GameDefinition> = {
  1: EPISODE_1,
  2: EPISODE_2,
  3: EPISODE_3,
  4: EPISODE_4,
};
const RARE_ARTIFACT_NAMES = new Set([
  "Carcass Photograph",
  "Unknown Track Cast",
  "Unknown Subject Case File",
  "Bamigir Encounter Photograph",
  "Unfired Cartridge",
  "Forest Withdrawal Route",
  "Silver Hull Fragment",
  "First-shot Causality Report",
  "Kali Evidence Photograph",
  "Yang-bae's Statement",
  "Civilian Evacuation Manifest",
  "Civilian Safe Route",
  "Wordless Contact Record",
  "Kali Medical Status Record",
  "The Wordless Return",
]);
const LEGACY_EP1_ARTIFACTS = new Set([
  "Omega Mark",
  "Ω Mark (Apostate)",
  "Green Alien Slime",
  "Translator Fragment",
  "Disturbed Cookware Photograph",
  "Coastal Cookware Photograph",
]);

type EpisodeAccess = {
  status: "idle" | "checking" | "verified" | "denied" | "error";
  balance: number | null;
};

type GatedEpisodeNumber = 3 | 4;

const GATE_CONFIG: Record<GatedEpisodeNumber, {
  prerequisiteEpisode: 2 | 3;
  requiredBalance: number;
  description: string;
}> = {
  3: { prerequisiteEpisode: 2, requiredBalance: EP3_GATE, description: "The civilian corridor is classified. Complete the mountain case and verify the required wallet balance to enter." },
  4: { prerequisiteEpisode: 3, requiredBalance: EP4_GATE, description: "The final archive requires an Episode 3 clear, three retained Hopo artifacts, and server-verified Elite Defender holdings." },
};

function isGatedEpisode(number: GameDefinition["number"]): number is GatedEpisodeNumber {
  return number === 3 || number === 4;
}

function walletReason(number: GameDefinition["number"]): "episode2" | "episode3" | "episode4" {
  if (number === 4) return "episode4";
  return number === 3 ? "episode3" : "episode2";
}

export default function GamePage() {
  const [episodeNumber, setEpisodeNumber] = useState<GameDefinition["number"]>(1);

  useEffect(() => {
    const requested = Number(new URLSearchParams(window.location.search).get("episode"));
    if (requested !== 2 && requested !== 3 && requested !== 4) return;
    const timer = window.setTimeout(() => setEpisodeNumber(requested), 0);
    return () => window.clearTimeout(timer);
  }, []);

  const definition = EPISODE_DEFINITIONS[episodeNumber];
  const changeEpisode = (episode: GameDefinition["number"]) => {
    const url = episode === 1 ? "/game" : `/game?episode=${episode}`;
    window.history.replaceState(null, "", url);
    setEpisodeNumber(episode);
  };

  return <EpisodeRuntime key={definition.id} definition={definition} onEpisodeChange={changeEpisode} />;
}

function EpisodeRuntime({ definition, onEpisodeChange }: { definition: GameDefinition; onEpisodeChange: (episode: GameDefinition["number"]) => void }) {
  const { language } = useLanguage();
  const { connected, publicKey } = useWallet();
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [episodeAccess, setEpisodeAccess] = useState<EpisodeAccess>({ status: "idle", balance: null });
  const [balanceRefresh, setBalanceRefresh] = useState(0);
  const [mobileTab, setMobileTab] = useState<"plate" | "dossier" | "deck">("plate");
  const [bgmEnabled, setBgmEnabled] = useState(false);

  const { state, ending, inspect, move, equip, reset } = useGameState(definition);

  const [discoveredItems, setDiscoveredItems] = useState<ItemId[]>([]);
  const [discoveryLog, setDiscoveryLog] = useState<{ role: string; text: string } | null>(null);

  const prevInventoryRef = useRef<ItemId[]>([]);
  const isFirstRender = useRef(true);

  // Sync state.inventory and detect discoveries
  useEffect(() => {
    if (isFirstRender.current) {
      prevInventoryRef.current = state.inventory;
      isFirstRender.current = false;
      return;
    }

    const prevInventory = prevInventoryRef.current;
    if (state.inventory.length < prevInventory.length) {
      prevInventoryRef.current = state.inventory;
      return;
    }

    const newItems = state.inventory.filter((id) => !prevInventory.includes(id));
    if (newItems.length > 0) {
      setDiscoveredItems(newItems);
      const lastLog = state.logs[state.logs.length - 1];
      setDiscoveryLog(lastLog ? { role: lastLog.role, text: lastLog.text } : null);
    }
    prevInventoryRef.current = state.inventory;
  }, [state.inventory, state.logs]);

  // Sync the local Firebase profile after wallet and progress updates.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const sync = () => {
      const wallet = localStorage.getItem("active_wallet_address") || "Hopo...7XzP";
      setProfile(database.getUserProfile(wallet));
    };
    sync();
    window.addEventListener("storage", sync);
    window.addEventListener("profileUpdated", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("profileUpdated", sync);
    };
  }, []);


  // Gated episode balances are authorized by a server-side Solana RPC check.
  useEffect(() => {
    if (!isGatedEpisode(definition.number) || !connected || !publicKey) return;

    const controller = new AbortController();
    const checkingTimer = window.setTimeout(
      () => setEpisodeAccess({ status: "checking", balance: null }),
      0,
    );
    void fetch(`/api/episode-access?episode=${definition.number}&wallet=${encodeURIComponent(publicKey.toBase58())}`, {
      cache: "no-store",
      signal: controller.signal,
    })
      .then(async (response) => {
        if (!response.ok) throw new Error(`Access verification failed (${response.status})`);
        return response.json() as Promise<{ balance: number; granted: boolean }>;
      })
      .then(({ balance, granted }) => {
        setEpisodeAccess({ status: granted ? "verified" : "denied", balance });
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setEpisodeAccess({ status: "error", balance: null });
      });

    return () => {
      window.clearTimeout(checkingTimer);
      controller.abort();
    };
  }, [balanceRefresh, connected, definition.number, publicKey]);

  // Manage background music playback based on user toggle.
  useEffect(() => {
    if (bgmEnabled) {
      startBgm();
    } else {
      stopBgm();
    }
    return () => {
      stopBgm();
    };
  }, [bgmEnabled]);

  // Persist episode artifacts and the versioned completion record.
  useEffect(() => {
    if (!ending) return;
    const wallet = localStorage.getItem("active_wallet_address") || "Hopo...7XzP";
    const current = database.getUserProfile(wallet);
    const artifactNames = (ending.grantsArtifacts ?? [])
      .map((id) => definition.items[id]?.name)
      .filter((name): name is string => Boolean(name));
    const retainedInventory = definition.id === "ep1"
      ? (current.inventory ?? []).filter((name) => !LEGACY_EP1_ARTIFACTS.has(name))
      : (current.inventory ?? []);
    const inventory = Array.from(new Set([...retainedInventory, ...artifactNames]));
    const endingKey = `${definition.id}_${ending.id}`;
    const completedEndings = new Set(current.completedEndings ?? []);
    completedEndings.add(endingKey);
    if (definition.successfulEndings.includes(ending.id)) completedEndings.add(`${definition.id}_clear`);

    const progress = {
      version: definition.version,
      endingId: ending.id,
      flags: state.flags,
      lostItems: state.lostItems,
      completedAt: Date.now(),
    };
    const priorProgress = current[definition.id];
    const alreadyRecorded =
      priorProgress?.endingId === ending.id &&
      priorProgress?.version === definition.version &&
      inventory.length === (current.inventory ?? []).length &&
      (current.completedEndings ?? []).includes(endingKey);
    if (alreadyRecorded) return;

    const next: UserProfile = {
      ...current,
      inventory,
      completedEndings: Array.from(completedEndings),
      [definition.id]: progress,
    };
    void database.saveUserProfile(wallet, next).then(() => {
      setProfile(next);
      window.dispatchEvent(new Event("profileUpdated"));
    });
  }, [definition, ending, state.flags, state.lostItems]);

  const scene = getSceneCopy(state.scene, language, definition.scenes[state.scene]);
  const activeItem = state.activeItem ? definition.items[state.activeItem] : null;
  const activeItemCopy = state.activeItem && activeItem
    ? getItemCopy(state.activeItem, language, activeItem)
    : null;
  const endingCopy = ending ? getEndingCopy(ending.id, language, ending) : null;

  const neighbors = useMemo(() => {
    return scene.exits.map((id: SceneId) => {
      const target = definition.scenes[id];
      const targetCopy = getSceneCopy(id, language, target);
      const locked = !!(target.lockedUntil && !state.flags.includes(target.lockedUntil));
      return { id, title: targetCopy.title.split("·").pop()?.trim() ?? id, locked };
    });
  }, [definition.scenes, language, scene, state.flags]);

  const handleHotspot = (hotspotId: string) => inspect(scene.id, hotspotId);

  // Used by PlateCanvas to dim/glitch hotspots that don't accept the current active item.
  const isHotspotValid = (hotspotId: string): boolean => {
    if (!state.activeItem) return true;
    return definition.interactions.some(
      (rule) =>
        rule.scene === scene.id &&
        rule.hotspot === hotspotId &&
        rule.requires?.item === state.activeItem &&
        !(rule.once && state.firedOnce.includes(rule.id)),
    );
  };


  const gate = isGatedEpisode(definition.number) ? GATE_CONFIG[definition.number] : null;
  const prerequisiteEpisode = gate?.prerequisiteEpisode ?? 1;
  const prerequisiteCleared = gate
    ? (profile?.completedEndings?.includes(`ep${prerequisiteEpisode}_clear`) ?? false)
    : true;
  const rareArtifactCount = profile?.inventory.reduce(
    (count, name) => count + (RARE_ARTIFACT_NAMES.has(name) ? 1 : 0),
    0,
  ) ?? 0;
  const artifactThresholdMet = definition.number !== 4 || rareArtifactCount >= 3;
  const hasRequiredBalance = episodeAccess.status === "verified";
  const episodeUnlocked = !gate || (connected && prerequisiteCleared && hasRequiredBalance && artifactThresholdMet);
  const verifiedBalance = episodeAccess.balance ?? 0;

  if (gate && !episodeUnlocked) {
    const balanceLabel = episodeAccess.status === "checking"
      ? "Checking $NAHOPE balance on Solana"
      : episodeAccess.status === "error"
        ? "Server balance verification unavailable"
        : `${verifiedBalance.toLocaleString()} / ${gate.requiredBalance.toLocaleString()} $NAHOPE server verified`;
    const requirements = [
      { label: "Wallet connected", met: connected },
      { label: `Episode ${prerequisiteEpisode} cleared`, met: prerequisiteCleared },
      ...(definition.number === 4 ? [{ label: `${rareArtifactCount} / 3 rare Hopo artifacts retained`, met: artifactThresholdMet }] : []),
      { label: balanceLabel, met: hasRequiredBalance },
    ];

    return (
      <main style={{ minHeight: "100vh", background: "var(--bg-0)", color: "var(--text-1)", display: "grid", placeItems: "center", padding: 24 }}>
        <section style={{ width: "min(560px, 100%)", border: "1px solid var(--acc-violet)", padding: 28, fontFamily: "var(--font-mono)", background: "rgba(5,7,10,0.96)" }}>
          <div style={{ color: "var(--acc-violet)", fontSize: 11, letterSpacing: "0.22em", marginBottom: 12 }}>EPISODE {definition.number} ACCESS</div>
          <h1 style={{ margin: "0 0 10px", fontSize: 24, letterSpacing: "0.06em" }}>{definition.title.toUpperCase()}</h1>
          <p style={{ color: "var(--text-2)", fontSize: 12, lineHeight: 1.7, marginBottom: 20 }}>
            {gate.description}
          </p>
          <div style={{ display: "grid", gap: 8, marginBottom: 22 }}>
            {requirements.map((requirement) => (
              <div key={requirement.label} style={{ border: `1px solid ${requirement.met ? "var(--acc-primary)" : "var(--line-bright)"}`, color: requirement.met ? "var(--acc-primary)" : "var(--text-2)", padding: "9px 11px", fontSize: 11, letterSpacing: "0.1em" }}>
                [{requirement.met ? "VERIFIED" : "LOCKED"}] {requirement.label.toUpperCase()}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {!connected && (
              <button onClick={() => setShowWalletModal(true)} style={{ flex: "1 1 180px", padding: "11px 14px", border: "1px solid var(--acc-primary)", background: "transparent", color: "var(--acc-primary)", cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.16em" }}>
                CONNECT WALLET
              </button>
            )}
            {connected && !hasRequiredBalance && episodeAccess.status !== "checking" && (
              <button onClick={() => setBalanceRefresh((value) => value + 1)} style={{ flex: "1 1 180px", padding: "11px 14px", border: "1px solid var(--acc-violet)", background: "transparent", color: "var(--acc-violet)", cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.16em" }}>
                VERIFY BALANCE
              </button>
            )}
            <button onClick={() => onEpisodeChange(prerequisiteEpisode)} style={{ flex: "1 1 180px", padding: "11px 14px", border: "1px solid var(--line-bright)", background: "transparent", color: "var(--text-1)", cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.16em" }}>
              PLAY EPISODE {prerequisiteEpisode}
            </button>
          </div>
        </section>
        <WalletConnectModal
          isOpen={showWalletModal}
          onClose={() => setShowWalletModal(false)}
          onSuccess={() => setShowWalletModal(false)}
          reason={walletReason(definition.number)}
        />
      </main>
    );
  }

  return (
    <div style={{
      height: "100vh",
      overflow: "hidden",
      background: "var(--bg-0)",
      color: "var(--text-1)",
      display: "flex", flexDirection: "column",
    }}>
      <GameShell
        episodeNumber={definition.number}
        maxTurns={definition.maxTurns}
        headerLabel={definition.headerLabel}
        onEpisodeChange={onEpisodeChange}
        turn={state.turn}
        scene={scene.title}
        walletAddress={connected ? (typeof window !== "undefined" ? localStorage.getItem("active_wallet_address") : null) : null}
        tokenBalance={episodeAccess.balance ?? profile?.tokenBalance ?? 0}
        onConnect={() => setShowWalletModal(true)}
        bgmEnabled={bgmEnabled}
        onToggleBgm={() => setBgmEnabled(!bgmEnabled)}
        onReset={reset}
      />

      {/* Desktop: 3-column grid; Mobile: tab fallback */}
      <main style={{
        flex: 1, minHeight: 0,
        display: "grid", gap: 10,
        padding: 10,
        overflow: "hidden",
      }} className="game-grid">

        {/* DOSSIER (left) */}
        <section style={{ minHeight: 0 }} data-tab="dossier" className={`game-pane ${mobileTab === "dossier" ? "active" : ""}`}>
          <Dossier logs={state.logs} ambient={scene.ambient} flags={state.flags} caseRecord={definition.caseRecord} />
        </section>

        {/* PLATE (center) */}
        <section style={{ minHeight: 0 }} data-tab="plate" className={`game-pane ${mobileTab === "plate" ? "active" : ""}`}>
          <PlateCanvas
            scene={scene}
            activeItemLabel={activeItemCopy?.name ?? null}
            isHotspotValid={isHotspotValid}
            onHotspot={handleHotspot}
            onMove={move}
            neighbors={neighbors}
          />
          {/* Active item bar */}
          <div style={{
            marginTop: 8,
            padding: "8px 12px",
            border: "1px solid var(--line-bright)",
            fontFamily: "var(--font-mono)", fontSize: 11,
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <span style={{ color: "var(--text-2)", textTransform: "uppercase", letterSpacing: "0.18em", fontSize: 10 }}>Active</span>
            <span style={{ color: activeItem ? "var(--acc-danger)" : "var(--text-2)" }}>
              {activeItemCopy ? activeItemCopy.name : "— bare hands —"}
            </span>
            {activeItem && (
              <button
                onClick={() => {
                  equip(null);
                  playSound("unequip");
                }}
                style={{
                  background: "transparent", border: "1px solid var(--line-bright)",
                  color: "var(--text-2)", fontFamily: "var(--font-mono)", fontSize: 9,
                  padding: "2px 8px", cursor: "pointer", letterSpacing: "0.18em",
                }}
            >UNEQUIP</button>
            )}
          </div>
        </section>

        {/* DECK (right) */}
        <section style={{ minHeight: 0 }} data-tab="deck" className={`game-pane ${mobileTab === "deck" ? "active" : ""}`}>
          <EvidenceBoard
            definition={definition}
            inventory={state.inventory}
            lostItems={state.lostItems}
            activeItem={state.activeItem}
            visitedScenes={state.visitedScenes}
            currentScene={state.scene}
            onEquip={equip}
          />
        </section>
      </main>

      {/* Mobile tab strip */}
      <nav className="game-mobile-tabs" style={{
        display: "none",
        borderTop: "1px solid var(--line-bright)",
        background: "var(--bg-0)",
      }}>
        {(["dossier", "plate", "deck"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setMobileTab(t)}
            style={{
              flex: 1,
              padding: "10px 0",
              background: mobileTab === t ? "var(--acc-violet)" : "transparent",
              color: mobileTab === t ? "var(--bg-0)" : "var(--text-2)",
              border: "none",
              fontFamily: "var(--font-mono)", fontSize: 10,
              letterSpacing: "0.2em", textTransform: "uppercase",
              cursor: "pointer",
            }}
          >
                {{ dossier: "dossier", plate: "plate", deck: "deck" }[t]}
          </button>
        ))}
      </nav>

      {/* Ending overlay */}
      {ending && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.92)",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 1000, padding: 20,
        }}>
          <div style={{
            maxWidth: 560, width: "100%",
            border: "1px solid var(--acc-violet)",
            background: "var(--bg-0)",
            padding: 28,
            fontFamily: "var(--font-mono)", color: "var(--text-1)",
          }}>
            <div style={{ color: "var(--acc-violet)", letterSpacing: "0.24em", fontSize: 11, marginBottom: 12 }}>
              EPISODE {definition.number} · {endingCopy?.title.toUpperCase()}
            </div>
            <p style={{ lineHeight: 1.7, fontSize: 13, marginBottom: 20 }}>{endingCopy?.body}</p>
            {ending.unlocksNextEpisode && definition.number <= 3 && (
              <div style={{
                padding: 10, marginBottom: 16,
                border: "1px solid var(--acc-violet)",
                color: "var(--acc-violet)",
                fontSize: 11, letterSpacing: "0.16em",
              }}>
                {definition.number === 1 && "EP.2 OPEN · NO WALLET OR PRIOR CLEAR REQUIRED"}
                {definition.number === 2 && `EP.3 GATE · ${EP3_GATE.toLocaleString()} $NAHOPE · SERVER VERIFICATION REQUIRED`}
                {definition.number === 3 && `EP.4 GATE · ${EP4_GATE.toLocaleString()} $NAHOPE · 3 RARE ARTIFACTS · SERVER VERIFICATION REQUIRED`}
              </div>
            )}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              <button onClick={reset} style={{
                flex: 1, padding: "10px 12px",
                background: "transparent",
                border: "1px solid var(--acc-primary)",
                color: "var(--acc-primary)",
                cursor: "pointer", letterSpacing: "0.2em", textTransform: "uppercase", fontSize: 10,
              }}>RESTART</button>
              {definition.number === 1 && ending.unlocksNextEpisode && (
                <button onClick={() => onEpisodeChange(2)} style={{
                  flex: 1, padding: "10px 12px",
                  background: "var(--acc-violet)",
                  border: "1px solid var(--acc-violet)",
                  color: "var(--bg-0)",
                  cursor: "pointer", letterSpacing: "0.16em", textTransform: "uppercase", fontSize: 10,
                }}>CONTINUE TO EPISODE 2</button>
              )}
              {definition.number === 2 && ending.unlocksNextEpisode && (
                <button onClick={() => onEpisodeChange(3)} style={{
                  flex: 1, padding: "10px 12px",
                  background: "var(--acc-violet)",
                  border: "1px solid var(--acc-violet)",
                  color: "var(--bg-0)",
                  cursor: "pointer", letterSpacing: "0.16em", textTransform: "uppercase", fontSize: 10,
                }}>CONTINUE TO EPISODE 3</button>
              )}
              {definition.number === 3 && ending.unlocksNextEpisode && (
                <button onClick={() => onEpisodeChange(4)} style={{
                  flex: 1, padding: "10px 12px",
                  background: "var(--acc-violet)",
                  border: "1px solid var(--acc-violet)",
                  color: "var(--bg-0)",
                  cursor: "pointer", letterSpacing: "0.16em", textTransform: "uppercase", fontSize: 10,
                }}>CONTINUE TO EPISODE 4</button>
              )}
              {definition.number === 4 && ending.id === "D" && (
                <Link href="/community?compose=omega" style={{
                  flex: 1, padding: "10px 12px", textAlign: "center",
                  background: "var(--acc-violet)",
                  border: "1px solid var(--acc-violet)",
                  color: "var(--bg-0)",
                  letterSpacing: "0.16em", textTransform: "uppercase", fontSize: 10,
                  textDecoration: "none",
                }}>SUBMIT TO COMMUNITY REVIEW</Link>
              )}
              <Link href="/" style={{
                flex: 1, padding: "10px 12px", textAlign: "center",
                background: "transparent",
                border: "1px solid var(--line-bright)",
                color: "var(--text-2)",
                letterSpacing: "0.2em", textTransform: "uppercase", fontSize: 10,
                textDecoration: "none",
              }}>EXIT</Link>
            </div>
          </div>
        </div>
      )}

      {/* Discovery Modal */}
      {discoveredItems.length > 0 && (
        <div style={{
          position: "fixed", inset: 0,
          background: "rgba(3, 4, 6, 0.94)",
          backdropFilter: "blur(4px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 999, padding: 20,
        }}>
          <div style={{
            maxWidth: 500, width: "100%",
            border: "1px solid var(--acc-primary)",
            boxShadow: "0 0 20px rgba(0, 255, 65, 0.2), inset 0 0 10px rgba(0, 255, 65, 0.1)",
            background: "#05070a",
            padding: 24,
            fontFamily: "var(--font-mono)", color: "var(--text-1)",
            position: "relative",
          }}>
            {/* Title / Header */}
            <div style={{
              color: "var(--acc-primary)",
              letterSpacing: "0.25em",
              fontSize: 11,
              fontWeight: "bold",
              marginBottom: 16,
              borderBottom: "1px solid var(--line-dim)",
              paddingBottom: 8,
              textTransform: "uppercase",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
              <span>{"// EVIDENCE ACQUIRED"}</span>
                  <span className="text-term-green" style={{ fontSize: 9 }}>[NEW DISCOVERY]</span>
            </div>

            {/* Discovery Log Text (from left panel logs) */}
            {discoveryLog && (
              <div style={{
                background: "rgba(26, 18, 8, 0.5)",
                border: "1px solid var(--line-dim)",
                padding: "10px 12px",
                marginBottom: 16,
                fontSize: 10,
                lineHeight: 1.45,
                color: "var(--text-1)",
              }}>
                <span style={{ color: "var(--acc-amber)", marginRight: 6, fontWeight: "bold" }}>
                  [{localizeGameRole(discoveryLog.role, language)}]
                </span>
                {localizeGameLog(discoveryLog.text, language)}
              </div>
            )}

            {/* Item Showcase Grid/List */}
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
              marginBottom: 20,
              maxHeight: "300px",
              overflowY: "auto",
              paddingRight: 4,
            }}>
              {discoveredItems.map((id) => {
                const item = definition.items[id];
                if (!item) return null;
                const itemCopy = getItemCopy(id, language, item);
                return (
                  <div key={id} style={{
                    display: "flex",
                    gap: 14,
                    alignItems: "center",
                    background: "rgba(255, 255, 255, 0.02)",
                    border: "1px solid rgba(255, 255, 255, 0.05)",
                    padding: 10,
                  }}>
                    {/* Item Polaroid Card representation in modal */}
                    <div className="polaroid-frame" style={{
                      width: 72,
                      flexShrink: 0,
                      padding: 0,
                      borderWidth: "4px",
                      borderBottomWidth: "16px",
                      transform: "rotate(-1deg)",
                      background: "#efe6cf",
                      borderStyle: "solid",
                      borderColor: "#efe6cf",
                    }}>
                      <div style={{
                        aspectRatio: "1 / 1",
                        background: "#2a2418",
                        position: "relative",
                        overflow: "hidden",
                      }}>
                        {item.art ? (
                          <Image
                            src={item.art}
                            alt={itemCopy.name}
                            fill
                            sizes="72px"
                            style={{ objectFit: "cover", imageRendering: "pixelated" }}
                          />
                        ) : (
                          <div style={{
                            display: "flex", width: "100%", height: "100%",
                            alignItems: "center", justifyContent: "center",
                            color: "#efe6cf", padding: 2,
                            fontSize: 7, textAlign: "center",
                            textTransform: "uppercase",
                          }}>
                            {itemCopy.name}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Item Info */}
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontSize: 11,
                        fontWeight: "bold",
                        color: "var(--acc-amber)",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        marginBottom: 4,
                      }}>
                        {itemCopy.name}
                      </div>
                      <div style={{
                        fontSize: 10,
                        color: "var(--text-2)",
                        lineHeight: 1.35,
                      }}>
                        {itemCopy.short}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Dismiss Button */}
            <button
              onClick={() => {
                setDiscoveredItems([]);
                setDiscoveryLog(null);
                playSound("unequip");
              }}
              style={{
                width: "100%",
                padding: "10px 12px",
                background: "transparent",
                border: "1px solid var(--acc-primary)",
                color: "var(--acc-primary)",
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
              className="text-term-green"
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(0, 255, 65, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
                    DISMISS DISCOVERY
            </button>
          </div>
        </div>
      )}

      <WalletConnectModal
        isOpen={showWalletModal}
        onClose={() => setShowWalletModal(false)}
        onSuccess={() => setShowWalletModal(false)}
        reason={walletReason(definition.number)}
      />

      <style jsx>{`
        .game-grid {
          grid-template-columns: minmax(240px, 24%) minmax(0, 1fr) minmax(220px, 24%);
        }
        .game-pane { display: flex; flex-direction: column; min-width: 0; }
        @media (max-width: 900px) {
          .game-grid { grid-template-columns: 1fr; }
          .game-pane { display: none; }
          .game-pane.active { display: flex; }
          .game-mobile-tabs { display: flex !important; }
        }
      `}</style>
    </div>
  );
}
