/* global React, OmegaSeal, HopeMark, StarChart, RitualCircle, CoordReadout, GlyphRow, RadarDial, Icons, Panel, Btn, Metric, Swatch, TypeSpec */

// ── SECTION wrapper ───────────────────────────────────────────────────────
function Section({ num, title, kicker, subtitle, children, ornament, id }) {
  return (
    <section id={id} style={{ position: "relative", padding: "80px 0 64px", overflow: "hidden" }}>
      {ornament && (
        <div className="sigil-bg" style={{
          position: "absolute", inset: 0, opacity: 0.18,
          display: "flex", alignItems: "center", justifyContent: "flex-end",
          pointerEvents: "none",
        }}>
          {ornament}
        </div>
      )}
      <div className="page" style={{ position: "relative", zIndex: 1 }}>
        <header style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
          gap: 32, alignItems: "end",
          marginBottom: 48,
          paddingBottom: 24,
          borderBottom: "1px solid var(--line)",
        }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 12 }}>
              {num} / {kicker}
            </div>
            <h2 className="h-section">{title}</h2>
          </div>
          {subtitle && (
            <p className="serif" style={{
              fontStyle: "italic", fontSize: 19, color: "var(--ink-1)",
              lineHeight: 1.4, maxWidth: 580, textWrap: "pretty",
            }}>{subtitle}</p>
          )}
        </header>
        {children}
      </div>
    </section>
  );
}

// ── 00 — HERO / IDENTITY ────────────────────────────────────────────────
function HeroSection() {
  return (
    <section style={{ position: "relative", overflow: "hidden",
                       borderBottom: "1px solid var(--line)", paddingBottom: 96 }}>
      {/* big star chart behind */}
      <div style={{ position: "absolute", inset: 0, color: "var(--ink-3)",
                    opacity: 0.55, pointerEvents: "none", overflow: "hidden" }}>
        <StarChart width={1800} height={1000} density={1.4} seed={11} />
      </div>
      {/* horizontal scan line */}
      <div style={{
        position: "absolute", left: 0, right: 0, height: 60,
        background: "linear-gradient(180deg, transparent, rgba(158,255,94,0.06), transparent)",
        animation: "scan-roll 8s linear infinite",
        pointerEvents: "none", zIndex: 1,
      }} />
      {/* drifting ritual circle */}
      <div style={{ position: "absolute", right: -120, top: 120, color: "var(--acc-violet)",
                     opacity: 0.12, animation: "drift-slow 120s linear infinite",
                     pointerEvents: "none" }}>
        <RitualCircle size={520} />
      </div>

      {/* top status rail */}
      <div className="page" style={{ position: "relative", paddingTop: 18, zIndex: 2 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
                       fontFamily: "var(--font-mono)", fontSize: 10,
                       color: "var(--ink-3)", textTransform: "uppercase", letterSpacing: "0.2em" }}>
          <span>// TRANSMISSION INTERCEPT — DMZ–04 // 18:40:22 KST</span>
          <span style={{ display: "flex", gap: 24, alignItems: "center" }}>
            <span>SIGNAL <span style={{ color: "var(--acc-primary)" }}>██████░░</span></span>
            <span>EPISODE <span style={{ color: "var(--ink-0)" }}>01</span> / 07</span>
            <span style={{ color: "var(--acc-danger)" }}>● BREACH MONITORED</span>
          </span>
        </div>
      </div>

      <div className="page" style={{ position: "relative", zIndex: 2, paddingTop: 120 }}>
        <div style={{ display: "grid",
                       gridTemplateColumns: "minmax(0, 1.4fr) minmax(0, 1fr)",
                       gap: 64, alignItems: "center" }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 18, color: "var(--acc-primary)" }}>
              <GlyphRow count={6} size={11} /> &nbsp; OMEGA // PROTOCOL v0.3.0
            </div>
            <h1 className="h-display glitch-text" data-text="HOPE">HOPE</h1>
            <p className="h-serif" style={{
              fontSize: 28, color: "var(--ink-1)",
              maxWidth: 540, marginTop: 24, textWrap: "pretty",
            }}>
              A design system for a cinematic, point-and-click game set in a
              fog-thick DMZ village where an older horror has begun to surface.
            </p>
            <div style={{ display: "flex", gap: 24, marginTop: 48 }}>
              <Metric label="palettes" value="03" />
              <Metric label="components" value="24" tone="violet" />
              <Metric label="glyphs" value="48" tone="amber" />
              <Metric label="motion specs" value="07" tone="primary" />
            </div>
          </div>

          <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
            <div className="flicker" style={{ position: "relative" }}>
              <OmegaSeal size={320} glow />
              {/* concentric annotations */}
              <div style={{ position: "absolute", top: -8, left: "50%",
                             transform: "translateX(-50%)",
                             fontFamily: "var(--font-mono)", fontSize: 9,
                             color: "var(--acc-danger)",
                             letterSpacing: "0.4em" }}>Ω · MARK · Ω</div>
              <div style={{ position: "absolute", bottom: -28, left: "50%",
                             transform: "translateX(-50%)", whiteSpace: "nowrap",
                             fontFamily: "var(--font-mono)", fontSize: 9,
                             color: "var(--ink-2)",
                             letterSpacing: "0.3em" }}>OMNIBUS · CALCULATED · 19840701</div>
            </div>

            {/* coord readouts in corners */}
            <div style={{ position: "absolute", top: 0, right: 0 }}>
              <CoordReadout label="HOPO PORT" lat="38°02'17N" lon="127°44'09E" />
            </div>
            <div style={{ position: "absolute", bottom: -40, left: 0 }}>
              <CoordReadout label="SECTOR ε–9" lat="UNKNOWN" lon="UNKNOWN" />
            </div>
          </div>
        </div>

        {/* big quote block */}
        <div style={{
          marginTop: 96, padding: "32px 0 0",
          borderTop: "1px solid var(--line)",
          display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 2fr)",
          gap: 48, alignItems: "start",
        }}>
          <div className="eyebrow">// FIRST CONTACT // EP-01 / FRAGMENT 03</div>
          <blockquote className="h-serif" style={{ fontSize: 26, color: "var(--ink-0)",
                                                    textWrap: "pretty", maxWidth: 820 }}>
            "We are completely blocked. No phones, no police radios. The fog is
            crawling in like it remembers something. <span style={{ color: "var(--acc-danger)" }}>
            Keep your eyes open — and don't trust what they show you.</span>"
            <footer style={{ marginTop: 16, fontFamily: "var(--font-mono)",
                              fontSize: 10, color: "var(--ink-3)",
                              textTransform: "uppercase", letterSpacing: "0.18em", fontStyle: "normal" }}>
              — OFFICER BUM-SEOK · HOPO SUBSTATION · 18:42 KST
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}

