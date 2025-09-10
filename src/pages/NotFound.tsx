import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Seo } from "@/components/Seo";
import { useLanguage } from "@/contexts/LanguageContext";

const NotFound = () => {
  const location = useLocation();
  const { language } = useLanguage();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <Seo 
        title="Page Not Found | European Arbitration Chamber"
        description="The page you are looking for could not be found. Return to the European Arbitration Chamber homepage."
        lang={language}
        robots="noindex, nofollow"
      />
      <Layout>
      <div className="min-h-[60vh] flex items-center justify-center bg-gray-50 py-20">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-eac-primary mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-8">Oops! The page you are looking for does not exist.</p>
          <Button asChild className="bg-eac-primary hover:bg-eac-primary/90 rounded-full">
            <Link to="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    </Layout>
    </>
  );
};

export default NotFound;
