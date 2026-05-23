# AGENTS.md

## <HOPE: Omega Protocol> Design System, Project Overview, and Game Mechanics

## 🚀 1. Project Overview: <HOPE: THE HOPO PORT MYSTERY>

### 1.1. Background and Vision
*   **Background:** A collaborative RPG platform merging the unique universe of director Na Hong-jin’s upcoming film <Hope (HOPE)> (1970-80s Cold War era, an isolated DMZ coastal village, mysterious cosmic horror) with the hardcore Point-and-Click mechanics of the classic game <Isaku (遺作)>.
*   **Vision:** To provide users of the `$NAHOPE` memecoin ecosystem with an unprecedented "Cinematic Governance" experience, allowing them to explore the film's universe in real-time and generate narratives. User gameplay itself serves as the온체인 mechanism to prove and defend the value of `$NAHOPE`.

### 1.2. Core Values
1.  **Na Hong-jin Cinematic Horror:** Recreating Na Hong-jin’s signature style of ominous, unpredictable "ontological cosmic horror" through technical mechanics and narrative text.
2.  **Hardcore Puzzle Difficulty:** Benchmarking <Isaku's> interconnected puzzle structure to create a challenging experience that encourages community discussion and strategy sharing.
3.  **Collective Narrative Creation (CGC):** Users generate memes and scenario ideas based on their gameplay discoveries, leading to a collective proposal for the film’s next storyline (Part 2), which will be presented to director Na Hong-jin.

---

## 🎨 2. Design System: 90s CRT Suspense

### 2.1. Visual Identity
*   **Concept:** A contrast between the retro technology of the 70s-80s Cold War era and mysterious alien artifacts. The aesthetic of 90s DOS/Windows classic games is recreated using Next.js and Tailwind CSS.
*   **Main Color Palette:** 
    *   **Background:** `#05070a` (extremely dark navy black)
    *   **Main Text:** `#f3f4f6` (soft white) / `#00ff41` (neon green for glitch effects)
    *   **Accent (Warning/Alien):** Red (`#ef4444`) referencing the police car siren at [00:01:10], and Green (`#a3e635`) for the mysterious alien slime.
    *   **Mystic/Fog:** Dark fog grey (`#6b7280`).

### 2.2. Layout System (Benchmarking Isaku's 3-Panel Structure)
A layout implemented within the `src/app/game/page.tsx` route of the Next.js app. (See watermarked_img_13100639718061315193.png)

*   **Main Canvas (Center):** Occupies 50% width. This is the dark, ominous "Hopo Police Station" or "DMZ Forest" interactive area. The mouse cursor changes form (e.g., crosshair or glitch effect) when hovering over objects, guiding users to discover "something wrong" through point-and-click. (See popup area in watermarked_img_13100639718061315193.png)
*   **Game Log (Left):** Occupies 25% width. Displays current situations and the narrative. *"Sgt. 범석, a mutilated cow carcass was discovered in the fields today. Find the beast the villagers claim is a tiger..."* (See left panel in watermarked_img_13100639718061315193.png)
*   **Inventory & UGC Slots (Right):** Occupies 25% width. Shows items users have discovered (e.g., `['Calivan Rifle', 'Hopo License Plate', 'Omega Mark']`) and provides X (Twitter) sharing functionality for user-generated memes. (See right panel in watermarked_img_13100639718061315193.png)
*   **Status Bar (Bottom):** Shows the user's wallet balance (`[SOLANA LOGGED IN - 2,500 $NAHOPE]`) and current location (`CURRENT LOCATION: SUBSTATION`), explicitly stating the token-gating mechanics. (See bottom bar in watermarked_img_13100639718061315193.png)

### 2.3. Typography and Sound
*   **Font:** Mono-space fonts (e.g., monospace, SFMono-Regular, Roboto Mono) to replicate retro text log aesthetics. Glitch effects (`text-neon-red` and `text-neon-green` defined in `src/app/globals.css`) are applied to critical narrative text.
*   **Sound:** Static noise from an 80s military radio, eerie disharmonious sound effects, and momentary high-frequency audio to create dread upon discovering a mystery.

---

## 🛠️ 3. Implementation and Coding Rules (Next.js & Firebase)

### 3.1. Tech Stack
*   **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS.
*   **Backend & Hosting:** Firebase (Firestore for data, Firebase App Hosting for Next.js SSR).
*   **Blockchain:** Solana RPC API for verifying user wallet balances.

