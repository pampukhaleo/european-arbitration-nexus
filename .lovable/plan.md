

# Спринт 4 — Архитектура и качество кода

Цель: ускорить первую загрузку, защититься от падений, убрать устаревшие зависимости и отладочный мусор.

## Что меняем

### 1. Lazy loading маршрутов (`src/App.tsx`)
Перевести все страничные импорты на `React.lazy()` + обернуть `<Routes>` в `<Suspense fallback={...}>`. Главную страницу `Index` оставить эагерной — она нужна сразу.

Эффект: стартовый бандл уменьшится, каждая страница грузится по требованию. Особенно важно для админских страниц (AdminDashboard, GalleryManage, PaintingForm, TokenManagement, QrCodeGenerator) и редко используемых (Council, NewsDetail, политики).

Fallback: лёгкий компонент-плейсхолдер (центрированный спиннер на весь экран), чтобы не было белого мерцания.

### 2. Глобальный ErrorBoundary
Создать `src/components/ErrorBoundary.tsx` — классовый компонент с `componentDidCatch`. Показывает дружелюбное сообщение "Что-то пошло не так" + кнопку "Перезагрузить". Обернуть им `<Routes>` в `App.tsx`, чтобы ошибка рендера одной страницы не убивала всё приложение.

### 3. Миграция `react-helmet` → `react-helmet-async`
- Установить `react-helmet-async`, удалить `react-helmet` и `@types/react-helmet`.
- В `App.tsx` обернуть приложение в `<HelmetProvider>`.
- В `src/components/Seo.tsx` заменить импорт `Helmet` на `react-helmet-async`.
- API идентичен — другие правки не требуются.

### 4. Починка `manualChunks` в `vite.config.ts`
Текущая запись `ui: ["@/components/ui/button", "@/components/ui/card"]` не работает — `manualChunks` ждёт имена npm-пакетов. Заменить на функциональную форму, разделяющую vendor-чанки по группам:
- `react` (react, react-dom, react-router-dom)
- `radix` (все `@radix-ui/*`)
- `supabase` (`@supabase/*`)
- `lucide` (lucide-react)
- `forms` (react-hook-form, zod, @hookform/resolvers)

Эффект: лучше кеширование, обновление одной зависимости не инвалидирует весь vendor-бандл.

### 5. Убрать отладочные `console.log`
- `src/pages/gallery/TokenManagement.tsx` — найти и удалить (или обернуть в `if (import.meta.env.DEV)`).
- Параллельно пробежаться поиском `console.log` по `src/` и почистить явный отладочный мусор (оставить только `console.error` для реальных ошибок).

### 6. Очистка артефактов
- `convert-to-webp.js` в корне — одноразовый скрипт оптимизации, в build pipeline не используется. Удалить (если нужен — можно перенести в `scripts/`).
- Проверить `.lovable/plan.md` — оставшийся артефакт; не трогаем, это служебный файл.

## Файлы, которые будут изменены / созданы

Изменены:
- `src/App.tsx` — lazy + Suspense + ErrorBoundary + HelmetProvider
- `src/components/Seo.tsx` — импорт из `react-helmet-async`
- `vite.config.ts` — корректные `manualChunks`
- `src/pages/gallery/TokenManagement.tsx` — убрать `console.log`
- `package.json` — зависимости helmet

Созданы:
- `src/components/ErrorBoundary.tsx`
- `src/components/ui/PageLoader.tsx` (fallback для Suspense)

Удалены:
- `convert-to-webp.js`

## Что НЕ делаем
- Не трогаем мультиязычные URL-префиксы (отдельная большая работа).
- Не трогаем `react-helmet-async` SSR-обвязку — приложение чисто клиентское.
- Не рефакторим бизнес-компоненты — только инфраструктура.

## Проверка после применения
1. Сеть DevTools → видно подгрузку отдельных JS-чанков при переходе на страницы.
2. Любая ошибка в компоненте показывает наш ErrorBoundary, а не белый экран.
3. `<head>` по-прежнему содержит canonical + hreflang (helmet-async работает).
4. Сборка `bun run build` проходит без ошибок и предупреждений про manualChunks.

