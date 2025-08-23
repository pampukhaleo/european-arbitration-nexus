import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useUserRole } from '@/hooks/useUserRole';
import { supabase } from '@/integrations/supabase/client';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { ArrowLeft, QrCode, Settings, Lock, Info, Award, FileText, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface Painting {
  id: string;
  title_en: string;
  title_fr: string;
  title_ru: string;
  artist_en: string;
  artist_fr: string;
  artist_ru: string;
  artist_dates: string | null;
  year: number | null;
  full_title_en: string | null;
  full_title_fr: string | null;
  full_title_ru: string | null;
  date_place_made_en: string | null;
  date_place_made_fr: string | null;
  date_place_made_ru: string | null;
  materials_en: string | null;
  materials_fr: string | null;
  materials_ru: string | null;
  dimensions: string | null;
  genre_en: string | null;
  genre_fr: string | null;
  genre_ru: string | null;
  description_en: string | null;
  description_fr: string | null;
  description_ru: string | null;
  frame_en: string | null;
  frame_fr: string | null;
  frame_ru: string | null;
  acquisition_credit_en: string | null;
  acquisition_credit_fr: string | null;
  acquisition_credit_ru: string | null;
  public_image_url: string | null;
  certificates: any[] | null;
  documents: any[] | null;
  is_published: boolean;
  created_at: string;
  owner_id: string;
}

interface PaintingPrivate {
  eac_inventory_no: string | null;
  eac_passport_no: string | null;
  eac_issue_date: string | null;
}

const PaintingDetail = () => {
  const { id, token } = useParams<{ id: string; token?: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { language } = useLanguage();
  const { isAdmin, isOwner } = useUserRole();
  const { toast } = useToast();
  
  const [painting, setPainting] = useState<Painting | null>(null);
  const [privateData, setPrivateData] = useState<PaintingPrivate | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [showPrivateInfo, setShowPrivateInfo] = useState(false);
  const [tokenError, setTokenError] = useState<string | null>(null);

  // Effect 1: Fetch painting data (only depends on id)
  useEffect(() => {
    if (id) {
      fetchPainting();
    }
  }, [id]);

  // Effect 2: Fetch private data via token (only when token exists)
  useEffect(() => {
    if (id && token) {
      fetchPrivateData();
    }
  }, [id, token]);

  // Effect 3: Check ownership and fetch private data (only for logged in users with painting data)
  useEffect(() => {
    if (id && user && painting && !token) {
      checkOwnershipAndFetchPrivate();
    }
  }, [id, user, painting, isAdmin]);

  const fetchPainting = async () => {
    if (!id) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('paintings')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setPainting(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch painting details",
        variant: "destructive",
      });
      navigate('/gallery');
    } finally {
      setLoading(false);
    }
  };

  const fetchPrivateData = async () => {
    if (!id || !token) return;
    
    try {
      const { data, error } = await supabase.rpc('get_private_painting_info', {
        token_text: token,
        painting_id_param: id
      });

      if (error) {
        console.error('Error fetching private data:', error);
        setTokenError('Invalid or expired access token');
        toast({
          title: "Access Denied",
          description: "The access token is invalid or expired",
          variant: "destructive",
        });
        return;
      }
      
      if (data && data.length > 0) {
        setPrivateData(data[0]);
        setShowPrivateInfo(true);
      } else {
        setTokenError('No private data available');
        toast({
          title: "No Data",
          description: "No private information available for this token",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error fetching private data:', error);
      setTokenError('Failed to access private information');
      toast({
        title: "Error",
        description: "Failed to access private information",
        variant: "destructive",
      });
    }
  };

  const checkOwnershipAndFetchPrivate = async () => {
    if (!id || !user || !painting) return;
    
    // Check if user is owner or admin
    const isOwnerOrAdmin = isAdmin || painting.owner_id === user.id;
    
    if (isOwnerOrAdmin) {
      try {
        const { data, error } = await supabase
          .from('painting_private')
          .select('*')
          .eq('painting_id', id)
          .single();

        if (error && error.code !== 'PGRST116') {
          throw error;
        }
        
        if (data) {
          setPrivateData(data);
          setShowPrivateInfo(true);
        }
      } catch (error) {
        console.error('Error fetching private data for owner:', error);
      }
    }
  };

  const handleDelete = async () => {
    if (!painting || !isAdmin) return;
    
    setDeleting(true);
    try {
      const { error } = await supabase
        .from('paintings')
        .delete()
        .eq('id', painting.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Painting deleted successfully",
      });
      
      navigate('/gallery/manage');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete painting",
        variant: "destructive",
      });
    } finally {
      setDeleting(false);
    }
  };

  const getLocalizedText = (key: string) => {
    if (!painting) return '';
    
    switch (language) {
      case 'fr': return painting[`${key}_fr` as keyof Painting] as string || '';
      case 'ru': return painting[`${key}_ru` as keyof Painting] as string || '';
      default: return painting[`${key}_en` as keyof Painting] as string || '';
    }
  };

  const canManage = () => {
    if (!user || !painting) return false;
    return isAdmin || painting.owner_id === user.id;
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading...</div>
        </div>
      </Layout>
    );
  }

  if (!painting) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Painting Not Found</h1>
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
        {/* Header with navigation and actions */}
        <div className="flex justify-between items-center mb-8">
          <Button variant="outline" onClick={() => navigate('/gallery')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Gallery
          </Button>
          
          <div className="flex gap-2">
            {canManage() && (
              <>
                <Button
                  variant="outline"
                  onClick={() => navigate(`/gallery/manage/tokens/${painting.id}`)}
                >
                  <QrCode className="h-4 w-4 mr-2" />
                  QR Codes
                </Button>
                {isAdmin && (
                  <Button
                    variant="outline"
                    onClick={() => navigate(`/gallery/manage/edit/${painting.id}`)}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                )}
                {isAdmin && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        disabled={deleting}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Painting</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{getLocalizedText('title')}"? 
                          This will permanently delete the painting and all associated data including access tokens and logs.
                          This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleDelete}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Delete Painting
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="space-y-4">
            {painting.public_image_url ? (
              <div className="aspect-square overflow-hidden rounded-lg border">
                <img
                  src={painting.public_image_url}
                  alt={getLocalizedText('title')}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="aspect-square bg-gray-100 rounded-lg border flex items-center justify-center">
                <p className="text-gray-500">No image available</p>
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            {/* Title and Status */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-3xl font-bold">{getLocalizedText('title')}</h1>
                <Badge variant={painting.is_published ? "default" : "secondary"}>
                  {painting.is_published ? "Published" : "Draft"}
                </Badge>
              </div>
              <p className="text-xl text-muted-foreground">
                {getLocalizedText('artist')}
                {painting.artist_dates && ` (${painting.artist_dates})`}
              </p>
              {getLocalizedText('full_title') && (
                <p className="text-lg text-muted-foreground italic mt-2">
                  {getLocalizedText('full_title')}
                </p>
              )}
            </div>

            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {painting.year && (
                  <div className="flex justify-between">
                    <span className="font-medium">Year:</span>
                    <span>{painting.year}</span>
                  </div>
                )}
                {getLocalizedText('date_place_made') && (
                  <div className="flex justify-between">
                    <span className="font-medium">Date & Place:</span>
                    <span>{getLocalizedText('date_place_made')}</span>
                  </div>
                )}
                {getLocalizedText('materials') && (
                  <div className="flex justify-between">
                    <span className="font-medium">Materials:</span>
                    <span>{getLocalizedText('materials')}</span>
                  </div>
                )}
                {painting.dimensions && (
                  <div className="flex justify-between">
                    <span className="font-medium">Dimensions:</span>
                    <span>{painting.dimensions}</span>
                  </div>
                )}
                {getLocalizedText('genre') && (
                  <div className="flex justify-between">
                    <span className="font-medium">Genre:</span>
                    <span>{getLocalizedText('genre')}</span>
                  </div>
                )}
                {getLocalizedText('frame') && (
                  <div className="flex justify-between">
                    <span className="font-medium">Frame:</span>
                    <span>{getLocalizedText('frame')}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Description */}
            {getLocalizedText('description') && (
              <Card>
                <CardHeader>
                  <CardTitle>Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="whitespace-pre-wrap">{getLocalizedText('description')}</p>
                </CardContent>
              </Card>
            )}

            {/* Acquisition Credit */}
            {getLocalizedText('acquisition_credit') && (
              <Card>
                <CardHeader>
                  <CardTitle>Acquisition Credit</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="whitespace-pre-wrap">{getLocalizedText('acquisition_credit')}</p>
                </CardContent>
              </Card>
            )}

            {/* Private Information (only visible with valid token or for owners/admins) */}
            {showPrivateInfo && privateData && (
              <Card className="border-blue-200 bg-blue-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-700">
                    <Lock className="h-5 w-5" />
                    Private Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {privateData.eac_inventory_no && (
                    <div className="flex justify-between">
                      <span className="font-medium">EAC Inventory No:</span>
                      <span>{privateData.eac_inventory_no}</span>
                    </div>
                  )}
                  {privateData.eac_passport_no && (
                    <div className="flex justify-between">
                      <span className="font-medium">EAC Passport No:</span>
                      <span>{privateData.eac_passport_no}</span>
                    </div>
                  )}
                  {privateData.eac_issue_date && (
                    <div className="flex justify-between">
                      <span className="font-medium">EAC Issue Date:</span>
                      <span>{new Date(privateData.eac_issue_date).toLocaleDateString()}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Show error message if token is invalid */}
            {token && tokenError && (
              <Card className="border-red-200 bg-red-50">
                <CardContent className="p-4 text-center">
                  <p className="text-red-700">{tokenError}</p>
                </CardContent>
              </Card>
            )}

            {/* Certificates */}
            {painting.certificates && painting.certificates.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Certificates ({painting.certificates.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {painting.certificates.map((cert: any, index: number) => (
                      <div key={index} className="border rounded-lg p-4">
                        <h4 className="font-semibold mb-2">{cert.name}</h4>
                        {cert.url && (
                          <a
                            href={cert.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            <FileText className="h-4 w-4 inline mr-1" />
                            View Certificate
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Documents */}
            {painting.documents && painting.documents.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Documents ({painting.documents.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {painting.documents.map((doc: any, index: number) => (
                      <div key={index} className="border rounded-lg p-4">
                        <h4 className="font-semibold mb-2">{doc.name}</h4>
                        {doc.url && (
                          <a
                            href={doc.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            <FileText className="h-4 w-4 inline mr-1" />
                            View Document
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PaintingDetail;
