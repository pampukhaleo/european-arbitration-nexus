import { NewsItem } from "@/types/news";
import { news2026 } from "./2026";
import { news2025 } from "./2025";
import { news2024 } from "./2024";
import { news2023 } from "./2023";
import { news2021 } from "./2021";
import { news2020 } from "./2020";
import { news2019 } from "./2019";
import { news2018 } from "./2018";
import { news2017 } from "./2017";
import { news2016 } from "./2016";
import { news2014 } from "./2014";

const all: NewsItem[] = [
  ...news2026,
  ...news2025,
  ...news2024,
  ...news2023,
  ...news2021,
  ...news2020,
  ...news2019,
  ...news2018,
  ...news2017,
  ...news2016,
  ...news2014,
];

// Pinned items float to the top; the rest preserve their chronological order.
export const newsItems: NewsItem[] = [
  ...all.filter((n) => n.pinned),
  ...all.filter((n) => !n.pinned),
];
