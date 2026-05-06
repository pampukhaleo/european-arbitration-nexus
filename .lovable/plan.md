## Проблема

После добавления префиксов `/en`, `/fr`, `/ru` главная страница ломается:

- Hero показывает «European Chamber ... Arbitration» с огромным пробелом
- Карточки сжаты в узкую колонку
- Контент идёт внутри `container` с `text-justify` и сеткой 3/4 + сайдбар

Причина: `src/components/Layout.tsx` проверяет:
```ts
const isHomePage = path === "/";
const isContactsPage = path === "/contacts";
```
Но реальный путь теперь `/en`, `/en/contacts` и т.д. — обе проверки возвращают `false`, поэтому главная попадает в ветку «обычная страница с сайдбаром» (`text-justify` на `<div>` растягивает слова в `<h1>` Hero, а контейнер сужает ширину).

## Исправление

Файл: `src/components/Layout.tsx`

1. Импортировать `stripLangPrefix` из `@/lib/i18nRouting`.
2. Получить нормализованный путь:
   ```ts
   const path = stripLangPrefix(location.pathname) || "/";
   ```
3. Оставить дальнейшую логику как есть — `isHomePage`, `isContactsPage` и `getSectionKey()` начнут работать корректно для `/en`, `/fr`, `/ru`.

## Проверка

- `/en`, `/fr`, `/ru` — full-width Hero, карточки на всю ширину (как на скриншоте 1).
- `/en/contacts` — full-width.
- `/en/eac/about` и др. — сайдбар `SectionNav` отображается, как раньше.

Изменение точечное, один файл.