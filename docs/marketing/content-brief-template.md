# Content brief template (blog pipeline, Drafting phase)

Source: LLM-ready content brief template supplied by Brandon (2026-09-18), kept here so the blog content pipeline workflow can reference a stable repo path instead of a Downloads file. Used at the **Drafting** stage of the two-phase blog flow — see [blog-content-pipeline-workflow.md](blog-content-pipeline-workflow.md).

**This is a generic, industry-agnostic template. Do not fill its placeholders literally — adapt every section to Accountability Guild before putting it in a task:**

| Template section | Fill from | Not from |
|---|---|---|
| §1 Persona / Tone / Target Audience | `docs/brand/voice-and-tone.md` + `docs/brand/glossary.md`; audience = AG's actual ICP segments (friend/faith groups, coaches/facilitators, masterminds/paid communities, fitness/discipline groups — per `repo/docs/marketing/business-evaluation-2026-05-15.md`), scoped to this article's specific pillar/wedge | Generic "Senior [Industry] Specialist" language |
| Author (not a template section, but fixed for every brief) | **Grant Tilus** — every article's sole byline, per the existing author data model in `specs/blog-content-guide-authorship-schema-imagery-seo-2026-07-16.md` §1 (schema `author.url` → `/authors/grant-tilus`). State this explicitly in the brief so Content Writing doesn't have to guess it. | Any other name, "Accountability Guild" as author, or omitting authorship |
| §2 SEO & Semantic Specs | The Backlog card's own keyword data (primary/secondary keywords, volume, KD, slug) | Invented keywords |
| §2 Title Tag / H1 | Statement, comparative, or imperative framing per `docs/brand/voice-and-tone.md`'s headline-framing rule | A question-mark title (research-backed: costs clicks/comments; FAQ subheadings are the only exception) |
| §2 Meta Description (added 2026-09-23) | A drafted candidate in every brief, not a placeholder: one real summary of the whole article (the method or framework it covers, not a teaser of the intro), **150 to 160 characters including spaces, script-counted**, primary keyword included naturally, reader-first language (no AG lingo, same rule as the Quick Summary), no em dashes, no question mark, no "Learn how..."/"Discover..." filler. Must differ from the Quick Summary. On the live site this string is the article's `excerpt` field in `repo/src/lib/marketing-content.ts`, which becomes both `<meta name="description">` and the card text on the `/resources` and `/blog` index pages, so it must read well as visible copy too. Rules: `specs/blog-content-guide-authorship-schema-imagery-seo-2026-07-16.md` §4.4 | The source template's 155-character "call-to-value" line taken literally; a keyword list; a copy of the Quick Summary or first paragraph |
| §3 AEO / Data Point / Proprietary Insight | ✓-flagged entries from `docs/research/behavior-science-knowledge-base.md` / `docs/research/quote-bank.md`, **or** a fresh, current source Claude finds researching the specific topic (see §3.5) — use whichever is genuinely the best fit; naming a specific stat or pull-quote is optional editorial judgment, not a requirement. AG's own mechanics (kitty, forfeit, hall-pass, 4-act cycle) as the proprietary angle | Unverified stats, ⚠/✗-flagged quotes, forcing a citation that doesn't fit |
| §3.5 Linking Requirements (AG addition, not in original template) | See below — this section doesn't exist in the source template and must be added to every brief | — |
| §1 Audience language (added 2026-09-19) | Write for a reader who has never heard of Accountability Guild and may never use it. General terms in headings, tables, the Quick Summary, and lead sentences; Accountability Guild terms ("cycle," "proof," "forfeit," "kitty," "hall pass," "standard," "report," "close") only in an optional closing sentence of a paragraph or section. The article must stay valuable if every product mention were deleted | Product lingo in headings ("Log proof as you go, not just at the close"), or an article that reads like a product tour |
| §3 Research phrasing (added 2026-09-19) | Plain language: "in a large review of studies," "in a study of 128 university students." Hyperlink that phrase to the DOI. No effect-size notation (d = 0.34) in the body; translate it ("a small-to-medium effect," "backfired") | "Meta-analysis of 141 papers on randomized trials," or raw d values in body copy |
| §4 Article Outline: introduction and personal angle (added 2026-09-19) | The Quick Summary is not the intro. After the H1 and Quick Summary, plan a 1 to 2 paragraph introduction (before the first H2) that names a relatable situation or feeling, says what the article covers, and, where honest, integrates a personal angle: a relatable observation, the confirmed Brandon Tilus first-Thursday-group fact (third person), or an EDITOR NOTE asking Grant or Brandon for a real anecdote. Never invent a story | Starting the first H2 straight after the Quick Summary; invented anecdotes |
| §4 Article Outline: headline phrasing (added 2026-09-19) | Every H2/H3 is a statement of that section's main point, so a skimmer learns the whole argument from the headings alone and the lede is never buried | Topic labels ("Cadence"), or question headings when a statement would do |
| §4 Article Outline: conclusion (added 2026-09-19) | Always end with a conclusion section whose heading states the primary takeaway (not "Conclusion") and whose paragraph summarizes the learnings and encourages one specific, achievable next step. Plain encouragement, not a sales pitch | Ending on the last content section; a generic "In conclusion" heading |
| §4 Article Outline: heading levels | An explicit H1/H2/H3-labeled outline, written first (step 0 in the `blog-article-structure` skill). Every heading must be self-contained enough to make sense on its own. **Also give every H2 a short TOC label (2 to 5 words, about 35 characters max) in a `Level \| Full heading \| TOC label` table**, since full statement headings wrap to 3 or 4 lines in the live contents sidebar (step 0, rule 6). **Every H2 and H3 must be 12 words or fewer** | Unlabeled bullet outlines, or headings that only make sense with the paragraph underneath ("Set the terms" instead of "Set the terms before your first check-in") |
| §4 Article Outline: overall shape | Reconcile with the `blog-article-structure` skill's existing section rhythm — that structure wins; layer this template's AEO formatting rules (direct-answer snippets, bold takeaways, comparison tables) on top of it rather than replacing it | The template's outline shape as a hard requirement |
| §4 Article Outline: FAQ | **Override the source template's "H2: Frequently Asked Questions (FAQ)" section entirely.** Do not build a dedicated FAQ block. Turn each real reader question into an ordinary H2 or H3 inside the normal section flow, answered in full paragraphs (see `blog-article-structure` anatomy item 8) | A closing "FAQ" H2 with a list of short question/answer pairs |
| §4 Article Outline: CTA | **Override the source template's "End with a clear, low-friction Call to Action" and any mid-article CTA blocks.** The whole article gets exactly one CTA: the site's existing fixed "Start your accountability cycle" UI element, not an authored promotional block. No additional mid-article calls to action in body prose or as button-style blocks | Inline promotional CTAs ("See how the cycle works," "See pricing") dropped between sections |
| §4 Article Outline: tables and visual elements | Actively look for places a table or other structured visual (comparison, step sequence, before/after) would help, in any section, not only in one designated "comparison" H2 | Defaulting to plain paragraphs everywhere except one forced comparison table |
| §5 Negative Constraints | Merge with AG's own don'ts: no emoji, **no em dashes anywhere** (existing house rule in `voice-and-tone.md`, violated in the first pipeline drafts, now treated as a hard gate), no hype, semi-blunt factual money talk, "we" sparingly | — |

