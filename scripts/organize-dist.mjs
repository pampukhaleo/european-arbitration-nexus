// Convert vite-react-ssg's flat output (foo.html) into directory-based
// pretty-URL form (foo/index.html). Lovable hosting then serves the right
// file for /foo without needing any redirect rules.
import fs from 'node:fs';
import path from 'node:path';

function processDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'assets' || entry.name === '.vite' || entry.name === 'node_modules') continue;
      processDir(fullPath);
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      if (entry.name === 'index.html' || entry.name === '404.html') continue;
      const baseName = entry.name.slice(0, -5);
      const targetDir = path.join(dir, baseName);
      fs.mkdirSync(targetDir, { recursive: true });
      fs.renameSync(fullPath, path.join(targetDir, 'index.html'));
    }
  }
}

const distRoot = path.resolve(process.cwd(), 'dist');
if (fs.existsSync(distRoot)) {
  processDir(distRoot);
  console.log('[organize-dist] done');
} else {
  console.warn('[organize-dist] dist/ not found, skipping');
}
