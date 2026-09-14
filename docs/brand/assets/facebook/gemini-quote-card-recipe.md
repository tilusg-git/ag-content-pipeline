# Gemini / Nano Banana — AG background recipe

> **Approach changed 2026-07-22.** We no longer ask Gemini to render the quote or brand marks.
> Image models misspell text, can't reproduce the wordmark lockup, and drop their badge next to our
> logo. **Now Gemini's only job is to generate a plain background scene** (or you supply a photo); our
> local generator `gen_quote_card_bg.py` lays the scrim, quote, attribution, wordmark, FIELD NOTES,
> and A — all in exact brand fonts, deterministically. See the two flows in `../../image-backgrounds-spec.md`.
>
> **So use Gemini only when you need to *invent* an image.** Have a photo already? Skip Gemini —
> hand the photo straight to the generator (Flow A). The full-card prompts further down are **legacy**,
> kept only for reference.

## Generate a background with Gemini (Flow B)

Prompt (no reference sheet needed — we're only making an image):

```
Generate a photographic square background image, nothing else.
Scene: {SCENE}. Calm, dim, unhurried mood; soft natural light; muted tones; lots of open
negative space; a darker, low-detail area in the center where text will later be placed.
No text, no words, no letters, no logos, no watermarks, no borders, no people's faces in
the center. Photorealistic, natural depth of field.
```

Good `{SCENE}` ideas (match the quote's meaning): *a long trail switchbacking up a dim hillside at
dawn · an empty desk by a window in low light · a lone figure small on a ridge, seen from behind ·
weathered stone steps · fog over pine forest at first light.*

Then: **crop the bottom ~12%** to remove Gemini's corner badge (safe — it's a plain scene), drop the
result in `backgrounds/source/`, and run `gen_quote_card_bg.py`. Or just save it and I'll finish it.

---

## LEGACY — full-card prompts (no longer the approach)

The prompts below had Gemini render the whole card. Kept for reference only; prefer the generator.

## What to attach to the prompt

1. **Your photo** (the background).
2. **`brand-reference-sheet.png`** (same folder) — gives the model the exact hex colors, the monogram, and the type styles.
3. *(Optional, strongly recommended)* **a finished example card** — e.g. `_bg-prototypes/verse-slate.png` — as a style reference. Add the line: *"Match the layout, type, and branding of the example card, applied to my photo."*

## Master prompt (fill in the blanks)

```
Edit the attached photograph into a branded social quote card, 1:1 square.
Keep the photo full-bleed as the background — do not crop out the main subject, do not
add or replace scenery, do not distort it.

1. Lay a FLAT, EVEN dark overlay across the ENTIRE image: solid near-black #0F0F0E at
   about {SCRIM}% opacity. It must be uniform edge to edge — NOT a gradient, NOT a
   vignette, NOT a spotlight. Its only job is to make the text legible.

2. Center this quote in the middle of the card, set in an elegant high-contrast SERIF
   ITALIC typeface (like Newsreader Italic or Georgia italic), warm off-white #FAFAF7,
   with curly quotation marks, centered alignment, comfortable line spacing, wrapped to
   2–4 balanced lines:
   "{QUOTE}"
   Set EXACTLY ONE word — "{ACCENT}" — in warm orange #D8512A. Every other word off-white.

3. Just below the quote, smaller, set the attribution in an UPPERCASE MONOSPACED
   typeface (like JetBrains Mono), letter-spaced, off-white: "— {AUTHOR}".

4. Do NOT draw any logo, monogram, letter mark, watermark, signature, or badge — not ours,
   not yours. Leave the entire BOTTOM THIRD of the image empty except for the dark
   background. (The quote and attribution stay centered in the upper/middle area, above that
   empty band.) We add the real AG monogram ourselves afterward.

5. Wide, even margins — nothing touches the edges. No borders, no drop shadows, no
   gradients. Use only three colors: off-white #FAFAF7, near-black #0F0F0E, and orange
   #D8512A.

Spell every word exactly as written and keep all text crisp and fully legible.
```

**Why we don't ask Gemini to draw our mark:** models won't reliably place *our* logo where asked —
Gemini tends to drop our "A" on the same bottom line as its own badge, so a bottom crop kills both.
So we don't let it draw our mark at all. Gemini still adds its own badge (bottom-right) plus an
invisible SynthID (harmless); keeping the bottom third empty means that badge sits alone, safe to
crop. We stamp the real monogram back on afterward — see the next section.

Replace `{SCRIM}`, `{QUOTE}`, `{ACCENT}`, `{AUTHOR}`. Raise `{SCRIM}` for bright/busy photos, lower it for already-dark ones.

## Ready-to-paste versions for your three photos

**1 · Woman at the laptop (burnout / regret).** Scrim ~58. Busy center, so expect the text to read as an overlay on top of the subject.
> …#0F0F0E at about **58%** opacity…
> Quote: **"We must all suffer from one of two pains: the pain of discipline or the pain of regret."**
> Accent word: **regret** · Attribution: **— JIM ROHN**

**2 · Great Wall over the mountains (endurance / the long road).** Scrim ~55. Keep the orange accent word away from the bright sky patch, upper-right.
> …#0F0F0E at about **55%** opacity…
> Quote: **"If there is no struggle, there is no progress."**
> Accent word: **progress** · Attribution: **— FREDERICK DOUGLASS**

**3 · Summit under the sky (perspective / mastery).** Scrim ~62 — it's bright, so it needs a heavier overlay. Best of the three for a clean centered layout (open sky).
> …#0F0F0E at about **62%** opacity…
> Quote: **"It is not the mountain we conquer, but ourselves."**
> Accent word: **ourselves** · Attribution: **— SIR EDMUND HILLARY**

## Finishing the card: crop the badge, then run the generator

Gemini drops its badge in the bottom-right. **Standard method is CROP** — it's a one-line op, no
per-image image-editing. (We do *not* patch/inpaint by default; that's slower and heavier. Patching is
only a rare exception if a crop would remove something essential.)

1. **Crop off the bottom ~12–15%** to drop the badge, then center-crop the width so it's square again.
2. **Run `gen_quote_card_bg.py`** on the cropped image — it lays the scrim and stamps all five brand
   elements (wordmark, FIELD NOTES, quote, attribution, A monogram) in exact fonts. You don't place the
   monogram by hand; the generator does.

Crop one-liner (ImageMagick):

```
magick in.png -gravity North -crop 100%x86%+0+0 +repage -gravity Center -crop 1:1 +repage out.png
```

**Or just save the Gemini output into `backgrounds/source/` and I'll crop + generate it.** Finished
example: `backgrounds/out/summit-hillary.png`.

*(Generating a background from scratch is covered by "Generate a background with Gemini (Flow B)" at the top — no text, no marks, then crop + generator.)*

## Getting good results (legacy full-card / "full mockup" mode)

- **Proofread the text every time.** If a word is misspelled or mangled, regenerate; shorter quotes render more reliably.
- **One accent word only** — if the model colors extra words orange, say so explicitly and regenerate.
- **Flat scrim, not a gradient** — models love gradients; if you get a vignette, add "the dark overlay must be perfectly uniform, no gradient, no vignette."
- **Mark fidelity** — the little "A + bar" may come out rough. If it matters, ask me to composite the exact monogram on top afterward, or use the local generator.
- **Deterministic fallback:** for perfect type and the exact mark, hand me the photo file and I'll render it with `gen_quote_card_bg.py` — no AI text risk.
