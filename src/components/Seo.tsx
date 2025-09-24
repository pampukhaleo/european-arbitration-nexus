import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import { getPublicBaseUrl } from "@/lib/publicBaseUrl";

interface SeoProps {
  title: string;
  description: string;
  image?: string;
  lang: string;
  imageWidth?: number;
  imageHeight?: number;
  robots?: string;
  structuredData?: object;
  ogType?: string;
}

const getBaseUrl = (): string => {
  // Use client-side URL if available, otherwise fall back to stored URL
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  return getPublicBaseUrl();
};

export const Seo = ({
                      title = "The European Arbitration Chamber (EAC)",
                      description = "The European Arbitration Chamber (EAC) is an international non-profit association founded in Belgium in 2008.",
                      image = "eap-banner-1200x630.png",
                      lang = "en",
                      imageWidth = 1200,
                      imageHeight = 630,
                      robots = "index, follow",
                      structuredData,
                      ogType = "website"
                    }: SeoProps) => {
  const location = useLocation();
  const baseUrl = getBaseUrl();
  // Generate canonical URL using spa-github-pages format
  const canonicalUrl = `${baseUrl}/?${location.pathname.replace(/\/$/, '') || '/'}`;
  const fullImageUrl = image.startsWith("http") ? image : `${baseUrl}/${image}`;
  const imageAlt = `${title} - European Arbitration Chamber`;

  return (
    <Helmet htmlAttributes={{ lang }}>
      {/* Base meta */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <meta name="robots" content={robots} />

      {/* Canonical */}
      <link rel="canonical" href={canonicalUrl} />
      

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:alt" content={imageAlt} />
      <meta property="og:image:width" content={imageWidth.toString()} />
      <meta property="og:image:height" content={imageHeight.toString()} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="European Arbitration Chamber (EAC)" />
      <meta
        property="og:locale"
        content={lang === "en" ? "en_US" : lang === "ru" ? "ru_RU" : "fr_FR"}
      />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@EAC_Arbitration" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:image:alt" content={imageAlt} />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};
