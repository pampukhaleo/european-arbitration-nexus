

# План фиксов оставшихся 5 находок безопасности

После чистки легаси: **2 ошибки + 3 ворнинга**. Половина уже понятна из `pg_policies`, ниже — что именно делаем.

## 🔴 1. Profiles: emails и has_paid публично читаемы + self-upgrade has_paid

**Что нашёл:**
- UPDATE-политика `Users can update their own profile` имеет `USING (auth.uid() = id)` но **`with_check: nil`** — то есть юзер может обновлять свою строку без ограничений на колонки. `UPDATE profiles SET has_paid = true WHERE id = auth.uid()` пройдёт.
- `has_paid` и `website_url` — поля от старого «гильдийного» проекта, в коде сайта **не используются вообще** (грепнул — только auto-generated `types.ts`).
- Email юзера видит только сам юзер и админы (`USING (auth.uid() = id)`) — это норм, не дыра.

**Фикс — миграция:**
1. Дропнуть колонки `has_paid` и `website_url` из `profiles` — они не используются и являются легаси.
2. Пересоздать UPDATE-политику с `WITH CHECK (auth.uid() = id)` чтобы юзер не мог поменять `id` на чужой.
3. Дополнительно: ограничить SELECT-политики ролью `authenticated` (сейчас `public` — для анонов всё равно не сработает из-за `auth.uid() IS NULL`, но для чистоты).

## 🔴 2. Storage: владельцы могут трогать чужие файлы

**Что нашёл — двойной набор политик:**
- ✅ Корректные: `Users can delete/update/upload their own painting images` — проверяют `(auth.uid())::text = (storage.foldername(name))[1]` (путь = `<uid>/file.jpg`)
- ❌ Сломанные: `Owners and admins can delete/update/upload paintings storage` — проверяют только «есть ли у тебя ХОТЬ ОДНА картина»
- ✅ SELECT: `Public can read individual painting files` (см. п.5)

В Supabase любая permissive политика разрешает → сломанные перекрывают корректные.

**Нюанс:** структура путей сейчас `<auth.uid>/file.jpg`, не `<painting_id>/file.jpg`. Это значит "владелец" в storage = тот, кто загрузил, а не владелец картины. Картина может иметь несколько владельцев (через `painting_owners`), и не каждый из них загружал её файлы. Если оставить только path-based политику, то второй владелец не сможет обновить файл первого.

**Решение:** заменить сломанные политики на корректные admin-only:
1. `DROP POLICY "Owners and admins can delete paintings storage"` — оставляем только path-based (загрузивший) + admin
2. `DROP POLICY "Owners and admins can update paintings storage"` — то же
3. `DROP POLICY "Owners and admins can upload paintings"` — дублирует path-based
4. Добавить отдельные `Admins can manage all paintings storage` для DELETE/UPDATE/INSERT через `has_role(auth.uid(), 'admin')` — чтоб админ всё ещё мог чистить любые файлы.

Итог: загрузивший юзер трогает только свои файлы, админ — всё, картину с несколькими владельцами загружает обычно админ через UI → проблем не возникает.

## 🟡 3. Access logs SELECT для роли `public` (false positive)

Сканер сам пишет «no actionable change needed». Анон с `auth.uid()=null` ничего не получит. Для чистоты всё равно перевешу на `authenticated`:
1. `DROP POLICY "Owners can view logs for their paintings"` → пересоздать `TO authenticated`.
2. `DROP POLICY "Admins can view all access logs"` → пересоздать `TO authenticated`.

## 🟡 4. Leaked Password Protection (manual)

Не правится кодом. После миграций дам прямую ссылку:  
**Authentication → Providers → Email → Password security → "Check passwords against HaveIBeenPwned"** → ON.  
Помечу finding как `ignore` с пометкой «manual user action required».

## 🟡 5. Public bucket allows listing

**Что нашёл:** SELECT-политика `Public can read individual painting files` для `{anon,authenticated}` с `bucket_id = 'paintings' AND name IS NOT NULL` — это разрешает и `LIST` (потому что Postgres-RLS не различает GET по имени и LIST по префиксу, обе операции = SELECT с `name LIKE 'prefix%'`).

**Решение без поломки галереи:**
- Бакет `paintings` помечен **Public** в Supabase. Это значит, что прямой URL `https://...supabase.co/storage/v1/object/public/paintings/<path>` отдаёт файл **в обход RLS**. Сайт использует именно такие public-URL (`public_image_url` в `paintings` уже содержит готовый URL).
- Значит SELECT-политику на `storage.objects` для `anon` можно **полностью убрать** — публичный CDN-доступ продолжит работать через public URL, а LIST для анонов закроется.
- Для `authenticated` оставим SELECT, чтобы админский UI мог листать.

**Фикс — миграция:**
1. `DROP POLICY "Anyone can view painting images"` (для `public` — слишком широкая)
2. `DROP POLICY "Public can read individual painting files"` (для `anon,authenticated` — даёт LIST)
3. Создать `Authenticated can read painting files` для `authenticated` — чтоб логин-юзеры (админ-UI, owner-формы) могли получать listings.

Анонимные посетители продолжат видеть картины по public URL — это не проходит через RLS вообще.

## Файлы кода — НЕ трогаем

Весь фикс — в БД. В `src/` ничего не меняется:
- `has_paid`, `website_url` нигде в коде нет → дроп колонок не сломает сборку.
- `from('profiles')` используется только в админских компонентах под `authenticated` → политики не ломаются.
- Public-доступ к картинам идёт через `public_image_url` (CDN public URL), не через `supabase.storage.from('paintings').list()` для анонов.

## Порядок выполнения (одна сессия)

```text
Migration 1 → profiles: drop has_paid/website_url, fix UPDATE WITH CHECK, scope SELECTs to authenticated
Migration 2 → storage: drop 3 broken "Owners and admins" policies, add admin-only mgmt
Migration 3 → access_logs: scope SELECT policies to authenticated
Migration 4 → storage SELECT: remove anon SELECT, keep public CDN access
Mark fixed: 4 findings (profiles, storage cross-owner, access_logs, public listing)
Mark ignored: leaked_password (manual user action)
```

## Pre-flight check (перед миграциями)

- Подтвердить, что в storage путях используется `<auth.uid>/...` (а не `<painting_id>/...`) — уже проверил по политикам, да.
- Подтвердить, что `public_image_url` в `paintings` содержит полный CDN URL — гляну 1-2 строки запросом, чтобы быть уверенным что отключение anon SELECT не сломает галерею.

## Post-migration check

- Открыть `chea-taic.be/gallery` инкогнито → картины грузятся (через CDN public URL).
- Открыть детальную страницу картины анонимом → грузится.
- Залогиниться админом → `/gallery/manage`, загрузка картин работает.
- Попробовать `UPDATE profiles SET has_paid=true` → колонки нет, фейл (как и должно быть).
- Security scan → 4 находки исчезли, осталась только Leaked Password Protection (manual).

