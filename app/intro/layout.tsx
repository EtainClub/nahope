import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "영화 정보 | 나홍진 감독의 HOPE",
  description:
    "나홍진 감독의 SF 코즈믹 호러 영화 HOPE의 출연진, 시놉시스, 외계인 캐릭터 도감과 세계관, 감독 정보를 확인하세요.",
  openGraph: {
    title: "HOPE | 나홍진 감독의 SF 코즈믹 호러",
    description:
      "호포항에서 외계 생명체와 조우한 생존자들의 이야기를 그린 나홍진 감독의 코즈믹 호러 영화.",
    images: [
      {
        url: "/images/og-banner.png",
        width: 1200,
        height: 630,
        alt: "나홍진 감독의 SF 코즈믹 호러 영화 HOPE",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HOPE | 나홍진 감독의 코즈믹 호러",
    description:
      "황정민, 조인성, 정호연, 마이클 패스벤더, 알리시아 비칸데르가 출연하는 나홍진 감독의 영화 HOPE.",
    images: ["/images/og-banner.png"],
  },
};

export default function IntroLayout({ children }: { children: React.ReactNode }) {
  return children;
}
