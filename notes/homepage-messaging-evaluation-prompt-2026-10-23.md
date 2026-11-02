# Prompt: Homepage messaging evaluation

Paste everything below the line into a fresh Claude Code session opened in the AccountabilityGuild project folder. Fill in the optional "My hunch" block first if you have specifics; leave it blank otherwise.

---

I want a messaging evaluation of the Accountability Guild homepage (accountabilityguild.com, source at `repo/src/app/page.tsx`). My hunch is that the page doesn't line up well with the product and doesn't articulate what it's actually like to use it. I want evidence-backed findings and prioritized recommendations I can review. **Don't change any site code in this session.** The deliverable is a written evaluation.

**My hunch (optional, fill in):**
- What feels off:
- Who I think is landing on the page:
- Anything I already know I want kept:

## 1. Load context first

Read these before forming any opinion:

- `CLAUDE.md`: product, cycle mechanic (4 acts), two group modes, monetization, current marketing efforts.
- `docs/brand/voice-and-tone.md` and `docs/brand/glossary.md`: voice rules and canonical terms. Recommendations must comply.
- The live `/llms.txt` (accountabilityguild.com/llms.txt): canonical positioning and preferred terminology.
- `repo/docs/features/marketing.md` and `repo/docs/marketing/business-evaluation-2026-05-15.md`: marketing intent, CTA routing, competitors (stickK, Beeminder, Coach.me).
- `docs/marketing/homepage-explainer-video-plan-2026-10-19.md`: the most recent attempt to explain the product in 90 seconds to group organizers. Treat its script as a candidate articulation, not as truth.
- `docs/marketing/how-it-works-pillar-plan-2026-10-19.md` and the `pillar-page-structure` skill: how the homepage hands off to `/how-it-works` and `/pricing`.
- `docs/marketing/reddit-ad-creative-plan-2026-10-01.md`: the messages paid traffic is being sent on ("the story", "the price"). The homepage is where those clicks land.
- `docs/marketing/free-launch-plan-2026-10-22.md`: the listing copy launch-board visitors will have read before arriving.
- `docs/research/behavior-science-knowledge-base.md`: any research claim you recommend must come from a ✓ entry.

## 2. Capture the page as it actually is

- Open the live homepage in the built-in browser at desktop and mobile widths. Read it with `get_page_text` / `read_page`; take screenshots only where layout or visual hierarchy matters to the finding.
- Cross-check against `repo/src/app/page.tsx` and the components it imports. Note any gap between source and live.
- Also capture the page's metadata (title, description, OG image) and the first screen of `/how-it-works`, `/pricing`, and `/create-account`, since those are the next steps a visitor takes.
- Produce a section-by-section inventory: for each section, its job on the page, the exact headline/subhead/body/CTA copy, and any visual or demo element (for example the cycle-stats and commitments mock).

## 3. Establish what the experience really is

Before judging the page, write down the ground truth it should be conveying. Use the app routes in `repo/src/app/` (dashboard, group, reports, cycle-history, onboarding), `docs/product/ui-references/`, and `docs/product/screenshots-2026-10-03/`.

Write short "a cycle in the life" narratives for:
1. The **organizer** setting up a group (owner-led and peer modes, where they differ).
2. A **member** across one cycle: committing, logging proof, closing with a report, paying or not paying a forfeit, seeing the kitty.

Name the 3 to 5 moments that make the experience distinctive (the things a visitor would only understand by using it). Then state the primary visitor you believe the homepage should serve, their awareness level when they arrive (from ads, launch boards, organic, a friend's invite), and the question they're trying to answer.

**Checkpoint: stop here and show me sections 2 and 3 in chat before evaluating.** If your read of the experience or the audience is wrong, everything after it is wrong too.

## 4. Evaluate

Score each lens Strong / Adequate / Weak, citing the specific copy or element as evidence:

1. **Five-second test.** From the first screen alone: what is it, who is it for, why should I care, what do I do next?
2. **Experience articulation.** Does the page let a visitor picture a cycle? Which of the distinctive moments from step 3 are shown, told, buried, or missing?
3. **Audience fit.** Is it clearly for groups that already exist, not solo habit trackers? Does it speak to the organizer (who signs up) and still make sense to a member (who gets invited)? Does it handle the two modes without confusing either?
4. **The money mechanic.** Forfeits, card on file, kitty, $1 platform fee. Is it framed as the group's stakes rather than a company fee? Does it pre-empt the obvious objections (what if I miss, who holds the money, what does it cost)?
5. **Differentiation.** Why this instead of a group chat, a shared spreadsheet, stickK, or Beeminder? Is the group + pooled kitty whitespace stated plainly?
6. **Proof and credibility.** Founder story, public beta status, research claims, product visuals. What's believable and what's asserted?
7. **Message hierarchy and flow.** Does the order of sections match the order of a visitor's questions? Any redundancy, dead ends, or sections that don't earn their space?
8. **CTA and next step.** Is it clear what happens after clicking (create account, create group, invite)? Does the CTA match the visitor's readiness?
9. **Consistency.** Does the homepage tell the same story as the metadata, `/llms.txt`, `/how-it-works`, `/pricing`, the Reddit ads, and the launch listing copy? Flag contradictions, including the known pricing discrepancy in `repo/src/lib/marketing-content.ts`.
10. **Voice and terminology.** Compliance with voice-and-tone and the glossary.
11. **Mobile.** Does the message survive the narrow layout, especially the hero and the product mock?

Separate what you observed from what you're inferring. If you can use any real traffic or funnel data (the app's `LandingPageViewEvent` data, GA4), use it, but ask before touching anything production-side, and don't block the evaluation on it.

## 5. Recommendations

Give a prioritized list. For each recommendation:
- **Problem**, with the evidence (quote the current copy).
- **Recommendation**, in one or two sentences.
- **Example copy**: two options where copy is involved, written in AG voice.
- **Impact / effort / confidence**, each high, medium or low.

Split the list into:
- **Positioning decisions I need to make**: questions about audience, framing, or hierarchy that copy can't settle on its own. Give your recommended answer for each.
- **Copy and structure fixes**: things that can be done once those decisions are made, or now.
- **Quick wins**: low-effort fixes worth doing regardless.

Close with a proposed messaging hierarchy for the page: the one-line promise, three to four supporting points, the proof for each, and the section order it implies. Don't write a full page rewrite yet; that comes after I review.

## 6. Deliverable and rules

- Save the evaluation to `docs/marketing/homepage-messaging-evaluation-<YYYY-MM-DD>.md`. Put a short summary and the positioning decisions at the top so I can review in that order.
- Don't edit `repo/` or any published content. Don't commit unless I ask.
- No invented stats, testimonials, or user counts. Research claims come from ✓ KB entries only.
- Keep it reviewable: aim for findings that fit on a few screens, not an exhaustive audit. Cut any finding that wouldn't change what we do.
- When you finish, offer to publish it as a shareable doc so others can comment.
