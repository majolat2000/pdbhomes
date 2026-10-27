import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";

export const metadata: Metadata = {
  title: "PDB Homes | Nigerian Luxury Real Estate & Trophy Estates",
  description:
    "Discover premier luxury estates, lagoon waterfronts, and penthouses across Banana Island, Ikoyi, Victoria Island, Lekki, and Maitama Abuja with PDB Homes.",
  keywords: [
    "PDB Homes",
    "Luxury Real Estate Nigeria",
    "Banana Island Mansions",
    "Ikoyi Luxury Apartments",
    "Lekki Phase 1 Waterfront Duplex",
    "Maitama Abuja Real Estate",
    "Property Valuation Nigeria",
  ],
  openGraph: {
    title: "PDB Homes | Nigeria Luxury Real Estate",
    description: "Exceptional architecture. Unrivaled Nigerian representation.",
    siteName: "PDB Homes",
    locale: "en_NG",
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
        <WhatsAppButton />
      </body>
    </html>
  );
}
