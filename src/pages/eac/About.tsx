import Layout from "@/components/Layout";
import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const { t } = useLanguage();

  return (
    <Layout>
      <div className="py-6">
        <h1 className="text-3xl font-bold mb-6 text-eac-dark uppercase">{t("aboutEAC.title")}</h1>
        <div className="prose max-w-none">
          <p className="mb-4 text-lg text-gray-600">{t("aboutEAC.intro")}</p>

          <p className="mb-4 text-lg text-gray-600">{t("aboutEAC.missionText")}</p>

          <p className="mb-4 text-lg text-gray-600">{t("aboutEAC.historyText")}</p>

          <p className="mb-4 text-lg text-gray-600">{t("aboutEAC.representativesText")}</p>

          <h3 className="mb-4 text-lg">{t("aboutEAC.keyAreasTitle")}</h3>
          <ul className="mb-4 text-lg text-gray-600 list-disc pl-5">
            <li className="ml-5 mt-2"><b>{t("aboutEAC.keyAreas.commercial").split("–")[0]}</b> – {t("aboutEAC.keyAreas.commercial").split("–")[1]}</li>
            <li className="ml-5 mt-2"><b>{t("aboutEAC.keyAreas.judicial").split("–")[0]}</b> – {t("aboutEAC.keyAreas.judicial").split("–")[1]}</li>
            <li className="ml-5 mt-2"><b>{t("aboutEAC.keyAreas.education").split("–")[0]}</b> – {t("aboutEAC.keyAreas.education").split("–")[1]}</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default About;
