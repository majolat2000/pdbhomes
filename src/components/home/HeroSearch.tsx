"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

export function HeroSearch() {
  return (
    <section className="relative min-h-[560px] lg:min-h-[620px] flex items-center justify-center overflow-hidden bg-brand-navy">
      {/* Background Image with Dark Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=85')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/90 via-brand-navy/80 to-brand-navy/95" />

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16 sm:py-20">
        {/* Subtle Tagline Badge */}
        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 text-xs font-semibold tracking-wide mb-6 shadow-sm">
          <span>Your Trusted Real Estate Brand</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight font-display mb-4">
          Find your next home in Lagos.
        </h1>

        {/* Human Subtitle */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-200 leading-relaxed mb-8">
          Whether you want to buy a family house, find a rental, or book a serviced shortlet,
          PDB Homes helps you navigate properties across Lekki, Ikoyi, Victoria Island, Ajah, and the Mainland.
        </p>

        {/* 2 Primary CTAs */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold shadow-md transition-colors"
          >
            <span>Explore Properties</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="https://wa.link/ksxyrq"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white text-sm font-semibold border border-white/20 backdrop-blur-sm transition-colors"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>

        {/* Quick Location Pills & Trust Banner */}
        <div className="pt-6 border-t border-white/10 max-w-2xl mx-auto flex flex-col items-center gap-3">
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-medium text-slate-300">
            <span className="text-emerald-400 font-bold uppercase tracking-wider text-[11px]">Prime Enclaves:</span>
            <span className="px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-xs">Mainland</span>
            <span className="px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-xs">Lekki</span>
            <span className="px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-xs">Ikoyi</span>
            <span className="px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-xs">VI</span>
            <span className="px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-xs">Ajah</span>
          </div>
          <p className="text-xs text-slate-400">
            Sales &bull; Rentals &bull; Serviced Shortlets &bull; Land Acquisitions
          </p>
        </div>
      </div>
    </section>
  );
}
