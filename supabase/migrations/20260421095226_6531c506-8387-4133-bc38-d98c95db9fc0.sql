
-- ============================================================
-- 1 & 2. Fix users table privilege escalation
-- ============================================================

-- Drop the over-permissive policies
DROP POLICY IF EXISTS "Allow users to update their own data" ON public.users;
DROP POLICY IF EXISTS "Allow guild leaders to approve users in their guild" ON public.users;

-- Helper function to check if a row update preserves privileged fields
CREATE OR REPLACE FUNCTION public.users_protected_fields_unchanged(
  _old_roles text[],
  _new_roles text[],
  _old_is_approved boolean,
  _new_is_approved boolean,
  _old_share_permission boolean,
  _new_share_permission boolean,
  _old_dkp_balance numeric,
  _new_dkp_balance numeric,
  _old_dkp_pending numeric,
  _new_dkp_pending numeric,
  _old_guild_id uuid,
  _new_guild_id uuid
) RETURNS boolean
LANGUAGE sql
IMMUTABLE
SET search_path = public
AS $$
  SELECT
    _old_roles IS NOT DISTINCT FROM _new_roles
    AND _old_is_approved IS NOT DISTINCT FROM _new_is_approved
    AND _old_share_permission IS NOT DISTINCT FROM _new_share_permission
    AND _old_dkp_balance IS NOT DISTINCT FROM _new_dkp_balance
    AND _old_dkp_pending IS NOT DISTINCT FROM _new_dkp_pending
    AND _old_guild_id IS NOT DISTINCT FROM _new_guild_id;
$$;

-- Trigger-based protection for users table privileged columns
CREATE OR REPLACE FUNCTION public.protect_users_privileged_columns()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  is_admin boolean;
  is_guild_leader boolean;
BEGIN
  -- Admins (via user_roles) can change anything
  IF public.has_role(auth.uid(), 'admin') THEN
    RETURN NEW;
  END IF;

  -- Legacy admin via users.roles array
  SELECT EXISTS (
    SELECT 1 FROM public.users u
    WHERE u.id = auth.uid() AND 'Admin' = ANY(u.roles)
  ) INTO is_admin;
  IF is_admin THEN
    RETURN NEW;
  END IF;

  -- Guild leader: may only flip is_approved on users in their guild
  SELECT EXISTS (
    SELECT 1 FROM public.users u
    WHERE u.id = auth.uid()
      AND ('RL' = ANY(u.roles) OR 'Admin' = ANY(u.roles))
      AND u.guild_id = OLD.guild_id
  ) INTO is_guild_leader;

  IF is_guild_leader THEN
    -- Guild leader may only change is_approved
    IF OLD.roles IS DISTINCT FROM NEW.roles
       OR OLD.share_permission IS DISTINCT FROM NEW.share_permission
       OR OLD.dkp_balance IS DISTINCT FROM NEW.dkp_balance
       OR OLD.dkp_pending IS DISTINCT FROM NEW.dkp_pending
       OR OLD.guild_id IS DISTINCT FROM NEW.guild_id
       OR OLD.id IS DISTINCT FROM NEW.id THEN
      RAISE EXCEPTION 'Guild leaders can only modify is_approved';
    END IF;
    RETURN NEW;
  END IF;

  -- Regular user: only updating their own row, may not touch privileged fields
  IF auth.uid() = OLD.id THEN
    IF OLD.roles IS DISTINCT FROM NEW.roles
       OR OLD.is_approved IS DISTINCT FROM NEW.is_approved
       OR OLD.share_permission IS DISTINCT FROM NEW.share_permission
       OR OLD.dkp_balance IS DISTINCT FROM NEW.dkp_balance
       OR OLD.dkp_pending IS DISTINCT FROM NEW.dkp_pending
       OR OLD.id IS DISTINCT FROM NEW.id THEN
      RAISE EXCEPTION 'You cannot modify privileged fields (roles, is_approved, dkp, share_permission)';
    END IF;
    RETURN NEW;
  END IF;

  RAISE EXCEPTION 'Not authorized to update this user row';
END;
$$;

DROP TRIGGER IF EXISTS protect_users_privileged_columns_trg ON public.users;
CREATE TRIGGER protect_users_privileged_columns_trg
BEFORE UPDATE ON public.users
FOR EACH ROW
EXECUTE FUNCTION public.protect_users_privileged_columns();

-- Recreate user-friendly RLS policies (trigger enforces field-level rules)
CREATE POLICY "Users can update their own row (fields restricted by trigger)"
ON public.users
FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

CREATE POLICY "Guild leaders can update users in their guild (fields restricted by trigger)"
ON public.users
FOR UPDATE
TO authenticated
USING (
  guild_id IN (
    SELECT u.guild_id FROM public.users u
    WHERE u.id = auth.uid()
      AND ('Admin' = ANY(u.roles) OR 'RL' = ANY(u.roles))
  )
)
WITH CHECK (
  guild_id IN (
    SELECT u.guild_id FROM public.users u
    WHERE u.id = auth.uid()
      AND ('Admin' = ANY(u.roles) OR 'RL' = ANY(u.roles))
  )
);

