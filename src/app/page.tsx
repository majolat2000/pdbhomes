import React from "react";
import { getProperties } from "@/lib/db";
import { HeroSearch } from "@/components/home/HeroSearch";
import { FeaturedSection } from "@/components/home/FeaturedSection";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { ValuationBanner } from "@/components/home/ValuationBanner";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const properties = await getProperties();

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero with Dynamic Search */}
      <HeroSearch />

      {/* 2. Featured Portfolio (Listings posted and approved by Admin) */}
      <FeaturedSection properties={properties} />

      {/* 3. Book A Consultation (₦10,000 Commitment Session) */}
      <ValuationBanner />

      {/* 4. Why Choose Us / Service Pillars */}
      <WhyChooseUs />
    </div>
  );
}
