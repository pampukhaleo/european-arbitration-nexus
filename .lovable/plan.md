# Fix: Multiple meta description tags

## Root cause

`index.html` contains static SEO tags (`<meta name="description">`, OG, Twitter, og:type, og:image). At runtime `src/components/Seo.tsx` (react-helmet-async) injects the same tags per route. Result: each rendered page has **two** `meta description` (and duplicate OG/Twitter) tags — exactly what the SEO crawler reports.

The static fallback was only useful when the site was hosted on GitHub Pages without SSR. On Lovable hosting it just creates duplicates.

## Fix

Edit `index.html` — remove the 9 static SEO tags (lines 26–35):

- `og:title`, `twitter:title`
- `description`, `og:description`, `twitter:description`
- `og:image`, `twitter:image`
- `twitter:card`, `og:type`

Keep all functional tags (`charset`, `viewport`, favicon, theme-color, PWA hints, preconnects, fonts).

`Seo.tsx` already provides every removed tag dynamically per route, so the live HTML keeps a complete tag set — just without duplicates.

## After deploy

Press **Publish → Update**, then re-run the SEO crawler — "Multiple meta descriptions" warnings should be gone for all 148 URLs.
