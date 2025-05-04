import Layout from "@/components/Layout";
import NewsItem from "@/components/news/NewsItem";
import { useLanguage } from "@/contexts/LanguageContext";
import { newsItems } from "@/data/newsData";
import { Seo } from "@/components/Seo.tsx";

const News = () => {
  const { language, t } = useLanguage();

  return (
    <>
      <Seo
        title={t("seo.news.title")}
        description={t("seo.news.description")}
        lang={language}
      />

      <Layout>
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-8 text-eac-dark uppercase">
            {t("home.latestNews")}
          </h1>

          <div className="flex flex-col space-y-8">
            {newsItems.map((item) => (
              <NewsItem
                key={item.id}
                id={item.id}
                title={item.title}
                date={item.date}
                description={item.description}
                mainImageJpg={item.mainImageJpg}
                mainImageWebp={item.mainImageWebp}
                images={item.images}
                useInlineLayout={true}
              />
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default News;
