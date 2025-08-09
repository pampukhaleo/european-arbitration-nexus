
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { GalleryCategory } from '@/types/gallery';
import { useLanguage } from '@/contexts/LanguageContext';
import { Search, X } from 'lucide-react';

interface GalleryFiltersProps {
  categories: GalleryCategory[];
  selectedCategory: string | null;
  searchQuery: string;
  onCategoryChange: (category: string | null) => void;
  onSearchChange: (query: string) => void;
  totalImages: number;
  filteredCount: number;
}

export default function GalleryFilters({
  categories,
  selectedCategory,
  searchQuery,
  onCategoryChange,
  onSearchChange,
  totalImages,
  filteredCount
}: GalleryFiltersProps) {
  const { t } = useLanguage();
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder={t("gallery.searchPlaceholder") || "Search images..."}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
          className="pl-10 pr-10"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onSearchChange('')}
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Categories */}
      <div className="space-y-2">
        <h3 className="font-medium text-sm text-gray-700">
          {t("gallery.categories") || "Categories"}
        </h3>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            size="sm"
            onClick={() => onCategoryChange(null)}
          >
            {t("gallery.allCategories") || "All"}
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => onCategoryChange(category.id)}
            >
              {t(category.translationKey) || category.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>
          {`Showing ${filteredCount} of ${totalImages} images`}
        </span>
        
        {(selectedCategory || searchQuery) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              onCategoryChange(null);
              onSearchChange('');
            }}
            className="text-eac-primary hover:text-eac-primary/80"
          >
            {t("gallery.clearFilters") || "Clear filters"}
          </Button>
        )}
      </div>
    </div>
  );
}
