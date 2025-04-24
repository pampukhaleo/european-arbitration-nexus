import Layout from "@/components/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { Seo } from "@/components/Seo.tsx";

const ArtAuthentication = () => {
  const { language, t } = useLanguage();

  const processList = t("artExpertise.authentication.processList") as string[];
  const importanceList = t("artExpertise.authentication.importanceList") as string[];

  const renderList = (items: string[]) => (
    <ul className="list-disc pl-6 mb-6 text-lg text-gray-600">
      {items.map((item, idx) => (
        <li key={idx} className="mt-2">{item}</li>
      ))}
    </ul>
  );

  return (
    <>
      <Seo
        title={t("seo.authentication.title")}
        description={t("seo.authentication.description")}
        lang={language}
      />
      <Layout>
        <div className="py-6">
          <h1 className="text-3xl font-bold mb-6 text-eac-dark uppercase text-left">
            {t("artExpertise.authentication.title")}
          </h1>

          <div className="prose max-w-none">
            <p className="text-lg text-gray-600 mb-4">
              {t("artExpertise.authentication.p1")}
            </p>

            <p className="text-lg text-gray-600 mb-6">
              {t("artExpertise.authentication.p2")}
            </p>

            <p className="text-lg text-gray-600 font-bold mb-2">
              {t("artExpertise.authentication.processTitle")}
            </p>
            {renderList(processList)}

            <p className="text-lg text-gray-600 font-bold mb-2">
              {t("artExpertise.authentication.importanceTitle")}
            </p>
            {renderList(importanceList)}

            <h3 className="text-lg font-semibold mb-2">
              {t("artExpertise.authentication.certificateTitle")}
            </h3>
            <p className="text-lg text-gray-600 mb-4">
              {t("artExpertise.authentication.certificateText")}
            </p>

            <p className="text-lg text-gray-600">
              {t("artExpertise.authentication.closingText")}
            </p>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ArtAuthentication;
