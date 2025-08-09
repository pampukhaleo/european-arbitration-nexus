import Layout from "@/components/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { Seo } from "@/components/Seo.tsx";

const About = () => {
  const { language, t } = useLanguage();

  const renderKeyArea = (key: string) => {
    const [title, description] = t(key).split("–");
    return (
      <li className="mt-2">
        <strong>{title.trim()}</strong> – {description.trim()}
      </li>
    );
  };

  return (
    <>
      <Seo
        title={t("seo.eac.title")}
        description={t("seo.eac.description")}
        lang={language}
      />
      <Layout>
        <div className="py-6">
          <h1 className="text-3xl font-bold mb-6 text-eac-dark uppercase text-left">
            {t("aboutEAC.title")}
          </h1>

          <div className="prose max-w-none text-lg text-gray-600">
            <p className="mb-4">{t("aboutEAC.intro")}</p>
            <p className="mb-4">{t("aboutEAC.missionText")}</p>
            <p className="mb-4">{t("aboutEAC.historyText")}</p>
            <p className="mb-4">{t("aboutEAC.representativesText")}</p>

            <h3 className="text-left">{t("aboutEAC.keyAreasTitle")}</h3>
            <ul className="list-disc pl-6">
              {renderKeyArea("aboutEAC.keyAreas.commercial")}
              {renderKeyArea("aboutEAC.keyAreas.judicial")}
              {renderKeyArea("aboutEAC.keyAreas.education")}
            </ul>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default About;
