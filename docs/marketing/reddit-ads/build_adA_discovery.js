// Ad A creative discovery, round 2: problem-first concepts (see reddit-ad-creative-discovery-2026-10-07.md).
// Renders the two illustrated concepts crisp, and layout comps (with shot direction) for the photo concepts.
//   node docs/marketing/reddit-ads/build_adA_discovery.js
const path = require('path');
const fs = require('fs');
const { createRequire } = require('module');
const req = createRequire(path.join(__dirname, '../../brand/assets/facebook/gen_card.js'));
const { createCanvas, loadImage, GlobalFonts } = req('@napi-rs/canvas');

const ROOT = path.join(__dirname, '../../..');
const FONT_DIR = path.join(ROOT, 'repo/assets/fonts');
GlobalFonts.registerFromPath(path.join(FONT_DIR, 'Newsreader-Italic.ttf'), 'AGSerif');
GlobalFonts.registerFromPath(path.join(FONT_DIR, 'InterTight-SemiBold.ttf'), 'AGSans');
GlobalFonts.registerFromPath(path.join(FONT_DIR, 'JetBrainsMono-Bold.ttf'), 'AGMono');
const OUT = path.join(__dirname, 'out', 'discovery');
fs.mkdirSync(OUT, { recursive: true });

const C = { bone: '#FAFAF7', panel: '#FFFFFF', ink: '#0F0F0E', soft: '#5C5C58', line: '#E5E2DA', ember: '#D8512A', emberSoft: '#F0A98A', faint: '#B9B6AE' };
const W = 1080, H = 1350;

function spaced(ctx, t, x, y, sp) { for (const ch of t) { ctx.fillText(ch, x, y); x += ctx.measureText(ch).width + sp; } return x; }
function mono(ctx, t, x, y, size, color, sp = size * 0.16) { ctx.font = `${size}px AGMono`; ctx.fillStyle = color; return spaced(ctx, t, x, y, sp); }
function text(ctx, font, t, x, y, color) { ctx.font = font; ctx.fillStyle = color; ctx.fillText(t, x, y); }
function wrap(ctx, t, maxW) { const out = []; let line = ''; for (const w of t.split(' ')) { const n = line ? line + ' ' + w : w; if (ctx.measureText(n).width > maxW && line) { out.push(line); line = w; } else line = n; } out.push(line); return out; }
function rr(ctx, x, y, w, h, r) { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }
function check(ctx, cx, cy, s, color) { ctx.strokeStyle = color; ctx.lineWidth = Math.max(3, s * 0.12); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(cx - s * 0.28, cy); ctx.lineTo(cx - s * 0.07, cy + s * 0.22); ctx.lineTo(cx + s * 0.3, cy - s * 0.22); ctx.stroke(); }
function save(c, name) { const f = path.join(OUT, name); fs.writeFileSync(f, c.toBuffer('image/png')); console.log('wrote', path.relative(ROOT, f)); }

