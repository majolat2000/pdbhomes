"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, MapPin, Home, ArrowRight, MessageCircle } from "lucide-react";

export function HeroSearch() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"ALL" | "FOR_SALE" | "FOR_RENT" | "SHORTLET">("ALL");
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("ALL");
  const [priceRange, setPriceRange] = useState("ALL");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams();

    if (activeTab !== "ALL") {
      query.set("listingStatus", activeTab);
    }
    if (location.trim()) {
      query.set("location", location.trim());
    }
    if (propertyType !== "ALL") {
      query.set("propertyType", propertyType);
    }
    if (priceRange !== "ALL") {
      const [min, max] = priceRange.split("-");
      if (min) query.set("minPrice", min);
      if (max) query.set("maxPrice", max);
    }

    router.push(`/properties?${query.toString()}`);
  };

  return (
    <section className="relative min-h-[620px] lg:min-h-[680px] flex items-center justify-center overflow-hidden bg-brand-navy">
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
        <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-emerald-300 text-xs font-semibold tracking-wide mb-6">
          <span>Lagos Real Estate &bull; Sales, Rentals &amp; Shortlets</span>
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

        {/* Search Box */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl p-4 sm:p-6 shadow-xl border border-slate-200 text-left">
          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-between border-b border-slate-100 pb-3 mb-4 gap-2">
            <div className="flex flex-wrap items-center gap-1 sm:gap-2">
              <button
                type="button"
                onClick={() => setActiveTab("ALL")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  activeTab === "ALL"
                    ? "bg-brand-navy text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("FOR_SALE")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  activeTab === "FOR_SALE"
                    ? "bg-brand-navy text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                For Sale
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("FOR_RENT")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  activeTab === "FOR_RENT"
                    ? "bg-brand-navy text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                For Rent
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("SHORTLET")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  activeTab === "SHORTLET"
                    ? "bg-brand-navy text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                Shortlets
              </button>
            </div>

            <Link
              href="/request"
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 transition-colors flex items-center gap-1"
            >
              <span>Can&apos;t find what you need? Send a request</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Form */}
          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {/* Location */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Location
              </label>
              <div className="relative flex items-center">
                <MapPin className="w-4 h-4 text-emerald-600 absolute left-3 pointer-events-none" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Lekki, Ikoyi, Ikeja, Ajah..."
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-navy focus:ring-1 focus:ring-brand-navy"
                />
              </div>
            </div>

            {/* Property Type */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Property Type
              </label>
              <div className="relative flex items-center">
                <Home className="w-4 h-4 text-emerald-600 absolute left-3 pointer-events-none" />
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-200 text-xs sm:text-sm text-slate-900 bg-white focus:outline-none focus:border-brand-navy focus:ring-1 focus:ring-brand-navy"
                >
                  <option value="ALL">All Types</option>
                  <option value="DETACHED_DUPLEX">Detached Duplex</option>
                  <option value="SEMI_DETACHED">Semi-Detached Duplex</option>
                  <option value="TERRACE">Terrace Duplex</option>
                  <option value="SERVICED_APARTMENT">Serviced Apartment</option>
                  <option value="APARTMENT">Apartment / Flat</option>
                  <option value="SHORTLET_STUDIO">Serviced Shortlet</option>
                  <option value="LAND">Land / Plot</option>
                  <option value="COMMERCIAL">Commercial</option>
                </select>
              </div>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Budget (₦)
              </label>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-xs sm:text-sm text-slate-900 bg-white focus:outline-none focus:border-brand-navy focus:ring-1 focus:ring-brand-navy"
              >
                <option value="ALL">Any Budget</option>
                <option value="0-50000000">Under ₦50 Million</option>
                <option value="50000000-150000000">₦50M &ndash; ₦150 Million</option>
                <option value="150000000-350000000">₦150M &ndash; ₦350 Million</option>
                <option value="350000000-750000000">₦350M &ndash; ₦750 Million</option>
                <option value="750000000-50000000000">₦750 Million+</option>
              </select>
            </div>

            {/* Submit */}
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-2.5 sm:py-3 px-5 rounded-lg bg-brand-navy hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm transition-colors shadow-sm"
              >
                <Search className="w-4 h-4 text-emerald-400" />
                <span>Search Properties</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
