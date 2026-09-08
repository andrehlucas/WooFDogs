export function WebPageSchema() {
  const siteUrl = "https://woofdogs.com";

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: `${siteUrl}/`,
        name: "WooF Dogs",
        alternateName: "Woof Dogs Dog Training",
        description:
          "Professional dog training in Palm Beach County — obedience, puppy training, evaluation, service dog training, and aggression management.",
        publisher: { "@id": `${siteUrl}/#organization` },
        inLanguage: "en-US",
        potentialAction: {
          "@type": "SearchAction",
          target: `${siteUrl}/blog?s={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "WebPage",
        "@id": `${siteUrl}/#webpage`,
        url: `${siteUrl}/`,
        name: "WooF Dogs - Professional Dog Training in South Florida",
        description:
          "Dog training in Boca Raton, West Palm Beach & nearby cities — obedience, puppy training, behavior help, and service dog training. Book a consult.",
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: { "@id": `${siteUrl}/#organization` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${siteUrl}/trainers.webp`,
        },
        inLanguage: "en-US",
        breadcrumb: { "@id": `${siteUrl}/#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${siteUrl}/#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${siteUrl}/`,
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
