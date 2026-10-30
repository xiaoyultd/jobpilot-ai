import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(root, 'dist');
let html = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(dist, 'styles.css'), 'utf8');
const js = fs.readFileSync(path.join(dist, 'app.js'), 'utf8');
const directoryJs = fs.readFileSync(path.join(dist, 'company-directory.js'), 'utf8');

html = html
  .replace(/\s*<link rel="manifest"[^>]*>/, '')
  .replace(/\s*<link rel="icon"[^>]*>/, '')
  .replace(/\s*<link rel="stylesheet" href="styles\.css">/, `\n  <style>${css}</style>`)
  .replace(/\s*<script src="app\.js"><\/script>/, `\n  <script>${js.replace(/<\/script>/gi, '<\\/script>')}</script>\n  <script>${directoryJs.replace(/<\/script>/gi, '<\\/script>')}</script>`);

fs.writeFileSync(path.join(root, '职途AI-手机直接打开.html'), html, 'utf8');
console.log('已生成：职途AI-手机直接打开.html');
