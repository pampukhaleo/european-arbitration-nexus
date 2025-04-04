
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
  
  // Check if we're on the home page or contacts page
  const isHomePage = path === "/";
  const isContactsPage = path === "/contacts";
  
  // Determine the current section from the path
  const getSectionKey = () => {
    if (path.startsWith('/eac/')) return 'eac';
    if (path.startsWith('/arbitration/')) return 'arbitration';
    if (path.startsWith('/expertise/')) return 'expertise';
    if (path.startsWith('/art-expertise/')) return 'art-expertise';
    if (path.startsWith('/training/')) return 'training';
    if (path.startsWith('/membership/')) return 'membership';
    if (path === '/contacts') return 'contacts';
    return '';
  };
  
  const sectionKey = getSectionKey();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {isHomePage || isContactsPage ? (
          // Full-width layout for home and contacts pages
          <div className="w-full max-w-full">
            {children}
          </div>
        ) : (
          // Regular layout with sidebar for other pages
          <div className="container mx-auto px-4 py-8 text-justify">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="col-span-1 lg:col-span-3">
                {children}
              </div>
              {sectionKey && sectionKey !== 'contacts' && (
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
