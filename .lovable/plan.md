

# Шаг 0: Чистка legacy DKP/Guild — без риска для chea-taic.be

Главное условие: сайт chea-taic.be (галерея + арбитраж) продолжает работать как сейчас. Ниже — что именно я делаю и почему это не сломает ни одну страницу.

## Гарантии безопасности изменений

**Грепнул `src/` на использование легаси:**
- `from('users')` — **0 совпадений** в коде
- `from('guilds')` — **0 совпадений**
- `from('invite_codes')` — **0 совпадений**
- `from('payments')` — **0 совпадений**
- `users.roles` / `dkp_balance` / `guild_id` / `is_approved` — **0 совпадений**

Реальные таблицы, которые использует сайт: `paintings`, `painting_owners`, `painting_private`, `access_tokens`, `access_logs`, `profiles`, `user_roles`. Их **не трогаю**.

**Edge-функции:** проверю перед миграцией, не ссылается ли какая-нибудь edge-функция на `users`/`guilds`/`payments`. Если ссылается — стоп, спрошу.

## Что делает миграция

```sql
-- 1. Снять политики, которые читают users.roles
DROP POLICY IF EXISTS "Allow admins to manage all guilds" ON public.guilds;
DROP POLICY IF EXISTS "Allow users to view their guild" ON public.guilds;
DROP POLICY IF EXISTS "Allow admins to manage all invite codes" ON public.invite_codes;
DROP POLICY IF EXISTS "Allow guild admins to manage invite codes" ON public.invite_codes;
DROP POLICY IF EXISTS "Allow admins to update any user" ON public.users;
DROP POLICY IF EXISTS "Allow admins to view all users" ON public.users;
DROP POLICY IF EXISTS "Allow guild leaders to view users in their guild" ON public.users;
DROP POLICY IF EXISTS "Allow users to view their own data" ON public.users;
DROP POLICY IF EXISTS "Guild leaders can update users in their guild (fields restricte" ON public.users;
DROP POLICY IF EXISTS "Users can update their own row (fields restricted by trigger)" ON public.users;

-- 2. Дропнуть legacy-таблицы
DROP TABLE IF EXISTS public.invite_codes CASCADE;
DROP TABLE IF EXISTS public.guilds CASCADE;
DROP TABLE IF EXISTS public.payments CASCADE;
DROP TABLE IF EXISTS public.users CASCADE;

-- 3. Дропнуть legacy-функции
DROP FUNCTION IF EXISTS public.protect_users_privileged_columns() CASCADE;
DROP FUNCTION IF EXISTS public.users_protected_fields_unchanged(
  text[], text[], boolean, boolean, boolean, boolean,
  numeric, numeric, numeric, numeric, uuid, uuid
) CASCADE;
```

## Что НЕ трогаю

- `auth.users` (управляется Supabase, не путать с `public.users`)
- `profiles`, `user_roles`, `paintings`, `painting_owners`, `painting_private`, `access_tokens`, `access_logs`
- Триггер `on_auth_user_created` → `handle_new_user()` (создаёт `profiles`, не `users`)
- Функцию `has_role()` и enum `app_role`
- Storage-бакет `paintings`
- Любой код в `src/`
- Edge-функции

## Pre-flight check (перед миграцией)

Запущу 4 read-only запроса в имплементации:
1. `SELECT count(*) FROM public.users;` — ожидаем ≤ 1
2. `SELECT count(*) FROM public.guilds;` — ожидаем 0
3. `SELECT count(*) FROM public.invite_codes;` — ожидаем 0
4. `SELECT count(*) FROM public.payments;` — ожидаем 0
5. Грепну `supabase/functions/` на упоминания легаси-таблиц

Если что-то из этого не пусто или edge-функция ссылается — **остановлюсь и спрошу**, прежде чем дропать.

## Post-migration check

- `src/integrations/supabase/types.ts` перегенерируется автоматически — типов `users`/`guilds`/`payments`/`invite_codes` там не станет, но т.к. их нет и в коде — TypeScript-сборка не упадёт.
- Открыть chea-taic.be: главная, `/gallery`, любая картина, `/contacts`, админ-логин — всё работает.
- В Supabase Linter: находки про `users.roles` privilege escalation и `invite_codes readable` исчезают.

## Что после этого

Останется 4 security-находки (вместо 6):
- 🔴 Storage: чужие файлы можно трогать
- 🟡 `paintings.owner_id` утечка анонам
- 🟡 Leaked Password Protection (ручное)
- 🟡 Storage bucket allows listing

Подготовлю по ним отдельный план следующим шагом.

