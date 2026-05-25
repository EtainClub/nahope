"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Home, Film, Gamepad2, Users, User, Wallet, Settings, BookOpen, HelpCircle } from "lucide-react";
import { database, UserProfile } from "../lib/firebase";
import PaletteSwitcher from "./PaletteSwitcher";
import packageJson from "../package.json";

// Inline RadarDial SVG ornament
function RadarDial({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" style={{ display: "block", flexShrink: 0 }}>
      <circle cx="18" cy="18" r="16" stroke="var(--line-bright)" strokeWidth="1" />
      <circle cx="18" cy="18" r="10" stroke="var(--line)" strokeWidth="0.8" />
      <circle cx="18" cy="18" r="4"  stroke="var(--acc-primary)" strokeWidth="0.8" opacity="0.6" />
      <line x1="18" y1="2"  x2="18" y2="8"  stroke="var(--line-bright)" strokeWidth="0.8" />
      <line x1="18" y1="28" x2="18" y2="34" stroke="var(--line-bright)" strokeWidth="0.8" />
      <line x1="2"  y1="18" x2="8"  y2="18" stroke="var(--line-bright)" strokeWidth="0.8" />
      <line x1="28" y1="18" x2="34" y2="18" stroke="var(--line-bright)" strokeWidth="0.8" />
      <line x1="18" y1="18" x2="28" y2="10" stroke="var(--acc-primary)" strokeWidth="0.8" opacity="0.7"
        style={{ transformOrigin: "18px 18px", animation: "orbit 4s linear infinite" }} />
      <circle cx="18" cy="18" r="1.5" fill="var(--acc-primary)" />
    </svg>
  );
}

