#!/usr/bin/env node
/* Accountability Guild — Facebook/IG card, Node/Canvas fallback.
 *
 * Why this exists: gen_quote_card.py / gen_quote_card_bg.py need Python 3 +
 * fontTools + cairosvg + Pillow. Some environments this project is worked
 * from (e.g. the local Cowork/Windows checkout) have no Python interpreter
 * at all, but do have Node. This script reproduces the .py layout as a
 * single self-contained HTML file: the brand fonts are embedded as base64
 * @font-face data URIs and the card is drawn on an HTML5 canvas client-side.
 * No build step, no native deps — just Node's fs/path.
 *
 * Two card kinds:
 *   - quote      (default): greedy-wrapped centered quote in curly quotes,
 *                 mono attribution line. Plain bone by default.
 *   - statement  (--mode statement): original AG copy, no surrounding quote
 *                 marks, no attribution line. Everything else identical.
 *
 * Two backgrounds:
 *   - plain bone (default): ink type on bone, URL footer + bottom-right ember rule.
 *   - image (--image PATH): full-color photo, cover-fit, under a mandatory flat
 *                 ink scrim (#0F0F0E, --scrim opacity, default 0.55). Type goes
 *                 reversed (bone). Bottom chrome becomes the centered A monogram
 *                 (bone italic A + short ember tally) — no URL footer, per
 *                 image-backgrounds-spec.md "Treatment B".
 *
 * Output is meant to be published with the Artifact tool. Programmatic
 * "download" clicks are unreliable inside a sandboxed artifact preview, so
 * the page also swaps the canvas for a plain <img> of the rendered PNG and
 * tells the user to right-click -> "Save image as..." — that always works
 * because it's a native browser action, not a scripted one.
 *
 * If Python + fontTools + cairosvg are available (e.g. a cloud sandbox with
 * this repo mounted), prefer gen_quote_card.py / gen_quote_card_bg.py — they
 * render true vector paths and match the rest of the asset library exactly.
 * This script is the fallback for when that toolchain isn't there.
 *
 * Usage (quote, plain bone):
 *   node gen_quote_card_canvas.js --quote "Success is never owned; it is rented." \
 *     --author "RORY VADEN, TAKE THE STAIRS" --accent rented --out out.html
 *
 * Usage (statement, image background):
 *   node gen_quote_card_canvas.js --mode statement \
 *     --text "When you can't see far, commit short. One cycle. One promise. Visible to the people who'll ask." \
 *     --accent Visible --image backgrounds/source/foggy-trail.jpg --scrim 0.58 --out out.html
 *
 * Flags:
 *   --mode       quote (default) | statement.
 *   --quote      quote mode: quote text, no surrounding curly quotes (added automatically).
 *   --text       statement mode: the line as it should render, verbatim (no quote marks added).
 *   --author     quote mode only, required. Attribution, e.g. "RORY VADEN, TAKE THE STAIRS".
 *                Rendered uppercase with a leading em-dash automatically.
 *   --accent     optional. One word from the line to render in ember (case/punct-insensitive match).
 *   --image      optional. Path to a background photo (>=1080x1080; >=2160 recommended).
 *                Enables Treatment B: cover-fit photo + flat ink scrim + reversed type.
 *   --scrim      optional. Flat ink scrim opacity 0..1 (default 0.55). Bump for bright/busy images.
 *   --kicker     default "FIELD NOTES".
 *   --footer     default "ACCOUNTABILITYGUILD.COM" (plain bone only; image cards use the A monogram).
 *   --caption    optional. Suggested post caption, shown below the card in the artifact page.
 *   --hashtags   optional. e.g. "#Accountability #FollowThrough #AccountabilityGroup".
 *   --title      optional. <title> / artifact heading.
 *   --note       optional. Extra line in the caption panel (e.g. image source/licensing).
 *   --out        required. Output .html path.
 */
const fs = require('fs');
const path = require('path');