(async () => {
  const mark = await loadImage(path.join(ROOT, 'docs/brand/assets/monogram/monogram-accent-512.png'));
  const markLR = (ctx) => ctx.drawImage(mark, W - 64 - 76, H - 64 - 76, 76, 76);

  // ---- D1 "The quiet group chat" (recognition) ----
  {
    const c = createCanvas(W, H); const ctx = c.getContext('2d');
    ctx.fillStyle = C.bone; ctx.fillRect(0, 0, W, H);
    const bubble = (y, stamp, msg, seen) => {
      mono(ctx, stamp, 96, y, 22, C.soft);
      ctx.font = '50px AGSans';
      const lines = wrap(ctx, msg, 700);
      const bw = Math.max(...lines.map(l => ctx.measureText(l).width)) + 80, bh = lines.length * 64 + 52;
      ctx.fillStyle = C.panel; rr(ctx, 72, y + 24, bw, bh, 40); ctx.fill();
      ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.stroke();
      lines.forEach((l, i) => text(ctx, '50px AGSans', l, 112, y + 24 + 76 + i * 64, C.ink));
      if (seen) mono(ctx, seen, 96, y + 24 + bh + 46, 22, C.faint);
      return y + 24 + bh;
    };
    let y = bubble(250, 'SEP 3 · 9:14 PM', "How's everyone doing on their goals this month?", 'SEEN BY 4');
    // the long silence
    ctx.strokeStyle = C.line; ctx.lineWidth = 3; ctx.setLineDash([2, 18]); ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(140, y + 110); ctx.lineTo(140, y + 390); ctx.stroke(); ctx.setLineDash([]);
    bubble(y + 440, 'OCT 1 · 10:02 PM', 'anyone?', 'SEEN BY 4');
    markLR(ctx);
    save(c, 'D1_quiet-group-chat_1080x1350.png');
  }

  // ---- D2 "The spreadsheet graveyard" (recognition; matches the ad A headline) ----
  {
    const c = createCanvas(W, H); const ctx = c.getContext('2d');
    ctx.fillStyle = C.bone; ctx.fillRect(0, 0, W, H);
    const x0 = 64, y0 = 240, tw = W - 128;
    ctx.fillStyle = C.panel; ctx.fillRect(x0, y0, tw, 820); ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.strokeRect(x0, y0, tw, 820);
    text(ctx, '46px AGSans', 'Group goals 2026', x0 + 40, y0 + 84, C.ink);
    mono(ctx, 'LAST EDITED 211 DAYS AGO', x0 + 40, y0 + 136, 24, C.ember);
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT'];
    const names = ['Mike', 'Jen', 'Chris', 'Sam', 'Alex'];
    const gx = x0 + 40, gy = y0 + 210, nameW = 150, cell = (tw - 80 - nameW) / months.length, rh = 112;
    months.forEach((m, i) => mono(ctx, m, gx + nameW + i * cell + 12, gy - 18, 18, C.soft, 2));
    // how far each person kept it up before the doc died
    const lasted = [3, 2, 1, 2, 1];
    names.forEach((n, r) => {
      const y = gy + r * rh;
      ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(gx, y); ctx.lineTo(gx + tw - 80, y); ctx.stroke();
      text(ctx, '34px AGSans', n, gx, y + 68, C.ink);
      months.forEach((m, i) => {
        const cx = gx + nameW + i * cell + 6, cy = y + 22, s = cell - 12;
        if (i < lasted[r]) { ctx.fillStyle = C.ink; ctx.fillRect(cx, cy, s, s * 0.95); check(ctx, cx + s / 2, cy + s * 0.47, s * 0.55, C.bone); }
        else { ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.strokeRect(cx + 1, cy + 1, s - 2, s * 0.95 - 2); }
      });
    });
    markLR(ctx);
    save(c, 'D2_spreadsheet-graveyard_1080x1350.png');
  }

  // ---- Layout comps for the photo concepts (shot direction, not final art) ----
  const comps = [
    ['D3_twenty-says_COMP', 'PHOTO TO SHOOT', 'A $20 bill paper-clipped to an index card with one handwritten goal: "Lift 4x a week. October." Kitchen counter, daylight, phone camera, slightly off-square.'],
    ['D4_phone-on-the-bench_COMP', 'PHOTO TO SHOOT', "A phone face-up on a gym bench (or kitchen table), the app's real week grid on screen. Chalk, a water bottle, real clutter. Shot from above, natural light."],
    ['D5_first-thursday-table_COMP', 'PHOTO TO SHOOT', 'The real group table on a first Thursday: notebooks, coffee, phones, hands mid-gesture. No faces unless everyone consents. Wide, natural light, not staged.'],
  ];
  for (const [name, kicker, dir] of comps) {
    const c = createCanvas(W, H); const ctx = c.getContext('2d');
    ctx.fillStyle = C.bone; ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = C.faint; ctx.lineWidth = 3; ctx.setLineDash([16, 12]); ctx.strokeRect(40, 40, W - 80, H - 80); ctx.setLineDash([]);
    mono(ctx, kicker, 96, 560, 26, C.ember);
    ctx.font = '48px AGSerif'; wrap(ctx, dir, W - 192).forEach((l, i) => text(ctx, '48px AGSerif', l, 96, 640 + i * 62, C.ink));
    mono(ctx, 'FULL BLEED · NO TEXT ON IMAGE · MONOGRAM LOWER RIGHT', 96, H - 120, 18, C.soft, 2);
    markLR(ctx);
    save(c, name + '_1080x1350.png');
  }
})();
