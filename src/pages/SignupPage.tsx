import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { GraduationCap, Building2, School, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const SignupPage = () => {
  const [role, setRole] = useState<"student" | "recruiter" | "placement">("student");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const roles = [
    { key: "student" as const, label: "Student", icon: GraduationCap },
    { key: "recruiter" as const, label: "Recruiter", icon: Building2 },
    { key: "placement" as const, label: "Placement Cell", icon: School },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !password) { toast.error("Please fill in all required fields"); return; }
    if (password.length < 6) { toast.error("Password must be at least 6 characters"); return; }
    setLoading(true);
    try {
      await signUp(email, password, { full_name: fullName, role, organization });
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 pt-20">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
              <span className="text-primary-foreground font-heading font-bold">T</span>
            </div>
            <span className="font-heading font-bold text-xl text-foreground">
              Talent<span className="gradient-text">IQ</span>
            </span>
          </Link>
          <h1 className="font-heading font-bold text-2xl text-foreground">Create Account</h1>
          <p className="text-muted-foreground text-sm mt-1">Get started with TalentIQ</p>
        </div>

        <div className="glass rounded-2xl p-8 glow-sm">
          <div className="flex gap-1 mb-6 bg-muted rounded-lg p-1">
            {roles.map((r) => (
              <button
                key={r.key}
                onClick={() => setRole(r.key)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md text-xs font-medium transition-all ${
                  role === r.key
                    ? "gradient-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <r.icon size={14} />
                {r.label}
              </button>
            ))}
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} className="bg-muted border-border" />
            <Input placeholder="Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-muted border-border" />
            <Input placeholder={role === "recruiter" ? "Company Name" : "College / Institution"} value={organization} onChange={(e) => setOrganization(e.target.value)} className="bg-muted border-border" />
            <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-muted border-border" />
            <Button variant="hero" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="animate-spin" size={18} /> : "Create Account"}
            </Button>
          </form>

          <p className="text-center text-muted-foreground text-sm mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline font-medium">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
