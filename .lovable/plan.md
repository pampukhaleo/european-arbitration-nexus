# Fix: Non-canonical pages in sitemap

## Причина
Routes-редиректы (`/<lang>/eac`, `/arbitration`, `/expertise`, `/art-expertise`, `/membership`, `/cookies`, `/about`) пре-рендерятся в HTML и затем подхватываются `scripts/generate-sitemap.mjs`. Их `<link rel="canonical">` указывает на конечную страницу (`/eac/about`, `/arbitration/icac`, …), из-за чего Ahrefs помечает их как «Non-canonical page in sitemap».

## Что меняем

### 1. `scripts/generate-sitemap.mjs`
Добавить в `SKIP_RE` regex, исключающий redirect-разделы для всех трёх языков:

```js
const REDIRECT_SEGMENTS = [
  'eac',
  'arbitration',
  'expertise',
  'art-expertise',
  'membership',
  'cookies',
  'about',
];
const SKIP_LOCALIZED_RE = new RegExp(
  `^/(en|fr|ru)/(${REDIRECT_SEGMENTS.join('|')})/?$`
);
```

И отфильтровать маршруты:
```js
.filter((r) => !SKIP_RE.test(r) && !SKIP_LOCALIZED_RE.test(r))
```

### 2. (опционально, рекомендуется) `scripts/organize-dist.mjs`
Дополнительно удалить сами `index.html` этих redirect-папок из `dist`, чтобы Ahrefs/Google не находили их и через внутренние ссылки. Это безопасно: внутри приложения по этим путям всё равно стоит `<Navigate>`, так что SPA-навигация продолжит работать; для прямых заходов сработает SPA fallback (`200.html` Lovable) и редирект на хидрации.

Если решим **не удалять** HTML — тогда оставить только п.1, и Ahrefs перестанет ругаться (т.к. правило именно «non-canonical *in sitemap*»). Конфликта в индексе Google не будет: canonical в этих файлах честно указывает на правильную целевую страницу.

### 3. Проверка после билда
- `grep -c '<loc>' dist/sitemap.xml` — должно стать на 21 URL меньше (7 сегментов × 3 языка).
- Открыть `dist/sitemap.xml` и убедиться, что URL вида `/en/eac`, `/ru/arbitration` и т.д. отсутствуют.

## Что НЕ трогаем
- `src/App.tsx` — `<Navigate>` редиректы для UX оставляем.
- `Seo.tsx` / `RouteSeo.tsx` — canonical-логика корректна, менять не нужно.
- `robots.txt` — без изменений.

## После деплоя
1. Опубликовать.
2. В Ahrefs нажать **Rescan** на этом issue.
3. В Google Search Console → Sitemaps → Resubmit `sitemap.xml`.
