

# Фикс — Белый экран при клике на логотип

## Симптом
При клике на логотип в шапке ненадолго появляется белый экран с одинокой ссылкой "Skip to main content", потом загружается главная.

## Причина
В `src/components/header/Logo.tsx` используется обычный HTML-тег `<a href="/">` вместо React Router `<Link to="/">`:

```tsx
<a href={'/'} className="...">
```

Браузер обрабатывает это как полную навигацию: выгружает SPA, делает HTTP-запрос за `/`, заново парсит HTML, грузит JS-бандл и только потом React рендерит главную. В промежутке виден голый `index.html` — там есть только accessibility-ссылка "Skip to main content", отсюда и эта картинка.

Все остальные ссылки в навигации используют `<Link>` из `react-router-dom` и работают мгновенно — без перезагрузки.

## Решение
Заменить в `Logo.tsx` `<a href="/">` на `<Link to="/">` из `react-router-dom`. Клик станет клиентской навигацией, белого экрана больше не будет.

```tsx
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/" className="flex items-center flex-shrink-0">
      <img
        src={`${import.meta.env.BASE_URL}logo.png`}
        alt="European Arbitration Chamber Logo"
        className="h-12 w-auto"
        style={{ maxWidth: '100%' }}
      />
    </Link>
  );
}
```

## Бонус (по желанию)
В консоли есть warning от React: `fetchPriority` на `<img>` в `Hero.tsx` написан camelCase'ом, но React 18 ожидает lowercase для нестандартных атрибутов. Это косметическое предупреждение, не ошибка. Если хочешь — заодно поправлю на `fetchpriority="high"` через атрибут или уберу совсем (у нас там `loading="eager"`, этого достаточно).

## Файлы
- `src/components/header/Logo.tsx` — заменить `<a>` на `<Link>`.
- (опционально) `src/components/home/Hero.tsx` — убрать/исправить `fetchPriority`.

## Проверка
Клик по логотипу с любой страницы → мгновенный переход на `/` без мигания белым.

