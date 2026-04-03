-- Create marksheets storage bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('marksheets', 'marksheets', false);

-- Storage policies for marksheets
CREATE POLICY "Users can upload their own marksheet"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'marksheets' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view their own marksheet"
ON storage.objects FOR SELECT
USING (bucket_id = 'marksheets' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own marksheet"
ON storage.objects FOR UPDATE
USING (bucket_id = 'marksheets' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own marksheet"
ON storage.objects FOR DELETE
USING (bucket_id = 'marksheets' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Add marksheet_url column to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS marksheet_url text;