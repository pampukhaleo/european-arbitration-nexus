-- Step 1: Create painting_owners junction table
CREATE TABLE IF NOT EXISTS public.painting_owners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  painting_id UUID NOT NULL REFERENCES public.paintings(id) ON DELETE CASCADE,
  owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(painting_id, owner_id)
);

-- Enable RLS on painting_owners
ALTER TABLE public.painting_owners ENABLE ROW LEVEL SECURITY;

-- Step 2: Migrate existing data from paintings.owner_id to painting_owners
INSERT INTO public.painting_owners (painting_id, owner_id)
SELECT id, owner_id
FROM public.paintings
WHERE owner_id IS NOT NULL
ON CONFLICT (painting_id, owner_id) DO NOTHING;

-- Step 3: Create RLS policies for painting_owners
-- Only admins can manage painting owners
CREATE POLICY "Admins can manage painting owners"
ON public.painting_owners
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Painting owners can view their own ownership records
CREATE POLICY "Owners can view their ownership"
ON public.painting_owners
FOR SELECT
USING (auth.uid() = owner_id);

-- Step 4: Update paintings RLS policies to use painting_owners
DROP POLICY IF EXISTS "Owners can manage their paintings" ON public.paintings;

CREATE POLICY "Painting owners can manage paintings"
ON public.paintings
FOR ALL
USING (
  id IN (
    SELECT painting_id 
    FROM public.painting_owners 
    WHERE owner_id = auth.uid()
  )
)
WITH CHECK (
  id IN (
    SELECT painting_id 
    FROM public.painting_owners 
    WHERE owner_id = auth.uid()
  )
);

-- Step 5: Update painting_private RLS policies
DROP POLICY IF EXISTS "Owners can manage own painting_private" ON public.painting_private;

CREATE POLICY "Painting owners can manage private data"
ON public.painting_private
FOR ALL
USING (
  painting_id IN (
    SELECT painting_id 
    FROM public.painting_owners 
    WHERE owner_id = auth.uid()
  )
)
WITH CHECK (
  painting_id IN (
    SELECT painting_id 
    FROM public.painting_owners 
    WHERE owner_id = auth.uid()
  )
);

-- Step 6: Update get_private_painting_info function to check painting_owners
CREATE OR REPLACE FUNCTION public.get_private_painting_info(
  painting_uuid UUID,
  access_token_str TEXT
)
RETURNS TABLE (
  eac_inventory_no TEXT,
  eac_passport_no TEXT,
  eac_issue_date DATE
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  token_valid BOOLEAN;
  is_owner BOOLEAN;
BEGIN
  -- Check if user is owner via painting_owners table
  SELECT EXISTS (
    SELECT 1 
    FROM painting_owners 
    WHERE painting_id = painting_uuid 
    AND owner_id = auth.uid()
  ) INTO is_owner;

  -- If user is owner, return private info without token check
  IF is_owner THEN
    RETURN QUERY
    SELECT 
      pp.eac_inventory_no,
      pp.eac_passport_no,
      pp.eac_issue_date
    FROM painting_private pp
    WHERE pp.painting_id = painting_uuid;
    RETURN;
  END IF;

  -- Otherwise check access token
  SELECT validate_access_token(painting_uuid, access_token_str) INTO token_valid;

  IF token_valid THEN
    RETURN QUERY
    SELECT 
      pp.eac_inventory_no,
      pp.eac_passport_no,
      pp.eac_issue_date
    FROM painting_private pp
    WHERE pp.painting_id = painting_uuid;
  END IF;
END;
$$;

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_painting_owners_painting_id ON public.painting_owners(painting_id);
CREATE INDEX IF NOT EXISTS idx_painting_owners_owner_id ON public.painting_owners(owner_id);