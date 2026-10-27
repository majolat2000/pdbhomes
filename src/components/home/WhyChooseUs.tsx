import React from "react";
import Link from "next/link";
import { Shield, Award, TrendingUp, Globe2, MessageCircle, ArrowRight } from "lucide-react";

export function WhyChooseUs() {
  const pillars = [
    {
      icon: Globe2,
      title: "Diaspora & Private Client Network",
      description:
        "Direct access to qualified high-net-worth buyers, Nigerian diaspora executives in the UK/US/Canada, and private individuals.",
    },
    {
      icon: Award,
      title: "Title Perfection & Due Diligence",
      description:
        "Every listing undergoes rigorous legal verification: Governor's Consent, C of O, Gazette, and survey coordinates checked at the Lands Registry.",
    },
    {
      icon: TrendingUp,
      title: "Hyper-Local Market Pricing",
      description:
        "Granular micro-market intelligence across Mainland, Lekki, Ikoyi, Victoria Island, and Ajah to protect and grow client value.",
    },
    {
      icon: Shield,
      title: "Fiduciary Discretion",
      description:
        "Trusted advisory tailored for discerning clients requiring confidentiality, swift transactions, and verified documentation.",
    },
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
            Elevating Real Estate Representation in Nigeria
          </h2>
          <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed">
            PDB Homes delivers genuine market insight, verified property documentation, and an accessible advisory desk across Sales, Rentals, and Shortlets.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
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

        {/* Consultation Callout */}
        <div className="rounded-3xl bg-brand-navy text-white p-8 sm:p-10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
              Looking for a specific property or have a home to list?
            </h3>
            <p className="text-sm text-slate-300">
              Our desk covers Mainland, Lekki, Ikoyi, VI, and Ajah from affordable options to luxury estates.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://wa.link/ksxyrq"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp Us</span>
            </a>
            <Link
              href="/request"
              className="px-5 py-3 rounded-xl bg-brand-amber hover:bg-amber-600 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md flex items-center gap-2"
            >
              <span>Submit Request</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
