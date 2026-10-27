"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, MessageCircle, MapPin, Bed, Bath, ArrowUpRight, Sparkles } from "lucide-react";

interface InstagramListing {
  id: string;
  title: string;
  location: string;
  zone: "Ikoyi" | "Lekki" | "VI" | "Ajah" | "Mainland";
  category: "FOR_SALE" | "FOR_RENT" | "SHORTLET";
  price: string;
  beds: number;
  baths: number;
  image: string;
  caption: string;
  whatsappMessage: string;
}

const INSTAGRAM_LISTINGS: InstagramListing[] = [
  {
    id: "ig-1",
    title: "Luxury 5-Bedroom Fully Detached Duplex + BQ & Pool",
    location: "Lekki Phase 1, Lagos",
    zone: "Lekki",
    category: "FOR_SALE",
    price: "₦550,000,000",
    beds: 5,
    baths: 6,
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
    caption: "Contemporary luxury living at its finest! Fully fitted chef kitchen, cinema room, infinity swimming pool, automated gate & clean Governor's Consent.",
    whatsappMessage: "Hello PDB Homes, I saw the 5-Bedroom Fully Detached Duplex in Lekki Phase 1 (₦550M) on your Instagram showcase and would like to schedule an inspection.",
  },
  {
    id: "ig-2",
    title: "Exquisite 2-Bedroom Waterfront Serviced Shortlet",
    location: "Admiralty Way, Lekki / VI Border, Lagos",
    zone: "Lekki",
    category: "SHORTLET",
    price: "₦180,000 / night",
    beds: 2,
    baths: 2,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
    caption: "Premium waterfront view, 24/7 uninterrupted power, high-speed fiber internet, Netflix, gym, rooftop lounge & dedicated chef on call.",
    whatsappMessage: "Hello PDB Homes, I want to book the 2-Bedroom Waterfront Serviced Shortlet (₦180k/night) seen on your Instagram showcase.",
  },
  {
    id: "ig-3",
    title: "Ultra-Prime 4-Bedroom Sky Maisonette + Marina Access",
    location: "Old Ikoyi, Lagos",
    zone: "Ikoyi",
    category: "FOR_SALE",
    price: "₦1,250,000,000",
    beds: 4,
    baths: 5,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    caption: "The pinnacle of Ikoyi prestige. Double-volume ceilings, floor-to-ceiling panoramic glass, biometric elevator access & 3 reserved basement car slots.",
    whatsappMessage: "Hello PDB Homes, I am inquiring about the 4-Bedroom Sky Maisonette in Old Ikoyi (₦1.25B) from your Instagram showcase.",
  },
  {
    id: "ig-4",
    title: "Serviced 3-Bedroom Executive Apartment with Pool & Gym",
    location: "Victoria Island (VI), Lagos",
    zone: "VI",
    category: "FOR_RENT",
    price: "₦25,000,000 / year",
    beds: 3,
    baths: 3,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
    caption: "Turnkey luxury executive living in the diplomatic heart of Victoria Island. 24/7 power, Olympic pool, squash court & round-the-clock armed security.",
    whatsappMessage: "Hello PDB Homes, I am interested in renting the 3-Bedroom Executive Apartment in Victoria Island (₦25M/year).",
  },
  {
    id: "ig-5",
    title: "Affordable Modern 4-Bedroom Semi-Detached Duplex",
    location: "Ajah / Sangotedo Enclave, Lagos",
    zone: "Ajah",
    category: "FOR_SALE",
    price: "₦95,000,000",
    beds: 4,
    baths: 4,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    caption: "Exceptional value in a secured gated community. Paved access roads, treated water plant, fitted kitchen, stamped concrete floor & verified C of O.",
    whatsappMessage: "Hello PDB Homes, I want to inspect the 4-Bedroom Semi-Detached Duplex in Ajah (₦95M) featured on your Instagram page.",
  },
  {
    id: "ig-6",
    title: "Newly Renovated 4-Bedroom Detached House with Massive Compound",
    location: "Ikeja GRA, Lagos Mainland",
    zone: "Mainland",
    category: "FOR_SALE",
    price: "₦380,000,000",
    beds: 4,
    baths: 4,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    caption: "Prime commercial or residential haven in serene Ikeja GRA. Parking for 8 vehicles, mature garden, solar backup inverter system & Federal C of O.",
    whatsappMessage: "Hello PDB Homes, I am inquiring about the 4-Bedroom Detached Property in Ikeja GRA (₦380M) shown on your Instagram showcase.",
  },
];

