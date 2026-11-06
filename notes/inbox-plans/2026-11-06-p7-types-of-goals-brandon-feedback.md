# P7 /types-of-personal-goals: Brandon's feedback (2026-11-06)

Source: Brandon's reply (sent by his agent, claude@projectstart.co, Brandon cc'd) on
"/types-of-personal-goals guide for review", 2026-11-06 08:46 CT. Gmail thread `1a1adc2283187518`.
Written by the inbox-replies routine. Nothing has been changed yet. This is a design-direction
pass on a whole pillar, so it's more than one routine run.

## What he asked (short)

- Apply the same feedback as /goal-setting (P4 v2.4) so both guides describe one approach.
- Keep the Christian faith examples and the current visual direction. The main changes are the
  planning model, the tracking language and the open-goal illustration.
- Context from his group: life areas are faith, family, fitness, work/business, personal life.
  Longer-term aspirations give direction to annual goals set at a January planning retreat; not
  every aspiration becomes a commitment. Members present proposed goals, the group discusses, each
  person decides. Commitments are made measurable.
- Goal frequency is not the reporting cycle: a commitment can be daily, weekly or monthly while the
  group reports monthly. A monthly commitment doesn't need weekly actions or daily tracking.
- Planning includes an honest look at what an aspiration needs (time, money, practice, help,
  trade-offs with family). Sometimes the answer is to defer it. Help readers who don't know "what
  do I want" with concrete examples and narrow questions.
- Revision points:
  1. Keep 8-to-12-week focus periods and weekly planning as options, not the default; don't imply
     everyone must focus on one life area. (Today's lead/def says "one area and one shape".)
  2. Explain accomplishment vs commitment (marathon = accomplishment; agreed training = commitment).
  3. Tracking is optional and fits the commitment; everyone reports on the group's cycle.
  4. Keep the faith examples, framed as practices people choose, never implying a checked box
     measures spiritual maturity.
  5. Fix the open-goal illustration: the 9/12 display adds a target, which contradicts "no
     pass-or-fail line". Use an editorial tally ("9 runs recorded, see how far you get this month").
     If the app screen can't show that honestly, use a separate illustration, and don't imply the
     app has a tracking mode it lacks.
- Keep the approachable marketing tone and visual structure. Send it back so he can review both
  guides together.
- His example commitments (generalized): faith, one hour a week reading a faith book; family, two
  hours a month planning a family trip; fitness, three strength sessions a week; work, one protected
  hour a week on a product idea; relationships, a weekly call and a monthly visit. Also a monthly
  date with a spouse, one-on-one time with a child, a short devotional before a morning routine.

## Attachment (not saved by the routine)

`personal-goals-reference.pdf` and `.txt`: anonymized examples from his group's planning records
(25 aspirations, 26 commitments, labeled illustrative examples). **Don't commit it to this repo**:
the repo is public and the packet is Brandon's group's private material, even anonymized. Save it
under a private location (Drive, or a git-ignored folder) and paraphrase from it.

## What I'd change

1. Copy (source: `notes/figma-pillar-v2/p7-types-of-personal-goals-v2.3.js` → new
   `p7-types-of-personal-goals-v2.4.js`, mirroring how P4 v2.4 was built from `build-v2.3.js`):
   - `def` and hero lead: drop "one area and one shape"; frame as yearly planning with the group,
     aspiration → commitment.
   - Life areas: consider his five (faith, family, fitness, work/business, personal) vs our six
     (health, money, career, relationships, learning and growth, faith). Open question below.
   - Each area module: swap in commitment-style examples like his, with mixed frequencies.
   - 4.7 goal shapes: add accomplishment vs commitment; open-goal row and context copy without a
     target; tracking-mode line says tracking is optional and the report follows the group's cycle.
   - 4.8 short/long term: aspirations → annual commitments → cycle reports; 8-12 week focus and
     weekly planning as options.
   - 4.9 where to start: narrow questions for readers who don't know what they want; "what would it
     take" check (time, money, practice, help, trade-offs), with deferring as a valid outcome.
   - 4.10 accountability: present, discuss, decide; the group reads the reports.
   - Faith module 4.6: keep examples; add the "practices you choose, not a measure of maturity" line.
   - Acknowledge *Atomic Habits* if P4 v2.4 did (keep the two guides consistent).
2. Open-goal illustration: edit `docs/brand/assets/product-views/examples/pillar-types-of-goals-shapes*.json`
   so the counted goal shows a tally with no target, if the renderer's count mode allows it;
   otherwise replace with a brand illustration and keep product UI for the daily-marks and
   report-only goals. Check the app's count mode in `repo/` before deciding (read only).
3. Rebuild in Figma via Scripter (frame next to `116:4994`), re-run `export-html.js`,
   `export-handoff-p7.js` (with `p7-publish-config.js`) so `content/pillars/types-of-personal-goals.md`,
   the HTML mockup and `dist/` regenerate. Update the SEO requirements doc only if title/meta change.
4. Cross-check P4 v2.4 (`p4-goal-setting-v2.4.js`) against the same points (frequency vs cycle,
   tracking optional, focus periods as options) so both guides match before sending.
5. Reply to Brandon with both guides for a consistency review (GitHub links, not private artifacts).

## Open questions for Grant

1. Life areas: adopt Brandon's five (faith, family, fitness, work/business, personal) or keep our
   six with his framing? The page's grid, module order and SEO targets depend on this.
2. Is "accomplishment" vs "commitment" the vocabulary we want on the page (check `docs/brand/glossary.md`)?
3. Does P4 v2.4 already cover his new points (frequency vs reporting cycle, focus periods as an
   option, "what would it take")? If not, P4 needs a v2.5 pass in the same session.
4. Where should the reference packet live?

## Size

One full working session, maybe two: copy rewrite across ~10 modules, one renderer spec change,
a Scripter Figma build, regenerated hand-off/HTML, and a P4 consistency check.
