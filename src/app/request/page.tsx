"use client";

import React, { useState } from "react";
import {
  Send,
  CheckCircle2,
  Building2,
  ShieldCheck,
  Home,
  MapPin,
  Calendar,
  ArrowRight,
  KeyRound,
} from "lucide-react";

export default function ClientPropertyRequestPage() {
  const [intent, setIntent] = useState<"BUY" | "RENT" | "SELL">("BUY");

  // Form states
  const [propertyType, setPropertyType] = useState("5-Bedroom Fully Detached Duplex");
  const [targetLocation, setTargetLocation] = useState("Lekki Phase 1");
  const [buyBudgetRange, setBuyBudgetRange] = useState("150m-350m");
  const [rentBudgetRange, setRentBudgetRange] = useState("3.5m-7m");
  const [sellingPrice, setSellingPrice] = useState("");
  const [bedrooms, setBedrooms] = useState("4");
  const [bathrooms, setBathrooms] = useState("4");
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
      if (buyBudgetRange === "under-50m") {
        budgetMax = 50000000;
      } else if (buyBudgetRange === "50m-150m") {
        budgetMin = 50000000;
        budgetMax = 150000000;
      } else if (buyBudgetRange === "150m-350m") {
        budgetMin = 150000000;
        budgetMax = 350000000;
      } else if (buyBudgetRange === "350m-750m") {
        budgetMin = 350000000;
        budgetMax = 750000000;
      } else if (buyBudgetRange === "750m-1.5b") {
        budgetMin = 750000000;
        budgetMax = 1500000000;
      } else if (buyBudgetRange === "1.5b+") {
        budgetMin = 1500000000;
      }
    } else if (intent === "RENT") {
      if (rentBudgetRange === "under-1.5m") {
        budgetMax = 1500000;
      } else if (rentBudgetRange === "1.5m-3.5m") {
        budgetMin = 1500000;
        budgetMax = 3500000;
      } else if (rentBudgetRange === "3.5m-7m") {
        budgetMin = 3500000;
        budgetMax = 7000000;
      } else if (rentBudgetRange === "7m-15m") {
        budgetMin = 7000000;
        budgetMax = 15000000;
      } else if (rentBudgetRange === "15m-30m") {
        budgetMin = 15000000;
        budgetMax = 30000000;
      } else if (rentBudgetRange === "30m+") {
        budgetMin = 30000000;
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
          bedrooms: Number(bedrooms) || 0,
          bathrooms: Number(bathrooms) || 0,
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
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-4">
            <KeyRound className="w-3.5 h-3.5 text-emerald-600" />
            <span>Client Property Mandate</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy tracking-tight font-display">
            Find Your Ideal Nigerian Property
          </h1>
          <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed">
            Whether you are looking to rent a self-con or serviced flat, buy a duplex, purchase verified land, or list your property, our team handles your mandate with speed and discretion across Lagos and beyond.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-luxury">
          {/* Intent Switcher Tabs: BUY, RENT, SELL */}
          <div className="grid grid-cols-3 gap-2 bg-slate-100 p-1.5 rounded-2xl mb-8">
            <button
              type="button"
              onClick={() => setIntent("BUY")}
              className={`py-3 px-2 text-xs sm:text-sm font-bold rounded-xl transition-all text-center ${
                intent === "BUY"
                  ? "bg-brand-navy text-white shadow-md"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Buy Houses / Lands
            </button>
            <button
              type="button"
              onClick={() => setIntent("RENT")}
              className={`py-3 px-2 text-xs sm:text-sm font-bold rounded-xl transition-all text-center ${
                intent === "RENT"
                  ? "bg-emerald-700 text-white shadow-md"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Rent Enquiries
            </button>
            <button
              type="button"
              onClick={() => setIntent("SELL")}
              className={`py-3 px-2 text-xs sm:text-sm font-bold rounded-xl transition-all text-center ${
                intent === "SELL"
                  ? "bg-brand-navy text-white shadow-md"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Sell House / Land
            </button>
          </div>

          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 font-display">
                Mandate Received Successfully
              </h3>
              <p className="text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
                Thank you, <strong>{clientName}</strong>. Your {intent === "BUY" ? "acquisition" : intent === "RENT" ? "rental inquiry" : "listing"} requirements for <strong>{targetLocation}</strong> have been submitted to our desk. Our team will contact you directly via {phone} or {email}.
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
                      Property Type (Nigerian Categories) *
                    </label>
                    <select
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:border-emerald-600"
                    >
                      <optgroup label="Apartments & Flats">
                        <option value="Self-Con (Self-Contained Room)">Self-Con (Self-Contained Room)</option>
                        <option value="Mini Flat (1 Bedroom Apartment)">Mini Flat (1 Bedroom Apartment)</option>
                        <option value="2-Bedroom Apartment / Flat">2-Bedroom Apartment / Flat</option>
                        <option value="3-Bedroom Apartment / Flat">3-Bedroom Apartment / Flat</option>
                        <option value="Serviced Shortlet Studio / Flat">Serviced Shortlet Studio / Flat</option>
                      </optgroup>
                      <optgroup label="Houses & Duplexes">
                        <option value="4-Bedroom Terrace Duplex">4-Bedroom Terrace Duplex</option>
                        <option value="5-Bedroom Fully Detached Duplex">5-Bedroom Fully Detached Duplex</option>
                        <option value="Semi-Detached Duplex">Semi-Detached Duplex</option>
                        <option value="Luxury Waterfront Mansion">Luxury Waterfront Mansion</option>
                      </optgroup>
                      <optgroup label="Lands & Commercial">
                        <option value="Lands for Sale (Plots / Acres / Gazette)">Lands for Sale (Plots / Acres / Gazette)</option>
                        <option value="Commercial Land / Development Plot">Commercial Land / Development Plot</option>
                        <option value="Commercial Property / Office Space">Commercial Property / Office Space</option>
                      </optgroup>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Target Location (Mainland, Lekki, Ikoyi, VI, Ajah) *
                    </label>
                    <input
                      type="text"
                      required
                      value={targetLocation}
                      onChange={(e) => setTargetLocation(e.target.value)}
                      placeholder="e.g. Lekki Phase 1, Yaba, Ikeja GRA, Ikoyi, Ajah"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                </div>

                {/* Conditional Budget Fields based on Intent */}
                {intent === "BUY" && (
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Acquisition Budget Range (NGN)
                    </label>
                    <select
                      value={buyBudgetRange}
                      onChange={(e) => setBuyBudgetRange(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:border-emerald-600"
                    >
                      <option value="under-50m">Under ₦50 Million</option>
                      <option value="50m-150m">₦50 Million – ₦150 Million</option>
                      <option value="150m-350m">₦150 Million – ₦350 Million</option>
                      <option value="350m-750m">₦350 Million – ₦750 Million</option>
                      <option value="750m-1.5b">₦750 Million – ₦1.5 Billion</option>
                      <option value="1.5b+">₦1.5 Billion+ (Luxury Mansions & Estates)</option>
                    </select>
                  </div>
                )}

                {intent === "RENT" && (
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Annual Rental Budget (NGN / Year)
                    </label>
                    <select
                      value={rentBudgetRange}
                      onChange={(e) => setRentBudgetRange(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:border-emerald-600"
                    >
                      <option value="under-1.5m">Under ₦1.5 Million / year (Budget Friendly / Self-Con)</option>
                      <option value="1.5m-3.5m">₦1.5 Million – ₦3.5 Million / year (Mini Flat & Standard)</option>
                      <option value="3.5m-7m">₦3.5 Million – ₦7 Million / year (Modern 2/3 Bed)</option>
                      <option value="7m-15m">₦7 Million – ₦15 Million / year (Serviced Prime Lekki/VI)</option>
                      <option value="15m-30m">₦15 Million – ₦30 Million / year (Luxury Duplex / Ikoyi)</option>
                      <option value="30m+">₦30 Million+ / year (Executive Diplomatic)</option>
                    </select>
                  </div>
                )}

                {intent === "SELL" && (
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Asking / Selling Price in Naira (NGN)
                    </label>
                    <input
                      type="number"
                      required
                      value={sellingPrice}
                      onChange={(e) => setSellingPrice(e.target.value)}
                      placeholder="e.g. 180000000 (for ₦180 Million)"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-emerald-600"
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
                      min="0"
                      value={bedrooms}
                      onChange={(e) => setBedrooms(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Bathrooms
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={bathrooms}
                      onChange={(e) => setBathrooms(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Target Timeline
                    </label>
                    <select
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:border-emerald-600"
                    >
                      <option value="Immediate (Within 1-2 Weeks)">Immediate (Within 1-2 Weeks)</option>
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
                    placeholder="e.g. 24/7 power supply, treated water, Governor's consent, clean title, compound space, flood-free location..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-emerald-600"
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
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Babatunde Adeleke"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-emerald-600"
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
                      placeholder="name@example.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-emerald-600"
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
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-brand-navy hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider shadow-lg transition-all disabled:opacity-50 active:scale-[0.99]"
              >
                <Send className="w-4 h-4 text-emerald-400" />
                <span>
                  {submitting
                    ? "Submitting Your Mandate..."
                    : intent === "BUY"
                    ? "Submit Acquisition Request"
                    : intent === "RENT"
                    ? "Submit Rental Inquiry"
                    : "Submit Property for Listing Review"}
                </span>
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified client data protection & prompt advisor response.</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}