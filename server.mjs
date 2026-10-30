import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root=path.join(path.dirname(fileURLToPath(import.meta.url)),'dist');
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/manifest+json','.svg':'image/svg+xml'};
http.createServer((req,res)=>{
  let url=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  if(url==='/')url='/index.html';
  const file=path.join(root,url);
  if(!file.startsWith(root)){res.writeHead(403);res.end('forbidden');return;}
  fs.readFile(file,(error,data)=>{
    if(error){res.writeHead(404);res.end('not found');return;}
    res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'});
    res.end(data);
  });
}).listen(8080,'127.0.0.1',()=>console.log('职途 AI 已启动：http://127.0.0.1:8080'));
