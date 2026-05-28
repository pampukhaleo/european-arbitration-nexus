// For every pre-rendered EN page (dist/en/<path>/index.html), create a
// redirect stub at dist/<path>/index.html that points search engines to the
// EN canonical. This eliminates 404s for legacy non-language-prefixed URLs
// (e.g. /arbitration/rules, /contacts) that the client-side LegacyPathRedirect
// only handles after hydration.
import fs from 'node:fs';
import path from 'node:path';

const SITE = 'https://chea-taic.be';
const distRoot = path.resolve(process.cwd(), 'dist');
const enRoot = path.join(distRoot, 'en');

// Paths under dist/ that must NOT be overwritten by a redirect stub.
const RESERVED_TOP_LEVEL = new Set([
  'en', 'fr', 'ru',
  'assets', '.vite',
  'auth', 'admin', 'gallery', // SPA-only / non-localised
]);

function walk(dir, base = '') {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    const rel = base ? `${base}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      out.push(...walk(full, rel));
    } else if (entry.isFile() && entry.name === 'index.html') {
      out.push(base); // "" for root index
    }
  }
  return out;
}

function stub(targetUrl) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Redirecting…</title>
<link rel="canonical" href="${targetUrl}">
<meta name="robots" content="noindex,follow">
<meta http-equiv="refresh" content="0;url=${targetUrl}">
<script>location.replace(${JSON.stringify(targetUrl)});</script>
</head>
<body>
<p>Redirecting to <a href="${targetUrl}">${targetUrl}</a>.</p>
</body>
</html>
`;
}

const enPaths = walk(enRoot); // e.g. "", "arbitration/rules", "eac/about"
let created = 0;
let skipped = 0;

for (const rel of enPaths) {
  if (!rel) continue; // skip root (/en) — / already redirects via RootRedirect
  const topSegment = rel.split('/')[0];
  if (RESERVED_TOP_LEVEL.has(topSegment)) {
    skipped++;
    continue;
  }
  const outDir = path.join(distRoot, rel);
  const outFile = path.join(outDir, 'index.html');
  if (fs.existsSync(outFile)) {
    skipped++;
    continue;
  }
  fs.mkdirSync(outDir, { recursive: true });
  const targetUrl = `${SITE}/en/${rel}`;
  fs.writeFileSync(outFile, stub(targetUrl), 'utf8');
  created++;
}

console.log(`[generate-legacy-redirects] created ${created} redirect stubs, skipped ${skipped}`);
