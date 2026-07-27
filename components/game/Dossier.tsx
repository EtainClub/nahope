"use client";

import { useEffect, useRef } from "react";
import type { CaseRecord, LogEntry } from "../../lib/game/types";
import { useLanguage } from "../../lib/i18n";
import { getCaseRecordCopy, localizeGameLog, localizeGameRole } from "../../lib/game/i18n";

interface Props {
  logs: LogEntry[];
  ambient: string;
  flags: string[];
  caseRecord: CaseRecord;
}

const KIND_COLOR: Record<string, string> = {
  system: "var(--text-2)",
  voice: "var(--acc-primary)",
  omega: "var(--acc-violet)",
  danger: "var(--acc-danger)",
  default: "var(--text-1)",
};

export default function Dossier({ logs, ambient, flags, caseRecord }: Props) {
  const { language, tr } = useLanguage();
  const localizedCaseRecord = getCaseRecordCopy(caseRecord, language);
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
        {tr("사건 기록 · 대화 로그", "DOSSIER · TRANSCRIPT")}
      </div>

      <div
        ref={scrollRef}
        style={{ flex: 1, overflowY: "auto", padding: "10px 12px", lineHeight: 1.45 }}
      >
        {logs.map((l, i) => (
          <div key={i} style={{ marginBottom: 8 }}>
            <span style={{ color: "var(--text-2)", marginRight: 6 }}>T{String(l.turn).padStart(2, "0")}</span>
            <span style={{ color: KIND_COLOR[l.kind] ?? KIND_COLOR.default, fontWeight: 600 }}>
              {localizeGameRole(l.role, language)}
            </span>
            <span style={{ color: "var(--text-2)" }}> · </span>
            <span style={{ color: KIND_COLOR[l.kind] ?? KIND_COLOR.default }}>{localizeGameLog(l.text, language)}</span>
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

      {/* Episode record — each fact is revealed only after it is established. */}
      <div className="paper-redact" style={{
        margin: 10,
        padding: "10px 12px",
        fontFamily: "var(--font-mono)", fontSize: 10,
        lineHeight: 1.5,
        border: "1px solid #6b5a2e",
      }}>
        <div style={{ textTransform: "uppercase", letterSpacing: "0.18em", marginBottom: 6 }}>
          {localizedCaseRecord.title}
        </div>
        {localizedCaseRecord.rows.map((row) => (
          <div key={row.label}>
            {row.label}: {" "}
            <span className={flags.includes(row.revealFlag) ? "" : "redact"}>
              {row.text}
            </span>.
          </div>
        ))}
        {localizedCaseRecord.notes?.map((note) => flags.includes(note.revealFlag) ? (
          <div key={note.revealFlag} style={{ color: "#6b3a1e", marginTop: 4, fontStyle: "italic" }}>
            {note.text}
          </div>
        ) : null)}
      </div>
    </div>
  );
}
