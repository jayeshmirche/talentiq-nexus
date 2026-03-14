import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Building2, Users, Target, Calendar, BarChart3, Search, TrendingUp } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import AnimatedSection, { StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import { motion } from "framer-motion";

const candidates = [
  { name: "Arjun Mehta", skills: "React, Node, Python", score: 94, status: "Shortlisted" },
  { name: "Priya Sharma", skills: "ML, Python, TensorFlow", score: 91, status: "Interview" },
  { name: "Rahul Kumar", skills: "Java, Spring, AWS", score: 88, status: "Applied" },
  { name: "Sneha Patel", skills: "React, TypeScript, Go", score: 85, status: "Shortlisted" },
  { name: "Vikram Rao", skills: "Python, Django, SQL", score: 82, status: "Applied" },
];

const hiringFunnel = [
  { stage: "Applied", count: 250, pct: 100 },
  { stage: "Screened", count: 120, pct: 48 },
  { stage: "Interviewed", count: 45, pct: 18 },
  { stage: "Hired", count: 12, pct: 5 },
];

const skillDist = [
  { skill: "React", count: 85 },
  { skill: "Python", count: 72 },
  { skill: "ML", count: 65 },
  { skill: "Java", count: 58 },
  { skill: "Go", count: 35 },
];

const RecruiterDashboard = () => {
  const { user } = useAuth();
  const org = user?.user_metadata?.organization || "Company";

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="section-container py-8">
        <AnimatedSection>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-heading font-bold text-2xl text-foreground"><span className="gradient-text">{org}</span> Recruiter Hub</h1>
              <p className="text-muted-foreground text-sm">AI-powered candidate intelligence</p>
            </div>
            <Button variant="hero" size="sm">
              <Search size={16} /> Post New Job
            </Button>
          </div>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Users, label: "Total Candidates", value: "1,247" },
            { icon: Target, label: "Avg Match Score", value: "92%" },
            { icon: Calendar, label: "Interviews Today", value: "8" },
            { icon: TrendingUp, label: "Offer Rate", value: "34%" },
          ].map((s) => (
            <StaggerItem key={s.label}>
              <div className="glass rounded-xl p-5 hover:glow-sm transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <s.icon size={16} className="text-primary" />
                  <span className="text-muted-foreground text-xs">{s.label}</span>
                </div>
                <p className="font-heading font-bold text-2xl text-foreground">{s.value}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Candidate Ranking */}
        <AnimatedSection className="mb-6">
          <div className="glass rounded-2xl p-6">
            <h3 className="font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
              <Users size={18} className="text-primary" /> AI Candidate Ranking
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left text-xs text-muted-foreground font-medium py-3 px-2">Rank</th>
                    <th className="text-left text-xs text-muted-foreground font-medium py-3 px-2">Name</th>
                    <th className="text-left text-xs text-muted-foreground font-medium py-3 px-2">Skills</th>
                    <th className="text-left text-xs text-muted-foreground font-medium py-3 px-2">Score</th>
                    <th className="text-left text-xs text-muted-foreground font-medium py-3 px-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {candidates.map((c, i) => (
                    <motion.tr
                      key={c.name}
                      whileHover={{ backgroundColor: "hsl(var(--muted) / 0.5)" }}
                      className="border-b border-border/50 transition-colors"
                    >
                      <td className="py-3 px-2 text-primary font-heading font-bold text-sm">#{i + 1}</td>
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
                            {c.name[0]}
                          </div>
                          <span className="text-foreground text-sm font-medium">{c.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-2 text-muted-foreground text-xs">{c.skills}</td>
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 rounded-full bg-muted overflow-hidden">
                            <div className="h-full rounded-full gradient-primary" style={{ width: `${c.score}%` }} />
                          </div>
                          <span className="text-primary text-xs font-semibold">{c.score}</span>
                        </div>
                      </td>
                      <td className="py-3 px-2">
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                          c.status === "Interview" ? "bg-secondary/10 text-secondary" :
                          c.status === "Shortlisted" ? "bg-accent/10 text-accent" :
                          "bg-muted text-muted-foreground"
                        }`}>{c.status}</span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Hiring Funnel */}
          <AnimatedSection>
            <div className="glass rounded-2xl p-6">
              <h3 className="font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
                <BarChart3 size={18} className="text-primary" /> Hiring Funnel
              </h3>
              <div className="space-y-3">
                {hiringFunnel.map((s) => (
                  <div key={s.stage} className="flex items-center gap-3">
                    <span className="text-muted-foreground text-xs w-20">{s.stage}</span>
                    <div className="flex-1 h-6 rounded-lg bg-muted overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${s.pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full rounded-lg gradient-primary"
                      />
                    </div>
                    <span className="text-foreground text-xs font-semibold w-10">{s.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Skill Distribution */}
          <AnimatedSection delay={0.1}>
            <div className="glass rounded-2xl p-6">
              <h3 className="font-heading font-semibold text-foreground mb-4">Candidate Skill Distribution</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={skillDist}>
                  <defs>
                    <linearGradient id="rg" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(263, 70%, 50%)" />
                      <stop offset="100%" stopColor="hsl(187, 72%, 42%)" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="skill" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                  <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, color: "hsl(var(--foreground))" }} />
                  <Bar dataKey="count" fill="url(#rg)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;
