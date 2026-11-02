# Prompt: Evaluate /how-it-works and the homepage "how it works" section

Paste everything below the line into a fresh Claude Code session opened in the AccountabilityGuild project folder. Fill in the optional "Decisions already made" block first if you've answered any of the open questions from the 2026-10-19 plan or the 2026-10-23 homepage evaluation.

---

I want a full evaluation of our "how it works" story in two places, written up so I can review it:

1. **`/how-it-works`**, which needs to become a proper Core Product Pillar on its own URL.
2. **The "how it works" section on the homepage**, the short version that hands off to the pillar.

**This is an evaluation of what exists, not a discovery pass.** The page is live, and two earlier docs already did most of the research. Your job is to:
- grade the live page and the homepage section against the plan and the pillar rules;
- check whether anything in those earlier docs is out of date;
- close the gaps they left open;
- turn all of it into one set of keep / fix / cut verdicts and one decision list.

Don't redo work those docs already did unless you find it's wrong.

**Don't change any site code, CMS content, or Asana cards in this session.**

**Decisions already made (optional, fill in):**
- Peer mode (one person configures vs. joint setup):
- Kitty language (owner cashes out, every withdrawal visible, vs. three built-in policies):
- Hall pass (pull from marketing until it ships?):
- Pricing page first or How it works first:
- Semrush keyword check approved? (yes/no):

## 1. What's already known (start here, don't re-derive)

Read these two docs in full first. They're your baseline.

- **`docs/marketing/how-it-works-pillar-plan-2026-10-19.md`**:
  - §2: product facts, checked against the repo's feature docs.
  - §3: an 11-band page plan.
  - §4: a worked forfeit example.
  - §5: five open decisions.
  - Its §1 already says the live page "repeats the homepage."
- **`docs/marketing/homepage-messaging-evaluation-2026-10-23.md`**:
  - It found the homepage sells six things that don't exist and gets the forfeit math wrong.
  - It found the marketing site moved to a separate repo, `accountabilityguild/www` (Next.js + Payload CMS), so `repo/src/app/page.tsx` is stale.
  - §5 puts "one cycle, four acts" as section 3 of the homepage.
  - Its quick wins (Q1 to Q9) include fixes to `/how-it-works` itself.

Then read the rules the evaluation grades against:
- `CLAUDE.md`
- the `pillar-page-structure` skill (Part A, Core Product Pillars; load it)
- `docs/marketing/pillar-page-playbook.md`
- `docs/marketing/pillar-page-brief-template.md` (Product variant)
- `docs/brand/voice-and-tone.md`, `docs/brand/glossary.md`, `docs/brand/brand-standards.md`
- `docs/brand/design-system/` (design-system.md + tokens.json)
- `docs/research/behavior-science-knowledge-base.md` (✓ entries only for any research claim)

Also read `docs/marketing/homepage-explainer-video-plan-2026-10-19.md`. Its script tells the same cycle; flag where it and the page disagree.

Before moving on, write a short **baseline summary** in chat:
- what those two docs settled;
- what they left open;
- what they assumed without checking.

## 2. What changed since those docs (delta check only)

Check only what could have moved since 2026-10-19 / 2026-10-23:

- **Product facts.** List commits since 2026-10-19 that touch `repo/docs/features/` or the www repo (for example, `git log --since=2026-10-19` on those paths, and `gh` read-only for www).
  - For each fact in the 10-19 §2 table, mark it **still true / changed / still unknown**.
  - Re-check facts in the code only where a commit touched them, or where the earlier doc marked them uncertain:
    - whether a missed report is charged separately from missed goals;
    - whether members see each other's marks mid-cycle;
    - the actual Stripe rate;
    - peer mode;
    - hall pass.
- **Live fixes.** Has anyone applied the 10-23 quick wins or the "make the page true" fixes yet? Check the live `/how-it-works` and homepage for each wrong claim the 10-23 eval listed:
  - hall pass;
  - three kitty policies;
  - "$20 per missed report";
  - peer-mode "group-set" terms;
  - "Create a founder account."
  - Mark each one fixed or still live.
- **Asana.** Read-only:
  - Has the `[Product Pillar] How It Works (/how-it-works)` card (1218487645120675) moved, or does it have new comments?
  - Has the Pricing card (1218487645120673) moved?
- **Where the code lives.** Confirm `/how-it-works` is a CMS page or a coded route in www. List which Payload blocks the homepage uses. If you can't reach the www repo, say so and work from the live site.

## 3. Inventory the live page and the homepage section

Open `/how-it-works` and `/` in the built-in browser at 1440 and 375 wide. Read with `get_page_text` / `read_page`; screenshot only where layout matters.

- **`/how-it-works`:**
  - every section, with its exact headline, body, sample lines, CTAs and visuals;
  - its title, meta description, canonical, OG image and schema;
  - every inbound link (nav, footer, homepage, `/pricing`, `/faq`, blog articles, `/llms.txt`), with its anchor text.
- **Homepage:** the current cycle/acts section, plus any other section that explains the mechanic. That includes the kitty and pricing sections, because they overlap with what the pillar will carry.
- **Overlap map:** for each piece of explanation, where does it appear today (homepage, `/how-it-works`, `/pricing`, `/faq`)? Mark duplicates.
- **Real screens available** in `docs/product/screenshots-2026-10-03/`, `docs/product/reddit-ad-screenshots-2026-10-03/`, and `docs/product/ui-references/`: which act each could illustrate, and which screens are missing.

