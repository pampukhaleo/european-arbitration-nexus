import Layout from "@/components/Layout";
import { useLanguage } from "@/contexts/LanguageContext";

const CodeOfConduct = () => {
  const { t } = useLanguage();

  const obligations = t("membership.code.obligations.list") as string[];
  const responsibilities = t("membership.code.responsibilities.list") as string[];

  return (
    <Layout>
      <div className="py-6">
        <h1 className="text-3xl font-bold mb-6 text-eac-dark">{t("membership.code.title")}</h1>
        <div className="prose max-w-none">
          <p className="mb-4 text-lg text-gray-600">{t("membership.code.intro")}</p>

          <h3 className="mb-4 text-lg">{t("membership.code.obligations.title")}</h3>
          <p className="mb-4 text-lg text-gray-600">{t("membership.code.obligations.description")}</p>
          <ul className="mb-4 text-lg text-gray-600 list-disc pl-5">
            {obligations.map((item, i) => (
              <li className="ml-5 mt-2" key={i}>{item}</li>
            ))}
          </ul>

          <h3 className="mb-4 text-lg">{t("membership.code.responsibilities.title")}</h3>
          <p className="mb-4 text-lg text-gray-600">{t("membership.code.responsibilities.description")}</p>
          <ul className="mb-4 text-lg text-gray-600 list-disc pl-5">
            {responsibilities.map((item, i) => (
              <li className="ml-5 mt-2" key={i}>{item}</li>
            ))}
          </ul>

          <h3 className="mb-4 text-lg">{t("membership.code.sanctions.title")}</h3>
          <p className="mb-4 text-lg text-gray-600">{t("membership.code.sanctions.description")}</p>
        </div>
      </div>
    </Layout>
  );
};

export default CodeOfConduct;
