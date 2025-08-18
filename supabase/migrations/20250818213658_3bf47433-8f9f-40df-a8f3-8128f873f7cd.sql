
-- 1) Enum для ролей и таблица ролей
do $$
begin
  if not exists (select 1 from pg_type t join pg_namespace n on n.oid=t.typnamespace
                 where n.nspname='public' and t.typname='app_role') then
    create type public.app_role as enum ('admin', 'moderator', 'user');
  end if;
end$$;

create table if not exists public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null,
  unique (user_id, role)
);

alter table public.user_roles enable row level security;

-- Разрешим только админам видеть и править роли (SQL-редактор Supabase всё равно обходит RLS)
drop policy if exists "Admins can manage user roles" on public.user_roles;
create policy "Admins can manage user roles"
  on public.user_roles
  for all
  to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

drop policy if exists "Admins can view user roles" on public.user_roles;
create policy "Admins can view user roles"
  on public.user_roles
  for select
  to authenticated
  using (public.has_role(auth.uid(), 'admin'));

-- 2) Функции для проверки ролей
create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = _user_id
      and role = _role
  )
$$;

create or replace function public.current_user_is_admin()
returns boolean
language sql
stable
security definer
as $$
  select public.has_role(auth.uid(), 'admin')
$$;

-- 3) Политики для картин
-- Удалим избыточное "Owners can manage their paintings"
drop policy if exists "Owners can manage their paintings" on public.paintings;

-- Админы могут всё
drop policy if exists "Admins can manage all paintings" on public.paintings;
create policy "Admins can manage all paintings"
  on public.paintings
  for all
  to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

-- Владельцы видят только свои картины (без изменения)
drop policy if exists "Owners can view their paintings" on public.paintings;
create policy "Owners can view their paintings"
  on public.paintings
  for select
  to authenticated
  using (auth.uid() = owner_id);

-- Публичный просмотр опубликованных (сохраним)
do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname='public' and tablename='paintings' and policyname='Public can view published paintings basic info'
  ) then
    create policy "Public can view published paintings basic info"
      on public.paintings
      for select
      to public
      using (is_published = true);
  end if;
end$$;

-- 4) Политики для токенов и логов
-- access_tokens: добавим права админам
drop policy if exists "Admins can manage all tokens" on public.access_tokens;
create policy "Admins can manage all tokens"
  on public.access_tokens
  for all
  to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

-- access_logs: админы могут видеть все логи
drop policy if exists "Admins can view all logs" on public.access_logs;
create policy "Admins can view all logs"
  on public.access_logs
  for select
  to authenticated
  using (public.has_role(auth.uid(), 'admin'));

-- 5) Обновим RPC generate_access_token: извлекаем owner по картине и проверяем права
create or replace function public.generate_access_token(painting_id_param uuid, template_type_param text)
returns table(token text, expires_at timestamptz)
language plpgsql
security definer
set search_path = public
as $$
declare
  new_token text;
  expiry_time timestamptz;
  v_owner_id uuid;
begin
  -- Найдем владельца картины
  select owner_id into v_owner_id
  from public.paintings
  where id = painting_id_param;

  if v_owner_id is null then
    raise exception 'Painting not found';
  end if;

  -- Проверим права: либо владелец, либо админ
  if not (auth.uid() = v_owner_id or public.has_role(auth.uid(), 'admin')) then
    raise exception 'Insufficient privileges';
  end if;

  -- Сгенерируем безопасный токен
  new_token := rtrim(
                 translate(
                   encode(extensions.gen_random_bytes(32), 'base64'),
                   '+/',
                   '-_'
                 ),
               '=');

  -- Срок действия по шаблону
  case template_type_param
    when '1hour' then
      expiry_time := now() + interval '1 hour';
    when '24hours' then
      expiry_time := now() + interval '24 hours';
    when '7days' then
      expiry_time := now() + interval '7 days';
    else
      raise exception 'Invalid template type';
  end case;

  -- Вставим токен
  insert into public.access_tokens (painting_id, owner_id, token, expires_at, template_type, created_ip, user_agent)
  values (
    painting_id_param,
    v_owner_id,
    new_token,
    expiry_time,
    template_type_param,
    current_setting('request.headers', true)::json->>'x-forwarded-for',
    current_setting('request.headers', true)::json->>'user-agent'
  );

  return query select new_token, expiry_time;
end;
$$;

grant execute on function public.generate_access_token(uuid, text) to authenticated;
