import type { Metadata } from "next";
import Image from "next/image";
import { Shield, Radio, Eye, Clapperboard, FlaskConical, Wrench, Globe, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Film Profile | HOPE by Na Hong-jin",
  description:
    "Cast, synopsis, alien character dossiers, and director profile for Na Hong-jin's sci-fi cosmic horror film HOPE.",
  openGraph: {
    title: "HOPE | Na Hong-jin's Sci-Fi Cosmic Horror Film",
    description:
      "Na Hong-jin's cosmic horror film about survivors confronting an extraterrestrial incursion at Hopo Port.",
    images: [
      {
        url: "/images/og-banner.png",
        width: 1200,
        height: 630,
        alt: "HOPE, a sci-fi cosmic horror film by Na Hong-jin",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HOPE | Na Hong-jin's Cosmic Horror Film",
    description:
      "Na Hong-jin's cosmic horror film HOPE, starring Hwang Jung-min, Jo In-sung, Jung Ho-yeon, Michael Fassbender, and Alicia Vikander.",
    images: ["/images/og-banner.png"],
  },
};

// JSON-LD for the movie
const movieJsonLd = {
  "@context": "https://schema.org",
  "@type": "Movie",
  name: "HOPE",
  alternateName: "Hope",
  description:
    "A cosmic horror thriller about extraterrestrial beings and survivors in the fog-shrouded coastal village of Hopo Port.",
  director: {
    "@type": "Person",
    name: "Na Hong-jin",
  },
  actor: [
    { "@type": "Person", name: "Hwang Jung-min" },
    { "@type": "Person", name: "Jo In-sung" },
    { "@type": "Person", name: "Jung Ho-yeon" },
    { "@type": "Person", name: "Taylor Russell" },
    { "@type": "Person", name: "Cameron Britton" },
    { "@type": "Person", name: "Alicia Vikander" },
    { "@type": "Person", name: "Michael Fassbender" },
  ],
  genre: ["Sci-Fi", "Cosmic Horror", "Thriller"],
  productionCompany: [
    { "@type": "Organization", name: "Forged Films" },
    { "@type": "Organization", name: "Plus M Entertainment" },
  ],
  image: "https://nahope.com/images/og-banner.png",
  url: "https://nahope.com/intro",
};

const gertuLore = [
  {
    index: "01",
    title: "CASTE IS ANATOMY",
    description:
      "Gertu is governed by a rigid imperial order. Rank is not merely social: every body is shaped around its assigned duty, from a tunnel-running sentry to a spine-armored empress.",
  },
  {
    index: "02",
    title: "THE LOST HEIR",
    description:
      "The royal party reaches Earth while searching for Kali, the missing crown prince. Emperor Kuer is lost in the crash, leaving Empress Zor and her guard trapped far from home.",
  },
  {
    index: "03",
    title: "A WAR WITHOUT TRANSLATION",
    description:
      "Their language follows a coherent alien grammar, yet no common vocabulary survives first contact. Fear becomes evidence, restraint is read as threat, and Hopo Port turns into a battlefield.",
  },
];

const alienDossiers = [
  {
    name: "BAMIGIR",
    designation: "LOWER-CASTE SENTRY",
    performer: "Performance by Cameron Britton",
    image: "/images/intro/aliens/bamigir.webp",
    accentColor: "var(--acc-danger)",
    status: "FRONTLINE / HOSTILE",
    traits: ["3+ meter frame", "Quadrupedal pursuit", "Extreme lifting strength"],
    description:
      "The first Gertu being to surface at Hopo Port. Bamigir can throw vehicles, sprint on all fours, and move through underground passages, but its momentum makes tight turns dangerously imprecise. Its final tears leave open the question of whether rage, fear, or duty drove the attack.",
  },
  {
    name: "MABEYO",
    designation: "CROWN GUARD",
    performer: "Performance by Michael Fassbender",
    image: "/images/intro/aliens/mabeyo.webp",
    accentColor: "var(--acc-amber)",
    status: "ELITE / REGENERATIVE",
    traits: ["Combat transformation", "Blind hunt form", "Living slime heart"],
    description:
      "A legendary warrior sworn to protect Kali. Mabeyo shifts from a composed humanoid body into a sightless quadrupedal predator built for speed and killing. Its removable, self-sustaining heart may be capable of restoring the dead prince.",
  },
  {
    name: "AIDOBOR",
    designation: "IMPERIAL ATTENDANT",
    performer: "Performance by Taylor Russell",
    image: "/images/intro/aliens/aidobor.webp",
    accentColor: "var(--acc-cyan)",
    status: "AMBUSH / TRACKER",
    traits: ["Axe weapon", "Arboreal concealment", "Decoy tactics"],
    description:
      "Zor's attendant and Kali's caretaker. Aidobor waits above the forest floor, using the canopy for concealment before drawing targets into range of an axe. Less durable than the royal adults, it survives through patience, positioning, and relentless loyalty.",
  },
  {
    name: "ZOR",
    designation: "EMPRESS OF GERTU",
    performer: "Performance by Alicia Vikander",
    image: "/images/intro/aliens/zor.webp",
    accentColor: "var(--acc-violet)",
    status: "ROYAL / ARMORED",
    traits: ["Antler-spine barrier", "Projectile spines", "Royal command"],
    description:
      "A commoner who rose to become empress, Zor descends to Earth to recover her child. The antler-like organs along her back form a ballistic shield and can be detached as lethal spears, giving her both regal poise and devastating range.",
  },
  {
    name: "KALI",
    designation: "CROWN PRINCE",
    performer: "Creature performance",
    image: "/images/intro/aliens/kali.webp",
    accentColor: "#a3e635",
    status: "JUVENILE / RECOVERABLE",
    traits: ["Childlike morphology", "Royal bloodline", "Possible reanimation"],
    description:
      "The juvenile heir whose disappearance pulls the Gertu royal party toward Hopo Port. Kali's body becomes the center of the conflict after a human hunter mistakes the childlike being for prey. Mabeyo's regenerative heart makes death feel disturbingly provisional.",
  },
  {
    name: "KUER",
    designation: "EMPEROR OF GERTU",
    performer: "Imperial archive image",
    image: "/images/intro/aliens/kuer.webp",
    accentColor: "var(--ink-0)",
    status: "ROYAL / DECEASED",
    traits: ["Imperial sovereign", "Ark commander", "Lost on impact"],
    description:
      "The sovereign behind the vast Gertu vessel. Kuer dies in the explosion that follows the ship's crash, turning a rescue mission into an irreversible succession crisis and leaving the surviving aliens isolated under Zor's command.",
  },
];

export default function MovieIntroPage() {
  const castList = [
    {
      name: "Bum-seok",
      actor: "played by Hwang Jung-min",
      role: "Police Chief",
      icon: Shield,
      image: "https://firebasestorage.googleapis.com/v0/b/nahope-port.firebasestorage.app/o/intro%2Fhwang_jung_min.jpg?alt=media&token=436ddb03-f6fe-4cb6-8e33-f7e1f17c31e4",
      accentColor: "var(--acc-primary)",
      description:
        "The weary police chief of Hopo Port. As communications go completely dark and panic spreads, Bum-seok tries to maintain order, only to face the horrifying realization that the threat might be coming from within his own community.",
    },
    {
      name: "Sung-ki",
      actor: "played by Jo In-sung",
      role: "Classified Signal Operator",
      icon: Radio,
      image: "https://firebasestorage.googleapis.com/v0/b/nahope-port.firebasestorage.app/o/intro%2Fjo_in_sung.jpg?alt=media&token=0e1627f8-3ee9-462b-b35b-bcbb497a2ed4",
      accentColor: "var(--acc-cyan)",
      description:
        "A quiet, reclusive resident of the port who owns an old radio receiver. He is the first to detect the rhythmic extraterrestrial signal broadcasts. The other villagers suspect him of coordinating with the anomaly.",
    },
    {
      name: "Sung-ae",
      actor: "played by Jung Ho-yeon",
      role: "Outpost Guard Officer",
      icon: Eye,
      image: "https://firebasestorage.googleapis.com/v0/b/nahope-port.firebasestorage.app/o/intro%2Fjung_ho_yeon.jpg?alt=media&token=feefe734-4e45-4480-9d72-4b2975cae74e",
      accentColor: "var(--acc-violet)",
      description:
        "A highly observant young defense officer stationed at Hopo Outpost. She uncovers the mutilated cattle carcass and physical debris left by the entity, leading the search and rescue efforts during the blackout.",
    },
    {
      name: "Taylor Russell",
      actor: "played by Taylor Russell",
      role: "Performance Capture: Aidobor",
      icon: FlaskConical,
      image: "https://firebasestorage.googleapis.com/v0/b/nahope-port.firebasestorage.app/o/intro%2Ftaylor_russell.jpg?alt=media&token=1c36890c-b8d1-4835-818e-264cf32e908d",
      accentColor: "#10b981",
      description:
        "Brings the imperial attendant Aidobor to life through physical performance, balancing patient arboreal movement with sudden, close-range violence.",
    },
    {
      name: "Cameron Britton",
      actor: "played by Cameron Britton",
      role: "Performance Capture: Bamigir",
      icon: Wrench,
      image: "https://firebasestorage.googleapis.com/v0/b/nahope-port.firebasestorage.app/o/intro%2Fcameron_britton.jpg?alt=media&token=b434aada-73fd-4dc4-930e-104b85f6ab22",
      accentColor: "var(--acc-amber)",
      description:
        "Performs Bamigir, the towering lower-caste sentry whose weight, four-limbed sprint, and flashes of grief make first contact feel both monstrous and tragically alive.",
    },
    {
      name: "Alicia Vikander",
      actor: "played by Alicia Vikander",
      role: "Performance Capture: Zor",
      icon: Globe,
      image: "https://firebasestorage.googleapis.com/v0/b/nahope-port.firebasestorage.app/o/intro%2Falicia_vikander.jpg?alt=media&token=665880b8-6005-4f49-894c-9d7148b41e18",
      accentColor: "#38bdf8",
      description:
        "Performs Zor, the empress whose controlled bearing masks a parent's desperation and a body engineered for both armored defense and ranged attack.",
    },
    {
      name: "Michael Fassbender",
      actor: "played by Michael Fassbender",
      role: "Performance Capture: Mabeyo",
      icon: FileText,
      image: "https://firebasestorage.googleapis.com/v0/b/nahope-port.firebasestorage.app/o/intro%2Fmichael_fassbender.jpg?alt=media&token=a6e97578-c277-4c64-866f-e54d548f8e3a",
      accentColor: "var(--acc-danger)",
      description:
        "Performs Mabeyo, the crown guard who moves between disciplined restraint and a feral combat form while carrying the royal family's last chance at restoration.",
    },
  ];

  return (
    <div className="flex-1 flex flex-col bg-space-950 py-12 px-4 md:px-8 relative overflow-hidden font-sans select-none">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(movieJsonLd) }}
      />
      {/* Ambient background glow */}
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none" style={{ background: "color-mix(in srgb, var(--acc-primary) 5%, transparent)" }} />
      <div className="absolute bottom-1/4 left-0 w-[450px] h-[450px] rounded-full blur-[140px] pointer-events-none" style={{ background: "color-mix(in srgb, var(--acc-violet) 4%, transparent)" }} />

      {/* Top Title */}
      <div className="w-full max-w-5xl mx-auto text-center mb-16 relative z-10">
        <span className="eyebrow block mb-3 flicker" style={{ color: "var(--acc-primary)" }}>
          {"// CLASSIFIED MOVIE PROFILE //"}
        </span>
        <h1 className="display text-4xl sm:text-5xl uppercase mb-4" style={{ color: "var(--ink-0)" }}>
          FILM PROFILE: HOPE
        </h1>
        <div className="w-24 h-[2px] mx-auto" style={{ background: "linear-gradient(90deg, var(--acc-primary), var(--acc-violet))" }} />
      </div>

      <div className="w-full max-w-5xl mx-auto flex flex-col gap-16 relative z-10">
        {/* Section 1: Plot & Synopsis */}
        <section className="panel panel-bracket p-6 md:p-8 relative" style={{ borderColor: "var(--acc-primary)", boxShadow: "var(--glow-primary)" }}>
          <span className="br-bl" /><span className="br-br" />

          <div className="flex items-center gap-3 mb-4">
            <span className="w-2.5 h-2.5 rounded-full flicker" style={{ background: "var(--acc-primary)" }} />
            <h2 className="display text-xl uppercase" style={{ color: "var(--ink-0)" }}>
              CLASSIFIED SYNOPSIS
            </h2>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-center">
            {/* Holographic Lore Text */}
            <div className="flex-1 flex flex-col gap-4 text-xs sm:text-sm text-gray-300 leading-relaxed font-sans">
              <p>
                In the desolate, fog-shrouded coastal village of Hopo Port, a routine military patrol discovers a sequence of bizarre animal mutilations. Within hours, all communication networks to the mainland are completely severed. The sky turns into a deep purple twilight as a massive electromagnetic dome locks the region in complete isolation.
              </p>
              <p>
                As panic sweeps through the port, the survivors seek refuge inside the local police substation. However, strange radio transmissions hint at a terrifying reality: a giant, 15-20ft tall shapeshifting cosmic entity has landed in the surrounding forest. Worse, the entity has already seized control of someone within the group. Mutual suspicion grows, and survival becomes a psychological war of nerves.
              </p>
              <p className="pl-3 italic text-gray-400" style={{ borderLeft: "2px solid color-mix(in srgb, var(--acc-primary) 50%, transparent)" }}>
                &quot;When the sky falls dark and the signals go silent, who do you trust? In the face of cosmic isolation, human fragility is our deepest vulnerability.&quot;
              </p>
            </div>

            {/* YouTube Trailer Embed */}
            <div className="w-full md:w-[440px] aspect-video overflow-hidden relative shadow-2xl" style={{ background: "var(--bg-0)", border: "1px solid var(--line)" }}>
              <iframe
                src="https://www.youtube.com/embed/_oFfYIskj2Y"
                title="Hope Official Trailer"
                className="w-full h-full border-0 relative z-20"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </section>

        {/* Section 2: Cast & Roles */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full flicker" style={{ background: "var(--acc-cyan)" }} />
            <h2 className="display text-xl uppercase" style={{ color: "var(--ink-0)" }}>
              THE ENSEMBLE (MAIN CAST)
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {castList.map((cast) => {
              const Icon = cast.icon;
              return (
                <div
                  key={cast.name}
                  className="panel panel-bracket p-5 relative flex flex-col gap-4 hover:scale-[1.02] transition-transform duration-300"
                  style={{
                    borderColor: `color-mix(in srgb, ${cast.accentColor} 30%, transparent)`,
                    boxShadow: `0 0 15px color-mix(in srgb, ${cast.accentColor} 15%, transparent)`,
                  }}
                >
                  <span className="br-bl" /><span className="br-br" />

                  {/* Retro Character Portrait */}
                  <div className="w-full aspect-[4/3] overflow-hidden relative" style={{ border: "1px solid var(--line)", background: "var(--bg-0)" }}>
                    <img
                      src={cast.image}
                      alt={cast.name}
                      className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition duration-500"
                      loading="lazy"
                    />
                  </div>

                  <div className="flex justify-between items-start pb-3" style={{ borderBottom: "1px solid var(--line)" }}>
                    <div className="flex flex-col">
                      <span className="display text-sm" style={{ color: "var(--ink-0)" }}>
                        {cast.name}
                      </span>
                      <span className="text-[10px] text-gray-500 font-mono mt-0.5">
                        {cast.actor}
                      </span>
                    </div>
                    <div className="p-2" style={{ background: "var(--bg-0)", border: "1px solid var(--line)", color: cast.accentColor }}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <span className="text-[10px] font-mono font-bold tracking-widest uppercase" style={{ color: cast.accentColor }}>
                    ROLE: {cast.role}
                  </span>

                  <p className="text-[11px] text-gray-400 font-sans leading-relaxed flex-1">
                    {cast.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 3: Gertu World Lore & Alien Dossiers */}
        <section
          className="flex flex-col gap-6"
          style={{ contentVisibility: "auto", containIntrinsicSize: "1200px" }}
        >
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full flicker" style={{ background: "#a3e635" }} />
              <div>
                <span className="text-[10px] font-mono tracking-[0.24em]" style={{ color: "#a3e635" }}>
                  EXTRATERRESTRIAL ARCHIVE // GERTU
                </span>
                <h2 className="display text-xl uppercase mt-1" style={{ color: "var(--ink-0)" }}>
                  ALIEN WORLD & CHARACTER DOSSIERS
                </h2>
              </div>
            </div>
            <span
              className="w-fit px-3 py-1.5 text-[9px] font-mono tracking-widest"
              style={{
                color: "var(--acc-danger)",
                border: "1px solid color-mix(in srgb, var(--acc-danger) 45%, transparent)",
                background: "color-mix(in srgb, var(--acc-danger) 8%, transparent)",
              }}
            >
              WARNING // FULL FILM SPOILERS
            </span>
          </div>

          <div
            className="panel panel-bracket p-5 md:p-7 relative overflow-hidden"
            style={{
              borderColor: "color-mix(in srgb, #a3e635 40%, transparent)",
              boxShadow: "0 0 28px color-mix(in srgb, #a3e635 8%, transparent)",
            }}
          >
            <span className="br-bl" /><span className="br-br" />
            <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-7 items-stretch">
              <div
                className="relative min-h-[280px] sm:min-h-[340px] overflow-hidden"
                style={{ border: "1px solid var(--line)", background: "var(--bg-0)" }}
              >
                <Image
                  src="/images/intro/aliens/gertu-encounter.webp"
                  alt="A Gertu alien pursuing a rider through the forest in HOPE"
                  fill
                  priority={false}
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover opacity-75 grayscale-[25%]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
                <div className="absolute left-4 right-4 bottom-4 flex items-end justify-between gap-4">
                  <div>
                    <span className="text-[9px] font-mono tracking-[0.22em]" style={{ color: "#a3e635" }}>
                      FIRST-CONTACT RECORD
                    </span>
                    <p className="display text-sm sm:text-base mt-1 text-white">
                      THE HOPO PORT INCURSION
                    </p>
                  </div>
                  <span className="text-[9px] font-mono text-gray-400">ARCHIVE // 197X</span>
                </div>
              </div>

              <div className="flex flex-col justify-center gap-5">
                <div>
                  <span className="eyebrow" style={{ color: "#a3e635" }}>
                    IMPERIAL BIOLOGY REPORT
                  </span>
                  <h3 className="display text-2xl sm:text-3xl uppercase mt-2" style={{ color: "var(--ink-0)" }}>
                    GERTU: A BODY FOR EVERY DUTY
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  The visitors are not a single monster type. They are members of a stratified civilization whose radically different bodies reveal rank, labor, and proximity to the throne. What looks like a random bestiary is an imperial family, its guard, and its servants stranded inside a human panic.
                </p>
                <a
                  href="https://fanmaum.com/community/freeboard/133217321"
                  target="_blank"
                  rel="noreferrer"
                  className="w-fit text-[10px] font-mono tracking-widest uppercase transition-opacity hover:opacity-70"
                  style={{ color: "var(--acc-cyan)" }}
                >
                  OPEN SOURCE INTELLIGENCE // FANMAUM ARCHIVE ↗
                </a>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mt-6">
              {gertuLore.map((entry) => (
                <div
                  key={entry.index}
                  className="p-4"
                  style={{
                    background: "color-mix(in srgb, var(--bg-0) 82%, transparent)",
                    border: "1px solid var(--line)",
                  }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-mono text-[10px]" style={{ color: "#a3e635" }}>
                      {entry.index}
                    </span>
                    <span className="h-px flex-1" style={{ background: "var(--line)" }} />
                  </div>
                  <h3 className="display text-xs mb-2" style={{ color: "var(--ink-0)" }}>
                    {entry.title}
                  </h3>
                  <p className="text-[11px] text-gray-400 leading-relaxed">{entry.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {alienDossiers.map((alien, index) => (
              <article
                key={alien.name}
                className="panel panel-bracket relative overflow-hidden flex flex-col group"
                style={{
                  borderColor: `color-mix(in srgb, ${alien.accentColor} 34%, transparent)`,
                  boxShadow: `0 0 18px color-mix(in srgb, ${alien.accentColor} 8%, transparent)`,
                }}
              >
                <span className="br-bl" /><span className="br-br" />
                <div
                  className="relative w-full aspect-[16/9] overflow-hidden"
                  style={{ background: "var(--bg-0)", borderBottom: "1px solid var(--line)" }}
                >
                  <Image
                    src={alien.image}
                    alt={`${alien.name}, ${alien.designation.toLowerCase()}, in HOPE`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover grayscale-[35%] opacity-80 transition duration-500 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-[1.025]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                  <span
                    className="absolute top-3 left-3 px-2 py-1 text-[8px] font-mono tracking-widest"
                    style={{
                      color: alien.accentColor,
                      border: `1px solid color-mix(in srgb, ${alien.accentColor} 45%, transparent)`,
                      background: "rgba(0,0,0,0.78)",
                    }}
                  >
                    SPECIMEN // {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="absolute bottom-3 right-3 text-[8px] font-mono text-gray-300 tracking-widest">
                    {alien.status}
                  </span>
                </div>

                <div className="p-5 flex flex-col gap-4 flex-1">
                  <header className="flex items-start justify-between gap-4 pb-4" style={{ borderBottom: "1px solid var(--line)" }}>
                    <div>
                      <h3 className="display text-lg" style={{ color: "var(--ink-0)" }}>
                        {alien.name}
                      </h3>
                      <p className="text-[9px] font-mono text-gray-500 mt-1">{alien.performer}</p>
                    </div>
                    <span
                      className="text-[9px] font-mono font-bold tracking-wider text-right"
                      style={{ color: alien.accentColor }}
                    >
                      {alien.designation}
                    </span>
                  </header>

                  <ul className="flex flex-wrap gap-2">
                    {alien.traits.map((trait) => (
                      <li
                        key={trait}
                        className="px-2 py-1 text-[8px] font-mono tracking-wide uppercase"
                        style={{
                          color: "var(--ink-1)",
                          border: "1px solid var(--line)",
                          background: "var(--bg-0)",
                        }}
                      >
                        {trait}
                      </li>
                    ))}
                  </ul>

                  <p className="text-[11px] text-gray-400 leading-relaxed flex-1">
                    {alien.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Section 4: Director Spotlight */}
        <section className="panel panel-bracket p-6 relative flex flex-col md:flex-row gap-8 items-stretch shadow-2xl" style={{ borderColor: "var(--acc-violet)", boxShadow: "var(--glow-violet)" }}>
          <span className="br-bl" /><span className="br-br" />

          <div className="md:w-1/3 overflow-hidden relative min-h-[260px] flex flex-col" style={{ background: "var(--bg-0)", border: "1px solid var(--line)" }}>
            <div className="w-full h-48 relative overflow-hidden" style={{ borderBottom: "1px solid var(--line)" }}>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/nahope-port.firebasestorage.app/o/intro%2Fna_hong_jin.jpg?alt=media&token=20cca7e1-a940-461d-b7d9-5deb668e154e"
                alt="Na Hong-jin"
                className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition duration-500"
                loading="lazy"
              />
              <div className="absolute top-3 right-3 p-2 z-20" style={{ background: "rgba(0,0,0,0.8)", border: "1px solid color-mix(in srgb, var(--acc-violet) 30%, transparent)", color: "var(--acc-violet)" }}>
                <Clapperboard className="w-4 h-4" />
              </div>
            </div>
            <div className="p-4 flex flex-col items-center text-center justify-center flex-1 z-10">
              <h3 className="display text-lg uppercase" style={{ color: "var(--ink-0)" }}>
                NA HONG-JIN
              </h3>
              <span className="text-[10px] text-gray-500 font-mono mt-0.5">DIRECTOR & SCREENPLAY</span>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-center gap-4 text-xs sm:text-sm text-gray-300 leading-relaxed font-sans">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full flicker" style={{ background: "var(--acc-violet)" }} />
              <h3 className="display text-base uppercase" style={{ color: "var(--ink-0)" }}>
                THE VISIONARY OF SHAMANIC THRILLERS
              </h3>
            </div>
            <p>
              Director Na Hong-jin is celebrated internationally for his uncompromising grit, intense pacing, and occult imagery, establishing his name with classic Korean thrillers such as *The Chaser* (2008), *The Yellow Sea* (2010), and the occult horror masterpiece *The Wailing* (2016).
            </p>
            <p>
              With *Hope*, Na Hong-jin embarks on his first major sci-fi cosmic thriller venture. The movie features a groundbreaking co-production involving Korean studio Plus M Entertainment and global stars (including Michael Fassbender and Alicia Vikander). It delivers a highly claustrophobic, intense human-vs-extra-terrestrial siege drama in a remote port, exploring the limits of human resilience, coordination, and isolation.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
