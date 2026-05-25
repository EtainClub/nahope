"use client";

import { useEffect, useRef } from "react";
import type { LogEntry } from "../../lib/game/types";

interface Props {
  logs: LogEntry[];
  ambient: string;
  flags: string[];
}

const KIND_COLOR: Record<string, string> = {
  system: "var(--text-2)",
  voice: "var(--acc-primary)",
  omega: "var(--acc-violet)",
  danger: "var(--acc-danger)",
  default: "var(--text-1)",
};

export default function Dossier({ logs, ambient, flags }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [logs.length]);

  return (
    <div style={{
      display: "flex", flexDirection: "column",
      border: "1px solid var(--line-bright)",
      background: "var(--bg-0)",
      height: "100%", minHeight: 0,
      fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-1)",
    }}>
      <div style={{
        padding: "8px 12px",
        borderBottom: "1px solid var(--line-dim)",
        color: "var(--acc-violet)",
        textTransform: "uppercase", letterSpacing: "0.18em",
        fontSize: 10,
      }}>
        DOSSIER · TRANSCRIPT
      </div>

      <div
        ref={scrollRef}
        style={{ flex: 1, overflowY: "auto", padding: "10px 12px", lineHeight: 1.45 }}
      >
        {logs.map((l, i) => (
          <div key={i} style={{ marginBottom: 8 }}>
            <span style={{ color: "var(--text-2)", marginRight: 6 }}>T{String(l.turn).padStart(2, "0")}</span>
            <span style={{ color: KIND_COLOR[l.kind] ?? KIND_COLOR.default, fontWeight: 600 }}>
              {l.role}
            </span>
            <span style={{ color: "var(--text-2)" }}> · </span>
            <span style={{ color: KIND_COLOR[l.kind] ?? KIND_COLOR.default }}>{l.text}</span>
          </div>
        ))}
      </div>

      <div style={{
        padding: "10px 12px",
        borderTop: "1px solid var(--line-dim)",
        color: "var(--text-2)",
        fontStyle: "italic",
        fontSize: 10,
      }}>
        {ambient}
      </div>

      {/* Field report — partially redacted, evidence-driven reveal */}
      <div className="paper-redact" style={{
        margin: 10,
        padding: "10px 12px",
        fontFamily: "var(--font-mono)", fontSize: 10,
        lineHeight: 1.5,
        border: "1px solid #6b5a2e",
      }}>
        <div style={{ textTransform: "uppercase", letterSpacing: "0.18em", marginBottom: 6 }}>
          Field Report · Hopo Port
        </div>
        <div>
          1983.08.◯◯ — Cattle mutilation,{" "}
          <span className={flags.includes("COW_INSPECTED") ? "" : "redact"}>symbol Ω carved into hide</span>.
        </div>
        <div>
          Subject:{" "}
          <span className={flags.includes("REPORT_FOUND") ? "" : "redact"}>the symbol returns every 33 years</span>.
        </div>
        <div>
          Cross-ref:{" "}
          <span className={flags.includes("MAGNIFIER_PRIED") ? "" : "redact"}>Polaroid, 1950, child subject</span>.
        </div>
        <div style={{ color: "#6b5a2e", marginTop: 6 }}>
          Pages 2 — 3: <span className="redact">                              </span>
        </div>
        {(flags.includes("APOSTATE_STEP_1") || flags.includes("APOSTATE_STEP_2")) && (
          <div style={{ color: "#6b3a1e", marginTop: 6, fontStyle: "italic" }}>
            margin note · <span className={flags.includes("APOSTATE_STEP_1") ? "" : "redact"}>he was already smiling wrong</span>
            {" · "}
            <span className={flags.includes("APOSTATE_STEP_2") ? "" : "redact"}>the letters lean before they speak</span>
          </div>
        )}
      </div>
    </div>
  );
}
