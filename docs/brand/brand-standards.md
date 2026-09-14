# Accountability Guild — Brand Standards

**Status:** Adopted (public beta) · **Source:** "Vol. 01 · Identity Kit — marks, lockups, and the room they make" (Claude artifact, May 2026), reviewed and ratified by Grant 2026-07-20.
**Scope:** Visual identity — marks, color, type, and applications. Verbal identity (voice/tone) not yet documented here.

## Instructions for Claude

- Read this file before producing any design asset, marketing visual, social card, favicon/icon work, or UI that touches brand surfaces.
- The **A · Inline Lockup is the logo**. Do not invent new lockups, recolor marks outside the seven tokens, or add gradients anywhere.
- Alternates B and C are sanctioned only for the contexts listed. When in doubt, use A.
- Hex values below were transcribed from the identity kit and verified by zoom inspection. Treat them as canonical.
- Items marked ⚠ are unconfirmed — verify against the repo (`src/` styles) before hard-coding in published assets.

---

## 1. Wordmark

Three sanctioned directions. **A is primary.**

### A · Inline Lockup — PRIMARY (the logo)
Italic serif "*Accountability*" + tracked sans "GUILD" on one line.
- Set: italic Newsreader 400 + Inter Tight 600, 0.34em tracking on "GUILD".
- Reads horizontally; works in a single line of nav. Use for header/nav, email signatures, default brand placements.
- Light version (ink on bone) and reversed version (bone on ink) both approved.
- **Tally-rule treatment (added 2026-09-05, pending sign-off):** a short ember rule sits beneath the initial "A" of "Accountability" — the monogram's tally bar (§2) folded into the wordmark so the lockup carries the mark without a separate badge. Rule width ≈ the "A" glyph, thickness ≈ 0.15em of the serif size, ember (`--accent`) only. This is the web header default. Do **not** combine it with B or C (their own rules would double it — see §12). Masters: `assets/wordmark/wordmark-a-rule-light.svg`, `-rule-reversed.svg`. Live implementation: `.ag-wordmark-initial` in `repo/src/styles/ag-adapter.css`.

### B · Stacked Masthead — alternate
Two-line lockup: "*Accountability*" over "GUILD · VOL. 01" with a horizontal rule between.
- Editorial, masthead-y. Sanctioned for: splash screens, footers, OG/social cards — anywhere with vertical room.

### C · Mono Flag — alternate
A vertical ember accent rule at left, then "VOL. 01" (mono label) over "*Accountability Guild*" as a single italic phrase.
- Quietest of the three; feels like a column header. Sanctioned for: column headers, quiet editorial contexts.

## 2. Monogram — the standalone mark

