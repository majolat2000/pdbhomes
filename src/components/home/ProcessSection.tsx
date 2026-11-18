import React from "react";
import Link from "next/link";
import { MessageSquare, CalendarCheck, ShieldCheck, ArrowRight, MessageCircle } from "lucide-react";

export function ProcessSection() {
  const steps = [
    {
      step: "01",
      icon: MessageSquare,
      title: "Tell Us What You Need",
      description:
        "Share your preferred location (Island or Mainland), budget, and whether you're buying, renting, or looking for a shortlet. You can submit a request on the site or message us directly on WhatsApp.",
    },
    {
      step: "02",
      icon: CalendarCheck,
      title: "Schedule an Inspection",
      description:
        "We set up a convenient time for you to inspect the property in person. If you are outside Lagos or in the diaspora, we conduct a detailed, unedited live video walkthrough for you.",
    },
    {
      step: "03",
      icon: ShieldCheck,
      title: "Review Documents & Conclude",
      description:
        "We review property documentation or tenancy agreements together before any commitment, ensuring total transparency from start to finish.",
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold tracking-widest uppercase text-emerald-700 mb-1.5 block">
            How It Works
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-navy tracking-tight font-display">
            A Straightforward Way to Find Property in Lagos
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Finding a home or investment shouldn&apos;t be stressful. Here is how we guide you from your first enquiry to getting the keys.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="relative bg-slate-50 rounded-2xl p-6 sm:p-7 border border-slate-200/80 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-2xl font-black text-slate-300 font-display">
                      {item.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Prompt */}
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="text-sm font-bold text-slate-900">Ready to start?</h4>
            <p className="text-xs text-slate-500">Tell us what type of home or land you need.</p>
          </div>
          <div className="flex items-center gap-2.5">
            <Link
              href="/request"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-navy hover:bg-slate-800 text-white text-xs font-semibold transition-colors"
            >
              <span>Submit Property Request</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <a
              href="https://wa.link/ksxyrq"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
