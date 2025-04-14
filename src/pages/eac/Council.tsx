import Layout from "@/components/Layout";
import CouncilMember from "@/components/council/CouncilMember";
import { useLanguage } from "@/contexts/LanguageContext";

const Council = () => {
  const { t } = useLanguage();

  const councilMembers = [
    {
      key: "pampukha",
      image: `${import.meta.env.BASE_URL}images/council/pampukha.jpg`,
    },
    {
      key: "moja",
      image: `${import.meta.env.BASE_URL}images/council/moja.jpg`,
    },
    {
      key: "marcinkowski",
      image: `${import.meta.env.BASE_URL}images/council/MARCINKOWSKI.jpg`,
    },
    {
      key: "billiet",
      image: `${import.meta.env.BASE_URL}images/council/billiet.jpg`,
    },
    {
      key: "laycock",
      image: `${import.meta.env.BASE_URL}images/council/LAYCOCK.jpg`,
    },
  ];

  return (
    <Layout>
      <div className="py-6">
        <h1 className="text-3xl font-bold mb-8 text-eac-dark uppercase">{t("council.title")}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {councilMembers.map((member) => (
            <CouncilMember
              key={member.key}
              name={t(`council.members.${member.key}.name`)}
              position={t(`council.members.${member.key}.position`)}
              description={t(`council.members.${member.key}.description`)}
              imageSrc={member.image}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Council;
