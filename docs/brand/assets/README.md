# Brand asset pack

Generated 2026-07-20 from the ratified Identity Kit Vol. 01 (see `../brand-standards.md`). All text is converted to vector outlines using the repo's bundled brand fonts (`repo/assets/fonts/`), so the SVGs render identically everywhere with no font dependencies. Colors are the seven canonical tokens only.

## Contents

- `wordmark/` — A · Inline Lockup (the logo). `-light` = ink on transparent, `-light-bone` = ink on bone, `-reversed` = bone on ink. Also the sanctioned alternates: `-b-stacked-*` (B · Stacked Masthead, for splash/footer/OG) and `-c-flag-*` (C · Mono Flag, for column headers). PNG @2x exports for quick drops into social tools.
- `facebook/` — Facebook page kit: `fb-profile-*` (accent monogram, square, safe inside the circle crop; 320 min + 1080), `fb-cover-*` (1640×624, light + dark, lockup + tagline centered in the safe area), and `fb-post-*` (1200×630 shared-post template + a worked example). Edit copy by regenerating with `gen_wordmark_bc_facebook.py`.
- `monogram/` — italic-A mark. `light` (ink A, ember rule, bone), `dark` (bone A, ember rule, ink), `accent` (bone A + rule on ember), `solo` (A only, for placement next to the full wordmark).
- `app-icon/` — 1024px rounded-square icons; **accent is the adopted default**; ink and bone are sanctioned alternates.
- `favicon/` — accent-ground set at kit-spec sizes: 16 (A only), 32 (A + thin tally), 64 and 180 (full mark).
- `social/` — the three 1200×630 card templates as SVG masters + PNG: `sitewide-light`, `invite-dark`, `report-accent`. Headline/label/footer text is placeholder copy from the kit — edit the SVG text paths by regenerating with new copy (see below), or use them as layout reference.
- `gen_brand_assets.py` — the generator. Regenerate everything (or edit copy/sizes) by running it in an environment with `fonttools` + `cairosvg` and the repo fonts at the path set in `FONTS`.

## Usage notes

- SVGs are the masters; export PNGs at whatever size a platform needs (cards are 1200×630 = OG/Twitter/LinkedIn standard).
- Don't rebuild the wordmark in live type in design tools unless Newsreader Italic 400 + Inter Tight 600 (0.34em tracking) are installed — otherwise use these outlined files.
- The repo's `public/icon-*.svg/png` marks are pre-kit and off-brand; when syncing to the repo, these files should replace them.
