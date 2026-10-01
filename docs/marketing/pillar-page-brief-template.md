# Pillar page brief template (Drafting phase)

Use for `TYPE: topical-pillar` and `TYPE: product-pillar` cards on the Content Pipeline board. Definitions, URL rule, and map: `docs/marketing/pillar-page-playbook.md`. Page anatomy: `.claude/skills/pillar-page-structure/SKILL.md`.

This extends `docs/marketing/content-brief-template.md`; it does not replace it. Inherited unchanged: §3.5 link style (inline anchors, live URLs only, `rel="nofollow"` on competitors), the §2 SEO metadata rules (meta description 150 to 160 characters, script-counted, different from the Quick Summary), and its AG fill-from table (voice, glossary, research KB). Sections marked **(Topical)** or **(Product)** apply to that pillar type only; unmarked sections apply to both.

Fill every section. Write "unverified" or "unknown" rather than leaving a blank or guessing.

---

## 1. Card fields
The card's field block (playbook §7.1) stays at the top; no `AUTHOR:` line, since pillars carry no byline. Add these brief-level fields under it:
```
SHAPE: Topical: guide | what-is | how-to    Product: product | segment | comparison
SCOPE: upgrade existing page in place | new page
TARGET URL: /<slug>              (top level, always; never under /blog)
```
For an upgrade, read the live page's current content in `repo/src/lib/marketing-content.ts` first and note what to keep, cut, and restructure in §7.

## 2. SEO metadata
| Field | Value | Count |
|---|---|---|
| H1 | | words |
| Title tag (≤ 60 chars, main term near the front) | | chars |
| Meta description (150-160 chars) | | chars |
| Slug (top level) | | |
| Quick Summary (≤ 170 chars) **(Topical)** | | chars |

## 3. Search landscape
- **Main term:** volume / KD / source + date (or "unverified"). Topical: an informational head term. Product: a commercial term, or "nav/signup path page" if it has none.
- **Parent-topic check:** does the #1 result rank mainly for this term, or for something broader? If broader, say whether to target that instead.
- **Secondary terms** (each maps to exactly one section here or one blog article, never both).

**Top 5 SERP review.**

| # | URL | Page type (guide / what-is / how-to / product / listicle) | Approx. words | What it covers | What it misses that we can cover |
|---|---|---|---|---|---|

- **Shape decision** from the table.
- **Questions people ask** (PAA / Semrush `phrase_questions`): mark which become headings (Topical) or condensed questions (Product).
- **AI overview for the main term?** yes / no / unknown; which sources it cites.

## 4. Reader and goal
- Who lands here and what they already know.
- **(Topical)** The one question the guide must answer completely, and the Core Product Pillar it hands off to.
- **(Product)** The buying question this page owns (from the core-pages division-of-labor table), what it must not repeat from the homepage, sibling Product pillars, or `/faq`, and the conversion goal (primary CTA, secondary CTA).

## 5. Objections and claims **(Product)**
| Reader hesitation | Plain answer | Source for every fact in the answer |
|---|---|---|

Then list every other product claim the page will make, each with its source (`CLAUDE.md`, `docs/features/*.md`, `docs/product/*.md`, the live app). Unsourced claims go to §12 as blockers. Nothing that `capability-ui-inventory.md` marks partial.

## 6. Cluster inventory **(Topical)**
| Subtopic | Blog article (`/blog/<slug>` or Asana card) | Status: live / carded / gap | Anchor text for go-deeper link | Section (§7 row) |
|---|---|---|---|---|

One blog article per subtopic, never two. Only `live` rows get links. Gaps go to §12 for the next keyword-sheet pass.

## 7. Outline

**(Topical)** Explicit heading levels:

| Level | Full heading (≤ 12 words, statement) | TOC label (2-5 words) | Subtopic covered | Go-deeper link (live only) | Target words |
|---|---|---|---|---|---|

Mark where the definition block, the comparison table or visual, the "in practice" section (max one), the soft CTA card (max one), and the takeaway conclusion sit.

**(Product)** Page bands, per skill Part A2:

| # | Band | H2 / headline | Copy plan (1-2 lines) | Visual or component | CTA in band? |
|---|---|---|---|---|---|

## 8. Soft-sell plan **(Topical)**
- "In practice" section: heading, 2 to 3 sentence plan, the Core Product Pillar it links to. Or "none".
- Soft CTA card: copy and target Core Product Pillar (not `/create-account`). Or a downloadable template instead.
- Confirm the deletion test: the guide is complete with all of the above removed.

## 9. Evidence
- Research claims: ✓ entries from `docs/research/behavior-science-knowledge-base.md` only, stated as the KB frames them.
- Quotes: ✓ entries from `docs/research/quote-bank.md` only (retire on publish).
- External sources (Topical 3 to 6; Product 0 to 3, plus dated competitor sources for comparisons): URL, what it supports, why credible.
- Real examples: confirmed facts only (Brandon's first-Thursday group, third person). Anything else via EDITOR NOTE.

## 10. Link plan
**Outbound:**
| Target | Type (blog / Topical Pillar / Product Pillar / FAQ / external) | Anchor text | Section or band |
|---|---|---|---|

**Inbound retrofit** (live pages that must link here when this publishes; done in the publish step, same change):
| Live page | Where the link goes | Anchor text |
|---|---|---|

Minimums per playbook §5. Topical: every live blog article in the cluster, 1 to 3 Product pillars; every live cluster article links back. Product: 1 to 2 Topical pillars, sibling Product pillars, `/faq`.

## 11. Media plan and length
**(Topical)** One row per slot, per playbook §3.3. Every H2 gets a row even if its slot stays empty.

| Slot | Section | Type (image / diagram / video / embed / download / empty) | What it shows and why it helps | Source (own / AI, approve per page / licensed) | Alt text or caption | Transcript needed? |
|---|---|---|---|---|---|---|
| Hero | under Quick Summary | | | | | |

Minimums: hero filled, at least one original diagram, any video 1 to 3 minutes with captions + transcript, max one video and one downloadable.

**(Product)** Visuals per band (product UI panels labeled illustrative, sample lines, worked-example visuals).

- **Length target.** Topical: from the §3 median, with every section shorter than the blog article it links to. Product: about 800 to 1,800 words, short blocks. State the number and the reasoning; never pad.

## 12. Open items
- Product facts needing Brandon's confirmation (blocking for Product pillars).
- Cluster gaps to add to the keyword sheet.
- Anything else Grant needs to decide.
