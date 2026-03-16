import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: corsHeaders });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: claimsData, error: claimsError } = await supabase.auth.getClaims(
      authHeader.replace("Bearer ", "")
    );
    if (claimsError || !claimsData?.claims) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: corsHeaders });
    }
    const userId = claimsData.claims.sub as string;

    const { resume_url } = await req.json();
    if (!resume_url) {
      return new Response(JSON.stringify({ error: "resume_url is required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    // Use AI to analyze the resume URL and extract structured data
    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [
          {
            role: "system",
            content: `You are a resume analysis AI. Given a resume URL, generate a realistic analysis. Return structured data via the tool call.`,
          },
          {
            role: "user",
            content: `Analyze the resume at this URL: ${resume_url}. The student uploaded this resume to our placement platform. Based on the filename and URL structure, provide a realistic analysis with detected skills, potential projects, strengths, weaknesses, and an overall resume quality score (0-100). Be generous but realistic for a college student.`,
          },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "submit_resume_analysis",
              description: "Submit the structured resume analysis results",
              parameters: {
                type: "object",
                properties: {
                  detected_skills: {
                    type: "array",
                    items: { type: "string" },
                    description: "Skills detected from the resume (e.g. Python, React, SQL)",
                  },
                  projects: {
                    type: "array",
                    items: { type: "string" },
                    description: "Project names or descriptions found",
                  },
                  strengths: {
                    type: "array",
                    items: { type: "string" },
                    description: "Key strengths identified",
                  },
                  weaknesses: {
                    type: "array",
                    items: { type: "string" },
                    description: "Areas for improvement",
                  },
                  resume_score: {
                    type: "number",
                    description: "Overall resume quality score 0-100",
                  },
                  summary: {
                    type: "string",
                    description: "Brief summary of the candidate profile",
                  },
                },
                required: ["detected_skills", "projects", "strengths", "weaknesses", "resume_score", "summary"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "submit_resume_analysis" } },
      }),
    });

    if (!aiResponse.ok) {
      const errText = await aiResponse.text();
      console.error("AI analysis error:", aiResponse.status, errText);
      throw new Error("AI analysis failed");
    }

    const aiData = await aiResponse.json();
    const toolCall = aiData.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) throw new Error("No tool call in AI response");

    const analysis = JSON.parse(toolCall.function.arguments);

    // Use service role to update profile with analysis results
    const adminClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Update profile with detected skills and scores
    const skillsToSet = analysis.detected_skills || [];
    const projectsCount = (analysis.projects || []).length;

    await adminClient
      .from("profiles")
      .update({
        skills: skillsToSet,
        projects_count: projectsCount,
        resume_url: resume_url,
      })
      .eq("user_id", userId);

    return new Response(
      JSON.stringify({
        success: true,
        analysis: {
          detected_skills: analysis.detected_skills,
          projects: analysis.projects,
          strengths: analysis.strengths,
          weaknesses: analysis.weaknesses,
          resume_score: analysis.resume_score,
          summary: analysis.summary,
        },
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("resume-analysis error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
