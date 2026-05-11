# Why the Ahrefs errors are still there

I checked what the live site actually serves. The prerendered files are **on the server** (you can see them at `/fr/eac/about/index.html` directly), but Lovable hosting has a hard limitation:

```
GET /fr/eac/about        → returns root /index.html (English defaults)
GET /fr/eac/about/       → returns root /index.html (English defaults)
GET /fr/eac/about/index.html → returns the correct prerendered file
```

I confirmed this in the Lovable docs: **Lovable hosting never serves nested `index.html` for clean URLs** — every deep link falls back to the root `index.html`. Our `scripts/prerender.mjs` generates 159 perfect HTML files, but no crawler will ever see them, because crawlers request `/fr/eac/about`, not `/fr/eac/about/index.html`.

That's why Ahrefs still reports:
- 38 duplicate pages without canonical
- 54 missing reciprocal hreflang
- 38 missing H1
- 38 missing meta description

All of them get the same English root `index.html`.

Your project memory says the site must stay on Lovable hosting, so we cannot solve this with a different host.

# What we *can* do on Lovable hosting

Two layers:

### 1. Make the SPA itself produce correct per-route SEO (for JS-rendering crawlers like Google and Ahrefs' JS pass)

- The app already uses `react-helmet-async` via `src/components/Seo.tsx`. I'll audit every public page and make sure each one renders `<Seo>` with: localized `title`, `description`, correct `canonical`, full `hreflang` set (en/fr/ru + x-default), `og:*`, `twitter:*`, and a real visible (or `sr-only`) `<h1>`.
- Make sure pages that currently miss it (news detail, gallery, contacts, policies, art-expertise, expertise, membership, arbitration sub-pages) all set a proper canonical and hreflang for the *current* language path, not the English one.

### 2. Make the static `index.html` fallback harmless instead of misleading (for no-JS crawlers)

Right now `index.html` ships with hard-coded English title, English description, `canonical=https://chea-taic.be/en`, English OG. That's exactly what Ahrefs sees for every deep link, which is why it flags duplicates and wrong canonicals.

I'll change `index.html` so that:
- `<title>` and `<meta description>` stay (generic site-level wording in English) — needed so the page isn't flagged as "missing".
- **Remove the hard-coded `<link rel="canonical">`** from `index.html`. Helmet will inject the right one per route. No canonical at all is better than a wrong one duplicated on 50 URLs (Ahrefs will stop flagging "duplicate pages without canonical" as critical, and Google's JS render will pick up the right one from Helmet).
- **Remove hard-coded `og:url`** for the same reason.
- Keep a single neutral `<h1 id="ssr-h1" class="sr-only">European Arbitration Chamber</h1>` so "H1 missing" goes away even on the no-JS pass; React then overwrites it per route.

### 3. Remove the dead prerender step

- Delete `scripts/prerender.mjs` and `scripts/seo-metadata.mjs`.
- Restore `package.json` `"build": "vite build"` (no postbuild). The 159 files we generate today are never served — they only inflate build time and are confusing.

# Files I'll touch

- `index.html` — strip wrong canonical / og:url, keep a neutral title/description/h1.
- `src/components/Seo.tsx` — make sure it always emits canonical + 3 hreflang + x-default for the current path & language (this is the single source of truth).
- Public page components that currently don't render `<Seo>` or render it with wrong props (audit list: `pages/eac/NewsDetail.tsx`, `pages/Contacts.tsx`, `pages/policies/*`, `pages/membership/*`, `pages/arbitration/*`, `pages/expertise/*`, `pages/artExpertise/*`, `pages/gallery/Gallery.tsx`).
- `src/main.tsx` — drop the "x-prerendered" branching; Helmet now always manages the head.
- `package.json` — remove `prerender` script, restore plain `vite build`.
- Delete `scripts/prerender.mjs`, `scripts/seo-metadata.mjs`.

# Honest expectation about Ahrefs

After this change and a fresh Ahrefs crawl:
- **"H1 missing", "Meta description missing", "Title missing"** → fully resolved (neutral defaults in `index.html` + Helmet on JS render).
- **"Open Graph tags missing", "Twitter card missing"** → resolved (defaults in `index.html`, per-route via Helmet).
- **"Duplicate pages without canonical"** → resolved as a critical issue (no wrong canonical anymore; Ahrefs treats "no canonical" as a notice, not an error).
- **"Missing reciprocal hreflang"** → resolved on Ahrefs' JS-render pass (Helmet emits all three). On the no-JS pass it can't be fully solved without per-route HTML, which Lovable hosting doesn't support.
- **"Open Graph URL mismatch"** → resolved by removing the wrong static `og:url`.

The only error we cannot 100% kill on the raw-HTML pass is hreflang reciprocity, because that genuinely requires per-route HTML. Enabling Ahrefs' "Execute JavaScript" in your project's crawl settings makes it disappear there too.

# Question

Do you want me to go ahead with this? It involves throwing away the prerender work we just did (because Lovable hosting won't serve it) and instead doing the Helmet + clean-defaults approach. It's the only path that actually works while staying on Lovable.
