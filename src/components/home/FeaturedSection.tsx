import React from "react";
import Link from "next/link";
import { Property } from "@/types";
import { PropertyCard } from "@/components/properties/PropertyCard";
import { ArrowRight, Video, MessageCircle, UserCheck } from "lucide-react";

interface FeaturedSectionProps {
  properties: Property[];
}

const featuredVideos = [
  {
    id: "video-1",
    src: "/video1.mp4",
    title: "Lekki Luxury Duplex Walkthrough",
    location: "Lekki Phase 1, Lagos",
    tag: "Exclusive Video Tour",
    description: "Detailed interior walkthrough showcasing high-end finishes, modern architecture, and spacious living chambers.",
  },
  {
    id: "video-2",
    src: "/video2.mp4",
    title: "Executive Residence & Contemporary Finishes",
    location: "Ikoyi / Victoria Island",
    tag: "Prime Acquisition",
    description: "High ceilings, premium sanitary wares, contemporary lighting, and verified governor's consent documentation.",
  },
  {
    id: "video-3",
    src: "/video3.mp4",
    title: "Modern Family Estate & Serviced Compound",
    location: "Mainland & Ajah Enclaves",
    tag: "Verified Listing",
    description: "Private compound space, top-tier security, 24/7 power readiness, and serene residential neighborhood.",
  },
];

export function FeaturedSection({ properties }: FeaturedSectionProps) {
  const featured = properties.filter((p) => p.isFeatured).slice(0, 6);

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
              <span>Exclusive Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight font-display">
              Featured Nigerian Trophy Estates
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-xl">
              Hand-selected listings & live video walkthroughs across Mainland, Lekki, Ikoyi, Victoria Island, and Ajah.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/request"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 hover:underline"
            >
              <span>Submit Buy/Sell Request</span>
            </Link>
            <Link
              href="/properties"
              className="inline-flex items-center gap-2 text-sm font-bold text-brand-navy hover:text-emerald-700 transition-colors group self-start md:self-auto"
            >
              <span>All Properties</span>
              <ArrowRight className="w-4 h-4 text-emerald-700 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Featured Video Tours Grid */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Video className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-brand-navy font-display">
                  Live Video Walkthroughs
                </h3>
                <p className="text-xs text-slate-500">
                  Real interior tours from our active Nigerian listings
                </p>
              </div>
            </div>
            <a
              href="https://wa.link/ksxyrq"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800"
            >
              <span>Request More Video Tours on WhatsApp</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {featuredVideos.map((vid) => (
              <div
                key={vid.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-luxury hover:shadow-luxury-lg transition-all flex flex-col justify-between group"
              >
                {/* Video Player */}
                <div className="relative bg-black rounded-t-3xl overflow-hidden aspect-[9/14] sm:aspect-[9/13] max-h-[480px]">
                  <video
                    controls
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover"
                  >
                    <source src={vid.src} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <div className="absolute top-3 left-3 pointer-events-none">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-brand-navy/90 text-white backdrop-blur-md shadow-sm border border-white/20">
                      {vid.tag}
                    </span>
                  </div>
                </div>

                {/* Video Info & WhatsApp CTA */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wider block mb-1">
                      {vid.location}
                    </span>
                    <h4 className="text-base font-bold text-brand-navy font-display line-clamp-1 mb-1.5">
                      {vid.title}
                    </h4>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {vid.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                    <a
                      href={`https://wa.link/ksxyrq?text=${encodeURIComponent(
                        `Hello PDB Homes, I watched the video tour for "${vid.title}" (${vid.location}) on your website. I would like more information, pricing, and inspection details.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm active:scale-95"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-white" />
                      <span>Inquire on WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Admin Listed Properties (if any added) */}
        {featured.length > 0 && (
          <div className="pt-6 border-t border-slate-200">
            <h3 className="text-xl font-bold text-brand-navy font-display mb-6">
              Curated Property Listings
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featured.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
