
import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ArtAppraisal() {
  const { t } = useLanguage();
  const evaluationFactors = Array.isArray(t<string[]>("artExpertise.appraisal.evaluationFactors")) 
    ? t<string[]>("artExpertise.appraisal.evaluationFactors") 
    : [];
  const stages = Array.isArray(t<string[]>("artExpertise.appraisal.stagesList")) 
    ? t<string[]>("artExpertise.appraisal.stagesList") 
    : [];

  return (
    <>
      <Seo 
        title={t("seo.appraisal.title")}
        description={t("seo.appraisal.description")}
      />
      <Layout>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">
            {t("artExpertise.appraisal.title")}
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-lg leading-relaxed">
              {t("artExpertise.appraisal.intro1")}
            </p>
            
            <p className="text-lg leading-relaxed mt-4">
              {t("artExpertise.appraisal.intro2")}
            </p>

            <div className="mt-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {t("artExpertise.appraisal.factorsTitle")}
              </h2>
              
              <ul className="list-disc list-inside space-y-2 ml-4">
                {evaluationFactors.map((factor, index) => (
                  <li key={index} className="text-gray-700">
                    {factor}
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-lg leading-relaxed mt-6">
              {t("artExpertise.appraisal.summary")}
            </p>

            <div className="mt-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {t("artExpertise.appraisal.stagesTitle")}
              </h2>
              
              <ol className="list-decimal list-inside space-y-2 ml-4">
                {stages.map((stage, index) => (
                  <li key={index} className="text-gray-700">
                    {stage}
                  </li>
                ))}
              </ol>
            </div>

            <p className="text-lg leading-relaxed mt-6">
              {t("artExpertise.appraisal.conclusion")}
            </p>

            <p className="text-lg leading-relaxed mt-4">
              {t("artExpertise.appraisal.contactNote")}
            </p>
          </div>
        </div>
      </Layout>
    </>
  );
}
