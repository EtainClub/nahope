import type { Metadata } from "next";
import { Shield, Radio, Eye, Clapperboard, FlaskConical, Wrench, Globe, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Film Profile | HOPE by Na Hong-jin",
  description:
    "나홍진 감독의 SF 코즈믹 호러 영화 HOPE(호프) 상세 정보. 황정민, 조인성, 정호연, 마이클 패스벤더, 알리시아 비칸데르 출연. 시놉시스, 캐릭터 소개, 감독 프로필. Cast, synopsis, and director profile for Na Hong-jin's sci-fi cosmic horror film 'HOPE'.",
  openGraph: {
    title: "HOPE | Na Hong-jin's Sci-Fi Cosmic Horror Film",
    description:
      "황정민, 조인성, 정호연, 마이클 패스벤더 출연. 호포항에 나타난 외계 존재와 생존자들의 이야기. Na Hong-jin's cosmic horror film starring Hwang Jung-min, Jo In-sung, and Jung Ho-yeon.",
    images: [
      {
        url: "/images/og-banner.png",
        width: 1200,
        height: 630,
        alt: "HOPE - 나홍진 감독 SF 코즈믹 호러 영화",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HOPE | Na Hong-jin's Cosmic Horror Film",
    description:
      "황정민, 조인성, 정호연, 마이클 패스벤더 출연. Na Hong-jin's cosmic horror film HOPE.",
    images: ["/images/og-banner.png"],
  },
};

// JSON-LD for the movie
const movieJsonLd = {
  "@context": "https://schema.org",
  "@type": "Movie",
  name: "HOPE (호프)",
  alternateName: "호프",
  description:
    "안개에 휩싸인 해안 마을 호포항에 나타난 외계 존재와 생존자들의 이야기. A cosmic horror thriller set in a fog-shrouded coastal village.",
  director: {
    "@type": "Person",
    name: "Na Hong-jin (나홍진)",
  },
  actor: [
    { "@type": "Person", name: "Hwang Jung-min (황정민)" },
    { "@type": "Person", name: "Jo In-sung (조인성)" },
    { "@type": "Person", name: "Jung Ho-yeon (정호연)" },
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

export default function MovieIntroPage() {
  const castList = [
    {
      name: "Bum-seok (범석)",
      actor: "played by Hwang Jung-min",
      role: "Police Chief",
      icon: Shield,
      image: "https://firebasestorage.googleapis.com/v0/b/nahope-port.firebasestorage.app/o/intro%2Fhwang_jung_min.jpg?alt=media&token=436ddb03-f6fe-4cb6-8e33-f7e1f17c31e4",
      accentColor: "var(--acc-primary)",
      description:
        "The weary police chief of Hopo Port. As communications go completely dark and panic spreads, Bum-seok tries to maintain order, only to face the horrifying realization that the threat might be coming from within his own community.",
    },
    {
      name: "Sung-ki (성기)",
      actor: "played by Jo In-sung",
      role: "Classified Signal Operator",
      icon: Radio,
      image: "https://firebasestorage.googleapis.com/v0/b/nahope-port.firebasestorage.app/o/intro%2Fjo_in_sung.jpg?alt=media&token=0e1627f8-3ee9-462b-b35b-bcbb497a2ed4",
      accentColor: "var(--acc-cyan)",
      description:
        "A quiet, reclusive resident of the port who owns an old radio receiver. He is the first to detect the rhythmic extraterrestrial signal broadcasts. The other villagers suspect him of coordinating with the anomaly.",
    },
    {
      name: "Sung-ae (성해)",
      actor: "played by Jung Ho-yeon",
      role: "Outpost Guard Officer",
      icon: Eye,
      image: "https://firebasestorage.googleapis.com/v0/b/nahope-port.firebasestorage.app/o/intro%2Fjung_ho_yeon.jpg?alt=media&token=feefe734-4e45-4480-9d72-4b2975cae74e",
      accentColor: "var(--acc-violet)",
      description:
        "A highly observant young defense officer stationed at Hopo Outpost. She uncovers the mutilated cattle carcass and physical debris left by the entity, leading the search and rescue efforts during the blackout.",
    },
    {
      name: "Taylor (테일러)",
      actor: "played by Taylor Russell",
      role: "Biomedical Specialist",
      icon: FlaskConical,
      image: "https://firebasestorage.googleapis.com/v0/b/nahope-port.firebasestorage.app/o/intro%2Ftaylor_russell.jpg?alt=media&token=1c36890c-b8d1-4835-818e-264cf32e908d",
      accentColor: "#10b981",
      description:
        "A field biomedical researcher dispatched to Hopo Port right before the isolation. She is dedicated to dissecting the anomalous biological samples and discovering the entity's weaknesses.",
    },
    {
      name: "Cameron (카메론)",
      actor: "played by Cameron Britton",
      role: "Substation Chief Engineer",
      icon: Wrench,
      image: "https://firebasestorage.googleapis.com/v0/b/nahope-port.firebasestorage.app/o/intro%2Fcameron_britton.jpg?alt=media&token=b434aada-73fd-4dc4-930e-104b85f6ab22",
      accentColor: "var(--acc-amber)",
      description:
        "The sturdy operator in charge of the port's generator room. When the electromagnetic blackout hits, he tries to keep the substation powered while defending the gates from anomalous sounds outside.",
    },
    {
      name: "Alicia (알리시아)",
      actor: "played by Alicia Vikander",
      role: "Occult Researcher",
      icon: Globe,
      image: "https://firebasestorage.googleapis.com/v0/b/nahope-port.firebasestorage.app/o/intro%2Falicia_vikander.jpg?alt=media&token=665880b8-6005-4f49-894c-9d7148b41e18",
      accentColor: "#38bdf8",
      description:
        "An international investigator tracking supernatural anomalies across isolated coastal regions. She believes the event at Hopo Port is linked to a cosmic alignment first recorded in ancient texts.",
    },
    {
      name: "Michael (마이클)",
      actor: "played by Michael Fassbender",
      role: "Classified Liaison Officer",
      icon: FileText,
      image: "https://firebasestorage.googleapis.com/v0/b/nahope-port.firebasestorage.app/o/intro%2Fmichael_fassbender.jpg?alt=media&token=a6e97578-c277-4c64-866f-e54d548f8e3a",
      accentColor: "var(--acc-danger)",
      description:
        "A cold-hearted liaison officer arriving under a classified military mandate. He holds a secret transmitter and appears to know more about the approaching cosmic entity than he lets on.",
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
          // CLASSIFIED MOVIE PROFILE //
        </span>
        <h1 className="display text-4xl sm:text-5xl uppercase mb-4" style={{ color: "var(--ink-0)" }}>
          FILM PROFILE: HOPE (호프)
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
              THE SURVIVORS (MAIN CAST)
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

        {/* Section 3: Director Spotlight */}
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
                NA HONG-JIN (나홍진)
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
              Director Na Hong-jin is celebrated internationally for his uncompromising grit, intense pacing, and occult imagery, establishing his name with classic Korean thrillers such as *The Chaser* (2008), *The Yellow Sea* (2010), and the occult horror masterpiece *The Wailing* (곡성, 2016).
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
