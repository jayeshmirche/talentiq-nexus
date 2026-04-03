import SectionHeading from "@/components/SectionHeading";
import ParticlesBackground from "@/components/ParticlesBackground";
import AnimatedSection, { StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area, Legend, LabelList } from "recharts";

const placementProb = [
  { name: "CS", traditional: 68, talentiq: 92 },
  { name: "ECE", traditional: 55, talentiq: 78 },
  { name: "ME", traditional: 42, talentiq: 65 },
  { name: "Civil", traditional: 35, talentiq: 55 },
  { name: "IT", traditional: 62, talentiq: 88 },
  { name: "EEE", traditional: 48, talentiq: 70 },
];

const salaryTrend = [
  { year: "2021", avg: 5.2 }, { year: "2022", avg: 6.1 }, { year: "2023", avg: 7.0 },
  { year: "2024", avg: 7.8 }, { year: "2025", avg: 8.5 }, { year: "2026", avg: 9.2 },
];

const skillDemand = [
  { skill: "React", demand: 92 }, { skill: "Python", demand: 88 }, { skill: "ML/AI", demand: 95 },
  { skill: "Cloud", demand: 82 }, { skill: "DevOps", demand: 75 }, { skill: "Data", demand: 90 },
];

const hiringEfficiency = [
  { name: "Screening", manual: 48, ai: 8 }, { name: "Shortlist", manual: 24, ai: 4 },
  { name: "Interview", manual: 16, ai: 6 }, { name: "Offer", manual: 8, ai: 2 },
];

const chartTooltipStyle = {
  background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 10, color: "hsl(var(--foreground))", fontSize: 13, padding: "8px 12px",
};

const renderLabel = (props: any) => {
  const { x, y, width, value } = props;
  return (
    <text x={x + width / 2} y={y - 6} fill="hsl(var(--foreground))" textAnchor="middle" fontSize={11} fontWeight={700}>
      {value}
    </text>
  );
};

const AnalyticsPage = () => (
  <div className="min-h-screen bg-background pt-20">
    <section className="section-padding relative">
      <ParticlesBackground />
      <div className="section-container relative z-10">
        <AnimatedSection>
          <SectionHeading badge="AI Engine" title="Analytics &" gradientText="AI Engine" subtitle="Powered by advanced machine learning and real-time data processing" />
        </AnimatedSection>

        <StaggerContainer className="grid md:grid-cols-2 gap-6 mb-8">
          <StaggerItem>
            <div className="glass rounded-2xl p-6">
              <h3 className="font-heading font-semibold text-foreground mb-1 text-lg">Placement Probability by Department</h3>
              <p className="text-muted-foreground text-xs mb-4">Traditional vs TalentIQ AI</p>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={placementProb} barSize={16} barGap={4}>
                  <defs>
                    <linearGradient id="pg" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(263, 70%, 55%)" />
                      <stop offset="100%" stopColor="hsl(187, 92%, 45%)" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 13, fontWeight: 600 }} />
                  <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} domain={[0, 100]} unit="%" />
                  <Tooltip contentStyle={chartTooltipStyle} />
                  <Legend wrapperStyle={{ fontSize: 13, fontWeight: 600, paddingTop: 8 }} formatter={(v: string) => <span style={{ color: "hsl(var(--foreground))" }}>{v}</span>} />
                  <Bar dataKey="traditional" name="Traditional" fill="hsl(var(--muted-foreground))" radius={[6, 6, 0, 0]} opacity={0.45}>
                    <LabelList dataKey="traditional" position="top" content={renderLabel} />
                  </Bar>
                  <Bar dataKey="talentiq" name="TalentIQ" fill="url(#pg)" radius={[6, 6, 0, 0]}>
                    <LabelList dataKey="talentiq" position="top" content={renderLabel} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="glass rounded-2xl p-6">
              <h3 className="font-heading font-semibold text-foreground mb-1 text-lg">Salary Forecast Trend (₹ LPA)</h3>
              <p className="text-muted-foreground text-xs mb-4">Projected average salary growth</p>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={salaryTrend}>
                  <defs><linearGradient id="ag" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="hsl(263, 70%, 55%)" stopOpacity={0.4} /><stop offset="100%" stopColor="hsl(187, 92%, 45%)" stopOpacity={0.05} /></linearGradient></defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="year" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 13, fontWeight: 600 }} />
                  <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} unit=" L" />
                  <Tooltip contentStyle={chartTooltipStyle} />
                  <Area type="monotone" dataKey="avg" stroke="hsl(187, 92%, 42%)" fill="url(#ag)" strokeWidth={3} name="Avg Salary (LPA)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="glass rounded-2xl p-6">
              <h3 className="font-heading font-semibold text-foreground mb-1 text-lg">Skill Demand Heatmap</h3>
              <p className="text-muted-foreground text-xs mb-4">Top skills required by recruiters</p>
              <div className="space-y-3 mt-2">
                {skillDemand.map((s) => (
                  <div key={s.skill} className="flex items-center gap-3">
                    <span className="text-muted-foreground text-sm w-16 font-medium">{s.skill}</span>
                    <div className="flex-1 h-7 rounded-lg bg-muted overflow-hidden">
                      <div className="h-full rounded-lg gradient-primary transition-all duration-700" style={{ width: `${s.demand}%` }} />
                    </div>
                    <span className="text-foreground text-sm font-bold w-10 text-right">{s.demand}%</span>
                  </div>
                ))}
              </div>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="glass rounded-2xl p-6">
              <h3 className="font-heading font-semibold text-foreground mb-1 text-lg">Hiring Efficiency (Hours)</h3>
              <p className="text-muted-foreground text-xs mb-4">Manual process vs TalentIQ AI</p>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={hiringEfficiency} barSize={20} barGap={4}>
                  <defs>
                    <linearGradient id="hg" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(150, 80%, 40%)" />
                      <stop offset="100%" stopColor="hsl(187, 92%, 45%)" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 13, fontWeight: 600 }} />
                  <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} unit="h" />
                  <Tooltip contentStyle={chartTooltipStyle} />
                  <Legend wrapperStyle={{ fontSize: 13, fontWeight: 600, paddingTop: 8 }} formatter={(v: string) => <span style={{ color: "hsl(var(--foreground))" }}>{v}</span>} />
                  <Bar dataKey="manual" fill="hsl(var(--muted-foreground))" radius={[6, 6, 0, 0]} name="Manual" opacity={0.45}>
                    <LabelList dataKey="manual" position="top" content={renderLabel} />
                  </Bar>
                  <Bar dataKey="ai" fill="url(#hg)" radius={[6, 6, 0, 0]} name="TalentIQ">
                    <LabelList dataKey="ai" position="top" content={renderLabel} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </StaggerItem>
        </StaggerContainer>

        <AnimatedSection>
          <div className="glass rounded-2xl p-8 text-center max-w-2xl mx-auto">
            <h3 className="font-heading font-bold text-foreground text-2xl mb-3">AI Technology Stack</h3>
            <div className="flex flex-wrap gap-3 justify-center">
              {["NLP Engine", "Deep Learning", "Predictive Models", "Graph Neural Networks", "Recommendation System", "Real-time Analytics"].map((t) => (
                <span key={t} className="px-4 py-2 rounded-full glass glow-border text-accent text-xs font-medium">{t}</span>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  </div>
);

export default AnalyticsPage;
