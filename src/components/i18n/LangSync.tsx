import { useEffect } from "react";
import { Outlet, useParams, Navigate, useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { isSupportedLang, DEFAULT_LANG } from "@/lib/i18nRouting";

/**
 * Layout route component that:
 * 1. Validates the :lang URL segment (else redirects to /en + same path).
 * 2. Syncs LanguageContext with the URL.
 * 3. Persists the choice in localStorage (so / can redirect back later).
 */
export const LangSync = () => {
  const { lang } = useParams<{ lang: string }>();
  const location = useLocation();
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    if (isSupportedLang(lang) && language !== lang) {
      setLanguage(lang);
    }
    if (isSupportedLang(lang)) {
      try {
        localStorage.setItem("eac-lang", lang);
      } catch {
        /* ignore */
      }
    }
  }, [lang, language, setLanguage]);

  if (!isSupportedLang(lang)) {
    // Unknown lang segment → redirect to default lang preserving the rest of the path
    const rest = location.pathname.replace(/^\/[^/]+/, "");
    return (
      <Navigate
        to={`/${DEFAULT_LANG}${rest}${location.search}${location.hash}`}
        replace
      />
    );
  }

  return <Outlet />;
};
