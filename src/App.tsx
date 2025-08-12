import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";

import Index from "./pages/Index";
import About from "./pages/About";
import Contacts from "./pages/Contacts";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";

// EAC Pages
import EACAbout from "./pages/eac/About";
import EACCouncil from "./pages/eac/Council";
import EACNews from "./pages/eac/News";
import EACNewsDetail from "./pages/eac/NewsDetail";

// Arbitration Pages
import ICAC from "./pages/arbitration/ICAC";
import ArbitrationRules from "./pages/arbitration/Rules";
import ArbitrationClause from "./pages/arbitration/ArbitrationClause";
import FeeRegulations from "./pages/arbitration/FeeRegulations";
import CostCalculator from "./pages/arbitration/CostCalculator";

// Expertise Pages
import ICJE from "./pages/expertise/ICJE";
import ExpertiseFields from "./pages/expertise/ExpertiseFields";

// Art Expertise Pages
import ArtAuthentication from "./pages/artExpertise/ArtAuthentication";
import ArtAppraisal from "./pages/artExpertise/ArtAppraisal";
import ArtPassport from "./pages/artExpertise/ArtPassport";

// Membership Pages
import MembershipBenefits from "./pages/membership/MembershipBenefits";
import HowToJoin from "./pages/membership/HowToJoin";
import CodeOfConduct from "./pages/membership/CodeOfConduct";

// Policy Pages
import PrivacyPolicy from "./pages/policies/PrivacyPolicy";
import TermsOfService from "./pages/policies/TermsOfService";
import CookiesPolicy from "./pages/policies/CookiesPolicy";

// Gallery Pages
import Gallery from "./pages/gallery/Gallery";
import PaintingDetail from "./pages/gallery/PaintingDetail";
import PrivateAccess from "./pages/gallery/PrivateAccess";
import GalleryManage from "./pages/gallery/GalleryManage";
import PaintingForm from "./pages/gallery/PaintingForm";
import TokenManagement from "./pages/gallery/TokenManagement";

// Components
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <LanguageProvider>
            <AuthProvider>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/auth" element={<Auth />} />
                
                {/* EAC Routes */}
                <Route path="/eac" element={<EACAbout />} />
                <Route path="/eac/about" element={<EACAbout />} />
                <Route path="/eac/council" element={<EACCouncil />} />
                <Route path="/eac/news" element={<EACNews />} />
                <Route path="/eac/news/:id" element={<EACNewsDetail />} />
                
                {/* Arbitration Routes */}
                <Route path="/arbitration/icac" element={<ICAC />} />
                <Route path="/arbitration/rules" element={<ArbitrationRules />} />
                <Route path="/arbitration/clause" element={<ArbitrationClause />} />
                <Route path="/arbitration/fees" element={<FeeRegulations />} />
                <Route path="/arbitration/calculator" element={<CostCalculator />} />
                
                {/* Expertise Routes - Fixed URLs to match NavData */}
                <Route path="/expertise/icje" element={<ICJE />} />
                <Route path="/expertise/expertiseFields" element={<ExpertiseFields />} />
                
                {/* Art Expertise Routes */}
                <Route path="/art-expertise/authentication" element={<ArtAuthentication />} />
                <Route path="/art-expertise/appraisal" element={<ArtAppraisal />} />
                <Route path="/art-expertise/passport" element={<ArtPassport />} />
                
                {/* Membership Routes - Fixed URL to match NavData */}
                <Route path="/membership/benefits" element={<MembershipBenefits />} />
                <Route path="/membership/join" element={<HowToJoin />} />
                <Route path="/membership/conductCode" element={<CodeOfConduct />} />
                
                {/* Policy Routes */}
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsOfService />} />
                <Route path="/cookies" element={<CookiesPolicy />} />
                
                {/* Gallery Routes */}
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/gallery/:id" element={<PaintingDetail />} />
                <Route path="/gallery/:id/access/:token" element={<PrivateAccess />} />
                
                {/* Protected Gallery Management Routes */}
                <Route path="/gallery/manage" element={
                  <ProtectedRoute>
                    <GalleryManage />
                  </ProtectedRoute>
                } />
                <Route path="/gallery/manage/add" element={
                  <ProtectedRoute>
                    <PaintingForm />
                  </ProtectedRoute>
                } />
                <Route path="/gallery/manage/edit/:id" element={
                  <ProtectedRoute>
                    <PaintingForm />
                  </ProtectedRoute>
                } />
                <Route path="/gallery/manage/tokens/:id" element={
                  <ProtectedRoute>
                    <TokenManagement />
                  </ProtectedRoute>
                } />
                
                {/* 404 Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AuthProvider>
          </LanguageProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
