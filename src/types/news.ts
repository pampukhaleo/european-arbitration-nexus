
export interface NewsItem {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  description: string;
  mainImageJpg?: string;
  mainImageWebp?: string;
  images?: string[];
  link?: string;
}
