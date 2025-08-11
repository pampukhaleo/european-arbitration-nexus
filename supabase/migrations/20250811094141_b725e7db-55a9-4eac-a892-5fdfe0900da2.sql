
-- Create function to generate access tokens
CREATE OR REPLACE FUNCTION public.generate_access_token(
  painting_id_param uuid, 
  template_type_param text, 
  owner_id_param uuid
)
RETURNS TABLE(token text, expires_at timestamp with time zone)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  new_token TEXT;
  expiry_time TIMESTAMP WITH TIME ZONE;
BEGIN
  -- Generate cryptographically secure token
  new_token := encode(gen_random_bytes(32), 'base64url');
  
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
  
  -- Insert new token
  INSERT INTO public.access_tokens (painting_id, owner_id, token, expires_at, template_type)
  VALUES (painting_id_param, owner_id_param, new_token, expiry_time, template_type_param);
  
  -- Return token and expiry
  RETURN QUERY SELECT new_token, expiry_time;
END;
$$;

-- Create function to validate access tokens
CREATE OR REPLACE FUNCTION public.validate_access_token(
  token_text text, 
  painting_id_param uuid
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  token_record public.access_tokens%ROWTYPE;
BEGIN
  -- Get token record
  SELECT * INTO token_record
  FROM public.access_tokens
  WHERE token = token_text
    AND painting_id = painting_id_param
    AND is_active = true
    AND expires_at > now();
  
  -- If token not found or expired
  IF NOT FOUND THEN
    -- Log failed attempt
    INSERT INTO public.access_logs (painting_id, ip_address, success, error_type, error_message)
    VALUES (painting_id_param, current_setting('request.headers', true)::json->>'x-forwarded-for', false, 'invalid_token', 'Token not found or expired');
    
    RETURN false;
  END IF;
  
  -- Update usage count
  UPDATE public.access_tokens
  SET usage_count = usage_count + 1,
      used_at = now()
  WHERE id = token_record.id;
  
  -- Log successful access
  INSERT INTO public.access_logs (painting_id, token_id, ip_address, success)
  VALUES (painting_id_param, token_record.id, current_setting('request.headers', true)::json->>'x-forwarded-for', true);
  
  RETURN true;
END;
$$;

-- Create function to cleanup expired tokens
CREATE OR REPLACE FUNCTION public.cleanup_expired_tokens()
RETURNS integer
LANGUAGE plpgsql
AS $$
DECLARE
  deleted_count INTEGER;
BEGIN
  DELETE FROM public.access_tokens
  WHERE expires_at < now() - INTERVAL '30 days';
  
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$$;
