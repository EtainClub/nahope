"use client";

import Link from "next/link";
import { BookOpen, Camera, Compass, Gamepad2, Radio, ShieldAlert } from "lucide-react";

const sections = [
  ["01", "Film-aligned premise", "#premise"],
  ["02", "How to play", "#controls"],
  ["03", "Episode 1 route", "#route"],
  ["04", "Episode 1 endings", "#endings"],
  ["05", "Episode 2 briefing", "#episode-2"],
  ["06", "Episode 2 route", "#episode-2-route"],
  ["07", "Episode 2 endings", "#episode-2-endings"],
  ["08", "Episode 3 briefing", "#episode-3"],
  ["09", "Episode 3 route", "#episode-3-route"],
  ["10", "Episode 3 endings", "#episode-3-endings"],
  ["11", "Episode 4 briefing", "#episode-4"],
  ["12", "Episode 4 route", "#episode-4-route"],
  ["13", "Episode 4 endings", "#episode-4-endings"],
  ["14", "Canon boundary", "#canon"],
] as const;

export default function GuidePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "var(--bg-0)",
        color: "var(--ink-0)",
        fontFamily: "var(--font-mono)",
        padding: "32px 16px 120px",
      }}
    >
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <header style={{ textAlign: "center", marginBottom: 32 }}>
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
            data-text="HOPO CASE FILES"
            style={{ fontSize: 36, letterSpacing: "0.08em", marginBottom: 10 }}
          >
            HOPO CASE FILES
          </h1>
          <p style={{ color: "var(--ink-2)", fontSize: 14, lineHeight: 1.65, maxWidth: 680, margin: "0 auto" }}>
            Episodes 1 and 2 adapt the released film&apos;s investigation and first-shot causality. Episodes 3 and 4 are playable game-original continuations: survive the unstable contact, then preserve Hopo without disguising invention as evidence.
          </p>
        </header>

        <nav
          aria-label="Field guide sections"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: 8,
            marginBottom: 28,
          }}
        >
          {sections.map(([number, label, href]) => (
            <a
              key={href}
              href={href}
              style={{
                border: "1px solid var(--line-bright)",
                padding: "10px 12px",
                color: "var(--ink-1)",
                textDecoration: "none",
                fontSize: 10,
                letterSpacing: "0.08em",
              }}
            >
              <span style={{ color: "var(--acc-primary)", marginRight: 8 }}>{number}</span>
              {label.toUpperCase()}
            </a>
          ))}
        </nav>

        <GuideSection id="premise" number="01" title="Film-aligned premise" icon={<Compass size={16} />}>
          <p>
            You play as police officer Bum-seok at Hopo Port. Most able personnel are away fighting a wildfire, outside contact has failed, and the remaining villagers are preparing to hunt what they believe is a tiger.
          </p>
          <FactRow label="Sung-gi">A local hunter and Bum-seok&apos;s sixth cousin — not a sergeant or guard.</FactRow>
          <FactRow label="The cattle site">The cow is badly clawed and mangled, but the attack was not for food.</FactRow>
          <FactRow label="Bamigir">A lower-class sentry from Gertu whose tears complicate the villagers&apos; image of a mindless invader.</FactRow>
          <FactRow label="Bum-seok">His decisive act is restraint: he sees sadness in the subject and lowers his weapon.</FactRow>
        </GuideSection>

        <GuideSection id="controls" number="02" title="How to play" icon={<Gamepad2 size={16} />}>
          <p>
            The game uses a three-panel investigation layout. Read the transcript, inspect the central scene, and equip evidence from the deck before selecting a hotspot.
          </p>
          <FactRow label="Bare hands">Observe, speak, open accessible containers, or move between discovered locations.</FactRow>
          <FactRow label="Equipped item">Applies that evidence or tool to the next hotspot you select.</FactRow>
          <FactRow label="Turn limit">You have 30 turns before Sung-gi&apos;s tiger hunt becomes irreversible.</FactRow>
          <FactRow label="Red feedback">The equipped item does not fit that hotspot; unequip it before ordinary inspection.</FactRow>
        </GuideSection>

        <GuideSection id="route" number="03" title="Episode 1 evidence route" icon={<Camera size={16} />}>
          <Callout>
            This section contains the complete solution. The canonical clear requires observation, documentation, evacuation preparation, and an unfired weapon.
          </Callout>
          <RouteStep number="1" title="Prepare the investigation kit">
            Read the duty log in the substation office. Take the Equipment Key and Resident Duty Roster, then collect the camera and inspect the service carbine. Open the equipment locker for the field ruler, plaster kit, and ammunition; take the tiger guide and binoculars from the shelf.
          </RouteStep>
          <RouteStep number="2" title="Establish that Hopo is isolated">
            Check both the telephone and police radio. Read the antenna maintenance record, then inspect the yard antenna. This proves that the failure is beyond the local hardware.
          </RouteStep>
          <RouteStep number="3" title="Stop the premature tiger hunt">
            Speak with Sung-gi in the yard, then show him the tiger guide. Do not give him the carbine ammunition: arming the hunting party commits the village to the wrong explanation.
          </RouteStep>
          <RouteStep number="4" title="Document the cattle site">
            Photograph the carcass, measure the wounds, and compare the injuries with the tiger guide. Use the evidence bag on the disturbed soil to make a track cast. The combined evidence establishes that the animal did not feed and that the attacker was not a tiger.
          </RouteStep>
          <RouteStep number="5" title="Follow evidence, not the hunt">
            Enter the pine ridge and compare the track cast with the oversized prints. Use the binoculars at the lookout. Then inspect the lookout with bare hands: Bum-seok sees the enormous figure&apos;s grief and deliberately holds fire, preserving an Unfired Cartridge.
          </RouteStep>
          <RouteStep number="6" title="Confront what Hopo called a beast">
            Descend to the ruined main road. Compare the impact wreckage with the wound measurements, then photograph the wounded Bamigir. His tears do not prove innocence, but they refute the certainty that Hopo faces a mindless animal.
          </RouteStep>
          <RouteStep number="7" title="Complete the canonical record">
            Use the Unfired Cartridge on Bamigir to record the strongest ending, or prepare evacuation by applying the Resident Duty Roster to the patrol car. For the standard clear, return to the office and file the Carcass Photograph with the duty log after every required evidence flag is complete.
          </RouteStep>
        </GuideSection>

        <GuideSection id="endings" number="04" title="Ending matrix" icon={<ShieldAlert size={16} />}>
          <div style={{ display: "grid", gap: 10 }}>
            <Ending code="A" title="The Tiger Hunt" tone="danger">
              The deadline expires or the hunting party is armed. The villagers enter the forest under a false premise.
            </Ending>
            <Ending code="B" title="Premature Fire" tone="danger">
              Bum-seok fires after seeing the figure. Fear turns incomplete evidence into violence.
            </Ending>
            <Ending code="C" title="Unknown Subject" tone="primary">
              The case file is completed, the tiger theory is rejected, and the elders are prepared for evacuation.
            </Ending>
            <Ending code="D" title="The Creature Was Crying" tone="primary">
              Bum-seok preserves proof that he chose not to shoot and records the wounded Bamigir&apos;s tears without pretending to understand them.
            </Ending>
          </div>
        </GuideSection>


        <GuideSection id="episode-2" number="05" title="Episode 2 briefing · The Hunt Reverses" icon={<Radio size={16} />}>
          <p>
            After Bamigir falls, Sung-ki organizes a mountain sweep while Sung-ae treats the wounded. Bum-seok must determine why several different beings are moving through the forest before the armed search line meets them.
          </p>
          <FactRow label="Access">Open play. No Episode 1 clear, wallet connection, or $NAHOPE balance is required.</FactRow>
          <FactRow label="Yang-bae">The carpenter fired at the childlike Kali without warning and concealed the body in his cold room.</FactRow>
          <FactRow label="Royal party">Ma&apos;veyyo, Zor, and Aydobor belong to different ranks and forms; their movement through Hopo is connected to Kali.</FactRow>
          <FactRow label="Core rule">Ammunition is evidence of capacity, not permission. Giving it to the hunters or firing during first contact causes immediate failure.</FactRow>
          <FactRow label="Turn limit">You have 34 turns before the mountain sweep closes into an armed encounter.</FactRow>
        </GuideSection>

        <GuideSection id="episode-2-route" number="06" title="Episode 2 evidence route" icon={<Compass size={16} />}>
          <Callout>
            This is the complete solution. The key is to prove the order of events—crash, missing child, human first shot, search—before choosing withdrawal or disclosure.
          </Callout>
          <RouteStep number="1" title="Control the search line">
            At the triage line, inspect the command post to collect the Mountain Search Map and camera. Speak with Sung-ae for the Trauma Kit and Ceasefire Flare, then photograph Bamigir&apos;s aftermath. Leave the ammunition unused.
          </RouteStep>
          <RouteStep number="2" title="Open Yang-bae's cold room">
            Search the mannequin row in Yang-bae&apos;s workshop. Use the Cold-room Key on the locked door. Inside, photograph Kali, examine the body with the Trauma Kit, then unequip it and recover the spent casing from the floor.
          </RouteStep>
          <RouteStep number="3" title="Establish the first shot">
            Return to the workshop and show the spent casing to Yang-bae. His statement opens the mountain trail. Apply the official Search Map to his delivery map to mark the route he used.
          </RouteStep>
          <RouteStep number="4" title="Prevent a second first shot">
            On the trail, compare the Mannequin Tag with the silver-grey mud, then photograph the overlapping tracks. Show Yang-bae&apos;s statement to Sung-ki&apos;s hunters and inspect the ridge glint with bare hands.
          </RouteStep>
          <RouteStep number="5" title="Identify the crash survivors">
            At the silver wreck, inspect the ruptured hull. Compare the Multiple-subject Track Sketch with the footprints, then use Kali&apos;s photograph on the child-sized compartment. Enter the glade only after the search line understands whom the survivors are seeking.
          </RouteStep>
          <RouteStep number="6" title="Hold the encirclement">
            First observe Ma&apos;veyyo with bare hands: the royal party surrounds the hunters but does not strike. Use the Ceasefire Flare, then show Kali&apos;s photograph to create the First-shot Causality Report.
          </RouteStep>
          <RouteStep number="7" title="Choose the record">
            Use the Search Map on the withdrawal line for Ending C, or use Yang-bae&apos;s statement on Ma&apos;veyyo for Ending D. Both clear the episode; Ending D preserves the stronger causal record.
          </RouteStep>
        </GuideSection>

        <GuideSection id="episode-2-endings" number="07" title="Episode 2 ending matrix" icon={<ShieldAlert size={16} />}>
          <div style={{ display: "grid", gap: 10 }}>
            <Ending code="A" title="The Hunt Reverses" tone="danger">
              The turn limit expires and the search line enters the mountain still governed by the false tiger story.
            </Ending>
            <Ending code="B" title="First Shot, Again" tone="danger">
              The hunters receive ammunition or fire during contact. Ma&apos;veyyo&apos;s search becomes a pursuit.
            </Ending>
            <Ending code="C" title="Break the Encirclement" tone="primary">
              The flare holds the line while Sung-ki withdraws the hunters without adding another body to the misunderstanding.
            </Ending>
            <Ending code="D" title="The Child in the Freezer" tone="primary">
              Yang-bae&apos;s statement and Kali&apos;s photograph establish that a human bullet preceded the royal survivors&apos; violence.
            </Ending>
          </div>
        </GuideSection>

        <GuideSection id="episode-3" number="08" title="Episode 3 briefing · Human Dust" icon={<Radio size={16} />}>
          <p>
            Hopo now knows the royal survivors are searching for Kali, but knowledge has not created a shared language. Sung-ae must stabilize the returning hunters while Bum-seok turns evacuation, disarmament, and medical evidence into visible meaning.
          </p>
          <FactRow label="Access gate">Clear Episode 2, connect a wallet, and verify at least 20,000 $NAHOPE.</FactRow>
          <FactRow label="Game-original continuation">Episode 3 extends the released film&apos;s characters and first-shot causality; its evacuation and exchange plot is original to this game.</FactRow>
          <FactRow label="Core rule">Treat Kali as a wounded child, never as bait, leverage, or disposable evidence.</FactRow>
          <FactRow label="Turn limit">You have 38 turns before Hopo&apos;s routes, records, and ceasefire collapse.</FactRow>
        </GuideSection>

        <GuideSection id="episode-3-route" number="09" title="Episode 3 contact route" icon={<Compass size={16} />}>
          <Callout>
            This is the complete solution. The trigger chain converts care into evidence, evidence into a safe corridor, and visible restraint into the only language both sides share.
          </Callout>
          <RouteStep number="1" title="Stabilize and disarm the withdrawal line">
            Speak with Sung-ae for the Trauma Kit and Ceasefire Flare. Use the kit on the wounded hunter to create the Casualty Ledger, then inspect the rifle rack with bare hands to remove and secure every rifle bolt.
          </RouteStep>
          <RouteStep number="2" title="Authorize a civilian evacuation">
            At the health center, show the First-shot Causality Report to the health chief for a Protected Transfer Order. Show the Casualty Ledger to Nak-yeon for her Evacuation Map, then apply the map to the evacuation board.
          </RouteStep>
          <RouteStep number="3" title="Turn witness behavior into a route">
            In Witness Lane, record Hae-sul&apos;s repeated body movements. Use the Casualty Ledger on the assembly point after the evacuation board is marked. Show the report to Yang-bae to open the cold room. The kerosene can is a dangerous red herring.
          </RouteStep>
          <RouteStep number="4" title="Move Kali as a patient">
            Build the Canvas Transport Cradle from the handcart. Use the Protected Transfer Order on Kali to recover the human bullet and create the medical record, then use the cradle on Kali. Never use kerosene on the child.
          </RouteStep>
          <RouteStep number="5" title="Read the silent corridor">
            At the forest margin, first observe Aydobor in the canopy. Use Hae-sul&apos;s sketch on the axe marks to identify the civilian corridor. Apply Nak-yeon&apos;s map to the route marker and display the secured rifle bolts at the checkpoint.
          </RouteStep>
          <RouteStep number="6" title="Make restraint visible">
            Enter the burned grove and observe Ma&apos;veyyo with bare hands. Use the Ceasefire Flare on Sung-ki&apos;s line only after the corridor is known and the checkpoint is disarmed.
          </RouteStep>
          <RouteStep number="7" title="Choose evacuation or return">
            For Ending C, use the Civilian Manifest on the open corridor. For Ending D, first place the Recovered Human Bullet at Zor&apos;s boundary, then use Kali&apos;s protected cradle on the same boundary.
          </RouteStep>
        </GuideSection>

        <GuideSection id="episode-3-endings" number="10" title="Episode 3 ending matrix" icon={<ShieldAlert size={16} />}>
          <div style={{ display: "grid", gap: 10 }}>
            <Ending code="A" title="Dust over Hopo" tone="danger">
              The deadline expires and both sides lose the routes, names, and evidence that could have interrupted retaliation.
            </Ending>
            <Ending code="B" title="No Heir, No Truce" tone="danger">
              Kali and the first-shot evidence are burned. Zor receives smoke instead of her child and the recovery mission becomes war.
            </Ending>
            <Ending code="C" title="The Evacuation Line" tone="primary">
              Nak-yeon&apos;s complete manifest clears the civilian corridor while the disarmed human line holds.
            </Ending>
            <Ending code="D" title="The Wordless Return" tone="primary">
              The recovered bullet and Kali cross together. Sung-ki and Ma&apos;veyyo stop without sharing a word.
            </Ending>
          </div>
        </GuideSection>

        <GuideSection id="episode-4" number="11" title="Episode 4 briefing · Omega Protocol" icon={<BookOpen size={16} />}>
          <p>
            Years after Hopo, a later custodian inherits a damaged archive and an automatic deletion order. The final episode asks the player to rebuild cause, expose uncertainty, and decide whether the surviving truth becomes a public record, a weapon, or the beginning of a new story.
          </p>
          <FactRow label="Access gate">Clear Episode 3, retain at least three rare Hopo artifacts, connect a wallet, and verify at least 100,000 $NAHOPE.</FactRow>
          <FactRow label="Game-original finale">Omega Protocol and its governance framework are original to this game and are not presented as events or terminology from the released film.</FactRow>
          <FactRow label="Core rule">Never place a supported inference or creative proposal in the Proven Fact layer.</FactRow>
          <FactRow label="Turn limit">You have 42 turns before the archive deletion clock completes.</FactRow>
        </GuideSection>

        <GuideSection id="episode-4-route" number="12" title="Episode 4 archive route" icon={<Compass size={16} />}>
          <Callout>
            This is the complete solution. The final trigger belt turns provenance into chronology, chronology into classified layers, and those layers into an attributed community proposal.
          </Callout>
          <RouteStep number="1" title="Admit the surviving archive">
            Inspect the Custodian Intake Terminal with bare hands to create the chain of custody. Recover Bum-seok&apos;s testimony from the damaged recorder, then inspect the sealed cases. Never use the Omega Directive on the redaction furnace.
          </RouteStep>
          <RouteStep number="2" title="Rebuild the causal timeline">
            Use the Hopo Incident Archive on the cattle panel. Use Bum-seok&apos;s testimony on the first-shot panel and the Verified Artifact Ledger on the contact panel. Finally, use the First-shot Causality Sequence on the sequence board.
          </RouteStep>
          <RouteStep number="3" title="Separate the three truth layers">
            Put the Tiger Hypothesis Rebuttal in Proven Fact, the Wordless Contact Outcome in Supported Inference, and the Omega Directive in Creative Proposal. Use the Verified Hopo Timeline on the schema console only after all three registers exist.
          </RouteStep>
          <RouteStep number="4" title="Frame Humans in Space">
            Inspect the Kali, Zor, and Human Witness forks with bare hands. Their futures are unanswered creative questions. Use the Creative Boundary Notice on the mission table to assemble the Humans in Space Draft.
          </RouteStep>
          <RouteStep number="5" title="Build the governance packet">
            Use the Verified Artifact Ledger on the provenance reader and the Humans in Space Draft on the authorship console. Use the Three-layer Hopo Archive on the public ledger. Do not send the resulting packet to the military uplink.
          </RouteStep>
          <RouteStep number="6" title="Publish or transmit">
            At the Omega Relay, use the Three-layer Hopo Archive on the public mirror. For Ending C, use the Open Archive Index on Publish Archive Only. For Ending D, use the Community Governance Packet on Submit Hope Protocol.
          </RouteStep>
        </GuideSection>

        <GuideSection id="episode-4-endings" number="13" title="Episode 4 ending matrix" icon={<ShieldAlert size={16} />}>
          <div style={{ display: "grid", gap: 10 }}>
            <Ending code="A" title="The Redaction" tone="danger">
              The deletion clock expires or the Omega Directive is fed to the furnace. Hopo survives only as another sealed absence.
            </Ending>
            <Ending code="B" title="Weaponized Truth" tone="danger">
              The governance packet is sent to the military uplink and uncertainty is converted into targeting doctrine.
            </Ending>
            <Ending code="C" title="The Open Archive" tone="primary">
              Facts, inferences, and proposals remain public, separated, and open to challenge without claiming a final answer.
            </Ending>
            <Ending code="D" title="Hope Protocol" tone="primary">
              The open archive, three-artifact proof, and attributed Humans in Space proposal enter community review.
            </Ending>
          </div>
        </GuideSection>

        <GuideSection id="canon" number="14" title="Canon boundary" icon={<Radio size={16} />}>
          <p>
            Removed from Episode 1: an Omega symbol carved into the cow, a 1950 Polaroid, alien slime or a translator hidden inside a rifle, a sentry named Bong-sik, a sentient fog wall, and a coastal alien hatch. Those devices were earlier game inventions and are not presented as events from the released film.
          </p>
          <Callout>
            Episodes 1–2 use released-film anchors: character roles, cattle clues, the tiger hunt, Bamigir&apos;s grief, Yang-bae&apos;s shooting of Kali, alien hierarchy, and the crashed vessel. Episode 3&apos;s evacuation and wordless exchange are game-original. Episode 4&apos;s future archive, truth-layer puzzle, Humans in Space draft, token gate, and governance submission are also explicitly game-original.
          </Callout>
        </GuideSection>

        <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 28 }}>
          <Link href="/game" style={buttonStyle}>ENTER EPISODE 1</Link>
          <Link href="/game?episode=2" style={{ ...buttonStyle, borderColor: "var(--acc-violet)", color: "var(--acc-violet)" }}>ENTER EPISODE 2</Link>
          <Link href="/game?episode=3" style={{ ...buttonStyle, borderColor: "var(--acc-danger)", color: "var(--acc-danger)" }}>ENTER EPISODE 3</Link>
          <Link href="/game?episode=4" style={{ ...buttonStyle, borderColor: "var(--acc-cyan)", color: "var(--acc-cyan)" }}>ENTER EPISODE 4</Link>
          <Link href="/" style={{ ...buttonStyle, borderColor: "var(--line-bright)", color: "var(--ink-2)" }}>RETURN HOME</Link>
        </div>
      </div>
    </main>
  );
}

