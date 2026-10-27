"use client";

import React, { useState } from "react";
import { formatCurrency } from "@/lib/utils";
import {
  Calculator,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Award,
  Sparkles,
  Home,
  Check,
} from "lucide-react";

export default function ValuationPage() {
  const [step, setStep] = useState(1);

  // Property details
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("Ikoyi");
  const [state, setState] = useState("Lagos");
  const [postalCode, setPostalCode] = useState("");
  const [propertyType, setPropertyType] = useState("DETACHED_DUPLEX");
  const [bedrooms, setBedrooms] = useState("5");
  const [bathrooms, setBathrooms] = useState("5.5");
  const [squareFeet, setSquareFeet] = useState("5500");
  const [condition, setCondition] = useState<"EXCELLENT" | "UPDATED" | "ORIGINAL" | "NEEDS_WORK">("EXCELLENT");

  // Owner details
  const [ownerName, setOwnerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    estimatedMinValue: number;
    estimatedMaxValue: number;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/valuations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address,
          city,
          state,
          postalCode,
          propertyType,
          bedrooms: Number(bedrooms),
          bathrooms: Number(bathrooms),
          squareFeet: Number(squareFeet),
          condition,
          ownerName,
          email,
          phone,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to generate valuation report.");
      }

      setResult({
        estimatedMinValue: data.data.estimatedMinValue,
        estimatedMaxValue: data.data.estimatedMaxValue,
      });
      setStep(3); // Result Step
    } catch (err: any) {
      setError(err.message || "An error occurred while calculating valuation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 lg:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-brand-amber text-xs font-bold uppercase tracking-wider mb-4">
            <span>Seller Strategic Valuation Advisory</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy tracking-tight font-display">
            What Is Your Property Worth in Nigerian Naira?
          </h1>
          <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed">
            Get an instant institutional valuation estimate based on verified Land Registry transactions in Banana Island, Ikoyi, Victoria Island, Lekki, and Maitama Abuja.
          </p>
        </div>

        {/* Stepper Wizard Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-luxury max-w-3xl mx-auto">
          {/* Progress Indicators */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-6 mb-8 text-xs font-bold uppercase tracking-wider">
            <div className={`flex items-center gap-2 ${step >= 1 ? "text-brand-navy" : "text-slate-400"}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 1 ? "bg-brand-navy text-white" : "bg-slate-200 text-slate-600"}`}>
                1
              </div>
              <span>Property Specs</span>
            </div>
            <div className="w-12 h-0.5 bg-slate-200" />
            <div className={`flex items-center gap-2 ${step >= 2 ? "text-brand-navy" : "text-slate-400"}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 2 ? "bg-brand-navy text-white" : "bg-slate-200 text-slate-600"}`}>
                2
              </div>
              <span>Report Delivery</span>
            </div>
            <div className="w-12 h-0.5 bg-slate-200" />
            <div className={`flex items-center gap-2 ${step === 3 ? "text-brand-amber" : "text-slate-400"}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step === 3 ? "bg-brand-amber text-white" : "bg-slate-200 text-slate-600"}`}>
                3
              </div>
              <span>Valuation Report</span>
            </div>
          </div>

          {error && (
            <div className="p-4 mb-6 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
              {error}
            </div>
          )}

          {/* Step 1: Property Specifications */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h3 className="text-xl font-bold text-slate-900 font-display">
                Step 1: Tell Us About Your Residence
              </h3>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Street Address *
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. Plot 12, Admiralty Way, Lekki Phase 1"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-navy focus:ring-1 focus:ring-brand-navy"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    City
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-navy"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    State
                  </label>
                  <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-navy"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-navy"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Property Type
                  </label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:border-brand-navy"
                  >
                    <option value="ESTATE">Luxury Estate</option>
                    <option value="PENTHOUSE">Penthouse</option>
                    <option value="VILLA">Villa / Waterfront</option>
                    <option value="HOUSE">Single Family Home</option>
                    <option value="TOWNHOUSE">Townhouse</option>
                  </select>
                </div>
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
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Approx. Living Square Feet *
                  </label>
                  <input
                    type="number"
                    required
                    value={squareFeet}
                    onChange={(e) => setSquareFeet(e.target.value)}
                    placeholder="e.g. 5200"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-navy"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Estimated Condition
                  </label>
                  <select
                    value={condition}
                    onChange={(e) => setCondition(e.target.value as any)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:border-brand-navy"
                  >
                    <option value="EXCELLENT">Turn-Key / Pristine Architectural</option>
                    <option value="UPDATED">Recently Renovated</option>
                    <option value="ORIGINAL">Well-Maintained Original</option>
                    <option value="NEEDS_WORK">Ready for Full Custom Renovation</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    if (!address.trim()) {
                      setError("Please provide a property address.");
                      return;
                    }
                    setError(null);
                    setStep(2);
                  }}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-brand-navy hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all"
                >
                  <span>Continue to Step 2</span>
                  <ArrowRight className="w-4 h-4 text-amber-300" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Contact Information to Receive Report */}
          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in duration-300">
              <div>
                <h3 className="text-xl font-bold text-slate-900 font-display">
                  Step 2: Where Should We Send Your Detailed Valuation?
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  You will see your instant valuation range immediately on the next screen.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Full Name / Entity *
                </label>
                <input
                  type="text"
                  required
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  placeholder="Arthur Pendelton"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-navy"
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
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-navy"
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
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-navy"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs font-bold text-slate-500 hover:text-slate-800 uppercase tracking-wider"
                >
                  &larr; Back to Specs
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-brand-amber hover:bg-amber-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg transition-all disabled:opacity-50"
                >
                  <span>{loading ? "Calculating Market Data..." : "Generate Instant Valuation (NGN)"}</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-2">
                <ShieldCheck className="w-4 h-4 text-brand-amber" />
                <span>Strict non-disclosure. We never sell or share private client contact data.</span>
              </div>
            </form>
          )}

          {/* Step 3: Instant Valuation Report Results */}
          {step === 3 && result && (
            <div className="space-y-8 animate-in zoom-in-95 duration-400 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-bold tracking-widest uppercase text-brand-amber block mb-1">
                  Valuation Assessment for {address}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-navy font-display">
                  Estimated Current Market Value
                </h3>
              </div>

              {/* Valuation Band Pill */}
              <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 max-w-lg mx-auto shadow-sm">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy font-display mb-2">
                  {formatCurrency(result.estimatedMinValue)} – {formatCurrency(result.estimatedMaxValue)}
                </div>
                <p className="text-xs text-slate-500">
                  Confidence Score: High (94%) based on recent neighborhood comps and current luxury buyer liquidity.
                </p>
              </div>

              {/* Next Steps & CTA */}
              <div className="max-w-lg mx-auto space-y-4 text-left bg-white p-6 rounded-2xl border border-slate-100 shadow-sm text-xs text-slate-600">
                <h4 className="text-sm font-bold text-slate-900 font-display">
                  What Happens Next:
                </h4>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>A customized 14-page Comparative Market Analysis (CMA) has been queued for {email}.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>A Senior Managing Director from PDB Homes will review off-market comps for unique architectural premiums.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Optional confidential walkthrough to inspect bespoke upgrades and views.</span>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="tel:18005557324"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-brand-navy text-white text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-colors"
                >
                  Speak with a Listing Director Now
                </a>
                <button
                  onClick={() => {
                    setResult(null);
                    setStep(1);
                  }}
                  className="text-xs text-slate-500 hover:text-slate-800 font-bold"
                >
                  Value Another Residence
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Credibility Ribbon Below Wizard */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 text-center space-y-2">
            <TrendingUp className="w-6 h-6 text-brand-amber mx-auto" />
            <h4 className="text-sm font-bold text-slate-900 font-display">Micro-Targeted Pricing</h4>
            <p className="text-xs text-slate-500">We analyze hyper-local pricing trends down to the street and view corridor.</p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 text-center space-y-2">
            <Award className="w-6 h-6 text-brand-amber mx-auto" />
            <h4 className="text-sm font-bold text-slate-900 font-display">Verified Comparable Analysis</h4>
            <p className="text-xs text-slate-500">We benchmark against verified recent transactions across your specific enclave.</p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 text-center space-y-2">
            <ShieldCheck className="w-6 h-6 text-brand-amber mx-auto" />
            <h4 className="text-sm font-bold text-slate-900 font-display">Confidential Listing</h4>
            <p className="text-xs text-slate-500">Inquire about our private pocket listing program with zero public footprint.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
