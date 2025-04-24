import Layout from "@/components/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { Seo } from "@/components/Seo.tsx";

const ExpertiseFields = () => {
  const { language, t } = useLanguage();

  const areas = t<string[]>("expertise.fields.areas");
  const providedFor = t<string[]>("expertise.fields.providedFor");

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
        title={t("seo.areas.title")}
        description={t("seo.areas.description")}
        lang={language}
      />
      <Layout>
        <div className="py-6">
          <h1 className="text-3xl font-bold mb-6 text-eac-dark uppercase text-left">
            {t("expertise.fields.title")}
          </h1>

          <div className="prose max-w-none">
            <p className="text-lg text-gray-600 mb-6">
              {t("expertise.fields.description1")}
            </p>

            {renderList(areas)}

            <h2 className="text-2xl font-bold mb-4 text-eac-dark text-left">
              {t("expertise.fields.subtitle")}
            </h2>

            {renderList(providedFor)}

            <p className="text-lg text-gray-600">
              {t("expertise.fields.finalNote")}
            </p>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ExpertiseFields;
