# SEO Fixes Plan

## Issue 1 & 3 — Broken PDF links (404) on /arbitration/rules and /arbitration/fees

**Root cause:** The 4 PDF files in `public/` have filenames with **spaces and Cyrillic characters**:
- `ICAC Provisions on Arbitration Costs as of November 11, 2020.pdf`
- `ICAC_Arbitral Rules_11.11.2020.pdf`
- `Положение_о_сборах_МКАС_от_11_ноября_2020.pdf`
- `Арбитражный_Регламент_МКАС_от_11_11_2020.pdf`

Even though the files exist, hosting/CDN serves them inconsistently (404 in crawlers) because of spaces, commas, and non-ASCII characters. Crawlers and external linkers cannot reliably resolve them.

**Fix:**
1. Rename the 4 PDFs in `public/` to URL-safe ASCII names:
   - `icac-arbitration-rules-2020-11-11-en.pdf`
   - `icac-arbitration-rules-2020-11-11-ru.pdf`
   - `icac-arbitration-costs-2020-11-11-en.pdf`
   - `icac-arbitration-costs-2020-11-11-ru.pdf`
2. Update references in `src/pages/arbitration/Rules.tsx` and `src/pages/arbitration/FeeRegulations.tsx` to the new names.
3. (Optional) Keep old filenames as duplicates for one release cycle so external backlinks don't break — or simply rely on the SEO crawler refresh.

This single fix resolves screens 1, 2, 4, and 5 (Pages with broken links + Broken links tabs).

## Issue 2 — Orphan pages (no incoming internal links)

Screen 3 lists 4 orphan URLs:

**a) `/privacy-policy`, `/terms-of-service`, `/cookies-policy`** — orphans because `src/components/Footer.tsx` links to wrong paths:
```
/privacy        → should be /privacy-policy
/serviceTerms   → should be /terms-of-service
/cookies        → should be /cookies-policy
```
Fix the three `to=` values in `Footer.tsx` (lines 27–29). The actual routes are already correctly registered in `App.tsx`.

**b) `/eac/news/20240401`** — this URL is in `sitemap.xml` and `rss.xml` but the actual news ID in `src/data/news/2024.ts` is `20241`. The page currently renders `NotFound` (which is also why screen 6 shows "Page has no outgoing links" — `NotFound` has no nav).

Fix: replace `20240401` with `20241` in:
- `public/sitemap.xml`
- `public/rss.xml`

## Issue 4 — Page has no outgoing links: `/eac/news/20240401`

Same root cause as 2b — the URL doesn't match any real news item, so `NewsDetail` redirects/renders the empty `NotFound`. Fixed by the sitemap/RSS correction above.

## Files to change

- `public/` — rename 4 PDFs (and optionally keep originals)
- `src/pages/arbitration/Rules.tsx` — update 2 PDF paths
- `src/pages/arbitration/FeeRegulations.tsx` — update 2 PDF paths
- `src/components/Footer.tsx` — fix 3 policy links
- `public/sitemap.xml` — replace `20240401` → `20241`, bump `lastmod`
- `public/rss.xml` — replace `20240401` → `20241`

## After deploy

Press **Publish → Update** in Lovable, then in the SEO tool / Google Search Console:
- Re-crawl `/arbitration/rules`, `/arbitration/fees`, the 3 policy pages, and `/eac/news/20241`
- Re-submit `sitemap.xml`
