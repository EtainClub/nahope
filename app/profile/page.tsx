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
import { useLanguage } from "../../lib/i18n";

const NAHOPE_MINT = process.env.NEXT_PUBLIC_NAHOPE_MINT || "";

export default function ProfilePage() {
  const { connected, publicKey, disconnect } = useWallet();
  const { tr } = useLanguage();

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
      ? tr("온체인 $NAHOPE", "ON-CHAIN $NAHOPE")
      : connected
        ? tr("$NAHOPE (저장값)", "$NAHOPE (STORED)")
        : tr("$NAHOPE (시뮬레이션)", "$NAHOPE (SIMULATION)");

  const isSimulation = !connected;

  return (
    <div className="flex-1 flex flex-col bg-space-950 py-12 px-4 md:px-8 relative overflow-hidden font-sans select-none">
      <div className="absolute top-1/4 right-1/4 w-[350px] h-[350px] rounded-full blur-[110px] pointer-events-none" style={{ background: "color-mix(in srgb, var(--acc-violet) 5%, transparent)" }} />
      <div className="absolute bottom-1/4 left-1/3 w-[300px] h-[300px] rounded-full blur-[100px] pointer-events-none" style={{ background: "color-mix(in srgb, var(--acc-primary) 4%, transparent)" }} />

      {/* Header */}
      <div className="w-full max-w-4xl mx-auto text-center mb-12 relative z-10">
        <span className="eyebrow block mb-3" style={{ color: "var(--acc-violet)" }}>
          {tr("// 사용자 신원 프로필 //", "// USER PROFILE IDENT DECK //")}
        </span>
        <h1 className="display text-3xl sm:text-4xl uppercase" style={{ color: "var(--ink-0)" }}>
          {tr("기밀 신상 기록", "CLASSIFIED DOSSIER")}
        </h1>
        <div className="w-24 h-[2px] mx-auto mt-2" style={{ background: "linear-gradient(90deg, var(--acc-violet), var(--acc-cyan))" }} />
      </div>

      <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch relative z-10">

        {/* Left Column */}
        <div className="md:col-span-5 flex flex-col gap-6">

          {/* Wallet Panel */}
          <div className="panel panel-bracket p-5 relative flex flex-col gap-4" style={{ borderColor: "var(--acc-violet)", boxShadow: "var(--glow-violet)" }}>
            <span className="br-bl" /><span className="br-br" />

            <div className="flex items-center gap-2 pb-2" style={{ borderBottom: "1px solid var(--line-bright)" }}>
              <Wallet className="w-4 h-4" style={{ color: "var(--acc-cyan)" }} />
              <span className="display text-sm uppercase" style={{ color: "var(--ink-0)" }}>
                {tr("Solana 지갑", "Solana Wallet")}
              </span>
              {isSimulation && (
                <span className="ml-auto text-[9px] font-mono text-gray-600 border border-space-800 rounded px-1.5 py-0.5 uppercase tracking-wider">
                  {tr("시뮬레이션", "Simulation")}
                </span>
              )}
            </div>

            {connected && publicKey ? (
              /* Connected State */
              <div className="flex flex-col gap-3 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: "var(--acc-primary)", animation: "pulse-glow 1s ease infinite" }} />
                  <span className="font-bold uppercase tracking-widest" style={{ fontSize: 10, color: "var(--acc-primary)" }}>
                    {tr("연결됨", "Connected")}
                  </span>
                </div>

                {/* Address */}
                <div className="px-3 py-2.5 flex items-center justify-between gap-2" style={{ background: "var(--bg-0)", border: "1px solid var(--line-bright)" }}>
                  <span className="text-white text-[11px] truncate">
                    {publicKey.toBase58().slice(0, 6)}...{publicKey.toBase58().slice(-6)}
                  </span>
                  <a
                    href={`https://solscan.io/account/${publicKey.toBase58()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-alien-cyan hover:text-white transition-colors shrink-0"
                    title={tr("Solscan에서 보기", "View on Solscan")}
                  >
                    <LinkIcon className="w-3 h-3" />
                  </a>
                </div>

                {/* Balance */}
                <div className="px-3 py-3 flex items-center justify-between" style={{ background: "var(--bg-0)", border: "1px solid color-mix(in srgb, var(--acc-cyan) 20%, transparent)" }}>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[9px] text-gray-500 uppercase tracking-widest">
                      {balanceLabel}
                    </span>
                    {isFetchingBalance ? (
                      <div className="flex items-center gap-1.5 text-gray-400">
                        <Loader2 className="w-3 h-3 animate-spin" />
                        <span className="text-[11px]">{tr("조회 중…", "Fetching...")}</span>
                      </div>
                    ) : (
                      <span className="font-bold text-base" style={{ color: "var(--acc-cyan)" }}>
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
                      title={tr("잔액 새로고침", "Refresh balance")}
                      className="text-gray-500 hover:text-alien-cyan transition-colors disabled:opacity-40"
                    >
                      <RefreshCw
                        className={`w-3.5 h-3.5 ${isFetchingBalance ? "animate-spin" : ""}`}
                      />
                    </button>
                  )}
                </div>

                {/* Episode access gates */}
                <div className="flex flex-col gap-1.5 p-3" style={{ fontSize: 10, border: "1px solid var(--line)", background: "var(--bg-0)" }}>
                  {[
                    { label: tr("에피소드 2 접근", "EP.2 ACCESS"), req: 5000 },
                    { label: tr("에피소드 3 접근", "EP.3 ACCESS"), req: 20000 },
                    { label: tr("에피소드 4 접근", "EP.4 ACCESS"), req: 100000 },
                  ].map(({ label, req }) => {
                    const granted = displayBalance >= req;
                    return (
                      <div key={label} className="flex justify-between items-center">
                        <span className="text-gray-600 font-bold">{label}</span>
                        <span
                          className="font-bold"
                          style={{ color: granted ? "var(--acc-primary)" : "var(--ink-4)" }}
                        >
                          {granted
                            ? tr("// 허가됨 //", "// GRANTED //")
                            : tr(`${req.toLocaleString()} 필요`, `${req.toLocaleString()} needed`)}
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
                  {tr("지갑 연결 해제", "Disconnect Wallet")}
                </button>
              </div>
            ) : (
              /* Not Connected State */
              <div className="flex flex-col gap-4 font-mono text-xs">
                <p className="text-gray-500 text-[11px] leading-relaxed">
                  {tr("Solana 지갑을 연결해 $NAHOPE 잔액을 확인하고 에피소드 2~4를 해제하며 커뮤니티 피드에 게시하세요.", "Connect your Solana wallet to verify your $NAHOPE balance, unlock Episodes 2–4, and post to the community feed.")}
                </p>
                <p className="text-gray-600 text-[10px]">
                  {tr("에피소드 1은 무료입니다. 현재 다음 모의 잔액으로 시뮬레이션 모드에서 플레이 중입니다: ", "Episode 1 is free — currently playing in simulation mode with a mock balance of ")}
                  <span className="font-bold" style={{ color: "var(--acc-cyan)" }}>
                    {profile?.tokenBalance.toLocaleString()} $NAHOPE
                  </span>
                  .
                </p>
                <button
                  onClick={() => setShowWalletModal(true)}
                  className="w-full flex items-center justify-center gap-2 font-mono font-bold py-3 text-[11px] tracking-widest transition-all cursor-pointer"
                  style={{ background: "var(--acc-primary)", color: "var(--bg-0)", boxShadow: "var(--glow-primary)" }}
                >
                  <Wallet className="w-3.5 h-3.5" />
                  {tr("지갑 연결", "Connect Wallet")}
                </button>
              </div>
            )}
          </div>

          {/* Clearance Summary */}
          <div className="panel panel-bracket p-5 relative flex flex-col justify-between">
            <span className="br-bl" /><span className="br-br" />
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="w-4 h-4" style={{ color: "var(--acc-primary)" }} />
              <span className="display text-sm uppercase" style={{ color: "var(--ink-0)" }}>
                {tr("접근 권한 요약", "Clearance Summary")}
              </span>
            </div>

            <div className="flex flex-col gap-2.5 font-mono text-[10px] leading-relaxed">
              <div className="flex justify-between pb-1.5" style={{ borderBottom: "1px solid var(--line)" }}>
                <span className="text-gray-500">{tr("활성 계정", "ACTIVE ACCOUNT")}:</span>
                <span className="font-bold" style={{ color: "var(--ink-0)" }}>
                  {displayAddress.length > 14
                    ? `${displayAddress.slice(0, 6)}...${displayAddress.slice(-6)}`
                    : displayAddress}
                </span>
              </div>
              <div className="flex justify-between pb-1.5" style={{ borderBottom: "1px solid var(--line)" }}>
                <span className="text-gray-500">{tr("유동 $NAHOPE", "LIQUID $NAHOPE")}:</span>
                <span className="font-bold" style={{ color: "var(--acc-cyan)" }}>
                  {displayBalance.toLocaleString()} {tr("토큰", "TOKENS")}
                </span>
              </div>
              <div className="flex justify-between pb-1.5" style={{ borderBottom: "1px solid var(--line)" }}>
                <span className="text-gray-500">{tr("확보한 엔딩", "ENDINGS SECURED")}:</span>
                <span className="font-bold" style={{ color: "var(--acc-primary)" }}>
                  {profile?.completedEndings?.filter(e => e !== "ep1_clear").length || 0} / 4
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="md:col-span-7 flex flex-col gap-6">

          {/* Inventory Grid */}
          <div className="panel panel-bracket p-5 relative">
            <span className="br-bl" /><span className="br-br" />
            <div className="flex items-center gap-2 mb-4 pb-2" style={{ borderBottom: "1px solid var(--line)" }}>
              <Award className="w-4 h-4" style={{ color: "var(--acc-cyan)" }} />
              <span className="display text-sm uppercase" style={{ color: "var(--ink-0)" }}>
                {tr("클리어 및 엔딩 배지", "Clear & Ending Badges")}
              </span>
            </div>

            <div className="grid grid-cols-5 gap-2 font-mono text-[9px] text-center">
              {[
                { id: "ep1_A", name: tr("엔딩 A", "Ending A"), sub: tr("비극", "Tragedy"), art: "/images/endings/ep1_a.svg" },
                { id: "ep1_B", name: tr("엔딩 B", "Ending B"), sub: tr("체포", "Arrest"), art: "/images/endings/ep1_b.svg" },
                { id: "ep1_C", name: tr("엔딩 C", "Ending C"), sub: tr("목격자", "Witness"), art: "/images/endings/ep1_c.svg" },
                { id: "ep1_D", name: tr("엔딩 D", "Ending D"), sub: tr("배교자", "Apostate"), art: "/images/endings/ep1_d.svg" },
                { id: "ep1_clear", name: tr("에피소드 1 클리어", "Clear Ep.1"), sub: tr("DMZ 클리어", "DMZ Clear"), art: "/images/endings/ep1_clear.svg" },
              ].map((badge) => {
                const isSecured = profile?.completedEndings?.includes(badge.id);

                return (
                  <div
                    key={badge.id}
                    className="border p-2 flex flex-col items-center justify-center gap-2 min-h-[105px] transition-all"
                    style={isSecured ? {
                      background: "color-mix(in srgb, var(--acc-cyan) 5%, transparent)",
                      borderColor: "color-mix(in srgb, var(--acc-cyan) 30%, transparent)",
                      color: "var(--acc-cyan)",
                      boxShadow: "0 0 8px color-mix(in srgb, var(--acc-cyan) 8%, transparent)",
                    } : {
                      background: "color-mix(in srgb, var(--bg-0) 20%, transparent)",
                      borderColor: "var(--line)",
                      borderStyle: "dashed",
                      opacity: 0.35,
                    }}
                  >
                    <div
                      className="w-12 h-12 flex items-center justify-center overflow-hidden shrink-0"
                      style={isSecured ? {
                        border: "1px solid color-mix(in srgb, var(--acc-cyan) 40%, transparent)",
                        background: "rgba(0,0,0,0.4)",
                      } : {
                        border: "1px solid var(--line)",
                        background: "transparent",
                      }}
                    >
                      {isSecured ? (
                        <img src={badge.art} alt={badge.name} className="w-full h-full object-cover" />
                      ) : (
                        <Star className="w-4 h-4 text-gray-700" />
                      )}
                    </div>
                    <div className="flex flex-col w-full truncate">
                      <span className="font-bold leading-normal truncate w-full" title={badge.name}>
                        {badge.name}
                      </span>
                      <span className="text-[7.5px] text-gray-500 leading-normal truncate w-full" title={badge.sub}>
                        {badge.sub}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* My Transmissions */}
          <div className="panel panel-bracket p-5 relative">
            <span className="br-bl" /><span className="br-br" />
            <div className="flex items-center gap-2 mb-3 pb-2" style={{ borderBottom: "1px solid var(--line)" }}>
              <ClipboardList className="w-4 h-4" style={{ color: "var(--acc-primary)" }} />
              <span className="display text-sm uppercase" style={{ color: "var(--ink-0)" }}>
                {tr("내 전송 기록", "My Logged Transmissions")} ({userPosts.length})
              </span>
            </div>

            {userPosts.length === 0 ? (
              <div className="py-6 text-center text-[10px] text-gray-500 font-mono italic">
                {tr("아직 공개 피드에 전송한 보고서가 없습니다.", "You haven't transmitted any reports to the public feed yet.")}
              </div>
            ) : (
              <div className="flex flex-col gap-3 max-h-[180px] overflow-y-auto pr-1">
                {userPosts.map((post) => (
                  <div
                    key={post.id}
                    className="p-3 flex flex-col gap-1.5 font-mono text-[10px]"
                    style={{ background: "var(--bg-0)", border: "1px solid var(--line)" }}
                  >
                    <div className="flex justify-between items-center pb-1.5 text-gray-500 text-[9px]" style={{ borderBottom: "1px solid var(--line)" }}>
                      <span
                        className="font-bold"
                        style={{ color: post.category === "scenario" ? "var(--acc-violet)" : "var(--acc-cyan)" }}
                      >
                        {post.category === "scenario" ? tr("시나리오", "SCENARIO") : tr("인증", "BRAG")}
                      </span>
                      <span>{tr("투표", "Votes")}: {post.votes.toLocaleString()}</span>
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
