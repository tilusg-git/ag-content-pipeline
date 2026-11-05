# Homepage v5: design and build handoff

This is what the production homepage build has to carry over from the v5 mockup (`index.html`). It goes out with `seo-requirements.md`, which stays part of the handoff. The builder and release date are still open (Brandon, 2026-11-05). The design isn't marked ready for build until Brandon signs off on this round.

## Round 2 changes (Brandon's email, 2026-11-05)

### Positioning: the report is the core, and tracking is optional

Members can track in Accountability Guild, but they can also use another app, a notebook, a spreadsheet or anything else. The report to the group is the central function. Copy changed:

| Where | Before | Now |
|---|---|---|
| Step 2 heading | 2. Track progress toward each goal *as you go.* | 2. Track progress *your way.* |
| Step 2 body | Log progress in a few taps… No more spreadsheets: when report day comes, your progress is already there. | Use Accountability Guild to log progress, add notes or share photos, or keep using the tools you already like. When report day comes, bring it together in your report so the group knows what happened. |
| 02 lede | …everyone’s goals, progress and reports live in one place… | …everyone’s goals and reports live in one place… |
| 02 "The group chat" card | Log progress in a few taps from your phone, whenever you sit down. | Each member’s report arrives in one place before the meeting, not scattered through a thread. |
| Workout crews card | …with every workout logged. | …and reporting back to each other every cycle. |
| Meta description | …set goals each cycle, track progress, report back… | …set goals, track progress your way, and report back… |

Brandon's Step 2 wording used an em dash; the page uses a comma. The 02 heading ("Replace the shared spreadsheet your group forgets to update") stays, because it describes the group's shared reporting sheet, not anyone's personal tracking. **These changes are in the HTML only. Figma v5 (`77:2`) still has the old copy.**

### Layout

- **Mobile "Log in"** stays in the header next to "Start a group" at every width down to 320 px. The header type tightens at 360 and 340 px so all three items fit.
- **Tablet (761 to 1200 px):**
  - The founder note stacks above 1200 px, with its letter held to a 720 px measure.
  - "Who it's for" and "What it replaces" go to a 2 × 2 grid.
  - At 960 px and below, the four steps stack (copy above the screen), the overview's members go 2 × 2, and the nav tightens so nothing wraps or overflows.

## Accessibility requirements (build must ship these)

1. **Small ember text contrast.** Brand ember `#D8512A` is only 3.9:1 on bone, which fails WCAG AA (4.5:1) for small text. The palette stays the same. Ember remains the color for large type: H1/H2 italics, card titles 24 px and up, and the check fill in the week board. Small ember text uses a darker shade, `--ember-text: #B8401C` (5.3:1 on bone, 5.5:1 on panel, 5.0:1 on the reflection fill). In the mockup it's used for the "Invited" status, today's date in the week board, the $15 forfeit in the report, and the kitty total in the money receipt. *This is a new color value: Grant needs to approve it as a brand token (brand standards and `tokens.json`) before the build.*
2. **Horizontal scroll rows** (mobile: "What it replaces", "Who it's for", guides):
   - The scrollbar is visible: a thin ink-soft thumb on a line-colored track, plus the existing peek of the next card.
   - The row shows a "Swipe or use arrow keys for more →" hint (`aria-hidden`; the region label carries the meaning for screen readers).
   - When the row actually overflows, it becomes `role="region"`, `tabindex="0"` and `aria-label="<name> (scrolls sideways)"`, so it takes focus and scrolls with the arrow keys. It shows a visible focus ring.
   - On wider screens, where the row is a static grid, those attributes are removed so it's not a dead tab stop. In the build, do this with a resize-aware hook, or render the attributes only in the mobile layout.
3. **Sticky mobile CTA:**
   - It appears only after the hero buttons scroll away.
   - It hides when the final CTA section or the footer is on screen, so it never covers them.
   - While hidden it is `visibility: hidden`, so it's out of the tab order and the accessibility tree.
   - `scroll-padding-bottom: 96px` on mobile keeps focused controls above the bar when the browser scrolls them into view.
   - The footer keeps 96 px of bottom padding.
4. **Heading hierarchy.** The page has one H1, an H2 for each section, and H3s for the items inside a section. The founder note heading is now an H2 (it was an H3 under "Who it's for"). The text inside the product screens is not marked up as headings. The outline in the mockup is: H1, H2 (replaces), H2 (how) + 4 × H3 steps, H2 (money) + 4 × H3 FAQ, H2 (who) + 4 × H3, H2 (founder), H2 (CTA), H2 (guides) + 3 × H3.
5. **Example screens are labelled.** Each product screen sits in a `<figure>` with a descriptive `aria-label` ("Example app screen: one member’s week board", and so on) and a visible caption, "Illustrative · sample group". This is the same rule as on the Topical Pillar template. The money receipt already says "Example" in its header.
6. **Image alt text.** The proof photo keeps its descriptive alt ("A spin bike's handlebars and ride screen showing a 42:38 workout."). Decorative pieces (phone status bar, window dots, the blurred screen behind the sheet) stay `aria-hidden`.
7. **Focus.** Every link and button shows a 2 px ink focus ring (`:focus-visible`), which is bone on the dark CTA band.

Not changed, but worth a look in the build: the mono labels inside the product screens are 7 to 9 px. They're illustration, and the figure label covers them for screen readers, but the build shouldn't reuse those sizes for real interface text.

## SEO

See `seo-requirements.md`. The blocking items are unchanged: render the demo dates on the server (no `clock-pending` hiding), update the `/` title and description, and keep the guide and FAQ links correct.
