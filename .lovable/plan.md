## Анализ

### 1 + 2. Broken images (Ahrefs показывает 404 для 6 файлов)

Все «битые» файлы имеют **пробелы в именах**:
- `2017-07-03 15.20.16.jpg`
- `EAC EDAC.jpg`
- `GAR Live Zurich - Facebook promo.png`
- `prague 2019.jpg`
- `turkey istanbul.jpg`
- `EAC meeting_1.jpeg`

Файлы физически лежат в `public/images/news/`, но пробелы в URL вызывают проблемы у части краулеров и CDN-кэша. Решение — переименовать без пробелов и точек в середине имени, обновить ссылки в `src/data/news/*.ts`.

### 3. Image file size too large (5 файлов >1.5 MB)

| Файл | Размер | Webp есть? |
|---|---|---|
| `DSC_0046.jpg` | 5.5 MB | ✅ |
| `15anniversary.png` | 3.8 MB | ✅ |
| `401_4.jpg` | 2.3 MB | ✅ |
| `eac-2026-announcement.jpg` | 1.9 MB | ❌ |
| `20130621_0932331.jpg` | 1.6 MB | ✅ |

`<picture>` уже использует webp source — браузер должен брать webp. Но Ahrefs читает `<img src>` (jpg), отсюда предупреждение. Также для серий `eac-2026-meeting-*.jpg` и `eac-2026-announcement.jpg` webp вообще нет.

Делаем:
- Сгенерировать `.webp` для всех `eac-2026-*.jpg` через `ffmpeg` (~80% качество).
- Сжать пять «тяжёлых» jpg/png в место (через `ffmpeg -q:v 4`, прогрессивный jpg) — целимся в <500 KB без видимой потери качества.

### 4. Non-canonical page in sitemap

Проверил `public/sitemap.xml` — указанные Ahrefs ID (`20180618`, `20140601`, `20211115` и т.д.) **уже отсутствуют**. В текущем sitemap только реальные id новостей (`20141`, `20161`, …, `20261`). Это старый отчёт Ahrefs до перегенерации sitemap.

Действие: ничего править не нужно. После публикации попросить пересканировать сайт в Ahrefs.

## Изменения

1. **Переименовать файлы** (`public/images/news/`):
   - `2017-07-03 15.20.16.jpg/.webp` → `2017-07-03-152016.jpg/.webp`
   - `EAC EDAC.jpg/.webp` → `eac-edac.jpg/.webp`
   - `EAC meeting_1.jpeg/.webp` → `eac-meeting-1.jpeg/.webp`
   - `GAR Live Zurich - Facebook promo.png/.webp` → `gar-live-zurich.png/.webp`
   - `prague 2019.jpg/.webp` → `prague-2019.jpg/.webp`
   - `turkey istanbul.jpg/.webp` → `turkey-istanbul.jpg/.webp`

2. **Обновить пути** в `src/data/news/2017.ts`, `2018.ts`, `2019.ts`, `2021.ts`, `2023.ts`.

3. **Сжать большие изображения** (заменяем jpg/png in-place):
   - `DSC_0046.jpg`, `15anniversary.png`, `401_4.jpg`, `20130621_0932331.jpg`, `eac-2026-announcement.jpg` → таргет ≤ 600 KB.

4. **Сгенерировать webp** для `eac-2026-announcement.jpg` и `eac-2026-meeting-1..9.jpg`, добавить `mainImageWebp`/обновить массив `images` в `src/data/news/2026.ts`.

5. Sitemap не трогаем.