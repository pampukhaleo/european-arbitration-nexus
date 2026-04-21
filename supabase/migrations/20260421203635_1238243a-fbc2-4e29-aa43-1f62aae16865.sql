
-- ========================================
-- Migration 1: profiles cleanup
-- ========================================

-- Drop legacy columns (not used in src/)
ALTER TABLE public.profiles DROP COLUMN IF EXISTS has_paid;
ALTER TABLE public.profiles DROP COLUMN IF EXISTS website_url;

-- Update handle_new_user to not reference dropped columns
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  INSERT INTO public.profiles (id, full_name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    NEW.email
  );
  RETURN NEW;
EXCEPTION
  WHEN others THEN
    RAISE WARNING 'Failed to create profile for user %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$function$;

-- Recreate UPDATE policy with WITH CHECK + scope to authenticated
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile"
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Scope SELECT policies to authenticated (auth.uid() is null for anon anyway)
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
CREATE POLICY "Users can view their own profile"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert their own profile during signup" ON public.profiles;
CREATE POLICY "Users can insert their own profile during signup"
  ON public.profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- ========================================
-- Migration 2: storage paintings — drop broken cross-owner policies
-- ========================================

DROP POLICY IF EXISTS "Owners and admins can delete paintings storage" ON storage.objects;
DROP POLICY IF EXISTS "Owners and admins can update paintings storage" ON storage.objects;
DROP POLICY IF EXISTS "Owners and admins can upload paintings" ON storage.objects;

-- Explicit admin-only management (covers all paths, not just uploader's folder)
CREATE POLICY "Admins can insert any painting file"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'paintings' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update any painting file"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'paintings' AND public.has_role(auth.uid(), 'admin'))
  WITH CHECK (bucket_id = 'paintings' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete any painting file"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'paintings' AND public.has_role(auth.uid(), 'admin'));

-- ========================================
-- Migration 3: access_logs — scope SELECT to authenticated
-- ========================================

DROP POLICY IF EXISTS "Owners can view logs for their paintings" ON public.access_logs;
CREATE POLICY "Owners can view logs for their paintings"
  ON public.access_logs
  FOR SELECT
  TO authenticated
  USING (painting_id IN (
    SELECT paintings.id FROM public.paintings WHERE paintings.owner_id = auth.uid()
  ));

DROP POLICY IF EXISTS "Admins can view all access logs" ON public.access_logs;
CREATE POLICY "Admins can view all access logs"
  ON public.access_logs
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- ========================================
-- Migration 4: storage paintings — remove anon SELECT (LIST)
-- Public CDN access via public_image_url bypasses RLS entirely
-- ========================================

DROP POLICY IF EXISTS "Anyone can view painting images" ON storage.objects;
DROP POLICY IF EXISTS "Public can read individual painting files" ON storage.objects;

CREATE POLICY "Authenticated can read painting files"
  ON storage.objects
  FOR SELECT
  TO authenticated
  USING (bucket_id = 'paintings');
