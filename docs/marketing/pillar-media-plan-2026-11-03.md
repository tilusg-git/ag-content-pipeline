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

## 3. P4 slot by slot (superseded by §9 for the hero, 4.1, 4.3, 4.6, 4.8)

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

## 8. Gemini prompts for persona photos (superseded by §9)
Apply to every prompt: *natural daylight, warm-neutral color, slightly muted saturation, candid documentary style, shallow depth of field, ordinary real-world setting, no visible faces (shown from behind, cropped below the eyes, or hands only), no text, no logos, no app interfaces on screens, no celebration poses.* Generate at 4:3 and crop to the slot. Run the `image-backgrounds-spec.md` checklist on each image and log it in `docs/brand/assets/site-imagery/manifest.md`.

**4.6 Tracking (360×300).** A paper weekly habit tracker taped to a white kitchen fridge door, four of seven boxes ticked in pen. A hand reaches in holding a pen, about to tick today's box. A phone lies face-up on the counter below showing a plain message bubble. Morning light, close-up, kitchen softly out of focus.
*This one is easy to shoot for real: print a tracker and tape it to your fridge. A real photo beats AI here.*

**4.8 card 1, One person (286×180).** Over-the-shoulder view at a café table: one person's hand holds a phone toward a friend across the table, and the friend's hands rest around a coffee cup. Only hands, forearms and the table are visible; the phone screen is a soft, unreadable blur. Window light, wooden table.

**4.8 card 2, A small group (286×180).** Top-down view of a kitchen table on a weeknight: four people's hands and forearms around it, with open notebooks, pens, two phones face-down and mugs. One notebook shows a hand-drawn weekly grid with ticks. Warm overhead light. No faces in frame.

**Goal tag on these photos:** add it in Figma, not in the AI image. A bone label with `GOAL · 12 WEEKS` / *Run four times a week.* pinned in a corner, at most one per photo.

## 9. Revision 2 (Grant, 2026-11-03 evening): persona-led, product used sparingly
Direction (now in the website imagery guideline §3a–3b and brand §16):
- The **hero is a persona photo** with a goal tag.
- **Product UI only where the module ties to the product**, always with one or two lines of product context: why it's easier than a notebook or spreadsheet.
- Section imagery is **chosen per module**: the familiar real thing (a sticky note, a paper tracker, two friends comparing notes) before an illustration or a screen.

