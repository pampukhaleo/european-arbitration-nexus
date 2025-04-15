
import { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { CalendarIcon } from "lucide-react";
import { newsItems } from "@/data/newsData";
import { useLanguage } from "@/contexts/LanguageContext";

const NewsDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const newsItem = newsItems.find(item => item.id === id);
  
  useEffect(() => {
    if (!newsItem) {
      navigate("/eac/news", { replace: true });
    }
  }, [newsItem, navigate]);
  
  if (!newsItem) {
    return null;
  }
  
  const paragraphs = newsItem.description.split("\n\n");
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Button 
            variant="ghost" 
            className="mb-6" 
            asChild
          >
            <Link to="/eac/news">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t("common.backToNews")}
            </Link>
          </Button>

          <h1 className="text-3xl font-bold mb-4">{newsItem.title}</h1>
          
          <div className="flex items-center text-sm text-gray-500 mb-6">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {newsItem.date}
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            {newsItem.mainImage && (
              <div className="md:w-[300px] flex-shrink-0">
                <img 
                  src={newsItem.mainImage} 
                  alt={newsItem.title}
                  className="w-full rounded-lg"
                />
              </div>
            )}
            
            <div className="flex-grow prose prose-lg max-w-none">
              {paragraphs.map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          
          {newsItem.images && newsItem.images.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {newsItem.images.map((image, index) => (
                  <div key={index} className="w-full">
                    <img 
                      src={image} 
                      alt={`${newsItem.title} - image ${index + 1}`} 
                      className="w-full rounded-lg"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default NewsDetail;

