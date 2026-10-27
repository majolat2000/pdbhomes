"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Building2, Mail, Phone, MapPin, ShieldCheck, ArrowRight } from "lucide-react";

export function Footer() {
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer className="bg-brand-navy text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-14 border-b border-slate-800">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-amber-400">
                <Building2 className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-white font-display">
                  PDB <span className="text-brand-amber font-light">HOMES</span>
                </span>
                <span className="text-[10px] tracking-widest uppercase text-slate-400">
                  Private Client Real Estate Nigeria
                </span>
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Representing premier architectural mansions, lagoon waterfronts, and trophy penthouses across Banana Island, Ikoyi, Victoria Island, Lekki, and Abuja.
            </p>
            <div className="pt-2 flex flex-col gap-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-amber shrink-0" />
                <span>Plot 14, Admiralty Way, Lekki Phase 1, Lagos, Nigeria</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-amber shrink-0" />
                <span>Direct: +234 803 849 2100 | +234 1 849 2100</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-amber shrink-0" />
                <span>privateclients@pdbhomes.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-400 font-sans">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/properties" className="hover:text-white transition-colors">
                  All Properties
                </Link>
              </li>
              <li>
                <Link href="/request" className="hover:text-white transition-colors">
                  Buy / Sell Mandate
                </Link>
              </li>
              <li>
                <Link href="/properties?listingStatus=FOR_SALE" className="hover:text-white transition-colors">
                  Homes for Sale
                </Link>
              </li>
              <li>
                <Link href="/properties?listingStatus=FOR_RENT" className="hover:text-white transition-colors">
                  Executive Rentals
                </Link>
              </li>
              <li>
                <Link href="/valuation" className="hover:text-white transition-colors">
                  Property Valuation (NGN)
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Our Advisory
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact & Offices
                </Link>
              </li>
            </ul>
          </div>

          {/* Premier Nigerian Markets */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-400 font-sans">
              Prime Nigerian Enclaves
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/properties?location=Banana+Island" className="hover:text-white transition-colors">
                  Banana Island, Ikoyi
                </Link>
              </li>
              <li>
                <Link href="/properties?location=Ikoyi" className="hover:text-white transition-colors">
                  Old Ikoyi & Bourguillon
                </Link>
              </li>
              <li>
                <Link href="/properties?location=Lekki" className="hover:text-white transition-colors">
                  Lekki Phase 1 Waterfront
                </Link>
              </li>
              <li>
                <Link href="/properties?location=Victoria+Island" className="hover:text-white transition-colors">
                  Victoria Island & Eko Atlantic
                </Link>
              </li>
              <li>
                <Link href="/properties?location=Maitama" className="hover:text-white transition-colors">
                  Maitama & Asokoro, Abuja
                </Link>
              </li>
              <li>
                <Link href="/properties?location=Ikeja" className="hover:text-white transition-colors">
                  Ikeja GRA Compounds
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter / Intelligence Desk */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-400 font-sans">
              Private Market Intelligence
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Quarterly reports on land value trends in Lagos and Abuja, verified Governor&apos;s Consent intelligence, and off-market mandates.
            </p>
            {subscribed ? (
              <div className="p-3 bg-slate-800 rounded-lg text-xs text-amber-300">
                Thank you for subscribing to PDB Homes Private Intelligence.
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubscribed(true);
                }}
                className="space-y-2"
              >
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-amber transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-brand-amber hover:bg-amber-600 text-white text-xs font-semibold tracking-wide uppercase transition-colors"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Disclosures */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>NIESV & ESVARBON Professional Practice Standards. Verified Title Guarantee.</span>
          </div>
          <div>
            &copy; {new Date().getFullYear()} PDB Homes Nigeria Ltd. All rights reserved. Designed for elite real estate representation.
          </div>
        </div>
      </div>
    </footer>
  );
}
