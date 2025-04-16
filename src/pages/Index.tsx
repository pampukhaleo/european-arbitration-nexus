
import Layout from "@/components/Layout";
import Hero from "@/components/home/Hero";
import NewsPreview from "@/components/home/NewsPreview";
import EventCalendar from "@/components/home/EventCalendar";
import Services from "@/components/home/Services";
import QuickLinks from "@/components/home/QuickLinks";
import AboutPreview from "@/components/home/AboutPreview";
import { Seo } from "@/components/Seo.tsx";
import { useLanguage } from "@/contexts/LanguageContext.tsx";

const Index = () => {
  const { language, t } = useLanguage();

  return (
    <>
      <Seo title={t("seo.home.title")} description={t("seo.home.description")} lang={language}/>
      <Layout>
        <Hero />
        {/*<AboutPreview />*/}
        <QuickLinks />
        <Services />
        <NewsPreview />
        {/*<EventCalendar />*/}
      </Layout>
    </>

  );
};

export default Index;
