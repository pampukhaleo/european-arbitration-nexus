import React, { useState, useEffect } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useUserRole } from '@/hooks/useUserRole';
import Layout from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, QrCode, Settings, Lock, Info } from 'lucide-react';

interface Painting {
  id: string;
  title_en: string;
  title_fr: string;
  title_ru: string;
  artist_en: string;
  artist_fr: string;
  artist_ru: string;
  description_en: string;
  description_fr: string;
  description_ru: string;
  technical_analysis_en: string;
  technical_analysis_fr: string;
  technical_analysis_ru: string;
  expertise_report_en: string;
  expertise_report_fr: string;
  expertise_report_ru: string;
  // Key Facts
  full_title_en: string;
  full_title_fr: string;
  full_title_ru: string;
  artist_dates: string;
  date_place_made_en: string;
  date_place_made_fr: string;
  date_place_made_ru: string;
  materials_en: string;
  materials_fr: string;
  materials_ru: string;
  dimensions: string;
  acquisition_credit_en: string;
  acquisition_credit_fr: string;
  acquisition_credit_ru: string;
  frame_en: string;
  frame_fr: string;
  frame_ru: string;
  genre_en: string;
  genre_fr: string;
  genre_ru: string;
  year: number;
  public_image_url: string;
  is_published: boolean;
  owner_id: string;
  certificates: any[];
  documents: any[];
}

interface PrivateInfo {
  eac_inventory_no: string;
  eac_passport_no: string;
  eac_issue_date: string;
}

const PaintingDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const { language, t } = useLanguage();
  const { user } = useAuth();
  const { isAdmin, isOwner } = useUserRole();
  const [painting, setPainting] = useState<Painting | null>(null);
  const [privateInfo, setPrivateInfo] = useState<PrivateInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingPrivate, setLoadingPrivate] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchPainting();
    }
  }, [id]);

  useEffect(() => {
    if (painting && (isOwnerOfPainting || isAdmin)) {
      fetchPrivateInfoDirect();
    } else if (painting && token) {
      fetchPrivateInfoWithToken();
    }
  }, [painting, token, isAdmin]);

  const isOwnerOfPainting = user && painting && painting.owner_id === user.id;

  const fetchPainting = async () => {
    try {
      const { data, error } = await supabase
        .from('paintings')
        .select('*')
        .eq('id', id)
        .eq('is_published', true)
        .single();

      if (error) throw error;
      setPainting(data);
    } catch (error) {
      console.error('Error fetching painting:', error);
      setError(t('gallery.paintingNotFound'));
    } finally {
      setLoading(false);
    }
  };

  const fetchPrivateInfoDirect = async () => {
    if (!painting) return;
    
    setLoadingPrivate(true);
    try {
      const { data, error } = await supabase
        .from('painting_private')
        .select('*')
        .eq('painting_id', painting.id)
        .maybeSingle();

      if (!error && data) {
        setPrivateInfo({
          eac_inventory_no: data.eac_inventory_no || '',
          eac_passport_no: data.eac_passport_no || '',
          eac_issue_date: data.eac_issue_date || '',
        });
      }
    } catch (error) {
      console.error('Error fetching private info:', error);
    } finally {
      setLoadingPrivate(false);
    }
  };

  const fetchPrivateInfoWithToken = async () => {
    if (!painting || !token) return;
    
    setLoadingPrivate(true);
    try {
      const { data, error } = await supabase.rpc('get_private_painting_info', {
        token_text: token,
        painting_id_param: painting.id
      });

      if (!error && data && data.length > 0) {
        const privateData = data[0];
        setPrivateInfo({
          eac_inventory_no: privateData.eac_inventory_no || '',
          eac_passport_no: privateData.eac_passport_no || '',
          eac_issue_date: privateData.eac_issue_date || '',
        });
      }
    } catch (error) {
      console.error('Error fetching private info with token:', error);
    } finally {
      setLoadingPrivate(false);
    }
  };

  const getLocalizedText = (field: 'title' | 'artist' | 'description' | 'full_title' | 'date_place_made' | 'materials' | 'acquisition_credit' | 'frame' | 'genre') => {
    if (!painting) return '';
    
    // For title, use full_title with fallback to title
    if (field === 'title') {
      return painting[`full_title_${language}` as keyof Painting] as string || 
             painting[`title_${language}` as keyof Painting] as string ||
             painting.full_title_en || 
             painting.title_en || '';
    }
    
    return painting[`${field}_${language}` as keyof Painting] as string || 
           painting[`${field}_en` as keyof Painting] as string || '';
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">{t('common.loading')}</div>
        </div>
      </Layout>
    );
  }

  if (error || !painting) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">{t('gallery.error')}</h1>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Link to="/gallery">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t('gallery.backToGallery')}
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex justify-between items-center">
          <Link to="/gallery">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('gallery.backToGallery')}
            </Button>
          </Link>
          
          {/* Owner Management Button */}
          {isOwnerOfPainting && (
            <Link to={`/gallery/manage/tokens/${painting.id}`}>
              <Button>
                <Settings className="mr-2 h-4 w-4" />
                Manage QR & Access
              </Button>
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image */}
          <div className="aspect-square overflow-hidden rounded-lg">
            {painting.public_image_url ? (
              <img
                src={painting.public_image_url}
                alt={getLocalizedText('title')}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <span className="text-muted-foreground">{t('gallery.noImage')}</span>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-6">
            {/* Basic Title and Artist */}
            <div>
              <h1 className="text-3xl font-bold mb-2">{getLocalizedText('title')}</h1>
              <p className="text-xl text-muted-foreground mb-1">{getLocalizedText('artist')}</p>
              {painting.year && (
                <p className="text-lg text-muted-foreground">{painting.year}</p>
              )}
            </div>

            {/* Key Facts Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  KEY FACTS
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {getLocalizedText('full_title') && (
                  <div className="grid grid-cols-3 gap-2">
                    <span className="font-medium text-sm">Full title:</span>
                    <span className="col-span-2 text-sm">{getLocalizedText('full_title')}</span>
                  </div>
                )}
                
                <div className="grid grid-cols-3 gap-2">
                  <span className="font-medium text-sm">Artist:</span>
                  <span className="col-span-2 text-sm">{getLocalizedText('artist')}</span>
                </div>
                
                {painting.artist_dates && (
                  <div className="grid grid-cols-3 gap-2">
                    <span className="font-medium text-sm">Artist dates:</span>
                    <span className="col-span-2 text-sm">{painting.artist_dates}</span>
                  </div>
                )}
                
                {getLocalizedText('date_place_made') && (
                  <div className="grid grid-cols-3 gap-2">
                    <span className="font-medium text-sm">Date and place made:</span>
                    <span className="col-span-2 text-sm">{getLocalizedText('date_place_made')}</span>
                  </div>
                )}
                
                {getLocalizedText('materials') && (
                  <div className="grid grid-cols-3 gap-2">
                    <span className="font-medium text-sm">Materials:</span>
                    <span className="col-span-2 text-sm">{getLocalizedText('materials')}</span>
                  </div>
                )}
                
                {painting.dimensions && (
                  <div className="grid grid-cols-3 gap-2">
                    <span className="font-medium text-sm">Dimensions:</span>
                    <span className="col-span-2 text-sm">{painting.dimensions}</span>
                  </div>
                )}
                
                {getLocalizedText('acquisition_credit') && (
                  <div className="grid grid-cols-3 gap-2">
                    <span className="font-medium text-sm">Acquisition credit:</span>
                    <span className="col-span-2 text-sm">{getLocalizedText('acquisition_credit')}</span>
                  </div>
                )}
                
                {getLocalizedText('frame') && (
                  <div className="grid grid-cols-3 gap-2">
                    <span className="font-medium text-sm">Frame:</span>
                    <span className="col-span-2 text-sm">{getLocalizedText('frame')}</span>
                  </div>
                )}
                
                {getLocalizedText('genre') && (
                  <div className="grid grid-cols-3 gap-2">
                    <span className="font-medium text-sm">Genre:</span>
                    <span className="col-span-2 text-sm">{getLocalizedText('genre')}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Description */}
            {getLocalizedText('description') && (
              <Card>
                <CardHeader>
                  <CardTitle>{t('gallery.description')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="whitespace-pre-wrap">{getLocalizedText('description')}</p>
                </CardContent>
              </Card>
            )}

            {/* Private Information Card */}
            {(isOwnerOfPainting || isAdmin || token) && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5" />
                    Private Information (EAC Data)
                    {(isOwnerOfPainting || isAdmin) && (
                      <Badge variant="outline">Owner Access</Badge>
                    )}
                    {token && !isOwnerOfPainting && !isAdmin && (
                      <Badge variant="secondary">Token Access</Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {loadingPrivate ? (
                    <div className="text-center py-4">Loading private information...</div>
                  ) : privateInfo ? (
                    <div className="space-y-3">
                      {privateInfo.eac_inventory_no && (
                        <div className="grid grid-cols-3 gap-2">
                          <span className="font-medium text-sm">EAC Inventory No.:</span>
                          <span className="col-span-2 text-sm">{privateInfo.eac_inventory_no}</span>
                        </div>
                      )}
                      {privateInfo.eac_passport_no && (
                        <div className="grid grid-cols-3 gap-2">
                          <span className="font-medium text-sm">EAC Passport No.:</span>
                          <span className="col-span-2 text-sm">{privateInfo.eac_passport_no}</span>
                        </div>
                      )}
                      {privateInfo.eac_issue_date && (
                        <div className="grid grid-cols-3 gap-2">
                          <span className="font-medium text-sm">Date of issue:</span>
                          <span className="col-span-2 text-sm">{privateInfo.eac_issue_date}</span>
                        </div>
                      )}
                      {!privateInfo.eac_inventory_no && !privateInfo.eac_passport_no && !privateInfo.eac_issue_date && (
                        <p className="text-muted-foreground text-sm">No private information available</p>
                      )}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm">
                      {token ? 'Invalid or expired token' : 'No private information available'}
                    </p>
                  )}
                </CardContent>
              </Card>
            )}

            {/* QR Access Info for non-owners */}
            {!isOwnerOfPainting && !isAdmin && !token && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <QrCode className="h-5 w-5" />
                    Expert Access Required
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Additional technical information and EAC certification data is available for art experts and professionals.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    To access this information, please scan the QR code provided with this artwork or request access from the owner.
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Documents and Certificates */}
            {(painting.certificates?.length > 0 || painting.documents?.length > 0) && (
              <Card>
                <CardHeader>
                  <CardTitle>{t('gallery.attachments')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {painting.certificates?.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Award className="h-4 w-4" />
                        {t('gallery.certificates')}
                      </h4>
                      <div className="space-y-2">
                        {painting.certificates.map((cert: any, index: number) => (
                          <div key={index} className="flex items-center gap-2 p-2 border rounded">
                            <FileText className="h-4 w-4" />
                            <span className="text-sm">{cert.name || `Certificate ${index + 1}`}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {painting.documents?.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        {t('gallery.documents')}
                      </h4>
                      <div className="space-y-2">
                        {painting.documents.map((doc: any, index: number) => (
                          <div key={index} className="flex items-center gap-2 p-2 border rounded">
                            <FileText className="h-4 w-4" />
                            <span className="text-sm">{doc.name || `Document ${index + 1}`}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
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
