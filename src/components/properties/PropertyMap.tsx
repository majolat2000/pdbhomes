"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Property } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { Bed, Bath, ArrowUpRight, MapPin } from "lucide-react";

interface PropertyMapProps {
  properties: Property[];
  selectedPropertyId?: string;
  onSelectProperty?: (id: string) => void;
}

export function PropertyMap({ properties, selectedPropertyId, onSelectProperty }: PropertyMapProps) {
  const [mounted, setMounted] = useState(false);
  const [activeProperty, setActiveProperty] = useState<Property | null>(
    properties.find((p) => p.id === selectedPropertyId) || properties[0] || null
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (selectedPropertyId) {
      const match = properties.find((p) => p.id === selectedPropertyId);
      if (match) setActiveProperty(match);
    }
  }, [selectedPropertyId, properties]);

  if (!mounted) {
    return (
      <div className="w-full h-full min-h-[480px] bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400">
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="w-5 h-5 animate-bounce text-brand-amber" />
          <span>Initializing Map View...</span>
        </div>
      </div>
    );
  }

  // Calculate center based on properties
  const centerLat = properties.length > 0 ? properties[0].latitude : 34.0522;
  const centerLng = properties.length > 0 ? properties[0].longitude : -118.2437;

  return (
    <div className="relative w-full h-full min-h-[500px] lg:min-h-[640px] rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-card">
      {/* Interactive Map Visual Mock Canvas with Pin Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1800&q=80')",
          filter: "saturate(0.85) contrast(1.05)",
        }}
      />
      <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-[1px]" />

      {/* Header controls overlay */}
      <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-md rounded-xl px-4 py-2 text-xs font-semibold text-slate-800 shadow-md flex items-center gap-2">
        <MapPin className="w-4 h-4 text-brand-amber" />
        <span>{properties.length} Active Listings on Map</span>
      </div>

      {/* Interactive Pins on Map */}
      <div className="absolute inset-0 p-8 flex flex-wrap items-center justify-around gap-6 pointer-events-auto">
        {properties.map((prop, idx) => {
          const isSelected = activeProperty?.id === prop.id;
          return (
            <button
              key={prop.id}
              onClick={() => {
                setActiveProperty(prop);
                if (onSelectProperty) onSelectProperty(prop.id);
              }}
              style={{
                transform: `translate(${((idx * 37) % 60) - 30}px, ${((idx * 43) % 40) - 20}px)`,
              }}
              className={`group transition-all duration-200 relative focus:outline-none ${
                isSelected ? "scale-110 z-20" : "scale-100 z-10 hover:scale-105"
              }`}
            >
              <div
                className={`px-3 py-1.5 rounded-full text-xs font-extrabold shadow-lg transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-brand-navy text-amber-300 ring-2 ring-brand-amber"
                    : "bg-white text-slate-900 hover:bg-slate-50"
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    isSelected ? "bg-amber-400" : "bg-emerald-500"
                  }`}
                />
                <span>{formatCurrency(prop.price)}</span>
              </div>
              <div
                className={`w-0 h-0 border-x-4 border-x-transparent border-t-6 mx-auto ${
                  isSelected ? "border-t-brand-navy" : "border-t-white"
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* Active Property Popup Card at Bottom of Map */}
      {activeProperty && (
        <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-sm z-30 bg-white rounded-2xl p-3.5 shadow-2xl border border-slate-200 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="flex gap-3.5">
            <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-slate-100 shrink-0">
              <Image
                src={activeProperty.primaryImage}
                alt={activeProperty.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 flex flex-col justify-between min-w-0">
              <div>
                <div className="text-sm font-bold text-slate-900 truncate font-display">
                  {activeProperty.title}
                </div>
                <div className="text-xs text-slate-500 truncate flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-brand-amber shrink-0" />
                  <span>
                    {activeProperty.city}, {activeProperty.state}
                  </span>
                </div>
                <div className="text-base font-extrabold text-brand-navy mt-1">
                  {formatCurrency(activeProperty.price)}
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-2 text-[11px] text-slate-600">
                  <span className="flex items-center gap-1">
                    <Bed className="w-3 h-3 text-slate-400" />
                    {activeProperty.bedrooms}
                  </span>
                  <span className="flex items-center gap-1">
                    <Bath className="w-3 h-3 text-slate-400" />
                    {activeProperty.bathrooms}
                  </span>
                </div>
                <Link
                  href={`/properties/${activeProperty.id}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-brand-navy hover:text-brand-amber transition-colors"
                >
                  <span>Details</span>
                  <ArrowUpRight className="w-3 h-3 text-brand-amber" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
