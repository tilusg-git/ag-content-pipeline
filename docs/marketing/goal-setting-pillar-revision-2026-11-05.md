# /goal-setting (P4) v2.4: revision for Brandon's feedback (2026-11-05)

Brandon's email (2026-11-05) asked for the guide to be rebuilt around how Accountability Guild groups actually work: choose meaningful commitments, discuss them with your group, track them as each one needs, and report on the group's agreed cycle. Other techniques can stay as options, not requirements.

**Status (2026-11-05):** Grant approved the copy. It's built in Figma as frame `121:380` (x 31000; mobile column and notes beside it), and `content/pillars/goal-setting.md` has been regenerated from `notes/figma-pillar-v2/p4-goal-setting-v2.4.js`.
- **Photos:** the v2.3 photos were cloned in (4.8 reordered; the hero tag reads "Goal · This year").
- **4.7:** shows the `report-close` render (`docs/brand/assets/product-views/examples/pillar-goal-setting-report.json`).
- **4.1 photo:** placed 2026-11-05 (item 2).
- **Still open:** items 4 to 8.

Prose limits pass (script-checked): definition 50 words; key points 14 to 16 words; H2s at most 12 words; leads at most 29 words; module prose at most 76 words; no paragraph over 50 words; no em dashes.

## Brandon's points, mapped to changes

| Brandon's point | v2.4 change |
|---|---|
| **Timeframe.** His group sets goals in January for the year; 8 to 12 weeks is an option, not the standard. | Module 4.1 is now "Set your goals for the year, then report on them all year". Twelve weeks stays as one checklist line ("works too when a season or a fresh start calls for one"). Key point 1, the topic index, and the hero goal tag ("Goal · This year") follow. |
| **What a goal is.** The repeatable action is the goal (the commitment you report against); the half marathon is the accomplishment. | Module 4.2 is now "Separate what you want to accomplish from the goal you commit to". Table columns: Accomplishment you want / Goal you commit to / How you'd report it. The definition card and key point 2 use the same split. |
| **Weekly actions and reviews.** No 3 to 5 weekly actions; members report at the end of the group's cycle, often monthly or every four weeks, sometimes quarterly. | Module 4.5 "Give each goal the rhythm it needs" replaces the weekly-actions week strip with the P7 stack figure (by a date, monthly, weekly, daily). Weekly steps are "one option, not a rule"; the 30-day sprint stays as the go-deeper card, framed as an option. Module 4.7 becomes "Report on your goals at the end of every cycle": the four questions are now cycle-report questions, and the context line names weekly and quarterly as alternatives. The answer-band loop is now Commit → Track as needed → Report each cycle → Adjust. |
| **Tracking.** Daily tracking only for daily goals; each person picks what fits. | Module 4.6 is now "Track each goal only as much as it needs" ("a daily mark for a daily goal, a tally for a weekly one, nothing until the report for a monthly one"). The fridge tracker photo still fits as the daily example. |
| **Sharing.** Members present commitments at annual planning, the group discusses and may suggest changes, the individual decides, and the group reads the reports all year. | Module 4.8 is now "Present your goals to your group, then decide for yourself". The three image cards are Present / Report / Read the reports (photos reordered to fit). Band 7 and the CTA steps ("Present your goals to the group") follow. Both group-research stats stay; they fit the model better than before. |
| **Atomic Habits.** Acknowledge it as an influence, tied to repeatable behaviors. | Module 4.2, second context paragraph: "Accountability Guild's approach owes a lot to James Clear's Atomic Habits, which argues that results come from the small behaviors you repeat. That is why the goal you commit to is the repeated behavior." |
| Kept as he liked them: checkable goals (4.3), SMART guidance (4.4), the setback plan (4.9, general advice). | 4.3: "on Sunday" → "at the end of the cycle". 4.4: "for a month" → "for a cycle". 4.9: the weekly-review if-then line now says "two cycles running … raise it in my report". |

Also changed for consistency: the dek, the 4.10 mistake rows (more goals than you can keep up all year; name the cause in your next report), the band 8 label "Want a fast start" (was "Ready to start this week"), and the band 9 group labels.

## Open items before the Figma build

1. ~~Grant's sign-off on the copy~~ Done 2026-11-05.
2. ~~**4.1 needs a new photo.**~~ Done 2026-11-05. The sticky note read "One goal (12 weeks)". Grant agreed the photo should set the scene (planning at the start of the year) and leave the method to the copy: no year, which would date the page, and no readable handwriting, which Gemini garbles. Prompt used (P4-8): *Photo of a person's hands at a wooden kitchen table in soft early-morning winter light, writing in an open paper notebook beside a fresh wall-style planner opened to its first month. A mug of coffee, a pen, a window with bare branches softly out of focus behind. The writing on the page is out of focus and not readable. Crop from the shoulders down: no face. Natural, unstaged, documentary style, warm neutral tones.* Result: `5we8` (juice instead of coffee, two notebooks), cropped below the beard and placed without a goal tag; the hero already carries "Goal · This year".
3. ~~**4.7 product UI**~~ Done: render a `report-close` spec with the demo clock (cycle-close report instead of the week board), with the "Illustrative" caption.
4. **Atomic Habits line:** it states an influence, not a research finding, so it doesn't need a ✓ KB entry. It paraphrases the book; there's no quote. Confirm Brandon is happy with the wording, since it speaks for the company.
5. **Terminology:** the glossary says to use "commitment", not "goal", in product copy. This page targets "goal setting", so it says "goal" and defines it as the commitment you report on. That matches Brandon's usage. The product band uses "goal" too, as v2.3 did. Flag it if you want "commitment" in the CTA band.
6. ~~**SEO doc:**~~ Done 2026-11-05 (meta description, alt and figure names updated). the meta description in `goal-setting-pillar-seo-requirements-2026-11-04.md` still says "plan weekly actions … review each week". Proposed replacement (158 characters, script-counted, different from the dek): "A research-based goal setting guide: set goals for the year, commit to repeatable behaviors, track what each goal needs, and report to your group every cycle."
7. **P7 /types-of-personal-goals** has the same assumptions. Its 4.8 short-/long-term module breaks year goals into weekly steps, and 4.4 uses the week calendar. Run the same pass on P7 before it's sent.
8. **Template rule:** add the model to the pillar skill and playbook so future pillars start from it: yearly goals, commitment = goal, the cycle report rather than a weekly review, and tracking as needed.

## After sign-off
1. Build v2.4 in Figma through Scripter (README steps). The data file's `x` is 31000, to the right of P7 v2.3.3. Place the photos (4.8 order: kitchen table, park bench, living room; new 4.1 photo; hero tag "Goal · This year").
2. Switch `export-handoff.js`'s default data file to `p4-goal-setting-v2.4.js` and regenerate `content/pillars/goal-setting.md`.
3. Update the SEO requirements doc (meta description, the "week figure" and week-board alt mentions).
4. Send Brandon the revised page.
