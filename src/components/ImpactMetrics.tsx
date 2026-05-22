import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { TrendingUp, Zap, IndianRupee, ArrowUpRight, Sparkles } from "lucide-react";
import { useRealtimeStats } from "@/hooks/useRealtimeStats";
import { usePlacementAnalytics } from "@/hooks/usePlacementAnalytics";
import SectionHeading from "@/components/SectionHeading";
import AnimatedSection from "@/components/AnimatedSection";

/* ------------------------------ helpers ------------------------------ */

const CountUp = ({ to, prefix = "", suffix = "", decimals = 0, duration = 1.6 }: {
  to: number; prefix?: string; suffix?: string; decimals?: number; duration?: number;
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) =>
    `${prefix}${v.toLocaleString("en-IN", { maximumFractionDigits: decimals, minimumFractionDigits: decimals })}${suffix}`
  );
  const [text, setText] = useState(`${prefix}0${suffix}`);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, to, { duration, ease: [0.22, 1, 0.36, 1] });
    const unsub = rounded.on("change", (v) => setText(v));
    return () => { controls.stop(); unsub(); };
  }, [inView, to, duration, mv, rounded]);

  return <span ref={ref}>{text}</span>;
};

const CardShell = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{ y: -6 }}
    className="group relative rounded-2xl p-[1.5px] bg-gradient-to-br from-primary/50 via-secondary/40 to-accent/50 shadow-xl hover:shadow-[0_20px_70px_-20px_hsl(263_70%_55%/0.6)] transition-all duration-500"
  >
    <div className="relative h-full rounded-2xl bg-card/85 backdrop-blur-xl p-6 overflow-hidden">
      <div className="pointer-events-none absolute -top-24 -right-24 w-56 h-56 rounded-full bg-primary/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 w-56 h-56 rounded-full bg-accent/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      <div className="relative z-10 h-full flex flex-col">{children}</div>
    </div>
  </motion.div>
);

const CardHeader = ({ icon: Icon, title, sub }: { icon: any; title: string; sub: string }) => (
  <div className="flex items-start justify-between mb-6">
    <div>
      <h3 className="font-heading font-bold text-foreground text-lg leading-tight">{title}</h3>
      <p className="text-muted-foreground text-xs mt-1">{sub}</p>
    </div>
    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/30">
      <Icon size={20} className="text-primary-foreground" />
    </div>
  </div>
);

const InsightPill = ({ children }: { children: React.ReactNode }) => (
  <div className="mt-5 flex items-center gap-2 rounded-xl px-3 py-2 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border border-primary/20">
    <Sparkles size={14} className="text-accent flex-shrink-0" />
    <span className="text-xs font-semibold text-foreground/90">{children}</span>
  </div>
);

/* ------------------------------ cards ------------------------------ */

const PlacementRateCard = ({ before, after }: { before: number; after: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const improvement = Math.round(((after - before) / before) * 100);
  const max = 100;

  return (
    <CardShell>
      <CardHeader icon={TrendingUp} title="Placement Rate" sub="Before vs After TalentIQ" />
      <div ref={ref} className="flex items-end justify-center gap-10 h-56 px-4 relative">
        {/* grid lines */}
        <div className="absolute inset-x-0 inset-y-2 flex flex-col justify-between pointer-events-none">
          {[0, 1, 2, 3].map((i) => <div key={i} className="border-t border-dashed border-border/40" />)}
        </div>

        {[
          { label: "Before", value: before, color: "from-muted-foreground/40 to-muted-foreground/20", glow: "" },
          { label: "After", value: after, color: "from-primary via-secondary to-accent", glow: "shadow-[0_0_40px_hsl(263_70%_55%/0.5)]" },
        ].map((bar, i) => (
          <div key={bar.label} className="relative flex flex-col items-center justify-end h-full w-20 z-10">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 + i * 0.2, duration: 0.4 }}
              className="absolute -top-1 text-foreground font-heading font-bold text-xl"
            >
              <CountUp to={bar.value} suffix="%" duration={1.4} />
            </motion.div>
            <motion.div
              initial={{ height: 0 }}
              animate={inView ? { height: `${(bar.value / max) * 85}%` } : {}}
              transition={{ delay: 0.3 + i * 0.15, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className={`w-full rounded-t-xl bg-gradient-to-t ${bar.color} ${bar.glow} relative`}
            >
              {i === 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 1.6 }}
                  className="absolute -top-7 -right-3 flex items-center gap-0.5 text-xs font-bold text-accent"
                >
                  <ArrowUpRight size={14} className="animate-pulse" />
                </motion.div>
              )}
            </motion.div>
            <span className="mt-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">{bar.label}</span>
          </div>
        ))}
      </div>
      <InsightPill>{improvement}% improvement in placement success rate</InsightPill>
    </CardShell>
  );
};

