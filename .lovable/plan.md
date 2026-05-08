## Что показывает новый отчёт Ahrefs

Главные новые ошибки:
- **Multiple meta description tags — 452 (321 новых)** — дубли description
- **Open Graph URL not matching canonical — 451** — статический `og:url=/en` конфликтует с Helmet'овским `og:url` для FR/RU
- **Title too long — 321** — Helmet выдаёт длинный title, но статический короткий тоже есть
- **Hreflang to non-canonical — 71**
- **Non-canonical page in sitemap — 28**, **Canonical URL changed — 28**
- **H1 tag missing or empty — 42** (для no-JS снимков)

## Диагноз — почему так получилось

Я был неправ в прошлой итерации. `react-helmet-async` **дедуплицирует только теги, которые сам же добавил**. Пре-существующие статические теги из `index.html` он **не трогает** — они остаются в DOM рядом с тегами Helmet → дубли description, og:*, twitter:* на каждой странице.

Получается тупик:
- Уберём статику → no-JS краулер Ahrefs видит пустой head (прошлый отчёт: 28 страниц без description/canonical/OG)
- Оставим статику → JS-краулер Ahrefs видит дубли (текущий отчёт: 452 дубля description)

## Решение — оба механизма одновременно

Нужен **обоих**: статика в `index.html` для no-JS краула + cleanup в `main.tsx` **до** монтирования React, чтобы JS-краул видел только теги Helmet.

### 1. `index.html` — оставить статические fallback-теги
Без изменений (уже восстановлены).

### 2. `src/main.tsx` — вернуть cleanup, но правильно
Перед `createRoot().render()` удалить SEO-теги из `<head>`, которые Helmet перезапишет:
```ts
const head = document.head;
head.querySelectorAll('meta[name="description"]').forEach(el => el.remove());
head.querySelectorAll('link[rel="canonical"]').forEach(el => el.remove());
head.querySelectorAll('meta[property^="og:"]').forEach(el => el.remove());
head.querySelectorAll('meta[name^="twitter:"]').forEach(el => el.remove());
```

Это работает так:
- **No-JS краулер** (первый pass Ahrefs, соцсети без JS): JS не выполняется → видит статические теги из HTML → валидные дефолты, никаких дублей
- **JS-краулер** (Google, Ahrefs JS-mode, браузер): cleanup стирает статику → Helmet добавляет per-route теги → нет дублей, корректный canonical/og:url

### 3. `src/components/Seo.tsx` — без изменений
Уже корректно вычисляет canonical из `location.pathname`.

### Почему прошлый раз не сработало
В первой попытке мы **удалили статику ИЗ index.html** и сделали cleanup. Cleanup был избыточным (нечего стирать), а отсутствие статики ломало no-JS краул. Сейчас наоборот — статика есть, cleanup удалён, и JS-краул видит дубли.

Правильно — **оба**: статика для no-JS, cleanup для JS.

### Файлы
- `src/main.tsx` — добавить блок `head.querySelectorAll(...).forEach(el => el.remove())` перед `createRoot().render()`

### Не входит
- `index.html`, `Seo.tsx` — без изменений
- Sitemap (`Non-canonical page in sitemap`, `Indexable page not in sitemap`) — отдельная задача, скажите, если нужно править
- `Image file size too large`, `Slow page` — отдельная задача оптимизации
- `Title too long` — после фикса дублей титл будет один (Helmet'овский); если он реально длинный — отдельно подрежем по конкретным страницам
