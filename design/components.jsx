/* global React, Icons */
// components.jsx — HOPE OMEGA design system primitives.

// ── PANEL with corner brackets + optional label tab
function Panel({ label, right, children, tone = "default", style, className = "", bracket = true }) {
  const tones = {
    default: { border: "var(--line)", accent: "var(--acc-primary)" },
    danger:  { border: "var(--acc-danger)", accent: "var(--acc-danger)" },
    violet:  { border: "var(--line-bright)", accent: "var(--acc-violet)" },
    amber:   { border: "var(--line-bright)", accent: "var(--acc-amber)" },
  };
  const t = tones[tone];
  return (
    <div className={`panel ${bracket ? "panel-bracket" : ""} ${className}`}
         style={{ borderColor: t.border, ...style, "--acc-primary": t.accent }}>
      {bracket && <span className="br-bl" />}
      {bracket && <span className="br-br" />}
      {(label || right) && (
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "10px 14px", borderBottom: "1px solid var(--line)",
          fontFamily: "var(--font-mono)", fontSize: 11,
          textTransform: "uppercase", letterSpacing: "var(--track-caps)",
        }}>
          <span style={{ color: "var(--ink-2)" }}>{label}</span>
          {right && <span style={{ color: t.accent }}>{right}</span>}
        </div>
      )}
      <div>{children}</div>
    </div>
  );
}

// ── BUTTON variants
function Btn({ children, variant = "primary", icon, disabled, onClick, size = "md", style }) {
  const base = {
    fontFamily: "var(--font-mono)",
    fontSize: size === "sm" ? 10 : 11,
    textTransform: "uppercase",
    letterSpacing: "var(--track-caps)",
    padding: size === "sm" ? "6px 10px" : "10px 16px",
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    border: "1px solid",
    borderRadius: 0,
    position: "relative",
    transition: "all 0.15s ease",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.4 : 1,
  };
  const variants = {
    primary: {
      background: "transparent",
      borderColor: "var(--acc-primary)",
      color: "var(--acc-primary)",
      boxShadow: "0 0 0 1px transparent, inset 0 0 0 0 var(--acc-primary)",
    },
    solid: {
      background: "var(--acc-primary)",
      borderColor: "var(--acc-primary)",
      color: "var(--bg-0)",
    },
    danger: {
      background: "transparent",
      borderColor: "var(--acc-danger)",
      color: "var(--acc-danger)",
    },
    ghost: {
      background: "transparent",
      borderColor: "var(--line-bright)",
      color: "var(--ink-1)",
    },
    crt: {
      background: "transparent",
      borderColor: "var(--acc-primary)",
      color: "var(--acc-primary)",
      fontFamily: "var(--font-crt)",
      fontSize: size === "sm" ? 14 : 16,
      letterSpacing: "0.06em",
    },
  };
  return (
    <button onClick={onClick} disabled={disabled}
            style={{ ...base, ...variants[variant], ...style }}
            onMouseEnter={(e) => {
              if (disabled) return;
              if (variant === "primary") {
                e.currentTarget.style.background = "var(--acc-primary)";
                e.currentTarget.style.color = "var(--bg-0)";
                e.currentTarget.style.boxShadow = "var(--glow-primary)";
              } else if (variant === "danger") {
                e.currentTarget.style.background = "var(--acc-danger)";
                e.currentTarget.style.color = "var(--bg-0)";
                e.currentTarget.style.boxShadow = "var(--glow-danger)";
              } else if (variant === "ghost") {
                e.currentTarget.style.borderColor = "var(--ink-1)";
                e.currentTarget.style.color = "var(--ink-0)";
              }
            }}
            onMouseLeave={(e) => {
              Object.assign(e.currentTarget.style, variants[variant]);
            }}>
      {icon}
      <span>{children}</span>
    </button>
  );
}

