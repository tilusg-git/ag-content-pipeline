#!/usr/bin/env node
/* Accountability Guild — Facebook/IG card → PNG file (primary generator).
 *
 * Renders the card directly to a 1080x1080 PNG on disk using @napi-rs/canvas
 * (prebuilt native binary, no Python / no build step). This is the path to
 * use whenever it's available: the output is a real file in
 * backgrounds/out/, so there's no artifact preview, no right-click-save,
 * no unreliable in-browser download.
 *
 *   npm i            # once, installs @napi-rs/canvas (see package.json here)
 *   node gen_card.js --mode statement \
 *     --text "When you can't see far, commit short. One cycle. One promise. Visible to the people who'll ask." \
 *     --accent Visible --image backgrounds/source/foggy-trail.jpg --scrim 0.68 \
 *     --caption "..." --hashtags "#Accountability #FollowThrough #AccountabilityGroup" \
 *     --slug foggy-trail-keep-going
 *
 * Card kinds:
 *   quote      (default): centered quote in curly quotes + mono attribution line.
 *   statement  (--mode statement): original AG copy, no quote marks, no attribution.
 *
 * Backgrounds:
 *   plain bone (default): ink type on bone, URL footer + bottom-right ember rule.
 *   image (--image PATH): full-color photo cover-fit under a mandatory flat ink
 *              scrim (#0F0F0E at --scrim, default 0.55). Reversed (bone) type.
 *              Bottom chrome becomes the centered A monogram (bone italic A +
 *              short ember tally) — no URL footer. This is "Treatment B" from
 *              image-backgrounds-spec.md.
 *
 * Flags:
 *   --mode       quote (default) | statement
 *   --quote      quote mode: text without surrounding curly quotes (added here)
 *   --text       statement mode: the line verbatim (no quote marks added). Omit it
 *                for a chrome-only card — scrimmed photo + wordmark + kicker + monogram,
 *                no center copy (message lives in the caption).
 *   --author     quote mode, required: attribution, rendered "— UPPERCASE"
 *   --accent     optional: one word to render in ember (case/punct-insensitive)
 *   --image      optional: background photo path (>=1080 sq; >=2160 recommended)
 *   --filter     optional: scrim preset — light (0.45) | medium (0.55) | heavy (0.66).
 *                Use light for chrome-only cards so the photo reads; heavy when
 *                center copy sits on the image or the photo is bright/busy.
 *   --scrim      optional: explicit flat ink scrim opacity 0..1 — overrides --filter
 *   --kicker     default "FIELD NOTES"
 *   --footer     default "ACCOUNTABILITYGUILD.COM" (plain bone only)
 *   --caption    optional: writes a <slug>.caption.txt sidecar with caption + hashtags
 *   --hashtags   optional: appended to the caption sidecar on its own line
 *   --yshift     optional: px to nudge the center text block (negative = up). Default 0.
 *   --slug       output basename (default derived from the line). PNG lands in backgrounds/out/
 *   --out        optional: explicit output path, overrides --slug
 *   --outdir     default "backgrounds/out"
 *
 * If @napi-rs/canvas can't be installed in some environment, fall back to
 * gen_quote_card_canvas.js (emits a self-contained HTML card to publish as
 * an Artifact). Keep the two in sync — same layout, same tokens.
 */
const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage, GlobalFonts } = require('@napi-rs/canvas');

function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) { out[a.slice(2)] = argv[i + 1]; i++; }
  }
  return out;
}
const args = parseArgs(process.argv.slice(2));
const mode = (args.mode || 'quote').toLowerCase();
if (mode !== 'quote' && mode !== 'statement') { console.error('--mode must be quote|statement'); process.exit(1); }
// quote mode needs a quote + attribution; statement mode's --text is optional
// (omit it for a chrome-only card: scrimmed photo + wordmark + kicker + monogram).
const req = mode === 'quote' ? ['quote', 'author'] : [];
for (const r of req) if (!args[r]) { console.error(`Missing --${r} for mode "${mode}"`); process.exit(1); }

