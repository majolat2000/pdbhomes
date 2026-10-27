import React from "react";
import { getProperties } from "@/lib/db";
import { HeroSearch } from "@/components/home/HeroSearch";
import { FeaturedSection } from "@/components/home/FeaturedSection";
import { InstagramListingsCarousel } from "@/components/home/InstagramListingsCarousel";
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

      {/* 2. Instagram Showcase Carousel */}
      <InstagramListingsCarousel />

      {/* 3. Featured Portfolio (Listings populated by Admin) */}
      <FeaturedSection properties={properties} />

      {/* 4. Valuation Lead Capture Banner for Sellers */}
      <ValuationBanner />

      {/* 5. Why Choose Us / Proven Track Record */}
      <WhyChooseUs />

      {/* 6. Client Testimonials */}
      <Testimonials />
    </div>
  );
}
