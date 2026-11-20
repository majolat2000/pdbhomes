"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Clock, ArrowRight, MessageCircle } from "lucide-react";
import { InstagramIcon } from "@/components/common/InstagramIcon";

export function Footer() {
  const [subscribed, setSubscribed] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);
  const [subscriptionMessage, setSubscriptionMessage] = useState("");

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes("@")) return;

    setSubscribing(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newsletterEmail, source: "Footer Property Alerts" }),
      });
      const data = await res.json();
      if (data.success) {
        setSubscribed(true);
        setSubscriptionMessage(data.message || "Thank you! We will keep you updated on new listings.");
      }
    } catch (err) {
      console.error(err);
      setSubscribed(true);
      setSubscriptionMessage("Thank you! We will keep you updated on new listings.");
    } finally {
      setSubscribing(false);
    }
  };

  return (
    <footer className="bg-brand-navy text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-white/10 p-0.5 border border-white/20 shrink-0">
                <Image
                  src="/pdb-logo.jpeg"
                  alt="PDB Homes Logo"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-white font-display">
                  PDB <span className="text-emerald-400 font-light">HOMES</span>
                </span>
                <span className="text-[10px] tracking-wider uppercase text-emerald-400 font-medium">
                  Sales &bull; Rentals &bull; Shortlets
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              Helping individuals, families, and businesses find verified properties across Lagos. Whether buying, renting, or booking a shortlet, we prioritize honest guidance and clean documentation.
            </p>

            <div className="pt-2 flex flex-col gap-2.5 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Lekki &bull; Ikoyi &bull; VI &bull; Ajah &bull; Lagos Mainland, Nigeria</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-emerald-400 shrink-0" />
                <a
                  href="tel:+2348181017260"
                  className="hover:text-emerald-400 transition-colors font-medium text-slate-300"
                  title="Call PDB Homes"
                >
                  +2348181017260
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href="mailto:info@pdbhomes.com.ng"
                  className="hover:text-emerald-400 transition-colors font-medium text-slate-300"
                  title="Email PDB Homes"
                >
                  info@pdbhomes.com.ng
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Mon &ndash; Sat: 8:00 AM &ndash; 6:00 PM</span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-2.5">
              <a
                href="https://wa.link/ksxyrq"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Chat on WhatsApp</span>
              </a>
              <a
                href="https://instagram.com/pdb_homes"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:opacity-95 text-white text-xs font-semibold transition-opacity shadow-sm"
              >
                <InstagramIcon className="w-4 h-4 text-white" />
                <span>Follow on Instagram</span>
              </a>
            </div>
          </div>

          {/* Properties Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-sans">
              Properties
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/properties?listingStatus=FOR_SALE" className="hover:text-white transition-colors">
                  Houses for Sale
                </Link>
              </li>
              <li>
                <Link href="/properties?listingStatus=FOR_RENT" className="hover:text-white transition-colors">
                  Flats &amp; Rentals
                </Link>
              </li>
              <li>
                <Link href="/properties?listingStatus=SHORTLET" className="hover:text-white transition-colors">
                  Serviced Shortlets
                </Link>
              </li>
              <li>
                <Link href="/properties?propertyType=LAND" className="hover:text-white transition-colors">
                  Lands for Sale
                </Link>
              </li>
              <li>
                <Link href="/request" className="hover:text-white transition-colors">
                  Submit Property Request
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Areas */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-sans">
              Company
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About PDB Homes
                </Link>
              </li>
              <li>
                <Link href="/consultation" className="hover:text-white transition-colors">
                  Book a Consultation
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/properties?location=Lekki" className="hover:text-white transition-colors">
                  Lekki Properties
                </Link>
              </li>
              <li>
                <Link href="/properties?location=Mainland" className="hover:text-white transition-colors">
                  Mainland Properties
                </Link>
              </li>
            </ul>
          </div>

          {/* Property Alerts */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-sans">
              Get Property Alerts
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Receive updates when new verified properties and shortlets become available in your preferred area.
            </p>
            {subscribed ? (
              <div className="p-3 bg-slate-800 border border-emerald-500/30 rounded-lg text-xs text-emerald-300">
                {subscriptionMessage || "Thank you! We will keep you updated on new listings."}
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-3.5 py-2 rounded-lg bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                />
                <button
                  type="submit"
                  disabled={subscribing}
                  className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold uppercase tracking-wider transition-colors disabled:opacity-60"
                >
                  <span>{subscribing ? "Subscribing..." : "Subscribe"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Disclosures */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            PDB Homes &bull; Sales, Rentals &amp; Serviced Shortlets in Lagos, Nigeria
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span>Since 2024, PDB Homes. All rights reserved.</span>
            <span>&bull;</span>
            <span>
              Developed by{" "}
              <a
                href="https://majolat2000.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-emerald-400 transition-colors font-medium hover:underline underline-offset-2"
              >
                Majesty
              </a>{" "}
              ↗
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
