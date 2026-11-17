"use client";

import React, { useState } from "react";
import { formatCurrency } from "@/lib/utils";
import { Calculator, CheckCircle2 } from "lucide-react";

interface PaymentEstimatorProps {
  initialPrice: number;
  isRental?: boolean;
}

export function MortgageCalculator({ initialPrice, isRental = false }: PaymentEstimatorProps) {
  const [purchasePlan, setPurchasePlan] = useState<"OUTRIGHT" | "INSTALLMENT">("OUTRIGHT");
  const [initialDepositPct, setInitialDepositPct] = useState(30);
  const [installmentMonths, setInstallmentMonths] = useState(6);

  // Closing cost percentages standard in Nigerian real estate
  const legalDocumentationFee = initialPrice * 0.05; // 5%
  const agencyCommissionFee = initialPrice * 0.05; // 5%
  const totalClosingCosts = legalDocumentationFee + agencyCommissionFee;
  const totalAcquisitionBudget = initialPrice + totalClosingCosts;

  // Installment calculations
  const depositAmount = (initialPrice * initialDepositPct) / 100;
  const remainingBalance = initialPrice - depositAmount;
  const monthlyInstallment = remainingBalance / installmentMonths;

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 pb-4 border-b border-slate-100 gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
            <Calculator className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 font-display">
              Payment &amp; Closing Cost Guide
            </h3>
            <p className="text-xs text-slate-500">
              Estimated acquisition breakdown for Nigerian property purchases
            </p>
          </div>
        </div>

        <div className="text-left sm:text-right">
          <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-semibold">
            Estimated Total Outlay
          </span>
          <span className="text-lg sm:text-xl font-extrabold text-brand-navy">
            {formatCurrency(totalAcquisitionBudget)}
          </span>
        </div>
      </div>

      {/* Plan Toggle */}
      <div className="flex rounded-lg bg-slate-100 p-1 mb-5 max-w-xs">
        <button
          type="button"
          onClick={() => setPurchasePlan("OUTRIGHT")}
          className={`flex-1 py-1.5 px-3 rounded-md text-xs font-semibold transition-colors ${
            purchasePlan === "OUTRIGHT" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
          }`}
        >
          Outright Purchase
        </button>
        <button
          type="button"
          onClick={() => setPurchasePlan("INSTALLMENT")}
          className={`flex-1 py-1.5 px-3 rounded-md text-xs font-semibold transition-colors ${
            purchasePlan === "INSTALLMENT" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
          }`}
        >
          Installment Schedule
        </button>
      </div>

      {purchasePlan === "OUTRIGHT" ? (
        <div className="space-y-3 text-xs sm:text-sm">
          <div className="flex justify-between py-2 border-b border-slate-100 text-slate-700">
            <span>Agreed Purchase Price:</span>
            <span className="font-bold text-slate-900">{formatCurrency(initialPrice)}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-100 text-slate-600">
            <span>Legal &amp; Deed of Assignment (5%):</span>
            <span className="font-medium text-slate-800">{formatCurrency(legalDocumentationFee)}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-100 text-slate-600">
            <span>Agency &amp; Brokerage Fee (5%):</span>
            <span className="font-medium text-slate-800">{formatCurrency(agencyCommissionFee)}</span>
          </div>
          <div className="flex justify-between pt-2 text-brand-navy font-bold text-sm sm:text-base">
            <span>Estimated Total Required:</span>
            <span>{formatCurrency(totalAcquisitionBudget)}</span>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
                Initial Deposit ({initialDepositPct}%)
              </label>
              <select
                value={initialDepositPct}
                onChange={(e) => setInitialDepositPct(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 bg-white"
              >
                <option value={20}>20% Initial Deposit</option>
                <option value={30}>30% Initial Deposit</option>
                <option value={40}>40% Initial Deposit</option>
                <option value={50}>50% Initial Deposit</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
                Spread Over
              </label>
              <select
                value={installmentMonths}
                onChange={(e) => setInstallmentMonths(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 bg-white"
              >
                <option value={3}>3 Months</option>
                <option value={6}>6 Months</option>
                <option value={12}>12 Months</option>
              </select>
            </div>
          </div>

          <div className="space-y-2 text-xs sm:text-sm pt-2 border-t border-slate-100">
            <div className="flex justify-between text-slate-700">
              <span>Initial Commitment Deposit:</span>
              <span className="font-bold text-emerald-700">{formatCurrency(depositAmount)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Monthly Payment ({installmentMonths} installments):</span>
              <span className="font-semibold text-slate-900">{formatCurrency(monthlyInstallment)} / month</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Documentation &amp; Agency at Closing (10%):</span>
              <span className="font-medium text-slate-800">{formatCurrency(totalClosingCosts)}</span>
            </div>
          </div>
        </div>
      )}

      <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center gap-1.5">
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
        <span>Actual payment schedules can be tailored directly with the owner or developer during inspection.</span>
      </div>
    </div>
  );
}
