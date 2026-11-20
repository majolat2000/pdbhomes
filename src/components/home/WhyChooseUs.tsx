import React from "react";
import Link from "next/link";
import { CheckCircle2, MessageCircle, FileCheck, MapPin, Eye, ArrowRight } from "lucide-react";

export function WhyChooseUs() {
  const benefits = [
    {
      icon: Eye,
      title: "Direct Physical & Video Inspections",
      description:
        "We believe you should see before you decide. We schedule on-ground inspections at your convenience or conduct live, uncut video walkthroughs if you are away.",
    },
    {
      icon: FileCheck,
      title: "Title & Documentation Verification",
      description:
        "We verify land and house documentation with the relevant authorities before presenting options to you.",
    },
    {
      icon: MapPin,
      title: "Realistic Neighbourhood Pricing",
      description:
        "We provide honest, grounded market pricing across Mainland, Lekki, Ikoyi, Victoria Island, and Ajah—protecting you from inflated prices.",
    },
    {
      icon: MessageCircle,
      title: "Direct WhatsApp Communication",
      description:
        "No bureaucratic hold-ups or generic call centers. You chat directly with our team for fast answers, updated photos, and prompt property availability.",
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold tracking-widest uppercase text-emerald-700 mb-1.5 block">
            Why Work With Us
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-navy tracking-tight font-display">
            Grounded Real Estate Service You Can Trust
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            We focus on honest property representation, verified documents, and clear communication from your first inquiry to move-in day.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200/80 hover:border-emerald-500/40 hover:shadow-sm transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 font-display mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Homeowner / Landlord Callout */}
        <div className="bg-brand-navy text-white rounded-2xl p-7 sm:p-9 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-lg sm:text-xl font-bold font-display text-white">
              Do you have a property to sell, rent out, or list as a shortlet?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              We connect property owners with verified buyers, corporate tenants, and shortlet guests across Lagos.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="https://wa.me/2348181017260?text=Hello%20PDB%20Homes%2C%20I%20have%20a%20property%20I%20would%20like%20to%20list%20with%20you"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>List on WhatsApp</span>
            </a>
            <Link
              href="/request"
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors border border-white/20 flex items-center gap-2"
            >
              <span>Submit Property Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
