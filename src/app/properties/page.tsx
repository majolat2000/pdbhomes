"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Property } from "@/types";
import { PropertyCard } from "@/components/properties/PropertyCard";
import { PropertyMap } from "@/components/properties/PropertyMap";
import {
  Search,
  Map as MapIcon,
  Grid as GridIcon,
  RotateCcw,
  MessageCircle,
  ArrowRight,
} from "lucide-react";

function PropertiesPageContent() {
  const searchParams = useSearchParams();

  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "split">("grid");

  // Filter States
  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [propertyType, setPropertyType] = useState(searchParams.get("propertyType") || "ALL");
  const [listingStatus, setListingStatus] = useState(searchParams.get("listingStatus") || "ALL");
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
  const [bedrooms, setBedrooms] = useState(searchParams.get("bedrooms") || "ALL");
  const [sortBy, setSortBy] = useState<"newest" | "price_asc" | "price_desc" | "sqft_desc">("newest");

  const fetchFilteredProperties = async () => {
    setLoading(true);
    try {
      const q = new URLSearchParams();
      if (location.trim()) q.set("location", location.trim());
      if (propertyType !== "ALL") q.set("propertyType", propertyType);
      if (listingStatus !== "ALL") q.set("listingStatus", listingStatus);
      if (minPrice) q.set("minPrice", minPrice);
      if (maxPrice) q.set("maxPrice", maxPrice);
      if (bedrooms !== "ALL") q.set("bedrooms", bedrooms);
      if (sortBy) q.set("sortBy", sortBy);

      const res = await fetch(`/api/properties?${q.toString()}`);
      const json = await res.json();
      if (json.success) {
        setProperties(json.data);
      }
    } catch (e) {
      console.error("Failed to load properties", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFilteredProperties();
  }, [location, propertyType, listingStatus, minPrice, maxPrice, bedrooms, sortBy]);

  const handleResetFilters = () => {
    setLocation("");
    setPropertyType("ALL");
    setListingStatus("ALL");
    setMinPrice("");
    setMaxPrice("");
    setBedrooms("ALL");
    setSortBy("newest");
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title & Breadcrumb */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold tracking-widest uppercase text-emerald-700 mb-1 block">
              Active Inventory
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-navy tracking-tight font-display">
              Available Properties in Lagos
            </h1>
            <p className="text-slate-600 text-sm sm:text-base mt-1">
              Browse houses for sale, rental apartments, serviced shortlets, and verified land.
            </p>
          </div>

          <div className="flex items-center gap-2.5 self-start sm:self-auto">
            <Link
              href="/request"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-brand-navy hover:bg-slate-800 text-white font-semibold text-xs transition-colors shadow-xs"
            >
              <span>Custom Property Search</span>
              <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
            </Link>
          </div>
        </div>

        {/* Global Filter Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-xs mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {/* Search Location */}
            <div className="relative">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Area
              </label>
              <div className="relative flex items-center">
                <Search className="w-4 h-4 text-emerald-600 absolute left-3" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Lekki, Ikoyi, VI, Ajah, Mainland..."
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 focus:outline-none focus:border-brand-navy focus:ring-1 focus:ring-brand-navy"
                />
              </div>
            </div>

            {/* Type */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Property Type
              </label>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-brand-navy"
              >
                <option value="ALL">All Types</option>
                <option value="DETACHED_DUPLEX">Detached Duplex</option>
                <option value="SEMI_DETACHED">Semi-Detached Duplex</option>
                <option value="TERRACE">Terrace Duplex</option>
                <option value="SERVICED_APARTMENT">Serviced Apartment</option>
                <option value="APARTMENT">Apartment / Flat</option>
                <option value="SHORTLET_STUDIO">Serviced Shortlet</option>
                <option value="LAND">Land / Plot</option>
                <option value="MANSION">Mansion / Waterfront</option>
                <option value="COMMERCIAL">Commercial</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Listing Status
              </label>
              <select
                value={listingStatus}
                onChange={(e) => setListingStatus(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-brand-navy"
              >
                <option value="ALL">All Listings</option>
                <option value="FOR_SALE">Houses &amp; Lands for Sale</option>
                <option value="FOR_RENT">Rentals &amp; Apartments</option>
                <option value="SHORTLET">Serviced Shortlets</option>
              </select>
            </div>

            {/* Bedrooms */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Bedrooms
              </label>
              <select
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-brand-navy"
              >
                <option value="ALL">Any Number of Beds</option>
                <option value="1">1+ Bed</option>
                <option value="2">2+ Beds</option>
                <option value="3">3+ Beds</option>
                <option value="4">4+ Beds</option>
                <option value="5">5+ Beds</option>
              </select>
            </div>

            {/* Reset Action */}
            <div className="flex items-end gap-2">
              <button
                type="button"
                onClick={handleResetFilters}
                className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                <span>Reset Filters</span>
              </button>
            </div>
          </div>
        </div>

        {/* View Controls & Result Count */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 gap-4">
          <div className="text-sm font-semibold text-slate-700">
            Showing <span className="text-brand-navy font-bold">{properties.length}</span> properties
          </div>

          <div className="flex items-center gap-4">
            {/* Sort Selector */}
            <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
              <span>Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-bold text-slate-800 focus:outline-none"
              >
                <option value="newest">Newest First</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="sqft_desc">Largest Area</option>
              </select>
            </div>

            {/* Grid / Split Map Toggle */}
            <div className="flex items-center bg-white rounded-lg border border-slate-200 p-0.5">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-md text-xs font-bold flex items-center gap-1 transition-colors ${
                  viewMode === "grid" ? "bg-brand-navy text-white" : "text-slate-600 hover:text-slate-900"
                }`}
                title="Grid View"
              >
                <GridIcon className="w-4 h-4" />
                <span className="hidden md:inline text-[11px]">Grid</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("split")}
                className={`p-1.5 rounded-md text-xs font-bold flex items-center gap-1 transition-colors ${
                  viewMode === "split" ? "bg-brand-navy text-white" : "text-slate-600 hover:text-slate-900"
                }`}
                title="Map View"
              >
                <MapIcon className="w-4 h-4" />
                <span className="hidden md:inline text-[11px]">Map</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        {loading ? (
          <div className="py-24 text-center text-slate-500">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-navy mx-auto mb-3" />
            <p className="text-xs font-medium">Loading properties...</p>
          </div>
        ) : properties.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-2xl border border-slate-200 p-8 max-w-xl mx-auto space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-display">No properties match your filter</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We frequently update our inventory with off-market pocket listings. Tell us what you are looking for, or contact us directly on WhatsApp and we will find matching options for you.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/request"
                className="px-5 py-2.5 rounded-xl bg-brand-navy text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
              >
                Submit Custom Search
              </Link>
              <a
                href="https://wa.link/ksxyrq"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-500 transition-colors flex items-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-white" />
                <span>Chat on WhatsApp</span>
              </a>
              <button
                onClick={handleResetFilters}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>

            <div className="lg:col-span-5 sticky top-28 h-[calc(100vh-140px)] min-h-[500px]">
              <PropertyMap properties={properties} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 py-20 text-center text-slate-500">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-navy mx-auto mb-3" />
          <p className="text-xs font-medium">Loading properties...</p>
        </div>
      }
    >
      <PropertiesPageContent />
    </Suspense>
  );
}
