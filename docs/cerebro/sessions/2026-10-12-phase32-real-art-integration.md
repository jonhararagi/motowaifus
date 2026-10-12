# Phase 32 — Real art integration and live browser proof

**Date:** 2026-10-12  
**Task:** `PHASE32-ART-RECOVERY-001`  
**Status:** `PASS_REAL — visual proof of real sourced assets on isolated branch`  
**Art approval:** `NOT FINAL / HUMAN APPROVAL REQUIRED`  
**Gameplay rules changed:** `NO`

## Repository and exact code candidate

- **Repository:** [jonhararagi/motowaifus](https://github.com/jonhararagi/motowaifus)
- **Branch:** `art-recovery/real-cyberpunk-assets-01`
- **Base HEAD:** `cad8e932914c7b3d1bbd27796468e4c9de59647c`
- **Code + bundled PNG commit:** [`33446fb309adc3046eeeecefb53506fa1611df41`](https://github.com/jonhararagi/motowaifus/commit/33446fb309adc3046eeeecefb53506fa1611df41)
- **Parent:** `cad8e932914c7b3d1bbd27796468e4c9de59647c`
- **Runtime file changed:** `intento_2/webapp/js/combat_presentation.js`
- **Asset package:** `intento_2/webapp/assets/mach-girls-prototype/`

This is a dedicated visual-recovery branch. The change has not been merged into `main` or `mach-girls-2.5d`.

## What changed

1. Replaced the runtime's procedural geometric city skyline with actual PNG artwork from a four-layer cyberpunk city pack; different layers move at separate horizontal parallax speeds.
2. Added actual Biker and Cyborg sprite strips for idle, attack, hurt and defeated/break states. Canvas now crops the source strips into 48×48 animation frames rather than stretching the entire strip as one image.
3. Reordered rendering so the motorcycle appears behind the rider and mirrored the enemy's bike.
4. Asset Studio configured sources retain priority. The third-party prototype assets are fallback-only.
5. Added README, JSON manifest and credits with source URLs, attribution requirements and limitations.

## Asset source and licensing

- **Warped City** by Luis Zuno (`ansimuz`) — [OpenGameArt source](https://opengameart.org/content/warped-city), CC0 1.0. Four background PNG files are bundled locally.
- **3 Cyberpunk Characters** credited to CraftPix.net — [OpenGameArt source](https://opengameart.org/content/3-cyberpunk-characters), OGA-BY 3.0; attribution recorded in `ASSET_CREDITS.md`. Biker and Cyborg idle/attack2/hurt/death strips are bundled.
- **2D Bike Sprite** by Chasersgaming — [OpenGameArt source](https://opengameart.org/content/2d-bike-sprite-1), CC0. The bike image is **not bundled**; due to the connector not exposing the source binary for commit, it loads from the original URL: [`spr_choppernoman_0.png`](https://opengameart.org/sites/default/files/spr_choppernoman_0.png). This is a documented network dependency; if it fails, the existing placeholder is still the fallback.

These sprites are **not final approved Mach-Girls character designs**. The Biker sprite is shown within the player's existing combat identity/HUD, whose runtime label remains Yuri; that label does not establish the third-party sprite as canon or approved Yuri art. The Cyborg is a prototype enemy. Human art direction is still required.

## Live browser verification

- **Exact-SHA preview:** [Open playable preview](https://htmlpreview.github.io/?https://raw.githubusercontent.com/jonhararagi/motowaifus/33446fb309adc3046eeeecefb53506fa1611df41/intento_2/webapp/index.html)
- **Method:** live browser automation against the exact code commit, using the local tutorial/deck gate to reach combat.
- **Observed:** combat UI and CSS loaded; 45 external scripts executed; background PNG assets returned HTTP 200; no JavaScript or unhandled promise errors were observed.
- **Visual result:** layered neon city background, distinct pixel-art riders on motorcycles, incoming-attack telegraph, damage feedback, BREAK effects and a victory-state capture. The browser operator reported no procedural placeholder figures visible in the observed combat.
- **Captures:** browser session reported screenshots captured for combat and victory. The connector result did not expose direct downloadable screenshot files/URLs, so this record links the reproducible exact-SHA preview rather than inventing screenshot links.
- **Startup interaction:** the initial Start Battle control was disabled until the game's existing saved-deck/tutorial requirements were satisfied. The local tutorial flow was completed to start battle; it was not falsely recorded as a direct click on an initially disabled control. Temporary local deck/tutorial state was restored afterward.
- **JavaScript parse check:** `PASS_STATIC` via V8 parse (`new Function`) before commit.
- **Admin-data workflow:** [run #25](https://github.com/jonhararagi/motowaifus/actions/runs/38247437847) = `SUCCESS`; it ran only `node --test tests/admin_data_v2.test.mjs`, unrelated to combat presentation.
- **Focused combat/presentation Node tests and full suite:** `NOT_RUN` by this task; no CI PASS is claimed for them. Browser visual evidence is separate from a suite/CI claim.

## Files changed in the code + asset commit

- `intento_2/webapp/js/combat_presentation.js`
- `intento_2/webapp/assets/mach-girls-prototype/ASSET_CREDITS.md`
- `intento_2/webapp/assets/mach-girls-prototype/README.md`
- `intento_2/webapp/assets/mach-girls-prototype/prototype_asset_manifest.json`
- Four Warped City background PNGs
- Four Biker sprite sheets
- Four Cyborg sprite sheets

16 files total in commit `33446fb...`.

## Scope and remaining work

- `main`: unchanged.
- `mach-girls-2.5d`: unchanged.
- No pull request created, no merge, no gameplay mechanics/energy/card damage changes.
- The bike file still needs bundling locally when the source binary can be retrieved without using a workaround; the current direct URL is documented and was observed in the browser.
- Current third-party art is a real, playable prototype improvement, not the final anime/bōsōzoku art pass. Next artwork work should find a coherent rider + motorcycle + action/hurt set that matches the intended anime style, then keep it in Asset Studio as `DRAFT` until explicit human approval.
- Do not use the visual proof to claim final art quality, the whole RPG is complete, or browser performance has been fully profiled.

## Evidence links

- [Code/assets commit](https://github.com/jonhararagi/motowaifus/commit/33446fb309adc3046eeeecefb53506fa1611df41)
- [Combat presentation source on branch](https://github.com/jonhararagi/motowaifus/blob/art-recovery/real-cyberpunk-assets-01/intento_2/webapp/js/combat_presentation.js)
- [Credits](https://github.com/jonhararagi/motowaifus/blob/art-recovery/real-cyberpunk-assets-01/intento_2/webapp/assets/mach-girls-prototype/ASSET_CREDITS.md)
- [Exact-SHA playable preview](https://htmlpreview.github.io/?https://raw.githubusercontent.com/jonhararagi/motowaifus/33446fb309adc3046eeeecefb53506fa1611df41/intento_2/webapp/index.html)

## Next single task

`PHASE32-ART-RECOVERY-002 — SOURCE A COHERENT ANIME RIDER + MOTORCYCLE SET`

Continue from this handoff. Do not repeat discovery of the current CC0/OGA assets. Search for a more stylistically coherent anime/bōsōzoku rider-bike set, verify licensing, and only then prepare the next asset integration. Maintain a clear distinction between technical prototype art and human-approved final art.
