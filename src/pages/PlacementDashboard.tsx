import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { School, BarChart3, TrendingUp, Users, Award, Download } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { useRealtimeStats } from "@/hooks/useRealtimeStats";
import AnimatedSection, { StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import { motion } from "framer-motion";

const deptData = [
  { dept: "CS", rate: 92 },
  { dept: "ECE", rate: 78 },
  { dept: "ME", rate: 65 },
  { dept: "Civil", rate: 55 },
  { dept: "IT", rate: 88 },
  { dept: "EEE", rate: 70 },
];

const salaryDist = [
  { range: "3-5L", count: 180 },
  { range: "5-8L", count: 320 },
  { range: "8-12L", count: 250 },
  { range: "12-20L", count: 140 },
  { range: "20L+", count: 60 },
];

const salaryTrend = [
  { month: "Jan", avg: 6.2 },
  { month: "Mar", avg: 6.8 },
  { month: "May", avg: 7.5 },
  { month: "Jul", avg: 7.2 },
  { month: "Sep", avg: 8.1 },
  { month: "Nov", avg: 8.5 },
];

const funnelStages = [
  { name: "Registered", value: 12847, pct: 100 },
  { name: "Applied", value: 8420, pct: 66 },
  { name: "Shortlisted", value: 4800, pct: 37 },
  { name: "Interviewed", value: 3200, pct: 25 },
  { name: "Placed", value: 10920, pct: 85 },
];

const readinessData = [
  { name: "Ready", value: 65 },
  { name: "Needs Prep", value: 25 },
  { name: "At Risk", value: 10 },
];
const READINESS_COLORS = ["hsl(263, 70%, 50%)", "hsl(217, 91%, 60%)", "hsl(0, 84%, 60%)"];

const PlacementDashboard = () => {
  const { user } = useAuth();
  const { getStat } = useRealtimeStats();
  const org = user?.user_metadata?.organization || "Institution";

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="section-container py-8">
        <AnimatedSection>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-heading font-bold text-2xl text-foreground"><span className="gradient-text">{org}</span> Placement Cell</h1>
              <p className="text-muted-foreground text-sm">Real-time placement analytics & predictions</p>
            </div>
            <Button variant="hero" size="sm">
              <Download size={16} /> Export Report
            </Button>
          </div>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Users, label: "Total Students", value: (getStat("active_students") ?? 12847).toLocaleString() },
            { icon: Award, label: "Placement Rate", value: `${getStat("placement_rate") ?? 85}%` },
            { icon: TrendingUp, label: "Avg Package", value: `₹${getStat("avg_salary_lpa") ?? 8.5}L` },
            { icon: School, label: "Companies", value: (getStat("companies_hiring") ?? 342).toLocaleString() },
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

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Dept Performance */}
          <AnimatedSection>
            <div className="glass rounded-2xl p-6">
              <h3 className="font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
                <BarChart3 size={18} className="text-primary" /> Department Performance
              </h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={deptData}>
                  <defs>
                    <linearGradient id="pdg" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(263, 70%, 50%)" />
                      <stop offset="100%" stopColor="hsl(187, 72%, 42%)" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="dept" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                  <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, color: "hsl(var(--foreground))" }} />
                  <Bar dataKey="rate" fill="url(#pdg)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </AnimatedSection>

          {/* Salary Trend */}
          <AnimatedSection delay={0.1}>
            <div className="glass rounded-2xl p-6">
              <h3 className="font-heading font-semibold text-foreground mb-4">Salary Trend (₹ LPA)</h3>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={salaryTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                  <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, color: "hsl(var(--foreground))" }} />
                  <Line type="monotone" dataKey="avg" stroke="hsl(263, 70%, 50%)" strokeWidth={2} dot={{ fill: "hsl(263, 70%, 50%)", r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </AnimatedSection>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          {/* Salary Distribution */}
          <AnimatedSection>
            <div className="glass rounded-2xl p-6">
              <h3 className="font-heading font-semibold text-foreground mb-4">Salary Distribution</h3>
              <div className="space-y-3">
                {salaryDist.map((s) => (
                  <div key={s.range} className="flex items-center gap-3">
                    <span className="text-muted-foreground text-xs w-12">{s.range}</span>
                    <div className="flex-1 h-5 rounded bg-muted overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(s.count / 320) * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="h-full rounded gradient-primary"
                      />
                    </div>
                    <span className="text-foreground text-xs w-8">{s.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Placement Funnel */}
          <AnimatedSection delay={0.1}>
            <div className="glass rounded-2xl p-6">
              <h3 className="font-heading font-semibold text-foreground mb-4">Placement Funnel</h3>
              <div className="space-y-3">
                {funnelStages.map((s) => (
                  <div key={s.name} className="flex items-center gap-3">
                    <span className="text-muted-foreground text-xs w-20">{s.name}</span>
                    <div className="flex-1 h-5 rounded bg-muted overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${s.pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="h-full rounded gradient-primary"
                      />
                    </div>
                    <span className="text-foreground text-xs w-12">{s.value.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Student Readiness */}
          <AnimatedSection delay={0.2}>
            <div className="glass rounded-2xl p-6">
              <h3 className="font-heading font-semibold text-foreground mb-4">Student Readiness</h3>
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie data={readinessData} cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={4} dataKey="value">
                    {readinessData.map((_, i) => (
                      <Cell key={i} fill={READINESS_COLORS[i]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, color: "hsl(var(--foreground))" }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-4 mt-2">
                {readinessData.map((d, i) => (
                  <div key={d.name} className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full" style={{ background: READINESS_COLORS[i] }} />
                    <span className="text-muted-foreground text-xs">{d.name} {d.value}%</span>
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

export default PlacementDashboard;
