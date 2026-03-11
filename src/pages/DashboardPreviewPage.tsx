import { useState } from "react";
import SectionHeading from "@/components/SectionHeading";
import { GraduationCap, Building2, School, Target, Brain, Route, Briefcase, Users, BarChart3, TrendingUp, PieChart } from "lucide-react";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area, LineChart, Line } from "recharts";

const radarData = [
  { skill: "DSA", value: 85 },
  { skill: "ML", value: 60 },
  { skill: "Web Dev", value: 90 },
  { skill: "System Design", value: 55 },
  { skill: "Communication", value: 75 },
  { skill: "Leadership", value: 70 },
];

const candidateData = [
  { name: "Arjun M.", score: 94 },
  { name: "Priya S.", score: 89 },
  { name: "Rahul K.", score: 85 },
  { name: "Sneha P.", score: 82 },
  { name: "Vikram R.", score: 78 },
];

const deptPerformance = [
  { dept: "CS", rate: 92 },
  { dept: "ECE", rate: 78 },
  { dept: "ME", rate: 65 },
  { dept: "Civil", rate: 55 },
  { dept: "IT", rate: 88 },
];

const salaryTrend = [
  { month: "Jan", salary: 6.2 },
  { month: "Mar", salary: 6.8 },
  { month: "May", salary: 7.5 },
  { month: "Jul", salary: 7.2 },
  { month: "Sep", salary: 8.1 },
  { month: "Nov", salary: 8.5 },
];

const chartTooltipStyle = {
  background: "hsl(240, 15%, 8%)",
  border: "1px solid hsl(240, 10%, 18%)",
  borderRadius: 8,
  color: "hsl(210, 40%, 98%)",
};

const tabs = [
  { key: "student", label: "Student Dashboard", icon: GraduationCap },
  { key: "recruiter", label: "Recruiter Dashboard", icon: Building2 },
  { key: "placement", label: "Placement Cell", icon: School },
];

