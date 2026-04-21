

# Спринт 3 — SEO и конфигурация (после переезда с GitHub Pages)

Цель: убрать артефакты GitHub Pages, починить канонические URL, добавить `hreflang` для трёх языков.

## Что меняем

### 1. `src/components/Seo.tsx` — нормальные канонические URL + hreflang
- Канонический URL вернуть к стандартному виду: `${baseUrl}${location.pathname}` (без `/?/...`).
- Добавить `<link rel="alternate" hreflang="...">` для `en`, `fr`, `ru` и `x-default` (en). Все альтернативы указывают на текущий путь — переключатель языка не меняет URL, поэтому hreflang будут совпадать по path; это всё равно корректный сигнал для поисковиков о мультиязычности контента.
- В дальнейшем (вне спринта) можно усилить, добавив языковой префикс в URL — это отдельная большая задача.

### 2. `index.html` — убрать GitHub Pages артефакты
- Удалить блок скрипта "Single Page Apps for GitHub Pages" (между комментариями `Start … / End …`).
- Поправить favicon: `<link rel="icon" type="image/x-icon" href="/favicon.ico">` (тип уже корректен — это `.ico`, проверим, что нет png-варианта; если оставляем `.ico`, type правильный).

### 3. `public/404.html` — заменить редирект
- Заменить содержимое на простой 404 (или редирект на `/`), без spa-github-pages логики. На Lovable хостинге fallback на `index.html` идёт автоматически, поэтому файл по сути не нужен, но оставим минимальный.

### 4. `package.json` — убрать gh-pages
- Удалить поле `"homepage": "https://chea-taic.be"`.
- Удалить скрипты `predeploy`, `deploy`, `clean`.
- Удалить devDependency `gh-pages`.

### 5. `public/robots.txt` и `public/sitemap.xml`
- Убедиться, что `Sitemap:` указывает на текущий публичный домен (сейчас `https://chea-taic.be/sitemap.xml` — оставим, если домен будет подключаться; иначе временно поменяем на published URL).
- Sitemap проверим, что URL без `/?/` префиксов.

### 6. `src/lib/publicBaseUrl.ts` — оставляем как есть
Используется только для генерации QR/токен-ссылок галереи (изолированная фича). Не трогаем.

## Файлы, которые будут изменены
- `src/components/Seo.tsx`
- `index.html`
- `public/404.html`
- `package.json`
- `public/sitemap.xml` (если найдём `?/` URL)
- `public/robots.txt` (только если домен сменится)

## Что НЕ делаем в этом спринте
- Не трогаем мультиязычные URL-префиксы (`/en/...`, `/fr/...`) — это большая отдельная работа.
- Не трогаем `react-helmet → react-helmet-async` (это Спринт 4).
- Не трогаем lazy loading и ErrorBoundary (это Спринт 4).

## После применения
Проверим на превью: открыть DevTools → Elements → `<head>` → убедиться, что `<link rel="canonical">` теперь показывает чистый URL без `?/`, и что есть три `<link rel="alternate" hreflang="...">`.

