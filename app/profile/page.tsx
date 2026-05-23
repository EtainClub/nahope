"use client";

import { useState, useEffect } from "react";
import { database, UserProfile, CommunityPost } from "../../lib/firebase";
import { Wallet, Calendar, ShieldCheck, ClipboardList, PenTool, Award, Star } from "lucide-react";

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [userPosts, setUserPosts] = useState<CommunityPost[]>([]);
  const [editAddress, setEditAddress] = useState("");
  const [editBalance, setEditBalance] = useState<number>(25000);
  const [activeWallet, setActiveWallet] = useState("");

  const loadProfileData = async () => {
    if (typeof window === "undefined") return;
    const wallet = localStorage.getItem("active_wallet_address") || "Hopo...7XzP";
    setActiveWallet(wallet);
    
    const data = await database.getUserProfile(wallet);
    setProfile(data);
    setEditAddress(data.solanaAddress);
    setEditBalance(data.tokenBalance);

    // Get user posts
    const allPosts = await database.getPosts();
    const filter = allPosts.filter((p) => p.authorAddress === wallet);
    setUserPosts(filter);
  };

  useEffect(() => {
    loadProfileData();
  }, []);

  const handleUpdateWallet = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile || !editAddress.trim()) return;

    const newAddress = editAddress.trim();
    const updatedProfile = {
      ...profile,
      solanaAddress: newAddress,
      tokenBalance: Number(editBalance) || 0,
    };

    // Save
    await database.saveUserProfile(newAddress, updatedProfile);
    localStorage.setItem("active_wallet_address", newAddress);
    
    // Notify
    window.dispatchEvent(new Event("profileUpdated"));
    
    loadProfileData();
    alert("Solana Simulator settings updated!");
  };

  const handleCheckIn = async () => {
    if (!profile) return;
    
    // Get current date string YYYY-MM-DD
    const today = new Date().toISOString().split("T")[0];
    
    if (profile.checkInDates.includes(today)) {
      alert("You have already checked in today! Come back tomorrow.");
      return;
    }

    const updatedProfile = {
      ...profile,
      tokenBalance: profile.tokenBalance + 1000,
      checkInDates: [...profile.checkInDates, today],
      lastCheckIn: today,
    };

    await database.saveUserProfile(profile.solanaAddress, updatedProfile);
    window.dispatchEvent(new Event("profileUpdated"));
    loadProfileData();
    alert("🎉 Check-in Successful! Received +1,000 $NAHOPE tokens.");
  };

  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  
  // Calculate mock streak
  const [today, setToday] = useState("");
  useEffect(() => {
    setToday(new Date().toISOString().split("T")[0]);
  }, []);

  const checkedInToday = today ? profile?.checkInDates.includes(today) : false;

  return (
    <div className="flex-1 flex flex-col bg-space-950 py-12 px-4 md:px-8 relative overflow-hidden font-sans select-none">
      
      {/* Background decoration */}
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
        
        {/* Left Column: Solana wallet config & stats (5 cols) */}
        <div className="md:col-span-5 flex flex-col gap-6">
          
          {/* Solana Simulator */}
          <div className="glass-panel rounded-2xl p-5 border border-neon-purple/20 relative shadow-xl flex flex-col justify-between">
            <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-neon-purple" />
            <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-neon-purple" />
            <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-neon-purple" />
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-neon-purple" />

            <div className="flex items-center gap-2 mb-4 border-b border-space-900 pb-2">
              <Wallet className="w-4 h-4 text-alien-cyan" />
              <span className="text-white font-righteous text-sm tracking-wider uppercase">
                SOLANA WALLET SIMULATOR
              </span>
            </div>

            <form onSubmit={handleUpdateWallet} className="flex flex-col gap-4 text-xs font-mono">
              <div className="flex flex-col gap-1.5">
                <span className="text-gray-500 font-bold">MOCK WALLET ADDRESS</span>
                <input
                  type="text"
                  required
                  value={editAddress}
                  onChange={(e) => setEditAddress(e.target.value)}
                  className="bg-space-950 border border-space-850 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-neon-purple/40 font-mono text-[11px]"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-gray-500 font-bold">MOCK $NAHOPE BALANCE</span>
                <div className="flex gap-2 items-center">
                  <input
                    type="number"
                    required
                    value={editBalance}
                    onChange={(e) => setEditBalance(Number(e.target.value))}
                    className="bg-space-950 border border-space-850 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-neon-purple/40 font-mono text-[11px] flex-1"
                  />
                  <span className="text-[10px] text-alien-cyan font-bold">TOKENS</span>
                </div>
                <p className="text-[9px] text-gray-500 leading-normal">
                  💡 *Set balance &gt;= 5,000 $NAHOPE to unlock secret dialogue options in the Episode Game!*
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-space-900 border border-neon-purple/40 hover:bg-space-850 text-white font-bold py-2 rounded-xl text-[10px] tracking-wider transition-colors shadow-[0_0_10px_rgba(216,0,255,0.1)] cursor-pointer"
              >
                APPLY SIMULATOR SETTINGS
              </button>
            </form>
          </div>

          {/* User profile Stats summary */}
          <div className="glass-panel rounded-2xl p-5 border border-white/5 relative flex flex-col justify-between">
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="w-4 h-4 text-neon-pink" />
              <span className="text-white font-righteous text-sm tracking-wider uppercase">
                CLEARANCE SUMMARY
              </span>
            </div>

            <div className="flex flex-col gap-2.5 font-mono text-[10px] leading-relaxed">
              <div className="flex justify-between border-b border-space-900 pb-1.5">
                <span className="text-gray-500">ACTIVE ACCOUNT:</span>
                <span className="text-white font-bold">{activeWallet.slice(0, 8)}...{activeWallet.slice(-8)}</span>
              </div>
              <div className="flex justify-between border-b border-space-900 pb-1.5">
                <span className="text-gray-500">LIQUID $NAHOPE:</span>
                <span className="text-alien-cyan font-bold">{profile?.tokenBalance.toLocaleString()} TOKENS</span>
              </div>
              <div className="flex justify-between border-b border-space-900 pb-1.5">
                <span className="text-gray-500">SECURED GEAR ITEMS:</span>
                <span className="text-neon-pink font-bold">{profile?.inventory.length || 0} / 5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">CHECK-IN STREAK:</span>
                <span className="text-neon-purple font-bold">{profile?.checkInDates.length || 0} DAYS</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Check-in, Inventory, and Posts (7 cols) */}
        <div className="md:col-span-7 flex flex-col gap-6">
          
          {/* Daily Check-in */}
          <div className="glass-panel rounded-2xl p-5 border border-white/5 relative shadow-xl">
            <div className="flex justify-between items-center mb-4 border-b border-space-900 pb-2">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-neon-purple animate-pulse" />
                <span className="text-white font-righteous text-sm tracking-wider uppercase">
                  DAILY PROTOCOL CHECK-IN
                </span>
              </div>
              <span className="text-[10px] font-mono text-neon-purple font-bold uppercase">
                STREAK: {profile?.checkInDates.length || 0} DAYS
              </span>
            </div>

            <div className="flex flex-col gap-4">
              <p className="text-[11px] text-gray-400 font-sans leading-relaxed">
                Log your biometric coordinates daily to help decrypt signals. 
                Each check-in awards you **1,000 $NAHOPE** to clear authorization gates in the game.
              </p>

              {/* 7-Day Streaks visual */}
              <div className="grid grid-cols-7 gap-2 text-center text-[10px] font-mono">
                {weekDays.map((day, idx) => {
                  const hasChecked = profile && profile.checkInDates.length > idx;
                  return (
                    <div
                      key={day}
                      className={`rounded-xl p-2 border flex flex-col gap-1.5 items-center justify-between ${
                        hasChecked
                          ? "bg-neon-purple/10 border-neon-purple text-neon-purple shadow-[0_0_8px_rgba(216,0,255,0.1)]"
                          : "bg-space-950/60 border-space-850 text-gray-500"
                      }`}
                    >
                      <span>{day}</span>
                      <div
                        className={`w-4 h-4 rounded-full flex items-center justify-center border text-[8px] font-bold ${
                          hasChecked
                            ? "bg-neon-purple text-white border-neon-purple"
                            : "bg-transparent border-gray-700"
                        }`}
                      >
                        {hasChecked ? "✓" : idx + 1}
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={handleCheckIn}
                disabled={checkedInToday}
                className={`w-full py-3.5 rounded-xl text-xs font-bold font-righteous tracking-widest transition-all ${
                  checkedInToday
                    ? "bg-space-900/60 border border-space-850 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-neon-purple to-alien-cyan text-white hover:scale-[1.01] shadow-[0_0_15px_rgba(216,0,255,0.2)] border border-white/10 cursor-pointer"
                }`}
              >
                {checkedInToday ? "PROTOCOL CHECKED IN FOR TODAY" : "INITIALIZE PROTOCOL CHECK-IN (+1,000 $NAHOPE)"}
              </button>
            </div>
          </div>

          {/* Inventory status grid */}
          <div className="glass-panel rounded-2xl p-5 border border-white/5">
            <div className="flex items-center gap-2 mb-4 border-b border-space-900 pb-2">
              <Award className="w-4 h-4 text-alien-cyan" />
              <span className="text-white font-righteous text-sm tracking-wider uppercase">
                GEAR SECURED LIST
              </span>
            </div>

            <div className="grid grid-cols-5 gap-2 font-mono text-[9px] text-center">
              {["Screwdriver", "Cabinet Key", "80s Radio", "Torn ID Tag", "Green Alien Slime"].map((item) => {
                const isSecured = profile?.inventory.includes(item);
                return (
                  <div
                    key={item}
                    className={`border rounded-xl p-2.5 flex flex-col items-center justify-center gap-2 min-h-[75px] transition-all ${
                      isSecured
                        ? "bg-alien-cyan/5 border-alien-cyan/30 text-alien-cyan shadow-[0_0_8px_rgba(0,245,212,0.05)]"
                        : "bg-space-950/20 border-space-900 border-dashed opacity-40"
                    }`}
                  >
                    <div
                      className={`p-1.5 rounded-lg border flex items-center justify-center ${
                        isSecured ? "bg-alien-cyan/10 border-alien-cyan" : "bg-transparent border-gray-700"
                      }`}
                    >
                      <Star className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-bold leading-normal truncate w-full" title={item}>
                      {item.split(" ").slice(-1)[0]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* User's posts list */}
          <div className="glass-panel rounded-2xl p-5 border border-white/5">
            <div className="flex items-center gap-2 mb-3 border-b border-space-900 pb-2">
              <ClipboardList className="w-4 h-4 text-neon-pink" />
              <span className="text-white font-righteous text-sm tracking-wider uppercase">
                MY LOGGED TRANSMISSIONS ({userPosts.length})
              </span>
            </div>

            {userPosts.length === 0 ? (
              <div className="py-6 text-center text-[10px] text-gray-500 font-mono italic">
                You haven&apos;t transmitted any reports to the public feed yet.
              </div>
            ) : (
              <div className="flex flex-col gap-3 max-h-[180px] overflow-y-auto pr-1">
                {userPosts.map((post) => (
                  <div key={post.id} className="bg-space-950/80 border border-space-900 rounded-xl p-3 flex flex-col gap-1.5 font-mono text-[10px]">
                    <div className="flex justify-between items-center border-b border-space-950 pb-1.5 text-gray-500 text-[9px]">
                      <span className={post.category === "scenario" ? "text-neon-purple font-bold" : "text-alien-cyan font-bold"}>
                        {post.category.toUpperCase()}
                      </span>
                      <span>Votes: {post.votes.toLocaleString()}</span>
                    </div>
                    <p className="text-[10px] text-gray-300 font-sans leading-relaxed truncate-2-lines">
                      {post.text}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
