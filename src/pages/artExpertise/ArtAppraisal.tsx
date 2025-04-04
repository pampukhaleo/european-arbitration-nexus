import Layout from "@/components/Layout";
import { useLanguage } from "@/contexts/LanguageContext";

const ArtAppraisal = () => {
  const { t } = useLanguage();

  const evaluationFactors = t("artExpertise.appraisal.evaluationFactors") as string[];
  const stages = t("artExpertise.appraisal.stagesList") as string[];

  return (
    <Layout>
      <div className="py-6">
        <h1 className="text-3xl font-bold mb-6 text-eac-dark">
          {t("artExpertise.appraisal.title")}
        </h1>

        <div className="prose max-w-none">
          <p className="mb-4 text-lg text-gray-600">
            {t("artExpertise.appraisal.intro1")}
          </p>
          <p className="mb-4 text-lg text-gray-600">
            {t("artExpertise.appraisal.intro2")}
          </p>

          <p className="mb-4 text-lg text-gray-600 font-bold">
            {t("artExpertise.appraisal.factorsTitle")}
          </p>
          <ul className="mb-4 text-lg text-gray-600 list-disc pl-5">
            {evaluationFactors.map((factor, idx) => (
              <li className="ml-5 mt-2" key={idx}>{factor}</li>
            ))}
          </ul>

          <p className="mb-4 text-lg text-gray-600">
            {t("artExpertise.appraisal.summary")}
          </p>

          <h3 className="mb-4 text-lg">{t("artExpertise.appraisal.stagesTitle")}</h3>
          <ul className="mb-4 text-lg text-gray-600 list-disc pl-5">
            {stages.map((stage, idx) => (
              <li className="ml-5 mt-2" key={idx}>{stage}</li>
            ))}
          </ul>

          <p className="mb-4 text-lg text-gray-600">
            {t("artExpertise.appraisal.conclusion")}
          </p>
          <p className="mb-4 text-lg text-gray-600">
            {t("artExpertise.appraisal.contactNote")}
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default ArtAppraisal;
