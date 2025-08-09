
import { Seo } from '@/components/Seo';
import Layout from '@/components/Layout';
import Gallery from '@/components/gallery/Gallery';
import { galleryImages, galleryCategories } from '@/data/galleryData';
import { useLanguage } from '@/contexts/LanguageContext';

export default function GalleryPage() {
  const { t, language } = useLanguage();

  return (
    <Layout>
      <Seo
        title={t("seo.gallery.title")}
        description={t("seo.gallery.description")}
        lang={language}
      />
      
      <Gallery
        images={galleryImages}
        categories={galleryCategories}
        title={t("gallery.title")}
        description={t("gallery.description")}
      />
    </Layout>
  );
}
