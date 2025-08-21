import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useUserRole } from '@/hooks/useUserRole';
import { supabase } from '@/integrations/supabase/client';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Plus, Edit, Eye, QrCode, BarChart3, ArrowLeft, Settings, Trash2 } from 'lucide-react';
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
  owner_id: string;
}

const GalleryManage = () => {
  const { user, signOut } = useAuth();
  const { t, language } = useLanguage();
  const { role, isAdmin, isOwner, loading: roleLoading } = useUserRole();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [paintings, setPaintings] = useState<Painting[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (!roleLoading && role) {
      fetchPaintings();
    }
  }, [role, roleLoading]);

  const fetchPaintings = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      let query = supabase.from('paintings').select('*');
      
      // Admins see all paintings, owners see only their own
      if (!isAdmin) {
        query = query.eq('owner_id', user.id);
      }
      
      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;
      setPaintings(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch paintings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (paintingId: string) => {
    if (!isAdmin) return;
    
    setDeletingId(paintingId);
    try {
      const { error } = await supabase
        .from('paintings')
        .delete()
        .eq('id', paintingId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Painting deleted successfully",
      });
      
      // Remove from local state
      setPaintings(prev => prev.filter(p => p.id !== paintingId));
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete painting",
        variant: "destructive",
      });
    } finally {
      setDeletingId(null);
    }
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

  if (roleLoading || loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading...</div>
        </div>
      </Layout>
    );
  }

  if (!isAdmin && !isOwner) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
            <p className="text-muted-foreground mb-4">
              You don't have permission to access this page.
            </p>
            <Button onClick={() => navigate('/gallery')}>
              Back to Gallery
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <Button variant="outline" onClick={() => navigate('/gallery')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Go to Gallery
              </Button>
              <h1 className="text-3xl font-bold">
                {isAdmin ? 'Gallery Administration' : 'QR Code Management'}
              </h1>
            </div>
            <p className="text-muted-foreground">
              Welcome back, {user?.user_metadata?.full_name || user?.email}
              {isAdmin && <Badge className="ml-2">Admin</Badge>}
              {isOwner && !isAdmin && <Badge variant="secondary" className="ml-2">Owner</Badge>}
            </p>
          </div>
          <div className="flex gap-2">
            {isAdmin && (
              <Button 
                onClick={() => navigate('/gallery/manage/add')}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Painting
              </Button>
            )}
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
              <h3 className="text-lg font-semibold mb-2">
                {isAdmin ? 'No paintings yet' : 'No paintings assigned'}
              </h3>
              <p className="text-muted-foreground mb-4">
                {isAdmin 
                  ? 'Start building the gallery by adding the first painting.' 
                  : 'You don\'t have any paintings assigned to you yet.'
                }
              </p>
              {isAdmin && (
                <Button onClick={() => navigate('/gallery/manage/add')}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Painting
                </Button>
              )}
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
                  <div className="flex gap-2 flex-wrap">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 min-w-0"
                      onClick={() => navigate(`/gallery/${painting.id}`)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    {isAdmin && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 min-w-0"
                        onClick={() => navigate(`/gallery/manage/edit/${painting.id}`)}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 min-w-0"
                      onClick={() => navigate(`/gallery/manage/tokens/${painting.id}`)}
                    >
                      <QrCode className="h-4 w-4 mr-1" />
                      QR
                    </Button>
                    {isAdmin && (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 min-w-0"
                            disabled={deletingId === painting.id}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Painting</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{getLocalizedTitle(painting)}"? 
                              This will permanently delete the painting and all associated data including access tokens and logs.
                              This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(painting.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Delete Painting
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
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
