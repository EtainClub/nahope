**Episode 1 완주 가이드 — Ending C (목격자, 정전 엔딩)**

각 단계 옆 `[T+N]`은 누적 턴. 예산 `MAX_TURNS = 20`.

| # | 위치 | 액션 | 결과 |
|---|---|---|---|
| 1 | **OFFICE** | (맨손) Sung-ki's Pocket 클릭 | Armory Key + Brass Lighter 획득 `T+1` |
| 2 | OFFICE → ARMORY | "→ Armory Locker" 버튼 | 이동 `T+2` |
| 3 | **ARMORY** | Armory Key 장착 → Steel Locker 클릭 | Lubricating Oil + Spare Magazine 획득 `T+3` |
| 4 | ARMORY | UNEQUIP → Behind the Locker 클릭 | Field Report p.1 획득 `T+4` |
| 5 | ARMORY → OFFICE | 이동 | `T+5` |
| 6 | **OFFICE** | Lubricating Oil 장착 → Chief's Drawer 클릭 | Screwdriver + Polaroid (1950) 획득 `T+6` |
| 7 | OFFICE | Polaroid 장착 → Goldstar Typewriter 클릭 | Magnifying Glass 획득 `T+7` |
| 8 | OFFICE | Screwdriver 장착 → Calivan Rifle 클릭 | **Green Slime + Translator Fragment** 획득 `T+8` |
| 9 | OFFICE → YARD | 이동 | `T+9` |
| 10 | **YARD** | UNEQUIP → Radio Antenna 클릭 | 80s Radio 동조, RADIO_TUNED `T+10` |
| 11 | YARD | Gate to Field 클릭 | FIELD로 이동 `T+11` |
| 12 | **FIELD** | Magnifying Glass 장착 → The Cow 클릭 | Ω 낙인 노출, COW_INSPECTED `T+12` |
| 13 | FIELD | UNEQUIP → Disturbed Soil 클릭 | Hopo License Plate 획득 `T+13` |
| 14 | FIELD → FOREST | Forest Edge 클릭 | 이동 `T+14` |
| 15 | **FOREST** | Brass Lighter 장착 → The Fog 클릭 | Field Report 소각, FOG_BURNED `T+15` |
| 16 | FOREST | **UNEQUIP** → The Clearing 클릭 | **봉식이 구출, Omega Mark 획득 → Ending C 🎬** `T+16` |

남는 슬랙: 4턴.

---

## ⚠️ 피해야 할 함정 (Ending A / B 즉사 트리거)

- **Radio를 켜고 Sung-ki 주머니를 뒤지지 마라** → 깨움 → **Ending B (군법회의)**
- **Spare Magazine을 라이플에 장착해 분해 시도하지 마라** → Green Slime 파괴 → 숲 안개 영구 유지 → **Ending A 확정**
- **봉식이와 두 번 대화하지 마라** (Yard에서 Village Youth 클릭) → 봉식이 조기 이탈
- **농로 진입을 미루지 마라** — TURN 17 이상에 Disturbed Soil 클릭하면 까마귀가 번호판을 가져감 (영구 손실)
- **Clearing 클릭 시 Translator Fragment를 장착하지 마라** → Apostate 분기로 빠짐 (Ending C 차단)

---

## 🌑 Ending D (배교자, 히든) — CGC 스토리 갭

위 14단계까지 동일, 15단계 이후 분기:

| # | 위치 | 액션 | 결과 |
|---|---|---|---|
| 15 | FOREST | Brass Lighter 장착 → The Fog 클릭 | 안개 갈라짐 `T+15` |
| **16** | FOREST | **Translator Fragment 장착** → The Clearing 클릭 | **봉식이를 두고 떠남**, APOSTATE_STEP_1 `T+16` |
| 17 | FOREST | UNEQUIP → Path to the Coast 클릭 | COAST 잠금 해제 `T+17` |
| 18 | FOREST → COAST | 이동 | `T+18` |
| 19 | **COAST** | Translator Fragment 장착 → Inscription 클릭 | APOSTATE_STEP_2, "글자가 비스듬히 기울어진다" `T+19` |
| 20 | COAST | Green Slime 장착 → Iron Hatch 클릭 | **Ω Mark (Apostate) 획득 → Ending D 🎬** `T+20` |

(Inscription 순서가 틀리면 Hatch는 "무거워서 안 돌아간다"만 반복 — 시퀀스 추리 필요. 진행도는 Dossier의 Field Report margin note에 점진적으로 노출)

---

## 💡 즉사 실패해도 좋은 점

엔딩 모달에서 **RESTART** 누르면 TURN 1부터 다시. 잃어버린 License Plate 같은 영구 손실 아이템은 그 회차에만 적용 — 새 회차는 깨끗하게 시작.