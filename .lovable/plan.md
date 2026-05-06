# Internationalization via URL prefixes (`/en`, `/fr`, `/ru`) for proper hreflang

## Goal

Make Google index three language versions of every page as separate URLs, with correct `hreflang` linking them.

## Final URL structure

```
/                          → 302 to /en (or detected Accept-Language)
/en, /en/eac/about, ...    → English version
/fr, /fr/eac/about, ...    → French version
/ru, /ru/eac/about, ...    → Russian version
```

Old paths without prefix (`/eac/about`) → redirect to `/en/eac/about` (preserve old backlinks).

## Implementation

### 1. Routing (`src/App.tsx`)

Wrap all non-admin/non-auth routes in a `:lang` parent route:
```tsx
<Route path="/:lang/*" element={<LocalizedRoutes />} />
<Route path="/" element={<Navigate to="/en" replace />} />
<Route path="/eac/*" element={<LegacyRedirect />} />
{/* ... same for every legacy top-level path */}
```

Create `src/components/LocalizedRoutes.tsx`:
- Reads `:lang` param, validates against `['en','fr','ru']` (else redirect to `/en` + same path).
- Calls `setLanguage(lang)` in effect to sync `LanguageContext`.
- Renders the existing `<Routes>` tree with relative paths (`eac/about`, etc.).

Keep `/auth`, `/admin/*`, `/gallery/manage/*` **outside** the lang prefix (private, not for SEO).

### 2. Language context (`src/contexts/LanguageContext.tsx`)

- Initial language: derived from URL `:lang` param, not hard-coded `'en'`.
- `setLanguage(lang)` should also `navigate` to the same path with the new prefix (for the language switcher).

### 3. Language switcher (`src/components/LanguageSwitcher.tsx`)

Switching language must **navigate** to the localized URL, not just toggle context:
```tsx
const newPath = location.pathname.replace(/^\/(en|fr|ru)/, `/${lang}`);
navigate(newPath + location.search);
```

### 4. SEO component (`src/components/Seo.tsx`)

Generate three distinct hreflang URLs from the current path by swapping the language prefix:
```tsx
const pathWithoutLang = location.pathname.replace(/^\/(en|fr|ru)/, '');
const enUrl = `${baseUrl}/en${pathWithoutLang}`;
const frUrl = `${baseUrl}/fr${pathWithoutLang}`;
const ruUrl = `${baseUrl}/ru${pathWithoutLang}`;

<link rel="canonical" href={`${baseUrl}/${lang}${pathWithoutLang}`} />
<link rel="alternate" hrefLang="en" href={enUrl} />
<link rel="alternate" hrefLang="fr" href={frUrl} />
<link rel="alternate" hrefLang="ru" href={ruUrl} />
<link rel="alternate" hrefLang="x-default" href={enUrl} />
```

Each URL is now unique per language → no more "page referenced for more than one language".

### 5. Internal links

Update all `<Link to="/...">` and `navigate('/...')` calls to be language-aware. Create a small helper:
```tsx
// src/lib/localizedPath.ts
export const lp = (lang: string, path: string) => `/${lang}${path.startsWith('/') ? path : '/' + path}`;
```

Replace hard-coded paths in:
- `src/components/Footer.tsx`
- `src/components/Header.tsx` + `header/NavData.tsx`, `DesktopNav.tsx`, `MobileNav.tsx`, `Logo.tsx`
- `src/pages/Index.tsx` and `home/*` components
- `src/pages/eac/News.tsx`, `NewsDetail.tsx` (back link)
- Any other `<Link to>` in pages

### 6. Sitemap & RSS

`public/sitemap.xml`: for every existing URL, generate **three** entries (`/en/...`, `/fr/...`, `/ru/...`) with `<xhtml:link rel="alternate" hreflang="...">` cross-references inside each `<url>` block (proper hreflang in sitemap).

`public/rss.xml`: keep English only (RSS doesn't multiplex languages well) — point all `<link>` to `/en/...`.

### 7. Initial language detection

On first visit to `/`:
```tsx
const browserLang = navigator.language.slice(0,2);
const target = ['en','fr','ru'].includes(browserLang) ? browserLang : 'en';
<Navigate to={`/${target}`} replace />
```
(Detected client-side; Google still gets `/en` since Googlebot defaults to English.)

### 8. `<html lang>` attribute

Already handled by `Seo.tsx` via `react-helmet-async`. Just make sure `lang` prop passed everywhere comes from URL, not stale context.

## Out of scope (separate task)

- **Translating page content** that's currently English-only. Many pages render hard-coded English strings instead of using `t('...')`. Without that, `/fr/eac/about` will be the same English content under a French URL — Google may eventually flag as duplicate content. After URL refactor lands, audit each page for missed `t(...)` calls and fill `fr.ts` / `ru.ts` translation gaps.
- Server-side prerendering for non-JS crawlers.

## Files affected (estimate)

- Core routing/i18n: `App.tsx`, `LanguageContext.tsx`, `LanguageSwitcher.tsx`, `Seo.tsx`, new `LocalizedRoutes.tsx` + `localizedPath.ts`
- All header/footer/nav: ~6 files
- All `<Link>` in pages: ~20 files (mostly mechanical replacements)
- `public/sitemap.xml`, `public/rss.xml`

## Risk

This is a **medium-large refactor**. Existing inbound links (Google-indexed `/eac/about` etc.) will 301-redirect to `/en/eac/about` — link equity preserved, but Google needs a few weeks to re-crawl and update.
