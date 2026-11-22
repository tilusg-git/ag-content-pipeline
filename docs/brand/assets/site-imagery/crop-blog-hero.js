// Crops a Field notes (blog) hero photo into the four sizes the article spec needs
// (specs/blog-content-guide-authorship-schema-imagery-seo-2026-07-16.md §3.1; imagery guideline §7):
//   out/blog-<slug>-16x9.jpg  1600×900   Article schema image, article hero
//   out/blog-<slug>-4x3.jpg   1200×900   Article schema image
//   out/blog-<slug>-1x1.jpg   1080×1080  Article schema image
//   out/blog-<slug>-og.jpg    1200×630   og:image / Twitter card, with the monogram badge bottom-right
// Only the share (og) crop carries the mark: it's the one image seen away from the site. The on-page
// hero crops stay clean (imagery guideline §7: no marks baked into website photos). The badge is the
// ratified dark monogram (bone italic A, ember tally, ink square), drawn by us, never by the image model.
// It also copies the original into source/ so the manifest can point at it.
//
// Usage: node docs/brand/assets/site-imagery/crop-blog-hero.js <source image> <slug> [focusX focusY]
//   focusX/focusY: the point every crop centers on, as fractions of the source (0..1). Default 0.5 0.5.
//   Example: node .../crop-blog-hero.js "G:/My Drive/Website Images/Blog heroes/weekly-check-in.jpg" weekly-check-in 0.45 0.5
// After running: read the four crops to check them (faces, garbled text), then add a row to manifest.md.
const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage } = require('../facebook/node_modules/@napi-rs/canvas');

const [src, slug, fx = '0.5', fy = '0.5'] = process.argv.slice(2);
if (!src || !slug || !/^[a-z0-9-]+$/.test(slug)) {
  console.error('Usage: node crop-blog-hero.js <source image> <slug> [focusX focusY]  (slug: lowercase, digits, hyphens)');
  process.exit(1);
}
const focus = [Number(fx), Number(fy)];
if (focus.some(v => !(v >= 0 && v <= 1))) { console.error('focusX and focusY must be between 0 and 1'); process.exit(1); }

const SIZES = [
  ['16x9', 1600, 900],
  ['4x3', 1200, 900],
  ['1x1', 1080, 1080],
  ['og', 1200, 630],
];
// Badge on the og crop: 72 px square (the tally bar stays visible above 32 px, brand standards §3/§12),
// inset 40 px from the bottom and right edges (about the 6% chrome margin of the social cards).
const BADGE = { size: 72, inset: 40, file: path.join(__dirname, '..', 'monogram', 'monogram-dark.svg') };

(async () => {
  const dir = __dirname;
  const img = await loadImage(fs.readFileSync(src));
  const W = img.width, H = img.height;
  fs.mkdirSync(path.join(dir, 'out'), { recursive: true });
  fs.mkdirSync(path.join(dir, 'source'), { recursive: true });
  const srcCopy = path.join(dir, 'source', `blog-${slug}${path.extname(src).toLowerCase() || '.jpg'}`);
  fs.copyFileSync(src, srcCopy);
  console.log(`source ${W}×${H} → ${path.relative(dir, srcCopy)}`);
  for (const [name, w, h] of SIZES) {
    // Largest crop of the target ratio that fits the source, centered on the focus point and clamped to the edges.
    const ratio = w / h;
    let cw = W, ch = W / ratio;
    if (ch > H) { ch = H; cw = H * ratio; }
    const cx = Math.min(Math.max(focus[0] * W - cw / 2, 0), W - cw);
    const cy = Math.min(Math.max(focus[1] * H - ch / 2, 0), H - ch);
    const canvas = createCanvas(w, h);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, cx, cy, cw, ch, 0, 0, w, h);
    if (name === 'og') {
      const badge = await loadImage(fs.readFileSync(BADGE.file));
      ctx.drawImage(badge, w - BADGE.inset - BADGE.size, h - BADGE.inset - BADGE.size, BADGE.size, BADGE.size);
    }
    const buf = await canvas.encode('jpeg', 85);
    const out = path.join(dir, 'out', `blog-${slug}-${name}.jpg`);
    fs.writeFileSync(out, buf);
    const upscale = cw < w ? ' (UPSCALED: source too small for this size)' : '';
    console.log(`${name.padEnd(5)} ${w}×${h}  crop [${Math.round(cx)}, ${Math.round(cy)}, ${Math.round(cw)}, ${Math.round(ch)}]  ${Math.round(buf.length / 1024)} KB  → out/${path.basename(out)}${upscale}`);
  }
})().catch(e => { console.error(e.message); process.exit(1); });
