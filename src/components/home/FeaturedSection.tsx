import React from "react";
import Link from "next/link";
import { Property } from "@/types";
import { PropertyCard } from "@/components/properties/PropertyCard";
import { ArrowRight, Sparkles } from "lucide-react";

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
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-brand-amber text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Exclusive Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight font-display">
              Featured Trophy Properties
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-xl">
              Hand-selected architectural estates offering unparalleled craftsmanship, prime vistas, and refined luxury.
            </p>
          </div>

          <Link
            href="/properties"
            className="inline-flex items-center gap-2 text-sm font-bold text-brand-navy hover:text-brand-amber transition-colors group self-start md:self-auto"
          >
            <span>View Complete Collection</span>
            <ArrowRight className="w-4 h-4 text-brand-amber group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
}
