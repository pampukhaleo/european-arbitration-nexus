
-- 1) Удаляем расширенную политику владельца, разрешавшую DELETE
DROP POLICY IF EXISTS "Owners can manage their paintings" ON public.paintings;

-- 2) Политики для владельцев (без DELETE)
CREATE POLICY "Owners can select own paintings"
  ON public.paintings
  FOR SELECT
  USING (auth.uid() = owner_id);

CREATE POLICY "Owners can insert own paintings"
  ON public.paintings
  FOR INSERT
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Owners can update own paintings"
  ON public.paintings
  FOR UPDATE
  USING (auth.uid() = owner_id)
  WITH CHECK (auth.uid() = owner_id);

-- ВАЖНО: Существующие политики
-- "Admins can manage all paintings" (ALL) и
-- "Public can view published paintings" (SELECT is_published = true)
-- остаются без изменений.

-- 3) Чистка «сиротских» записей перед добавлением внешних ключей
DELETE FROM public.painting_private pp
WHERE NOT EXISTS (
  SELECT 1 FROM public.paintings p WHERE p.id = pp.painting_id
);

DELETE FROM public.access_tokens at
WHERE NOT EXISTS (
  SELECT 1 FROM public.paintings p WHERE p.id = at.painting_id
);

-- Для access_logs сначала убираем ссылку на несуществующий токен
UPDATE public.access_logs al
SET token_id = NULL
WHERE token_id IS NOT NULL
  AND NOT EXISTS (SELECT 1 FROM public.access_tokens at WHERE at.id = al.token_id);

DELETE FROM public.access_logs al
WHERE NOT EXISTS (
  SELECT 1 FROM public.paintings p WHERE p.id = al.painting_id
);

-- 4) Добавляем внешние ключи и каскадные правила
-- painting_private -> paintings (CASCADE)
ALTER TABLE public.painting_private
  ADD CONSTRAINT painting_private_painting_id_fkey
  FOREIGN KEY (painting_id)
  REFERENCES public.paintings(id)
  ON DELETE CASCADE;

-- access_tokens -> paintings (CASCADE)
ALTER TABLE public.access_tokens
  ADD CONSTRAINT access_tokens_painting_id_fkey
  FOREIGN KEY (painting_id)
  REFERENCES public.paintings(id)
  ON DELETE CASCADE;

-- access_logs -> paintings (CASCADE)
ALTER TABLE public.access_logs
  ADD CONSTRAINT access_logs_painting_id_fkey
  FOREIGN KEY (painting_id)
  REFERENCES public.paintings(id)
  ON DELETE CASCADE;

-- access_logs.token_id -> access_tokens.id (SET NULL)
ALTER TABLE public.access_logs
  ADD CONSTRAINT access_logs_token_id_fkey
  FOREIGN KEY (token_id)
  REFERENCES public.access_tokens(id)
  ON DELETE SET NULL;
