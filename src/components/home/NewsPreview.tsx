import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { newsItems } from "@/data/newsData";
import NewsItem from "@/components/news/NewsItem";
import { Link } from "react-router-dom";

export default function NewsPreview() {
  const { t } = useLanguage();
  
  // Get only the 3 most recent news items
  const latestNewsItems = [...newsItems].slice(0, 3);
  
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-eac-dark">{t('home.latestNews')}</h2>
          <Button asChild variant="ghost" className="text-eac-primary hover:text-eac-primary hover:bg-eac-light">
            <Link to="/eac/news">{t('home.viewAllNews')}</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestNewsItems.map((item) => (
            <NewsItem
              key={item.id}
              id={item.id}
              title={item.title}
              date={item.date}
              description={item.description}
              mainImage={item.mainImage}
              images={item.images}
              useCardWrapper={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