const FONT_DIR = path.join(__dirname, '..', '..', '..', '..', 'repo', 'assets', 'fonts');
GlobalFonts.registerFromPath(path.join(FONT_DIR, 'Newsreader-Italic.ttf'), 'AGNewsreader');
GlobalFonts.registerFromPath(path.join(FONT_DIR, 'InterTight-SemiBold.ttf'), 'AGInterTight');
GlobalFonts.registerFromPath(path.join(FONT_DIR, 'JetBrainsMono-Bold.ttf'), 'AGJetBrainsMono');

const NEWS = 'AGNewsreader', INTER = 'AGInterTight', MONO = 'AGJetBrainsMono';
const BONE = '#FAFAF7', BONE_SOFT = '#D9D7CF', INK = '#0F0F0E', INK_SOFT = '#5C5C58', EMBER = '#D8512A';

// smart apostrophes between letters (typographic polish; leaves feet/inch marks alone)
function smartApos(s) { return String(s || '').replace(/([A-Za-z])'([A-Za-z])/g, '$1’$2'); }
const line = smartApos(mode === 'quote' ? args.quote : args.text);
const attribution = mode === 'quote' ? '— ' + args.author.toUpperCase() : '';
const accent = (args.accent || '').toLowerCase();
const kicker = args.kicker || 'FIELD NOTES';
const footer = args.footer || 'ACCOUNTABILITYGUILD.COM';
// Scrim: --scrim (explicit 0..1) wins; else --filter preset; else 0.55.
// light  — photo-forward, for chrome-only cards (no center copy).
// medium — balanced default.
// heavy  — for bright/busy photos OR when body copy sits on the image.
const FILTER_PRESETS = { light: 0.45, medium: 0.55, heavy: 0.66 };
const filterName = (args.filter || '').toLowerCase();
if (filterName && !(filterName in FILTER_PRESETS)) {
  console.error(`--filter must be one of: ${Object.keys(FILTER_PRESETS).join(', ')}`);
  process.exit(1);
}
const scrim = args.scrim != null
  ? Math.max(0, Math.min(1, parseFloat(args.scrim)))
  : (filterName ? FILTER_PRESETS[filterName] : 0.55);
const imagePath = args.image ? (path.isAbsolute(args.image) ? args.image : path.join(process.cwd(), args.image)) : null;
if (imagePath && line && scrim < 0.55) {
  console.warn(`NOTE: center copy over an image at scrim ${scrim.toFixed(2)} — eyeball the PNG for the 4.5:1 floor; bump to --filter heavy if the type looks thin.`);
}

const slug = args.slug
  || (line ? line.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 48) : '')
  || (imagePath ? path.basename(imagePath).replace(/\.[^.]+$/, '') : '')
  || 'card';
const outdir = args.outdir || 'backgrounds/out';
const outPath = args.out
  ? (path.isAbsolute(args.out) ? args.out : path.join(process.cwd(), args.out))
  : path.join(process.cwd(), outdir, slug + '.png');

function drawTracked(ctx, text, x, y, tracking, align) {
  const chars = [...text];
  const widths = chars.map((ch) => ctx.measureText(ch).width);
  const total = widths.reduce((a, b) => a + b, 0) + tracking * (chars.length - 1);
  let cx = align === 'right' ? x - total : align === 'center' ? x - total / 2 : x;
  for (let i = 0; i < chars.length; i++) { ctx.fillText(chars[i], cx, y); cx += widths[i] + tracking; }
  return total;
}

async function main() {
  const W = 1080, H = 1080, M = 96;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext('2d');
  const hasImage = !!imagePath;
  const fg = hasImage ? BONE : INK;
  // over a lightly-scrimmed photo, bone-soft chrome can wash out — go full bone below 0.55
  const fgSoft = hasImage ? (scrim < 0.55 ? BONE : BONE_SOFT) : INK_SOFT;

  ctx.textBaseline = 'alphabetic';

  // --- background ---
  if (hasImage) {
    const img = await loadImage(imagePath);
    const ir = img.width / img.height, cr = W / H;
    let dw, dh, dx, dy;
    if (ir > cr) { dh = H; dw = H * ir; dx = (W - dw) / 2; dy = 0; }
    else { dw = W; dh = W / ir; dx = 0; dy = (H - dh) / 2; }
    ctx.drawImage(img, dx, dy, dw, dh);
    ctx.save(); ctx.globalAlpha = scrim; ctx.fillStyle = INK; ctx.fillRect(0, 0, W, H); ctx.restore();
  } else {
    ctx.fillStyle = BONE; ctx.fillRect(0, 0, W, H);
  }

  // --- wordmark top-left ---
  ctx.textAlign = 'left';
  ctx.font = `44px ${NEWS}`;
  ctx.fillStyle = fg;
  ctx.fillText('Accountability', M, 132);
  const accW = ctx.measureText('Accountability').width;
  const guildSize = 44 * 0.42;
  ctx.font = `600 ${guildSize}px ${INTER}`;
  drawTracked(ctx, 'GUILD', M + accW + 44 * 0.24, 132, guildSize * 0.34, 'left');

  // --- kicker top-right ---
  ctx.font = `700 20px ${MONO}`;
  ctx.fillStyle = fgSoft;
  drawTracked(ctx, kicker, W - M, 126, 20 * 0.22, 'right');

  // --- center line (skipped when statement mode is given no --text: chrome-only card) ---
  if (line) {
    const full = mode === 'quote' ? `“${line}”` : line;
    const words = full.split(' ');
    const maxW = W - 2 * M;
    function wrapAt(size) {
      ctx.font = `${size}px ${NEWS}`;
      const lines = []; let cur = [];
      for (const w of words) {
        const test = [...cur, w].join(' ');
        if (ctx.measureText(test).width <= maxW || cur.length === 0) cur.push(w);
        else { lines.push(cur); cur = [w]; }
      }
      if (cur.length) lines.push(cur);
      return lines;
    }
    let hs = 74, lines;
    while (true) { lines = wrapAt(hs); if (lines.length <= 5 || hs <= 52) break; hs -= 2; }
    const lh = hs * 1.24;
    const blockH = lh * (lines.length - 1);
    const topRegion = 300, botRegion = 812;
    const yshift = args.yshift != null ? parseFloat(args.yshift) : 0;
    let y = (topRegion + botRegion) / 2 - blockH / 2 + hs * 0.34 + yshift;

    ctx.font = `${hs}px ${NEWS}`;
    const spaceW = ctx.measureText(' ').width;
    for (const ln of lines) {
      const parts = ln.map((raw) => raw + ' ');
      const widths = parts.map((p) => ctx.measureText(p).width);
      const lineW = widths.reduce((a, b) => a + b, 0) - spaceW;
      let x = W / 2 - lineW / 2;
      ctx.textAlign = 'left';
      for (let i = 0; i < ln.length; i++) {
        const stripped = ln[i].replace(/^[“”"'(]+|[.,;:!?“”")']+$/g, '').toLowerCase();
        ctx.fillStyle = accent && stripped === accent ? EMBER : fg;
        ctx.fillText(parts[i], x, y);
        x += widths[i];
      }
      y += lh;
    }
    const lastBaseline = y - lh;

    // --- attribution (quote mode) ---
    if (mode === 'quote' && attribution) {
      ctx.font = `700 22px ${MONO}`;
      ctx.fillStyle = fgSoft;
      drawTracked(ctx, attribution, W / 2, lastBaseline + hs * 0.34 + 70, 22 * 0.16, 'center');
    }
  }

  // --- bottom chrome ---
  if (hasImage) {
    ctx.textAlign = 'center';
    ctx.font = `66px ${NEWS}`;
    ctx.fillStyle = BONE;
    ctx.fillText('A', W / 2, H - 96);
    ctx.fillStyle = EMBER;
    ctx.fillRect(W / 2 - 26, H - 78, 52, 5);
  } else {
    ctx.font = `700 20px ${MONO}`;
    ctx.fillStyle = INK_SOFT;
    drawTracked(ctx, footer, M, H - 84, 20 * 0.20, 'left');
    ctx.fillStyle = EMBER;
    ctx.fillRect(W - M - 56, H - 104, 56, 5);
  }

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, canvas.toBuffer('image/png'));
  console.log('PNG  ->', outPath);

  if (args.caption) {
    const capPath = outPath.replace(/\.png$/, '') + '.caption.txt';
    const body = args.caption + (args.hashtags ? '\n\n' + args.hashtags : '') + '\n';
    fs.writeFileSync(capPath, body);
    console.log('TEXT ->', capPath);
  }
}
main().catch((e) => { console.error(e); process.exit(1); });