A single italic serif **A** (rooted in the wordmark's Newsreader italic) with a short **tally bar underneath** — a nod to the cycle's accounting discipline. Doubles as favicon, app-icon glyph, and avatar placeholder.

Variants:

| Variant | Composition | Use |
|---|---|---|
| Mark · Light | Ink A, ember rule, bone ground | The primary monogram |
| Mark · Dark | Bone A on ink ground | Ink and splash backgrounds |
| Mark · Accent | Bone A on ember ground | Favicons and app icons that need to stand out in a row of competitors |
| Mark · Solo | A without the rule | When the mark sits next to the full wordmark and the rule would feel doubled |

## 3. Favicon set

Accent monogram (bone A on ember) at four sizes:

- **16 · tab** — rule disappears at this size
- **32 · tab @2x** — a single thin tally
- **64 · bookmark** — full mark reads from 64 up
- **180 · apple touch** — full mark, rounded-square ground

## 4. App icon (iOS & Android)

Same monogram, three grounds. **Accent ground is the adopted default.**

- **Accent ground — DEFAULT (adopted 2026-07-20):** ember rounded square, bone italic A. Reads in any wallpaper; counter of the A stays open at thumbnail size.
- Ink ground — alternate for users who prefer dark home screens; accent rule carries the brand through.
- Bone ground — quietest; risks blending into pale wallpapers but feels editorial. Not default.

## 5. User avatars — placeholder system

Members without a photo get an **italic-serif initial** (Newsreader italic, single initial, optical centering) in one of five ground colors. Color assigned **deterministically by user id** — stable token per user. **No gradients, no auto-AI portraits.**

- Sizes: 24 (inline), 32 (rows), 40 (lists), 64 (profile), 96 (cycle report).
- Palette: bone, ink, accent (ember), dust, shadow, sage — six tokens. ⚠ "dust", "shadow", "sage" hexes remain UNSPECIFIED — the kit named them without values, the repo implements avatars with existing tokens only (lineSoft/ink/accentSoft grounds). The Claude Design export invented values for them (dust #E4D9C5, shadow #242320, sage #7C8A76) — **not approved** (decision 2026-07-20, see design-system-review). Use existing tokens until real values are chosen.

## 6. Group mark — placeholder

Groups with no image get a square card with **tally marks** reading the member count:

- 1 member (solo cycle): a single tally.
- 2–4 members: one tally stroke per member.
- 5: four strokes + ember diagonal closes the bunch (classic tally).
- Beyond four bunches (9+): just the count as an italic serif numeral (e.g. "9.") — the mark stops being literal and becomes a label.

## 7. Splash / loading mark

Pulsing ember accent disc containing the bone monogram A, with the A · Inline Lockup wordmark below. Light splash (bone bg) and dark splash (ink bg) both approved. Shown "for the second the app takes to find your group."

## 8. Social cards — 1200 × 630

Three templates. All carry the A · Inline Lockup top-left, a mono label top-right, a short ember rule bottom-right, and mono footer text bottom-left.

1. **Site-wide (light):** bone ground, ink italic headline — the homepage tagline ("Built for groups, on a cycle. Receipts at the close."), footer `ACCOUNTABILITYGUILD.COM`, label `VOL. 01`.
2. **Invite (dark):** ink ground, headline in bone with the group name in ember italic ("Brandon invited you to *Legacy Group*."), footer = group facts (`4 MEMBERS · DAILY CADENCE · $25 AT-STAKE`), label `CYCLE 07 · INVITE`. Used when a group link is shared.
3. **Report (accent):** ember ground, bone italic headline stating the cycle result ("Brandon kept four of five. $25 owed to the room."), footer `READ THE REPORT`, label `CYCLE 07 · CLOSED`. Used after a cycle closes.

## 9. Color — the seven tokens

Bone is the background, ink is for type, ember is the one warm beat. The two greys carry secondary type and hairlines. **No colors outside these tokens in brand surfaces** (avatar palette in §5 is the sanctioned exception).

| Token | Hex | Role |
|---|---|---|
| Bone | `#FAFAF7` | Background |
| Panel | `#FFFFFF` | Cards / panels |
| Ink | `#0F0F0E` | Primary type, dark grounds |
| Ink Soft | `#5C5C58` | Secondary type |
| Line | `#E5E2DA` | Hairlines, rules, borders |
| Ember | `#D8512A` | The accent — one warm beat |
| Ember Soft | `#F0A98A` | Soft accent tint |

**Scope note (added 2026-07-20):** the seven tokens are the *brand-surface* palette (marketing, social, icons). The app UI uses an extended functional palette — panelSoft, inkSofter, lineSoft/lineStrong, accentInk, and error/success/warning/info state pairs — implemented in `repo/public/ag-refresh/components.css` and canonicalized in `docs/brand/design-system/tokens.json`. State colors never appear on brand surfaces; both layers share the same seven core values, so there is no conflict.

## 10. Typography

- **Serif:** Newsreader — italic 400 for wordmark "Accountability", monogram A, avatar initials, display headlines (social cards, marketing).
- **Sans:** Inter Tight — 600, wide-tracked (0.34em) for "GUILD" and similar tracked labels.
- **Mono labels:** JetBrains Mono — Bold 700, small tracked uppercase for kickers, labels (`VOL. 01`, `CYCLE 07 · INVITE`), footers. Confirmed from repo: `assets/fonts/JetBrainsMono-Bold.ttf` is bundled alongside `Newsreader-Italic.ttf` and `InterTight-SemiBold.ttf` for `src/app/opengraph-image.tsx` (all Google Fonts, OFL).

## 11. Asset inventory (repo, checked 2026-07-20)

Exists in `repo/`:

- `assets/fonts/` — Newsreader-Italic.ttf, InterTight-SemiBold.ttf, JetBrainsMono-Bold.ttf (OFL; bundled for OG image generation).
- `src/app/opengraph-image.tsx` — runtime-generated site-wide social card using the brand fonts and wordmark. `apple-icon.tsx`, `favicon.ico`, `manifest.ts` also present.
- `public/icon-ag.svg` — ⚠ OLD mark: boxed non-italic A on bone with ember rule. Predates the ratified italic-A monogram.
- `public/icon-192/512 (.svg/.png)` — ⚠ OLD mark: dark navy (#111827, off-token) rounded square with white EKG/heartbeat stroke. Off-brand; replace.
- `public/homepage-redesign/*.png` — homepage/blog illustration PNGs.

Created 2026-07-20 in `docs/brand/assets/` (see its README): wordmark A SVG/PNG (light/bone/reversed), monogram (light/dark/accent/solo), app icons (accent default + ink/bone, 1024), favicon set (16/32/64/180), and the three 1200×630 social card templates — all vector-outlined from the repo fonts, regenerable via `gen_brand_assets.py`.

Still missing: wordmark B/C alternates as files, avatar/group-mark placeholder graphics (these are UI components more than static assets), and repo-side replacement of the old off-brand `public/icon-*` files.

## Do / Don't (from kit principles)

- Do keep the counter of the A open at small sizes; drop the tally rule below 32px rather than crushing it.
- Do use ember sparingly — it is "the one warm beat," not a fill color for large UI areas (social report card is the sanctioned exception).
- Don't use gradients, AI-generated portraits, or colors off-token.
- Don't double the rule: use Mark · Solo next to the full wordmark.
- Don't set the wordmark in any type other than Newsreader italic + Inter Tight.

## 12. Logo usage mechanics (added 2026-07-20)

- **Clear space:** keep a margin of at least the cap-height of "GUILD" (≈ the height of the sans caps) on all sides of any lockup or the monogram. Nothing — type, rules, edges, other logos — enters that zone.
- **Minimum size:** A · Inline Lockup no smaller than 120px wide on screen (the point where "GUILD" tracking stays legible). Monogram no smaller than 16px (favicon floor; the tally rule drops below 32px per §3).
- **Placement:** the lockup sits on bone, panel, or ink only. On ember, use the reversed (bone) lockup; never ink-on-ember for the wordmark.
- **Misuse — don't:** recolor the mark off-token; set it in any face other than Newsreader italic + Inter Tight; add shadows, outlines, or gradients; stretch, skew, or rotate; rebuild GUILD at the wrong ratio (it's ~0.42em of the serif — see the design-system review nit); place on a busy photo or low-contrast ground; double the tally rule next to the full wordmark (use Mark · Solo).

## 13. Accessibility — color contrast (added 2026-07-20, aligned)

Measured WCAG 2.1 ratios against bone `#FAFAF7`:

| Foreground | Ratio | Passes |
|---|---|---|
| ink `#0F0F0E` | 18.3 | AAA — any size |
| ink soft `#5C5C58` | 6.4 | AA body / AAA large |
| info `#2A5C8A` | 6.7 | AA body |
| error `#B83A1F` | 5.5 | AA body |
| success `#1F7A4D` | 5.1 | AA body |
| **ember `#D8512A`** | **3.9** | **large text only** (≥24px, or ≥18.7px bold) |
| **ink softer `#8A867E`** | **3.5** | **large text only** |
| **warning `#B07A1A`** | **3.6** | **large text only** |

**Rules:**
- Ember never carries body-size text on bone/panel. Use it for display headlines (≥24px), rules, focus rings, and accent marks — or set ember text on ink (4.7, acceptable at large sizes) / bone-on-ember for buttons. For body-size accent text, use ink or, on ember grounds, bone (18.3) / accentInk on emberSoft (5.4).
- Ink softer and warning are for large text, meta, or non-essential labels only — never body copy or critical UI text.
- State colors (error/success/info) are fine at body size; their soft tints are grounds only, never text.
- Focus rings (2px ember, 2px offset) are decorative-adjacent and paired with a border change, so the low ember ratio is acceptable there.

## 14. Imagery direction (added 2026-07-20; amended 2026-07-22)

**Default house style: typography + brand motifs.** Most content and social imagery is built from the brand's own materials: type, hairline rules, tally marks, ledger/receipt-style layouts, the monogram, and flat token-color fields — exactly what the social card templates already do (§8). This remains the default for the marketing site, product surfaces, and any card where an image isn't deliberately chosen.

- The five legacy painterly homepage illustrations (`repo/public/homepage-redesign/`, copied into the Claude Design export's `assets/illustrations/`) are **pre-rebrand and off-brand** — do not use in new work; retire when the homepage is next touched.

**Sanctioned exception — image-backed social quote cards (added 2026-07-22, Grant).** Photographic (and other raster) backgrounds are permitted on social quote cards under the rules in [`image-backgrounds-spec.md`](./image-backgrounds-spec.md). Summary of the decision:

- **Default treatment is full-color photo under a mandatory flat ink scrim** (Treatment B). The scrim is flat, never a gradient (§9/§12 still hold). The standard type system is unchanged: reversed wordmark, mono kicker, italic-serif quote with a single ember accent word, mono attribution, mono footer, ember signature rule.
- **Source is approved per post** — own photos, Creative Commons, or AI-generated — decided case by case by the founder. There is no standing allow/ban list; every post runs the spec's licensing + safety checklist. This relaxes the former blanket "no photography / no AI imagery" rule **for this surface only.**
- **Scope limit:** this exception covers backgrounds on social quote cards. It does **not** touch §5 — user avatars still get no auto-AI portraits — and does not sanction AI or stock portraits of real, identifiable people anywhere.
- If no suitable image is chosen, fall back to the plain bone quote card or the paper-texture treatment; an image is never required.

## 15. Motion identity (added 2026-07-20)

Restraint is the brand; motion is functional, never decorative.

- **Micro-transitions:** 120ms ease (hover/focus/toggle), 160ms ease (slightly larger state changes). These are the only defaults. Tokens: `motion.fast` / `motion.medium`.
- **Splash "pulsing accent disc" (§7):** a slow, subtle opacity/scale pulse — roughly a 1.4–1.8s ease-in-out loop, scale ~0.96→1.0, while the app finds the group. Calm, not attention-grabbing.
- **Skeleton loaders:** the existing 1.4s ease-in-out shimmer (repo).
- **No** bounces, spring physics, parallax, confetti, or celebratory animation — including at cycle close or kitty payout. The brand marks moments with type and receipts, not motion.

---

*Update log:*
- *2026-07-20 — initial compilation from Identity Kit Vol. 01; A · Inline Lockup ratified as logo; accent-ground app icon adopted as default.*
- *2026-07-20 — added §12 logo mechanics, §13 accessibility contrast, §14 imagery direction, §15 motion identity. Companion: voice-and-tone.md, glossary.md, brand-gaps-2026-07-20.md.*
- *2026-07-22 — amended §14: sanctioned image-backed social quote cards (full-color photo + flat ink scrim; source approved per post). New companion: image-backgrounds-spec.md.*
