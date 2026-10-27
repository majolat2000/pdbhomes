"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, Phone, Menu, X, ArrowUpRight } from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/properties", label: "Properties" },
    { href: "/request", label: "Buy / Sell Mandate" },
    { href: "/valuation", label: "Home Valuation" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 glass-header transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-brand-navy flex items-center justify-center text-white shadow-md group-hover:bg-brand-amber transition-colors duration-300">
              <Building2 className="w-5 h-5 text-amber-300" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-brand-navy font-display">
                PDB <span className="text-brand-amber font-light">HOMES</span>
              </span>
              <span className="text-[10px] tracking-widest uppercase text-slate-500 font-medium">
                Luxury Real Estate Nigeria
              </span>
            </div>
          </Link>

          {/* Desktop Navigation (No admin link visible per instruction) */}
          <nav className="hidden md:flex items-center space-x-7">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-brand-amber ${
                    isActive ? "text-brand-amber font-semibold" : "text-slate-600"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Direct Phone & CTA */}
          <div className="hidden lg:flex items-center gap-5">
            <a
              href="tel:+2348038492100"
              className="flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-brand-navy transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                <Phone className="w-3.5 h-3.5" />
              </div>
              <span>+234 803 849 2100</span>
            </a>

            <Link
              href="/request"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-semibold tracking-wide uppercase bg-brand-navy text-white hover:bg-slate-800 transition-all shadow-sm hover:shadow"
            >
              <span>Property Request</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-amber-300" />
            </Link>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-2 rounded-md text-slate-700 hover:text-brand-navy hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-md text-base font-medium text-slate-800 hover:bg-slate-50 hover:text-brand-amber transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
            <a
              href="tel:+2348038492100"
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600"
            >
              <Phone className="w-4 h-4 text-brand-amber" />
              <span>+234 803 849 2100</span>
            </a>
            <Link
              href="/request"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 rounded-lg text-sm font-semibold tracking-wide uppercase bg-brand-navy text-white hover:bg-slate-800 transition-colors"
            >
              Submit Property Request
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
