# Image-backed social quote cards — spec

**Status:** Adopted 2026-07-22 (Grant). Companion to `brand-standards.md` §14 (which sanctions this surface) and the Facebook asset kit in `assets/facebook/`.
**Scope:** Square (1080×1080) and OG (1200×630) social quote cards that place an AG-approved quote over a raster image background. This is the only surface where photographic/AI/CC imagery is sanctioned — see §14 scope limits.

## Instructions for Claude

- Read this before building any image-backed quote card. For plain (no-image) cards, use the existing generator (`assets/facebook/gen_quote_card.py`) — no image rules apply.
- **Never invent or assume a source image.** Grant supplies the image (or explicitly approves an AI/CC one) per post. If none is supplied, build the plain bone card or the paper-texture fallback instead — an image is never required.
- Quotes still come from `docs/research/quote-bank.md` and follow every rule there, including **retire-on-post (rule 7)**: if an image card ships, retire its quote in the same task.
- Generator: `assets/facebook/gen_quote_card_bg.py` (parameterized). It renders the crisp vector type with the repo fonts, so the type never depends on installed fonts.
- **Check for Python first.** All three generators above (`gen_quote_card.py`, `gen_quote_card_bg.py`, plus fontTools/cairosvg/Pillow) assume a Python 3 toolchain. The local Cowork/Windows checkout of this project has **no Python interpreter at all** (confirmed 2026-08-07) — if `python`/`python3`/`py --version` don't resolve to a real interpreter, don't try to install one mid-task; use the Node fallback below instead. If Python *is* available (e.g. a cloud sandbox with this repo mounted), prefer the `.py` generators — they render true vector paths and match the rest of the asset library exactly.

### No-Python path — primary: `gen_card.js` (renders a real PNG)

`assets/facebook/gen_card.js` renders the card **directly to a 1080×1080 PNG on disk** (`backgrounds/out/<slug>.png`, plus a `<slug>.caption.txt` sidecar) using `@napi-rs/canvas` — a prebuilt native binary, no Python and no compiler. Run `npm i` once in `assets/facebook/` (see `package.json` there). This is the path to use whenever the install succeeds: the deliverable is a plain file, so there's no Artifact preview and no right-click-save.

It covers **both** treatments and **both** card kinds:
- `--mode quote` (default) — centered quote + mono attribution.
- `--mode statement` — original AG copy, no quote marks, no attribution line.
- `--image PATH` — enables Treatment B: cover-fit photo + flat ink scrim + reversed bone type + centered A monogram (no URL footer). Scrim via `--filter light|medium|heavy` (0.45 / 0.55 / 0.66) or `--scrim <0..1>` to override.
- Omit `--text` (in `--mode statement`) for an **off-image card** — scrimmed photo + wordmark + kicker + monogram only, message in the caption. Pair with `--filter light`.
- `--yshift PX` — nudge the centered text block (negative = up) to clear a subject in the photo.

```
node gen_card.js --mode statement \
  --text "When you can't see far, commit short. One cycle. One promise. Visible to the people who'll ask." \
  --accent Visible --image backgrounds/source/foggy-trail.jpg --scrim 0.66 --yshift -140 \
  --caption "..." --hashtags "#Accountability #FollowThrough #AccountabilityGroup" \
  --slug foggy-trail-keep-going
```

Then view the PNG, confirm the legibility floor below, and deliver the file. Retire the quote (quote mode only) on post.

### No-Python fallback: `gen_quote_card_canvas.js` (HTML Artifact; plain bone card only)

If `@napi-rs/canvas` can't be installed, `assets/facebook/gen_quote_card_canvas.js` reproduces `gen_quote_card.py`'s exact plain-card layout (wordmark top-left, `FIELD NOTES` kicker, greedy-wrapped centered quote with one ember accent word, mono attribution, URL footer + ember rule) using an HTML5 canvas instead of fontTools/cairosvg. It embeds the three brand fonts as base64 `@font-face` data URIs, so the output is one self-contained `.html` file — no server, no build step. (It also carries a `--mode statement` / `--image` path mirroring `gen_card.js`, for parity.)

```
node assets/facebook/gen_quote_card_canvas.js \
  --quote "Success is never owned; it is rented. And the rent is due every day." \
  --author "Rory Vaden, Take the Stairs" \
  --accent due \
  --caption "..." --hashtags "#Accountability #FollowThrough #AccountabilityGroup" \
  --out out.html
```