function GuideSection({ id, number, title, icon, children }: { id: string; number: string; title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <section id={id} style={{ border: "1px solid var(--line-bright)", background: "var(--bg-1)", padding: "22px", marginBottom: 16, lineHeight: 1.7, fontSize: 13 }}>
      <h2 className="display" style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--ink-0)", fontSize: 18, marginBottom: 14, textTransform: "uppercase" }}>
        <span style={{ color: "var(--acc-primary)", fontFamily: "var(--font-mono)", fontSize: 11 }}>{number}</span>
        <span style={{ color: "var(--acc-primary)" }}>{icon}</span>
        {title}
      </h2>
      <div style={{ color: "var(--ink-1)" }}>{children}</div>
    </section>
  );
}

function FactRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "minmax(120px, 0.35fr) 1fr", gap: 12, borderTop: "1px solid var(--line)", padding: "10px 0" }}>
      <strong style={{ color: "var(--acc-amber)", textTransform: "uppercase", fontSize: 10, letterSpacing: "0.1em" }}>{label}</strong>
      <span>{children}</span>
    </div>
  );
}

function RouteStep({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "34px 1fr", gap: 12, marginTop: 16 }}>
      <div style={{ color: "var(--bg-0)", background: "var(--acc-primary)", width: 28, height: 28, display: "grid", placeItems: "center", fontWeight: 700 }}>{number}</div>
      <div>
        <h3 style={{ color: "var(--ink-0)", fontSize: 13, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>{title}</h3>
        <p style={{ margin: 0 }}>{children}</p>
      </div>
    </div>
  );
}

function Ending({ code, title, tone, children }: { code: string; title: string; tone: "primary" | "danger"; children: React.ReactNode }) {
  const color = tone === "danger" ? "var(--acc-danger)" : "var(--acc-primary)";
  return (
    <div style={{ border: `1px solid ${color}`, padding: "12px 14px" }}>
      <div style={{ color, fontSize: 11, letterSpacing: "0.12em", marginBottom: 4 }}>ENDING {code} · {title.toUpperCase()}</div>
      <div>{children}</div>
    </div>
  );
}

function Callout({ children }: { children: React.ReactNode }) {
  return <div style={{ borderLeft: "3px solid var(--acc-amber)", background: "var(--bg-2)", padding: "10px 12px", color: "var(--ink-1)", margin: "10px 0" }}>{children}</div>;
}

const buttonStyle = {
  border: "1px solid var(--acc-primary)",
  color: "var(--acc-primary)",
  padding: "10px 14px",
  textDecoration: "none",
  fontSize: 10,
  letterSpacing: "0.14em",
} as const;
