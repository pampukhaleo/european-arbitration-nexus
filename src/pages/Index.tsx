
import Layout from "@/components/Layout";
import Hero from "@/components/home/Hero";
import NewsPreview from "@/components/home/NewsPreview";
import EventCalendar from "@/components/home/EventCalendar";
import Services from "@/components/home/Services";
import QuickLinks from "@/components/home/QuickLinks";
import AboutPreview from "@/components/home/AboutPreview";

const Index = () => {
  return (
    <Layout>
      <Hero />
      {/*<AboutPreview />*/}
      <QuickLinks />
      <Services />
      <NewsPreview />
      {/*<EventCalendar />*/}
    </Layout>
  );
};

export default Index;
