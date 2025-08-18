import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Gallery from '@/pages/gallery/Gallery';
import PaintingDetail from '@/pages/gallery/PaintingDetail';
import PaintingForm from '@/pages/gallery/PaintingForm';
import GalleryManage from '@/pages/gallery/GalleryManage';
import Auth from '@/pages/auth/Auth';
import ProtectedRoute from '@/components/ProtectedRoute';
import ScrollToTop from '@/components/ScrollToTop';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from '@/components/ui/toaster';
import QrCodeGenerator from '@/pages/gallery/QrCodeGenerator';
import CookieConsent from '@/components/CookieConsent';
import { QueryClient } from 'react-query';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminRoute from '@/components/AdminRoute';

function App() {
  return (
    <QueryClient>
      <AuthProvider>
        <LanguageProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Gallery />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/gallery/:id" element={<PaintingDetail />} />
              <Route path="/auth" element={<Auth />} />

              <Route path="/gallery/manage" element={
                <ProtectedRoute>
                  <GalleryManage />
                </ProtectedRoute>
              } />
              <Route path="/gallery/manage/add" element={
                <AdminRoute>
                  <PaintingForm />
                </AdminRoute>
              } />
              <Route path="/gallery/manage/edit/:id" element={
                <AdminRoute>
                  <PaintingForm />
                </AdminRoute>
              } />
              <Route path="/gallery/manage/tokens/:id" element={
                <ProtectedRoute>
                  <QrCodeGenerator />
                </ProtectedRoute>
              } />
              
              <Route path="/admin/dashboard" element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              } />
              
            </Routes>
            <ScrollToTop />
            <Toaster />
            <CookieConsent />
          </Router>
        </LanguageProvider>
      </AuthProvider>
    </QueryClient>
  );
}

export default App;
