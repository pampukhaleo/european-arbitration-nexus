import Layout from "@/components/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { Seo } from "@/components/Seo.tsx";

const ICJE = () => {
  const { language, t } = useLanguage();

  const bullets = t<string[]>("expertise.icje.description2.examinations");


  return (
    <>
      <Seo title={t("seo.icje.title")} description={t("seo.icje.description")} lang={language}/>
      <Layout>
        <div className="py-6">
          <h1 className="text-3xl font-bold mb-6 text-eac-dark uppercase text-left">{t("expertise.icje.title")}</h1>
          <div className="prose max-w-none">
            <p className="mb-6 text-lg text-gray-600">{t("expertise.icje.description1")}</p>

            <p className="mb-6 text-lg text-gray-600 font-bold">
              {t("expertise.icje.description2.text")}
            </p>

            <ul className="list-disc ml-5 mb-6">

              {bullets.map((area, idx) => (
                <li className="ml-5 mt-2" key={idx}>{area}</li>
              ))}
            </ul>

            <p className="mb-6 text-lg text-gray-600">{t("expertise.icje.description2.footer")}</p>
          </div>
        </div>
      </Layout>
    </>

  );
};

export default ICJE;
