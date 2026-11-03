# Website imagery guidelines

**Status:** approved by Grant 2026-11-03 as brand standards **§16 Website imagery** (summary there). §14's photo exception is extended to cover it. Decisions: three families and placement approved; AI persona images are generated with Gemini, with no identifiable faces; the goal tag is approved; the illustration ground is Paper (line ground, panel card). It builds on §14 (imagery direction), `image-backgrounds-spec.md` (sourcing and safety checklist), playbook §3.3 (pillar media slots), and the P4 media plan (`docs/marketing/pillar-media-plan-2026-11-03.md`).

## 1. Why a rule is needed
Today's brand standards make typography and brand motifs the default and allow photos only behind social quote cards. The website needs two more things that rule doesn't allow: **product imagery** to show what Accountability Guild is, and **persona imagery** to show who it's for and what follow-through looks like. Without a rule, each page would pick its own look. Photos would drift into stock clichés (high-fives, laptop handshakes) and AI images into uncanny "members".

## 2. Three image families, each with one job

| Family | Its job | What it looks like | Default sources |
|---|---|---|---|
| **1. Product** | Show what the app does | Real app screens with sample data, rendered from the app's own CSS (`product-views/render.js`). Desktop panels or phone captures, on a flat token ground | The renderer only. No mockups of unshipped features |
| **2. Brand illustration** | Explain an idea using the brand's own materials | Flat, token-only drawings of *written things*: goal cards, week grids, trackers, calendars, ledgers, receipts. Newsreader italic for the "handwritten" line, JetBrains Mono labels, ember used once | Figma (scripted), exported SVG/WebP |
| **3. Persona** | Show the people and the moments: someone doing the work, checking in, being seen | Natural-light photos of real activities (running, lifting, hiking, reading, studying, budgeting at a kitchen table) and small-group moments | Grant's own photos first, AI-generated with Gemini second (§5), CC/licensed last |

**The test:** product images answer *"what is it?"*, illustrations answer *"how does this work?"*, persona images answer *"is this for me?"*. If an image answers none of those, cut it.

## 3. Where each family goes

| Surface | Product | Illustration | Persona | Notes |
|---|---|---|---|---|
| Homepage | **Lead** | Supporting | Supporting | Product screens carry the story. Persona images set who it's for (organizers and groups) |
| Core Product Pillars (`/how-it-works`, `/pricing`, `/for-groups`, `/for-coaches`) | **Lead** | Diagrams | 1 to 2 | Each mechanic shown in the real UI |
| Topical Pillars (`/goal-setting` etc.) | **Max 1** (near the CTA or a review/tracking module) | **Lead** (hero + objects) | 1 to 3 (section beats) | Topic first: the page must pass the deletion test without its product image |
| Field notes (blog) | Rare | Hero cards | Hero option | Follow the blog image rules once they exist |
| Product CTA band | Optional small screen | — | — | Ink ground. Never a person |
| OG/social share images | Optional | **Default** | Optional | Must read at thumbnail size |

## 4. Persona imagery: what we show and what it should communicate
**Who:** the people in our real segments (`docs/marketing/` value proposition): friends' accountability groups, founder groups, workout and running groups, church and small groups, coaches with their clients, and individuals with a goal. Adults roughly 25 to 60, varied, in ordinary settings: a kitchen table, a gym, a trail, a coffee shop, a home office.

**The moments, in order of preference:**
1. **Doing the work:** a run, a set, a page read, a budget written. Effort, not triumph.
2. **Recording it:** a tick on a paper tracker, a note on a phone, a training log.
3. **Being seen:** showing someone a tracker, a group at a table on its set day, a weekly text sent.

**Tone:** calm, steady, specific, straight, matching the voice-and-tone doc. No celebration poses, no high-fives, no fists in the air, no looking into the camera and smiling, no humor.

**Grant's own photos** (workouts, hikes, reading) fit moments 1 and 2 directly. Use them for individual-goal beats (P4 4.1, 4.6). Group moments (3) will come from AI for now.

## 5. AI-generated persona images: the rules
§14 forbids AI portraits. This keeps that intent and makes AI usable for scenes:
- **No identifiable faces.** People are shown from behind, side-on at mid-distance, cropped below the eyes, or as hands and objects. Nobody should be recognizable or look like a specific real person.
- **Never presented as members or customers.** No names, quotes, captions, or testimonials attached to an AI person. Captions describe the moment ("A small group's monthly check-in"), never a person.
- **Objects carry the story:** notebooks, trackers, phones showing a plain text bubble (never a fake app screen), running shoes, a whiteboard tally. AI must never render our UI. Product UI comes only from the renderer.
- **Plausible and plain:** check hands, text, reflections and object counts. Any AI artifact means regenerate or drop it.
- **Provenance:** log the tool, prompt, date, and the approver for each image in the asset manifest (§8). Run the `image-backgrounds-spec.md` licensing and safety checklist on each one. Approval is per image, as with the social cards.

## 6. One look across all three families
Proposed treatments, to be shown in the next style frame:
- **Photos:** full color, natural light, warm-neutral grade, slightly lowered saturation so ember stays the one warm beat. No filters, gradients, vignettes, or duotones.
- **The goal tag (proposed signature):** a small bone label pinned to a persona photo, carrying the goal in mono and Newsreader italic (`GOAL · 12 WEEKS` / *Run four times a week.*). It ties people photos to the goal-card illustration family and to the product. At most one per photo, never on product screenshots.
- **Grounds:** illustrations and product panels sit on the **Paper** ground (line `#E5E2DA` with a panel card), chosen 2026-11-03.
- **Frames:** square corners, no drop shadows. A 1 px line-token keyline only where a light image meets a light page.

## 7. Specs
- **Ratios:** hero 23:20 (460×400; mobile 335×230); media split 6:5 (360×300) or 9:10 (360×400); card grid 8:5 (286×180); OG 1200×630.
- **Export:** WebP at 1× and 2×, plus SVG for flat illustrations; at most about 200 KB per image at 2×. Lazy-load below the fold; hero `fetchpriority="high"`.
- **Text:** alt text describes what the image shows, in plain words. Product screens get the caption "Illustrative" and sample data only. `ImageObject` schema on heroes.
- **Accessibility:** no text baked into photos. Illustration text also lives in the page or in alt text.

## 8. Where the files live
`docs/brand/assets/site-imagery/` holds sources and exports, with `manifest.md` listing every image: file, page, slot, family, source (own / AI tool / license), prompt if AI, approval date and approver, alt text. Engineering copies the approved exports into `repo/public/`.

## 9. Don'ts
- No stock clichés: handshakes, high-fives, jumping on a mountain top, laptops with charts.
- No AI faces, and no AI renders of the app.
- No product UI for unshipped features, and no real member data.
- None of the five legacy painterly homepage illustrations (§14).
- No more than one product image on a Topical Pillar.
- No images that carry a point the text skips.

## 10. Decisions (Grant, 2026-11-03)
1–4 approved as proposed: the three-family model and placement, the AI rules (Gemini, no identifiable faces), the goal tag, and the natural full-color grade. 5 is open: a shortlist of Grant's own photos.

### Original questions
1. Approve the three-family model and the placement table (§2–3)?
2. AI rules (§5): is "no identifiable faces" the right line?
3. The **goal tag** overlay as a signature for persona photos: worth a style frame?
4. Photo grade: natural full color (proposed), or a stronger house grade?
5. Which of your own photos can go into a shortlist? A folder or Drive link is enough. I'll tag each one by moment (doing, recording) and goal type.
