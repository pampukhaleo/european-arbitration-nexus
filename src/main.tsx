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

// Strip static SEO fallback tags from <head> before Helmet mounts.
// They exist in index.html for no-JS crawlers, but in JS-enabled environments
// react-helmet-async would otherwise leave them in place alongside its own
// per-route tags, producing duplicates (multiple description, og:url mismatch, etc.).
const head = document.head;
head.querySelectorAll('meta[name="description"]').forEach((el) => el.remove());
head.querySelectorAll('link[rel="canonical"]').forEach((el) => el.remove());
head.querySelectorAll('meta[property^="og:"]').forEach((el) => el.remove());
head.querySelectorAll('meta[name^="twitter:"]').forEach((el) => el.remove());

createRoot(document.getElementById("root")!).render(<App />);
