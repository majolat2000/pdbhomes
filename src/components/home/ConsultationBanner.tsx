"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, ArrowRight, ShieldCheck, Check, MessageCircle } from "lucide-react";

export function ConsultationBanner() {
  const [fee, setFee] = useState(10000);

  useEffect(() => {
    fetch("/api/settings", { cache: "no-store" })
      .then((res) => res.json())
      .then((d) => {
        if (d.success && typeof d.consultationFee === "number") setFee(d.consultationFee);
      })
      .catch(() => {});
  }, []);
  return (
    <section className="py-16 sm:py-20 bg-brand-navy text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Text Content */}
          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs font-bold tracking-widest uppercase text-emerald-400 block">
              One-on-One Advisory
            </span>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight font-display text-white">
              Looking for a property that fits your exact criteria?
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl font-light">
              Finding genuine properties with clean titles in Lagos can be time-consuming. Tell us what you need—whether you are buying a home, renting an apartment, securing a plot of land, or booking a serviced shortlet.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-300 pt-1">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Verified Land &amp; Title Verification</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Duplexes, Terraces &amp; Mansions for Sale</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Annual Rentals (Apartments &amp; Flats)</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Serviced Shortlet Bookings</span>
              </div>
            </div>
          </div>

          {/* Quick CTA Box */}
          <div className="lg:col-span-5">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-7 text-center space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center mx-auto">
                <Calendar className="w-6 h-6" />
              </div>

              <div>
                <span className="text-xs font-semibold text-emerald-400 block">
                  Dedicated 1-on-1 Consultation
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-display mt-0.5">
                  ₦{fee.toLocaleString()} <span className="text-xs font-normal text-slate-300">Commitment Fee</span>
                </h3>
                <p className="text-xs text-slate-300 mt-1 max-w-xs mx-auto">
                  To reserve dedicated time, research matching off-market options for your budget, and coordinate private viewings.
                </p>
              </div>

              <div className="space-y-2.5 pt-1">
                <Link
                  href="/consultation"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold transition-colors shadow-sm"
                >
                  <span>Book a Consultation Session</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href="https://wa.me/2348181017260?text=Hello%20PDB%20Homes%2C%20I%20would%20like%20to%20speak%20with%20an%20agent%20about%20a%20property"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold border border-white/15 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>Ask a Question on WhatsApp</span>
                </a>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Direct consultation with PDB Homes leadership</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
