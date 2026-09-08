import AboutUs from "@/page-components/AboutUs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Expert Dog Trainers in Palm Beach County",
  description: "Meet Shay Maimoni—former IDF K9 trainer with 30+ years experience. WooF Dogs serves Palm Beach County with obedience, service dog, and behavior training.",
  alternates: {
    canonical: "https://woofdogs.com/about",
  },
  openGraph: {
    title: "Expert Dog Trainers in Palm Beach County | WooF Dogs",
    description: "Meet Shay Maimoni—former IDF K9 trainer with 30+ years experience. WooF Dogs serves Palm Beach County with obedience, service dog, and behavior training.",
    url: "https://woofdogs.com/about",
    siteName: "WooF Dogs",
    locale: "en_US",
    type: "website",
    images: [{ url: "https://woofdogs.com/trainers.webp", width: 800, height: 600, alt: "WooF Dogs Professional Dog Trainers" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Expert Dog Trainers in Palm Beach County | WooF Dogs",
    description: "Meet Shay Maimoni—former IDF K9 trainer with 30+ years experience. WooF Dogs serves Palm Beach County with obedience, service dog, and behavior training.",
  },
};

export default function AboutPage() {
  return <AboutUs />;
}
