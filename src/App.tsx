import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ScrollToTop } from "@/components/ui/ScrollToTop.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// EAC Routes
import About from "./pages/About";
import EacAbout from "./pages/eac/About";
import Council from "./pages/eac/Council";
import News from "./pages/eac/News";

// Arbitration Routes
import ICAC from "./pages/arbitration/ICAC";
import Rules from "./pages/arbitration/Rules";
import FeeRegulations from "./pages/arbitration/FeeRegulations";
import CostCalculator from "./pages/arbitration/CostCalculator";
import ArbitrationClause from "./pages/arbitration/ArbitrationClause";

// Expertise Routes
import ICJE from "./pages/expertise/ICJE.tsx";
import ExpertiseFields from "./pages/expertise/ExpertiseFields.tsx";

// Art Expertise Routes
import ArtAuthentication from "@/pages/artExpertise/ArtAuthentication.tsx";
import ArtAppraisal from "@/pages/artExpertise/ArtAppraisal.tsx";
import ArtPassport from "@/pages/artExpertise/ArtPassport.tsx";

// Membership Routes
import MembershipBenefits from "@/pages/membership/MembershipBenefits.tsx";
import HowToJoin from "@/pages/membership/HowToJoin.tsx";
import CodeOfConduct from "@/pages/membership/CodeOfConduct.tsx";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            
            {/* EAC Routes */}
            <Route path="/eac/about" element={<EacAbout />} />
            <Route path="/eac/council" element={<Council />} />
            <Route path="/eac/news" element={<News />} />
            <Route path="/eac/events" element={<NotFound />} />
            
            {/* Arbitration Routes */}
            <Route path="/arbitration/icac" element={<ICAC />} />
            <Route path="/arbitration/rules" element={<Rules />} />
            <Route path="/arbitration/fees" element={<FeeRegulations />} />
            <Route path="/arbitration/calculator" element={<CostCalculator />} />
            <Route path="/arbitration/clause" element={<ArbitrationClause />} />
            <Route path="/arbitration/arbitrators" element={<NotFound />} />
            <Route path="/arbitration/resources" element={<NotFound />} />

            {/* Expertise Routes */}
            <Route path="/expertise/icje" element={<ICJE />} />
            <Route path="/expertise/expertiseFields" element={<ExpertiseFields />} />

            {/* Art Authentication routes */}
            <Route path="/art-expertise/authentication" element={<ArtAuthentication />} />
            <Route path="/art-expertise/appraisal" element={<ArtAppraisal />} />
            <Route path="/art-expertise/appraisal" element={<ArtAppraisal />} />
            <Route path="/art-expertise/passport" element={<ArtPassport />} />

            {/* Membership routes */}
            <Route path="/membership/benefits" element={<MembershipBenefits />} />
            <Route path="/membership/join" element={<HowToJoin />} />
            <Route path="/membership/conductCode" element={<CodeOfConduct />} />

            {/* Other routes */}
            <Route path="/training/*" element={<NotFound />} />
            <Route path="/contacts" element={<NotFound />} />
            
            {/* Legacy route - can be removed later */}
            <Route path="/about" element={<About />} />
            
            {/* News item routes */}
            <Route path="/eac/news/:id" element={<News />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
