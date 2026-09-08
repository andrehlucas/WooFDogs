import BehavioralAssessment from "@/page-components/BehavioralAssessment";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dog Evaluation in South Florida",
  description: "Dog evaluation in South Florida for aggression, anxiety, reactivity, and resource guarding. Up to 40 minutes with our lead trainer—book your evaluation today.",
  alternates: {
    canonical: "https://woofdogs.com/behavioral-assessment",
  },
  openGraph: {
    title: "Dog Evaluation in South Florida | WooF Dogs",
    description: "Dog evaluation in South Florida for aggression, anxiety, reactivity, and resource guarding. Up to 40 minutes builds your training plan—book today.",
    url: "https://woofdogs.com/behavioral-assessment",
    siteName: "WooF Dogs",
    locale: "en_US",
    type: "website",
    images: [{ url: "https://woofdogs.com/trainers.webp", width: 800, height: 600, alt: "WooF Dogs Professional Dog Trainers" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dog Evaluation in South Florida | WooF Dogs",
    description: "Dog evaluation in South Florida for aggression, anxiety, reactivity, and resource guarding. Up to 40 minutes builds your training plan—book today.",
  },
};

export default function BehavioralAssessmentPage() {
  return <BehavioralAssessment />;
}
