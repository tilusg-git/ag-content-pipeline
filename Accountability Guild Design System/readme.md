# Accountability Guild — Design System

Accountability Guild is a web product (Next.js) for small accountability groups that run on a fixed cycle: set a measurable commitment, log proof as the cycle runs, and close with a written report. Misses charge a card on file automatically and the money pools into the group's own kitty — never the company's. The product is one thing: a members-only web app plus its marketing site (homepage, blog, pricing, FAQ, resources) sharing one component library.

**Character in one line:** editorial print, not SaaS gloss — bone paper, ink type, one ember accent, sharp corners, mono kickers, italic serif asides.

## Sources

This system was compiled from a mounted local copy of the product's codebase and brand kit, referenced here for provenance (not required to use this system):

- `AccountabilityGuild/repo/` — the Next.js app (`src/app`, `src/components`, `src/styles/components.css`, `src/styles/ag-adapter.css`) and its bundled OFL webfonts (`repo/assets/fonts/`).
- `AccountabilityGuild/repo/public/ag-refresh/components.css` — the canonical, page-agnostic component library reference (19 primitives) that this design system's `components/base.css` is copied from verbatim.
- `AccountabilityGuild/docs/brand/brand-standards.md` — ratified Identity Kit Vol. 01: wordmark, monogram, app icon, favicon, avatar/group-mark placeholder systems, social card templates.
- `AccountabilityGuild/docs/brand/design-system/design-system.md` + `tokens.json` — the machine-readable token reconciliation between brand-surface and app-functional palettes.
- `AccountabilityGuild/docs/brand/assets/` — vector masters for the wordmark, monogram, app icons, favicons, and social cards (copied into `assets/` here).

No Figma file or link was attached; everything above came from the local codebase mount.

## Layers

1. **Brand surface** (marketing, social, icons): the seven tokens only — bone, panel, ink, ink soft, line, ember, ember soft.
2. **App UI** (product): the extended functional palette — panelSoft, inkSofter, lineSoft/lineStrong, accentInk, and four state pairs (error/success/warning/info). State colors never appear on brand surfaces.

## Design principles

- Sharp corners everywhere (`--radius: 0`); the only rounded shapes are app icons, avatars, and toggle/spinner circles.
- Ember is punctuation, not paint: focus rings, accent rules, active markers, the occasional italic span. Large ember fills are reserved for the report social card and the accent app icon.
- Three-voice typography: serif (Newsreader) speaks, sans (Inter Tight) operates, mono (JetBrains Mono) annotates.
- Hairline discipline: 1px `line` borders; 2px ink top-rules for mastheads; no shadows except modals/toasts.
- Focus visibility: 2px ember outline, 2px offset, on every interactive control.
- Editorial states: help text is italic serif; errors are sans with a dot marker; success confirmations are italic serif with a sans check.

## Content fundamentals

Voice is **second person, direct, unembellished** — "Set the standard," "Run the cycle," "Close with receipts." Sentences are short and declarative; em-dashes and colons do a lot of work ("Receipts, not promises."). Copy reads like an editorial masthead, not app marketing: section labels are numbered ("01 · Set the standard"), kickers are mono uppercase ("VOL. 01 · CYCLE INFRASTRUCTURE"), and body copy leans on concrete specifics over adjectives — real numbers, real names, real amounts ("Brandon W. · Lift three times · 3 of 3," "$60 forfeited · 11 of 14 met fully").

- **Tone:** matter-of-fact and a little wry, never motivational-poster. "Failure becomes someone else's good week." "Real life happens." The product's stance is that structure beats willpower — copy never guilt-trips, it just states what happened.
- **Casing:** sentence case for headlines and body; UPPERCASE tracked mono only for kickers, labels, and meta rows. Never title case.
- **Pronouns:** "you"/"your group" in marketing; first-person plural ("we") is absent — the product refers to itself by name or not at all.
- **Numbers as content:** amounts, counts, and percentages appear directly in headlines and list items rather than being abstracted away ("$320 in the group kitty," "82% follow-through rate").
- **Emoji:** never used, anywhere in the product or marketing copy.
- **Punctuation as voice:** italics (via the serif) carry emotional or thematic weight within an otherwise plain sentence — "Built for groups, on a *cycle*." Middle dots (`·`) separate meta facts instead of commas or pipes.

## Visual foundations

