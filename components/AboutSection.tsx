import Image from "next/image";

interface CastMember {
  name: string;
  role: string;
  desc: string;
  status: "ACTIVE" | "CLASSIFIED" | "UNKNOWN";
}

const CAST_LIST: CastMember[] = [
  {
    name: "Hwang Jung-min",
    role: "Local Police Officer",
    desc: "A veteran cop searching the dark, foggy forest for clues of the anomaly. Threat level: A.",
    status: "ACTIVE",
  },
  {
    name: "Jo In-sung",
    role: "Young Hunter",
    desc: "A skilled marksman who witnessed something inexplicable on the village outskirts.",
    status: "ACTIVE",
  },
  {
    name: "Jung Ho-yeon",
    role: "Field Analyst",
    desc: "An elite agent investigating electromagnetic paralysis and deciphering unknown cosmic signals.",
    status: "CLASSIFIED",
  },
  {
    name: "Michael Fassbender",
    role: "Mysterious Inspector",
    desc: "A foreign agent deployed under tight secrecy, suspected of maintaining a connection to the entities.",
    status: "CLASSIFIED",
  },
  {
    name: "Alicia Vikander",
    role: "Co-Researcher",
    desc: "A scientist tracking the landing coordinates, holding the key to humanity's ultimate survival.",
    status: "UNKNOWN",
  },
];

export default function AboutSection() {
  return (
    <section id="story" className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 py-20 border-t border-space-800/40">
      
      {/* Decorative backdrop mesh in Jeroin style */}
      <div className="absolute right-0 top-1/4 w-[300px] h-[300px] bg-neon-purple/5 rounded-full blur-[90px] pointer-events-none" />

      {/* Grid: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Col: Narrative & Movie info */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="text-neon-pink font-mono text-sm tracking-widest uppercase">
            // PROJECT BACKGROUND
          </div>
          <h2 className="font-righteous text-3xl sm:text-4xl font-extrabold text-white leading-tight">
            Na Hong-jin&apos;s Sci-Fi Epic: <span className="text-neon-pink text-neon-pink">HOPE</span>
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-neon-pink to-neon-purple" />
          
          <p className="text-gray-400 leading-relaxed font-sans text-sm sm:text-base">
            Renowned for his dark masterpieces <strong>&apos;The Chaser&apos;</strong>, <strong>&apos;The Yellow Sea&apos;</strong>, and <strong>&apos;The Wailing&apos;</strong>, 
            director Na Hong-jin returns in 2026 with a high-budget sci-fi mystery thriller.
          </p>
          <p className="text-gray-400 leading-relaxed font-sans text-sm sm:text-base">
            In a rural village isolated by fog, residents encounter incomprehensible alien entities 
            that challenge the limits of human cognition. Amidst this dread, we search for 
            a sliver of hope—and this community-led project brings the cinematic thrill onto the Solana blockchain.
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
              At timestamp [[00:36](https://www.youtube.com/watch?v=KgwHb2qNo8k&t=36)] in the trailer, a single chicken strolls calmly through the desolation. 
              In Na Hong-jin&apos;s dark cinematic universe, it is agreed that this chicken is immune to the invaders and stronger than any alien vessel. 
              It serves as $NAHOPE&apos;s ultimate spiritual mascot.
            </p>
            <div className="mt-3 text-[10px] text-alien-cyan font-mono">
              STATUS: IMMUNE TO ALIEN BEAMS
            </div>
          </div>
        </div>

        {/* Right Col: Cast dossiers */}
        <div id="casting" className="lg:col-span-7 flex flex-col gap-6">
          <div className="text-neon-pink font-mono text-sm tracking-widest uppercase">
            // CLASSIFIED FILES: CODENAME &apos;HOPE&apos;
          </div>
          <h3 className="font-righteous text-2xl font-bold text-white">
            Star-Studded Cast &amp; Dossiers
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
                      : "text-neon-pink border-neon-pink/20 bg-neon-pink/5"
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
