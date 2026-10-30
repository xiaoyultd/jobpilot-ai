import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'dist');
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/manifest+json',
  '.webmanifest': 'application/manifest+json',
  '.svg': 'image/svg+xml',
};

const server = http.createServer((req, res) => {
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  } catch {
    res.writeHead(400);
    res.end('bad request');
    return;
  }

  if (pathname === '/') pathname = '/index.html';
  const file = path.resolve(root, `.${pathname}`);
  const relative = path.relative(root, file);
  if (relative.startsWith('..') || path.isAbsolute(relative)) {
    res.writeHead(403);
    res.end('forbidden');
    return;
  }

  fs.readFile(file, (error, data) => {
    if (error) {
      res.writeHead(error.code === 'ENOENT' ? 404 : 500);
      res.end(error.code === 'ENOENT' ? 'not found' : 'server error');
      return;
    }
    res.writeHead(200, {
      'Content-Type': types[path.extname(file)] || 'application/octet-stream',
      'Cache-Control': 'no-store',
    });
    res.end(data);
  });
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error('端口 8081 已被占用。请关闭另一个手机服务窗口后重试。');
  } else {
    console.error(`服务启动失败：${error.message}`);
  }
  process.exitCode = 1;
});

server.listen(8081, '0.0.0.0', () => {
  console.log('手机内网服务已启动，请在手机浏览器输入下面任一地址：');
  const addresses = Object.values(os.networkInterfaces())
    .flatMap((items) => items || [])
    .filter((item) => item.family === 'IPv4' && !item.internal)
    .map((item) => item.address);
  if (addresses.length) {
    for (const address of addresses) console.log(`  http://${address}:8081`);
  } else {
    console.log('  未检测到局域网地址，请确认电脑已连接 Wi-Fi。');
  }
  console.log('电脑本机地址：http://127.0.0.1:8081');
  console.log('保持此窗口打开；按 Ctrl+C 停止服务。');
});
