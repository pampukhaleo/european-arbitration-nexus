## Что в файле

Файл содержит 7 новостей в трёх языках (EN / RU / FR).

**Добавляю сейчас:**

**2025 год (новые, ещё нет на сайте):**
1. **01.07.2025** — Webinar: Forensic Expertise as the Basis of Your Legal Position
2. **17.06.2025** — Webinar: Features of Conducting Commodity Expertise to Determine the Value of Goods
3. **20.05.2025** — Webinar: Forensic Psychological Examination (parental disputes on child upbringing/residence)

**2018 год:**
4. **08.10.2018** — Political and Legal Forum (Kyiv, 28 September)
5. **18.06.2018** — VII All-Ukrainian Forum on Public Law

**Не добавляю:**
- Webinar Moral Damages — жду уточнения даты
- Istanbul Chamber of Commerce visit — уже есть на сайте как `20183`

## План

### Новый файл `src/data/news/2025.ts`
Создам с 3 вебинарами (id `20251`, `20252`, `20253`), локализованные `title/excerpt/description` (объект `{ en, fr, ru }`), сохраняя оригинальные тексты, программу и email для регистрации.

### Правки `src/data/news/2018.ts`
Добавлю 2 новости:
- `20186` — Political and Legal Forum (`Oct 08 2018`)
- `20187` — VII All-Ukrainian Forum on Public Law (`Jun 18 2018`)

### `src/data/news/index.ts`
Импортирую `news2025` и вставлю между `news2026` и `news2024`.

### Картинки
Поля `mainImageJpg`/`mainImageWebp` оставлю пустыми — карточка отрендерится без изображения. Когда пришлёте фото, добавлю пути одним заходом.

## Технические детали
- `LocalizedText = string | { en, fr, ru }` — использую объект.
- Ссылки автоматически `/eac/news/<id>` на 3 языках.
- SSG подхватит новые id через `getStaticPaths` в `NewsDetail.tsx`.
- Sitemap/prefetch обновятся при билде.