import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "에피소드 1: 인지 수색 인터랙티브 | Episode 1 Play",
  description:
    "호포항 파출소를 포인트 앤 클릭으로 탐험하세요. 사무실, 농로, 창고를 수색하며 도구를 찾고 외계 유물의 비밀을 밝혀내세요. Play the interactive point-and-click room escape game. Explore the Hopo Port police substation.",
  openGraph: {
    title: "HOPO PORT GAME | 에피소드 1 인터랙티브 RPG",
    description:
      "포인트 앤 클릭 방 탈출 게임. 호포항 파출소를 탐험하고 외계 유물을 수집하세요. Interactive point-and-click room escape.",
    images: [
      {
        url: "/images/og-banner.png",
        width: 1200,
        height: 630,
        alt: "HOPO PORT Episode 1 - Interactive Point-and-Click Game",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HOPO PORT GAME | Episode 1 Interactive RPG",
    description:
      "포인트 앤 클릭 방 탈출 게임. Explore the Hopo Port police substation and find alien artifacts.",
    images: ["/images/og-banner.png"],
  },
};

export default function GameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