| Slot | Was | Now |
|---|---|---|
| Hero | Paper goal-card illustration | **Persona photo** (runner heading out) + goal tag "Run four times a week." |
| 4.1 Pick one goal | Goal card + 12-week calendar illustration | **Photo:** the goal handwritten on a sticky note on a notebook |
| 4.3 Checkable goals | Annotated goal card | **Persona photo:** two friends checking a written goal together + goal tag "Walk 30 minutes three times a week." The numbered callout list under the image is dropped (the rewrite list carries the point) |
| 4.6 Tracking | Paper tracker on a fridge | Same direction, **Gemini** (or Grant's own). Checklist item 1 now reads "…or Accountability Guild if you track with a group." |
| 4.7 Weekly review | `week-board` product UI | **Kept**, plus a product-context paragraph: "Accountability Guild keeps this board for you…" |
| 4.8 cards 1–3 | Two photos + one illustration | **Three photos** (Gemini) |

The Paper illustrations stay in Figma as the fallback until the photos land. The Paper style remains the house illustration style for diagrams, figures and OG cards.

### Gemini prompts
Add this **style line** to the end of every prompt:
> Photorealistic candid documentary photo, natural daylight, warm-neutral colors with slightly muted saturation, shallow depth of field, ordinary real-life setting. No visible faces: people are seen from behind, cropped at the shoulders, or as hands only. No logos, brand names, app screens, celebration poses, or posed stock-photo smiles.

Generate 3 to 4 variations of each, pick the best, and drop the originals in a folder. I'll crop them, check color against the tokens, add the goal tags in Figma, and log each one in `docs/brand/assets/site-imagery/manifest.md`. If handwritten text comes out garbled, regenerate. If it still garbles, ask for a blank note and we'll carry the words in the goal tag instead.

| # | Slot (crop) | Ask Gemini for | Prompt |
|---|---|---|---|
| 1 | **Hero** (460×400; mobile 335×230) | 4:3, subject left of center, calm space top-right for the goal tag | A person in running clothes seen from behind, stepping off the front porch of a house onto a quiet residential sidewalk at sunrise, about to start a run. Mid-distance, full body, soft early light, a little dew on the grass. |
| 2 | **4.1 Pick one goal** (360×340) | 1:1 | Close-up of a single yellow sticky note stuck to the page of an open paper notebook on a wooden desk. Handwritten on the note in black pen: "ONE GOAL (12 weeks): Finish my certification". A pen lies beside the notebook, and the edge of a coffee mug is visible. Overhead, slightly angled. |
| 3 | **4.3 Checkable goals** (360×300) | 4:3, space bottom-left for the goal tag | Two friends sitting side by side at a kitchen table, shot over one person's shoulder. One holds an open notebook toward the other and points at a handwritten line. The other leans in, hands around a mug. Faces out of frame; focus on the notebook and hands. |
| 4 | **4.6 Tracking** (360×300) | 4:3 | A one-page paper weekly habit tracker taped to a white kitchen fridge door, with a row of seven boxes, four ticked in pen. A hand holding a pen reaches in to tick today's box. Morning light, close-up, kitchen softly out of focus. |
| 5 | **4.8 card 1 · One person** (286×180) | 16:9 | Over-the-shoulder view of a person sitting on a park bench after a walk, holding a phone in both hands and typing a short message. The phone screen is a soft, unreadable blur. Trees and a path in the background. |
| 6 | **4.8 card 2 · A small group** (286×180) | 16:9 | Top-down view of a wooden kitchen table on a weeknight: four people's hands and forearms around it, with open notebooks, pens, two phones face-down, and mugs. One notebook shows a hand-drawn weekly grid with ticks. Warm overhead light. |
| 7 | **4.8 card 3 · A contribution, not a contest** (286×180) | 16:9 | A printed group tracker sheet pinned to a cork board, with rows labelled by first-name initials and columns for the days. Ticks are made in different colored pens. One hand is adding a tick in a row. Close-up, natural light. |

**Goal tags** (added in Figma, never generated): hero "GOAL · 12 WEEKS / *Run four times a week.*", 4.3 "GOAL / *Walk 30 minutes three times a week.*". The other photos carry no tag; the guideline allows at most one per photo.

**4.6 shortcut:** a real photo of a printed tracker on your own fridge beats AI here, and takes two minutes.

### Progress (2026-11-03, late)
- **Placed in Figma `48:292`, desktop and mobile:** #1 hero (goal tag top-right), #2 4.1 sticky note, #3 4.3 friends (goal tag bottom-left; callout list hidden; alt text updated). Each was checked by eye. The Paper illustrations stay hidden as fallbacks. Source images are in Drive "Website Images" (synced at G:My DriveWebsite Images) and `docs/brand/assets/site-imagery/`, with the manifest.
- **Tomorrow (2026-11-04), Grant:** #4–#7. Then Claude places them and applies the two copy changes (4.6 checklist item, 4.7 product paragraph) in Figma.

### Progress (2026-11-04)
- **All 7 P4 photos are placed** in Figma `48:292`, desktop and mobile: #4 in 4.6 (fridge tracker) and #5–#7 in the three 4.8 cards (park bench, kitchen table, and a group circle with a clipboard tracker, Grant's pick over the cork board). The fallbacks are hidden, not deleted. Placed with `place-p4-photos.js 2` (one combined Scripter run) and checked by eye in Chrome. Crop notes and the one rejected image (faces) are in the manifest.
- **Both copy changes are applied:** 4.6 checklist item 1 now reads "One place: a paper sheet, a spreadsheet, a note on your phone, or Accountability Guild if you track with a group." 4.7 has the product-context paragraph (guideline §3a) after the context line on desktop and after the UI caption on mobile.
- **Open:** the 4.7 alt line still describes "a weekly report", but the image is the `week-board` scene.


## 10. P7 /types-of-personal-goals (2026-11-04): the same rules, applied up front
P7 skips the v2.1→v2.3 comment rounds: its data (`notes/figma-pillar-v2/p7-types-of-personal-goals-v2.3.js`) is built straight on the approved v2.3 template with revision 2 media rules. **Five media beats** across eight modules, never more than two modules apart:

| Slot | Media | Route |
|---|---|---|
| Hero | Persona photo + goal tag "LEAD AREA · MONEY / *Move $100 to savings every Friday.*" (money, so it doesn't repeat P4's runner) | Gemini P7-1 |
| 4.1 Health | Photo: lacing walking shoes beside a ticked week sheet | Gemini P7-2 |
| 4.2 Money | None (the hero carries money) | — |
| 4.3 Career | Photo: half-ticked project checklist, ship date circled | Gemini P7-3 |
| 4.4 Relationships | None. v2.1's phone-calendar image dropped: it read as product UI | — |
| 4.5 Learning and growth | Photo: writing summary cards for finished books | Gemini P7-4 |
| 4.6 Four goal shapes | **Product UI** below the table: `week-board` with one goal per tracking mode (daily marks = process, count = open, at-report = outcome), plus the product-context line | Renderer, new spec (demo-clock tokens) |
| 4.7 Short and long term | Native figure (year → week stack) | Figma |
| 4.8 Lead area | None | — |
| Band 7 | v2.1's own-group photo removed (no photos of Brandon's group); illustrative panel instead | — |

