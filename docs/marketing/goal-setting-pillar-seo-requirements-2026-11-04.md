# /goal-setting (Topical Pillar P4): SEO requirements for the build

This is the final SEO pass on the signed-off P4 design (Figma frame `48:292`, v2.3 with photos). It was run 2026-11-04 against the SEO checklist (`.claude/skills/seo-review/checklist.md`) and the site profile for `www/`. It lists what the production `/goal-setting` must ship with when the new page replaces the current one. The page copy, media slots and link map are in the hand-off, [`content/pillars/goal-setting.md`](../../content/pillars/goal-setting.md). The build PR still gets its own `seo-review` against the real diff.

**Route:** `/goal-setting` (changed in place). The slug stays the same, so no redirect is needed. It stays in the sitemap and on `/resources`.

## Checked and passing in the design

- **Links.** All 11 inline links resolve: 3 internal routes return 200, and all 8 DOIs resolve at doi.org. So do the go-deeper card, the 4 path cards, the cluster index (3 links) and both CTA targets (`/how-it-works` 200; `/create-account` 308 → `/app/create-account`).
- **Headings.** One H1. There are 16 H2s: the answer band, the topic index, ten modules, in practice, the product CTA band, where next and related guides. Card titles are H3. No level is skipped.
- **Primary term.** "Goal setting" appears in the H1 (as the lead term before the colon), the definition's first words, the H2 "What is goal setting?", and the meta description.
- **Claims.** Every stat is a ✓ entry in the behavior-science KB, cited with its DOI. The 4.7 product paragraph names only shipped features (day marks, notes and proof photos: `repo/docs/product/capability-ui-inventory.md`, all Complete). The pricing line matches live `/pricing`. Every example table and list is captioned "Examples are illustrative."
- **Images.** All 7 photos have alt text that describes the scene, with no faces in focus. The 4.7 alt now matches the week-board screen (it described a weekly report before; fixed in Figma 2026-11-04).

## Blocking (the page can't go live without these)

1. **Build it on the Topical Pillar template, rendered on the server.** All page copy, including the topic index, the module elements, the goal-loop diagram labels, the week figure and the goal tags on the photos, must be HTML text in the server response. None of it can be baked into images or filled in by client JavaScript. The current `ResourceArticle` template renders only headings and paragraphs, so this page can't ship on it (playbook §9 item 9).
2. **Replace the title and description** (see the table below). The live title is 88 characters and uses the old framing: "Goal Setting That Actually Sticks: A Practical Step-by-Step Guide | Accountability Guild".

## Required in this PR

- **Metadata** through `buildMarketingMetadata()`. The site template appends " | Accountability Guild", so set only the page part. Set the same values in the CMS SEO fields if the page is CMS-driven.
- **Article JSON-LD.** Keep `Article` with an `Organization` author. Use the H1 as `headline` and keep `datePublished` at the original 2026-04-15. Set `dateModified` to the real publish date of this version (the page shows no visible date, by design). Use the hero photo as `image`. Don't add `FAQPage` or `HowTo`: the page has no visible Q&A, and the steps are advice, not a procedure.
- **Anchor IDs** from the TOC labels (`#pick-one-goal`, `#track-your-progress` and so on; the hand-off lists all 14). The topic index cards and the contents rail link to them with real `<a href="#…">` elements.
- **Images.** Use the 2× crops in `docs/brand/assets/site-imagery/out/`, not the Gemini sources. Serve WebP through `next/image` with explicit `width`/`height`, art-directed desktop and mobile crops, and the public file names in the hand-off (e.g. `goal-setting-hero-runner.webp`). The hero is the LCP image: load it eagerly with `priority` and lazy-load everything else.
- **4.7 product screen.** Render it as HTML with server-computed sample dates from the shared demo clock, like the homepage v5 screens, and wrap it in a `<figure>` with the "Illustrative" caption. If it ships as a PNG instead, re-render it on a schedule so the dates don't go stale.
- **CTA attribution.** "Start a group" appears in the hero, the mobile sticky bar and the CTA band. Tag each placement with its own `PublicSignupCta` context. That prop is a closed union today, so widen it (playbook §9 item 5).
- **Inbound links.** Add the 4 retrofit links from the hand-off: the 30-day sprint, the reporting template, `/types-of-personal-goals` and `/personal-accountability`. Use the listed anchor text.

## Recommended

- **Open Graph image.** `/goal-setting` currently shares the sitewide `/opengraph-image`. Give it its own 1200×630 card with the H1 on the brand ground, or the hero photo under an ink scrim (§14), so shared links show the guide.
- **`llms.txt`.** It lists only `/resources` for guides. Add a line for `/goal-setting` with the definition sentence, so answer engines can quote it.
- **Trim citations later if needed.** The page cites 8 studies, above the 3 to 6 guideline. Burke 2011 and Kleingeld 2011 are the trim candidates. They aren't an SEO problem; this is a reading-weight call for Grant.

## CMS follow-ups after merge

- [ ] SEO tab: enter the title and description below exactly.
- [ ] Alt text on each new Media item, from the hand-off's image table.

## Baseline (not caused by this page)

- The live `robots.txt` is Cloudflare's managed block and still disallows GPTBot, ClaudeBot, Google-Extended and others (checked 2026-10-28). The Cloudflare setting has to change before AI crawlers can read this page.

## Proposed metadata

| Route | Title (chars) | Meta description (chars) | Canonical |
|---|---|---|---|
| `/goal-setting` | Goal Setting Guide: Goals You Keep \| Accountability Guild (57) | A research-based goal setting guide: pick one goal, make it checkable, plan weekly actions, track progress, review each week, and share it with people who ask. (159) | `https://accountabilityguild.com/goal-setting` (unchanged) |

The dek (134 characters) is separate copy, not the description. Character counts were checked with a script.
