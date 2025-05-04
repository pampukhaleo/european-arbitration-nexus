import Layout from "@/components/Layout";
import CouncilMember from "@/components/council/CouncilMember";
import { useLanguage } from "@/contexts/LanguageContext";
import { Seo } from "@/components/Seo.tsx";

const COUNCIL_MEMBERS: { key: string; imageJpg: string; imageWebp: string }[] = [
  {
    key: "pampukha",
    imageJpg: `${import.meta.env.BASE_URL}images/council/pampukha.jpg`,
    imageWebp: `${import.meta.env.BASE_URL}images/council/pampukha.webp`,
  },
  {
    key: "moja",
    imageJpg: `${import.meta.env.BASE_URL}images/council/moja.jpg`,
    imageWebp: `${import.meta.env.BASE_URL}images/council/moja.webp`,
  },
  {
    key: "marcinkowski",
    imageJpg: `${import.meta.env.BASE_URL}images/council/MARCINKOWSKI.jpg`,
    imageWebp: `${import.meta.env.BASE_URL}images/council/MARCINKOWSKI.webp`,
  },
  {
    key: "billiet",
    imageJpg: `${import.meta.env.BASE_URL}images/council/billiet.jpg`,
    imageWebp: `${import.meta.env.BASE_URL}images/council/billiet.webp`,
  },
  {
    key: "laycock",
    imageJpg: `${import.meta.env.BASE_URL}images/council/LAYCOCK.jpg`,
    imageWebp: `${import.meta.env.BASE_URL}images/council/LAYCOCK.webp`,
  },
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
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-8 text-eac-dark uppercase text-left">
            {t("council.title")}
          </h1>
          <div className="flex flex-col space-y-8">
            {COUNCIL_MEMBERS.map(({ key, imageJpg, imageWebp }) => (
              <CouncilMember
                key={key}
                name={t(`council.members.${key}.name`)}
                position={t(`council.members.${key}.position`)}
                description={t(`council.members.${key}.description`)}
                imageJpg={imageJpg}
                imageWebp={imageWebp}
              />
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Council;
