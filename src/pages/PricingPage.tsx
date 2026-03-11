import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Starter",
    desc: "For small colleges",
    price: "₹29,999",
    period: "/month",
    features: ["Up to 500 students", "AI Resume Parsing", "Basic Placement Analytics", "Email Support", "1 Admin Account", "Standard Reports"],
    highlight: false,
  },
  {
    name: "Professional",
    desc: "For universities",
    price: "₹79,999",
    period: "/month",
    features: ["Up to 5,000 students", "Full AI Career Engine", "Predictive Analytics", "Recruiter Matching", "Priority Support", "5 Admin Accounts", "Custom Reports", "API Access"],
    highlight: true,
  },
  {
    name: "Enterprise",
    desc: "Multi college network",
    price: "Custom",
    period: "",
    features: ["Unlimited students", "Full Platform Access", "Custom AI Models", "Blockchain Verification", "Dedicated Account Manager", "Unlimited Admins", "White-label Option", "SLA Guarantee"],
    highlight: false,
  },
];

const PricingPage = () => (
  <div className="min-h-screen bg-background pt-20">
    <section className="section-padding">
      <div className="section-container">
        <SectionHeading
          badge="Pricing"
          title="Simple, Transparent"
          gradientText="Pricing"
          subtitle="Choose the plan that fits your institution"
        />
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-8 flex flex-col ${
                plan.highlight
                  ? "gradient-border glass glow"
                  : "glass"
              }`}
            >
              {plan.highlight && (
                <span className="inline-block self-start px-3 py-1 rounded-full text-xs font-semibold gradient-primary text-foreground mb-4">
                  Most Popular
                </span>
              )}
              <h3 className="font-heading font-bold text-foreground text-xl">{plan.name}</h3>
              <p className="text-muted-foreground text-sm mb-4">{plan.desc}</p>
              <div className="mb-6">
                <span className="text-foreground font-heading font-bold text-3xl">{plan.price}</span>
                <span className="text-muted-foreground text-sm">{plan.period}</span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check size={16} className="text-accent flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button variant={plan.highlight ? "hero" : "hero-outline"} asChild>
                <Link to="/contact">
                  {plan.price === "Custom" ? "Contact Sales" : "Get Started"} <ArrowRight size={16} />
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default PricingPage;
