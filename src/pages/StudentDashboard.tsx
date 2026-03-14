import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { GraduationCap, Target, Route, Briefcase, TrendingUp, BookOpen, Award, ArrowRight } from "lucide-react";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from "recharts";
import AnimatedSection, { StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import { motion } from "framer-motion";

const radarData = [
  { skill: "DSA", value: 85, fullMark: 100 },
  { skill: "ML/AI", value: 60, fullMark: 100 },
  { skill: "Web Dev", value: 90, fullMark: 100 },
  { skill: "System Design", value: 55, fullMark: 100 },
  { skill: "Communication", value: 75, fullMark: 100 },
  { skill: "Leadership", value: 70, fullMark: 100 },
];

const roadmapSteps = [
  { label: "Resume Polish", done: true },
  { label: "DSA Practice", done: true },
  { label: "Mock Interview", done: true },
  { label: "Apply to Jobs", done: false },
  { label: "Secure Offer", done: false },
];

const jobMatches = [
  { company: "Google", role: "SDE II", match: 94, salary: "₹32L" },
  { company: "Microsoft", role: "SDE", match: 91, salary: "₹28L" },
  { company: "Amazon", role: "SDE I", match: 88, salary: "₹26L" },
  { company: "Flipkart", role: "Backend Dev", match: 85, salary: "₹22L" },
];

const applications = [
  { company: "Google", status: "Interview", color: "text-secondary" },
  { company: "Microsoft", status: "Applied", color: "text-muted-foreground" },
  { company: "Amazon", status: "Offer", color: "text-accent" },
  { company: "Flipkart", status: "Rejected", color: "text-destructive" },
];

const StudentDashboard = () => {
  const { user } = useAuth();
  const name = user?.user_metadata?.full_name || "Student";

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="section-container py-8">
        <AnimatedSection>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-heading font-bold text-2xl text-foreground">Welcome back, <span className="gradient-text">{name}</span></h1>
              <p className="text-muted-foreground text-sm">Your AI-powered career dashboard</p>
            </div>
            <Button variant="hero" size="sm">
              <BookOpen size={16} /> Update Profile
            </Button>
          </div>
        </AnimatedSection>

        {/* Stats row */}
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Target, label: "Placement Score", value: "87%", sub: "High" },
            { icon: Award, label: "Skills Matched", value: "12/15", sub: "80%" },
            { icon: Briefcase, label: "Applications", value: "8", sub: "Active" },
            { icon: TrendingUp, label: "Profile Views", value: "142", sub: "+23 this week" },
          ].map((s) => (
            <StaggerItem key={s.label}>
              <div className="glass rounded-xl p-5 hover:glow-sm transition-all group">
                <div className="flex items-center gap-2 mb-2">
                  <s.icon size={16} className="text-primary" />
                  <span className="text-muted-foreground text-xs">{s.label}</span>
                </div>
                <p className="font-heading font-bold text-2xl text-foreground">{s.value}</p>
                <p className="text-accent text-xs font-medium">{s.sub}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Placement Probability */}
          <AnimatedSection>
            <div className="glass rounded-2xl p-6">
              <h3 className="font-heading font-semibold text-foreground mb-4">Placement Probability</h3>
              <div className="flex items-center justify-center">
                <div className="relative w-40 h-40">
                  <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                    <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
                    <motion.circle
                      cx="50" cy="50" r="42" fill="none"
                      stroke="url(#probGrad)"
                      strokeWidth="8" strokeLinecap="round"
                      initial={{ strokeDasharray: "0 264" }}
                      whileInView={{ strokeDasharray: `${87 * 2.64} 264` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                    <defs>
                      <linearGradient id="probGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="hsl(263, 70%, 50%)" />
                        <stop offset="100%" stopColor="hsl(187, 72%, 42%)" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-heading font-bold text-3xl text-foreground">87%</span>
                    <span className="text-primary text-xs font-medium">High</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 text-center">
                <p className="text-muted-foreground text-xs">Based on CGPA, skills, projects & certifications</p>
              </div>
            </div>
          </AnimatedSection>

          {/* Skill Gap Radar */}
          <AnimatedSection delay={0.1}>
            <div className="glass rounded-2xl p-6">
              <h3 className="font-heading font-semibold text-foreground mb-4">Skill Gap Analysis</h3>
              <ResponsiveContainer width="100%" height={220}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="hsl(var(--border))" />
                  <PolarAngleAxis dataKey="skill" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                  <Radar dataKey="value" stroke="hsl(263, 70%, 50%)" fill="hsl(263, 70%, 50%)" fillOpacity={0.15} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </AnimatedSection>
        </div>

        {/* Career Roadmap */}
        <AnimatedSection className="mb-6">
          <div className="glass rounded-2xl p-6">
            <h3 className="font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
              <Route size={18} className="text-primary" /> Career Roadmap
            </h3>
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {roadmapSteps.map((step, i) => (
                <div key={step.label} className="flex items-center gap-2 flex-shrink-0">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className={`px-4 py-2.5 rounded-lg text-xs font-medium transition-all ${
                      step.done ? "gradient-primary text-primary-foreground" : "glass text-muted-foreground border border-dashed border-border"
                    }`}
                  >
                    {step.label}
                  </motion.div>
                  {i < roadmapSteps.length - 1 && <ArrowRight size={14} className="text-muted-foreground" />}
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Job Matches */}
          <AnimatedSection>
            <div className="glass rounded-2xl p-6">
              <h3 className="font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
                <Briefcase size={18} className="text-primary" /> Smart Job Matches
              </h3>
              <div className="space-y-3">
                {jobMatches.map((job) => (
                  <motion.div
                    key={job.company}
                    whileHover={{ x: 4 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div>
                      <p className="text-foreground text-sm font-medium">{job.company}</p>
                      <p className="text-muted-foreground text-xs">{job.role}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-primary text-sm font-semibold">{job.match}%</p>
                      <p className="text-muted-foreground text-xs">{job.salary}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Application Tracker */}
          <AnimatedSection delay={0.1}>
            <div className="glass rounded-2xl p-6">
              <h3 className="font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
                <GraduationCap size={18} className="text-primary" /> Application Tracker
              </h3>
              <div className="space-y-3">
                {applications.map((app) => (
                  <div key={app.company} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <p className="text-foreground text-sm font-medium">{app.company}</p>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full bg-background ${app.color}`}>
                      {app.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
