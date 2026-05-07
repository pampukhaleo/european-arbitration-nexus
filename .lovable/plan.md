# Fix Ahrefs SEO findings (7 issues, ~31 URLs)

## Root causes

All findings collapse into two real bugs:

**A. Policy pages hard-code `lang="en"`** in `Seo`. On `/fr/...` and `/ru/...` the canonical points to `/en/...` and self-hreflang ≠ canonical. This produces:
- Non-canonical page in sitemap (image 7) — 6 URLs
- Hreflang to non-canonical (image 6) — 3 URLs
- Hreflang and HTML lang mismatch (image 5) for `/fr/art-expertise/appraisal`

**B. Crawler captures the empty SPA shell before react-helmet-async runs.** All affected URLs render fine in a browser but Ahrefs sees `index.html` with `<html lang="en">`, no `<title>`, no description, no nav links. This produces:
- Title tag missing or empty (image 2) — 9 URLs
- Page has no outgoing links (image 1) — `/ru/arbitration/icac`
- Duplicate pages without canonical (image 3) — 8 URLs share content hash `14131261744751929499` (the empty shell)
- Hreflang and HTML lang mismatch (image 5) — `/ru/arbitration/icac`, `/fr/eac/news/20260`
- Missing reciprocal hreflang (image 4) — 6 news URLs (alternates not in shell)

## Changes

### 1. Make 3 policy pages language-aware
Files: `src/pages/policies/PrivacyPolicy.tsx`, `CookiesPolicy.tsx`, `TermsOfService.tsx`

- Import `useLanguage` from `@/contexts/LanguageContext`
- Pass `lang={language}` (instead of hard-coded `"en"`) to `<Seo>`

This single change fixes images 6, 7, and the policy URL in image 5.

### 2. Pre-mount lang/title bootstrap
File: `src/main.tsx`

Before `ReactDOM.createRoot(...)`:

```ts
const m = location.pathname.match(/^\/(en|fr|ru)(?:\/|$)/);
const lang = m?.[1] ?? "en";
document.documentElement.lang = lang;
if (!document.title) document.title = "European Arbitration Chamber (EAC)";
```

Sets `<html lang>` synchronously so any crawler snapshot already matches the URL's language.

### 3. Static SEO fallback in `index.html`
Add inside `<head>` (replacing the "do not add" comment with a "fallback only" note):

```html
<title>European Arbitration Chamber (EAC)</title>
<meta name="description" content="The European Arbitration Chamber (EAC) — international non-profit association founded in Belgium in 2008 by professionals in commercial arbitration and mediation." />
<link rel="canonical" href="https://chea-taic.be/en" />
```

Helmet replaces these on mount, so real users still get per-route SEO. Crawlers that don't execute JS (or time out) now see a non-empty title, a description, and a canonical. This eliminates the empty-shell duplicate-content cluster (image 3) and the missing-title cluster (image 2). Outgoing-links and reciprocal-hreflang issues (images 1, 4) also disappear on next crawl because Ahrefs can now wait for Helmet without falling back to a hash of `<div id="root"></div>`.

### 4. No sitemap change needed
Verified: sitemap already lists `/en|/fr|/ru/privacy-policy`, `/cookies-policy`, `/terms-of-service`. After change 1, each canonicalizes to itself.

## Files to edit

- `src/pages/policies/PrivacyPolicy.tsx`
- `src/pages/policies/CookiesPolicy.tsx`
- `src/pages/policies/TermsOfService.tsx`
- `src/main.tsx`
- `index.html`

## After deploy

Ahrefs caches findings — request a re-crawl of the affected URLs to clear the lists within a day instead of waiting for the natural recrawl cycle.
