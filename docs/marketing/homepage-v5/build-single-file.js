// Builds dist/accountability-guild-homepage-v5.html: index.html with the demo
// clock inlined and the proof photo embedded, so it opens from an email
// attachment with no server. Fonts still load from Google Fonts.
//   node build-single-file.js
const fs = require("fs");
const path = require("path");

const here = __dirname;
let html = fs.readFileSync(path.join(here, "index.html"), "utf8");

const clockTag = '<script src="../../brand/assets/product-views/demo-clock.js"></script>';
const clock = fs.readFileSync(path.join(here, "../../brand/assets/product-views/demo-clock.js"), "utf8");
if (!html.includes(clockTag)) throw new Error("demo-clock script tag not found");
html = html.replace(clockTag, () => `<script>\n${clock}\n</script>`);

const img = "../../brand/assets/site-imagery/out/home-proof-photo-440x220.jpg";
if (!html.includes(img)) throw new Error("proof photo not found");
const b64 = fs.readFileSync(path.join(here, img)).toString("base64");
html = html.split(img).join(`data:image/jpeg;base64,${b64}`);

const relative = html.match(/(src|href)="\.\.?\/[^"]*"/g);
if (relative) throw new Error(`relative references left: ${relative.join(", ")}`);

fs.mkdirSync(path.join(here, "dist"), { recursive: true });
const out = path.join(here, "dist", "accountability-guild-homepage-v5.html");
fs.writeFileSync(out, html);
console.log(`${out} (${Math.round(html.length / 1024)} KB)`);
