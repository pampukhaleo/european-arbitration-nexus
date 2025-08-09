
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Seo } from "@/components/Seo";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePublicPainting, useValidateToken } from "@/hooks/useGallery";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Key, CheckCircle, XCircle, FileText, Award } from "lucide-react";
import { Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function PaintingPrivate() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const [token, setToken] = useState("");
  const [isValidated, setIsValidated] = useState(false);
  
  const { data: painting, isLoading } = usePublicPainting(id!);
  const validateTokenMutation = useValidateToken();

  const getLocalizedField = (field: 'title' | 'artist' | 'description' | 'technical_analysis' | 'expertise_report') => {
    if (!painting) return '';
    return painting[`${field}_${language}`] || painting[`${field}_en`] || '';
  };

  const handleValidateToken = async () => {
    if (!token.trim()) {
      toast({
        title: t('errors.tokenInvalid'),
        description: 'Please enter a valid token',
        variant: 'destructive',
      });
      return;
    }

    try {
      const isValid = await validateTokenMutation.mutateAsync({
        token: token.trim(),
        paintingId: id!
      });

      if (isValid) {
        setIsValidated(true);
        toast({
          title: t('painting.accessGranted'),
          description: 'You now have access to private content',
        });
      } else {
        toast({
          title: t('errors.tokenInvalid'),
          description: t('painting.invalidToken'),
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Token validation error:', error);
      toast({
        title: t('errors.tokenInvalid'),
        description: t('painting.invalidToken'),
        variant: 'destructive',
      });
    }
  };

  const handleBackToPainting = () => {
    navigate(`/gallery/${id}`);
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <Loader2 className="mx-auto h-8 w-8 animate-spin mb-4" />
              <p className="text-muted-foreground">{t('gallery.loading')}</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!painting) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">{t('errors.notFound')}</h1>
            <Button onClick={() => navigate('/gallery')}>
              {t('painting.backToGallery')}
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <>
      <Seo 
        title={`${t('painting.privateAccess')} - ${getLocalizedField('title')}`}
        description={t('painting.tokenRequired')}
        lang={language}
      />
      
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <Button 
            onClick={handleBackToPainting}
            variant="ghost"
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {getLocalizedField('title')}
          </Button>

          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-2">
                {t('painting.privateAccess')}
              </h1>
              <p className="text-muted-foreground mb-6">
                {getLocalizedField('title')} - {getLocalizedField('artist')}
              </p>
            </div>

            {!isValidated ? (
              // Token Input Section
              <Card className="max-w-md mx-auto">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key size={20} />
                    {t('painting.accessWithToken')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {t('painting.tokenRequired')}
                  </p>
                  
                  <div className="space-y-3">
                    <Input
                      type="text"
                      placeholder="Enter access token..."
                      value={token}
                      onChange={(e) => setToken(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleValidateToken()}
                    />
                    
                    <Button 
                      onClick={handleValidateToken}
                      disabled={validateTokenMutation.isPending || !token.trim()}
                      className="w-full"
                    >
                      {validateTokenMutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Validating...
                        </>
                      ) : (
                        'Validate Token'
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              // Private Content Section
              <div className="space-y-6">
                <div className="flex items-center justify-center gap-2 text-green-600 mb-6">
                  <CheckCircle size={24} />
                  <span className="font-semibold">{t('painting.accessGranted')}</span>
                </div>

                {/* Technical Analysis */}
                {getLocalizedField('technical_analysis') && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText size={20} />
                        {t('painting.technicalAnalysis')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="prose max-w-none">
                        <div className="whitespace-pre-wrap text-sm leading-relaxed">
                          {getLocalizedField('technical_analysis')}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Expertise Report */}
                {getLocalizedField('expertise_report') && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Award size={20} />
                        {t('painting.expertiseReport')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="prose max-w-none">
                        <div className="whitespace-pre-wrap text-sm leading-relaxed">
                          {getLocalizedField('expertise_report')}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Certificates */}
                {painting.certificates && painting.certificates.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>{t('painting.certificates')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {painting.certificates.map((cert: any, index: number) => (
                          <div key={index} className="border rounded-lg p-4">
                            <h4 className="font-semibold mb-2">{cert.name}</h4>
                            <p className="text-sm text-muted-foreground mb-2">{cert.type}</p>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => window.open(cert.url, '_blank')}
                            >
                              View Certificate
                            </Button>
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
                      <CardTitle>{t('painting.documents')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {painting.documents.map((doc: any, index: number) => (
                          <div key={index} className="border rounded-lg p-4">
                            <h4 className="font-semibold mb-2">{doc.name}</h4>
                            <p className="text-sm text-muted-foreground mb-2">{doc.type}</p>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => window.open(doc.url, '_blank')}
                            >
                              View Document
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
}
