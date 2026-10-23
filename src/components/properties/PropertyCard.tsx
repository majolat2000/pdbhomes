import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Bed, Bath, Square, MapPin, ArrowUpRight } from "lucide-react";
import { Property } from "@/types";
import { formatCurrency, formatNumber } from "@/lib/utils";

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const isRent = property.listingStatus === "FOR_RENT";

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-card hover:shadow-luxury-lg transition-all duration-300 flex flex-col">
      {/* Image Container with Badges */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <Image
          src={property.primaryImage}
          alt={property.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Status & Feature Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {property.isExclusive && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-brand-amber text-white shadow-sm">
              Exclusive
            </span>
          )}
          {property.isFeatured && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-brand-navy text-white shadow-sm">
              Featured
            </span>
          )}
          <span
            className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase backdrop-blur-md ${
              isRent
                ? "bg-indigo-600/90 text-white"
                : "bg-emerald-600/90 text-white"
            }`}
          >
            {isRent ? "For Rent" : "For Sale"}
          </span>
        </div>

        {/* Price Tag Overlay on Image Bottom */}
        <div className="absolute bottom-3 left-3 text-white">
          <div className="text-xl sm:text-2xl font-extrabold tracking-tight drop-shadow-md">
            {formatCurrency(property.price)}
            {isRent && <span className="text-xs font-normal text-slate-200">/mo</span>}
          </div>
        </div>
      </div>

      {/* Property Details */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1.5">
            <MapPin className="w-3.5 h-3.5 text-brand-amber shrink-0" />
            <span className="truncate">
              {property.city}, {property.state}
            </span>
          </div>

          {/* Title */}
          <Link href={`/properties/${property.id}`}>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-brand-amber transition-colors line-clamp-1 mb-2 font-display">
              {property.title}
            </h3>
          </Link>

          {/* Key Specs Bar */}
          <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 text-xs text-slate-600 mb-4">
            <div className="flex items-center gap-1.5">
              <Bed className="w-4 h-4 text-slate-400" />
              <span>{property.bedrooms} Beds</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bath className="w-4 h-4 text-slate-400" />
              <span>{property.bathrooms} Baths</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Square className="w-4 h-4 text-slate-400" />
              <span>{formatNumber(property.squareFeet)} Sq Ft</span>
            </div>
          </div>
        </div>

        {/* Footer with Agent info & View details */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2">
            <div className="relative w-7 h-7 rounded-full overflow-hidden border border-slate-200">
              <Image
                src={property.agent.avatarUrl}
                alt={property.agent.name}
                fill
                className="object-cover"
              />
            </div>
            <span className="text-xs text-slate-600 font-medium truncate max-w-[120px]">
              {property.agent.name}
            </span>
          </div>

          <Link
            href={`/properties/${property.id}`}
            className="inline-flex items-center gap-1 text-xs font-bold text-brand-navy hover:text-brand-amber transition-colors group-hover:translate-x-0.5 duration-200"
          >
            <span>View Details</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-brand-amber" />
          </Link>
        </div>
      </div>
    </div>
  );
}
