# Phase 32 — Real Asset Visual Proof

## Objective
Use committed open-source assets in an opt-in combat renderer path. Avoid treating technical geometric placeholders as finished art.

## Branch baseline
- Repository: `jonhararagi/motowaifus`
- Branch: `visual/phase32-asset-first-pass`
- HEAD BEFORE: `cad8e932914c7b3d1bbd27796468e4c9de59647c`

## Runtime activation
Append `?phase32Assets=1` to the browser combat page. Without this query value, the current renderer path remains in use.

## Implementation
- Localized three real layers of cyberpunk city art.
- Imported and connected a combined rider/vehicle pixel sprite.
- Imported and connected three enemy idle frames and ten movement frames.
- Imported and connected the six-frame explosion strip for the combat impact renderer.
- Added a local image cache and opt-in renderer path, multi-layer parallax and perspective road.
- No combat systems or balance were intentionally modified.

## Limits
- Art is a temporary, coherent pixel-art test pack, not final Mach-Girls anime art.
- The rider sprite is low resolution (8×15 px), despite being a real CC0 asset.
- Browser screenshots and attack/impact/BREAK/BURST visuals are not yet verified.
- No workflow or CI was executed by this task.
- The work is on an isolated branch. Do not merge or promote without real-browser evidence and human art-direction review.

## Next gate
Open the page from the exact branch/SHA with `?phase32Assets=1`, capture idle and attack/impact plus BREAK/BURST, and review visual quality against the intended Mach-Girls direction.
