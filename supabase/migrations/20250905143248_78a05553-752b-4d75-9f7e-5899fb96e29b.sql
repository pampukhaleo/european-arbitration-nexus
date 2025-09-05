-- Add original_title field to paintings table
ALTER TABLE public.paintings 
ADD COLUMN original_title text;

-- Backfill original_title with data from full_title_en or title_en as fallback
UPDATE public.paintings 
SET original_title = COALESCE(full_title_en, title_en)
WHERE original_title IS NULL;