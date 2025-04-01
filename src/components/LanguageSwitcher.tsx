
import React from "react";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { useLanguage, Language } from "@/contexts/LanguageContext";

export default function LanguageSwitcher({ mode = "full" }: { mode?: "full" | "compact" }) {
  const { language, setLanguage, t } = useLanguage();
  
  const languages: { code: Language; name: string }[] = [
    { code: 'en', name: t('language.english') },
    { code: 'fr', name: t('language.french') },
    { code: 'de', name: t('language.german') },
    { code: 'ru', name: t('language.russian') }
  ];
  
  return (
    <div className={`flex items-center ${mode === "compact" ? "space-x-2" : "space-x-1"}`}>
      {mode === "full" && <Globe size={16} className="text-gray-600" />}
      {languages.map((lang) => (
        <Button
          key={lang.code}
          variant={language === lang.code ? "default" : "ghost"}
          size="sm"
          className={`${language === lang.code ? "bg-eac-primary text-white" : "text-gray-600"} px-2 py-1 text-xs font-medium`}
          onClick={() => setLanguage(lang.code)}
        >
          {lang.name}
        </Button>
      ))}
    </div>
  );
}
