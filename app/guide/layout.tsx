import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "현장 지침서 | HOPO PORT 플레이 방법",
  description:
    "HOPO PORT: OMEGA PROTOCOL 공식 현장 지침서. 솔라나 지갑 연결, 에피소드 1, 트리거 벨트 퍼즐, 유물 수집, 에피소드 2 해금과 시나리오 제출 방법을 확인하세요.",
  openGraph: {
    title: "HOPO PORT 현장 지침서 | 플레이 방법",
    description:
      "나홍진 감독의 영화 HOPE에서 영감을 받은 인터랙티브 시네마틱 RPG, HOPO PORT: OMEGA PROTOCOL의 단계별 한국어 안내서.",
    images: [
      {
        url: "/images/og-banner.png",
        width: 1200,
        height: 630,
        alt: "HOPO PORT 현장 지침서",
      },
    ],
  },
};

export default function GuideLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
