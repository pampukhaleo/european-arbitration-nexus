
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft, Save } from 'lucide-react';

interface PaintingFormData {
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
  year: number | null;
  public_image_url: string;
  is_published: boolean;
}

const PaintingForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const isEditing = Boolean(id);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<PaintingFormData>({
    title_en: '',
    title_fr: '',
    title_ru: '',
    artist_en: '',
    artist_fr: '',
    artist_ru: '',
    description_en: '',
    description_fr: '',
    description_ru: '',
    technical_analysis_en: '',
    technical_analysis_fr: '',
    technical_analysis_ru: '',
    expertise_report_en: '',
    expertise_report_fr: '',
    expertise_report_ru: '',
    year: null,
    public_image_url: '',
    is_published: true,
  });

  useEffect(() => {
    if (isEditing && id) {
      fetchPainting();
    }
  }, [id, isEditing]);

  const fetchPainting = async () => {
    if (!id || !user) return;
    
    setLoading(true);
    const { data, error } = await supabase
      .from('paintings')
      .select('*')
      .eq('id', id)
      .eq('owner_id', user.id)
      .single();

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch painting",
        variant: "destructive",
      });
      navigate('/gallery/manage');
    } else if (data) {
      setFormData({
        title_en: data.title_en || '',
        title_fr: data.title_fr || '',
        title_ru: data.title_ru || '',
        artist_en: data.artist_en || '',
        artist_fr: data.artist_fr || '',
        artist_ru: data.artist_ru || '',
        description_en: data.description_en || '',
        description_fr: data.description_fr || '',
        description_ru: data.description_ru || '',
        technical_analysis_en: data.technical_analysis_en || '',
        technical_analysis_fr: data.technical_analysis_fr || '',
        technical_analysis_ru: data.technical_analysis_ru || '',
        expertise_report_en: data.expertise_report_en || '',
        expertise_report_fr: data.expertise_report_fr || '',
        expertise_report_ru: data.expertise_report_ru || '',
        year: data.year,
        public_image_url: data.public_image_url || '',
        is_published: data.is_published ?? true,
      });
    }
    
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);

    const paintingData = {
      ...formData,
      owner_id: user.id,
      updated_at: new Date().toISOString(),
    };

    let result;
    if (isEditing && id) {
      result = await supabase
        .from('paintings')
        .update(paintingData)
        .eq('id', id)
        .eq('owner_id', user.id);
    } else {
      result = await supabase
        .from('paintings')
        .insert([paintingData]);
    }

    if (result.error) {
      toast({
        title: "Error",
        description: `Failed to ${isEditing ? 'update' : 'create'} painting`,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: `Painting ${isEditing ? 'updated' : 'created'} successfully`,
      });
      navigate('/gallery/manage');
    }

    setLoading(false);
  };

  const updateFormData = (field: keyof PaintingFormData, value: string | number | boolean | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" onClick={() => navigate('/gallery/manage')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Gallery
          </Button>
          <h1 className="text-3xl font-bold">
            {isEditing ? 'Edit Painting' : 'Add New Painting'}
          </h1>
        </div>

        <form onSubmit={handleSubmit}>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Tabs defaultValue="en" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="en">English</TabsTrigger>
                  <TabsTrigger value="fr">Français</TabsTrigger>
                  <TabsTrigger value="ru">Русский</TabsTrigger>
                </TabsList>
                
                <TabsContent value="en" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="title_en">Title (English)</Label>
                      <Input
                        id="title_en"
                        value={formData.title_en}
                        onChange={(e) => updateFormData('title_en', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="artist_en">Artist (English)</Label>
                      <Input
                        id="artist_en"
                        value={formData.artist_en}
                        onChange={(e) => updateFormData('artist_en', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="description_en">Description (English)</Label>
                    <Textarea
                      id="description_en"
                      value={formData.description_en}
                      onChange={(e) => updateFormData('description_en', e.target.value)}
                      rows={3}
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="fr" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="title_fr">Title (Français)</Label>
                      <Input
                        id="title_fr"
                        value={formData.title_fr}
                        onChange={(e) => updateFormData('title_fr', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="artist_fr">Artist (Français)</Label>
                      <Input
                        id="artist_fr"
                        value={formData.artist_fr}
                        onChange={(e) => updateFormData('artist_fr', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="description_fr">Description (Français)</Label>
                    <Textarea
                      id="description_fr"
                      value={formData.description_fr}
                      onChange={(e) => updateFormData('description_fr', e.target.value)}
                      rows={3}
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="ru" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="title_ru">Title (Русский)</Label>
                      <Input
                        id="title_ru"
                        value={formData.title_ru}
                        onChange={(e) => updateFormData('title_ru', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="artist_ru">Artist (Русский)</Label>
                      <Input
                        id="artist_ru"
                        value={formData.artist_ru}
                        onChange={(e) => updateFormData('artist_ru', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="description_ru">Description (Русский)</Label>
                    <Textarea
                      id="description_ru"
                      value={formData.description_ru}
                      onChange={(e) => updateFormData('description_ru', e.target.value)}
                      rows={3}
                    />
                  </div>
                </TabsContent>
              </Tabs>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="year">Year</Label>
                  <Input
                    id="year"
                    type="number"
                    value={formData.year || ''}
                    onChange={(e) => updateFormData('year', e.target.value ? parseInt(e.target.value) : null)}
                  />
                </div>
                <div>
                  <Label htmlFor="public_image_url">Public Image URL</Label>
                  <Input
                    id="public_image_url"
                    value={formData.public_image_url}
                    onChange={(e) => updateFormData('public_image_url', e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="is_published"
                  checked={formData.is_published}
                  onCheckedChange={(checked) => updateFormData('is_published', checked)}
                />
                <Label htmlFor="is_published">Published</Label>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button type="submit" disabled={loading}>
              <Save className="h-4 w-4 mr-2" />
              {loading ? 'Saving...' : (isEditing ? 'Update Painting' : 'Create Painting')}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate('/gallery/manage')}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default PaintingForm;