**Delivery, every time this path is used:**
1. Publish `out.html` with the Artifact tool. Do not try to render/screenshot it yourself first — the in-app Browser pane has been unreliable for compositing frames in this environment; publishing and letting the user open it directly is the fast path.
2. Tell the user the **primary save method is right-click the card image → "Save image as…"** — the page's "Download PNG" button is a same-tab programmatic download, which sandboxed artifact previews can silently block. Right-click-save is a native browser action and always works. The exported file is full 1080×1080 regardless of how small the card looks on screen.
3. Retire the quote in `quote-bank.md` (rule 7) in the same task, same as any other posted card.

This fallback currently covers the **plain bone treatment only** (no image background). If a future post needs the image-backed Treatment B and Python still isn't available, extend `gen_quote_card_canvas.js` with `--image` support (cover-fit crop + flat ink scrim on a second canvas layer) rather than hand-rolling a one-off HTML file — keep the generator as the single source of truth so output stays consistent post to post.

## The treatment (default: full-color photo + flat ink scrim — "Treatment B")

The decision (2026-07-22) is to keep real, full-color imagery rather than duotone it. To protect legibility and the identity, the treatment is fixed:

1. **Background:** the source image, cover-fit to the card (center-crop, no distortion). Minimum source resolution **2160×2160** for square (2× the 1080 output) so it stays crisp; hard floor 1080×1080.
2. **Flat ink scrim — mandatory.** A single flat fill of ink `#0F0F0E` over the whole image. Flat only — **no gradient scrims** (§9/§12). Three presets (`gen_card.js --filter`), all inside the identity's 45–65% band:
   - **`light` (0.45)** — chrome-only cards (no center copy): the photo is the message, so the scrim only has to carry the wordmark, kicker, and monogram. Below 0.55 the generator lifts the kicker from bone-soft to full bone so it doesn't wash out on a bright sky.
   - **`medium` (0.55)** — balanced default.
   - **`heavy` (0.66)** — center copy sits on the image, **or** the photo is bright/busy. Required whenever a quote or statement line is set over the photo.
   `--scrim <0..1>` still overrides for a one-off. Set it by legibility, not taste; already-dark photos can go lighter.
3. **Two ways to place the message (per post — vary it):**
   - **On the image** — quote or statement line centered in Newsreader italic, one ember accent word, `heavy` filter. The card carries the message.
   - **Off the image** — omit the center line entirely (`--mode statement` with no `--text`): a clean scrimmed photo with only wordmark + kicker + monogram, `light` filter, and the message lives in the post caption. Alternate between the two so the feed doesn't read as one template.
