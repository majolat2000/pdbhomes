import React from "react";
import { getProperties } from "@/lib/db";
import { HeroSearch } from "@/components/home/HeroSearch";
import { FeaturedSection } from "@/components/home/FeaturedSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { ConsultationBanner } from "@/components/home/ConsultationBanner";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const properties = await getProperties();

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero with Dynamic Search */}
      <HeroSearch />

      {/* 2. Featured Portfolio & Video Tours */}
      <FeaturedSection properties={properties} />

      {/* 3. How Finding a Property Works */}
      <ProcessSection />

      {/* 4. Grounded Benefits / Why PDB Homes */}
      <WhyChooseUs />

      {/* 5. One-on-One Consultation CTA */}
      <ConsultationBanner />
    </div>
  );
}
