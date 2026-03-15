import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, FileText, Loader2, CheckCircle, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface ResumeUploadProps {
  currentUrl?: string | null;
  onUploadComplete?: (url: string) => void;
}

const ResumeUpload = ({ currentUrl, onUploadComplete }: ResumeUploadProps) => {
  const { user } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!validTypes.includes(file.type)) {
      toast.error("Please upload a PDF, DOC, or DOCX file");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size must be under 10MB");
      return;
    }

    setUploading(true);
    setFileName(file.name);

    try {
      const filePath = `${user.id}/${Date.now()}_${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from("resumes")
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage.from("resumes").getPublicUrl(filePath);
      const resumeUrl = urlData.publicUrl;

      // Update profile with resume URL
      await supabase
        .from("profiles")
        .update({ resume_url: resumeUrl } as any)
        .eq("user_id", user.id);

      toast.success("Resume uploaded successfully!");
      onUploadComplete?.(resumeUrl);
    } catch (error: any) {
      toast.error(error.message || "Upload failed");
      setFileName(null);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="glass rounded-xl p-5">
      <h4 className="font-heading font-semibold text-foreground text-sm mb-3 flex items-center gap-2">
        <FileText size={16} className="text-primary" /> Resume
      </h4>
      <input
        ref={fileRef}
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={handleUpload}
        className="hidden"
      />
      {currentUrl || fileName ? (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
          <CheckCircle size={16} className="text-accent flex-shrink-0" />
          <span className="text-foreground text-xs truncate flex-1">
            {fileName || "Resume uploaded"}
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={() => fileRef.current?.click()}
          >
            <Upload size={12} />
          </Button>
        </div>
      ) : (
        <Button
          variant="hero-outline"
          size="sm"
          className="w-full"
          disabled={uploading}
          onClick={() => fileRef.current?.click()}
        >
          {uploading ? (
            <Loader2 className="animate-spin" size={14} />
          ) : (
            <>
              <Upload size={14} /> Upload Resume (PDF, DOC, DOCX)
            </>
          )}
        </Button>
      )}
    </div>
  );
};

export default ResumeUpload;
