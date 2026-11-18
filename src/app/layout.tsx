import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";

export const metadata: Metadata = {
  title: "PDB Homes | Your Trusted Real Estate Brand",
  description:
    "Your trusted real estate brand in Lagos, Nigeria. Specializing in Sales, Rentals, and Serviced Shortlets across Mainland, Lekki, Ikoyi, Victoria Island, and Ajah.",
  keywords: [
    "PDB Homes",
    "Real Estate Lagos",
    "Houses for sale Lekki",
    "Lekki Shortlets",
    "Ikoyi Apartments",
    "Victoria Island Rentals",
    "Ajah Properties for Sale",
    "Mainland Lagos Homes",
  ],
  icons: {
    icon: "/pdb-logo.jpeg",
    shortcut: "/pdb-logo.jpeg",
    apple: "/pdb-logo.jpeg",
  },
  openGraph: {
    title: "PDB Homes | Your Trusted Real Estate Brand",
    description:
      "Your trusted real estate brand in Lagos, Nigeria. Specializing in Sales, Rentals, and Serviced Shortlets across Mainland, Lekki, Ikoyi, Victoria Island, and Ajah.",
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
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased selection:bg-emerald-600 selection:text-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
