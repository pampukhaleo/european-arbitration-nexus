
-- Add RLS policies for admins to manage access_tokens
CREATE POLICY "Admins can manage all access tokens" ON public.access_tokens
FOR ALL USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Add RLS policy for admins to view all access_logs
CREATE POLICY "Admins can view all access logs" ON public.access_logs
FOR SELECT USING (has_role(auth.uid(), 'admin'::app_role));