4. **Element layout (ratified 2026-07-22; center copy optional per #3) — always rendered by us in exact brand fonts:**
   - **Wordmark top-left** — A · Inline Lockup, bone (reversed).
   - **`FIELD NOTES` top-right** — mono kicker, bone-soft (full bone under a `light` scrim).
   - **Quote / statement centered** — Newsreader italic, bone, centered, with **exactly one ember accent word** (the thematic beat). Omitted on off-image cards.
   - **Attribution centered**, below the quote — JetBrains Mono, tracked uppercase, `— NAME`, bone-soft. Quote cards only.
   - **A monogram bottom-center** — bone italic A + ember tally. This is the only bottom element; no URL footer, no separate ember rule (the tally is the ember beat).
5. **We render every element, never the image model.** Image models can't reproduce the wordmark lockup or place our mark reliably (see the Gemini recipe). The generator stamps each element deterministically, so type and mark are pixel-perfect every time.
6. **Margins / clear space:** ~6% chrome margin (wordmark/kicker), ~11% quote margin, at any size. Nothing enters the wordmark clear-space zone (§12).

### Legibility floor (verify every card)
- Body-weight nothing: all set text is large (quote ≥52px, labels ≥19px), so the **3:1 large-text ratio** governs.
- Over the scrimmed image, **bone text must clear 4.5:1** against the darkest and lightest patches it sits on (aim higher than the 3:1 floor for safety on photos). If any run fails, increase scrim opacity or reposition — do not shrink the type.
- The **ember accent word** must sit on a scrimmed (dark) area; ember on bone-bright image patches fails contrast. Keep it ≥24px (it always is at quote size).
- **Always eyeball the rendered PNG** before delivery — photographic backgrounds are unpredictable; the numeric check is necessary but not sufficient.

### Fallbacks (sanctioned, no new decision needed)
- **Paper texture** (procedural bone grain, ink text) — when a photo isn't right but a flat bone card feels too plain.
- **Plain bone card** — the original `gen_quote_card.py` output.
- Duotone (ink/bone or ink/ember) and the image-band layout exist in the prototype generator (`assets/facebook/_bg-prototypes/`) if a specific post wants them, but Treatment B is the default.

## Source & licensing — per-post checklist

Source is **approved per post** (no standing allow/ban list). For each image, confirm before it ships:

- [ ] **Rights to use commercially.** Own photo (you hold rights), Creative Commons (note the exact license), or licensed stock. Public-domain/CC0 is simplest.
- [ ] **Attribution captured** if the license requires it (most CC-BY does) — record photographer + license + source URL in the post's notes / alt text, per the license terms.
- [ ] **AI-generated:** allowed per §14 exception, but (a) no real, identifiable people, (b) no living public figures, (c) check the generator's commercial-use terms. Consider a quiet disclosure where norms expect it.
- [ ] **No identifiable private individuals** without permission; **child-safety**: no minors as the subject of a stakes/discipline message.
- [ ] **On-message:** the image supports the quote's meaning, isn't busy behind the type, and has a darker or scrim-friendly region where the quote will sit.
- [ ] **Not the legacy painterly illustrations** (`repo/public/homepage-redesign/`) — off-brand, prototype stand-ins only.

## Folder layout

```
docs/brand/assets/facebook/
  gen_quote_card.py         # plain bone card (existing)
  gen_quote_card_bg.py      # image-backed card (this spec)
  backgrounds/
    source/                 # drop approved source images here (git-ignored if large)
    out/                    # rendered cards
  _bg-prototypes/           # treatment comparison mockups (A–E) + prototype generator
```

## How a card gets made — two flows

**We always render the five elements. The only question is where the background comes from.**

**Flow A — you already have the photo (default, least work).**
1. Grant drops the photo in `backgrounds/source/` and names a quote (or asks Claude to pick a ✓ quote).
2. Claude runs `gen_quote_card_bg.py --image … --quote … --author … --accent <word>`, sets scrim by the legibility check, renders to `backgrounds/out/`. No image model, no badge, no crop.
3. Claude views the PNG, confirms the legibility floor, delivers with a caption (voice per `voice-and-tone.md`) + any required image attribution.
4. On publish, retire the quote in `quote-bank.md` (rule 7).

**Flow B — you need to generate a background (use Gemini for the image only).**
1. Gemini generates a **plain background scene — no text, no marks** (prompt in `assets/facebook/gemini-quote-card-recipe.md`). It'll still stamp its badge bottom-right.
2. Crop the bottom ~12% to drop the badge (safe — it's a plain scene), save to `backgrounds/source/`.
3. Same as Flow A from step 2: the generator lays the scrim and all five elements over it.

Either way, Gemini never renders our type or mark — so there's nothing to proofread and nothing to hand-patch.

## Creative direction (the "filter" look)

The scrim is not just legibility insurance — it's the **recognizable filter** that makes every card feel like AG, the way one consistent treatment unifies YouVersion's wildly different verse photos. Hold the look:

- **Mood:** calm, dim, unhurried. Evening/overcast over midday-bright; stillness over action. The card should feel like a held breath, not a billboard.
- **Composition:** choose images with real **negative space** and a darker, low-detail zone where the centered quote lands. Avoid busy centers and hot highlights behind the type.
- **Subject fit:** endurance, effort, the long road, solitude, building something lasting, quiet aftermath — imagery that earns the quote. Not literal (no stock "teamwork high-five").
- **The filter is constant:** flat ink scrim, ~45–65% by brightness, seven tokens, one ember word. Consistency across posts is what builds recognition — resist per-post restyling.
- **People:** faces are risky (identity, licensing, tone). Prefer figures small, from behind, or absent. Never a recognizable individual paired with a stakes/"failure" line.
- **Cohesion test:** lined up in a feed, the set should read as obviously one hand — same filter, same type, same mark — even across a summit, a desk, and a wall.

---
*Update log:*
- *2026-07-22 — adopted. Full-color photo + flat ink scrim; source approved per post. Amends §14.*
- *2026-07-22 — ratified element layout (wordmark TL · FIELD NOTES TR · centered quote · A bottom-center), the two-flow pipeline (we render all type; Gemini supplies background only), and the creative-direction section.*
- *2026-08-07 — added the `gen_quote_card_canvas.js` no-Python fallback (plain bone treatment) and the right-click-to-save delivery instruction, after the local Cowork checkout proved to have no Python interpreter and the Artifact "Download PNG" button proved unreliable in a sandboxed preview.*
- *2026-09-02 — `gen_card.js` (Node + `@napi-rs/canvas`) is now the primary no-Python generator — renders a real PNG to `backgrounds/out/`, no Artifact step. Added `--filter light|medium|heavy` scrim presets and the off-image card (omit `--text`): message in the caption, `light` scrim, kicker lifts to full bone below 0.55. Vary on-image vs off-image per post.*
