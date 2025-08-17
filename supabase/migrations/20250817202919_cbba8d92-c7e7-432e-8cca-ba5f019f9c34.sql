
-- Fix: use URL-safe base64 token (no padding) instead of unsupported 'base64url'
CREATE OR REPLACE FUNCTION public.generate_access_token(
  painting_id_param uuid,
  template_type_param text,
  owner_id_param uuid
)
RETURNS TABLE(token text, expires_at timestamp with time zone)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO public
AS $function$
DECLARE
  new_token TEXT;
  expiry_time TIMESTAMP WITH TIME ZONE;
BEGIN
  -- Generate cryptographically secure, URL-safe token
  -- base64 -> translate +/ to -_ -> trim =
  new_token := rtrim(
                 translate(
                   encode(gen_random_bytes(32), 'base64'),
                   '+/',
                   '-_'
                 ),
               '=');

  -- Set expiry based on template
  CASE template_type_param
    WHEN '1hour' THEN
      expiry_time := now() + INTERVAL '1 hour';
    WHEN '24hours' THEN
      expiry_time := now() + INTERVAL '24 hours';
    WHEN '7days' THEN
      expiry_time := now() + INTERVAL '7 days';
    ELSE
      RAISE EXCEPTION 'Invalid template type';
  END CASE;

  -- Insert new token row
  INSERT INTO public.access_tokens (painting_id, owner_id, token, expires_at, template_type)
  VALUES (painting_id_param, owner_id_param, new_token, expiry_time, template_type_param);

  -- Return token and expiry
  RETURN QUERY SELECT new_token, expiry_time;
END;
$function$;

-- Ensure authenticated users can call it
GRANT EXECUTE ON FUNCTION public.generate_access_token(uuid, text, uuid) TO authenticated;
