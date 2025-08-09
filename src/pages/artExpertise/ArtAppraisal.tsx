
import Layout from "@/components/Layout";
import { Seo } from "@/components/Seo";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ArtAppraisal() {
  const { t, language } = useLanguage();

  return (
    <>
      <Seo 
        title={t("seo.appraisal.title")}
        description={t("seo.appraisal.description")}
        lang={language}
      />
      <Layout>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">
            {t("art-expertise.appraisal.title")}
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-lg leading-relaxed">
              {t("art-expertise.appraisal.description")}
            </p>
          </div>
        </div>
      </Layout>
    </>
  );
}
