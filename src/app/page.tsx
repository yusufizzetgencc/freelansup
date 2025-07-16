import CtaSection from "@/components/home/CtaSection";
import DemoAdShowcase from "@/components/home/DemoAdShowcase";
import Features from "@/components/home/Features";
import Hero from "@/components/home/Hero";
import PromoSection from "@/components/home/PromoSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import LoadingScreen from "@/components/ui/LoadingScreen";
import React from "react";

const Page = () => {
  const isLoading = false; // Change this to true to see loading

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div>
          <Hero />
          <Features />
          <DemoAdShowcase />
          <PromoSection />
          <TestimonialsSection />
          <CtaSection />
        </div>
      )}
    </>
  );
};

export default Page;
