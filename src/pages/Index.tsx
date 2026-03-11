import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ParticlesBackground from "@/components/ParticlesBackground";
import SectionHeading from "@/components/SectionHeading";
import {
  FileSpreadsheet, Brain, TrendingUp, GraduationCap, Building2, School,
  Upload, Search, Target, Lightbulb, Route, Briefcase, RefreshCw,
  ClipboardList, Users, BarChart3, Calendar, LayoutDashboard,
  Monitor, PieChart, ArrowRight, Play, Star, ChevronRight
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, FunnelChart, Funnel, LabelList } from "recharts";

const placementData = [
  { name: "Before", value: 62, fill: "hsl(240, 10%, 25%)" },
  { name: "After TalentIQ", value: 85, fill: "url(#barGradient)" },
];

const hiringSpeed = [
  { name: "Manual", days: 5, fill: "hsl(240, 10%, 25%)" },
  { name: "TalentIQ", days: 1, fill: "url(#barGradient)" },
];

const roiData = [
  { name: "Traditional", cost: 15000, fill: "hsl(240, 10%, 25%)" },
  { name: "TalentIQ", cost: 8500, fill: "url(#barGradient)" },
];

const funnelData = [
  { name: "Applied", value: 1000, fill: "hsl(263, 70%, 45%)" },
  { name: "Shortlisted", value: 600, fill: "hsl(230, 80%, 50%)" },
  { name: "Interview", value: 350, fill: "hsl(200, 85%, 48%)" },
  { name: "Selected", value: 220, fill: "hsl(187, 92%, 42%)" },
];

const problemCards = [
  { icon: FileSpreadsheet, title: "Manual Tracking", desc: "Hours wasted on data entry and outdated spreadsheets" },
  { icon: FileSpreadsheet, title: "Excel Sheets", desc: "Fragmented data across disconnected files" },
  { icon: TrendingUp, title: "No Prediction", desc: "Zero visibility into placement outcomes" },
];

const audienceCards = [
  { icon: GraduationCap, title: "Students", desc: "Get AI-powered career guidance, skill gap analysis, and placement predictions", color: "primary" },
  { icon: Building2, title: "Recruiters", desc: "Find the best candidates with AI-driven compatibility scoring and smart screening", color: "secondary" },
  { icon: School, title: "Placement Cells", desc: "Monitor, predict, and optimize placement outcomes across departments", color: "accent" },
];

const workflowSteps = [
  { icon: GraduationCap, label: "Student", desc: "Profile & skills analysis" },
  { icon: Brain, label: "AI Career Engine", desc: "Predictive matching & optimization" },
  { icon: Building2, label: "Recruiter", desc: "Smart hiring & screening" },
  { icon: School, label: "Placement Cell", desc: "Monitoring & analytics" },
];

const testimonials = [
  { name: "Arjun Mehta", role: "Student, IIT Delhi", text: "TalentIQ predicted my placement probability at 87% and gave me a clear roadmap. I landed my dream job at Google!", avatar: "A" },
  { name: "Priya Sharma", role: "HR Lead, Infosys", text: "Hiring time reduced by 4x. The AI matching engine surfaces the best candidates instantly.", avatar: "P" },
  { name: "Dr. Rajesh Kumar", role: "Placement Officer, NIT", text: "We went from 62% to 89% placement rate in one year. The predictive analytics are game-changing.", avatar: "R" },
];

