
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import NewsItem from "@/components/news/NewsItem";
import { useLanguage } from "@/contexts/LanguageContext";
import { newsItems } from "@/data/newsData";

const News = () => {
  const { t } = useLanguage();
  const { id } = useParams<{ id?: string }>();
  const refsMap = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    if (id && newsItems.some(item => item.id === id)) {
      setTimeout(() => {
        const target = refsMap.current[id];
        if (target) {
          target.click();
        }
      }, 100);
    }
  }, [id]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-eac-dark">
          {t("home.latestNews")}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsItems.map((item) => (
            <div
              key={item.id}
              ref={(el) => (refsMap.current[item.id] = el)}
              className="flex"
            >
              <NewsItem
                title={item.title}
                date={item.date}
                description={item.description}
                mainImage={item.mainImage}
                images={item.images}
              />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default News;
