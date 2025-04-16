import Layout from "@/components/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { Seo } from "@/components/Seo.tsx";

const ArbitrationClause = () => {
  const { language, t } = useLanguage();

  return (
    <>
      <Seo title={t("seo.clause.title")} description={t("seo.clause.description")} lang={language}/>
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-8 text-eac-dark uppercase">{t("arbitration.clause.title")}</h1>

          <div className="prose max-w-none">
            {/* Future disputes */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-eac-dark">{t("arbitration.clause.future.title")}</h2>
              <p className="text-lg text-gray-600 mb-4">{t("arbitration.clause.future.description")}</p>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 my-6">
                <p className="text-gray-800 mb-4">{t("arbitration.clause.future.clause1")}</p>
                <p className="text-gray-800 mb-4">{t("arbitration.clause.future.clause2")}</p>
                <p className="text-gray-800 mb-4">{t("arbitration.clause.future.clause3")}</p>
                <p className="text-gray-800 mb-4">{t("arbitration.clause.future.clause4")}</p>
                <p className="text-gray-800">{t("arbitration.clause.future.clause5")}</p>
              </div>
              <p className="text-lg text-gray-600">{t("arbitration.clause.future.note")}</p>
            </section>

            {/* Existing disputes */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-eac-dark">{t("arbitration.clause.existing.title")}</h2>
              <p className="text-lg text-gray-600 mb-4">{t("arbitration.clause.existing.description")}</p>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 my-6">
                <p className="text-gray-800 mb-4">{t("arbitration.clause.existing.clause1")}</p>
                <p className="text-gray-800 mb-4">{t("arbitration.clause.existing.clause2")}</p>
                <p className="text-gray-800 mb-4">{t("arbitration.clause.existing.clause3")}</p>
                <p className="text-gray-800 mb-4">{t("arbitration.clause.existing.clause4")}</p>
                <p className="text-gray-800">{t("arbitration.clause.existing.clause5")}</p>
              </div>
              <p className="text-lg text-gray-600">{t("arbitration.clause.existing.note")}</p>
            </section>
          </div>
        </div>
      </Layout>
    </>

  );
};

export default ArbitrationClause;
