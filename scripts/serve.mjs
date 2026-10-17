import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve('dist'),port=Number(process.env.PORT||4173),prefix=process.env.BASE_PATH||'/toolStudio/';
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.webmanifest':'application/manifest+json','.svg':'image/svg+xml','.gz':'application/gzip'};
const server=http.createServer((req,res)=>{let url;try{url=decodeURIComponent(new URL(req.url,'http://localhost').pathname)}catch{res.writeHead(400).end();return}if(!url.startsWith(prefix)){res.writeHead(404).end();return}const rel=url.slice(prefix.length)||'index.html',file=path.resolve(root,rel);if(!file.startsWith(root+path.sep)||!fs.existsSync(file)||!fs.statSync(file).isFile()){res.writeHead(404).end();return}res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});fs.createReadStream(file).pipe(res)});
server.listen(port,'127.0.0.1',()=>console.log('Tool Studio: http://127.0.0.1:'+port+prefix));
