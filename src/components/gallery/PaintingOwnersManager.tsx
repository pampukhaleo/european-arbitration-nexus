import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useUserRole } from '@/hooks/useUserRole';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Loader2, UserMinus, Crown } from 'lucide-react';

interface Owner {
  id: string;
  owner_id: string;
  profiles: {
    email: string;
    full_name: string | null;
  } | null;
}

interface PaintingOwnersManagerProps {
  paintingId: string;
}

export const PaintingOwnersManager = ({ paintingId }: PaintingOwnersManagerProps) => {
  const { isAdmin } = useUserRole();
  const [owners, setOwners] = useState<Owner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOwners();
  }, [paintingId]);

  const fetchOwners = async () => {
    try {
      const { data, error } = await supabase
        .from('painting_owners')
        .select(`
          id,
          owner_id,
          profiles!painting_owners_owner_id_fkey (
            email,
            full_name
          )
        `)
        .eq('painting_id', paintingId);

      if (error) throw error;

      setOwners((data as any) || []);
    } catch (error: any) {
      console.error('Error fetching owners:', error);
      toast.error('Failed to load owners');
    } finally {
      setLoading(false);
    }
  };


  const handleRemoveOwner = async (ownerId: string) => {
    if (!confirm('Are you sure you want to remove this owner?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('painting_owners')
        .delete()
        .eq('id', ownerId);

      if (error) throw error;

      toast.success('Owner removed successfully');
      fetchOwners();
    } catch (error: any) {
      console.error('Error removing owner:', error);
      toast.error('Failed to remove owner');
    }
  };

  if (!isAdmin) {
    return null;
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6 flex justify-center">
          <Loader2 className="h-6 w-6 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Crown className="h-5 w-5" />
          Painting Owners
        </CardTitle>
        <CardDescription>
          Manage who can access and edit this painting's private information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Owners List */}
        <div className="space-y-2">
          <Label>Current Owners ({owners.length})</Label>
          <div className="space-y-2">
            {owners.length === 0 ? (
              <p className="text-sm text-muted-foreground">No owners assigned yet</p>
            ) : (
              owners.map((owner) => (
                <div
                  key={owner.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div>
                    <p className="font-medium">{owner.profiles?.email || 'Unknown'}</p>
                    {owner.profiles?.full_name && (
                      <p className="text-sm text-muted-foreground">
                        {owner.profiles.full_name}
                      </p>
                    )}
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRemoveOwner(owner.id)}
                    disabled={owners.length === 1}
                    title={owners.length === 1 ? 'Cannot remove the last owner' : 'Remove owner'}
                  >
                    <UserMinus className="h-4 w-4 mr-1" />
                    Remove
                  </Button>
                </div>
              ))
            )}
          </div>
        </div>

      </CardContent>
    </Card>
  );
};
