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
import { useLanguage } from "../../lib/i18n";

export default function GuidePage() {
  const { language } = useLanguage();
  if (language === "ko") return <KoreanGuidePage />;

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
            <BookOpen size={11} /> {"// FIELD GUIDE · CLASSIFIED"}
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
              ["08", "Endings", "#endings"],
              ["09", "Episode 2 Unlock", "#episode2"],
              ["10", "Community & Scenarios", "#community"],
              ["11", "UGC Sharing on X", "#ugc"],
              ["12", "Glossary", "#glossary"],
              ["13", "Troubleshooting", "#troubleshoot"],
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
            Episode 1 — <B>&quot;Ignorance: The Omega Mark on the Cow&quot;</B> —
            begins at 18:40 on 1983.08.◯◯. You have <B>20 turns</B> before the
            fog claims the village youth Bong-sik. Six locations to explore:
          </P>
          <ul style={{ paddingLeft: 18, color: "var(--ink-1)", fontSize: 13, lineHeight: 1.7 }}>
            <li>
              <B style={{ color: "var(--acc-primary)" }}>OFFICE</B> — Sgt. Sung-ki sleeping at his desk, the Chief&apos;s locked drawer, the Calivan rifle on the rack, a Goldstar typewriter, a field radio.
            </li>
            <li>
              <B style={{ color: "var(--acc-primary)" }}>ARMORY LOCKER</B> — A steel locker (needs a key), dark space behind it, empty top shelf.
            </li>
            <li>
              <B style={{ color: "var(--acc-primary)" }}>FRONT YARD</B> — Radio antenna, village youth Bong-sik near the gate, the gate to the field (needs coordinates).
            </li>
            <li>
              <B style={{ color: "var(--acc-primary)" }}>DMZ · MILLET FIELD</B> — A mutilated cow, disturbed soil beside it, the forest edge.
            </li>
            <li>
              <B style={{ color: "var(--acc-primary)" }}>PINE FOREST</B> — A solid fog wall, a clearing deeper in, a hidden coastal path. <em>Locked until you burn the fog.</em>
            </li>
            <li>
              <B style={{ color: "var(--acc-primary)" }}>FOGGY COAST</B> — An iron hatch, an inscription in a language that is not Greek. <em>Hidden ending path.</em>
            </li>
          </ul>
          <P>
            Navigation buttons appear <B>below the canvas image</B>. Click any
            highlighted hotspot to investigate. Hovering shows a crosshair and
            label; clicking triggers dialogue and may reveal an item.
          </P>
          <P>
            <B>How to use an item on a hotspot:</B> open the right-side
            <B> DECK</B> panel, tap an item to <B>EQUIP</B> it (it shows in the
            Active bar beneath the canvas), then click the target hotspot. If
            the item matches the trigger, a hidden artifact is revealed —
            a &quot;Synergy Success&quot;.
          </P>
          <Callout color="amber">
            ⏱ Turn budget: every meaningful action costs 1–3 turns. Idle
            inspections cost 0. You have 20 turns total — spend them carefully.
          </Callout>
        </Section>

        {/* ── 06. Trigger-Belt Puzzles ───────────────────────────────── */}
        <Section id="puzzles" title="06 · TRIGGER-BELT PUZZLES" icon={KeyRound}>
          <P>
            HOPO PORT&apos;s core mechanic is the <B>&quot;trigger belt&quot;</B>:
            a strict chain of cause-and-effect where thoughtless clicking
            leads to dead ends or turn waste. Episode 1 has four possible
            endings — the canonical path is <B>Ending C · Witness</B>.
          </P>
          <Callout color="amber">
            ⚠ SPOILER ZONE — full Episode 1 solution below. Skip if you want
            to discover it yourself.
          </Callout>
          <P><B style={{ color: "var(--acc-primary)" }}>Ending C · Witness (canonical path)</B></P>
          <ol style={{ paddingLeft: 18, color: "var(--ink-1)", fontSize: 13, lineHeight: 1.75 }}>
            <li>
              <B>OFFICE</B> — Click <B>Sung-ki&apos;s Pocket</B> while he sleeps
              (do NOT turn on the radio first — the noise wakes him → Ending B).
              You receive the <B>Armory Key</B> and <B>Brass Lighter</B>.
            </li>
            <li>
              Move to <B>ARMORY LOCKER</B>. Equip <B>Armory Key</B>, click the
              <B> Steel Locker</B> → <B>Lubricating Oil</B> + <B>Spare Magazine</B>.
              Then click <B>Behind the Locker</B> → <B>Field Report p.1</B>.
            </li>
            <li>
              Return to <B>OFFICE</B>. Equip <B>Lubricating Oil</B>, click
              <B> Chief&apos;s Drawer</B> → <B>Confiscated Screwdriver</B> +
              <B> Polaroid (1950)</B>.
            </li>
            <li>
              Still in OFFICE. Equip <B>Screwdriver</B>, click <B>Calivan Rifle</B>
              → <B>Green Alien Slime</B> + <B>Translator Fragment</B>.
              <em style={{ color: "var(--acc-danger)" }}> Do NOT equip Spare Magazine on the rifle — it destroys the Slime.</em>
            </li>
            <li>
              Move to <B>FRONT YARD</B>. With both Slime and Translator Fragment
              in inventory, click <B>Radio Antenna</B> → <B>80s Field Radio</B>
              + coordinates unlocked.
            </li>
            <li>
              Click <B>Gate to Field</B> (now passable) → enter <B>DMZ · MILLET FIELD</B>.
            </li>
            <li>
              FIELD — first equip <B>Polaroid (1950)</B>, click <B>Typewriter</B>
              in OFFICE to pry the frame and get the <B>Magnifying Glass</B> if
              you skipped it. Then equip <B>Magnifying Glass</B>, click
              <B> The Cow</B> → <B>COW_INSPECTED</B> flag + Ω mark revealed.
            </li>
            <li>
              Click <B>Disturbed Soil</B> beside the cow (before turn 17) →
              <B> Hopo License Plate</B>. After turn 16 crows take it.
            </li>
            <li>
              Click <B>Forest Edge</B> (requires COW_INSPECTED) →{" "}
              <B>PINE FOREST</B>.
            </li>
            <li>
              FOREST — equip <B>Brass Lighter</B>, click <B>The Fog</B> (you
              must also carry <B>Field Report p.1</B>) → fog burns back,
              <B> FOG_BURNED</B> flag.
            </li>
            <li>
              Click <B>The Clearing</B> (before turn 20) →{" "}
              <B>Ending C · Witness</B>. Bong-sik lives. You receive the
              <B> Omega Mark</B> artifact.
            </li>
          </ol>

          <p style={{ marginTop: 8, fontSize: 13, color: "var(--ink-1)", lineHeight: 1.7, fontFamily: "var(--font-sans, var(--font-mono))" }}><B style={{ color: "var(--acc-violet)" }}>Ending D · Apostate (hidden path)</B></p>
          <ol style={{ paddingLeft: 18, color: "var(--ink-1)", fontSize: 13, lineHeight: 1.75 }}>
            <li>Complete steps 1–10 above (fog must be burned).</li>
            <li>
              FOREST — equip <B>Translator Fragment</B>, click <B>The Clearing</B>
              → you hesitate and choose not to save him (<B>APOSTATE_STEP_1</B>).
            </li>
            <li>
              Click <B>Path to the Coast</B> → <B>COAST_OPEN</B>, then enter
              <B> FOGGY COAST</B>.
            </li>
            <li>
              COAST — equip <B>Translator Fragment</B>, click <B>Inscription</B>
              → <B>APOSTATE_STEP_2</B>.
            </li>
            <li>
              Equip <B>Green Alien Slime</B>, click <B>Iron Hatch</B> →
              <B> Ending D · Apostate</B>. You receive the
              <B> Ω Mark (Apostate)</B> artifact.
            </li>
          </ol>

          <Callout color="danger">
            Ending A (bad): run out of turns before reaching the Clearing.
            Bong-sik dies. · Ending B (restart): turn on the radio while
            Sung-ki is sleeping, then touch his pocket.
          </Callout>
        </Section>

        {/* ── 07. Inventory & Items ──────────────────────────────────── */}
        <Section id="inventory" title="07 · INVENTORY & ITEMS" icon={Package}>
          <P>
            Episode 1 contains <B>14 items</B>. Your Artifact Deck (DECK
            panel on the right) shows all secured items; tap any to equip.
            Items marked <B style={{ color: "var(--acc-primary)" }}>ARTIFACT</B> persist to your profile and unlock community
            submission. Items marked <B style={{ color: "var(--acc-danger)" }}>LOSABLE</B> can be destroyed if
            you act too late.
          </P>
          <Table
            rows={[
              ["ITEM", "FOUND IN", "NOTES"],
              ["Armory Key", "Office · Sung-ki's Pocket", "Opens the Steel Locker in the Armory"],
              ["Brass Lighter", "Office · Sung-ki's Pocket", "Burns the Fog Wall (needs Field Report p.1)"],
              ["Lubricating Oil", "Armory · Steel Locker", "Unsticks Chief's Drawer"],
              ["Spare Magazine", "Armory · Steel Locker", "Wrong caliber — destroys Slime if used on rifle"],
              ["Confiscated Screwdriver", "Office · Chief's Drawer", "Disassembles the Calivan Rifle"],
              ["Polaroid (1950)", "Office · Chief's Drawer", "Use on Typewriter to extract Magnifying Glass"],
              ["Magnifying Glass", "Office · Typewriter", "Reveals Ω brand on the cow"],
              ["Green Alien Slime ★", "Office · Calivan Rifle", "ARTIFACT · unlocks the Coast hatch (Ending D)"],
              ["Translator Fragment ★", "Office · Calivan Rifle", "ARTIFACT · tunes the Antenna + Apostate path"],
              ["Field Report p.1 ◆", "Armory · Behind Locker", "LOSABLE · required to burn the fog"],
              ["Hopo License Plate ◆", "Field · Disturbed Soil", "LOSABLE · expires after turn 16"],
              ["80s Field Radio", "Yard · Radio Antenna", "Lore artifact · unlocks gate to field"],
              ["Omega Mark ★", "Forest · The Clearing", "ARTIFACT · granted on Ending C"],
              ["Ω Mark (Apostate) ★", "Coast · Iron Hatch", "ARTIFACT · granted on Ending D only"],
            ]}
          />
          <P>
            Artifacts (★) persist in your profile and can be shared on X.
            Losable items (◆) disappear if you wait too long — move quickly.
          </P>
        </Section>

        {/* ── 08. Endings ────────────────────────────────────────────── */}
        <Section id="endings" title="08 · ENDINGS" icon={ShieldAlert}>
          <P>
            Episode 1 has four endings. Only C and D grant artifacts and mark
            the episode as cleared.
          </P>
          <Table
            rows={[
              ["ENDING", "CONDITION", "RESULT"],
              ["A · Ignorance-Born Tragedy", "Reach the Clearing on turn 20 or later", "Bad end — Bong-sik dies, no artifacts"],
              ["B · Court-Martial", "Wake Sgt. Sung-ki (turn on radio, then pickpocket)", "Forced restart, no artifacts"],
              ["C · Witness", "Pull Bong-sik from the Clearing before turn 20", "Grants Omega Mark ★, Green Alien Slime ★, Translator Fragment ★"],
              ["D · Apostate", "Complete the hidden Coast path instead of saving him", "Grants Ω Mark (Apostate) ★, Green Alien Slime ★, Translator Fragment ★"],
            ]}
          />
          <Callout color="violet">
            Endings C and D both unlock the Episode 2 gate — but the artifact
            you receive differs. The Apostate path requires strict ordering
            across three distinct actions; see Section 06.
          </Callout>
        </Section>

        {/* ── 09. Episode 2 Unlock ───────────────────────────────────── */}
        <Section id="episode2" title="09 · EPISODE 2 UNLOCK" icon={Coins}>
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

        {/* ── 10. Community ──────────────────────────────────────────── */}
        <Section id="community" title="10 · COMMUNITY & SCENARIOS" icon={Users}>
          <P>
            The <Link href="/community" style={linkStyle}>COMMUNITY</Link>{" "}
            page is the public transmission feed where survivors propose
            their Part 2 storylines.
          </P>
          <Step n={1} title="Collect at least 3 rare artifacts">
            The Elite Submission gate opens after you secure 3+ artifact items
            (★ tier). Episode 1 artifacts: <B>Green Alien Slime</B>,{" "}
            <B>Translator Fragment</B>, and either <B>Omega Mark</B> (Ending C)
            or <B>Ω Mark (Apostate)</B> (Ending D).
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

        {/* ── 11. UGC Sharing ────────────────────────────────────────── */}
        <Section id="ugc" title="11 · UGC SHARING ON X" icon={Share2}>
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

        {/* ── 12. Glossary ───────────────────────────────────────────── */}
        <Section id="glossary" title="12 · GLOSSARY" icon={BookOpen}>
          <Table
            rows={[
              ["TERM", "MEANING"],
              ["Omega Protocol (Ω)", "The cosmic-horror containment protocol. The carved Greek letter Ω marks every anomaly."],
              ["Trigger Belt", "A strict cause-and-effect puzzle chain — wrong order wastes turns or locks you into a bad ending."],
              ["Turn", "A unit of action. Meaningful actions cost 1–3 turns; idle inspections cost 0. Episode 1 cap: 20 turns."],
              ["Synergy Success", "When the correct equipped item unlocks a hotspot's hidden interaction."],
              ["Artifact (★)", "A rare item that persists to your profile and qualifies you for community submission."],
              ["Losable (◆)", "An item that can be permanently destroyed if you wait too long (Field Report p.1, License Plate)."],
              ["FOG_BURNED", "The flag that opens the Pine Forest after using the Brass Lighter on the fog wall."],
              ["APOSTATE_STEP", "A three-part hidden flag chain required to access Ending D via the Foggy Coast."],
              ["Bonding Curve", "Pump.fun's automated price mechanism. Reaches 100% to graduate to Raydium."],
              ["Graduation", "When a pump.fun token migrates to a real DEX pool. Triggers Episode 2 unlock."],
              ["CGC", "Collective Generated Content — community storytelling for Part 2."],
            ]}
          />
        </Section>

        {/* ── 13. Troubleshooting ────────────────────────────────────── */}
        <Section id="troubleshoot" title="13 · TROUBLESHOOTING" icon={HelpCircle}>
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
            a="It probably requires an equipped item. Open the DECK panel on the right, tap an item to equip it (shown in the Active bar below the canvas), then click the hotspot. A wrongly-equipped item makes the hotspot border glow red."
          />
          <FaqItem
            q="I can't get into the Pine Forest."
            a="The Forest is locked until you burn the fog. You need both the Brass Lighter equipped AND Field Report p.1 in your inventory. Get the Report from behind the Armory locker after opening it."
          />
          <FaqItem
            q="The ending overlay won't appear."
            a="For Ending C: reach The Clearing in the Pine Forest before turn 20 (without Translator Fragment equipped). For Ending D: complete all three APOSTATE_STEP actions — in the Clearing, at the Inscription, then on the Hatch."
          />
          <FaqItem
            q="I lost my Field Report or License Plate."
            a="Both are losable items (◆). Field Report p.1 is not consumed when you burn the fog, but if you somehow skipped the Armory it won't be there. License Plate disappears after turn 16 — inspect the cow first and move quickly."
          />
          <FaqItem
            q="When does Episode 2 release?"
            a="There is no release date. It unlocks the moment the $NAHOPE bonding curve graduates at 100%. Watch the countdown on the homepage."
          />
          <FaqItem
            q="Mobile UI looks cramped."
            a="The game page uses a tab switcher on mobile (PLATE / DOSSIER / DECK). Tap the tabs at the bottom to swap panels. Navigation buttons appear below the canvas image so they never cover hotspots."
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
            {"// BRIEFING COMPLETE · STAND BY FOR INSERTION"}
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

function KoreanGuidePage() {
  const contents = [
    ["01", "호포항이란?", "#what"],
    ["02", "시작하기", "#start"],
    ["03", "$NAHOPE 토큰", "#token"],
    ["04", "보안 등급", "#clearance"],
    ["05", "에피소드 1 플레이", "#episode1"],
    ["06", "트리거 벨트 퍼즐", "#puzzles"],
    ["07", "인벤토리와 아이템", "#inventory"],
    ["08", "엔딩", "#endings"],
    ["09", "에피소드 2 해금", "#episode2"],
    ["10", "커뮤니티와 시나리오", "#community"],
    ["11", "X에 UGC 공유", "#ugc"],
    ["12", "용어집", "#glossary"],
    ["13", "문제 해결", "#troubleshoot"],
  ];

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-0)", color: "var(--ink-0)", fontFamily: "var(--font-mono)", padding: "32px 16px 120px" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", border: "1px solid var(--acc-primary)", color: "var(--acc-primary)", fontSize: 10, letterSpacing: "0.24em", marginBottom: 16, boxShadow: "var(--glow-primary)" }}>
            <BookOpen size={11} /> {"// 현장 지침서 · 기밀"}
          </div>
          <h1 className="display glitch-text" data-text="호포항 현장 지침서" style={{ fontSize: 36, letterSpacing: "0.08em", marginBottom: 10, color: "var(--ink-0)" }}>
            호포항 현장 지침서
          </h1>
          <p style={{ fontFamily: "var(--font-sans, var(--font-mono))", fontSize: 14, color: "var(--ink-2)", maxWidth: 640, margin: "0 auto", lineHeight: 1.6 }}>
            생존자 여러분, 환영합니다. 이 문서는 나홍진 감독의 영화 <span style={{ color: "var(--acc-primary)" }}>HOPE</span>에서 영감을 받은 인터랙티브 시네마틱 RPG, 호포항: 오메가 프로토콜의 공식 지침서입니다. 격리 구역에 들어가기 전에 모든 항목을 읽으십시오.
          </p>
        </div>

        <Section title="// 목차" icon={Compass}>
          <ol style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8, listStyle: "none", padding: 0, margin: 0 }}>
            {contents.map(([num, label, href]) => (
              <li key={href}>
                <a href={href} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", border: "1px solid var(--line)", color: "var(--ink-1)", textDecoration: "none", fontSize: 12 }}>
                  <span style={{ color: "var(--acc-amber)", fontSize: 10 }}>{num}</span>{label}
                </a>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="what" title="01 · 호포항이란?" icon={HelpCircle}>
          <P>호포항: 오메가 프로토콜은 1970~80년대 DMZ 해안 마을 <B>호포항</B>을 배경으로 한 하드코어 <B>포인트 앤 클릭 수사 게임</B>입니다. 나홍진 감독 특유의 우주적 공포와 고전 게임 <B>유작(遺作)</B>의 연쇄 퍼즐 구조를 결합했습니다.</P>
          <P>플레이 기록은 솔라나 밈코인 <B>$NAHOPE</B>의 가치를 증명하고 지키는 온체인 참여 장치입니다. 공동체의 발견과 시나리오는 실물 기밀 문서로 제작되어 <B>HOPE 파트 2: 우주의 인간</B> 제안서로 나홍진 감독에게 전달될 예정입니다.</P>
          <Callout color="violet">수동적으로 관람하는 콘텐츠가 아닙니다. 클릭, 확보한 유물, 제출한 시나리오가 모두 진화하는 공동 서사의 일부가 됩니다.</Callout>
        </Section>

        <Section id="start" title="02 · 시작하기" icon={Wallet}>
          <Step n={1} title="앱 열기">홈 화면에서 브리핑을 읽고 <B>에피소드 02 졸업 카운트다운</B>과 <B>본딩 커브</B> 진행률을 확인합니다.</Step>
          <Step n={2} title="솔라나 지갑 연결">상단의 <B>지갑</B> 버튼이나 화면의 <B>지갑 연결</B> 버튼을 누릅니다. Phantom, Solflare, Backpack을 지원하며, 기본 테스트 지갑으로 게임을 미리 볼 수도 있습니다.</Step>
          <Step n={3} title="프로필 확인"><Link href="/profile" style={linkStyle}>프로필</Link>에서 지갑 주소, $NAHOPE 잔액, 에피소드 진행도와 확보한 유물을 확인하고 일일 출석 보상을 받습니다.</Step>
          <Step n={4} title="에피소드 1 시작"><Link href="/game" style={linkStyle}>에피소드 게임</Link>을 열어 호포 파출소로 진입합니다.</Step>
        </Section>

        <Section id="token" title="03 · $NAHOPE 토큰" icon={Coins}>
          <P><B>$NAHOPE</B>는 호포항 세계를 구동하는 솔라나 밈코인입니다. 컨트랙트 주소:</P>
          <Code block>CvKFHHfXqusmcrU18d6pvCWhJrWyteziqi99xJgjpump</Code>
          <P>토큰은 <B>pump.fun</B>에서 출시되어 본딩 커브를 진행 중입니다. 커브가 100%에 도달하면 유동성이 Raydium 풀로 이동하며 <B>모든 플레이어에게 에피소드 02가 열립니다.</B></P>
          <Callout color="cyan">고정 출시일이나 시계는 없습니다. 본딩 커브가 유일한 출시 일정이며 홈 화면에서 실시간으로 확인할 수 있습니다.</Callout>
        </Section>

        <Section id="clearance" title="04 · 보안 등급" icon={ShieldAlert}>
          <P>일부 인물과 자료는 토큰 보유량으로 제한됩니다. $NAHOPE 잔액에 따라 보안 등급이 정해집니다.</P>
          <Table rows={[
            ["잔액", "보안 등급", "해금 내용"],
            ["0 – 4,999", "제한", "기본 탐색과 공개 대화"],
            ["5,000 이상", "기밀", "에피소드 1 전체 설정, 기밀 NPC 대화, 졸업 시 에피소드 2 입장"],
            ["25,000 이상", "오메가", "향후 엘리트 시나리오, 거버넌스 투표 가중치, 전용 제출 권한"],
          ]} />
          <P>잔액이 부족하면 범석 소장, 성애 순경, 성기 하사가 기밀 기록을 공개하지 않습니다. 보유량을 늘린 뒤 다시 시도하십시오.</P>
        </Section>

        <Section id="episode1" title="05 · 에피소드 1 플레이" icon={Gamepad2}>
          <P>에피소드 1 <B>“무지: 소에 새겨진 오메가 표식”</B>은 1983.08.◯◯ 18시 40분에 시작합니다. 안개가 마을 청년 봉식을 삼키기 전까지 <B>20턴</B> 안에 사건을 해결해야 합니다.</P>
          <Table rows={[
            ["구역", "조사 대상"],
            ["사무실", "잠든 성기, 소장 서랍, 칼리반 소총, 금성 타자기, 야전 무전기"],
            ["무기고", "잠긴 철제 사물함, 사물함 뒤편, 빈 윗선반"],
            ["앞마당", "무전 안테나, 봉식, 밭으로 가는 문"],
            ["DMZ 조밭", "훼손된 소, 뒤집힌 흙, 숲 가장자리"],
            ["소나무 숲", "단단한 안개 장벽, 빈터, 숨겨진 해안 길"],
            ["안개 낀 해안", "철제 해치와 그리스어가 아닌 비문"],
          ]} />
          <P>강조된 조사 지점을 클릭하면 대화나 아이템이 나타납니다. 아이템은 오른쪽 <B>증거판</B>에서 장착한 뒤 대상 지점을 클릭해 사용합니다. 올바른 조합이면 숨겨진 상호작용이 열립니다.</P>
          <Callout color="amber">⏱ 중요한 행동은 1~3턴을 소비하고 단순 조사는 0턴입니다. 총 20턴을 신중하게 사용하십시오.</Callout>
        </Section>

        <Section id="puzzles" title="06 · 트리거 벨트 퍼즐" icon={KeyRound}>
          <P><B>트리거 벨트</B>는 원인과 결과가 엄격하게 이어지는 퍼즐 사슬입니다. 무작정 클릭하면 턴을 낭비하거나 나쁜 엔딩에 갇힙니다. 정식 경로는 <B>엔딩 C · 목격자</B>입니다.</P>
          <Callout color="amber">⚠ 스포일러 구역 — 아래에는 에피소드 1의 전체 해법이 있습니다.</Callout>
          <ol style={{ paddingLeft: 18, color: "var(--ink-1)", fontSize: 13, lineHeight: 1.75 }}>
            <li>사무실에서 무전기를 켜지 말고 잠든 <B>성기의 주머니</B>를 조사해 <B>무기고 열쇠</B>와 <B>놋쇠 라이터</B>를 얻습니다.</li>
            <li>무기고에서 열쇠를 사물함에 사용해 <B>윤활유</B>와 <B>예비 탄창</B>을 얻고, 뒤편에서 <B>현장 보고서 1쪽</B>을 찾습니다.</li>
            <li>사무실에서 윤활유를 소장 서랍에 사용해 <B>압수된 드라이버</B>와 <B>폴라로이드(1950)</B>를 얻습니다.</li>
            <li>드라이버로 칼리반 소총을 분해해 <B>녹색 외계 점액</B>과 <B>번역기 파편</B>을 얻습니다. 예비 탄창을 쓰면 점액이 파괴됩니다.</li>
            <li>앞마당 안테나를 조사해 좌표와 <B>80년대 야전 무전기</B>를 확보한 뒤 밭으로 이동합니다.</li>
            <li>폴라로이드를 사무실 타자기에 사용해 <B>확대경</B>을 꺼내고, 소 사체를 확대 조사합니다.</li>
            <li>17턴 전에 뒤집힌 흙에서 <B>호포 차량 번호판</B>을 얻고 숲으로 진입합니다.</li>
            <li>현장 보고서를 가진 채 라이터를 안개에 사용하고, 20턴 전에 빈터에서 봉식을 구하면 <B>엔딩 C</B>입니다.</li>
          </ol>
          <P><B style={{ color: "var(--acc-violet)" }}>엔딩 D · 배교자</B>: 안개를 태운 뒤 번역기 파편을 장착하고 빈터를 조사합니다. 해안 길을 열어 비문에 파편을 사용한 다음, 녹색 점액을 철제 해치에 사용하십시오.</P>
          <Callout color="danger">엔딩 A: 빈터에 도달하기 전에 턴을 모두 소모합니다. · 엔딩 B: 무전기로 성기를 깨운 뒤 주머니를 건드립니다.</Callout>
        </Section>

        <Section id="inventory" title="07 · 인벤토리와 아이템" icon={Package}>
          <P>에피소드 1에는 <B>14개 아이템</B>이 있습니다. ★ 유물은 프로필에 남아 커뮤니티 제출 권한을 열고, ◆ 소실 가능 아이템은 늦게 행동하면 영구히 사라집니다.</P>
          <Table rows={[
            ["아이템", "발견 장소", "용도"],
            ["무기고 열쇠", "사무실 · 성기의 주머니", "무기고 철제 사물함 개방"],
            ["놋쇠 라이터", "사무실 · 성기의 주머니", "현장 보고서와 함께 안개 장벽 소각"],
            ["윤활유", "무기고 · 철제 사물함", "소장 서랍 열기"],
            ["예비 탄창", "무기고 · 철제 사물함", "잘못된 구경 — 소총에 쓰면 점액 파괴"],
            ["압수된 드라이버", "사무실 · 소장 서랍", "칼리반 소총 분해"],
            ["폴라로이드 (1950)", "사무실 · 소장 서랍", "타자기에서 확대경 추출"],
            ["확대경", "사무실 · 타자기", "소 가죽의 Ω 표식 확인"],
            ["녹색 외계 점액 ★", "사무실 · 칼리반 소총", "엔딩 D 해치 개방 유물"],
            ["번역기 파편 ★", "사무실 · 칼리반 소총", "안테나 조율과 배교자 경로"],
            ["현장 보고서 1쪽 ◆", "무기고 · 사물함 뒤", "안개 소각에 필요"],
            ["호포 차량 번호판 ◆", "밭 · 뒤집힌 흙", "16턴 이후 소실"],
            ["80년대 야전 무전기", "앞마당 · 안테나", "밭 입장 좌표 해금"],
            ["오메가 표식 ★", "숲 · 빈터", "엔딩 C 보상"],
            ["Ω 표식 (배교자) ★", "해안 · 철제 해치", "엔딩 D 전용 보상"],
          ]} />
        </Section>

        <Section id="endings" title="08 · 엔딩" icon={ShieldAlert}>
          <Table rows={[
            ["엔딩", "조건", "결과"],
            ["A · 무지에서 태어난 비극", "20턴 안에 빈터에 도달하지 못함", "봉식 사망, 유물 없음"],
            ["B · 군법회의", "무전기로 성기를 깨운 뒤 소매치기", "강제 재시작, 유물 없음"],
            ["C · 목격자", "20턴 전에 봉식을 빈터에서 구출", "오메가 표식·점액·번역기 파편 획득"],
            ["D · 배교자", "봉식을 버리고 숨겨진 해안 경로 완료", "배교자 표식·점액·번역기 파편 획득"],
          ]} />
          <Callout color="violet">C와 D만 에피소드 완료로 기록되고 에피소드 2 입장 조건을 엽니다. 두 경로에서 얻는 오메가 유물은 서로 다릅니다.</Callout>
        </Section>

        <Section id="episode2" title="09 · 에피소드 2 해금" icon={Coins}>
          <P>에피소드 2 <B>“끊어진 신호”</B>는 시간이 아니라 사건으로 해금됩니다. $NAHOPE 본딩 커브가 100%에 도달해 유동성이 Raydium으로 이동하면 에피소드가 열리며, <B>5,000 $NAHOPE 이상</B>을 보유한 기밀 등급 플레이어가 입장할 수 있습니다.</P>
          <P>홈 화면의 졸업 카운트다운에서 본딩 진행률, 남은 비율, 필요한 SOL을 확인하십시오.</P>
        </Section>

        <Section id="community" title="10 · 커뮤니티와 시나리오" icon={Users}>
          <Step n={1} title="희귀 유물 3개 이상 수집">★ 등급 유물을 3개 이상 확보하면 엘리트 제출 권한이 열립니다.</Step>
          <Step n={2} title="시나리오 작성">확보한 유물을 결합해 HOPE 파트 2의 일관된 이야기 제안을 작성합니다.</Step>
          <Step n={3} title="피드에 전송"><Link href="/community" style={linkStyle}>커뮤니티</Link>에 제출하면 공동체가 $NAHOPE 거버넌스로 투표합니다. 우승작은 기밀 문서 형식의 실물 책으로 제작되어 나홍진 감독 또는 제작사에 전달됩니다.</Step>
        </Section>

        <Section id="ugc" title="11 · X에 UGC 공유" icon={Share2}>
          <P>인벤토리에서 확보한 유물은 <B>X에 밈 공유</B> 기능으로 $NAHOPE와 영화 HOPE를 포함한 게시물을 만들 수 있습니다. 공동체 반응을 얻은 게시물은 소량의 자동 에어드롭 보상 대상이 될 수 있습니다.</P>
        </Section>

        <Section id="glossary" title="12 · 용어집" icon={BookOpen}>
          <Table rows={[
            ["용어", "뜻"],
            ["오메가 프로토콜 (Ω)", "우주적 공포 격리 규약. Ω는 모든 이상 현상을 표시합니다."],
            ["트리거 벨트", "순서를 틀리면 턴을 낭비하거나 나쁜 엔딩에 이르는 인과 퍼즐 사슬."],
            ["턴", "행동 단위. 중요 행동은 1~3턴, 단순 조사는 0턴이며 에피소드 1은 20턴 제한."],
            ["조합 성공", "올바르게 장착한 아이템이 조사 지점의 숨은 상호작용을 여는 것."],
            ["유물 (★)", "프로필에 남고 커뮤니티 제출 자격을 주는 희귀 아이템."],
            ["소실 가능 (◆)", "늦게 행동하면 영구히 사라질 수 있는 아이템."],
            ["본딩 커브", "100%에 도달하면 Raydium으로 졸업하는 pump.fun의 자동 가격 메커니즘."],
            ["CGC", "공동 생성 콘텐츠. 파트 2를 위한 커뮤니티 스토리텔링."],
          ]} />
        </Section>

        <Section id="troubleshoot" title="13 · 문제 해결" icon={HelpCircle}>
          <FaqItem q="지갑 버튼이 작동하지 않습니다." a="Phantom, Solflare 또는 Backpack이 브라우저에 설치되어 있는지 확인하십시오. 모바일에서는 지갑의 내장 브라우저로 페이지를 여십시오." />
          <FaqItem q="NPC가 대화를 거부합니다." a="기밀 등급이 부족합니다. 5,000 $NAHOPE 이상을 확보하고 게임 페이지를 새로고침하십시오." />
          <FaqItem q="조사 지점이 반응하지 않습니다." a="증거판에서 필요한 아이템을 장착한 뒤 다시 클릭하십시오. 맞지 않는 아이템을 장착하면 조사 지점 테두리가 붉게 빛납니다." />
          <FaqItem q="소나무 숲에 들어갈 수 없습니다." a="현장 보고서 1쪽을 가진 상태에서 놋쇠 라이터를 장착하고 안개를 태워야 합니다." />
          <FaqItem q="엔딩 화면이 나타나지 않습니다." a="엔딩 C는 20턴 전에 번역기 파편을 장착하지 않은 상태로 빈터에 도달해야 합니다. 엔딩 D는 빈터, 비문, 해치의 세 행동을 순서대로 완료해야 합니다." />
          <FaqItem q="에피소드 2는 언제 공개됩니까?" a="고정 날짜는 없습니다. $NAHOPE 본딩 커브가 100%로 졸업하는 순간 해금됩니다." />
          <FaqItem q="모바일 화면이 좁습니다." a="하단의 현장·기록·증거 탭으로 패널을 전환하십시오. 이동 버튼은 조사 지점을 가리지 않도록 화면 이미지 아래에 있습니다." />
        </Section>

        <div style={{ marginTop: 48, padding: "24px 20px", border: "1px solid var(--acc-primary)", background: "color-mix(in srgb, var(--acc-primary) 4%, transparent)", textAlign: "center", boxShadow: "var(--glow-primary)" }}>
          <p style={{ fontSize: 11, letterSpacing: "0.24em", color: "var(--acc-primary)", marginBottom: 10 }}>{"// 브리핑 완료 · 투입 대기"}</p>
          <p style={{ fontSize: 13, color: "var(--ink-1)", marginBottom: 16 }}>호포 파출소 진입 승인이 완료되었습니다. 행운을 빕니다, 생존자.</p>
          <Link href="/game" style={{ display: "inline-block", padding: "12px 24px", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.2em", background: "var(--acc-primary)", color: "var(--bg-0)", textDecoration: "none", boxShadow: "var(--glow-primary)" }}>
            ▶ 에피소드 1 시작
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
