
import { Seo } from '@/components/Seo';
import Gallery from '@/components/gallery/Gallery';
import { galleryImages, galleryCategories } from '@/data/galleryData';
import { useLanguage } from '@/contexts/LanguageContext';

export default function GalleryPage() {
  const { t, language } = useLanguage();

  return (
    <>
      <Seo
        title={t("seo.gallery.title") || "Gallery | European Arbitration Chamber"}
        description={t("seo.gallery.description") || "Browse our gallery of events, meetings, conferences and other activities from the European Arbitration Chamber."}
        lang={language}
      />
      
      <div className="container mx-auto px-4 py-8">
        <Gallery
          images={galleryImages}
          categories={galleryCategories}
          title={t("gallery.title") || "Gallery"}
          description={t("gallery.description") || "Explore our collection of events, meetings, and activities"}
        />
      </div>
    </>
  );
}
