/* global React */
// ornaments.jsx — Cosmic / occult SVG primitives for HOPE OMEGA design system.
// Each ornament accepts size + color overrides; all draw in currentColor by default
// so they inherit from the surrounding ink.

const _R = React;

// ── OMEGA SEAL ─────────────────────────────────────────────────────────────
// Master brand mark. Concentric ritual rings, tick marks, central Ω in a
// star-burst frame. Used at sizes 32-240.
function OmegaSeal({ size = 96, glow = false, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" stroke={color}
         style={{ filter: glow ? `drop-shadow(0 0 12px ${color})` : undefined }}>
      {/* outer ring with ticks */}
      <circle cx="100" cy="100" r="92" strokeWidth="0.75" opacity="0.6" />
      <circle cx="100" cy="100" r="84" strokeWidth="0.5" opacity="0.35" strokeDasharray="1 4" />
      {[...Array(48)].map((_, i) => {
        const a = (i * Math.PI) / 24;
        const x1 = 100 + Math.cos(a) * 88;
        const y1 = 100 + Math.sin(a) * 88;
        const r2 = i % 6 === 0 ? 78 : 84;
        const x2 = 100 + Math.cos(a) * r2;
        const y2 = 100 + Math.sin(a) * r2;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                     strokeWidth={i % 6 === 0 ? 1 : 0.5} opacity={i % 6 === 0 ? 0.9 : 0.4} />;
      })}
      {/* starburst behind */}
      {[...Array(12)].map((_, i) => {
        const a = (i * Math.PI) / 6;
        return <line key={`b${i}`}
                     x1={100 + Math.cos(a) * 30}
                     y1={100 + Math.sin(a) * 30}
                     x2={100 + Math.cos(a) * 70}
                     y2={100 + Math.sin(a) * 70}
                     strokeWidth="0.6" opacity="0.35" />;
      })}
      {/* inner ring */}
      <circle cx="100" cy="100" r="38" strokeWidth="0.75" opacity="0.85" />
      {/* Ω glyph drawn geometrically */}
      <path d="M 80 130 L 70 130 L 70 122
               C 70 100, 78 80, 100 80
               C 122 80, 130 100, 130 122
               L 130 130 L 120 130
               M 84 130 L 96 130
               M 104 130 L 116 130"
            strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter" />
      {/* cardinal points */}
      <circle cx="100" cy="8" r="1.8" fill={color} stroke="none" />
      <circle cx="100" cy="192" r="1.8" fill={color} stroke="none" />
      <circle cx="8" cy="100" r="1.8" fill={color} stroke="none" />
      <circle cx="192" cy="100" r="1.8" fill={color} stroke="none" />
    </svg>
  );
}

// ── HOPE wordmark — glitch-broken capitals
function HopeMark({ height = 32, color = "currentColor", glitch = true }) {
  const w = (height / 32) * 120;
  return (
    <svg width={w} height={height} viewBox="0 0 120 32" fill="none"
         style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id="hopegrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="1" />
          <stop offset="100%" stopColor={color} stopOpacity="0.55" />
        </linearGradient>
      </defs>
      <text x="0" y="24" fontFamily="Major Mono Display, monospace"
            fontSize="26" letterSpacing="2" fill="url(#hopegrad)">HOPE</text>
      {glitch && (
        <>
          <text x="1.5" y="24" fontFamily="Major Mono Display, monospace"
                fontSize="26" letterSpacing="2" fill="var(--acc-danger)" opacity="0.55"
                style={{ mixBlendMode: "screen" }}>HOPE</text>
          <text x="-1.5" y="24" fontFamily="Major Mono Display, monospace"
                fontSize="26" letterSpacing="2" fill="var(--acc-cyan)" opacity="0.5"
                style={{ mixBlendMode: "screen" }}>HOPE</text>
        </>
      )}
      <line x1="0" y1="28" x2={w} y2="28" stroke={color} strokeWidth="0.5" opacity="0.3" />
    </svg>
  );
}

