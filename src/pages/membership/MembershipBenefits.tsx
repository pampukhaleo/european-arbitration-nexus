import Layout from "@/components/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { Seo } from "@/components/Seo.tsx";

const MembershipBenefits = () => {
  const { language, t } = useLanguage();

  const reasons = t("membership.benefits.reasons") as {
    title: string;
    description: string;
  }[];

  return (
    <>
      <Seo title={t("seo.benefits.title")} description={t("seo.benefits.description")} lang={language}/>
      <Layout>
        <div className="py-6">
          <h1 className="text-3xl font-bold mb-6 text-eac-dark uppercase text-left">
            {t("membership.benefits.title")}
          </h1>
          <ul className="mb-4 text-lg text-gray-600 list-disc pl-5">
            {reasons.map((reason, idx) => (
              <li className="ml-5 mt-2" key={idx}>
                <h3 className="text-lg font-bold">{reason.title}</h3>
                {reason.description}
              </li>
            ))}
          </ul>
        </div>
      </Layout>
    </>

  );
};

export default MembershipBenefits;
