"use client";

import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { X, Wallet, AlertCircle, Loader2 } from "lucide-react";
import { connectWalletAndAuth, database } from "../lib/firebase";

const MOCK_ADDRESS = "Hopo...7XzP";

const REASON_MESSAGES: Record<string, { title: string; desc: string }> = {
  community: {
    title: "Wallet Required",
    desc: "Connecting a Solana wallet is required to post a transmission. Your post will be linked to your real wallet address.",
  },
  episode2: {
    title: "Episode 2 Access",
    desc: "Episode 2 requires a connected Solana wallet and a minimum balance of 5,000 $NAHOPE.",
  },
  episode3: {
    title: "Episode 3 Access",
    desc: "Episode 3 requires a minimum balance of 20,000 $NAHOPE.",
  },
  episode4: {
    title: "Episode 4 Access",
    desc: "Episode 4 is restricted to Elite Hopo Port Defenders holding 100,000 $NAHOPE.",
  },
};

interface WalletConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (walletAddress: string) => void;
  reason: "community" | "episode2" | "episode3" | "episode4";
}

export default function WalletConnectModal({
  isOpen,
  onClose,
  onSuccess,
  reason,
}: WalletConnectModalProps) {
  const { wallets, select, connect, connecting, publicKey } = useWallet();
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  if (!isOpen) return null;

  const msg = REASON_MESSAGES[reason] ?? REASON_MESSAGES.community;

  const handleSelectWallet = async (walletName: string) => {
    setError(null);
    try {
      select(walletName as any);
      await connect();
    } catch (e: any) {
      setError(e?.message ?? "Failed to connect wallet.");
    }
  };

  const handleFinalize = async () => {
    if (!publicKey) return;
    setIsAuthenticating(true);
    setError(null);
    try {
      const pubkeyStr = publicKey.toBase58();

      const uid = await connectWalletAndAuth();

      const mockProfile =
        typeof window !== "undefined"
          ? (() => {
              try {
                return JSON.parse(
                  localStorage.getItem(`profile_${MOCK_ADDRESS}`) ?? "null"
                );
              } catch {
                return null;
              }
            })()
          : null;

      const existingLocal =
        typeof window !== "undefined"
          ? (() => {
              try {
                return JSON.parse(
                  localStorage.getItem(`profile_${pubkeyStr}`) ?? "null"
                );
              } catch {
                return null;
              }
            })()
          : null;

      const realProfile = database.getUserProfile(pubkeyStr);
      const merged = {
        ...realProfile,
        // New real wallets start at 0; chain fetch overwrites with actual balance.
        // Existing wallets (existingLocal present) keep their stored balance.
        tokenBalance: existingLocal?.tokenBalance ?? 0,
        inventory:
          realProfile.inventory.length > 0
            ? realProfile.inventory
            : mockProfile?.inventory ?? [],
        checkInDates: [
          ...new Set([
            ...realProfile.checkInDates,
            ...(mockProfile?.checkInDates ?? []),
          ]),
        ],
        ...(uid ? { firebaseUid: uid } : {}),
        createdAt: realProfile.createdAt ?? Date.now(),
        lastSeen: Date.now(),
      };

      await database.saveUserProfile(pubkeyStr, merged);

      if (mockProfile && typeof window !== "undefined") {
        localStorage.removeItem(`profile_${MOCK_ADDRESS}`);
      }

      window.dispatchEvent(new Event("profileUpdated"));
      onSuccess(pubkeyStr);
      onClose();
    } catch (e: any) {
      setError(e?.message ?? "Authentication failed.");
    } finally {
      setIsAuthenticating(false);
    }
  };

  const availableWallets = wallets.filter(
    (w) => w.readyState === "Installed" || w.readyState === "Loadable"
  );
  const notDetectedWallets = wallets.filter(
    (w) => w.readyState === "NotDetected"
  );

  const isConnecting = connecting || isAuthenticating;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-sm glass-panel border border-neon-pink/30 rounded-2xl p-6 shadow-[0_0_40px_rgba(255,0,127,0.15)]">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <Wallet className="w-4 h-4 text-neon-pink" />
            <span className="font-mono text-xs uppercase tracking-widest text-neon-pink">
              {msg.title}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-gray-400 text-xs font-mono mb-5 leading-relaxed">
          {msg.desc}
        </p>

        {/* If wallet already connected, show finalize button */}
        {publicKey ? (
          <div className="space-y-3">
            <div className="bg-space-900 border border-neon-green/20 rounded-xl px-4 py-3 text-xs font-mono text-neon-green">
              Connected: {publicKey.toBase58().slice(0, 4)}...{publicKey.toBase58().slice(-4)}
            </div>
            <button
              onClick={handleFinalize}
              disabled={isConnecting}
              className="w-full bg-neon-pink/10 border border-neon-pink/40 hover:bg-neon-pink/20 text-neon-pink font-mono text-xs uppercase tracking-widest px-4 py-3 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isConnecting ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : null}
              {isConnecting ? "Processing..." : "Continue"}
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            {availableWallets.length > 0 ? (
              availableWallets.map((wallet) => (
                <button
                  key={wallet.adapter.name}
                  onClick={() => handleSelectWallet(wallet.adapter.name)}
                  disabled={isConnecting}
                  className="w-full flex items-center gap-3 bg-space-900 hover:bg-space-800 border border-space-700 hover:border-neon-pink/30 rounded-xl px-4 py-3 transition-all disabled:opacity-50"
                >
                  {wallet.adapter.icon && (
                    <img
                      src={wallet.adapter.icon}
                      alt={wallet.adapter.name}
                      className="w-5 h-5 rounded"
                    />
                  )}
                  <span className="font-mono text-xs text-white">
                    {wallet.adapter.name}
                  </span>
                  <span className="ml-auto text-[10px] text-neon-green font-mono uppercase">
                    Detected
                  </span>
                </button>
              ))
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-500 text-xs font-mono mb-3">
                  No wallets detected.
                </p>
                {notDetectedWallets.slice(0, 2).map((wallet) => (
                  <a
                    key={wallet.adapter.name}
                    href={wallet.adapter.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-space-900 border border-space-700 hover:border-neon-pink/20 rounded-xl px-4 py-3 transition-all mb-2 w-full"
                  >
                    {wallet.adapter.icon && (
                      <img
                        src={wallet.adapter.icon}
                        alt={wallet.adapter.name}
                        className="w-5 h-5 rounded"
                      />
                    )}
                    <span className="font-mono text-xs text-gray-400">
                      Install {wallet.adapter.name} →
                    </span>
                  </a>
                ))}
              </div>
            )}

            {isConnecting && (
              <div className="flex items-center justify-center gap-2 py-2 text-xs font-mono text-gray-400">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Connecting...
              </div>
            )}
          </div>
        )}

        {error && (
          <div className="mt-3 flex items-start gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2">
            <AlertCircle className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
            <p className="text-red-400 text-xs font-mono">{error}</p>
          </div>
        )}

        <p className="mt-4 text-center text-[10px] text-gray-600 font-mono">
          Episode 1 is free to play — no wallet required.
        </p>
      </div>
    </div>
  );
}
