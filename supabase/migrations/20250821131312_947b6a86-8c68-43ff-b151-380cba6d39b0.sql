
-- 1) Публичные поля для "Key Facts" в paintings

ALTER TABLE public.paintings
  ADD COLUMN IF NOT EXISTS full_title_en text,
  ADD COLUMN IF NOT EXISTS full_title_fr text,
  ADD COLUMN IF NOT EXISTS full_title_ru text,
  ADD COLUMN IF NOT EXISTS artist_dates text,
  ADD COLUMN IF NOT EXISTS date_place_made_en text,
  ADD COLUMN IF NOT EXISTS date_place_made_fr text,
  ADD COLUMN IF NOT EXISTS date_place_made_ru text,
  ADD COLUMN IF NOT EXISTS materials_en text,
  ADD COLUMN IF NOT EXISTS materials_fr text,
  ADD COLUMN IF NOT EXISTS materials_ru text,
  ADD COLUMN IF NOT EXISTS dimensions text,
  ADD COLUMN IF NOT EXISTS acquisition_credit_en text,
  ADD COLUMN IF NOT EXISTS acquisition_credit_fr text,
  ADD COLUMN IF NOT EXISTS acquisition_credit_ru text,
  ADD COLUMN IF NOT EXISTS frame_en text,
  ADD COLUMN IF NOT EXISTS frame_fr text,
  ADD COLUMN IF NOT EXISTS frame_ru text,
  ADD COLUMN IF NOT EXISTS genre_en text,
  ADD COLUMN IF NOT EXISTS genre_fr text,
  ADD COLUMN IF NOT EXISTS genre_ru text;

-- 2) Таблица с закрытыми данными (один-к-одному с paintings)
CREATE TABLE IF NOT EXISTS public.painting_private (
  painting_id uuid PRIMARY KEY REFERENCES public.paintings(id) ON DELETE CASCADE,
  eac_inventory_no text,
  eac_passport_no text,
  eac_issue_date date,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Триггер для updated_at
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;

DROP TRIGGER IF EXISTS trg_painting_private_updated_at ON public.painting_private;

CREATE TRIGGER trg_painting_private_updated_at
BEFORE UPDATE ON public.painting_private
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

-- 3) RLS политики для painting_private
ALTER TABLE public.painting_private ENABLE ROW LEVEL SECURITY;

-- Администраторы могут всё
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'painting_private'
      AND policyname = 'Admins can manage painting_private'
  ) THEN
    CREATE POLICY "Admins can manage painting_private"
      ON public.painting_private
      FOR ALL
      USING (has_role(auth.uid(), 'admin'::app_role))
      WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
  END IF;
END$$;

-- Владельцы могут управлять своими записями (по owner_id из paintings)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'painting_private'
      AND policyname = 'Owners can manage own painting_private'
  ) THEN
    CREATE POLICY "Owners can manage own painting_private"
      ON public.painting_private
      FOR ALL
      USING (
        painting_id IN (
          SELECT p.id FROM public.paintings p
          WHERE p.owner_id = auth.uid()
        )
      )
      WITH CHECK (
        painting_id IN (
          SELECT p.id FROM public.paintings p
          WHERE p.owner_id = auth.uid()
        )
      );
  END IF;
END$$;

-- 4) RPC-функция для возврата закрытой информации по валидному токену
CREATE OR REPLACE FUNCTION public.get_private_painting_info(token_text text, painting_id_param uuid)
RETURNS TABLE (
  eac_inventory_no text,
  eac_passport_no text,
  eac_issue_date date
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
DECLARE
  is_valid boolean;
BEGIN
  -- Проверяем и логируем доступ (увеличивает usage_count при успехе)
  is_valid := public.validate_access_token(token_text, painting_id_param);

  IF NOT is_valid THEN
    -- Невалидный токен -> не возвращаем строк
    RETURN;
  END IF;

  -- Возвращаем приватные данные
  RETURN QUERY
  SELECT pp.eac_inventory_no, pp.eac_passport_no, pp.eac_issue_date
  FROM public.painting_private pp
  WHERE pp.painting_id = painting_id_param;
END;
$function$;
