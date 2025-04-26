import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";

interface SeoProps {
  title: string;
  description: string;
  image?: string;
  lang: string;
}

export const Seo = ({
                      title = "The European Arbitration Chamber (EAC)",
                      description = "The European Arbitration Chamber (EAC) is an international non-profit association founded in Belgium in 2008.",
                      image = "https://chea-taic.be/logo.png",
                      lang = "en",
                    }: SeoProps) => {
  const location = useLocation();
  const baseUrl = "https://chea-taic.be";
  const canonicalUrl = `${baseUrl}${location.pathname}`;

  return (
    <Helmet htmlAttributes={{ lang }}>
      {/* Базовые мета-теги */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <meta name="robots" content="index, follow" /> {/* 🔥 Явно разрешаем индексировать */}

      {/* Canonical */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="European Arbitration Council" />
      <meta property="og:locale" content={lang === "en" ? "en_US" : lang === "ru" ? "ru_RU" : "fr_FR"} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};