// ── 01 — COSMOGONY (colors) ─────────────────────────────────────────────
function ColorSection({ palette }) {
  const palettes = {
    void: [
      { name: "Void", hex: "#03030a", varname: "--bg-0", role: "BG / DEEP" },
      { name: "Substrate", hex: "#0a0a17", varname: "--bg-2", role: "PANEL" },
      { name: "Elevated", hex: "#11111f", varname: "--bg-3", role: "ELEVATED" },
      { name: "Bone", hex: "#ece9df", varname: "--ink-0", role: "INK / PRIMARY" },
      { name: "Ash", hex: "#7a7770", varname: "--ink-2", role: "INK / MUTED" },
      { name: "Alien Green", hex: "#9eff5e", varname: "--acc-primary", role: "ACCENT / SIGNAL" },
      { name: "Omega Red", hex: "#ff3a55", varname: "--acc-danger", role: "ACCENT / SIREN" },
      { name: "Sigil Violet", hex: "#b377ff", varname: "--acc-violet", role: "ACCENT / OCCULT" },
      { name: "Warning Amber", hex: "#ffb84d", varname: "--acc-amber", role: "WARN" },
      { name: "Signal Cyan", hex: "#5cf2e2", varname: "--acc-cyan", role: "DATA" },
    ],
    blood: [
      { name: "Tar", hex: "#080101", varname: "--bg-0", role: "BG / DEEP" },
      { name: "Iron", hex: "#150505", varname: "--bg-2", role: "PANEL" },
      { name: "Clot", hex: "#2a0c0c", varname: "--bg-4", role: "ELEVATED" },
      { name: "Linen", hex: "#ffeae0", varname: "--ink-0", role: "INK / PRIMARY" },
      { name: "Smoke", hex: "#8a6f66", varname: "--ink-2", role: "INK / MUTED" },
      { name: "Arterial", hex: "#ff2a3d", varname: "--acc-primary", role: "ACCENT / SIGNAL" },
      { name: "Bile", hex: "#ffd24a", varname: "--acc-danger", role: "ACCENT / SIREN" },
      { name: "Wound", hex: "#ff6b9a", varname: "--acc-violet", role: "ACCENT / OCCULT" },
      { name: "Ember", hex: "#ff8a3a", varname: "--acc-amber", role: "WARN" },
      { name: "Pulse", hex: "#ff9a8a", varname: "--acc-cyan", role: "DATA" },
    ],
    alien: [
      { name: "Hull", hex: "#02100a", varname: "--bg-0", role: "BG / DEEP" },
      { name: "Pool", hex: "#051a12", varname: "--bg-2", role: "PANEL" },
      { name: "Tide", hex: "#0e3122", varname: "--bg-4", role: "ELEVATED" },
      { name: "Mint Bone", hex: "#d8ffec", varname: "--ink-0", role: "INK / PRIMARY" },
      { name: "Algae", hex: "#6b9582", varname: "--ink-2", role: "INK / MUTED" },
      { name: "Bioluminescence", hex: "#6eff9e", varname: "--acc-primary", role: "ACCENT / SIGNAL" },
      { name: "Caustic", hex: "#ffe23a", varname: "--acc-danger", role: "ACCENT / SIREN" },
      { name: "Plasm", hex: "#61f7e4", varname: "--acc-violet", role: "ACCENT / OCCULT" },
      { name: "Sour", hex: "#b9ff52", varname: "--acc-amber", role: "WARN" },
      { name: "Glow", hex: "#79f7d1", varname: "--acc-cyan", role: "DATA" },
    ],
  };
  const list = palettes[palette];

  return (
    <Section id="color" num="01" kicker="COSMOGONY"
             title="Palette"
             subtitle="Three runs of pigment, each tuned to a different reading of the same fog. Switch between them in the Tweaks rail."
             ornament={<div style={{ color: "var(--acc-violet)" }}><RitualCircle size={420} /></div>}>
      <div style={{ display: "flex", gap: 12, marginBottom: 32, flexWrap: "wrap" }}>
        <div className="badge"><span className="dot" /> ACTIVE · {palette.toUpperCase()}</div>
        <div className="badge">Ω BG / INK / ACCENT</div>
        <div className="badge">WCAG · contrast verified</div>
      </div>
      <div style={{ display: "grid",
                     gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                     gap: 12 }}>
        {list.map((c) => <Swatch key={c.varname} {...c} />)}
      </div>

      {/* palette diagram */}
      <div style={{
        marginTop: 48, padding: "32px",
        border: "1px solid var(--line)", background: "var(--bg-2)",
        display: "grid", gridTemplateColumns: "auto 1fr", gap: 32, alignItems: "center",
      }}>
        <div style={{ color: "var(--acc-primary)" }}><OmegaSeal size={140} /></div>
        <div>
          <div className="eyebrow" style={{ marginBottom: 8 }}>// CONTRAST CHAIN</div>
          <p className="serif" style={{ fontStyle: "italic", fontSize: 17, color: "var(--ink-1)",
                                          lineHeight: 1.5, marginBottom: 16, textWrap: "pretty" }}>
            Backgrounds are crushed almost to true black — anything not deliberately
            glowing must read as instrument readout, not interface. Accents are saved
            for state changes, not decoration.
          </p>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            <StatusEntry name="BG ladder" value="bg-0 → bg-4 · 5 steps" />
            <StatusEntry name="Ink ladder" value="ink-0 → ink-4 · 5 steps" />
            <StatusEntry name="Accents" value="primary · danger · violet · amber · cyan" />
            <StatusEntry name="Glow" value="3 envelopes per accent" />
          </div>
        </div>
      </div>
    </Section>
  );
}

