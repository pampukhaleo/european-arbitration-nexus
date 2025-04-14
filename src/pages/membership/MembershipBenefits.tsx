import Layout from "@/components/Layout";
import { useLanguage } from "@/contexts/LanguageContext";

const MembershipBenefits = () => {
  const { t } = useLanguage();

  const reasons = t("membership.benefits.reasons") as {
    title: string;
    description: string;
  }[];

  return (
    <Layout>
      <div className="py-6">
        <h1 className="text-3xl font-bold mb-6 text-eac-dark uppercase">
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
  );
};

export default MembershipBenefits;
