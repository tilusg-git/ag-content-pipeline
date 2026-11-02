# Ad A creative discovery, round 2 (problem-first)

*2026-10-07. Round 1 (`reddit-ads/out/adA_concept1-4_*.png`) showed the product cleanly but gave nobody a reason to stop scrolling. This round follows Brandon's Reddit creative-director brief: start from the audience's problem, one idea per image, readable at thumbnail size, and believable. Images live in `reddit-ads/out/discovery/` and are rendered by `reddit-ads/build_adA_discovery.js`.*

## Constraints carried over

- **No humor and no memes** (Brandon, 2026-10-02, recorded in voice-and-tone). The brief lists humor as one possible lever. Here, recognition, stakes, demonstration and belonging do that job.
- **Never fake authenticity:** no fake Reddit posts, no fake comments, no testimonials. Illustrated situations (a group chat, a spreadsheet) are drawn in AG's own visual style. They're not imitation screenshots of any real app, and the names and dates are clearly generic.
- **No AI people or stock** (brand standards §5/§14). Every photo concept is shot by Brandon on a phone, which is also what makes them feel native.
- Brand tokens only. Monogram lower-right (Reddit data: logos lift conversion; top-left or lower-right placement works best). 4:5 at 1080x1350.

## Inputs

| | |
|---|---|
| **Audience** | Adults who already tried to stay accountable with a partner, a friend group, a mastermind, or an app, and watched it fade. Tier 1 subs: r/GetMotivatedBuddies, r/Accountabilibuddies, r/BusinessBuddy, r/gtd, r/habitrpg, r/manprovement, r/Discipline. |
| **Situation** | A group agreed to hold each other accountable. Week one is energetic. By month two, nobody checks. |
| **Pain point** | Accountability without structure dies quietly: the chat goes silent, the shared doc stops updating, nobody wants to be the nag. |
| **Insight** | People don't quit their goals out loud. The check-in just stops happening, and everyone silently lets everyone off the hook. |
| **Desired action** | Click through to the homepage. |
| **Product benefit** | A fixed cycle and a scheduled report make the check-in happen without anyone having to nag, and real stakes make skipping it cost something. |
| **Ad A copy it pairs with** | Headline: "We built Accountability Guild to replace the docs and spreadsheets our monthly group ran on." |

## Concepts

| # | Concept | One-sentence idea | Trigger | Format | Hypothesis it tests |
|---|---|---|---|---|---|
| D1 | **The quiet group chat** | The goals check-in that nobody answers. | Recognition / frustration | Illustrated, ready now | Naming the failure (silence) gets more clicks than showing the product. |
| D2 | **The spreadsheet graveyard** | The group goals sheet that died in March. | Recognition, and acts out the headline | Illustrated, ready now | When the image and headline tell the same story, CTR goes up. |
| D3 | **Twenty says you will** | $20 clipped to a handwritten goal. | Challenge / stakes | Photo, Brandon shoots | Stakes stop the scroll better than structure does. |
| D4 | **Phone on the bench** | The real app, mid-week, in a real place. | Demonstration | Photo, Brandon shoots | Showing the real product in real life builds enough trust to click. |
| D5 | **The first-Thursday table** | A real group around a real table. | Belonging / identity | Photo, Brandon shoots (consent) | "People like me do this together" beats any product shot. |

### D1: The quiet group chat
- **Visual:** two message bubbles in AG's own style. "How's everyone doing on their goals this month?" (Sep 3, seen by 4), a long dotted gap, then "anyone?" (Oct 1, seen by 4). No app chrome, no platform branding.
- **Why it stops the scroll:** almost everyone in these subs has sent or ignored that message. The empty gap does the work.
- **Text on image:** about 10 words, and they *are* the visual. That's an accepted exception to Reddit's overlay-text penalty, because the text here isn't a tagline.
- **Risk:** it doesn't show the product, so the headline and body have to carry the connection.

