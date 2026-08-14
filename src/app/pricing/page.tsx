import type { Metadata } from "next";

import { CTA, Footer, Navbar, Pricing } from "@/components/marketing";

export const metadata: Metadata = {
  title: "Pricing | SaaSSeed",
  description: "Simple plans for individuals and growing teams.",
};

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Pricing />
      <CTA />
      <Footer />
    </div>
  );
}
