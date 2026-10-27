"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, MapPin, Home, ArrowRight, ShieldCheck, Award, MessageCircle } from "lucide-react";

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
    <div className="relative min-h-[660px] lg:min-h-[740px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Dark Vignette Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transition-transform duration-1000"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=85')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/65 to-brand-navy/40" />

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-10 pb-16">
        {/* Brand Badge */}
        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-amber-300 text-xs sm:text-sm font-semibold tracking-wide mb-6 shadow-sm">
          <span>Your Trusted Real Estate Brand</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight font-display mb-5">
          We Specialize in <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100">
            Sales | Rentals | Shortlets
          </span>
        </h1>

        {/* Locations & Tagline */}
        <div className="max-w-2xl mx-auto mb-4">
          <p className="text-base sm:text-xl font-medium text-amber-300 tracking-wide">
            Mainland • Lekki • Ikoyi • VI • Ajah
          </p>
          <p className="text-sm sm:text-base text-slate-200 font-light mt-1">
            Affordable to Luxury Listings with verified titles and trusted representation.
          </p>
        </div>

        {/* Quick WhatsApp Action Banner */}
        <div className="mb-8 flex items-center justify-center gap-3">
          <a
            href="https://wa.link/ksxyrq"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-emerald-900/30 transition-transform active:scale-95"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Chat on WhatsApp Directly</span>
          </a>
          <Link
            href="/request"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-medium border border-white/20 backdrop-blur-sm transition-colors"
          >
            <span>Submit Buy/Sell Request</span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
          </Link>
        </div>

        {/* Dynamic Search Box */}
        <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-xl rounded-2xl p-4 sm:p-6 shadow-2xl border border-white/40 text-left">
          {/* Tabs */}
          <div className="flex flex-wrap items-center justify-between border-b border-slate-100 pb-3 mb-4 gap-2">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={() => setActiveTab("ALL")}
                className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  activeTab === "ALL"
                    ? "bg-brand-navy text-white shadow-sm"
                    : "text-slate-600 hover:text-brand-navy hover:bg-slate-100"
                }`}
              >
                All Listings
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("FOR_SALE")}
                className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  activeTab === "FOR_SALE"
                    ? "bg-brand-navy text-white shadow-sm"
                    : "text-slate-600 hover:text-brand-navy hover:bg-slate-100"
                }`}
              >
                For Sale
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("FOR_RENT")}
                className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  activeTab === "FOR_RENT"
                    ? "bg-brand-navy text-white shadow-sm"
                    : "text-slate-600 hover:text-brand-navy hover:bg-slate-100"
                }`}
              >
                Rentals
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("SHORTLET")}
                className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  activeTab === "SHORTLET"
                    ? "bg-amber-600 text-white shadow-sm"
                    : "text-slate-600 hover:text-brand-navy hover:bg-slate-100"
                }`}
              >
                Shortlets
              </button>
            </div>

            <Link
              href="/request"
              className="text-[11px] sm:text-xs font-bold text-brand-navy hover:text-brand-amber transition-colors flex items-center gap-1"
            >
              <span>Custom Property Search? Let us know</span>
              <ArrowRight className="w-3.5 h-3.5 text-brand-amber" />
            </Link>
          </div>

          {/* Form */}
          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {/* Location */}
            <div className="relative">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Area / Enclave
              </label>
              <div className="relative flex items-center">
                <MapPin className="w-4 h-4 text-brand-amber absolute left-3 pointer-events-none" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Lekki, Ikoyi, VI, Ajah, Mainland..."
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-navy focus:ring-1 focus:ring-brand-navy transition-colors"
                />
              </div>
            </div>

            {/* Property Type */}
            <div className="relative">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Property Type
              </label>
              <div className="relative flex items-center">
                <Home className="w-4 h-4 text-brand-amber absolute left-3 pointer-events-none" />
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-200 text-xs sm:text-sm text-slate-900 bg-white focus:outline-none focus:border-brand-navy focus:ring-1 focus:ring-brand-navy transition-colors appearance-none"
                >
                  <option value="ALL">All Categories</option>
                  <option value="SHORTLET_STUDIO">Serviced Shortlet / Studio</option>
                  <option value="SERVICED_APARTMENT">Serviced Apartment</option>
                  <option value="TERRACE">Terrace Duplex</option>
                  <option value="DETACHED_DUPLEX">Detached Duplex</option>
                  <option value="MANSION">Luxury Waterfront / Mansion</option>
                  <option value="PENTHOUSE">Sky Penthouse</option>
                </select>
              </div>
            </div>

            {/* Price Range (in Nigerian Naira) */}
            <div className="relative">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Price Range (₦)
              </label>
              <div className="relative flex items-center">
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-xs sm:text-sm text-slate-900 bg-white focus:outline-none focus:border-brand-navy focus:ring-1 focus:ring-brand-navy transition-colors appearance-none"
                >
                  <option value="ALL">Any Budget</option>
                  <option value="0-50000000">Affordable (Under ₦50M)</option>
                  <option value="50000000-150000000">₦50M – ₦150 Million</option>
                  <option value="150000000-500000000">₦150M – ₦500 Million</option>
                  <option value="500000000-1500000000">₦500M – ₦1.5 Billion</option>
                  <option value="1500000000-50000000000">₦1.5 Billion+ (Luxury Trophy)</option>
                </select>
              </div>
            </div>

            {/* Submit CTA */}
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-2.5 sm:py-3 px-6 rounded-lg bg-brand-navy hover:bg-slate-800 text-white font-bold text-xs sm:text-sm tracking-wide uppercase shadow-md transition-all hover:shadow-lg active:scale-[0.99]"
              >
                <Search className="w-4 h-4 text-amber-300" />
                <span>Search</span>
              </button>
            </div>
          </form>
        </div>

        {/* Credibility Badges */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-slate-300 text-xs font-medium">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-brand-amber" />
            <span>Sales | Rentals | Shortlets</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-brand-amber" />
            <span>Mainland • Lekki • Ikoyi • VI • Ajah</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-brand-amber" />
            <span>Affordable to Luxury Listings</span>
          </div>
        </div>
      </div>
    </div>
  );
}
