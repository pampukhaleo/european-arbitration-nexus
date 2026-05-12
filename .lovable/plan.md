# Plan: миграция chea-taic.be на vite-react-ssg (SSG)

## Зачем
Проверка показала, что проект **expertise.com.ua** живёт ровно на том же Lovable hosting, что и `chea-taic.be`, и при этом получает 100% в Ahrefs. Секрет — `vite-react-ssg`: при `vite build` каждый маршрут рендерится в отдельный физический `dist/<route>/index.html` с уже готовыми `<title>`, `<meta description>`, `<link rel="canonical">`, `<link rel="alternate" hreflang>`, `<h1>` и JSON-LD внутри. Lovable hosting эти вложенные `index.html` отдаёт как есть, а если файла нет — срабатывает SPA-fallback. Значит, мой прошлый вывод «SSG на Lovable невозможен» был неверным, и мы можем повторить тот же подход здесь.

После миграции исчезнут практически все «новые» ошибки Ahrefs:
- multiple title / description / H1 / canonical / alternate (статический HTML отдаёт ровно один набор тегов на маршрут);
- duplicate canonical между языками (у `/en/eac/about`, `/fr/eac/about`, `/ru/eac/about` будут разные физические файлы с разными canonical);
- pages not in sitemap / hreflang group not crawled (sitemap будет генерироваться из реального списка статических маршрутов);
- description length и т. п. — фиксятся попутно в `seoMetadata.ts`.

Lovable Cloud, Supabase, авторизация, админка, галерея и весь рантайм-функционал продолжают работать после гидратации — SSG только пред-рендерит публичные страницы, не ломает SPA-поведение.

## Что меняется на верхнем уровне
1. `package.json` — добавляются `vite-react-ssg`, `vite-plugin-imagemin` (опц.), скрипты `dev`/`build` переходят на `vite-react-ssg`, появляются `postbuild` шаги (organize-dist + sitemap).
2. `vite.config.ts` — добавляется `ssr.noExternal: ['react-helmet-async']` и (опц.) imagemin.
3. `src/main.tsx` — переписывается под `ViteReactSSG({ routes, basename })`.
4. `src/App.tsx` — `BrowserRouter` + `<Routes>` заменяются на массив `routes: RouteRecord[]` (формат `vite-react-ssg`), сохраняя текущую структуру `/:lang/...`. Провайдеры (`HelmetProvider`, `QueryClient`, `Auth`, `Language`) переезжают в RootLayout с `<Outlet />`. Авторизованные/админские маршруты остаются обычными SPA-маршрутами и **исключаются из SSG** (без `entry`, либо помечаются как `ssr: false`).
5. `index.html` — убираются захардкоженные `<title>`, `<meta description>`, `<og:*>`, `<twitter:*>`, `<h1 id="ssr-h1">`. Их теперь печатает Helmet во время SSG, на каждой странице — свои.
6. Динамические маршруты (`/eac/news/:id`) получают `getStaticPaths()`, который возвращает все 3 языка × все ID новостей.
7. `scripts/organize-dist.js` — копия из expertise (превращает `foo.html` → `foo/index.html`).
8. `scripts/generate-sitemap.js` — генерирует `dist/sitemap.xml` из реального списка отрендеренных файлов с правильными hreflang-ссылками. Существующий статический `public/sitemap.xml` удаляется (он будет перезаписываться сборкой).
9. `RouteSeo.tsx` — упрощается: больше не нужен скрытый `<h1 class="sr-only">`, страницы получают свой `<h1>` (или мы рендерим один в самом макете). Дубликаты пропадают.
10. `seoMetadata.ts` — заодно поправим длины description (120–158 символов) для главных, ICAC, Rules, Fees, Calculator на всех 3 языках.

## Маршрутизация: маппинг
Текущие SPA-маршруты → SSG-маршруты:

```text
/:lang                                index            (3 файла:  en|fr|ru/index.html)
/:lang/eac/about                      static           (3 файла)
/:lang/eac/council                    static           (3 файла)
/:lang/eac/news                       static           (3 файла)
/:lang/eac/news/:id                   getStaticPaths   (3 × N новостей)
/:lang/arbitration/icac|rules|fees|calculator|clause   (3 × 5)
/:lang/expertise/icje|expertiseFields                  (3 × 2)
/:lang/art-expertise/authentication|appraisal|passport (3 × 3)
/:lang/membership/benefits|join|conductCode            (3 × 3)
/:lang/contacts, /privacy-policy, /cookies-policy, /terms-of-service (3 × 4)
/:lang/landing                        static           (3 файла)

/auth, /admin/dashboard, /gallery/manage*             — SPA-only, без SSG
/:lang/gallery, /:lang/gallery/:id                    — SPA-only (данные приходят из Supabase в рантайме)
```

