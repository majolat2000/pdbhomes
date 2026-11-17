"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Property } from "@/types";
import { PropertyCard } from "@/components/properties/PropertyCard";
import { ArrowRight, Video, MessageCircle, Play } from "lucide-react";

interface FeaturedSectionProps {
  properties: Property[];
}

interface VideoTour {
  id: string;
  src: string;
  poster: string;
  title: string;
  location: string;
  type: string;
  priceEstimate?: string;
  description: string;
}

const featuredVideos: VideoTour[] = [
  {
    id: "video-1",
    src: "/video1.mp4",
    poster: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
    title: "5-Bedroom Detached Duplex Walkthrough",
    location: "Lekki Phase 1, Lagos",
    type: "Detached Duplex",
    priceEstimate: "₦380,000,000",
    description: "Interior walkthrough showcasing double-volume living room, fitted kitchen, en-suite bedrooms, and private pool.",
  },
  {
    id: "video-2",
    src: "/video2.mp4",
    poster: "/apartment.jpeg",
    title: "Serviced Contemporary Residence",
    location: "Ikoyi / Victoria Island, Lagos",
    type: "Serviced Residence",
    priceEstimate: "For Sale & Rent",
    description: "Contemporary finishing, ample natural light, fitted sanitary wares, and 24/7 serviced compound facilities.",
  },
  {
    id: "video-3",
    src: "/video3.mp4",
    poster: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80",
    title: "Gated Family Estate Home",
    location: "Mainland & Ajah Enclaves, Lagos",
    type: "Family Home",
    priceEstimate: "Affordable to Luxury",
    description: "Spacious compound, verified title documentation, perimeter security, and serene residential surroundings.",
  },
];

function VideoCard({ vid }: { vid: VideoTour }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
      {/* Video / Poster Frame */}
      <div className="relative bg-slate-900 aspect-[9/13] max-h-[460px] overflow-hidden">
        {hasError ? (
          <div className="relative w-full h-full">
            <Image
              src={vid.poster}
              alt={vid.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-4 text-center">
              <span className="text-xs text-white bg-black/60 px-3 py-1.5 rounded-lg">
                Photo Preview Available
              </span>
            </div>
          </div>
        ) : (
          <>
            <video
              controls={isPlaying}
              playsInline
              preload="metadata"
              poster={vid.poster}
              onError={() => setHasError(true)}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              className="w-full h-full object-cover"
            >
              <source src={vid.src} type="video/mp4" />
            </video>

            {/* Play Button Overlay (hidden once user plays video) */}
            {!isPlaying && (
              <button
                type="button"
                onClick={(e) => {
                  const container = (e.currentTarget.parentElement?.querySelector("video") as HTMLVideoElement | null);
                  if (container) {
                    container.play().then(() => setIsPlaying(true)).catch(() => setHasError(true));
                  }
                }}
                className="absolute inset-0 bg-black/30 hover:bg-black/20 flex flex-col items-center justify-center gap-2 transition-colors group cursor-pointer"
                aria-label={`Play walkthrough video for ${vid.title}`}
              >
                <div className="w-14 h-14 rounded-full bg-emerald-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-emerald-500 transition-all">
                  <Play className="w-6 h-6 fill-white ml-1" />
                </div>
                <span className="text-xs font-semibold text-white tracking-wide bg-black/50 px-3 py-1 rounded-full backdrop-blur-xs">
                  Watch Video Tour
                </span>
              </button>
            )}
          </>
        )}

        {/* Location Tag */}
        <div className="absolute top-3 left-3 pointer-events-none">
          <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-brand-navy/85 text-white backdrop-blur-xs">
            {vid.type}
          </span>
        </div>
      </div>

      {/* Video Details & Actions */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-semibold text-emerald-700 uppercase tracking-wide">
              {vid.location}
            </span>
            {vid.priceEstimate && (
              <span className="font-bold text-slate-900">{vid.priceEstimate}</span>
            )}
          </div>
          <h4 className="text-base font-bold text-slate-900 font-display line-clamp-1 mb-1">
            {vid.title}
          </h4>
          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {vid.description}
          </p>
        </div>

        <div className="pt-2 border-t border-slate-100">
          <a
            href={`https://wa.link/ksxyrq?text=${encodeURIComponent(
              `Hello PDB Homes, I watched the video tour for "${vid.title}" (${vid.location}) on your website. I would like more information and inspection details.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors shadow-sm"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-white" />
            <span>Enquire on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export function FeaturedSection({ properties }: FeaturedSectionProps) {
  const featured = properties.filter((p) => p.isFeatured).slice(0, 6);
  const displayProperties = featured.length > 0 ? featured : properties.slice(0, 6);

  return (
    <section className="py-16 sm:py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold tracking-widest uppercase text-emerald-700 mb-1 block">
              Active Portfolio
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-navy tracking-tight font-display">
              Featured Properties &amp; Video Walkthroughs
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-2xl leading-relaxed">
              Take an interior video tour of selected properties or browse our active listings across Lekki, Ikoyi, Victoria Island, Ajah, and the Mainland.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <Link
              href="/properties"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-brand-navy hover:text-emerald-700 transition-colors"
            >
              <span>View All Properties</span>
              <ArrowRight className="w-4 h-4 text-emerald-600" />
            </Link>
          </div>
        </div>

        {/* Video Walkthroughs Grid */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Video className="w-3.5 h-3.5" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display">
                Property Video Tours
              </h3>
            </div>
            <a
              href="https://wa.link/ksxyrq?text=Hello%20PDB%20Homes%2C%20I%20would%20like%20to%20request%20more%20property%20video%20walkthroughs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
            >
              <span>Request more videos on WhatsApp</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredVideos.map((vid) => (
              <VideoCard key={vid.id} vid={vid} />
            ))}
          </div>
        </div>

        {/* Available Properties Grid */}
        {displayProperties.length > 0 && (
          <div className="pt-8 border-t border-slate-200">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-brand-navy font-display">
                  Available Properties
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Verified houses, apartments, shortlets, and lands with direct inspection availability.
                </p>
              </div>
              <Link
                href="/properties"
                className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:underline"
              >
                <span>Browse all {properties.length} listings</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {displayProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
