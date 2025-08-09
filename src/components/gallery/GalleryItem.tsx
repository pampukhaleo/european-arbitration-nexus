
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GalleryImage } from '@/types/gallery';
import { useLanguage } from '@/contexts/LanguageContext';

interface GalleryItemProps {
  image: GalleryImage;
  onClick: (image: GalleryImage) => void;
}

export default function GalleryItem({ image, onClick }: GalleryItemProps) {
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <Card 
      className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg"
      onClick={() => onClick(image)}
    >
      <div className="relative aspect-square overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-eac-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        
        {hasError ? (
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
            <p className="text-gray-500 text-sm">Image not found</p>
          </div>
        ) : (
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading="lazy"
          />
        )}
        
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300" />
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-sm mb-2 line-clamp-2">{image.title}</h3>
        {image.description && (
          <p className="text-xs text-gray-600 mb-2 line-clamp-2">{image.description}</p>
        )}
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="text-xs">
            {t(`gallery.categories.${image.category}`) || image.category}
          </Badge>
          {image.date && (
            <span className="text-xs text-gray-500">{image.date}</span>
          )}
        </div>
      </div>
    </Card>
  );
}
