/* global React, Section, Panel, Btn, InventoryItem, LogLine, Hotspot, StatusPill, DialogueBox, NavTab, Icons, OmegaSeal, RadarDial, GlyphRow */

// ── 04 — APPARATUS (components) ─────────────────────────────────────────
function ComponentsSection() {
  const [activeTab, setActiveTab] = React.useState("EPISODE GAME");
  const [equipped, setEquipped] = React.useState("Cabinet Key");

  return (
    <Section id="components" num="04" kicker="MECHANISM"
             title="Components"
             subtitle="A catalog of the screws and bones. Reuse these — don't invent. Anything new must pass the brackets, the mono, and the silence."
             ornament={
               <div style={{ color: "var(--acc-primary)", opacity: 0.6 }}>
                 <OmegaSeal size={520} />
               </div>
             }>

      {/* BUTTONS */}
      <SubBlock label="// BUTTONS · 5 variants × 2 sizes">
        <div style={{ padding: 28, display: "flex", flexDirection: "column", gap: 20 }}>
          <Row>
            <Btn variant="primary" icon={<Icons.Reticle size={11} />}>EQUIP ITEM</Btn>
            <Btn variant="solid" icon={<Icons.Arrow size={11} />}>ENTER ROOM</Btn>
            <Btn variant="danger" icon={<Icons.Warning size={11} />}>ABORT EPISODE</Btn>
            <Btn variant="ghost">Cancel</Btn>
            <Btn variant="crt" icon={<span>&gt;</span>}>RUN_DIAGNOSTIC</Btn>
          </Row>
          <Row>
            <Btn variant="primary" size="sm">CLICK</Btn>
            <Btn variant="solid" size="sm">CONFIRM</Btn>
            <Btn variant="danger" size="sm">DELETE</Btn>
            <Btn variant="ghost" size="sm">SKIP</Btn>
            <Btn variant="primary" disabled>LOCKED</Btn>
          </Row>
        </div>
      </SubBlock>

      {/* NAVIGATION */}
      <SubBlock label="// NAVIGATION · top-level chrome">
        <div style={{ padding: "0 28px", display: "flex", alignItems: "center",
                       justifyContent: "space-between", borderTop: "1px solid var(--line)",
                       borderBottom: "1px solid var(--line)" }}>
          <div style={{ display: "flex", gap: 4 }}>
            {[
              ["HOME", Icons.Home],
              ["INTRO", Icons.Film],
              ["EPISODE GAME", Icons.Game],
              ["COMMUNITY", Icons.Users],
              ["PROFILE", Icons.User],
            ].map(([label, Ic]) => (
              <NavTab key={label} label={label}
                      icon={<Ic size={11} color={activeTab === label ? "var(--acc-primary)" : "var(--ink-3)"} />}
                      active={activeTab === label}
                      onClick={() => setActiveTab(label)} />
            ))}
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "center", padding: "10px 0" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8,
                            padding: "6px 12px", border: "1px solid var(--line-bright)" }}>
              <Icons.Wallet size={12} color="var(--ink-2)" />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 10,
                              color: "var(--ink-2)", letterSpacing: "0.14em" }}>WALLET:</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11,
                              color: "var(--ink-0)" }}>33Rp...vZsL</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 10,
                              color: "var(--acc-primary)" }}>· 0 $NAHOPE</span>
            </div>
          </div>
        </div>
      </SubBlock>

      {/* PANELS */}
      <SubBlock label="// PANELS · 4 tones">
        <div style={{ padding: 28, display: "grid",
                        gridTemplateColumns: "repeat(2, minmax(0,1fr))", gap: 18 }}>
          <Panel label="// PANEL · default"
                 right="STATUS: NOMINAL"
                 tone="default">
            <div style={{ padding: 20, fontFamily: "var(--font-mono)", fontSize: 12,
                            color: "var(--ink-1)", lineHeight: 1.55 }}>
              Used for primary content surfaces. Corner brackets glow on the
              active accent color. Inner padding is 20px / 24px depending on density.
            </div>
          </Panel>
          <Panel label="// PANEL · danger"
                 right="● BREACH"
                 tone="danger">
            <div style={{ padding: 20, fontFamily: "var(--font-mono)", fontSize: 12,
                            color: "var(--ink-1)", lineHeight: 1.55 }}>
              For dialogues that pull the user out of flow — wallet errors,
              episode aborts, the moment something has just made it through the fog.
            </div>
          </Panel>
          <Panel label="// PANEL · violet" tone="violet">
            <div style={{ padding: 20, fontFamily: "var(--font-mono)", fontSize: 12,
                            color: "var(--ink-1)", lineHeight: 1.55 }}>
              UGC, rituals, and anything that touches the Omega Mark.
              Violet brackets read as "off-protocol — handle with care."
            </div>
          </Panel>
          <Panel label="// PANEL · amber" tone="amber">
            <div style={{ padding: 20, fontFamily: "var(--font-mono)", fontSize: 12,
                            color: "var(--ink-1)", lineHeight: 1.55 }}>
              Tutorials, optional hints, and the kind of advisory text the
              substation radio would print on perforated paper.
            </div>
          </Panel>
        </div>
      </SubBlock>

      {/* INVENTORY DECK */}
      <SubBlock label="// ARTIFACT DECK · inventory items">
        <div style={{ padding: 28, display: "grid",
                        gridTemplateColumns: "repeat(2, minmax(0,1fr))", gap: 14 }}>
          {[
            { name: "Calivan Rifle", type: "GUN", glyph: "⏃", note: "EP-01" },
            { name: "Cabinet Key", type: "KEY", glyph: "✪", note: "stolen from Sgt. Sung" },
            { name: "Hopo License Plate", type: "FRAGMENT", glyph: "◈", note: "rusted, 1979" },
            { name: "Omega Mark", type: "RITUAL", glyph: "Ω", note: "do not touch directly", isUGC: true },
            { name: "Torn ID Tag", type: "EVIDENCE", glyph: "◊" },
            { name: "Green Alien Slime", type: "BIOSAMPLE", glyph: "⌬", isUGC: true,
              note: "vial pulses every 6s" },
          ].map((it) => (
            <div key={it.name} onClick={() => setEquipped(it.name)} style={{ cursor: "pointer" }}>
              <InventoryItem {...it} equipped={equipped === it.name} />
            </div>
          ))}
        </div>
      </SubBlock>

      {/* TERMINAL LOG */}
      <SubBlock label="// TELEMETRY · terminal log">
        <div style={{ padding: 28 }}>
          <Panel label="// TELEMETRY TERMINAL LOG" right="00:24:11 · 47 LINES" tone="default">
            <div style={{ padding: "8px 20px 16px", fontFamily: "var(--font-mono)" }}>
              <LogLine time="18:40:02" role="SYSTEM" text="connection established."  kind="system" />
              <LogLine time="18:40:18" role="BUM-SEOK"
                       text="'We are completely blocked. No phones, no police radios. Keep your eyes open.'"
                       kind="voice" />
              <LogLine time="18:42:09" role="OMEGA"
                       text="UNREGISTERED SIGNAL · BEARING 042° · DEPTH UNKNOWN"
                       kind="omega" />
              <LogLine time="18:42:33" role="SYSTEM"
                       text="hotspot[ep1_radar_screen] unlocked. Equip drift before contact."
                       kind="system" />
              <LogLine time="18:44:00" role="ALERT"
                       text="something walked through the perimeter and the wire didn't notice"
                       kind="danger" />
              <LogLine time="18:44:12" role="USER" text="inspect radar screen" typing />
            </div>
          </Panel>
        </div>
      </SubBlock>

      {/* DIALOGUE & HOTSPOT */}
      <SubBlock label="// DIALOGUE & HOTSPOT">
        <div style={{ padding: 28, display: "grid",
                        gridTemplateColumns: "minmax(0, 1.1fr) minmax(0, 1fr)", gap: 24 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <DialogueBox speaker="Officer Bum-seok"
                         text="The fog isn't weather. Something is breathing through it. Don't go to the forest yet — they took my radio for a reason."
                         hint="Inspect the radar screen before leaving" />
            <DialogueBox speaker="Unknown · ε–9"
                         text="…we have always been on the other side of your window. Open it." />
          </div>
          {/* mini canvas with hotspots */}
          <div style={{ position: "relative", aspectRatio: "4 / 3",
                         border: "1px solid var(--line-bright)", background: "var(--bg-3)",
                         backgroundImage: `
                           linear-gradient(rgba(158,255,94,0.04), transparent),
                           repeating-linear-gradient(0deg, transparent 0, transparent 7px, rgba(255,255,255,0.025) 8px),
                           radial-gradient(circle at 30% 40%, rgba(179,119,255,0.12), transparent 60%)
                         `, overflow: "hidden" }}>
            <div className="crt-scan" style={{ position: "absolute", inset: 0, zIndex: 2 }} />
            <div style={{ position: "absolute", top: 12, left: 12 }} className="eyebrow">
              // ROOM: OFFICE · HOTSPOT MAP
            </div>
            <div style={{ position: "absolute", bottom: 12, right: 12 }} className="eyebrow">
              FEED ACTIVE
            </div>
            {/* faux scene blocks */}
            <div style={{ position: "absolute", left: "12%", top: "55%", width: "30%",
                           height: "25%", background: "rgba(110,200,150,0.08)",
                           border: "1px dashed rgba(158,255,94,0.3)" }} />
            <div style={{ position: "absolute", left: "55%", top: "40%", width: "30%",
                           height: "35%", background: "rgba(255,58,85,0.06)",
                           border: "1px dashed rgba(255,58,85,0.3)" }} />
            <Hotspot x="27%" y="65%" label="Radar Screen" status="hover" />
            <Hotspot x="70%" y="55%" label="Typewriter" status="found" />
            <Hotspot x="48%" y="32%" label="?" status="idle" size={40} />
            <Hotspot x="88%" y="20%" label="ALARM" status="danger" />
          </div>
        </div>
      </SubBlock>

      {/* STATUS RAIL */}
      <SubBlock label="// STATUS RAIL · footer chrome">
        <div style={{ padding: 28 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
                          padding: "14px 20px", border: "1px solid var(--line-bright)",
                          background: "var(--bg-1)" }}>
            <div style={{ display: "flex", gap: 24 }}>
              <StatusPill label="NETWORK" value="SOLANA · ACTIVE" tone="primary" />
              <StatusPill label="LOCATION" value="HOPO SUBSTATION" />
              <StatusPill label="CLEARANCE" value="RESTRICTED ‹5000" tone="amber" />
            </div>
            <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
              <StatusPill label="BALANCE" value="0 $NAHOPE" tone="violet" />
              <StatusPill label="EPISODE" value="01" tone="danger" />
              <RadarDial size={36} />
            </div>
          </div>
        </div>
      </SubBlock>

      {/* MOTION LEDGER */}
      <SubBlock label="// MOTION · 7 specs">
        <div style={{ padding: 28, display: "grid",
                        gridTemplateColumns: "repeat(4, minmax(0,1fr))", gap: 14 }}>
          {[
            { name: "glitch", code: "6s · steps(1)", desc: "Headlines, only on 'cosmic' words." },
            { name: "scan-roll", code: "8s · linear ∞", desc: "Soft horizontal beam over hero canvases." },
            { name: "flicker", code: "4s · ease ∞", desc: "Brand seal + key text. Subtle." },
            { name: "pulse-glow", code: "2s · ease ∞", desc: "Live-status dots and breach LEDs." },
            { name: "drift-slow", code: "120s · linear ∞", desc: "Ritual circle in section backgrounds." },
            { name: "orbit", code: "4s · linear ∞", desc: "Radar sweeps + spinner widgets." },
            { name: "blink", code: "1s · steps(2)", desc: "Caret in terminal inputs." },
          ].map((m) => (
            <div key={m.name} style={{
              padding: 16, border: "1px solid var(--line)",
              background: "var(--bg-1)",
              display: "flex", flexDirection: "column", gap: 8,
            }}>
              <span style={{ fontFamily: "var(--font-display)", fontSize: 16,
                              color: "var(--acc-primary)" }}>{m.name}</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 10,
                              color: "var(--ink-2)" }}>{m.code}</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11,
                              color: "var(--ink-1)", lineHeight: 1.45 }}>{m.desc}</span>
              <span style={{ height: 4, background: "var(--bg-3)", overflow: "hidden",
                              position: "relative", marginTop: 6 }}>
                <span style={{ position: "absolute", left: 0, top: 0,
                                width: 40, height: 4,
                                background: "var(--acc-primary)",
                                boxShadow: "0 0 8px var(--acc-primary)",
                                animation: `scan-roll ${m.name === "orbit" ? 4 : 6}s linear infinite` }} />
              </span>
            </div>
          ))}
        </div>
      </SubBlock>
    </Section>
  );
}

function SubBlock({ label, children }) {
  return (
    <div style={{ marginTop: 24, border: "1px solid var(--line)", background: "var(--bg-1)" }}>
      <div style={{ padding: "12px 20px", borderBottom: "1px solid var(--line)",
                     fontFamily: "var(--font-mono)", fontSize: 10,
                     color: "var(--ink-2)", textTransform: "uppercase",
                     letterSpacing: "var(--track-omega)" }}>
        {label}
      </div>
      {children}
    </div>
  );
}

function Row({ children }) {
  return (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
      {children}
    </div>
  );
}

Object.assign(window, { ComponentsSection });
