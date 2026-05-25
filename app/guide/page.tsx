"use client";

import Link from "next/link";
import {
  BookOpen,
  Wallet,
  Gamepad2,
  Package,
  Users,
  Coins,
  ShieldAlert,
  Share2,
  KeyRound,
  Compass,
  HelpCircle,
} from "lucide-react";

export default function GuidePage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg-0)",
        color: "var(--ink-0)",
        fontFamily: "var(--font-mono)",
        padding: "32px 16px 120px",
      }}
    >
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        {/* ── Header ─────────────────────────────────────────────────── */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 14px",
              border: "1px solid var(--acc-primary)",
              color: "var(--acc-primary)",
              fontSize: 10,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              marginBottom: 16,
              boxShadow: "var(--glow-primary)",
            }}
          >
            <BookOpen size={11} /> // FIELD GUIDE · CLASSIFIED
          </div>
          <h1
            className="display glitch-text"
            data-text="HOPO PORT FIELD GUIDE"
            style={{
              fontSize: 36,
              letterSpacing: "0.08em",
              marginBottom: 10,
              color: "var(--ink-0)",
            }}
          >
            HOPO PORT FIELD GUIDE
          </h1>
          <p
            style={{
              fontFamily: "var(--font-sans, var(--font-mono))",
              fontSize: 14,
              color: "var(--ink-2)",
              maxWidth: 640,
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Welcome, survivor. This is the official English-language briefing for
            HOPO PORT: OMEGA PROTOCOL — an interactive cinematic RPG inspired by
            director Na Hong-jin&apos;s upcoming film{" "}
            <span style={{ color: "var(--acc-primary)" }}>HOPE</span>. Read every
            section before you enter the quarantine zone.
          </p>
        </div>

        {/* ── Table of contents ──────────────────────────────────────── */}
        <Section title="// TABLE OF CONTENTS" icon={Compass}>
          <ol
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 8,
              listStyle: "none",
              padding: 0,
              margin: 0,
            }}
          >
            {[
              ["01", "What is HOPO PORT?", "#what"],
              ["02", "Getting Started", "#start"],
              ["03", "The $NAHOPE Token", "#token"],
              ["04", "Clearance Levels", "#clearance"],
              ["05", "Playing Episode 1", "#episode1"],
              ["06", "Trigger-Belt Puzzles", "#puzzles"],
              ["07", "Inventory & Items", "#inventory"],
              ["08", "Episode 2 Unlock", "#episode2"],
              ["09", "Community & Scenarios", "#community"],
              ["10", "UGC Sharing on X", "#ugc"],
              ["11", "Glossary", "#glossary"],
              ["12", "Troubleshooting", "#troubleshoot"],
            ].map(([num, label, href]) => (
              <li key={href}>
                <a
                  href={href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "10px 12px",
                    border: "1px solid var(--line)",
                    color: "var(--ink-1)",
                    textDecoration: "none",
                    fontSize: 12,
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--acc-primary)";
                    e.currentTarget.style.color = "var(--acc-primary)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--line)";
                    e.currentTarget.style.color = "var(--ink-1)";
                  }}
                >
                  <span style={{ color: "var(--acc-amber)", fontSize: 10 }}>
                    {num}
                  </span>
                  {label}
                </a>
              </li>
            ))}
          </ol>
        </Section>

        {/* ── 01. What is HOPO PORT ──────────────────────────────────── */}
        <Section id="what" title="01 · WHAT IS HOPO PORT?" icon={HelpCircle}>
          <P>
            HOPO PORT: OMEGA PROTOCOL is a hardcore{" "}
            <B>point-and-click investigation game</B> set in a 1970s–80s DMZ
            coastal village called <B>Hopo Port</B>. It fuses Na Hong-jin&apos;s
            signature cosmic-horror atmosphere with the interconnected puzzle
            mechanics of the cult classic <B>Isaku (遺作)</B>.
          </P>
          <P>
            Your gameplay is the on-chain mechanism that proves and defends the
            value of the <B>$NAHOPE</B> Solana memecoin. The community&apos;s
            collective discoveries will be bound into a physical document and
            delivered to director Na Hong-jin as a proposal for{" "}
            <B>HOPE Part 2: Humans in Space</B>.
          </P>
          <Callout color="violet">
            This is not a passive viewing experience. Every click, every
            artifact you secure, every scenario you submit becomes part of an
            evolving collective narrative.
          </Callout>
        </Section>

        {/* ── 02. Getting Started ────────────────────────────────────── */}
        <Section id="start" title="02 · GETTING STARTED" icon={Wallet}>
          <Step n={1} title="Open the app">
            Land on the homepage (<Code>/</Code>) and read the briefing. Watch
            the <B>Episode 02 Graduation Countdown</B> and the{" "}
            <B>Bonding Curve Bar</B> to feel the pulse of the project.
          </Step>
          <Step n={2} title="Connect a Solana wallet">
            Click the <B>WALLET</B> chip in the top navigation, or use any
            in-app <B>CONNECT WALLET</B> button. Phantom, Solflare and
            Backpack are supported. You can also play with the default test
            wallet to preview the gameplay.
          </Step>
          <Step n={3} title="Visit your Profile">
            The <Link href="/profile" style={linkStyle}>Profile</Link> page
            shows your wallet address, current $NAHOPE balance, episode
            progress and your secured artifacts. Do the daily check-in for
            small rewards.
          </Step>
          <Step n={4} title="Launch Episode 1">
            Open the <Link href="/game" style={linkStyle}>EPISODE GAME</Link>{" "}
            tab to enter the Hopo Substation. This is where the real
            investigation begins.
          </Step>
        </Section>

        {/* ── 03. $NAHOPE Token ──────────────────────────────────────── */}
        <Section id="token" title="03 · THE $NAHOPE TOKEN" icon={Coins}>
          <P>
            <B>$NAHOPE</B> is the Solana memecoin that powers the entire HOPO
            PORT universe. The contract address is:
          </P>
          <Code block>CvKFHHfXqusmcrU18d6pvCWhJrWyteziqi99xJgjpump</Code>
          <P>
            The token launched on <B>pump.fun</B> and is currently moving
            through a <B>bonding curve</B>. When the curve reaches 100%, the
            liquidity automatically graduates to the Raydium pool —{" "}
            <B>and Episode 02 unlocks for everyone.</B>
          </P>
          <Callout color="cyan">
            No release date. No clock. The bonding curve is the only release
            schedule. Watch it on the homepage in real time.
          </Callout>
        </Section>

        {/* ── 04. Clearance Levels ───────────────────────────────────── */}
        <Section id="clearance" title="04 · CLEARANCE LEVELS" icon={ShieldAlert}>
          <P>
            Several characters and assets in the game are{" "}
            <B>token-gated</B>. Your $NAHOPE balance determines your
            clearance:
          </P>
          <Table
            rows={[
              ["BALANCE", "CLEARANCE", "WHAT YOU UNLOCK"],
              ["0 – 4,999", "RESTRICTED", "Basic exploration, public dialogue only"],
              ["≥ 5,000", "SECRET", "Full Episode 1 lore, classified NPC dialogues, Episode 2 access at graduation"],
              ["≥ 25,000", "OMEGA", "Future elite scenarios, governance voting weight, exclusive submissions"],
            ]}
          />
          <P>
            When you walk up to Chief Bum-seok, Officer Sung-ae or Outcast
            Sung-ki with insufficient balance, they will refuse to share
            classified logs. Increase your holdings and try again.
          </P>
        </Section>

        {/* ── 05. Playing Episode 1 ──────────────────────────────────── */}
        <Section id="episode1" title="05 · PLAYING EPISODE 1" icon={Gamepad2}>
          <P>
            Episode 1 — <B>&quot;The Cognitive Search&quot;</B> — takes place
            inside the Hopo Substation. You have three rooms to investigate:
          </P>
          <ul style={{ paddingLeft: 18, color: "var(--ink-1)", fontSize: 13, lineHeight: 1.7 }}>
            <li>
              <B style={{ color: "var(--acc-primary)" }}>OFFICE</B> — Chief
              Bum-seok&apos;s desk, the Goldstar typewriter, the Blue House
              rotary phone, the glitched green radar screen.
            </li>
            <li>
              <B style={{ color: "var(--acc-primary)" }}>FRONT YARD</B> —
              Officer Sung-ae on guard, the mutilated cow carcass, a torn ID
              tag on the barbed-wire fence.
            </li>
            <li>
              <B style={{ color: "var(--acc-primary)" }}>STORAGE</B> — Outcast
              Sung-ki on a beacon terminal, the workbench, the locked weapon
              cabinet.
            </li>
          </ul>
          <P>
            Use the room buttons (<B>MOVE OUTSIDE / GO TO OFFICE / ENTER
            BACKROOM</B>) at the top of the canvas to navigate. Click any
            highlighted hotspot to investigate. Hovering plays a beep;
            clicking opens dialogue and may reveal an item.
          </P>
          <P>
            <B>How to use an item on a hotspot:</B> open the right-side
            <B> Artifact Deck</B>, tap an item to <B>EQUIP</B> it, then click
            the relevant hotspot. If the item is the correct trigger, the
            game will reveal a hidden artifact (a &quot;Synergy Success&quot;).
          </P>
        </Section>

        {/* ── 06. Trigger-Belt Puzzles ───────────────────────────────── */}
        <Section id="puzzles" title="06 · TRIGGER-BELT PUZZLES" icon={KeyRound}>
          <P>
            HOPO PORT&apos;s core mechanic is the <B>&quot;trigger belt&quot;</B>:
            a strict chain of cause-and-effect where thoughtless clicking
            leads to dead ends. To complete Episode 1 you must execute the
            sequence in the correct order.
          </P>
          <Callout color="amber">
            ⚠ SPOILER ZONE — the sequence below reveals the Episode 1
            solution. Skip this section if you want to puzzle it out yourself.
          </Callout>
          <ol style={{ paddingLeft: 18, color: "var(--ink-1)", fontSize: 13, lineHeight: 1.75 }}>
            <li>
              Enter <B>STORAGE</B>. Search the <B>Workbench</B> drawer —
              you&apos;ll secure the <B>Screwdriver</B> and the{" "}
              <B>Cabinet Key</B> in one search.
            </li>
            <li>
              Still in STORAGE: equip the <B>Cabinet Key</B>, then click the
              <B> Locked Weapon Cabinet</B>. You secure the <B>80s Radio</B>.
            </li>
            <li>
              Move to the <B>OFFICE</B>. Equip the <B>Screwdriver</B>, then
              click the <B>Goldstar Typewriter</B>. You scrape out the{" "}
              <B>Green Alien Slime</B>.
            </li>
            <li>
              Slime collected → the Episode 1 finale overlay appears with the
              declassified signal analysis and a call to action for Episode 2.
            </li>
            <li>
              (Optional lore) Visit the <B>FRONT YARD</B>, examine the cow
              carcass and the metallic object on the fence to secure the{" "}
              <B>Torn ID Tag</B> and trigger atmospheric narration.
            </li>
          </ol>
        </Section>

        {/* ── 07. Inventory & Items ──────────────────────────────────── */}
        <Section id="inventory" title="07 · INVENTORY & ITEMS" icon={Package}>
          <P>
            Episode 1 contains <B>5 secureable artifacts</B>. Your Artifact
            Deck on the right-hand panel shows all 5 slots; locked slots are
            faded out, secured items can be tapped to equip.
          </P>
          <Table
            rows={[
              ["ITEM", "FOUND IN", "PURPOSE"],
              ["Screwdriver", "Storage · Workbench", "Disassembles the Goldstar typewriter"],
              ["Cabinet Key", "Storage · Workbench", "Opens the locked weapon cabinet"],
              ["80s Radio", "Storage · Weapon Cabinet", "Lore artifact · used in Episode 2 setup"],
              ["Torn ID Tag", "Front Yard · Fence", "Lore artifact · proves missing reservist"],
              ["Green Alien Slime", "Office · Typewriter", "Episode 1 finale trigger"],
            ]}
          />
          <P>
            Securing all 5 maxes out your Episode 1 Artifact Deck. Items
            persist in your profile, so you can return later for additional
            dialogue or share them on X.
          </P>
        </Section>

        {/* ── 08. Episode 2 Unlock ───────────────────────────────────── */}
        <Section id="episode2" title="08 · EPISODE 2 UNLOCK" icon={Coins}>
          <P>
            Episode 2 — <B>&quot;Disconnected Signals&quot;</B> — is sealed
            inside the omega vault. The unlock is <B>event-driven</B>, not
            time-driven:
          </P>
          <ol style={{ paddingLeft: 18, color: "var(--ink-1)", fontSize: 13, lineHeight: 1.7 }}>
            <li>The $NAHOPE bonding curve must reach <B>100% graduation</B>.</li>
            <li>At that instant, liquidity migrates to the Raydium pool.</li>
            <li>
              The Episode 2 stage automatically opens. Players holding{" "}
              <B>≥ 5,000 $NAHOPE</B> at SECRET clearance can enter
              immediately.
            </li>
          </ol>
          <P>
            Track your countdown on the homepage&apos;s <B>EPISODE 02
            GRADUATION COUNTDOWN</B> panel — the three numbers (Bonded %,
            Remaining %, SOL to go) update from live GeckoTerminal data every
            60 seconds.
          </P>
        </Section>

        {/* ── 09. Community ──────────────────────────────────────────── */}
        <Section id="community" title="09 · COMMUNITY & SCENARIOS" icon={Users}>
          <P>
            The <Link href="/community" style={linkStyle}>COMMUNITY</Link>{" "}
            page is the public transmission feed where survivors propose
            their Part 2 storylines.
          </P>
          <Step n={1} title="Collect at least 3 rare artifacts">
            The Elite Submission gate opens after you secure 3+ rare items
            (e.g. Omega Mark, Translator Fragment, Alien Core in later
            episodes; for now: Screwdriver, Cabinet Key, 80s Radio qualify
            via the teaser).
          </Step>
          <Step n={2} title="Write your scenario">
            Use the on-canvas <B>OMEGA PROTOCOL · WRITE SCENARIO</B> button.
            Combine your secured artifacts into a coherent Part 2 proposal
            (up to 1,000 characters, English).
          </Step>
          <Step n={3} title="Transmit to the feed">
            Submissions appear on the community page. The community votes
            with $NAHOPE (governance weight). The winning scenario is bound
            into a classified-style physical book and delivered in person to
            director Na Hong-jin / Forged Films at the summer premiere event.
          </Step>
        </Section>

        {/* ── 10. UGC Sharing ────────────────────────────────────────── */}
        <Section id="ugc" title="10 · UGC SHARING ON X" icon={Share2}>
          <P>
            Every secured artifact in your inventory has a <B>SHARE MEME ON
            X</B> button. Tapping it opens a pre-filled tweet referencing
            $NAHOPE, the artifact, and Na Hong-jin&apos;s film.
          </P>
          <P>
            Posts that gain community engagement are eligible for{" "}
            <B>automated airdrop rewards</B>, paid out in small $NAHOPE
            amounts to incentivize holding and storytelling. Share early,
            share often.
          </P>
        </Section>

        {/* ── 11. Glossary ───────────────────────────────────────────── */}
        <Section id="glossary" title="11 · GLOSSARY" icon={BookOpen}>
          <Table
            rows={[
              ["TERM", "MEANING"],
              ["Omega Protocol (Ω)", "The cosmic-horror containment protocol. The carved Greek letter Ω marks every anomaly."],
              ["Trigger Belt", "A strict puzzle chain — wrong order = bad ending."],
              ["Bonding Curve", "Pump.fun&apos;s automated price mechanism. Reaches 100% to graduate to Raydium."],
              ["Graduation", "When a pump.fun token migrates to a real DEX pool. Triggers Episode 2 unlock."],
              ["Artifact Deck", "Your in-game inventory of 5 secured items."],
              ["Synergy Success", "When the correct equipped item unlocks a hotspot's hidden artifact."],
              ["CGC", "Collective Generated Content — community storytelling for Part 2."],
            ]}
          />
        </Section>

        {/* ── 12. Troubleshooting ────────────────────────────────────── */}
        <Section id="troubleshoot" title="12 · TROUBLESHOOTING" icon={HelpCircle}>
          <FaqItem
            q="The wallet button does nothing."
            a="Make sure Phantom, Solflare or Backpack is installed in your browser. On mobile, open the page inside the wallet's built-in browser. If still stuck, refresh and try again."
          />
          <FaqItem
            q="An NPC refuses to talk to me."
            a="You don't have SECRET clearance. Acquire at least 5,000 $NAHOPE and refresh the game page."
          />
          <FaqItem
            q="A hotspot isn't reacting."
            a="It probably requires an item. Open the Artifact Deck, equip the right item (it glows green when active), then click the hotspot."
          />
          <FaqItem
            q="The Episode 1 finale overlay won't appear."
            a="You haven't collected the Green Alien Slime yet. You need the Screwdriver equipped on the Goldstar Typewriter in the OFFICE."
          />
          <FaqItem
            q="When does Episode 2 release?"
            a="There is no release date. It unlocks the moment the $NAHOPE bonding curve graduates at 100%. Watch the countdown on the homepage."
          />
          <FaqItem
            q="Mobile UI looks cramped."
            a="The game page uses a tab switcher on mobile (GAME / LOGS / ITEMS). Tap the tabs to swap panels. The canvas itself fills the full screen width."
          />
        </Section>

        {/* ── Footer / CTA ──────────────────────────────────────────── */}
        <div
          style={{
            marginTop: 48,
            padding: "24px 20px",
            border: "1px solid var(--acc-primary)",
            background: "color-mix(in srgb, var(--acc-primary) 4%, transparent)",
            textAlign: "center",
            boxShadow: "var(--glow-primary)",
          }}
        >
          <p
            style={{
              fontSize: 11,
              letterSpacing: "0.24em",
              color: "var(--acc-primary)",
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            // BRIEFING COMPLETE · STAND BY FOR INSERTION
          </p>
          <p style={{ fontSize: 13, color: "var(--ink-1)", marginBottom: 16 }}>
            You are now cleared to enter the Hopo Substation. Good luck,
            survivor.
          </p>
          <Link
            href="/game"
            style={{
              display: "inline-block",
              padding: "12px 24px",
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              background: "var(--acc-primary)",
              color: "var(--bg-0)",
              textDecoration: "none",
              boxShadow: "var(--glow-primary)",
            }}
          >
            ▶ LAUNCH EPISODE 1
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ── Helpers ──────────────────────────────────────────────────────── */

const linkStyle: React.CSSProperties = {
  color: "var(--acc-primary)",
  textDecoration: "underline",
  textDecorationStyle: "dotted",
};

function Section({
  id,
  title,
  icon: Icon,
  children,
}: {
  id?: string;
  title: string;
  icon: React.ComponentType<{ size?: number }>;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      style={{
        marginTop: 32,
        padding: "20px 18px",
        border: "1px solid var(--line)",
        background: "var(--bg-1)",
        position: "relative",
        scrollMarginTop: 80,
      }}
    >
      <h2
        className="display"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          fontSize: 16,
          letterSpacing: "0.18em",
          color: "var(--acc-primary)",
          textTransform: "uppercase",
          marginBottom: 14,
          paddingBottom: 10,
          borderBottom: "1px solid var(--line)",
        }}
      >
        <Icon size={14} />
        {title}
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {children}
      </div>
    </section>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontSize: 13,
        color: "var(--ink-1)",
        lineHeight: 1.7,
        fontFamily: "var(--font-sans, var(--font-mono))",
      }}
    >
      {children}
    </p>
  );
}

