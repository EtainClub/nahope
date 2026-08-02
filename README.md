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


**에피소드 2 순행 호명:**
1. 소 사체의 `축`에서 시작해 호랑이라는 잘못된 이름 `인`을 분리한다.
2. 토끼 가죽길 `묘`와 용처럼 보이는 추락 흔적 `진`을 기록하되 총알로 이름을 확정하지 않는다.
3. 몸속 지렁이 `사`와 살아 있는 말의 통로 `오`를 연결한다.
4. 양배의 첫 총성 `미`, 몽치의 이름 `신`, 장닭 `유`, 생존한 개 `술`을 순서대로 호명한다.
5. 해술의 역문 `해`에서 영시 `자`로 돌아와 열두 시간의 의식 원판을 완성한다.

**에피소드 3 역굿:**
1. `해→술→유→신→미→오→사→진→묘→인→축→자`의 역순을 지킨다.
2. 각 단서를 인벤토리에 모으는 데서 끝내지 않고 의식 원판의 고정 증거로 박아 넣는다.
3. 장닭의 울음과 말이 지난 길을 양기의 닻으로 보존한다.
4. 잘못된 순서와 파괴적 선택으로 낮아지는 경계 온전도를 관리한다.
5. 열두 살아 있는 목격을 철수시키거나 영시 공백의 미래 구조 신호를 증명한다.

**에피소드 4 송신 의식:**
1. 되돌릴 수 없는 고정 증거와 선택에 따라 달라지는 인과를 분리한다.
2. 기계 기록으로 환원되지 않는 화면·소리·신체 감각의 현현을 증언으로 남긴다.
3. 증거, 현현, 창작 제안을 삼층 의식 기록으로 묶는다.
4. 플레이어가 열세 번째 목격자로서 책임 있는 후속 시나리오를 작성한다.
5. 기록은 공개하고 현현은 착취하지 않는 공동체 송별 송신으로 굿판을 끝낸다.

### Episode Progression

Episodes unlock only through sequential completion: Episode 1 clear → Episode 2, Episode 2 clear → Episode 3, and Episode 3 clear → Episode 4. Wallet connection, `$NAHOPE` balance, and retained artifact counts do not restrict episode access. Wallet connection remains optional for associating local progress with a Solana profile.

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
