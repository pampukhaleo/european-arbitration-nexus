import Layout from "@/components/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { Seo } from "@/components/Seo.tsx";

const ArtPassport = () => {
  const { language, t } = useLanguage();

  const eligibleObjects = t("artExpertise.passport.eligibleObjects") as string[];
  const passportFields = t("artExpertise.passport.passportFields") as string[];
  const passportAdvantages = t("artExpertise.passport.advantages") as string[];

  return (
    <>
      <Seo title={t("seo.artPassport.title")} description={t("seo.artPassport.description")} lang={language}/>
      <Layout>
        <div className="py-6">
          <h1 className="text-3xl font-bold mb-6 text-eac-dark uppercase">
            {t("artExpertise.passport.title")}
          </h1>
          <div className="prose max-w-none">
            <p className="mb-4 text-lg text-gray-600">
              { t("artExpertise.passport.intro") }
            </p>

            <h3 className="mb-4 text-lg">
              { t("artExpertise.passport.eligibleObjectsTitle") }
            </h3>
            <ul className="mb-4 text-lg text-gray-600 list-disc pl-5">
              { eligibleObjects.map((item, idx) => (
                <li className="ml-5 mt-2" key={ idx }>{ item }</li>
              )) }
            </ul>

            <h3 className="mb-4 text-lg">
              { t("artExpertise.passport.certificationTitle") }
            </h3>
            <p className="mb-4 text-lg text-gray-600">
              { t("artExpertise.passport.certificationDesc") }
            </p>

            <h3 className="mb-4 text-lg">
              { t("artExpertise.passport.passportContentTitle") }
            </h3>
            <p className="mb-4 text-lg text-gray-600">
              { t("artExpertise.passport.passportContentIntro") }
            </p>
            <ul className="mb-4 text-lg text-gray-600 list-disc pl-5">
              { passportFields.map((item, idx) => (
                <li className="ml-5 mt-2" key={ idx }>{ item }</li>
              )) }
            </ul>

            <h3 className="mb-4 text-lg">
              { t("artExpertise.passport.whyImportantTitle") }
            </h3>
            <p className="mb-4 text-lg text-gray-600">
              { t("artExpertise.passport.whyImportantIntro") }
            </p>
            <ul className="mb-4 text-lg text-gray-600 list-disc pl-5">
              { passportAdvantages.map((item, idx) => (
                <li className="ml-5 mt-2" key={ idx }>{ item }</li>
              )) }
            </ul>
            <p className="mb-4 text-lg text-gray-600">
              { t("artExpertise.passport.finalNote") }
            </p>
            <p className="mb-4 text-lg text-gray-600 font-bold">
              { t("artExpertise.passport.consultation") }
            </p>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ArtPassport;
