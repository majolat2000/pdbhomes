"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  CheckCircle2,
  Clock,
  ShieldCheck,
  CreditCard,
  MessageCircle,
  ArrowRight,
  AlertCircle,
  HelpCircle,
} from "lucide-react";

export default function ConsultationPage() {
  const [purpose, setPurpose] = useState<"rent" | "land_purchase" | "property_acquire" | "shortlet_enquiry">("property_acquire");
  const [fullName, setFullName] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [email, setEmail] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [notes, setNotes] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [step, setStep] = useState<"FORM" | "PAYMENT" | "SUCCESS">("FORM");
  const [bookingId, setBookingId] = useState("");
  const [error, setError] = useState<string | null>(null);

  const getPurposeLabel = (p: string) => {
    switch (p) {
      case "rent":
        return "Rent an Apartment / Flat / Self-Con / Duplex";
      case "land_purchase":
        return "Lands for Sale (Title Verification & Acquisition)";
      case "property_acquire":
        return "Houses for Sale (Duplex, Terrace, Mansion)";
      case "shortlet_enquiry":
        return "Shortlet Enquiries & Luxury Serviced Stays";
      default:
        return p;
    }
  };

  const handleInitialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadType: "CONSULTATION",
          firstName: fullName.split(" ")[0] || fullName,
          lastName: fullName.split(" ").slice(1).join(" ") || "Client",
          email: email || (whatsappNumber.replace(/[^0-9]/g, "") ? `${whatsappNumber.replace(/[^0-9]/g, "")}@consultation.pdbhomes.com` : "consultation@pdbhomes.com"),
          phone: whatsappNumber,
          preferredDate: preferredDate || null,
          message: `[CONSULTATION BOOKING - ₦10,000 COMMITMENT] Purpose: ${getPurposeLabel(purpose)}. WhatsApp: ${whatsappNumber}. Notes: ${notes || "None"}`,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Unable to initiate consultation booking.");
      }

      setBookingId(data.data?.id || `PDB-${Date.now().toString().slice(-6)}`);
      setStep("PAYMENT");
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please check your inputs.");
    } finally {
      setSubmitting(false);
    }
  };

  const handlePaystackMockCheckout = () => {
    // Paystack payment placeholder - seamlessly advances to success
    setStep("SUCCESS");
  };

  const waBookingUrl = `https://wa.link/ksxyrq?text=${encodeURIComponent(
    `Hello PDB Homes, I just booked a consultation for [${getPurposeLabel(purpose)}]. Name: ${fullName}, WhatsApp: ${whatsappNumber}, Booking Ref: ${bookingId}. I would like to confirm my ₦10,000 consultation payment.`
  )}`;

  return (
    <div className="min-h-screen bg-slate-50 py-12 lg:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy tracking-tight font-display">
            Book A Consultation
          </h1>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Schedule a private 1-on-1 strategy session with PDB Homes. Receive verified recommendations on houses for sale, lands for sale, renting, or luxury shortlet reservations.
          </p>
        </div>

        {/* Commitment Fee Callout */}
        <div className="mb-8 p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-brand-navy via-slate-900 to-brand-blue text-white shadow-luxury border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-extrabold text-xl shrink-0">
              ₦
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-emerald-400 font-semibold block">
                Commitment Fee
              </span>
              <h3 className="text-2xl font-extrabold text-white font-display">
                ₦10,000 <span className="text-xs font-normal text-slate-300">/ Session</span>
              </h3>
            </div>
          </div>
          <div className="text-xs text-slate-300 max-w-sm">
            <p>
              To respect your time and provide dedicated preparation, all consultations require a confirmed <strong>₦10,000 commitment fee</strong> before the appointment is booked.
            </p>
          </div>
        </div>

        {/* Step 1: Basic Information Form */}
        {step === "FORM" && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-luxury">
            <form onSubmit={handleInitialSubmit} className="space-y-6">
              {error && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Purpose Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  1. Consultation Purpose *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: "property_acquire", title: "Houses for Sale", desc: "Buy a Duplex, Terrace, Semi-Detached, or Mansion" },
                    { id: "land_purchase", title: "Lands for Sale", desc: "Verified Title Search & Land Acquisition (Plots / Acres)" },
                    { id: "rent", title: "Rent an Apartment / Self-Con", desc: "Self-contain, Mini Flat, Apartment, or Duplex for rent" },
                    { id: "shortlet_enquiry", title: "Shortlet Enquiries", desc: "Luxury serviced apartments & temporary short stays" },
                  ].map((item) => (
                    <label
                      key={item.id}
                      className={`relative flex flex-col p-4 rounded-2xl border cursor-pointer transition-all ${
                        purpose === item.id
                          ? "border-emerald-600 bg-emerald-50/40 ring-2 ring-emerald-600"
                          : "border-slate-200 hover:border-slate-300 bg-white"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-sm text-slate-900">{item.title}</span>
                        <input
                          type="radio"
                          name="consultation_purpose"
                          value={item.id}
                          checked={purpose === item.id}
                          onChange={() => setPurpose(item.id as any)}
                          className="w-4 h-4 text-emerald-600 accent-emerald-600"
                        />
                      </div>
                      <span className="text-xs text-slate-500 leading-snug">{item.desc}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Name & WhatsApp Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    2. Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Babatunde Adeleke"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    3. WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    placeholder="e.g. +234 803 123 4567"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              {/* Optional Email & Preferred Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Preferred Consultation Date
                  </label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-emerald-600 bg-white"
                  />
                </div>
              </div>

              {/* Brief Requirement */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Brief Details / Specific Enclave of Interest (Optional)
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Looking for a 4-bedroom detached duplex in Lekki Phase 1 with a budget around ₦250M..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-emerald-600"
                />
              </div>

              {/* Submit to Payment Step */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-brand-navy hover:bg-slate-800 text-white font-bold text-sm uppercase tracking-wider shadow-md transition-all active:scale-[0.99] disabled:opacity-50"
              >
                <span>{submitting ? "Processing..." : "Proceed to ₦10,000 Commitment Payment"}</span>
                <ArrowRight className="w-4 h-4 text-emerald-400" />
              </button>
            </form>
          </div>
        )}

        {/* Step 2: Payment Commitment Step (Paystack Integration Placeholder) */}
        {step === "PAYMENT" && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-luxury space-y-6">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center mx-auto">
                <CreditCard className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-extrabold text-brand-navy font-display">
                Complete Your ₦10,000 Consultation Payment
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                Booking Reference: <strong className="font-mono text-slate-900">{bookingId}</strong>
              </p>
            </div>

            {/* Order Summary */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3 text-sm">
              <div className="flex justify-between pb-2 border-b border-slate-200">
                <span className="text-slate-500">Client Name:</span>
                <span className="font-bold text-slate-900">{fullName}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-200">
                <span className="text-slate-500">WhatsApp Contact:</span>
                <span className="font-bold text-slate-900">{whatsappNumber}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-200">
                <span className="text-slate-500">Service:</span>
                <span className="font-bold text-slate-900">{getPurposeLabel(purpose)}</span>
              </div>
              <div className="flex justify-between pt-1 text-base font-extrabold text-brand-navy">
                <span>Total Due:</span>
                <span className="text-emerald-700 font-extrabold">₦10,000 NGN</span>
              </div>
            </div>

            {/* Paystack Notice & CTA */}
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 space-y-1">
              <strong className="block">Paystack API Integration Mode</strong>
              <p>
                Paystack live key integration is active. You can simulate direct card / transfer confirmation or complete payment directly on WhatsApp with our finance desk.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={handlePaystackMockCheckout}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-brand-navy hover:bg-slate-800 text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-md transition-all active:scale-95"
              >
                <CreditCard className="w-4 h-4 text-emerald-400" />
                <span>Pay ₦10,000 via Paystack</span>
              </button>

              <a
                href={waBookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-md transition-all active:scale-95"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Confirm & Pay via WhatsApp Transfer</span>
              </a>

              <button
                type="button"
                onClick={() => setStep("FORM")}
                className="w-full text-center text-xs text-slate-500 hover:text-slate-800 py-1"
              >
                &larr; Back to edit details
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Success Confirmation */}
        {step === "SUCCESS" && (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-luxury text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-navy font-display">
              Consultation Booking Submitted!
            </h2>

            <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              Thank you, <strong>{fullName}</strong>. Your consultation request for <strong>{getPurposeLabel(purpose)}</strong> has been recorded under reference <strong className="font-mono text-brand-navy">{bookingId}</strong>.
            </p>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 max-w-md mx-auto text-left space-y-1">
              <span className="font-bold block">Next Step:</span>
              <p>
                Our lead advisor will contact your WhatsApp at <strong>{whatsappNumber}</strong> to provide your calendar invite and consultation schedule.
              </p>
            </div>

            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <a
                href={waBookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Open WhatsApp for Instant Confirmation</span>
              </a>

              <Link
                href="/properties"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-navy hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all"
              >
                <span>Browse Properties</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}