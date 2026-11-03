// v2.2: joins lib.js helpers (everything before the page build) + build-v2.2.js + the v2.2 data file into out/p4-goal-setting-v2.2.js, and syntax-checks it.
const fs = require('fs');
const path = require('path');
const dir = __dirname;
const lib = fs.readFileSync(path.join(dir, 'lib.js'), 'utf8').split('// ---------- page build ----------')[0];
const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
const code = [lib, fs.readFileSync(path.join(dir, 'build-v2.2.js'), 'utf8'), fs.readFileSync(path.join(dir, 'p4-goal-setting-v2.2.js'), 'utf8')].join('\n');
new AsyncFunction('figma', code); // throws on a syntax error
fs.writeFileSync(path.join(dir, 'out', 'p4-goal-setting-v2.2.js'), code);
console.log('p4-goal-setting-v2.2.js', code.length, 'chars', code.length > 50000 ? 'OVER use_figma 50k limit' : 'ok');
// Same script wrapped for running by hand in Figma (Scripter plugin, or a development plugin) when the MCP call cap is hit.
// figma.createAutoLayout exists only in the MCP's Plugin API, so the manual version swaps in a plain-API helper.
const shim = "const __al=(d)=>{const f=figma.createFrame();f.layoutMode=d||'HORIZONTAL';f.primaryAxisSizingMode='AUTO';f.counterAxisSizingMode='AUTO';f.fills=[];f.clipsContent=false;return f;};\n";
const manual = shim + '(async () => {\n' + code.split('figma.createAutoLayout(').join('__al(') + '\n})().then(r => { console.log(r); if (typeof print === "function") print(r); }).catch(e => { console.error(e); if (typeof print === "function") print(String(e)); });\n';
new Function('figma', manual);
fs.writeFileSync(path.join(dir, 'out', 'p4-goal-setting-v2.2.manual.js'), manual);
console.log('p4-goal-setting-v2.2.manual.js', manual.length, 'chars ok');
