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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft, QrCode, Copy, ExternalLink, BarChart3, Plus, Trash2, Globe, AlertTriangle, Save } from 'lucide-react';
import QRCodeGenerator from '@/components/gallery/QRCodeGenerator';
import AccessStats from '@/components/gallery/AccessStats';
import { getPublicBaseUrl, setPublicBaseUrl, isLovableOrLocalhost } from '@/lib/publicBaseUrl';

interface Painting {
  id: string;
  title_en: string;
  title_fr: string;
  title_ru: string;
  owner_id: string;
}

interface AccessToken {
  id: string;
  token: string;
  template_type: string;
  expires_at: string;
  usage_count: number;
  is_active: boolean;
  created_at: string;
}

const TokenManagement = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { language, t } = useLanguage();
  const { isAdmin, isOwner, loading: roleLoading } = useUserRole();
  const { toast } = useToast();

  const [painting, setPainting] = useState<Painting | null>(null);
  const [tokens, setTokens] = useState<AccessToken[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('24hours');
  const [publicBaseUrl, setPublicBaseUrlState] = useState('');
  const [savingUrl, setSavingUrl] = useState(false);

  useEffect(() => {
    // Initialize public base URL
    setPublicBaseUrlState(getPublicBaseUrl());
  }, []);

  useEffect(() => {
    // Only fetch data when user is available and role loading is complete
    if (id && user && !roleLoading) {
      fetchData();
    }
  }, [id, user, roleLoading, isAdmin]);

  const fetchData = async () => {
    if (!id || !user) return;

    try {
      // Check if user has access to this painting
      let paintingQuery = supabase
        .from('paintings')
        .select('id, title_en, title_fr, title_ru, owner_id')
        .eq('id', id);

      // If not admin, only allow access to own paintings
      if (!isAdmin) {
        paintingQuery = paintingQuery.eq('owner_id', user.id);
      }

      const { data: paintingData, error: paintingError } = await paintingQuery.single();

      if (paintingError) {
        if (paintingError.code === 'PGRST116') {
          toast({
            title: "Access Denied",
            description: "You don't have permission to manage tokens for this painting",
            variant: "destructive",
          });
          navigate('/gallery/manage');
          return;
        }
        throw paintingError;
      }
      
      setPainting(paintingData);

      // Fetch tokens for this painting
      const { data: tokensData, error: tokensError } = await supabase
        .from('access_tokens')
        .select('*')
        .eq('painting_id', id)
        .order('created_at', { ascending: false });

      if (tokensError) throw tokensError;
      setTokens(tokensData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error",
        description: "Failed to fetch painting data",
        variant: "destructive",
      });
      navigate('/gallery/manage');
    } finally {
      setLoading(false);
    }
  };

  const generateToken = async () => {
    if (!id || !user || !painting) return;

    setGenerating(true);
    try {
      console.log('Generating token with params:', {
        painting_id_param: id,
        template_type_param: selectedTemplate,
        owner_id_param: painting.owner_id // Use the painting's owner_id
      });

      const { data, error } = await supabase.rpc('generate_access_token', {
        painting_id_param: id,
        template_type_param: selectedTemplate,
        owner_id_param: painting.owner_id // Pass the actual owner_id from the painting
      });

      console.log('Token generation response:', { data, error });

      if (error) {
        console.error('Token generation error:', error);
        toast({
          title: "Error",
          description: `Failed to generate access token: ${error.message}`,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Access token generated successfully",
      });

      fetchData(); // Refresh tokens list
    } catch (error) {
      console.error('Unexpected error generating token:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred while generating the token",
        variant: "destructive",
      });
    } finally {
      setGenerating(false);
    }
  };

  const deactivateToken = async (tokenId: string) => {
    try {
      const { error } = await supabase
        .from('access_tokens')
        .update({ is_active: false })
        .eq('id', tokenId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Token deactivated successfully",
      });

      fetchData();
    } catch (error) {
      console.error('Error deactivating token:', error);
      toast({
        title: "Error",
        description: "Failed to deactivate token",
        variant: "destructive",
      });
    }
  };

  const handleSavePublicBaseUrl = () => {
    setSavingUrl(true);
    try {
      setPublicBaseUrl(publicBaseUrl);
      toast({
        title: "Success",
        description: "Public base URL saved successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save public base URL",
        variant: "destructive",
      });
    } finally {
      setSavingUrl(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: "Link copied to clipboard",
    });
  };

  const getLocalizedTitle = () => {
    if (!painting) return '';
    switch (language) {
      case 'fr': return painting.title_fr;
      case 'ru': return painting.title_ru;
      default: return painting.title_en;
    }
  };

  const getTemplateLabel = (template: string) => {
    switch (template) {
      case '1hour': return '1 Hour';
      case '24hours': return '24 Hours';
      case '7days': return '7 Days';
      default: return template;
    }
  };

  const formatExpiry = (expiresAt: string) => {
    const date = new Date(expiresAt);
    const now = new Date();
    const isExpired = date < now;
    
    return {
      formatted: date.toLocaleString(),
      isExpired
    };
  };

  // Show loading while role is being determined
  if (loading || roleLoading) {
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
            <Button onClick={() => navigate('/gallery/manage')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Gallery
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" onClick={() => navigate('/gallery/manage')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Gallery
          </Button>
          <div>
            <h1 className="text-3xl font-bold mb-2">QR Codes & Access</h1>
            <p className="text-muted-foreground">{getLocalizedTitle()}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Generate New Token */}
          <div className="lg:col-span-2 space-y-6">
            {/* Public Base URL Configuration */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Public Base URL Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="publicBaseUrl">Public Domain for QR Codes</Label>
                  <p className="text-sm text-muted-foreground mb-2">
                    Set your public domain where clients will access the paintings
                  </p>
                  <div className="flex gap-2">
                    <Input
                      id="publicBaseUrl"
                      value={publicBaseUrl}
                      onChange={(e) => setPublicBaseUrlState(e.target.value)}
                      placeholder="https://your-domain.com"
                      className="flex-1"
                    />
                    <Button 
                      onClick={handleSavePublicBaseUrl} 
                      disabled={savingUrl}
                      size="sm"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {savingUrl ? 'Saving...' : 'Save'}
                    </Button>
                  </div>
                  {isLovableOrLocalhost(publicBaseUrl) && (
                    <div className="flex items-center gap-2 text-amber-600 text-sm mt-2">
                      <AlertTriangle className="h-4 w-4" />
                      Warning: This domain contains "lovable" or "localhost" and may not work for external clients
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Generate New Access Token
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="template">Access Duration</Label>
                  <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1hour">1 Hour</SelectItem>
                      <SelectItem value="24hours">24 Hours</SelectItem>
                      <SelectItem value="7days">7 Days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={generateToken} disabled={generating} className="w-full">
                  <QrCode className="h-4 w-4 mr-2" />
                  {generating ? 'Generating...' : 'Generate Access Token & QR Code'}
                </Button>
              </CardContent>
            </Card>

            {/* Existing Tokens */}
            <Card>
              <CardHeader>
                <CardTitle>Active Access Tokens</CardTitle>
              </CardHeader>
              <CardContent>
                {tokens.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">
                    No access tokens generated yet
                  </p>
                ) : (
                  <div className="space-y-4">
                    {tokens.map((token) => {
                      const expiry = formatExpiry(token.expires_at);
                      // Use the stored public base URL
                      const baseUrl = getPublicBaseUrl();
                      const accessUrl = `${baseUrl}/gallery/${id}/access/${token.token}`;
                      
                      return (
                        <div key={token.id} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <Badge variant={token.is_active && !expiry.isExpired ? "default" : "secondary"}>
                                  {getTemplateLabel(token.template_type)}
                                </Badge>
                                {expiry.isExpired && (
                                  <Badge variant="destructive">Expired</Badge>
                                )}
                                {!token.is_active && (
                                  <Badge variant="secondary">Deactivated</Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Created: {new Date(token.created_at).toLocaleString()}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Expires: {expiry.formatted}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Used: {token.usage_count} times
                              </p>
                            </div>
                            {token.is_active && !expiry.isExpired && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => deactivateToken(token.id)}
                              >
                                <Trash2 className="h-4 w-4 mr-1" />
                                Deactivate
                              </Button>
                            )}
                          </div>
                          
                          {token.is_active && !expiry.isExpired && (
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <Input
                                  value={accessUrl}
                                  readOnly
                                  className="text-xs"
                                />
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => copyToClipboard(accessUrl)}
                                >
                                  <Copy className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => window.open(accessUrl, '_blank')}
                                >
                                  <ExternalLink className="h-4 w-4" />
                                </Button>
                              </div>
                              <QRCodeGenerator url={accessUrl} />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Access Statistics */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Access Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <AccessStats paintingId={id!} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TokenManagement;
