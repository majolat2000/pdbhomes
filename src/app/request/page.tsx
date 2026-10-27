"use client";

import React, { useState } from "react";
import { formatCurrency } from "@/lib/utils";
import {
  Send,
  CheckCircle2,
  Building2,
  ShieldCheck,
  Home,
  DollarSign,
  MapPin,
  Calendar,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export default function ClientPropertyRequestPage() {
  const [intent, setIntent] = useState<"BUY" | "SELL">("BUY");

  // Form states
  const [propertyType, setPropertyType] = useState("5-Bedroom Fully Detached Duplex");
  const [targetLocation, setTargetLocation] = useState("Ikoyi / Banana Island");
  const [budgetRange, setBudgetRange] = useState("500m-1b");
  const [sellingPrice, setSellingPrice] = useState("");
  const [bedrooms, setBedrooms] = useState("5");
  const [bathrooms, setBathrooms] = useState("5.5");
  const [timeline, setTimeline] = useState("Within 1-3 Months");
  const [additionalNotes, setAdditionalNotes] = useState("");

  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    let budgetMin: number | undefined;
    let budgetMax: number | undefined;

    if (intent === "BUY") {
      if (budgetRange === "200m-500m") {
        budgetMin = 200000000;
        budgetMax = 500000000;
      } else if (budgetRange === "500m-1b") {
        budgetMin = 500000000;
        budgetMax = 1000000000;
      } else if (budgetRange === "1b-2.5b") {
        budgetMin = 1000000000;
        budgetMax = 2500000000;
      } else if (budgetRange === "2.5b+") {
        budgetMin = 2500000000;
      }
    }

    try {
      const res = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requestIntent: intent,
          propertyType,
          targetLocation,
          budgetMin,
          budgetMax,
          sellingPrice: sellingPrice ? Number(sellingPrice) : undefined,
          bedrooms: Number(bedrooms),
          bathrooms: Number(bathrooms),
          additionalNotes,
          clientName,
          email,
          phone,
          preferredTimeline: timeline,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to submit request.");
      }

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 lg:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-brand-amber text-xs font-bold uppercase tracking-wider mb-4">
            <span>Bespoke Property Mandate</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy tracking-tight font-display">
            Tell Us What You Want to Buy or Sell
          </h1>
          <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed">
            Whether you are looking to acquire a trophy residence in Banana Island or discretely list your estate in Maitama, our senior partners match off-market inventory with qualified capital.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-luxury">
          {/* Intent Switcher Tabs */}
          <div className="flex rounded-2xl bg-slate-100 p-1.5 mb-8">
            <button
              type="button"
              onClick={() => setIntent("BUY")}
              className={`flex-1 py-3 text-xs sm:text-sm font-bold rounded-xl transition-all ${
                intent === "BUY"
                  ? "bg-brand-navy text-white shadow-md"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              I Want to Buy a Home
            </button>
            <button
              type="button"
              onClick={() => setIntent("SELL")}
              className={`flex-1 py-3 text-xs sm:text-sm font-bold rounded-xl transition-all ${
                intent === "SELL"
                  ? "bg-brand-navy text-white shadow-md"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              I Want to Sell a Property
            </button>
          </div>

          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 font-display">
                Mandate Received Confidentially
              </h3>
              <p className="text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
                Thank you, <strong>{clientName}</strong>. Your {intent === "BUY" ? "acquisition" : "listing"} requirements for <strong>{targetLocation}</strong> have been submitted to our private desk. An estate partner will contact you directly via {phone} or {email}.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 rounded-xl bg-brand-navy text-white text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-colors mt-4"
              >
                Submit Another Mandate
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
                  {error}
                </div>
              )}

              {/* Step A: Property Specifications */}
              <div className="space-y-4">
                <h3 className="text-base font-bold text-brand-navy font-display border-b border-slate-100 pb-2">
                  1. Property Specifications
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Property Type
                    </label>
                    <select
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:border-brand-navy"
                    >
                      <option value="5-Bedroom Fully Detached Duplex">5-Bedroom Fully Detached Duplex</option>
                      <option value="Waterfront Luxury Mansion">Waterfront Luxury Mansion</option>
                      <option value="Executive Sky Penthouse">Executive Sky Penthouse</option>
                      <option value="4-Bedroom Terrace Duplex">4-Bedroom Terrace Duplex</option>
                      <option value="Diplomatic Palatial Compound">Diplomatic Palatial Compound</option>
                      <option value="Luxury Serviced Apartment">Luxury Serviced Apartment</option>
                      <option value="Commercial Land / Development Plot">Commercial Land / Development Plot</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Target Location (Nigeria) *
                    </label>
                    <input
                      type="text"
                      required
                      value={targetLocation}
                      onChange={(e) => setTargetLocation(e.target.value)}
                      placeholder="e.g. Banana Island, Ikoyi, Lekki Phase 1, Maitama"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-navy"
                    />
                  </div>
                </div>

                {intent === "BUY" ? (
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Acquisition Budget Range (NGN)
                    </label>
                    <select
                      value={budgetRange}
                      onChange={(e) => setBudgetRange(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:border-brand-navy"
                    >
                      <option value="200m-500m">₦200 Million – ₦500 Million</option>
                      <option value="500m-1b">₦500 Million – ₦1 Billion</option>
                      <option value="1b-2.5b">₦1 Billion – ₦2.5 Billion</option>
                      <option value="2.5b+">₦2.5 Billion+ (Trophy Estates)</option>
                    </select>
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Asking / Selling Price in Naira (NGN)
                    </label>
                    <input
                      type="number"
                      required
                      value={sellingPrice}
                      onChange={(e) => setSellingPrice(e.target.value)}
                      placeholder="e.g. 850000000 (for ₦850 Million)"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-navy"
                    />
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Bedrooms
                    </label>
                    <input
                      type="number"
                      value={bedrooms}
                      onChange={(e) => setBedrooms(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-navy"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Bathrooms
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      value={bathrooms}
                      onChange={(e) => setBathrooms(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-navy"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Target Timeline
                    </label>
                    <select
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:border-brand-navy"
                    >
                      <option value="Immediate (Within 30 Days)">Immediate (Within 30 Days)</option>
                      <option value="Within 1-3 Months">Within 1-3 Months</option>
                      <option value="3-6 Months">3-6 Months</option>
                      <option value="Exploring Options">Exploring Options</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Special Features / Specific Requirements (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    placeholder="e.g. Waterfront with private boat jetty, Governor's consent, clean title, minimum 1000sqm compound..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-navy"
                  />
                </div>
              </div>

              {/* Step B: Client Contact Information */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h3 className="text-base font-bold text-brand-navy font-display border-b border-slate-100 pb-2">
                  2. Your Contact Information
                </h3>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Full Name / Representative *
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Chief Alaba Adeleke"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-navy"
                  />
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
                      placeholder="client@domain.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-navy"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Phone Number (WhatsApp Preferred) *
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
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-brand-navy hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider shadow-lg transition-all disabled:opacity-50"
              >
                <Send className="w-4 h-4 text-amber-300" />
                <span>
                  {submitting
                    ? "Routing to Private Client Desk..."
                    : intent === "BUY"
                    ? "Submit Acquisition Request"
                    : "Submit Property for Listing Review"}
                </span>
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-amber" />
                <span>Strict non-disclosure. We uphold private banking level confidentiality.</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
