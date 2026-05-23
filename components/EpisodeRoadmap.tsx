export default function EpisodeRoadmap() {
  return (
    <section id="roadmap" className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 py-16 border-t border-space-800/40">
      
      {/* Ambient glow decoration */}
      <div className="absolute left-1/4 bottom-0 w-[300px] h-[300px] bg-neon-purple/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="text-center max-w-3xl mx-auto flex flex-col items-center gap-4 mb-16">
        <div className="text-neon-pink font-mono text-sm tracking-widest uppercase">
          // DECRYPTION ROADMAP
        </div>
        <h2 className="font-righteous text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-wide">
          EPISODES &amp; HOLDING PROTOCOLS
        </h2>
        <div className="w-12 h-1 bg-gradient-to-r from-neon-pink to-neon-purple" />
        <p className="text-gray-400 font-sans text-sm sm:text-base leading-relaxed">
          Holders of $NAHOPE tokens gain classified clearance to proceed with deep-space investigation files. 
          Secure your holdings to decrypt the full mystery of Hopo Port.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Episode 1 Card */}
        <div className="glass-panel-glow-pink rounded-2xl p-5 border border-neon-pink/20 relative overflow-hidden flex flex-col justify-between min-h-[300px]">
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-start">
              <span className="text-[10px] bg-neon-pink/10 border border-neon-pink/30 text-neon-pink font-mono font-bold px-2 py-0.5 rounded">
                EPISODE 01
              </span>
              <span className="text-alien-cyan font-mono text-[9px] font-bold">FREE PLAY</span>
            </div>
            <h3 className="font-righteous text-base font-bold text-white tracking-wide uppercase mt-2">
              Hopo Port Tiger
            </h3>
            <p className="text-xs text-gray-400 font-sans leading-relaxed">
              Investigate the bizarre cattle mutilation and confiscate illicit Carbine rifles before the fog sets in.
            </p>
          </div>
          <div className="border-t border-space-850 pt-3 mt-4 text-[10px] text-neon-pink font-mono uppercase tracking-wider">
            STATUS: ACTIVE TEASER PLAYABLE
          </div>
        </div>

        {/* Episode 2 Card */}
        <div className="glass-panel rounded-2xl p-5 border border-white/5 relative overflow-hidden flex flex-col justify-between min-h-[300px] opacity-80">
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-start">
              <span className="text-[10px] bg-space-800 text-gray-400 font-mono font-bold px-2 py-0.5 rounded">
                EPISODE 02
              </span>
              <span className="text-neon-purple font-mono text-[9px] font-bold">5,000 $NAHOPE GATED</span>
            </div>
            <h3 className="font-righteous text-base font-bold text-gray-300 tracking-wide uppercase mt-2">
              Disconnected Signals
            </h3>
            <p className="text-xs text-gray-500 font-sans leading-relaxed">
              Communications are severed. Protect the elders in the outpost and intercept static foreign transmissions.
            </p>
          </div>
          <div className="border-t border-space-850 pt-3 mt-4 text-[10px] text-neon-purple font-mono uppercase tracking-wider">
            STATUS: GATED BY HOLDINGS
          </div>
        </div>

        {/* Episode 3 Card */}
        <div className="glass-panel rounded-2xl p-5 border border-white/5 relative overflow-hidden flex flex-col justify-between min-h-[300px] opacity-85">
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-start">
              <span className="text-[10px] bg-space-800 text-gray-400 font-mono font-bold px-2 py-0.5 rounded">
                EPISODE 03
              </span>
              <span className="text-neon-purple font-mono text-[9px] font-bold">20,000 $NAHOPE GATED</span>
            </div>
            <h3 className="font-righteous text-base font-bold text-gray-300 tracking-wide uppercase mt-2">
              Human Dust
            </h3>
            <p className="text-xs text-gray-500 font-sans leading-relaxed">
              Facing the 15-20ft tall humanoid entity. Surviving the hunt in the dark forest of Hopo.
            </p>
          </div>
          <div className="border-t border-space-850 pt-3 mt-4 text-[10px] text-neon-purple font-mono uppercase tracking-wider">
            STATUS: GATED BY HOLDINGS
          </div>
        </div>

        {/* Episode 4 Card */}
        <div className="glass-panel rounded-2xl p-5 border border-white/5 relative overflow-hidden flex flex-col justify-between min-h-[300px] opacity-90">
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-start">
              <span className="text-[10px] bg-space-800 text-gray-400 font-mono font-bold px-2 py-0.5 rounded">
                EPISODE 04
              </span>
              <span className="text-neon-pink font-mono text-[9px] font-bold">100,000 $NAHOPE ESCROW</span>
            </div>
            <h3 className="font-righteous text-base font-bold text-gray-300 tracking-wide uppercase mt-2">
              Omega Protocol
            </h3>
            <p className="text-xs text-gray-500 font-sans leading-relaxed">
              Gain access to the Scenario Submission Escrow. Synthesize item lore and write the proposal draft.
            </p>
          </div>
          <div className="border-t border-space-850 pt-3 mt-4 text-[10px] text-neon-pink font-mono uppercase tracking-wider">
            STATUS: ESCROW TIME-LOCK REQUIRED
          </div>
        </div>

      </div>
    </section>
  );
}
