
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Layout from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Shield, FileText, Award } from 'lucide-react';

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
  certificates: any[];
  documents: any[];
}

const PrivateAccess = () => {
  const { id, token } = useParams<{ id: string; token: string }>();
  const { language, t } = useLanguage();
  const [painting, setPainting] = useState<Painting | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [accessGranted, setAccessGranted] = useState(false);

  useEffect(() => {
    if (id && token) {
      validateTokenAndFetchPainting();
    }
  }, [id, token]);

  const validateTokenAndFetchPainting = async () => {
    try {
      // Validate token first
      const { data: isValid, error: validationError } = await supabase
        .rpc('validate_access_token', {
          token_text: token,
          painting_id_param: id
        });

      if (validationError || !isValid) {
        throw new Error(t('gallery.invalidToken'));
      }

      setAccessGranted(true);

      // Fetch painting data
      const { data, error } = await supabase
        .from('paintings')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setPainting(data);
    } catch (error) {
      console.error('Error validating token or fetching painting:', error);
      setError(error instanceof Error ? error.message : t('gallery.accessDenied'));
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

  if (error || !accessGranted || !painting) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <Shield className="h-16 w-16 text-destructive mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-4">{t('gallery.accessDenied')}</h1>
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
        <div className="mb-6 flex items-center justify-between">
          <Link to={`/gallery/${id}`}>
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('gallery.backToPainting')}
            </Button>
          </Link>
          <div className="flex items-center gap-2 text-green-600">
            <Shield className="h-5 w-5" />
            <span className="text-sm font-medium">{t('gallery.secureAccess')}</span>
          </div>
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

          {/* Basic Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{getLocalizedText('title')}</h1>
              <p className="text-xl text-muted-foreground mb-1">{getLocalizedText('artist')}</p>
              {painting.year && (
                <p className="text-lg text-muted-foreground">{painting.year}</p>
              )}
            </div>

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
          </div>
        </div>

        {/* Expert Information */}
        <div className="mt-12 space-y-6">
          {getLocalizedText('technical_analysis') && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  {t('gallery.technicalAnalysis')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <p className="whitespace-pre-wrap">{getLocalizedText('technical_analysis')}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {getLocalizedText('expertise_report') && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  {t('gallery.expertiseReport')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <p className="whitespace-pre-wrap">{getLocalizedText('expertise_report')}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Certificates */}
          {painting.certificates && painting.certificates.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>{t('gallery.certificates')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {painting.certificates.map((cert: any, index: number) => (
                    <div key={index} className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">{cert.name || `${t('gallery.certificate')} ${index + 1}`}</h4>
                      {cert.url && (
                        <a
                          href={cert.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline text-sm"
                        >
                          {t('gallery.viewDocument')}
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
                <CardTitle>{t('gallery.documents')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {painting.documents.map((doc: any, index: number) => (
                    <div key={index} className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">{doc.name || `${t('gallery.document')} ${index + 1}`}</h4>
                      {doc.url && (
                        <a
                          href={doc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline text-sm"
                        >
                          {t('gallery.viewDocument')}
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
    </Layout>
  );
};

export default PrivateAccess;
