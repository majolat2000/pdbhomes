import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";

export const metadata: Metadata = {
  title: "PDB Homes | Sales, Rentals & Serviced Shortlets in Lagos",
  description:
    "Find verified properties, houses for sale, annual rentals, and serviced shortlets across Lekki, Ikoyi, Victoria Island, Ajah, and Lagos Mainland with PDB Homes.",
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
    title: "PDB Homes | Sales, Rentals & Serviced Shortlets in Lagos",
    description:
      "Find verified properties, houses for sale, annual rentals, and serviced shortlets across Lekki, Ikoyi, Victoria Island, Ajah, and Lagos Mainland with PDB Homes.",
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
