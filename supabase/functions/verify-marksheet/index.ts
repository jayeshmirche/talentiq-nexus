import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get user from token
    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);
    if (userError || !user) throw new Error("Unauthorized");

    const { marksheet_url, file_base64, file_type } = await req.json();

    if (!file_base64 || !file_type) {
      throw new Error("Missing file data");
    }

    // Get user profile for cross-validation
    const { data: profile } = await supabase
      .from("profiles")
      .select("full_name, department, organization")
      .eq("user_id", user.id)
      .single();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    // Use AI vision to extract and verify marksheet
    const systemPrompt = `You are an academic document verification expert. Analyze the uploaded marksheet/transcript image and extract academic information.

Your tasks:
1. Extract CGPA/GPA/percentage if visible
2. Extract student name
3. Extract university/college name
4. Extract department/branch
5. Check if the document looks like a genuine academic marksheet/transcript
6. Check for signs of tampering (inconsistent fonts, misaligned text, pixelation artifacts around numbers, color inconsistencies)

Student profile for cross-validation:
- Name on profile: ${profile?.full_name || "Unknown"}
- Department: ${profile?.department || "Unknown"}
- Organization: ${profile?.organization || "Unknown"}

Respond using the provided tool.`;

    const mediaType = file_type.startsWith("image/") ? file_type : "image/jpeg";

    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          {
            role: "user",
            content: [
              { type: "text", text: "Please analyze this marksheet document and extract academic details. Verify its authenticity." },
              { type: "image_url", image_url: { url: `data:${mediaType};base64,${file_base64}` } },
            ],
          },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "verify_marksheet",
              description: "Return extracted and verified marksheet data",
              parameters: {
                type: "object",
                properties: {
                  extracted_cgpa: { type: "number", description: "Extracted CGPA/GPA on a 10-point scale. Convert percentage to CGPA by dividing by 9.5 if needed. Null if not found." },
                  extracted_name: { type: "string", description: "Student name from the document" },
                  extracted_university: { type: "string", description: "University or college name" },
                  extracted_department: { type: "string", description: "Department or branch" },
                  is_genuine_document: { type: "boolean", description: "Whether the document appears to be a genuine academic marksheet/transcript" },
                  tampering_detected: { type: "boolean", description: "Whether signs of tampering were detected" },
                  name_matches_profile: { type: "boolean", description: "Whether the extracted name reasonably matches the profile name" },
                  confidence_score: { type: "number", description: "Overall confidence in verification (0-100)" },
                  verification_notes: { type: "string", description: "Brief notes about the verification result" },
                },
                required: ["is_genuine_document", "tampering_detected", "name_matches_profile", "confidence_score", "verification_notes"],
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "verify_marksheet" } },
      }),
    });

    if (!aiResponse.ok) {
      const status = aiResponse.status;
      if (status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited. Please try again later." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add funds." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw new Error("AI analysis failed");
    }

    const aiData = await aiResponse.json();
    const toolCall = aiData.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) throw new Error("AI did not return structured data");

    const result = JSON.parse(toolCall.function.arguments);

    // Determine verification status
    const isVerified =
      result.is_genuine_document &&
      !result.tampering_detected &&
      result.name_matches_profile &&
      result.confidence_score >= 60 &&
      result.extracted_cgpa != null;

    if (isVerified) {
      // Update profile with verified CGPA
      await supabase
        .from("profiles")
        .update({
          cgpa: result.extracted_cgpa,
          cgpa_verified: true,
          marksheet_url: marksheet_url,
        })
        .eq("user_id", user.id);
    }

    return new Response(
      JSON.stringify({
        verified: isVerified,
        extracted_cgpa: result.extracted_cgpa,
        extracted_name: result.extracted_name,
        extracted_university: result.extracted_university,
        extracted_department: result.extracted_department,
        confidence_score: result.confidence_score,
        verification_notes: result.verification_notes,
        tampering_detected: result.tampering_detected,
        name_matches: result.name_matches_profile,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("verify-marksheet error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Verification failed" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
