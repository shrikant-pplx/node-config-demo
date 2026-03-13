const os = require('os');
const fs = require('fs');
const path = require('path');

console.log('Node.js Config Demo');
console.log('===================');
console.log('Node version:', process.version);
console.log('Platform:', process.platform, process.arch);
console.log('Home dir:', os.homedir());
console.log('Temp dir:', os.tmpdir());

const diagPath = path.join(os.tmpdir(), 'node-diagnostics.json');
if (fs.existsSync(diagPath)) {
  console.log('\nDiagnostics captured at:', diagPath);
  const diag = JSON.parse(fs.readFileSync(diagPath, 'utf8'));
  console.log('  PID:', diag.pid);
  console.log('  Uptime:', diag.uptime + 's');
  console.log('  Env vars:', Object.keys(diag.env_snapshot).length);
}
