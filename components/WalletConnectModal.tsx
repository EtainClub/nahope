"use client";

import { useState } from "react";
import Image from "next/image";
import { useWallet } from "@solana/wallet-adapter-react";
import type { WalletName } from "@solana/wallet-adapter-base";
import { X, Wallet, AlertCircle, Loader2 } from "lucide-react";
import { connectWalletAndAuth, database } from "../lib/firebase";
import { useLanguage } from "../lib/i18n";

const MOCK_ADDRESS = "Hopo...7XzP";

const REASON_MESSAGES: Record<string, { title: string; desc: string; titleKo: string; descKo: string }> = {
  community: {
    title: "Wallet Required",
    desc: "Connecting a Solana wallet is required to post a transmission. Your post will be linked to your real wallet address.",
    titleKo: "지갑 연결 필요",
    descKo: "전송 기록을 게시하려면 Solana 지갑 연결이 필요합니다. 게시물은 실제 지갑 주소와 연결됩니다.",
  },
  episode2: {
    title: "Optional Wallet Connection",
    desc: "Episode 2 is open without a wallet. Connect only to attach progress and inventory to your Solana profile.",
    titleKo: "선택적 지갑 연결",
    descKo: "에피소드 2는 지갑 없이 플레이할 수 있습니다. 진행 상황과 인벤토리를 Solana 프로필에 연결하려는 경우에만 지갑을 연결하세요.",
  },
  episode3: {
    title: "Optional Wallet Connection",
    desc: "Episode access depends only on prior episode completion. Connect a wallet only to attach progress to your profile.",
    titleKo: "선택적 지갑 연결",
    descKo: "에피소드 접근에는 직전 에피소드 클리어 기록만 필요합니다. 진행 상황을 프로필에 연결하려는 경우에만 지갑을 연결하세요.",
  },
  episode4: {
    title: "Optional Wallet Connection",
    desc: "Episode access depends only on prior episode completion. Connect a wallet only to attach progress to your profile.",
    titleKo: "선택적 지갑 연결",
    descKo: "에피소드 접근에는 직전 에피소드 클리어 기록만 필요합니다. 진행 상황을 프로필에 연결하려는 경우에만 지갑을 연결하세요.",
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
  const { language, tr } = useLanguage();
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  if (!isOpen) return null;

  const msg = REASON_MESSAGES[reason] ?? REASON_MESSAGES.community;

  const handleSelectWallet = async (walletName: string) => {
    setError(null);
    try {
      select(walletName as WalletName);
      await connect();
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : tr("지갑 연결에 실패했습니다.", "Failed to connect wallet."));
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
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : tr("인증에 실패했습니다.", "Authentication failed."));
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
      <div className="panel panel-bracket relative z-10 w-full max-w-sm p-6" style={{ boxShadow: "var(--glow-primary)" }}>
        <span className="br-bl" /><span className="br-br" />
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <Wallet className="w-4 h-4" style={{ color: "var(--acc-primary)" }} />
            <span className="font-mono text-xs uppercase tracking-widest" style={{ color: "var(--acc-primary)" }}>
              {language === "ko" ? msg.titleKo : msg.title}
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
          {language === "ko" ? msg.descKo : msg.desc}
        </p>

        {/* If wallet already connected, show finalize button */}
        {publicKey ? (
          <div className="space-y-3">
            <div className="px-4 py-3 font-mono text-xs" style={{ background: "var(--bg-1)", border: "1px solid color-mix(in srgb, var(--acc-primary) 30%, transparent)", color: "var(--acc-primary)" }}>
              {tr("연결됨", "Connected")}: {publicKey.toBase58().slice(0, 4)}...{publicKey.toBase58().slice(-4)}
            </div>
            <button
              onClick={handleFinalize}
              disabled={isConnecting}
              className="w-full font-mono text-xs uppercase tracking-widest px-4 py-3 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              style={{ background: "color-mix(in srgb, var(--acc-primary) 10%, transparent)", border: "1px solid color-mix(in srgb, var(--acc-primary) 40%, transparent)", color: "var(--acc-primary)" }}
            >
              {isConnecting ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : null}
              {isConnecting ? tr("처리 중…", "Processing...") : tr("계속", "Continue")}
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
                  className="w-full flex items-center gap-3 px-4 py-3 transition-all disabled:opacity-50"
                  style={{ background: "var(--bg-1)", border: "1px solid var(--line-bright)" }}
                >
                  {wallet.adapter.icon && (
                    <Image
                      src={wallet.adapter.icon}
                      alt={wallet.adapter.name}
                      width={20}
                      height={20}
                      unoptimized
                      className="w-5 h-5 rounded"
                    />
                  )}
                  <span className="font-mono text-xs text-white">
                    {wallet.adapter.name}
                  </span>
                  <span className="ml-auto font-mono uppercase" style={{ fontSize: 10, color: "var(--acc-primary)" }}>
                    {tr("감지됨", "Detected")}
                  </span>
                </button>
              ))
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-500 text-xs font-mono mb-3">
                  {tr("감지된 지갑이 없습니다.", "No wallets detected.")}
                </p>
                {notDetectedWallets.slice(0, 2).map((wallet) => (
                  <a
                    key={wallet.adapter.name}
                    href={wallet.adapter.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 transition-all mb-2 w-full"
                  style={{ background: "var(--bg-1)", border: "1px solid var(--line-bright)" }}
                  >
                    {wallet.adapter.icon && (
                      <Image
                        src={wallet.adapter.icon}
                        alt={wallet.adapter.name}
                        width={20}
                        height={20}
                        unoptimized
                        className="w-5 h-5 rounded"
                      />
                    )}
                    <span className="font-mono text-xs text-gray-400">
                      {tr("설치", "Install")} {wallet.adapter.name} →
                    </span>
                  </a>
                ))}
              </div>
            )}

            {isConnecting && (
              <div className="flex items-center justify-center gap-2 py-2 text-xs font-mono text-gray-400">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                {tr("연결 중…", "Connecting...")}
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
          {tr("에피소드 1은 지갑 없이 무료로 플레이할 수 있습니다.", "Episode 1 is free to play — no wallet required.")}
        </p>
      </div>
    </div>
  );
}
