import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, MessageCircle, ArrowRight, Award, CheckCircle2 } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-4">
            <span>About PDB Homes</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy tracking-tight font-display mb-6">
            Your Trusted Real Estate Brand in Nigeria.
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-light">
            We specialize in <strong>Sales | Rentals | Shortlets</strong> across <strong>Mainland • Lekki • Ikoyi • VI • Ajah</strong>, delivering verified titles, seamless acquisitions, and exceptional property experiences from affordable to luxury listings.
          </p>
        </div>

        {/* Brand Mission & Values */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center mb-20 sm:mb-28">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-luxury border border-slate-200">
            <Image
              src="/apartment.jpeg"
              alt="PDB Homes Apartment"
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-6">
            <span className="text-xs font-bold tracking-widest uppercase text-emerald-700 block">
              Our Commitment
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-navy font-display">
              Transforming Real Estate with Integrity, Speed & Precision.
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              At PDB Homes, we believe everyone deserves reliable, stress-free real estate services in Nigeria. Whether you are searching for your first home on the Mainland, acquiring a prime commercial plot, booking a luxury shortlet apartment in Lekki, or investing in an Ikoyi waterfront duplex, we guarantee personalized guidance at every step.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Verified Titles Only</h4>
                  <p className="text-xs text-slate-500">Rigorous governor&apos;s consent and C of O verification.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Full Spectrum Coverage</h4>
                  <p className="text-xs text-slate-500">From affordable family gems to ultra-luxury estates.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Premium Shortlets</h4>
                  <p className="text-xs text-slate-500">24/7 power, fiber WiFi, security & prime hospitality.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Seamless Transactions</h4>
                  <p className="text-xs text-slate-500">Direct WhatsApp support and transparent advisory.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MEET THE CEO SECTION */}
        <div className="mb-20 sm:mb-28">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-bold tracking-widest uppercase text-emerald-700 mb-2 block">
              Leadership
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight font-display">
              Meet the CEO
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base">
              The visionary driving PDB Homes to redefine property standards in Nigeria.
            </p>
          </div>

          <div className="max-w-5xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-luxury overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-12 items-center">
              {/* CEO Portrait */}
              <div className="md:col-span-5 relative h-96 md:h-full min-h-[420px] bg-slate-900 overflow-hidden">
                <Image
                  src="/pdb-ceo.jpeg"
                  alt="PDB Homes CEO"
                  fill
                  priority
                  className="object-cover object-top hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:hidden" />
                <div className="absolute bottom-4 left-4 text-white md:hidden">
                  <span className="text-xs font-semibold text-emerald-300">Chief Executive Officer</span>
                  <h3 className="text-xl font-bold font-display">PDB Homes</h3>
                </div>
              </div>

              {/* CEO Narrative & Bio */}
              <div className="md:col-span-7 p-8 sm:p-10 lg:p-12 space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
                    <Award className="w-3.5 h-3.5" />
                    <span>Founder & CEO</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-navy font-display">
                    PDB Homes Leadership
                  </h3>
                  <p className="text-sm font-semibold text-emerald-700 mt-1">
                    Sales | Rentals | Shortlets Specialist
                  </p>
                </div>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Welcome to PDB Homes. When founding this company, my driving passion was simple yet resolute: to establish a real estate brand rooted in honesty, excellence, and genuine client care. Real estate in Nigeria is about more than just transactions—it is about securing your hard-earned wealth, creating sanctuaries for families, and enabling flourishing lifestyles.
                </p>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  From everyday affordable accommodations across the Mainland and Ajah to prime residential enclaves in Lekki, Ikoyi, and Victoria Island, our mission is to ensure every client is served with utmost transparency, zero hidden surprises, and world-class professionalism.
                </p>

                <blockquote className="p-4 rounded-2xl bg-slate-50 border-l-4 border-emerald-600 text-xs sm:text-sm text-slate-700 italic">
                  &ldquo;Your trust is our most valuable asset. Whether you are buying your dream home, renting an apartment, or staying in one of our serviced shortlets, we are committed to exceeding your expectations.&rdquo;
                </blockquote>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <a
                    href="https://wa.link/ksxyrq"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all active:scale-95"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Chat with the CEO Desk on WhatsApp</span>
                  </a>

                  <Link
                    href="/consultation"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-navy hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all"
                  >
                    <span>Book a Consultation</span>
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action Banner */}
        <div className="rounded-3xl bg-brand-navy text-white p-8 sm:p-12 lg:p-16 text-center max-w-4xl mx-auto shadow-2xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-emerald-300 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>Mainland • Lekki • Ikoyi • VI • Ajah</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display">
            Ready to Find Your Next Home or Investment?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto font-light">
            Connect directly with PDB Homes today for houses for sale, verified rentals, or luxury shortlet reservations.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://wa.link/ksxyrq"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-lg flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp Direct</span>
            </a>
            <Link
              href="/consultation"
              className="px-7 py-3 rounded-xl bg-blue-700 hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-lg"
            >
              Book a Consultation
            </Link>
            <Link
              href="/properties"
              className="px-7 py-3 rounded-xl border border-white/30 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider transition-colors"
            >
              Explore Listings
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
