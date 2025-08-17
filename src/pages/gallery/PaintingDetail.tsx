
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Layout from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, QrCode, FileText, Award } from 'lucide-react';

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
  year: number;
  public_image_url: string;
  is_published: boolean;
  owner_id: string;
  certificates: any[];
  documents: any[];
}

const PaintingDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { language, t } = useLanguage();
  const [painting, setPainting] = useState<Painting | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchPainting();
    }
  }, [id]);

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

  const getLocalizedText = (field: 'title' | 'artist' | 'description' | 'technical_analysis' | 'expertise_report') => {
    if (!painting) return '';
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
        <div className="mb-6">
          <Link to="/gallery">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('gallery.backToGallery')}
            </Button>
          </Link>
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
            <div>
              <h1 className="text-3xl font-bold mb-2">{getLocalizedText('title')}</h1>
              <p className="text-xl text-muted-foreground mb-1">{getLocalizedText('artist')}</p>
              {painting.year && (
                <p className="text-lg text-muted-foreground">{painting.year}</p>
              )}
            </div>

            {/* Content Tabs */}
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description">{t('gallery.description')}</TabsTrigger>
                <TabsTrigger value="technical">{t('gallery.technicalAnalysis')}</TabsTrigger>
                <TabsTrigger value="expertise">{t('gallery.expertiseReport')}</TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="mt-4">
                {getLocalizedText('description') ? (
                  <Card>
                    <CardContent className="pt-6">
                      <p className="whitespace-pre-wrap">{getLocalizedText('description')}</p>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardContent className="pt-6">
                      <p className="text-muted-foreground text-center py-8">
                        {t('gallery.noDescription')}
                      </p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
              
              <TabsContent value="technical" className="mt-4">
                {getLocalizedText('technical_analysis') ? (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        {t('gallery.technicalAnalysis')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="whitespace-pre-wrap">{getLocalizedText('technical_analysis')}</p>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardContent className="pt-6">
                      <p className="text-muted-foreground text-center py-8">
                        {t('gallery.noTechnicalAnalysis')}
                      </p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
              
              <TabsContent value="expertise" className="mt-4">
                {getLocalizedText('expertise_report') ? (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Award className="h-5 w-5" />
                        {t('gallery.expertiseReport')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="whitespace-pre-wrap">{getLocalizedText('expertise_report')}</p>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardContent className="pt-6">
                      <p className="text-muted-foreground text-center py-8">
                        {t('gallery.noExpertiseReport')}
                      </p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>

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

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <QrCode className="h-5 w-5" />
                  {t('gallery.expertAccess')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  {t('gallery.expertAccessDescription')}
                </p>
                <p className="text-sm text-muted-foreground">
                  {t('gallery.qrCodeInfo')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PaintingDetail;
