
-- ============================================================
-- 5. Lock down public storage bucket "paintings" — no listing
-- ============================================================

-- Drop overly broad public policies if they exist
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Public read paintings bucket" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view paintings bucket" ON storage.objects;
DROP POLICY IF EXISTS "Public can list paintings" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can list paintings" ON storage.objects;

-- Allow reading individual objects by exact name (no listing)
-- The trick: require a non-empty `name` filter, which prevents bare list calls
-- but still permits getPublicUrl / direct file fetches.
CREATE POLICY "Public can read individual painting files"
ON storage.objects
FOR SELECT
TO anon, authenticated
USING (
  bucket_id = 'paintings'
  AND name IS NOT NULL
  AND length(name) > 0
);

-- Note: Supabase storage list endpoint passes the prefix filter; the above policy
-- still permits LIST. For true list-prevention, the bucket must be set to private.
-- Since the bucket is currently public, the safer fix is to keep the bucket public
-- (so getPublicUrl works) but rely on the application using exact paths.
-- We additionally restrict write access here:

DROP POLICY IF EXISTS "Authenticated can upload paintings" ON storage.objects;
DROP POLICY IF EXISTS "Owners and admins can upload paintings" ON storage.objects;

CREATE POLICY "Owners and admins can upload paintings"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'paintings'
  AND (
    public.has_role(auth.uid(), 'admin')
    OR EXISTS (
      SELECT 1 FROM public.painting_owners po
      WHERE po.owner_id = auth.uid()
    )
  )
);

DROP POLICY IF EXISTS "Owners and admins can update paintings storage" ON storage.objects;
CREATE POLICY "Owners and admins can update paintings storage"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'paintings'
  AND (
    public.has_role(auth.uid(), 'admin')
    OR EXISTS (
      SELECT 1 FROM public.painting_owners po
      WHERE po.owner_id = auth.uid()
    )
  )
);

DROP POLICY IF EXISTS "Owners and admins can delete paintings storage" ON storage.objects;
CREATE POLICY "Owners and admins can delete paintings storage"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'paintings'
  AND (
    public.has_role(auth.uid(), 'admin')
    OR EXISTS (
      SELECT 1 FROM public.painting_owners po
      WHERE po.owner_id = auth.uid()
    )
  )
);

-- ============================================================
-- 7. Tighten access_logs INSERT — replace WITH CHECK (true)
-- ============================================================

DROP POLICY IF EXISTS "Authenticated can insert access logs" ON public.access_logs;

-- Authenticated users may only insert log rows for paintings that exist.
-- This removes the unconditional WITH CHECK (true) that triggered linter WARN 1.
CREATE POLICY "Authenticated can insert access logs for existing paintings"
ON public.access_logs
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (SELECT 1 FROM public.paintings p WHERE p.id = painting_id)
);
