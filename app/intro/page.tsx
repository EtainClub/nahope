import type { Metadata } from "next";
import { Shield, Radio, Eye, Clapperboard, FlaskConical, Wrench, Globe, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "영화 HOPE 소개 | Film Profile",
  description:
    "나홍진 감독의 SF 코즈믹 호러 영화 HOPE(호프) 상세 정보. 황정민, 조인성, 정호연, 마이클 패스벤더, 알리시아 비칸데르 출연. 시놉시스, 캐릭터 소개, 감독 프로필. Cast, synopsis, and director profile for Na Hong-jin's sci-fi cosmic horror film 'HOPE'.",
  openGraph: {
    title: "영화 HOPE(호프) | 나홍진 감독 SF 코즈믹 호러",
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
    title: "영화 HOPE | 나홍진 감독 코즈믹 호러",
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
      glow: "border-neon-pink/30 shadow-[0_0_15px_rgba(255,0,127,0.15)]",
      textGlow: "text-neon-pink",
      description:
        "The weary police chief of Hopo Port. As communications go completely dark and panic spreads, Bum-seok tries to maintain order, only to face the horrifying realization that the threat might be coming from within his own community.",
    },
    {
      name: "Sung-ki (성기)",
      actor: "played by Jo In-sung",
      role: "Classified Signal Operator",
      icon: Radio,
      image: "https://firebasestorage.googleapis.com/v0/b/nahope-port.firebasestorage.app/o/intro%2Fjo_in_sung.jpg?alt=media&token=0e1627f8-3ee9-462b-b35b-bcbb497a2ed4",
      glow: "border-alien-cyan/30 shadow-[0_0_15px_rgba(0,245,212,0.15)]",
      textGlow: "text-alien-cyan",
      description:
        "A quiet, reclusive resident of the port who owns an old radio receiver. He is the first to detect the rhythmic extraterrestrial signal broadcasts. The other villagers suspect him of coordinating with the anomaly.",
    },
    {
      name: "Sung-ae (성해)",
      actor: "played by Jung Ho-yeon",
      role: "Outpost Guard Officer",
      icon: Eye,
      image: "https://firebasestorage.googleapis.com/v0/b/nahope-port.firebasestorage.app/o/intro%2Fjung_ho_yeon.jpg?alt=media&token=feefe734-4e45-4480-9d72-4b2975cae74e",
      glow: "border-neon-purple/30 shadow-[0_0_15px_rgba(216,0,255,0.15)]",
      textGlow: "text-neon-purple",
      description:
        "A highly observant young defense officer stationed at Hopo Outpost. She uncovers the mutilated cattle carcass and physical debris left by the entity, leading the search and rescue efforts during the blackout.",
    },
    {
      name: "Taylor (테일러)",
      actor: "played by Taylor Russell",
      role: "Biomedical Specialist",
      icon: FlaskConical,
      image: "https://firebasestorage.googleapis.com/v0/b/nahope-port.firebasestorage.app/o/intro%2Ftaylor_russell.jpg?alt=media&token=1c36890c-b8d1-4835-818e-264cf32e908d",
      glow: "border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.15)]",
      textGlow: "text-emerald-400",
      description:
        "A field biomedical researcher dispatched to Hopo Port right before the isolation. She is dedicated to dissecting the anomalous biological samples and discovering the entity's weaknesses.",
    },
    {
      name: "Cameron (카메론)",
      actor: "played by Cameron Britton",
      role: "Substation Chief Engineer",
      icon: Wrench,
      image: "https://firebasestorage.googleapis.com/v0/b/nahope-port.firebasestorage.app/o/intro%2Fcameron_britton.jpg?alt=media&token=b434aada-73fd-4dc4-930e-104b85f6ab22",
      glow: "border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.15)]",
      textGlow: "text-amber-400",
      description:
        "The sturdy operator in charge of the port's generator room. When the electromagnetic blackout hits, he tries to keep the substation powered while defending the gates from anomalous sounds outside.",
    },
    {
      name: "Alicia (알리시아)",
      actor: "played by Alicia Vikander",
      role: "Occult Researcher",
      icon: Globe,
      image: "https://firebasestorage.googleapis.com/v0/b/nahope-port.firebasestorage.app/o/intro%2Falicia_vikander.jpg?alt=media&token=665880b8-6005-4f49-894c-9d7148b41e18",
      glow: "border-sky-400/30 shadow-[0_0_15px_rgba(56,189,248,0.15)]",
      textGlow: "text-sky-400",
      description:
        "An international investigator tracking supernatural anomalies across isolated coastal regions. She believes the event at Hopo Port is linked to a cosmic alignment first recorded in ancient texts.",
    },
    {
      name: "Michael (마이클)",
      actor: "played by Michael Fassbender",
      role: "Classified Liaison Officer",
      icon: FileText,
      image: "https://firebasestorage.googleapis.com/v0/b/nahope-port.firebasestorage.app/o/intro%2Fmichael_fassbender.jpg?alt=media&token=a6e97578-c277-4c64-866f-e54d548f8e3a",
      glow: "border-rose-500/30 shadow-[0_0_15px_rgba(244,63,94,0.15)]",
      textGlow: "text-rose-400",
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
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-neon-pink/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[450px] h-[450px] bg-neon-purple/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Title */}
      <div className="w-full max-w-5xl mx-auto text-center mb-16 relative z-10">
        <span className="text-[10px] text-neon-pink font-mono tracking-[0.3em] uppercase block mb-3 animate-pulse">
          // CLASSIFIED MOVIE PROFILE //
        </span>
        <h1 className="font-righteous text-4xl sm:text-5xl font-extrabold text-white tracking-widest uppercase mb-4">
          FILM PROFILE: HOPE (호프)
        </h1>
        <div className="w-24 h-[2px] bg-gradient-to-r from-neon-pink to-neon-purple mx-auto" />
      </div>

      <div className="w-full max-w-5xl mx-auto flex flex-col gap-16 relative z-10">
        {/* Section 1: Plot & Synopsis */}
        <section className="glass-panel rounded-2xl p-6 md:p-8 border border-white/5 shadow-2xl relative">
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-neon-pink" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-neon-pink" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-neon-pink" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-neon-pink" />

          <div className="flex items-center gap-3 mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-neon-pink animate-pulse" />
            <h2 className="font-righteous text-xl font-bold tracking-wide text-white uppercase">
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
              <p className="border-l-2 border-neon-pink/50 pl-3 italic text-gray-400">
                &quot;When the sky falls dark and the signals go silent, who do you trust? In the face of cosmic isolation, human fragility is our deepest vulnerability.&quot;
              </p>
            </div>

            {/* YouTube Trailer Embed */}
            <div className="w-full md:w-[440px] aspect-video bg-space-950 border border-white/5 rounded-xl overflow-hidden relative shadow-2xl group">
              <div className="crt-scanlines absolute inset-0 opacity-[0.05] z-10 pointer-events-none" />
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
            <span className="w-2.5 h-2.5 rounded-full bg-alien-cyan animate-pulse" />
            <h2 className="font-righteous text-xl font-bold tracking-wide text-white uppercase">
              THE SURVIVORS (MAIN CAST)
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {castList.map((cast) => {
              const Icon = cast.icon;
              return (
                <div
                  key={cast.name}
                  className={`glass-panel rounded-2xl p-5 border flex flex-col gap-4 hover:scale-[1.02] transition-transform duration-300 ${cast.glow}`}
                >
                  {/* Retro Character Portrait */}
                  <div className="w-full aspect-[4/3] rounded-xl overflow-hidden relative border border-white/5 bg-space-950/80 group-hover:border-white/10 transition-colors">
                    <div className="crt-scanlines absolute inset-0 opacity-[0.08] z-10 pointer-events-none" />
                    <img 
                      src={cast.image} 
                      alt={cast.name} 
                      className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition duration-500"
                      loading="lazy"
                    />
                  </div>

                  <div className="flex justify-between items-start border-b border-space-900 pb-3">
                    <div className="flex flex-col">
                      <span className="text-white font-righteous text-sm tracking-wide">
                        {cast.name}
                      </span>
                      <span className="text-[10px] text-gray-500 font-mono mt-0.5">
                        {cast.actor}
                      </span>
                    </div>
                    <div className={`p-2 rounded-xl bg-space-950/60 border border-white/5 ${cast.textGlow}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <span className={`text-[10px] font-mono font-bold tracking-widest uppercase ${cast.textGlow}`}>
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
        <section className="glass-panel rounded-2xl p-6 border border-white/5 flex flex-col md:flex-row gap-8 items-stretch shadow-2xl relative">
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-neon-purple" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-neon-purple" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-neon-purple" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-neon-purple" />

          <div className="md:w-1/3 bg-space-950/80 border border-space-850 rounded-xl overflow-hidden relative min-h-[260px] flex flex-col group">
            <div className="crt-scanlines absolute inset-0 opacity-[0.08] z-10 pointer-events-none" />
            <div className="w-full h-48 relative border-b border-space-850 bg-space-950 overflow-hidden">
              <img 
                src="https://firebasestorage.googleapis.com/v0/b/nahope-port.firebasestorage.app/o/intro%2Fna_hong_jin.jpg?alt=media&token=20cca7e1-a940-461d-b7d9-5deb668e154e" 
                alt="Na Hong-jin" 
                className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition duration-500"
                loading="lazy"
              />
              <div className="absolute top-3 right-3 p-2 bg-space-950/80 border border-neon-purple/30 rounded-xl text-neon-purple z-20">
                <Clapperboard className="w-4 h-4" />
              </div>
            </div>
            <div className="p-4 flex flex-col items-center text-center justify-center flex-1 z-10">
              <h3 className="font-righteous text-lg font-bold text-white tracking-wide">
                NA HONG-JIN (나홍진)
              </h3>
              <span className="text-[10px] text-gray-500 font-mono mt-0.5">DIRECTOR & SCREENPLAY</span>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-center gap-4 text-xs sm:text-sm text-gray-300 leading-relaxed font-sans">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-neon-purple animate-pulse" />
              <h3 className="font-righteous text-base font-bold text-white tracking-wide uppercase">
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
