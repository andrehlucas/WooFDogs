/**
 * Server component — no "use client" needed.
 * Renders a Service JSON-LD block for individual service pages,
 * anchored to the page URL and linked to the main WooF Dogs organization entity.
 */
interface ServiceSchemaProps {
  serviceType: string;
  name: string;
  url: string;
  description: string;
}

export function ServiceSchema({ serviceType, name, url, description }: ServiceSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    serviceType,
    name,
    url,
    description,
    provider: { "@id": "https://woofdogs.com/#organization" },
    areaServed: { "@type": "AdministrativeArea", "name": "Palm Beach County" },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
