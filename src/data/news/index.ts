
import { NewsItem } from "@/types/news";
import { news2024 } from "./2024";
import { news2023 } from "./2023";
// Import other year files as needed

export const newsItems: NewsItem[] = [
  ...news2024,
  ...news2023,
  // Add other years as they're created
];
