import Layout from "@/components/Layout";
import { useLanguage } from "@/contexts/LanguageContext";

const ExpertiseFields = () => {
  const { t } = useLanguage();

  const areas = t<string[]>("expertise.fields.areas");
  const providedFor = t<string[]>("expertise.fields.providedFor");

  return (
    <Layout>
      <div className="py-6">
        <h1 className="text-3xl font-bold mb-6 text-eac-dark uppercase">
          {t("expertise.fields.title")}
        </h1>
        <div className="prose max-w-none">
          <p className="mb-4 text-lg text-gray-600">
            {t("expertise.fields.description1")}
          </p>
          <ul className="mb-4 text-lg text-gray-600 list-disc pl-5">
            {areas.map((area, idx) => (
              <li className="ml-5 mt-2" key={idx}>{area}</li>
            ))}
          </ul>
          <h2 className="text-2xl font-bold mb-6 text-eac-dark">
            {t("expertise.fields.subtitle")}
          </h2>
          <ul className="mb-4 text-lg text-gray-600 list-disc pl-5">
            {providedFor.map((item, idx) => (
              <li className="ml-5 mt-2" key={idx}>{item}</li>
            ))}
          </ul>
          <p className="mb-4 text-lg text-gray-600">
            {t("expertise.fields.finalNote")}
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default ExpertiseFields;
