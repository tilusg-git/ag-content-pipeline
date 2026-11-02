// Joins lib.js with each page data file into paste-ready use_figma scripts in out/, and syntax-checks them.
const fs = require('fs');
const path = require('path');
const dir = __dirname;
const lib = fs.readFileSync(path.join(dir, 'lib.js'), 'utf8');
const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
fs.mkdirSync(path.join(dir, 'out'), { recursive: true });
const jobs = [['00-components-and-log.js', false], ['p4-goal-setting.js', true], ['p7-types-of-personal-goals.js', true]];
for (const [file, withLib] of jobs) {
  const code = (withLib ? lib + '\n' : '') + fs.readFileSync(path.join(dir, file), 'utf8');
  new AsyncFunction('figma', code); // throws on a syntax error
  fs.writeFileSync(path.join(dir, 'out', file), code);
  console.log(file, code.length, 'chars', code.length > 50000 ? 'OVER use_figma 50k limit' : 'ok');
}
