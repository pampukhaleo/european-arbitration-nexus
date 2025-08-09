
import { useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryImage } from '@/types/gallery';
import { useLanguage } from '@/contexts/LanguageContext';

interface ImageModalProps {
  image: GalleryImage | null;
  images: GalleryImage[];
  isOpen: boolean;
  onClose: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
}

export default function ImageModal({ 
  image, 
  images, 
  isOpen, 
  onClose, 
  onPrevious, 
  onNext 
}: ImageModalProps) {
  const { t } = useLanguage();

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          onPrevious?.();
          break;
        case 'ArrowRight':
          onNext?.();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isOpen, onClose, onPrevious, onNext]);

  if (!image) return null;

  const currentIndex = images.findIndex(img => img.id === image.id);
  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex < images.length - 1;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = image.src;
    link.download = image.title || 'image';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] p-0 overflow-hidden">
        <div className="relative">
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/70 to-transparent p-4">
            <div className="flex items-center justify-between text-white">
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{image.title}</h2>
                {image.description && (
                  <p className="text-sm opacity-90 mt-1">{image.description}</p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDownload}
                  className="text-white hover:bg-white/20"
                >
                  <Download className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="text-white hover:bg-white/20"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <img
              src={image.src}
              alt={image.alt}
              className="w-full max-h-[80vh] object-contain bg-gray-900"
            />
            
            {/* Navigation arrows */}
            {canGoPrevious && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/50 hover:bg-black/70"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
            )}
            
            {canGoNext && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/50 hover:bg-black/70"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            )}
          </div>

          {/* Footer */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-white/20 text-white">
                  {t(`gallery.categories.${image.category}`) || image.category}
                </Badge>
                {image.tags?.map(tag => (
                  <Badge key={tag} variant="outline" className="bg-white/10 border-white/30 text-white">
                    {tag}
                  </Badge>
                ))}
              </div>
              {image.date && (
                <span className="text-sm opacity-90">{image.date}</span>
              )}
            </div>
            {images.length > 1 && (
              <div className="mt-2 text-sm opacity-90">
                {currentIndex + 1} / {images.length}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
