
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { UserPlus, UserMinus, Crown, Shield } from 'lucide-react';

interface UserWithRoles {
  id: string;
  email: string;
  full_name: string | null;
  roles: string[];
  paintingCount: number;
}

const RoleManagement = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [users, setUsers] = useState<UserWithRoles[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsersWithRoles();
  }, []);

  const fetchUsersWithRoles = async () => {
    try {
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, email, full_name');

      if (profilesError) throw profilesError;

      const { data: userRoles, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, role');

      if (rolesError) throw rolesError;

      // Get painting counts for each user
      const { data: paintingCounts, error: paintingsError } = await supabase
        .from('paintings')
        .select('owner_id')
        .then(({ data, error }) => {
          if (error) throw error;
          const counts: Record<string, number> = {};
          data?.forEach(painting => {
            counts[painting.owner_id] = (counts[painting.owner_id] || 0) + 1;
          });
          return { data: counts, error: null };
        });

      if (paintingsError) throw paintingsError;

      const usersWithRoles = profiles.map(profile => ({
        ...profile,
        roles: userRoles
          .filter(role => role.user_id === profile.id)
          .map(role => role.role),
        paintingCount: paintingCounts[profile.id] || 0
      }));

      setUsers(usersWithRoles);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: "Error",
        description: "Failed to fetch users",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const assignAdminRole = async (userId: string) => {
    try {
      const { error } = await supabase
        .from('user_roles')
        .insert({ user_id: userId, role: 'admin' })
        .select();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Admin role assigned successfully",
      });

      fetchUsersWithRoles();
    } catch (error) {
      console.error('Error assigning admin role:', error);
      toast({
        title: "Error",
        description: "Failed to assign admin role",
        variant: "destructive",
      });
    }
  };

  const removeAdminRole = async (userId: string) => {
    try {
      const { error } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', userId)
        .eq('role', 'admin');

      if (error) throw error;

      toast({
        title: "Success",
        description: "Admin role removed successfully",
      });

      fetchUsersWithRoles();
    } catch (error) {
      console.error('Error removing admin role:', error);
      toast({
        title: "Error",
        description: "Failed to remove admin role",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div className="text-center">Loading users...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>User Role Management</CardTitle>
          <p className="text-sm text-muted-foreground">
            Manage administrative privileges. Owner status is automatically derived from painting ownership.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {users.map((userItem) => (
            <div key={userItem.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <h4 className="font-medium">{userItem.full_name || userItem.email}</h4>
                <p className="text-sm text-muted-foreground">{userItem.email}</p>
                <div className="flex gap-2 mt-2">
                  {/* Show admin role if exists */}
                  {userItem.roles.includes('admin') && (
                    <Badge variant="default" className="flex items-center gap-1">
                      <Shield className="h-3 w-3" />
                      Admin
                      <UserMinus 
                        className="h-3 w-3 cursor-pointer hover:text-red-500" 
                        onClick={() => removeAdminRole(userItem.id)}
                      />
                    </Badge>
                  )}
                  
                  {/* Show derived owner status */}
                  {userItem.paintingCount > 0 && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Crown className="h-3 w-3" />
                      Owner ({userItem.paintingCount})
                    </Badge>
                  )}
                  
                  {/* Show when user has no explicit roles and no paintings */}
                  {userItem.roles.length === 0 && userItem.paintingCount === 0 && (
                    <Badge variant="outline">No roles</Badge>
                  )}
                </div>
              </div>
              
              <div className="flex gap-2">
                {!userItem.roles.includes('admin') && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => assignAdminRole(userItem.id)}
                    className="flex items-center gap-1"
                  >
                    <UserPlus className="h-3 w-3" />
                    Make Admin
                  </Button>
                )}
              </div>
            </div>
          ))}

          {users.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No users found
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Role System Explanation</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span><strong>Admin:</strong> Explicit role with full system access</span>
          </div>
          <div className="flex items-center gap-2">
            <Crown className="h-4 w-4" />
            <span><strong>Owner:</strong> Automatically derived from painting ownership</span>
          </div>
          <p className="text-xs mt-2">
            Owner status is automatically granted when users have paintings assigned to them and allows QR code management for their paintings.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoleManagement;
