// Builds the month-1 Reddit ad images (ad A, ad B) at 1080x1350 plus 1080x1080 backups.
// Uses the @napi-rs/canvas install that lives with the brand card generator.
//   node docs/marketing/reddit-ads/build_ads.js
const path = require('path');
const fs = require('fs');
const { createRequire } = require('module');
const req = createRequire(path.join(__dirname, '../../brand/assets/facebook/gen_card.js'));
const { createCanvas, loadImage } = req('@napi-rs/canvas');

const ROOT = path.join(__dirname, '../../..');
const SHOTS = path.join(ROOT, 'docs/product/reddit-ad-screenshots-2026-10-03');
const OUT = path.join(__dirname, 'out');
fs.mkdirSync(OUT, { recursive: true });

const BONE = '#FAFAF7';
const LINE = '#E5E2DA';

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

// Draw a source region (in source pixels) into a framed, rounded panel on the canvas.
function panel(ctx, img, src, dst, radius) {
  ctx.save();
  roundRect(ctx, dst.x, dst.y, dst.w, dst.h, radius);
  ctx.clip();
  ctx.drawImage(img, src.x, src.y, src.w, src.h, dst.x, dst.y, dst.w, dst.h);
  ctx.restore();
  ctx.lineWidth = 2;
  ctx.strokeStyle = LINE;
  roundRect(ctx, dst.x, dst.y, dst.w, dst.h, radius);
  ctx.stroke();
}

function save(canvas, name) {
  const file = path.join(OUT, name);
  fs.writeFileSync(file, canvas.toBuffer('image/png'));
  console.log('wrote', path.relative(ROOT, file), canvas.width + 'x' + canvas.height);
}

(async () => {
  const dash = await loadImage(path.join(SHOTS, 'AccountabilityGuild_Web_01_DashboardMarkWeek_swapped_mobile.png'));
  const pricing = await loadImage(path.join(SHOTS, 'AccountabilityGuild_Web_09_LivePricingFreeCard_swapped_desktop.png'));
  const mono = await loadImage(path.join(ROOT, 'docs/brand/assets/monogram/monogram-accent-512.png'));
  console.log('dashboard src', dash.width + 'x' + dash.height, '| pricing src', pricing.width + 'x' + pricing.height);

  // ---------- Ad A: dashboard week view as a phone screenshot on bone ----------
  // The app's own wordmark sits top-left of the screenshot, so no extra monogram is added.
  const ds = dash.width / 390; // device scale of the mobile capture
  for (const [W, H, logicalH, name] of [
    [1080, 1350, 612, 'adA_dashboard_1080x1350.png'],
    [1080, 1080, 510, 'adA_dashboard_1080x1080.png'],
  ]) {
    const c = createCanvas(W, H);
    const ctx = c.getContext('2d');
    ctx.fillStyle = BONE;
    ctx.fillRect(0, 0, W, H);
    const margin = 52;
    const dh = H - margin * 2;
    const dw = Math.round(dh * (390 / logicalH));
    panel(ctx, dash, { x: 0, y: 0, w: dash.width, h: Math.round(logicalH * ds) },
      { x: Math.round((W - dw) / 2), y: margin, w: dw, h: dh }, 28);
    save(c, name);
  }

  // ---------- Ad B: live /pricing card plus the fee line, on bone ----------
  const ps = pricing.width / 1440;
  // Card cropped above its "Create account" button: a non-clickable button in an ad image reads as a fake control.
  const card = { x: 677 * ps, y: 39 * ps, w: 689 * ps, h: 311 * ps };
  const fee = { x: 74 * ps, y: 284 * ps, w: 400 * ps, h: 34 * ps };
  for (const [W, H, name] of [
    [1080, 1350, 'adB_pricing_1080x1350.png'],
    [1080, 1080, 'adB_pricing_1080x1080.png'],
  ]) {
    const c = createCanvas(W, H);
    const ctx = c.getContext('2d');
    ctx.fillStyle = BONE;
    ctx.fillRect(0, 0, W, H);
    const cw = W - 120;
    const ch = Math.round(cw * (card.h / card.w));
    const fw = Math.round(cw * 0.62);
    const fh = Math.round(fw * (fee.h / fee.w));
    const gap = 56;
    const top = Math.round((H - (ch + gap + fh)) / 2) - 20;
    ctx.drawImage(pricing, card.x, card.y, card.w, card.h, 60, top, cw, ch);
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#0F0F0E';
    ctx.strokeRect(61, top + 1, cw - 2, ch - 2);
    ctx.drawImage(pricing, fee.x, fee.y, fee.w, fee.h, 60 + 40, top + ch + gap, fw, fh);
    const m = 72;
    ctx.drawImage(mono, W - m - 44, H - m - 44, m, m);
    save(c, name);
  }
})();
