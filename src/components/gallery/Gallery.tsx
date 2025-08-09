
import { useState, useMemo } from 'react';
import { GalleryImage, GalleryCategory } from '@/types/gallery';
import GalleryItem from './GalleryItem';
import GalleryFilters from './GalleryFilters';
import ImageModal from './ImageModal';
import { useLanguage } from '@/contexts/LanguageContext';

interface GalleryProps {
  images: GalleryImage[];
  categories: GalleryCategory[];
  title?: string;
  description?: string;
}

export default function Gallery({ images, categories, title, description }: GalleryProps) {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const filteredImages = useMemo(() => {
    return images.filter(image => {
      const matchesCategory = !selectedCategory || image.category === selectedCategory;
      const matchesSearch = !searchQuery || 
        image.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        image.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        image.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesCategory && matchesSearch;
    });
  }, [images, selectedCategory, searchQuery]);

  const handleImageClick = (image: GalleryImage) => {
    setSelectedImage(image);
  };

  const handleModalClose = () => {
    setSelectedImage(null);
  };

  const handlePrevious = () => {
    if (!selectedImage) return;
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    if (currentIndex > 0) {
      setSelectedImage(filteredImages[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (!selectedImage) return;
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    if (currentIndex < filteredImages.length - 1) {
      setSelectedImage(filteredImages[currentIndex + 1]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      {(title || description) && (
        <div className="text-center">
          {title && <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>}
          {description && <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>}
        </div>
      )}

      {/* Filters */}
      <GalleryFilters
        categories={categories}
        selectedCategory={selectedCategory}
        searchQuery={searchQuery}
        onCategoryChange={setSelectedCategory}
        onSearchChange={setSearchQuery}
        totalImages={images.length}
        filteredCount={filteredImages.length}
      />

      {/* Gallery Grid */}
      {filteredImages.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map(image => (
            <GalleryItem
              key={image.id}
              image={image}
              onClick={handleImageClick}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            {t("gallery.noResults") || "No images found matching your criteria."}
          </p>
          {(selectedCategory || searchQuery) && (
            <p className="text-sm text-gray-400 mt-2">
              {t("gallery.tryDifferentFilters") || "Try adjusting your filters or search terms."}
            </p>
          )}
        </div>
      )}

      {/* Modal */}
      <ImageModal
        image={selectedImage}
        images={filteredImages}
        isOpen={!!selectedImage}
        onClose={handleModalClose}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />
    </div>
  );
}
