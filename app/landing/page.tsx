"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LandingHero from "./LandingHero";
import HelpSection from "./HelpSection";
import HowItWorks from "./HowItWorks";
import MobileAppSection from "./MobileAppSection";
import Footer from "./Footer";
import { HopestBrandLoader } from "@/components/HopestLoader";

export default function LandingPage() {
  const router = useRouter();
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    // Check if user has read and accepted the official guidelines
    const accepted = sessionStorage.getItem("hopest_terms_accepted");
    if (!accepted) {
      router.replace("/");
    } else {
      setIsAllowed(true);
    }
  }, [router]);

  if (!isAllowed) {
    return (
      <HopestBrandLoader
        message="Checking Official Guidelines..."
        subtitle="Redirecting to Guidelines & Agreement"
      />
    );
  }

  return (
    <>
      <LandingHero />
      <HelpSection />
      <HowItWorks />
      <MobileAppSection />
      <Footer />
    </>
  );
}