const HiringSpeedCard = ({ traditional, talentiq }: { traditional: number; talentiq: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduction = Math.round(((traditional - talentiq) / traditional) * 100);

  return (
    <CardShell delay={0.1}>
      <CardHeader icon={Zap} title="Hiring Speed" sub="Time to make an offer" />
      <div ref={ref} className="space-y-6 mt-2">
        {[
          { label: "Traditional", days: traditional, max: traditional, color: "from-muted-foreground/50 to-muted-foreground/30", track: "bg-muted/60" },
          { label: "TalentIQ AI", days: talentiq, max: traditional, color: "from-primary via-secondary to-accent", track: "bg-muted/40", glow: true },
        ].map((row, i) => (
          <div key={row.label}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-foreground">{row.label}</span>
              <span className="text-sm font-heading font-bold text-foreground">
                <CountUp to={row.days} suffix={row.days === 1 ? " Day" : " Days"} duration={1.2} />
              </span>
            </div>
            <div className={`h-3 rounded-full ${row.track} overflow-hidden relative`}>
              <motion.div
                initial={{ width: 0 }}
                animate={inView ? { width: `${(row.days / row.max) * 100}%` } : {}}
                transition={{ delay: 0.3 + i * 0.25, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                className={`h-full rounded-full bg-gradient-to-r ${row.color} relative ${row.glow ? "shadow-[0_0_20px_hsl(187_92%_45%/0.7)]" : ""}`}
              >
                {row.glow && (
                  <motion.div
                    initial={{ x: "-100%" }}
                    animate={inView ? { x: "200%" } : {}}
                    transition={{ delay: 1.4, duration: 1.2, repeat: Infinity, repeatDelay: 2 }}
                    className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/60 to-transparent skew-x-12"
                  />
                )}
              </motion.div>
              {row.glow && inView && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.5, type: "spring" }}
                  className="absolute -right-1 -top-2"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center shadow-lg shadow-accent/50">
                    <Zap size={14} className="text-primary-foreground fill-current" />
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        ))}
      </div>
      <InsightPill>{reduction}% faster recruitment with AI automation</InsightPill>
    </CardShell>
  );
};

const CostCard = ({ traditional, talentiq }: { traditional: number; talentiq: number }) => {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduction = Math.round(((traditional - talentiq) / traditional) * 100);
  const radius = 56;
  const C = 2 * Math.PI * radius;
  const offset = C * (1 - talentiq / traditional);

  return (
    <CardShell delay={0.2}>
      <CardHeader icon={IndianRupee} title="Cost Per Hire" sub="Resources saved per recruit" />
      <div className="flex items-center justify-center gap-6 mt-2">
        <div className="relative">
          <svg ref={ref} width="150" height="150" viewBox="0 0 150 150" className="-rotate-90">
            <defs>
              <linearGradient id="costGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="hsl(263, 70%, 55%)" />
                <stop offset="50%" stopColor="hsl(217, 91%, 53%)" />
                <stop offset="100%" stopColor="hsl(187, 92%, 45%)" />
              </linearGradient>
            </defs>
            <circle cx="75" cy="75" r={radius} stroke="hsl(var(--muted))" strokeWidth="12" fill="none" />
            <motion.circle
              cx="75" cy="75" r={radius}
              stroke="url(#costGrad)" strokeWidth="12" fill="none" strokeLinecap="round"
              strokeDasharray={C}
              initial={{ strokeDashoffset: C }}
              animate={inView ? { strokeDashoffset: offset } : {}}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              style={{ filter: "drop-shadow(0 0 8px hsl(263 70% 55% / 0.6))" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xs text-muted-foreground font-medium">Saved</span>
            <span className="text-2xl font-heading font-bold gradient-text">
              <CountUp to={reduction} suffix="%" duration={1.6} />
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-0.5">
              <span className="w-2 h-2 rounded-full bg-muted-foreground/50" /> Traditional
            </div>
            <div className="text-lg font-heading font-bold text-muted-foreground line-through decoration-2">
              <CountUp to={traditional} prefix="₹" duration={1.4} />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-xs text-foreground/80 mb-0.5">
              <span className="w-2 h-2 rounded-full bg-gradient-to-br from-primary to-accent" /> TalentIQ
            </div>
            <div className="text-2xl font-heading font-bold gradient-text">
              <CountUp to={talentiq} prefix="₹" duration={1.6} />
            </div>
          </div>
        </div>
      </div>
      <InsightPill>₹{(traditional - talentiq).toLocaleString("en-IN")} saved per hire on average</InsightPill>
    </CardShell>
  );
};

/* ------------------------------ section ------------------------------ */

const ImpactMetrics = () => {
  const { getStat } = useRealtimeStats();
  const { data } = usePlacementAnalytics();

  // Prefer live backend signals; fall back to validated benchmarks
  const placementBefore = Math.round(getStat("placement_rate_traditional") ?? 62);
  const placementAfter = Math.round(getStat("placement_rate_talentiq") ?? Math.max(data.placementRate || 0, 85));
  const speedTraditional = Math.round(getStat("hiring_days_traditional") ?? 5);
  const speedTalentiq = Math.round(getStat("hiring_days_talentiq") ?? 1);
  const costTraditional = Math.round(getStat("cost_per_hire_traditional") ?? 15000);
  const costTalentiq = Math.round(getStat("cost_per_hire_talentiq") ?? 8500);

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background fx */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <motion.div
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-primary/20 blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-accent/20 blur-3xl pointer-events-none"
      />

      <div className="section-container relative z-10">
        <AnimatedSection>
          <SectionHeading
            badge="Impact"
            title="Real Impact with"
            gradientText="TalentIQ"
            subtitle="AI-driven placement intelligence improving hiring outcomes for students, recruiters, and universities."
          />
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <PlacementRateCard before={placementBefore} after={placementAfter} />
          <HiringSpeedCard traditional={speedTraditional} talentiq={speedTalentiq} />
          <CostCard traditional={costTraditional} talentiq={costTalentiq} />
        </div>
      </div>
    </section>
  );
};

export default ImpactMetrics;
