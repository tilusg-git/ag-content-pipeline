# Accountability Guild — Design System

**Purpose:** the single import surface for design tooling (Claude Design onboarding, Figma library generation, contractor handoff). Reconciles the ratified brand identity (`../brand-standards.md`) with the app's implemented component library (`repo/public/ag-refresh/components.css`, mirrored in `repo/src/styles/components.css` with `ag-adapter.css` mapping tokens into the Next.js app).

**Character in one line:** editorial print, not SaaS gloss — bone paper, ink type, one ember accent, sharp corners, mono kickers, italic serif asides.

## Layers

1. **Brand surface** (marketing, social, icons): the seven tokens only — bone, panel, ink, ink soft, line, ember, ember soft. Rules in `../brand-standards.md`. Assets in `../assets/`.
2. **App UI** (product): the extended functional palette in `tokens.json` — adds panelSoft, inkSofter, lineSoft/lineStrong, accentInk, and the four state pairs (error/success/warning/info + soft tints). State colors never appear on brand surfaces.

## Design principles

- Sharp corners everywhere (`--radius: 0`); the only rounded shapes are app icons, avatars, and toggle/spinner circles.
- Ember is punctuation, not paint: focus rings, accent rules, active markers, the occasional italic span. Large ember fills are reserved for the report social card and accent app icon.
- Three-voice typography: serif (Newsreader) speaks, sans (Inter Tight) operates, mono (JetBrains Mono) annotates. Mono is always small, tracked (0.14–0.2em), uppercase.
- Hairline discipline: 1px `line` borders; 2px ink top-rules for mastheads; no shadows except modals/toasts if needed.
- Focus visibility: 2px ember outline, 2px offset, on every interactive control.
- Editorial states: help text is italic serif; errors are sans with a dot marker; success confirmations are italic serif with a sans check.

## Typography scale

| Style | Face | Spec |
|---|---|---|
| Display H1 | Newsreader 400 | clamp(40–72px), -0.02em, lh 1.0; italic spans in ember |
| H2 | Newsreader 400 | 36px, -0.02em, lh 1.05 |
| Lede | Newsreader 400 | 17px, lh 1.55, ink soft |
| Body | Inter Tight | 14px, lh 1.5 |
| Button label | Inter Tight 600 | 13px, 0.14em tracked caps |
| Mono label / kicker | JetBrains Mono 600 | 10–11px, 0.18–0.2em tracked caps, ink soft |
| Field help | Newsreader italic | 13px, lh 1.45, ink soft |

## Component inventory (implemented, `components.css`)

19 primitives: buttons (primary ink-fill, secondary outline, ghost, destructive; sm/lg/block; loading spinner; italic-serif arrow affordance), form fields (text/textarea/select with mono labels, italic help, error/success states, password strength meter, character counters), choice controls (custom square checkboxes/radios), alerts, toasts, badges & chips, form-level summary, modals, list rows, empty states, avatars (italic-serif initial placeholder system, deterministic color), dropdown menus, money input (chips + stepper), tabs, skeleton loaders, tooltips/popovers, steppers, pagination, date input.

Page-level patterns: masthead (2px ink top-rule, mono meta row, serif display + lede two-column grid, mono TOC), kit/section wrapper (numbered mono kickers in ember, serif section heads, bordered panel cards with lineSoft headers).

## Brand marks

Vector masters in `../assets/` — wordmark A lockup, monogram (4 variants), app icons, favicons, social card templates. Fonts bundled at `repo/assets/fonts/` (OFL).

## Using with Claude Design

Point onboarding/import at this folder plus `../assets/` and `../brand-standards.md`; the repo's `components.css` is the implementation reference for component behavior. When Claude Design generates work, hold it to: token colors only, radius 0, the three-voice type system, and ember-as-punctuation.

## Design review check

Run this before any design work (Claude Design, Figma, contractor handoff, or Claude-written UI) moves to review. Any "no" is a fix, not a judgment call.

1. **Color:** every color is a token from `tokens.json`. Brand surfaces (marketing, social, icons) use only the seven brand tokens; state colors (error/success/warning/info) appear only in app UI. No gradients, no off-token hexes.
2. **Ember:** used as punctuation (focus rings, accent rules, active markers, an italic span), not as a fill. Large ember fills only on the report social card and accent app icon.
3. **Corners:** radius 0. Rounded shapes only on app icons, avatars, and toggle/spinner circles.
4. **Type:** serif speaks, sans operates, mono annotates, sized per the scale above. Mono is small, tracked, uppercase.
5. **Lines and depth:** 1px `line` borders, 2px ink top-rules for mastheads, no shadows outside modals/toasts.
6. **Icons:** typographic glyphs only (✓, –, →, tally strokes). No icon library.
7. **Components:** reuses an existing primitive from `components.css` (inventory above) instead of inventing a new one. If something new is genuinely needed, flag it for a decision before building.
8. **Focus:** every interactive control shows the 2px ember outline at 2px offset.
9. **Copy:** on-screen text follows `../voice-and-tone.md` and `../glossary.md` ("kitty," not "group fund"; no emoji, no humor).

**Reference to check against:** this file, `tokens.json`, `../brand-standards.md`, and the implemented styles in `repo/public/ag-refresh/components.css`. A live rendered reference page (`/admin/design-system`) is proposed but not built yet; once it exists, compare designs side by side against it instead of reading the CSS.
