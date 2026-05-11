import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Pre-mount: set <html lang> based on URL so the very first paint already has
// the right language attribute (Helmet updates it again once App mounts).
const langMatch = window.location.pathname.match(/^\/(en|fr|ru)(?:\/|$)/);
const initialLang = langMatch?.[1] ?? 'en';
document.documentElement.lang = initialLang;

// Remove the SSR fallback h1 once React takes over — every route renders its
// own <h1> via <RouteSeo> (or its own page) so we don't want a duplicate.
document.getElementById('ssr-h1')?.remove();

createRoot(document.getElementById("root")!).render(<App />);
