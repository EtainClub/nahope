"use client";

import { useEffect, useRef } from "react";
import type { LogEntry } from "../../lib/game/types";
import { useLanguage } from "../../lib/i18n";
import { localizeGameLog, localizeGameRole } from "../../lib/game/i18n";

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
  const { language, tr } = useLanguage();
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
        {tr("수사 기록 · 교신록", "DOSSIER · TRANSCRIPT")}
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

      {/* Field report — partially redacted, evidence-driven reveal */}
      <div className="paper-redact" style={{
        margin: 10,
        padding: "10px 12px",
        fontFamily: "var(--font-mono)", fontSize: 10,
        lineHeight: 1.5,
        border: "1px solid #6b5a2e",
      }}>
        <div style={{ textTransform: "uppercase", letterSpacing: "0.18em", marginBottom: 6 }}>
          {tr("현장 보고서 · 호포항", "Field Report · Hopo Port")}
        </div>
        <div>
          {tr("1983.08.◯◯ — 소 사체 훼손, ", "1983.08.◯◯ — Cattle mutilation, ")}
          <span className={flags.includes("COW_INSPECTED") ? "" : "redact"}>{tr("가죽에 새겨진 Ω 문양", "symbol Ω carved into hide")}</span>.
        </div>
        <div>
          {tr("대상: ", "Subject: ")}
          <span className={flags.includes("REPORT_FOUND") ? "" : "redact"}>{tr("그 문양은 33년마다 돌아온다", "the symbol returns every 33 years")}</span>.
        </div>
        <div>
          {tr("교차 참조: ", "Cross-ref: ")}
          <span className={flags.includes("MAGNIFIER_PRIED") ? "" : "redact"}>{tr("폴라로이드, 1950년, 아동 대상", "Polaroid, 1950, child subject")}</span>.
        </div>
        <div style={{ color: "#6b5a2e", marginTop: 6 }}>
          {tr("2 — 3쪽: ", "Pages 2 — 3: ")}<span className="redact">                              </span>
        </div>
        {(flags.includes("APOSTATE_STEP_1") || flags.includes("APOSTATE_STEP_2")) && (
          <div style={{ color: "#6b3a1e", marginTop: 6, fontStyle: "italic" }}>
            {tr("여백 메모 · ", "margin note · ")}<span className={flags.includes("APOSTATE_STEP_1") ? "" : "redact"}>{tr("그는 이미 잘못된 방식으로 웃고 있었다", "he was already smiling wrong")}</span>
            {" · "}
            <span className={flags.includes("APOSTATE_STEP_2") ? "" : "redact"}>{tr("글자들은 말하기 전에 기울어진다", "the letters lean before they speak")}</span>
          </div>
        )}
      </div>
    </div>
  );
}
