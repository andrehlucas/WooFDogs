import Bootcamp from "@/page-components/Bootcamp";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dog Board & Train Bootcamp in South Florida",
  description: "Board & train bootcamp in South Florida—your dog stays with our trainers for accelerated obedience, behavior transformation, and lasting results. Book today.",
  alternates: {
    canonical: "https://woofdogs.com/bootcamp",
  },
  openGraph: {
    title: "Dog Board & Train Bootcamp in South Florida | WooF Dogs",
    description: "Board & train bootcamp in South Florida—your dog stays with our trainers for accelerated obedience, behavior transformation, and lasting results. Book today.",
    url: "https://woofdogs.com/bootcamp",
    siteName: "WooF Dogs",
    locale: "en_US",
    type: "website",
    images: [{ url: "https://woofdogs.com/trainers.webp", width: 800, height: 600, alt: "WooF Dogs Professional Dog Trainers" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dog Board & Train Bootcamp in South Florida | WooF Dogs",
    description: "Board & train bootcamp in South Florida—your dog stays with our trainers for accelerated obedience, behavior transformation, and lasting results. Book today.",
  },
};

export default function BootcampPage() {
  return <Bootcamp />;
}
