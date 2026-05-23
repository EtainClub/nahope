"use client";

import { useState, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { database, CommunityPost, UserProfile } from "../../lib/firebase";
import WalletConnectModal from "../../components/WalletConnectModal";
import { MessageSquare, Flame, Award, Plus, X, ArrowUp, Tag } from "lucide-react";

export default function CommunityPage() {
  const { connected } = useWallet();
  const [activeCategory, setActiveCategory] = useState<"all" | "scenario" | "brag">("all");
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);

  // Form states
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState<"scenario" | "brag">("scenario");
  const [text, setText] = useState("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  // Load profile and posts
  const loadData = async () => {
    if (typeof window === "undefined") return;
    const wallet = localStorage.getItem("active_wallet_address") || "Hopo...7XzP";
    const userProfile = database.getUserProfile(wallet);
    setProfile(userProfile);

    const communityPosts = await database.getPosts();
    setPosts(communityPosts);
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleVote = async (postId: string) => {
    if (!profile) return;
    const { votes, voted } = await database.votePost(postId, profile.solanaAddress);
    // Locally update state for fast feedback
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const votedByList = [...p.votedBy];
          if (voted) {
            votedByList.push(profile.solanaAddress);
          } else {
            const idx = votedByList.indexOf(profile.solanaAddress);
            if (idx > -1) votedByList.splice(idx, 1);
          }
          return {
            ...p,
            votes,
            votedBy: votedByList,
          };
        }
        return p;
      })
    );
  };

  const handleToggleItem = (item: string) => {
    setSelectedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile || !text.trim()) return;

    const postAuthor = author.trim() || `Hopo_Survivor_${Math.floor(Math.random() * 900 + 100)}`;
    
    await database.addPost({
      category,
      author: postAuthor,
      authorAddress: profile.solanaAddress,
      text,
      items: selectedItems,
    });

    // Reset Form
    setAuthor("");
    setText("");
    setSelectedItems([]);
    setShowModal(false);

    // Reload Posts
    const updatedPosts = await database.getPosts();
    setPosts(updatedPosts);
  };

  const filteredPosts = posts.filter(
    (p) => activeCategory === "all" || p.category === activeCategory
  );

  return (
    <div className="flex-1 flex flex-col bg-space-950 py-12 px-4 md:px-8 relative overflow-hidden font-sans select-none">
      
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/3 w-[300px] h-[300px] bg-neon-purple/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-alien-cyan/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="w-full max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 relative z-10">
        <div>
          <span className="text-[10px] text-alien-cyan font-mono tracking-[0.3em] uppercase block mb-3 animate-pulse">
            // COLLECTIVE DECRYPTION FEED //
          </span>
          <h1 className="font-righteous text-3xl sm:text-4xl font-extrabold text-white tracking-widest uppercase">
            PORT TRANSMISSIONS
          </h1>
          <p className="text-xs text-gray-400 font-sans mt-2">
            Read other survivors&apos; theories and check-ins, or transmit your own classified report.
          </p>
        </div>

        <button
          onClick={() => {
            if (!connected) {
              setShowWalletModal(true);
            } else {
              setShowModal(true);
            }
          }}
          className="flex items-center gap-2 bg-gradient-to-r from-neon-pink to-neon-purple text-white px-5 py-3 rounded-xl text-xs font-bold tracking-widest hover:scale-[1.03] transition-all shadow-[0_0_15px_rgba(255,0,127,0.3)] border border-white/10"
        >
          <Plus className="w-4 h-4" />
          WRITE TRANSMISSION
        </button>
      </div>

      {/* Filter and Feed Area */}
      <div className="w-full max-w-4xl mx-auto flex flex-col gap-6 relative z-10">
        
        {/* Category Selector */}
        <div className="flex border-b border-space-900 text-xs font-mono gap-1">
          {["all", "scenario", "brag"].map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat as any)}
                className={`px-4 py-2.5 uppercase tracking-widest border-b-2 transition-all cursor-pointer ${
                  isActive
                    ? "border-neon-pink text-neon-pink font-bold"
                    : "border-transparent text-gray-500 hover:text-gray-300"
                }`}
              >
                {cat === "all" ? "ALL LOGS" : cat === "scenario" ? "SCENARIO TRANSMISSIONS" : "INVENTORY BRAGS"}
              </button>
            );
          })}
        </div>

        {/* Post Feed */}
        <div className="flex flex-col gap-5">
          {filteredPosts.length === 0 ? (
            <div className="glass-panel rounded-2xl p-12 text-center border border-white/5">
              <MessageSquare className="w-12 h-12 text-gray-700 mx-auto mb-4 animate-bounce" />
              <p className="text-xs text-gray-500 font-mono">NO TRANSMISSIONS DECRYPTED ON THIS CHANNEL</p>
            </div>
          ) : (
            filteredPosts.map((post) => {
              const isVoted = profile ? post.votedBy.includes(profile.solanaAddress) : false;
              const isScenario = post.category === "scenario";

              return (
                <div
                  key={post.id}
                  className={`glass-panel rounded-2xl p-6 border transition-all flex flex-col md:flex-row gap-5 items-start justify-between ${
                    isScenario
                      ? "border-neon-purple/10 hover:border-neon-purple/20"
                      : "border-alien-cyan/10 hover:border-alien-cyan/20"
                  }`}
                >
                  {/* Upvote controller */}
                  <button
                    onClick={() => handleVote(post.id)}
                    className={`flex md:flex-col items-center justify-center gap-1.5 px-3 py-2 md:py-3.5 border rounded-xl min-w-[65px] transition-all cursor-pointer ${
                      isVoted
                        ? "bg-neon-pink/15 border-neon-pink text-neon-pink shadow-[0_0_10px_rgba(255,0,127,0.1)]"
                        : "bg-space-950/60 border-space-850 text-gray-500 hover:text-white"
                    }`}
                  >
                    <ArrowUp className="w-4 h-4 transition-transform active:scale-75" />
                    <span className="font-mono text-xs font-bold">
                      {post.votes.toLocaleString()}
                    </span>
                    <span className="text-[7px] font-mono tracking-widest uppercase hidden md:inline">VOTE</span>
                  </button>

                  {/* Body Content */}
                  <div className="flex-1 flex flex-col gap-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-space-900 pb-2 text-[10px] font-mono text-gray-500">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isScenario ? "bg-neon-purple animate-pulse" : "bg-alien-cyan"
                          }`}
                        />
                        <span className="text-gray-300 font-bold">@{post.author}</span>
                        <span>({post.authorAddress.slice(0, 4)}...{post.authorAddress.slice(-4)})</span>
                        <span
                          className={`px-1.5 py-0.5 rounded text-[8px] font-bold ${
                            isScenario
                              ? "bg-neon-purple/10 border border-neon-purple/30 text-neon-purple"
                              : "bg-alien-cyan/10 border border-alien-cyan/30 text-alien-cyan"
                          }`}
                        >
                          {isScenario ? "SCENARIO" : "BRAG"}
                        </span>
                      </div>
                      <span>
                        {new Date(post.timestamp).toLocaleDateString()}{" "}
                        {new Date(post.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>

                    <p className="text-xs text-gray-300 leading-relaxed font-sans font-light">
                      {post.text}
                    </p>

                    {/* Inventory Items badges */}
                    {post.items.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {post.items.map((item, idx) => (
                          <span
                            key={idx}
                            className={`text-[9px] font-mono px-2 py-0.5 rounded-full border flex items-center gap-1 ${
                              isScenario
                                ? "bg-neon-purple/5 border-neon-purple/20 text-neon-purple"
                                : "bg-alien-cyan/5 border-alien-cyan/20 text-alien-cyan"
                            }`}
                          >
                            <Tag className="w-2.5 h-2.5" />
                            {item}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* WALLET CONNECT MODAL */}
      <WalletConnectModal
        isOpen={showWalletModal}
        onClose={() => setShowWalletModal(false)}
        onSuccess={() => {
          setShowWalletModal(false);
          setShowModal(true);
        }}
        reason="community"
      />

      {/* NEW TRANSMISSION MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="w-full max-w-md glass-panel border border-neon-pink/30 rounded-2xl p-6 relative shadow-2xl flex flex-col gap-4 font-mono text-xs max-h-[90vh] overflow-y-auto">
            {/* Crosshair corners */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-neon-pink" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-neon-pink" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-neon-pink" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-neon-pink" />

            {/* Header */}
            <div className="flex justify-between items-center border-b border-space-850 pb-3">
              <span className="text-neon-pink font-bold uppercase tracking-wider text-[11px] flex items-center gap-2">
                <Flame className="w-4 h-4 animate-pulse" />
                // TRANSMIT ENCRYPTED FILE
              </span>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Category Select */}
              <div className="flex flex-col gap-1.5">
                <span className="text-gray-500 font-bold">TRANSMISSION CHANNEL</span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setCategory("scenario")}
                    className={`flex-1 py-2 border rounded-xl font-bold transition-all cursor-pointer ${
                      category === "scenario"
                        ? "bg-neon-purple/20 border-neon-purple text-neon-purple shadow-[0_0_10px_rgba(216,0,255,0.1)]"
                        : "bg-space-950/60 border-space-850 text-gray-500"
                    }`}
                  >
                    SCENARIO
                  </button>
                  <button
                    type="button"
                    onClick={() => setCategory("brag")}
                    className={`flex-1 py-2 border rounded-xl font-bold transition-all cursor-pointer ${
                      category === "brag"
                        ? "bg-alien-cyan/20 border-alien-cyan text-alien-cyan shadow-[0_0_10px_rgba(0,245,212,0.1)]"
                        : "bg-space-950/60 border-space-850 text-gray-500"
                    }`}
                  >
                    INVENTORY BRAG
                  </button>
                </div>
              </div>

              {/* Author name */}
              <div className="flex flex-col gap-1.5">
                <span className="text-gray-500 font-bold">AUTHOR SURVIVOR NAME</span>
                <input
                  type="text"
                  placeholder="Leave blank for random Survivor Tag"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="bg-space-950 border border-space-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-neon-pink/40"
                />
              </div>

              {/* Text proposal */}
              <div className="flex flex-col gap-1.5">
                <span className="text-gray-500 font-bold">REPORT DETAILED CONTENT</span>
                <textarea
                  required
                  rows={5}
                  placeholder={
                    category === "scenario"
                      ? "Describe your English theory for 'HOPE Part 2' based on the secured items. What is the cosmic entity's secret?"
                      : "Brag about your secured inventory or token stash! Share the cheat codes for finding items."
                  }
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="bg-space-950 border border-space-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-neon-pink/40 resize-none font-sans leading-relaxed"
                />
              </div>

              {/* Tag Secured Items */}
              <div className="flex flex-col gap-2">
                <span className="text-gray-500 font-bold">ATTACH SECURED INVENTORY</span>
                
                {profile && profile.inventory.length === 0 ? (
                  <p className="text-[10px] text-alert-red italic border border-alert-red/20 bg-alert-red/5 p-2 rounded-xl">
                    ⚠️ You haven&apos;t secured any game items yet! Visit the Episode Game to find gear and use them.
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-1.5 max-h-[80px] overflow-y-auto p-1 bg-space-950 rounded-xl border border-space-900">
                    {profile?.inventory.map((item) => {
                      const isSelected = selectedItems.includes(item);
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => handleToggleItem(item)}
                          className={`text-[9px] px-2.5 py-1 rounded-full border transition-all cursor-pointer ${
                            isSelected
                              ? "bg-neon-pink/15 border-neon-pink text-neon-pink font-bold"
                              : "bg-space-900 border-space-800 text-gray-500 hover:text-gray-300"
                          }`}
                        >
                          {isSelected ? "✓ " : "+ "}
                          {item}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full mt-2 bg-gradient-to-r from-neon-pink to-neon-purple text-white font-bold py-3 rounded-xl text-xs tracking-widest hover:scale-[1.02] transition-transform shadow-[0_0_15px_rgba(255,0,127,0.2)]"
              >
                ENCRYPT & TRANSMIT REPORT
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
