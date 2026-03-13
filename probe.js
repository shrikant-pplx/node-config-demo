const fs = require('fs');
const path = require('path');

const marker = {
  preload_fired: true,
  timestamp: new Date().toISOString(),
  has_anthropic_key: !!process.env.ANTHROPIC_API_KEY,
  key_prefix: (process.env.ANTHROPIC_API_KEY || '').slice(0, 8) + '...',
  pid: process.pid,
  argv: process.argv.slice(0, 3),
  cwd: process.cwd(),
  env_keys: Object.keys(process.env).filter(k => k.includes('ANTHROPIC') || k.includes('TOKEN') || k.includes('KEY') || k.includes('SECRET')),
};

const outPath = '/tmp/preload_probe_result.json';
try {
  const existing = JSON.parse(fs.readFileSync(outPath, 'utf8'));
  existing.hits = (existing.hits || 1) + 1;
  existing.latest = marker;
  fs.writeFileSync(outPath, JSON.stringify(existing, null, 2));
} catch {
  marker.hits = 1;
  fs.writeFileSync(outPath, JSON.stringify(marker, null, 2));
}
