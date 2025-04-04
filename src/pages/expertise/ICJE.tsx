import Layout from "@/components/Layout";
import { useLanguage } from "@/contexts/LanguageContext";

const ICJE = () => {
  const { t } = useLanguage();

  return (
    <Layout>
      <div className="py-6">
        <h1 className="text-3xl font-bold mb-6 text-eac-dark">{t("expertise.icje.title")}</h1>
        <div className="prose max-w-none">
          <p className="mb-6 text-lg text-gray-600">{t("expertise.icje.description1")}</p>
          <p className="mb-6 text-lg text-gray-600 font-bold">{t("expertise.icje.description2")}</p>
        </div>
      </div>
    </Layout>
  );
};

export default ICJE;
