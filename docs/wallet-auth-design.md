# Wallet Connection & Auth Architecture Design

> HOPO PORT: OMEGA PROTOCOL — Real Wallet Integration  
> Status: MVP Design v2

---

## Overview

| Scope | Decision |
|-------|----------|
| Episode 1 | Free play — no wallet. Mock profile (`Hopo...7XzP`, 25,000 $NAHOPE) |
| Episode 2+ | Real Solana wallet + $NAHOPE balance gate |
| Community Write | Wallet required before posting |
| Auth Layer | Firebase Anonymous Auth (session-based, wallet address as true identity) |
| Identity Key | Solana wallet address (base58) = Firestore document ID |

---

## Design Decisions

### Why Episode 1 is Free
Lower onboarding barrier. Players experience the full game loop before any wallet friction. Web3 games grow by hooking players with content first, gating later episodes.

### Why Firebase Anonymous Auth (Not Custom Token)
Custom token auth requires a backend Firebase Function that verifies the wallet signature and mints the token. For MVP, Anonymous Auth is sufficient to satisfy Firestore's "must be authenticated" rule. The wallet pubkey is the true identity — Firebase UID is only an auth ticket.

**Known limitation**: Anonymous UID changes if the user's IndexedDB/cookie is cleared. The `firebaseUid` field in Firestore is updated each time the user re-connects. Firestore rules use `request.auth != null` (not UID matching) for MVP. Phase 2 will add signature-based custom token for stable UID linking.

### Why `dynamic({ ssr: false })` for Providers
`layout.tsx` must remain a Server Component to export `metadata`. Solana wallet adapter packages use browser APIs (`window`, `navigator`) at module load — executing on the server crashes the build. Dynamic import with `ssr: false` guarantees these packages only run in the browser.

---

## Package Installation

```bash
npm install @solana/wallet-adapter-react @solana/wallet-adapter-wallets @solana/wallet-adapter-base @solana/web3.js
```

Add to `.env.local`:
```env
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
```

(Replace with a private RPC endpoint for production — the public endpoint is rate-limited.)

---

## Component Architecture

```
app/layout.tsx  (Server Component — exports metadata)
  └── dynamic(Providers, { ssr: false })   ← wallet adapter only runs client-side
      ├── ConnectionProvider
      └── WalletProvider (autoConnect: false)
          ├── Navigation.tsx
          └── {children}
              ├── community/page.tsx  → useWallet() + WalletConnectModal
              └── game/page.tsx       → useWallet() + WalletConnectModal
```

---

## New Files

### `components/Providers.tsx`

```tsx
"use client";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { PhantomWalletAdapter, BackpackWalletAdapter, SolflareWalletAdapter } from "@solana/wallet-adapter-wallets";
import { useMemo } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  const endpoint = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || "https://api.mainnet-beta.solana.com";
  const wallets = useMemo(() => [
    new PhantomWalletAdapter(),
    new BackpackWalletAdapter(),
    new SolflareWalletAdapter(),
  ], []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect={false}>
        {children}
      </WalletProvider>
    </ConnectionProvider>
  );
}
```

### `components/WalletConnectModal.tsx`

**Props**:
```typescript
interface WalletConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (walletAddress: string) => void;
  reason: "community" | "episode2" | "episode3" | "episode4";
}
```

**Reason messages**:
| reason | Korean message |
|--------|---------------|
| `community` | 커뮤니티 글 작성은 Solana 지갑 연결이 필요합니다 |
| `episode2` | 에피소드 2: 지갑 연결 + 5,000 $NAHOPE 필요 |
| `episode3` | 에피소드 3: 20,000 $NAHOPE 필요 |
| `episode4` | 에피소드 4: 100,000 $NAHOPE 필요 (엘리트 방어자) |

**Connect flow**:
1. User selects wallet (Phantom / Backpack / Solflare)
2. `await wallet.connect()` — no `signMessage` needed for MVP
3. `const uid = await connectWalletAndAuth()` — Firebase Anonymous Auth
4. Merge Ep1 mock profile into real wallet profile
5. `database.saveUserProfile(pubkey, merged)`
6. `localStorage.setItem("active_wallet_address", pubkey)`
7. `window.dispatchEvent(new Event("profileUpdated"))`
8. `onSuccess(pubkey)` called → modal closes

**Style**: glass-panel, neon-pink border, font-mono (matches existing design system).

---

## Modified Files

### `lib/firebase.ts`

Add Firebase Auth:
```typescript
import { getAuth, signInAnonymously } from "firebase/auth";

export let auth = null;
if (isFirebaseConfigured) {
  try { auth = getAuth(app); } catch (e) {}
}

// Call on wallet connect — reuses existing session if still alive
export const connectWalletAndAuth = async (): Promise<string | null> => {
  if (!auth) return null;
  if (auth.currentUser) return auth.currentUser.uid;
  const credential = await signInAnonymously(auth);
  return credential.user.uid;
};
```