### D2: The spreadsheet graveyard
- **Visual:** a "Group goals 2026" sheet. Five names, monthly check columns that fill January to March and then go empty through October. "Last edited 211 days ago" in ember.
- **Why it stops the scroll:** the decay reads at thumbnail size (black on the left, blank on the right), and it's the exact situation the headline names.
- **Text on image:** a title, names, months, and one line. Small, and structural rather than a slogan.
- **Risk:** close to round 1's grid style, but the meaning is reversed: failure, not success.

### D3: Twenty says you will (photo)
- **Shot:** a real $20 bill paper-clipped to an index card with one handwritten goal ("Lift 4x a week. October."). Kitchen counter, daylight, phone camera, slightly off-square. No text added.
- **Why it stops the scroll:** cash in a feed is a pattern interrupt, and the clip says "this money is committed."
- **Risk:** it leads with money, which raises the financial-services review question (game plan §3). Also, "$20" next to an ad could read as "costs $20." It's better as a later test, after the account has a clean review history.

### D4: Phone on the bench (photo)
- **Shot:** Brandon's phone, face-up on a gym bench or kitchen table, showing the real week grid (live app, his own or the demo group's data), with real clutter around it. Overhead, natural light.
- **Why it stops the scroll:** it's real and specific, and it reads as "a person's actual week." It also solves the low-resolution screenshot problem, because the phone's own screen is the source.
- **Risk:** the lowest pattern interrupt of the five. It works on trust, not surprise.

### D5: The first-Thursday table (photo)
- **Shot:** the real group's table: notebooks, coffee, phones, hands mid-gesture. No faces unless everyone consents.
- **Why it stops the scroll:** it's the founder-story image and the one thing competitors can't copy.
- **Risk:** depends on access and consent, and the meaning is less instant than D1 or D2.

## Quality check (brief's 10 questions, scored by Claude)

| Question | D1 | D2 | D3 | D4 | D5 |
|---|---|---|---|---|---|
| Stops the scroll | ✓ | ✓ | ✓ | ~ | ~ |
| Idea clear in 1-2 seconds | ✓ | ✓ | ✓ | ~ | ~ |
| Believable | ✓ | ✓ | ✓ | ✓ | ✓ |
| Appropriate for Reddit | ✓ | ✓ | ✓ | ✓ | ✓ |
| Relevant to these subs | ✓ | ✓ | ✓ | ✓ | ✓ |
| One dominant idea | ✓ | ✓ | ✓ | ✓ | ~ |
| Works without much text | ~ | ✓ | ✓ | ✓ | ✓ |
| Brand/product connection | ~ (needs copy) | ✓ (headline match) | ~ | ✓ | ✓ |
| Different from the others | ✓ | ✓ | ✓ | ✓ | ✓ |
| Useful hypothesis | ✓ | ✓ | ✓ | ✓ | ✓ |

## Recommendation

- **Ad A, month 1: D2 (spreadsheet graveyard).**
  - Strongest headline-to-image match ("replace the docs and spreadsheets…").
  - Instantly readable, ready now with no photo dependency, and no money-mechanic review risk.
- **Next challenger: D1 (quiet group chat).** Swap it in for month 2's headline test, or run it if D2 underperforms. Recognition with a different emotional beat: silence instead of decay.
- **Photo backlog:**
  - **D4 first.** Easiest to shoot, and it gives a sharp real-product asset.
  - **Then D5** (needs consent).
  - **D3 waits** until the ad account has clean review history.

## Brandon's shot list (phone, natural light, no filters)

1. **D4:** the phone showing the real week grid, on a gym bench or kitchen table, overhead. Shoot 5-6 variations: different surfaces, and with and without a hand.
2. **D5:** the group table on the next first Thursday. Wide, plus 2-3 close-ups (notebook, coffee, phone). Get the group's OK.
3. **D3 (later):** $20 clipped to an index card with a handwritten goal. Counter, daylight, slightly off-square.

Drop the photos in `docs/product/demo-assets/`. Claude crops them to 4:5, adds the monogram, and checks them against brand rules.

## Round 3 (Brandon's feedback, 2026-10-07)

Images are in `reddit-ads/out/round3/`, rendered by `reddit-ads/build_adA_round3.js`.