const DashboardPreviewPage = () => {
  const [active, setActive] = useState("student");

  return (
    <div className="min-h-screen bg-background pt-20">
      <section className="section-padding">
        <div className="section-container">
          <SectionHeading
            badge="Dashboard Preview"
            title="Experience the"
            gradientText="Platform"
            subtitle="Interactive previews of each dashboard"
          />

          <div className="flex gap-2 justify-center mb-10">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setActive(t.key)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  active === t.key
                    ? "gradient-primary text-foreground glow"
                    : "glass text-muted-foreground hover:text-foreground"
                }`}
              >
                <t.icon size={16} />
                {t.label}
              </button>
            ))}
          </div>

          {active === "student" && (
            <div className="glass rounded-2xl p-6 max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Probability Meter */}
                <div className="glass rounded-xl p-6 text-center">
                  <h4 className="font-heading font-semibold text-foreground mb-4">Placement Probability</h4>
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                      <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(240, 10%, 18%)" strokeWidth="8" />
                      <circle cx="50" cy="50" r="42" fill="none" stroke="url(#meterGrad)" strokeWidth="8" strokeDasharray={`${87 * 2.64} ${100 * 2.64}`} strokeLinecap="round" />
                      <defs>
                        <linearGradient id="meterGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="hsl(263, 70%, 50%)" />
                          <stop offset="100%" stopColor="hsl(187, 92%, 42%)" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-heading font-bold text-2xl text-foreground">87%</span>
                    </div>
                  </div>
                  <p className="text-accent text-sm font-medium">High Probability</p>
                </div>
                {/* Skill Gap Radar */}
                <div className="glass rounded-xl p-6">
                  <h4 className="font-heading font-semibold text-foreground mb-4">Skill Gap Analysis</h4>
                  <ResponsiveContainer width="100%" height={200}>
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="hsl(240, 10%, 18%)" />
                      <PolarAngleAxis dataKey="skill" tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 10 }} />
                      <Radar dataKey="value" stroke="hsl(187, 92%, 42%)" fill="hsl(187, 92%, 42%)" fillOpacity={0.2} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
                {/* Career Roadmap */}
                <div className="glass rounded-xl p-6 md:col-span-2">
                  <h4 className="font-heading font-semibold text-foreground mb-4">Career Roadmap</h4>
                  <div className="flex items-center gap-3 overflow-x-auto pb-2">
                    {["Resume Polish", "DSA Practice", "Mock Interview", "Apply to 10 Jobs", "Secure Offer"].map((step, i) => (
                      <div key={step} className="flex items-center gap-3 flex-shrink-0">
                        <div className={`px-4 py-2 rounded-lg text-xs font-medium ${i < 3 ? "gradient-primary text-foreground" : "glass text-muted-foreground"}`}>
                          {step}
                        </div>
                        {i < 4 && <span className="text-accent">→</span>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {active === "recruiter" && (
            <div className="glass rounded-2xl p-6 max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="glass rounded-xl p-6 md:col-span-2">
                  <h4 className="font-heading font-semibold text-foreground mb-4">Candidate Ranking</h4>
                  <div className="space-y-3">
                    {candidateData.map((c, i) => (
                      <div key={c.name} className="flex items-center gap-4">
                        <span className="text-accent font-heading font-bold text-sm w-6">#{i + 1}</span>
                        <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-foreground text-xs font-bold">
                          {c.name[0]}
                        </div>
                        <span className="text-foreground text-sm flex-1">{c.name}</span>
                        <div className="w-32 h-3 rounded-full bg-muted overflow-hidden">
                          <div className="h-full rounded-full gradient-primary" style={{ width: `${c.score}%` }} />
                        </div>
                        <span className="text-accent font-semibold text-sm w-8">{c.score}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="glass rounded-xl p-6">
                  <h4 className="font-heading font-semibold text-foreground mb-4">Compatibility Score</h4>
                  <div className="text-center">
                    <span className="font-heading font-bold text-5xl gradient-text">92%</span>
                    <p className="text-muted-foreground text-sm mt-2">Average Match Rate</p>
                  </div>
                </div>
                <div className="glass rounded-xl p-6">
                  <h4 className="font-heading font-semibold text-foreground mb-4">Hiring Funnel</h4>
                  <div className="space-y-2">
                    {[
                      { label: "Applied", value: 250, pct: 100 },
                      { label: "Screened", value: 120, pct: 48 },
                      { label: "Interviewed", value: 45, pct: 18 },
                      { label: "Hired", value: 12, pct: 5 },
                    ].map((s) => (
                      <div key={s.label} className="flex items-center gap-2">
                        <span className="text-muted-foreground text-xs w-20">{s.label}</span>
                        <div className="flex-1 h-5 rounded bg-muted overflow-hidden">
                          <div className="h-full rounded gradient-primary" style={{ width: `${s.pct}%` }} />
                        </div>
                        <span className="text-foreground text-xs w-8">{s.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {active === "placement" && (
            <div className="glass rounded-2xl p-6 max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="glass rounded-xl p-6">
                  <h4 className="font-heading font-semibold text-foreground mb-4">Department Performance</h4>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={deptPerformance}>
                      <defs>
                        <linearGradient id="dg" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="hsl(263, 70%, 50%)" />
                          <stop offset="100%" stopColor="hsl(187, 92%, 42%)" />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(240, 10%, 18%)" />
                      <XAxis dataKey="dept" tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 12 }} />
                      <YAxis tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 12 }} />
                      <Tooltip contentStyle={chartTooltipStyle} />
                      <Bar dataKey="rate" fill="url(#dg)" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="glass rounded-xl p-6">
                  <h4 className="font-heading font-semibold text-foreground mb-4">Salary Trend (₹ LPA)</h4>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={salaryTrend}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(240, 10%, 18%)" />
                      <XAxis dataKey="month" tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 12 }} />
                      <YAxis tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 12 }} />
                      <Tooltip contentStyle={chartTooltipStyle} />
                      <Line type="monotone" dataKey="salary" stroke="hsl(187, 92%, 42%)" strokeWidth={2} dot={{ fill: "hsl(187, 92%, 42%)" }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="glass rounded-xl p-6 md:col-span-2">
                  <h4 className="font-heading font-semibold text-foreground mb-4">Placement Overview</h4>
                  <div className="grid grid-cols-4 gap-4">
                    {[
                      { label: "Total Students", value: "12,847" },
                      { label: "Placed", value: "10,920" },
                      { label: "Placement Rate", value: "85%" },
                      { label: "Avg Package", value: "₹8.5L" },
                    ].map((s) => (
                      <div key={s.label} className="text-center">
                        <p className="font-heading font-bold text-xl gradient-text">{s.value}</p>
                        <p className="text-muted-foreground text-xs">{s.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default DashboardPreviewPage;
