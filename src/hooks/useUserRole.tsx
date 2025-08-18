
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

export type UserRole = 'admin' | 'owner' | 'user';

export const useUserRole = () => {
  const { user } = useAuth();
  const [role, setRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserRole = async () => {
      if (!user) {
        setRole(null);
        setLoading(false);
        return;
      }

      try {
        // Check if user is admin
        const { data: isAdmin, error: adminError } = await supabase
          .rpc('current_user_is_admin');

        if (adminError) throw adminError;

        if (isAdmin) {
          setRole('admin');
        } else {
          // Check if user owns any paintings
          const { data: paintings, error: paintingsError } = await supabase
            .from('paintings')
            .select('id')
            .eq('owner_id', user.id)
            .limit(1);

          if (paintingsError) throw paintingsError;

          setRole(paintings && paintings.length > 0 ? 'owner' : 'user');
        }
      } catch (error) {
        console.error('Error checking user role:', error);
        setRole('user');
      } finally {
        setLoading(false);
      }
    };

    checkUserRole();
  }, [user]);

  return { role, loading, isAdmin: role === 'admin', isOwner: role === 'owner' };
};
