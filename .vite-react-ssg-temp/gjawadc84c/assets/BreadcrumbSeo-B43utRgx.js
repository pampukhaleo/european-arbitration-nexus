import { jsx } from "react/jsx-runtime";
const BreadcrumbSeo = ({ items }) => {
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
  return /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(structuredData) });
};
export {
  BreadcrumbSeo as B
};
