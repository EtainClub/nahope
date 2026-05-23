import type { Metadata, Viewport } from "next";
import { Righteous, Inter } from "next/font/google";
import "./globals.css";
import Navigation from "../components/Navigation";

const righteous = Righteous({
  weight: "400",
  variable: "--font-righteous",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#05070a" },
    { media: "(prefers-color-scheme: light)", color: "#05070a" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://nahope.com"),
  title: {
    default: "HOPO PORT: OMEGA PROTOCOL | 나홍진 영화 HOPE 인터랙티브 RPG",
    template: "%s | HOPO PORT",
  },
  description: "나홍진 감독의 SF 코즈믹 호러 영화 'HOPE(호프)'에서 영감을 받은 인터랙티브 시네마틱 RPG. 포인트 앤 클릭으로 호포항을 탐험하고, 아이템을 수집하고, 커뮤니티와 함께 Part 2 시나리오를 만들어 감독에게 전달하세요. Enter Hopo Port Control Zone: an interactive cinematic RPG inspired by Na Hong-jin's upcoming film 'HOPE'.",
  keywords: ["hopo port", "omega protocol", "나홍진", "HOPE 영화", "호프", "cannes 2026", "na hong jin", "movie hope", "solana", "$NAHOPE", "meme coin", "sci-fi RPG", "interactive fiction", "point and click", "cosmic horror", "황정민", "조인성", "정호연"],
  authors: [{ name: "Hopo Port Survivor Community" }],
  creator: "Hopo Port Survivor Community",
  publisher: "Hopo Port",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://nahope.com",
    languages: {
      "en-US": "https://nahope.com",
      "ko-KR": "https://nahope.com",
    },
  },
  openGraph: {
    title: "HOPO PORT: OMEGA PROTOCOL | 나홍진 감독 HOPE 인터랙티브 RPG",
    description: "나홍진 감독의 코즈믹 호러 영화 HOPE에서 영감을 받은 인터랙티브 RPG. 호포항 파출소를 탐험하고, 아이템을 수집하고, 외계 유물의 비밀을 밝혀내세요. An interactive cinematic RPG inspired by Na Hong-jin's sci-fi film 'HOPE'.",
    type: "website",
    locale: "ko_KR",
    alternateLocale: "en_US",
    siteName: "HOPO PORT: OMEGA PROTOCOL",
    url: "https://nahope.com",
    images: [
      {
        url: "/images/og-banner.png",
        width: 1200,
        height: 630,
        alt: "HOPO PORT: OMEGA PROTOCOL - 나홍진 감독 HOPE 인터랙티브 코즈믹 호러 RPG",
        type: "image/png",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@nahope_port",
    creator: "@nahope_port",
    title: "HOPO PORT: OMEGA PROTOCOL | 나홍진 HOPE RPG",
    description: "나홍진 감독의 코즈믹 호러 영화 HOPE 인터랙티브 RPG. 포인트 앤 클릭으로 호포항을 탐험하세요. Interactive cinematic RPG inspired by Na Hong-jin's 'HOPE'.",
    images: [
      {
        url: "/images/og-banner.png",
        width: 1200,
        height: 630,
        alt: "HOPO PORT: OMEGA PROTOCOL - Cosmic Horror Interactive RPG",
      },
    ],
  },
  category: "game",
  classification: "Interactive RPG",
};


// JSON-LD Structured Data for the website
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "HOPO PORT: OMEGA PROTOCOL",
  alternateName: ["호포항 오메가 프로토콜", "NAHOPE"],
  url: "https://nahope.com",
  description: "나홍진 감독의 SF 코즈믹 호러 영화 HOPE에서 영감을 받은 인터랙티브 시네마틱 RPG",
  inLanguage: ["ko", "en"],
  potentialAction: {
    "@type": "SearchAction",
    target: "https://nahope.com/community?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${righteous.variable} ${inter.variable} h-full antialiased dark`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/images/nahope_logo.png" />
      </head>
      <body className="min-h-full flex flex-col bg-space-950 font-sans text-gray-100 pb-24 md:pb-0">
        <Navigation />
        <div className="flex-1 flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}



