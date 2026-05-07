import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Pre-mount SEO bootstrap: set <html lang> based on URL so crawler snapshots
// taken before react-helmet-async runs already match the page's language.
const langMatch = window.location.pathname.match(/^\/(en|fr|ru)(?:\/|$)/);
const initialLang = langMatch?.[1] ?? 'en';
document.documentElement.lang = initialLang;

createRoot(document.getElementById("root")!).render(<App />);
