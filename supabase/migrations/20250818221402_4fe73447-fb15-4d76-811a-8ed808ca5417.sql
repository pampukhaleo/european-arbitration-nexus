
-- 1) Удалим дубликаты, оставив по одной записи на (user_id, role)
WITH dups AS (
  SELECT
    id,
    ROW_NUMBER() OVER (PARTITION BY user_id, role ORDER BY created_at ASC, id ASC) AS rn
  FROM public.user_roles
)
DELETE FROM public.user_roles ur
USING dups
WHERE ur.id = dups.id
AND dups.rn > 1;

-- 2) Добавим уникальное ограничение на (user_id, role), если его ещё нет
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'user_roles_user_id_role_key'
  ) THEN
    ALTER TABLE public.user_roles
      ADD CONSTRAINT user_roles_user_id_role_key UNIQUE (user_id, role);
  END IF;
END
$$;
