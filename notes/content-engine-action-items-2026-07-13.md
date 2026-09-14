# Content engine — action items (from 2026-07-13 repo scan)

Full source detail: `docs/marketing/content-engine-repo-scan-2026-07-13.md`. This is the short prioritized punch list.

1. **Reconcile pricing language before scaling content.** `src/lib/marketing-content.ts` still shows $19/mo and $79/mo tiers; live `/pricing` says no monthly fee plus $1 per charged forfeit. Live `/pricing` should become the content source of truth.
2. **Update measurement from waitlist to account creation/group activation.** SEO measurement docs still reference waitlist submits; CTAs now point to `/create-account`. Content reporting should track create-account starts, group creation, invites, activated groups.
3. **Decide the first content engine audience wedge.** Existing docs point toward group owners/facilitators, not generic self-improvement readers. Strongest early angles: friend accountability groups, men's/faith groups, founder/mastermind groups, coaches/facilitators, fitness/discipline challenges.
4. **Turn the lead magnet into a real asset.** "The Accountability Operating System: 30-Day Consistency Blueprint" exists as a 5-point outline only — needs to be written and made downloadable.
5. **Build a content taxonomy around product primitives.** Likely pillars: goal commitments, proof entries, reports/receipts, consequence design, group kitty/money stakes, group owner operations, pilot/customer stories.
6. **Audit existing resource articles for conversion intent.** Articles 1–7 in the inventory are broad SEO/self-improvement topics and may need stronger bridges into group-owner use cases and the app's cycle/report/forfeit model. Articles 8–13 already lean toward the operator wedge.
7. **Create a publication and distribution plan.** There's a founder-led distribution experiment (LinkedIn/community variants) but no editorial calendar or production pipeline yet.
8. **Capture proof/case-study material from the reference cohort.** Brandon's own group is valid evidence for workflow fit, language, cadence, reporting, and penalty-clarity/trust dynamics — but not pricing evidence. Likely the best source of authentic examples.

## Recommended starting point
Treat `/resources` as the content hub. Use the product docs (`docs/features/*.md`, `docs/product/*.md`) to define claim-safe pillars — don't market a capability that `capability-ui-inventory.md` marks partial. Refresh existing articles and the lead magnet around the group-owner wedge. Replace waitlist-era measurement with create-account/group-activation measurement. Build the first editorial calendar around "how to run a real accountability cycle," not generic habit/goal advice.

## Open question for Brandon
Once repo access is confirmed, next real decision is the audience wedge (item 3) — that choice determines which of the 13 existing articles get rewritten first and what the lead magnet's CTA targets.
