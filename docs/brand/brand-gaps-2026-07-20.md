# Brand design knowledge gaps — assessment 2026-07-20

What the brand system doesn't yet define, found by auditing brand-standards.md, the asset pack, the design-system tokens, the repo, and the Claude Design export. Three buckets: decisions someone must make, standards to write once, and assets to produce.

## Resolution status (updated 2026-07-22)

| # | Gap | Status |
|---|---|---|
| 1 | Avatar hexes | Deferred — revisit only when necessary; invented values rejected |
| 2 | Icon strategy | **Decided:** glyphs-only (recorded in brand-standards §Do/Don't + design-system) |
| 3 | Dark mode | Out of scope |
| 4 | Voice & tone | **Done** → `voice-and-tone.md` |
| 5 | Logo mechanics | **Done** → brand-standards §12 |
| 6 | Accessibility color rules | **Done** → brand-standards §13 |
| 7 | Imagery direction | **Decided + done:** typography + motifs → brand-standards §14 |
| 8 | Data-viz language | Deferred to when needed |
| 9 | Motion identity | **Done** → brand-standards §15 |
| 10 | Terminology glossary | **Done** → `glossary.md` (incl. AG-usage rule) |
| 11 | Wordmark B/C vectors | **Done** → `assets/wordmark/` |
| 12 | Article social card | Deferred (design later) |
| 13 | Social platform kit | **Started:** Facebook kit → `assets/facebook/` |
| 14 | Email templates | Skipped for now |
| 15 | Icon deployment (repo) | Skipped for now (repo access) |
| 16 | Cycle report artifact | Understood (shareable/printable cycle summary); design later |

Detail below is the original assessment, retained for context.

## A. Open decisions (block consistency until made)

1. **Avatar palette hexes** — dust/shadow/sage named by the kit, values never chosen; Claude Design's invented values rejected 2026-07-20. Needs Brandon or a kit-source sample.
2. **Icon strategy** — the Claude Design export asserted "no icon library — typographic glyphs only (✓, –, →, tally strokes)." Observably true of the repo, but never ratified as a rule. Decide: is glyphs-only the standard, or is a minimal line-icon set allowed when glyphs run out?
3. **Dark mode** — everything is light-only (`color-scheme: light`). Reversed marks exist, but there's no dark UI palette. Decide in/out of scope so designers stop guessing.
4. **Voice & tone sign-off** — the export's "content fundamentals" (sentence case, wry matter-of-fact tone, numbers-as-content, no emoji, middle dots) were *inferred* from existing copy, not authored. They read right, but they're the de facto verbal identity now — worth ratifying or amending deliberately, including the tagline's official usage.

## B. Standards to define (write once, reuse everywhere)

5. **Logo usage mechanics** — the kit shows the marks but specifies no clear space, minimum sizes, or misuse examples (don't recolor, don't set in other faces, don't add shadows...). Cheap to write, prevents the most common brand drift.
6. **Accessibility color rules** — measured contrast (WCAG): ember on bone = 3.91:1 and inkSofter on bone = 3.47:1 — both fail AA for body text, pass only for large text (≥24px / 18.7px bold); warning-on-bone 3.56:1 same. inkSoft (6.42), error (5.48), success (5.09), info (6.70) pass AA. Needed rule: ember and inkSofter never carry body-size text; ember text only at display sizes or on ink; state text uses the strong value, soft tints as grounds only.
7. **Photography & illustration direction** — five legacy painterly illustrations are orphaned as off-brand, and nothing replaces them. Social content needs an answer: photography style? illustration style? none (pure typography, which the social templates imply)? This is the biggest gap for content production.
8. **Data-viz / progress language** — the product is tallies, streaks, kitty amounts, follow-through rates, but there's no standard for progress bars, charts, or the tally motif in UI (the group mark hints at one). Cycle reports will need this.
9. **Motion identity** — only 120/160ms micro-transitions are defined. The splash "pulsing accent disc" has no spec (rate, easing, scale), and there's no stance on celebratory moments (cycle close, kitty payout) — the brand's restraint suggests near-none, but that should be stated.
10. **Terminology glossary** — cycle, forfeit, kitty, hall pass, receipts, Standard group, owner-led/peer: casing and canonical phrasing are uncodified ("group fund" vs "kitty" appears both ways in repo). Also: is "AG" ever acceptable shorthand publicly?

## C. Missing assets & templates (production gaps)

11. **Wordmark B (Stacked Masthead) and C (Mono Flag) as files** — sanctioned but never produced as vectors.
12. **Field notes / article social card** — only site-wide, invite, and report OG templates exist; the blog (13 articles, central to SEO strategy) has no article card template.
13. **Social platform kit** — profile avatar exports (monogram-accent at platform sizes), X/LinkedIn banner, IG post (1080×1080) and story (1080×1920) templates. Everything today is 1200×630 only.
14. **Email templates** — invites, cycle-close reports, and charge receipts are core product moments with no branded email standard (typography fallbacks, layout, footer).
15. **Icon deployment** — repo still ships the old off-brand icons (`public/icon-*`); no multi-size favicon.ico, no maskable PWA icons from the new mark. Blocked only by repo access on Brandon's machine.
16. **Cycle report as artifact** — "close with receipts" implies a shareable/printable report (PDF or image); no template exists. Could become the brand's signature artifact.

## Suggested order

Quick wins doable now with what we have: 5 (logo mechanics), 6 (a11y rules — data above), 10 (glossary draft from repo copy), 11 (B/C vectors), 12 (article card), 13 (social kit exports). Need Brandon/decision first: 1, 2, 3, 4, 7. Bigger builds after decisions: 8, 9, 14, 16. Repo-side: 15.
