import Layout from "@/components/Layout";
import CouncilMember from "@/components/council/CouncilMember";
import { useLanguage } from "@/contexts/LanguageContext";
import { Seo } from "@/components/Seo.tsx";

const COUNCIL_MEMBERS = [
  { key: "pampukha", image: `${import.meta.env.BASE_URL}images/council/pampukha.jpg` },
  { key: "moja", image: `${import.meta.env.BASE_URL}images/council/moja.jpg` },
  { key: "marcinkowski", image: `${import.meta.env.BASE_URL}images/council/MARCINKOWSKI.jpg` },
  { key: "billiet", image: `${import.meta.env.BASE_URL}images/council/billiet.jpg` },
  { key: "laycock", image: `${import.meta.env.BASE_URL}images/council/LAYCOCK.jpg` },
];

const Council = () => {
  const { language, t } = useLanguage();

  return (
    <>
      <Seo
        title={t("seo.council.title")}
        description={t("seo.council.description")}
        lang={language}
      />
      <Layout>
        <div className="py-6">
          <h1 className="text-3xl font-bold mb-8 text-eac-dark uppercase text-left">
            {t("council.title")}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {COUNCIL_MEMBERS.map(({ key, image }) => (
              <CouncilMember
                key={key}
                name={t(`council.members.${key}.name`)}
                position={t(`council.members.${key}.position`)}
                description={t(`council.members.${key}.description`)}
                imageSrc={image}
              />
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Council;
