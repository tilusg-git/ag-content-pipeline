#!/usr/bin/env node
/* Accountability Guild — product-view renderer (PNG + animated GIF).
 *
 * Renders real app UI (goal check-in sheet, week board, goal history) with
 * sample data into a branded social frame, for posts and ads. The markup in
 * scenes.js uses the app's own class names and this script inlines the app's
 * own stylesheet (repo/src/styles/components.css), so the output matches the
 * product instead of a redraw of it.
 *
 *   node render.js examples/mark-sheet-kept.json
 *   node render.js examples/week-board.json --gif
 *   node render.js examples/goal-detail.json --size 1080x1080 --theme ink
 *
 * Spec file (JSON):
 *   scene      mark-sheet | week-board | goal-detail      (required)
 *   slug       output file name stem (default: spec file name)
 *   size       "1080x1350" (default, 4:5) | "1080x1080" | any WxH
 *   theme      light (bone canvas, default) | ink (dark canvas)
 *   frame      social (headline + lockup, default) | bare (panel only, transparent PNG)
 *   kicker     mono line above the headline (optional)
 *   headline   serif headline; wrap a word in *asterisks* for the ember italic
 *   zoom       panel magnification (default per scene)
 *   data       the scene's data (see scenes.js for fields per scene)
 *   steps      GIF only: list of { set: { "path.to.field": value }, hold: ms }.
 *              Applied cumulatively to data; each step is one held frame.
 *              The first frame is data as-is, held for `firstHold` ms.
 *   firstHold  ms (default 900)
 *
 * Flags override the spec: --size, --theme, --frame, --zoom, --gif,
 * --gif-width (default 720), --out DIR (default ./out).
 *
 * Needs: Microsoft Edge (Playwright drives it via channel "msedge", so no
 * browser download), Playwright from repo/node_modules, @napi-rs/canvas from
 * ../facebook/node_modules (decodes frames for the GIF), and network access
 * for Google Fonts (Newsreader, Inter Tight, JetBrains Mono — the app's fonts).
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..", "..", "..", "..");
const REPO = path.join(ROOT, "repo");
const { chromium } = require(path.join(REPO, "node_modules", "playwright"));
const scenes = require("./scenes");

function parseArgs(argv) {
  const out = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--gif") out.gif = true;
    else if (a.startsWith("--")) out[a.slice(2)] = argv[++i];
    else out._.push(a);
  }
  return out;
}

function setPath(obj, dotted, value) {
  const keys = dotted.split(".");
  let cur = obj;
  for (const k of keys.slice(0, -1)) cur = cur[k];
  cur[keys.at(-1)] = value;
}

function imageToDataUrl(file, baseDir) {
  const abs = path.resolve(baseDir, file);
  const ext = path.extname(abs).slice(1).toLowerCase().replace("jpg", "jpeg");
  return `data:image/${ext};base64,${fs.readFileSync(abs).toString("base64")}`;
}

// The app's stylesheets, in the app's load order. globals.css is Tailwind input
// and isn't needed; the few Tailwind utilities the report uses are replaced by
// pv-* rules below.
const APP_CSS = ["components.css", "ag-adapter.css"]
  .map((f) => fs.readFileSync(path.join(REPO, "src", "styles", f), "utf8"))
  .join("\n");

// Shared by the frame page and the phone page: the app's CSS plus pv-* stand-ins
// for Tailwind utilities and form controls (rendered as divs so text is static).
const BASE_CSS = `
/* Tailwind preflight subset — the app runs on Tailwind, so its components assume this. */
*,::before,::after{box-sizing:border-box;margin:0;padding:0;border:0 solid}
button,input,textarea{font:inherit;color:inherit;background:transparent}
img{display:block;max-width:100%}
${APP_CSS}
:root{--font-ag-serif:"Newsreader";--font-ag-sans:"Inter Tight";--font-ag-mono:"JetBrains Mono"}
.pv-static-stage{width:420px;max-height:none}
.pv-textarea{min-height:64px;border:1px solid var(--line);background:var(--panel);color:var(--ink);font-family:var(--serif);font-size:16px;line-height:1.45;padding:10px 12px;white-space:pre-wrap}
.pv-placeholder{color:var(--inkSofter)}
.pv-report{width:740px}
.pv-report .report-compose-mast,.pv-report .report-compose-body{padding-left:2rem;padding-right:2rem}
.pv-report .report-compose-grid{grid-template-columns:minmax(0,1fr) 12.5rem;gap:2rem}
.pv-report .report-submit-panel{margin-top:1.5rem;flex-direction:column;align-items:flex-start}
.pv-rows .report-goal-row{padding:.75rem 0}
.pv-rows .report-goal-title-row{margin-top:.25rem}
.pv-rows .report-goal-row:first-of-type{padding-top:0}
.pv-report-goal{width:560px;padding:0}
.pv-help{margin-top:.25rem;font-size:.75rem;color:var(--inkSoft)}
.pv-writeup{display:block;margin-top:.75rem}
.pv-field-textarea{width:100%;min-height:6rem;padding:12px 14px;background:var(--panel);border:1px solid var(--controlLine);font-family:var(--sans);font-size:16px;line-height:1.55;color:var(--ink);white-space:pre-wrap}
@media (max-width:47.999rem){.pv-field-textarea{min-height:8.5rem}}
.pv-caret{display:inline-block;width:1.5px;height:1.05em;background:var(--ink);vertical-align:-.15em;margin-left:1px}
.pv-stack>*+*{margin-top:1.25rem}
.pv-mt3{margin-top:.75rem}
.pv-input{width:100%;padding:12px 14px;background:var(--panel);border:1px solid var(--controlLine);font-family:var(--sans);font-size:14px;color:var(--ink)}
.pv-reflection{width:100%;min-height:13.75rem;border:1px solid var(--line);background:var(--panel);color:var(--ink);font-family:var(--sans);font-size:.9375rem;line-height:1.6;padding:1rem 1.125rem;white-space:pre-wrap}
@media (max-width:47.999rem){.pv-reflection{min-height:8.5rem}}
`;

const FONTS =
  "https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400;1,6..72,500&display=block";

// Maximum panel magnification; the renderer shrinks it to fit the frame.
const DEFAULT_ZOOM = { "mark-sheet": 1.9, "week-board": 1.8, "goal-detail": 1.8, "report-goal": 1.8, "report-close": 1.4 };

function headlineHtml(text) {
  return String(text || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>");
}

function pageHtml(spec, sceneHtml) {
  const [w, h] = spec.size.split("x").map(Number);
  const scene = scenes[spec.scene];
  const ink = spec.theme === "ink";
  const bare = spec.frame === "bare";
  const device = scene.defaults.device;
  return `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="${FONTS}">
