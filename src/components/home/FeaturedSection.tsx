import React from "react";
import Link from "next/link";
import { Property } from "@/types";
import { PropertyCard } from "@/components/properties/PropertyCard";
import { ArrowRight, ShieldCheck, UserCheck } from "lucide-react";

interface FeaturedSectionProps {
  properties: Property[];
}

export function FeaturedSection({ properties }: FeaturedSectionProps) {
  const featured = properties.filter((p) => p.isFeatured).slice(0, 6);

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            {/* Tag (Logo removed per instruction) */}
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-brand-amber text-xs font-bold uppercase tracking-wider mb-3">
              <span>Exclusive Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight font-display">
              Featured Nigerian Trophy Estates
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-xl">
              Hand-selected architectural residences across Banana Island, Ikoyi, Victoria Island, Lekki Phase 1, and Maitama Abuja.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/request"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-amber hover:underline"
            >
              <span>Submit Buy/Sell Request</span>
            </Link>
            <Link
              href="/properties"
              className="inline-flex items-center gap-2 text-sm font-bold text-brand-navy hover:text-brand-amber transition-colors group self-start md:self-auto"
            >
              <span>All Properties</span>
              <ArrowRight className="w-4 h-4 text-brand-amber group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* If no properties have been approved by admin yet */}
        {featured.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 sm:p-14 border border-slate-200 text-center max-w-3xl mx-auto space-y-5 shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-brand-amber flex items-center justify-center mx-auto shadow-sm">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 font-display">
                Private Portfolio Curation in Progress
              </h3>
              <p className="text-slate-600 text-sm max-w-lg mx-auto mt-2 leading-relaxed">
                Our active acquisitions across Banana Island, Ikoyi, and Maitama are handled discreetly via private off-market mandates. Tell us what you are looking to buy or sell, and our advisory desk will match you directly.
              </p>
            </div>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/request"
                className="px-6 py-3 rounded-xl bg-brand-navy hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md flex items-center gap-2"
              >
                <UserCheck className="w-4 h-4 text-amber-300" />
                <span>Submit Buy / Sell Mandate</span>
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-800 font-bold text-xs uppercase tracking-wider transition-colors"
              >
                Contact Advisory Desk
              </Link>
            </div>
          </div>
        ) : (
          /* Properties Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
