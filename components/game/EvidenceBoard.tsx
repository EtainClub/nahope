"use client";

import { ITEMS, SCENES } from "../../lib/game/episode1";
import type { ItemId, SceneId } from "../../lib/game/types";
import { play as playSound } from "../../lib/game/sound";

interface Props {
  inventory: ItemId[];
  lostItems: ItemId[];
  activeItem: ItemId | null;
  visitedScenes: SceneId[];
  currentScene: SceneId;
  onEquip: (item: ItemId | null) => void;
}

const NODE_ORDER: SceneId[] = ["OFFICE", "ARMORY", "YARD", "FIELD", "FOREST", "COAST"];

export default function EvidenceBoard({
  inventory, lostItems, activeItem, visitedScenes, currentScene, onEquip,
}: Props) {
  return (
    <div style={{
      display: "flex", flexDirection: "column",
      border: "1px solid var(--line-bright)",
      background: "var(--bg-0)",
      height: "100%", minHeight: 0,
      fontFamily: "var(--font-mono)", fontSize: 11,
    }}>
      <div style={{
        padding: "8px 12px", borderBottom: "1px solid var(--line-dim)",
        color: "var(--acc-amber)", textTransform: "uppercase",
        letterSpacing: "0.18em", fontSize: 10,
      }}>
        Evidence Deck
      </div>

      <div style={{
        flex: 1, overflowY: "auto",
        padding: 12,
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: 10,
        alignContent: "start",
        background:
          "repeating-linear-gradient(45deg, #1a140a 0 6px, #15110a 6px 12px)",
      }}>
        {inventory.length === 0 && (
          <div style={{
            gridColumn: "1 / -1", color: "var(--text-2)",
            textAlign: "center", padding: "14px 8px", lineHeight: 1.7,
          }}>
            <div style={{
              display: "inline-block",
              padding: "8px 10px",
              border: "1px dashed #6b5a2e",
              background: "#1a1208",
              color: "var(--paper-stain)",
              fontSize: 10,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              transform: "rotate(-1.6deg)",
            }}>
              EVIDENCE PENDING
            </div>
            <div style={{ marginTop: 10, fontSize: 10, color: "#6b5a2e", fontStyle: "italic" }}>
              Pin discoveries here. Tap to equip.
            </div>
          </div>
        )}
        {inventory.map((id) => {
          const item = ITEMS[id];
          const active = activeItem === id;
          return (
            <div
              key={id}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                alignItems: "center",
                background: "rgba(26, 18, 8, 0.4)",
                border: "1px solid var(--line-dim)",
                padding: "10px 8px 12px 8px",
              }}
            >
              <button
                onClick={() => {
                  const nextItem = active ? null : id;
                  onEquip(nextItem);
                  playSound(nextItem ? "equip" : "unequip");
                }}
                className="polaroid-frame polaroid-develop"
                style={{
                  cursor: "pointer",
                  padding: 0,
                  outline: active ? "2px solid var(--acc-danger)" : "none",
                  outlineOffset: 2,
                  textAlign: "left",
                  width: "100%",
                }}
              >
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
                      color: "#efe6cf", padding: 6,
                      fontFamily: "var(--font-mono)", fontSize: 9,
                      textAlign: "center",
                      letterSpacing: "0.1em", textTransform: "uppercase",
                    }}>
                      {item.name}
                    </div>
                  )}
                </div>
                <div style={{
                  position: "relative", top: 4,
                  fontFamily: "var(--font-serif, var(--font-mono))",
                  fontSize: 10, color: "#1a1208",
                  textAlign: "center", letterSpacing: "0.06em",
                }}>
                  {active ? "▼ ACTIVE" : "tap to equip"}
                </div>
              </button>

              <div style={{
                textAlign: "center",
                marginTop: 4,
                width: "100%",
                fontFamily: "var(--font-mono)",
              }}>
                <div style={{
                  fontSize: 10,
                  fontWeight: "bold",
                  color: active ? "var(--acc-amber)" : "var(--text-1)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  wordBreak: "break-word",
                }}>
                  {item.name}
                </div>
                <div style={{
                  fontSize: 9,
                  color: "var(--text-2)",
                  marginTop: 3,
                  lineHeight: 1.25,
                  wordBreak: "keep-all",
                }}>
                  {item.short}
                </div>
              </div>
            </div>
          );
        })}
        {lostItems.map((id) => (
          <div key={`lost-${id}`} style={{
            padding: 8,
            border: "1px dashed var(--acc-danger)",
            color: "var(--acc-danger)",
            opacity: 0.7,
            fontSize: 9,
            textAlign: "center",
          }}>
            LOST · {ITEMS[id]?.name ?? id}
          </div>
        ))}
      </div>

      {/* MAP */}
      <div style={{ padding: 10, borderTop: "1px solid var(--line-dim)" }}>
        <div style={{ color: "var(--text-2)", textTransform: "uppercase", letterSpacing: "0.2em", fontSize: 9, marginBottom: 6 }}>
          Sector Map
        </div>
        <div style={{ display: "flex", gap: 4, justifyContent: "space-between", alignItems: "center" }}>
          {NODE_ORDER.map((id) => {
            const visited = visitedScenes.includes(id);
            const here = currentScene === id;
            return (
              <div key={id} style={{
                flex: 1,
                padding: "4px 2px",
                textAlign: "center",
                fontSize: 8,
                letterSpacing: "0.1em",
                color: here ? "var(--acc-primary)" : visited ? "var(--text-1)" : "var(--text-2)",
                border: here ? "1px solid var(--acc-primary)" : "1px solid var(--line-dim)",
                background: visited ? "transparent" : "var(--redact-black)",
              }}>
                {visited ? SCENES[id].title.split("·").pop()?.trim() : "▮▮▮"}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