const GradientDefs = () => (
  <defs>
    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="hsl(263, 70%, 50%)" />
      <stop offset="100%" stopColor="hsl(187, 92%, 42%)" />
    </linearGradient>
  </defs>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <ParticlesBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-background" />
        <div className="section-container relative z-10 text-center pt-20">
          <div className="animate-slide-up" style={{ animationDelay: "0.1s", animationFillMode: "both" }}>
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase glass glow-border mb-8 text-accent">
              AI-Powered Career Intelligence
            </span>
          </div>
          <h1 className="animate-slide-up text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-bold mb-4 tracking-tight" style={{ animationDelay: "0.2s", animationFillMode: "both" }}>
            <span className="gradient-text">TALENTIQ</span>
          </h1>
          <p className="animate-slide-up text-xl md:text-2xl text-muted-foreground font-heading font-medium mb-2" style={{ animationDelay: "0.3s", animationFillMode: "both" }}>
            AI Career Intelligence Platform
          </p>
          <p className="animate-slide-up text-lg md:text-xl text-muted-foreground/80 max-w-2xl mx-auto mb-10" style={{ animationDelay: "0.4s", animationFillMode: "both" }}>
            We Don't Just Track Placements. We <span className="gradient-text font-semibold">Predict & Optimize</span> Careers.
          </p>
          <div className="animate-slide-up flex flex-col sm:flex-row gap-4 justify-center" style={{ animationDelay: "0.5s", animationFillMode: "both" }}>
            <Button variant="hero" size="lg" asChild>
              <Link to="/signup">Get Started <ArrowRight size={18} /></Link>
            </Button>
            <Button variant="hero-outline" size="lg">
              <Play size={18} /> Watch Demo
            </Button>
          </div>

          {/* Dashboard Preview */}
          <div className="animate-slide-up mt-16 max-w-4xl mx-auto" style={{ animationDelay: "0.7s", animationFillMode: "both" }}>
            <div className="glass rounded-2xl p-1 glow">
              <div className="bg-card rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-destructive/60" />
                  <div className="w-3 h-3 rounded-full bg-accent/40" />
                  <div className="w-3 h-3 rounded-full bg-green-500/40" />
                  <span className="text-muted-foreground text-xs ml-2">TalentIQ Dashboard</span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: "Placement Rate", value: "85%", change: "+23%" },
                    { label: "Students Active", value: "12,847", change: "+18%" },
                    { label: "Avg. Salary", value: "₹8.5L", change: "+31%" },
                  ].map((stat) => (
                    <div key={stat.label} className="glass rounded-lg p-4 text-left">
                      <p className="text-muted-foreground text-xs mb-1">{stat.label}</p>
                      <p className="text-foreground font-heading font-bold text-xl">{stat.value}</p>
                      <p className="text-accent text-xs font-medium">{stat.change}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 h-32 glass rounded-lg flex items-center justify-center">
                  <div className="flex items-end gap-2 h-20">
                    {[40, 55, 45, 70, 65, 80, 75, 85, 90, 82, 88, 95].map((h, i) => (
                      <div
                        key={i}
                        className="w-4 sm:w-6 rounded-t gradient-primary opacity-80"
                        style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="section-padding relative">
        <div className="section-container">
          <SectionHeading
            badge="The Problem"
            title="The Placement System is"
            gradientText="Broken"
            subtitle="Traditional methods fail students, recruiters, and institutions"
          />
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {problemCards.map((card) => (
              <div key={card.title} className="glass rounded-2xl p-8 text-center hover:glow-border transition-all duration-300 group">
                <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <card.icon size={24} className="text-foreground" />
                </div>
                <h3 className="font-heading font-semibold text-foreground text-lg mb-2">{card.title}</h3>
                <p className="text-muted-foreground text-sm">{card.desc}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <span className="glass rounded-xl px-6 py-3 text-muted-foreground text-sm font-medium">Traditional Placement Tracker</span>
            <ArrowRight className="text-accent" />
            <span className="gradient-primary rounded-xl px-6 py-3 text-foreground text-sm font-semibold glow">AI Career Intelligence</span>
          </div>
        </div>
      </section>

      {/* Solution Overview */}
      <section className="section-padding relative bg-card/20">
        <div className="section-container">
          <SectionHeading
            badge="The Solution"
            title="Meet"
            gradientText="TalentIQ"
            subtitle="AI-powered placement optimization connecting students, recruiters, and placement cells"
          />
          <div className="max-w-3xl mx-auto glass rounded-2xl p-8 glow">
            <div className="flex flex-col md:flex-row items-center gap-6">
              {workflowSteps.map((step, i) => (
                <div key={step.label} className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-2xl glass glow-border flex items-center justify-center mx-auto mb-3">
                      <step.icon size={28} className="text-accent" />
                    </div>
                    <p className="font-heading font-semibold text-foreground text-sm">{step.label}</p>
                    <p className="text-muted-foreground text-xs">{step.desc}</p>
                  </div>
                  {i < workflowSteps.length - 1 && (
                    <ChevronRight className="text-accent hidden md:block flex-shrink-0" size={20} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="section-padding relative">
        <div className="section-container">
          <SectionHeading
            badge="Impact"
            title="Measurable"
            gradientText="Results"
            subtitle="Data-driven outcomes that speak for themselves"
          />
          <div className="grid md:grid-cols-2 gap-6">
            {/* Placement Rate */}
            <div className="glass rounded-2xl p-6">
              <h3 className="font-heading font-semibold text-foreground mb-4">Placement Rate Improvement</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={placementData}>
                  <GradientDefs />
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(240, 10%, 18%)" />
                  <XAxis dataKey="name" tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 12 }} />
                  <YAxis tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 12 }} />
                  <Tooltip contentStyle={{ background: "hsl(240, 15%, 8%)", border: "1px solid hsl(240, 10%, 18%)", borderRadius: 8, color: "hsl(210, 40%, 98%)" }} />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            {/* Hiring Speed */}
            <div className="glass rounded-2xl p-6">
              <h3 className="font-heading font-semibold text-foreground mb-4">Hiring Speed (Days)</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={hiringSpeed}>
                  <GradientDefs />
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(240, 10%, 18%)" />
                  <XAxis dataKey="name" tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 12 }} />
                  <YAxis tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 12 }} />
                  <Tooltip contentStyle={{ background: "hsl(240, 15%, 8%)", border: "1px solid hsl(240, 10%, 18%)", borderRadius: 8, color: "hsl(210, 40%, 98%)" }} />
                  <Bar dataKey="days" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            {/* Funnel */}
            <div className="glass rounded-2xl p-6">
              <h3 className="font-heading font-semibold text-foreground mb-4">Placement Funnel</h3>
              <div className="flex flex-col gap-3">
                {funnelData.map((item, i) => (
                  <div key={item.name} className="flex items-center gap-3">
                    <span className="text-muted-foreground text-xs w-20">{item.name}</span>
                    <div className="flex-1 h-8 rounded-lg overflow-hidden bg-muted">
                      <div
                        className="h-full rounded-lg transition-all duration-1000"
                        style={{ width: `${(item.value / 1000) * 100}%`, background: item.fill }}
                      />
                    </div>
                    <span className="text-foreground text-sm font-semibold w-12">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* ROI */}
            <div className="glass rounded-2xl p-6">
              <h3 className="font-heading font-semibold text-foreground mb-4">Cost Per Hire (₹)</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={roiData}>
                  <GradientDefs />
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(240, 10%, 18%)" />
                  <XAxis dataKey="name" tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 12 }} />
                  <YAxis tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 12 }} />
                  <Tooltip contentStyle={{ background: "hsl(240, 15%, 8%)", border: "1px solid hsl(240, 10%, 18%)", borderRadius: 8, color: "hsl(210, 40%, 98%)" }} />
                  <Bar dataKey="cost" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      {/* Who Is It For */}
      <section className="section-padding bg-card/20">
        <div className="section-container">
          <SectionHeading
            badge="For Everyone"
            title="Built for the Entire"
            gradientText="Ecosystem"
          />
          <div className="grid md:grid-cols-3 gap-6">
            {audienceCards.map((card) => (
              <Link
                key={card.title}
                to="/product"
                className="glass rounded-2xl p-8 hover:glow-border transition-all duration-300 group block"
              >
                <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <card.icon size={28} className="text-foreground" />
                </div>
                <h3 className="font-heading font-semibold text-foreground text-xl mb-3">{card.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{card.desc}</p>
                <span className="inline-flex items-center gap-1 text-accent text-sm font-medium mt-4 group-hover:gap-2 transition-all">
                  Learn more <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding">
        <div className="section-container">
          <SectionHeading
            badge="Testimonials"
            title="Trusted by"
            gradientText="Thousands"
          />
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="glass rounded-2xl p-8">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="text-accent fill-accent" />
                  ))}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-foreground font-heading font-bold text-sm">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-foreground font-semibold text-sm">{t.name}</p>
                    <p className="text-muted-foreground text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        <div className="section-container relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-4">
            Start Optimizing Placements with <span className="gradient-text">AI</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
            Join hundreds of institutions transforming their placement outcomes
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" asChild>
              <Link to="/signup">Get Started <ArrowRight size={18} /></Link>
            </Button>
            <Button variant="hero-outline" size="lg" asChild>
              <Link to="/contact">Book Demo</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
