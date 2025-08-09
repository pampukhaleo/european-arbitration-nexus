
import Layout from "@/components/Layout";
import { Seo } from "@/components/Seo";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ICJE() {
  const { t } = useLanguage();
  const examinations = Array.isArray(t<string[]>("expertise.icje.description2.examinations")) 
    ? t<string[]>("expertise.icje.description2.examinations") 
    : [];

  return (
    <>
      <Seo 
        title={t("seo.icje.title")}
        description={t("seo.icje.description")}
        lang={t("language.code")}
      />
      <Layout>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">
            {t("expertise.icje.title")}
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-lg leading-relaxed">
              {t("expertise.icje.description1")}
            </p>
            
            <div className="mt-6">
              <p className="text-lg leading-relaxed mb-4">
                {t("expertise.icje.description2.text")}
              </p>
              
              <ul className="list-disc list-inside space-y-2 ml-4">
                {examinations.map((examination, index) => (
                  <li key={index} className="text-gray-700">
                    {examination}
                  </li>
                ))}
              </ul>
              
              <p className="text-lg leading-relaxed mt-6">
                {t("expertise.icje.description2.footer")}
              </p>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
