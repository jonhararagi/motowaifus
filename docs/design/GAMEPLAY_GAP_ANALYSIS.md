# Mach-Girls — Gameplay Gap Analysis (including Rocket Bunny Petty historical context)

## Current Mach-Girls MVP status — 2026-10-11

**AUTOMATED FLOW: VERIFIED; BROWSER PLAYTHROUGH: NOT VERIFIED.**

The current `mach-girls-2.5d` branch implements and remotely validates a bounded first-session flow: persistent four-card preparation → tutorial gates → existing real-time combat → real outcome → idempotent reward → persisted progression choice → next battle/retry state. Exact tested runtime candidate: `536795bc51e70634187e263dda7c768e3d31a742`; CI run `38138152601` / job `114466217188` reports 254 tests passing and 0 failing.

This is an automated integration result, not Browser QA. Browser live interaction remains **NOT VERIFIED** pending a human-operated session against the development build. The remaining full product gaps below (story, routes, collection, garage, relationship systems, etc.) remain gaps and are not implied to be complete by this bounded MVP.

## Historical specification baseline
The following Phase 16 assessment is retained as historical context; current rows below are superseded where noted by the Mach-Girls runtime closeout.

## Phase
POST-PHASE 16 — CHARACTER ART, WARDROBE & GAMEPLAY COMPLETION SPECIFICATION

**STATUS:** SPECIFICATION COMPLETE · POST-COMBAT PROGRESSION BRIDGE PROTOTYPE IMPLEMENTED  
**BASE SHA:** 88fccdd5109bff5c8257c5492b4e0ee9606c63a9  
**RUNTIME GAMEPLAY CHANGES:** NONE  
**PHASE 14–16 EVIDENCE MODIFIED:** NO

## Epistemic rule
IMPLEMENTED/VERIFIED means directly evidenced in runtime code. DOCUMENTED_ONLY means design text without current player-facing implementation. PROTOTYPE means preserved research material. UNKNOWN means not established. MISSING means no current implementation identified. PROPOSED/HYPOTHESIS/EXPLORATION are future design only.

## Repository audit

| System | Current state | Evidence | Player-facing? | Missing pieces | Priority | Status |
|---|---|---|---|---|---|---|
| Combat | IMPLEMENTED | combat.js, GameState, CombatEngine | YES | richer content and presentation | P0 | VERIFIED |
| Energy | IMPLEMENTED | energy.js | YES | future Nitro interaction | P0 | VERIFIED |
| Cards | IMPLEMENTED / VERIFIED | CardSystem, GameActions, Rules and save-backed loadout integration | YES | full collection/unlock UI remains outside the bounded MVP | P0 | VERIFIED |
| Deck/hand/discard | IMPLEMENTED / VERIFIED (bounded four-card selection) | SaveManager v2 loadout + combat.js battle configuration + real GameState combat deck | YES | full collection/deck inventory and human usability review remain outstanding | P0 | VERIFIED (automated integration) |
| Nitro | not runtime-integrated | Mechanics Ledger + historical prototypes | NO | authorized gameplay specification | P1 | OPEN DESIGN QUESTION |
| Redline | not runtime-integrated | Mechanics Ledger + historical prototypes | NO | authorized gameplay specification | P1 | OPEN DESIGN QUESTION |
| Enemies | IMPLEMENTED | enemies.js | YES | more content and boss framework | P0 | VERIFIED |
| Enemy intentions | PARTIAL | enemy actions/AI exist; rich intent UI not established | INDIRECT | telegraph/presentation | P1 | PARTIAL |
| RNG | IMPLEMENTED | seeded RNG | INDIRECT | explicit rules/deck version metadata | P0 | VERIFIED |
| Rewards | IMPLEMENTED | rewards.js + app.js | YES | broader reward choices/sinks | P0 | VERIFIED |
| BTP | DOCUMENTED_ONLY | Product System Spec | NO | product decision and implementation | P2 | HYPOTHESIS |
| Garage | DOCUMENTED_ONLY | design/product docs | NO | UI, build data, progression | P1 | PROPOSED |
| Progression | IMPLEMENTED / VERIFIED (bounded MVP) | existing RewardSystem, ProgressionSystem, SaveManager; next battle uses saved +5 card bonus | YES | broader progression choices/economy remain outside MVP | P0 | VERIFIED (automated integration) |
| Collection | PARTIAL infrastructure | database schema; default arrays empty | NO meaningful collection UX | content and UI | P1 | PARTIAL |
| Story | MISSING | no runtime story flow identified | NO | scene/event system | P1 | MISSING |
| Relationships | DOCUMENTED_ONLY | design/player-behavior docs | NO | relationship state/events | P2 | PROPOSED |
| Routes | MISSING | no route controller identified | NO | route model | P2 | MISSING |
| Daily content | MISSING | product proposal only | NO | scheduling/content rules | P2 | PROPOSED |
| Weekly content | MISSING | product proposal only | NO | seed rotation/result identity | P2 | PROPOSED |
| Bosses | PARTIAL | Banchou Rookie is ELITE enemy; no boss controller | YES as enemy | phases/controller/rewards | P1 | PARTIAL |
| Challenge modes | MISSING | product proposal only | NO | mode controller/modifiers | P2 | EXPLORATION |
| Save/Load | IMPLEMENTED / VERIFIED | SaveManager v2 + tested v1→v2 migration and persistence tests | YES indirectly | future schema changes still require migrations | P0 | VERIFIED |
| Session flow | IMPLEMENTED / VERIFIED (bounded MVP) | real entrypoint integration test through result, reward, save and next battle | YES | browser playthrough NOT VERIFIED | P0 | VERIFIED (automation) |
| Tutorial | IMPLEMENTED / VERIFIED (bounded six-step onboarding) | persisted step gates: saved deck, accepted action and actual battle result | YES | human clarity/usability review remains | P0 | VERIFIED (automation) |
| Onboarding | IMPLEMENTED / VERIFIED (bounded MVP) | real UI state persisted in SaveManager v2 | YES | broader narrative tutorial/content remains outside scope | P0 | VERIFIED (automation) |
| Telemetry | IMPLEMENTED instrumentation | telemetry.js | NO | analytics backend not present | P1 | VERIFIED |
| Telegram | IMPLEMENTED initialization | index.html/app.js | YES in Telegram | production account/service integration | P1 | VERIFIED |
| Character data | PARTIAL | enemy identity metadata; empty default waifus | INDIRECT | authored roster | P1 | PARTIAL |
| Art assets | MISSING | repository tree has no matching art/image asset paths | NO | asset set + manifest | P1 | MISSING |
| Wardrobe | MISSING | no wardrobe data/runtime | NO | outfit registry | P2 | MISSING |
| Camera/POV | PARTIAL | single canvas combat presentation | YES | authored presentation state machine | P2 | PARTIAL |

