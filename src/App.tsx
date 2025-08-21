
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Index from '@/pages/Index';
import Gallery from '@/pages/gallery/Gallery';
import PaintingDetail from '@/pages/gallery/PaintingDetail';
import PaintingForm from '@/pages/gallery/PaintingForm';
import GalleryManage from '@/pages/gallery/GalleryManage';
import QrCodeGenerator from '@/pages/gallery/QrCodeGenerator';
import TokenManagement from '@/pages/gallery/TokenManagement';
import Auth from '@/pages/Auth';
import About from '@/pages/About';
import Contacts from '@/pages/Contacts';
import NotFound from '@/pages/NotFound';
import ProtectedRoute from '@/components/ProtectedRoute';
import AdminRoute from '@/components/AdminRoute';
import { ScrollToTop } from '@/components/ui/ScrollToTop';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from '@/components/ui/toaster';
import CookieConsent from '@/components/CookieConsent';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AdminDashboard from '@/pages/admin/AdminDashboard';

// EAC pages
import EACAbout from '@/pages/eac/About';
import Council from '@/pages/eac/Council';
import News from '@/pages/eac/News';
import NewsDetail from '@/pages/eac/NewsDetail';

// Arbitration pages
import ICAC from '@/pages/arbitration/ICAC';
import Rules from '@/pages/arbitration/Rules';
import FeeRegulations from '@/pages/arbitration/FeeRegulations';
import CostCalculator from '@/pages/arbitration/CostCalculator';
import ArbitrationClause from '@/pages/arbitration/ArbitrationClause';

// Expertise pages
import ICJE from '@/pages/expertise/ICJE';
import ExpertiseFields from '@/pages/expertise/ExpertiseFields';

// Art Expertise pages
import ArtAuthentication from '@/pages/artExpertise/ArtAuthentication';
import ArtAppraisal from '@/pages/artExpertise/ArtAppraisal';
import ArtPassport from '@/pages/artExpertise/ArtPassport';

// Membership pages
import MembershipBenefits from '@/pages/membership/MembershipBenefits';
import HowToJoin from '@/pages/membership/HowToJoin';
import CodeOfConduct from '@/pages/membership/CodeOfConduct';

// Policy pages
import PrivacyPolicy from '@/pages/policies/PrivacyPolicy';
import CookiesPolicy from '@/pages/policies/CookiesPolicy';
import TermsOfService from '@/pages/policies/TermsOfService';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LanguageProvider>
          <Router>
            <Routes>
              {/* Home page */}
              <Route path="/" element={<Index />} />

              {/* EAC section */}
              <Route path="/eac" element={<Navigate to="/eac/about" replace />} />
              <Route path="/eac/about" element={<EACAbout />} />
              <Route path="/eac/council" element={<Council />} />
              <Route path="/eac/news" element={<News />} />
              <Route path="/eac/news/:id" element={<NewsDetail />} />

              {/* Arbitration section */}
              <Route path="/arbitration" element={<Navigate to="/arbitration/icac" replace />} />
              <Route path="/arbitration/icac" element={<ICAC />} />
              <Route path="/arbitration/rules" element={<Rules />} />
              <Route path="/arbitration/fees" element={<FeeRegulations />} />
              <Route path="/arbitration/calculator" element={<CostCalculator />} />
              <Route path="/arbitration/clause" element={<ArbitrationClause />} />

              {/* Expertise section */}
              <Route path="/expertise" element={<Navigate to="/expertise/icje" replace />} />
              <Route path="/expertise/icje" element={<ICJE />} />
              <Route path="/expertise/expertiseFields" element={<ExpertiseFields />} />

              {/* Art Expertise section */}
              <Route path="/art-expertise" element={<Navigate to="/art-expertise/authentication" replace />} />
              <Route path="/art-expertise/authentication" element={<ArtAuthentication />} />
              <Route path="/art-expertise/appraisal" element={<ArtAppraisal />} />
              <Route path="/art-expertise/passport" element={<ArtPassport />} />

              {/* Gallery section */}
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/gallery/:id" element={<PaintingDetail />} />

              {/* Membership section */}
              <Route path="/membership" element={<Navigate to="/membership/benefits" replace />} />
              <Route path="/membership/benefits" element={<MembershipBenefits />} />
              <Route path="/membership/join" element={<HowToJoin />} />
              <Route path="/membership/conductCode" element={<CodeOfConduct />} />

              {/* Contacts */}
              <Route path="/contacts" element={<Contacts />} />

              {/* Auth */}
              <Route path="/auth" element={<Auth />} />

              {/* Protected Gallery Management Routes */}
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
                  <TokenManagement />
                </ProtectedRoute>
              } />
              <Route path="/gallery/manage/qr/:id" element={
                <ProtectedRoute>
                  <QrCodeGenerator />
                </ProtectedRoute>
              } />

              {/* Admin Routes */}
              <Route path="/admin/dashboard" element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              } />

              {/* Policy pages */}
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/cookies-policy" element={<CookiesPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />

              {/* Legacy redirects */}
              <Route path="/about" element={<Navigate to="/eac/about" replace />} />

              {/* 404 fallback */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <ScrollToTop />
            <Toaster />
            <CookieConsent />
          </Router>
        </LanguageProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
