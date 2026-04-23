import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Index from '@/pages/Index';
import ProtectedRoute from '@/components/ProtectedRoute';
import AdminRoute from '@/components/AdminRoute';
import ErrorBoundary from '@/components/ErrorBoundary';
import PageLoader from '@/components/ui/PageLoader';
import { ScrollToTop } from '@/components/ui/ScrollToTop';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from '@/components/ui/toaster';
import CookieConsent from '@/components/CookieConsent';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Lazy-loaded pages
const Gallery = lazy(() => import('@/pages/gallery/Gallery'));
const PaintingDetail = lazy(() => import('@/pages/gallery/PaintingDetail'));
const PaintingForm = lazy(() => import('@/pages/gallery/PaintingForm'));
const GalleryManage = lazy(() => import('@/pages/gallery/GalleryManage'));
const QrCodeGenerator = lazy(() => import('@/pages/gallery/QrCodeGenerator'));
const TokenManagement = lazy(() => import('@/pages/gallery/TokenManagement'));
const Auth = lazy(() => import('@/pages/Auth'));
const Contacts = lazy(() => import('@/pages/Contacts'));
const NotFound = lazy(() => import('@/pages/NotFound'));
const AdminDashboard = lazy(() => import('@/pages/admin/AdminDashboard'));
const Landing = lazy(() => import('@/pages/Landing'));

// EAC pages
const EACAbout = lazy(() => import('@/pages/eac/About'));
const Council = lazy(() => import('@/pages/eac/Council'));
const News = lazy(() => import('@/pages/eac/News'));
const NewsDetail = lazy(() => import('@/pages/eac/NewsDetail'));

// Arbitration pages
const ICAC = lazy(() => import('@/pages/arbitration/ICAC'));
const Rules = lazy(() => import('@/pages/arbitration/Rules'));
const FeeRegulations = lazy(() => import('@/pages/arbitration/FeeRegulations'));
const CostCalculator = lazy(() => import('@/pages/arbitration/CostCalculator'));
const ArbitrationClause = lazy(() => import('@/pages/arbitration/ArbitrationClause'));

// Expertise pages
const ICJE = lazy(() => import('@/pages/expertise/ICJE'));
const ExpertiseFields = lazy(() => import('@/pages/expertise/ExpertiseFields'));

// Art Expertise pages
const ArtAuthentication = lazy(() => import('@/pages/artExpertise/ArtAuthentication'));
const ArtAppraisal = lazy(() => import('@/pages/artExpertise/ArtAppraisal'));
const ArtPassport = lazy(() => import('@/pages/artExpertise/ArtPassport'));

// Membership pages
const MembershipBenefits = lazy(() => import('@/pages/membership/MembershipBenefits'));
const HowToJoin = lazy(() => import('@/pages/membership/HowToJoin'));
const CodeOfConduct = lazy(() => import('@/pages/membership/CodeOfConduct'));

// Policy pages
const PrivacyPolicy = lazy(() => import('@/pages/policies/PrivacyPolicy'));
const CookiesPolicy = lazy(() => import('@/pages/policies/CookiesPolicy'));
const TermsOfService = lazy(() => import('@/pages/policies/TermsOfService'));

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <AuthProvider>
          <LanguageProvider>
            <Router>
              <ErrorBoundary>
                <Suspense fallback={<PageLoader />}>
                  <Routes>
                    {/* Home page */}
                    <Route path="/" element={<Index />} />

                    {/* Advertising landing page (UA) */}
                    <Route path="/landing" element={<Landing />} />
                    <Route path="/landing/v1" element={<Navigate to="/landing" replace />} />
                    <Route path="/landing/v2" element={<Navigate to="/landing" replace />} />
                    <Route path="/landing/v3" element={<Navigate to="/landing" replace />} />

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
                    <Route path="/gallery/:id/access/:token" element={<PaintingDetail />} />

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
                </Suspense>
              </ErrorBoundary>
              <ScrollToTop />
              <Toaster />
              <CookieConsent />
            </Router>
          </LanguageProvider>
        </AuthProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export default App;
