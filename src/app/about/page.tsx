import React from "react";
import Image from "next/image";
import Link from "next/link";
import { agents } from "@/lib/data/agents";
import { Building2, Award, ShieldCheck, Mail, Phone, ArrowUpRight, Sparkles } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-brand-amber text-xs font-bold uppercase tracking-wider mb-4">
            <span>The Advisory</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-brand-navy tracking-tight font-display mb-6">
            Architectural Stewardship. Proven Discretion.
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-light">
            Founded on the principle that exceptional Nigerian homes require bespoke representation, PDB Homes connects discerning buyers, diaspora leaders, and institutional investors with the nation&apos;s most distinctive properties.
          </p>
        </div>

        {/* Narrative & Visual Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-luxury">
            <Image
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
              alt="PDB Homes luxury interior"
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-6">
            <span className="text-xs font-bold tracking-widest uppercase text-brand-amber block">
              Our Philosophy
            </span>
            <h2 className="text-3xl font-extrabold text-brand-navy font-display">
              We Don&apos;t Just Sell Real Estate. We Curate Living Works of Art.
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Every home has an architectural soul. From lagoon waterfront mansions in Banana Island to grand pre-war residences in Old Ikoyi, contemporary estates in Lekki Phase 1, and palatial diplomatic hillside villas in Maitama Abuja, we approach each assignment with curatorial reverence.
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Our partners bring institutional financial acumen, deep localized intelligence across Nigerian state land registries, and an unmatched private client network connecting Nigeria with London, Dubai, New York, and Toronto.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-slate-200">
              <div>
                <span className="text-3xl font-extrabold text-brand-navy font-display block">
                  ₦45B+
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  Cumulative Career Transacted Volume
                </span>
              </div>
              <div>
                <span className="text-3xl font-extrabold text-brand-navy font-display block">
                  100%
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  Client Confidentiality
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Leadership & Agent Team Bios */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest uppercase text-brand-amber mb-2 block">
              Leadership Team
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight font-display">
              Meet Our Senior Advisory
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base">
              Industry leaders, trusted negotiators, and masters of the luxury market.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {agents.map((agent) => (
              <div
                key={agent.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-card hover:shadow-luxury transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[4/5] bg-slate-100 overflow-hidden">
                    <Image
                      src={agent.avatarUrl}
                      alt={agent.name}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-slate-900 font-display">
                      {agent.name}
                    </h3>
                    <p className="text-xs font-semibold text-brand-amber mt-0.5">
                      {agent.title}
                    </p>
                    <span className="text-[11px] text-slate-400 block mb-3 font-mono">
                      {agent.licenseNumber}
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {agent.bio}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between text-xs font-semibold text-brand-navy">
                  <a
                    href={`tel:${agent.phone}`}
                    className="flex items-center gap-1.5 hover:text-brand-amber transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-brand-amber" />
                    <span>Call</span>
                  </a>
                  <a
                    href={`mailto:${agent.email}`}
                    className="flex items-center gap-1.5 hover:text-brand-amber transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-brand-amber" />
                    <span>Email</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <div className="rounded-3xl bg-brand-navy text-white p-10 sm:p-14 text-center max-w-4xl mx-auto shadow-2xl space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display">
            Ready to Discuss Your Next Acquisition or Sale?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto font-light">
            Connect directly with our senior managing partners for confidential consultations.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://wa.link/ksxyrq"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-lg"
            >
              Chat on WhatsApp
            </a>
            <Link
              href="/contact"
              className="px-8 py-3.5 rounded-xl bg-brand-amber hover:bg-amber-600 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-lg"
            >
              Contact Our Office
            </Link>
            <Link
              href="/properties"
              className="px-8 py-3.5 rounded-xl border border-white/30 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider transition-colors"
            >
              Explore Portfolio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
