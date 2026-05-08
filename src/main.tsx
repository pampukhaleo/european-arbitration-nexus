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

// Strip any pre-existing static SEO tags so react-helmet-async owns them
// exclusively (prevents duplicate description / stale canonical on FR/RU routes).
document
  .querySelectorAll(
    'head meta[name="description"], head link[rel="canonical"], head meta[property^="og:"], head meta[name^="twitter:"]'
  )
  .forEach((el) => el.remove());

createRoot(document.getElementById("root")!).render(<App />);