| # | Change from round 2 | Concept | Status |
|---|---|---|---|
| R1 | D2 merged with personal goals | **Personal ledger.** One person's three goals across four monthly cycles: kept (check), partial (75%, 50%), October in progress ("Day 7"). A forfeit row underneath: $0 / $10 / $5 to the kitty, $20 at stake now. | Finished art |
| R2 | D1 rebuilt as a split | **The group text vs. the guild.** Left: a plain texting thread ("Goals crew"): "How's everyone doing on their goals?", one "pretty good," then "anyone?" a month later. Right: the October report, "5 of 5 filed," each member with their % kept. The chat is drawn as a generic texting app, not AG's UI. | Finished art |
| R3 | D4 refocused on one goal | **Phone in the gym.** "Exercise 5 days a week." with Mon-Fri checked, "5 of 5 kept," on a phone lying face-up in a real gym. | Comp; needs Brandon's gym photo |
| R5 | D3 merged with the app | **Money at stake.** The app's goal card ("Exercise 5 days a week." with 4 of 7 days checked, "At stake $20, to the group kitty if missed") over a real photo of a $20 bill. | Comp; needs Brandon's photo |
| ~~D5~~ | Dropped | Reddit buddies are mostly remote, so an in-person table doesn't reflect how they'd use AG. | |

**Notes:**
- **R1 forfeit numbers are illustrative.** They assume partial completion scales the $20 cycle forfeit (50% → $10, 75% → $5). Confirm that's how the app actually calculates partial forfeits before R1 ships.
- **R3 production:**
  - **Preferred:** Brandon sets "Exercise 5 days a week" as a real goal in the app, marks the days, and photographs his actual phone in the gym. That's the most authentic version, and it avoids the low-res screenshot problem.
  - **Fallback:** Claude composites the drawn screen onto Brandon's gym photo.
- **R5 still carries ad-review risk** (game plan §3), because it leads with the money mechanic.

## Round 4 (Brandon's feedback, 2026-10-07)

Images are in `reddit-ads/out/round4/`, rendered by `reddit-ads/build_adA_round4.js`. Photo backgrounds go in `reddit-ads/bg/` as `r1-desk`, `r3-gym` and `r5-money` (.jpg or .png). Re-run the script and they drop in behind the phone automatically.

**Changes applied:**
- **Full wordmark lower-right instead of the monogram.** On photo backgrounds it sits on a small bone plate, because brand rules don't allow the logo directly on a busy photo.
- **Every concept now shows an app screen inside a phone**, drawn straight-on so it composites cleanly onto overhead flat-lay photos.
- **R1 (personal goals, desk):** the month columns are replaced with the cycle's weeks: "October cycle · week 3 of 4," WK 1-4. This week shows live progress per goal (3 of 5, 4 of 7, 2 of 4). "At stake $20, closes Oct 31" at the bottom.
- **R2 (group chat vs. report):** Aha-style split. Ink left with "The group chat goes quiet." and bone right with "The report doesn't." Both sides are phones. The left is a generic texting app with a grey frame; the right mirrors the real Reports screen: cycle header, Filed / Kept / No report stats, member cards with green "Submitted · % kept" badges, and an ember edge on the owner's card.
- **R3 (report in the gym):** Marcus's October report. Kept 2/2, forfeit $0, "Exercise 5 days a week." kept 100% with the week's marks, plus a "What happened" note.
- **R5 (money at stake, desk):** the app's cycle header, "The October cycle closes in 9 days." At stake $20, goal progress 14 of 22 days, and "If you miss: $20 goes to the group kitty. Not to us."

**Approval needed:** brand standards §14 only sanctions AI-generated imagery for social quote-card backgrounds, approved per post. Using Nano Banana backgrounds in ads extends that, so Brandon approves each background before it ships. These prompts contain no people and no AI faces (still banned everywhere).

### Nano Banana prompts

Shared rules, already written into each prompt: overhead flat-lay at 90°, 4:5 portrait, the **center left empty** for the phone Claude composites in, no phone, no people, no text or logos, natural light, real-world imperfection.

