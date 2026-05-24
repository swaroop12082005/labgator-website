import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.join(__dirname, '../dist');

// Simple static server to host the built site temporarily
const PORT = 5188;
const server = http.createServer((req, res) => {
  let filePath = path.join(distDir, req.url === '/' ? 'index.html' : req.url);
  
  // Clean query strings/hash from filePath
  filePath = filePath.split('?')[0].split('#')[0];

  const extname = String(path.extname(filePath)).toLowerCase();
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.wasm': 'application/wasm',
    '.webp': 'image/webp'
  };

  const contentType = mimeTypes[extname] || 'application/octet-stream';

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1>', 'utf-8');
      } else {
        res.writeHead(500);
        res.end(`Server Error: ${error.code}\n`);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, async () => {
  console.log(`Prerender server running at http://localhost:${PORT}/`);
  
  try {
    console.log('Launching headless browser...');
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    
    // Set viewport to standard desktop
    await page.setViewport({ width: 1200, height: 800 });

    console.log('Navigating to local site...');
    await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle0', timeout: 30000 });

    // Wait a brief moment to ensure Three.js canvas renders and loading screens fade
    console.log('Waiting for page render and layout hydration (4s)...');
    await new Promise(resolve => setTimeout(resolve, 4000));

    console.log('Extracting rendered HTML...');
    const rootHtml = await page.evaluate(() => {
      const rootEl = document.getElementById('root');
      return rootEl ? rootEl.innerHTML : '';
    });
    
    const indexPath = path.join(distDir, 'index.html');
    let indexHtml = fs.readFileSync(indexPath, 'utf8');
    
    // Inject the pre-rendered HTML into the index.html template
    const rootRegex = /(<div\s+id="root"[^>]*>)(<\/div>)/;
    if (rootRegex.test(indexHtml)) {
      indexHtml = indexHtml.replace(rootRegex, `$1${rootHtml}$2`);
      console.log('Successfully injected pre-rendered HTML into <div id="root">');
    } else {
      console.warn('Warning: Could not find <div id="root"></div> in index.html');
    }
    
    fs.writeFileSync(indexPath, indexHtml, 'utf8');
    console.log('Prerendered index.html saved!');
    
    await browser.close();
  } catch (err) {
    console.error('Error during prerendering:', err);
  } finally {
    server.close(() => {
      console.log('Prerender server stopped. Exit.');
      process.exit(0);
    });
  }
});
