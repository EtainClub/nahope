import type { Metadata } from "next";
import GameRouteBodyClass from "../../components/game/GameRouteBodyClass";

export const metadata: Metadata = {
  title: "HOPO PORT Episodes 1–4 | Interactive Investigation",
  description:
    "Investigate Hopo, return Kali, rebuild the surviving archive, and submit the Hope Protocol for community review.",
  openGraph: {
    title: "HOPO PORT | Episodes 1–4 Interactive RPG",
    description:
      "A four-episode investigation spanning The Hopo Tiger, The Hunt Reverses, Human Dust, and Omega Protocol.",
    images: [
      {
        url: "/images/og-banner.png",
        width: 1200,
        height: 630,
        alt: "HOPO PORT Episodes 1 through 4 interactive investigation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HOPO PORT | Episodes 1–4 Interactive RPG",
    description:
      "Document Bamigir, uncover Kali, evacuate Hopo, and preserve the record through Omega Protocol.",
    images: ["/images/og-banner.png"],
  },
};

export default function GameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <GameRouteBodyClass />
      {children}
    </>
  );
}
