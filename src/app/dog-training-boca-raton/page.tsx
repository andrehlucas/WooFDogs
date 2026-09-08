import CityLandingPage from "@/page-components/CityLandingPage";
import { getCityPageData } from "@/data/cityPages";
import { FaqSchema } from "@/components/FaqSchema";
import { CityLocalBusinessSchema } from "@/components/LocalBusinessSchema";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import type { Metadata } from "next";

const cityData = getCityPageData("dog-training-boca-raton")!;

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  alternates: {
    canonical: "https://woofdogs.com/dog-training-boca-raton",
  },
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: "https://woofdogs.com/dog-training-boca-raton",
    siteName: "WooF Dogs",
    locale: "en_US",
    type: "website",
  },
};

export default function DogTrainingBocaRatonPage() {
  return (
    <>
      <FaqSchema faqs={cityData.faqs} />
      <CityLocalBusinessSchema cityName={cityData.cityName} slug={cityData.slug} />
      <BreadcrumbSchema
        pageName={`Dog Training in ${cityData.cityName}`}
        pageUrl={`https://woofdogs.com/${cityData.slug}`}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "@id": `https://woofdogs.com/${cityData.slug}#service`,
            "serviceType": "Dog Training",
            "name": `Dog Training in ${cityData.cityName}`,
            "url": `https://woofdogs.com/${cityData.slug}`,
            "description": cityData.introText,
            "provider": { "@id": "https://woofdogs.com/#organization" },
            "areaServed": {
              "@type": "City",
              "name": cityData.cityName,
              "containedInPlace": { "@type": "State", "name": "Florida" },
            },
          }),
        }}
      />
      <CityLandingPage data={cityData} />
    </>
  );
}
