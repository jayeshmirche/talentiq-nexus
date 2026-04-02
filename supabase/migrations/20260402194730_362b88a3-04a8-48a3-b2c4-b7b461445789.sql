
ALTER TABLE public.profiles 
  ADD COLUMN IF NOT EXISTS cgpa_verified boolean NOT NULL DEFAULT false;

ALTER TABLE public.profiles 
  ALTER COLUMN cgpa SET DEFAULT null;

-- Set existing 0 CGPAs to null (they were never explicitly entered)
UPDATE public.profiles SET cgpa = null WHERE cgpa = 0;
