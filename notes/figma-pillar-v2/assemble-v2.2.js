// Usage: node assemble-v2.2.js [version, default 2.2] [page prefix, default p4-goal-setting]. Joins lib.js helpers (everything before the page build) + build-v<version>.js + p4-goal-setting-v<version>.js into out/, and syntax-checks it.
const fs = require('fs');
const path = require('path');
const dir = __dirname;
const V = process.argv[2] || '2.2';
const PAGE = process.argv[3] || 'p4-goal-setting'; // data file prefix, e.g. p7-types-of-personal-goals
const BUILD = process.argv[4] || V; // build script version when it differs from the data version: v2.4 data runs on build-v2.3.js (`node assemble-v2.2.js 2.4 p7-types-of-personal-goals 2.3`)
const lib = fs.readFileSync(path.join(dir, 'lib.js'), 'utf8').split('// ---------- page build ----------')[0];
const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
const code = [lib, fs.readFileSync(path.join(dir, `build-v${BUILD}.js`), 'utf8'), fs.readFileSync(path.join(dir, `${PAGE}-v${V}.js`), 'utf8')].join('\n');
new AsyncFunction('figma', code); // throws on a syntax error
fs.writeFileSync(path.join(dir, 'out', `${PAGE}-v${V}.js`), code);
console.log(`${PAGE}-v${V}.js`, code.length, 'chars', code.length > 50000 ? 'OVER use_figma 50k limit' : 'ok');
// Same script wrapped for running by hand in Figma (Scripter plugin, or a development plugin) when the MCP call cap is hit.
// figma.createAutoLayout exists only in the MCP's Plugin API, so the manual version swaps in a plain-API helper.
const shim = "const __al=(d)=>{const f=figma.createFrame();f.layoutMode=d||'HORIZONTAL';f.primaryAxisSizingMode='AUTO';f.counterAxisSizingMode='AUTO';f.fills=[];f.clipsContent=false;return f;};\n";
const manual = shim + '(async () => {\n' + code.split('figma.createAutoLayout(').join('__al(') + '\n})().then(r => { console.log("BUILDRESULT " + JSON.stringify(r)); if (typeof print === "function") print(r); }).catch(e => { console.error("BUILDERROR " + (e && e.stack || e)); if (typeof print === "function") print(String(e)); });\n';
new Function('figma', manual);
fs.writeFileSync(path.join(dir, 'out', `${PAGE}-v${V}.manual.js`), manual);
console.log(`${PAGE}-v${V}.manual.js`, manual.length, 'chars ok');
