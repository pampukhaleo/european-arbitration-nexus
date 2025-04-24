import Layout from "@/components/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { Seo } from "@/components/Seo.tsx";

const ArbitrationClause = () => {
  const { language, t } = useLanguage();

  const renderClauseBlock = (section: "future" | "existing") => {
    return (
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-eac-dark">
          {t(`arbitration.clause.${section}.title`)}
        </h2>

        <p className="text-lg text-gray-600 mb-4">
          {t(`arbitration.clause.${section}.description`)}
        </p>

        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 my-6">
          {Array.from({ length: 5 }, (_, i) => (
            <p
              key={i}
              className={`text-gray-800 ${i < 4 ? "mb-4" : ""}`}
            >
              {t(`arbitration.clause.${section}.clause${i + 1}`)}
            </p>
          ))}
        </div>

        <p className="text-lg text-gray-600">
          {t(`arbitration.clause.${section}.note`)}
        </p>
      </section>
    );
  };

  return (
    <>
      <Seo
        title={t("seo.clause.title")}
        description={t("seo.clause.description")}
        lang={language}
      />
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-8 text-eac-dark uppercase">
            {t("arbitration.clause.title")}
          </h1>

          <div className="prose max-w-none">
            {renderClauseBlock("future")}
            {renderClauseBlock("existing")}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ArbitrationClause;
