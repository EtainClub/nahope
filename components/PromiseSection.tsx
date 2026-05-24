export default function PromiseSection() {
  return (
    <section id="tokenomics" className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 py-20 border-t border-space-800/40">
      
      {/* Decorative radial blur background in Jeroin style */}
      <div className="absolute left-0 bottom-1/4 w-[300px] h-[300px] bg-neon-pink/3 rounded-full blur-[90px] pointer-events-none" />

      <div className="text-center max-w-3xl mx-auto flex flex-col items-center gap-4 mb-16">
        <div className="eyebrow" style={{ color: "var(--acc-primary)" }}>// SAFE PLAY & TRANSPARENCY</div>
        <h2 className="display text-3xl sm:text-4xl" style={{ color: "var(--ink-0)" }}>
          Developer&apos;s Promise &amp; Tokenomics
        </h2>
        <div className="w-12 h-[2px]" style={{ background: "linear-gradient(90deg, var(--acc-primary), var(--acc-violet))" }} />
        <p className="text-gray-400 font-sans text-sm sm:text-base leading-relaxed">
          In the Solana meme ecosystem, trust and transparency are paramount. 
          To eliminate rug-pull anxieties and build a sustainable community-driven culture, 
          the contract ownership is renounced, and token configurations are permanently locked.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Card 1: LP Burned */}
        <div className="panel panel-bracket p-6 relative overflow-hidden flex flex-col gap-4" style={{ borderColor: "var(--acc-primary)", boxShadow: "var(--glow-primary)" }}>
          <span className="br-bl" /><span className="br-br" />
          <div className="w-12 h-12 flex items-center justify-center text-2xl font-bold" style={{ background: "color-mix(in srgb, var(--acc-primary) 10%, transparent)", border: "1px solid color-mix(in srgb, var(--acc-primary) 30%, transparent)" }}>
            🔥
          </div>
          <h3 className="display text-lg uppercase" style={{ color: "var(--ink-0)" }}>
            LIQUIDITY POOL 100% BURNED
          </h3>
          <p className="text-xs text-gray-400 font-sans leading-relaxed">
            Upon graduating to the Raydium liquidity pool, 100% of the LP tokens are instantly burned. 
            This permanently locks the pool, making it mathematically impossible to withdraw liquidity.
          </p>
          <div className="eyebrow mt-auto" style={{ color: "var(--acc-primary)" }}>// GUARANTEED PERMANENT LOCK</div>
        </div>

        {/* Card 2: Ownership Renounced */}
        <div className="panel panel-bracket p-6 relative overflow-hidden flex flex-col gap-4">
          <span className="br-bl" /><span className="br-br" />
          <div className="w-12 h-12 flex items-center justify-center text-2xl font-bold" style={{ background: "var(--bg-3)", border: "1px solid var(--line-bright)" }}>
            🛡️
          </div>
          <h3 className="display text-lg uppercase" style={{ color: "var(--ink-0)" }}>
            OWNERSHIP RENOUNCED
          </h3>
          <p className="text-xs text-gray-400 font-sans leading-relaxed">
            Smart contract authority is permanently disabled. No mint authority or freeze authority exists, 
            guaranteeing that the total supply cannot be altered or manipulated.
          </p>
          <div className="eyebrow mt-auto" style={{ color: "var(--acc-cyan)" }}>// 100% IMMUTABLE CONTRACT</div>
        </div>

        {/* Card 3: Minimal Dev Holding */}
        <div className="panel panel-bracket p-6 relative overflow-hidden flex flex-col gap-4" style={{ borderColor: "var(--acc-violet)", boxShadow: "var(--glow-violet)" }}>
          <span className="br-bl" /><span className="br-br" />
          <div className="w-12 h-12 flex items-center justify-center text-2xl font-bold" style={{ background: "color-mix(in srgb, var(--acc-violet) 10%, transparent)", border: "1px solid color-mix(in srgb, var(--acc-violet) 30%, transparent)" }}>
            🤝
          </div>
          <h3 className="display text-lg uppercase" style={{ color: "var(--ink-0)" }}>
            DEV HOLDS ONLY 1.5%
          </h3>
          <p className="text-xs text-gray-400 font-sans leading-relaxed">
            The developer and marketing wallet is capped at a tiny 1.5% of the total supply. 
            This prevents massive dumps and keeps the price action community-controlled.
          </p>
          <div className="eyebrow mt-auto" style={{ color: "var(--acc-violet)" }}>// COMMUNITY DRIVEN ECONOMY</div>
        </div>

      </div>

      {/* Tokenomics Infographic Box */}
      <div className="panel panel-bracket mt-12 p-6 md:p-8">
        <span className="br-bl" /><span className="br-br" />
        <h4 className="display text-base mb-6 uppercase" style={{ color: "var(--ink-0)" }}>
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
              <div className="h-2 w-full overflow-hidden" style={{ background: "var(--bg-0)", border: "1px solid var(--line)" }}>
                <div className="h-full" style={{ width: "98.5%", background: "linear-gradient(90deg, var(--acc-primary), var(--acc-violet))", boxShadow: "var(--glow-primary)" }} />
              </div>
            </div>

            {/* Developer allocation */}
            <div>
              <div className="flex justify-between font-mono text-xs mb-1" style={{ color: "var(--ink-2)" }}>
                <span>DEVELOPER & MARKETING RESERVE</span>
                <span style={{ color: "var(--ink-0)" }}>1.5%</span>
              </div>
              <div className="h-2 w-full overflow-hidden" style={{ background: "var(--bg-0)", border: "1px solid var(--line)" }}>
                <div className="h-full" style={{ width: "1.5%", background: "var(--bg-3)" }} />
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
