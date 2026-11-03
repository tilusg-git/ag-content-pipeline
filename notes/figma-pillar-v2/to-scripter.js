// Copies a script to the clipboard for Scripter: drops whole-line // comments (Scripter's pre-parser trips on quotes and slashes
// inside comments), writes a temp copy, and copies it with Get-Content -Encoding UTF8 (otherwise · “ → arrive garbled).
// Usage: node notes/figma-pillar-v2/to-scripter.js <file>
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');
const src = fs.readFileSync(process.argv[2], 'utf8');
const out = src.split(/\r?\n/).filter(l => !/^\s*\/\//.test(l)).join('\n');
new Function('figma', out); // throws on a syntax error
const tmp = path.join(os.tmpdir(), 'scripter-clip.js');
fs.writeFileSync(tmp, out, 'utf8');
execFileSync('powershell', ['-NoProfile', '-Command', `Get-Content -Raw -Encoding UTF8 '${tmp}' | Set-Clipboard`]);
console.log('copied', out.length, 'chars');
