
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { CalendarIcon } from "lucide-react";
import { newsItems } from "@/data/newsData";

const NewsDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
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
          <h1 className="text-3xl font-bold mb-4">{newsItem.title}</h1>
          
          <div className="flex items-center text-sm text-gray-500 mb-6">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {newsItem.date}
          </div>
          
          {newsItem.images && newsItem.images.length > 0 && (
            <div className="grid grid-cols-1 gap-4 mb-6">
              {newsItem.images.map((image, index) => (
                <div key={index} className="w-full">
                  <img 
                    src={image} 
                    alt={`${newsItem.title} - image ${index + 1}`} 
                    className="w-full"
                  />
                </div>
              ))}
            </div>
          )}
          
          <div className="prose prose-lg max-w-none">
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NewsDetail;
