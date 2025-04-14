import Layout from "@/components/Layout";
import { useLanguage } from "@/contexts/LanguageContext";

const ICAC = () => {
  const { t } = useLanguage();

  return (
    <Layout>
      <div className="py-6">
        <h1 className="text-3xl font-bold mb-6 text-eac-dark uppercase">{t("arbitration.icac.title")}</h1>
        <div className="prose max-w-none">
          <p className="mb-6 text-lg text-gray-600">{t("arbitration.icac.intro")}</p>
          <p className="mb-6 text-lg text-gray-600">{t("arbitration.icac.secretariat")}</p>

          <p className="mb-4 text-lg text-gray-600">{t("arbitration.icac.competenceTitle")}</p>
          <ul className="mb-4 text-lg text-gray-600 list-disc pl-5">
            <li className="ml-5 mt-2">{t("arbitration.icac.competenceList.sale")}</li>
            <li className="ml-5">{t("arbitration.icac.competenceList.services")}</li>
            <li className="ml-5">{t("arbitration.icac.competenceList.exchange")}</li>
            <li className="ml-5">{t("arbitration.icac.competenceList.finance")}</li>
            <li className="ml-5">{t("arbitration.icac.competenceList.insurance")}</li>
          </ul>

          <h3 className="text-2xl font-semibold mb-4 text-eac-dark">{t("arbitration.icac.featuresTitle")}</h3>

          {[
            "multinational",
            "principles",
            "flexibility",
            "tech",
            "timing",
            "finality",
          ].map((key) => (
            <div key={key}>
              <p className="text-lg font-semibold mb-4 text-eac-dark">{t(`arbitration.icac.features.${key}Title`)}</p>
              <ul className="mb-4 text-lg text-gray-600 list-disc pl-5">
                <li className="ml-5 mt-2">{t(`arbitration.icac.features.${key}Desc`)}</li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ICAC;
