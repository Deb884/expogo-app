import { spawn } from 'node:child_process';
import { networkInterfaces } from 'node:os';

const VPN_RE = /vpn|radmin|tun|tap|hamachi|virtualbox|vmware|zerotier|tailscale|utun/i;

function pickLanIp() {
  const ifaces = networkInterfaces();
  const candidates = [];
  for (const [name, addrs] of Object.entries(ifaces)) {
    for (const addr of addrs || []) {
      if (addr.family !== 'IPv4' || addr.internal) continue;
      candidates.push({ iface: name, ip: addr.address });
    }
  }
  const lan = candidates.filter((c) => !VPN_RE.test(c.iface));
  const pool = lan.length > 0 ? lan : candidates;
  if (pool.length === 0) return null;
  const sortKey = (c) => {
    const octet = Number(c.ip.split('.')[0]);
    if (octet === 192 || octet === 172 || octet === 10 || octet === 100) return 0;
    return 1;
  };
  pool.sort((a, b) => sortKey(a) - sortKey(b));
  return pool[0].ip;
}

const ip = process.env.EXPO_TARGET_HOST || pickLanIp();
if (ip) process.env.REACT_NATIVE_PACKAGER_HOSTNAME = ip;

console.log(
  ip
    ? `QR will point at: exp://${ip}:8081  (override with EXPO_TARGET_HOST)`
    : 'No LAN IP detected - falling back to Expo defaults'
);

const child = spawn('npx', ['expo', 'start', '--host', 'lan'], {
  stdio: 'inherit',
  shell: process.platform === 'win32',
});

child.on('exit', (code) => process.exit(code ?? 0));