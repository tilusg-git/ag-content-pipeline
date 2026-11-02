// Ad A image concepts: four simplified, illustrated takes on "progress tracking for a group".
// Stylized depictions of the product (brand tokens and fonts), not literal screenshots. 1080x1350 (4:5).
//   node docs/marketing/reddit-ads/build_adA_concepts.js
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

const OUT = path.join(__dirname, 'out');
fs.mkdirSync(OUT, { recursive: true });

const C = { bone: '#FAFAF7', panel: '#FFFFFF', ink: '#0F0F0E', soft: '#5C5C58', line: '#E5E2DA', ember: '#D8512A', emberSoft: '#F0A98A' };
const W = 1080, H = 1350;
const DAYS = ['TH', 'FR', 'SA', 'SU', 'MO', 'TU', 'WE'];

function spaced(ctx, text, x, y, spacing) {
  for (const ch of text) { ctx.fillText(ch, x, y); x += ctx.measureText(ch).width + spacing; }
  return x;
}
function mono(ctx, text, x, y, size, color, spacing = size * 0.18) {
  ctx.font = `${size}px AGMono`; ctx.fillStyle = color; return spaced(ctx, text, x, y, spacing);
}
function serif(ctx, text, x, y, size, color) {
  ctx.font = `${size}px AGSerif`; ctx.fillStyle = color; ctx.fillText(text, x, y);
}
function wrap(ctx, text, maxW) {
  const words = text.split(' '); const lines = []; let line = '';
  for (const w of words) { const t = line ? line + ' ' + w : w; if (ctx.measureText(t).width > maxW && line) { lines.push(line); line = w; } else line = t; }
  lines.push(line); return lines;
}
function check(ctx, cx, cy, s, color) {
  ctx.strokeStyle = color; ctx.lineWidth = Math.max(3, s * 0.1); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  ctx.beginPath(); ctx.moveTo(cx - s * 0.28, cy); ctx.lineTo(cx - s * 0.07, cy + s * 0.22); ctx.lineTo(cx + s * 0.3, cy - s * 0.22); ctx.stroke();
}
// state: 'kept' | 'note' (kept + ember corner) | 'today' | 'open' | 'future'
function cell(ctx, x, y, s, state) {
  if (state === 'kept' || state === 'note') {
    ctx.fillStyle = C.ink; ctx.fillRect(x, y, s, s); check(ctx, x + s / 2, y + s / 2, s * 0.55, C.bone);
    if (state === 'note') { ctx.fillStyle = C.ember; ctx.beginPath(); ctx.moveTo(x + s, y + s); ctx.lineTo(x + s - s * 0.3, y + s); ctx.lineTo(x + s, y + s - s * 0.3); ctx.closePath(); ctx.fill(); }
  } else if (state === 'today') {
    ctx.fillStyle = C.ember; ctx.fillRect(x, y, s, s); check(ctx, x + s / 2, y + s / 2, s * 0.55, C.bone);
  } else {
    ctx.fillStyle = C.panel; ctx.fillRect(x, y, s, s);
    ctx.strokeStyle = C.line; ctx.lineWidth = 2;
    if (state === 'future') ctx.setLineDash([8, 7]);
    ctx.strokeRect(x + 1, y + 1, s - 2, s - 2); ctx.setLineDash([]);
  }
}
async function base(wordmark) {
  const c = createCanvas(W, H); const ctx = c.getContext('2d');
  ctx.fillStyle = C.bone; ctx.fillRect(0, 0, W, H);
  const ww = 330; ctx.drawImage(wordmark, 72, 72, ww, ww * (288 / 1700));
  return { c, ctx };
}
function save(c, name) {
  const f = path.join(OUT, name); fs.writeFileSync(f, c.toBuffer('image/png')); console.log('wrote', path.relative(ROOT, f));
}

