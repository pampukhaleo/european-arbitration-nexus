
-- Create storage bucket for painting images
INSERT INTO storage.buckets (id, name, public)
VALUES ('paintings', 'paintings', true);

-- Create RLS policies for the paintings bucket
CREATE POLICY "Users can upload their own painting images"
ON storage.objects FOR INSERT 
WITH CHECK (
  bucket_id = 'paintings' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can update their own painting images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'paintings' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their own painting images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'paintings' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Anyone can view painting images"
ON storage.objects FOR SELECT
USING (bucket_id = 'paintings');

-- Grant necessary permissions for access token generation
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE ON public.access_tokens TO authenticated;
GRANT SELECT, INSERT ON public.access_logs TO authenticated;
GRANT EXECUTE ON FUNCTION public.generate_access_token TO authenticated;

-- Update RLS policy for access_tokens to be more explicit
DROP POLICY IF EXISTS "Owners can manage their tokens" ON public.access_tokens;
CREATE POLICY "Owners can manage their tokens" 
ON public.access_tokens 
FOR ALL 
USING (auth.uid() = owner_id)
WITH CHECK (auth.uid() = owner_id);

-- Ensure access_logs can be inserted by the system
DROP POLICY IF EXISTS "System can insert access logs" ON public.access_logs;
CREATE POLICY "System can insert access logs" 
ON public.access_logs 
FOR INSERT 
WITH CHECK (true);
