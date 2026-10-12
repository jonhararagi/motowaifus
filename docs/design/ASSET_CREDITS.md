# Mach-Girls — asset credits and provenance

## Current development background

- **Asset:** 都会の街中 / Urban Street (creator-hosted image reference; 1920×1080 JPEG; three time-of-day variants are listed on the source page).
- **Creator:** みんちりえ (Minchirie).
- **Source / terms:** https://min-chi.material.jp/fm/bg_c/urban_street/
- **Runtime image URL used by this branch:** https://min-chi.material.jp/mc/materials/background-c/urban_street/_urban_street_1.jpg
- **Usage status:** allowed for game use and modification under the creator's published terms; reporting and credit are not required. The creator requests that the original source image not be redistributed or sold as a standalone asset.
- **Implementation status:** provisional remote runtime reference on `work/mach-girls-visual-assets-001`. The image is not copied into this repository; the Canvas applies a non-destructive night-color grade. If the host is unreachable, the existing procedural fallback remains available.
- **Game-art status:** NOT FINAL APPROVED ART. This is a real environment background, not Yuri's final character art, motorcycle art, enemy sprite or a human approval of the full visual direction.
- **Replacement path:** an explicitly human-approved `BACKGROUND` record in `mach_girls_asset_catalog_v1` takes precedence through the Asset Studio catalog slot `scene.background`.

## Future asset intake rules

Each imported visual asset must record its original author, exact source URL, license/terms URL, use conditions, any required credit, local/static path or remote URL, SHA-256 when the file itself is vendored, and whether it is DRAFT, TEST-ONLY or human-approved. Do not treat a preview, mockup, or technical placeholder as final character art.
