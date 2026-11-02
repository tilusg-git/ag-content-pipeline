// Round 6 (2026-10-19): two more 400x300 conversation-placement thumbnails per live ad, type-led, no photos.
//   A (the story): A2 = stale sheet vs. filed report, split ink/bone; A3 = the report roster, cropped close, no phone.
//   B (the price): B2 = "$20 at stake" on ink; B3 = a cycle-close receipt where every commitment was kept, so $0.
// Drawn at 4x and halved twice, like the round 4 thumbnail, so small type downsamples cleanly.
//   node docs/marketing/reddit-ads/build_thumbs_round6.js
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
const OUT = path.join(__dirname, 'out', 'round6-thumbs');
fs.mkdirSync(OUT, { recursive: true });

const C = {
  bone: '#FAFAF7', panel: '#FFFFFF', ink: '#0F0F0E', soft: '#5C5C58', line: '#E5E2DA', ember: '#D8512A', emberSoft: '#F0A98A', faint: '#B9B6AE',
  success: '#1F7A4D', successSoft: '#DCEAE0', // app functional palette (components.css)
};
const TW = 400, TH = 300, SS = 4;
const WM_RATIO = 288 / 1700;

function spaced(ctx, t, x, y, sp) { for (const ch of t) { ctx.fillText(ch, x, y); x += ctx.measureText(ch).width + sp; } return x; }
function spacedW(ctx, t, sp) { let w = 0; for (const ch of t) w += ctx.measureText(ch).width + sp; return w - sp; }
function mono(ctx, t, x, y, size, color, sp = size * 0.16, align = 'left') {
  ctx.font = `${size}px AGMono`; ctx.fillStyle = color;
  if (align === 'center') x -= spacedW(ctx, t, sp) / 2; else if (align === 'right') x -= spacedW(ctx, t, sp);
  return spaced(ctx, t, x, y, sp);
}
function text(ctx, font, t, x, y, color, align = 'left') { ctx.font = font; ctx.fillStyle = color; ctx.textAlign = align; ctx.fillText(t, x, y); ctx.textAlign = 'left'; }
function pill(ctx, x, y, label, fg, bg, size) {
  ctx.font = `${size}px AGMono`; const w = spacedW(ctx, label, size * 0.15) + size * 3, h = size * 2.1;
  ctx.fillStyle = bg; ctx.fillRect(x, y, w, h);
  ctx.fillStyle = fg; ctx.beginPath(); ctx.arc(x + size, y + h / 2, size * 0.3, 0, Math.PI * 2); ctx.fill();
  mono(ctx, label, x + size * 1.9, y + h / 2 + size * 0.36, size, fg, size * 0.15); return w;
}

// draw(ctx) works in 400x300 coordinates; rendered at SS and downsampled
function render(name, draw) {
  let c = createCanvas(TW * SS, TH * SS); const ctx = c.getContext('2d');
  ctx.scale(SS, SS); draw(ctx);
  for (let f = SS / 2; f >= 1; f /= 2) {
    const d = createCanvas(TW * f, TH * f), dx = d.getContext('2d');
    dx.imageSmoothingEnabled = true; dx.imageSmoothingQuality = 'high'; dx.drawImage(c, 0, 0, TW * f, TH * f); c = d;
  }
  const f = path.join(OUT, name); const buf = c.toBuffer('image/png'); fs.writeFileSync(f, buf);
  console.log('wrote', path.relative(ROOT, f), `${(buf.length / 1024).toFixed(1)} KB`);
}

