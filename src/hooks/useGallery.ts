
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Painting, AccessToken, PaintingFormData, Language } from '@/types/gallery';
import { toast } from '@/hooks/use-toast';

// Gallery hooks for public access
export const usePublicPaintings = (searchQuery?: string, language?: Language) => {
  return useQuery({
    queryKey: ['public-paintings', searchQuery, language],
    queryFn: async () => {
      let query = supabase
        .from('paintings')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (searchQuery && language) {
        const searchColumn = `${language}_search`;
        // Use full-text search for the specific language
        query = query.textSearch(`title_${language}`, searchQuery)
              .or(`artist_${language}.ilike.%${searchQuery}%`)
              .or(`year.eq.${parseInt(searchQuery) || 0}`);
      }

      const { data, error } = await query;
      
      if (error) throw error;
      return data as Painting[];
    },
  });
};

export const usePublicPainting = (id: string) => {
  return useQuery({
    queryKey: ['public-painting', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('paintings')
        .select('*')
        .eq('id', id)
        .eq('is_published', true)
        .single();
        
      if (error) throw error;
      return data as Painting;
    },
  });
};

// Owner hooks for managing paintings
export const useOwnerPaintings = () => {
  return useQuery({
    queryKey: ['owner-paintings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('paintings')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      return data as Painting[];
    },
  });
};

export const useCreatePainting = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (painting: PaintingFormData) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('paintings')
        .insert({
          ...painting,
          owner_id: user.id
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['owner-paintings'] });
      queryClient.invalidateQueries({ queryKey: ['public-paintings'] });
      toast({
        title: 'Success',
        description: 'Painting created successfully',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to create painting',
        variant: 'destructive',
      });
      console.error('Error creating painting:', error);
    },
  });
};

export const useUpdatePainting = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...painting }: PaintingFormData & { id: string }) => {
      const { data, error } = await supabase
        .from('paintings')
        .update({
          ...painting,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['owner-paintings'] });
      queryClient.invalidateQueries({ queryKey: ['public-paintings'] });
      toast({
        title: 'Success',
        description: 'Painting updated successfully',
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to update painting',
        variant: 'destructive',
      });
    },
  });
};

// Token management hooks
export const useGenerateToken = () => {
  return useMutation({
    mutationFn: async ({ paintingId, templateType }: { paintingId: string; templateType: '1hour' | '24hours' | '7days' }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase.rpc('generate_access_token', {
        painting_id_param: paintingId,
        template_type_param: templateType,
        owner_id_param: user.id
      });

      if (error) throw error;
      return data[0] as { token: string; expires_at: string };
    },
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Access token generated successfully',
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to generate access token',
        variant: 'destructive',
      });
    },
  });
};

export const useValidateToken = () => {
  return useMutation({
    mutationFn: async ({ token, paintingId }: { token: string; paintingId: string }) => {
      const { data, error } = await supabase.rpc('validate_access_token', {
        token_text: token,
        painting_id_param: paintingId
      });

      if (error) throw error;
      return data;
    },
  });
};
