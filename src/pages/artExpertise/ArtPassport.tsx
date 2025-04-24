import Layout from "@/components/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { Seo } from "@/components/Seo.tsx";

const ArtPassport = () => {
  const { language, t } = useLanguage();

  const eligibleObjects = t("artExpertise.passport.eligibleObjects") as string[];
  const passportFields = t("artExpertise.passport.passportFields") as string[];
  const passportAdvantages = t("artExpertise.passport.advantages") as string[];

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
        title={t("seo.artPassport.title")}
        description={t("seo.artPassport.description")}
        lang={language}
      />
      <Layout>
        <div className="py-6">
          <h1 className="text-3xl font-bold mb-6 text-eac-dark uppercase text-left">
            {t("artExpertise.passport.title")}
          </h1>

          <div className="prose max-w-none">
            <p className="text-lg text-gray-600 mb-6">
              {t("artExpertise.passport.intro")}
            </p>

            <h3 className="text-lg font-semibold mb-2 text-left">
              {t("artExpertise.passport.eligibleObjectsTitle")}
            </h3>
            {renderList(eligibleObjects)}

            <h3 className="text-lg font-semibold mb-2 text-left">
              {t("artExpertise.passport.certificationTitle")}
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              {t("artExpertise.passport.certificationDesc")}
            </p>

            <h3 className="text-lg font-semibold mb-2 text-left">
              {t("artExpertise.passport.passportContentTitle")}
            </h3>
            <p className="text-lg text-gray-600 mb-4">
              {t("artExpertise.passport.passportContentIntro")}
            </p>
            {renderList(passportFields)}

            <h3 className="text-lg font-semibold mb-2">
              {t("artExpertise.passport.whyImportantTitle")}
            </h3>
            <p className="text-lg text-gray-600 mb-4">
              {t("artExpertise.passport.whyImportantIntro")}
            </p>
            {renderList(passportAdvantages)}

            <p className="text-lg text-gray-600 mb-4">
              {t("artExpertise.passport.finalNote")}
            </p>
            <p className="text-lg text-gray-600 font-bold">
              {t("artExpertise.passport.consultation")}
            </p>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ArtPassport;
