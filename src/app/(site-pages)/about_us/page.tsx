import type { Metadata } from "next";

import { AboutUsHeroSection } from "@/app/(site-pages)/about_us/components/about-us-hero-section";
import { AboutUsPrinciplesSection } from "@/app/(site-pages)/about_us/components/about-us-principles-section";
import { AboutUsTeamSection } from "@/app/(site-pages)/about_us/components/about-us-team-section";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.doow.co";
const aboutUsDescription =
  "Learn why Doow was built, what we believe about software spend, and the team experience behind the product.";

export const metadata: Metadata = {
  title: "About Us",
  description: aboutUsDescription,
  openGraph: {
    title: "About Us | Doow",
    description: aboutUsDescription,
    url: `${siteUrl}/about_us`,
    type: "website",
  },
};

export default function AboutUsPage() {
  return (
    <>
      <AboutUsHeroSection />
      <AboutUsPrinciplesSection />
      <AboutUsTeamSection />
    </>
  );
}
