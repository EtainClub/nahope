# HOPO PORT: OMEGA PROTOCOL

> A cinematic point-and-click RPG set in director Na Hong-jin's \<HOPE\> universe & `$NAHOPE` memecoin governance platform

---

## 📖 Overview

**HOPE: THE HOPO PORT MYSTERY** is a collaborative RPG platform that adapts the released film \<Hope\>—its isolated coastal village, false tiger hunt, alien crash survivors, and escalating cosmic horror—through hardcore point-and-click puzzle mechanics inspired by \<Isaku (遺作)\>.

It delivers an unprecedented **"Cinematic Governance"** experience to users of the `$NAHOPE` memecoin ecosystem, allowing them to explore the film's universe in real-time and generate narratives.

### Core Values

1. **Na Hong-jin Cinematic Horror** — Recreating his signature ominous, unpredictable "ontological cosmic horror" through technical mechanics and narrative text
2. **Hardcore Puzzle Difficulty** — Benchmarking \<Isaku\>'s interconnected puzzle structure to encourage community discussion and strategy sharing
3. **Collective Narrative Creation (CGC)** — Users generate memes and scenarios from gameplay discoveries, then collectively propose the next storyline (Part 2) to director Na Hong-jin via community governance vote

---

## 📚 Story Documentation

- **[Game Story Bible](docs/game_story_bible.md)** — Authoritative narrative, worldbuilding, and implemented Episode 1–4 stories
- [Episode 1–4 Guide](app/guide/page.tsx) — Playable puzzle routes, ending matrices, and adaptation boundaries
- [Pre-release Story Design](docs/game_story_design.md) — Archived speculative concept; not current canon

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | [Next.js 16](https://nextjs.org) (App Router) |
| **Language** | TypeScript |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com) |
| **UI Icons** | [Lucide React](https://lucide.dev) |
| **Backend / DB** | [Firebase](https://firebase.google.com) (Firestore, Storage) |
| **Hosting** | Firebase App Hosting (Cloud Run–based SSR) |
| **Blockchain** | Solana RPC API (`$NAHOPE` token-gating) |
| **Fonts** | Righteous, Inter (Google Fonts via `next/font`) |

---

## 📁 Project Structure

```
nahope/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (fonts, metadata, Navigation)
│   ├── page.tsx                  # Landing page (hero, Cannes countdown, roadmap)
│   ├── globals.css               # Global CSS (neon glitch effects, CRT styling)
│   ├── intro/page.tsx            # Movie intro page (director, cast, synopsis)
│   ├── game/page.tsx             # Game play page (point-and-click 3-panel layout)
│   ├── community/page.tsx        # Community feed (UGC meme sharing & scenarios)
│   └── profile/page.tsx          # User profile (wallet connection, inventory)
├── components/                   # Reusable React components
│   ├── Navigation.tsx            # Global navigation bar
│   ├── HeroSection.tsx           # Landing hero section
│   ├── CannesCountdown.tsx       # Cannes Film Festival countdown timer
│   ├── EpisodeRoadmap.tsx        # Episode roadmap
│   ├── IsakuGameTeaser.tsx       # Isaku-style game teaser
│   ├── AboutSection.tsx          # Project about section
│   ├── PromiseSection.tsx        # Developer promise & transparency disclosure
│   └── ScenarioFeed.tsx          # Scenario feed component
├── lib/
│   └── firebase.ts               # Firebase initialization & Firestore utilities
├── public/
│   └── images/                   # Static image assets
├── apphosting.yaml               # Firebase App Hosting config (Cloud Run)
├── firebase.json                 # Firebase project configuration
├── storage.rules                 # Firebase Storage security rules
├── next.config.ts                # Next.js configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Dependencies & scripts
```

---

## 🎨 Design System: 90s CRT Suspense

A visual contrast between 70–80s Cold War retro technology and mysterious alien artifacts.

### Color Palette

| Usage | Description | Code |
|-------|-------------|------|
| Background | Ultra-dark navy black | `#05070a` |
| Primary text | Soft white | `#f3f4f6` |
| Glitch effect | Neon green | `#00ff41` |
| Warning / Alien (red) | Siren red | `#ef4444` |
| Alien slime | Lime green | `#a3e635` |
| Fog / Mystic | Dark fog grey | `#6b7280` |

### Layout (Isaku 3-Panel Structure)

The game page (`/game`) benchmarks Isaku's classic 3-panel structure:

- **Game Log (Left 25%)** — Displays current situation and narrative text
- **Main Canvas (Center 50%)** — Point-and-click interactive area (Hopo Police Station, DMZ Forest)
- **Inventory & UGC (Right 25%)** — Discovered items list and X (Twitter) sharing functionality
- **Status Bar (Bottom)** — Wallet balance, current location, and token-gating status

---

## 🧩 Game Mechanics

### "Trigger Belt" Hardcore Puzzles

A logic structure designed so that thoughtless clicking leads to failure. Players must read game logs and deduce causal relationships between objects (the **"trigger belt"**) to advance.

**Episode 1 evidence chain:**
1. Review the duty roster, collect the evidence camera and field equipment, and confirm that Hopo's communications are severed beyond the local hardware.
2. Delay Sung-gi's premature tiger hunt, then photograph and measure the uneaten cattle carcass.
3. Compare the wounds and tracks against the predator guide to reject the tiger theory.
4. Observe the immense figure from the ridge and withhold fire when Bum-seok recognizes grief.
5. Follow the subject to Hopo's ruined main road, document the wounded Bamigir's tears, and file the unknown-subject report.


**Episode 2 causality chain:**
1. Stabilize the search line and preserve Bamigir's aftermath without distributing ammunition.
2. Search Yang-bae's mannequin workshop, open the cold room, and document Kali's projectile wound.
3. Match the spent casing to Yang-bae's statement and trace his route into the mountain.
4. Document multiple anatomies and the crashed silver vessel, then connect its child-sized compartment to Kali.
5. Hold fire during the royal survivors' encirclement and choose either a safe withdrawal or a complete first-shot report.

**Episode 3 contact chain:**
1. Stabilize the returning hunters, record every casualty, and remove the rifle bolts from the human line.
2. Combine the casualty ledger with Nak-yeon's lived evacuation map to build a complete civilian manifest.
3. Move Kali under medical custody, document the human projectile, and carry the child in a protected cradle.
4. Use Hae-sul's witness movements to distinguish Aydobor's search route from the civilian corridor.
5. Display human disarmament, hold the grove with Sung-ae's flare, then choose evacuation or Kali's wordless return.

**Episode 4 archive chain:**
1. Establish chain of custody across the surviving archive, testimony recorder, and sealed artifact cases.
2. Reconstruct the cattle incident, human first shot, alien search, and reciprocal withdrawal on the causality board.
3. Separate proven facts, supported inferences, and creative proposals before certifying the layered archive.
4. Draft a game-original *Humans in Space* scenario around Kali, Zor, and the human witness without rewriting evidence as fact.
5. Register authorship, publish an open archive index, and choose public release or community-governed transmission.

### Token-Gating

Episode 2 is fully open with no prior clear, wallet, or token requirement. Episode 3 requires an Episode 2 clear plus 20,000 $NAHOPE; Episode 4 requires an Episode 3 clear, at least three rare artifacts, and 100,000 $NAHOPE. Connected-wallet balances for Episodes 3–4 are checked by a no-cache Next.js server route using Solana RPC and the configured `NAHOPE_MINT`; progression and artifact prerequisites come from the saved player profile.

### UGC Reward System

Users who share inventory item memes on X (Twitter) and receive community engagement are automatically airdropped small `$NAHOPE` rewards via Firebase Functions.

---

## 🔥 Firestore Data Structure

### `users` Collection

```json
{
  "walletAddress": "Solana_Wallet_Address",
  "currentEpisode": 1,
  "unlockedHotspots": ["ep1_desk_rifle", "ep1_farm_cow"],
  "inventory": {
    "calivan_rifle": { "type": "gun", "isUGC": true },
    "hopo_license_plate": { "type": "key", "isUGC": false }
  },
  "submitPermission": false,
  "point": 1500
}
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm / yarn / pnpm
- Firebase CLI (`npx -y firebase-tools@latest`)

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env.local` file with the following variables:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
```

---

## ☁️ Deployment (Firebase App Hosting)

This project is deployed via **Firebase App Hosting** with Cloud Run–based SSR.

```bash
# Check Firebase project backends
npx -y firebase-tools@latest apphosting:backends:list

# Deployment is handled automatically via GitHub integration
# Cloud Run settings are managed in apphosting.yaml
```

### `apphosting.yaml` Configuration

| Setting | Value |
|---------|-------|
| CPU | 1 |
| Memory | 512 MiB |
| Min Instances | 0 |
| Max Instances | 10 |
| Concurrency | 80 |

---

## 📜 License

Coming Soon