// ── METRIC display — big stat with label
function Metric({ label, value, unit, tone = "primary", small = false }) {
  const c = `var(--acc-${tone === "primary" ? "primary" : tone})`;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <div className="eyebrow">{label}</div>
      <div style={{
        fontFamily: "var(--font-display)",
        fontSize: small ? 22 : 36,
        color: c, lineHeight: 1,
        textShadow: `0 0 18px ${c}`,
      }}>
        {value}{unit && <span style={{
          fontSize: small ? 10 : 14, color: "var(--ink-2)",
          marginLeft: 4, textShadow: "none",
        }}>{unit}</span>}
      </div>
    </div>
  );
}

// ── COLOR SWATCH card
function Swatch({ name, hex, varname, role, large = false }) {
  return (
    <div style={{ display: "flex", flexDirection: "column",
                  border: "1px solid var(--line)", background: "var(--bg-2)" }}>
      <div style={{
        height: large ? 160 : 96,
        background: hex,
        position: "relative",
        borderBottom: "1px solid var(--line)",
      }}>
        <div style={{
          position: "absolute", top: 8, left: 8,
          fontFamily: "var(--font-mono)", fontSize: 9,
          color: "rgba(0,0,0,0.55)", letterSpacing: "0.1em",
        }}>{role}</div>
        <div style={{
          position: "absolute", bottom: 8, right: 8,
          fontFamily: "var(--font-mono)", fontSize: 9,
          color: "rgba(0,0,0,0.55)",
        }}>Ω</div>
      </div>
      <div style={{ padding: "10px 12px", display: "flex", flexDirection: "column", gap: 2 }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--ink-0)" }}>{name}</div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10,
                      color: "var(--ink-2)", display: "flex", justifyContent: "space-between" }}>
          <span>{hex}</span>
          <span style={{ color: "var(--ink-3)" }}>{varname}</span>
        </div>
      </div>
    </div>
  );
}

// ── TYPE SPECIMEN
function TypeSpec({ name, family, sample, size, weight, useCase, italic = false }) {
  return (
    <div style={{
      padding: "20px 24px",
      borderTop: "1px solid var(--line)",
      display: "grid",
      gridTemplateColumns: "180px 1fr 220px",
      gap: 24, alignItems: "baseline",
    }}>
      <div>
        <div className="eyebrow" style={{ marginBottom: 4 }}>{name}</div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--ink-3)" }}>
          {family}<br/>
          {size}px / {weight}
        </div>
      </div>
      <div style={{ fontFamily: family, fontSize: size, fontWeight: weight,
                    fontStyle: italic ? "italic" : "normal",
                    color: "var(--ink-0)", letterSpacing: name === "DISPLAY" ? "-0.02em" : 0,
                    lineHeight: 1.05 }}>
        {sample}
      </div>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--ink-2)",
                    textTransform: "uppercase", letterSpacing: "0.14em" }}>
        {useCase}
      </div>
    </div>
  );
}

