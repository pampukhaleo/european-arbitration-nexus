import { Seo } from "@/components/Seo";
import { useParams } from "react-router-dom";

interface Painting {
  id: string;
  title_en: string;
  title_fr: string;
  title_ru: string;
  artist_en: string;
  artist_fr: string;
  artist_ru: string;
  year: number | null;
  description_en: string | null;
  description_fr: string | null;
  description_ru: string | null;
  public_image_url: string | null;
  is_published: boolean;
}

interface PaintingDetailSeoProps {
  painting: Painting | null;
  language: string;
  hasToken: boolean;
}

export const PaintingDetailSeo = ({ painting, language, hasToken }: PaintingDetailSeoProps) => {
  const { token } = useParams<{ token?: string }>();
  
  if (!painting) {
    return (
      <Seo 
        title="Painting Not Found | Art Gallery - European Arbitration Chamber"
        description="The requested artwork could not be found in our gallery collection."
        lang={language}
        robots="noindex, nofollow"
      />
    );
  }

  const getLocalizedText = (key: string) => {
    switch (language) {
      case 'fr': return painting[`${key}_fr` as keyof Painting] as string || painting[`${key}_en` as keyof Painting] as string || '';
      case 'ru': return painting[`${key}_ru` as keyof Painting] as string || painting[`${key}_en` as keyof Painting] as string || '';
      default: return painting[`${key}_en` as keyof Painting] as string || '';
    }
  };

  const title = getLocalizedText('title');
  const artist = getLocalizedText('artist');
  const description = getLocalizedText('description');
  
  const seoTitle = `${title} by ${artist}${painting.year ? ` (${painting.year})` : ''} | Art Gallery - European Arbitration Chamber`;
  const seoDescription = description 
    ? `${description.substring(0, 150)}${description.length > 150 ? '...' : ''}`
    : `Discover "${title}" by ${artist}${painting.year ? ` from ${painting.year}` : ''} in the European Arbitration Chamber's authenticated art collection.`;

  // Check if should be indexed
  const shouldIndex = painting.is_published && !token && !hasToken;
  const robots = shouldIndex ? "index, follow" : "noindex, nofollow";

  // Structured data for artwork
  const structuredData = shouldIndex ? {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": title,
    "creator": {
      "@type": "Person",
      "name": artist
    },
    "dateCreated": painting.year ? painting.year.toString() : undefined,
    "description": description || `Artwork by ${artist}`,
    "image": painting.public_image_url,
    "url": typeof window !== 'undefined' ? window.location.href : '',
    "publisher": {
      "@type": "Organization",
      "name": "European Arbitration Chamber",
      "url": "https://chea-taic.be"
    }
  } : undefined;

  return (
    <Seo 
      title={seoTitle}
      description={seoDescription}
      image={painting.public_image_url || undefined}
      lang={language}
      robots={robots}
      structuredData={structuredData}
    />
  );
};