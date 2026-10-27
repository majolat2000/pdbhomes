import React from "react";
import { getProperties } from "@/lib/db";
import { HeroSearch } from "@/components/home/HeroSearch";
import { FeaturedSection } from "@/components/home/FeaturedSection";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { ValuationBanner } from "@/components/home/ValuationBanner";
import { Testimonials } from "@/components/home/Testimonials";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const properties = await getProperties();

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero with Dynamic Search */}
      <HeroSearch />

      {/* 2. Featured Portfolio Carousel / Grid */}
      <FeaturedSection properties={properties} />

      {/* 3. Valuation Lead Capture Banner for Sellers */}
      <ValuationBanner />

      {/* 4. Why Choose Us / Proven Track Record */}
      <WhyChooseUs />

      {/* 5. Client Testimonials */}
      <Testimonials />
    </div>
  );
}
