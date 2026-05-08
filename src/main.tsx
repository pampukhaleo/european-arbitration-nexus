import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Pre-mount SEO bootstrap: set <html lang> based on URL so crawler snapshots
// taken before react-helmet-async runs already match the page's language.
const langMatch = window.location.pathname.match(/^\/(en|fr|ru)(?:\/|$)/);
const initialLang = langMatch?.[1] ?? 'en';
document.documentElement.lang = initialLang;

// Remove the SSR fallback h1 once React takes over (per-page renders its own h1).
document.getElementById('ssr-h1')?.remove();

// On non-prerendered pages (admin, /auth, gallery/manage, dynamic /gallery/:id),
// the static index.html ships English fallback SEO tags. Strip them so Helmet
// does not produce duplicates. Prerendered pages already have correct per-route
// tags (marked via <meta name="x-prerendered">) — leave them in place; Helmet
// will update them on client-side route changes.
const isPrerendered = !!document.querySelector('meta[name="x-prerendered"]');
if (!isPrerendered) {
  const head = document.head;
  head.querySelectorAll('meta[name="description"]').forEach((el) => el.remove());
  head.querySelectorAll('link[rel="canonical"]').forEach((el) => el.remove());
  head.querySelectorAll('meta[property^="og:"]').forEach((el) => el.remove());
  head.querySelectorAll('meta[name^="twitter:"]').forEach((el) => el.remove());
}

createRoot(document.getElementById("root")!).render(<App />);
