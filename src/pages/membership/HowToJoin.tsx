import Layout from "@/components/Layout";
import { useLanguage } from "@/contexts/LanguageContext";

const HowToJoin = () => {
  const { t } = useLanguage();

  const steps = t("membership.join.steps") as {
    title: string;
    description: string;
  }[];

  return (
    <Layout>
      <div className="py-6">
        <h1 className="text-3xl font-bold mb-6 text-eac-dark">{t("membership.join.title")}</h1>
        <div className="prose max-w-none">
          <p className="mb-4 text-lg text-gray-600">{t("membership.join.description")}</p>
          <ul className="mb-4 text-lg text-gray-600 list-disc pl-5">
            {steps.map((step, idx) => (
              <li className="ml-5 mt-2" key={idx}>
                <b>{step.title}</b> – {step.description}
              </li>
            ))}
          </ul>

          <p className="mb-4 text-lg text-gray-600">{t("membership.join.fee")}</p>
          <p className="mb-4 text-lg text-gray-600">
            {t("membership.join.formPrompt")}
            <p>
              <a href={t("membership.join.formLink")}>{t("membership.join.formLink")}</a>
            </p>
          </p>

          <p className="mb-4 text-lg text-gray-600">{t("membership.join.followUp")}</p>
        </div>
      </div>
    </Layout>
  );
};

export default HowToJoin;