// ── INVENTORY ITEM card (game UI)
function InventoryItem({ name, type, equipped = false, isUGC = false, glyph = "⌬", note }) {
  return (
    <div style={{
      display: "flex", alignItems: "stretch", gap: 12,
      padding: 12,
      border: `1px solid ${equipped ? "var(--acc-primary)" : "var(--line)"}`,
      background: equipped ? "rgba(158,255,94,0.04)" : "var(--bg-2)",
      position: "relative",
      transition: "all 0.15s",
      boxShadow: equipped ? "var(--glow-primary)" : "none",
    }}>
      {/* glyph slot */}
      <div style={{
        width: 56, height: 56, flexShrink: 0,
        background: "var(--bg-3)", border: "1px solid var(--line)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "var(--font-display)", fontSize: 28,
        color: equipped ? "var(--acc-primary)" : "var(--ink-1)",
        textShadow: equipped ? "0 0 12px var(--acc-primary)" : "none",
        position: "relative",
      }}>
        {glyph}
        <span style={{ position: "absolute", top: 2, left: 2, fontFamily: "var(--font-mono)",
                       fontSize: 7, color: "var(--ink-3)" }}>+</span>
        <span style={{ position: "absolute", bottom: 2, right: 2, fontFamily: "var(--font-mono)",
                       fontSize: 7, color: "var(--ink-3)" }}>+</span>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 2, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--ink-0)",
                         fontWeight: 500 }}>{name}</span>
          {isUGC && <span style={{ fontSize: 8, color: "var(--acc-violet)",
                                    border: "1px solid var(--acc-violet)",
                                    padding: "1px 4px", letterSpacing: "0.1em" }}>UGC</span>}
        </div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10,
                      color: "var(--ink-2)", textTransform: "uppercase", letterSpacing: "0.14em" }}>
          {type}{note && <span style={{ color: "var(--ink-3)" }}> · {note}</span>}
        </div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 9,
                      color: equipped ? "var(--acc-primary)" : "var(--ink-3)",
                      textTransform: "uppercase", letterSpacing: "0.18em", marginTop: 4 }}>
          {equipped ? "▸ EQUIPPED" : "[ TAP TO EQUIP ]"}
        </div>
      </div>
    </div>
  );
}

// ── TERMINAL LOG line
function LogLine({ time, role, text, kind = "default", typing = false }) {
  const kindColors = {
    default: "var(--ink-1)",
    system: "var(--acc-primary)",
    danger: "var(--acc-danger)",
    omega: "var(--acc-violet)",
    voice: "var(--ink-0)",
  };
  return (
    <div style={{
      display: "flex", gap: 10, padding: "6px 0",
      fontFamily: "var(--font-mono)", fontSize: 12,
      borderBottom: "1px dashed var(--ink-4)",
    }}>
      <span style={{ color: "var(--ink-3)", flexShrink: 0, fontSize: 10, paddingTop: 1 }}>
        {time}
      </span>
      <span style={{ color: kindColors[kind], minWidth: 70, flexShrink: 0,
                     textTransform: "uppercase", letterSpacing: "0.1em", fontSize: 10, paddingTop: 1 }}>
        {role}
      </span>
      <span style={{ color: kindColors[kind], lineHeight: 1.55 }}>
        {text}
        {typing && <span style={{ animation: "blink 1s infinite", marginLeft: 2 }}>█</span>}
      </span>
    </div>
  );
}

// ── HOTSPOT marker (drawn over images)
function Hotspot({ x, y, label, status = "idle", size = 60 }) {
  const colors = {
    idle: "var(--ink-2)",
    hover: "var(--acc-primary)",
    danger: "var(--acc-danger)",
    found: "var(--acc-violet)",
  };
  const c = colors[status];
  return (
    <div style={{
      position: "absolute", left: x, top: y,
      width: size, height: size,
      transform: "translate(-50%, -50%)",
      pointerEvents: "none",
    }}>
      <svg viewBox="0 0 60 60" width={size} height={size}>
        {/* corner brackets */}
        <path d={`M 4 12 L 4 4 L 12 4`} stroke={c} strokeWidth="1.2" fill="none" />
        <path d={`M 56 12 L 56 4 L 48 4`} stroke={c} strokeWidth="1.2" fill="none" />
        <path d={`M 4 48 L 4 56 L 12 56`} stroke={c} strokeWidth="1.2" fill="none" />
        <path d={`M 56 48 L 56 56 L 48 56`} stroke={c} strokeWidth="1.2" fill="none" />
        {/* center reticle */}
        <circle cx="30" cy="30" r="8" stroke={c} strokeWidth="0.6" fill="none" opacity="0.5" />
        <line x1="30" y1="22" x2="30" y2="26" stroke={c} strokeWidth="0.8" />
        <line x1="30" y1="34" x2="30" y2="38" stroke={c} strokeWidth="0.8" />
        <line x1="22" y1="30" x2="26" y2="30" stroke={c} strokeWidth="0.8" />
        <line x1="34" y1="30" x2="38" y2="30" stroke={c} strokeWidth="0.8" />
        <circle cx="30" cy="30" r="1" fill={c} />
      </svg>
      {label && (
        <div style={{
          position: "absolute", top: -22, left: "50%",
          transform: "translateX(-50%)", whiteSpace: "nowrap",
          fontFamily: "var(--font-mono)", fontSize: 9,
          color: c, textTransform: "uppercase", letterSpacing: "0.14em",
          padding: "2px 6px", border: `1px solid ${c}`,
          background: "var(--bg-0)",
        }}>{label}</div>
      )}
    </div>
  );
}