(async () => {
  const wmLight = await loadImage(path.join(ROOT, 'docs/brand/assets/wordmark/wordmark-a-light@2x.png'));
  const wmRev = await loadImage(path.join(ROOT, 'docs/brand/assets/wordmark/wordmark-a-reversed@2x.png'));
  const wordmark = (ctx, img, x, y, w) => ctx.drawImage(img, x, y, w, w * WM_RATIO);

  // ---- A2: the sheet goes stale, the report doesn't (split, like the live A image) ----
  render('adA2_stale-vs-filed_thumb_400x300.png', ctx => {
    ctx.fillStyle = C.ink; ctx.fillRect(0, 0, TW / 2, TH); ctx.fillStyle = C.bone; ctx.fillRect(TW / 2, 0, TW / 2, TH);
    const L = 20, R = TW / 2 + 20;
    mono(ctx, 'GOALS SHEET', L, 46, 10, C.faint, 1.6);
    text(ctx, '30px AGSerif', 'Last edited', L, 92, C.bone);
    text(ctx, '30px AGSerif', '6 weeks ago.', L, 128, C.bone);
    ctx.fillStyle = C.soft; ctx.fillRect(L, 158, 160, 1);
    [['Marcus', '—'], ['Priya', '—'], ['Dave', '?']].forEach(([n, v], i) => {
      text(ctx, '15px AGSans', n, L, 186 + i * 26, C.faint); text(ctx, '15px AGSans', v, L + 160, 186 + i * 26, C.faint, 'right');
    });
    mono(ctx, 'CYCLE REPORT', R, 46, 10, C.soft, 1.6);
    text(ctx, '30px AGSerif', 'Filed: 5 of 5.', R, 92, C.ink);
    text(ctx, '30px AGSerif', 'On time.', R, 128, C.ember);
    ctx.fillStyle = C.line; ctx.fillRect(R, 158, 160, 1);
    [['Marcus', '100%'], ['Priya', '88%'], ['Dave', '75%']].forEach(([n, v], i) => {
      text(ctx, '15px AGSans', n, R, 186 + i * 26, C.ink); mono(ctx, v, R + 160, 186 + i * 26, 11, C.success, 1, 'right');
    });
    wordmark(ctx, wmLight, TW - 20 - 120, TH - 20 - 120 * WM_RATIO, 120);
  });

  // ---- A3: the report roster, cropped close (no phone frame, bigger type than the live thumb) ----
  render('adA3_report-roster_thumb_400x300.png', ctx => {
    ctx.fillStyle = C.bone; ctx.fillRect(0, 0, TW, TH);
    wordmark(ctx, wmLight, 24, 22, 132);
    mono(ctx, 'THURSDAY NIGHT GROUP · OCTOBER', 24, 70, 10, C.soft, 1.4);
    text(ctx, '34px AGSerif', 'Everyone filed.', 24, 110, C.ink);
    mono(ctx, '5/5', TW - 24, 110, 22, C.ember, 2, 'right');
    [['Marcus', '100% KEPT'], ['Priya', '88% KEPT'], ['Elena', '100% KEPT']].forEach(([n, l], i) => {
      const y = 132 + i * 54;
      ctx.fillStyle = C.panel; ctx.fillRect(24, y, TW - 48, 46); ctx.strokeStyle = C.line; ctx.lineWidth = 1; ctx.strokeRect(24.5, y + 0.5, TW - 49, 45);
      if (i === 0) { ctx.fillStyle = C.ember; ctx.fillRect(24, y, 3, 46); }
      text(ctx, '21px AGSerif', n, 40, y + 30, C.ink);
      ctx.font = '10px AGMono'; const pw = spacedW(ctx, 'SUBMITTED · ' + l, 1.5) + 30;
      pill(ctx, TW - 36 - pw, y + 12, 'SUBMITTED · ' + l, C.success, C.successSoft, 10);
    });
  });

  // ---- B2: the number, on ink ----
  render('adB2_twenty-at-stake_thumb_400x300.png', ctx => {
    ctx.fillStyle = C.ink; ctx.fillRect(0, 0, TW, TH);
    mono(ctx, 'AT STAKE THIS CYCLE', 26, 50, 11, C.emberSoft, 2);
    text(ctx, '128px AGSerif', '$20', 20, 170, C.ember);
    ctx.fillStyle = C.soft; ctx.fillRect(26, 196, TW - 52, 1);
    text(ctx, '22px AGSerif', 'Miss it, and it goes to', 26, 230, C.bone);
    text(ctx, '22px AGSerif', 'your group’s kitty.', 26, 258, C.bone);
    mono(ctx, 'NOT TO US.', TW - 26, 258, 11, C.emberSoft, 2, 'right');
    wordmark(ctx, wmRev, TW - 26 - 112, 30, 112);
  });

  // ---- B3: the cycle-close receipt where everything was kept ----
  render('adB3_zero-dollar-close_thumb_400x300.png', ctx => {
    ctx.fillStyle = C.bone; ctx.fillRect(0, 0, TW, TH);
    const x = 36, y = 22, w = TW - 72, h = TH - 44;
    ctx.fillStyle = C.panel; ctx.fillRect(x, y, w, h); ctx.strokeStyle = C.line; ctx.lineWidth = 1; ctx.strokeRect(x + 0.5, y + 0.5, w - 1, h - 1);
    ctx.fillStyle = C.ink; ctx.fillRect(x, y, w, 3);
    const L = x + 22, R = x + w - 22;
    mono(ctx, 'OCTOBER CLOSE', L, y + 36, 10, C.soft, 1.5);
    wordmark(ctx, wmLight, R - 100, y + 25, 100);
    [['Monthly fee', '$0'], ['Commitments kept', '3 of 3'], ['Forfeit', '$0']].forEach(([k, v], i) => {
      const yy = y + 76 + i * 34;
      text(ctx, '16px AGSans', k, L, yy, C.soft); text(ctx, '20px AGSerif', v, R, yy, C.ink, 'right');
      ctx.fillStyle = C.line; ctx.fillRect(L, yy + 12, R - L, 1);
    });
    mono(ctx, 'YOU PAY', L, y + 222, 11, C.ember, 2);
    text(ctx, '56px AGSerif', '$0', R, y + 228, C.ember, 'right');
  });
})();
