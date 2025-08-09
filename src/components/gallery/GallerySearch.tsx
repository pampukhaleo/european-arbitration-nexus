
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { Search, Filter, SortAsc } from "lucide-react";
import { useState, useEffect } from "react";

interface GallerySearchProps {
  onSearch: (query: string) => void;
  onFilter: (filters: { artist?: string; year?: string }) => void;
  onSort: (sortBy: string, order: 'asc' | 'desc') => void;
  artists: string[];
  years: number[];
}

export default function GallerySearch({ 
  onSearch, 
  onFilter, 
  onSort, 
  artists, 
  years 
}: GallerySearchProps) {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArtist, setSelectedArtist] = useState<string>("all");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [sortBy, setSortBy] = useState("newest");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch(query);
  };

  const handleFilterChange = () => {
    const filters: { artist?: string; year?: string } = {};
    if (selectedArtist !== "all") filters.artist = selectedArtist;
    if (selectedYear !== "all") filters.year = selectedYear;
    onFilter(filters);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    switch (value) {
      case 'newest':
        onSort('created_at', 'desc');
        break;
      case 'oldest':
        onSort('created_at', 'asc');
        break;
      case 'title':
        onSort('title', 'asc');
        break;
      case 'artist':
        onSort('artist', 'asc');
        break;
      case 'year':
        onSort('year', 'desc');
        break;
    }
  };

  useEffect(() => {
    handleFilterChange();
  }, [selectedArtist, selectedYear]);

  return (
    <div className="space-y-4 mb-8">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
        <Input
          placeholder={t('gallery.searchBy')}
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Filters and Sort */}
      <div className="flex flex-wrap gap-4">
        {/* Artist Filter */}
        <div className="flex-1 min-w-[200px]">
          <Select value={selectedArtist} onValueChange={setSelectedArtist}>
            <SelectTrigger>
              <div className="flex items-center gap-2">
                <Filter size={16} />
                <SelectValue placeholder={t('gallery.allArtists')} />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('gallery.allArtists')}</SelectItem>
              {artists.map((artist) => (
                <SelectItem key={artist} value={artist}>
                  {artist}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Year Filter */}
        <div className="flex-1 min-w-[150px]">
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger>
              <SelectValue placeholder={t('gallery.allYears')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('gallery.allYears')}</SelectItem>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Sort */}
        <div className="flex-1 min-w-[180px]">
          <Select value={sortBy} onValueChange={handleSortChange}>
            <SelectTrigger>
              <div className="flex items-center gap-2">
                <SortAsc size={16} />
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">{t('gallery.sortNewest')}</SelectItem>
              <SelectItem value="oldest">{t('gallery.sortOldest')}</SelectItem>
              <SelectItem value="title">{t('gallery.sortTitle')}</SelectItem>
              <SelectItem value="artist">{t('gallery.sortArtist')}</SelectItem>
              <SelectItem value="year">{t('gallery.sortYear')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