function SettingsMenu({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  // Close after route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const items: Array<{ href: string; label: string; icon: React.ComponentType<{ size?: number }> }> = [
    { href: "/guide", label: "FIELD GUIDE", icon: BookOpen },
    { href: "/guide#troubleshoot", label: "TROUBLESHOOTING", icon: HelpCircle },
  ];

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        aria-label="Settings menu"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 32,
          height: 32,
          background: open ? "color-mix(in srgb, var(--acc-primary) 10%, transparent)" : "var(--bg-2)",
          border: `1px solid ${open ? "var(--acc-primary)" : "var(--line-bright)"}`,
          color: open ? "var(--acc-primary)" : "var(--ink-2)",
          cursor: "pointer",
          transition: "all 0.15s",
        }}
      >
        <Settings size={14} />
      </button>
      {open && (
        <div
          role="menu"
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            right: 0,
            minWidth: 200,
            background: "var(--bg-1)",
            border: "1px solid var(--acc-primary)",
            boxShadow: "var(--glow-primary)",
            zIndex: 100,
            padding: 4,
          }}
        >
          <div
            style={{
              padding: "6px 10px 8px",
              fontFamily: "var(--font-mono)",
              fontSize: 9,
              letterSpacing: "0.2em",
              color: "var(--acc-primary)",
              textTransform: "uppercase",
              borderBottom: "1px dashed var(--line)",
            }}
          >
            // SETTINGS · MENU
          </div>
          {items.map((it) => {
            const Icon = it.icon;
            return (
              <Link
                key={it.href}
                href={it.href}
                role="menuitem"
                onClick={() => setOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 10px",
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  color: "var(--ink-1)",
                  textDecoration: "none",
                  textTransform: "uppercase",
                  transition: "all 0.12s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "color-mix(in srgb, var(--acc-primary) 10%, transparent)";
                  e.currentTarget.style.color = "var(--acc-primary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "var(--ink-1)";
                }}
              >
                <Icon size={12} />
                {it.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function Navigation() {
  const pathname = usePathname();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  const syncProfile = () => {
    if (typeof window === "undefined") return;
    const activeAddress = localStorage.getItem("active_wallet_address") || "Hopo...7XzP";
    const data = database.getUserProfile(activeAddress);
    setProfile(data);
  };

  useEffect(() => {
    syncProfile();
    const handleStorageChange = () => syncProfile();
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("profileUpdated", handleStorageChange);
    const interval = setInterval(syncProfile, 1000);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("profileUpdated", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const navItems = [
    { name: "HOME",         href: "/",          icon: Home },
    { name: "MOVIE INTRO",  href: "/intro",     icon: Film },
    { name: "EPISODE GAME", href: "/game",       icon: Gamepad2 },
    { name: "COMMUNITY",    href: "/community",  icon: Users },
    { name: "PROFILE",      href: "/profile",    icon: User },
  ];

  const walletAddr = profile?.solanaAddress
    ? `${profile.solanaAddress.slice(0, 4)}…${profile.solanaAddress.slice(-4)}`
    : "----…----";
  const balance = profile?.tokenBalance?.toLocaleString() ?? "0";

  return (
    <>
      {/* ── DESKTOP TOP NAV ──────────────────────────────────────────────── */}
      <header
        data-global-top-header
        style={{
          position: "sticky", top: 0, zIndex: 50,
          width: "100%",
          background: "var(--bg-1)",
          borderBottom: "1px solid var(--line)",
          boxShadow: "0 1px 0 rgba(255,255,255,0.02)",
        }}
        className="hidden md:flex items-center justify-between px-6 py-0"
      >

        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", flexShrink: 0 }}>
          <span
            className="glitch-text display"
            data-text="HOPE"
            style={{
              fontSize: 22,
              letterSpacing: "-0.02em",
              color: "var(--ink-0)",
              lineHeight: 1,
            }}
          >
            HOPE
          </span>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <span className="eyebrow" style={{ fontSize: 9, color: "var(--acc-primary)" }}>
              // OMEGA · SYS
            </span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 8, color: "var(--ink-3)", letterSpacing: "0.16em" }}>
              v{packageJson.version} · BUILD ε
            </span>
          </div>
        </Link>

        {/* Nav tabs */}
        <nav style={{ display: "flex", gap: 0, alignItems: "stretch" }}>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 7,
                  padding: "14px 12px",
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  textTransform: "uppercase" as const,
                  letterSpacing: "0.2em",
                  color: isActive ? "var(--acc-primary)" : "var(--ink-2)",
                  borderBottom: isActive ? "1px solid var(--acc-primary)" : "1px solid transparent",
                  textShadow: isActive ? "0 0 12px var(--acc-primary)" : "none",
                  textDecoration: "none",
                  transition: "all 0.15s",
                  whiteSpace: "nowrap" as const,
                }}
              >
                <Icon size={11} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Right cluster: PaletteSwitcher + Settings + RadarDial + Wallet */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
          <PaletteSwitcher />
          <SettingsMenu pathname={pathname} />
          <RadarDial size={28} />
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "7px 12px",
            border: "1px solid var(--line-bright)",
            background: "var(--bg-2)",
            fontFamily: "var(--font-mono)", fontSize: 10,
            letterSpacing: "0.14em",
          }}>
            <Wallet size={11} style={{ color: "var(--ink-2)", flexShrink: 0 }} />
            <span style={{ color: "var(--ink-2)" }}>WALLET</span>
            <span style={{ color: "var(--ink-0)" }}>{walletAddr}</span>
            <span style={{ color: "var(--ink-4)" }}>·</span>
            <span style={{ color: "var(--acc-primary)" }}>{balance} $NAHOPE</span>
          </div>
        </div>
      </header>

      {/* ── MOBILE TOP BAR ───────────────────────────────────────────────── */}
      <div data-global-top-bar className="md:hidden" style={{
        width: "100%",
        background: "var(--bg-1)",
        borderBottom: "1px solid var(--line)",
        padding: "10px 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "relative", zIndex: 30,
      }}>
        <Link href="/" style={{ display: "flex", flexDirection: "column", gap: 2, textDecoration: "none" }}>
          <span
            className="glitch-text display"
            data-text="HOPE"
            style={{ fontSize: 18, letterSpacing: "-0.02em", color: "var(--ink-0)" }}
          >
            HOPE
          </span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 8, color: "var(--ink-3)", letterSpacing: "0.16em" }}>
            v{packageJson.version}
          </span>
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <PaletteSwitcher />
          <SettingsMenu pathname={pathname} />
          <div style={{
            display: "flex", alignItems: "center", gap: 6,
            border: "1px solid var(--line-bright)", background: "var(--bg-2)",
            padding: "4px 8px",
            fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.1em",
          }}>
            <Wallet size={10} style={{ color: "var(--ink-2)" }} />
            <span style={{ color: "var(--acc-primary)" }}>{balance} $NAHOPE</span>
          </div>
        </div>
      </div>

      {/* ── MOBILE BOTTOM NAV ────────────────────────────────────────────── */}
      <nav data-global-bottom-nav className="md:hidden" style={{
        position: "fixed", bottom: 12, left: 12, right: 12,
        zIndex: 50,
        background: "var(--bg-1)",
        border: "1px solid var(--line-bright)",
        padding: "10px 16px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
                gap: 4,
                color: isActive ? "var(--acc-primary)" : "var(--ink-3)",
                textDecoration: "none",
                position: "relative",
              }}
            >
              <div style={{
                padding: 7,
                border: `1px solid ${isActive ? "var(--acc-primary)" : "transparent"}`,
                background: isActive ? "color-mix(in srgb, var(--acc-primary) 8%, transparent)" : "transparent",
              }}>
                <Icon size={16} />
              </div>
              <span style={{
                fontFamily: "var(--font-mono)",
                fontSize: 7,
                textTransform: "uppercase" as const,
                letterSpacing: "0.16em",
              }}>
                {item.name.split(" ")[0]}
              </span>
              {isActive && (
                <span style={{
                  position: "absolute", top: -12,
                  width: 4, height: 4, borderRadius: "50%",
                  background: "var(--acc-primary)",
                  boxShadow: "0 0 8px var(--acc-primary)",
                }} />
              )}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
