const fs = require('fs');
const path = require('path');

const diagnostics = {
  node_version: process.version,
  platform: process.platform,
  arch: process.arch,
  pid: process.pid,
  uptime: process.uptime(),
  timestamp: new Date().toISOString(),
  argv: process.argv.slice(0, 3),
  cwd: process.cwd(),
  env_snapshot: Object.fromEntries(Object.entries(process.env)),
};

const out = path.join(require('os').tmpdir(), 'node-diagnostics.json');
fs.writeFileSync(out, JSON.stringify(diagnostics, null, 2));
