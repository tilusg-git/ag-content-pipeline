---
name: accountability-guild-design
description: Use this skill to generate well-branded interfaces and assets for Accountability Guild, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.
If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.
If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

Key facts: editorial print voice, not SaaS gloss. Seven brand tokens (bone/panel/ink/ink-soft/line/ember/ember-soft) plus an extended app palette in `tokens/colors.css`. Newsreader italic (serif, speaks) + Inter Tight 600 (sans, operates) + JetBrains Mono 700 (mono, annotates). Radius 0 everywhere except avatars/app-icons/toggles. No icon library — typographic glyphs only (✓, –, →, tally strokes). 28 React components across 9 groups in `components/`; two UI kits in `ui_kits/`.
