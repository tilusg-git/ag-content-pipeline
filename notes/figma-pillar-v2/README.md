# Topical Pillar v2.1 Figma build (P7 pending)

Rebuilds the /goal-setting and /types-of-personal-goals mockups to the v2.1 spec (skill B3a element mix, B7 media beats) on page `25:2` of the homepage Figma file (`l27WIk0vje0syTYWN2iZee`), next to the v1 frames. Copy matches the v2.1 module docs in Drive (P4 `1MoB4eE3J-arMEzZAaPdoT0uobOeUAJRpQfDn0vPYvX8`, P7 `1QnORvxjkE8DisWWOcB-QBM8u6PgFuAOoJFz9xsUn6xE`).

Status 2026-11-01: `00-components-and-log.js` ran (component `30:138`, change log `30:141`) and `p4-goal-setting.js` ran (frame `31:138`). `p7-types-of-personal-goals.js` hit the Starter-plan call limit and has not run. Neither page has had the screenshot pass.

## Run
1. `node notes/figma-pillar-v2/assemble.js` writes paste-ready scripts to `out/` and syntax-checks them.
2. `create_session` on the file, then one `use_figma` call per script, in order: `out/00-components-and-log.js` (media placeholder component plus the v2.1 change log at x 4800; it skips itself if already built), then `out/p4-goal-setting.js` (x 5500) and `out/p7-types-of-personal-goals.js` (x 7500). The two page scripts can run in parallel.
3. Screenshot the bands with one `use_figma` call per page (at most 5 screenshots per call), fix, then comment the frame links on both Asana cards.

Budget: about 6 calls. The Starter plan allows about 20 a month.