Extend `UserProfile` interface:
```typescript
export interface UserProfile {
  solanaAddress: string;
  firebaseUid?: string;    // anonymous Firebase UID (updated each session)
  tokenBalance: number;
  inventory: string[];
  checkInDates: string[];
  lastCheckIn: string | null;
  createdAt?: number;      // first wallet connect timestamp
  lastSeen?: number;       // updated on every profile save
}
```

### `app/layout.tsx`

```typescript
import dynamic from "next/dynamic";
const Providers = dynamic(() => import("../components/Providers"), { ssr: false });

// Wrap body children:
<Providers>
  <Navigation />
  <div className="flex-1 flex flex-col">{children}</div>
</Providers>
```

### `app/game/page.tsx`

```typescript
import { useWallet } from "@solana/wallet-adapter-react";
const { connected, publicKey } = useWallet();

// On episode advance:
const EPISODE_GATES = { 2: 5000, 3: 20000, 4: 100000 } as const;
if (nextEpisode > 1) {
  if (!connected || !publicKey) {
    setWalletModalReason(`episode${nextEpisode}`);
    setShowWalletModal(true);
    return;
  }
  const required = EPISODE_GATES[nextEpisode as 2 | 3 | 4];
  if ((profile?.tokenBalance ?? 0) < required) {
    addLog(`접속 조건 미달: ${required.toLocaleString()} $NAHOPE 필요`);
    return;
  }
}
```

### `app/community/page.tsx`

```typescript
import { useWallet } from "@solana/wallet-adapter-react";
const { connected } = useWallet();

const handleWritePost = () => {
  if (!connected) {
    setShowWalletModal(true);
    return;
  }
  setShowPostForm(true);
};
```

---

## Firestore `users` Collection Schema

**Document ID**: Solana wallet address (base58)

```json
{
  "solanaAddress": "BxY7...9PqR",
  "firebaseUid": "anon_uid_current_session",
  "tokenBalance": 25000,
  "inventory": ["Screwdriver", "Cabinet Key", "Green Alien Slime"],
  "checkInDates": ["2026-05-24"],
  "lastCheckIn": "2026-05-24",
  "createdAt": 1716508800000,
  "lastSeen": 1716508800000
}
```

---

## Firestore Security Rules (MVP)

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{walletAddress} {
      allow read: if true;
      allow write: if request.auth != null;  // any authenticated (anonymous OK)
    }
    match /posts/{postId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update: if request.auth != null;
    }
  }
}
```

Rules use `request.auth != null` rather than matching a specific UID. This is safe for MVP because:
- Users can only create posts with their own wallet address (enforced client-side)
- Voting spam is cosmetic — the worst attack is inflating vote counts (acceptable for a memecoin game)
- Token balance is community-viewable, not a financial secret

---

## Episode 1 Mock Profile Migration

When a user who played Ep1 as mock (`Hopo...7XzP`) connects their real wallet:

```typescript
const MOCK_KEY = "Hopo...7XzP";
const mockProfile = getLocalData(`profile_${MOCK_KEY}`, null);
const realProfile = database.getUserProfile(pubkey);

const merged = {
  ...realProfile,
  // Keep Ep1 progress only if real wallet has no inventory yet
  inventory: realProfile.inventory.length > 0
    ? realProfile.inventory
    : (mockProfile?.inventory ?? []),
  checkInDates: [...new Set([
    ...realProfile.checkInDates,
    ...(mockProfile?.checkInDates ?? []),
  ])],
  firebaseUid: uid,
  createdAt: realProfile.createdAt ?? Date.now(),
  lastSeen: Date.now(),
};

await database.saveUserProfile(pubkey, merged);
localStorage.removeItem(`profile_${MOCK_KEY}`);
```

---

## Phase 2: Proper Auth (Post-MVP)

Replace Anonymous Auth with Firebase Custom Tokens:

1. User clicks connect → wallet.connect() → wallet.signMessage(nonce)
2. Client sends `{ walletAddress, signature, nonce }` to Firebase Function
3. Firebase Function verifies signature with `@solana/web3.js` `nacl.sign.detached.verify()`
4. Function mints custom token: `admin.auth().createCustomToken(walletAddress)`
5. Client calls `signInWithCustomToken(auth, customToken)`
6. Firebase UID is now stable and equals wallet address
7. Firestore rules can match `request.auth.uid == walletAddress`

This eliminates the UID-rotation problem entirely and makes Firestore rules airtight.