**Structure confirmation (updated 2026-09-19):** the `blog-article-structure` skill's anatomy (H1 → Quick Summary block, 170 characters or fewer, answer-first → introduction paragraph(s) with a personal angle → 5-8 H2s each opening with the claim, with question-answering content integrated into the normal flow → conclusion section with the primary takeaway and an encouraging next step → one fixed CTA → related-links block) matches current AEO/GEO best practice as of a 2026-09-18 research check: answer-first formatting, question-matching content, schema markup, and credible/current sourcing are the factors answer engines weight most for AI citation. Integrating Q&A into ordinary headings rather than a segregated FAQ block preserves that benefit: `FAQPage` structured data just needs identifiable Question/Answer pairs, not a heading literally labeled "FAQ." One known gap flagged separately: the live site's Article JSON-LD has no `FAQPage` schema yet. That's an app-side (`repo/`) fix, out of scope for this content pipeline.

### §3.5 Linking Requirements (ratified 2026-09-18, link style revised 2026-09-19)

**Link style (applies to every link below, internal and external):** hyperlink meaningful anchor text inline within a normal sentence. Wrong: "Public goals produce larger effects (Epton et al. 2017 — https://doi.org/...)" or "(see /resources/goal-setting)". Right: "Public goals [produce meaningfully larger effects](https://doi.org/...) than private ones," where the linked words are a natural part of the sentence and, where it fits, include or sit directly next to the primary keyword. No trailing parentheticals, no bracketed asides, no raw URLs in body text. The separate trailing related-articles block (see `blog-article-structure` anatomy item 7) is a supplement to inline links, not a substitute for them.

