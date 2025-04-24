import Layout from "@/components/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { Seo } from "@/components/Seo.tsx";

const ArtAppraisal = () => {
  const { language, t } = useLanguage();

  const evaluationFactors = t("artExpertise.appraisal.evaluationFactors") as string[];
  const stages = t("artExpertise.appraisal.stagesList") as string[];

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
        title={t("seo.appraisal.title")}
        description={t("seo.appraisal.description")}
        lang={language}
      />
      <Layout>
        <div className="py-6">
          <h1 className="text-3xl font-bold mb-6 text-eac-dark uppercase text-left">
            {t("artExpertise.appraisal.title")}
          </h1>

          <div className="prose max-w-none">
            <p className="text-lg text-gray-600 mb-4">
              {t("artExpertise.appraisal.intro1")}
            </p>
            <p className="text-lg text-gray-600 mb-6">
              {t("artExpertise.appraisal.intro2")}
            </p>

            <p className="text-lg text-gray-600 font-bold mb-2">
              {t("artExpertise.appraisal.factorsTitle")}
            </p>
            {renderList(evaluationFactors)}

            <p className="text-lg text-gray-600 mb-6">
              {t("artExpertise.appraisal.summary")}
            </p>

            <h3 className="text-lg font-semibold mb-2">
              {t("artExpertise.appraisal.stagesTitle")}
            </h3>
            {renderList(stages)}

            <p className="text-lg text-gray-600 mb-4">
              {t("artExpertise.appraisal.conclusion")}
            </p>
            <p className="text-lg text-gray-600">
              {t("artExpertise.appraisal.contactNote")}
            </p>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ArtAppraisal;
