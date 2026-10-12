# PHASE 32 — Real Urban Art Background in the Combat Canvas

**Date:** 2026-10-12  
**Task:** `PHASE32-REAL-ART-BACKGROUND-001`  
**Branch:** `work/mach-girls-visual-assets-001`  
**Base SHA:** `cad8e932914c7b3d1bbd27796468e4c9de59647c`  
**Implementation commit:** `5baf18f0de53a5d671cae7be7c459627de381b66`  
**Status:** `BACKGROUND_DRAWING_VERIFIED_IN_SHA_PINNED_BROWSER_PREVIEW; AUTOMATED_TESTS_NOT_RUN; FULL_VISUAL_POLISH_NOT_VERIFIED`

## Purpose

The production/design gap was that Mach-Girls documented a layered urban 2.5D battlefield, but the Canvas built its skyline from rectangles and lines when no background art had been approved. The character and motorcycle fallback paths also draw technical geometric placeholders. This phase takes a first concrete step by wiring a real, creator-hosted urban illustration into the live combat canvas, not only adding documentation or placeholders.

## Source asset and usage terms

- **Creator:** みんちりえ / Minchirie.
- **Source and terms:** https://min-chi.material.jp/fm/bg_c/urban_street/
- **Runtime source URL:** https://min-chi.material.jp/mc/materials/background-c/urban_street/_urban_street_1.jpg
- **Published format/size:** JPEG, 1920×1080.
- **Terms checked:** the creator explicitly permits use and modification in games, with no usage report and no required attribution (credit is appreciated). The creator asks users not to redistribute or sell the original image as a standalone asset.
- **Delivery decision:** the game references the creator-hosted image rather than placing their original binary in this public repository. If the host stops serving the image or cross-origin rules prevent loading, the old procedural fallback remains available.

## Implementation commit

`5baf18f0de53a5d671cae7be7c459627de381b66`

Files changed:
- `intento_2/webapp/js/combat_presentation.js`
- `tests/combat_presentation_background_art.test.mjs`
- `docs/design/ASSET_CREDITS.md`

Runtime behavior:
- Adds `scene.background` to supported Canvas asset slots.
- Seeds this slot with the creator-hosted illustration.
- Draws it cover-scaled in the live Canvas, with slight camera drift and a non-destructive blue/purple/magenta night grade.
- Avoids drawing the procedural fake skyline on top of the illustration when the image has loaded.
- Maps a human-approved Asset Studio `BACKGROUND` record into this slot. `DRAFT` assets are still rejected by the existing approval contract.
- Keeps the original procedural fallback if the illustration cannot load.

## Verification evidence

### Real browser preview — PASS

Exact-SHA preview:
https://html-preview.github.io/?url=https://github.com/jonhararagi/motowaifus/blob/5baf18f0de53a5d671cae7be7c459627de381b66/intento_2/webapp/index.html

Browser result:
- Exact-SHA preview loaded the real game UI/runtime with a 2292×1000 combat canvas and 44 SHA-pinned JavaScript modules.
- The urban street illustration was visible in the combat canvas before battle start.
- No JavaScript runtime exceptions were detected.
- Issues observed: `favicon.ico` returned 404; the SHA-pinned stylesheet reported `net::ERR_BLOCKED_BY_ORB`. The page remained visible, so this does not certify complete CSS styling or final visual quality.
- Image URL directly verified as the referenced runtime source:
  https://min-chi.material.jp/mc/materials/background-c/urban_street/_urban_street_1.jpg

### Automated tests — NOT RUN

Three tests were added to `tests/combat_presentation_background_art.test.mjs`:
1. Background slot exists and is seeded with the source URL.
2. Approved Asset Studio background maps to `scene.background`; Draft is rejected.
3. Once loaded, the image URL reaches Canvas `drawImage`.

The runtime test workflow `.github/workflows/rocket-bunny-runtime-tests.yml` runs on push to `main`, PRs targeting `main`, or manual dispatch. No run was produced for this isolated work branch and no CI or local Node tests were executed in this task. Do not call the new tests passed.

## Scope protection

- `main` unchanged.
- `mach-girls-2.5d` unchanged.
- No merge or PR created.
- Combat math, Energy, cards, cooldowns, BREAK/BURST rules and save state were not intentionally changed.
- This is a working art integration on an isolated branch, not a final approved background or a declaration that the entire game is finished.

## Follow-up asset search — 2026-10-12

Additional searches were performed against OpenGameArt, Japanese creator material sites, BOOTH and itch.io. Findings are recorded to avoid repeating failed candidates:

- **OpenGameArt — [Iara (mermaid)](https://opengameart.org/content/iara-mermaid):** CC0 sprite sheet includes a character riding a bike and one damage frame, but is pixel art and its look conflicts with the currently selected illustrated urban background. Rejected for the Mach-Girls visual target; kept as a possible technical reference only.
- **OpenGameArt — [2D Bike Sprite](https://opengameart.org/content/2d-bike-sprite-1):** CC0 vector chopper, approximately 240×140 px, with and without a blank rider. License is permissive, but the small simple chopper alone does not satisfy the intended bosozoku motorcycle/rider style. Not integrated.
- **Wataokiba (わたおきば):** the artist explicitly allows game use and cropping/resizing/color changes, but prohibits redistributing the original source material. The inspected `josei20.png` is a bust portrait rather than a full-body riding/action pose, so it is not a combat sprite. More entries require visual suitability inspection before use.
- **BOOTH item 6505641:** explicitly declares AI-generated art; excluded from the asset candidate pool.
- **BOOTH item 8814743:** a free male mini-bike standee with a comedic style and terms prohibiting redistribution; not a suitable Yuri/Mach-Girls combat rider.
- **itch.io tags:** the public category returned zero matches for `Anime + motorcycle` and `Anime + motorbike`. Some `No AI` category fetches were blocked, so those pages are not considered exhaustively inspected.

### Conclusion of follow-up search

No human-authored, free, visually compatible full-body female riding/action asset with clear game-use terms has yet been verified. No mismatched sprite has been committed merely to replace geometry with an equally unsuitable image. The city background remains a real improvement; the rider and motorcycle art gate remains open.

## Remaining visible gap

The rider and motorcycle still use the runtime's technical geometric fallback unless a human-approved character/motorcycle asset is present. Enemies may also lack finished art. A single real city background is an actual improvement, but it does **not** close the complete game-art gap.

## Next task

`PHASE32-REAL-ART-ACTOR-001 — FIND AND INTEGRATE A COMPATIBLE HUMAN-AUTHORED RIDER/MOTORCYCLE ASSET`

Continue searching real creator sources and GitHub/OpenGameArt/BOOTH/itch.io. Confirm the author and usage terms. Exclude generative-AI artwork for this art search and avoid mixing styles that obviously clash with the selected background. Integrate to existing approved Asset Studio slots only where the asset genuinely fits, record the source terms, and test the visible Canvas output. If no compatible pack is found, document exactly what was checked and keep searching alternative sources instead of restarting a broad audit.

