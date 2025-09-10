interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbSeoProps {
  items: BreadcrumbItem[];
}

export const BreadcrumbSeo = ({ items }: BreadcrumbSeoProps) => {
  if (items.length < 2) return null;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return (
    <script type="application/ld+json">
      {JSON.stringify(structuredData)}
    </script>
  );
};