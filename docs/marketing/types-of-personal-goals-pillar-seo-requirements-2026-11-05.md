# /types-of-personal-goals (Topical Pillar P7): SEO requirements for the build

This is the final SEO pass on the P7 design: Figma frame `116:4994`, v2.3.3 with photos and the product screen. **Updated 2026-11-06 for v2.4** (frame `135:412`, five life areas): new meta description, secondary terms and image names below; everything else stands. It was run on 2026-11-05 against the SEO checklist (`.claude/skills/seo-review/checklist.md`) and the site profile for `www/`. It follows the same format as the P4 pass (`goal-setting-pillar-seo-requirements-2026-11-04.md`).

Three companion files:
- **Copy, media slots and link map:** the hand-off, [`content/pillars/types-of-personal-goals.md`](../../content/pillars/types-of-personal-goals.md).
- **Head tags and markup:** the HTML mockup, [`docs/marketing/pillars/types-of-personal-goals/index.html`](pillars/types-of-personal-goals/index.html), already carries the proposed title, description, canonical, JSON-LD, heading outline and anchors.
- **The build PR** still gets its own `seo-review` against the real diff.

**Route:** `/types-of-personal-goals`, changed in place. The slug stays the same, so no redirect is needed, and the page stays in the sitemap and on `/resources`.

## Checked and passing in the design

- **Links.** All 15 inline links resolve (checked 2026-11-05):
  - The 7 internal routes return 200.
  - The 7 DOIs resolve at doi.org (302 to the publisher).
  - The CFPB well-being tool returns 200.
  - The 4 path cards, the 3 cluster links and both CTA targets resolve too (`/how-it-works` 200; `/create-account` 200).
- **Headings.**
  - One H1.
  - 15 H2s: the answer band, the topic index, ten modules (4.1 to 4.10), the product CTA band, "where next" and "related guides".
  - The 4.10 card titles are H3. No level is skipped.
- **Primary term.** "Types of personal goals" appears in:
  - the H1, as the lead term before the colon
  - the H2 "What are the types of personal goals?"
  - the topic-index H2
  - the title tag
- **Secondary terms covered in visible copy (v2.4):** faith, family, fitness, work (career, business and money), personal (friendships, reading, hobbies, skills), long-term goals and yearly commitments, and process, outcome, learning and open goals. These match the live page's sections and the "types of goals" query, which expects short-term vs. long-term and process vs. outcome.
- **Claims.**
  - Every study is a ✓ entry in the behavior-science KB, cited with its DOI (KB #1, #3, #4, #6, #7, #8 and #11).
  - The 4.7 product line names only shipped features. Daily marks and count goals are in `repo/docs/product/capability-ui-inventory.md` (Complete). A goal "tracked at the cycle report" is the app's percentage mode, which the week board labels "Tracked at the cycle report — no daily grid." (`dashboard-today-marks.tsx`). That closes the open question about report-only goals.
  - The pricing line matches live `/pricing`.
  - Every example list, table and figure is captioned "Examples are illustrative.", and the product screen carries "Illustrative: sample data in the Accountability Guild app."
- **Images.**
  - All 7 photos and the product screen have alt text that describes the scene.
  - No face is in focus, and no real book titles or logos show. The crops remove them; see the image manifest.

## Blocking (the page can't go live without these)

1. **Build it on the Topical Pillar template, rendered on the server.** This is the same blocker as P4 (playbook §9 item 9). All page copy must be HTML text in the server response: the topic index, the area-by-shape grid, the module elements, the week calendar, the year-to-week figure and the hero goal tag. None of it can be baked into images or filled in by client JavaScript.
2. **Replace the title and description** with the values in the table below. The live title is 90 characters: "Types of Personal Goals: Choose the Right Goals for Every Life Area | Accountability Guild". It gets truncated in results.

## Required in this PR

- **Metadata** through `buildMarketingMetadata()`. The site template appends " | Accountability Guild", so set only the page part. If the page is CMS-driven, set the same values in the CMS SEO fields.
- **Article JSON-LD.**
  - Keep `Article` with an `Organization` author.
  - Use the H1 as `headline`.
  - Keep `datePublished` at the original 2026-04-15.
  - Set `dateModified` to the real publish date of this version. The page shows no visible date, by design.
  - Use the hero photo as `image`.
  - Don't add `FAQPage`, `HowTo` or `ItemList`: the page has no visible Q&A, and the grid is a comparison, not a ranked list.
- **Anchor IDs** from the contents labels, all 13 of them (the hand-off lists each one; for example `#health-goals`, `#goal-shapes`, `#where-to-start`). The topic index and the contents rail link to them with real `<a href="#…">` elements.
- **Images.**
  - Use the 2× crops in `docs/brand/assets/site-imagery/out/` (`p7-*`), not the Gemini sources.
  - Serve WebP through `next/image` with explicit `width`/`height`, art-directed desktop and mobile crops, and the public file names in the hand-off (e.g. `types-of-personal-goals-hero-calendar.webp`).
  - The hero is the LCP image: load it eagerly with `priority`, and lazy-load everything else.
- **4.7 product screen.** Render it as HTML with server-computed sample dates from the shared demo clock, like the homepage v5 screens, inside a `<figure>` with the "Illustrative" caption. If it ships as the PNG instead, re-render it on a schedule so the week stays current.
- **CTA attribution.** "Start a group" appears in the hero, the mobile sticky bar and the CTA band. Tag each placement with its own `PublicSignupCta` context; this needs the same prop widening as P4 (playbook §9 item 5).
- **Inbound links.**
  - P4 `/goal-setting` already links here four times.
  - When both pages ship, point its "the four goal shapes" link at `#goal-shapes`.
  - Add one contextual link each from `/life-planning`, `/personal-life-audit` and `/self-improvement`, with the anchor "types of personal goals".

## Recommended

- **Open Graph image.** The page currently shares the sitewide `/opengraph-image`. Give it its own 1200×630 card: the H1 on the brand ground, or the hero photo under an ink scrim (brand §14).
- **`llms.txt`.** Add a line for `/types-of-personal-goals` with the definition sentence, as recommended for P4.
- **Citation count.** The page cites 7 studies, one above the 3 to 6 guideline.
  - Every one supports a visible claim, so this is a reading-weight call for Grant, not an SEO problem.
  - If one goes, cut Locke & Latham 2019 first (the "learning goals" link in 4.7). The lead already explains learning goals.

## CMS follow-ups after merge

- [ ] SEO tab: enter the title and description below exactly.
- [ ] Alt text on each new Media item, from the hand-off's image table.

## Baseline (not caused by this page)

- **Crawler access.** The live `robots.txt` is Cloudflare's managed block and still disallows GPTBot, ClaudeBot, Google-Extended and others (checked 2026-10-28). The Cloudflare setting has to change before AI crawlers can read this page.

## Proposed metadata

| Route | Title (chars) | Meta description (chars) | Canonical |
|---|---|---|---|
| `/types-of-personal-goals` | Types of Personal Goals With Examples \| Accountability Guild (60) | Personal goals sort by life area, shape, and time frame. See examples for faith, family, fitness, work, and personal goals, and how to choose what to commit to. (160) | `https://accountabilityguild.com/types-of-personal-goals` (unchanged) |

The dek is separate copy, not the description. A script checked the character counts.
