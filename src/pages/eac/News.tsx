
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import NewsItem from "@/components/news/NewsItem";
import { useLanguage } from "@/contexts/LanguageContext";
import { newsItems } from "@/data/newsData";

const News = () => {
  const { t } = useLanguage();
  const { id } = useParams<{ id?: string }>();
  const [selectedNewsId, setSelectedNewsId] = useState<string | null>(null);
  
  useEffect(() => {
    if (id && newsItems.some(item => item.id === id)) {
      setSelectedNewsId(id);
      
      // Simulate clicking on the news item to open the dialog
      setTimeout(() => {
        const newsElement = document.querySelector(`[data-news-id="${id}"]`);
        if (newsElement) {
          (newsElement as HTMLElement).click();
        }
      }, 100);
    }
  }, [id]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-eac-dark">News</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsItems.map((item) => (
            <div key={item.id} data-news-id={item.id}>
              <NewsItem
                title={item.title}
                date={item.date}
                description={item.description}
              />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default News;
