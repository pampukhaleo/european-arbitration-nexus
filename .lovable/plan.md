## Ahrefs warnings — root causes & fixes

### 1. Indexable became non-indexable / Noindex on `/{en,fr,ru}/cookies`
Ahrefs is crawling `/en/cookies`, `/fr/cookies`, `/ru/cookies` (legacy URLs without `-policy`). The router has no match → `NotFound` renders, which emits `noindex, nofollow`. That single page also fans out 22 nofollow links to every nav target, which is the root cause of warnings #5 (60+6 nofollow inlinks) and #6 (3 pages with nofollow outgoing links).

**Fix:** add three redirect routes inside `<Route path="/:lang">` in `src/App.tsx`:
```tsx
<Route path="cookies" element={<Navigate to="../cookies-policy" replace />} />
```
(One alias is enough; we keep the canonical URL `/cookies-policy`.) This kills warnings 1, 3, 5 and 6 in one shot.

### 2. Canonical URL changed for `/fr/privacy-policy`, `/ru/privacy-policy`, `/fr/terms-of-service`
`Seo.tsx` receives `lang` from `useLanguage()`. On first paint of a deep link, `LanguageContext` is still `"en"` (the default) before `LangSync` swaps it to the URL lang, so Helmet emits `canonical=/en/privacy-policy` for a `/fr/...` URL. Crawlers snapshot the wrong canonical.

**Fix:** in `src/components/Seo.tsx`, derive `currentLang` from `location.pathname` instead of trusting the prop:
```ts
const pathLang = location.pathname.split("/")[1];
const currentLang = SUPPORTED_LANGS.includes(pathLang as any) ? pathLang : (SUPPORTED_LANGS.includes(lang as any) ? lang : "en");
```
Use `currentLang` for `buildUrl(currentLang)` (canonical + og:url) and for `htmlAttributes={{ lang: currentLang }}`. This eliminates the brief canonical mismatch.

### 3. Page has only one dofollow incoming internal link (84 news pages)
Each `/eac/news/:id` is only linked from the paginated `/eac/news` list (one page at a time). Improve internal linking on `NewsDetail.tsx`:
- Add a "Related news" block at the bottom showing 4–6 sibling articles (random or most-recent excluding current) as `<Link>`s.
- Add prev/next article links.

This boosts dofollow inlinks per article from 1 to 5–7 without bloating navigation.

### 4. Page has links to redirect (Cookies Policy outbound)
Four external links in `src/pages/policies/CookiesPolicy.tsx` hit redirects. Replace with current final URLs:
| Current | Final |
|---|---|
| `http://support.microsoft.com/kb/278835` (already replaced earlier) → still 307s | `https://support.microsoft.com/en-us/windows/delete-and-manage-cookies-168dab11-0753-043d-7c16-ede5947fc64d` |
| `http://www.allaboutcookies.org/` | `https://allaboutcookies.org/` (already done; verify no trailing redirect) |
| `http://www.networkadvertising.org/` | `https://thenai.org/` (already done) |
| `https://support.mozilla.org/en-US/kb/delete-cookies-remove-info-websites-stored` | `https://support.mozilla.org/en-US/kb/clear-cookies-and-site-data-firefox` (already done) |

The Ahrefs report still flags them, so re-verify each URL with `curl -I` and update to whatever returns 200 directly. Do the same audit for the equivalent links rendered inside the `ru/fr` versions of the page if any.

### 5. Redirect chain `http://www.chea-taic.be/ → https://chea-taic.be/` (warning #8)
Hosting-level (Lovable/DNS apex+www). Cannot be fixed in app code — out of scope. Will note in commit.

### Files to edit
- `src/App.tsx` — add `cookies → cookies-policy` redirect route per lang.
- `src/components/Seo.tsx` — derive lang from pathname.
- `src/pages/eac/NewsDetail.tsx` — add Related/Prev/Next news block.
- `src/pages/policies/CookiesPolicy.tsx` — verify and update external URLs to their final destinations.

### Out of scope
- Apex/www redirect chain (warning #8).
- The lone `Missing` row for `/en/membership/conductCode` in image-69 — the route exists and returns 200; Ahrefs label is informational.

Summary: 4 small file edits resolve 6 of the 9 warnings; #3 (84 news) is improved structurally; #8 is infrastructural and out of scope.