"use client";

import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Building2,
  ShieldCheck,
  Globe,
  Share2,
  MessageCircle,
} from "lucide-react";

export default function ContactPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [interest, setInterest] = useState("BUYING");
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

  const offices = [
    {
      city: "Lagos Flagship Advisory",
      address: "Plot 14, Admiralty Way, Lekki Phase 1",
      region: "Lagos State, Nigeria",
      phone: "+234 803 849 2100",
      email: "lagos@pdbhomes.com",
    },
    {
      city: "Ikoyi Private Client Suite",
      address: "Alfred Rewane Road (Kingsway), Old Ikoyi",
      region: "Ikoyi, Lagos, Nigeria",
      phone: "+234 802 691 8830",
      email: "ikoyi@pdbhomes.com",
    },
    {
      city: "Abuja Diplomatic Gallery",
      address: "Gana Street Enclave, Maitama",
      region: "Abuja FCT, Nigeria",
      phone: "+234 805 512 7800",
      email: "abuja@pdbhomes.com",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest uppercase text-brand-amber mb-2 block">
            Direct Communications
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-brand-navy tracking-tight font-display">
            Contact PDB Homes
          </h1>
          <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed">
            Our private client advisors are available 7 days a week for confidential acquisition reviews, listing evaluations, and private appointments.
          </p>
        </div>

        {/* 2-Column: Form on Left, Offices on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          {/* Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-luxury">
            <h2 className="text-2xl font-bold text-brand-navy font-display mb-2">
              Send a Confidential Inquiry
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mb-8">
              Complete the form below and an estate director will reply within two hours.
            </p>

            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 font-display">
                  Message Dispatched
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Thank you, {firstName}. Your inquiry has been routed to our senior team. We look forward to connecting with you.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl bg-brand-navy text-white text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-colors"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
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
                      placeholder="Jonathan"
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
                      placeholder="Vance"
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
                      placeholder="jonathan@domain.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-navy"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Phone Number *
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

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Primary Area of Interest
                  </label>
                  <select
                    value={interest}
                    onChange={(e) => setInterest(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:border-brand-navy"
                  >
                    <option value="BUYING">Acquisition / Purchasing Nigerian Luxury Estate</option>
                    <option value="SELLING">Listing / Selling an Estate (Ikoyi / Lekki / Abuja)</option>
                    <option value="VALUATION">Confidential Title & Portfolio Valuation</option>
                    <option value="LEASING">Executive Long-Term Corporate Lease</option>
                    <option value="DIASPORA">Diaspora Investment & Advisory Desk</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Your Message / Specific Requirements
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about desired markets, timing, or properties of interest..."
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
                  <span>We treat all discussions with strict fiduciary non-disclosure.</span>
                </div>
              </form>
            )}
          </div>

          {/* Office Directory & Info */}
          <div className="lg:col-span-5 space-y-6">
            {/* WhatsApp Priority Card */}
            <div className="p-6 rounded-2xl bg-emerald-700 text-white shadow-card flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-6 h-6 fill-white" />
                </div>
                <div>
                  <h4 className="font-bold text-base">Instant WhatsApp Desk</h4>
                  <p className="text-xs text-emerald-100">
                    Need instant answers or want to book an inspection? Chat directly with our team.
                  </p>
                </div>
              </div>
              <a
                href="https://wa.link/ksxyrq"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-white text-emerald-800 font-bold text-xs uppercase tracking-wider hover:bg-emerald-50 shadow-md shrink-0 transition-colors"
              >
                Chat on WhatsApp
              </a>
            </div>

            <h3 className="text-xl font-bold text-brand-navy font-display mb-4">
              Regional Flagships
            </h3>

            {offices.map((off, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-card space-y-2 hover:shadow-luxury transition-all"
              >
                <div className="flex items-center gap-2 text-brand-amber text-xs font-bold uppercase tracking-wider">
                  <Building2 className="w-4 h-4" />
                  <span>{off.city}</span>
                </div>
                <div className="text-sm font-semibold text-slate-900">{off.address}</div>
                <div className="text-xs text-slate-500">{off.region}</div>
                <div className="pt-2 flex flex-col gap-1 text-xs text-slate-600 border-t border-slate-100 mt-2">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-brand-amber" />
                    <span>{off.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-brand-amber" />
                    <span>{off.email}</span>
                  </div>
                </div>
              </div>
            ))}

            {/* Operating Hours & Social */}
            <div className="bg-brand-navy text-white rounded-2xl p-6 shadow-card space-y-4">
              <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
                <Clock className="w-4 h-4" />
                <span>Advisory Hours</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Monday &ndash; Friday: 8:00 AM &ndash; 7:00 PM EST <br />
                Saturday &ndash; Sunday: 10:00 AM &ndash; 5:00 PM EST <br />
                <em>Private on-call representation available 24/7 for active escrow clients.</em>
              </p>

              <div className="pt-2 border-t border-slate-800 flex items-center gap-4 text-slate-400">
                <span className="text-xs uppercase tracking-wider font-semibold">Connect:</span>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-amber-300 transition-colors" title="Instagram">
                  <Globe className="w-4 h-4" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-amber-300 transition-colors" title="LinkedIn">
                  <Share2 className="w-4 h-4" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-amber-300 transition-colors" title="Twitter / X">
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