// ── STATUS pill
function StatusPill({ label, value, tone = "default" }) {
  const c = {
    default: "var(--ink-1)",
    primary: "var(--acc-primary)",
    danger: "var(--acc-danger)",
    amber: "var(--acc-amber)",
    violet: "var(--acc-violet)",
  }[tone];
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 8,
      fontFamily: "var(--font-mono)", fontSize: 10,
      textTransform: "uppercase", letterSpacing: "0.16em",
    }}>
      <span style={{ color: "var(--ink-3)" }}>{label}:</span>
      <span style={{ color: c, textShadow: tone !== "default" ? `0 0 8px ${c}` : "none" }}>
        {value}
      </span>
    </div>
  );
}

// ── DIALOGUE BOX
function DialogueBox({ speaker, text, hint }) {
  return (
    <div style={{
      position: "relative",
      background: "var(--bg-1)",
      border: "1px solid var(--line-bright)",
      padding: "16px 20px 16px 20px",
    }}>
      <div style={{
        position: "absolute", top: -1, left: 12,
        background: "var(--bg-1)", padding: "0 8px",
        transform: "translateY(-50%)",
        fontFamily: "var(--font-mono)", fontSize: 9,
        color: "var(--acc-amber)", textTransform: "uppercase", letterSpacing: "0.18em",
      }}>// DIALOGUE TRANSCRIPT</div>
      <div style={{ display: "flex", gap: 12, alignItems: "baseline" }}>
        <span style={{
          fontFamily: "var(--font-display)", fontSize: 11, color: "var(--acc-primary)",
          textTransform: "uppercase", letterSpacing: "0.2em",
          minWidth: 92, flexShrink: 0,
        }}>{speaker}</span>
        <p style={{
          fontFamily: "var(--font-serif)", fontStyle: "italic",
          fontSize: 18, color: "var(--ink-0)", lineHeight: 1.4,
          textWrap: "pretty",
        }}>"{text}"</p>
      </div>
      {hint && (
        <div style={{
          marginTop: 10, paddingTop: 10, borderTop: "1px dashed var(--ink-4)",
          fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--ink-2)",
          textTransform: "uppercase", letterSpacing: "0.16em",
        }}>▸ {hint}</div>
      )}
    </div>
  );
}

// ── ROUND tab nav (top-level)
function NavTab({ icon, label, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      display: "inline-flex", alignItems: "center", gap: 8,
      padding: "8px 12px",
      fontFamily: "var(--font-mono)", fontSize: 11,
      textTransform: "uppercase", letterSpacing: "0.2em",
      color: active ? "var(--acc-primary)" : "var(--ink-2)",
      borderBottom: active ? "1px solid var(--acc-primary)" : "1px solid transparent",
      textShadow: active ? "0 0 12px var(--acc-primary)" : "none",
      transition: "all 0.15s",
    }}>
      {icon}
      <span>{label}</span>
    </button>
  );
}

Object.assign(window, {
  Panel, Btn, Metric, Swatch, TypeSpec, InventoryItem, LogLine,
  Hotspot, StatusPill, DialogueBox, NavTab,
});
