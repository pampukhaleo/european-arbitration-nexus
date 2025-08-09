
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Seo } from "@/components/Seo";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePublicPainting } from "@/hooks/useGallery";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Calendar, User, Lock } from "lucide-react";
import { Loader2 } from "lucide-react";

export default function PaintingDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  
  const { data: painting, isLoading, error } = usePublicPainting(id!);

  const getLocalizedField = (field: 'title' | 'artist' | 'description') => {
    if (!painting) return '';
    return painting[`${field}_${language}`] || painting[`${field}_en`] || '';
  };

  const handleBackToGallery = () => {
    navigate('/gallery');
  };

  const handlePrivateAccess = () => {
    navigate(`/gallery/${id}/private`);
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

  if (error || !painting) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">{t('errors.notFound')}</h1>
            <p className="text-muted-foreground mb-6">{t('errors.loadFailed')}</p>
            <Button onClick={handleBackToGallery}>
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
        title={`${getLocalizedField('title')} - ${getLocalizedField('artist')}`}
        description={getLocalizedField('description') || `${t('painting.details')} - ${getLocalizedField('title')}`}
        lang={language}
      />
      
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <Button 
            onClick={handleBackToGallery}
            variant="ghost"
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('painting.backToGallery')}
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Section */}
            <div className="space-y-4">
              <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                {painting.public_image_url ? (
                  <img
                    src={painting.public_image_url}
                    alt={getLocalizedField('title')}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <User size={96} />
                  </div>
                )}
              </div>
            </div>

            {/* Details Section */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  {getLocalizedField('title')}
                </h1>
                
                <div className="flex items-center gap-2 text-lg text-muted-foreground mb-2">
                  <User size={20} />
                  <span>{getLocalizedField('artist')}</span>
                </div>
                
                {painting.year && (
                  <div className="flex items-center gap-2 text-lg text-muted-foreground mb-4">
                    <Calendar size={20} />
                    <span>{painting.year}</span>
                  </div>
                )}
              </div>

              {getLocalizedField('description') && (
                <Card>
                  <CardHeader>
                    <CardTitle>{t('painting.description')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground whitespace-pre-wrap">
                      {getLocalizedField('description')}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Private Access Section */}
              <Card className="border-amber-200 bg-amber-50/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-amber-800">
                    <Lock size={20} />
                    {t('painting.privateAccess')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-amber-700 mb-4">
                    {t('painting.tokenRequired')}
                  </p>
                  <Button 
                    onClick={handlePrivateAccess}
                    className="w-full"
                  >
                    {t('painting.accessWithToken')}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