// ── Star chart background — wide constellation field with coordinate grid
function StarChart({ width = 800, height = 500, density = 1, seed = 7 }) {
  // deterministic random
  const rand = (i) => {
    const x = Math.sin(i * 9301 + seed * 49297) * 233280;
    return x - Math.floor(x);
  };
  const stars = [];
  const count = Math.round(140 * density);
  for (let i = 0; i < count; i++) {
    const x = rand(i) * width;
    const y = rand(i + 1000) * height;
    const r = rand(i + 2000) * 1.2 + 0.3;
    stars.push({ x, y, r, o: 0.3 + rand(i + 3000) * 0.7 });
  }
  // constellation lines connect bigger stars in a few clusters
  const big = stars.filter((s) => s.r > 1.0).slice(0, 20);
  const lines = [];
  for (let i = 0; i < big.length - 1; i++) {
    if (rand(i + 4000) > 0.55) {
      lines.push([big[i], big[i + 1]]);
    }
  }
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}
         style={{ pointerEvents: "none" }}>
      {/* coordinate grid */}
      <g stroke="currentColor" strokeWidth="0.4" opacity="0.18">
        {[...Array(Math.floor(width / 80))].map((_, i) => (
          <line key={`v${i}`} x1={i * 80} y1="0" x2={i * 80} y2={height} />
        ))}
        {[...Array(Math.floor(height / 80))].map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 80} x2={width} y2={i * 80} />
        ))}
      </g>
      {/* coord labels */}
      <g fill="currentColor" fontFamily="JetBrains Mono, monospace" fontSize="7" opacity="0.4">
        {[...Array(Math.floor(width / 80))].map((_, i) => (
          <text key={`tv${i}`} x={i * 80 + 3} y="10">{String(i * 80).padStart(3, "0")}</text>
        ))}
        {[...Array(Math.floor(height / 80))].map((_, i) => i > 0 && (
          <text key={`th${i}`} x="3" y={i * 80 + 8}>{`R${String(i).padStart(2, "0")}`}</text>
        ))}
      </g>
      {/* constellation lines */}
      <g stroke="currentColor" strokeWidth="0.5" opacity="0.5">
        {lines.map(([a, b], i) => (
          <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} />
        ))}
      </g>
      {/* stars */}
      <g fill="currentColor">
        {stars.map((s, i) => (
          <circle key={i} cx={s.x} cy={s.y} r={s.r} opacity={s.o} />
        ))}
      </g>
      {/* highlighted "named" stars */}
      {big.slice(0, 6).map((s, i) => (
        <g key={i} fontFamily="JetBrains Mono, monospace" fontSize="7"
           fill="currentColor" opacity="0.7">
          <circle cx={s.x} cy={s.y} r={s.r * 2.2} fill="none" stroke="currentColor"
                  strokeWidth="0.5" opacity="0.5" />
          <text x={s.x + 6} y={s.y + 3}>HD-{Math.floor(rand(i + 5000) * 9999)}</text>
        </g>
      ))}
    </svg>
  );
}

// ── Ritual circle — concentric, with hebrew/alien glyphs along the rings
function RitualCircle({ size = 320, color = "currentColor" }) {
  const glyphs = "⏃⏚⏃⏁⏀⏂⏆⏅⏇⏈⏉⏊⏋⏌⏍⏎⏏⌬⌖⌘⌗⌥⌬⌖⌘⌗⌥";
  const radius = 120;
  return (
    <svg width={size} height={size} viewBox="0 0 320 320" fill="none" stroke={color}
         style={{ overflow: "visible" }}>
      <defs>
        <path id="rc-path" d={`M 160 ${160 - radius} A ${radius} ${radius} 0 1 1 160 ${160 + radius} A ${radius} ${radius} 0 1 1 160 ${160 - radius}`} />
      </defs>
      {/* concentric rings */}
      {[150, 132, 110, 90, 70, 50, 30].map((r, i) => (
        <circle key={i} cx="160" cy="160" r={r}
                strokeWidth={i === 0 ? 1 : 0.5}
                opacity={1 - i * 0.1}
                strokeDasharray={i % 2 === 0 ? "" : "2 4"} />
      ))}
      {/* radial spokes */}
      {[...Array(24)].map((_, i) => {
        const a = (i * Math.PI) / 12;
        return <line key={i}
                     x1={160 + Math.cos(a) * 50} y1={160 + Math.sin(a) * 50}
                     x2={160 + Math.cos(a) * 150} y2={160 + Math.sin(a) * 150}
                     strokeWidth={i % 3 === 0 ? 0.7 : 0.3}
                     opacity={i % 3 === 0 ? 0.7 : 0.3} />;
      })}
      {/* triangle inside */}
      <polygon points="160,80 220,184 100,184" strokeWidth="0.6" opacity="0.7" />
      <polygon points="160,240 100,136 220,136" strokeWidth="0.6" opacity="0.7" />
      {/* alien glyphs along outer ring */}
      <text fill={color} opacity="0.6" fontSize="10" fontFamily="JetBrains Mono, monospace">
        <textPath href="#rc-path" startOffset="0">{glyphs}</textPath>
      </text>
      {/* center omega */}
      <text x="160" y="172" textAnchor="middle" fontFamily="Major Mono Display, monospace"
            fontSize="48" fill={color} stroke="none" opacity="0.85">Ω</text>
    </svg>
  );
}