function StatusEntry({ name, value }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <div className="eyebrow" style={{ fontSize: 10 }}>{name}</div>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-1)" }}>
        {value}
      </div>
    </div>
  );
}

// ── 02 — LITURGY (typography) ───────────────────────────────────────────
function TypeSection() {
  return (
    <Section id="type" num="02" kicker="LITURGY"
             title="Typography"
             subtitle="Four families build the voice — Major Mono for ritual headlines, JetBrains Mono for telemetry, VT323 for CRT terminal, and Cormorant Garamond for the cosmic-horror dialogue."
             ornament={
               <div style={{ color: "var(--ink-3)", fontSize: 180, fontFamily: "var(--font-display)",
                              lineHeight: 0.8, paddingRight: 32 }}>Ω</div>
             }>
      <div style={{ border: "1px solid var(--line)", background: "var(--bg-2)" }}>
        <TypeSpec name="DISPLAY"
                  family="Major Mono Display, monospace"
                  sample="OMEGA // SIGNAL"
                  size={64} weight={400}
                  useCase="HEADLINES · BRANDED MARKS · BIG NUMBERS" />
        <TypeSpec name="SECTION"
                  family="Major Mono Display, monospace"
                  sample="COSMOGONY"
                  size={42} weight={400}
                  useCase="SECTION OPENERS · WAYFINDING" />
        <TypeSpec name="DIALOGUE"
                  family="Cormorant Garamond, serif"
                  sample={`"And the fog remembered what we had buried —"`}
                  size={28} weight={300} italic
                  useCase="CHARACTER DIALOGUE · OCCULT BLOCKQUOTES · NARRATION" />
        <TypeSpec name="BODY"
                  family="JetBrains Mono, monospace"
                  sample="The radar drum spun, then locked onto a return that should not have been there."
                  size={14} weight={400}
                  useCase="UI · LOGS · LABELS · TELEMETRY" />
        <TypeSpec name="EYEBROW"
                  family="JetBrains Mono, monospace"
                  sample="// TELEMETRY · INTERCEPT · OMEGA-04"
                  size={11} weight={500}
                  useCase="OVERLINES · SECTION TAGS · LETTERSPACED 0.18em" />
        <TypeSpec name="CRT"
                  family="VT323, monospace"
                  sample="[SYSTEM 18:40] BREACH DETECTED · PRIORITY OMEGA · STAND BY..."
                  size={20} weight={400}
                  useCase="TERMINAL OUTPUT · ALERT TICKER · DIEGETIC OS" />
      </div>

      {/* hierarchy chart */}
      <div style={{ marginTop: 40, display: "grid",
                     gridTemplateColumns: "repeat(2, minmax(0,1fr))", gap: 24 }}>
        <Panel label="// SCALE" tone="default">
          <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              ["96 / display / hero", 96, "var(--font-display)"],
              ["56 / section", 56, "var(--font-display)"],
              ["32 / subhead", 32, "var(--font-display)"],
              ["20 / lead", 20, "var(--font-serif)", "italic"],
              ["14 / body", 14, "var(--font-mono)"],
              ["11 / micro", 11, "var(--font-mono)"],
            ].map(([label, size, font, style]) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between",
                                           alignItems: "baseline",
                                           borderBottom: "1px dashed var(--ink-4)", paddingBottom: 6 }}>
                <span style={{ fontFamily: font, fontSize: size, fontStyle: style,
                                color: "var(--ink-0)", lineHeight: 1 }}>Aa</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10,
                                color: "var(--ink-3)", letterSpacing: "0.14em" }}>{label}</span>
              </div>
            ))}
          </div>
        </Panel>
        <Panel label="// TRACKING & TONE" tone="default">
          <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 18 }}>
            {[
              { label: "TIGHT (-0.02em)", sample: "DEEP RADIO", font: "var(--font-display)" },
              { label: "MONO (0.02em)", sample: "navigation console online", font: "var(--font-mono)" },
              { label: "CAPS (0.18em)", sample: "PROTOCOL OMEGA", caps: true, font: "var(--font-mono)" },
              { label: "OMEGA (0.32em)", sample: "Ω · OMNIBUS · Ω", caps: true, font: "var(--font-mono)" },
            ].map((s) => (
              <div key={s.label}>
                <div style={{ fontFamily: s.font, fontSize: 18,
                                color: "var(--ink-0)",
                                textTransform: s.caps ? "uppercase" : "none",
                                letterSpacing:
                                  s.label.includes("TIGHT") ? "-0.02em" :
                                  s.label.includes("OMEGA") ? "0.32em" :
                                  s.label.includes("CAPS") ? "0.18em" : "0.02em",
                                marginBottom: 4 }}>{s.sample}</div>
                <div className="eyebrow" style={{ fontSize: 9 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </Section>
  );
}

// ── 03 — APPARATUS (iconography & ornaments) ────────────────────────────
function IconographySection() {
  return (
    <Section id="icons" num="03" kicker="APPARATUS"
             title="Iconography & Ornament"
             subtitle="Custom geometry — half UI affordance, half talisman. Every icon is drawn from the same 14-unit grid and resolves to currentColor.">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                     gap: 24 }}>
        <Panel label="// UI ICONS · 14u">
          <div style={{ padding: 20, display: "grid",
                          gridTemplateColumns: "repeat(5, 1fr)", gap: 14 }}>
            {Object.entries(Icons).filter(([k]) => k !== "Arrow").map(([k, Ic]) => (
              <div key={k} style={{
                aspectRatio: "1", display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center", gap: 8,
                border: "1px solid var(--line)", background: "var(--bg-1)",
              }}>
                <Ic size={20} color="var(--acc-primary)" />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 8,
                                color: "var(--ink-2)", textTransform: "uppercase",
                                letterSpacing: "0.16em" }}>{k}</span>
              </div>
            ))}
          </div>
        </Panel>

        <Panel label="// SIGILS & ORNAMENT" tone="violet">
          <div style={{ padding: 20, display: "grid",
                          gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>
            <OrnamentTile name="OMEGA SEAL" desc="Brand mark · ritual ring + Ω">
              <OmegaSeal size={120} color="var(--acc-primary)" />
            </OrnamentTile>
            <OrnamentTile name="RITUAL CIRCLE" desc="Section ornament · 320u">
              <div style={{ color: "var(--acc-violet)" }}><RitualCircle size={120} /></div>
            </OrnamentTile>
            <OrnamentTile name="RADAR DIAL" desc="Telemetry widget · live">
              <RadarDial size={100} />
            </OrnamentTile>
            <OrnamentTile name="STAR FIELD" desc="Section background · seeded">
              <div style={{ color: "var(--ink-1)", width: 120, height: 100, overflow: "hidden" }}>
                <StarChart width={120} height={100} density={2} seed={3} />
              </div>
            </OrnamentTile>
          </div>
        </Panel>
      </div>

      {/* Alien glyph catalog */}
      <div style={{ marginTop: 32, padding: "28px 32px",
                     border: "1px solid var(--line)", background: "var(--bg-2)" }}>
        <div className="eyebrow" style={{ marginBottom: 16 }}>// ALIEN GLYPH SET · 48 GLYPHS</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(16, 1fr)", gap: 8 }}>
          {["⏃","⏁","⏀","⏂","⏆","⏅","⏇","⏈","⏉","⏊","⏋","⏌","⏍","⏎","⏏","⌬",
            "⌖","⌘","⌗","⌥","⌜","⌞","⌟","⌝","◈","◊","◉","◎","◍","◐","◑","◒",
            "✦","✧","✪","✫","✬","✭","✮","✯","✰","✱","☼","☽","☾","♅","♆","♇"].map((g, i) => (
            <div key={i} style={{
              aspectRatio: "1",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 22, fontFamily: "var(--font-mono)",
              color: "var(--acc-violet)",
              border: "1px solid var(--ink-4)", background: "var(--bg-1)",
              opacity: 0.8,
            }}>{g}</div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function OrnamentTile({ name, desc, children }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 16,
      padding: 16, border: "1px solid var(--line)", background: "var(--bg-1)",
    }}>
      <div style={{ flexShrink: 0, width: 120, height: 120,
                     display: "flex", alignItems: "center", justifyContent: "center" }}>
        {children}
      </div>
      <div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-0)",
                       textTransform: "uppercase", letterSpacing: "0.12em" }}>{name}</div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--ink-3)",
                       marginTop: 4, letterSpacing: "0.04em" }}>{desc}</div>
      </div>
    </div>
  );
}

Object.assign(window, { Section, HeroSection, ColorSection, TypeSection, IconographySection });
