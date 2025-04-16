import Layout from "@/components/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { Seo } from "@/components/Seo.tsx";

const ArtAuthentication = () => {
  const { language, t } = useLanguage();

  const processList = t("artExpertise.authentication.processList") as string[];
  const importanceList = t("artExpertise.authentication.importanceList") as string[];

  return (
    <>
      <Seo title={t("seo.authentication.title")} description={t("seo.authentication.description")} lang={language}/>
      <Layout>
        <div className="py-6">
          <h1 className="text-3xl font-bold mb-6 text-eac-dark uppercase">
            {t("artExpertise.authentication.title")}
          </h1>

          <div className="prose max-w-none">
            <p className="mb-4 text-lg text-gray-600">
              {t("artExpertise.authentication.p1")}
            </p>

            <p className="mb-4 text-lg text-gray-600">
              {t("artExpertise.authentication.p2")}
            </p>

            <p className="mb-4 text-lg text-gray-600 font-bold">
              {t("artExpertise.authentication.processTitle")}
            </p>
            <ul className="mb-4 text-lg text-gray-600 list-disc pl-5">
              {processList.map((item, idx) => (
                <li className="ml-5 mt-2" key={idx}>{item}</li>
              ))}
            </ul>

            <p className="mb-4 text-lg text-gray-600 font-bold">
              {t("artExpertise.authentication.importanceTitle")}
            </p>
            <ul className="mb-4 text-lg text-gray-600 list-disc pl-5">
              {importanceList.map((item, idx) => (
                <li className="ml-5 mt-2" key={idx}>{item}</li>
              ))}
            </ul>

            <h3 className="mb-4 text-lg">
              {t("artExpertise.authentication.certificateTitle")}
            </h3>
            <p className="mb-4 text-lg text-gray-600">
              {t("artExpertise.authentication.certificateText")}
            </p>

            <p className="mb-4 text-lg text-gray-600">
              {t("artExpertise.authentication.closingText")}
            </p>
          </div>
        </div>
      </Layout>
    </>

  );
};

export default ArtAuthentication;
