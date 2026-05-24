/* global React, ReactDOM, useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakSlider, TweakSelect, TweakColor, HeroSection, ColorSection, TypeSection, IconographySection, ComponentsSection, ApplicationSection, OmegaSeal, HopeMark, RadarDial, Icons */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "void",
  "glitch": 70,
  "ornaments": "standard",
  "density": "regular"
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // sync palette to document root + glitch CSS var
  React.useEffect(() => {
    document.documentElement.setAttribute("data-palette", t.palette);
    document.documentElement.style.setProperty("--glitch", String(t.glitch / 100));
    document.documentElement.setAttribute("data-ornaments", t.ornaments);
    document.documentElement.setAttribute("data-density", t.density);
  }, [t.palette, t.glitch, t.ornaments, t.density]);

  return (
    <>
      <SiteChrome />
      <main>
        <HeroSection />
        <ColorSection palette={t.palette} />
        <TypeSection />
        <IconographySection />
        <ComponentsSection />
        <ApplicationSection />
      </main>
      <SiteFooter />

      <TweaksPanel title="OMEGA · TWEAKS">
        <TweakSection label="Palette">
          <TweakColor
            label="Mode"
            value={t.palette}
            options={[
              { value: "void",  label: ["#030309", "#9eff5e", "#ff3a55", "#b377ff"] },
              { value: "blood", label: ["#080101", "#ff2a3d", "#ffd24a", "#ff6b9a"] },
              { value: "alien", label: ["#02100a", "#6eff9e", "#ffe23a", "#61f7e4"] },
            ].map((o) => o.label)}
            onChange={() => {}}
          />
          <TweakRadio
            label=""
            value={t.palette}
            options={[
              { value: "void", label: "VOID" },
              { value: "blood", label: "BLOOD" },
              { value: "alien", label: "ALIEN" },
            ]}
            onChange={(v) => setTweak("palette", v)}
          />
        </TweakSection>

        <TweakSection label="Motion">
          <TweakSlider
            label="Glitch intensity"
            value={t.glitch}
            min={0}
            max={100}
            step={5}
            unit="%"
            onChange={(v) => setTweak("glitch", v)}
          />
        </TweakSection>

        <TweakSection label="Ornament density">
          <TweakRadio
            label="Sigils + star fields"
            value={t.ornaments}
            options={[
              { value: "minimal",  label: "Min" },
              { value: "standard", label: "Std" },
              { value: "maximum",  label: "Max" },
            ]}
            onChange={(v) => setTweak("ornaments", v)}
          />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

// ── Sticky site chrome (the design-system page's own nav) ───────────────
function SiteChrome() {
  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 100,
      background: "rgba(3, 3, 9, 0.85)",
      backdropFilter: "blur(14px) saturate(160%)",
      borderBottom: "1px solid var(--line)",
    }}>
      <div className="page" style={{
        display: "grid",
        gridTemplateColumns: "auto 1fr auto",
        alignItems: "center", gap: 24,
        padding: "14px 0",
      }}>
        <a href="#top" style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <OmegaSeal size={32} color="var(--acc-primary)" />
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
            <span style={{ fontFamily: "var(--font-display)", fontSize: 13,
                            color: "var(--ink-0)", letterSpacing: "0.16em" }}>
              HOPE / OMEGA
            </span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 9,
                            color: "var(--ink-3)", letterSpacing: "0.18em" }}>
              DESIGN SYSTEM · v0.3.0
            </span>
          </div>
        </a>
        <nav style={{ display: "flex", gap: 24, justifyContent: "center" }}>
          {[
            ["00 / SIGNAL", "#hero"],
            ["01 / COSMOGONY", "#color"],
            ["02 / LITURGY", "#type"],
            ["03 / APPARATUS", "#icons"],
            ["04 / MECHANISM", "#components"],
            ["05 / SUBSTATION", "#application"],
          ].map(([label, href]) => (
            <a key={label} href={href} style={{
              fontFamily: "var(--font-mono)", fontSize: 10,
              color: "var(--ink-2)", textTransform: "uppercase",
              letterSpacing: "0.18em",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "var(--acc-primary)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "var(--ink-2)"; }}>
              {label}
            </a>
          ))}
        </nav>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <RadarDial size={26} />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10,
                          color: "var(--acc-primary)", letterSpacing: "0.2em" }}>
            ● LIVE
          </span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10,
                          color: "var(--ink-3)", letterSpacing: "0.16em" }}>
            18:43 KST
          </span>
        </div>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer style={{
      borderTop: "1px solid var(--line)", padding: "48px 0",
      background: "var(--bg-0)", position: "relative", overflow: "hidden",
    }}>
      <div className="page" style={{ position: "relative" }}>
        <div style={{ display: "grid",
                       gridTemplateColumns: "minmax(0, 2fr) repeat(3, minmax(0, 1fr))",
                       gap: 48 }}>
          <div>
            <HopeMark height={36} />
            <p style={{ marginTop: 16, fontFamily: "var(--font-serif)",
                         fontStyle: "italic", fontSize: 17,
                         color: "var(--ink-1)", maxWidth: 460, lineHeight: 1.5 }}>
              The system above is a working artifact for the OMEGA Protocol
              build of HOPE — a cinematic point-and-click memorial to a movie
              that watches you back.
            </p>
          </div>
          {[
            ["// SYSTEM", ["Tokens v0.3.0", "Components 24", "Glyphs 48", "Ornament set"]],
            ["// PRODUCT",  ["EP-01 Cognitive Search", "EP-02 Forest Walk", "Community Boards", "Dev Wallet Status"]],
            ["// SIGNAL",  ["Transmission · 042°", "Sector ε–9", "Hopo Substation", "DMZ–04 telemetry"]],
          ].map(([label, items]) => (
            <div key={label} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div className="eyebrow">{label}</div>
              {items.map((it) => (
                <div key={it} style={{ fontFamily: "var(--font-mono)", fontSize: 11,
                                          color: "var(--ink-1)" }}>{it}</div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 48, paddingTop: 24, borderTop: "1px solid var(--line)",
                       display: "flex", justifyContent: "space-between",
                       fontFamily: "var(--font-mono)", fontSize: 10,
                       color: "var(--ink-3)", letterSpacing: "0.18em",
                       textTransform: "uppercase" }}>
          <span>Ω · OMNIBUS · CALCULATED · 19840701</span>
          <span>$NAHOPE / OMEGA SYS / v0.3.0</span>
          <span className="flicker">END OF TRANSMISSION</span>
        </div>
      </div>
    </footer>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
