// Ad A creative, round 5: app screens composited into green-screen phone photos (bg/*-green.jpg).
// Finds the green screen (orientation via PCA), renders the app screen to match its size and angle,
// keys it in with a soft green matte (so rounded corners and the camera cutout stay real), despills the edge,
// and adds a faint screen sheen. Then adds the wordmark plate. 1080x1350, plus a 1080x1080 square and a 400x300 thumbnail.
//   node docs/marketing/reddit-ads/build_adA_round5.js
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
const OUT = path.join(__dirname, 'out', 'round5');
const BG = path.join(__dirname, 'bg');
fs.mkdirSync(OUT, { recursive: true });

const C = {
  bone: '#FAFAF7', panel: '#FFFFFF', ink: '#0F0F0E', soft: '#5C5C58', line: '#E5E2DA', ember: '#D8512A', emberSoft: '#F0A98A',
  success: '#1F7A4D', successSoft: '#DCEAE0',
};
const W = 1080, H = 1350;

// ---------- drawing helpers (screen-space units: a 390pt-wide phone, like the real app) ----------
function spaced(ctx, t, x, y, sp) { for (const ch of t) { ctx.fillText(ch, x, y); x += ctx.measureText(ch).width + sp; } return x; }
function spacedW(ctx, t, sp) { let w = 0; for (const ch of t) w += ctx.measureText(ch).width + sp; return w - sp; }
function mono(ctx, t, x, y, size, color, sp = size * 0.14, align = 'left') {
  ctx.font = `${size}px AGMono`; ctx.fillStyle = color;
  if (align === 'center') x -= spacedW(ctx, t, sp) / 2; else if (align === 'right') x -= spacedW(ctx, t, sp);
  return spaced(ctx, t, x, y, sp);
}
function text(ctx, font, t, x, y, color, align = 'left') { ctx.font = font; ctx.fillStyle = color; ctx.textAlign = align; ctx.fillText(t, x, y); ctx.textAlign = 'left'; }
function check(ctx, cx, cy, s, color) { ctx.strokeStyle = color; ctx.lineWidth = Math.max(2, s * 0.13); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(cx - s * 0.28, cy); ctx.lineTo(cx - s * 0.07, cy + s * 0.22); ctx.lineTo(cx + s * 0.3, cy - s * 0.22); ctx.stroke(); }
function pill(ctx, x, y, label, fg, bg, size) {
  ctx.font = `${size}px AGMono`; const w = spacedW(ctx, label, 1.2) + size * 2.6, h = size + 12;
  ctx.fillStyle = bg; ctx.fillRect(x, y, w, h);
  ctx.fillStyle = fg; ctx.beginPath(); ctx.arc(x + size * 0.9, y + h / 2, size * 0.24, 0, Math.PI * 2); ctx.fill();
  mono(ctx, label, x + size * 1.7, y + h / 2 + size * 0.36, size, fg, 1.2); return w;
}
function appBar(s, w, wordmark, top) {
  const ww = w * 0.48; s.drawImage(wordmark, 18, top, ww, ww * (288 / 1700));
  s.fillStyle = C.ink; for (let i = 0; i < 3; i++) s.fillRect(w - 42, top + 6 + i * 7, 22, 3);
  s.fillStyle = C.line; s.fillRect(0, top + 40, w, 1.5);
}

