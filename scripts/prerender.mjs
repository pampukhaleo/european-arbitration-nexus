#!/usr/bin/env node
/**
 * Per-route static head generator.
 *
 * Reads dist/index.html (built by Vite) and writes a copy at
 * dist/<path>/index.html for each URL listed in public/sitemap.xml,
 * with localized <title>, <meta description>, <link canonical>,
 * <link rel="alternate" hreflang>, og:*, twitter:* and a localized <h1>
 * baked into the markup.
 *
 * Lovable's static hosting will serve those files directly for the
 * matching paths, so crawlers without JavaScript see the correct
 * per-route SEO tags. The React app continues to hydrate on top.
 *
 * Routes not covered (admin, /auth, gallery/manage, /gallery/:id/access/:token,
 * arbitrary /gallery/:id) keep falling back to the SPA index.html as before.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { ROUTE_META, SITE, OG_LOCALE, HTML_LANG_ATTR, fallbackMeta } from "./seo-metadata.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");
const SITEMAP = path.join(ROOT, "public", "sitemap.xml");

const SUPPORTED = ["en", "fr", "ru"];

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function parseSitemap(xml) {
  const out = [];
  const re = /<loc>([^<]+)<\/loc>/g;
  let m;
  while ((m = re.exec(xml))) {
    const url = m[1].trim();
    try {
      const u = new URL(url);
      const segs = u.pathname.split("/").filter(Boolean);
      const lang = segs[0];
      if (!SUPPORTED.includes(lang)) continue;
      const rest = "/" + segs.slice(1).join("/");
      out.push({
        url,
        lang,
        pathname: u.pathname.replace(/\/+$/, "") || `/${lang}`,
        pathWithoutLang: rest === "/" ? "" : rest,
      });
    } catch {
      /* ignore malformed */
    }
  }
  return out;
}

function buildHead({ lang, pathWithoutLang, url }) {
  const meta = ROUTE_META[pathWithoutLang] || fallbackMeta(pathWithoutLang, lang);
  const title = meta.title[lang] || meta.title.en;
  const desc = meta.description[lang] || meta.description.en;
  const ogLocale = OG_LOCALE[lang];
  const image = SITE.defaultImage;

  const altUrl = (l) =>
    `${SITE.baseUrl}/${l}${pathWithoutLang}`.replace(/\/+$/, "") || `${SITE.baseUrl}/${l}`;

  return `
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(desc)}" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="${url}" />
  <link rel="alternate" hreflang="en" href="${altUrl("en")}" />
  <link rel="alternate" hreflang="fr" href="${altUrl("fr")}" />
  <link rel="alternate" hreflang="ru" href="${altUrl("ru")}" />
  <link rel="alternate" hreflang="x-default" href="${altUrl("en")}" />
  <meta property="og:title" content="${escapeHtml(title)}" />
  <meta property="og:description" content="${escapeHtml(desc)}" />
  <meta property="og:image" content="${image}" />
  <meta property="og:url" content="${url}" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="${escapeHtml(SITE.siteName)}" />
  <meta property="og:locale" content="${ogLocale}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="${SITE.twitter}" />
  <meta name="twitter:title" content="${escapeHtml(title)}" />
  <meta name="twitter:description" content="${escapeHtml(desc)}" />
  <meta name="twitter:image" content="${image}" />
  <meta name="x-prerendered" content="true" />`;
}

function rewriteHtml(template, route) {
  const meta = ROUTE_META[route.pathWithoutLang] || fallbackMeta(route.pathWithoutLang, route.lang);
  const h1 = meta.h1[route.lang] || meta.h1.en;
  const head = buildHead(route);

  let html = template;

  // Set <html lang="...">
  html = html.replace(/<html\s+lang="[^"]*"/, `<html lang="${HTML_LANG_ATTR[route.lang]}"`);

  // Strip every static SEO tag that the original index.html ships with so we
  // can replace them cleanly with our per-route block.
  html = html.replace(/\n?\s*<title>[\s\S]*?<\/title>/i, "");
  html = html.replace(/\n?\s*<meta\s+name="description"[^>]*>/gi, "");
  html = html.replace(/\n?\s*<meta\s+name="robots"[^>]*>/gi, "");
  html = html.replace(/\n?\s*<link\s+rel="canonical"[^>]*>/gi, "");
  html = html.replace(/\n?\s*<link\s+rel="alternate"\s+hreflang="[^"]*"[^>]*>/gi, "");
  html = html.replace(/\n?\s*<meta\s+property="og:[^"]+"[^>]*>/gi, "");
  html = html.replace(/\n?\s*<meta\s+name="twitter:[^"]+"[^>]*>/gi, "");

  // Inject the per-route head block right before </head>.
  html = html.replace("</head>", `${head}\n</head>`);

  // Replace the SSR <h1> with the localized one.
  html = html.replace(
    /<h1\s+id="ssr-h1"[^>]*>[\s\S]*?<\/h1>/,
    `<h1 id="ssr-h1" class="sr-only">${escapeHtml(h1)}</h1>`
  );

  return html;
}

async function writeRoute(template, route) {
  const out = rewriteHtml(template, route);
  // /en  -> dist/en/index.html
  // /fr/eac/about -> dist/fr/eac/about/index.html
  const dir = path.join(DIST, route.pathname.replace(/^\//, ""));
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, "index.html"), out, "utf8");
}

async function main() {
  const [template, sitemap] = await Promise.all([
    fs.readFile(path.join(DIST, "index.html"), "utf8"),
    fs.readFile(SITEMAP, "utf8"),
  ]);

  const routes = parseSitemap(sitemap);
  if (routes.length === 0) {
    console.warn("[prerender] No routes parsed from sitemap.xml — nothing to do.");
    return;
  }

  // De-duplicate by pathname.
  const seen = new Set();
  const unique = routes.filter((r) => {
    if (seen.has(r.pathname)) return false;
    seen.add(r.pathname);
    return true;
  });

  let ok = 0;
  for (const r of unique) {
    try {
      await writeRoute(template, r);
      ok += 1;
    } catch (e) {
      console.error(`[prerender] Failed for ${r.pathname}:`, e.message);
    }
  }
  console.log(`[prerender] Wrote ${ok}/${unique.length} static HTML files into dist/.`);
}

main().catch((e) => {
  console.error("[prerender] Fatal:", e);
  process.exit(1);
});
