

# Хотфикс — Белый экран: ReferenceError в `react-helmet-async`

## Симптом
Сайт целиком в белый экран. В консоли:
```
Uncaught ReferenceError: Cannot access 'f' before initialization
    at helmet-D126U-9x.js:1:10001
```
Имя файла `helmet-*.js` — это наш ручной чанк из `vite.config.ts`.

## Причина
В `vite.config.ts` есть правило, которое выносит `react-helmet-async` в отдельный бандл:
```ts
if (id.includes("react-helmet-async")) {
  return "helmet";
}
```
`react-helmet-async@3` имеет внутренние циклические зависимости и общие модули с React. Когда Rollup кладёт её в свой чанк отдельно от React-чанка, переменные оказываются в TDZ (temporal dead zone) — обращение до инициализации. Это известная проблема именно с этим пакетом при агрессивном code-splitting.

Раньше билд срабатывал случайно (порядок модулей был «удачный»), сейчас Rollup перетасовал — и всё легло.

## Решение
Убрать ручной чанк для `react-helmet-async` из `vite.config.ts`. Пусть Vite сам решает, куда её положить (обычно — внутрь vendor/react чанка, где порядок инициализации корректен).

Изменение в `vite.config.ts`, удалить строки:
```ts
if (id.includes("react-helmet-async")) {
  return "helmet";
}
```

Размер бандла практически не изменится (helmet ~6KB gzipped), а ошибка уйдёт.

## Бонус — мелочи из консоли
1. `<meta name="apple-mobile-web-app-capable">` deprecated — нужно добавить рядом `<meta name="mobile-web-app-capable" content="yes">` в `index.html`.
2. `Failed to load resource: 421` — это не наше, это сетевой шум от хостинга/CDN, на белый экран не влияет.

Оба пункта — опционально, отдельным пуском, если захочешь.

## Файлы
- `vite.config.ts` — удалить блок `helmet` из `manualChunks`.
- (опционально) `index.html` — добавить `mobile-web-app-capable`.

## Проверка
После пересборки: главная грузится, в консоли нет `ReferenceError`, навигация работает.

