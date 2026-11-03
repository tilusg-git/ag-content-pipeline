# Topical Pillar media plan (P4 /goal-setting first, template for the rest)

2026-11-03. The layout is signed off (Figma frame `48:292`, v2.3.1), so the placeholders are now final slots. This plan decides how each slot gets made, in what order, and what Grant needs to decide first. Rules it builds on: playbook §3.3 (media slots and sourcing), skill B7 (media beats), brand standards §14 (imagery direction).

## 1. The approach in one line
**Make what we can from our own materials first, and photograph only where a real-world scene is the point.** Brand standards §14 makes typography and brand motifs the house style. Most P4 slots show a *written thing* (a goal card, a calendar, a report), which we can draw in brand tokens. That makes them cheap, consistent, license-free, and editable when copy changes.

## 2. Four production routes

| Route | What it is | Tool | Cost | Fits |
|---|---|---|---|---|
| **A. Native** | Already built as page components in Figma; ships as HTML/CSS, not an image | Figma (Scripter) → engineering | None | Diagrams, figures, panels |
| **B. Product UI** | Real app screens with sample data, rendered from the app's own CSS | `docs/brand/assets/product-views/render.js` | Low | Anywhere the page shows the product (only where shipped, labeled illustrative) |
| **C. Brand illustration** | Flat, token-only drawings of written objects (cards, calendars, trackers) with hand-set type | Figma via Scripter, exported as SVG/WebP | Low | Objects whose content is text |
| **D. Photo** | A real scene: people, places, hands on objects | Own photos (Brandon's group, with permission), AI-generated per page, or CC/licensed | Medium, needs approval per image | Moments only a photo can show |

## 3. P4 slot by slot

| # | Slot | What it shows (from the module doc) | Route | Notes |
|---|---|---|---|---|
| 1 | Hero (460×400; mobile 335×230) | Goal card "Run four times a week" beside a one-week grid with four ember ticks | **C** | The page's signature image. The ticks echo the tally mark |
| 2 | Band 2 goal loop | Write → track → review → adjust | **A** (done) | Ships as HTML; it's the link-worthy original diagram |
| 3 | 4.1 Pick one goal (360×340) | One goal on an index card above a 12-week calendar, end date circled | **C** | Pure typography and grid |
| 4 | 4.3 Annotated goal card (360×300) | "Walk 30 minutes three times a week" with 3 numbered callouts | **C** | Same card style as the hero, so it reads as a family. Callout positions get set to the drawn words |
| 5 | 4.5 Week plan | Mon/Wed/Fri/Sun actions with minimum versions | **A** (done) | Already a native figure |
| 6 | 4.6 Tracking (360×300) | Paper tracker on a fridge, phone with a one-line weekly text | **D** (or **C**) | Real-life tracking is the point; a photo makes it feel doable. Fallback: a flat tracker sheet + phone text bubble |
| 7 | 4.7 Weekly review (360×380) | A member's report: kept and missed marks | **B**: `week-board` scene (or `report-goal`) | The one product moment in the body, at Grant's request. Labeled "Illustrative" |
| 8 | 4.8 Image cards ×3 (286×180; mobile 260×150) | One person / a small group / a shared sheet | **D** for cards 1–2, **C** for card 3 | Cards with people need a sourcing decision (§5) |
| 9 | Band 7 illustrative panel | Sample cycle line | **A** (done) | The optional real-group photo is route D, with permission |
| 10 | Product CTA band | No image | n/a | |

That makes **3 native, 1 product UI, 4 to 5 brand illustrations, and 2 to 3 photos**. The illustrations are mostly one style made once: the goal card is reused in the hero, 4.1 and 4.3.

## 4. Order of work
1. **Style frame first (one session).** Draw the hero in route C at full size, desktop and mobile, in Figma beside the v2.3 frame. Grant comments, and that sets the illustration style for every pillar.
2. **The rest of route C** in the approved style (4.1, 4.3, 4.8 card 3). The 4.3 callouts get placed on the drawn words.
3. **Route B:** render `week-board` at the 4.7 slot size with sample data that matches the page's study example. Use `--frame bare` and the mobile layout for the 335 view.
4. **Route D**, after the §5 decisions: source or generate. Run the `image-backgrounds-spec.md` licensing and safety checklist on each image.
5. **Swap the placeholders** in the Figma frame (all through Scripter, no MCP cost). One Grant review. Then export.
6. **Export spec for engineering:** WebP at 1× and 2× plus an SVG where flat; sizes from the table above; alt text from the module doc; `ImageObject` schema on the hero; lazy-load everything below the fold. This needs the media fields in the page data model (playbook §9 item 7).

After P4, P7 /types-of-personal-goals reuses the same styles. Only its subjects change.

## 5. Decisions (Grant, 2026-11-03)
- **Photos and people:** no photos of Brandon's group. Use Grant's own photos where one fits (individual goals: workouts, hiking, reading); otherwise AI-generated, approved per image. Website imagery is now brand standards §16 (`docs/brand/website-imagery-guidelines.md`). AI images come from Gemini; illustrations use the Paper ground; persona photos can carry the goal tag.
- **Media count:** 3 to 6 beats, a soft target set by page length.
- **4.7:** the `week-board` scene.
- **Money stakes:** don't mention $0 or "optional" stakes; the CTA fine print states pricing only.

### Original questions
1. **Photos on site pages.** Brand §14 allows photos only as social quote-card backgrounds today. Extend that to Topical Pillar section media, under the same per-image approval and checklist?
2. **People in photos (4.6, 4.8).** Pick one:
   - (a) Brandon's group photographed for real, with consent. This is the most credible option, and it can also fill the band 7 photo slot.
   - (b) AI-generated scenes with no identifiable faces (hands, backs, objects). §14 bans AI portraits, so faces are out either way.
   - (c) Skip photos and make 4.6 and 4.8 route C too.
3. **Media-beat count.** P4 now has 6 beats (the 4.7 product UI was added). Make the rule 3 to 6, or drop one beat (4.1 is the lightest).
4. **Product UI scene for 4.7:** `week-board` (the week at a glance, closest to "review your week") or `report-goal` (scoring one goal at close).
5. **Money stakes** (for the CTA band copy, not media): ask Brandon whether a group can run with a $0 forfeit. The code allows it, and onboarding defaults to $100.

## 6. What stays out
- No stock photos of fake "group members" presented as real (playbook §3.3).
- No AI portraits or identifiable AI faces (brand §14).
- None of the five legacy painterly homepage illustrations (off-brand, §14).
- No product UI for anything that isn't shipped (`docs/product/capability-ui-inventory.md`).
- No media that carries a point the text skips: the page must read complete without it.

## 7. Status (2026-11-03, end of day)

| Slot | Status |
|---|---|
| Hero | **Placed** in `48:292` and the mobile hero: Paper style, goal card + week grid |
| 4.1 | **Placed**: goal card clipped above a 12-week calendar with W12 circled. On mobile the calendar labels are small (about 6 px): check legibility |
| 4.3 | **Placed**: goal card with ember markers 1–3 on "Walk", "30 minutes", "three times a week." |
| 4.7 | **Placed**: `week-board` render (desktop panel 360×228; mobile phone capture cropped to the two daily goals), captioned "Illustrative". Specs: `docs/brand/assets/product-views/examples/pillar-goal-setting-review*.json` |
| 4.6 | Persona photo: Grant's own, or Gemini (prompt below) |
| 4.8 cards 1–2 | Persona photos: Gemini (prompts below) |
| 4.8 card 3 | Brand illustration (shared sheet with each member's row of ticks): not built yet |
| Goal tag | Approved. Needs a style frame on the first persona photo |

Scripts: `notes/figma-pillar-v2/media-p4-paper.js` (illustrations). The README covers running it through Scripter.

## 8. Gemini prompts for persona photos
Apply to every prompt: *natural daylight, warm-neutral color, slightly muted saturation, candid documentary style, shallow depth of field, ordinary real-world setting, no visible faces (shown from behind, cropped below the eyes, or hands only), no text, no logos, no app interfaces on screens, no celebration poses.* Generate at 4:3 and crop to the slot. Run the `image-backgrounds-spec.md` checklist on each image and log it in `docs/brand/assets/site-imagery/manifest.md`.

**4.6 Tracking (360×300).** A paper weekly habit tracker taped to a white kitchen fridge door, four of seven boxes ticked in pen. A hand reaches in holding a pen, about to tick today's box. A phone lies face-up on the counter below showing a plain message bubble. Morning light, close-up, kitchen softly out of focus.
*This one is easy to shoot for real: print a tracker and tape it to your fridge. A real photo beats AI here.*

**4.8 card 1, One person (286×180).** Over-the-shoulder view at a café table: one person's hand holds a phone toward a friend across the table, and the friend's hands rest around a coffee cup. Only hands, forearms and the table are visible; the phone screen is a soft, unreadable blur. Window light, wooden table.

**4.8 card 2, A small group (286×180).** Top-down view of a kitchen table on a weeknight: four people's hands and forearms around it, with open notebooks, pens, two phones face-down and mugs. One notebook shows a hand-drawn weekly grid with ticks. Warm overhead light. No faces in frame.

**Goal tag on these photos:** add it in Figma, not in the AI image. A bone label with `GOAL · 12 WEEKS` / *Run four times a week.* pinned in a corner, at most one per photo.
