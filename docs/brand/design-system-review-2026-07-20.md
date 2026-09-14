# Review: Claude Design "Accountability Guild Design System" vs. brand standards

**Reviewed:** 2026-07-20, against `docs/brand/brand-standards.md`, `docs/brand/design-system/` (tokens.json + design-system.md), and the repo component library.
**Verdict:** faithful — safe to use. All seven brand tokens exact, layer separation preserved, no off-token color drift, no gradients on brand surfaces, radius discipline intact. Findings below are two backfills into our own docs, one invention needing ratification, and two cosmetic nits.

## Verified aligned

- **Color:** every hex in the generated `tokens/colors.css` matches our tokens.json exactly (brand seven + panelSoft/inkSofter/lineSoft/lineStrong/accentInk + four state pairs). A full grep of all generated CSS/HTML/JSX found zero off-token colors — apparent strays were HTML entities (✓, chevrons) and two repo-sourced values (`#FCF6F4` error-input bg, `#2A2826` btn-primary hover), both verbatim from `components.css`.
- **Structure:** brand-surface vs. app-functional layer split preserved, with "state colors never on brand surfaces" carried through; avatar palette correctly labeled a sanctioned exception.
- **Type:** three fonts correct, loaded from the repo's actual OFL TTFs (copied into `assets/fonts/`). Wordmark component renders GUILD in Inter Tight 600 / 0.34em / uppercase (the CSS class is named `-mono` but is styled sans — naming quirk only). All three wordmark variants match kit structure A/B/C.
- **Radius/gradients:** `--radius: 0` global; only sanctioned circles (avatars, dots, spinner), the repo's own 6px skip-link, and an illustrative rounded square in the radius guideline demonstrating the app-icon exception. The two gradients found are the repo's verbatim skeleton shimmer and a component-gallery demo backdrop — neither is a brand surface.
- **Assets:** our `docs/brand/assets/` masters copied intact. Legacy painterly homepage illustrations were imported but explicitly caveated as pre-rebrand and excluded from the UI kit — correct handling.
- **Voice:** the readme's content-fundamentals section (sentence case, mono kickers, middle dots, no emoji, numbers-as-content) is consistent with product copy and the kit's editorial character.

## Findings

1. **Invented avatar hexes — needs ratification.** The kit named five avatar grounds (bone, ink, accent, dust, shadow, sage) without hex values; the repo implements avatars with existing tokens only. Claude Design invented: dust `#E4D9C5`, shadow `#242320`, sage `#7C8A76`. Plausible and on-character, but no ratified source. → Decision recorded below.
2. **Our tokens.json was missing two repo-real values** (now backfilled): `--controlLine: #8E8A80` (src/styles/components.css:22) and the marketing display-H1 scale `clamp(42px, 6.4vw, 108px)` (ag-adapter.css:425). The generated system had them right; our doc was the gap.
3. **Nit — inline wordmark ratio:** `.ag-wordmark-inline` overrides GUILD to 0.6em of the serif size; kit/asset ratio is ~0.42em. Worth correcting in `components/base.css` if the component sees production use.
4. **Nit — live-dot glow:** marketing kit's `.hp-live-dot` adds a soft ember rgba ring (box-shadow) on a brand surface; mildly outside "no shadows except modals/toasts." Cosmetic.
5. **Count note:** readme claims 28 React components / 9 groups — these are wrappers over the same 19 CSS primitives (base.css copied verbatim from the repo). No conflict, just different counting.

## Avatar palette decision

**Decided 2026-07-20 (Grant): not approved.** Claude Design should not have invented values. The three hexes (dust `#E4D9C5`, shadow `#242320`, sage `#7C8A76`) are marked as unapproved placeholders in the generated system's `tokens/colors.css`; the ⚠ stays in brand-standards.md §5. Until real values are chosen (by Brandon, or sampled from the original kit source), avatar implementations should use only existing tokens, as the repo does today (lineSoft / ink / accentSoft grounds).