(async () => {
  const wordmark = await loadImage(path.join(ROOT, 'docs/brand/assets/wordmark/wordmark-a-light@2x.png'));

  // ---- Concept 1: "The week" — three goals, one week, big grid ----
  {
    const { c, ctx } = await base(wordmark);
    mono(ctx, 'OCT 1-7  ·  WEEK 1', 72, 300, 24, C.soft);
    const s = 112, gap = 18, x0 = 72;
    DAYS.forEach((d, i) => mono(ctx, d, x0 + i * (s + gap) + s / 2 - 16, 370, 22, i === 4 ? C.ember : C.soft, 4));
    const rows = [
      ['Lift four times a week.', ['kept', 'note', 'open', 'kept', 'today', 'future', 'future']],
      ['Read 20 pages a night.', ['kept', 'kept', 'kept', 'open', 'today', 'future', 'future']],
      ['Phone-free dinner, four nights.', ['note', 'open', 'kept', 'kept', 'today', 'future', 'future']],
    ];
    rows.forEach(([label, states], r) => {
      const y = 450 + r * 270;
      serif(ctx, label, x0, y, 46, C.ink);
      states.forEach((st, i) => cell(ctx, x0 + i * (s + gap), y + 40, s, st));
    });
    save(c, 'adA_concept1_week_1080x1350.png');
  }

  // ---- Concept 2: "One promise" — a single goal, a single week, very large ----
  {
    const { c, ctx } = await base(wordmark);
    mono(ctx, 'THIS CYCLE · FITNESS', 72, 360, 24, C.ember);
    ctx.font = '104px AGSerif';
    wrap(ctx, 'Lift four times a week.', W - 144).forEach((l, i) => serif(ctx, l, 72, 490 + i * 116, 104, C.ink));
    const s = 118, gap = 15, x0 = 72, y = 780;
    DAYS.forEach((d, i) => mono(ctx, d, x0 + i * (s + gap) + s / 2 - 16, y - 24, 22, C.soft, 4));
    ['kept', 'open', 'note', 'open', 'kept', 'open', 'today'].forEach((st, i) => cell(ctx, x0 + i * (s + gap), y, s, st));
    ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(72, 1010); ctx.lineTo(W - 72, 1010); ctx.stroke();
    mono(ctx, '4 OF 4', 72, 1080, 40, C.ink, 6);
    mono(ctx, 'KEPT', 72, 1130, 24, C.ember, 6);
    save(c, 'adA_concept2_one-promise_1080x1350.png');
  }

  // ---- Concept 3: "From the shared doc to the guild" — before/after ----
  {
    const { c, ctx } = await base(wordmark);
    // Before: a stylized shared spreadsheet, grey and half-empty.
    mono(ctx, 'BEFORE', 72, 250, 22, C.soft);
    const gx = 72, gy = 280, cols = 6, rowsN = 5, cw = 156, rh = 62;
    ctx.fillStyle = C.panel; ctx.fillRect(gx, gy, cols * cw, rowsN * rh);
    ctx.strokeStyle = C.line; ctx.lineWidth = 2;
    for (let i = 0; i <= cols; i++) { ctx.beginPath(); ctx.moveTo(gx + i * cw, gy); ctx.lineTo(gx + i * cw, gy + rowsN * rh); ctx.stroke(); }
    for (let j = 0; j <= rowsN; j++) { ctx.beginPath(); ctx.moveTo(gx, gy + j * rh); ctx.lineTo(gx + cols * cw, gy + j * rh); ctx.stroke(); }
    ['A', 'B', 'C', 'D', 'E', 'F'].forEach((l, i) => mono(ctx, l, gx + i * cw + 14, gy + 40, 20, '#B9B6AE'));
    const scrawl = [[1, 1, 'done?'], [1, 3, 'x'], [2, 0, '??'], [2, 4, 'later'], [3, 2, '-'], [4, 1, 'TBD'], [4, 5, '?']];
    scrawl.forEach(([r, col, t]) => mono(ctx, t, gx + col * cw + 16, gy + r * rh + 40, 22, '#A5A29A'));
    // After: the same intent, clean and visible.
    mono(ctx, 'AFTER', 72, 700, 22, C.ember);
    const s = 100, gap = 16, x0 = 72;
    [['Lift four times a week.', ['kept', 'note', 'open', 'kept', 'today', 'future', 'future']],
     ['Read 20 pages a night.', ['kept', 'kept', 'kept', 'open', 'today', 'future', 'future']],
    ].forEach(([label, states], r) => {
      const y = 790 + r * 230;
      serif(ctx, label, x0, y, 42, C.ink);
      states.forEach((st, i) => cell(ctx, x0 + i * (s + gap), y + 34, s, st));
    });
    save(c, 'adA_concept3_before-after_1080x1350.png');
  }

  // ---- Concept 4: "The group sees it" — five members, one cycle ----
  {
    const { c, ctx } = await base(wordmark);
    mono(ctx, 'OCTOBER · DAY 17 OF 31', 72, 300, 24, C.soft);
    ctx.font = '72px AGSerif'; serif(ctx, 'Everyone can see', 72, 400, 72, C.ink);
    serif(ctx, 'the follow-through.', 72, 480, 72, C.ember);
    const members = [['M', 0.82], ['P', 0.94], ['D', 0.61], ['E', 0.76], ['S', 0.48]];
    members.forEach(([ini, p], i) => {
      const y = 600 + i * 132, r = 42;
      ctx.fillStyle = C.panel; ctx.beginPath(); ctx.arc(72 + r, y + r, r, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.stroke();
      ctx.font = '46px AGSerif'; ctx.fillStyle = C.ink; const tw = ctx.measureText(ini).width; ctx.fillText(ini, 72 + r - tw / 2, y + r + 16);
      const bx = 196, bw = W - 72 - bx - 130, by = y + r - 10;
      ctx.fillStyle = C.line; ctx.fillRect(bx, by, bw, 20);
      ctx.fillStyle = i === 0 ? C.ember : C.ink; ctx.fillRect(bx, by, Math.round(bw * p), 20);
      mono(ctx, `${Math.round(p * 100)}%`, bx + bw + 28, by + 19, 26, C.ink, 2);
    });
    save(c, 'adA_concept4_group_1080x1350.png');
  }
})();
