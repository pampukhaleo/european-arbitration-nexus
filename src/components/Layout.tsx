
import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import SectionNav from "./navigation/SectionNav";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const path = location.pathname;
  
  // Check if we're on the home page
  const isHomePage = path === "/";
  
  // Determine the current section from the path
  const getSectionKey = () => {
    if (path.startsWith('/eac/')) return 'eac';
    if (path.startsWith('/arbitration/')) return 'arbitration';
    if (path.startsWith('/expertise/')) return 'expertise';
    if (path.startsWith('/art-expertise/')) return 'art-expertise';
    if (path.startsWith('/training/')) return 'training';
    if (path.startsWith('/membership/')) return 'membership';
    return '';
  };
  
  const sectionKey = getSectionKey();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {isHomePage ? (
          <div className="container mx-auto px-4 py-8">
            {children}
          </div>
        ) : (
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="col-span-1 lg:col-span-3">
                {children}
              </div>
              {sectionKey && (
                <div className="col-span-1">
                  <SectionNav sectionKey={sectionKey} />
                </div>
              )}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