**Internal URL patterns (verified against `repo/src/app` and `repo/src/lib/marketing-content.ts`, 2026-09-19):** the site has two article arrays with different routes. Slugs in `resourceArticles` live at `https://accountabilityguild.com/<slug>` (e.g. `/goal-setting`, `/personal-accountability`, `/behavior-change`, `/startup-accountability-system`). Slugs in `blogPosts` live at `https://accountabilityguild.com/blog/<slug>` (e.g. `/blog/how-to-run-accountability-check-ins-that-actually-change-behavior`, `/blog/designing-consequences-that-increase-follow-through-without-burning-trust`, `/blog/weekly-or-4-week-goal-reporting-template-for-founders-and-operators`). There is no `/resources/<slug>` route for articles. Before linking, check which array a slug is in, use absolute URLs in Docs so they're clickable, and only link to articles that are actually live (never to a pipeline article that hasn't been published yet).

Every brief must specify, and every draft must satisfy:

- **Internal — fixed minimum:**
  - 1+ link to the relevant product page (`/pricing`, `/how-it-works`, or `/create-account`, whichever fits the article's pillar), written as an inline hyperlink on a natural phrase, not as a promotional call to action.
  - 2–3 links to other live Field notes articles that are topically relevant (from the 13 slugs in `repo/src/lib/marketing-content.ts`, plus anything since published into `content/field-notes/`).
  - The article's single CTA is the fixed site UI element ("Start your accountability cycle"), not an authored link or block in the body. Do not add extra mid-article calls to action.
- **External — fixed minimum, 1–3 links to highly trusted sources:**
  - Pull from `docs/research/behavior-science-knowledge-base.md` (✓-flagged entries with a real citable URL) **and/or** from research Claude performs on the article's specific topic during drafting — searching for current, authoritative sources (peer-reviewed studies, recognized institutions, reputable publications) isn't optional prep, it's part of writing the draft.
  - Comparison articles (vs. stickK/Beeminder/Coach.me) link directly to the competitor's site/pricing page with `rel="nofollow"`.
  - Citing a specific KB stat or quote-bank pull-quote by name remains optional (editorial judgment) — but the underlying external link(s) supporting the article's claims are not optional.

### §2 SEO metadata block (added 2026-09-23)

Every brief carries this block, filled in, so Grant approves the metadata at the same time as the outline:

```
TITLE TAG: <50-60 chars, primary keyword, brand-suffixed once> (<n> chars)
META DESCRIPTION: <150-160 chars> (<n> chars)
SLUG: <slug>
```

The meta description is revisited at Content Writing: once the full article exists, confirm it still summarizes the finished piece (not just the brief's plan), re-count it, and carry the final string into the draft Doc's production notes. If the draft changes the article's scope, rewrite it rather than keeping the brief's version.

The filled brief goes directly into the Asana task's own notes (below the standard TYPE/CHANNELS/STAGE/... block), not a separate Doc — it's a working spec reviewed in place, not a deliverable. Only the final full article becomes a Google Doc, at the Content Writing stage.

---

## Original template

# Content Brief & Prompt Blueprint: [Insert Working Title / Primary Keyword]

> **Instructions for the LLM:** Read this entire brief carefully before generating the content draft. Follow all structural constraints, formatting rules, and semantic guidelines strictly. Do not add conversational intro/outro text in the draft—output only the final content based on this spec.

---

## 1. System Role & Core Context

* **Persona / Role:** Senior [Industry/Niche, e.g., B2B Marketing Strategy] Specialist and Expert Writer.
* **Target Audience:** [Describe audience persona, e.g., Mid-to-senior IT Directors looking to modernize legacy infrastructure].
* **User Search Intent:** [Informational / Commercial / Transactional] — Audience is seeking [brief description of user pain point or question].
* **Tone & Voice:** [e.g., Authoritative, analytical, actionable, clear, and objective. Avoid hyperbole, jargon, corporate buzzwords, and redundant introductions].
* **Word Count Target:** ~[e.g., 1,500 – 2,000] words.

---

## 2. SEO & Semantic Specs

* **Primary Target Keyword:** `[Primary Keyword]`
* **Secondary / Long-Tail Keywords:**
  * `[Keyword 1]`
  * `[Keyword 2]`
  * `[Keyword 3]`
  * `[Keyword 4]`
* **Core Entities & Concepts (Must Include):**
  * `[Entity/Concept 1]`
  * `[Entity/Concept 2]`
  * `[Entity/Concept 3]`
* **SEO Metadata Instructions:**
  * **Title Tag:** Max 60 characters. Must include `[Primary Keyword]`.
  * **Meta Description:** Max 155 characters. Include call-to-value and `[Primary Keyword]`.
  * **URL Slug:** `[slug-format-here]`

---

## 3. AEO (Answer Engine Optimization) & Citation Guidelines

* **Direct Answer Snippets (Key Takeaways):**
  * Under the main **H1** and primary **H2s**, provide a **40–60 word concise, self-contained summary** answering the core question directly. This is critical for AI search engines (Perplexity, Google AI Overviews, ChatGPT Search).
  * Structure direct answers using clear "Is/Does/Means" definitions or direct 1-2 sentence summaries.
* **Information Gain Inputs (Unique Perspective / E-E-A-T):**
  * *Data Point / Fact 1:* [Insert internal stat or quote to cite]
  * *Proprietary Insight:* [Insert unique methodology, view, or experience]
* **Formatting for AEO Parsing:**
  * Use **bold text** for essential takeaways and key entities.
  * Use **Markdown tables** when comparing 2 or more items.
  * Use **numbered lists** for step-by-step processes and **bullet points** for feature lists.

---

## 4. Article Outline & Content Requirements

**Outline table (required, added 2026-09-21):** before the section detail below, list the whole outline as a table with columns `Level` | `Full heading` | `TOC label`. Every H2 gets a TOC label: 2 to 5 words, about 35 characters max, a short noun phrase or imperative, reader-first, unique. H3s get none. Full headings stay as statements; the label is the short version shown only in the contents sidebar.

### H1: [Insert Main Title - Engaging & Entity-Rich]

#### H2: [Section Title 1 - Core Topic / Definition]
* **AEO Direct Answer Requirement:** Start with a 50-word clear definition answering: *"What is [Topic]?"*
* **Key Points to Cover:**
  * [Point 1]
  * [Point 2]
* **Keywords to Include:** `[Keyword]`, `[Entity]`

#### H2: [Section Title 2 - Key Benefits or Core Steps]
* **Format:** Use a numbered list or structured Markdown table.
* **Key Points to Cover:**
  * [Step/Benefit 1]
  * [Step/Benefit 2]
* **Keywords to Include:** `[Keyword]`, `[Entity]`

#### H2: [Section Title 3 - Comparison / Deep Dive]
* **Format:** Provide a 3-column Markdown table comparing [Item A] vs. [Item B].
* **Table Columns:** `Feature` | `Option A` | `Option B`
* **Key Points to Cover:**
  * [Insight 1]
  * [Insight 2]

#### H2: Frequently Asked Questions (FAQ)
* **Format:** Use `### H3` for each question. Follow each question with a direct 2-3 sentence answer before elaborating.
* **H3:** [Question 1: Common conversational search query]?
* **H3:** [Question 2: Common conversational search query]?
* **H3:** [Question 3: Common conversational search query]?

#### H2: Conclusion & Next Steps
* Summarize key takeaways in 3 bullet points.
* End with a clear, low-friction Call to Action (CTA): [Specify CTA text/goal].

---

## 5. Negative Constraints (What NOT to do)

* **DO NOT** use generic filler intro sentences (e.g., *"In today's fast-paced digital world..."* or *"Look no further..."*).
* **DO NOT** use passive voice unnecessarily.
* **DO NOT** invent false facts, stats, or fake sources.
* **DO NOT** over-stuff keywords; ensure natural entity integration.