<style>
${BASE_CSS}
html,body{margin:0;background:${bare ? "transparent" : ink ? "#0F0F0E" : "#FAFAF7"}}
.pv-canvas{width:${w}px;height:${h}px;display:flex;flex-direction:column;padding:${bare ? "0" : "84px 84px 64px"};
  ${bare ? "align-items:center;justify-content:center;" : ""}color:${ink ? "#FAFAF7" : "#0F0F0E"}}
.pv-kicker{font-family:var(--mono);font-size:20px;letter-spacing:.16em;text-transform:uppercase;color:${ink ? "#F0A98A" : "#5C5C58"};margin-bottom:22px}
.pv-headline{font-family:var(--serif);font-weight:400;font-size:64px;line-height:1.08;letter-spacing:-.01em;max-width:880px}
.pv-headline em{font-style:italic;color:#D8512A}
.pv-stage{flex:1;display:flex;align-items:center;justify-content:center;min-height:0;margin:${bare ? "0" : "44px 0 36px"}}
.pv-zoom{zoom:${spec.zoom}}
.pv-device{background:#FAFAF7;border:1px solid #E5E2DA;padding:22px 24px 6px;box-shadow:0 18px 50px rgba(15,15,14,${ink ? ".5" : ".14"})}
.pv-device .dash-week-board{margin-bottom:0}
.pv-shot{display:block;max-width:none;border:1px solid #E5E2DA;box-shadow:0 18px 50px rgba(15,15,14,${ink ? ".5" : ".14"})}
.pv-foot{display:flex;align-items:baseline;justify-content:space-between;padding-top:28px;border-top:1px solid ${ink ? "#2A2A27" : "#E5E2DA"}}
.pv-lockup{display:flex;align-items:baseline;gap:10px}
.pv-lockup i{font-family:var(--serif);font-size:30px}
.pv-lockup b{font-family:var(--sans);font-weight:600;font-size:17px;letter-spacing:.32em}
.pv-url{font-family:var(--mono);font-size:17px;letter-spacing:.08em;color:${ink ? "#A8A8A2" : "#5C5C58"}}
</style></head><body>
<div class="pv-canvas">
  ${!bare && spec.kicker ? `<div class="pv-kicker">${headlineHtml(spec.kicker)}</div>` : ""}
  ${!bare && spec.headline ? `<h1 class="pv-headline">${headlineHtml(spec.headline)}</h1>` : ""}
  <div class="pv-stage"><div class="pv-zoom"><div id="pv-panel" class="${device ? "pv-device" : ""}">${sceneHtml}</div></div></div>
  ${bare ? "" : `<div class="pv-foot"><span class="pv-lockup"><i>Accountability</i><b>GUILD</b></span><span class="pv-url">accountabilityguild.com</span></div>`}
</div></body></html>`;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const specPath = args._[0];
  if (!specPath) {
    console.error("usage: node render.js <spec.json> [--gif] [--size WxH] [--theme light|ink] [--frame social|bare] [--zoom N]");
    process.exit(1);
  }
  const specDir = path.dirname(path.resolve(specPath));
  const spec = JSON.parse(fs.readFileSync(specPath, "utf8"));
  spec.size = args.size || spec.size || "1080x1350";
  spec.theme = args.theme || spec.theme || "light";
  spec.frame = args.frame || spec.frame || "social";
  spec.zoom = Number(args.zoom || spec.zoom || DEFAULT_ZOOM[spec.scene] || 1.5);
  const scene = scenes[spec.scene];
  if (!scene) throw new Error(`Unknown scene "${spec.scene}". Known: ${Object.keys(scenes).join(", ")}`);

  const slug = spec.slug || path.basename(specPath, ".json");
  const outDir = path.resolve(args.out || path.join(__dirname, "out"));
  fs.mkdirSync(outDir, { recursive: true });
  const suffix = `${spec.size}${spec.theme === "ink" ? "-ink" : ""}${spec.frame === "bare" ? "-bare" : ""}`;

  const resolveImages = (data) => {
    const d = structuredClone(data);
    if (d.photo) d.photoDataUrl = imageToDataUrl(d.photo, specDir);
    return d;
  };

  const browser = await chromium.launch({ channel: "msedge" });
  try {
    if (spec.layout === "mobile") {
      // One spec can produce a carousel: each slide is its own crop of the page.
      const slides = spec.slides || [{ slug, crop: spec.crop }];
      for (const slide of slides) {
        await renderMobile({ browser, spec, scene, crop: slide.crop || {}, slug: slide.slug, outDir, suffix, gif: args.gif, gifWidth: Number(args["gif-width"] || 720), resolveImages });
      }
      return;
    }
    await renderDesktop({ browser, spec, scene, slug, outDir, suffix, gif: args.gif, gifWidth: Number(args["gif-width"] || 720), resolveImages });
  } finally {
    await browser.close();
  }
}

// Steps for GIFs: each yields the data for one held frame, applied cumulatively.
function* frameStates(spec) {
  const data = structuredClone(spec.data);
  yield { data: structuredClone(data), hold: spec.firstHold ?? 900 };
  for (const step of spec.steps || []) {
    for (const [k, v] of Object.entries(step.set || {})) setPath(data, k, v);
    yield { data: structuredClone(data), hold: step.hold ?? 600 };
  }
}

// Mobile: render the scene at phone width (so the app's own mobile CSS
// applies), crop a window of the page starting at `crop.anchor`, then place
// that capture in the frame as an image.
const PHONE_WIDTH = 390;

async function renderMobile({ browser, spec, scene, crop, slug, outDir, suffix, gif, gifWidth, resolveImages }) {
  const [w, h] = spec.size.split("x").map(Number);
  const phone = await browser.newPage({ viewport: { width: PHONE_WIDTH, height: 844 }, deviceScaleFactor: 3 });
  const frame = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: gif ? gifWidth / w : 1 });
  const states = gif ? [...frameStates(spec)] : [{ data: spec.data, hold: 0 }];
  const height = crop.height ?? 700;
  let clipY = null;
  const frames = [];
  for (const state of states) {
    await phone.setContent(mobileHtml(scene.render(resolveImages(state.data))), { waitUntil: "networkidle" });
    await phone.evaluate(() => document.fonts.ready);
    if (clipY === null) {
      // Measured on the first frame and kept, so GIF frames don't jump.
      // Kept inside the page, so every slide in a carousel is the same size.
      clipY = await phone.evaluate(({ anchor, offset, height }) => {
        const pageHeight = document.documentElement.scrollHeight;
        let y = 0;
        if (anchor && anchor !== "top") {
          const el = document.querySelector(anchor);
          if (!el) throw new Error(`crop.anchor ${anchor} not found`);
          y = el.getBoundingClientRect().top + window.scrollY + offset;
        }
        return Math.max(0, Math.min(y, pageHeight - height));
      }, { anchor: crop.anchor, offset: crop.offset ?? -20, height });
    }
    const shot = await phone.screenshot({ fullPage: true, clip: { x: 0, y: clipY, width: PHONE_WIDTH, height } });
    if (spec.frame === "bare") {
      frames.push({ png: shot, hold: state.hold });
      continue;
    }
    if (!frames.length) {
      await frame.setContent(pageHtml({ ...spec, zoom: 1 }, `<img id="pv-shot" class="pv-shot" alt="">`), { waitUntil: "networkidle" });
      await frame.evaluate(() => document.fonts.ready);
    }
    await frame.evaluate(async ({ src }) => {
      const img = document.getElementById("pv-shot");
      img.src = src;
      await img.decode();
      const aspect = img.naturalWidth / img.naturalHeight;
      const stage = document.querySelector(".pv-stage").getBoundingClientRect();
      const width = Math.min(stage.width * 0.98, stage.height * 0.98 * aspect);
      img.style.width = `${width}px`;
      img.style.height = `${width / aspect}px`;
    }, { src: `data:image/png;base64,${shot.toString("base64")}` });
    frames.push({ png: await frame.screenshot(), hold: state.hold });
  }
  await phone.close();
  await frame.close();
  await writeOutput({ frames, gif, outDir, name: `${slug}-${spec.frame === "bare" ? "mobile-bare" : suffix}` });
}

async function writeOutput({ frames, gif, outDir, name }) {
  if (!gif) {
    const file = path.join(outDir, `${name}.png`);
    fs.writeFileSync(file, frames[0].png);
    console.log(file);
    return;
  }
  const file = path.join(outDir, `${name}.gif`);
  fs.writeFileSync(file, await encodeGif(frames));
  console.log(`${file} (${frames.length} frames)`);
}

function mobileHtml(sceneHtml) {
  return `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="${FONTS}">
<style>${BASE_CSS}
html,body{margin:0;background:#FAFAF7}
.pv-mobile{width:${PHONE_WIDTH}px;padding:24px 18px 40px}
</style></head><body><div id="pv-panel" class="pv-mobile">${sceneHtml}</div></body></html>`;
}

async function renderDesktop({ browser, spec, scene, slug, outDir, suffix, gif, gifWidth, resolveImages }) {
  const [w, h] = spec.size.split("x").map(Number);
  {
    const page = await browser.newPage({
      viewport: { width: w, height: h },
      deviceScaleFactor: gif ? gifWidth / w : 1,
    });
    await page.setContent(pageHtml(spec, scene.render(resolveImages(spec.data))), { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    // Fit: largest zoom up to spec.zoom at which the panel fits the space
    // between headline and footer. Measured once, so GIF frames don't jump.
    const fitted = await page.evaluate((maxZoom) => {
      const zoomEl = document.querySelector(".pv-zoom");
      const stage = document.querySelector(".pv-stage").getBoundingClientRect();
      zoomEl.style.zoom = "1";
      const panel = document.getElementById("pv-panel").getBoundingClientRect();
      const z = Math.min(maxZoom, (stage.width * 0.98) / panel.width, (stage.height * 0.98) / panel.height);
      zoomEl.style.zoom = String(z);
      return z;
    }, spec.zoom);
    console.log(`zoom ${fitted.toFixed(2)}`);

    const shoot = async () =>
      spec.frame === "bare"
        ? page.locator("#pv-panel").screenshot({ omitBackground: true })
        : page.screenshot({ omitBackground: false });

    const frames = [];
    for (const state of gif ? frameStates(spec) : [{ data: spec.data, hold: 0 }]) {
      if (frames.length) {
        await page.evaluate((markup) => {
          document.getElementById("pv-panel").innerHTML = markup;
        }, scene.render(resolveImages(state.data)));
        await page.evaluate(() => document.fonts.ready);
      }
      frames.push({ png: await shoot(), hold: state.hold });
    }
    await page.close();
    await writeOutput({ frames, gif, outDir, name: `${slug}-${suffix}` });
  }
}

async function encodeGif(frames) {
  const { createCanvas, loadImage } = require(path.join(__dirname, "..", "facebook", "node_modules", "@napi-rs", "canvas"));
  const { GIFEncoder, quantize, applyPalette } = require(path.join(__dirname, "..", "social", "vendor", "gifenc.js"));
  const decoded = [];
  for (const f of frames) {
    const img = await loadImage(f.png);
    const c = createCanvas(img.width, img.height);
    const ctx = c.getContext("2d");
    ctx.drawImage(img, 0, 0);
    decoded.push({ rgba: ctx.getImageData(0, 0, img.width, img.height).data, w: img.width, h: img.height, hold: f.hold });
  }
  // One shared palette from the first and last frames keeps flat brand colors
  // from shifting between frames.
  const first = decoded[0].rgba;
  const last = decoded.at(-1).rgba;
  const sample = new Uint8ClampedArray(first.length + last.length);
  sample.set(first, 0);
  sample.set(last, first.length);
  const palette = quantize(sample, 256);
  const gif = GIFEncoder();
  decoded.forEach((f, i) => {
    gif.writeFrame(applyPalette(f.rgba, palette), f.w, f.h, { palette: i === 0 ? palette : undefined, delay: f.hold, repeat: 0 });
  });
  gif.finish();
  return Buffer.from(gif.bytes());
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
