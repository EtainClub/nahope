interface CastMember {
  name: string;
  role: string;
  desc: string;
  status: "ACTIVE" | "CLASSIFIED" | "UNKNOWN" | "EXTRATERRESTRIAL";
}

const CAST_LIST: CastMember[] = [
  {
    name: "Hwang Jung-min",
    role: "Bum-seok (Police Chief)",
    desc: "The veteran chief of the Hopo Police Outpost. Struggling to protect the isolated coastal town under extreme pressure.",
    status: "ACTIVE",
  },
  {
    name: "Jo In-sung",
    role: "Sung-ki (Hunter / Villager)",
    desc: "A bold local youth who tracks the creature in the dense forest with a Carbine rifle, eventually becoming the prey.",
    status: "ACTIVE",
  },
  {
    name: "Gong Min-jung",
    role: "Sung-ae (Outpost Officer)",
    desc: "Bum-seok's junior partner. Tries to maintain civil order and guard the elders as all communications fail.",
    status: "CLASSIFIED",
  },
  {
    name: "Michael Fassbender & Alicia Vikander",
    role: "Mysterious Alien Entities",
    desc: "A real-life power couple making their first joint appearance in a Korean film, portraying major non-human roles.",
    status: "EXTRATERRESTRIAL",
  },
  {
    name: "Taylor Russell & Cameron Britton",
    role: "Humanoid Cosmic Entities",
    desc: "Portraying 15-20ft tall humanoid alien beasts that crash-landed to ravage Hopo Port.",
    status: "EXTRATERRESTRIAL",
  },
];

export default function AboutSection() {
  return (
    <section id="story" className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 py-20 border-t border-space-800/40">
      
      {/* Decorative holographic gradient glow in Jeroin style */}
      <div className="absolute right-0 top-1/4 w-[350px] h-[350px] bg-gradient-to-tr from-neon-pink/10 to-alien-cyan/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Grid: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Col: Narrative & Movie info */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="text-neon-pink font-mono text-sm tracking-widest uppercase">
            // OFFICIAL PRODUCTION DATABASE
          </div>
          <h2 className="font-righteous text-3xl sm:text-4xl font-extrabold text-white leading-tight">
            Na Hong-jin&apos;s Sci-Fi Epic: <span className="text-oil-slick font-bold">HOPE</span>
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-neon-pink via-neon-purple to-alien-cyan" />
          
          <p className="text-gray-400 leading-relaxed font-sans text-sm sm:text-base">
            Renowned for his dark masterpieces <em>&apos;The Chaser&apos;</em>, <em>&apos;The Yellow Sea&apos;</em>, and <em>&apos;The Wailing&apos;</em>, 
            director Na Hong-jin returns with a high-budget sci-fi thriller. Breaking the country&apos;s budget records, 
            the 160-minute epic marks his official Cannes Competition debut.
          </p>
          <p className="text-gray-400 leading-relaxed font-sans text-sm sm:text-base">
            The story takes place in the 1980s in **Hopo Port, Haenam**, a coastal town isolated by an electromagnetic pulse. 
            A small spark of human ignorance balloons into a massive extraterrestrial tragedy. Humanity encounters 
            mysterious 15-20ft humanoid aliens and massive motherships hovering over the shore.
          </p>

          {/* Chicken Meme Card */}
          <div className="mt-6 glass-panel rounded-xl p-5 border-l-4 border-l-alien-cyan relative overflow-hidden">
            <div className="absolute -right-8 -bottom-8 opacity-[0.03] rotate-12 pointer-events-none">
              <span className="text-9xl font-bold">🐔</span>
            </div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">🐔</span>
              <h4 className="font-righteous text-sm font-bold text-white uppercase tracking-wider">
                The Legendary Alien-Slayer Chicken
              </h4>
            </div>
            <p className="text-xs text-gray-400 font-sans leading-relaxed">
              Spotted at timestamp [00:36] in the trailer, this single chicken roams the ruins without fear. 
              In the Hopo Port community, it is agreed that this creature is immune to extra-terrestrial rays and represents the ultimate survivor. 
              It stands as the spiritual mascot of the $NAHOPE initiative.
            </p>
            <div className="mt-3 text-[10px] text-alien-cyan font-mono">
              STATUS: SECURE AND IMMUNE TO COSMIC BEAMS
            </div>
          </div>
        </div>

        {/* Right Col: Cast dossiers */}
        <div id="casting" className="lg:col-span-7 flex flex-col gap-6">
          <div className="text-neon-pink font-mono text-sm tracking-widest uppercase">
            // CONFIDENTIAL PROFILE LOGS
          </div>
          <h3 className="font-righteous text-2xl font-bold text-white">
            Official Cast &amp; Character Files
          </h3>

          <div className="flex flex-col gap-4">
            {CAST_LIST.map((cast, index) => (
              <div 
                key={index} 
                className="glass-panel rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all hover:bg-space-900/60 border border-white/5 hover:border-neon-purple/40"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-space-800 text-gray-300">
                      FILE 0{index + 1}
                    </span>
                    <h5 className="font-righteous text-base font-bold text-white">
                      {cast.name}
                    </h5>
                  </div>
                  <div className="text-xs text-neon-pink font-medium mb-1">
                    ROLE: {cast.role}
                  </div>
                  <p className="text-xs text-gray-400 font-sans max-w-lg">
                    {cast.desc}
                  </p>
                </div>
                
                <span className={`text-[10px] font-mono font-bold px-2 py-1 rounded border tracking-wider ${
                  cast.status === "ACTIVE" 
                    ? "text-alien-cyan border-alien-cyan/20 bg-alien-cyan/5"
                    : cast.status === "CLASSIFIED"
                      ? "text-neon-purple border-neon-purple/20 bg-neon-purple/5"
                      : cast.status === "EXTRATERRESTRIAL"
                        ? "text-neon-pink border-neon-pink/20 bg-neon-pink/5"
                        : "text-alert-red border-alert-red/20 bg-alert-red/5"
                }`}>
                  {cast.status}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