Корневой `/` остаётся клиентским редиректом `RootLanguageRedirect` (он уже есть). Для краулеров мы сгенерируем статический `/` с `meta refresh` + `<link rel="alternate" hreflang>` на en/fr/ru и `x-default → /en`.

## Технические детали
- **Провайдеры в SSG**: `LanguageProvider` и `AuthProvider` сейчас лезут в `localStorage`/`window`. На стороне Node это упадёт. Обернём обращения в `typeof window !== 'undefined'` (и/или вынесем чтение в `useEffect`). Это безопасно: на SSG-проходе берём язык из URL (`/:lang`), `AuthProvider` стартует с `user = null` и подгружает сессию уже в браузере — публичные страницы от этого визуально не зависят.
- **Supabase**: клиент инициализируется лениво; вызовы делаются только в `useEffect`/обработчиках, поэтому SSG их не дернёт. Если где-то есть top-level fetch — переносим в `useEffect`.
- **react-helmet-async**: уже подключён, для SSG нужен `noExternal` в vite.config (см. expertise).
- **Маршруты с `Navigate replace`** (например `eac → about`) превращаются либо в реальную страницу (рендерим `EACAbout` на обоих маршрутах), либо в простой клиентский редирект с `<meta refresh>` (хуже для SEO, поэтому предпочтительно дублировать контент или сделать canonical на основной).
- **Sitemap + robots.txt**: генерируем из списка собранных `dist/**/index.html`, кладём `dist/sitemap.xml` и `dist/robots.txt` (`Sitemap: https://chea-taic.be/sitemap.xml`).

## Шаги реализации (после approve)
1. Установка зависимостей: `vite-react-ssg`.
2. Правка `vite.config.ts` (добавить `ssr.noExternal`).
3. Создание `scripts/organize-dist.js` и `scripts/generate-sitemap.js` (адаптированные под 3 языка и hreflang).
4. Обновление `package.json` scripts: `dev: vite-react-ssg dev`, `build: vite-react-ssg build && node scripts/organize-dist.js && node scripts/generate-sitemap.js`.
5. Рефакторинг `src/main.tsx` → `ViteReactSSG`.
6. Рефакторинг `src/App.tsx` → экспорт `routes: RouteRecord[]` + `RootLayout` с провайдерами и `<Outlet />`.
7. На страницах с динамикой (`NewsDetail`) — экспорт `Component` и `getStaticPaths()` (en/fr/ru × все ID из `newsData`).
8. Изоляция браузерного API в `LanguageProvider` / `AuthProvider` (`typeof window`).
9. Чистка `index.html` — убрать дублирующие `<title>/<meta description>/<og>/<twitter>/<h1 id="ssr-h1">`.
10. Чистка `RouteSeo.tsx` — убрать `sr-only h1`. Где у страницы нет своего `<h1>` — добавить локальный.
11. Поправить description-длины в `seoMetadata.ts` (120–158 символов).
12. Удалить статический `public/sitemap.xml` (его теперь генерирует postbuild).
13. Локально прогнать `npm run build`, проверить:
    - наличие `dist/en/eac/about/index.html`, `dist/fr/eac/about/index.html`, `dist/ru/eac/about/index.html` с разными `<title>`/`<canonical>`/`<h1>`;
    - отсутствие дубликатов `<meta description>`/`<h1>`;
    - корректный `dist/sitemap.xml`.
14. Опубликовать через Lovable Publish.

## Что НЕ трогаем
- Кастомный домен и DNS — остаются на Lovable.
- Supabase-схему, RLS, edge-функции, галерею, авторизацию.
- Дизайн, UI, локализации (тексты `t(...)`).
- Никаких `_redirects`, `404.html`, `vercel.json`, `netlify.toml` — они на Lovable не нужны.

## Риски и как их закрываем
- **SSG падает на компоненте, лезущем в `window`** → правим точечно (typeof window guard) при первой же ошибке сборки.
- **Дублирование контента из-за `Navigate`-редиректов** → вместо `Navigate` в SSG-маршрутах рендерим целевую страницу + canonical на основной.
- **Время сборки растёт** (≈150 страниц). Приемлемо: у expertise.com.ua сопоставимый объём и собирается штатно.

После твоего ✅ начну с шага 1.
