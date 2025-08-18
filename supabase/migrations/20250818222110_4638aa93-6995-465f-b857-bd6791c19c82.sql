
-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Owners can manage their paintings" ON public.paintings;
DROP POLICY IF EXISTS "Public can view published paintings basic info" ON public.paintings;

-- Create new permissive policies that allow admins to manage all paintings
CREATE POLICY "Owners can manage their paintings" 
ON public.paintings 
FOR ALL 
TO authenticated
USING (auth.uid() = owner_id)
WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Admins can manage all paintings" 
ON public.paintings 
FOR ALL 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Public can view published paintings" 
ON public.paintings 
FOR SELECT 
USING (is_published = true);
