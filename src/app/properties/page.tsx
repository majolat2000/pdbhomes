"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Property, PropertyFilterParams } from "@/types";
import { PropertyCard } from "@/components/properties/PropertyCard";
import { PropertyMap } from "@/components/properties/PropertyMap";
import {
  Search,
  SlidersHorizontal,
  Map as MapIcon,
  Grid as GridIcon,
  X,
  Sparkles,
  RotateCcw,
} from "lucide-react";

function PropertiesPageContent() {
  const searchParams = useSearchParams();

  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "split">("split");
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  // Filter States
  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [propertyType, setPropertyType] = useState(searchParams.get("propertyType") || "ALL");
  const [listingStatus, setListingStatus] = useState(searchParams.get("listingStatus") || "ALL");
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
  const [bedrooms, setBedrooms] = useState(searchParams.get("bedrooms") || "ALL");
  const [sortBy, setSortBy] = useState<"newest" | "price_asc" | "price_desc" | "sqft_desc">("newest");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const availableAmenities = [
    "Infinity Pool",
    "Wine Cellar",
    "Smart Home Automation",
    "Private Deep-Water Yacht Dock",
    "Private Elevator to All Floors",
    "Ski-in / Ski-out Access",
    "Rooftop Observatory",
    "Guard-Gated Community",
  ];

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
      if (selectedAmenities.length > 0) q.set("amenities", selectedAmenities.join(","));

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
  }, [location, propertyType, listingStatus, minPrice, maxPrice, bedrooms, sortBy, selectedAmenities]);

  const handleResetFilters = () => {
    setLocation("");
    setPropertyType("ALL");
    setListingStatus("ALL");
    setMinPrice("");
    setMaxPrice("");
    setBedrooms("ALL");
    setSelectedAmenities([]);
    setSortBy("newest");
  };

  const toggleAmenity = (amenity: string) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title & Breadcrumb */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-brand-amber text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Inventory</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight font-display">
            Exclusive Property Portfolio
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-1">
            Explore architectural residences, oceanfront villas, and trophy penthouses.
          </p>
        </div>

        {/* Global Filter Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-card mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {/* Search Location */}
            <div className="relative">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Location
              </label>
              <div className="relative flex items-center">
                <Search className="w-4 h-4 text-brand-amber absolute left-3" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="City, State, Zip"
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
                <option value="ESTATE">Estate</option>
                <option value="PENTHOUSE">Penthouse</option>
                <option value="VILLA">Villa</option>
                <option value="HOUSE">Contemporary House</option>
                <option value="TOWNHOUSE">Townhouse</option>
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
                <option value="FOR_SALE">For Sale</option>
                <option value="FOR_RENT">For Rent</option>
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
                <option value="ALL">Any Beds</option>
                <option value="3">3+ Beds</option>
                <option value="4">4+ Beds</option>
                <option value="5">5+ Beds</option>
                <option value="6">6+ Beds</option>
              </select>
            </div>

            {/* Actions: Mobile filters trigger & Reset */}
            <div className="flex items-end gap-2">
              <button
                type="button"
                onClick={() => setShowFiltersMobile(!showFiltersMobile)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border border-slate-300 hover:bg-slate-50 text-xs font-bold text-slate-700"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-brand-amber" />
                <span>Amenities ({selectedAmenities.length})</span>
              </button>

              <button
                type="button"
                onClick={handleResetFilters}
                title="Reset Filters"
                className="p-2 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Expanded Amenities Drawer */}
          {showFiltersMobile && (
            <div className="mt-4 pt-4 border-t border-slate-100 animate-in fade-in duration-200">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Filter by Architectural Amenities
              </div>
              <div className="flex flex-wrap gap-2">
                {availableAmenities.map((amenity) => {
                  const active = selectedAmenities.includes(amenity);
                  return (
                    <button
                      key={amenity}
                      type="button"
                      onClick={() => toggleAmenity(amenity)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                        active
                          ? "bg-brand-navy text-white shadow-sm"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {amenity}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* View Controls & Result Count */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 gap-4">
          <div className="text-sm font-semibold text-slate-700">
            Showing <span className="text-brand-navy font-bold">{properties.length}</span> properties
          </div>

          <div className="flex items-center gap-4">
            {/* Sort Selector */}
            <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
              <span>Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-bold text-slate-800 focus:outline-none"
              >
                <option value="newest">Featured & Newest</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="sqft_desc">Largest Square Footage</option>
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
                title="Grid Only"
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
                title="Split Map View"
              >
                <MapIcon className="w-4 h-4" />
                <span className="hidden md:inline text-[11px]">Split Map</span>
              </button>
            </div>
          </div>
        </div>

        {/* Properties Content Area */}
        {loading ? (
          <div className="py-24 text-center text-slate-500">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-navy mx-auto mb-4" />
            <p className="text-sm font-medium">Loading luxury portfolio...</p>
          </div>
        ) : properties.length === 0 ? (
          <div className="py-20 text-center bg-white rounded-3xl border border-slate-200 p-12">
            <div className="w-12 h-12 rounded-full bg-amber-50 text-brand-amber flex items-center justify-center mx-auto mb-4">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-display">No Properties Match Your Search</h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto mt-1 mb-6">
              Try adjusting your price range, location, or clearing specific amenities to see more listings.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-5 py-2.5 rounded-xl bg-brand-navy text-white text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          /* Split Screen: Listings Grid on Left, Sticky Map on Right */
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
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-navy mx-auto mb-4" />
          <p className="text-sm font-medium">Loading collection...</p>
        </div>
      }
    >
      <PropertiesPageContent />
    </Suspense>
  );
}
