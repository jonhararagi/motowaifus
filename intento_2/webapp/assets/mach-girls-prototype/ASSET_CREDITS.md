# Mach-Girls prototype art — asset provenance and licenses

**Integration status:** PROTOTYPE ASSETS INTEGRATED — NOT FINAL CHARACTER ART.

This pack exists to replace procedural placeholder polygons with real background and sprite-sheet PNGs so that the current Canvas combat scene visibly uses actual art. It does not establish final canon for Yuri, Maki, or any enemy, and no asset has been marked approved in Asset Studio.

## Layered cyberpunk city background

- **Title:** Warped City
- **Artist:** Luis Zuno (`ansimuz`)
- **Original page:** https://opengameart.org/content/warped-city
- **License:** CC0 1.0 Universal.
- **Files:** `backgrounds/warped-city/skyline-a.png`, `skyline-b.png`, `buildings-bg.png`, `near-buildings-bg.png`.
- **Source mirror:** https://github.com/tiankaixie/fuzzy-octo-giggle/tree/401044c9300a859e5b44bfe2e51ff6090191d7e2/assets/warped_city/bg
- **Use here:** four source PNG layers rendered at different heights and horizontal parallax speeds. The PNG files are copied unchanged; scaling and placement happen in the runtime.

## Animated cyberpunk characters

- **Title:** 3 Cyberpunk Characters
- **Artist/licensor named by source credits:** CraftPix.net
- **Original page:** https://opengameart.org/content/3-cyberpunk-characters
- **License:** OGA-BY 3.0 — attribution required.
- **Required attribution:** “3 Cyberpunk Characters” by CraftPix.net, via OpenGameArt.org.
- **Source mirror:** https://github.com/tiankaixie/fuzzy-octo-giggle/tree/401044c9300a859e5b44bfe2e51ff6090191d7e2/assets/cyberpunk_chars
- **Files:** Biker and Cyborg sprite strips: `idle.png`, `attack2.png`, `hurt.png`, `death.png`.
- **Frame layout:** horizontal strips of 48×48 pixels; idle 4 frames, attack2 8, hurt 2, death 6.
- **Use here:** Canvas crops individual frames at runtime for idle/attack/hurt/break/defeat. The biker strip is a temporary playable unit, **not Yuri's approved design**; the cyborg is a temporary enemy unit.

## Motorcycle sprite

- **Title:** 2D Bike Sprite
- **Artist:** Chasersgaming
- **Original page and license:** https://opengameart.org/content/2d-bike-sprite-1
- **License:** CC0 public-domain dedication, as shown on the source page.
- **Direct runtime source:** https://opengameart.org/sites/default/files/spr_choppernoman_0.png
- **Bundling limitation:** the connector did not expose the origin image bytes for a repository-local commit. This one PNG remains loaded from its original public URL; it requires network access. If the origin is unavailable, the existing procedural motorcycle fallback remains visible. This is not represented as a locally bundled asset.
- **Use here:** a separate side-view chopper sprite, drawn behind the rider; the enemy version is mirrored. It is a prototype bike, not a final bosozoku design.

## Asset governance

- All these records are prototype defaults only and are fallback sources. A source explicitly configured in Asset Studio takes priority.
- Nothing in this change marks any record `APPROVED`.
- Do not relabel these third-party characters as Yuri/Maki canon. Human art direction and approval remain required for final Mach-Girls assets.
- No generative image was created for this integration.
