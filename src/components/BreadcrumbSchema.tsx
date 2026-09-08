/**
 * Server component — no "use client" needed.
 * Renders a two-level BreadcrumbList JSON-LD (Home › Page) for service and city pages.
 * Google uses BreadcrumbList to display a readable path in search results instead of the raw URL.
 */
interface BreadcrumbSchemaProps {
  pageName: string;
  pageUrl: string;
}

export function BreadcrumbSchema({ pageName, pageUrl }: BreadcrumbSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://woofdogs.com" },
      { "@type": "ListItem", position: 2, name: pageName, item: pageUrl },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
