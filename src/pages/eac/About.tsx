import Layout from "@/components/Layout";
import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const { t } = useLanguage();

  return (
    <Layout>
      <div className="py-6">
        <h1 className="text-3xl font-bold mb-6 text-eac-dark">{t("aboutEAC.title")}</h1>
        <div className="prose max-w-none">
          <p className="mb-4 text-lg text-gray-600">{t("aboutEAC.intro")}</p>

          <h3 className="mb-4 text-lg">{t("aboutEAC.missionTitle")}</h3>
          <p className="mb-4 text-lg text-gray-600">{t("aboutEAC.missionText")}</p>

          <h3 className="mb-4 text-lg">{t("aboutEAC.historyTitle")}</h3>
          <p className="mb-4 text-lg text-gray-600">{t("aboutEAC.historyText")}</p>

          <h3 className="mb-4 text-lg">{t("aboutEAC.globalReachTitle")}</h3>
          <p className="mb-4 text-lg text-gray-600">{t("aboutEAC.globalReachText")}</p>
          <ul className="mb-4 text-lg text-gray-600 list-disc pl-5">
            <li className="ml-5 mt-2">{t("aboutEAC.globalReachList.arbitrators")}</li>
            <li className="ml-5">{t("aboutEAC.globalReachList.mediators")}</li>
            <li className="ml-5">{t("aboutEAC.globalReachList.experts")}</li>
            <li className="ml-5">{t("aboutEAC.globalReachList.professionals")}</li>
          </ul>

          <h3 className="mb-4 text-lg">{t("aboutEAC.keyAreasTitle")}</h3>
          <ul className="mb-4 text-lg text-gray-600 list-disc pl-5">
            <li className="ml-5 mt-2"><b>{t("aboutEAC.keyAreas.commercial").split("–")[0]}</b> – {t("aboutEAC.keyAreas.commercial").split("–")[1]}</li>
            <li className="ml-5 mt-2"><b>{t("aboutEAC.keyAreas.judicial").split("–")[0]}</b> – {t("aboutEAC.keyAreas.judicial").split("–")[1]}</li>
            <li className="ml-5 mt-2"><b>{t("aboutEAC.keyAreas.education").split("–")[0]}</b> – {t("aboutEAC.keyAreas.education").split("–")[1]}</li>
          </ul>

          <p className="mb-4 text-lg text-gray-600">{t("aboutEAC.icac")}</p>
          <p className="mb-4 text-lg text-gray-600">{t("aboutEAC.conclusion")}</p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
