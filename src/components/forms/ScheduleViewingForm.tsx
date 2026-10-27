"use client";

import React, { useState } from "react";
import { Calendar, Clock, CheckCircle, Send, ShieldCheck } from "lucide-react";

interface ScheduleViewingFormProps {
  propertyId: string;
  propertyTitle: string;
  agentId: string;
  agentName: string;
}

export function ScheduleViewingForm({
  propertyId,
  propertyTitle,
  agentId,
  agentName,
}: ScheduleViewingFormProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("Morning (9AM - 12PM)");
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
          propertyId,
          agentId,
          leadType: "SCHEDULE_VIEWING",
          firstName,
          lastName,
          email,
          phone,
          preferredDate,
          preferredTime,
          message: message || `Requesting private preview for ${propertyTitle}`,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to schedule viewing.");
      }

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-3">
        <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
          <CheckCircle className="w-6 h-6" />
        </div>
        <h4 className="text-base font-bold text-emerald-950 font-display">
          Private Viewing Requested
        </h4>
        <p className="text-xs text-emerald-800 leading-relaxed">
          Thank you, {firstName}. {agentName} has received your appointment request for <strong>{propertyTitle}</strong> and will reach out via phone or email within 2 business hours.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="text-xs text-emerald-700 underline font-semibold mt-2 inline-block hover:text-emerald-900"
        >
          Submit another inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
            First Name *
          </label>
          <input
            type="text"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Victoria"
            className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-brand-navy focus:ring-1 focus:ring-brand-navy"
          />
        </div>
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
            Last Name *
          </label>
          <input
            type="text"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Sterling"
            className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-brand-navy focus:ring-1 focus:ring-brand-navy"
          />
        </div>
      </div>

      <div>
        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
          Email Address *
        </label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="client@domain.com"
          className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-brand-navy focus:ring-1 focus:ring-brand-navy"
        />
      </div>

      <div>
        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
          Phone Number *
        </label>
        <input
          type="tel"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+234 803 000 0000"
          className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-brand-navy focus:ring-1 focus:ring-brand-navy"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
            Preferred Date
          </label>
          <div className="relative flex items-center">
            <Calendar className="w-3.5 h-3.5 text-brand-amber absolute left-2.5 pointer-events-none" />
            <input
              type="date"
              value={preferredDate}
              onChange={(e) => setPreferredDate(e.target.value)}
              className="w-full pl-8 pr-2 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-brand-navy"
            />
          </div>
        </div>
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
            Time Slot
          </label>
          <div className="relative flex items-center">
            <Clock className="w-3.5 h-3.5 text-brand-amber absolute left-2.5 pointer-events-none" />
            <select
              value={preferredTime}
              onChange={(e) => setPreferredTime(e.target.value)}
              className="w-full pl-8 pr-2 py-2 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-brand-navy"
            >
              <option value="Morning (9AM - 12PM)">Morning</option>
              <option value="Afternoon (12PM - 4PM)">Afternoon</option>
              <option value="Evening (4PM - 7PM)">Evening</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
          Notes / Special Requests (Optional)
        </label>
        <textarea
          rows={2}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Interested in private walkthrough or virtual tour..."
          className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-brand-navy focus:ring-1 focus:ring-brand-navy"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-brand-navy hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all disabled:opacity-50"
      >
        <Send className="w-3.5 h-3.5 text-amber-300" />
        <span>{submitting ? "Booking Appointment..." : "Request Private Viewing"}</span>
      </button>

      <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 text-center">
        <ShieldCheck className="w-3 h-3 text-brand-amber" />
        <span>Strict privacy protection. No unsolicited communications.</span>
      </div>
    </form>
  );
}
