
import React, { createContext, useContext, useState, ReactNode } from 'react';
import en from '@/contexts/locales/en';
import fr from '@/contexts/locales/fr';
import ru from '@/contexts/locales/ru';
import { Translations } from '@/contexts/types/Translations';

export type Language = 'en' | 'fr' | 'ru';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: <T = string>(key: string) => T;
}

const translations: Record<Language, Translations> = {
  en,
  fr,
  ru,
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: <T = string>(key: string): T => key as unknown as T,
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = <T = string>(key: string): T => {
    const keys = key.split(".");
    let value: unknown = translations[language];

    for (const k of keys) {
      if (typeof value === "object" && value !== null && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        // Fallback to English if key not found in current language
        let fallbackValue: unknown = translations['en'];
        for (const fallbackKey of keys) {
          if (typeof fallbackValue === "object" && fallbackValue !== null && fallbackKey in fallbackValue) {
            fallbackValue = (fallbackValue as Record<string, unknown>)[fallbackKey];
          } else {
            // If even English doesn't have the key, return the key itself
            console.warn(`Translation key "${key}" not found in ${language} or English fallback`);
            return key as unknown as T;
          }
        }
        return fallbackValue as T;
      }
    }

    // Handle array case safely
    if (Array.isArray(value)) {
      return value as T;
    }

    return value as T;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
