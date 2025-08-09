
import { useState, useMemo } from "react";
import Layout from "@/components/Layout";
import { Seo } from "@/components/Seo";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePublicPaintings } from "@/hooks/useGallery";
import PaintingCard from "@/components/gallery/PaintingCard";
import GallerySearch from "@/components/gallery/GallerySearch";
import { Loader2, Image } from "lucide-react";

export default function Gallery() {
  const { language, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<{ artist?: string; year?: string }>({});
  const [sortConfig, setSortConfig] = useState<{ field: string; order: 'asc' | 'desc' }>({ 
    field: 'created_at', 
    order: 'desc' 
  });

  const { data: paintings, isLoading, error } = usePublicPaintings(searchQuery);

  // Extract unique artists and years for filters
  const { artists, years } = useMemo(() => {
    if (!paintings) return { artists: [], years: [] };
    
    const artistsSet = new Set<string>();
    const yearsSet = new Set<number>();
    
    paintings.forEach(painting => {
      const artist = painting[`artist_${language}`] || painting.artist_en;
      if (artist) artistsSet.add(artist);
      if (painting.year) yearsSet.add(painting.year);
    });
    
    return {
      artists: Array.from(artistsSet).sort(),
      years: Array.from(yearsSet).sort((a, b) => b - a)
    };
  }, [paintings, language]);

  // Filter and sort paintings
  const filteredAndSortedPaintings = useMemo(() => {
    if (!paintings) return [];
    
    let filtered = paintings.filter(painting => {
      // Artist filter
      if (filters.artist) {
        const artist = painting[`artist_${language}`] || painting.artist_en;
        if (artist !== filters.artist) return false;
      }
      
      // Year filter
      if (filters.year) {
        if (painting.year?.toString() !== filters.year) return false;
      }
      
      return true;
    });

    // Sort paintings
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (sortConfig.field) {
        case 'title':
          aValue = a[`title_${language}`] || a.title_en;
          bValue = b[`title_${language}`] || b.title_en;
          break;
        case 'artist':
          aValue = a[`artist_${language}`] || a.artist_en;
          bValue = b[`artist_${language}`] || b.artist_en;
          break;
        case 'year':
          aValue = a.year || 0;
          bValue = b.year || 0;
          break;
        case 'created_at':
        default:
          aValue = new Date(a.created_at);
          bValue = new Date(b.created_at);
          break;
      }
      
      if (sortConfig.order === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  }, [paintings, filters, sortConfig, language]);

  if (error) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">{t('errors.loadFailed')}</h1>
            <p className="text-muted-foreground">{t('errors.serverError')}</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <>
      <Seo 
        title={t('gallery.seo.title')}
        description={t('gallery.seo.description')}
        lang={language}
      />
      
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4 text-eac-dark uppercase">
              {t('gallery.title')}
            </h1>
            {paintings && (
              <p className="text-muted-foreground">
                {paintings.length} {t('gallery.paintingsAvailable')}
              </p>
            )}
          </div>

          <GallerySearch
            onSearch={setSearchQuery}
            onFilter={setFilters}
            onSort={(field, order) => setSortConfig({ field, order })}
            artists={artists}
            years={years}
          />

          {isLoading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="text-center">
                <Loader2 className="mx-auto h-8 w-8 animate-spin mb-4" />
                <p className="text-muted-foreground">{t('gallery.loading')}</p>
              </div>
            </div>
          ) : filteredAndSortedPaintings.length === 0 ? (
            <div className="text-center min-h-[400px] flex flex-col justify-center items-center">
              <Image className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold mb-2">{t('gallery.noResults')}</h2>
              <p className="text-muted-foreground">
                {searchQuery || Object.keys(filters).length > 0 
                  ? t('gallery.adjustFilters')
                  : t('gallery.noPaintingsAvailable')
                }
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredAndSortedPaintings.map((painting) => (
                <PaintingCard key={painting.id} painting={painting} />
              ))}
            </div>
          )}
        </div>
      </Layout>
    </>
  );
}
