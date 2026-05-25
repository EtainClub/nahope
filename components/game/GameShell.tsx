"use client";

import { Radio, Wallet, Volume2, VolumeX } from "lucide-react";
import { MAX_TURNS } from "../../lib/game/episode1";

interface Props {
  turn: number;
  scene: string;
  walletAddress: string | null;
  tokenBalance: number;
  onConnect: () => void;
  bgmEnabled: boolean;
  onToggleBgm: () => void;
  onReset: () => void;
}

export default function GameShell({ turn, scene, walletAddress, tokenBalance, onConnect, bgmEnabled, onToggleBgm, onReset }: Props) {
  const clamped = Math.min(turn, MAX_TURNS);
  const ratio = clamped / MAX_TURNS;
  const danger = ratio >= 0.66;
  return (
    <header
      style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexWrap: "wrap", gap: 8,
        padding: "10px 16px",
        borderBottom: "1px solid var(--line-bright)",
        background: "var(--bg-0)",
        fontFamily: "var(--font-mono)", fontSize: 11,
        color: "var(--text-1)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14, letterSpacing: "0.16em", textTransform: "uppercase" }}>
        <span style={{ color: "var(--acc-violet)" }}>1983.08.◯◯ · 18:40</span>
        <span style={{ color: "var(--text-2)" }}>·</span>
        <span style={{ color: "var(--acc-primary)" }}>Ω-CHANNEL <Radio size={11} style={{ display: "inline", verticalAlign: "middle" }} /></span>
        <span style={{ color: "var(--text-2)" }}>·</span>
        <span>{scene}</span>
      </div>

      <div
        className={danger ? "turn-tick" : undefined}
        style={{
          display: "flex", alignItems: "center", gap: 10,
          padding: "4px 10px",
          border: `1px solid ${danger ? "var(--acc-danger)" : "var(--line-bright)"}`,
          color: danger ? "var(--acc-danger)" : "var(--acc-amber)",
          fontVariantNumeric: "tabular-nums",
          letterSpacing: "0.18em",
        }}
      >
        <span>TURN</span>
        <span style={{ fontWeight: 700, fontSize: 13 }}>{String(clamped).padStart(2, "0")}/{MAX_TURNS}</span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <button
          onClick={() => {
            if (window.confirm("Start a new game? Current progress will be lost.")) onReset();
          }}
          style={{
            background: "transparent",
            border: "1px solid var(--line-bright)",
            color: "var(--text-2)",
            padding: "4px 10px", fontFamily: "var(--font-mono)", fontSize: 10,
            letterSpacing: "0.18em", textTransform: "uppercase", cursor: "pointer",
          }}
        >NEW GAME</button>

        <button
          onClick={onToggleBgm}
          style={{
            display: "flex", alignItems: "center", gap: 6,
            background: bgmEnabled ? "var(--acc-primary)" : "transparent",
            border: "1px solid var(--line-bright)",
            color: bgmEnabled ? "var(--bg-0)" : "var(--text-2)",
            padding: "4px 10px", fontFamily: "var(--font-mono)", fontSize: 10,
            letterSpacing: "0.18em", textTransform: "uppercase", cursor: "pointer",
            transition: "all 0.15s ease",
          }}
          title={bgmEnabled ? "Mute Background Music" : "Unmute Background Music"}
        >
          {bgmEnabled ? <Volume2 size={12} /> : <VolumeX size={12} />}
          <span>BGM: {bgmEnabled ? "ON" : "OFF"}</span>
        </button>

        <button
          onClick={onConnect}
          style={{
            display: "flex", alignItems: "center", gap: 8,
            background: "transparent",
            border: "1px solid var(--line-bright)",
            color: walletAddress ? "var(--acc-primary)" : "var(--text-2)",
            padding: "4px 10px", fontFamily: "var(--font-mono)", fontSize: 10,
            letterSpacing: "0.18em", textTransform: "uppercase", cursor: "pointer",
          }}
        >
          <Wallet size={12} />
          {walletAddress
            ? `${walletAddress.slice(0, 4)}…${walletAddress.slice(-4)} · ${tokenBalance.toLocaleString()} $NAHOPE`
            : "CONNECT WALLET"}
        </button>
      </div>
    </header>
  );
}
