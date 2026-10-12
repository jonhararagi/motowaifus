# Phase 32 — Real Asset Visual Prototype

**Status:** isolated visual prototype; not final Mach-Girls art and not human-approved character art.  
**Runtime activation:** append `?phase32Assets=1` to the game page. Without that parameter, the current renderer path is unchanged.  
**Purpose:** prove real local art loading for the environment, rider/vehicle, enemy animation and impact, without changing combat rules.

All asset files are committed beneath `intento_2/webapp/assets/candidates/phase32-warped-city/`.

## Warped City — backgrounds, enemy animation and impact
- **Creator:** Luis Zuno / ansimuz.
- **License:** CC0 / public domain dedication; no attribution required, recorded here for provenance.
- **Source and license terms:** https://opengameart.org/content/warped-city
- **Project page:** https://ansimuz.itch.io/warped-city
- **Mirror used for fetching source files:** https://github.com/humancto/legacy-games/tree/main/warped-city/assets

Files: `skyline-a.png`, `buildings-bg.png`, `near-buildings-bg.png`, `cop-idle-1.png`–`cop-idle-3.png`, `cop-run-1.png`–`cop-run-10.png`, and `enemy-explosion.png` (six-frame animation strip).

## Kenney Pixel Vehicle Pack — integrated rider and cycle
- **Creator:** Kenney.
- **License:** CC0.
- **Original pack:** https://kenney.nl/assets/pixel-vehicle-pack
- **Exact asset mirror:** https://github.com/Papyszoo/CC0-Public-Domain-Sprites/blob/main/packs/kenney-pixel-vehicle-pack/sprites/Characters/woman_cycle.png

File: `woman_cycle.png`, a combined rider-on-cycle sprite included solely to validate the actor/vehicle render path. Its source size is just 8×15 pixels.

## Limits and approval status
- This is a temporary pixel-art style study, **not the definitive Mach-Girls anime look**.
- No final Yuri, enemy-faction, motorcycle or character identity is established by these assets.
- All these assets remain candidates; none is promoted to the human-approved Asset Studio catalog.
- Normal rendering remains unchanged unless `?phase32Assets=1` is present.
- Combat rules, Energy, cards, damage, input lock, RNG, saves and telemetry are outside this visual-only change.
- Actual browser screenshot verification is pending. Do not promote the branch until idle, attack/impact and BREAK/BURST states are captured from a real browser.

## Verification target
Open the branch version of the web app with `?phase32Assets=1`. Verify local asset loading, three parallax layers, the rider/vehicle sprite, animated enemy frames and six-frame impact sprite during live combat.
