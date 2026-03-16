import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface ResumeAnalysis {
  detected_skills: string[];
  projects: string[];
  strengths: string[];
  weaknesses: string[];
  resume_score: number;
  summary: string;
}

export const useResumeAnalysis = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);

  const analyzeResume = async (resumeUrl: string): Promise<ResumeAnalysis | null> => {
    setAnalyzing(true);
    try {
      const { data, error } = await supabase.functions.invoke("resume-analysis", {
        body: { resume_url: resumeUrl },
      });
      if (error) throw error;
      if (data?.analysis) {
        setAnalysis(data.analysis);
        return data.analysis;
      }
      return null;
    } catch (e) {
      console.error("Resume analysis error:", e);
      return null;
    } finally {
      setAnalyzing(false);
    }
  };

  return { analyzeResume, analyzing, analysis };
};