function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) {
      const key = a.slice(2);
      const val = argv[i + 1];
      out[key] = val;
      i++;
    }
  }
  return out;
}

const args = parseArgs(process.argv.slice(2));
const mode = (args.mode || 'quote').toLowerCase();
if (mode !== 'quote' && mode !== 'statement') {
  console.error(`--mode must be "quote" or "statement"`);
  process.exit(1);
}

const required = mode === 'quote' ? ['quote', 'author', 'out'] : ['text', 'out'];
for (const req of required) {
  if (!args[req]) {
    console.error(`Missing required --${req} for mode "${mode}"`);
    process.exit(1);
  }
}

const FONT_DIR = path.join(__dirname, '..', '..', '..', '..', 'repo', 'assets', 'fonts');
function b64(file) {
  return fs.readFileSync(path.join(FONT_DIR, file)).toString('base64');
}
const NEWSREADER_B64 = b64('Newsreader-Italic.ttf');
const INTERTIGHT_B64 = b64('InterTight-SemiBold.ttf');
const JETBRAINS_B64 = b64('JetBrainsMono-Bold.ttf');

let imageDataUri = '';
if (args.image) {
  const p = path.isAbsolute(args.image) ? args.image : path.join(process.cwd(), args.image);
  const ext = path.extname(p).toLowerCase().replace('.', '') || 'jpeg';
  const mime = ext === 'jpg' ? 'jpeg' : ext;
  imageDataUri = `data:image/${mime};base64,` + fs.readFileSync(p).toString('base64');
}
const hasImage = !!imageDataUri;
const scrim = args.scrim != null ? Math.max(0, Math.min(1, parseFloat(args.scrim))) : 0.55;

const lineText = mode === 'quote' ? args.quote : args.text;
const attribution = mode === 'quote' ? '— ' + args.author.toUpperCase() : '';
const accent = (args.accent || '').toLowerCase();
const kicker = args.kicker || 'FIELD NOTES';
const footer = args.footer || 'ACCOUNTABILITYGUILD.COM';
const title = args.title || (mode === 'quote' ? 'AG Field Notes quote card' : 'AG Field Notes statement card');
const caption = args.caption || '';
const hashtags = args.hashtags || '';
const note = args.note || '';

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

const metaLine = mode === 'quote'
  ? `Quote: ${esc(args.author || '')} &middot; retire this quote in quote-bank.md on post (rule 7)`
  : `Statement card &middot; original AG copy &middot; voice per voice-and-tone.md`;

const captionBlock = caption
  ? `<div class="copy-block">
  <h2>Suggested caption</h2>
  <p id="captionText">${esc(caption)}</p>
  ${hashtags ? `<p class="hashtags">${esc(hashtags)}</p>` : ''}
  ${note ? `<p class="meta">${esc(note)}</p>` : ''}
  <p class="meta">${metaLine}</p>
</div>`
  : '';

const dims = hasImage ? '1080&times;1080 &middot; image + flat ink scrim' : '1080&times;1080 &middot; plain bone';
const kickerLabel = mode === 'quote' ? 'quote card' : 'statement card';