### Gemini prompts (add the §9 style line to each)
| # | Slot (crop) | Ask Gemini for | Prompt |
|---|---|---|---|
| P7-1 | **Hero** (460×400; mobile 335×230) | 4:3, subject left of center, calm space top-right for the goal tag | A person sitting at a kitchen table in the morning, seen from the side with the face out of frame, circling every Friday on a paper wall-style month calendar laid flat on the table with a pen. A mug and a closed laptop nearby. |
| P7-2 | **4.1 Health** (360×320) | 4:3 | A person sitting on a front step in early morning light, lacing up walking shoes, cropped at the shoulders. Beside them on the step, a folded one-page week sheet with three days ticked in pen. |
| P7-3 | **4.3 Career** (360×300) | 4:3 | Over-the-shoulder view of a tidy desk: a printed project checklist with about half the items ticked in pen, and a small desk calendar with one date near the end of the month circled in red. Hands rest near a keyboard. |
| P7-4 | **4.5 Learning and growth** (360×320) | 1:1 | Close-up of hands writing a short paragraph on an index card, resting on a short stack of three finished paperback books, each with an index card tucked inside as a bookmark. Wooden table, soft window light. |

Text on the calendar or cards should stay unreadable; the goal tag carries the words. Log each pick in `docs/brand/assets/site-imagery/manifest.md`.

### v2.3.2 update (2026-11-05): ten modules, seven photos
Grant's comments on v2.3.1 renumbered the page:
- Faith became module 4.6, so shapes moved to 4.7, short and long term to 4.8, and the lead area (now prose) to 4.9.
- Band 7 became module **4.10, the same image card grid as P4's 4.8**, with three photos.
- The slot table above still uses the v2.3 numbering. Current beats: hero, 4.1, 4.3, 4.5, the 4.7 product UI, the 4.8 native figure, and the 4.10 cards.

| # | Slot (crop) | Ask Gemini for | Prompt |
|---|---|---|---|
| P7-5 | **4.10 card 1 · On your own** (286×180) | 16:9 | Close-up of a person at a desk in the evening, cropped at the shoulders, ticking a box on a one-page weekly sheet in an open notebook. A desk lamp is on, and a mug sits nearby. The focus is on the hand, the pen and the row of boxes. |
| P7-6 | **4.10 card 2 · With a partner** (286×180) | 16:9 | Two people sitting side by side on a front porch step with coffee mugs, seen from behind. One holds a small open notebook toward the other and points at a row of ticks. Late afternoon light. |
| P7-7 | **4.10 card 3 · With a group** (286×180) | 16:9 | Six people around a long folding table in a church fellowship hall or community room in the evening, shot from one end of the table so they are seen from behind and the side. Each has a notebook or printed sheet in front of them. One person reads from their sheet while the others listen. Background faces are softly out of focus. |

P7-7 is deliberately not P4's group circle with a clipboard. Blurred background faces are fine; only in-focus faces break the rule.

### Progress (2026-11-05)
All seven P7 photos are placed in **v2.3.3, frame `116:4994`**, on desktop and mobile.
- **Script:** `docs/brand/assets/site-imagery/place-p7-photos.js`. The placeholders stay hidden.
- **Hero:** carries the goal tag top-right.
- **Variants:** Grant chose 4.1 (walking into a gym) and 4.10 card 2 (a café table) over the prompt wording.
- **Crops:** they remove faces, the book titles, and in-focus faces at the group table. The manifest has the details.
- **Open:**
  - 4.10 card 1 (closed notebook, whisky glass) is a weak match for "check your own log".
  - The 4.7 product UI still needs its renderer spec.

### Open before the P7 media pass
- **4.6 renderer spec:** write a `week-board` spec with one goal per mode (`daily`, `count`, `report`) using demo-clock tokens, then render desktop and mobile.
- **Confirm with Brandon** that report-only ("tracked at the cycle report") is a live tracking mode before the 4.6 product line ships.
- **Grant's OK** on the 24 area-by-shape grid cells (band 2), open since 2026-10-30 (six rows since faith was added).
