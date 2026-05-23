import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "프로필 기밀 문서 | Profile Dossier",
  description:
    "호포항 생존자 프로필. 솔라나 월렛 시뮬레이터, 일일 체크인, 보유 아이템을 관리하세요. Manage your Hopo Port survivor profile, daily check-in, and inventory.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "HOPO PORT PROFILE | 기밀 문서",
    description:
      "호포항 생존자 프로필 관리. Manage your survivor profile and daily check-in.",
    images: [
      {
        url: "/images/og-banner.png",
        width: 1200,
        height: 630,
        alt: "HOPO PORT Profile - Classified Dossier",
      },
    ],
  },
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
