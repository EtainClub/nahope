import type { GameState, RitualDefinition } from "../../lib/game/types";

const PHASE_LABELS = {
  invocation: "호명",
  reverse: "역굿",
  sending: "송신",
} as const;

const DIRECTION_LABELS = {
  forward: "순행",
  reverse: "역행",
  outside: "열두 시간 바깥",
} as const;

type RitualStatusProps = {
  ritual?: RitualDefinition;
  state: Pick<
    GameState,
    | "cycleIndex"
    | "loopCount"
    | "flags"
    | "anchoredEvidence"
    | "boundaryIntegrity"
    | "roosterAlive"
    | "horsePathOpen"
    | "witnessedPresence"
    | "presenceSeed"
  >;
};

export default function RitualStatus({ ritual, state }: RitualStatusProps) {
  if (!ritual) return null;

  const marker = ritual.markers[state.cycleIndex] ?? ritual.markers[0];
  const lastPresenceId = state.witnessedPresence[state.witnessedPresence.length - 1];
  const presence = lastPresenceId ? ritual.presenceEvents?.[lastPresenceId] : undefined;
  const boundaryColor = state.boundaryIntegrity > 60
    ? "var(--acc-primary)"
    : state.boundaryIntegrity > 25
      ? "#f59e0b"
      : "var(--acc-danger)";
  const pulseDelay = `${(state.presenceSeed % 7) * 0.11}s`;

  return (
    <aside
      aria-label="의식 상태"
      style={{
        borderBottom: "1px solid var(--line-bright)",
        background: "linear-gradient(90deg, rgba(5,7,10,0.98), rgba(25,8,20,0.92), rgba(5,7,10,0.98))",
        padding: "7px 10px",
        fontFamily: "var(--font-mono)",
        flexShrink: 0,
      }}
    >
      <div className="ritual-status-grid">
        <section style={{ minWidth: 0 }}>
          <div style={{ color: "var(--acc-violet)", fontSize: 9, letterSpacing: "0.2em", marginBottom: 5 }}>
            의식 원판 · {PHASE_LABELS[ritual.phase]} · {DIRECTION_LABELS[ritual.direction]}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(12, minmax(25px, 1fr))", gap: 3 }}>
            {ritual.markers.map((entry, index) => {
              const revealed = state.flags.includes(entry.revealFlag);
              const active = index === state.cycleIndex;
              return (
                <div
                  key={entry.sign}
                  title={entry.label}
                  aria-label={`${entry.label}${revealed ? " · 호명됨" : " · 미호명"}${active ? " · 현재 위치" : ""}`}
                  style={{
                    minWidth: 0,
                    padding: "4px 2px",
                    textAlign: "center",
                    border: `1px solid ${active ? "var(--acc-danger)" : revealed ? "var(--acc-primary)" : "var(--line)"}`,
                    color: active ? "var(--acc-danger)" : revealed ? "var(--acc-primary)" : "var(--text-3)",
                    background: active ? "rgba(239,68,68,0.1)" : revealed ? "rgba(0,255,65,0.05)" : "rgba(0,0,0,0.2)",
                    boxShadow: active ? "0 0 10px rgba(239,68,68,0.25)" : "none",
                    fontSize: 10,
                    fontWeight: active ? 700 : 400,
                  }}
                >
                  {entry.animal}
                </div>
              );
            })}
          </div>
        </section>

        <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4, alignContent: "center", fontSize: 9 }}>
          <StatusCell label="현재 시각" value={marker?.label ?? "원판 밖"} tone="var(--acc-danger)" />
          <StatusCell label="경계 온전도" value={`${state.boundaryIntegrity}%`} tone={boundaryColor} />
          <StatusCell label="장닭" value={state.roosterAlive ? "양기 유지" : "울음 소멸"} tone={state.roosterAlive ? "var(--acc-primary)" : "var(--acc-danger)"} />
          <StatusCell label="말의 길" value={state.horsePathOpen ? "열림" : "닫힘"} tone={state.horsePathOpen ? "var(--acc-primary)" : "var(--text-3)"} />
        </section>

        <section
          aria-live="polite"
          style={{
            minWidth: 0,
            border: `1px solid ${presence ? "var(--acc-violet)" : "var(--line)"}`,
            padding: "6px 8px",
            animationDelay: pulseDelay,
          }}
          className={presence ? "ritual-presence" : undefined}
        >
          <div style={{ color: "var(--acc-violet)", fontSize: 8, letterSpacing: "0.18em", marginBottom: 3 }}>
            현현 기록 · 고정 증거 {state.anchoredEvidence.length} · 순환 {state.loopCount}
          </div>
          <div style={{ color: presence ? "var(--text-1)" : "var(--text-3)", fontSize: 9, lineHeight: 1.4 }}>
            {presence ? `${presence.title} — ${presence.text}` : "아직 화면 바깥의 기척만 감지된다."}
          </div>
        </section>
      </div>

      <style jsx>{`
        .ritual-status-grid {
          display: grid;
          grid-template-columns: minmax(360px, 1.5fr) minmax(230px, 0.8fr) minmax(260px, 1fr);
          gap: 8px;
          align-items: stretch;
        }
        .ritual-presence {
          animation: ritual-breath 3.7s ease-in-out infinite;
        }
        @keyframes ritual-breath {
          0%, 100% { background: rgba(124, 58, 237, 0.02); }
          50% { background: rgba(124, 58, 237, 0.12); }
        }
        @media (max-width: 900px) {
          .ritual-status-grid {
            grid-template-columns: 1fr;
          }
          .ritual-status-grid > section:nth-child(2),
          .ritual-status-grid > section:nth-child(3) {
            display: none !important;
          }
        }
      `}</style>
    </aside>
  );
}

function StatusCell({ label, value, tone }: { label: string; value: string; tone: string }) {
  return (
    <div style={{ border: "1px solid var(--line)", padding: "4px 6px", minWidth: 0 }}>
      <span style={{ color: "var(--text-3)" }}>{label}</span>
      <span style={{ color: tone, marginLeft: 6 }}>{value}</span>
    </div>
  );
}
