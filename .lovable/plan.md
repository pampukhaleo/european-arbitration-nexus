## Что не так сейчас (диагноз)

Я проверил реальный published HTML для `/fr/eac/about` и `/ru/arbitration/fees` — оба возвращают **один и тот же `index.html`** с английским title, description, canonical=`/en` и og:url=`/en`. Так и должно быть в SPA: SPA-fallback Lovable отдаёт один HTML на все маршруты, а Helmet меняет head только в браузере с JS.

Ahrefs (как и часть краулеров Google) видит именно этот сырой HTML → отсюда **все** SEO-ошибки за последние недели, и они не решаются точечными правками `index.html`/`main.tsx`:

- `Duplicate pages without canonical` (50) — 50 разных URL отдают одинаковый canonical=`/en` → Ahrefs считает их дублями без canonical на самих себя.
- `Missing reciprocal hreflang` (78), `Hreflang to non-canonical` — в HTML deep-link страниц нет `<link rel="alternate" hreflang>` (их добавляет только Helmet в браузере).
- `Non-canonical page in sitemap` — в sitemap лежит `/fr/eac/about`, но её canonical в HTML = `/en`.
- В прошлых отчётах: `Multiple meta description tags`, `Open Graph URL not matching canonical`, `Title too long`, `H1 tag missing` — все из той же причины.

Точечные правки `<head>` это не починят, потому что у каждой страницы должен быть **свой** HTML — а его сейчас не существует.

## Решение: build-time prerender

Генерируем статический HTML для каждого публичного URL **во время билда**, чтобы Lovable хостинг отдавал готовую страницу с правильными head-тегами без участия JS. React-приложение поверх сгенерированного HTML работает как раньше (гидратация, роутинг, интерактив).

Подход: `vite-plugin-prerender-spa` (или `vite-plugin-ssr-pre-render` / собственный postbuild-скрипт через `puppeteer`). Берём список URL из существующего `public/sitemap.xml` (он у нас уже актуален), для каждого URL рендерим страницу в headless-браузере, сохраняем готовый `index.html` в `dist/<path>/index.html`. Lovable-хостинг автоматически отдаст этот файл вместо SPA-fallback.

### Шаги

1. **Инструмент**: добавить dev-зависимость `puppeteer` + написать `scripts/prerender.mjs`.
   - Парсит `public/sitemap.xml` → массив путей (`/en`, `/fr/eac/about`, …).
   - Поднимает локально `vite preview` на порту, в puppeteer открывает каждый URL.
   - Ждёт `networkidle0` + сигнал готовности (`window.__APP_READY__ = true` после Helmet-mount).
   - Сохраняет `document.documentElement.outerHTML` в `dist/<path>/index.html`.

2. **Хук "готово к снимку"**: добавить в `src/main.tsx` после `createRoot().render()` коротенький `requestIdleCallback(() => { window.__APP_READY__ = true })`. Используется только prerender-скриптом, на пользователя не влияет.

3. **package.json**: новый скрипт `"prerender": "node scripts/prerender.mjs"` и `"build": "vite build && npm run prerender"`. Lovable-билд после этого выложит готовые файлы.

4. **Cleanup в `main.tsx`**: оставить блок удаления статических SEO-тегов **с условием** "только если страница не prerendered" — определяется по наличию маркера `<meta name="x-prerendered" content="true">`, который вставит скрипт. На prerendered страницах теги Helmet уже совпадают с DOM, удалять нечего, дублей не будет.

5. **`index.html`**: оставить английский fallback как есть — он используется только для маршрутов, которые prerender не покрывает (admin, gallery/manage, динамические `/gallery/:id/access/:token`), и для них и так стоит `noindex`.

6. **Sitemap**: оставить существующий — он уже консистентен с тем, что мы prerendered.

### Что входит в prerender

Все публичные локализованные маршруты из `sitemap.xml`:
- `/en`, `/fr`, `/ru`
- `/{lang}/eac/{about,council,news}` + статичные `/eac/news/:id` (ID известны из `src/data/news`)
- `/{lang}/arbitration/{icac,rules,fees,calculator,clause}`
- `/{lang}/expertise/{icje,expertiseFields}`
- `/{lang}/art-expertise/{authentication,appraisal,passport}`
- `/{lang}/gallery` (список — без детальных карточек)
- `/{lang}/membership/{benefits,join,conductCode}`
- `/{lang}/contacts`, `/{lang}/{privacy-policy,cookies-policy,terms-of-service}`
- `/{lang}/landing`

### Что НЕ входит

- `/auth`, `/admin/*`, `/gallery/manage/*`, `/gallery/:id/access/:token` — под `noindex`, остаются как SPA.
- `/gallery/:id` детальные карточки — динамические, добавим вторым шагом по запросу (там нужен fetch из Supabase в скрипте — больше работы).

### Технические детали

- Prerender выполняется на стороне Lovable во время `vite build`. Puppeteer тянет Chromium ~150 MB при первой установке — допустимо.
- Helmet всё равно остаётся (на клиентских переходах он обновляет head).
- Никаких изменений в Lovable-хостинге не требуется — он сам отдаст `dist/fr/eac/about/index.html` на запрос `/fr/eac/about`.

### Ожидаемый эффект на отчёт Ahrefs

| Ошибка | Сейчас | После |
|---|---|---|
| Duplicate pages without canonical | 50 | 0 |
| Missing reciprocal hreflang | 78 | 0 |
| Hreflang to non-canonical | 4 | 0 |
| Non-canonical page in sitemap | 3 (+28 removed) | 0 |
| Multiple meta description tags | 452 | 0 |
| OG URL not matching canonical | 451 | 0 |
| H1 tag missing | 42 | 0 |

`Image file size too large` (15) — отдельная задача, не входит в этот план.

### Файлы

- `package.json` — добавить `puppeteer`, скрипт `prerender`, изменить `build`.
- `scripts/prerender.mjs` — новый.
- `src/main.tsx` — добавить `__APP_READY__`-маркер и условие cleanup.

### Риски

- Puppeteer может не уложиться в build-time лимит (обычно 60–120с на ~150 страниц — нормально).
- Если какая-то страница падает в prerender (ошибка JS), скрипт логирует URL и продолжает; SPA-fallback её обслужит как раньше.
