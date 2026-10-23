"use client";

import React, { useState } from "react";
import { formatCurrency } from "@/lib/utils";
import { Calculator, DollarSign, Percent, Calendar } from "lucide-react";

interface MortgageCalculatorProps {
  initialPrice: number;
}

export function MortgageCalculator({ initialPrice }: MortgageCalculatorProps) {
  const [price, setPrice] = useState(initialPrice);
  const [downPaymentPct, setDownPaymentPct] = useState(20);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTermYears, setLoanTermYears] = useState(30);

  const downPaymentAmount = (price * downPaymentPct) / 100;
  const loanAmount = price - downPaymentAmount;

  // Monthly interest calculation
  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = loanTermYears * 12;

  let monthlyPrincipalAndInterest = 0;
  if (monthlyRate > 0) {
    monthlyPrincipalAndInterest =
      (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1);
  }

  // Estimated Property taxes (1.1% annually) and Insurance (0.35% annually)
  const monthlyPropertyTaxes = (price * 0.011) / 12;
  const monthlyHomeInsurance = (price * 0.0035) / 12;
  const totalMonthlyPayment =
    monthlyPrincipalAndInterest + monthlyPropertyTaxes + monthlyHomeInsurance;

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-card">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-50 text-brand-amber flex items-center justify-center">
            <Calculator className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 font-display">
              Payment & Financing Estimator
            </h3>
            <p className="text-xs text-slate-500">
              Estimate your monthly investment breakdown
            </p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-xs text-slate-400 block">Est. Monthly Payment</span>
          <span className="text-xl sm:text-2xl font-extrabold text-brand-navy">
            {formatCurrency(totalMonthlyPayment)}
            <span className="text-xs font-normal text-slate-500">/mo</span>
          </span>
        </div>
      </div>

      {/* Visual Breakdown Bar */}
      <div className="mb-6 space-y-2">
        <div className="h-3 rounded-full bg-slate-100 overflow-hidden flex">
          <div
            style={{
              width: `${(monthlyPrincipalAndInterest / totalMonthlyPayment) * 100}%`,
            }}
            className="bg-brand-navy h-full transition-all duration-300"
            title="Principal & Interest"
          />
          <div
            style={{
              width: `${(monthlyPropertyTaxes / totalMonthlyPayment) * 100}%`,
            }}
            className="bg-brand-amber h-full transition-all duration-300"
            title="Property Taxes"
          />
          <div
            style={{
              width: `${(monthlyHomeInsurance / totalMonthlyPayment) * 100}%`,
            }}
            className="bg-emerald-500 h-full transition-all duration-300"
            title="Home Insurance"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between text-xs text-slate-600 pt-1">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-brand-navy" />
            <span>P&I: {formatCurrency(monthlyPrincipalAndInterest)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-brand-amber" />
            <span>Taxes: {formatCurrency(monthlyPropertyTaxes)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span>Insurance: {formatCurrency(monthlyHomeInsurance)}</span>
          </div>
        </div>
      </div>

      {/* Form Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
            Home Price ($)
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-brand-navy"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
            Down Payment ({downPaymentPct}%)
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={downPaymentPct}
              onChange={(e) => setDownPaymentPct(Number(e.target.value))}
              className="w-20 px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-brand-navy"
            />
            <div className="flex-1 px-3 py-2 text-xs bg-slate-50 rounded-lg border border-slate-200 text-slate-600 flex items-center">
              {formatCurrency(downPaymentAmount)}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
            Interest Rate (%)
          </label>
          <input
            type="number"
            step="0.1"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-brand-navy"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
            Loan Term
          </label>
          <select
            value={loanTermYears}
            onChange={(e) => setLoanTermYears(Number(e.target.value))}
            className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-brand-navy"
          >
            <option value={30}>30-Year Fixed</option>
            <option value={15}>15-Year Fixed</option>
            <option value={10}>10-Year ARM</option>
          </select>
        </div>
      </div>
    </div>
  );
}
