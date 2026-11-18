import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, ArrowRight, CheckCircle2, ShieldCheck, Phone, Mail } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="text-xs font-bold tracking-widest uppercase text-emerald-700 mb-2 block">
            About PDB Homes
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy tracking-tight font-display mb-4">
            A Clear, Honest Approach to Nigerian Real Estate
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-light">
            We are a Lagos-based real estate company helping clients buy houses and land, find reliable rental apartments, and book serviced shortlets across the Mainland, Lekki, Ikoyi, Victoria Island, and Ajah.
          </p>
        </div>

        {/* What We Stand For */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center mb-20 sm:mb-28">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-sm border border-slate-200">
            <Image
              src="/apartment.jpeg"
              alt="PDB Homes Property"
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-6">
            <span className="text-xs font-bold tracking-widest uppercase text-emerald-700 block">
              What We Do
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-navy font-display">
              Real Estate Without the Stress or Guesswork
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Navigating property in Nigeria often comes with anxiety—unverified titles, inflated prices, and delayed communication. PDB Homes was created to do things differently.
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Whether you are looking for an affordable family apartment on the Mainland, buying a terrace duplex in Lekki, investing in verified land in Ajah, or booking a serviced shortlet for your Lagos trip, we verify every detail before you commit.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Verified Documentation</h4>
                  <p className="text-xs text-slate-500">We verify ownership records, surveys, and legal documentation.</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Transparent Pricing</h4>
                  <p className="text-xs text-slate-500">Clear breakdown of prices, documentation, and agency terms.</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Direct Physical Inspection</h4>
                  <p className="text-xs text-slate-500">Inspect on the ground or via live video before making any deposit.</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Direct WhatsApp Desk</h4>
                  <p className="text-xs text-slate-500">Fast, personal replies without delays.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MEET THE CEO SECTION */}
        <div className="mb-20 sm:mb-28">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <span className="text-xs font-bold tracking-widest uppercase text-emerald-700 mb-1 block">
              Leadership
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-navy tracking-tight font-display">
              Meet the Founder &amp; CEO
            </h2>
          </div>

          <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-12 items-center">
              {/* CEO Portrait */}
              <div className="md:col-span-5 relative h-96 md:h-full min-h-[420px] bg-slate-900 overflow-hidden">
                <Image
                  src="/pdb-ceo.jpeg"
                  alt="Precious Olatimilehin - Founder & CEO, PDB Homes"
                  fill
                  priority
                  className="object-cover object-top"
                />
              </div>

              {/* CEO Bio */}
              <div className="md:col-span-7 p-7 sm:p-10 space-y-5">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-1">
                    Founder &amp; Chief Executive Officer
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-navy font-display">
                    Precious Olatimilehin
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    PDB Homes &bull; Sales, Rentals &amp; Serviced Shortlets
                  </p>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed">
                  &ldquo;I started PDB Homes with a simple conviction: finding a home in Nigeria should be rooted in honesty, transparency, and genuine client care. Whether a client is buying their first home, renting an apartment, or visiting Lagos on vacation, they deserve an advisor who actually listens, verifies titles properly, and speaks the truth about neighbourhoods and pricing.&rdquo;
                </p>

                <p className="text-slate-600 text-sm leading-relaxed">
                  &ldquo;Our focus is to make every client feel respected, protected, and satisfied with their move. We welcome you to reach out directly to our team.&rdquo;
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <a
                    href="https://wa.link/ksxyrq"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors shadow-xs"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Chat with Us on WhatsApp</span>
                  </a>

                  <Link
                    href="/consultation"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-navy hover:bg-slate-800 text-white font-semibold text-xs transition-colors shadow-xs"
                  >
                    <span>Book a Consultation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Strip */}
        <div className="rounded-2xl bg-brand-navy text-white p-8 sm:p-10 text-center max-w-3xl mx-auto shadow-md space-y-5">
          <h3 className="text-xl sm:text-2xl font-bold font-display">
            Have questions about a property in Lagos?
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm max-w-lg mx-auto">
            You can call, email, or chat with our team on WhatsApp Monday to Saturday.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold">
            <a
              href="tel:+2348181017260"
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-white flex items-center gap-2 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>+2348181017260</span>
            </a>
            <a
              href="mailto:info@pdbhomes.com"
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-white flex items-center gap-2 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-emerald-400" />
              <span>info@pdbhomes.com</span>
            </a>
            <a
              href="https://wa.link/ksxyrq"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-2 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
