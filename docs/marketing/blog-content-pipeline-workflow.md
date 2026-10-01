# Blog content pipeline workflow (Asana loops)

Ratified 2026-09-18. This is the blog equivalent of what the quote-bank retire-on-post rule + `docs/brand/image-backgrounds-spec.md` + `scripts/post_to_meta.js` together document for the social side of the same board — the exact loop Claude runs at each stage of the **Content Pipeline** Asana project (gid `1218128111784157`) for `TYPE: blog` cards. The project's own notes hold the short version (stage list, review gestures); this doc is the detailed reference.

Blog is a **two-phase** pipeline — a brief gets reviewed and approved before any full article gets written. This is the one structural difference from the social side, which goes straight from Drafting to Needs review. Everything else (drag-to-approve, comment-to-revise, silence = nothing publishes) is identical.

**Authorship:** every article is byline **Grant Tilus**, fixed. This isn't a per-article decision — it's the existing author data model in `specs/blog-content-guide-authorship-schema-imagery-seo-2026-07-16.md` §1 (schema `author.url` → `/authors/grant-tilus`). Every task carries `AUTHOR: Grant Tilus` in its description block; the Google Doc and markdown copy should carry the byline too.

**Structure/AEO:** the `blog-article-structure` skill's anatomy (Quick Summary block, 5-8 answer-first H2s, FAQ section, related-links block, imagery beats) is the authoritative shape for every article and is already aligned with 2026 answer-engine-optimization practice (answer-first formatting, FAQs, schema, credible/current sourcing). Don't re-derive structure per article — follow that skill, layer the brief template's AEO formatting rules on top, and satisfy the §3.5 linking requirements for the "credible sourcing" factor.

## Stage-by-stage

### 0. Carding trigger (Backlog)
When Brandon/Grant marks a row ✅ in the current keyword target sheet (e.g. `docs/marketing/blog-keyword-target-sheet-2026-09-15.md`), Claude:
1. Creates one Ideas/Backlog card per approved row, duplicating `▶ TEMPLATE · Blog topic (keyword-sourced)`, pre-filled from that row's columns (primary/secondary keywords, volume, KD, cannibalization note, proposed title/angle).
2. Marks the row carded in the sheet itself (e.g. "Carded → <Asana task URL>") so it's never double-carded on a future pass.
3. Skips ❌ rows; for ✏️ (revise-angle) rows, incorporates Grant's revision note into the card before creating it.

Non-keyword-sourced blog ideas (article refreshes) use the older `▶ TEMPLATE · Field notes article` template instead and enter the same pipeline from Drafting onward. Pillar pages (`TYPE: topical-pillar` / `TYPE: product-pillar`) use the same template but follow `docs/marketing/pillar-page-playbook.md` §7 and `pillar-page-brief-template.md`, not this doc's brief rules. **URL rule (2026-09-30):** every blog article lives at `/blog/<slug>`; only pillars live at the top level.

### 1. Drafting — brief phase
Trigger: Grant drags a card from Backlog to Drafting (idea approval).

Claude fills out `docs/marketing/content-brief-template.md`, adapted per that file's fill-from table (AG voice/audience/citations, not the generic placeholders), directly into the task's own notes below the standard field block. This includes researching the specific topic — not just pulling from the internal KB — to identify the 1–3 external sources the §3.5 linking requirement needs; the brief should name candidate internal and external links, not leave linking to be figured out during Content Writing. The brief also carries the filled §2 SEO metadata block (title tag, **meta description**, slug), each script-counted, so the meta description is reviewed alongside the outline instead of being invented at the end. Sets `STAGE: brief review`, moves the card to Needs review.

