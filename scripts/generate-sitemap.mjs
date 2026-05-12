// Generate dist/sitemap.xml from the actual list of pre-rendered HTML pages.
// Skips admin / auth / gallery management routes and adds hreflang alternates
// for each /en|/fr|/ru group.
import fs from 'node:fs';
import path from 'node:path';

const SITE = 'https://chea-taic.be';
const LANGS = ['en', 'fr', 'ru'];
const SKIP_RE = /^\/(auth|admin|gallery\/manage)(\/|$)/;
// Section-level redirect routes (e.g. /en/eac → /en/eac/about). Their HTML
// canonical points elsewhere, so they must NOT appear in the sitemap.
const REDIRECT_SEGMENTS = ['eac', 'arbitration', 'expertise', 'art-expertise', 'membership', 'cookies', 'about'];
const SKIP_LOCALIZED_REDIRECT_RE = new RegExp(
  `^/(en|fr|ru)/(${REDIRECT_SEGMENTS.join('|')})/?$`
);

const distRoot = path.resolve(process.cwd(), 'dist');

function walk(dir, base = '') {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'assets' || entry.name === '.vite') continue;
    const full = path.join(dir, entry.name);
    const rel = base + '/' + entry.name;
    if (entry.isDirectory()) {
      out.push(...walk(full, rel));
    } else if (entry.isFile() && entry.name === 'index.html') {
      out.push(base || '/');
    }
  }
  return out;
}

const allRoutes = walk(distRoot)
  .map((r) => (r === '/' ? '/' : r.replace(/\/+$/, '')))
  .filter((r) => !SKIP_RE.test(r) && !SKIP_LOCALIZED_REDIRECT_RE.test(r));

// Group by path-without-lang so we can emit hreflang alternates.
const groups = new Map(); // key -> { en?: path, fr?: path, ru?: path }
for (const r of allRoutes) {
  const m = r.match(/^\/(en|fr|ru)(\/.*)?$/);
  if (m) {
    const key = m[2] || '/';
    const lang = m[1];
    if (!groups.has(key)) groups.set(key, {});
    groups.get(key)[lang] = `/${lang}${m[2] || ''}`;
  }
  // root and non-localised entries are intentionally skipped from sitemap.
}

const today = new Date().toISOString().split('T')[0];
const urls = [];
for (const [, byLang] of groups) {
  for (const lang of LANGS) {
    const url = byLang[lang];
    if (!url) continue;
    const alternates = LANGS.filter((l) => byLang[l])
      .map(
        (l) =>
          `    <xhtml:link rel="alternate" hreflang="${l}" href="${SITE}${byLang[l]}"/>`
      )
      .join('\n');
    const xDefault = byLang.en
      ? `    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}${byLang.en}"/>`
      : '';
    urls.push(
      [
        '  <url>',
        `    <loc>${SITE}${url}</loc>`,
        `    <lastmod>${today}</lastmod>`,
        '    <changefreq>monthly</changefreq>',
        `    <priority>${url === `/${lang}` ? '1.0' : '0.7'}</priority>`,
        alternates,
        xDefault,
        '  </url>',
      ]
        .filter(Boolean)
        .join('\n')
    );
  }
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`;

fs.mkdirSync(distRoot, { recursive: true });
fs.writeFileSync(path.join(distRoot, 'sitemap.xml'), xml, 'utf8');

const robots = `User-agent: *
Allow: /
Disallow: /auth
Disallow: /admin
Disallow: /gallery/manage

Sitemap: ${SITE}/sitemap.xml
`;
fs.writeFileSync(path.join(distRoot, 'robots.txt'), robots, 'utf8');

console.log(`[generate-sitemap] wrote ${groups.size * LANGS.length} URLs`);
