import { Loader2 } from "lucide-react";
import Header from "../Header";
import Footer from "../Footer";

/**
 * Suspense fallback shown while a lazy page chunk is loading.
 * Renders the shared Header and Footer so the user does not see
 * a fully blank screen during navigation between routes.
 */
const PageLoader = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center py-24">
        <Loader2
          className="h-8 w-8 animate-spin text-primary"
          aria-label="Loading"
        />
      </main>
      <Footer />
    </div>
  );
};

export default PageLoader;
