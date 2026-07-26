import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Episodes 1–4 Field Guide | HOPO PORT",
  description:
    "Complete routes, ending matrices, access rules, and canon boundaries for all four HOPO PORT episodes.",
  openGraph: {
    title: "HOPO PORT Field Guide | Episodes 1–4",
    description:
      "Solve The Hopo Tiger, The Hunt Reverses, Human Dust, and Omega Protocol through evidence and restraint.",
    images: [
      {
        url: "/images/og-banner.png",
        width: 1200,
        height: 630,
        alt: "HOPO PORT Episodes 1 through 4 field guide",
      },
    ],
  }
};

export default function GuideLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
