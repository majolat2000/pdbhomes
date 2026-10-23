import React from "react";
import Image from "next/image";
import { Star, Quote } from "lucide-react";

export function Testimonials() {
  const reviews = [
    {
      name: "Arthur & Evelyn Pendelton",
      role: "Sellers — Bel Air Promontory",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      content:
        "Victoria and the PDB Homes team orchestrated a discreet, competitive bidding process that resulted in an all-cash sale above asking within 14 days. Their market depth is simply unmatched.",
      rating: 5,
    },
    {
      name: "Jonathan Vance-Holloway",
      role: "Buyer — TriBeCa Duplex Penthouse",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      content:
        "Marcus negotiated our Manhattan acquisition with surgical precision. PDB Homes gave us access to off-market inventory that never surfaced publicly. Truly white-glove advisory.",
      rating: 5,
    },
    {
      name: "Sophia Rodriguez-Kahn",
      role: "Buyer & Seller — Venetian Islands, Miami",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
      content:
        "From the architectural photography to the private yacht tour previews, Elena presented our waterfront villa like an art piece. We will never transact without PDB Homes.",
      rating: 5,
    },
  ];

  return (
    <section className="py-24 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest uppercase text-brand-amber mb-2 block">
            Client Experiences
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight font-display">
            Trusted by Leaders & Visionaries
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Read what our clients say about our bespoke advisory and white-glove transaction process.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-8 border border-slate-200 shadow-card flex flex-col justify-between hover:shadow-luxury transition-all duration-300 relative"
            >
              <div>
                {/* Star rating */}
                <div className="flex items-center gap-1 mb-4 text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-sm text-slate-700 leading-relaxed italic mb-6">
                  &ldquo;{rev.content}&rdquo;
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-slate-200 shrink-0">
                  <Image
                    src={rev.avatar}
                    alt={rev.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 font-display">
                    {rev.name}
                  </h4>
                  <p className="text-xs text-slate-500 font-medium">
                    {rev.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