// ---------- screens (drawn in a 390-wide space; top inset clears the camera cutout) ----------
const SCREENS = {
  // R1 — College Friends Group, this week of the cycle
  r1(s, w, h, wm) {
    appBar(s, w, wm, 58);
    mono(s, 'COLLEGE FRIENDS GROUP', 20, 140, 12, C.soft, 1.4);
    mono(s, 'WEEK 3 OF 4', 20, 160, 12, C.ember, 1.4);
    text(s, '34px AGSerif', 'Your goals', 20, 204, C.ink);
    const tw = 80, tg = 6, th = 46, tx = 20;
    const rows = [['Exercise 5 days a week.', ['k', 'k', 'n:3/5', 'f']], ['Read 20 pages a night.', ['k', 'p:75%', 'n:4/7', 'f']], ['Phone-free dinner, 4 nights.', ['k', 'k', 'n:2/4', 'f']]];
    rows.forEach(([g, sts], r) => {
      const y = 236 + r * 118;
      text(s, '22px AGSerif', g, tx, y + 20, C.ink);
      sts.forEach((st, i) => {
        const x = tx + i * (tw + tg), yy = y + 34;
        if (st === 'k') { s.fillStyle = C.ink; s.fillRect(x, yy, tw, th); check(s, x + tw / 2, yy + th / 2, 28, C.bone); }
        else if (st.startsWith('n')) { s.fillStyle = C.panel; s.fillRect(x, yy, tw, th); s.strokeStyle = C.ember; s.lineWidth = 2; s.setLineDash([5, 4]); s.strokeRect(x + 1, yy + 1, tw - 2, th - 2); s.setLineDash([]); mono(s, st.slice(2), x + tw / 2, yy + th / 2 + 6, 16, C.ember, 1, 'center'); }
        else if (st.startsWith('p')) { s.fillStyle = C.emberSoft; s.fillRect(x, yy, tw, th); mono(s, st.slice(2), x + tw / 2, yy + th / 2 + 6, 16, C.ink, 1, 'center'); }
        else { s.strokeStyle = C.line; s.lineWidth = 1.5; s.setLineDash([4, 4]); s.strokeRect(x + 1, yy + 1, tw - 2, th - 2); s.setLineDash([]); }
      });
    });
    s.fillStyle = C.ink; s.fillRect(20, 610, w - 40, 1.5);
    mono(s, 'AT STAKE', 20, 646, 13, C.ember, 2);
    text(s, '64px AGSerif', '$20', 20, 714, C.ink);
    mono(s, 'CLOSES OCT 31', w - 20, 646, 12, C.soft, 1.4, 'right');
  },
  // R3 — 40+ Men's Group, Marcus's October report
  r3(s, w, h, wm) {
    appBar(s, w, wm, 58);
    mono(s, "40+ MEN'S GROUP · OCTOBER", 20, 140, 12, C.soft, 1.4);
    text(s, '40px AGSerif', 'Marcus', 20, 190, C.ink);
    pill(s, 20, 206, 'SUBMITTED · 100% KEPT', C.success, C.successSoft, 11);
    [['KEPT', '2/2', C.ink], ['FORFEIT', '$0', C.ember]].forEach(([k, v, col], i) => { const x = 20 + i * 150; mono(s, k, x, 272, 12, i ? C.ember : C.soft, 1.6); text(s, '40px AGSerif', v, x, 316, col); });
    s.fillStyle = C.line; s.fillRect(20, 340, w - 40, 1.5);
    mono(s, 'FITNESS', 20, 374, 12, C.soft, 1.6);
    text(s, '28px AGSerif', 'Exercise 5 days a week.', 20, 410, C.ink);
    const ds = 42, dg = 7;
    ['M', 'T', 'W', 'T', 'F', 'S', 'S'].forEach((d, i) => {
      const x = 20 + i * (ds + dg), yy = 448;
      mono(s, d, x + ds / 2, yy - 8, 11, C.soft, 0, 'center');
      const st = ['k', 'k', 'x', 'k', 'k', 'k', 'o'][i];
      if (st === 'k') { s.fillStyle = C.ink; s.fillRect(x, yy, ds, ds); check(s, x + ds / 2, yy + ds / 2, 26, C.bone); }
      else if (st === 'x') { s.fillStyle = C.panel; s.fillRect(x, yy, ds, ds); s.strokeStyle = C.ember; s.lineWidth = 2; s.strokeRect(x + 1, yy + 1, ds - 2, ds - 2); s.lineWidth = 3; s.lineCap = 'round'; s.beginPath(); s.moveTo(x + 14, yy + 14); s.lineTo(x + ds - 14, yy + ds - 14); s.moveTo(x + ds - 14, yy + 14); s.lineTo(x + 14, yy + ds - 14); s.stroke(); }
      else { s.strokeStyle = C.line; s.lineWidth = 1.5; s.strokeRect(x + 1, yy + 1, ds - 2, ds - 2); }
    });
    pill(s, 20, 512, 'KEPT · 100%', C.success, C.successSoft, 11);
    mono(s, 'WHAT HAPPENED', 20, 580, 12, C.soft, 1.6);
    text(s, '22px AGSerif', 'Missed Wednesday, traveling.', 20, 612, C.ink);
    text(s, '22px AGSerif', 'Made it up Saturday morning.', 20, 640, C.ink);
  },
  // R5 — East Coast Study Group, cycle header with the money at stake
  r5(s, w, h, wm) {
    appBar(s, w, wm, 58);
    mono(s, 'EAST COAST STUDY GROUP', 20, 140, 12, C.soft, 1.4);
    text(s, '38px AGSerif', 'October closes', 20, 192, C.ink);
    text(s, '38px AGSerif', 'in 9 days.', 20, 236, C.ember);
    mono(s, 'AT STAKE', 20, 290, 13, C.ember, 2);
    text(s, '86px AGSerif', '$20', 20, 374, C.ember);
    s.fillStyle = C.line; s.fillRect(20, 404, w - 40, 1.5);
    mono(s, 'YOUR GOAL', 20, 440, 12, C.soft, 1.6);
    text(s, '28px AGSerif', 'Study 10 hours a week.', 20, 476, C.ink);
    const bw = w - 40; s.fillStyle = C.line; s.fillRect(20, 498, bw, 14); s.fillStyle = C.ink; s.fillRect(20, 498, bw * (29 / 44), 14);
    mono(s, '29 OF 44 HRS', 20, 538, 12, C.ink, 1.4); mono(s, '15 TO GO', w - 20, 538, 12, C.ember, 1.4, 'right');
    text(s, '28px AGSerif', 'Two practice exams a week.', 20, 600, C.ink);
    s.fillStyle = C.line; s.fillRect(20, 622, bw, 14); s.fillStyle = C.ink; s.fillRect(20, 622, bw * (6 / 9), 14);
    mono(s, '6 OF 9 EXAMS', 20, 662, 12, C.ink, 1.4); mono(s, '3 TO GO', w - 20, 662, 12, C.ember, 1.4, 'right');
    s.fillStyle = C.panel; s.fillRect(20, 694, w - 40, 96); s.strokeStyle = C.line; s.lineWidth = 1.5; s.strokeRect(20, 694, w - 40, 96);
    mono(s, 'IF YOU MISS', 36, 724, 11, C.soft, 1.6);
    text(s, '21px AGSerif', '$20 goes to the group kitty.', 36, 752, C.ink);
    text(s, '21px AGSerif', 'Not to us.', 36, 778, C.ink);
  },
};

