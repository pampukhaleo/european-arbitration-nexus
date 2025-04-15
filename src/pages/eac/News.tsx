
import Layout from "@/components/Layout";
import NewsItem from "@/components/news/NewsItem";
import { useLanguage } from "@/contexts/LanguageContext";
import { newsItems } from "@/data/newsData";

const News = () => {
  const { t } = useLanguage();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-eac-dark uppercase">
          {t("home.latestNews")}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsItems.map((item) => (
            <div key={item.id} className="flex">
              <NewsItem
                id={item.id}
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
