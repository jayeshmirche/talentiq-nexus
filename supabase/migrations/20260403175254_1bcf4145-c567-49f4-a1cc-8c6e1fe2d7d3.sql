-- Remove duplicates, keeping the earliest application per student+job
DELETE FROM public.applications
WHERE id NOT IN (
  SELECT DISTINCT ON (student_id, job_id) id
  FROM public.applications
  ORDER BY student_id, job_id, applied_date ASC
);

-- Now add the unique constraint
ALTER TABLE public.applications 
  ADD CONSTRAINT applications_student_job_unique UNIQUE (student_id, job_id);