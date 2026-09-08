import Boarding, { boardingFaqs } from "@/page-components/Boarding";
import { FaqSchema } from "@/components/FaqSchema";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { RelatedBlogPosts } from "@/components/blog/RelatedBlogPosts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dog Boarding & Pet Care in South Florida",
  description: "Dog boarding in South Florida—safe, comfortable stays with attentive care. Serving Wellington, Royal Palm Beach, West Palm Beach & Loxahatchee. Reserve now.",
  alternates: {
    canonical: "https://woofdogs.com/dog-boarding",
  },
  openGraph: {
    title: "Dog Boarding in South Florida | WooF Dogs",
    description: "Dog boarding in South Florida—safe, comfortable stays with attentive care. Serving Wellington, Westlake, Royal Palm Beach, West Palm Beach & Loxahatchee. Reserve now.",
    url: "https://woofdogs.com/dog-boarding",
    siteName: "WooF Dogs",
    locale: "en_US",
    type: "website",
    images: [{ url: "https://woofdogs.com/trainers.webp", width: 800, height: 600, alt: "WooF Dogs Professional Dog Trainers" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dog Boarding in South Florida | WooF Dogs",
    description: "Dog boarding in South Florida—safe, comfortable stays with attentive care. Serving Wellington, Royal Palm Beach, West Palm Beach & Loxahatchee. Reserve now.",
  },
};

export default function DogBoardingPage() {
  return (
    <>
      {/* Page-scoped Service schema — does NOT duplicate the global LocalBusiness @id */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "@id": "https://woofdogs.com/dog-boarding#service",
            "name": "Dog Boarding in South Florida",
            "serviceType": "Dog Boarding",
            "description": "Professional dog boarding services in South Florida. Premium overnight and extended stays with experienced trainers and attentive care in a safe, comfortable environment.",
            "url": "https://woofdogs.com/dog-boarding",
            "provider": {
              "@id": "https://woofdogs.com/#organization",
            },
            "areaServed": [
              { "@type": "City", "name": "Wellington", "containedInPlace": { "@type": "State", "name": "Florida" } },
              { "@type": "City", "name": "West Palm Beach", "containedInPlace": { "@type": "State", "name": "Florida" } },
              { "@type": "City", "name": "Royal Palm Beach", "containedInPlace": { "@type": "State", "name": "Florida" } },
              { "@type": "City", "name": "Loxahatchee", "containedInPlace": { "@type": "State", "name": "Florida" } },
              { "@type": "AdministrativeArea", "name": "Palm Beach County" },
            ],
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Dog Boarding Options",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Standard Suite Dog Boarding",
                    "description": "Comfortable private space with cozy bedding for dogs",
                  },
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Deluxe Suite Dog Boarding",
                    "description": "Spacious accommodation with extra play time and personalized attention",
                  },
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Luxury Villa Dog Boarding",
                    "description": "Extra-large private villa with VIP treatment",
                  },
                },
              ],
            },
          }),
        }}
      />
      <BreadcrumbSchema
        pageName="Dog Boarding in South Florida"
        pageUrl="https://woofdogs.com/dog-boarding"
      />
      <FaqSchema faqs={boardingFaqs} />
      <Boarding />
      <RelatedBlogPosts
        postSlugs={["board-and-train-vs-in-home-training", "dog-training-cost-south-florida"]}
        heading="From the WooF Dogs Blog"
      />
    </>
  );
}
