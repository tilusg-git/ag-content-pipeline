# Pillar page playbook: Core Product Pillars, Topical Pillars, and blog articles

**Status:** Created 2026-09-30, revised twice the same day with Brandon's decisions (URL rule, two pillar types, blog-to-pillar linking; then no byline on Topical Pillars, media-ready structure, seven existing Topical Pillars, one legacy move, same Asana workflow). Asana cards for the existing pages are created (§7.4). The legacy URL move is handed off in `specs/url-separation-handoff-2026-09-30.md`. The topical map for new pillars still needs Grant's sign-off. **Topical Pillar v2 (2026-10-27, awaiting Grant and Brandon's sign-off):** Grant's review of the `/types-of-personal-goals` draft found it read as a blog post. The v1 definition caused that (Quick Summary, intro, 2 to 4 paragraphs per section, article template), so Topical Pillars are redefined as module-built hub pages: rule 7, §3, §7.2, §9 item 9, and skill Part B.
**Companions:** `docs/marketing/pillar-page-brief-template.md` (the brief), `.claude/skills/pillar-page-structure/SKILL.md` (page anatomy for both pillar types), `docs/marketing/core-pages-outline-2026-09-19.md` (outlines for the first three Core Product Pillars), `docs/marketing/blog-content-pipeline-workflow.md` (the blog article pipeline).

## 1. Ratified rules (Brandon, 2026-09-30)

1. **Two kinds of pillar, defined differently.** **Core Product Pillars** sell harder. **Topical Pillars** give in-depth guidance on a topic and sell softly. Their layout, structure, content, and page elements differ on purpose (§3).
2. **URL rule.** Pillar pages of both kinds always live at the top level of the domain: `accountabilityguild.com/<slug>`. Blog articles always live under `/blog/<slug>`. Nothing else goes at the top level except utility pages (`/faq`, `/resources`, `/login`, legal). No nesting under pillars (`/for-coaches`, not `/for-groups/coaches`).
3. **Blog articles link up to both pillar types.** Every blog article links to at least one Core Product Pillar and to its parent Topical Pillar (§5).
4. **Bylines are for blog articles only.** Pillars of both types carry no byline.
5. **Topical Pillars are built for rich media** (images, video, diagrams, downloads), not text alone (§3.3).
6. **Pillars run through the same Asana workflow as blog articles** (§7).
7. **A Topical Pillar is not a long blog post** (v2, 2026-10-27, proposed). It is a hub page built from modules: a heading, a one-sentence answer, and one structured element (table, card grid, example list, steps, checklist, diagram). No Quick Summary, no intro section, no anecdotes, no paragraph-heavy sections, no conclusion paragraph. Prose limits are script-checked (skill B4). **v2.1 (2026-10-30):** at most 3 table-type elements per page, never in adjacent modules, and a planned media beat on every second or third module (skill B3a, B7), after Grant found the first two v2 mockups table-heavy and without media.

One older page broke rule 2: `startup-accountability-system` sits at the top level but is a blog article. The other seven top-level articles are Topical Pillars. §6 is the cleanup plan.

## 2. What the research says (and what we are not taking from it)

Sources: Semrush, [Pillar Pages: What They Are & How to Create One](https://www.semrush.com/blog/pillar-page/); Ahrefs, [Content Pillars](https://ahrefs.com/blog/content-pillars/), [SEO Topical Map](https://ahrefs.com/blog/seo-topical-map/), [Topical Authority](https://ahrefs.com/blog/topical-authority/); a sweep of 2026 SaaS topic-cluster guides (agency blogs, treated as opinion).

Adopted:
1. **A pillar is the hub of a topic cluster.** It covers a broad topic at overview depth and links to deeper pages on each subtopic, which link back.
2. **Plan by topic, not by keyword.** Map subtopics to one page each before writing; that prevents cannibalization (the keyword sheet has already hit it twice).
3. **Three informational shapes:** guide, what-is, how-to. Pick by what already ranks for the head term. (These apply to Topical Pillars.)
4. **Pick pillars from parent topics:** the query the #1 page gets most traffic from. Big parent topics become pillars; their long-tail variants become blog articles.
5. **Evergreen, skimmable, linked:** table of contents, tables and visuals, descriptive anchor text, updated as new articles publish.

Not adopted as rules (unverified agency figures): fixed word counts ("2,500 to 4,000"), fixed cluster counts ("8 to 12", "20 to 30"), and an untraceable "86% of AI citations come from sites with 5+ interconnected pages." Never cite these.

The research mostly treats "pillar" as an informational guide. SaaS sites also run product hubs that the research calls "core feature pillars." We keep both, as two separately defined page types.

## 3. The three page types

### 3.1 Side-by-side definition

| | **Core Product Pillar** | **Topical Pillar** | **Blog article** |
|---|---|---|---|
| **Job** | Convert: get an evaluating visitor to start a group | Be the reference map of a broad topic: the core answer, every subtopic at a glance, and where to go next; hand off to blog articles and Core Product Pillars | Go deep on one subtopic |
| **URL** | `/<slug>` (top level) | `/<slug>` (top level) | `/blog/<slug>` |
| **Examples** | `/how-it-works`, `/pricing`, `/for-groups`, `/for-coaches`, `/accountability-apps` (comparison) | Existing: `/goal-setting`, `/personal-accountability`, `/behavior-change`. New: `/accountability-groups`, `/commitment-contracts` | `/blog/how-to-find-an-accountability-partner` |
| **Search intent** | Commercial, navigational, transactional | Informational, broad head term | Informational, long tail |
| **Reader** | Knows the problem, is weighing AG | May never use AG | Has a specific question |
| **Sell level** | **Hard.** The product is the subject | **Soft.** Product is a supporting example plus a few defined soft-sell elements | **Softest.** Optional closing tie-ins; one fixed site CTA |
| **Layout** | Landing page: full-width bands, visual-led, short copy blocks, custom TSX route | Hub page: full-width bands (hero, answer, topic map, modules, framework, in practice, where next, cluster index), sticky contents rail, card grids; pillar template, not the article template | Article template, one reading column |
| **Unit of writing** | Band: headline plus 1 to 3 sentences | Module: H2, one-sentence answer, one structured element, at most 100 words of prose | Paragraph |
| **Opening** | Hero with CTA buttons | H1 plus a one-line dek, then the definition card and key points. No Quick Summary, no intro | Quick Summary, then an intro |
| **Byline / dates** | None | No byline, no read time; visible "Updated" date | Grant Tilus byline, published date, read time |
| **Media** | Product UI panels, sample lines, worked-example visuals | Hero media and at least one original diagram required; tables, cards, and lists carry the detail; images only where they add something; optional explainer video and downloadable (§3.3) | Hero image plus inline visuals per the blog skill |
| **Length** | About 800 to 1,800 words; scannable | No target; usually 1,500 to 3,000 body words with tables and lists counted; paragraph prose at most 40% of them | About 1,200 to 2,000 words |
| **Language** | AG terms used freely, each defined in plain words on first use | Reference voice (second person, present tense, declarative); no anecdotes; no AG terms in headings or lead sentences | Reader-first, personal angle allowed (blog skill rules) |
| **CTAs** | Primary CTA in hero, mid-page, and close (2 to 4 placements) plus a secondary CTA | Fixed site CTA plus one in-body soft CTA card pointing to a Core Product Pillar (not to signup) | Fixed site CTA only |
| **Links out** | Down to 1 to 2 Topical Pillars; across to sibling Core Product Pillars; `/faq` | Down to every live blog article in its cluster; up to 1 to 3 Core Product Pillars; across to neighbor Topical Pillars; 3 to 6 external sources | Up to its parent Topical Pillar and 1+ Core Product Pillar; 2 to 3 sibling blog articles; 1 to 3 external sources |
| **Schema** | `WebPage` + `BreadcrumbList`; `Offer` on `/pricing`; consider `SoftwareApplication` | `Article` (author = Organization, as the page template already does) + `BreadcrumbList`; `ImageObject` / `VideoObject` for embedded media | `Article` + `BreadcrumbList` |
| **Success metric** | CTA click-through, create-account starts | Ranking keyword footprint across the cluster, clicks to Core Product Pillars | Rankings, clicks up to pillars |

### 3.2 Page elements: who gets what

| Element | Core Product Pillar | Topical Pillar |
|---|---|---|
| Hero with H1, subhead, primary + secondary CTA buttons | **Required** | H1 ("Topic: promise", topic term accented), one-line dek, one primary CTA ("Start a group →") plus a text link, hero media, jump links; no updated date (v2.3, 2026-11-03) |
| Product UI visuals / illustrative panels | Required | Optional, only inside the "in practice" section |
| Mechanic sample lines (`Cadence · Weekly. Forfeit · $20 per missed report.`) | Required | Optional, "in practice" section only |
| Worked examples / money ledgers | Required on `/pricing`, encouraged elsewhere | Neutral examples only (no AG pricing) |
| Feature-to-outcome blocks | Required | Not used |
| Comparison vs. named alternatives | Encouraged (factual, dated) | Neutral comparisons of approaches only (partner vs. group vs. coach), never a sales comparison |
| Objection handling and risk reversal ("$0 monthly", "charged only on a miss", "the kitty is never our revenue") | Required | Not used |
| Trust and security notes (card handling, who sees what) | Required where money is mentioned | Not used |
| Proof (real only, permitted) | Encouraged when it exists | Confirmed founder story only |
| Condensed questions linking to `/faq` | Required (4 to 6) | Not used; real questions are ordinary headings |
| Quick Summary | Not used | **Not used** (v2; the dek replaces it) |
| Intro section, anecdotes, personal-story EDITOR NOTEs | Not used | **Not used** (v2) |
| Dek (one line, at most 160 characters), jump links / contents rail with TOC labels | Not used | **Required** (no updated date since v2.3) |
| Byline, read time | Not used | Not used |
| Hero media (image, illustration, or short video) | Hero band visual | **Required** |
| Definition card (40 to 60 words) + key points box (3 to 5 bullets) | Not used | **Required** (band 2) |
| Topic map: compact numbered index, one row per subtopic | Not used | **Required** (band 3; was a card grid until v2.2) |
| One module per subtopic: H2, one-sentence answer, one structured element (skill B3 library); at most one go-deeper card on the whole page (v2.3) | Not used | **Required**; sibling modules parallel |
| Image per subtopic section | n/a | **Required on every second or third module** (v2.1, §3.3), in the media split layout |
| Element mix | n/a | At most 3 table-type elements per page, never in adjacent modules; at least 4 element types (skill B3a) |
| Diagram / infographic | Optional | **Required (at least one)** |
| Explainer video | Optional | Optional, max one to start (§3.3) |
| Comparison table or structured visual | Optional | Required (at least one) |
| "In practice" product section (one, near the end) | n/a | **Allowed, max one** (soft sell) |
| Soft CTA card ("Running a group? See how a cycle works" → Core Product Pillar) | n/a | **Allowed, max one** (soft sell) |
| Downloadable template / lead magnet | Optional | Optional (soft sell) |
| Full cluster index at the end | Not used | **Required** |
| Takeaway conclusion paragraph | Not used (close CTA band instead) | **Not used** (v2); "Where to go next" path cards instead (2 to 4) |

### 3.3 Media structure for Topical Pillars

Topical Pillars cover a whole topic, and the SERPs they compete in are full of guides with images, diagrams, and video. Every Topical Pillar is planned as a media page from the brief onward, even before a production pipeline exists to make the media.

**Media slots (planned in every brief, §11 of the brief template):**

| Slot | Where | What goes there | Rule |
|---|---|---|---|
| **Hero media** | Hero band, beside or under the H1 and dek | Brand-standard image or illustration, or a short explainer video | Required. One per page |
| **Section media** | Inside a subtopic module, beside its primary element (media split layout) | Image, annotated image, figure, image card grid, short video clip, or embed (template preview, example sheet) | Required on every second or third module (v2.1, 2026-10-30), so a page carries 3 to 6 beats (a soft target set by page length, Grant 2026-11-03); figures and the band 2 diagram count. Shows the thing the module talks about, made concrete; never decoration |
| **Diagram / infographic** | Where a process, comparison, or system is explained | Original diagram (cycle, decision tree, partner vs. group vs. coach) | Required, at least one. Also the most link-worthy asset on the page |
| **Explainer video** | Hero slot or the "in practice" section | 1 to 3 minute walkthrough of the topic (not a product ad) | Optional, max one to start. Captions and a transcript required |
| **Downloadable** | Inside the soft CTA card | Template, checklist, or worksheet tied to the topic | Optional, max one; counts as the page's soft CTA |

**Rules for every media item:**
- **The page reads complete without it.** Media adds to a section; it never carries a point the text skips. A page can ship with empty slots.
- **Alt text** for every image, describing what it shows (not "image of"). **Captions** where the image makes a claim. **Captions + transcript** for every video.
- **Brand standards** (`docs/brand/brand-standards.md`): seven color tokens, no gradients, no off-token color. Product UI only where it shows something actually shipped (`docs/product/capability-ui-inventory.md`), labeled illustrative.
- **Real or licensed only.** Own photography, AI-generated imagery approved per page, or CC/licensed with attribution, the same sourcing rule as the image-backed social cards (`docs/brand/image-backgrounds-spec.md`). No stock photos of fake "group members" presented as real.
- **Schema:** `ImageObject` for the hero; `VideoObject` (name, description, thumbnail, duration, upload date, transcript) for any video.
- **Performance:** lazy-load below-the-fold media; video uses a click-to-load facade, not autoplay.

**Production gap (known):** there is no image or video pipeline for site pages yet, just as there is none for blog hero images. Until there is, the brief specifies every slot (what it shows, why, format, alt text) and the draft carries those specs as media beats, so the pages are structured for media and ready to fill. The data model also needs media fields (§9 item 7).

## 4. Proposed topical map (draft, for Grant)

Built from the product-primitive taxonomy in `notes/content-engine-action-items-2026-07-13.md`, the whitespace finding in `seo-audit-2026-07-13.md`, the shortlist in `blog-keyword-target-sheet-2026-09-15.md`, and the live slugs in `repo/src/lib/marketing-content.ts`. Volumes and KD come only from the keyword sheet; everything else is marked unverified.

### 4.1 Core Product Pillars

| Page | Status | Main commercial term (data) | Topical Pillars it links down to |
|---|---|---|---|
| `/how-it-works` | Exists, thin; rebuild per core-pages outline §4.2 | unverified | P1, P2, P4 |
| `/pricing` | Exists, thin; rebuild per outline §4.3 | unverified | P2 |
| `/for-groups` | New; outline §4.1 | unverified ("accountability group app" hypothesis) | P1, P3 |
| `/for-coaches` | New, later. Owner-led mode for coaches and program owners | accountability coach (880, KD 26) | P1, P3 |
| `/accountability-apps` (comparison) | New, later. Factual comparison vs. stickK, Beeminder, Coach.me, group text + payment app | accountability app (720, KD 15) | P2, P3 |

`/for-groups` (product, commercial) and `/accountability-groups` (topical, informational) are two different intents, so they are two pages. This answers open question 1 in the core-pages outline.

### 4.2 Topical Pillars

Seven already exist at the top level and are upgraded in place (same URL, restructured to the Topical Pillar anatomy). Three are new. IDs are stable labels for cards and briefs.

| # | Topical Pillar | Status | Head term (data) | Shape | Blog articles: live / carded / gap | Priority |
|---|---|---|---|---|---|---|
| P1 | `/accountability-groups`: how to start and run one | New | accountability group (210, KD 9) | How-to | Live: check-ins article; `startup-accountability-system` once moved to `/blog`. Carded: #5 start a group, #7 monthly group, #9 questions, #15 meeting agenda. Gap: mastermind groups, group size, when a member quits | **New #1.** Lowest KD, closest to the product, whitespace |
| P2 | `/commitment-contracts`: putting money on goals | New | commitment contract (260, KD 30) | What-is | Live: `designing-consequences-...`. Carded: #4 contracts vs. groups. Gap: pooled forfeits explainer, how much to put at stake, stickK and Beeminder alternatives | **New #2.** The differentiator |
| P3 | `/accountability-partners` | New | accountability partner (1,600, KD 28) | Guide | Carded: #1, #6, #11, #12, #14. Row 2 (partner vs. group) uncarded | **New #3.** Biggest volume; articles already in the pipeline |
| P4 | `/goal-setting` | Existing, upgrade | goal setting (unverified; DR 80+ SERP) | Guide | Live: 30-day sprint, weekly reporting template. Gap: SMART vs. measurable commitments, writing goals others can check | Upgrade |
| P5 | Progress reporting and check-ins | New, on hold | weekly check-in template (unverified) | How-to | Live: check-ins article, weekly reporting template. Carded: #9, #15 | **Hold.** May fold into P1 |
| P6 | `/personal-accountability` | Existing, upgrade | personal accountability (unverified) | What-is | Carded: #8 hold yourself accountable. Gap: excuses vs. reasons, owning a miss | Upgrade |
| P7 | `/types-of-personal-goals` | Existing, upgrade | types of personal goals (unverified) | Guide | Gap: goals by life area (health, money, career, relationships) | Upgrade |
| P8 | `/life-planning` | Existing, upgrade | life planning (unverified) | How-to | Gap: yearly plan, quarterly review, planning with a group | Upgrade |
| P9 | `/personal-life-audit` | Existing, upgrade | personal life audit (unverified) | How-to | Gap: audit template, audit questions, after-audit next steps | Upgrade |
| P10 | `/behavior-change` | Existing, upgrade | behavior change (unverified) | What-is | Carded: #13 group vs. solo willpower (research). Gap: habit formation timelines, relapse | Upgrade |
| P11 | `/self-improvement` | Existing, upgrade | self improvement (unverified) | Guide | Carded: #11 procrastination (shared with P3). Gap: realistic growth plans, measuring progress | Upgrade |

Neighbor families for cross-links: P4, P7, P8, P9 (planning goals); P6, P10, P11 (following through); P1, P2, P3 (accountability with other people). P4 and P7 overlap most; each brief must state its distinct scope (P4 is how to set and keep a goal, P7 is which kinds of goals to pick) and give each subtopic to only one of them.

### 4.3 Pillar selection test (before adding any new pillar)

**Topical Pillar** (new pillars; the seven existing pages are grandfathered in) — all five must hold:
1. **Breadth:** at least 5 distinct subtopics that each deserve a blog article.
2. **Fit:** maps to a product primitive (commitments, proof, reports, consequences, kitty, group operations) or a named audience.
3. **Winnable:** head-term KD at or under 30 while DR is 0, or the topic sits in the group/money/kitty whitespace.
4. **No collision:** no existing top-level page targets it. If one does, upgrade that page.
5. **Evergreen.**

**Core Product Pillar** — all three must hold:
1. Answers a buying question (what it does, what it costs, is it for me, how it compares) that no other Core Product Pillar answers.
2. Has a commercial-intent term or a clear spot in the nav/signup path.
3. Every claim it needs can be sourced to `CLAUDE.md`, `docs/features/*.md`, `docs/product/*.md`, or the live app today.

## 5. Linking rules across the three types

The flow toward signup: **blog article → Topical Pillar → Core Product Pillar → `/create-account`**, with blog articles also linking straight to a Core Product Pillar.

| From → To | Rule |
|---|---|
| **Blog → parent Topical Pillar** | Required once the pillar is live: one inline link in the body (anchor names the broad topic, e.g. "how accountability groups work") plus an entry in the related-links block. Every blog brief names its parent pillar ID. All seven existing Topical Pillars are live now, so this applies immediately to articles under P4 and P6 to P11 |
| **Blog → Core Product Pillar** | Required: at least one inline link to `/how-it-works`, `/pricing`, `/for-groups`, or another Core Product Pillar, on a natural phrase, not as a pitch. `/create-account` does not count (it is the CTA, not a pillar) |
| **Blog → blog** | 2 to 3 sibling articles, preferably in the same cluster |
| **Topical Pillar → blog** | Every live article in its cluster: inline in the matching section plus that section's `links` aside, and all of them in the closing cluster index |
| **Topical Pillar → Core Product Pillar** | 1 to 3 links: the "in practice" section, the soft CTA card, and natural inline mentions |
| **Topical Pillar ↔ Topical Pillar** | 1 to 2 within its neighbor family (§4.2) |
| **Core Product Pillar → Topical Pillar** | 1 to 2 "learn the general practice" links |
| **Core Product Pillar ↔ Core Product Pillar** | Close section links its siblings; nav covers the rest |

All links: inline on descriptive anchor text, live URLs only, listed in the LINK MAP.

## 6. Legacy cleanup: enforcing the URL rule

`resourceArticles` (served at `/<slug>` by `repo/src/app/[slug]/page.tsx`) holds 8 articles. Seven are Topical Pillars and stay at the top level (upgraded through the pipeline, §7.4). One moves:

| Current URL | Classify as | Action |
|---|---|---|
| `/startup-accountability-system` | Blog article, parent P1 | Move to `/blog/startup-accountability-system` with a 301, then rewrite through the blog pipeline |

**Handoff:** `specs/url-separation-handoff-2026-09-30.md` (data move, redirect, 3 internal links, tests, feature doc, verification). Tracked by the `[Site fix]` card in Site Backlog. The rewrite is a separate blog card and can start before the move ships; it publishes to the `/blog/` URL either way.

**Why now:** the site is not yet indexed (DR 0), so moving a URL costs almost nothing in search today.

The blog post `building-a-resource-library-that-turns-product-interest-into-qualified-signups` was written for marketers, not AG's audience. Brandon is removing it separately.

## 7. Asana workflow: same board, same stages, same gates

Pillars run through exactly the same Content Pipeline loop as blog articles. Nothing about review changes for Grant: drag to approve, comment to revise, silence means nothing ships.

### 7.1 Card conventions

| | Topical Pillar | Core Product Pillar |
|---|---|---|
| **Name** | `[Topical Pillar] <Topic> (/<slug>)` | `[Product Pillar] <Page> (/<slug>)` |
| **Backlog section** | Site Backlog | Site Backlog |
| **Starting template** | `▶ TEMPLATE · Field notes article`, field block replaced as below | Same |

Field block (opens every pillar card's notes):
```
TYPE: topical-pillar | product-pillar
CHANNELS: website
STAGE: backlog | brief review | brief revision | draft review | draft revision
PILLAR ID: P1..P11 | /<product-route>
TARGET URL: /<slug>   (existing page: upgrade in place | new page)
SOURCE: head term: <kw> (<volume>, KD <n>, source/date or "unverified")
ROTATION SLOT: fieldnotes-promo (Topical) | product-note (Product); companion card created on publish
ASSETS: <Claude adds: brief (in this task) → Google Doc draft link → markdown-commit link>
PUBLISH TARGET: TBD — planner assigns
```
No `AUTHOR:` line; pillars have no byline.

### 7.2 Stage by stage

| Stage | Who | Topical Pillar | Core Product Pillar |
|---|---|---|---|
| **Site Backlog** | Grant/Brandon | Inert until dragged | Inert until dragged |
| **→ Drafting** (idea approval) | Grant drags | `ag-content-drafting` fills `pillar-page-brief-template.md` (Topical variant) into the card, sets `STAGE: brief review`, moves to Needs review | Same, Product variant. Unsourced product claims are listed as blockers in brief §12, not guessed |
| **Needs review** (brief) | Grant | Drag to **Content Writing** = brief approved; comment + drag to Changes requested = revise | Same; Brandon confirms product facts first |
| **Changes requested** | `ag-changes-requested-rework` | Revises the brief or draft, back to Needs review | Same |
| **Content Writing** | `ag-blog-content-writing` | A **module doc** (skill B8), not an article: module map table, then each band and module as its own block (element type, copy as it will render with real tables and lists, component, media, and link notes), then production notes with the measured word count, the four prose-limit measurements (skill B4), dek and meta description counts, LINK MAP, no em dashes. A draft that fails a prose limit is reworked before it moves. `STAGE: draft review`, to Needs review | Copy doc laid out as page bands (copy + component note per band), to Needs review |
| **Needs review** (draft) | Grant | Drag to **Approved** = final approval, set due date | Same |
| **Approved → Scheduled** | Grant | Unchanged | Unchanged |
| **Published** | `ag-blog-publish` (Mon/Wed/Fri) | See 7.3 | See 7.3 |

### 7.3 Publish step for pillars

The live site repo is off-limits to the pipeline automations (Content Pipeline project notes), so publishing a pillar means producing a complete hand-off, not editing the site. On the due date, `ag-blog-publish`:
1. Writes `content/pillars/<slug>.md`: the final page copy (for Topical Pillars, in the same module structure as the module doc, one block per band and module with its element type), followed by an **Implementation notes** section containing (a) every media slot spec, (b) the **back-link retrofit list**: each live blog article that must now link to this pillar, with section and anchor text, from brief §10, (c) sitemap/`/resources`/nav changes, and (d) for Product pillars, the band-by-band component notes.
2. Commits and pushes, comments the commit link on the card ("Hand this file to the implementing agent; it contains the retrofit links"), moves the card to Published.
3. Creates the companion promo card in Drafting (`[Field notes] <title>` with `fieldnotes-promo` for Topical; `[Product] <page>` with `product-note` for Product).
4. Retires any quote-bank quote used.

### 7.4 Cards created 2026-09-30 for existing pages

| Card | Section | Type |
|---|---|---|
| `[Topical Pillar] Goal Setting (/goal-setting)` (P4) | Site Backlog | topical-pillar, upgrade |
| `[Topical Pillar] Personal Accountability (/personal-accountability)` (P6) | Site Backlog | topical-pillar, upgrade |
| `[Topical Pillar] Types of Personal Goals (/types-of-personal-goals)` (P7) | Site Backlog | topical-pillar, upgrade |
| `[Topical Pillar] Life Planning (/life-planning)` (P8) | Site Backlog | topical-pillar, upgrade |
| `[Topical Pillar] Personal Life Audit (/personal-life-audit)` (P9) | Site Backlog | topical-pillar, upgrade |
| `[Topical Pillar] Behavior Change (/behavior-change)` (P10) | Site Backlog | topical-pillar, upgrade |
| `[Topical Pillar] Self Improvement (/self-improvement)` (P11) | Site Backlog | topical-pillar, upgrade |
| `[Blog] Startup Accountability System: rewrite (/blog/startup-accountability-system)` | Ideas / Backlog | blog, rewrite, parent P1 |
| `[Site fix] Move startup-accountability-system to /blog` | Site Backlog | site-fix: tracking only, never dragged to Drafting |
| Existing `"How It Works"`, `"Pricing"`, `"For Groups"` cards | Site Backlog | renamed to `[Product Pillar] ...`, field blocks filled |

New Topical Pillars (P1 to P3, P5) get cards once Grant approves the map.

**Standing rule for the blog pipeline:** when a blog article publishes and its parent Topical Pillar is live, the blog's archive file and publish comment include the link that must be added to the pillar (section + anchor), for the implementing agent to apply. Applied to `blog-content-pipeline-workflow.md` stage 7.

**Sequencing:** a *new* Topical Pillar goes to Drafting once at least 3 of its blog articles are live. Existing pages (P4, P6 to P11) are exempt; they are live already, and upgrading them is pure improvement. Core Product Pillars are gated by product facts instead (core-pages outline §6).

## 8. Measurement

The site is not indexed yet, so rankings lag. Per pillar, track:
- **Indexed:** pillar and its cluster in Search Console coverage.
- **Topic footprint (Topical):** ranking keywords across the pillar and its blog articles (Semrush `organic_research`, quarterly).
- **Hand-off clicks (Topical → Product):** GA4 internal link events.
- **Media engagement (Topical):** video plays and downloadable clicks, once media ships.
- **Conversion (Product):** CTA click-through and create-account starts by page (needs §9 item 5). This also moves the funnel off waitlist-era tracking per the CLAUDE.md discrepancy note.

## 9. Engineering notes (small, for later)

~~The current `ResourceArticle` model can carry a Topical Pillar's text.~~ Corrected 2026-10-27: `ResourceArticle` sections are only `heading` + `paragraphs[]` (plus one optional CTA and a `links` aside; `repo/src/lib/marketing-content.ts:1`), so it can carry a blog-shaped page and nothing else. That is half of why the v1 pillar drafts read as blog posts. A v2 Topical Pillar needs item 9 before it can ship as designed. Its Article JSON-LD with an Organization author is still the right schema. Core Product Pillars are custom routes. Tickets, none blocking the URL move:
1. `tocLabel` on sections (already pending from the blog pipeline).
2. `updatedOn`: the page sets `dateModified: publishedAt` (`marketing-article-page.tsx:80`). Topical Pillars are refreshed as articles publish, so they need a real modified date and a visible "Updated" line.
3. `quickSummary` (already pending).
4. Soft CTA card component for Topical Pillars (one per page, links to a Core Product Pillar or a downloadable).
5. `PublicSignupCta`'s `context` prop is a closed union (`"homepage" | "pricing" | "resources"`, `repo/src/components/public-signup-cta.tsx:4`). Per-page attribution needs it widened (for example adding `"how-it-works"`, `"for-groups"`, and a pillar-slug variant) or a separate analytics param.
6. Breadcrumbs on blog articles showing the parent Topical Pillar (`BreadcrumbList`).
7. **Media fields:** `heroMedia` on the article and an optional `media` item per section and sub-section (`type: image | video | diagram | embed | download`, `src`, `alt`, `caption`, `transcript` / `transcriptUrl`, `poster`), rendered with lazy loading and a click-to-load video facade, plus `ImageObject` / `VideoObject` JSON-LD. Video hosting (YouTube embed vs. self-hosted) is an open decision.
8. Hide the byline on `[slug]` (Topical Pillar) pages if the article template renders one.
9. **Topical Pillar template (blocks publishing v2 pillars).** A `TopicalPillar` data type separate from `ResourceArticle`: `dek`, `updatedOn`, `heroMedia`, `definition`, `keyPoints[]`, and an ordered `modules[]` where each module has `heading`, `tocLabel`, `lead`, one typed `element` (a union over the skill B3 library: card grid, example list, before and after, comparison table, signal table, steps, checklist, stat callout, figure), optional `context[]` (max 2 paragraphs), optional `deeperLink`, optional `media`; then `inPractice`, `softCta`, `paths[]`, and the cluster index. Rendered by a pillar template at `[slug]` with full-width bands, a sticky contents rail, and no byline or read time; it replaces items 1 to 4 and 7 for Topical Pillars. Until it ships, v2 pillars can be drafted and approved, but publishing one onto the article template would bring back the blog look.

## 10. Open questions

1. **Approve the map** (§4): the new pillars P1 to P3, their order, and P5 fold-in vs. standalone.
2. **Video hosting:** YouTube embeds (reach, free hosting) or self-hosted (no third-party player)? Affects §9 item 7.
3. **Semrush:** one cheap exact-term (`phrase_these`) batch for the unverified head terms (including P4, P6 to P11) and gap subtopics when units refresh (Brandon: yes, when credits are back).
4. **Sign off Topical Pillar v2** (rule 7, skill Part B), and decide whether to prioritize the §9 item 9 pillar template. The four Topical Pillar cards drafted under v1 (Goal Setting, Types of Personal Goals, Personal Life Audit, Self Improvement) need re-outlining to modules once it is signed off.
