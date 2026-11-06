# Explainer video production: Brandon's reply (2026-11-06)

*Written by the inbox-replies routine. Thread: "Homepage explainer video: what we need from you" (Brandon via claude@projectstart.co, 2026-11-06 15:27 UTC).*

## The request, in short

- Three narration changes (scenes 6, 7, 8). **Applied** in `docs/marketing/homepage-explainer-video-plan-2026-10-19.md` §3, with his decisions (§8) and fact answers (§9.4).
- Key rule: tracking in AG is optional; reporting back to the group is the central act. Carry it into footage and captions.
- Decisions: AI voice with captions; peer groups only; homepage placement is our call.
- **New:** his team built a demo area on staging, and asks us to do the screen recordings, voiceover, edit and finished video. Before, his agents were going to record (plan §9).
- He asks what timing we have in mind for a first cut, and whether we need anything else from the demo.

## Why this is flagged, not started

It's more than one run of work and it changes who produces the video. It also needs a signed-in browser on a staging host with Brandon's demo logins, which a scheduled run doesn't do.

## What production would involve

1. **Credentials:** move the three staging demo logins from Brandon's email into the password manager. Never commit them here (this repo is public). The invite link in the email holds a token; keep it out of the repo too.
2. **Captures (R01-R16, plan §9.2), done by us on staging:** Claude in Chrome or the built-in browser can drive the pages. Recording at 1920×1080 with a smooth cursor needs a real screen recorder (OBS or Screen Studio) run by Grant, or Playwright-driven captures with zooms added in the edit. Separate browser profile per demo account.
   - Main demo (Marcus): R09, R10, R12, R14, R15.
   - Report rehearsal account: R13.
   - Empty organizer: R02-R06. Invite page: R07. Card step (R08): Stripe test card only, digits hidden.
   - Live site, read-only: R01, R16.
   - Keep the onboarding header (stale sentence) out of frame; avoid the archive's generic label or crop it.
   - Optional proof photo: a non-personal illustrative photo for R11.
3. **Voiceover:** AI voice (the creative connector can generate speech; voice choice needs Grant's OK), one file per scene, timed to §3.
4. **Edit:** Remotion (Claude builds the edit in code, brand title cards, burned-in captions) or Screen Studio. Disclaimer on any scene with names or amounts.
5. **Captions** must match the staging numbers: $20 at stake, $5 and $20 forfeits, $21.67 kitty after $1.33 processing and $2 platform fees.
6. Placement is ours: recommend under the hero (plan §1), lazy-loaded, `VideoObject` schema, `video_play`/`video_complete` events. The page change itself goes to Brandon as a build request.

## Open questions for Grant

1. First-cut timing to give Brandon (the routine doesn't promise dates).
2. Recording tool: OBS/Screen Studio by you, or browser-driven captures by Claude.
3. Edit tool: Remotion or Screen Studio.
4. Which AI voice.
5. Fact 3 (can every member see marks and reports in peer mode) wasn't answered; the script doesn't depend on it much now that scene 6 changed.
6. Scene 4 still says "The card is only charged for a miss." Brandon left it as written, but a missing report also triggers a forfeit. Consider "only charged when you miss" or leave it.

## Size

Several sessions: captures (1-2), voiceover (1), edit and captions (1-2), review rounds.
