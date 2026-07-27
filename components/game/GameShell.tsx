"use client";

import { Radio, Wallet, Volume2, VolumeX } from "lucide-react";
import { useLanguage } from "../../lib/i18n";

interface Props {
  episodeNumber: 1 | 2 | 3 | 4;
  maxTurns: number;
  headerLabel: string;
  onEpisodeChange: (episode: 1 | 2 | 3 | 4) => void;
  turn: number;
  scene: string;
  walletAddress: string | null;
  tokenBalance: number;
  onConnect: () => void;
  bgmEnabled: boolean;
  onToggleBgm: () => void;
  onReset: () => void;
}

export default function GameShell({ episodeNumber, maxTurns, headerLabel, onEpisodeChange, turn, scene, walletAddress, tokenBalance, onConnect, bgmEnabled, onToggleBgm, onReset }: Props) {
  const { tr } = useLanguage();
  const clamped = Math.min(turn, maxTurns);
  const ratio = clamped / maxTurns;
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
        <span style={{ color: "var(--acc-violet)" }}>{headerLabel}</span>
        <span style={{ color: "var(--text-2)" }}>·</span>
        <span style={{ color: "var(--acc-primary)" }}>{tr("사건 연결", "CASE-LINK")} <Radio size={11} style={{ display: "inline", verticalAlign: "middle" }} /></span>
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
        <span>{tr("턴", "TURN")}</span>
        <span style={{ fontWeight: 700, fontSize: 13 }}>{String(clamped).padStart(2, "0")}/{maxTurns}</span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ display: "flex", gap: 4 }} aria-label={tr("에피소드 선택", "Episode selection")}>
          {([1, 2, 3, 4] as const).map((episode) => (
            <button
              key={episode}
              onClick={() => onEpisodeChange(episode)}
              aria-pressed={episodeNumber === episode}
              style={{
                background: episodeNumber === episode ? "var(--acc-violet)" : "transparent",
                border: "1px solid var(--line-bright)",
                color: episodeNumber === episode ? "var(--bg-0)" : "var(--text-2)",
                padding: "4px 8px", fontFamily: "var(--font-mono)", fontSize: 9,
                letterSpacing: "0.14em", cursor: "pointer",
              }}
            >{tr("에피소드", "EP.")}{episode}</button>
          ))}
        </div>
        <button
          onClick={() => {
            if (window.confirm(tr("새 게임을 시작하시겠습니까? 현재 진행 상황이 사라집니다.", "Start a new game? Current progress will be lost."))) onReset();
          }}
          style={{
            background: "transparent",
            border: "1px solid var(--line-bright)",
            color: "var(--text-2)",
            padding: "4px 10px", fontFamily: "var(--font-mono)", fontSize: 10,
            letterSpacing: "0.18em", textTransform: "uppercase", cursor: "pointer",
          }}
        >{tr("새 게임", "NEW GAME")}</button>

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
          title={bgmEnabled ? tr("배경 음악 끄기", "Mute Background Music") : tr("배경 음악 켜기", "Unmute Background Music")}
        >
          {bgmEnabled ? <Volume2 size={12} /> : <VolumeX size={12} />}
          <span>{tr("배경 음악", "BGM")}: {bgmEnabled ? tr("켜짐", "ON") : tr("꺼짐", "OFF")}</span>
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
            : tr("지갑 연결", "CONNECT WALLET")}
        </button>
      </div>
    </header>
  );
}