**Checkpoint: stop here.** Show me the baseline summary, the delta check (§2) and the inventory (§3) in chat before evaluating. If the facts or the page have moved, the evaluation needs to start from the new state.

## 4. Fill the gaps the earlier docs left

Do only what neither doc did:

- **Comparison scan.** Look at how 4 to 6 products explain a recurring, money-backed mechanic: stickK, Beeminder, Coach.me, plus one or two strong process explainers of your choice (say why you picked them).
  - Put it in one table: structure, the main visual, how money is explained, one thing to borrow or avoid.
  - Don't copy their wording.
- **Keyword check.** Only if approved above. Run only the narrow `phrase_this` lookups from 10-19 §5.5, with no `phrase_related`. If not approved, note what the check would have answered.
- **Homepage section design.** Neither doc designed it. The 10-23 eval only placed it in the section order.

## 5. Evaluate

### Part A: `/how-it-works`, current page vs. the plan

Use one gap table, with a row for each band in the 10-19 §3 plan plus each pillar-skill requirement. Columns:

| Band / requirement | Live page today (quote it) | 10-19 plan | Grade (Strong / Adequate / Weak / Missing) | Verdict: keep / fix / cut / add | Why |

Then:
- **Where you disagree with the 10-19 plan.** Name each band you'd change and why. Silence means you agree. Look hardest at:
  - the worked example as the page's centerpiece;
  - the cycle-at-a-glance timeline;
  - the objections band;
  - overlap with `/pricing` and `/faq`.
- **Final band list:** for each band, its job, its key message, its proof (a real screen, the worked example, or a ✓ KB entry), its visual, and its approximate length.
- **SEO:**
  - title tag (under 60 characters);
  - meta description (150 to 160 characters, script-counted);
  - H1;
  - schema type;
  - target query;
  - inbound links to add, and outbound links from the page.
- **Effort split:** Grant in the CMS vs. an engineer in www vs. assets we need recorded.

### Part B: the homepage section, current vs. proposed

- Grade the current section with the same lenses the 10-23 eval used (experience articulation, the money mechanic, consistency, mobile). Cite that eval rather than re-scoring anything it already covered.
- **The section's one job.** Given the 10-23 §5 hierarchy, what should a visitor understand after reading it, and what should they click?
- **Homepage vs. pillar split.** The working rule to test:
  - the homepage shows the four acts at a glance, with one real screen each and one line of mechanics;
  - the pillar carries the forfeit math, edge cases, roles and objections.
  - Argue for or against that split.
- **Two design directions.** For each, give:
  - its layout at desktop and mobile;
  - which real screens it uses;
  - the headline and per-act copy, in AG voice;
  - the CTA and its target (a `/how-it-works` anchor);
  - whether an existing Payload block fits or a new one is needed;
  - pros and cons.
  - Recommend one.
- **A static HTML mock of the recommended direction,** built with the brand tokens and fonts, at desktop and 375 mobile.
  - Use labeled placeholder boxes naming the real screenshot each one would hold. Don't invent UI.

### Consistency

List every place that has to change with this work so nothing contradicts it. For each place, note whether it's fixed, still wrong, or not yet checked:
- the homepage, `/pricing`, `/faq` and `/llms.txt`;
- the explainer video script;
- the launch listing copy (`docs/marketing/free-launch-plan-2026-10-22.md`, before the Product Hunt launch on 2026-11-17);
- the CLAUDE.md core-mechanic section.

## 6. Deliverable and rules

- Save the evaluation to `docs/marketing/how-it-works-evaluation-<YYYY-MM-DD>.md`, ordered for review:
  1. **Summary:** five lines at most. State what's wrong with the live page today and what the recommended path is.
  2. **One decision list.** Merge the open decisions from 10-19 §5, the 10-23 eval, and anything new into a single numbered list. Put your recommended answer first and mark which pages each decision unblocks. Drop any decision I already answered above.
  3. **The recommended homepage direction,** with a link to the mock.
  4. **Part A:** the gap table and the final band list.
  5. **Part B:** the rest of the homepage section evaluation.
  6. **Delta check, comparison scan, consistency list.**
- Save the mock as `docs/marketing/how-it-works-homepage-section-mock-<YYYY-MM-DD>.html` and show it to me.
- Reference the 10-19 plan and the 10-23 eval by section number instead of restating them. Mark the 10-19 plan as superseded only where this evaluation replaces it.
- Don't edit `repo/`, the www repo, the CMS or Asana. Don't commit unless I ask.
- Don't write the full page copy. Once I approve this evaluation, the How It Works card moves to Drafting and the brief is written from `pillar-page-brief-template.md`. Write copy only where the section design needs it.
- No invented stats, testimonials, user counts or features. Anything the product doesn't do today stays off the page, even as "coming soon," unless I say otherwise.
- Keep it reviewable: findings that would change what we build, not an exhaustive audit.
- When you finish, offer to publish the evaluation as a shareable doc so Grant can comment.