### 2. Needs review / Changes requested — brief pass
Grant reviews the *brief* (not an article yet — there isn't one). Standard mechanics:
- Comment + drag to Changes requested → Claude revises the brief in place, sets `STAGE: brief revision` while working, then `STAGE: brief review` and back to Needs review when done.
- Drag Needs review → **Content Writing** → this *is* brief approval. (There's no separate "brief approved" column — landing in Content Writing means the brief is signed off.)

### 3. Content Writing — draft phase
Trigger: Grant drags the card here from Needs review.

Claude writes the full article against the approved brief. Rules added 2026-09-19 after Grant's review of the first 3 drafts (all of them applied to all 3; they're now permanent):
- **Reader-first language (second review, 2026-09-19):** write for someone who has never heard of Accountability Guild and may never use it. No product lingo ("cycle," "proof," "forfeit," "kitty," "hall pass," "standard," "report," "close") in headings, table headers, the Quick Summary, or lead sentences; explain the general idea first and mention the product term only in an optional closing sentence of a paragraph or section. See the plain-language equivalents table in `docs/brand/glossary.md`. The article must stay valuable if every product mention were deleted.
- **Statement headings:** each H2/H3 states that section's main point so a skimmer learns the whole argument from headings alone; don't bury the lede. Question headings only as a justified exception.
- **Introduction after the Quick Summary:** the Quick Summary is not the intro. Always write a 1 to 2 paragraph introduction before the first H2, with a relatable feeling or a real personal angle where honest (never an invented anecdote; Brandon's first-Thursday group is the confirmed real one, in third person; use an EDITOR NOTE to request a real anecdote).
- **Always end with a takeaway conclusion:** the last H2's heading states the primary takeaway; its paragraph summarizes what the reader learned and encourages one specific next step, doable with or without the product.
- **Plain-language research:** "in a large review of studies," not "meta-analysis of 141 papers on randomized trials"; no effect-size notation in body copy; the link carries the citation.
- **Heading levels:** produce an explicit H1/H2/H3-labeled outline first and keep it through the draft; every heading must make sense on its own. **The outline is a table (`Level | Full heading | TOC label`) and every H2 carries a short TOC label** (2 to 5 words, about 35 characters max, reader-first, no full sentences), because full statement headings wrap to 3 or 4 lines in the live contents sidebar and are hard to scan. H3s get no label. Applies at both the brief and the draft stage; see step 0, rule 6 of the `blog-article-structure` skill. App-side, this needs an optional `tocLabel` field (sidebar falls back to `heading`); write the labels regardless.
- **No em dashes** anywhere in the article. This was already house style in `voice-and-tone.md` and the first drafts violated it; it's a hard gate.
- **One CTA only**, the fixed site UI element, not authored promotional blocks in the body.
- **Inline hyperlinks** on meaningful anchor text for every citation and cross-link; never parenthetical citations or bracketed asides. **The production notes end with a plain-text LINK MAP** (never a table, because the draft gets pasted into the implementing agent as plain text, which drops hyperlinks and scrambles tables): an instruction line for the agent, the total link count, and one entry per link with section, exact anchor text, full context sentence, URL, and type. Script-verify it matches the body's links one to one (skill: "Hyperlink link map").
- **Length caps (2026-09-21):** Quick Summary is 170 characters or fewer including spaces (the site field rejects more); every H2 and H3 is 12 words or fewer. Script-count both.
- **Meta description (2026-09-23):** start from the brief's approved candidate, then confirm it summarizes the finished article, 150 to 160 characters including spaces (script-counted), primary keyword included naturally, reader-first language, no em dashes, and different from the Quick Summary. It becomes the article's `excerpt` in `repo/src/lib/marketing-content.ts`, which the site uses as both the meta description and the index-page card text. Put the final string and its character count in the production notes. Full rules: `content-brief-template.md` §2 row and the spec's §4.4.
- **No dedicated FAQ section.** Real reader questions become ordinary H2/H3 headings within the normal section flow, answered in full paragraphs.
- **Tables and structured visuals** wherever they genuinely help, in any section, not just one designated comparison section.
- **Build the Google Doc as HTML, not plain text.** Upload with `contentMimeType: text/html` so headings become real H1/H2/H3 styles, links become real inline hyperlinks, and tables become real tables (verified 2026-09-19; plain text leaves literal `##` characters and unclickable URLs). Do not put an `<hr>` immediately before the H1: it fuses into the heading text and would pollute the table of contents. Open the Doc with a small heading-outline table and close it with production notes (word count, title tag, meta description, slug, imagery beats, open items, and last the LINK MAP), both labeled delete-before-publishing.
- **Measure, do not estimate.** Draft the HTML to a scratch file first, count words with a script (strip tags; exclude the outline aid, editor notes, the Keep reading list, and production notes), and scan for em and en dashes before uploading. After uploading, read the Doc back (`read_file_content`) to confirm heading levels, inline links, and zero em dashes. The first drafts' eyeballed word counts were off by 15 to 20 percent.
- **State every statistic exactly as its knowledge-base entry frames it.** The first drafts misdescribed two findings (Kleingeld's d = 0.80 is specific difficult group goals vs. vague ones, not group vs. individual goals; Epton's d = 0.34 is the overall goal-setting effect, with difficult, public, and group as moderators). Apply the KB's domain-honesty rule: most habit evidence comes from health behaviors, so say so.
- **Never invent facts about the founder's group or the product.** The founder anecdote may state only confirmed facts (Brandon Tilus built Accountability Guild for his own group, which meets the first Thursday of every month), in third person under Grant's byline, with an editor note asking Brandon for specifics. Make no claim about product behavior beyond what `CLAUDE.md` documents.
- **Link only to live articles, using the real URL patterns** (blog articles at `/blog/<slug>`, pillars at `/<slug>`, `startup-accountability-system` still at `/<slug>` until it moves; see `content-brief-template.md` §3.5). Never link to a pipeline article that has not been published yet; add a production note to link it once it is.
- **The Drive connector cannot edit a Doc in place.** To revise, create a replacement Doc, trash the old one, and update the `ASSETS:` link.
- Structure/length per the `blog-article-structure` skill.
- Voice per `docs/brand/voice-and-tone.md` + `docs/brand/glossary.md`.
- Citations/quotes, if named specifically, only from ✓-flagged entries in `docs/research/behavior-science-knowledge-base.md` / `docs/research/quote-bank.md` — naming one is optional editorial judgment, not required.
- Linking per the brief's §3.5 candidates: fixed minimum of internal links (the parent Topical Pillar once live, at least one Core Product Pillar, and 2-3 other blog articles, all as inline hyperlinks) and 1-3 external links to trusted sources (KB citations and/or Claude's own topic research), with `rel="nofollow"` on any competitor link in a comparison piece. The article's one CTA is the fixed site UI element, not an authored link.
- Quick Summary + schema + imagery per `specs/blog-content-guide-authorship-schema-imagery-seo-2026-07-16.md`.
- Self-checked against the `content-grader` skill before moving on.
- Creates the Google Doc with the full draft, adds the link to the task's `ASSETS:` line. **If the Drive/Docs connector isn't reachable, the article goes directly into the task's own `notes` instead**, under a `--- FULL ARTICLE DRAFT (fallback — no Docs connector available, drafted <date>) ---` header, with `ASSETS: In-task draft (no Docs connector available — see full article below)`. This is a deliberate fallback, not an error state — the review/revision loop works identically either way, and downstream steps (Changes requested rework, the Published terminal step) both know to check for and use this in-task block when there's no real Doc link. Never leave a card stalled with a finished article and no deliverable attached.

Sets `STAGE: draft review`, moves the card back to Needs review.

### 4. Needs review / Changes requested — draft pass
Same reused column, now reviewing the full draft. Same mechanics as step 2, but `STAGE: draft revision` ↔ `STAGE: draft review`, and the "approval" drag target this time is **Approved**, not Content Writing.

### 5. Approved
Grant sets the due date to the target publish date (unchanged convention).

### 6. Scheduled
Date set, waiting for the slot (unchanged).

### 7. Published — blog terminal step
On the day the article goes live, Claude:
1. Converts the finished Doc to markdown and commits it to `content/field-notes/<slug>.md` in this repo (slug matching what it'll get in `repo/src/lib/marketing-content.ts`).
2. Posts the commit link + Doc link as a comment on the task.
3. Moves the card to Published.
4. Creates the companion `[Field notes] <title>` social promo card directly in **Drafting** (changed from Ideas/Backlog on 2026-09-30, so the weekday 6am `ag-content-drafting` run picks it up with no manual drag), using the existing `▶ TEMPLATE · Social post` pattern with `ROTATION SLOT: fieldnotes-promo` — matching how the 13 existing promo cards for already-live articles work.
5. If the article used a quote-bank quote, retires it in the same task per `docs/research/quote-bank.md` rule 7.
6. If the article's parent Topical Pillar is live, appends a **Pillar link to add** note to the end of `content/field-notes/<slug>.md` and to the publish comment: pillar URL, the section the link belongs in, the anchor text, and "also add to the pillar's closing cluster index and bump its Updated date." The live site repo is off-limits to this automation, so the implementing agent applies it when the article is copied in. Added 2026-09-30 per `docs/marketing/pillar-page-playbook.md` §5 and §7.3.

No auto-PR to the live accountabilityguild.com repo (`repo/`) — that repo stays off-limits to this workflow; Grant copies the final text in himself.

## `STAGE:` field reference
Added to the task-description convention for blog cards only (social cards omit it):

| Value | Meaning |
|---|---|
| `backlog` | Idea pitch, not yet approved into Drafting |
| `brief review` | Brief sitting in Needs review |
| `brief revision` | Brief being revised in Changes requested |
| `draft review` | Full draft sitting in Needs review |
| `draft revision` | Full draft being revised in Changes requested |

No `STAGE:` value is needed once a card reaches Approved/Scheduled/Published — the section itself is unambiguous from there on.

## `AUTHOR:` field reference
Every blog card carries `AUTHOR: Grant Tilus` — fixed, not a per-article choice, until a second author exists in `specs/blog-content-guide-authorship-schema-imagery-seo-2026-07-16.md`'s author data model. Social cards omit this field.
