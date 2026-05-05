## SEO & code audit (Lovable hosting only)

Поскольку сайт больше не на GitHub Pages, а только на Lovable, нужно убрать GitHub-специфичные артефакты и привести SEO в порядок с учётом нового хостинга и двух свежих новостей.

### Что уже хорошо
- Каждая страница рендерит `<Seo>` с title/description, canonical, hreflang (en/fr/ru), OG, Twitter, JSON-LD.
- Приватные/admin маршруты помечены `noindex`.
- `robots.txt` корректно блокирует `/auth`, `/admin/`, `/gallery/manage/` и указывает на `sitemap.xml`.
- На Lovable hosting deep-link / refresh работают сами по себе — никаких redirect-файлов не нужно.

### Найденные проблемы

1. **GitHub Pages артефакты в `package.json`**
   - `"homepage": "https://chea-taic.be"` — это поле для `gh-pages`, для Vite/Lovable не нужно.
   - `"predeploy"` и `"deploy": "gh-pages -d dist"` — больше не используется.
   - Зависимость `gh-pages` (devDep) больше не нужна.

2. **`public/404.html` — `<meta http-equiv="refresh" content="0; url=/">`**
   - Это был SPA-fallback для GitHub Pages. На Lovable hosting fallback встроен, и этот файл больше не нужен / даже вреден: при реальной 404 (опечатка в URL) пользователь молча редиректится на главную без сигнала.
   - Удалить файл (Lovable сам отдаст `index.html` для SPA-маршрутов; для несуществующих маршрутов сработает наш `NotFound.tsx`, который должен ставить `noindex`).

3. **Memory устарела**
   - В `mem://index.md` написано «Hosted on GitHub Pages using 'spa-github-pages' routing». Обновить core-правило на «Hosted on Lovable; SPA fallback встроен, redirect-файлы не нужны».
   - Удалить файл `mem://hosting/github-pages-routing` (или заменить кратким напоминанием про Lovable).

4. **`public/sitemap.xml` устарел**
   - Нет двух новых новостей 2026: `/eac/news/20260` (17 марта) и `/eac/news/20261` (7 апреля).
   - Все `lastmod` стоят `2025-09-19` — обновить ключевые страницы (homepage, `/eac/news`, активные разделы) на текущую дату 2026-05-05. Исторические новости можно оставить.

5. **`public/rss.xml` устарел**
   - Последний item — апрель 2024. Добавить два новых 2026-item'а, обновить `<lastBuildDate>`.

6. **`src/pages/eac/NewsDetail.tsx` — JSON-LD `datePublished`**
   - Сейчас передаётся строка вида `"Apr 07 2026"`. Schema.org требует ISO-8601 (`2026-04-07`). Конвертировать `newsItem.date` в ISO для `datePublished`/`dateModified` (отображаемую строку оставить как есть).

7. **`src/lib/publicBaseUrl.ts`** — дефолт уже `https://chea-taic.be`, ок.

8. **`src/components/Seo.tsx`** — использует `window.location.origin`, что на Lovable работает корректно (preview/published/custom domain). Изменения не нужны.

9. **`src/pages/NotFound.tsx`** — стоит проверить, что он отдаёт `<Seo robots="noindex, nofollow">`. Если нет — добавить.

10. **`index.html` `og:image`** указывает на превью-картинку с `pub-...r2.dev/...lovable.app...`. Заменить на стабильный `https://chea-taic.be/eap-banner-1200x630.png` (файл уже лежит в `public/`), чтобы соцсети не ломались при смене preview.

### План правок

**A. Очистить от GitHub Pages**
- `package.json`: удалить `homepage`, `predeploy`, `deploy`; удалить `gh-pages` из devDependencies.
- Удалить `public/404.html`.

**B. Обновить память проекта**
- Перезаписать `mem://index.md`: заменить core-строку про GitHub Pages на «Hosted on Lovable; SPA deep-link fallback встроен, redirect-файлы (`_redirects`, `404.html`) не нужны». Убрать ссылку на `mem://hosting/github-pages-routing`.
- При желании — удалить/переписать `mem://hosting/github-pages-routing`.

**C. Обновить `public/sitemap.xml`**
- Добавить `<url>` для `/eac/news/20260` (lastmod 2026-03-17) и `/eac/news/20261` (lastmod 2026-04-07).
- Обновить `lastmod` главной, `/eac/news` и основных разделов на 2026-05-05.

**D. Обновить `public/rss.xml`**
- Добавить два новых `<item>` (EN title/excerpt + link/guid/pubDate).
- Обновить `<lastBuildDate>`.

**E. `src/pages/eac/NewsDetail.tsx`**
- Конвертировать `newsItem.date` в ISO-формат (`new Date(newsItem.date).toISOString().split('T')[0]`) для полей JSON-LD.

**F. `src/pages/NotFound.tsx`**
- Убедиться/добавить `<Seo title="Page not found" description="..." lang={language} robots="noindex, nofollow" />`.

**G. `index.html`**
- Заменить `og:image` и `twitter:image` на `https://chea-taic.be/eap-banner-1200x630.png`.

### Вне scope
- Автогенерация sitemap/rss при сборке (Vite-плагин). При текущем темпе обновлений — ручные правки достаточны.
- Серверный пререндеринг (SSR/SSG): Lovable отдаёт SPA, поисковики Google нормально индексируют клиентский рендер с правильными `<Seo>` тегами через React Helmet.
