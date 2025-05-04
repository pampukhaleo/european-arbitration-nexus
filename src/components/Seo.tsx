import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";

interface SeoProps {
  title: string;
  description: string;
  image?: string;
  lang: string;
  imageWidth?: number;
  imageHeight?: number;
}

export const Seo = ({
                      title = "The European Arbitration Chamber (EAC)",
                      description = "The European Arbitration Chamber (EAC) is an international non-profit association founded in Belgium in 2008.",
                      image = "eap-banner-1200x630.png",
                      lang = "en",
                      imageWidth = 1200,
                      imageHeight = 630,
                    }: SeoProps) => {
  const location = useLocation();
  const baseUrl = "https://chea-taic.be";
  const canonicalUrl = `${baseUrl}${location.pathname}`;
  const fullImageUrl = image.startsWith("http") ? image : `${baseUrl}/${image}`;

  return (
    <Helmet htmlAttributes={{ lang }}>
      {/* Base meta */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <meta name="robots" content="index, follow" />

      {/* Canonical */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:width" content={imageWidth.toString()} />
      <meta property="og:image:height" content={imageHeight.toString()} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="European Arbitration Council" />
      <meta
        property="og:locale"
        content={lang === "en" ? "en_US" : lang === "ru" ? "ru_RU" : "fr_FR"}
      />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
    </Helmet>
  );
};
