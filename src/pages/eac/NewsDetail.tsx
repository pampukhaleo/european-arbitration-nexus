
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, CalendarIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { newsItems } from "@/data/newsData";
import { useLanguage } from "@/contexts/LanguageContext";

const NewsDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const newsItem = newsItems.find(item => item.id === id);
  
  useEffect(() => {
    if (!newsItem) {
      navigate("/eac/news", { replace: true });
    }
  }, [newsItem, navigate]);
  
  if (!newsItem) {
    return null;
  }
  
  // Convert newlines to <br> tags and parse simple HTML tags
  const createMarkup = (html: string) => {
    return { __html: html
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br/>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
    };
  };

  // Open image in popup
  const openImagePopup = (imageSrc: string) => {
    setSelectedImage(imageSrc);
  };

  // Close image popup
  const closeImagePopup = () => {
    setSelectedImage(null);
  };
  
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
                  className="w-full rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => openImagePopup(newsItem.mainImage as string)}
                />
              </div>
            )}
            
            <div className="flex-grow prose prose-lg max-w-none">
              <div 
                dangerouslySetInnerHTML={createMarkup(newsItem.description)} 
                className="news-content"
              />
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
                      className="w-full rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => openImagePopup(image)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Image Popup/Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={closeImagePopup}>
          <div className="relative max-w-4xl max-h-[90vh] w-full">
            <Button 
              variant="ghost" 
              size="icon"
              className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white rounded-full z-10"
              onClick={(e) => {
                e.stopPropagation();
                closeImagePopup();
              }}
            >
              <X className="h-6 w-6" />
            </Button>
            <img 
              src={selectedImage} 
              alt="Enlarged view" 
              className="max-h-[90vh] max-w-full mx-auto object-contain"
            />
          </div>
        </div>
      )}
    </Layout>
  );
};

export default NewsDetail;
