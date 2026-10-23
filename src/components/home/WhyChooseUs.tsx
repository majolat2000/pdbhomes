import React from "react";
import { Shield, Sparkles, TrendingUp, Globe2, CheckCircle2 } from "lucide-react";

export function WhyChooseUs() {
  const pillars = [
    {
      icon: Globe2,
      title: "Global Private Network",
      description:
        "Direct access to qualified high-net-worth buyers, family offices, and discreet off-market pocket listings worldwide.",
    },
    {
      icon: Sparkles,
      title: "Bespoke Architectural Marketing",
      description:
        "Every residence receives custom editorial photography, cinematic 4K video storytelling, and targeted global PR placements.",
    },
    {
      icon: TrendingUp,
      title: "Micro-Market Intelligence",
      description:
        "Granular algorithmic valuation combined with decades of street-level transaction experience across trophy zip codes.",
    },
    {
      icon: Shield,
      title: "Absolute Discretion",
      description:
        "Trusted by discerning buyers, international founders, and private individuals requiring confidential advisory.",
    },
  ];

  const stats = [
    { value: "$1.85B+", label: "Career Sales Volume" },
    { value: "99.4%", label: "List-to-Sale Ratio" },
    { value: "18 Days", label: "Average Days to Contract" },
    { value: "35+", label: "Years Combined Advisory" },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest uppercase text-brand-amber mb-2 block">
            The PDB Homes Difference
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight font-display">
            Elevating the Standard of Luxury Real Estate
          </h2>
          <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed">
            We transcend conventional brokerage. PDB Homes delivers institutional rigor, bespoke marketing, and an unmatched global buyer network to maximize value for every client.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-brand-amber/50 hover:bg-white hover:shadow-luxury transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-navy text-amber-300 flex items-center justify-center mb-5 group-hover:bg-brand-amber group-hover:text-white transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 font-display">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Highlight Stats Ribbon */}
        <div className="rounded-3xl bg-brand-navy text-white p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-brand-amber/10 blur-3xl pointer-events-none" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center relative z-10">
            {stats.map((stat, idx) => (
              <div key={idx} className="space-y-1">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-400 font-display">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-slate-300 font-medium tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
