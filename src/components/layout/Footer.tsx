"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, ShieldCheck, ArrowRight, MessageCircle } from "lucide-react";

export function Footer() {
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer className="bg-brand-navy text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-14 border-b border-slate-800">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-white/10 p-0.5 border border-white/20 shrink-0">
                <Image
                  src="/pdb-logo.jpeg"
                  alt="PDB Homes Logo"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-white font-display">
                  PDB <span className="text-brand-amber font-light">HOMES</span>
                </span>
                <span className="text-[10px] tracking-wider uppercase text-amber-400 font-medium">
                  Sales • Rentals • Shortlets
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              <strong className="text-white block mb-1">Your trusted real estate brand.</strong>
              We specialize in Sales | Rentals | Shortlets across Mainland • Lekki • Ikoyi • VI • Ajah. Providing seamless representation from affordable to luxury listings.
            </p>

            <div className="pt-1 flex flex-col gap-2.5 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-amber shrink-0" />
                <span>Lekki • Ikoyi • VI • Ajah • Lagos Mainland, Nigeria</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-amber shrink-0" />
                <span>Direct: +2348181017260</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-amber shrink-0" />
                <span>info@pdbhomes.com</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="https://wa.link/ksxyrq"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md transition-all duration-200"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Chat on WhatsApp Directly</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-400 font-sans">
              Specializations
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/properties?listingStatus=FOR_SALE" className="hover:text-white transition-colors">
                  Properties for Sale
                </Link>
              </li>
              <li>
                <Link href="/properties?listingStatus=FOR_RENT" className="hover:text-white transition-colors">
                  Annual Rentals
                </Link>
              </li>
              <li>
                <Link href="/properties?listingStatus=SHORTLET" className="hover:text-white transition-colors">
                  Serviced Shortlets
                </Link>
              </li>
              <li>
                <Link href="/request" className="hover:text-white transition-colors">
                  Client Buy / Sell Request
                </Link>
              </li>
              <li>
                <Link href="/valuation" className="hover:text-white transition-colors">
                  Free Property Valuation
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About PDB Homes
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Our Desk
                </Link>
              </li>
            </ul>
          </div>

          {/* Key Locations */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-400 font-sans">
              Key Locations
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/properties?location=Lekki" className="hover:text-white transition-colors">
                  Lekki Phase 1 & Environs
                </Link>
              </li>
              <li>
                <Link href="/properties?location=Ikoyi" className="hover:text-white transition-colors">
                  Ikoyi & Banana Island
                </Link>
              </li>
              <li>
                <Link href="/properties?location=Victoria+Island" className="hover:text-white transition-colors">
                  Victoria Island (VI)
                </Link>
              </li>
              <li>
                <Link href="/properties?location=Ajah" className="hover:text-white transition-colors">
                  Ajah & Sangotedo
                </Link>
              </li>
              <li>
                <Link href="/properties?location=Mainland" className="hover:text-white transition-colors">
                  Lagos Mainland (Ikeja, Surulere, Yaba)
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter / Consultation */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-400 font-sans">
              Get Market Updates
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Sign up for curated alerts on new listings, prime shortlets, and lucrative off-market property deals in Lagos.
            </p>
            {subscribed ? (
              <div className="p-3 bg-slate-800 rounded-lg text-xs text-amber-300">
                Thank you for subscribing to PDB Homes real estate updates!
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
                  <span>Stay Updated</span>
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
            <span>PDB Homes: Sales | Rentals | Shortlets</span>
          </div>
          <div>
            Since 2024, PDB Homes. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