// ── Coordinate readout — corner decoration with values
function CoordReadout({ label = "DMZ-04", lat = "38°02'17N", lon = "127°44'09E", className = "" }) {
  return (
    <div className={className} style={{
      display: "inline-flex", flexDirection: "column", gap: 2,
      fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--ink-2)",
      letterSpacing: "0.08em",
    }}>
      <div style={{ color: "var(--ink-1)", letterSpacing: "0.18em" }}>// {label}</div>
      <div>LAT {lat}</div>
      <div>LON {lon}</div>
    </div>
  );
}

// ── Alien glyph row — runic-looking string for headers
function GlyphRow({ count = 8, size = 14, color = "currentColor" }) {
  const glyphs = ["⏃","⏁","⏀","⏆","⏈","⏊","⏌","⏎","⌬","⌖","⌘","⌗","⌜","⌞","⌟","⌝"];
  return (
    <span style={{ display: "inline-flex", gap: 8, color, fontFamily: "monospace", fontSize: size, opacity: 0.7 }}>
      {[...Array(count)].map((_, i) => (
        <span key={i}>{glyphs[(i * 3 + 5) % glyphs.length]}</span>
      ))}
    </span>
  );
}

// ── Radar dial — small monitoring widget
function RadarDial({ size = 120, color = "var(--acc-primary)" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      <circle cx="60" cy="60" r="56" stroke={color} strokeWidth="0.6" opacity="0.6" />
      <circle cx="60" cy="60" r="40" stroke={color} strokeWidth="0.4" opacity="0.4" />
      <circle cx="60" cy="60" r="22" stroke={color} strokeWidth="0.4" opacity="0.4" />
      <line x1="60" y1="4" x2="60" y2="116" stroke={color} strokeWidth="0.3" opacity="0.3" />
      <line x1="4" y1="60" x2="116" y2="60" stroke={color} strokeWidth="0.3" opacity="0.3" />
      <g style={{ transformOrigin: "60px 60px", animation: "orbit 4s linear infinite" }}>
        <path d="M 60 60 L 60 6 A 54 54 0 0 1 110 50 Z" fill={color} opacity="0.18" />
        <line x1="60" y1="60" x2="60" y2="6" stroke={color} strokeWidth="0.8" />
      </g>
      <circle cx="78" cy="32" r="2" fill={color} />
      <circle cx="42" cy="76" r="1.5" fill={color} opacity="0.7" />
      <circle cx="90" cy="70" r="1.2" fill={color} opacity="0.5" />
    </svg>
  );
}

