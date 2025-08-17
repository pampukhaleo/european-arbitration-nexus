
-- 1) Ensure schema for extensions exists
create schema if not exists extensions;

-- 2) Install pgcrypto into the extensions schema (idempotent)
create extension if not exists pgcrypto with schema extensions;

-- 3) Recreate function to use extensions.gen_random_bytes explicitly
create or replace function public.generate_access_token(
  painting_id_param uuid,
  template_type_param text,
  owner_id_param uuid
)
returns table(token text, expires_at timestamp with time zone)
language plpgsql
security definer
set search_path to public
as $function$
declare
  new_token text;
  expiry_time timestamptz;
begin
  -- Generate cryptographically secure, URL-safe token
  new_token := rtrim(
                 translate(
                   encode(extensions.gen_random_bytes(32), 'base64'),
                   '+/',
                   '-_'
                 ),
               '=');

  -- Set expiry based on template
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

  -- Insert new token row
  insert into public.access_tokens (painting_id, owner_id, token, expires_at, template_type)
  values (painting_id_param, owner_id_param, new_token, expiry_time, template_type_param);

  -- Return token and expiry
  return query select new_token, expiry_time;
end;
$function$;

-- 4) Grant execute to authenticated (idempotent)
grant execute on function public.generate_access_token(uuid, text, uuid) to authenticated;