-- ============================================================
-- 3. Stop leaking owner_id from paintings
-- ============================================================

-- Drop the public-read policy from paintings table
DROP POLICY IF EXISTS "Public can view published paintings" ON public.paintings;

-- Create a public-safe view (no owner_id, no private columns)
CREATE OR REPLACE VIEW public.public_paintings
WITH (security_invoker = true)
AS
SELECT
  id,
  title_en, title_fr, title_ru,
  artist_en, artist_fr, artist_ru,
  artist_dates,
  year,
  description_en, description_fr, description_ru,
  full_title_en, full_title_fr, full_title_ru,
  date_place_made_en, date_place_made_fr, date_place_made_ru,
  materials_en, materials_fr, materials_ru,
  dimensions,
  acquisition_credit_en, acquisition_credit_fr, acquisition_credit_ru,
  frame_en, frame_fr, frame_ru,
  genre_en, genre_fr, genre_ru,
  technical_analysis_en, technical_analysis_fr, technical_analysis_ru,
  expertise_report_en, expertise_report_fr, expertise_report_ru,
  original_title,
  certificates,
  documents,
  public_image_url,
  is_published,
  created_at,
  updated_at
FROM public.paintings
WHERE is_published = true;

GRANT SELECT ON public.public_paintings TO anon, authenticated;

-- Re-add SELECT for owners and admins on the base table
-- (admin policy and "Painting owners can manage paintings" already cover writes/reads;
-- ensure authenticated owners and admins can still read via base table)
-- Existing policies remain:
--   "Admins can manage all paintings" (ALL, authenticated)
--   "Painting owners can manage paintings" (ALL, public)
-- These keep working. Anon users now must use public_paintings view.

-- ============================================================
-- 4. Restrict access_logs INSERT
-- ============================================================

DROP POLICY IF EXISTS "System can insert access logs" ON public.access_logs;

-- Create a SECURITY DEFINER function for inserting logs (used by other definer functions)
CREATE OR REPLACE FUNCTION public.log_access_attempt(
  _painting_id uuid,
  _token_id uuid,
  _success boolean,
  _error_type text DEFAULT NULL,
  _error_message text DEFAULT NULL,
  _ip_address text DEFAULT NULL,
  _user_agent text DEFAULT NULL
) RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.access_logs (
    painting_id, token_id, success, error_type, error_message, ip_address, user_agent
  ) VALUES (
    _painting_id, _token_id, _success, _error_type, _error_message, _ip_address, _user_agent
  );
END;
$$;

REVOKE ALL ON FUNCTION public.log_access_attempt(uuid, uuid, boolean, text, text, text, text) FROM public;
GRANT EXECUTE ON FUNCTION public.log_access_attempt(uuid, uuid, boolean, text, text, text, text) TO authenticated, anon;

-- Restrict direct INSERT to authenticated users only (fallback);
-- preferred path is via log_access_attempt() / validate_access_token()
CREATE POLICY "Authenticated can insert access logs"
ON public.access_logs
FOR INSERT
TO authenticated
WITH CHECK (true);

-- ============================================================
-- 8. Fix search_path on validate_access_token
-- ============================================================

CREATE OR REPLACE FUNCTION public.validate_access_token(token_text text, painting_id_param uuid)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public
AS $function$
DECLARE
  token_record public.access_tokens%ROWTYPE;
BEGIN
  SELECT * INTO token_record
  FROM public.access_tokens
  WHERE token = token_text
    AND painting_id = painting_id_param
    AND is_active = true
    AND expires_at > now();

  IF NOT FOUND THEN
    INSERT INTO public.access_logs (painting_id, ip_address, success, error_type, error_message)
    VALUES (painting_id_param, current_setting('request.headers', true)::json->>'x-forwarded-for', false, 'invalid_token', 'Token not found or expired');
    RETURN false;
  END IF;

  UPDATE public.access_tokens
  SET usage_count = usage_count + 1,
      used_at = now()
  WHERE id = token_record.id;

  INSERT INTO public.access_logs (painting_id, token_id, ip_address, success)
  VALUES (painting_id_param, token_record.id, current_setting('request.headers', true)::json->>'x-forwarded-for', true);

  RETURN true;
END;
$function$;

-- Also fix set_updated_at and cleanup_expired_tokens search_path
CREATE OR REPLACE FUNCTION public.set_updated_at()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path = public
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.cleanup_expired_tokens()
 RETURNS integer
 LANGUAGE plpgsql
 SET search_path = public
AS $function$
DECLARE
  deleted_count INTEGER;
BEGIN
  DELETE FROM public.access_tokens
  WHERE expires_at < now() - INTERVAL '30 days';

  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$function$;
