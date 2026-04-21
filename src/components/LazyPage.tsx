import { ReactNode, Suspense } from "react";
import { Loader2 } from "lucide-react";
import Layout from "./Layout";

interface LazyPageProps {
  children: ReactNode;
}

/**
 * Wraps a lazy-loaded page so that the shared Layout (Header + Footer)
 * is rendered immediately while the page chunk is being fetched.
 * The Suspense fallback only replaces the main content area, avoiding
 * a full-screen white flash during navigation.
 */
const LazyPage = ({ children }: LazyPageProps) => (
  <Layout>
    <Suspense
      fallback={
        <div
          className="flex items-center justify-center py-24"
          role="status"
          aria-live="polite"
        >
          <Loader2
            className="h-8 w-8 animate-spin text-primary"
            aria-label="Loading"
          />
        </div>
      }
    >
      {children}
    </Suspense>
  </Layout>
);

export default LazyPage;
