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

  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://chea-taic.be/#organization",
        "name": "European Arbitration Chamber (EAC)",
        "url": "https://chea-taic.be",
        "logo": {
          "@type": "ImageObject",
          "url": "https://chea-taic.be/logo.png"
        },
        "sameAs": [
          "https://www.linkedin.com/company/european-arbitration-chamber"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://chea-taic.be/#website",
        "url": "https://chea-taic.be",
        "name": "European Arbitration Chamber (EAC)",
        "description": "The European Arbitration Chamber (EAC) is an international non-profit association founded in Belgium in 2008.",
        "publisher": {
          "@id": "https://chea-taic.be/#organization"
        },
        "inLanguage": ["en", "fr", "ru"]
      }
    ]
  };

  return (
    <>
      <Seo 
        title={t("seo.home.title")} 
        description={t("seo.home.description")} 
        lang={language}
        structuredData={organizationStructuredData}
      />
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
