# AccountabilityGuild

Product name: **Accountability Guild** (site: accountabilityguild.com). Tagline: "Follow-through, made visible to the people you owe it to."

## Overview
Software for accountability groups that meet on a recurring cycle (weekly, bi-weekly, or monthly). Not a personal habit tracker — it assumes a pre-existing group and makes follow-through visible to that group, on a schedule. Members write measurable commitments, log proof as they go, submit a report at cycle close, and financial forfeits for missed commitments are pooled into a group kitty (not kept by the company).

Founder: Brandon Tilus, built it for his own first-Thursday-of-the-month accountability group. Currently in public beta.

## Core mechanic — the cycle (4 acts)
1. **Set the standard** (once, at cycle start) — owner names cadence, forfeit amount, hall-pass allowance; members write their own measurable commitments.
2. **Run the cycle** (ongoing) — members log proof: notes, photos, tallies. Group sees activity signals, not pressure.
3. **Close with receipts** (at cycle close) — each member submits a short report; misses tallied; forfeits auto-charged via card on file.
4. **Pool the forfeits** — forfeits roll into a running group kitty, disbursed per group policy: redistribute to top performers, reinvest in the group (retreats, subscriptions), or donate to a shared charity.

## Two group modes
- **Owner-led** — one person (coach, founder) sets cadence/penalty and reviews reports. E.g. a coach running a program.
- **Peer** — group jointly sets cadence and penalty; synchronous close; mutual visibility. E.g. friends, founder groups, workout groups.

## Monetization
No subscription fee — one free "Standard group" plan. Revenue is $1 platform fee + standard card processing per forfeit charged. Everything else stays with the group.

