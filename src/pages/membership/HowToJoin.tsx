
import Layout from "@/components/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { Seo } from "@/components/Seo.tsx";

const HowToJoin = () => {
  const { language, t } = useLanguage();

  const steps = t("membership.join.steps") as {
    title: string;
    description: string;
  }[];

  const formLink = t("membership.join.formLink");
  const isValidUrl = typeof formLink === 'string' && (formLink.startsWith('http://') || formLink.startsWith('https://'));

  return (
    <>
      <Seo title={t("seo.join.title")} description={t("seo.join.description")} lang={language}/>
      <Layout>
        <div className="py-6">
          <h1 className="text-3xl font-bold mb-6 text-eac-dark uppercase text-left">{t("membership.join.title")}</h1>
          <div className="prose max-w-none">
            <p className="mb-4 text-lg text-gray-600">{t("membership.join.description")}</p>
            
            {Array.isArray(steps) && steps.length > 0 ? (
              <ul className="mb-4 text-lg text-gray-600 list-disc pl-5">
                {steps.map((step, idx) => (
                  <li className="ml-5 mt-2" key={idx}>
                    <b>{step.title}</b> – {step.description}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="mb-4 text-lg text-gray-600">
                <p>Steps information is not available in the current language.</p>
              </div>
            )}

            <p className="mb-4 text-lg text-gray-600">{t("membership.join.fee")}</p>
            
            <div className="mb-4 text-lg text-gray-600">
              <p>{t("membership.join.formPrompt")}</p>
              {isValidUrl && (
                <p className="mt-2">
                  <a href={formLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">
                    {formLink}
                  </a>
                </p>
              )}
            </div>

            <p className="mb-4 text-lg text-gray-600">{t("membership.join.followUp")}</p>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default HowToJoin;