**1. R1 desk** (`bg/r1-desk`)
> Photorealistic overhead flat-lay photo, shot straight down at 90 degrees, 4:5 portrait. A real, lived-in wooden desk in soft morning window light. Around the edges only: an open paper notebook with handwritten notes, a pen, a half-finished coffee in a plain ceramic mug, a paperback book, a few loose sticky notes. The center of the frame is completely clear, empty desk surface about half the image wide and most of its height, reserved for a phone to be added later. Do not include a phone, laptop screen, people, hands, logos, or readable text. Muted warm neutral colors, natural shadows, slight imperfections, shot on a phone camera, not styled or glossy.

**2. R3 gym** (`bg/r3-gym`)
> Photorealistic overhead flat-lay photo, shot straight down at 90 degrees, 4:5 portrait. A worn black rubber gym floor in a real everyday gym, natural overhead gym lighting. Around the edges only: one hex dumbbell, a gym towel, a scuffed water bottle, a small patch of chalk dust, the corner of a weight plate. The center of the frame is completely clear, empty floor about half the image wide and most of its height, reserved for a phone to be added later. Do not include a phone, people, hands, feet, logos, brand names, or readable text. Realistic wear and scuffs, muted colors, not glossy, not cinematic.

**3. R5 desk with cash** (`bg/r5-money`)
> Photorealistic overhead flat-lay photo, shot straight down at 90 degrees, 4:5 portrait. A plain light wooden desk in daylight. Near the lower left edge, a single folded US twenty-dollar bill held with a silver paper clip, partly out of frame. Around the other edges: a pen and the corner of a paper notebook. The center of the frame is completely clear, empty desk surface about half the image wide and most of its height, reserved for a phone to be added later. Do not include a phone, people, hands, logos, or other readable text. Natural shadows, muted warm tones, phone-camera realism.

**R5 note:** image generators often garble currency, and some refuse it. A real phone photo of a real $20 bill, set up the same way, is the more reliable and more authentic option. If the generated bill looks wrong, shoot it instead.

**Round 4 update (2026-10-07):**
- **Backgrounds installed:** Brandon's Nano Banana outputs are copied to `bg/r1-desk.jpg`, `bg/r3-gym.jpg` and `bg/r5-money.jpg`. The originals are kept beside them.
- **Each ad's eyebrow carries a different example group:**
  - R1: College Friends Group
  - R2: Thursday Night Group
  - R3: 40+ Men's Group
  - R5: East Coast Study Group. R5's goal is now "Study 10 hours a week." (29 of 44 hours), so it fits a study group.
- **AI-artifact check on the backgrounds:**
  - **R1 desk:** the book in the lower left has an invented title ("Stories From Home") and garbled author names. That's a classic AI giveaway Redditors will spot. Regenerate it with "a closed book with a plain cover and no visible text," or shoot the desk for real.
  - **R3 gym:** the dumbbell is marked in pounds and the plate in kilograms. Mostly hidden behind the phone, so it's acceptable.
  - **R5:** the bill reads as real at feed size. No issues.

## Round 5: green-screen compositing (2026-10-07)

- **Why the method changed:** round 4's drawn phones were out of scale with the props, sat on top of objects, and had no matching light. Brandon regenerated the backgrounds with the phone already in the scene and a chroma-green screen (`bg/r1-desk-green.jpg`, `bg/r3-gym-green.jpg`, `bg/r5-money-green.jpg`).
- **What `reddit-ads/build_adA_round5.js` does:**
  - Finds the green screen and reads its angle from the pixels.
  - Renders the app screen at 3x to that exact size and tilt.
  - Keys it in through a soft green matte, so the real rounded corners and camera cutout stay.
  - Despills the green fringe, dims the screen slightly to match the room, and adds a faint glass sheen.
  - Photo zoom is set per image: gym 1.45, desk 1.3, cash 1.08, so the $20 stays in frame.
- **Output:** `out/round5/`. R3 (gym) is the cleanest: the phone is straight-on, so the text reads best. R1 and R5 are tilted about 9-10°, which looks natural but makes the small text slightly harder to read at feed size.
- **Screens use bigger type and fewer elements than round 4**, because the phone takes up about 40% of the frame width.
