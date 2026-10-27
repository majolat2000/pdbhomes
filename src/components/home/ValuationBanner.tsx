import React from "react";
import Link from "next/link";
import { Calendar, ArrowRight, ShieldCheck, Check, MessageCircle, Sparkles } from "lucide-react";

export function ValuationBanner() {
  return (
    <section className="py-20 bg-gradient-to-br from-brand-navy via-slate-900 to-brand-slate text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-amber/10 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Text Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Dedicated Real Estate Advisory</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-display text-white">
              Book A Private Consultation With PDB Homes
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl font-light">
              Schedule a dedicated 1-on-1 strategy session to discuss your property plans across <strong>Mainland • Lekki • Ikoyi • VI • Ajah</strong>. Whether you need land verification, home acquisition, rental guidance, or shortlet booking, our team is at your service.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-300 pt-2">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-brand-amber shrink-0" />
                <span>Verified Land & Title Due Diligence</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-brand-amber shrink-0" />
                <span>Property Acquisition & Negotiations</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-brand-amber shrink-0" />
                <span>Quality Rentals & Verified Landlords</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-brand-amber shrink-0" />
                <span>Luxury Shortlet Reservation Advisory</span>
              </div>
            </div>
          </div>

          {/* Quick CTA Box */}
          <div className="lg:col-span-5">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl text-center space-y-5">
              <div className="w-16 h-16 rounded-2xl bg-brand-amber text-white flex items-center justify-center mx-auto shadow-lg">
                <Calendar className="w-8 h-8" />
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 block">
                  1-on-1 Strategy Session
                </span>
                <h3 className="text-2xl font-extrabold text-white font-display">
                  ₦10,000 <span className="text-xs font-normal text-slate-300">Commitment Fee</span>
                </h3>
                <p className="text-xs text-slate-300 mt-1.5">
                  Confirm your appointment slot for personalized real estate representation.
                </p>
              </div>

              <div className="space-y-2.5 pt-1">
                <Link
                  href="/consultation"
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-brand-amber hover:bg-amber-600 text-white text-xs sm:text-sm font-bold tracking-wider uppercase transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Book A Consultation Now</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href="https://wa.link/ksxyrq"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold tracking-wider uppercase transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-amber" />
                <span>Fast & secure booking via Paystack</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}