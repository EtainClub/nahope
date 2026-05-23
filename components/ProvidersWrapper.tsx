"use client";

import dynamic from "next/dynamic";

// dynamic with ssr:false must live in a Client Component — not in layout.tsx (Server Component)
const Providers = dynamic(() => import("./Providers"), { ssr: false });

export default function ProvidersWrapper({ children }: { children: React.ReactNode }) {
  return <Providers>{children}</Providers>;
}
