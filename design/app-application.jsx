/* global React, Section, Panel, Btn, InventoryItem, LogLine, Hotspot, StatusPill, DialogueBox, NavTab, Icons, OmegaSeal, HopeMark, RadarDial, GlyphRow, RitualCircle, StarChart */

// ── 05 — SUBSTATION (full application mockup) ─────────────────────────
function ApplicationSection() {
  return (
    <Section id="application" num="05" kicker="SUBSTATION"
             title="Application"
             subtitle="The whole system, dressed and live. This is the Episode Game screen — the moment a player enters Hopo substation and the fog starts watching back.">
      <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 20, flexWrap: "wrap" }}>
        <span className="badge"><span className="dot" /> LIVE COMPOSITE</span>
        <span className="badge danger"><span className="dot" /> EP-01 · COGNITIVE SEARCH</span>
        <span className="badge">3-PANEL · ISAKU GRID</span>
        <span className="badge">HOTSPOT × 4 · DIALOGUE × 1</span>
      </div>

      <div style={{
        position: "relative",
        overflowX: "auto",
        overflowY: "hidden",
        border: "1px solid var(--line)",
        background: "var(--bg-0)",
      }}>
        <div style={{ minWidth: 1280 }}>
          <GameScreen />
        </div>
      </div>

      <p className="serif" style={{
        marginTop: 32, fontStyle: "italic", fontSize: 18,
        color: "var(--ink-1)", maxWidth: 820, textWrap: "pretty",
      }}>
        Every chrome, panel, log, and reticle in the mock above is a
        token-composed instance of the components in section 04. Nothing
        is bespoke. The substation is just the system breathing.
      </p>
    </Section>
  );
}

