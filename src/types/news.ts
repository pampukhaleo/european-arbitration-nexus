
export interface NewsItem {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  description: string;
  mainImage?: string;
  images?: string[];
  link?: string;
}
