import type { Language } from "@/contexts/LanguageContext";
import type { LocalizedText } from "@/types/news";

export const pickText = (value: LocalizedText, lang: Language): string => {
  if (typeof value === "string") return value;
  return value[lang] || value.en;
};
