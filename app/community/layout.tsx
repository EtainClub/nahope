import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "커뮤니티 전송 피드 | Community Transmissions",
  description:
    "호포항 생존자들의 시나리오 제안과 인벤토리 자랑을 확인하세요. 당신의 Part 2 시나리오를 투표하고 나홍진 감독에게 전달될 최고의 이야기를 만들어보세요. Read scenario proposals and inventory brags from Hopo Port survivors.",
  openGraph: {
    title: "HOPO PORT COMMUNITY | 커뮤니티 전송 피드",
    description:
      "생존자들의 시나리오 제안과 인벤토리 자랑. 최고 투표 시나리오가 나홍진 감독에게 전달됩니다. Community scenario proposals for Na Hong-jin.",
    images: [
      {
        url: "/images/og-banner.png",
        width: 1200,
        height: 630,
        alt: "HOPO PORT Community Feed - Survivor Transmissions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HOPO PORT COMMUNITY | Survivor Transmissions",
    description:
      "커뮤니티 시나리오 제안 피드. Read and vote on scenario proposals from Hopo Port survivors.",
    images: ["/images/og-banner.png"],
  },
};

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
