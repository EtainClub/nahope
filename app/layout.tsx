import type { Metadata } from "next";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://nahope.com"),
  title: "HOPO PORT: OMEGA PROTOCOL | Cannes Countdown",
  description: "Enter Hopo Port Control Zone: Omega Protocol, an interactive cinematic sci-fi RPG inspired by Na Hong-jin's upcoming film 'HOPE'. Follow the 24-hour Cannes Ceremony Countdown.",
  keywords: ["hopo port", "omega protocol", "cannes countdown", "na hong jin", "movie hope", "solana", "meme coin", "sci-fi RPG", "interactive fiction"],
  openGraph: {
    title: "HOPO PORT: OMEGA PROTOCOL | Cannes Countdown",
    description: "An interactive cinematic RPG and Cannes countdown inspired by Na Hong-jin's sci-fi movie 'HOPE'. Collect items, unlock rewards, and shape the story.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/nahope_logo.png",
        width: 800,
        height: 800,
        alt: "HOPO PORT Logo",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "HOPO PORT: OMEGA PROTOCOL | Cannes Countdown",
    description: "Enter Hopo Port Control Zone: Omega Protocol. An interactive RPG and Cannes countdown inspired by Na Hong-jin's 'HOPE'.",
    images: ["/images/nahope_logo.png"],
  }
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${righteous.variable} ${inter.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-space-950 font-sans text-gray-100 pb-24 md:pb-0">
        <Navigation />
        <div className="flex-1 flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}



