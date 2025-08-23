import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useUserRole } from '@/hooks/useUserRole';
import { supabase } from '@/integrations/supabase/client';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft, Save } from 'lucide-react';
import ImageUpload from '@/components/gallery/ImageUpload';

interface PaintingFormData {
  // Key Facts fields (main fields)
  full_title_en: string;
  full_title_fr: string;
  full_title_ru: string;
  artist_en: string;
  artist_fr: string;
  artist_ru: string;
  description_en: string;
  description_fr: string;
  description_ru: string;
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
  year: number | null;
  public_image_url: string;
  is_published: boolean;
  owner_id: string;
}

interface PrivateFormData {
  eac_inventory_no: string;
  eac_passport_no: string;
  eac_issue_date: string;
}

const PaintingForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useLanguage();
  const { isAdmin, loading: roleLoading } = useUserRole();
  const { toast } = useToast();
  
  const isEditing = Boolean(id);
  const [loading, setLoading] = useState(false);
  const [owners, setOwners] = useState<Array<{id: string, email: string, full_name: string}>>([]);
  const [formData, setFormData] = useState<PaintingFormData>({
    full_title_en: '',
    full_title_fr: '',
    full_title_ru: '',
    artist_en: '',
    artist_fr: '',
    artist_ru: '',
    description_en: '',
    description_fr: '',
    description_ru: '',
    artist_dates: '',
    date_place_made_en: '',
    date_place_made_fr: '',
    date_place_made_ru: '',
    materials_en: '',
    materials_fr: '',
    materials_ru: '',
    dimensions: '',
    acquisition_credit_en: '',
    acquisition_credit_fr: '',
    acquisition_credit_ru: '',
    frame_en: '',
    frame_fr: '',
    frame_ru: '',
    genre_en: '',
    genre_fr: '',
    genre_ru: '',
    year: null,
    public_image_url: '',
    is_published: true,
    owner_id: '',
  });

  const [privateData, setPrivateData] = useState<PrivateFormData>({
    eac_inventory_no: '',
    eac_passport_no: '',
    eac_issue_date: '',
  });

  useEffect(() => {
    if (!roleLoading) {
      if (!isAdmin) {
        navigate('/gallery/manage');
        return;
      }
      fetchOwners();
      if (isEditing && id) {
        fetchPainting();
      }
    }
  }, [id, isEditing, isAdmin, roleLoading]);

  const fetchOwners = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, email, full_name')
        .order('email');

      if (error) throw error;
      setOwners(data || []);
    } catch (error) {
      console.error('Error fetching owners:', error);
    }
  };

  const fetchPainting = async () => {
    if (!id || !user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('paintings')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      
      if (data) {
        setFormData({
          full_title_en: data.full_title_en || data.title_en || '',
          full_title_fr: data.full_title_fr || data.title_fr || '',
          full_title_ru: data.full_title_ru || data.title_ru || '',
          artist_en: data.artist_en || '',
          artist_fr: data.artist_fr || '',
          artist_ru: data.artist_ru || '',
          description_en: data.description_en || '',
          description_fr: data.description_fr || '',
          description_ru: data.description_ru || '',
          artist_dates: data.artist_dates || '',
          date_place_made_en: data.date_place_made_en || '',
          date_place_made_fr: data.date_place_made_fr || '',
          date_place_made_ru: data.date_place_made_ru || '',
          materials_en: data.materials_en || '',
          materials_fr: data.materials_fr || '',
          materials_ru: data.materials_ru || '',
          dimensions: data.dimensions || '',
          acquisition_credit_en: data.acquisition_credit_en || '',
          acquisition_credit_fr: data.acquisition_credit_fr || '',
          acquisition_credit_ru: data.acquisition_credit_ru || '',
          frame_en: data.frame_en || '',
          frame_fr: data.frame_fr || '',
          frame_ru: data.frame_ru || '',
          genre_en: data.genre_en || '',
          genre_fr: data.genre_fr || '',
          genre_ru: data.genre_ru || '',
          year: data.year,
          public_image_url: data.public_image_url || '',
          is_published: data.is_published ?? true,
          owner_id: data.owner_id || '',
        });

        // Fetch private data
        const { data: privateDataResult, error: privateError } = await supabase
          .from('painting_private')
          .select('*')
          .eq('painting_id', id)
          .maybeSingle();

        if (!privateError && privateDataResult) {
          setPrivateData({
            eac_inventory_no: privateDataResult.eac_inventory_no || '',
            eac_passport_no: privateDataResult.eac_passport_no || '',
            eac_issue_date: privateDataResult.eac_issue_date || '',
          });
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch painting",
        variant: "destructive",
      });
      navigate('/gallery/manage');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !isAdmin) return;

    if (!formData.owner_id) {
      toast({
        title: "Error",
        description: "Please select an owner for the painting",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    // For new paintings, auto-populate French and Russian fields from English
    const paintingData = {
      ...formData,
      // Auto-populate missing language fields for new paintings
      full_title_fr: formData.full_title_fr || formData.full_title_en,
      full_title_ru: formData.full_title_ru || formData.full_title_en,
      artist_fr: formData.artist_fr || formData.artist_en,
      artist_ru: formData.artist_ru || formData.artist_en,
      description_fr: formData.description_fr || formData.description_en,
      description_ru: formData.description_ru || formData.description_en,
      date_place_made_fr: formData.date_place_made_fr || formData.date_place_made_en,
      date_place_made_ru: formData.date_place_made_ru || formData.date_place_made_en,
      materials_fr: formData.materials_fr || formData.materials_en,
      materials_ru: formData.materials_ru || formData.materials_en,
      acquisition_credit_fr: formData.acquisition_credit_fr || formData.acquisition_credit_en,
      acquisition_credit_ru: formData.acquisition_credit_ru || formData.acquisition_credit_en,
      frame_fr: formData.frame_fr || formData.frame_en,
      frame_ru: formData.frame_ru || formData.frame_en,
      genre_fr: formData.genre_fr || formData.genre_en,
      genre_ru: formData.genre_ru || formData.genre_en,
      // Sync title_* fields with full_title_* for backwards compatibility
      title_en: formData.full_title_en || formData.artist_en,
      title_fr: formData.full_title_fr || formData.full_title_en || formData.artist_fr || formData.artist_en,
      title_ru: formData.full_title_ru || formData.full_title_en || formData.artist_ru || formData.artist_en,
      updated_at: new Date().toISOString(),
    };

    let paintingId = id;
    
    try {
      // Save painting data
      if (isEditing && id) {
        const { error } = await supabase
          .from('paintings')
          .update(paintingData)
          .eq('id', id);
        
        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from('paintings')
          .insert([paintingData])
          .select('id')
          .single();
        
        if (error) throw error;
        paintingId = data.id;
      }

      // Save private data
      if (paintingId && (privateData.eac_inventory_no || privateData.eac_passport_no || privateData.eac_issue_date)) {
        const { error: privateError } = await supabase
          .from('painting_private')
          .upsert({
            painting_id: paintingId,
            ...privateData,
            eac_issue_date: privateData.eac_issue_date || null,
          });

        if (privateError) throw privateError;
      }

      toast({
        title: "Success",
        description: `Painting ${isEditing ? 'updated' : 'created'} successfully`,
      });
      navigate('/gallery/manage');
    } catch (error) {
      console.error('Database error:', error);
      toast({
        title: "Error",
        description: `Failed to ${isEditing ? 'update' : 'create'} painting`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (field: keyof PaintingFormData, value: string | number | boolean | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updatePrivateData = (field: keyof PrivateFormData, value: string) => {
    setPrivateData(prev => ({ ...prev, [field]: value }));
  };

  if (roleLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading...</div>
        </div>
      </Layout>
    );
  }

  if (!isAdmin) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
            <p className="text-muted-foreground mb-4">
              Only administrators can add or edit paintings.
            </p>
            <Button onClick={() => navigate('/gallery/manage')}>
              Back to Gallery Management
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

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

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <Card>
            <CardHeader>
              <CardTitle>Image</CardTitle>
            </CardHeader>
            <CardContent>
              <ImageUpload
                currentImageUrl={formData.public_image_url}
                onImageUploaded={(url) => updateFormData('public_image_url', url)}
                onImageRemoved={() => updateFormData('public_image_url', '')}
              />
            </CardContent>
          </Card>

          {/* Owner Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Owner</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="owner_id">Select Owner</Label>
                <Select value={formData.owner_id} onValueChange={(value) => updateFormData('owner_id', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an owner..." />
                  </SelectTrigger>
                  <SelectContent>
                    {owners.map((owner) => (
                      <SelectItem key={owner.id} value={owner.id}>
                        {owner.full_name || owner.email} ({owner.email})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Key Facts (Main Information) */}
          <Card>
            <CardHeader>
              <CardTitle>Key Facts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {isEditing ? (
                <Tabs defaultValue="en" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="en">English</TabsTrigger>
                    <TabsTrigger value="fr">Français</TabsTrigger>
                    <TabsTrigger value="ru">Русский</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="en" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="full_title_en">Title (English)</Label>
                        <Input
                          id="full_title_en"
                          value={formData.full_title_en}
                          onChange={(e) => updateFormData('full_title_en', e.target.value)}
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
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="date_place_made_en">Date and Place Made</Label>
                        <Input
                          id="date_place_made_en"
                          value={formData.date_place_made_en}
                          onChange={(e) => updateFormData('date_place_made_en', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="materials_en">Materials</Label>
                        <Input
                          id="materials_en"
                          value={formData.materials_en}
                          onChange={(e) => updateFormData('materials_en', e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="acquisition_credit_en">Acquisition Credit</Label>
                        <Input
                          id="acquisition_credit_en"
                          value={formData.acquisition_credit_en}
                          onChange={(e) => updateFormData('acquisition_credit_en', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="frame_en">Frame</Label>
                        <Input
                          id="frame_en"
                          value={formData.frame_en}
                          onChange={(e) => updateFormData('frame_en', e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="genre_en">Genre</Label>
                      <Input
                        id="genre_en"
                        value={formData.genre_en}
                        onChange={(e) => updateFormData('genre_en', e.target.value)}
                      />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="fr" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="full_title_fr">Titre (Français)</Label>
                        <Input
                          id="full_title_fr"
                          value={formData.full_title_fr}
                          onChange={(e) => updateFormData('full_title_fr', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="artist_fr">Artiste (Français)</Label>
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
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="date_place_made_fr">Date et Lieu de Création</Label>
                        <Input
                          id="date_place_made_fr"
                          value={formData.date_place_made_fr}
                          onChange={(e) => updateFormData('date_place_made_fr', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="materials_fr">Matériaux</Label>
                        <Input
                          id="materials_fr"
                          value={formData.materials_fr}
                          onChange={(e) => updateFormData('materials_fr', e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="acquisition_credit_fr">Crédit d'Acquisition</Label>
                        <Input
                          id="acquisition_credit_fr"
                          value={formData.acquisition_credit_fr}
                          onChange={(e) => updateFormData('acquisition_credit_fr', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="frame_fr">Cadre</Label>
                        <Input
                          id="frame_fr"
                          value={formData.frame_fr}
                          onChange={(e) => updateFormData('frame_fr', e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="genre_fr">Genre</Label>
                      <Input
                        id="genre_fr"
                        value={formData.genre_fr}
                        onChange={(e) => updateFormData('genre_fr', e.target.value)}
                      />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="ru" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="full_title_ru">Название (Русский)</Label>
                        <Input
                          id="full_title_ru"
                          value={formData.full_title_ru}
                          onChange={(e) => updateFormData('full_title_ru', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="artist_ru">Художник (Русский)</Label>
                        <Input
                          id="artist_ru"
                          value={formData.artist_ru}
                          onChange={(e) => updateFormData('artist_ru', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="description_ru">Описание (Русский)</Label>
                      <Textarea
                        id="description_ru"
                        value={formData.description_ru}
                        onChange={(e) => updateFormData('description_ru', e.target.value)}
                        rows={3}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="date_place_made_ru">Дата и Место Создания</Label>
                        <Input
                          id="date_place_made_ru"
                          value={formData.date_place_made_ru}
                          onChange={(e) => updateFormData('date_place_made_ru', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="materials_ru">Материалы</Label>
                        <Input
                          id="materials_ru"
                          value={formData.materials_ru}
                          onChange={(e) => updateFormData('materials_ru', e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="acquisition_credit_ru">Кредит Приобретения</Label>
                        <Input
                          id="acquisition_credit_ru"
                          value={formData.acquisition_credit_ru}
                          onChange={(e) => updateFormData('acquisition_credit_ru', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="frame_ru">Рама</Label>
                        <Input
                          id="frame_ru"
                          value={formData.frame_ru}
                          onChange={(e) => updateFormData('frame_ru', e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="genre_ru">Жанр</Label>
                      <Input
                        id="genre_ru"
                        value={formData.genre_ru}
                        onChange={(e) => updateFormData('genre_ru', e.target.value)}
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              ) : (
                /* English-only form for adding new paintings */
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="full_title_en">Title</Label>
                      <Input
                        id="full_title_en"
                        value={formData.full_title_en}
                        onChange={(e) => updateFormData('full_title_en', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="artist_en">Artist</Label>
                      <Input
                        id="artist_en"
                        value={formData.artist_en}
                        onChange={(e) => updateFormData('artist_en', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="description_en">Description</Label>
                    <Textarea
                      id="description_en"
                      value={formData.description_en}
                      onChange={(e) => updateFormData('description_en', e.target.value)}
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="date_place_made_en">Date and Place Made</Label>
                      <Input
                        id="date_place_made_en"
                        value={formData.date_place_made_en}
                        onChange={(e) => updateFormData('date_place_made_en', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="materials_en">Materials</Label>
                      <Input
                        id="materials_en"
                        value={formData.materials_en}
                        onChange={(e) => updateFormData('materials_en', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="acquisition_credit_en">Acquisition Credit</Label>
                      <Input
                        id="acquisition_credit_en"
                        value={formData.acquisition_credit_en}
                        onChange={(e) => updateFormData('acquisition_credit_en', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="frame_en">Frame</Label>
                      <Input
                        id="frame_en"
                        value={formData.frame_en}
                        onChange={(e) => updateFormData('frame_en', e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="genre_en">Genre</Label>
                    <Input
                      id="genre_en"
                      value={formData.genre_en}
                      onChange={(e) => updateFormData('genre_en', e.target.value)}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-4 pt-4 border-t">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="artist_dates">Artist Dates</Label>
                    <Input
                      id="artist_dates"
                      value={formData.artist_dates}
                      onChange={(e) => updateFormData('artist_dates', e.target.value)}
                      placeholder="e.g., 1881-1973"
                    />
                  </div>
                  <div>
                    <Label htmlFor="dimensions">Dimensions</Label>
                    <Input
                      id="dimensions"
                      value={formData.dimensions}
                      onChange={(e) => updateFormData('dimensions', e.target.value)}
                      placeholder="e.g., 100 × 80 cm"
                    />
                  </div>
                </div>
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
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="is_published"
                      checked={formData.is_published}
                      onCheckedChange={(checked) => updateFormData('is_published', checked)}
                    />
                    <Label htmlFor="is_published">Published</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Private Information (EAC Data) */}
          <Card>
            <CardHeader>
              <CardTitle>Private Information (EAC Data)</CardTitle>
              <p className="text-sm text-muted-foreground">
                This information is only accessible via QR code tokens or by owners/admins
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="eac_inventory_no">EAC Inventory No.</Label>
                  <Input
                    id="eac_inventory_no"
                    value={privateData.eac_inventory_no}
                    onChange={(e) => updatePrivateData('eac_inventory_no', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="eac_passport_no">EAC Passport No.</Label>
                  <Input
                    id="eac_passport_no"
                    value={privateData.eac_passport_no}
                    onChange={(e) => updatePrivateData('eac_passport_no', e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="eac_issue_date">Date of Issue</Label>
                <Input
                  id="eac_issue_date"
                  type="date"
                  value={privateData.eac_issue_date}
                  onChange={(e) => updatePrivateData('eac_issue_date', e.target.value)}
                />
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
