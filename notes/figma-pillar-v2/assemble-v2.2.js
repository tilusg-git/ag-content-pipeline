// Usage: node assemble-v2.2.js [version, default 2.2]. Joins lib.js helpers (everything before the page build) + build-v<version>.js + p4-goal-setting-v<version>.js into out/, and syntax-checks it.
const fs = require('fs');
const path = require('path');
const dir = __dirname;
const V = process.argv[2] || '2.2';
const lib = fs.readFileSync(path.join(dir, 'lib.js'), 'utf8').split('// ---------- page build ----------')[0];
const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
const code = [lib, fs.readFileSync(path.join(dir, `build-v${V}.js`), 'utf8'), fs.readFileSync(path.join(dir, `p4-goal-setting-v${V}.js`), 'utf8')].join('\n');
new AsyncFunction('figma', code); // throws on a syntax error
fs.writeFileSync(path.join(dir, 'out', `p4-goal-setting-v${V}.js`), code);
console.log(`p4-goal-setting-v${V}.js`, code.length, 'chars', code.length > 50000 ? 'OVER use_figma 50k limit' : 'ok');
// Same script wrapped for running by hand in Figma (Scripter plugin, or a development plugin) when the MCP call cap is hit.
// figma.createAutoLayout exists only in the MCP's Plugin API, so the manual version swaps in a plain-API helper.
const shim = "const __al=(d)=>{const f=figma.createFrame();f.layoutMode=d||'HORIZONTAL';f.primaryAxisSizingMode='AUTO';f.counterAxisSizingMode='AUTO';f.fills=[];f.clipsContent=false;return f;};\n";
const manual = shim + '(async () => {\n' + code.split('figma.createAutoLayout(').join('__al(') + '\n})().then(r => { console.log("BUILDRESULT " + JSON.stringify(r)); if (typeof print === "function") print(r); }).catch(e => { console.error("BUILDERROR " + (e && e.stack || e)); if (typeof print === "function") print(String(e)); });\n';
new Function('figma', manual);
fs.writeFileSync(path.join(dir, 'out', `p4-goal-setting-v${V}.manual.js`), manual);
console.log(`p4-goal-setting-v${V}.manual.js`, manual.length, 'chars ok');
