-- Backfill painting_owners table with existing paintings.owner_id data
-- Only insert if the relationship doesn't already exist
INSERT INTO public.painting_owners (painting_id, owner_id)
SELECT p.id, p.owner_id
FROM public.paintings p
WHERE p.owner_id IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 
    FROM public.painting_owners po 
    WHERE po.painting_id = p.id 
      AND po.owner_id = p.owner_id
  );