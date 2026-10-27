"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Phone, Menu, X, ArrowUpRight } from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/properties", label: "Properties" },
    { href: "/properties?listingStatus=SHORTLET", label: "Shortlets" },
    { href: "/consultation", label: "Book Consultation" },
    { href: "/request", label: "Buy / Sell / Rent" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 glass-header transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo with actual pdb logo.jpeg */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 rounded-xl overflow-hidden shadow-sm border border-slate-200 bg-white p-0.5 group-hover:border-brand-amber transition-colors duration-300 shrink-0">
              <Image
                src="/pdb-logo.jpeg"
                alt="PDB Homes Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-brand-navy font-display">
                PDB <span className="text-brand-amber font-light">HOMES</span>
              </span>
              <span className="text-[10px] tracking-wider uppercase text-slate-500 font-semibold">
                Sales &bull; Rentals &bull; Shortlets
              </span>
            </div>
          </Link>

          {/* Desktop Navigation (No admin link visible) */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xs lg:text-sm font-medium transition-colors hover:text-brand-amber ${
                    isActive ? "text-brand-amber font-semibold" : "text-slate-600"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* WhatsApp & CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="https://wa.link/ksxyrq"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold text-white bg-[#25D366] hover:bg-[#20ba59] transition-all shadow-sm hover:scale-105 active:scale-95"
              title="Chat with us on WhatsApp"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12.031 2C6.5 2 2 6.5 2 12.031c0 1.969.57 3.844 1.64 5.438L2.016 22l4.672-1.594A10.02 10.02 0 0012.03 22c5.532 0 10.032-4.5 10.032-10.031S17.563 2 12.031 2zm0 18.281c-1.75 0-3.406-.5-4.812-1.406l-.344-.219-2.781.953.953-2.703-.234-.375a8.217 8.217 0 01-1.375-4.5c0-4.563 3.719-8.281 8.281-8.281 4.563 0 8.281 3.718 8.281 8.281 0 4.563-3.718 8.25-8.281 8.25zm4.844-6.172c-.266-.14-.578-.297-1.578-.797-.203-.094-.359-.14-.516.14-.156.281-.609.797-.75.953-.14.156-.281.172-.547.031-.266-.14-1.125-.422-2.14-1.328-.797-.703-1.328-1.578-1.485-1.844-.156-.266-.015-.406.125-.547.125-.125.281-.328.422-.484.14-.172.188-.281.281-.469.094-.188.047-.359-.031-.5-.078-.14-.516-1.25-.719-1.703-.187-.453-.39-.39-.531-.39-.14 0-.313-.016-.485-.016-.172 0-.453.063-.687.328-.235.266-.907.89-.907 2.172s.938 2.516 1.063 2.688c.14.172 1.844 2.828 4.469 3.969.625.265 1.109.437 1.484.562.625.203 1.203.172 1.656.109.516-.078 1.578-.64 1.797-1.265.234-.625.234-1.156.172-1.266-.063-.109-.234-.172-.5-.312z" />
              </svg>
              <span>WhatsApp</span>
            </a>

            <Link
              href="/request"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold tracking-wide uppercase bg-brand-navy text-white hover:bg-slate-800 transition-all shadow-sm hover:shadow"
            >
              <span>Property Request</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-amber-300" />
            </Link>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href="https://wa.link/ksxyrq"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-[#25D366] text-white"
              aria-label="WhatsApp"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12.031 2C6.5 2 2 6.5 2 12.031c0 1.969.57 3.844 1.64 5.438L2.016 22l4.672-1.594A10.02 10.02 0 0012.03 22c5.532 0 10.032-4.5 10.032-10.031S17.563 2 12.031 2zm0 18.281c-1.75 0-3.406-.5-4.812-1.406l-.344-.219-2.781.953.953-2.703-.234-.375a8.217 8.217 0 01-1.375-4.5c0-4.563 3.719-8.281 8.281-8.281 4.563 0 8.281 3.718 8.281 8.281 0 4.563-3.718 8.25-8.281 8.25zm4.844-6.172c-.266-.14-.578-.297-1.578-.797-.203-.094-.359-.14-.516.14-.156.281-.609.797-.75.953-.14.156-.281.172-.547.031-.266-.14-1.125-.422-2.14-1.328-.797-.703-1.328-1.578-1.485-1.844-.156-.266-.015-.406.125-.547.125-.125.281-.328.422-.484.14-.172.188-.281.281-.469.094-.188.047-.359-.031-.5-.078-.14-.516-1.25-.719-1.703-.187-.453-.39-.39-.531-.39-.14 0-.313-.016-.485-.016-.172 0-.453.063-.687.328-.235.266-.907.89-.907 2.172s.938 2.516 1.063 2.688c.14.172 1.844 2.828 4.469 3.969.625.265 1.109.437 1.484.562.625.203 1.203.172 1.656.109.516-.078 1.578-.64 1.797-1.265.234-.625.234-1.156.172-1.266-.063-.109-.234-.172-.5-.312z" />
              </svg>
            </a>
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
              href="https://wa.link/ksxyrq"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold text-white bg-[#25D366]"
            >
              <span>Chat on WhatsApp</span>
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
