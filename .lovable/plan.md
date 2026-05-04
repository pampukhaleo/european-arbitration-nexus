## План: добавление двух новостей с переводами на 3 языка

### 1. Расширение типа `NewsItem`

Файл: `src/types/news.ts`

Добавляем тип-помощник для локализованного текста и делаем поля `title`, `excerpt`, `description` способными принимать **либо строку (старый формат, EN), либо объект `{en, fr, ru}`** (новый формат). Это сохраняет совместимость со всеми существующими новостями без правок.

```ts
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
}
```

### 2. Утилита получения текста по языку

Новый файл: `src/lib/localizedNews.ts`

```ts
import type { Language } from "@/contexts/LanguageContext";
import type { LocalizedText } from "@/types/news";

export const pickText = (value: LocalizedText, lang: Language): string => {
  if (typeof value === "string") return value; // legacy EN-only
  return value[lang] || value.en;              // fallback to EN
};
```

### 3. Использование во всех точках вывода

В компонентах берём `language` из `useLanguage()` и оборачиваем поля через `pickText(...)`:

- `src/components/news/NewsItem.tsx` — `title`, `description` (для `firstParagraph`).
- `src/components/home/NewsPreview.tsx` — пропсы передаём как есть, локализация выполняется внутри `NewsItem`.
- `src/pages/eac/News.tsx` — то же, `NewsItem` уже локализует.
- `src/pages/eac/NewsDetail.tsx` — `title`, `description` (включая `seoTitle`, `plainDescription`, `structuredData.headline/description`, alt-атрибуты).

### 4. Создание новостей

Новый файл: `src/data/news/2026.ts` — массив `news2026: NewsItem[]` с двумя записями, где `title/excerpt/description` оформлены как `{ en, fr, ru }`. Картинки кладём в `public/images/news/`.

Обновляем `src/data/news/index.ts` — добавляем `import { news2026 }` и `...news2026` в начало массива (чтобы новые показывались первыми).

### 5. Что вы пришлёте

Для каждой из двух новостей:

- `id` (или я сгенерирую `20261`, `20262`)
- `date` (формат как в существующих: `Mon DD YYYY`, например `May 04 2026`)
- `title` × 3 (EN / FR / RU)
- `excerpt` × 3 (короткий — 1–2 предложения)
- `description` × 3 (полный текст; пустая строка между абзацами = `\n\n`)
- Главное изображение (.jpg/.webp) и опциональные доп. картинки

Можете прислать одним сообщением в любом формате (markdown, просто блоками "EN:/FR:/RU:") — я разложу по структуре.

### Что НЕ трогаем

- Существующие новости 2014–2024 остаются строками (EN), компоненты обрабатывают оба формата прозрачно.
- Логика SEO, маршруты, sitemap.

После вашего OK переключусь в build mode, сделаю изменения типа/утилиты/компонентов, и буду готов вставить тексты как только пришлёте.
