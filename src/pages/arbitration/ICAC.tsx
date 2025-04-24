import Layout from "@/components/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { Seo } from "@/components/Seo.tsx";

const ICAC = () => {
  const { language, t } = useLanguage();

  const competenceKeys = [
    "sale",
    "services",
    "exchange",
    "finance",
    "insurance",
  ];

  const featureKeys = [
    "multinational",
    "principles",
    "flexibility",
    "tech",
    "timing",
    "finality",
  ];

  return (
    <>
      <Seo
        title={t("seo.icac.title")}
        description={t("seo.icac.description")}
        lang={language}
      />
      <Layout>
        <div className="py-6">
          <h1 className="text-3xl font-bold mb-6 text-eac-dark uppercase text-left">
            {t("arbitration.icac.title")}
          </h1>

          <div className="prose max-w-none text-lg text-gray-600">
            <p>{t("arbitration.icac.intro")}</p>
            <p>{t("arbitration.icac.secretariat")}</p>

            <p className="font-semibold text-eac-dark">{t("arbitration.icac.competenceTitle")}</p>
            <ul className="list-disc pl-6">
              {competenceKeys.map((key) => (
                <li key={key} className="mt-2">{t(`arbitration.icac.competenceList.${key}`)}</li>
              ))}
            </ul>

            <h3 className="text-2xl font-semibold text-eac-dark text-left mt-8">
              {t("arbitration.icac.featuresTitle")}
            </h3>

            {featureKeys.map((key) => (
              <div key={key} className="mt-6">
                <p className="font-semibold text-eac-dark text-left">
                  {t(`arbitration.icac.features.${key}Title`)}
                </p>
                <ul className="list-disc pl-6">
                  <li className="mt-2">{t(`arbitration.icac.features.${key}Desc`)}</li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ICAC;
