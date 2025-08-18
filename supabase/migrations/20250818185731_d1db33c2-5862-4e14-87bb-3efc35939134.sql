
-- 0) Роли и утилиты
create type if not exists public.app_role as enum ('admin', 'owner', 'user');

create table if not exists public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null,
  unique (user_id, role)
);
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = _user_id
      and role = _role
  )
$$;

grant execute on function public.has_role(uuid, public.app_role) to authenticated;

-- Политики на user_roles: админы управляют, пользователи читают свои
create policy if not exists "Admins manage user roles"
on public.user_roles
for all
to authenticated
using (public.has_role(auth.uid(),'admin'))
with check (public.has_role(auth.uid(),'admin'));

create policy if not exists "Users can read their own roles"
on public.user_roles
for select
to authenticated
using (auth.uid() = user_id);

-- Удобная RPC: текущий пользователь — админ?
create or replace function public.current_user_is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.has_role(auth.uid(), 'admin'::public.app_role)
$$;
grant execute on function public.current_user_is_admin() to authenticated;

-- 1) Профили: email + триггер для автозаполнения
alter table public.profiles add column if not exists email text;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $function$
begin
  insert into public.profiles (id, full_name, email, has_paid, website_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.email),
    new.email,
    false,
    null
  )
  on conflict (id) do update
    set full_name = excluded.full_name,
        email = excluded.email,
        updated_at = now();
  return new;
exception
  when others then
    raise warning 'Failed to create/update profile for user %: %', new.id, sqlerrm;
    return new;
end;
$function$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Бэкфилл существующих профилей
insert into public.profiles (id, full_name, email)
select u.id, coalesce(u.raw_user_meta_data->>'full_name', u.email), u.email
from auth.users u
on conflict (id) do update
  set email = excluded.email,
      full_name = coalesce(public.profiles.full_name, excluded.full_name),
      updated_at = now();

-- 2) RLS на paintings: админ — полный доступ, владелец — только просмотр своих
drop policy if exists "Owners can manage their paintings" on public.paintings;

create policy if not exists "Admins can manage all paintings"
on public.paintings
for all
to authenticated
using (public.has_role(auth.uid(), 'admin'))
with check (public.has_role(auth.uid(), 'admin'));

create policy if not exists "Owners can view their own paintings"
on public.paintings
for select
to authenticated
using (owner_id = auth.uid());

-- (Существующую политику "Public can view published paintings basic info" сохраняем)

-- 3) RLS на access_tokens: админ — полный доступ, владелец — только к своим картинам
drop policy if exists "Owners can manage their tokens" on public.access_tokens;

create policy if not exists "Admins can manage all tokens"
on public.access_tokens
for all
to authenticated
using (public.has_role(auth.uid(), 'admin'))
with check (public.has_role(auth.uid(), 'admin'));

create policy if not exists "Owners can manage tokens for their paintings"
on public.access_tokens
for all
to authenticated
using (
  exists (
    select 1 from public.paintings p
    where p.id = access_tokens.painting_id
      and p.owner_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.paintings p
    where p.id = access_tokens.painting_id
      and p.owner_id = auth.uid()
  )
);

-- 4) RLS на access_logs: админ видит все
create policy if not exists "Admins can view all logs"
on public.access_logs
for select
to authenticated
using (public.has_role(auth.uid(), 'admin'));

-- 5) Политики Storage для bucket 'paintings': админ — полный доступ
create policy if not exists "Admins manage all painting images"
on storage.objects
for all
to authenticated
using (bucket_id = 'paintings' and public.has_role(auth.uid(),'admin'))
with check (bucket_id = 'paintings' and public.has_role(auth.uid(),'admin'));

-- 6) Функция генерации токена: owner_id берем из картины
create or replace function public.generate_access_token(
  painting_id_param uuid,
  template_type_param text,
  owner_id_param uuid
)
returns table(token text, expires_at timestamp with time zone)
language plpgsql
security definer
set search_path = public
as $function$
declare
  new_token text;
  expiry_time timestamptz;
  painting_owner uuid;
begin
  select owner_id into painting_owner
  from public.paintings
  where id = painting_id_param;

  if painting_owner is null then
    raise exception 'Painting not found';
  end if;

  new_token := rtrim(
                 translate(
                   encode(extensions.gen_random_bytes(32), 'base64'),
                   '+/',
                   '-_'
                 ),
               '=');

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

  insert into public.access_tokens (painting_id, owner_id, token, expires_at, template_type)
  values (painting_id_param, painting_owner, new_token, expiry_time, template_type_param);

  return query select new_token, expiry_time;
end;
$function$;

grant execute on function public.generate_access_token(uuid, text, uuid) to authenticated;
