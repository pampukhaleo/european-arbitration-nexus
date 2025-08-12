
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Layout from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, QrCode, FileText, Award, Calendar } from 'lucide-react';

interface Certificate {
  name: string;
  type: string;
  issuer: string;
  date: string;
  url: string;
}

interface Document {
  name: string;
  type: string;
  date: string;
  url: string;
}

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
  certificates: Certificate[];
  documents: Document[];
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
                <div className="flex items-center gap-2 text-lg text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{painting.year}</span>
                </div>
              )}
            </div>

            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="description">{t('gallery.description')}</TabsTrigger>
                <TabsTrigger value="technical">{t('gallery.technical')}</TabsTrigger>
                <TabsTrigger value="expertise">{t('gallery.expertise')}</TabsTrigger>
                <TabsTrigger value="certificates">{t('gallery.certificates')}</TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="mt-4">
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
              </TabsContent>
              
              <TabsContent value="technical" className="mt-4">
                {getLocalizedText('technical_analysis') && (
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
                )}
              </TabsContent>
              
              <TabsContent value="expertise" className="mt-4">
                {getLocalizedText('expertise_report') && (
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
                )}
              </TabsContent>
              
              <TabsContent value="certificates" className="mt-4">
                <div className="space-y-4">
                  {painting.certificates && painting.certificates.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Award className="h-5 w-5" />
                          {t('gallery.certificates')}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {painting.certificates.map((cert, index) => (
                            <div key={index} className="border rounded-lg p-3">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-medium">{cert.name}</h4>
                                <Badge variant="outline">{cert.type}</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {t('gallery.issuer')}: {cert.issuer} • {cert.date}
                              </p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                  
                  {painting.documents && painting.documents.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <FileText className="h-5 w-5" />
                          {t('gallery.documents')}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {painting.documents.map((doc, index) => (
                            <div key={index} className="border rounded-lg p-3">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-medium">{doc.name}</h4>
                                <Badge variant="outline">{doc.type}</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {doc.date}
                              </p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>
            </Tabs>

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
