
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserRole } from '@/hooks/useUserRole';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Users, Image, Settings } from 'lucide-react';
import RoleManagement from '@/components/admin/RoleManagement';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { isAdmin, loading } = useUserRole();

  if (loading) {
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
              Only administrators can access this page.
            </p>
            <Button onClick={() => navigate('/gallery')}>
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
          <Button variant="outline" onClick={() => navigate('/gallery')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Gallery
          </Button>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/gallery/manage')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Image className="h-5 w-5" />
                Gallery Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Manage paintings, owners, and content</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/gallery/manage/add')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Add Painting
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Add new paintings to the gallery</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                User Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Manage user roles and permissions</p>
            </CardContent>
          </Card>
        </div>

        <RoleManagement />
      </div>
    </Layout>
  );
};

export default AdminDashboard;
