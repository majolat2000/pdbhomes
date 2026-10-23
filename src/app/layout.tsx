import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "PDB Homes | Luxury Real Estate & Trophy Estates",
  description:
    "Discover premier luxury estates, waterfront retreats, and architectural penthouses with PDB Homes. Schedule private viewings or get an instant home valuation.",
  keywords: [
    "PDB Homes",
    "Luxury Real Estate",
    "Beverly Hills Estates",
    "Manhattan Penthouses",
    "Miami Waterfront Homes",
    "Home Valuation",
  ],
  openGraph: {
    title: "PDB Homes | Luxury Real Estate",
    description: "Exceptional architecture. Unrivaled representation.",
    siteName: "PDB Homes",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased selection:bg-brand-amber selection:text-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
