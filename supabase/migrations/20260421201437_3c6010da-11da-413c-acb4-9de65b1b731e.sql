-- 1. Drop policies on legacy tables (CASCADE on tables will handle, but explicit for safety)
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
DROP POLICY IF EXISTS "Users can view their own payments" ON public.payments;

-- 2. Drop legacy tables
DROP TABLE IF EXISTS public.invite_codes CASCADE;
DROP TABLE IF EXISTS public.guilds CASCADE;
DROP TABLE IF EXISTS public.payments CASCADE;
DROP TABLE IF EXISTS public.users CASCADE;

-- 3. Drop legacy functions
DROP FUNCTION IF EXISTS public.protect_users_privileged_columns() CASCADE;
DROP FUNCTION IF EXISTS public.users_protected_fields_unchanged(
  text[], text[], boolean, boolean, boolean, boolean,
  numeric, numeric, numeric, numeric, uuid, uuid
) CASCADE;