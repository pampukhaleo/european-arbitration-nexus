

# Фикс «белого экрана» при переходе между страницами

## Что сейчас происходит

Каждая страница в роутере подгружается лениво (`React.lazy`). При клике по ссылке React Router моментально снимает старую страницу с экрана и показывает `<Suspense fallback={<PageLoader/>}>`. Текущий `PageLoader` — это пустой `min-h-screen` со спиннером по центру, **без шапки и футера**. Отсюда «белый экран» с одинокой ссылкой `Skip to main content` на пару сотен миллисекунд.

## Решение — комбо из двух частей

### 1. Spinner показывается ВНУТРИ Layout, а не вместо него

`<Suspense>` поднимаем на уровень страницы: каждая lazy-страница оборачивается так, что Layout (Header + Footer) рендерится сразу, а spinner крутится только в области контента.

Технически — добавляем небольшой компонент-обёртку:

```tsx
// src/components/LazyPage.tsx
const LazyPage = ({ children }: { children: ReactNode }) => (
  <Layout>
    <Suspense fallback={
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    }>
      {children}
    </Suspense>
  </Layout>
);
```

И убираем `<Suspense>` верхнего уровня в `App.tsx` (оставляем только для роутов, у которых нет общего Layout — `/landing`, `/auth`).

Результат: при навигации шапка и футер не исчезают ни на миг, мигает только середина (и то — только если чанк не успел загрузиться).

### 2. Префетч чанков при наведении на ссылки меню

В `DesktopNav` / `MobileNav` / `NavDropdown` на ссылках в меню добавляется `onMouseEnter` (и `onTouchStart` для тача), который дёргает `import()` соответствующей страницы. К моменту клика чанк уже в кеше браузера → переход мгновенный, без спиннера вообще.

Реализация — небольшая мапа `path → () => import(...)`:

```tsx
// src/lib/routePrefetch.ts
const prefetchers: Record<string, () => Promise<unknown>> = {
  '/eac/about': () => import('@/pages/eac/About'),
  '/eac/council': () => import('@/pages/eac/Council'),
  '/eac/news': () => import('@/pages/eac/News'),
  '/arbitration/icac': () => import('@/pages/arbitration/ICAC'),
  // ...все остальные lazy-страницы
};
export const prefetchRoute = (path: string) => prefetchers[path]?.();
```

И в компонентах меню на каждой `<Link to={...}>` добавляется:
```tsx
onMouseEnter={() => prefetchRoute(to)}
onFocus={() => prefetchRoute(to)}
```

## Файлы

- `src/components/LazyPage.tsx` — новый, обёртка Layout + локальный Suspense
- `src/lib/routePrefetch.ts` — новый, мапа prefetcher'ов и хелпер
- `src/App.tsx` — оборачиваем все обычные Route'ы в `<LazyPage>`, убираем верхний `<Suspense>` (он остаётся только для `/landing` и `/auth`, у которых свой layout)
- `src/components/header/DesktopNav.tsx` — добавляем `onMouseEnter` с префетчем на пунктах меню
- `src/components/header/MobileNav.tsx` — то же + `onTouchStart`
- `src/components/header/NavDropdown.tsx` — то же для подпунктов

## Что НЕ трогаем

- `PageLoader.tsx` остаётся для первой загрузки `/landing`, `/auth` — там нет общего Layout, и полноэкранный лоадер уместен.
- Список lazy-страниц в `App.tsx` не сокращаем — code-splitting сохраняется, бандл не растёт.
- Ничего в `vite.config.ts` менять не нужно.

## Проверка

- Клик по «EAC → Council» из меню Header — шапка и футер не исчезают, в центре на миг (или вообще без него, если префетч успел) появляется спиннер, потом контент.
- Hover мышкой по «Arbitration → Rules» в desktop-меню → в DevTools Network видно, что чанк `Rules-*.js` загрузился ДО клика.
- На мобильном (где hover нет) — тап по ссылке: Layout остаётся, в области контента короткий спиннер.
- На странице `/landing` поведение прежнее (полноэкранный PageLoader при первой загрузке).