// ---------- compositing ----------
function greenAlpha(r, g, b) { const d = g - Math.max(r, b); return Math.max(0, Math.min(1, (d - 50) / 70)); }

// h = 1350 (portrait) or 1080 (square). The square shrinks the photo so the phone clears the wordmark,
// but never below what still covers the canvas. thumb = also save a 400x300 crop of the screen's top half.
async function build(key, bgFile, zoom, wordmark, outName, straighten = false, shiftX = 0, h = H, thumbName = null) {
  const img = await loadImage(path.join(BG, bgFile));
  const c = createCanvas(W, h); const ctx = c.getContext('2d');
  // cover-fit, then zoom toward the green screen's center
  const base = Math.max(W / img.width, H / img.height);
  const tmp = createCanvas(img.width, img.height); const tctx = tmp.getContext('2d'); tctx.drawImage(img, 0, 0);
  const src = tctx.getImageData(0, 0, img.width, img.height).data;
  let sx = 0, sy = 0, n = 0;
  for (let y = 0; y < img.height; y += 2) for (let x = 0; x < img.width; x += 2) { const i = (y * img.width + x) * 4; if (greenAlpha(src[i], src[i + 1], src[i + 2]) > 0.9) { sx += x; sy += y; n++; } }
  const gcx = sx / n, gcy = sy / n, cy0 = h * 0.46;
  const cover = Math.max((W / 2 + shiftX) / gcx, (W / 2 - shiftX) / (img.width - gcx), cy0 / gcy, (h - cy0) / (img.height - gcy)) * (straighten ? 1.15 : 1); // a straightened (rotated) photo needs extra margin to keep its corners off-canvas
  const s = Math.max(base * zoom, cover);
  let srcAng = 0;
  if (straighten) { // orientation of the green screen in the source photo (PCA)
    let a = 0, b = 0, cxy = 0;
    for (let y = 0; y < img.height; y += 2) for (let x = 0; x < img.width; x += 2) { const i = (y * img.width + x) * 4; if (greenAlpha(src[i], src[i + 1], src[i + 2]) > 0.9) { const X = x - gcx, Y = y - gcy; a += X * X; b += Y * Y; cxy += X * Y; } }
    srcAng = 0.5 * Math.atan2(2 * cxy, a - b) - Math.PI / 2;
    if (srcAng < -Math.PI / 2) srcAng += Math.PI; if (srcAng > Math.PI / 2) srcAng -= Math.PI;
  }
  ctx.save(); ctx.translate(W / 2 + shiftX, cy0); ctx.rotate(-srcAng); ctx.scale(s, s); ctx.drawImage(img, -gcx, -gcy); ctx.restore();

  // measure the screen on the composed canvas: centroid + PCA orientation + extents
  const id = ctx.getImageData(0, 0, W, h); const d = id.data;
  const A = new Float32Array(W * h);
  let mx = 0, my = 0, m = 0;
  for (let p = 0; p < W * h; p++) { const a = greenAlpha(d[p * 4], d[p * 4 + 1], d[p * 4 + 2]); A[p] = a; if (a > 0.9) { mx += p % W; my += (p / W) | 0; m++; } }
  mx /= m; my /= m;
  let sxx = 0, syy = 0, sxy = 0;
  for (let p = 0; p < W * h; p++) if (A[p] > 0.9) { const x = (p % W) - mx, y = ((p / W) | 0) - my; sxx += x * x; syy += y * y; sxy += x * y; }
  let theta = 0.5 * Math.atan2(2 * sxy, sxx - syy); // major axis
  let ang = theta - Math.PI / 2; // screen "up" axis is the major axis; rotation of the screen from vertical
  if (ang < -Math.PI / 2) ang += Math.PI; if (ang > Math.PI / 2) ang -= Math.PI;
  const ux = Math.cos(ang), uy = Math.sin(ang); // screen x-axis
  let minU = 1e9, maxU = -1e9, minV = 1e9, maxV = -1e9;
  for (let p = 0; p < W * h; p++) if (A[p] > 0.5) { const x = (p % W) - mx, y = ((p / W) | 0) - my; const u = x * ux + y * uy, v = -x * uy + y * ux; if (u < minU) minU = u; if (u > maxU) maxU = u; if (v < minV) minV = v; if (v > maxV) maxV = v; }
  const sw = maxU - minU + 4, sh = maxV - minV + 4;
  console.log(`${key}: screen ${Math.round(sw)}x${Math.round(sh)} at ${(ang * 180 / Math.PI).toFixed(1)}°`);

  // render the app screen at high resolution in a 390-wide design space, then place it
  const DW = 390, DH = 390 * (sh / sw), RS = 3;
  const scr = createCanvas(DW * RS, Math.round(DH * RS)); const sctx = scr.getContext('2d');
  sctx.scale(RS, RS); sctx.fillStyle = C.bone; sctx.fillRect(0, 0, DW, DH);
  SCREENS[key](sctx, DW, DH, wordmark);
  // faint diagonal sheen so the screen reads as glass, not a sticker
  sctx.fillStyle = 'rgba(255,255,255,0.06)'; sctx.beginPath(); sctx.moveTo(DW * 0.55, 0); sctx.lineTo(DW, 0); sctx.lineTo(DW, DH * 0.32); sctx.closePath(); sctx.fill();
  const layer = createCanvas(W, h); const lctx = layer.getContext('2d');
  lctx.translate(mx + ((minU + maxU) / 2) * ux - ((minV + maxV) / 2) * uy, my + ((minU + maxU) / 2) * uy + ((minV + maxV) / 2) * ux);
  lctx.rotate(ang);
  lctx.drawImage(scr, -sw / 2, -sh / 2, sw, sh);
  const L = lctx.getImageData(0, 0, W, h).data;
  // key it in with the green matte, despill the fringe, and match the scene's light a touch
  const dim = key === 'r3' ? 0.93 : 0.97;
  for (let p = 0; p < W * h; p++) {
    const a = A[p]; const i = p * 4;
    if (a <= 0) continue;
    const r = d[i], g = Math.min(d[i + 1], Math.max(d[i], d[i + 2]) + 10), b = d[i + 2];
    d[i] = L[i] * dim * a + r * (1 - a); d[i + 1] = L[i + 1] * dim * a + g * (1 - a); d[i + 2] = L[i + 2] * dim * a + b * (1 - a);
  }
  // despill any green halo just outside the matte
  for (let p = 0; p < W * h; p++) { const i = p * 4; if (A[p] === 0 && d[i + 1] > Math.max(d[i], d[i + 2]) + 25) d[i + 1] = Math.max(d[i], d[i + 2]) + 6; }
  ctx.putImageData(id, 0, 0);

  // wordmark on a bone plate, lower right
  const ww = 300, wh = ww * (288 / 1700), px = W - ww - 56, py = h - wh - 52;
  ctx.fillStyle = C.bone; ctx.beginPath(); ctx.roundRect(px - 26, py - 20, ww + 52, wh + 40, 10); ctx.fill();
  ctx.drawImage(wordmark, px, py, ww, wh);
  const f = path.join(OUT, outName); fs.writeFileSync(f, c.toBuffer('image/png')); console.log('wrote', path.relative(ROOT, f));
  if (thumbName) { // 4:3 crop around the top half of the screen (the headline numbers), downsampled to 400x300
    const cw = sw * 1.5, chh = cw * 0.75, ccx = mx, ccy = my - sh * 0.22;
    const t = createCanvas(400, 300), tx = t.getContext('2d'); tx.imageSmoothingEnabled = true; tx.imageSmoothingQuality = 'high';
    tx.drawImage(c, ccx - cw / 2, ccy - chh / 2, cw, chh, 0, 0, 400, 300);
    const tf = path.join(OUT, thumbName); fs.writeFileSync(tf, t.toBuffer('image/png')); console.log('wrote', path.relative(ROOT, tf));
  }
}

(async () => {
  const wordmark = await loadImage(path.join(ROOT, 'docs/brand/assets/wordmark/wordmark-a-light@2x.png'));
  // [key, background, portrait zoom, square zoom, straighten, file stem]
  for (const [key, bg, zoom, zoomSq, straighten, stem] of [
    ['r3', 'r3-gym-green.jpg', 1.45, 1.0, false, 'R3v3_report-in-the-gym'],
    ['r1', 'r1-desk-green.jpg', 1.32, 0.9, true, 'R1v3_personal-goals-desk'],
    ['r5', 'r5-money-green.jpg', 1.15, 0.85, false, 'R5v3_money-at-stake-desk'],
  ]) {
    await build(key, bg, zoom, wordmark, `${stem}_1080x1350.png`, straighten, 0, H, `${stem}_thumb_400x300.png`);
    await build(key, bg, zoomSq, wordmark, `${stem}_1080x1080.png`, straighten, 0, 1080);
  }
})();
