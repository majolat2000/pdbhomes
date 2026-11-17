import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getPropertyById } from "@/lib/db";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { ScheduleViewingForm } from "@/components/forms/ScheduleViewingForm";
import { MortgageCalculator } from "@/components/properties/MortgageCalculator";
import {
  Bed,
  Bath,
  Square,
  Calendar,
  Home,
  MapPin,
  Phone,
  Mail,
  CheckCircle2,
  ArrowLeft,
  Compass,
  MessageCircle,
} from "lucide-react";

export const dynamic = "force-dynamic";

interface PropertyPageProps {
  params: { id: string };
}

export default async function PropertyDetailPage({ params }: PropertyPageProps) {
  const property = await getPropertyById(params.id);

  if (!property) {
    notFound();
  }

  const isRent = property.listingStatus === "FOR_RENT";
  const isShortlet = property.listingStatus === "SHORTLET";

  const getPriceSuffix = () => {
    if (isShortlet) return " / night";
    if (isRent) return " / year";
    return "";
  };

  const getStatusBadge = () => {
    if (isShortlet) {
      return (
        <span className="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-800 border border-blue-200">
          Serviced Shortlet
        </span>
      );
    }
    if (isRent) {
      return (
        <span className="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-indigo-100 text-indigo-800 border border-indigo-200">
          For Rent
        </span>
      );
    }
    return (
      <span className="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200">
        For Sale
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link & Actions */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-brand-navy transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-emerald-600" />
            <span>Back to All Properties</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 font-mono hidden sm:inline">
              Ref: #{property.mlsId}
            </span>
            <div className="flex items-center gap-1.5">
              {getStatusBadge()}
              {property.isExclusive && (
                <span className="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-brand-navy text-white">
                  Verified
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Title & Price Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between pb-6 border-b border-slate-200 gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-navy tracking-tight font-display">
              {property.title}
            </h1>
            <div className="flex items-center gap-2 text-sm sm:text-base text-slate-600 mt-2 font-medium">
              <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                {property.address}, {property.city}, {property.state}
              </span>
            </div>
          </div>

          <div className="text-left lg:text-right">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-bold block">
              Price
            </span>
            <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-navy font-display">
              {formatCurrency(property.price)}
              <span className="text-sm font-normal text-slate-500">{getPriceSuffix()}</span>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-3 h-[380px] sm:h-[480px] lg:h-[520px] rounded-2xl overflow-hidden mb-10 shadow-sm">
          {/* Main Photo */}
          <div className="relative md:col-span-2 md:row-span-2 bg-slate-200 overflow-hidden">
            <Image
              src={property.primaryImage}
              alt={property.title}
              fill
              priority
              className="object-cover"
            />
          </div>

          {/* Additional Photos */}
          {property.images.slice(1, 5).map((img, idx) => (
            <div key={idx} className="relative bg-slate-200 overflow-hidden hidden md:block">
              <Image
                src={img.url}
                alt={img.caption || property.title}
                fill
                className="object-cover"
              />
              {img.caption && (
                <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/70 to-transparent text-[11px] text-white truncate">
                  {img.caption}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 2-Column Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Details Column (8 cols) */}
          <div className="lg:col-span-8 space-y-10">
            {/* Key Specs Bar (only show if specs > 0) */}
            {(property.bedrooms > 0 || property.bathrooms > 0) && (
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block">Bedrooms</span>
                  <div className="flex items-center justify-center gap-1.5 mt-1 text-slate-900 font-bold text-base">
                    <Bed className="w-4 h-4 text-emerald-600" />
                    <span>{property.bedrooms} Beds</span>
                  </div>
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block">Bathrooms</span>
                  <div className="flex items-center justify-center gap-1.5 mt-1 text-slate-900 font-bold text-base">
                    <Bath className="w-4 h-4 text-emerald-600" />
                    <span>{property.bathrooms} Baths</span>
                  </div>
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block">Floor Area</span>
                  <div className="flex items-center justify-center gap-1.5 mt-1 text-slate-900 font-bold text-base">
                    <Square className="w-4 h-4 text-emerald-600" />
                    <span>{formatNumber(property.squareFeet)} Sq Ft</span>
                  </div>
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block">Property Type</span>
                  <div className="flex items-center justify-center gap-1.5 mt-1 text-slate-900 font-bold text-base">
                    <Home className="w-4 h-4 text-emerald-600" />
                    <span className="truncate">{property.propertyType}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Property Overview */}
            <div className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-xs space-y-3">
              <h2 className="text-xl font-bold text-brand-navy font-display">
                Property Description
              </h2>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                {property.description}
              </p>
            </div>

            {/* Features & Amenities */}
            {property.amenities.length > 0 && (
              <div className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-xs space-y-5">
                <h2 className="text-xl font-bold text-brand-navy font-display">
                  Key Features &amp; Amenities
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {property.amenities.map((amenity, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-sm text-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Nigerian Payment Guide */}
            {!isRent && !isShortlet && (
              <MortgageCalculator initialPrice={property.price} />
            )}
          </div>

          {/* Right Sticky Sidebar (4 cols) */}
          <div className="lg:col-span-4 sticky top-28 space-y-6">
            {/* Book an Inspection Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm space-y-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 block mb-1">
                  Physical &amp; Video Inspection
                </span>
                <h3 className="text-lg font-bold text-slate-900 font-display">
                  Schedule an Inspection
                </h3>
                <p className="text-xs text-slate-500">
                  Select your preferred date to inspect this property with an agent.
                </p>
              </div>

              <ScheduleViewingForm
                propertyId={property.id}
                propertyTitle={property.title}
                agentId={property.agent.id}
                agentName={property.agent.name}
              />
            </div>

            {/* Fast WhatsApp & Contact Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-4">
              <h4 className="text-sm font-bold text-slate-900 font-display">
                Have Quick Questions?
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Reach our team directly on WhatsApp for real-time video clips, title verification checks, and prompt replies.
              </p>

              <div className="pt-1 flex flex-col gap-2.5">
                <a
                  href={`https://wa.link/ksxyrq?text=${encodeURIComponent(
                    `Hello PDB Homes, I would like to inquire about: "${property.title}" in ${property.city}, Lagos (${formatCurrency(property.price)}${getPriceSuffix()}). Please share inspection details.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white transition-colors shadow-xs"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Chat on WhatsApp Directly</span>
                </a>

                <a
                  href="tel:+2348181017260"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-800 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Call: +2348181017260</span>
                </a>

                <a
                  href={`mailto:info@pdbhomes.com?subject=${encodeURIComponent(`Inquiry for ${property.title}`)}`}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-800 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Email: info@pdbhomes.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
