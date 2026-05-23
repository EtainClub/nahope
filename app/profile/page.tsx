"use client";

import { useState, useEffect, useCallback } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { database, UserProfile, CommunityPost } from "../../lib/firebase";
import WalletConnectModal from "../../components/WalletConnectModal";
import {
  Wallet,
  ShieldCheck,
  ClipboardList,
  Award,
  Star,
  LogOut,
  RefreshCw,
  Loader2,
  Link as LinkIcon,
} from "lucide-react";

const NAHOPE_MINT = process.env.NEXT_PUBLIC_NAHOPE_MINT || "";

export default function ProfilePage() {
  const { connected, publicKey, disconnect } = useWallet();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [userPosts, setUserPosts] = useState<CommunityPost[]>([]);
  const [activeWallet, setActiveWallet] = useState("");
  const [showWalletModal, setShowWalletModal] = useState(false);

  // Real on-chain $NAHOPE balance (null = not fetched / unavailable)
  const [chainBalance, setChainBalance] = useState<number | null>(null);
  const [isFetchingBalance, setIsFetchingBalance] = useState(false);

  const loadProfileData = useCallback(async () => {
    if (typeof window === "undefined") return;
    const wallet =
      localStorage.getItem("active_wallet_address") || "Hopo...7XzP";
    setActiveWallet(wallet);

    const data = database.getUserProfile(wallet);
    setProfile(data);

    const allPosts = await database.getPosts();
    setUserPosts(allPosts.filter((p) => p.authorAddress === wallet));
  }, []);

  useEffect(() => {
    loadProfileData();
  }, [loadProfileData]);

  // Re-load profile when wallet connects / disconnects
  useEffect(() => {
    loadProfileData();
  }, [connected, publicKey, loadProfileData]);

  // Fetch real on-chain $NAHOPE balance via server-side API route
  // (avoids 403 from public Solana RPC which blocks browser-origin requests)
  const fetchChainBalance = useCallback(async () => {
    if (!connected || !publicKey || !NAHOPE_MINT) {
      setChainBalance(null);
      return;
    }
    setIsFetchingBalance(true);
    try {
      const res = await fetch(
        `/api/token-balance?wallet=${publicKey.toBase58()}&mint=${NAHOPE_MINT}`
      );
      if (!res.ok) throw new Error(`API ${res.status}`);
      const { balance } = await res.json();

      setChainBalance(balance);

      // Sync fetched balance back to stored profile
      const currentProfile = database.getUserProfile(publicKey.toBase58());
      if (currentProfile && balance !== currentProfile.tokenBalance) {
        const updated = {
          ...currentProfile,
          tokenBalance: balance,
          lastSeen: Date.now(),
        };
        setProfile(updated);
        await database.saveUserProfile(publicKey.toBase58(), updated);
        window.dispatchEvent(new Event("profileUpdated"));
      }
    } catch {
      setChainBalance(null);
    } finally {
      setIsFetchingBalance(false);
    }
  }, [connected, publicKey]);

  useEffect(() => {
    fetchChainBalance();
  }, [fetchChainBalance]);

  const handleDisconnect = async () => {
    await disconnect();
    localStorage.setItem("active_wallet_address", "Hopo...7XzP");
    window.dispatchEvent(new Event("profileUpdated"));
    loadProfileData();
  };

  const displayAddress =
    connected && publicKey ? publicKey.toBase58() : activeWallet;

  const displayBalance =
    connected && chainBalance !== null
      ? chainBalance
      : profile?.tokenBalance ?? 0;

  const balanceLabel =
    connected && NAHOPE_MINT
      ? "ON-CHAIN $NAHOPE"
      : connected
        ? "$NAHOPE (STORED)"
        : "$NAHOPE (SIMULATION)";

  const isSimulation = !connected;

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="flex-1 flex flex-col bg-space-950 py-12 px-4 md:px-8 relative overflow-hidden font-sans select-none">
      <div className="absolute top-1/4 right-1/4 w-[350px] h-[350px] bg-neon-pink/5 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-[300px] h-[300px] bg-neon-purple/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="w-full max-w-4xl mx-auto text-center mb-12 relative z-10">
        <span className="text-[10px] text-neon-purple font-mono tracking-[0.3em] uppercase block mb-3 animate-pulse">
          // USER PROFILE IDENT DECK //
        </span>
        <h1 className="font-righteous text-3xl sm:text-4xl font-extrabold text-white tracking-widest uppercase">
          CLASSIFIED DOSSIER
        </h1>
        <div className="w-24 h-[2px] bg-gradient-to-r from-neon-purple to-alien-cyan mx-auto mt-2" />
      </div>

      <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch relative z-10">

        {/* Left Column */}
        <div className="md:col-span-5 flex flex-col gap-6">

          {/* Wallet Panel */}
          <div className="glass-panel rounded-2xl p-5 border border-neon-purple/20 relative shadow-xl flex flex-col gap-4">
            <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-neon-purple" />
            <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-neon-purple" />
            <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-neon-purple" />
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-neon-purple" />

            <div className="flex items-center gap-2 border-b border-space-900 pb-2">
              <Wallet className="w-4 h-4 text-alien-cyan" />
              <span className="text-white font-righteous text-sm tracking-wider uppercase">
                Solana Wallet
              </span>
              {isSimulation && (
                <span className="ml-auto text-[9px] font-mono text-gray-600 border border-space-800 rounded px-1.5 py-0.5 uppercase tracking-wider">
                  Simulation
                </span>
              )}
            </div>

            {connected && publicKey ? (
              /* Connected State */
              <div className="flex flex-col gap-3 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
                  <span className="text-neon-green font-bold uppercase tracking-widest text-[10px]">
                    Connected
                  </span>
                </div>

                {/* Address */}
                <div className="bg-space-950 border border-space-800 rounded-xl px-3 py-2.5 flex items-center justify-between gap-2">
                  <span className="text-white text-[11px] truncate">
                    {publicKey.toBase58().slice(0, 6)}...{publicKey.toBase58().slice(-6)}
                  </span>
                  <a
                    href={`https://solscan.io/account/${publicKey.toBase58()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-alien-cyan hover:text-white transition-colors shrink-0"
                    title="View on Solscan"
                  >
                    <LinkIcon className="w-3 h-3" />
                  </a>
                </div>

                {/* Balance */}
                <div className="bg-space-950 border border-alien-cyan/20 rounded-xl px-3 py-3 flex items-center justify-between">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[9px] text-gray-500 uppercase tracking-widest">
                      {balanceLabel}
                    </span>
                    {isFetchingBalance ? (
                      <div className="flex items-center gap-1.5 text-gray-400">
                        <Loader2 className="w-3 h-3 animate-spin" />
                        <span className="text-[11px]">Fetching...</span>
                      </div>
                    ) : (
                      <span className="text-alien-cyan font-bold text-base">
                        {displayBalance.toLocaleString()}
                        <span className="text-[10px] ml-1 text-gray-400">
                          $NAHOPE
                        </span>
                      </span>
                    )}
                  </div>
                  {NAHOPE_MINT && (
                    <button
                      onClick={fetchChainBalance}
                      disabled={isFetchingBalance}
                      title="Refresh balance"
                      className="text-gray-500 hover:text-alien-cyan transition-colors disabled:opacity-40"
                    >
                      <RefreshCw
                        className={`w-3.5 h-3.5 ${isFetchingBalance ? "animate-spin" : ""}`}
                      />
                    </button>
                  )}
                </div>

                {/* Episode access gates */}
                <div className="flex flex-col gap-1.5 text-[10px] border border-space-900 rounded-xl p-3 bg-space-950/50">
                  {[
                    { label: "EP.2 ACCESS", req: 5000 },
                    { label: "EP.3 ACCESS", req: 20000 },
                    { label: "EP.4 ACCESS", req: 100000 },
                  ].map(({ label, req }) => {
                    const granted = displayBalance >= req;
                    return (
                      <div key={label} className="flex justify-between items-center">
                        <span className="text-gray-600 font-bold">{label}</span>
                        <span
                          className={
                            granted ? "text-neon-green font-bold" : "text-gray-600"
                          }
                        >
                          {granted
                            ? "// GRANTED //"
                            : `${req.toLocaleString()} needed`}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Disconnect */}
                <button
                  onClick={handleDisconnect}
                  className="flex items-center justify-center gap-1.5 text-[10px] text-gray-500 hover:text-alert-red transition-colors font-mono uppercase tracking-wider py-1 cursor-pointer"
                >
                  <LogOut className="w-3 h-3" />
                  Disconnect Wallet
                </button>
              </div>
            ) : (
              /* Not Connected State */
              <div className="flex flex-col gap-4 font-mono text-xs">
                <p className="text-gray-500 text-[11px] leading-relaxed">
                  Connect your Solana wallet to verify your $NAHOPE balance,
                  unlock Episodes 2–4, and post to the community feed.
                </p>
                <p className="text-gray-600 text-[10px]">
                  Episode 1 is free — currently playing in simulation mode with
                  a mock balance of{" "}
                  <span className="text-alien-cyan font-bold">
                    {profile?.tokenBalance.toLocaleString()} $NAHOPE
                  </span>
                  .
                </p>
                <button
                  onClick={() => setShowWalletModal(true)}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-neon-purple/80 to-alien-cyan/80 hover:from-neon-purple hover:to-alien-cyan text-white font-bold py-3 rounded-xl text-[11px] tracking-widest transition-all shadow-[0_0_15px_rgba(216,0,255,0.2)] border border-white/10 cursor-pointer"
                >
                  <Wallet className="w-3.5 h-3.5" />
                  Connect Wallet
                </button>
              </div>
            )}
          </div>

          {/* Clearance Summary */}
          <div className="glass-panel rounded-2xl p-5 border border-white/5 relative flex flex-col justify-between">
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="w-4 h-4 text-neon-pink" />
              <span className="text-white font-righteous text-sm tracking-wider uppercase">
                Clearance Summary
              </span>
            </div>

            <div className="flex flex-col gap-2.5 font-mono text-[10px] leading-relaxed">
              <div className="flex justify-between border-b border-space-900 pb-1.5">
                <span className="text-gray-500">ACTIVE ACCOUNT:</span>
                <span className="text-white font-bold">
                  {displayAddress.length > 14
                    ? `${displayAddress.slice(0, 6)}...${displayAddress.slice(-6)}`
                    : displayAddress}
                </span>
              </div>
              <div className="flex justify-between border-b border-space-900 pb-1.5">
                <span className="text-gray-500">LIQUID $NAHOPE:</span>
                <span className="text-alien-cyan font-bold">
                  {displayBalance.toLocaleString()} TOKENS
                </span>
              </div>
              <div className="flex justify-between border-b border-space-900 pb-1.5">
                <span className="text-gray-500">SECURED GEAR:</span>
                <span className="text-neon-pink font-bold">
                  {profile?.inventory.length || 0} / 5
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="md:col-span-7 flex flex-col gap-6">

          {/* Inventory Grid */}
          <div className="glass-panel rounded-2xl p-5 border border-white/5">
            <div className="flex items-center gap-2 mb-4 border-b border-space-900 pb-2">
              <Award className="w-4 h-4 text-alien-cyan" />
              <span className="text-white font-righteous text-sm tracking-wider uppercase">
                Gear Secured List
              </span>
            </div>

            <div className="grid grid-cols-5 gap-2 font-mono text-[9px] text-center">
              {[
                "Screwdriver",
                "Cabinet Key",
                "80s Radio",
                "Torn ID Tag",
                "Green Alien Slime",
              ].map((item) => {
                const isSecured = profile?.inventory.includes(item);
                const itemImages: Record<string, string> = {
                  "Screwdriver": "/images/items/screwdriver.png",
                  "Cabinet Key": "/images/items/cabinet_key.png",
                  "80s Radio": "/images/items/80s_radio.png",
                  "Torn ID Tag": "/images/items/torn_id_tag.png",
                  "Green Alien Slime": "/images/items/green_alien_slime.png",
                };

                return (
                  <div
                    key={item}
                    className={`border rounded-xl p-2 flex flex-col items-center justify-center gap-2 min-h-[95px] transition-all ${isSecured
                        ? "bg-alien-cyan/5 border-alien-cyan/30 text-alien-cyan shadow-[0_0_8px_rgba(0,245,212,0.05)]"
                        : "bg-space-950/20 border-space-900 border-dashed opacity-40"
                      }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-lg border flex items-center justify-center overflow-hidden shrink-0 ${isSecured
                          ? "border-alien-cyan/40 bg-black/40"
                          : "border-gray-800 bg-transparent"
                        }`}
                    >
                      {isSecured ? (
                        <img src={itemImages[item]} alt={item} className="w-full h-full object-cover" />
                      ) : (
                        <Star className="w-4 h-4 text-gray-750" />
                      )}
                    </div>
                    <span
                      className="font-bold leading-normal truncate w-full"
                      title={item}
                    >
                      {item.split(" ").slice(-1)[0]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* My Transmissions */}
          <div className="glass-panel rounded-2xl p-5 border border-white/5">
            <div className="flex items-center gap-2 mb-3 border-b border-space-900 pb-2">
              <ClipboardList className="w-4 h-4 text-neon-pink" />
              <span className="text-white font-righteous text-sm tracking-wider uppercase">
                My Logged Transmissions ({userPosts.length})
              </span>
            </div>

            {userPosts.length === 0 ? (
              <div className="py-6 text-center text-[10px] text-gray-500 font-mono italic">
                You haven&apos;t transmitted any reports to the public feed yet.
              </div>
            ) : (
              <div className="flex flex-col gap-3 max-h-[180px] overflow-y-auto pr-1">
                {userPosts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-space-950/80 border border-space-900 rounded-xl p-3 flex flex-col gap-1.5 font-mono text-[10px]"
                  >
                    <div className="flex justify-between items-center border-b border-space-950 pb-1.5 text-gray-500 text-[9px]">
                      <span
                        className={
                          post.category === "scenario"
                            ? "text-neon-purple font-bold"
                            : "text-alien-cyan font-bold"
                        }
                      >
                        {post.category.toUpperCase()}
                      </span>
                      <span>Votes: {post.votes.toLocaleString()}</span>
                    </div>
                    <p className="text-[10px] text-gray-300 font-sans leading-relaxed line-clamp-2">
                      {post.text}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Wallet Connect Modal */}
      <WalletConnectModal
        isOpen={showWalletModal}
        onClose={() => setShowWalletModal(false)}
        onSuccess={() => {
          setShowWalletModal(false);
          loadProfileData();
        }}
        reason="episode2"
      />
    </div>
  );
}
