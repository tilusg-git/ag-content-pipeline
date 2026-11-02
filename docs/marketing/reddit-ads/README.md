# Reddit ad assets

Image sources, build scripts and renders for the Reddit ads test. The strategy, copy and month 1 build record are in [`../reddit-ad-creative-plan-2026-10-01.md`](../reddit-ad-creative-plan-2026-10-01.md). The image exploration rounds are in [`../reddit-ad-creative-discovery-2026-10-07.md`](../reddit-ad-creative-discovery-2026-10-07.md).

## What's live: `out/month1-launch/`

These are the exact files uploaded to Ads Manager for the month 1 flight (2026-10-09). Each ad has three sizes:
- `1080x1350`: main image, 4:5
- `1080x1080`: square backup
- `thumb_400x300`: conversation placement thumbnail, 4:3, under 500 KB

| File stem | Ad | `utm_campaign` | Source render |
|---|---|---|---|
| `adA_the-story_*` | A, story angle | `the_story` | `out/round4/R2v2_group-chat-vs-report_*`, from `build_adA_round4.js` |
| `adB_the-price_*` | B, price angle | `the_price` | `out/round5/R5v3_money-at-stake-desk_*`, from `build_adA_round5.js` |

These files are copies. To change an ad, edit the build script, re-render, and copy the new files in. Then record the change in the creative plan's "Month 1 build" section.

## Folders

| Path | Contents |
|---|---|
| `out/month1-launch/` | The live set (above). |
| `out/round6-thumbs/` | Four alternate 400x300 thumbnails (2026-10-19), type-led with no photos, so no background approval is needed. For ad A: `adA2_stale-vs-filed` (split ink/bone, sheet vs. report) and `adA3_report-roster` (the report list, cropped close). For ad B: `adB2_twenty-at-stake` ("$20" on ink) and `adB3_zero-dollar-close` (a cycle-close receipt showing $0). Not uploaded yet. |
| `out/email-review-2026-10-08/` | The four finalists sent for review on 10-08, now with all three sizes. Files 2 (gym) and 3 (desk) are alternate A images, kept for month 2 image variants. |
| `out/round5/` | Green-screen composites (gym, desk, money at stake), with all three sizes. |
| `out/round4/` | Drawn phones on photo backgrounds. R2v2 (spreadsheet vs. report) is the live ad A image, with all three sizes. |
| `out/round3/`, `out/discovery/`, `out/` (top-level `adA_*`, `adB_*`) | Earlier rounds. Superseded, kept for history. |
| `out/feed/` | Feed mockups of each finalist with its headline and body. For internal review only. |
| `bg/` | Photo backgrounds. The `*-green.jpg` files (the phone screen is chroma green) feed round 5. The `Gemini_Generated_Image_*` files are Brandon's AI-generated originals. Under the brand standards §14 extension, each AI background needs Brandon's approval before it ships (see the discovery doc). |

## Scripts

All scripts use the `@napi-rs/canvas` install that lives with `docs/brand/assets/facebook/gen_card.js`. Run them from the project root: `node docs/marketing/reddit-ads/<script>`.

| Script | Renders |
|---|---|
| `build_adA_round5.js` | Round 5 composites. Each one gets 1080x1350, 1080x1080 and a 400x300 thumbnail (cropped on the top half of the screen). |
| `build_adA_round4.js` | Round 4. R2v2 gets 1080x1350, 1080x1080 and a 400x300 thumbnail (the report phone alone). |
| `build_thumbs_round6.js` | Round 6 alternate thumbnails, 400x300 only. |
| `build_feed_mockups.js` | Feed mockups. |
| `build_adA_round3.js`, `build_adA_discovery.js`, `build_adA_concepts.js`, `build_ads.js` | Earlier rounds. |

Re-rendering doesn't change existing outputs: the 1080x1350 renders are byte-identical across runs. That was checked when the square and thumbnail sizes were added on 2026-10-09.
