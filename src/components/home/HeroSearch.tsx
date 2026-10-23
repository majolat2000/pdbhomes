"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Home, DollarSign, ArrowRight, ShieldCheck, Award, Sparkles } from "lucide-react";

export function HeroSearch() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"ALL" | "FOR_SALE" | "FOR_RENT">("ALL");
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
    <div className="relative min-h-[640px] lg:min-h-[720px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Dark Vignette Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 animate-pulse transition-transform duration-1000"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=85')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/60 to-brand-navy/30" />

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8 pb-16">
        {/* Prestige Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-amber-300 text-xs font-semibold tracking-wider uppercase mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Curated Private Client Real Estate</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight font-display mb-6">
          Exceptional Architecture. <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100">
            Unrivaled Representation.
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-200 leading-relaxed font-light mb-10">
          Representing the most distinguished residential estates, waterfront retreats, and skyline penthouses across North America.
        </p>

        {/* Dynamic Search Box */}
        <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-xl rounded-2xl p-4 sm:p-6 shadow-2xl border border-white/40 text-left">
          {/* Tabs */}
          <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
            <button
              type="button"
              onClick={() => setActiveTab("ALL")}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
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
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
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
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeTab === "FOR_RENT"
                  ? "bg-brand-navy text-white shadow-sm"
                  : "text-slate-600 hover:text-brand-navy hover:bg-slate-100"
              }`}
            >
              Luxury Rentals
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {/* Location */}
            <div className="relative">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Location
              </label>
              <div className="relative flex items-center">
                <MapPin className="w-4 h-4 text-brand-amber absolute left-3 pointer-events-none" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="City, State, or Postal Code"
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
                  <option value="ALL">All Types</option>
                  <option value="ESTATE">Luxury Estate</option>
                  <option value="PENTHOUSE">Penthouse</option>
                  <option value="VILLA">Waterfront Villa</option>
                  <option value="HOUSE">Contemporary House</option>
                  <option value="TOWNHOUSE">Historic Townhouse</option>
                </select>
              </div>
            </div>

            {/* Price Range */}
            <div className="relative">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Price Range
              </label>
              <div className="relative flex items-center">
                <DollarSign className="w-4 h-4 text-brand-amber absolute left-3 pointer-events-none" />
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-200 text-xs sm:text-sm text-slate-900 bg-white focus:outline-none focus:border-brand-navy focus:ring-1 focus:ring-brand-navy transition-colors appearance-none"
                >
                  <option value="ALL">Any Price</option>
                  <option value="0-5000000">Up to $5M</option>
                  <option value="5000000-15000000">$5M – $15M</option>
                  <option value="15000000-25000000">$15M – $25M</option>
                  <option value="25000000-100000000">$25M+</option>
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
            <span>$1.8B+ Lifetime Volume Sold</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-brand-amber" />
            <span>Private Client Off-Market Access</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-amber" />
            <span>Top 0.1% Global Advisory</span>
          </div>
        </div>
      </div>
    </div>
  );
}
