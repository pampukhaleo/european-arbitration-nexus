CREATE POLICY "Anon can read published paintings"
ON public.paintings
FOR SELECT
TO anon, authenticated
USING (is_published = true);