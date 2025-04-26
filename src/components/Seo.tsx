import { Helmet } from "react-helmet";

interface SeoProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  lang: string;
}

export const Seo = ({
                      title = 'The European Arbitration Chamber (EAC)',
                      description = "The European Arbitration Chamber (EAC) is an international non-profit association founded in Belgium in 2008 by professionals in commercial arbitration and mediation from Belgium, France, and Ukraine.",
                      image = "https://chea-taic.be/logo.png",
                      url = "https://chea-taic.be",
                      lang = "en",
                    }: SeoProps) => {
  return (
    <Helmet htmlAttributes={{ lang }}>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};
