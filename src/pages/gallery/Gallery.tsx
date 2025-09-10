import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useUserRole } from '@/hooks/useUserRole';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, Settings, Plus, LogIn, QrCode, LogOut } from 'lucide-react';

interface Painting {
  id: string;
  title_en: string;
  title_fr: string;
  title_ru: string;
  artist_en: string;
  artist_fr: string;
  artist_ru: string;
  year: number;
  public_image_url: string;
  is_published: boolean;
}

const Gallery = () => {
  const { language, t } = useLanguage();
  const { user, signOut } = useAuth();
  const { role, isAdmin, isOwner } = useUserRole();
  const [paintings, setPaintings] = useState<Painting[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [yearFilter, setYearFilter] = useState<string>('');

  useEffect(() => {
    fetchPaintings();
  }, []);

  const fetchPaintings = async () => {
    try {
      const { data, error } = await supabase
        .from('paintings')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPaintings(data || []);
    } catch (error) {
      console.error('Error fetching paintings:', error);
    } finally {
      setLoading(false);
    }
  };

  const getLocalizedText = (item: Painting, field: 'title' | 'artist') => {
    return item[`${field}_${language}` as keyof Painting] as string || item[`${field}_en` as keyof Painting] as string;
  };

  const filteredPaintings = paintings.filter(painting => {
    const title = getLocalizedText(painting, 'title').toLowerCase();
    const artist = getLocalizedText(painting, 'artist').toLowerCase();
    const matchesSearch = title.includes(searchTerm.toLowerCase()) || 
                         artist.includes(searchTerm.toLowerCase());
    const matchesYear = !yearFilter || painting.year?.toString() === yearFilter;
    
    return matchesSearch && matchesYear;
  });

  const availableYears = [...new Set(paintings.map(p => p.year).filter(Boolean))].sort((a, b) => b - a);

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">{t('common.loading')}</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Role-based Management Buttons */}
      <div className="flex flex-col gap-2 ml-4">
        {user ? (
          <>
            {isAdmin && (
              <div className="flex gap-2">
                <Link to="/admin/dashboard">
                  <Button variant="default" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Admin Dashboard
                  </Button>
                </Link>
                <Link to="/gallery/manage/add">
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Painting
                  </Button>
                </Link>
              </div>
            )}
            {(isOwner || isAdmin) && (
              <Link to="/gallery/manage">
                <Button variant="outline" size="sm">
                  <QrCode className="h-4 w-4 mr-2" />
                  {isAdmin ? 'Gallery Management' : 'Manage QR Codes'}
                </Button>
              </Link>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={signOut}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </>
        ) : (
          <Link to="/auth">
            <Button variant="outline" size="sm">
              <LogIn className="h-4 w-4 mr-2" />
              Owner Login
            </Button>
          </Link>
        )}
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-4">{t('gallery.title')}</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t('gallery.description')}
              </p>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder={t('gallery.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              className="px-3 py-2 border rounded-md bg-background"
            >
              <option value="">{t('gallery.allYears')}</option>
              {availableYears.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm('');
                setYearFilter('');
              }}
            >
              {t('gallery.clearFilters')}
            </Button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPaintings.map((painting) => (
            <Link key={painting.id} to={`/gallery/${painting.id}`}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <div className="aspect-square overflow-hidden rounded-t-lg">
                  {painting.public_image_url ? (
                    <img
                      src={painting.public_image_url}
                      alt={getLocalizedText(painting, 'title')}
                      className="w-full h-full object-contain bg-gray-50 hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <span className="text-muted-foreground">{t('gallery.noImage')}</span>
                    </div>
                  )}
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg line-clamp-2">
                    {getLocalizedText(painting, 'title')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-muted-foreground text-sm mb-1">
                    {getLocalizedText(painting, 'artist')}
                  </p>
                  {painting.year && (
                    <p className="text-muted-foreground text-xs">
                      {painting.year}
                    </p>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {filteredPaintings.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              {searchTerm || yearFilter ? t('gallery.noResults') : t('gallery.noPaintings')}
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Gallery;
