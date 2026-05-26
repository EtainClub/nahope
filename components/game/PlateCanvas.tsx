"use client";

import { useState } from "react";
import type { Scene, SceneId } from "../../lib/game/types";
import { play as playSound } from "../../lib/game/sound";

interface Props {
  scene: Scene;
  activeItemLabel: string | null;
  isHotspotValid?: (hotspotId: string) => boolean;
  onHotspot: (hotspotId: string) => void;
  onMove: (to: SceneId) => void;
  neighbors: { id: SceneId; title: string; locked: boolean }[];
}

export default function PlateCanvas({ scene, activeItemLabel, isHotspotValid, onHotspot, onMove, neighbors }: Props) {
  const [hover, setHover] = useState<string | null>(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
    <div
      style={{
        position: "relative",
        width: "100%", aspectRatio: "16 / 9",
        background: "#000",
        border: "1px solid var(--line-bright)",
        overflow: "hidden",
      }}
    >
      {/* Plate art */}
      <div
        className="pixelated"
        style={{
          position: "absolute", inset: 0,
          backgroundImage: `url(${scene.art})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "saturate(0.7) contrast(1.05)",
        }}
        aria-label={scene.title}
      />
      {/* Scene title — top-left */}
      <div
        style={{
          position: "absolute", top: 8, left: 10,
          color: "var(--acc-violet)", opacity: 0.6,
          fontFamily: "var(--font-mono)", letterSpacing: "0.24em",
          fontSize: 10, textTransform: "uppercase", pointerEvents: "none",
          textShadow: "0 0 8px rgba(0,0,0,0.8)",
        }}
      >
        {scene.title}
      </div>

      {/* CRT overlays — reuse existing utilities */}
      <div className="crt-scan" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />
      <div className="crt-vignette" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />

      {/* Hotspots */}
      {scene.hotspots.map((h) => {
        const isHover = hover === h.id;
        const wrongFit =
          isHover && !!activeItemLabel && isHotspotValid !== undefined && !isHotspotValid(h.id);
        const color = wrongFit
          ? "var(--acc-danger)"
          : isHover
            ? "var(--acc-primary)"
            : "rgba(255,255,255,0.18)";
        return (
          <button
            key={h.id}
            onMouseEnter={() => {
              setHover(h.id);
              if (!!activeItemLabel && isHotspotValid !== undefined && !isHotspotValid(h.id)) {
                playSound("whisper");
              }
            }}
            onMouseLeave={() => setHover((prev) => (prev === h.id ? null : prev))}
            onClick={() => onHotspot(h.id)}
            style={{
              position: "absolute",
              top: h.top, left: h.left, width: h.width, height: h.height,
              background: wrongFit
                ? "color-mix(in srgb, var(--acc-danger) 8%, transparent)"
                : isHover
                  ? "color-mix(in srgb, var(--acc-primary) 6%, transparent)"
                  : "transparent",
              border: "none", padding: 0, cursor: "crosshair",
            }}
            aria-label={h.label}
            className={wrongFit ? "hotspot-glitch" : undefined}
          >
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width: "100%", height: "100%", display: "block" }}>
              <path d="M 0 18 L 0 0 L 18 0"   stroke={color} strokeWidth="1.5" fill="none" vectorEffect="non-scaling-stroke" />
              <path d="M 100 18 L 100 0 L 82 0" stroke={color} strokeWidth="1.5" fill="none" vectorEffect="non-scaling-stroke" />
              <path d="M 0 82 L 0 100 L 18 100" stroke={color} strokeWidth="1.5" fill="none" vectorEffect="non-scaling-stroke" />
              <path d="M 100 82 L 100 100 L 82 100" stroke={color} strokeWidth="1.5" fill="none" vectorEffect="non-scaling-stroke" />
              {isHover && (
                <>
                  <circle cx="50" cy="50" r="12" stroke={color} strokeWidth="0.8" fill="none" opacity="0.5" />
                  <line x1="50" y1="36" x2="50" y2="42" stroke={color} strokeWidth="1" />
                  <line x1="50" y1="58" x2="50" y2="64" stroke={color} strokeWidth="1" />
                  <line x1="36" y1="50" x2="42" y2="50" stroke={color} strokeWidth="1" />
                  <line x1="58" y1="50" x2="64" y2="50" stroke={color} strokeWidth="1" />
                  <circle cx="50" cy="50" r="2" fill={color} />
                </>
              )}
            </svg>
            {isHover && (
              <span style={{
                position: "absolute", top: -26, left: "50%", transform: "translateX(-50%)",
                fontFamily: "var(--font-mono)", fontSize: 9,
                color: "var(--acc-primary)", textTransform: "uppercase", letterSpacing: "0.14em",
                padding: "2px 8px", border: "1px solid var(--acc-primary)",
                background: "var(--bg-0)", whiteSpace: "nowrap",
                pointerEvents: "none",
                boxShadow: "0 0 8px color-mix(in srgb, var(--acc-primary) 40%, transparent)",
              }}>
                {activeItemLabel ? `USE ${activeItemLabel} → ${h.label}` : h.label}
              </span>
            )}
          </button>
        );
      })}

    </div>

    {/* Exits — rendered below the canvas so they never cover hotspots */}
    {neighbors.length > 0 && (
      <div
        style={{
          display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap",
          padding: "8px 4px 0",
        }}
      >
        {neighbors.map((n) => (
          <button
            key={n.id}
            disabled={n.locked}
            onClick={() => onMove(n.id)}
            style={{
              fontFamily: "var(--font-mono)", fontSize: 10,
              letterSpacing: "0.18em", textTransform: "uppercase",
              padding: "6px 12px",
              background: "transparent",
              border: `1px solid ${n.locked ? "var(--line-dim)" : "var(--acc-primary)"}`,
              color: n.locked ? "var(--text-2)" : "var(--acc-primary)",
              cursor: n.locked ? "not-allowed" : "pointer",
              opacity: n.locked ? 0.55 : 1,
            }}
          >
            → {n.title} {n.locked ? "· locked" : ""}
          </button>
        ))}
      </div>
    )}
    </div>
  );
}