function B({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <strong style={{ color: "var(--ink-0)", fontWeight: 600, ...style }}>
      {children}
    </strong>
  );
}

function Code({
  children,
  block = false,
}: {
  children: React.ReactNode;
  block?: boolean;
}) {
  if (block) {
    return (
      <pre
        style={{
          padding: 12,
          background: "var(--bg-0)",
          border: "1px solid var(--line-bright)",
          color: "var(--acc-cyan)",
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: "0.04em",
          overflowX: "auto",
          margin: 0,
          whiteSpace: "pre-wrap",
          wordBreak: "break-all",
        }}
      >
        {children}
      </pre>
    );
  }
  return (
    <code
      style={{
        padding: "1px 6px",
        background: "var(--bg-0)",
        border: "1px solid var(--line)",
        color: "var(--acc-cyan)",
        fontFamily: "var(--font-mono)",
        fontSize: 12,
      }}
    >
      {children}
    </code>
  );
}

function Step({
  n,
  title,
  children,
}: {
  n: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: 14,
        padding: "12px 14px",
        background: "var(--bg-0)",
        border: "1px solid var(--line)",
      }}
    >
      <div
        style={{
          flexShrink: 0,
          width: 28,
          height: 28,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--bg-2)",
          border: "1px solid var(--acc-primary)",
          color: "var(--acc-primary)",
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          fontWeight: 700,
        }}
      >
        {n}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: 12,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--ink-0)",
            marginBottom: 4,
            fontWeight: 600,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 12.5,
            color: "var(--ink-1)",
            lineHeight: 1.6,
            fontFamily: "var(--font-sans, var(--font-mono))",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

