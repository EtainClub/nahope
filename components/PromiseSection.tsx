export default function PromiseSection() {
  return (
    <section id="tokenomics" className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 py-20 border-t border-space-800/40">
      
      {/* Decorative radial blur background in Jeroin style */}
      <div className="absolute left-0 bottom-1/4 w-[300px] h-[300px] bg-neon-pink/3 rounded-full blur-[90px] pointer-events-none" />

      <div className="text-center max-w-3xl mx-auto flex flex-col items-center gap-4 mb-16">
        <div className="text-neon-pink font-mono text-sm tracking-widest uppercase">
          // SAFE PLAY & TRANSPARENCY
        </div>
        <h2 className="font-righteous text-3xl sm:text-4xl font-extrabold text-white">
          Developer&apos;s Promise &amp; Tokenomics
        </h2>
        <div className="w-12 h-1 bg-gradient-to-r from-neon-pink to-neon-purple" />
        <p className="text-gray-400 font-sans text-sm sm:text-base leading-relaxed">
          In the Solana meme ecosystem, trust and transparency are paramount. 
          To eliminate rug-pull anxieties and build a sustainable community-driven culture, 
          the contract ownership is renounced, and token configurations are permanently locked.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Card 1: LP Burned */}
        <div className="glass-panel-glow-pink rounded-2xl p-6 border border-neon-pink/10 relative overflow-hidden flex flex-col gap-4">
          <div className="w-12 h-12 rounded-xl bg-neon-pink/10 border border-neon-pink/30 flex items-center justify-center text-neon-pink text-2xl font-bold">
            🔥
          </div>
          <h3 className="font-righteous text-lg font-bold text-white uppercase tracking-wider">
            LIQUIDITY POOL 100% BURNED
          </h3>
          <p className="text-xs text-gray-400 font-sans leading-relaxed">
            Upon graduating to the Raydium liquidity pool, 100% of the LP tokens are instantly burned. 
            This permanently locks the pool, making it mathematically impossible to withdraw liquidity.
          </p>
          <div className="text-[10px] text-neon-pink font-mono mt-auto uppercase">
            // GUARANTEED PERMANENT LOCK
          </div>
        </div>

        {/* Card 2: Ownership Renounced */}
        <div className="glass-panel rounded-2xl p-6 border border-white/5 relative overflow-hidden flex flex-col gap-4">
          <div className="w-12 h-12 rounded-xl bg-space-850 border border-space-700/50 flex items-center justify-center text-alien-cyan text-2xl font-bold">
            🛡️
          </div>
          <h3 className="font-righteous text-lg font-bold text-white uppercase tracking-wider">
            OWNERSHIP RENOUNCED
          </h3>
          <p className="text-xs text-gray-400 font-sans leading-relaxed">
            Smart contract authority is permanently disabled. No mint authority or freeze authority exists, 
            guaranteeing that the total supply cannot be altered or manipulated.
          </p>
          <div className="text-[10px] text-alien-cyan font-mono mt-auto uppercase">
            // 100% IMMUTABLE CONTRACT
          </div>
        </div>

        {/* Card 3: Minimal Dev Holding */}
        <div className="glass-panel-glow-purple rounded-2xl p-6 border border-neon-purple/10 relative overflow-hidden flex flex-col gap-4">
          <div className="w-12 h-12 rounded-xl bg-neon-purple/10 border border-neon-purple/30 flex items-center justify-center text-neon-purple text-2xl font-bold">
            🤝
          </div>
          <h3 className="font-righteous text-lg font-bold text-white uppercase tracking-wider">
            DEV HOLDS ONLY 1.5%
          </h3>
          <p className="text-xs text-gray-400 font-sans leading-relaxed">
            The developer and marketing wallet is capped at a tiny 1.5% of the total supply. 
            This prevents massive dumps and keeps the price action community-controlled.
          </p>
          <div className="text-[10px] text-neon-purple font-mono mt-auto uppercase">
            // COMMUNITY DRIVEN ECONOMY
          </div>
        </div>

      </div>

      {/* Tokenomics Infographic Box */}
      <div className="mt-12 glass-panel rounded-2xl p-6 md:p-8 border border-white/5">
        <h4 className="font-righteous text-base font-bold text-white mb-6 uppercase tracking-wider">
          Token Allocation Details
        </h4>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Allocations Bars */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            
            {/* Liquidity allocation */}
            <div>
              <div className="flex justify-between text-xs font-mono font-medium text-gray-400 mb-1">
                <span>COMMUNITY LIQUIDITY POOL (PUMP.FUN)</span>
                <span className="text-white">98.5%</span>
              </div>
              <div className="h-2 w-full bg-space-950 rounded-full overflow-hidden p-[1px]">
                <div className="h-full bg-gradient-to-r from-neon-pink to-neon-purple rounded-full shadow-[0_0_10px_rgba(255,0,127,0.3)]" style={{ width: "98.5%" }} />
              </div>
            </div>

            {/* Developer allocation */}
            <div>
              <div className="flex justify-between text-xs font-mono font-medium text-gray-400 mb-1">
                <span>DEVELOPER & MARKETING RESERVE</span>
                <span className="text-white">1.5%</span>
              </div>
              <div className="h-2 w-full bg-space-950 rounded-full overflow-hidden p-[1px]">
                <div className="h-full bg-space-700 rounded-full" style={{ width: "1.5%" }} />
              </div>
            </div>

          </div>

          {/* Key Facts list */}
          <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-space-800/40 pt-6 lg:pt-0 lg:pl-8 flex flex-col gap-3">
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">TICKER:</span>
              <span className="text-white font-mono font-bold">$NAHOPE</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">BLOCKCHAIN:</span>
              <span className="text-white font-semibold">SOLANA</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">TAX:</span>
              <span className="text-white font-semibold">0% BUY / SELL TAX</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">CONTRACT:</span>
              <span className="text-alien-cyan font-mono font-bold truncate max-w-[150px]" title="Renounced">Renounced</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
