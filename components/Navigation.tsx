"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Home, Film, Gamepad2, Users, User, Wallet } from "lucide-react";
import { database, UserProfile } from "../lib/firebase";

export default function Navigation() {
  const pathname = usePathname();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  // Sync profile data
  const syncProfile = async () => {
    if (typeof window === "undefined") return;
    const activeAddress = localStorage.getItem("active_wallet_address") || "Hopo...7XzP";
    const data = await database.getUserProfile(activeAddress);
    setProfile(data);
  };

  useEffect(() => {
    syncProfile();

    // Listen to local storage changes to keep balance and items in sync across pages
    const handleStorageChange = () => {
      syncProfile();
    };

    window.addEventListener("storage", handleStorageChange);
    // Custom event to force update within the same window
    window.addEventListener("profileUpdated", handleStorageChange);

    // Short polling for immediate responsiveness during gameplay
    const interval = setInterval(syncProfile, 1000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("profileUpdated", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Movie Intro", href: "/intro", icon: Film },
    { name: "Episode Game", href: "/game", icon: Gamepad2 },
    { name: "Community", href: "/community", icon: Users },
    { name: "Profile", href: "/profile", icon: User },
  ];

  return (
    <>
      {/* DESKTOP TOP NAVIGATION */}
      <header className="hidden md:flex sticky top-0 z-50 w-full glass-panel border-b border-space-800/80 px-8 py-4 items-center justify-between shadow-[0_4px_30px_rgba(4,1,8,0.7)]">
        {/* Title / Logo */}
        <Link href="/" className="flex items-center gap-1 select-none group">
          <span className="font-righteous text-2xl tracking-widest text-white flex items-center gap-0.5">
            <span className="blur-h chromatic-text inline-block group-hover:scale-105 transition-transform">H</span>
            <span className="blur-o chromatic-text inline-block group-hover:scale-105 transition-transform">O</span>
            <span className="blur-p chromatic-text inline-block group-hover:scale-105 transition-transform">P</span>
            <span className="blur-e chromatic-text inline-block group-hover:scale-105 transition-transform">E</span>
          </span>
          <span className="text-[9px] text-gray-500 font-mono self-end mb-0.5 ml-2 uppercase tracking-widest">
            // OMEGA_SYS
          </span>
        </Link>

        {/* Links */}
        <nav className="flex items-center gap-6">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative font-mono text-xs uppercase tracking-widest px-3 py-2 transition-all flex items-center gap-2 ${
                  isActive
                    ? "text-neon-pink font-bold text-neon-pink"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {item.name}
                {isActive && (
                  <span className="absolute bottom-0 inset-x-3 h-[2px] bg-gradient-to-r from-neon-pink to-neon-purple shadow-[0_0_10px_rgba(255,0,127,0.8)]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Solana Wallet indicator */}
        <div className="flex items-center gap-3 bg-space-950/90 border border-neon-purple/20 px-4 py-2 rounded-xl text-xs font-mono shadow-[0_0_15px_rgba(216,0,255,0.05)]">
          <Wallet className="w-3.5 h-3.5 text-alien-cyan" />
          <span className="text-gray-500">WALLET:</span>
          <span className="text-white font-bold">{profile?.solanaAddress.slice(0, 4)}...{profile?.solanaAddress.slice(-4)}</span>
          <span className="text-gray-700">|</span>
          <span className="text-alien-cyan font-bold">
            {profile?.tokenBalance.toLocaleString()} $NAHOPE
          </span>
        </div>
      </header>

      {/* MOBILE BOTTOM NAVIGATION BAR */}
      <nav className="md:hidden fixed bottom-4 inset-x-4 z-50 glass-panel border border-neon-pink/20 rounded-2xl py-3 px-4 flex justify-between items-center shadow-[0_0_25px_rgba(255,0,127,0.15)] backdrop-blur-md">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center flex-1 relative transition-all ${
                isActive ? "text-neon-pink font-bold" : "text-gray-400 hover:text-gray-200"
              }`}
            >
              <div
                className={`p-2 rounded-xl transition-all duration-300 ${
                  isActive
                    ? "bg-neon-pink/10 border border-neon-pink/20 shadow-[0_0_10px_rgba(255,0,127,0.15)]"
                    : "border border-transparent"
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[8px] font-mono uppercase tracking-wider mt-1 scale-90">
                {item.name.split(" ")[0]}
              </span>
              {isActive && (
                <span className="absolute -top-3 w-1.5 h-1.5 bg-neon-pink rounded-full shadow-[0_0_8px_rgba(255,0,127,0.8)]" />
              )}
            </Link>
          );
        })}
      </nav>
      {/* Mobile top-bar layout helper to show wallet status on mobile */}
      <div className="md:hidden w-full bg-space-950 border-b border-space-900 px-4 py-3 flex items-center justify-between relative z-30">
        <Link href="/" className="font-righteous text-lg tracking-widest text-white">
          <span className="blur-h chromatic-text inline-block">H</span>
          <span className="blur-o chromatic-text inline-block">O</span>
          <span className="blur-p chromatic-text inline-block">P</span>
          <span className="blur-e chromatic-text inline-block">E</span>
        </Link>
        <div className="flex items-center gap-1.5 bg-space-900 border border-neon-purple/20 px-2.5 py-1 rounded-lg text-[9px] font-mono">
          <Wallet className="w-2.5 h-2.5 text-alien-cyan" />
          <span className="text-alien-cyan font-bold">
            {profile ? profile.tokenBalance.toLocaleString() : "25,000"} $NAHOPE
          </span>
        </div>
      </div>
    </>
  );
}
