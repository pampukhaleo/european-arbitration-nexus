
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Plus, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Painting {
  id: string;
  title_en: string;
  title_fr: string;
  title_ru: string;
  artist_en: string;
  artist_fr: string;
  artist_ru: string;
  year: number | null;
  public_image_url: string | null;
  description_en: string | null;
  description_fr: string | null;
  description_ru: string | null;
}

const Gallery = () => {
  const { user } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();
  
  const [paintings, setPaintings] = useState<Painting[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPublishedPaintings();
  }, []);

  const fetchPublishedPaintings = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('paintings')
      .select('*')
      .eq('is_published', true)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setPaintings(data);
    }
    
    setLoading(false);
  };

  const getLocalizedTitle = (painting: Painting) => {
    switch (language) {
      case 'fr': return painting.title_fr;
      case 'ru': return painting.title_ru;
      default: return painting.title_en;
    }
  };

  const getLocalizedArtist = (painting: Painting) => {
    switch (language) {
      case 'fr': return painting.artist_fr;
      case 'ru': return painting.artist_ru;
      default: return painting.artist_en;
    }
  };

  const getLocalizedDescription = (painting: Painting) => {
    switch (language) {
      case 'fr': return painting.description_fr;
      case 'ru': return painting.description_ru;
      default: return painting.description_en;
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Art Gallery</h1>
            <p className="text-lg text-gray-600">
              Discover authenticated artworks with expert analysis and technical reports
            </p>
          </div>
          {user && (
            <Button 
              onClick={() => navigate('/gallery/manage')}
              className="flex items-center gap-2"
            >
              <Settings className="h-4 w-4" />
              Manage Gallery
            </Button>
          )}
        </div>

        {!user && (
          <Card className="mb-8 bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">
                    Share Your Art Collection
                  </h3>
                  <p className="text-blue-700">
                    Join our platform to showcase your artworks with professional authentication and expert analysis.
                  </p>
                </div>
                <Button onClick={() => navigate('/auth')} variant="outline">
                  Get Started
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-64 bg-gray-200 rounded-t-lg"></div>
                <CardContent className="p-4">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : paintings.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <h3 className="text-xl font-semibold mb-2">No artworks available yet</h3>
              <p className="text-gray-600 mb-4">
                Be the first to share your art collection with the world.
              </p>
              {user ? (
                <Button onClick={() => navigate('/gallery/manage/add')}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Artwork
                </Button>
              ) : (
                <Button onClick={() => navigate('/auth')}>
                  Join the Gallery
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paintings.map((painting) => (
              <Card key={painting.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                {painting.public_image_url && (
                  <div className="h-64 overflow-hidden">
                    <img
                      src={painting.public_image_url}
                      alt={getLocalizedTitle(painting)}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg line-clamp-1">
                    {getLocalizedTitle(painting)}
                  </CardTitle>
                  <CardDescription className="line-clamp-1">
                    {getLocalizedArtist(painting)}
                    {painting.year && ` (${painting.year})`}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  {getLocalizedDescription(painting) && (
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {getLocalizedDescription(painting)}
                    </p>
                  )}
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">Authenticated</Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/gallery/${painting.id}`)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Gallery;
