
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/eac/about" element={<About />} />
          {/* These routes would be implemented as needed */}
          <Route path="/eac/*" element={<NotFound />} />
          <Route path="/arbitration/*" element={<NotFound />} />
          <Route path="/expertise/*" element={<NotFound />} />
          <Route path="/art-expertise/*" element={<NotFound />} />
          <Route path="/training/*" element={<NotFound />} />
          <Route path="/membership/*" element={<NotFound />} />
          <Route path="/contacts" element={<NotFound />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
