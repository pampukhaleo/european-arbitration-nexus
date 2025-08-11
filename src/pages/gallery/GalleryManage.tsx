
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Eye, QrCode, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

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
  is_published: boolean;
  created_at: string;
}

const GalleryManage = () => {
  const { user, signOut } = useAuth();
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [paintings, setPaintings] = useState<Painting[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPaintings();
  }, []);

  const fetchPaintings = async () => {
    if (!user) return;
    
    setLoading(true);
    const { data, error } = await supabase
      .from('paintings')
      .select('*')
      .eq('owner_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch paintings",
        variant: "destructive",
      });
    } else {
      setPaintings(data || []);
    }
    
    setLoading(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
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

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Gallery Management</h1>
            <p className="text-muted-foreground">
              Welcome back, {user?.user_metadata?.full_name || user?.email}
            </p>
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={() => navigate('/gallery/manage/add')}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Painting
            </Button>
            <Button variant="outline" onClick={handleSignOut}>
              Sign Out
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                <CardContent className="p-4">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded mb-4"></div>
                  <div className="flex gap-2">
                    <div className="h-8 bg-gray-200 rounded flex-1"></div>
                    <div className="h-8 bg-gray-200 rounded flex-1"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : paintings.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <h3 className="text-lg font-semibold mb-2">No paintings yet</h3>
              <p className="text-muted-foreground mb-4">
                Start building your gallery by adding your first painting.
              </p>
              <Button onClick={() => navigate('/gallery/manage/add')}>
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Painting
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paintings.map((painting) => (
              <Card key={painting.id} className="overflow-hidden">
                {painting.public_image_url && (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={painting.public_image_url}
                      alt={getLocalizedTitle(painting)}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg line-clamp-1">
                        {getLocalizedTitle(painting)}
                      </CardTitle>
                      <CardDescription className="line-clamp-1">
                        {getLocalizedArtist(painting)}
                        {painting.year && ` (${painting.year})`}
                      </CardDescription>
                    </div>
                    <Badge variant={painting.is_published ? "default" : "secondary"}>
                      {painting.is_published ? "Published" : "Draft"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => navigate(`/gallery/${painting.id}`)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => navigate(`/gallery/manage/edit/${painting.id}`)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => navigate(`/gallery/manage/tokens/${painting.id}`)}
                    >
                      <QrCode className="h-4 w-4 mr-1" />
                      QR
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

export default GalleryManage;