function Callout({
  children,
  color = "primary",
}: {
  children: React.ReactNode;
  color?: "primary" | "violet" | "cyan" | "amber" | "danger";
}) {
  const c = `var(--acc-${color === "primary" ? "primary" : color})`;
  return (
    <div
      style={{
        padding: "10px 14px",
        borderLeft: `3px solid ${c}`,
        background: `color-mix(in srgb, ${c} 6%, transparent)`,
        color: "var(--ink-1)",
        fontSize: 12.5,
        lineHeight: 1.6,
        fontFamily: "var(--font-sans, var(--font-mono))",
      }}
    >
      {children}
    </div>
  );
}

function Table({ rows }: { rows: string[][] }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontFamily: "var(--font-mono)",
          fontSize: 11.5,
        }}
      >
        <thead>
          <tr>
            {rows[0].map((h, i) => (
              <th
                key={i}
                style={{
                  textAlign: "left",
                  padding: "8px 10px",
                  borderBottom: "1px solid var(--acc-primary)",
                  color: "var(--acc-primary)",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  fontSize: 10,
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.slice(1).map((r, ri) => (
            <tr key={ri}>
              {r.map((cell, ci) => (
                <td
                  key={ci}
                  style={{
                    padding: "8px 10px",
                    borderBottom: "1px dashed var(--ink-4)",
                    color: ci === 0 ? "var(--ink-0)" : "var(--ink-1)",
                    verticalAlign: "top",
                    lineHeight: 1.5,
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <details
      style={{
        border: "1px solid var(--line)",
        padding: "10px 14px",
        background: "var(--bg-0)",
      }}
    >
      <summary
        style={{
          cursor: "pointer",
          fontSize: 12.5,
          color: "var(--ink-0)",
          fontWeight: 600,
          listStyle: "none",
        }}
      >
        ▸ {q}
      </summary>
      <p
        style={{
          marginTop: 8,
          fontSize: 12,
          color: "var(--ink-2)",
          lineHeight: 1.6,
          fontFamily: "var(--font-sans, var(--font-mono))",
        }}
      >
        {a}
      </p>
    </details>
  );
}