export function InstagramListingsCarousel() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const offset = direction === "left" ? -380 : 380;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Subtle Glow Background */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-amber/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-amber-500/20 border border-white/15 text-pink-300 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-pink-400" />
              <span>Instagram Spotlight & Reels</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white">
              Trending Properties on Our Instagram
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-2xl">
              Fresh listings across <strong>Mainland • Lekki • Ikoyi • VI • Ajah</strong>. From budget-friendly homes to luxury shortlets and waterfront estates.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://wa.link/ksxyrq"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg transition-colors"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp Inquiries</span>
            </a>

            <div className="flex items-center gap-2">
              <button
                onClick={() => scroll("left")}
                aria-label="Previous listing"
                className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center justify-center text-slate-200 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll("right")}
                aria-label="Next listing"
                className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center justify-center text-slate-200 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable Carousel Track */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-6 pt-2 scroll-smooth no-scrollbar snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {INSTAGRAM_LISTINGS.map((listing) => {
            const waUrl = `https://wa.link/ksxyrq?text=${encodeURIComponent(listing.whatsappMessage)}`;

            return (
              <div
                key={listing.id}
                className="w-[320px] sm:w-[360px] shrink-0 snap-start bg-slate-800/90 rounded-2xl overflow-hidden border border-slate-700/80 shadow-xl flex flex-col group hover:border-amber-400/50 transition-all duration-300"
              >
                {/* Instagram Header Bar */}
                <div className="px-4 py-3 flex items-center justify-between border-b border-slate-700/60 bg-slate-850">
                  <div className="flex items-center gap-2.5">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden p-0.5 bg-gradient-to-tr from-amber-400 to-pink-500">
                      <div className="relative w-full h-full rounded-full overflow-hidden bg-slate-900">
                        <Image
                          src="/pdb-logo.jpeg"
                          alt="PDB Homes"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col leading-tight">
                      <span className="text-xs font-bold text-white tracking-wide">pdbhomes</span>
                      <span className="text-[10px] text-slate-400 flex items-center gap-1">
                        <MapPin className="w-2.5 h-2.5 text-amber-400" />
                        {listing.zone}, Lagos
                      </span>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      listing.category === "SHORTLET"
                        ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                        : listing.category === "FOR_RENT"
                        ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                        : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                    }`}
                  >
                    {listing.category === "SHORTLET"
                      ? "Shortlet"
                      : listing.category === "FOR_RENT"
                      ? "For Rent"
                      : "For Sale"}
                  </span>
                </div>

                {/* Property Photo */}
                <div className="relative h-60 w-full overflow-hidden bg-slate-900">
                  <Image
                    src={listing.image}
                    alt={listing.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  
                  {/* Price Tag Overlay */}
                  <div className="absolute bottom-3 left-3 bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20">
                    <span className="text-sm font-extrabold text-amber-300">
                      {listing.price}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-bold text-white text-sm line-clamp-1 group-hover:text-amber-300 transition-colors">
                      {listing.title}
                    </h3>
                    <p className="text-xs text-slate-300 mt-1.5 line-clamp-2 leading-relaxed font-light">
                      {listing.caption}
                    </p>
                  </div>

                  {/* Specs */}
                  <div className="flex items-center gap-4 text-xs text-slate-400 py-1 border-t border-b border-slate-700/60">
                    <span className="flex items-center gap-1.5">
                      <Bed className="w-3.5 h-3.5 text-amber-400" />
                      {listing.beds} Beds
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Bath className="w-3.5 h-3.5 text-amber-400" />
                      {listing.baths} Baths
                    </span>
                    <span className="text-[11px] text-slate-400 ml-auto">
                      {listing.location}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="pt-1 flex items-center gap-2">
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors shadow-sm"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-white" />
                      <span>WhatsApp Book</span>
                    </a>
                    <Link
                      href="/request"
                      className="flex items-center justify-center py-2 px-3 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-semibold transition-colors"
                      title="Request similar home"
                    >
                      <span>Inquire</span>
                      <ArrowUpRight className="w-3.5 h-3.5 ml-1 text-amber-300" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* User Manual Upload Note / Admin Link */}
        <div className="mt-8 p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span>
              <strong>Direct Instagram Sync Note:</strong> You can drop specific Instagram post photos directly into the project&apos;s <code className="text-amber-300 bg-slate-900 px-1.5 py-0.5 rounded">public/instagram/</code> directory or upload new listings at any time through the Admin portal.
            </span>
          </div>
          <a
            href="https://wa.link/ksxyrq"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-400 hover:text-amber-300 font-semibold whitespace-nowrap flex items-center gap-1 transition-colors"
          >
            <span>Have a property to list? Send on WhatsApp</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}