// ── Generic icon set used in UI
const Icons = {
  Cursor: ({ size = 14, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" stroke={color} strokeWidth="1.2">
      <path d="M2 1 L2 11 L5 8 L7 13 L9 12 L7 7 L12 7 Z" />
    </svg>
  ),
  Reticle: ({ size = 14, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" stroke={color} strokeWidth="1">
      <circle cx="7" cy="7" r="5" />
      <line x1="7" y1="0" x2="7" y2="3" />
      <line x1="7" y1="11" x2="7" y2="14" />
      <line x1="0" y1="7" x2="3" y2="7" />
      <line x1="11" y1="7" x2="14" y2="7" />
      <circle cx="7" cy="7" r="1" fill={color} />
    </svg>
  ),
  Warning: ({ size = 14, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" stroke={color} strokeWidth="1.2">
      <path d="M7 1 L13 12 L1 12 Z" />
      <line x1="7" y1="5" x2="7" y2="8.5" />
      <circle cx="7" cy="10.5" r="0.6" fill={color} />
    </svg>
  ),
  Eye: ({ size = 14, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" stroke={color} strokeWidth="1">
      <path d="M1 7 C 3 3, 11 3, 13 7 C 11 11, 3 11, 1 7 Z" />
      <circle cx="7" cy="7" r="2" />
      <circle cx="7" cy="7" r="0.6" fill={color} />
    </svg>
  ),
  Wallet: ({ size = 14, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" stroke={color} strokeWidth="1">
      <rect x="1" y="3" width="12" height="9" />
      <rect x="9" y="6" width="4" height="3" />
      <circle cx="11" cy="7.5" r="0.5" fill={color} />
    </svg>
  ),
  Home: ({ size = 14, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" stroke={color} strokeWidth="1">
      <path d="M2 6 L7 2 L12 6 L12 12 L2 12 Z" />
      <line x1="6" y1="12" x2="6" y2="9" />
      <line x1="8" y1="12" x2="8" y2="9" />
    </svg>
  ),
  Film: ({ size = 14, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" stroke={color} strokeWidth="1">
      <rect x="1" y="2" width="12" height="10" />
      <line x1="3.5" y1="2" x2="3.5" y2="12" />
      <line x1="10.5" y1="2" x2="10.5" y2="12" />
      <line x1="1" y1="4" x2="3.5" y2="4" />
      <line x1="1" y1="10" x2="3.5" y2="10" />
      <line x1="10.5" y1="4" x2="13" y2="4" />
      <line x1="10.5" y1="10" x2="13" y2="10" />
    </svg>
  ),
  Game: ({ size = 14, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" stroke={color} strokeWidth="1">
      <rect x="1" y="4" width="12" height="6" rx="2" />
      <line x1="4" y1="6" x2="4" y2="8" />
      <line x1="3" y1="7" x2="5" y2="7" />
      <circle cx="9" cy="6.5" r="0.6" fill={color} />
      <circle cx="11" cy="7.5" r="0.6" fill={color} />
    </svg>
  ),
  Users: ({ size = 14, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" stroke={color} strokeWidth="1">
      <circle cx="5" cy="5" r="2" />
      <path d="M1 12 C 1 8, 9 8, 9 12" />
      <circle cx="10" cy="6" r="1.5" />
      <path d="M9 12 C 10 10, 13 10, 13 12" />
    </svg>
  ),
  User: ({ size = 14, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" stroke={color} strokeWidth="1">
      <circle cx="7" cy="5" r="2.5" />
      <path d="M2 12 C 2 8, 12 8, 12 12" />
    </svg>
  ),
  Arrow: ({ size = 14, color = "currentColor", dir = "right" }) => {
    const rot = { right: 0, left: 180, up: -90, down: 90 }[dir] || 0;
    return (
      <svg width={size} height={size} viewBox="0 0 14 14" fill="none" stroke={color}
           strokeWidth="1.2" style={{ transform: `rotate(${rot}deg)` }}>
        <line x1="2" y1="7" x2="12" y2="7" />
        <path d="M8 3 L12 7 L8 11" />
      </svg>
    );
  },
  Cross: ({ size = 14, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" stroke={color} strokeWidth="1.2">
      <line x1="2" y1="2" x2="12" y2="12" />
      <line x1="12" y1="2" x2="2" y2="12" />
    </svg>
  ),
  Plus: ({ size = 14, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" stroke={color} strokeWidth="1.2">
      <line x1="7" y1="2" x2="7" y2="12" />
      <line x1="2" y1="7" x2="12" y2="7" />
    </svg>
  ),
};

Object.assign(window, {
  OmegaSeal, HopeMark, StarChart, RitualCircle, CoordReadout,
  GlyphRow, RadarDial, Icons,
});