## Current playable gameplay

The actual runtime is a compact semi-real-time loop:

START BATTLE → REAL-TIME / SEMI-REALTIME COMBAT → CARD / ENERGY ACTIONS → AUTOMATIC ENEMY BEHAVIOR → SEEDED RESOLUTION → VICTORY / DEFEAT → REWARD / PROGRESSION → SAVE → NEXT BATTLE.

Verified runtime content includes:
- Energy maximum 100 in the current combat state;
- player-facing hand capacity 5;
- generic fallback initial deck 9 cards;
- Yuri uses a separate 4-card character kit, producing an effective initial hand of 4 when that kit is selected;
- DISPARO NEÓN, EMBESTIDA NITRO and ESCUDO DARK;
- STREET PUNK, IRON GUARD, NITRO RAIDER and BANCHOU ROOKIE;
- seeded deterministic RNG;
- victory/defeat;
- XP/currency rewards and level calculation;
- localStorage save version 2 with safe version-1 migration;
- canvas + DOM combat presentation;
- Telegram WebApp initialization;
- client telemetry instrumentation.

This is an MVP combat demonstration, not the complete RPG/garage/narrative product.

HISTORICAL / OUTDATED BASELINE PRESERVED:
Earlier gameplay-gap documentation described a hand limit of 4 and a fixed seven-card initial deck. Those values are historical documentation context, not the current runtime contract.


## Documented but not current gameplay

Nitro/Redline runtime use, Garage gameplay, BTP economy, narrative routes, relationship progression, Daily/Weekly content, challenge/mutator modes, boss framework, persistent deckbuilding, character art, wardrobe and authored camera/POV are not current player-facing systems.

## Core completion model

START → ONBOARDING → PREPARATION → COMBAT → RESULT → REWARD → PROGRESSION → NEW DECISION → NEXT COMBAT

Required for a coherent minimum product slice:
1. deterministic onboarding;
2. preparation state;
3. reliable combat;
4. readable result;
5. reward claim;
6. one meaningful persistent progression choice;
7. explicit next goal;
8. persistent save;
9. telemetry for the funnel.

The current branch closes the bounded onboarding, preparation, reward, progression and save/continue path under automated integration tests. Browser/manual usability remains NOT VERIFIED; the broader product remains incomplete.

## Backlog

| ID | System | Task | Dependencies | Spec | Complexity | Validation | Target |
|---|---|---|---|---|---|---|---|
| GP-01 | Onboarding | bounded persisted six-step first-session flow | UI/save/real combat events | IMPLEMENTED | low | human browser playtest NOT VERIFIED | MVP automation passed |
| GP-02 | Deck | persistent selection of four existing catalog cards | cards/save/data | IMPLEMENTED (bounded MVP) | medium | human playtest + broader collection design pending | MVP automation passed |
| GP-03 | Garage | build/loadout screen | save/character data | NO | medium | design gate | future spec |
| GP-04 | Story | authored scene/event flow | character/save | NO | medium | narrative prototype | future spec |
| GP-05 | Character | authored roster/relationships | Character Bible | schema YES | medium | content review | content phase |
| GP-06 | Art | asset manifest + 2D presentation | Art Direction | YES policy | medium | visual review | art phase |
| GP-07 | Variety | one bounded combat-variety prototype | rules/cards | NO | medium | controlled test | gameplay prototype |
| GP-08 | Mode | Weekly Seed or Challenge prototype | RNG/result identity | NO | medium | controlled test | gameplay prototype |
| GP-09 | Nitro/Redline | separate runtime specification | historical evidence + validation | NO | high | explicit gate | separate phase |
| GP-10 | Relationships | deterministic authored events | story/save | NO | medium | human playtest | narrative prototype |

The separate controlled prototype implements the bounded post-combat progression bridge; it does not implement GP-02 or the broader backlog.
