## Goal
Полностью скрыть страницу Council со всего сайта (навигация, sitemap, llms, prefetch, SEO-метаданные, роут).

## Changes

1. **`src/components/header/NavData.tsx`** — удалить пункт `EAC Council` из подменю EAC.
2. **`src/App.tsx`** — удалить импорт `Council` и роут `{ path: 'eac/council', Component: Council }`. Роут `/:lang/eac/council` при заходе попадёт в `NotFound` (`*`).
3. **`src/lib/routePrefetch.ts`** — удалить строку `/eac/council`.
4. **`src/lib/seoMetadata.ts`** — удалить запись `"/eac/council"` (чтобы SSG не сгенерировал под неё мета, а sitemap-генератор её не подхватил).
5. **`public/llms.txt`** — удалить строку `- [Council](/en/eac/council): ...`.
6. **`src/pages/eac/Council.tsx`** и **`src/components/council/CouncilMember.tsx`** — оставить файлы на диске (не импортируются, tree-shake их выкинет). Не трогаем локали и картинки — на случай если позже вернёте.

## Out of scope
- Локализованные строки `council.*` в `en/fr/ru.ts` — не удаляем (не мешают).
- Изображения в `public/images/council/` — не удаляем.
- 301-редирект со старого URL: пропускаем, страница уходит в 404 (пользователь просил "скрыть отовсюду").

## Verify
- `rg "eac/council"` возвращает только оставленный `Council.tsx` (сам файл страницы).
- После build: в `dist/sitemap.xml` нет `/eac/council`, в `dist/en/eac/council/index.html` — отсутствует.
