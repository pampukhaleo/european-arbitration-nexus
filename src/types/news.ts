export type LocalizedText = string | { en: string; fr: string; ru: string };

export interface NewsItem {
  id: string;
  title: LocalizedText;
  date: string;
  excerpt: LocalizedText;
  description: LocalizedText;
  mainImageJpg?: string;
  mainImageWebp?: string;
  images?: string[];
  link?: string;
  pinned?: boolean;
}
