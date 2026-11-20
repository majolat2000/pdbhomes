import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Bed, Bath, Square, MapPin, ArrowRight, MessageCircle } from "lucide-react";
import { Property } from "@/types";
import { formatCurrency, formatNumber } from "@/lib/utils";

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const isRent = property.listingStatus === "FOR_RENT";
  const isShortlet = property.listingStatus === "SHORTLET";

  const getStatusBadge = () => {
    if (isShortlet) {
      return (
        <span className="px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase bg-blue-700 text-white shadow-xs">
          Shortlet
        </span>
      );
    }
    if (isRent) {
      return (
        <span className="px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase bg-emerald-700 text-white shadow-xs">
          For Rent
        </span>
      );
    }
    return (
      <span className="px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase bg-brand-navy text-white shadow-xs">
        For Sale
      </span>
    );
  };

  const getPriceSuffix = () => {
    if (isShortlet) return " / night";
    if (isRent) return " / year";
    return "";
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-slate-200/90 hover:border-slate-300 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col">
      {/* Image Container with Badges */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <Image
          src={property.primaryImage}
          alt={property.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-102 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-40 group-hover:opacity-30 transition-opacity" />

        {/* Status Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {getStatusBadge()}
          {property.isExclusive && (
            <span className="px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase bg-slate-900/80 text-white backdrop-blur-xs">
              Verified
            </span>
          )}
        </div>

        {/* Price Tag Overlay on Bottom of Image */}
        <div className="absolute bottom-3 left-3 text-white">
          <div className="text-lg sm:text-xl font-extrabold tracking-tight drop-shadow-sm">
            {formatCurrency(property.price)}
            <span className="text-xs font-normal text-slate-200">{getPriceSuffix()}</span>
          </div>
        </div>
      </div>

      {/* Property Details */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1.5">
            <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className="truncate">
              {property.city}, {property.state}
            </span>
          </div>

          {/* Title */}
          <Link href={`/properties/${property.id}`}>
            <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1 mb-2 font-display">
              {property.title}
            </h3>
          </Link>

          {/* Key Specs Bar (only show specs if greater than 0, e.g. not for empty land) */}
          {(property.bedrooms > 0 || property.bathrooms > 0) && (
            <div className="grid grid-cols-3 gap-2 py-2.5 border-y border-slate-100 text-xs text-slate-600 mb-4">
              <div className="flex items-center gap-1.5">
                <Bed className="w-3.5 h-3.5 text-slate-400" />
                <span>{property.bedrooms} Beds</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Bath className="w-3.5 h-3.5 text-slate-400" />
                <span>{property.bathrooms} Baths</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Square className="w-3.5 h-3.5 text-slate-400" />
                <span>{formatNumber(property.squareFeet)} Sq Ft</span>
              </div>
            </div>
          )}
        </div>

        {/* Card Actions */}
        <div className="flex items-center justify-between pt-2 gap-2">
          <Link
            href={`/properties/${property.id}`}
            className="inline-flex items-center gap-1 text-xs font-bold text-brand-navy hover:text-emerald-700 transition-colors"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5 text-emerald-600" />
          </Link>

          <a
            href={`https://wa.me/2348181017260?text=${encodeURIComponent(
              `Hello PDB Homes, I am interested in: "${property.title}" located at ${property.city}, Lagos (${formatCurrency(property.price)}${getPriceSuffix()}). Please share more details and inspection schedule.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold transition-colors"
            title="Chat about this property on WhatsApp"
          >
            <MessageCircle className="w-3 h-3 text-emerald-600" />
            <span>Inquire</span>
          </a>
        </div>
      </div>
    </div>
  );
}
