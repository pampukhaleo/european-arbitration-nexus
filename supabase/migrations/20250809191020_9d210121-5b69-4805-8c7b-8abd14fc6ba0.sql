
-- Create paintings table with multi-language support
CREATE TABLE public.paintings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  owner_id UUID REFERENCES auth.users NOT NULL,
  
  -- Public information in multiple languages
  title_en TEXT NOT NULL,
  title_fr TEXT NOT NULL,
  title_ru TEXT NOT NULL,
  
  artist_en TEXT NOT NULL,
  artist_fr TEXT NOT NULL,
  artist_ru TEXT NOT NULL,
  
  year INTEGER,
  
  description_en TEXT,
  description_fr TEXT,
  description_ru TEXT,
  
  -- Images
  public_image_url TEXT,
  
  -- Private information in multiple languages
  technical_analysis_en TEXT,
  technical_analysis_fr TEXT,
  technical_analysis_ru TEXT,
  
  expertise_report_en TEXT,
  expertise_report_fr TEXT,
  expertise_report_ru TEXT,
  
  certificates JSONB DEFAULT '[]'::jsonb,
  documents JSONB DEFAULT '[]'::jsonb,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_published BOOLEAN DEFAULT true
);

-- Create access tokens table for QR codes
CREATE TABLE public.access_tokens (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  painting_id UUID REFERENCES public.paintings(id) ON DELETE CASCADE NOT NULL,
  owner_id UUID REFERENCES auth.users NOT NULL,
  
  token TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  
  -- Usage tracking
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  used_at TIMESTAMP WITH TIME ZONE,
  usage_count INTEGER DEFAULT 0,
  max_usage INTEGER DEFAULT NULL,
  
  -- Security
  is_active BOOLEAN DEFAULT true,
  created_ip TEXT,
  user_agent TEXT,
  
  -- Template info
  template_type TEXT CHECK (template_type IN ('1hour', '24hours', '7days')) NOT NULL
);

-- Create access logs table for security monitoring
CREATE TABLE public.access_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  painting_id UUID REFERENCES public.paintings(id) ON DELETE CASCADE NOT NULL,
  token_id UUID REFERENCES public.access_tokens(id) ON DELETE CASCADE,
  
  -- Access details
  accessed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  ip_address TEXT,
  user_agent TEXT,
  success BOOLEAN NOT NULL DEFAULT false,
  
  -- Location and device info (optional)
  country TEXT,
  city TEXT,
  device_fingerprint TEXT,
  
  -- Error details
  error_message TEXT,
  error_type TEXT
);

-- Enable RLS on all tables
ALTER TABLE public.paintings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.access_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.access_logs ENABLE ROW LEVEL SECURITY;

-- RLS policies for paintings
CREATE POLICY "Owners can manage their paintings" ON public.paintings
  FOR ALL USING (auth.uid() = owner_id);

CREATE POLICY "Public can view published paintings basic info" ON public.paintings
  FOR SELECT USING (is_published = true);

-- RLS policies for access tokens
CREATE POLICY "Owners can manage their tokens" ON public.access_tokens
  FOR ALL USING (auth.uid() = owner_id);

-- RLS policies for access logs
CREATE POLICY "Owners can view logs for their paintings" ON public.access_logs
  FOR SELECT USING (
    painting_id IN (
      SELECT id FROM public.paintings WHERE owner_id = auth.uid()
    )
  );

CREATE POLICY "System can insert access logs" ON public.access_logs
  FOR INSERT WITH CHECK (true);

-- Function to validate access tokens
CREATE OR REPLACE FUNCTION public.validate_access_token(token_text TEXT, painting_id_param UUID)
RETURNS BOOLEAN AS $$
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to generate secure tokens
CREATE OR REPLACE FUNCTION public.generate_access_token(
  painting_id_param UUID,
  template_type_param TEXT,
  owner_id_param UUID
)
RETURNS TABLE (token TEXT, expires_at TIMESTAMP WITH TIME ZONE) AS $$
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to cleanup expired tokens
CREATE OR REPLACE FUNCTION public.cleanup_expired_tokens()
RETURNS INTEGER AS $$
DECLARE
  deleted_count INTEGER;
BEGIN
  DELETE FROM public.access_tokens
  WHERE expires_at < now() - INTERVAL '30 days';
  
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

-- Create indexes for performance
CREATE INDEX idx_paintings_owner ON public.paintings(owner_id);
CREATE INDEX idx_paintings_published ON public.paintings(is_published) WHERE is_published = true;
CREATE INDEX idx_access_tokens_painting ON public.access_tokens(painting_id);
CREATE INDEX idx_access_tokens_token ON public.access_tokens(token);
CREATE INDEX idx_access_tokens_expires ON public.access_tokens(expires_at);
CREATE INDEX idx_access_logs_painting ON public.access_logs(painting_id);
CREATE INDEX idx_access_logs_accessed_at ON public.access_logs(accessed_at);

-- Add search indexes for multi-language content
CREATE INDEX idx_paintings_search_en ON public.paintings USING gin(to_tsvector('english', title_en || ' ' || artist_en || ' ' || COALESCE(description_en, '')));
CREATE INDEX idx_paintings_search_fr ON public.paintings USING gin(to_tsvector('french', title_fr || ' ' || artist_fr || ' ' || COALESCE(description_fr, '')));
CREATE INDEX idx_paintings_search_ru ON public.paintings USING gin(to_tsvector('russian', title_ru || ' ' || artist_ru || ' ' || COALESCE(description_ru, '')));
