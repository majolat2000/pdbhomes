"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Building2, Mail, Phone, MapPin, ShieldCheck, ArrowRight } from "lucide-react";

export function Footer() {
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
                  Private Client Real Estate
                </span>
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Representing premier architectural estates, trophy penthouses, and private waterfront sanctuaries across North America’s most desirable enclaves.
            </p>
            <div className="pt-2 flex flex-col gap-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-amber shrink-0" />
                <span>9440 Santa Monica Blvd, Penthouse 800, Beverly Hills, CA 90210</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-amber shrink-0" />
                <span>Direct: (800) 555-PDBH | (310) 849-2100</span>
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
                <Link href="/properties?listingStatus=FOR_SALE" className="hover:text-white transition-colors">
                  Estates for Sale
                </Link>
              </li>
              <li>
                <Link href="/properties?listingStatus=FOR_RENT" className="hover:text-white transition-colors">
                  Luxury Rentals
                </Link>
              </li>
              <li>
                <Link href="/valuation" className="hover:text-white transition-colors">
                  Free Home Valuation
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

          {/* Premier Markets */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-400 font-sans">
              Trophy Markets
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/properties?location=Los+Angeles" className="hover:text-white transition-colors">
                  Beverly Hills & Bel Air
                </Link>
              </li>
              <li>
                <Link href="/properties?location=New+York" className="hover:text-white transition-colors">
                  Manhattan & TriBeCa
                </Link>
              </li>
              <li>
                <Link href="/properties?location=Miami" className="hover:text-white transition-colors">
                  Miami Beach & Palm Beach
                </Link>
              </li>
              <li>
                <Link href="/properties?location=Aspen" className="hover:text-white transition-colors">
                  Aspen & Vail Enclaves
                </Link>
              </li>
              <li>
                <Link href="/properties?location=Austin" className="hover:text-white transition-colors">
                  Austin Lakefronts
                </Link>
              </li>
              <li>
                <Link href="/properties?location=Scottsdale" className="hover:text-white transition-colors">
                  Scottsdale Desert Modern
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Lead Capture */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-400 font-sans">
              Private Market Report
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Receive quarterly insights, off-market pocket listings, and macro luxury property intelligence.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert("Thank you for subscribing to PDB Homes Private Intelligence."); }} className="space-y-2">
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
          </div>
        </div>

        {/* Bottom Disclosures & Equal Housing */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Equal Housing Opportunity. Certified Luxury Home Marketing Specialist (CLHMS).</span>
          </div>
          <div>
            &copy; {new Date().getFullYear()} PDB Homes LLC. All rights reserved. Designed for elite real estate representation.
          </div>
        </div>
      </div>
    </footer>
  );
}
