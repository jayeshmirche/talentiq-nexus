import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { GraduationCap, Building2, School } from "lucide-react";

const SignupPage = () => {
  const [role, setRole] = useState<"student" | "recruiter" | "placement">("student");

  const roles = [
    { key: "student" as const, label: "Student", icon: GraduationCap },
    { key: "recruiter" as const, label: "Recruiter", icon: Building2 },
    { key: "placement" as const, label: "Placement Cell", icon: School },
  ];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 pt-20">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
              <span className="text-foreground font-heading font-bold">T</span>
            </div>
            <span className="font-heading font-bold text-xl text-foreground">
              Talent<span className="gradient-text">IQ</span>
            </span>
          </Link>
          <h1 className="font-heading font-bold text-2xl text-foreground">Create Account</h1>
          <p className="text-muted-foreground text-sm mt-1">Get started with TalentIQ</p>
        </div>

        <div className="glass rounded-2xl p-8">
          <div className="flex gap-1 mb-6 glass rounded-lg p-1">
            {roles.map((r) => (
              <button
                key={r.key}
                onClick={() => setRole(r.key)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md text-xs font-medium transition-all ${
                  role === r.key
                    ? "gradient-primary text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <r.icon size={14} />
                {r.label}
              </button>
            ))}
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <Input placeholder="Full Name" className="bg-muted border-border" />
            <Input placeholder="Email Address" type="email" className="bg-muted border-border" />
            <Input placeholder={role === "recruiter" ? "Company Name" : "College / Institution"} className="bg-muted border-border" />
            <Input placeholder="Password" type="password" className="bg-muted border-border" />
            <Button variant="hero" className="w-full">Create Account</Button>
          </form>

          <p className="text-center text-muted-foreground text-sm mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-accent hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
