// Single source of truth for WooF Dogs aggregate rating.
// Update these when the review count or average changes.
export const WOOF_DOGS_RATING = {
  ratingValue: 4.8,
  bestRating: 5,
  worstRating: 1,
  reviewCount: 114,
} as const;

interface CityLocalBusinessSchemaProps {
  cityName: string;
  slug: string;
}

/**
 * City-scoped LocalBusiness + AggregateRating JSON-LD.
 * Renders alongside FaqSchema on each city landing page so Google can
 * show star ratings in the search snippet for that city's query.
 */
export function CityLocalBusinessSchema({ cityName, slug }: CityLocalBusinessSchemaProps) {
  const url = `https://woofdogs.com/${slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": `${url}#localbusiness`,
    "name": "WooF Dogs",
    "description": `Professional dog training in ${cityName}, FL — obedience, puppy training, aggression management, board & train, and in-home sessions by certified trainers with 30+ years of experience.`,
    "url": url,
    "telephone": "+1-561-594-4111",
    "email": "office@woofdogs.com",
    "image": "https://woofdogs.com/trainers.webp",
    "logo": {
      "@type": "ImageObject",
      "url": "https://woofdogs.com/woof-dogs-logo.png",
      "width": 512,
      "height": 512,
    },
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "4200 Global Trail",
      "addressLocality": "Loxahatchee",
      "addressRegion": "FL",
      "postalCode": "33470",
      "addressCountry": "US",
    },
    "areaServed": {
      "@type": "City",
      "name": cityName,
      "containedInPlace": {
        "@type": "State",
        "name": "Florida",
      },
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": WOOF_DOGS_RATING.ratingValue,
      "bestRating": WOOF_DOGS_RATING.bestRating,
      "worstRating": WOOF_DOGS_RATING.worstRating,
      "reviewCount": WOOF_DOGS_RATING.reviewCount,
    },
    "sameAs": [
      "https://www.facebook.com/woofdogs",
      "https://www.instagram.com/woofdogs",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function LocalBusinessSchema() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://woofdogs.com/#organization",
    "name": "WooF Dogs",
    "alternateName": "Woof Dogs Dog Training",
    "slogan": "We Speak Your Dog's Language",
    "description": "We Speak Your Dog's Language. Professional dog training services in South Florida including obedience training, puppy training, behavioral assessment, service dog training, and aggression management.",
    "url": "https://woofdogs.com",
    "telephone": "+1-561-594-4111",
    "email": "office@woofdogs.com",
    "image": "https://woofdogs.com/trainers.webp",
    "logo": {
      "@type": "ImageObject",
      "url": "https://woofdogs.com/woof-dogs-logo.png",
      "width": 512,
      "height": 512,
    },
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "4200 Global Trail",
      "addressLocality": "Loxahatchee",
      "addressRegion": "FL",
      "postalCode": "33470",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 26.6861,
      "longitude": -80.2617
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Boca Raton",
        "containedInPlace": {
          "@type": "State",
          "name": "Florida"
        }
      },
      {
        "@type": "City",
        "name": "Delray Beach",
        "containedInPlace": {
          "@type": "State",
          "name": "Florida"
        }
      },
      {
        "@type": "City",
        "name": "Wellington",
        "containedInPlace": {
          "@type": "State",
          "name": "Florida"
        }
      },
      {
        "@type": "City",
        "name": "Palm Beach Gardens",
        "containedInPlace": {
          "@type": "State",
          "name": "Florida"
        }
      },
      {
        "@type": "City",
        "name": "Loxahatchee",
        "containedInPlace": {
          "@type": "State",
          "name": "Florida"
        }
      },
      {
        "@type": "City",
        "name": "West Palm Beach",
        "containedInPlace": {
          "@type": "State",
          "name": "Florida"
        }
      },
      {
        "@type": "AdministrativeArea",
        "name": "Palm Beach County"
      }
    ],
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "09:00",
        "closes": "15:00"
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Dog Training Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Obedience Training",
            "description": "Professional obedience training from basic commands to advanced off-leash reliability"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Puppy Training",
            "description": "VIP puppy program with age-appropriate training and socialization"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Evaluation",
            "description": "Professional evaluation of dog temperament, habits, and training needs"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Service Dog Training",
            "description": "Specialized service dog training for task-specific and public access requirements"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Therapy Dog Training",
            "description": "Therapy dog certification training and AKC Canine Good Citizen preparation"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Aggression Management",
            "description": "Behavior modification for reactive and aggressive dogs with safety-first approach"
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": WOOF_DOGS_RATING.ratingValue,
      "bestRating": WOOF_DOGS_RATING.bestRating,
      "worstRating": WOOF_DOGS_RATING.worstRating,
      "reviewCount": WOOF_DOGS_RATING.reviewCount,
    },
    "sameAs": [
      "https://www.facebook.com/woofdogs",
      "https://www.instagram.com/woofdogs"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
