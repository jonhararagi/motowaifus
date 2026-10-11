# Rocket Bunny Petty — Mechanics Ledger
| Mechanic | Status | Evidence | Current Decision | Runtime Integrated? | Next Research |
|---|---|---|---|---|---|
| Nitro | RESEARCHED | Phases 3–5. VERIFIED. | MODIFY / RESEARCH MORE | No | OPEN DESIGN QUESTION: consumer structure and Redline interaction. |
| Redline | RESEARCH MORE | Phases 6–10. VERIFIED. | MODIFY / RESEARCH MORE | No | OPEN DESIGN QUESTION: targeted state coverage and human validation. |
| Energy | RESEARCHED | Prototype action budget. VERIFIED. | Research context only | No | OPEN DESIGN QUESTION: complementarity with Nitro. |
| Risk / Amplification | RESEARCHED | Phase 10B: ATTACK 45->56. VERIFIED. | Research only | No | OPEN DESIGN QUESTION: human readability and risk perception. |
| Enemy Intent | RESEARCHED | ATTACK/DEFEND/SPECIAL prototype context. VERIFIED. | Keep as research variable | No | OPEN DESIGN QUESTION: player-decision interaction. |
| RNG | RESEARCHED | Seeded deterministic experiments. VERIFIED. | Keep testability | No | OPEN DESIGN QUESTION: production RNG requirements. |
| Cards | RESEARCHED | Shot, Guard, Pump, Ram. VERIFIED. | Experimental vocabulary | No | OPEN DESIGN QUESTION: role clarity. |
| Deck / Hand / Discard | RESEARCHED | Frozen-state context. VERIFIED. | Research context | No | OPEN DESIGN QUESTION: availability and opportunity cost. |

## Current runtime deck / hand contract

The Deck / Hand / Discard row above is **HISTORICAL / RESEARCHED context**. It documents earlier experimental deck opportunity-cost material and must not be read as the current player-facing runtime contract.

**CURRENT / VERIFIED runtime contract:**

- generic MVP vocabulary / fallback deck = 9 cards;
- CardSystem total definitions = 17;
- Yuri character kit = 4 cards;
- player-facing hand capacity = 5;
- Yuri effective initial hand = 4, **CURRENT / VERIFIED / DERIVED FROM CURRENT RUNTIME**;
- YURI_EFFECTIVE_HAND_IS_INTENTIONAL = UNRESOLVED;
- low-level createCombatDeckState() factory default hand limit = 4.

These layers remain distinct: catalog/vocabulary != runtime deck != character kit, and hand capacity != effective initial hand.

## Redline history
Phase 6: SUPPORTS / KEEP.
Phase 7: SUPPORTS / KEEP.
Phase 8: SUPPORTS / MODIFY.
Phase 9: SUPPORTS / RESEARCH MORE.
Phase 10: SUPPORTS / MODIFY.

Phase 10 found additional observed Redline eligibility at Nitro 20–24 for cost 20, while costs 25 and 30 were identical in the 10,000-seed adaptive sample. The Phase 9 union had Nitro >=30 throughout, so forced-resolution math did not separate 25 from 30.

## Phase 11 reachability fact
Phase 11 VERIFIED that the historical Nitro arithmetic preserves multiples of 5: initial 0; +35 Pump; -25 Guard; -40 Ram; -25 Redline; cap 100. Therefore Nitro 26–29 are unreachable without changing the mechanics. A controlled, mechanically reached Nitro-25 state was reproduced at seed 107771. Phase 11 was BLOCKED before full 25-vs-30 paired resolution.

## Phase 14 evidence boundary
Phase 14-A through Phase 14-E are completed in the project phase chain.

Phase 14-B is AUTHENTIC HISTORICAL PAIRED EVIDENCE.

Phase 14-E is RECONSTRUCTED_WITH_EXPLICIT_METHOD and does not alter the historical mechanic records. It does not authorize Nitro or Redline integration and does not select a gameplay parameter.

Human playtesting: UNKNOWN / NOT RUN.

Nitro / Redline: OPEN DESIGN QUESTION.

No formal subsequent Phase 15 was defined in the repository before the documentation synchronization task.


## Mach-Girls current runtime addendum — 2026-10-11

This addendum describes the code on `mach-girls-2.5d`; the Nitro/Redline research table above remains historical research and is not evidence of runtime integration.

**CODE CANDIDATE VERIFIED:** `536795bc51e70634187e263dda7c768e3d31a742`  
**CI:** run `38138152601`, job `114466217188`; exact checkout, syntax checks, focused MVP integration test and full suite all passed (`254/254`). Browser QA remains NOT VERIFIED.

- **Combat authority:** existing GameState, CombatEngine/Rules, CombatClock/fixed-step advance, GameActions, CardSystem, EnergySystem, EnemyBehaviorSystem, CombatRNG, BreakSystem and BurstSystem are reused. Presentation consumes gameplay events and is not the authority for damage, costs, outcomes or progression.
- **Preparation:** the bounded player loadout persists exactly four distinct eligible card IDs in `bosozoku_player_save`. The saved deck is fed into the real combat-deck creation path. This does not define card unlocks or a larger collection.
- **Deck/hand:** generic fallback vocabulary remains 9 cards, Yuri kit remains 4 cards, and player-facing hand capacity remains 5. The effective Yuri initial hand remains 4 based on the current kit and is still an OPEN DESIGN QUESTION, not changed by the selection work.
- **Onboarding:** saved onboarding step state gates preparation and the first actual player action / battle result. This is a bounded first-run teaching path, not a generic tutorial engine.
- **Rewards/progression:** existing RewardSystem prevents duplicate claims. Existing ProgressionSystem has two bounded choices: +5 base damage to Disparo Neón or Embestida Nitro. Automated integration confirms the chosen bonus is visible through the real combat card-definition path in the next battle.
- **Persistence:** SaveManager schema version 2 stores loadout/onboarding and migrates version-1 player/reward/progression records without discarding their prior values. Regression tests cover migration, missing/corrupt data and reload.
- **Outside the MVP:** full collection/unlock economy, garage, route/story/relationship systems, richer campaigns and approved character art are not claimed complete.
- **Open / protected:** Nitro and Redline remain outside runtime and open for separate authorization; Yuri↔Maki Mach identity remains unresolved; no gameplay turn model or duplicate engine/clock/RNG/renderer was introduced.
