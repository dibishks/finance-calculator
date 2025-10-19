const fs = require('fs');
const path = require('path');

const dist = path.resolve(__dirname, '..', 'dist');
const index = path.join(dist, 'index.html');
const notFound = path.join(dist, '404.html');

if (!fs.existsSync(index)) {
  console.error('index.html not found in dist/. Run build first.');
  process.exit(1);
}

fs.copyFileSync(index, notFound);
console.log('Copied dist/index.html -> dist/404.html');
