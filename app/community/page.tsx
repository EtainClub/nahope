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
      <div className="absolute top-1/4 left-1/3 w-[300px] h-[300px] rounded-full blur-[100px] pointer-events-none" style={{ background: "color-mix(in srgb, var(--acc-violet) 5%, transparent)" }} />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full blur-[120px] pointer-events-none" style={{ background: "color-mix(in srgb, var(--acc-cyan) 5%, transparent)" }} />

      {/* Header */}
      <div className="w-full max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 relative z-10">
        <div>
          <span className="eyebrow block mb-3 flicker" style={{ color: "var(--acc-cyan)" }}>
            // COLLECTIVE DECRYPTION FEED //
          </span>
          <h1 className="display text-3xl sm:text-4xl uppercase" style={{ color: "var(--ink-0)" }}>
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
          className="flex items-center gap-2 px-5 py-3 text-xs font-mono font-bold tracking-widest hover:scale-[1.03] transition-all cursor-pointer"
          style={{ background: "var(--acc-primary)", color: "var(--bg-0)", boxShadow: "var(--glow-primary)" }}
        >
          <Plus className="w-4 h-4" />
          WRITE TRANSMISSION
        </button>
      </div>

      {/* Filter and Feed Area */}
      <div className="w-full max-w-4xl mx-auto flex flex-col gap-6 relative z-10">
        
        {/* Category Selector */}
        <div className="flex text-xs font-mono gap-1" style={{ borderBottom: "1px solid var(--line)" }}>
          {["all", "scenario", "brag"].map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat as any)}
                className="px-4 py-2.5 uppercase tracking-widest border-b-2 transition-all cursor-pointer"
                style={{
                  borderBottomColor: isActive ? "var(--acc-primary)" : "transparent",
                  color: isActive ? "var(--acc-primary)" : "var(--ink-3)",
                  fontWeight: isActive ? "bold" : undefined,
                }}
              >
                {cat === "all" ? "ALL LOGS" : cat === "scenario" ? "SCENARIO TRANSMISSIONS" : "INVENTORY BRAGS"}
              </button>
            );
          })}
        </div>

        {/* Post Feed */}
        <div className="flex flex-col gap-5">
          {filteredPosts.length === 0 ? (
            <div className="panel panel-bracket p-12 relative text-center">
              <span className="br-bl" /><span className="br-br" />
              <MessageSquare className="w-12 h-12 text-gray-700 mx-auto mb-4 animate-bounce" />
              <p className="text-xs text-gray-500 font-mono">NO TRANSMISSIONS DECRYPTED ON THIS CHANNEL</p>
            </div>
          ) : (
            filteredPosts.map((post) => {
              const isVoted = profile ? post.votedBy.includes(profile.solanaAddress) : false;
              const isScenario = post.category === "scenario";
              const accentColor = isScenario ? "var(--acc-violet)" : "var(--acc-cyan)";

              return (
                <div
                  key={post.id}
                  className="panel panel-bracket p-6 relative transition-all flex flex-col md:flex-row gap-5 items-start justify-between"
                  style={{ borderColor: `color-mix(in srgb, ${accentColor} 15%, transparent)` }}
                >
                  <span className="br-bl" /><span className="br-br" />

                  {/* Upvote controller */}
                  <button
                    onClick={() => handleVote(post.id)}
                    className="flex md:flex-col items-center justify-center gap-1.5 px-3 py-2 md:py-3.5 min-w-[65px] transition-all cursor-pointer"
                    style={isVoted ? {
                      background: `color-mix(in srgb, var(--acc-primary) 15%, transparent)`,
                      border: `1px solid var(--acc-primary)`,
                      color: "var(--acc-primary)",
                      boxShadow: "0 0 10px color-mix(in srgb, var(--acc-primary) 15%, transparent)",
                    } : {
                      background: "color-mix(in srgb, var(--bg-0) 60%, transparent)",
                      border: "1px solid var(--line-bright)",
                      color: "var(--ink-3)",
                    }}
                  >
                    <ArrowUp className="w-4 h-4 transition-transform active:scale-75" />
                    <span className="font-mono text-xs font-bold">
                      {post.votes.toLocaleString()}
                    </span>
                    <span className="text-[7px] font-mono tracking-widest uppercase hidden md:inline">VOTE</span>
                  </button>

                  {/* Body Content */}
                  <div className="flex-1 flex flex-col gap-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-2 text-[10px] font-mono text-gray-500" style={{ borderBottom: "1px solid var(--line)" }}>
                      <div className="flex items-center gap-2">
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ background: accentColor, animation: isScenario ? "pulse-glow 2s ease infinite" : undefined }}
                        />
                        <span className="text-gray-300 font-bold">@{post.author}</span>
                        <span>({post.authorAddress.slice(0, 4)}...{post.authorAddress.slice(-4)})</span>
                        <span
                          className="px-1.5 py-0.5 text-[8px] font-bold"
                          style={{
                            background: `color-mix(in srgb, ${accentColor} 10%, transparent)`,
                            border: `1px solid color-mix(in srgb, ${accentColor} 30%, transparent)`,
                            color: accentColor,
                          }}
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
                            className="text-[9px] font-mono px-2 py-0.5 flex items-center gap-1"
                            style={{
                              background: `color-mix(in srgb, ${accentColor} 5%, transparent)`,
                              border: `1px solid color-mix(in srgb, ${accentColor} 20%, transparent)`,
                              color: accentColor,
                            }}
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
          <div className="panel panel-bracket w-full max-w-md p-6 relative shadow-2xl flex flex-col gap-4 font-mono text-xs max-h-[90vh] overflow-y-auto" style={{ boxShadow: "var(--glow-primary)" }}>
            <span className="br-bl" /><span className="br-br" />

            {/* Header */}
            <div className="flex justify-between items-center pb-3" style={{ borderBottom: "1px solid var(--line-bright)" }}>
              <span className="font-bold uppercase tracking-wider text-[11px] flex items-center gap-2" style={{ color: "var(--acc-primary)" }}>
                <Flame className="w-4 h-4" style={{ animation: "pulse-glow 1s ease infinite" }} />
                // TRANSMIT ENCRYPTED FILE
              </span>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-white cursor-pointer transition-colors"
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
                    className="flex-1 py-2 font-bold transition-all cursor-pointer"
                    style={category === "scenario" ? {
                      background: "color-mix(in srgb, var(--acc-violet) 20%, transparent)",
                      border: "1px solid var(--acc-violet)",
                      color: "var(--acc-violet)",
                      boxShadow: "0 0 10px color-mix(in srgb, var(--acc-violet) 15%, transparent)",
                    } : {
                      background: "color-mix(in srgb, var(--bg-0) 60%, transparent)",
                      border: "1px solid var(--line-bright)",
                      color: "var(--ink-3)",
                    }}
                  >
                    SCENARIO
                  </button>
                  <button
                    type="button"
                    onClick={() => setCategory("brag")}
                    className="flex-1 py-2 font-bold transition-all cursor-pointer"
                    style={category === "brag" ? {
                      background: "color-mix(in srgb, var(--acc-cyan) 20%, transparent)",
                      border: "1px solid var(--acc-cyan)",
                      color: "var(--acc-cyan)",
                      boxShadow: "0 0 10px color-mix(in srgb, var(--acc-cyan) 15%, transparent)",
                    } : {
                      background: "color-mix(in srgb, var(--bg-0) 60%, transparent)",
                      border: "1px solid var(--line-bright)",
                      color: "var(--ink-3)",
                    }}
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
                  className="px-3 py-2.5 text-xs text-white focus:outline-none"
                  style={{ background: "var(--bg-0)", border: "1px solid var(--line-bright)" }}
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
                  className="px-3 py-2.5 text-xs text-white focus:outline-none resize-none font-sans leading-relaxed"
                  style={{ background: "var(--bg-0)", border: "1px solid var(--line-bright)" }}
                />
              </div>

              {/* Tag Secured Items */}
              <div className="flex flex-col gap-2">
                <span className="text-gray-500 font-bold">ATTACH SECURED INVENTORY</span>

                {profile && profile.inventory.length === 0 ? (
                  <p className="text-[10px] italic p-2" style={{ color: "var(--acc-danger)", border: "1px solid color-mix(in srgb, var(--acc-danger) 20%, transparent)", background: "color-mix(in srgb, var(--acc-danger) 5%, transparent)" }}>
                    You haven&apos;t secured any game items yet! Visit the Episode Game to find gear and use them.
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-1.5 max-h-[80px] overflow-y-auto p-1" style={{ background: "var(--bg-0)", border: "1px solid var(--line)" }}>
                    {profile?.inventory.map((item) => {
                      const isSelected = selectedItems.includes(item);
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => handleToggleItem(item)}
                          className="text-[9px] px-2.5 py-1 transition-all cursor-pointer"
                          style={isSelected ? {
                            background: "color-mix(in srgb, var(--acc-primary) 15%, transparent)",
                            border: "1px solid var(--acc-primary)",
                            color: "var(--acc-primary)",
                            fontWeight: "bold",
                          } : {
                            background: "var(--bg-1)",
                            border: "1px solid var(--line)",
                            color: "var(--ink-3)",
                          }}
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
                className="w-full mt-2 font-bold py-3 text-xs tracking-widest hover:scale-[1.02] transition-transform"
                style={{ background: "var(--acc-primary)", color: "var(--bg-0)", boxShadow: "var(--glow-primary)" }}
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
