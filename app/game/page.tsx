"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import Link from "next/link";
import { useWallet } from "@solana/wallet-adapter-react";

import { database, UserProfile } from "../../lib/firebase";
import WalletConnectModal from "../../components/WalletConnectModal";
import GameShell from "../../components/game/GameShell";
import PlateCanvas from "../../components/game/PlateCanvas";
import Dossier from "../../components/game/Dossier";
import EvidenceBoard from "../../components/game/EvidenceBoard";
import { useGameState } from "../../lib/game/state";
import { INTERACTIONS, ITEMS, SCENES } from "../../lib/game/episode1";
import type { ItemId, SceneId } from "../../lib/game/types";
import { play as playSound, startBgm, stopBgm } from "../../lib/game/sound";

const EP2_GATE = 5000;

export default function GamePage() {
  const { connected } = useWallet();
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [mobileTab, setMobileTab] = useState<"plate" | "dossier" | "deck">("plate");
  const [bgmEnabled, setBgmEnabled] = useState(false);

  const { state, ending, inspect, move, equip, reset } = useGameState();

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

  // Sync the local Firebase profile (legacy plumbing).
  useEffect(() => {
    if (typeof window === "undefined") return;
    const sync = () => {
      const wallet = localStorage.getItem("active_wallet_address") || "Hopo...7XzP";
      setProfile(database.getUserProfile(wallet));
    };
    sync();
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

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

  // Persist the canonical artifacts + full ep1 record to the user's profile.
  useEffect(() => {
    if (!ending) return;
    if (typeof window === "undefined") return;
    const wallet = localStorage.getItem("active_wallet_address") || "Hopo...7XzP";
    const current = database.getUserProfile(wallet);
    const artifactNames = (ending.grantsArtifacts ?? []).map((id) => ITEMS[id].name);
    const nextInv = Array.from(new Set([...(current.inventory ?? []), ...artifactNames]));
    const currentEndings = current.completedEndings ?? [];
    const unlockedList = [...currentEndings, `ep1_${ending.id}`];
    if (ending.id === "C" || ending.id === "D") {
      unlockedList.push("ep1_clear");
    }
    const nextEndings = Array.from(new Set(unlockedList));

    const next = {
      ...current,
      inventory: nextInv,
      completedEndings: nextEndings,
      ep1: {
        endingId: ending.id,
        flags: state.flags,
        lostItems: state.lostItems,
        completedAt: Date.now(),
      },
    };
    const alreadyRecorded =
      current.ep1?.endingId === ending.id &&
      nextInv.length === (current.inventory ?? []).length &&
      (current.completedEndings ?? []).includes(`ep1_${ending.id}`);
    if (alreadyRecorded) return;
    void database.saveUserProfile(wallet, next).then(() => {
      setProfile(next);
      window.dispatchEvent(new Event("profileUpdated"));
    });
  }, [ending, state.flags, state.lostItems]);

  const scene = SCENES[state.scene];
  const activeItem = state.activeItem ? ITEMS[state.activeItem] : null;

  const neighbors = useMemo(() => {
    return scene.exits.map((id: SceneId) => {
      const target = SCENES[id];
      const locked = !!(target.lockedUntil && !state.flags.includes(target.lockedUntil));
      return { id, title: target.title.split("·").pop()?.trim() ?? id, locked };
    });
  }, [scene, state.flags]);

  const handleHotspot = (hotspotId: string) => inspect(scene.id, hotspotId);

  // Used by PlateCanvas to dim/glitch hotspots that don't accept the current active item.
  const isHotspotValid = (hotspotId: string): boolean => {
    if (!state.activeItem) return true;
    return INTERACTIONS.some(
      (rule) =>
        rule.scene === scene.id &&
        rule.hotspot === hotspotId &&
        rule.requires?.item === state.activeItem &&
        !(rule.once && state.firedOnce.includes(rule.id)),
    );
  };

  return (
    <div style={{
      height: "100vh",
      overflow: "hidden",
      background: "var(--bg-0)",
      color: "var(--text-1)",
      display: "flex", flexDirection: "column",
    }}>
      <GameShell
        turn={state.turn}
        scene={scene.title}
        walletAddress={connected ? (typeof window !== "undefined" ? localStorage.getItem("active_wallet_address") : null) : null}
        tokenBalance={profile?.tokenBalance ?? 0}
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
          <Dossier logs={state.logs} ambient={scene.ambient} flags={state.flags} />
        </section>

        {/* PLATE (center) */}
        <section style={{ minHeight: 0 }} data-tab="plate" className={`game-pane ${mobileTab === "plate" ? "active" : ""}`}>
          <PlateCanvas
            scene={scene}
            activeItemLabel={activeItem?.name ?? null}
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
              {activeItem ? activeItem.name : "— bare hands —"}
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
            {t}
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
              EPISODE 1 · {ending.title.toUpperCase()}
            </div>
            <p style={{ lineHeight: 1.7, fontSize: 13, marginBottom: 20 }}>{ending.body}</p>
            {ending.unlocksNextEpisode && (
              <div style={{
                padding: 10, marginBottom: 16,
                border: `1px solid ${profile && profile.tokenBalance >= EP2_GATE ? "var(--acc-primary)" : "var(--acc-danger)"}`,
                color: profile && profile.tokenBalance >= EP2_GATE ? "var(--acc-primary)" : "var(--acc-danger)",
                fontSize: 11, letterSpacing: "0.16em",
              }}>
                EP.2 GATE · {EP2_GATE.toLocaleString()} $NAHOPE · YOU HOLD {(profile?.tokenBalance ?? 0).toLocaleString()}
              </div>
            )}
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={reset} style={{
                flex: 1, padding: "10px 12px",
                background: "transparent",
                border: "1px solid var(--acc-primary)",
                color: "var(--acc-primary)",
                cursor: "pointer", letterSpacing: "0.2em", textTransform: "uppercase", fontSize: 10,
              }}>RESTART</button>
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
              <span>// EVIDENCE ACQUIRED</span>
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
                  [{discoveryLog.role}]
                </span>
                {discoveryLog.text}
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
                const item = ITEMS[id];
                if (!item) return null;
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
                          <img
                            src={item.art}
                            alt={item.name}
                            style={{
                              width: "100%", height: "100%", objectFit: "cover",
                              imageRendering: "pixelated",
                            }}
                          />
                        ) : (
                          <div style={{
                            display: "flex", width: "100%", height: "100%",
                            alignItems: "center", justifyContent: "center",
                            color: "#efe6cf", padding: 2,
                            fontSize: 7, textAlign: "center",
                            textTransform: "uppercase",
                          }}>
                            {item.name}
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
                        {item.name}
                      </div>
                      <div style={{
                        fontSize: 10,
                        color: "var(--text-2)",
                        lineHeight: 1.35,
                      }}>
                        {item.short}
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
        reason="episode2"
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