## Site structure (for reference)
- `/` — marketing homepage
- `/how-it-works`, `/pricing`
- `/resources` — "Field notes" blog (goal-setting guide, weekly reporting rhythm guide, founder's playbook for weekly execution)
- `/login`, `/create-account`
- `/privacy`, `/terms`
- `/llms.txt` — AI-facing product summary (canonical positioning, mechanics, group modes, pricing, list of authoritative pages, and a preferred-terminology list e.g. "accountability software," "accountability platform," "accountability operating system," "follow-through"). Useful as a quick-reference for consistent product framing and preferred vocabulary when writing copy or content — check it alongside the voice-and-tone and glossary docs.

## Tech signals
Next.js app, App Router conventions (canonical/OG meta, `opengraph-image` route) — confirmed via a repo scan, not yet via direct access from this session. Actual repo lives at `/Users/systemadmin/vault/projects/projectstart/accountability` on Brandon's machine, current branch `codex/group-fund-withdrawals-payouts` as of 2026-07-13; this Cowork folder does not have that repo mounted, so treat repo-derived facts below as reported, not independently verified. Key files once mounted: `src/lib/marketing-content.ts` (resource article inventory + pricing tiers), `src/app/sitemap.ts`, `src/lib/seo.ts`. DB, auth, and payments provider still unconfirmed.

## Folder structure
- `docs/` — architecture notes, decisions, external references (in the real repo this splits into `docs/marketing/`, `docs/features/`, `docs/product/` — see `docs/marketing/content-engine-repo-scan-2026-07-13.md` for the full map)
- `notes/` — working notes, meeting notes, scratch thinking
- `specs/` — feature specs, requirements, API contracts

## Research knowledge base
`docs/research/behavior-science-knowledge-base.md` — 30 citation-verified studies (goal-setting, habits, monitoring, accountability) with quote-ready stats, per-channel citation templates, and AG-specific implications. **Read it before writing any Field notes article, marketing claim, or product copy that references research.** It opens with "Instructions for Claude" (citation rules, ✓/⚠/✗ flags — only ✓ entries may be cited in published content). Compiled from Gemini deep research 2026-07-17; 15+ citation errors were found and corrected there, so cite from this file, not from raw Gemini output.

`docs/research/quote-bank.md` — ~190 curated quotes for social posts and Field notes pull-quotes, organized by AG content pillar with ✓/⚠/✗ attribution flags and a "Top shelf" of 20 post-ready quotes with AG tie-ins. Compiled from a second Gemini deep-research run 2026-07-20, which had the same reliability problems as the first: an empty citation column, ~40 fabricated James Clear quotes, and a dozen famous misattributions (fake Twain, Lincoln, Einstein, Aristotle, Michelangelo) — all documented in its Cut list. Only ✓ quotes may be published verbatim; ⚠ needs "attributed to" phrasing or verification. Quotes come from this file; stats and science claims come from the behavior-science KB, never from quote listicles. **Retire-on-post is mandatory:** whenever a quote from this file ships in published content (social, Field notes, ads), move it — in the same task — out of its active tables into the file's "Posted — retired from rotation" log with channel + date (rule 7 in the file). This keeps the pool from ever double-posting.

## Brand standards knowledge base
`docs/brand/brand-standards.md` — ratified visual identity (2026-07-20) compiled from Identity Kit Vol. 01. Companion pieces: `docs/brand/assets/` (vector brand asset pack + generator script) and `docs/brand/design-system/` (tokens.json in W3C format + design-system.md — the import surface for Claude Design/Figma, reconciling brand tokens with the app's extended functional palette from `repo/public/ag-refresh/components.css`). A Claude Design export lives in `Accountability Guild Design System/` — reviewed faithful (`docs/brand/design-system-review-2026-07-20.md`) except three invented avatar hexes, rejected. Verbal identity: `docs/brand/voice-and-tone.md` (ratified 2026-07-20 — semi-blunt factual money talk, "we" sparingly, fully straight/no humor, no emoji) and `docs/brand/glossary.md` (canonical terms + casing; "kitty" not "group fund"; AG shorthand internal/blog only). Known gaps, decisions, and resolution status: `docs/brand/brand-gaps-2026-07-20.md`. **Read it before any design asset, social card, icon, or brand-surface UI work.** Key decisions: A · Inline Lockup (italic Newsreader "Accountability" + tracked Inter Tight "GUILD") is the logo; italic-A monogram with tally bar is the standalone mark; accent-ground (ember) app icon is default; seven color tokens (bone #FAFAF7, panel #FFFFFF, ink #0F0F0E, ink soft #5C5C58, line #E5E2DA, ember #D8512A, ember soft #F0A98A); no gradients, no off-token color. **Image-backed social quote cards** are sanctioned as of 2026-07-22 (§14 amended) — full-color photo under a mandatory flat ink scrim, source approved per post (own/AI/CC); spec in `docs/brand/image-backgrounds-spec.md`, generator `docs/brand/assets/facebook/gen_quote_card_bg.py` (plain-card generator is `gen_quote_card.py`).

## Known discrepancies to reconcile (found 2026-07-13, not yet fixed)
- **Pricing**: `src/lib/marketing-content.ts` still lists $19/mo and $79/mo tiers; live `/pricing` says no monthly fee, $1 platform fee + card processing per charged forfeit. Live `/pricing` is the source of truth — content/copy should be reconciled to it.
- **CTA/measurement drift**: SEO measurement docs (`docs/marketing/seo-waitlist-measurement.md`) still track waitlist submits, but public CTAs now route to `/create-account` per `docs/features/marketing.md`. Funnel tracking needs to shift to create-account starts → group creation → invites → activated groups.

## Status
Public beta, marketing site live. App-side implementation details (stack, data model, payments integration) not yet documented here — add as you work in the codebase. Content-engine planning (article audit, taxonomy, lead magnet) is underway — see `docs/marketing/content-engine-repo-scan-2026-07-13.md` and `notes/content-engine-action-items-2026-07-13.md`.

An SEO audit (`docs/marketing/seo-audit-2026-07-13.md`) found the site is not yet indexed by search engines at all (DR 0, no results even for branded search) — that's the top priority, ahead of any content work. Also found: robots.txt blocks all major AI crawlers (GPTBot, ClaudeBot, Google-Extended, etc.), technical on-page SEO is otherwise solid (schema, metadata, sitemap all clean), and articles 1-7 target generic self-improvement terms that are unwinnable against DR 80+ incumbents while articles 8-13 sit in a real whitespace (group + money-stakes + pooled kitty has no direct competitor found). Ahrefs/Semrush are connected but plan-gated — no keyword/rank/backlink data available from them yet.

---
Keep this updated as the project evolves — it's the first thing to read at the start of a session, so a good summary here saves re-deriving context (and tokens) every time.