### 3.2. Core Component Architecture
*   `src/app/game/page.tsx`: Defines the overall layout structure. (See Design System 2.2)
*   `src/components/game/GameCanvas.tsx`: Implements the point-and-click mechanism. Defines interaction coordinates (Hotspots) for main canvas objects, handles investigative popups (`[INVESTIGATE]`), and executes item interaction logic (e.g., using a screwdriver on a locked rifle). (See center area and popup in watermarked_img_13100639718061315193.png)
*   `src/components/game/GameInventory.tsx`: A `Token-Gated` inventory system. Fetches user inventory data (`['Calivan Rifle', 'Hopo License Plate', 'Omega Mark']`) from Firestore and dynamically generates X (Twitter) sharing links for meme creation. (See right panel in watermarked_img_13100639718061315193.png)
*   `src/components/game/WalletStatusBar.tsx`: Integrates Solana wallet connection (e.g., @solana/wallet-adapter) to display real-time `$NAHOPE` balance, enforcing token-gating. (See bottom bar in watermarked_img_13100639718061315193.png)

### 3.3. Firebase Firestore Data Structure
*   **`users` Collection:** Stores user data keyed by wallet address.
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

### 3.4. Coding Rules and Implementation Details
1.  **Transparent Developer Wallets:** The homepage `[Dev Wallet Status]` section must transparently display the developer’s wallet address and link to Solscan, publicly confirming the dev’s minimal token holdings and promise not to dump.
2.  **Solana RPC Balance Verification (Token-Gating):** Access to subsequent game episodes (e.g., Episode 2 requiring 5,000 $NAHOPE) must be validated via Solana RPC calls from Next.js server-side functions (Middleware or API route handler).
3.  **UGC-Based Reward System:** Implements an automated reward system using Firebase Functions. Users who share their inventory item memes (e.g., `Alien Slime`) on X (Twitter) and receive community engagement in the app feed can be automatically airdropped small `$NAHOPE` rewards to incentivize holding.

---

## 🧩 4. Game Mechanics: Hardcore Puzzles and Cosmic Horror

### 4.1. "Trigger Belt" Hardcore Puzzle Mechanic
A logic structure designed where thoughtless clicking leads to failure, and users must read game logs and deduce object causal relationships (the "trigger belt") to advance.

*   **Trigger Belt Example (from AGENTS.md analysis):**
    1.  The `Desk` in the Police Station is locked (requires a screwdriver).
    2.  无지성 (Thoughtless) attempt to leave for the `Hopo fields` immediately triggers a fail state: a Real-Time Timer activates, leading to one of the village youth being attacked by the cosmic horror (bad ending: *Ignorance-born Tragedy*).
    3.  **The Correct "Trigger Belt":**
        a) Stealthily click on the sleeping 방위병 'Sgt. 성기' to steal the `Substation Armory Key`.
        b) Use the key to unlock the Armory and retrieve `Lubricating Oil`.
        c) Use the oil to unlock the Chief’s stuck `Desk Drawer` to obtain the `Confiscated Screwdriver`.
        d) Only with the screwdriver can the user disassemble the `Calivan Rifle` found on the desk, retrieve the `Alien Slime`, and gain safe passage to the fields.

### 4.2. Na Hong-jin’s Cosmic Horror in Text
The game avoids generic jump scares, instead utilizing ominous Na Hong-jin style dialogue to instill the feeling that users are interacting with a dangerous, incomprehensible cosmic presence.

> **[Dialogue Example — Investigating the Mutilated Cow Carcass]**
> * "A mutilated cow. The blood seems to have evaporated, leaving the body brittle and dry."
> * " 아이복판이 죽어 있냐 씨 (Are its eyes dead, damn)... Sgt. 성기 mutters, spitting in disgust."
> * "As you draw closer and use the Magnifying Glass, a strange symbol carved into the hide becomes visible."
> * "**Omega(Ω)...** The final letter of the Greek alphabet. A sign that the ignorance-born tragedy is already prepared to consume the entire universe."
> * *(At this moment, the background music instantly shifts to an unsettling frequency of static noise.)*

### 4.3. User-Generated Scenario Submission to the Director
*   **Final Episode:** Open only to "Elite Hopo Port Defenders" who have collected at least 3 rare alien artifacts (e.g., `Omega Mark`, `Translator Fragment`, `Alien Core`).
*   **Mechanism:** Users combine the settings from their collected items to propose a storyline for "<Hope Part 2>: Humans in Space."
*   **Director Presentation:** The proposal winning the community memecoin vote (governance) is professionally bound into a physical book (designed as a classified space intelligence document) and delivered in person to director Na Hong-jin or his production company (Forged Films) during the film’s summer premiere event.