// ── The full Episode Game screen ────────────────────────────────────────
function GameScreen() {
  return (
    <div style={{
      position: "relative",
      border: "1px solid var(--line-bright)",
      background: "var(--bg-0)",
      overflow: "hidden",
    }}>
      {/* CRT envelope */}
      <div className="crt-scan" style={{ position: "absolute", inset: 0, zIndex: 40 }} />
      <div className="crt-vignette" style={{ position: "absolute", inset: 0, zIndex: 39 }} />
      {/* sliding beam */}
      <div style={{
        position: "absolute", left: 0, right: 0, height: 80, zIndex: 41,
        background: "linear-gradient(180deg, transparent, rgba(158,255,94,0.05), transparent)",
        animation: "scan-roll 6s linear infinite", pointerEvents: "none",
      }} />

      {/* TOP CHROME */}
      <div style={{
        position: "relative",
        display: "grid",
        gridTemplateColumns: "auto 1fr auto",
        alignItems: "center",
        padding: "14px 20px",
        borderBottom: "1px solid var(--line)",
        background: "linear-gradient(180deg, rgba(255,255,255,0.012), transparent)",
        gap: 32, zIndex: 5,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <HopeMark height={28} />
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
            <span className="eyebrow" style={{ fontSize: 9 }}>OMEGA · SYS</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 9,
                            color: "var(--ink-3)", letterSpacing: "0.16em" }}>v0.3.0 · BUILD ε</span>
          </div>
        </div>
        <nav style={{ display: "flex", gap: 4, justifyContent: "center" }}>
          {[
            ["HOME", Icons.Home, false],
            ["MOVIE INTRO", Icons.Film, false],
            ["EPISODE GAME", Icons.Game, true],
            ["COMMUNITY", Icons.Users, false],
            ["PROFILE", Icons.User, false],
          ].map(([label, Ic, active]) => (
            <NavTab key={label} label={label}
                    icon={<Ic size={11} color={active ? "var(--acc-primary)" : "var(--ink-3)"} />}
                    active={active} />
          ))}
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <RadarDial size={32} />
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            padding: "8px 14px", border: "1px solid var(--line-bright)",
            background: "var(--bg-2)", fontFamily: "var(--font-mono)", fontSize: 10,
            letterSpacing: "0.14em",
          }}>
            <Icons.Wallet size={12} color="var(--ink-2)" />
            <span style={{ color: "var(--ink-2)" }}>WALLET</span>
            <span style={{ color: "var(--ink-0)" }}>33Rp…vZsL</span>
            <span style={{ color: "var(--ink-3)" }}>·</span>
            <span style={{ color: "var(--acc-primary)" }}>0 $NAHOPE</span>
          </div>
        </div>
      </div>

      {/* RAIL · episode title */}
      <div style={{
        position: "relative", zIndex: 5,
        display: "flex", justifyContent: "center", alignItems: "center", gap: 18,
        padding: "16px 0", borderBottom: "1px solid var(--line)",
      }}>
        <Icons.Warning size={14} color="var(--acc-amber)" />
        <span className="caps-omega flicker" style={{
          fontFamily: "var(--font-mono)", fontSize: 13,
          color: "var(--acc-amber)", textShadow: "0 0 12px var(--acc-amber)",
        }}>
          PROTOCOL OMEGA · EPISODE 01 — THE COGNITIVE SEARCH · INTERACTIVE
        </span>
        <Icons.Warning size={14} color="var(--acc-amber)" />
      </div>

      {/* MAIN 3-PANEL GRID */}
      <div style={{
        position: "relative", zIndex: 5,
        display: "grid",
        gridTemplateColumns: "minmax(0, 340px) minmax(0, 1fr) minmax(0, 340px)",
        gap: 1, background: "var(--line)",
        minHeight: 720,
      }}>
        {/* LEFT — telemetry log */}
        <aside style={{ background: "var(--bg-1)", padding: "20px 20px 24px",
                          display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span className="eyebrow">// TELEMETRY · TERMINAL</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 9,
                            color: "var(--acc-primary)", letterSpacing: "0.2em" }}>● LIVE</span>
          </div>
          <div style={{ flex: 1, fontFamily: "var(--font-mono)" }}>
            <LogLine time="18:40:02" role="SYSTEM"
                     text="connection established · ω-channel synced"
                     kind="system" />
            <LogLine time="18:40:18" role="BUM-SEOK"
                     text="'We are completely blocked. No phones. No police radios.'"
                     kind="voice" />
            <LogLine time="18:40:32" role="BUM-SEOK"
                     text="'The fog is crawling in. Keep your eyes open.'"
                     kind="voice" />
            <LogLine time="18:41:09" role="OMEGA"
                     text="UNREGISTERED SIGNAL — BEARING 042° — DEPTH UNKNOWN"
                     kind="omega" />
            <LogLine time="18:42:00" role="SYSTEM"
                     text="hotspot[ep1_radar_screen] now interactive"
                     kind="system" />
            <LogLine time="18:42:33" role="ALERT"
                     text="something walked the perimeter wire — and the wire didn't notice"
                     kind="danger" />
            <LogLine time="18:43:12" role="USER" text="examine radar" typing />
          </div>
          <div style={{ paddingTop: 12, borderTop: "1px dashed var(--ink-4)",
                          display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 9,
                            color: "var(--ink-3)", letterSpacing: "0.16em" }}>
              SYSTEM STATUS — MONITORING SIGNALS
            </span>
          </div>
        </aside>

        {/* CENTER — point-and-click canvas */}
        <main style={{ background: "var(--bg-0)", padding: 0, position: "relative" }}>
          <div style={{ display: "flex", justifyContent: "space-between",
                          alignItems: "center", padding: "14px 20px",
                          borderBottom: "1px solid var(--line)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Icons.Reticle size={14} color="var(--acc-primary)" />
              <span className="eyebrow" style={{ color: "var(--ink-0)" }}>ROOM: OFFICE · HOPO SUBSTATION</span>
              <span className="eyebrow" style={{ color: "var(--ink-3)" }}>· 2F · NIGHT</span>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <Btn variant="ghost" size="sm" icon={<Icons.Arrow size={10} dir="left" />}>MOVE OUTSIDE</Btn>
              <Btn variant="primary" size="sm" icon={<Icons.Arrow size={10} />}>ENTER BACKROOM</Btn>
            </div>
          </div>

          {/* Scene canvas */}
          <SceneCanvas />

          {/* Dialogue */}
          <div style={{ padding: "12px 20px 20px" }}>
            <DialogueBox speaker="Officer Bum-seok"
                         text="You are inside the police substation office. The fog has covered the window. Officer Bum-seok hasn't looked up in over an hour."
                         hint="EQUIPPED: Cabinet Key · 4 hotspots remain unexamined" />
          </div>
        </main>

        {/* RIGHT — Artifact Deck */}
        <aside style={{ background: "var(--bg-1)", padding: "20px 20px 24px",
                          display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span className="eyebrow">// ARTIFACT DECK</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 10,
                            color: "var(--acc-primary)", letterSpacing: "0.18em" }}>5 / 12</span>
          </div>
          <InventoryItem name="Screwdriver" type="TOOL" glyph="⏃"
                           note="from drawer" />
          <InventoryItem name="Cabinet Key" type="KEY" glyph="✪"
                           note="stolen from Sgt. Sung" equipped />
          <InventoryItem name="80s Radio" type="DEVICE" glyph="⏈"
                           note="silent — for now" />
          <InventoryItem name="Torn ID Tag" type="EVIDENCE" glyph="◊" />
          <InventoryItem name="Green Alien Slime" type="BIOSAMPLE"
                           glyph="⌬" isUGC note="vial pulses every 6s" />

          {/* footer panel — UGC slot */}
          <div style={{ marginTop: "auto", padding: "12px 14px",
                          border: "1px dashed var(--acc-violet)",
                          background: "rgba(179,119,255,0.04)",
                          display: "flex", flexDirection: "column", gap: 8 }}>
            <div className="eyebrow" style={{ color: "var(--acc-violet)" }}>// UGC SLOT</div>
            <p className="serif" style={{ fontStyle: "italic", fontSize: 13,
                                            color: "var(--ink-1)", lineHeight: 1.4 }}>
              Share an artifact on X. Likes mint a small drop of $NAHOPE.
            </p>
            <Btn variant="primary" size="sm" icon={<GlyphRow count={3} size={10} />}>
              POST TO X
            </Btn>
          </div>
        </aside>
      </div>

      {/* BOTTOM STATUS RAIL */}
      <div style={{
        position: "relative", zIndex: 5,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "12px 20px", borderTop: "1px solid var(--line)",
        background: "var(--bg-1)",
      }}>
        <div style={{ display: "flex", gap: 24 }}>
          <StatusPill label="NETWORK" value="SOLANA · ACTIVE" tone="primary" />
          <StatusPill label="LOCATION" value="HOPO SUBSTATION · 2F" />
          <StatusPill label="CLEARANCE" value="RESTRICTED ‹5000" tone="amber" />
        </div>
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          <StatusPill label="BALANCE" value="0 $NAHOPE" tone="violet" />
          <StatusPill label="EPISODE" value="01 / 07" tone="danger" />
        </div>
      </div>
    </div>
  );
}

