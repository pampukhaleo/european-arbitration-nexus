
import { NewsItem } from "@/types/news";
import { news2024 } from "./2024";
import { news2023 } from "./2023";
import { news2022 } from "./2022";
import { news2021 } from "./2021";
import { news2020 } from "./2020";
import { news2019 } from "./2019";
import { news2018 } from "./2018";

export const newsItems: NewsItem[] = [
  ...news2024,
  ...news2023,
  ...news2022,
  ...news2021,
  ...news2020,
  ...news2019,
  ...news2018,
];
