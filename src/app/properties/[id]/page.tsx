import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getPropertyById, getProperties } from "@/lib/db";
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
  Share2,
  Heart,
  ShieldCheck,
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
            <span>Back to Collection</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 font-mono hidden sm:inline">
              MLS #{property.mlsId}
            </span>
            <div className="flex items-center gap-1.5">
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  isRent
                    ? "bg-indigo-100 text-indigo-800 border border-indigo-200"
                    : "bg-emerald-100 text-emerald-800 border border-emerald-200"
                }`}
              >
                {isRent ? "For Rent" : "For Sale"}
              </span>
              {property.isExclusive && (
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-700 text-white">
                  Exclusive
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Title & Price Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between pb-8 border-b border-slate-200 gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy tracking-tight font-display">
              {property.title}
            </h1>
            <div className="flex items-center gap-2 text-sm sm:text-base text-slate-600 mt-2 font-medium">
              <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                {property.address}, {property.city}, {property.state} {property.postalCode}
              </span>
            </div>
          </div>

          <div className="text-left lg:text-right">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-bold block">
              Listing Price
            </span>
            <div className="text-3xl sm:text-4xl font-extrabold text-brand-navy font-display">
              {formatCurrency(property.price)}
              {isRent && <span className="text-base font-normal text-slate-500"> / month</span>}
            </div>
          </div>
        </div>

        {/* Mosaic Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-3 h-[420px] sm:h-[520px] lg:h-[580px] rounded-3xl overflow-hidden mb-12 shadow-luxury">
          {/* Main Hero Photo (Takes 2 cols & 2 rows) */}
          <div className="relative md:col-span-2 md:row-span-2 bg-slate-200 overflow-hidden group">
            <Image
              src={property.primaryImage}
              alt={property.title}
              fill
              priority
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* Sub photos */}
          {property.images.slice(1, 5).map((img, idx) => (
            <div key={idx} className="relative bg-slate-200 overflow-hidden group hidden md:block">
              <Image
                src={img.url}
                alt={img.caption || property.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              {img.caption && (
                <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/70 to-transparent text-[11px] text-white truncate">
                  {img.caption}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 2-Column Content Layout: Left Details, Right Sticky Inquiry */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Details Column (8 cols) */}
          <div className="lg:col-span-8 space-y-12">
            {/* Key Specs Bar */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-card grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 text-center">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block">Bedrooms</span>
                <div className="flex items-center justify-center gap-1.5 mt-1 text-slate-900 font-bold text-lg">
                  <Bed className="w-4 h-4 text-emerald-600" />
                  <span>{property.bedrooms}</span>
                </div>
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block">Bathrooms</span>
                <div className="flex items-center justify-center gap-1.5 mt-1 text-slate-900 font-bold text-lg">
                  <Bath className="w-4 h-4 text-emerald-600" />
                  <span>{property.bathrooms}</span>
                </div>
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block">Living Space</span>
                <div className="flex items-center justify-center gap-1.5 mt-1 text-slate-900 font-bold text-lg">
                  <Square className="w-4 h-4 text-emerald-600" />
                  <span>{formatNumber(property.squareFeet)}</span>
                </div>
                <span className="text-[10px] text-slate-400">Sq Ft</span>
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block">Lot Size</span>
                <div className="flex items-center justify-center gap-1.5 mt-1 text-slate-900 font-bold text-lg">
                  <Compass className="w-4 h-4 text-emerald-600" />
                  <span>{property.lotSizeAcres ? `${property.lotSizeAcres} Ac` : "N/A"}</span>
                </div>
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block">Year Built</span>
                <div className="flex items-center justify-center gap-1.5 mt-1 text-slate-900 font-bold text-lg">
                  <Calendar className="w-4 h-4 text-emerald-600" />
                  <span>{property.yearBuilt}</span>
                </div>
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block">Type</span>
                <div className="flex items-center justify-center gap-1.5 mt-1 text-slate-900 font-bold text-lg">
                  <Home className="w-4 h-4 text-emerald-600" />
                  <span>{property.propertyType}</span>
                </div>
              </div>
            </div>

            {/* Architectural Overview */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-card space-y-4">
              <h2 className="text-2xl font-bold text-brand-navy font-display">
                Architectural Overview
              </h2>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                {property.description}
              </p>
            </div>

            {/* Amenities Grid */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-card space-y-6">
              <h2 className="text-2xl font-bold text-brand-navy font-display">
                Premier Features & Amenities
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {property.amenities.map((amenity, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-sm text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Financing Estimator */}
            {!isRent && <MortgageCalculator initialPrice={property.price} />}
          </div>

          {/* Right Sticky Sidebar (4 cols) */}
          <div className="lg:col-span-4 sticky top-28 space-y-6">
            {/* Schedule a Viewing Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-luxury space-y-4">
              <div>
                <div className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-wider mb-1">
                  <span>Private In-Person or Virtual Tour</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 font-display">
                  Schedule a Viewing
                </h3>
                <p className="text-xs text-slate-500">
                  Select your preferred preview window with our listing director.
                </p>
              </div>

              <ScheduleViewingForm
                propertyId={property.id}
                propertyTitle={property.title}
                agentId={property.agent.id}
                agentName={property.agent.name}
              />
            </div>

            {/* Assigned Listing Agent Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-card space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-slate-200 shrink-0">
                  <Image
                    src={property.agent.avatarUrl}
                    alt={property.agent.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900 font-display">
                    {property.agent.name}
                  </h4>
                  <p className="text-xs text-emerald-700 font-semibold">
                    {property.agent.title}
                  </p>
                  <span className="text-[11px] text-slate-400 block">
                    {property.agent.licenseNumber}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                {property.agent.bio}
              </p>

              <div className="pt-2 flex flex-col gap-2">
                <a
                  href={`https://wa.link/ksxyrq?text=${encodeURIComponent(`Hello PDB Homes, I would like to inquire about: ${property.title} located at ${property.address} (${formatCurrency(property.price)})`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white transition-colors shadow-sm"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Chat on WhatsApp Directly</span>
                </a>
                <a
                  href={`tel:${property.agent.phone}`}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-800 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Direct: {property.agent.phone}</span>
                </a>
                <a
                  href={`mailto:${property.agent.email}?subject=Inquiry for ${encodeURIComponent(property.title)}`}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-800 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Email Agent</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
