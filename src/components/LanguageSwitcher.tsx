import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage, Language } from "@/contexts/LanguageContext";
import { SUPPORTED_LANGS } from "@/lib/i18nRouting";

export default function LanguageSwitcher({ mode = "full" }: { mode?: "full" | "compact" }) {
  const { language, setLanguage } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const languages: { code: Language; name: string }[] = [
    { code: "en", name: "EN" },
    { code: "fr", name: "FR" },
    { code: "ru", name: "RU" },
  ];

  const switchTo = (lang: Language) => {
    setLanguage(lang);
    try {
      localStorage.setItem("eac-lang", lang);
    } catch {
      /* ignore */
    }
    // Swap the /xx prefix in the current URL.
    const langRe = new RegExp(`^/(${SUPPORTED_LANGS.join("|")})(/|$)`);
    const newPath = langRe.test(location.pathname)
      ? location.pathname.replace(langRe, `/${lang}$2`)
      : `/${lang}${location.pathname}`;
    navigate(newPath + location.search + location.hash);
  };

  return (
    <div className={`ml-3 flex items-center ${mode === "compact" ? "space-x-2" : "space-x-1"}`}>
      {languages.map((lang) => (
        <Button
          key={lang.code}
          variant={language === lang.code ? "default" : "ghost"}
          size="sm"
          className={`${language === lang.code ? "bg-eac-primary text-white" : "text-gray-600"} px-2 py-1 text-xs font-medium`}
          onClick={() => switchTo(lang.code)}
        >
          {lang.name}
        </Button>
      ))}
    </div>
  );
}
