import React from "react";
import Link from "next/link";
import { Calculator, ArrowRight, ShieldCheck, Check } from "lucide-react";

export function ValuationBanner() {
  return (
    <section className="py-20 bg-gradient-to-br from-brand-navy via-slate-900 to-brand-slate text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-amber/10 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold tracking-wider uppercase">
              <span>Complimentary Home Valuation</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-display text-white">
              Discover What Your Estate Is Truly Worth in Today&apos;s Market
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl font-light">
              Utilize our micro-market intelligence across Banana Island, Ikoyi, Lekki Phase 1, and Maitama Abuja to receive an accurate, confidential valuation report in Nigerian Naira (NGN).
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-300 pt-2">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-brand-amber shrink-0" />
                <span>Zero obligation & 100% confidential</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-brand-amber shrink-0" />
                <span>Title verification analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-brand-amber shrink-0" />
                <span>Micro-location street trend analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-brand-amber shrink-0" />
                <span>Senior managing director review</span>
              </div>
            </div>
          </div>

          {/* Quick CTA Box */}
          <div className="lg:col-span-5">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl text-center space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-brand-amber text-white flex items-center justify-center mx-auto shadow-lg">
                <Calculator className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-white font-display">
                  Instant Valuation Tool
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  Enter your address and square footage to compute current equity in Naira.
                </p>
              </div>

              <Link
                href="/valuation"
                className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-brand-amber hover:bg-amber-600 text-white text-sm font-bold tracking-wider uppercase transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Calculate Valuation Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-amber" />
                <span>Your contact information is strictly protected</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