const html = `<title>${esc(title)}</title>
<style>
@font-face { font-family: "AGNewsreader"; src: url(data:font/ttf;base64,${NEWSREADER_B64}) format("truetype"); }
@font-face { font-family: "AGInterTight"; src: url(data:font/ttf;base64,${INTERTIGHT_B64}) format("truetype"); }
@font-face { font-family: "AGJetBrainsMono"; src: url(data:font/ttf;base64,${JETBRAINS_B64}) format("truetype"); }

:root {
  --page-bg: #EDEBE4; --page-fg: #1A1A18; --page-fg-soft: #6B6B65;
  --card-frame: #FFFFFF; --accent: #D8512A;
}
@media (prefers-color-scheme: dark) {
  :root { --page-bg: #1C1C1A; --page-fg: #F2F1EC; --page-fg-soft: #9C9C95; --card-frame: #262624; }
}
:root[data-theme="dark"] { --page-bg: #1C1C1A; --page-fg: #F2F1EC; --page-fg-soft: #9C9C95; --card-frame: #262624; }
:root[data-theme="light"] { --page-bg: #EDEBE4; --page-fg: #1A1A18; --page-fg-soft: #6B6B65; --card-frame: #FFFFFF; }

* { box-sizing: border-box; }
body {
  font-family: "AGInterTight", system-ui, sans-serif;
  background: var(--page-bg); color: var(--page-fg);
  margin: 0; padding: 40px 20px 64px;
  display: flex; flex-direction: column; align-items: center; gap: 28px;
}
.eyebrow {
  font-family: "AGJetBrainsMono", monospace; font-size: 13px; letter-spacing: 0.18em;
  text-transform: uppercase; color: var(--page-fg-soft);
}
.stage { background: var(--card-frame); padding: 18px; border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 12px 32px rgba(0,0,0,0.10); }
#card, #cardImg { display: block; width: min(80vw, 520px); height: min(80vw, 520px); }
.actions { display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; }
button {
  font-family: "AGJetBrainsMono", monospace; font-size: 13px; letter-spacing: 0.08em;
  text-transform: uppercase; padding: 12px 20px; border-radius: 3px;
  border: 1px solid var(--page-fg-soft); background: transparent; color: var(--page-fg); cursor: pointer;
}
button.primary { background: var(--accent); border-color: var(--accent); color: #FAFAF7; }
button:hover { opacity: 0.85; }
.hint { width: min(90vw, 640px); font-size: 13px; line-height: 1.5; color: var(--page-fg-soft);
  text-align: center; margin: -12px 0 0; }
.copy-block {
  width: min(90vw, 640px); background: var(--card-frame);
  border: 1px solid color-mix(in srgb, var(--page-fg-soft) 30%, transparent);
  border-radius: 6px; padding: 24px 28px; display: flex; flex-direction: column; gap: 14px;
}
.copy-block h2 { font-family: "AGJetBrainsMono", monospace; font-size: 12px; letter-spacing: 0.16em;
  text-transform: uppercase; color: var(--page-fg-soft); margin: 0; }
.copy-block p { margin: 0; line-height: 1.55; font-size: 16px; white-space: pre-wrap; }
.copy-block .hashtags { color: var(--accent); font-family: "AGJetBrainsMono", monospace; font-size: 13px; letter-spacing: 0.04em; }
.copy-block .meta { font-family: "AGJetBrainsMono", monospace; font-size: 11px; letter-spacing: 0.08em;
  color: var(--page-fg-soft); text-transform: uppercase; }
</style>

<div class="eyebrow">Field notes &middot; Facebook ${kickerLabel} &middot; ${dims}</div>

<div class="stage">
  <canvas id="card" width="1080" height="1080" style="display:block;"></canvas>
  <img id="cardImg" width="1080" height="1080" style="display:none;" alt="Accountability Guild Field Notes card" />
</div>

<div class="actions">
  <button class="primary" id="downloadBtn">Download PNG</button>
</div>
<p class="hint">If the button doesn't trigger a download (sandboxed previews often block it), right-click the card above &rarr; <strong>Save image as&hellip;</strong> It exports at full 1080&times;1080 regardless of the on-screen size.</p>
<p class="hint" id="errHint" style="display:none; color:#B5432A;"></p>

${captionBlock}

<script>
const NEWSREADER = "AGNewsreader";
const INTER = "AGInterTight";
const MONO = "AGJetBrainsMono";
const BONE = "#FAFAF7";
const BONE_SOFT = "#D9D7CF";
const INK = "#0F0F0E";
const INK_SOFT = "#5C5C58";
const EMBER = "#D8512A";

const MODE = ${JSON.stringify(mode)};
const LINE = ${JSON.stringify(lineText)};
const ACCENT_WORD = ${JSON.stringify(accent)};
const ATTRIBUTION = ${JSON.stringify(attribution)};
const KICKER = ${JSON.stringify(kicker)};
const FOOTER = ${JSON.stringify(footer)};
const IMAGE_SRC = ${JSON.stringify(imageDataUri)};
const SCRIM = ${scrim};
const HAS_IMAGE = ${hasImage ? 'true' : 'false'};

function drawBackground(ctx, imgEl) {
  const W = 1080, H = 1080;
  if (HAS_IMAGE && imgEl) {
    // cover-fit, center-crop
    const ir = imgEl.naturalWidth / imgEl.naturalHeight;
    const cr = W / H;
    let dw, dh, dx, dy;
    if (ir > cr) { dh = H; dw = H * ir; dx = (W - dw) / 2; dy = 0; }
    else { dw = W; dh = W / ir; dx = 0; dy = (H - dh) / 2; }
    ctx.drawImage(imgEl, dx, dy, dw, dh);
    ctx.fillStyle = INK;
    ctx.globalAlpha = SCRIM;
    ctx.fillRect(0, 0, W, H);
    ctx.globalAlpha = 1;
  } else {
    ctx.fillStyle = BONE;
    ctx.fillRect(0, 0, W, H);
  }
}

function draw(ctx, imgEl) {
  const W = 1080, H = 1080, M = 96;
  const fg = HAS_IMAGE ? BONE : INK;
  const fgSoft = HAS_IMAGE ? BONE_SOFT : INK_SOFT;

  ctx.clearRect(0, 0, W, H);
  drawBackground(ctx, imgEl);
  ctx.textBaseline = "alphabetic";

  // Wordmark top-left — A · Inline Lockup
  ctx.letterSpacing = "0px";
  ctx.font = \`italic 44px "\${NEWSREADER}"\`;
  ctx.fillStyle = fg;
  ctx.textAlign = "left";
  ctx.fillText("Accountability", M, 132);
  const accWidth = ctx.measureText("Accountability").width;

  const guildSize = 44 * 0.42;
  ctx.font = \`600 \${guildSize}px "\${INTER}"\`;
  ctx.letterSpacing = "0.34em";
  ctx.fillText("GUILD", M + accWidth + 44 * 0.24, 132);
  ctx.letterSpacing = "0px";

  // Kicker top-right
  ctx.font = \`700 20px "\${MONO}"\`;
  ctx.letterSpacing = "0.22em";
  ctx.fillStyle = fgSoft;
  ctx.textAlign = "right";
  ctx.fillText(KICKER, W - M, 126);
  ctx.letterSpacing = "0px";
  ctx.textAlign = "left";

  // Center line
  const full = MODE === "quote" ? \`“\${LINE}”\` : LINE;
  const words = full.split(" ");
  const maxW = W - 2 * M;

  function wrapAt(size) {
    ctx.font = \`italic \${size}px "\${NEWSREADER}"\`;
    const lines = [];
    let cur = [];
    for (const w of words) {
      const test = [...cur, w].join(" ");
      if (ctx.measureText(test).width <= maxW || cur.length === 0) {
        cur.push(w);
      } else {
        lines.push(cur);
        cur = [w];
      }
    }
    if (cur.length) lines.push(cur);
    return lines;
  }

  let hs = 74;
  let lines;
  while (true) {
    lines = wrapAt(hs);
    if (lines.length <= 5 || hs <= 52) break;
    hs -= 2;
  }

  const lh = hs * 1.24;
  const blockH = lh * (lines.length - 1);
  const topRegion = 300, botRegion = 812;
  let y = (topRegion + botRegion) / 2 - blockH / 2 + hs * 0.34;

  ctx.textAlign = "center";
  ctx.font = \`italic \${hs}px "\${NEWSREADER}"\`;
  for (const line of lines) {
    // measure full line width to position words for per-word coloring while staying centered
    const parts = line.map((raw) => raw + " ");
    const widths = parts.map((p) => ctx.measureText(p).width);
    const totalW = widths.reduce((a, b) => a + b, 0) - (parts.length ? ctx.measureText(" ").width : 0);
    let x = W / 2 - totalW / 2;
    ctx.textAlign = "left";
    for (let i = 0; i < line.length; i++) {
      const raw = line[i];
      const word = parts[i];
      const stripped = raw.replace(/^[“”"'(]+|[.,;:!?“”")']+$/g, "").toLowerCase();
      ctx.fillStyle = ACCENT_WORD && stripped === ACCENT_WORD ? EMBER : fg;
      ctx.fillText(word, x, y);
      x += widths[i];
    }
    ctx.textAlign = "center";
    y += lh;
  }
  const lastBaseline = y - lh;

  // Attribution (quote mode only)
  if (MODE === "quote" && ATTRIBUTION) {
    ctx.textAlign = "center";
    ctx.font = \`700 22px "\${MONO}"\`;
    ctx.letterSpacing = "0.16em";
    ctx.fillStyle = fgSoft;
    ctx.fillText(ATTRIBUTION, W / 2, lastBaseline + hs * 0.34 + 70);
    ctx.letterSpacing = "0px";
  }

  // Bottom chrome
  ctx.textAlign = "left";
  if (HAS_IMAGE) {
    // centered A monogram: bone italic A + short ember tally beneath
    ctx.textAlign = "center";
    ctx.font = \`italic 66px "\${NEWSREADER}"\`;
    ctx.fillStyle = BONE;
    ctx.fillText("A", W / 2, H - 96);
    ctx.fillStyle = EMBER;
    ctx.fillRect(W / 2 - 26, H - 78, 52, 5);
    ctx.textAlign = "left";
  } else {
    ctx.font = \`700 20px "\${MONO}"\`;
    ctx.letterSpacing = "0.20em";
    ctx.fillStyle = INK_SOFT;
    ctx.fillText(FOOTER, M, H - 84);
    ctx.letterSpacing = "0px";
    ctx.fillStyle = EMBER;
    ctx.fillRect(W - M - 56, H - 104, 56, 5);
  }
}

function showError(err) {
  const el = document.getElementById("errHint");
  el.style.display = "block";
  el.textContent = "Render error: " + (err && err.message ? err.message : String(err));
  console.error(err);
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    if (!src) { resolve(null); return; }
    const im = new Image();
    im.onload = () => resolve(im);
    im.onerror = reject;
    im.src = src;
  });
}

async function render() {
  try {
    const canvas = document.getElementById("card");
    const img = document.getElementById("cardImg");
    const ctx = canvas.getContext("2d");
    const faces = [
      new FontFace(NEWSREADER, \`url(data:font/ttf;base64,${NEWSREADER_B64})\`, { style: "italic" }),
      new FontFace(INTER, \`url(data:font/ttf;base64,${INTERTIGHT_B64})\`, { weight: "600" }),
      new FontFace(MONO, \`url(data:font/ttf;base64,${JETBRAINS_B64})\`, { weight: "700" }),
    ];
    for (const f of faces) {
      const loaded = await f.load();
      document.fonts.add(loaded);
    }
    await document.fonts.ready;
    const bgImg = await loadImage(IMAGE_SRC);
    draw(ctx, bgImg);

    const dataUrl = canvas.toDataURL("image/png");
    img.src = dataUrl;
    img.style.display = "block";
    canvas.style.display = "none";

    document.getElementById("downloadBtn").addEventListener("click", () => {
      try {
        const link = document.createElement("a");
        link.download = "ag-fieldnotes-card.png";
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        link.remove();
      } catch (err) {
        showError(err);
      }
    });
  } catch (err) {
    showError(err);
  }
}

render();
</script>
`;

fs.writeFileSync(args.out, html);
console.log('wrote', args.out, html.length, 'bytes');
