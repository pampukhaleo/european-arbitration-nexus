## Что произошло

В прошлой итерации мы удалили статические SEO-теги из `index.html` и добавили DOM-очистку в `src/main.tsx`, считая, что они конфликтуют с `react-helmet-async`. Это было ошибкой.

**Новый отчёт Ahrefs показывает 28 страниц с критическими проблемами:**
- H1 tag missing or empty — 28 новых
- Meta description tag missing or empty — 28 новых
- Open Graph tags missing — 28 новых
- X (Twitter) card missing — 28 новых
- **Duplicate pages without canonical — 28 новых (ERROR, красный)**

Все эти 28 — одни и те же страницы. Причина: Ahrefs (как и часть других краулеров/превью-ботов) делает первичный snapshot HTML до выполнения JS. Раньше статические теги в `index.html` служили fallback'ом для no-JS-краула. Мы их убрали — и на этих 28 страницах краулер видит пустой `<head>` без description/canonical/OG/Twitter и пустой `<body>` без H1.

Что касается исходной жалобы (дублирующийся `<meta name="description">` и неправильный canonical на FR/RU): `react-helmet-async` на самом деле **заменяет** теги с теми же атрибутами, а не добавляет их. Реальной причиной неправильного canonical был баг в `Seo.tsx` (он брал `lang` из контекста, который на первом рендере ещё `"en"`). Этот баг **уже исправлен** — теперь `currentLang` выводится из `location.pathname`. Удаление статических тегов было лишним.

## План отката

### 1. `index.html` — вернуть статические SEO fallback-теги в `<head>`
Восстановить дефолты, которые краулер увидит до выполнения JS (Helmet их заменит per-route):
- `<meta name="description" content="...">` (общее EAC-описание)
- `<link rel="canonical" href="https://chea-taic.be/en">`
- `<meta property="og:title">`, `og:description`, `og:image`, `og:url`, `og:type`, `og:site_name`, `og:locale`
- `<meta name="twitter:card">`, `twitter:title`, `twitter:description`, `twitter:image`
- Оставить существующий дефолтный `<title>` и `<noscript>` блок

Все значения — общие EAC defaults (английская версия с canonical на `/en`). Helmet перезапишет их на каждом маршруте.

### 2. `src/main.tsx` — убрать DOM-очистку
Удалить блок `document.querySelectorAll(...).forEach((el) => el.remove())`. Он больше не нужен и вреден: стирает fallback до того, как Helmet успеет смонтироваться. Оставить только установку `document.documentElement.lang` и удаление `#ssr-h1`.

### 3. `src/components/Seo.tsx` — без изменений
Уже исправлен в предыдущей итерации (canonical берётся из pathname). Это и было настоящим решением проблемы canonical на FR/RU.

### Почему это безопасно
- Helmet **заменяет** теги по селектору `[name=description]`, `[rel=canonical]`, `[property=og:*]`, `[name=twitter:*]` — дублей в финальном DOM не будет.
- На JS-краулах (Google, Ahrefs JS-mode) теги будут актуальные per-route.
- На no-JS снимках (первый pass Ahrefs, превью-боты, соцсети без JS) — будут валидные дефолты вместо пустоты.

### Файлы
- `index.html` — добавить SEO fallback-теги
- `src/main.tsx` — убрать DOM-cleanup

### Не входит
- Sitemap, переводы, маршрутизация, редиректы apex/www
- 28 страниц с пустыми H1 в SSR — у нас SPA, статический H1 в `<noscript>` уже есть; per-route H1 рендерит React при выполнении JS
