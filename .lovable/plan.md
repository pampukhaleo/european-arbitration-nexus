## Ahrefs Warnings — Plan

Six warning categories to address. Each has a clear root cause from the codebase.

### 1. Nofollow page + Noindex page (images 1, 2)

Affects `https://chea-taic.be/{en,fr,ru}/cookies` — three URLs flagged with `meta robots = nofollow,noindex` and labelled "Page Not Found".

**Root cause.** `src/components/CookieConsent.tsx` line 53 links to `/cookies` (which doesn't exist). The route is `/cookies-policy`. The 404 page emits `noindex,nofollow`, so Ahrefs sees three "broken" pages.

**Fix.** Change `to="/cookies"` → `to="/cookies-policy"` in `CookieConsent.tsx`. The three non-existent URLs will drop from Ahrefs after re-crawl.

### 2. Page has links to redirect / 3XX redirect / 302 redirect (images 3, 4, 5)

Two distinct sources:

**A. Apex/www redirects** (image 4, 5): `http://chea-taic.be/` 301→`https://chea-taic.be/`, `https://www.chea-taic.be/` 302→`https://chea-taic.be/`, `http://www.chea-taic.be/` 302→`http://chea-taic.be/`. These are hosting-level (Lovable custom domain). Nothing to fix in code — they are correct canonical redirects. Acceptable warning.

**B. Outbound links to redirecting URLs from our pages** (image 3, 4 URLs):
- `cookies-policy` → external `support.microsoft.com/kb/278835` (307), `allaboutcookies.org` (301), `networkadvertising.org` (301), `support.mozilla.org/.../delete-cookies-...` (302). 
- 3 membership pages (`en|fr|ru/membership/join`) → `https://forms.gle/cue4X8S6g6kpWM6q8` (302).

**Fix.**
- In `CookiesPolicy.tsx`, update external href values to their final destinations:
  - `http://support.microsoft.com/kb/278835` → `https://support.microsoft.com/en-us/topic/delete-and-manage-cookies-168dab11-0753-043d-7c16-ede5947fc64d`
  - `http://www.allaboutcookies.org/` → `https://allaboutcookies.org/`
  - `http://www.networkadvertising.org/` → `https://thenai.org/`
  - `https://support.mozilla.org/en-US/kb/delete-cookies-remove-info-websites-stored` → `https://support.mozilla.org/en-US/kb/clear-cookies-and-site-data-firefox`
- The Google Forms `forms.gle/cue4X8S6g6kpWM6q8` shortlink always 302s to the full `docs.google.com/forms/d/e/.../viewform` URL. Replace the shortlink in the membership "Join" CTA with the resolved long URL so Ahrefs no longer flags it. Find usage with `rg "forms.gle/cue4X8S6g6kpWM6q8"` and update to the resolved `https://docs.google.com/forms/d/e/1FAIpQLS.../viewform` URL (will resolve once during fix).

### 3. Title too long (images 6, 7) — 88 URLs

Two patterns are inflating title length above ~60 characters:

**A. Policy/page SEO titles** like `"About The European Arbitration Chamber (EAC) | European Arbitration Chamber"` (75 chars), `"Membership in the European Arbitration Chamber | European Arbitration Chamber"` (77), `"The 17th Annual International Conference … was held in Prague | News - European Arbitration Chamber"` (153).

**B. News pages** auto-suffix `" | News - European Arbitration Chamber"` (39 chars) on top of long news titles, in `src/pages/eac/NewsDetail.tsx` line 33:
```ts
const seoTitle = `${title} | News - European Arbitration Chamber`;
```

**Fix.**

1. **Shorten the static SEO titles in `src/contexts/locales/{en,fr,ru}.ts`** — drop the redundant `" | European Arbitration Chamber"` brand suffix from titles that already mention "European Arbitration Chamber" or "EAC", and tighten the rest. Targets ≤60 chars where possible. Examples:
   - `"About The European Arbitration Chamber (EAC) | European Arbitration Chamber"` → `"About the European Arbitration Chamber (EAC)"`
   - `"The Rules of the ICAC under the EAC | European Arbitration Chamber"` → `"ICAC Rules | EAC"`
   - `"AUTHORIZATION OF WORKS OF ART | European Arbitration Chamber"` → `"Art Passport & Authorization | EAC"`
   - `"5 Reasons to Become an EAC Member | European Arbitration Chamber"` → `"5 Reasons to Become an EAC Member"`
   - Apply equivalent shortening to `fr.ts` and `ru.ts`.

2. **Shorten news SEO suffix in `NewsDetail.tsx`**:
   ```ts
   const seoTitle = `${title} | EAC News`;
   ```
   For news items whose own title is already >55 chars, truncate to ~55 chars + `…` before composing:
   ```ts
   const trimmed = title.length > 55 ? title.slice(0, 54).trimEnd() + "…" : title;
   const seoTitle = `${trimmed} | EAC News`;
   ```

### Files to edit

- `src/components/CookieConsent.tsx` — fix `/cookies` → `/cookies-policy`.
- `src/pages/policies/CookiesPolicy.tsx` — replace 4 external hrefs with their final destinations (https + final path).
- Membership "Join" CTA component (locate via `rg "cue4X8S6g6kpWM6q8" src/`) — replace shortlink with resolved Google Forms long URL.
- `src/contexts/locales/en.ts`, `fr.ts`, `ru.ts` — shorten all `seo.*.title` values to ≤60 chars.
- `src/pages/eac/NewsDetail.tsx` — replace `seoTitle` template with shorter suffix + truncate long news titles.

### Out of scope (already handled / not actionable)

- Apex/www 301/302 (hosting redirects — correct, cannot be removed in code).
- The 51 `/ru` "First found at" entries — those are inlinks counts, not separate problems.
- Sitemap is already clean for `cookies-policy`.

After deploy, request Ahrefs re-crawl of affected URLs to clear the warning lists.