// ── Scene canvas — stylised CSS/SVG composition of the substation interior
function SceneCanvas() {
  return (
    <div style={{
      position: "relative", aspectRatio: "16 / 10", overflow: "hidden",
      background: `
        radial-gradient(ellipse at 30% 60%, rgba(179,119,255,0.05), transparent 60%),
        radial-gradient(circle at 75% 35%, rgba(158,255,94,0.04), transparent 55%),
        linear-gradient(180deg, #06060f 0%, #03030a 60%, #08081a 100%)
      `,
    }}>
      {/* faint star field */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.18, color: "var(--ink-1)" }}>
        <StarChart width={900} height={560} density={1.6} seed={31} />
      </div>

      {/* big window with fog */}
      <div style={{
        position: "absolute", left: "8%", top: "10%", width: "58%", height: "62%",
        border: "2px solid #1a2230",
        background: `
          linear-gradient(180deg, rgba(80, 100, 130, 0.08), rgba(20, 30, 45, 0.5)),
          repeating-linear-gradient(90deg, transparent 0 80px, rgba(255,255,255,0.012) 80px 81px)
        `,
        boxShadow: "inset 0 0 60px rgba(0,0,0,0.6), inset 0 0 12px rgba(158,255,94,0.04)",
      }}>
        {/* window cross */}
        <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 2,
                        background: "#0e1420" }} />
        <div style={{ position: "absolute", top: "55%", left: 0, right: 0, height: 2,
                        background: "#0e1420" }} />
        {/* fog */}
        <div style={{ position: "absolute", inset: 0,
                        background: `radial-gradient(ellipse at 30% 70%, rgba(220, 230, 240, 0.22), transparent 55%),
                                     radial-gradient(ellipse at 70% 40%, rgba(190, 200, 215, 0.16), transparent 60%)`,
                        animation: "drift-slow 80s linear infinite" }} />
        {/* rain streaks */}
        <div style={{ position: "absolute", inset: 0,
                        background: "repeating-linear-gradient(105deg, rgba(220,240,255,0.04) 0 1px, transparent 1px 8px)" }} />
        {/* distant neon signs */}
        <div style={{ position: "absolute", top: "20%", left: "15%", width: 32, height: 8,
                        background: "var(--acc-danger)", boxShadow: "0 0 14px var(--acc-danger)", opacity: 0.5 }} />
        <div style={{ position: "absolute", top: "30%", left: "60%", width: 22, height: 5,
                        background: "var(--acc-amber)", boxShadow: "0 0 10px var(--acc-amber)", opacity: 0.4 }} />
        <div style={{ position: "absolute", top: "44%", left: "30%", width: 14, height: 14,
                        borderRadius: "50%",
                        background: "var(--acc-primary)", boxShadow: "0 0 18px var(--acc-primary)", opacity: 0.5 }} />
        {/* corner stamp */}
        <div style={{ position: "absolute", top: 8, left: 8 }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--ink-3)",
                          letterSpacing: "0.2em" }}>WINDOW · NW · FOG GRADE Ω</span>
        </div>
      </div>

      {/* CRT monitor (radar) bottom-left */}
      <div style={{
        position: "absolute", left: "6%", bottom: "8%", width: "26%", height: "52%",
        border: "3px solid #11161e",
        borderRadius: "6px",
        background: `
          radial-gradient(circle at 50% 50%,
            rgba(110, 220, 130, 0.45) 0%,
            rgba(40, 120, 60, 0.4) 30%,
            rgba(0, 30, 10, 0.95) 100%)
        `,
        boxShadow: "inset 0 0 40px rgba(0,0,0,0.7), 0 0 20px rgba(0,0,0,0.6)",
        overflow: "hidden",
      }}>
        {/* radar rings */}
        <svg viewBox="0 0 200 200" style={{ position: "absolute", inset: 0,
                                                  width: "100%", height: "100%" }}>
          <g stroke="rgba(160, 255, 130, 0.6)" strokeWidth="0.6" fill="none">
            <circle cx="100" cy="100" r="90" />
            <circle cx="100" cy="100" r="65" />
            <circle cx="100" cy="100" r="40" />
            <circle cx="100" cy="100" r="18" />
            <line x1="0" y1="100" x2="200" y2="100" strokeWidth="0.3" />
            <line x1="100" y1="0" x2="100" y2="200" strokeWidth="0.3" />
          </g>
          <g style={{ transformOrigin: "100px 100px", animation: "orbit 3s linear infinite" }}>
            <path d="M 100 100 L 100 10 A 90 90 0 0 1 170 60 Z"
                  fill="rgba(160, 255, 130, 0.22)" />
            <line x1="100" y1="100" x2="100" y2="10"
                  stroke="rgba(180, 255, 140, 0.95)" strokeWidth="1.2" />
          </g>
          <g fill="rgba(180, 255, 130, 0.85)">
            <circle cx="68" cy="70" r="2.5" />
            <circle cx="142" cy="120" r="1.8" />
            <circle cx="80" cy="135" r="1.2" />
            <circle cx="125" cy="55" r="3.2" style={{ animation: "pulse-glow 1.4s infinite" }} />
          </g>
          <text x="10" y="22" fill="rgba(160, 255, 130, 0.75)"
                fontFamily="VT323, monospace" fontSize="11">SECT ε–9</text>
          <text x="10" y="190" fill="rgba(180, 80, 100, 0.85)"
                fontFamily="VT323, monospace" fontSize="11">SIG_ERR · OMEGA</text>
          <text x="140" y="190" fill="rgba(160, 255, 130, 0.75)"
                fontFamily="VT323, monospace" fontSize="11">042°</text>
        </svg>
        {/* scanlines */}
        <div className="crt-scan" style={{ position: "absolute", inset: 0 }} />
        {/* glitch frame */}
        <div style={{
          position: "absolute", inset: -6,
          border: "1px dashed var(--acc-danger)",
          opacity: 0.9, pointerEvents: "none",
        }} />
        <div style={{ position: "absolute", top: -22, left: 0,
                        padding: "2px 8px", background: "var(--acc-danger)",
                        color: "var(--bg-0)", fontFamily: "var(--font-mono)", fontSize: 9,
                        letterSpacing: "0.2em", textTransform: "uppercase" }}>
          INSPECT GLITCHED RADAR SCREEN
        </div>
      </div>

      {/* Desk silhouette in front (lower right) */}
      <div style={{
        position: "absolute", right: "0", bottom: "0",
        width: "75%", height: "42%",
        background: "linear-gradient(180deg, rgba(20, 25, 35, 0.7), rgba(0,0,0,0.95))",
        borderTop: "1px solid #14202c",
      }} />

      {/* Typewriter glyph */}
      <div style={{
        position: "absolute", right: "30%", bottom: "12%",
        width: 130, height: 90,
        background: "linear-gradient(180deg, #161a21, #08090d)",
        border: "1px solid #1b2330",
        boxShadow: "0 6px 30px rgba(0,0,0,0.7)",
      }}>
        {/* keys grid */}
        <div style={{
          position: "absolute", left: 10, right: 10, bottom: 8, height: 30,
          background: "repeating-linear-gradient(90deg, #20272f 0 9px, #0d1015 9px 12px)",
        }} />
        {/* paper */}
        <div style={{
          position: "absolute", top: -22, left: "50%", transform: "translateX(-50%)",
          width: 90, height: 36, background: "#d8d3c3",
          boxShadow: "0 -4px 12px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(60,55,40,0.4)",
        }}>
          <div style={{ height: 2, background: "#3a3528", margin: "5px 6px 0" }} />
          <div style={{ height: 2, background: "#3a3528", margin: "5px 6px 0" }} />
          <div style={{ height: 2, background: "#3a3528", margin: "5px 6px 0" }} />
        </div>
      </div>

      {/* Old desk telephone */}
      <div style={{
        position: "absolute", right: "8%", bottom: "10%",
        width: 88, height: 60,
      }}>
        <div style={{
          position: "absolute", inset: "20% 0 0 0",
          background: "linear-gradient(180deg, #1f1612, #0c0808)",
          borderRadius: "8px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.7)",
        }} />
        <div style={{
          position: "absolute", left: 8, right: 8, top: 0, height: 22,
          background: "linear-gradient(180deg, #2a1d18, #110907)",
          borderRadius: 14,
        }} />
      </div>

      {/* corner brackets / HUD */}
      <div style={{ position: "absolute", left: 14, top: 14,
                      fontFamily: "var(--font-mono)", fontSize: 9,
                      color: "var(--ink-2)", letterSpacing: "0.2em" }}>
        // FEED · CAM-04 · 18:43:09 KST
      </div>
      <div style={{ position: "absolute", right: 14, top: 14,
                      fontFamily: "var(--font-mono)", fontSize: 9,
                      color: "var(--acc-primary)", letterSpacing: "0.2em",
                      animation: "pulse-glow 2s infinite" }}>
        ● REC · ω
      </div>
      <div style={{ position: "absolute", right: 14, bottom: 14,
                      fontFamily: "var(--font-mono)", fontSize: 9,
                      color: "var(--ink-3)", letterSpacing: "0.2em" }}>
        FEED ACTIVE: OFFICE
      </div>

      {/* HOTSPOTS */}
      <Hotspot x="20%" y="62%" label="INSPECT RADAR" status="danger" size={70} />
      <Hotspot x="55%" y="76%" label="TYPEWRITER" status="hover" size={56} />
      <Hotspot x="83%" y="80%" label="ROTARY PHONE" status="idle" size={48} />
      <Hotspot x="34%" y="35%" label="WINDOW · FOG" status="found" size={56} />

      {/* Big drifting ritual circle in background */}
      <div style={{
        position: "absolute", right: -120, top: -80,
        color: "var(--acc-violet)", opacity: 0.12,
        animation: "drift-slow 90s linear infinite", pointerEvents: "none",
      }}>
        <RitualCircle size={420} />
      </div>
    </div>
  );
}

Object.assign(window, { ApplicationSection, GameScreen });
