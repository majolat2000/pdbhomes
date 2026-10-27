"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  ShieldCheck,
  MessageCircle,
  Calendar,
  ArrowRight,
} from "lucide-react";

export default function ContactPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [interest, setInterest] = useState("RENT");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadType: "CONTACT",
          firstName,
          lastName,
          email,
          phone,
          message: `[Interest: ${interest}] ${message}`,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to submit message.");
      }

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-bold tracking-widest uppercase text-brand-amber mb-2 block">
            Direct Communications
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy tracking-tight font-display">
            Contact PDB Homes
          </h1>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Get in touch with our team for inquiries, property viewings, verified sales, rentals, or shortlet bookings.
          </p>
        </div>

        {/* 2-Column: Form on Left, Direct Contact on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
          {/* Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-luxury">
            <h2 className="text-2xl font-bold text-brand-navy font-display mb-2">
              Send a Confidential Inquiry
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mb-8">
              Fill out your details below and a PDB Homes representative will reach out promptly.
            </p>

            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 font-display">
                  Message Received
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Thank you, {firstName}. Your inquiry has been routed to our team. You can also message us directly on WhatsApp for immediate follow-up.
                </p>
                <div className="pt-2 flex flex-wrap justify-center gap-3">
                  <a
                    href="https://wa.link/ksxyrq"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider hover:bg-emerald-500 transition-colors shadow-sm"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Chat on WhatsApp</span>
                  </a>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFirstName("");
                      setLastName("");
                      setEmail("");
                      setPhone("");
                      setMessage("");
                    }}
                    className="px-6 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider hover:bg-slate-200 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      First Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="e.g. Tunde"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-navy"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="e.g. Adeleke"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-navy"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tunde@example.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-navy"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      WhatsApp / Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+234 803 000 0000"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-navy"
                    />
                  </div>
                </div>

                {/* Primary Area of Interest tailored specifically for Nigeria */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Primary Area of Interest *
                  </label>
                  <select
                    value={interest}
                    onChange={(e) => setInterest(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:border-brand-navy"
                  >
                    <option value="RENT">Rent a Property (Apartment / Duplex / House)</option>
                    <option value="SHORTLET">Book a Serviced Shortlet</option>
                    <option value="BUY_LAND">Buy Land (Verified Title / C of O / Gazette)</option>
                    <option value="SELL_LAND">Sell Land</option>
                    <option value="BUY_PROPERTY">Buy Property (Detached Duplex / Terrace / Mansion)</option>
                    <option value="SELL_PROPERTY">Sell Property</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Your Message / Specific Requirements *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about the location you prefer (e.g. Lekki, Ikoyi, Mainland, Ajah), your budget, or specific house details..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-navy"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-brand-navy hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all disabled:opacity-50"
                >
                  <Send className="w-4 h-4 text-amber-300" />
                  <span>{submitting ? "Sending Inquiry..." : "Submit Confidential Inquiry"}</span>
                </button>

                <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-1 text-center">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-amber" />
                  <span>All inquiries are treated with strict confidentiality and prompt follow-up.</span>
                </div>
              </form>
            )}
          </div>

          {/* Direct Contact Sidebar */}
          <div className="lg:col-span-5 space-y-6">
            {/* Priority WhatsApp Card */}
            <div className="p-6 sm:p-7 rounded-3xl bg-emerald-700 text-white shadow-luxury space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-6 h-6 fill-white" />
                </div>
                <div>
                  <h4 className="font-bold text-lg font-display">Instant WhatsApp Desk</h4>
                  <p className="text-xs text-emerald-100">
                    Need instant answers, photos, or want to schedule a viewing?
                  </p>
                </div>
              </div>

              <p className="text-xs text-emerald-100 leading-relaxed">
                Connect directly with our real estate desk for instant response on active sales, rentals, and shortlets.
              </p>

              <a
                href="https://wa.link/ksxyrq"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white text-emerald-800 font-bold text-xs uppercase tracking-wider hover:bg-emerald-50 shadow-md transition-all active:scale-95"
              >
                <MessageCircle className="w-4 h-4 fill-emerald-800" />
                <span>Chat on WhatsApp Directly</span>
              </a>
            </div>

            {/* Book A Consultation Card */}
            <div className="p-6 rounded-3xl bg-amber-500/10 border border-amber-300/40 space-y-3">
              <div className="flex items-center gap-2 text-brand-amber text-xs font-bold uppercase tracking-wider">
                <Calendar className="w-4 h-4" />
                <span>One-on-One Advisory</span>
              </div>
              <h4 className="text-base font-bold text-brand-navy font-display">
                Looking for a Dedicated Consultation?
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Book a 1-on-1 strategy session for verified land acquisition, home purchase, or tenancy advisory (₦10,000 commitment fee).
              </p>
              <Link
                href="/consultation"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-navy hover:text-brand-amber transition-colors"
              >
                <span>Book a Consultation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Direct Contact Info */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card space-y-4">
              <h4 className="text-base font-bold text-brand-navy font-display border-b border-slate-100 pb-2">
                PDB Homes Contact Details
              </h4>

              <div className="space-y-3 text-xs text-slate-600">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-brand-amber shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-800 block">Coverage Enclaves</span>
                    <span>Mainland • Lekki • Ikoyi • VI • Ajah, Lagos State, Nigeria</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-brand-amber shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-800 block">Telephone & WhatsApp</span>
                    <span>+234 803 849 2100 | +234 1 849 2100</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-brand-amber shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-800 block">Official Email</span>
                    <span>info@pdbhomes.com</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-brand-amber shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-800 block">Working Hours</span>
                    <span>Monday &ndash; Saturday: 8:00 AM &ndash; 6:00 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}