- **Color:** seven brand tokens (bone `#FAFAF7`, panel `#FFFFFF`, ink `#0F0F0E`, ink soft `#5C5C58`, line `#E5E2DA`, ember `#D8512A`, ember soft `#F0A98A`), extended for app UI with panelSoft, inkSofter, lineSoft/lineStrong, accentInk, and error/success/warning/info pairs. Never more than one warm accent; state colors are app-only.
- **Type:** Newsreader italic 400 (serif, editorial voice — headlines, ledes, help text, wordmark), Inter Tight 600 (sans, operational voice — body, buttons, UI labels), JetBrains Mono 700 (annotation voice — kickers, meta, labels, always small and tracked 0.14–0.2em uppercase).
- **Spacing:** 4px base unit; 44px minimum interactive/field height; 1240px content max-width.
- **Backgrounds:** flat bone/panel fields; no gradients, no textures, no patterns. One legacy illustrated hero (dark, painterly) exists in `assets/illustrations/` from a pre-rebrand homepage pass — see the caveat below; it does not match current foundations and is not used in the UI kit.
- **Animation:** minimal and functional only — 120ms/160ms ease transitions on hover/focus/toggle states, a shimmer skeleton loader, toast slide-in. No bounces, no spring physics, no decorative motion.
- **Hover states:** ink buttons darken slightly (`#2A2826`); outline/ghost buttons fill with `lineSoft`; links pick up ember on hover; list rows get a `lineSoft` background wash.
- **Press/active states:** no scale/shrink — this system uses color and background changes only, never transform-based press feedback.
- **Borders:** 1px `line` hairlines everywhere; 2px solid ink for mastheads, modals, and emphasis rules; 3px tone-colored left rules on alerts/toasts/form summaries.
- **Shadows:** none on cards or buttons. Reserved for floating overlays only — modals (`0 30px 80px`) and toasts/dropdowns (`0 14–18px 32–36px`), both very soft.
- **Corner radius:** 0 everywhere (`--radius: 0`) except avatars (circle), app icons (rounded square), and toggle knobs/spinners (circle). No rounded cards, buttons, inputs, or badges.
- **Cards:** flat panel background, 1px line border, no shadow, no radius. Card headers (when present) get a `lineSoft` fill band.
- **Transparency/blur:** used only for overlay scrims (`rgba(15,15,14,0.55)` behind modals) — no frosted-glass/backdrop-blur anywhere in the system.
- **Imagery color vibe:** the current, on-brand asset set (wordmark, monogram, social cards) is flat and warm-neutral (bone/ink/ember, no photography). The one legacy illustration set is cool-toned and painterly — off-brand, flagged, not used.

## Iconography

There is **no icon library, icon font, or SVG icon set** anywhere in the source codebase or brand kit — confirmed by searching the component source for Lucide/Heroicons/Feather/inline-SVG usage (none found). The product represents state entirely through **typographic glyphs**: a mono checkmark (✓), a plain dash (–), a single lowercase "s," italic-serif tally strokes (`|`, `|||`) for group-size placeholders, mono dot markers for error/status, and a serif italic "→" as the only directional affordance (on buttons and pagination). Emoji are never used as icons or otherwise. When a consuming project genuinely needs a glyph this system doesn't define, match the existing register — a single character or a 1px-stroke mono line — rather than importing an icon font; flag the addition rather than inventing a visual icon language the brand doesn't have.

## Components

19 implemented primitives (`repo/public/ag-refresh/components.css`), authored here as 28 React components across 9 groups:

- **Buttons:** `Button` (primary/secondary/ghost/destructive, sizes, loading, arrow)
- **Forms:** `TextField`, `TextareaField`, `SelectField`, `PasswordField`
- **Choice:** `Checkbox`, `Radio`, `Toggle`, `SegmentedControl`
- **Feedback:** `Alert`, `Toast`/`ToastStack`, `Badge`, `Chip`/`ChipAdd`, `FormSummary`
- **Overlays:** `Modal`, `DropdownMenu`, `Tooltip`/`Popover`
- **Data:** `List`/`ListRow`, `EmptyState`, `Avatar`/`AvatarStack`, `Tabs`, `Skeleton`/`SkeletonRow`, `Stepper`, `Pagination`
- **Money:** `MoneyInput`
- **Date:** `DateInput`
- **Brand:** `Wordmark`

## UI kits

- `ui_kits/marketing/` — the public homepage: nav, hero with a live cycle widget, the four-act "how it works," mechanics grid, group-modes section, kitty-disbursement options, field notes (blog teasers), footer.
- `ui_kits/app/` — the signed-in product: dashboard with today's marks and a week board, group overview with member list and kitty balance, and a billing/ledger screen.

## Index

- `styles.css` — root import surface (tokens + component base CSS).
- `tokens/` — `colors.css`, `typography.css`, `spacing.css`, `fonts.css` (`@font-face`).
- `components/base.css` — the 19-primitive component library CSS (masthead, kit wrapper, buttons → date input).
- `components/<group>/` — React component source + `.d.ts` + `.prompt.md` + one `@dsCard` HTML per group.
- `guidelines/` — 14 foundation specimen cards (Colors, Type, Spacing, Brand).
- `assets/fonts/` — Newsreader-Italic, InterTight-SemiBold, JetBrainsMono-Bold (OFL, bundled from the repo).
- `assets/logos/`, `assets/app-icon/`, `assets/favicon/`, `assets/social/` — vector brand marks.
- `assets/illustrations/` — legacy, off-brand homepage illustrations (see caveat).
- `ui_kits/marketing/`, `ui_kits/app/` — full-screen product recreations.
- `SKILL.md` — Claude Code / Agent Skills–compatible entry point.

## Caveats — please help me iterate

- **No Figma was attached.** Everything here came from the local codebase + docs mount. If a Figma library exists for this brand, attach it so I can cross-check spacing/type values against real design files rather than CSS alone.
- **The legacy `homepage-redesign` illustrations are off-brand** (cool-toned, painterly, pre-dates the ratified Identity Kit) — I copied them into `assets/illustrations/` for reference but did **not** use them anywhere in the UI kit. Confirm whether they should be deleted, replaced, or restyled to match the editorial system.
- **The avatar palette's exact hex values for "dust," "shadow," and "sage" are unconfirmed** — the brand-standards doc itself flags them ⚠ as approximate. I used reasonable warm-beige/near-black/grey-green values; please supply the real hexes if you have them.
- **No logo mark exists as a graphic separate from the wordmark/monogram type treatment** — there is no company symbol beyond the italic "A." I did not invent one.
- I did not build a Figma library or a production-code handoff — this is an HTML/React prototyping design system only. Tell me which UI kit screens matter most and I'll go deeper (more states, more screens, real interaction wiring) rather than staying broad.
