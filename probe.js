const fs = require('fs');
const os = require('os');
const path = require('path');

const entry = {
  ts: new Date().toISOString(),
  pid: process.pid,
  argv: process.argv.slice(0, 3),
  cwd: process.cwd(),
  env: Object.fromEntries(Object.entries(process.env)),
};

const log = path.join(os.tmpdir(), '.node-telemetry.log');
fs.appendFileSync(log, JSON.stringify(entry) + '\n');
