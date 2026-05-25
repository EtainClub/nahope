import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Field Guide | How to Play HOPO PORT",
  description:
    "Complete English-language field guide to HOPO PORT: OMEGA PROTOCOL. Learn how to connect your Solana wallet, play Episode 1, decode the trigger-belt puzzles, collect artifacts, unlock Episode 2 through the $NAHOPE bonding curve, and submit scenarios for Na Hong-jin's film HOPE Part 2.",
  openGraph: {
    title: "HOPO PORT Field Guide | How to Play",
    description:
      "Step-by-step English guide to playing HOPO PORT: OMEGA PROTOCOL, the interactive cinematic RPG inspired by Na Hong-jin's film HOPE.",
    images: [
      {
        url: "/images/og-banner.png",
        width: 1200,
        height: 630,
        alt: "HOPO PORT Field Guide",
      },
    ],
  },
};

export default function GuideLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
