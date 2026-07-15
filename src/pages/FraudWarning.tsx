import Layout from "@/components/Layout";
import { Seo } from "@/components/Seo.tsx";
import { Link } from "@/lib/i18nRouting";
import { useLanguage } from "@/contexts/LanguageContext";
import { AlertTriangle, ShieldCheck, Flag, LifeBuoy, Mail } from "lucide-react";

const FraudWarning = () => {
  const { language, t } = useLanguage();

  const officialItems = t<string[]>("fraud.page.officialItems");
  const redFlagsItems = t<string[]>("fraud.page.redFlagsItems");
  const whatToDoItems = t<string[]>("fraud.page.whatToDoItems");

  return (
    <>
      <Seo
        title={t("fraud.page.title") + " | European Arbitration Chamber"}
        description={t("fraud.page.intro")}
        lang={language}
      />
      <Layout>
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="h-8 w-8 text-amber-600" aria-hidden="true" />
            <h1 className="text-3xl font-bold text-eac-dark uppercase">
              {t("fraud.page.title")}
            </h1>
          </div>

          <p className="text-base leading-relaxed text-muted-foreground mb-10">
            {t("fraud.page.intro")}
          </p>

          <section className="mb-10">
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="h-5 w-5 text-eac-primary" aria-hidden="true" />
              <h2 className="text-xl font-semibold text-eac-dark">
                {t("fraud.page.officialHeading")}
              </h2>
            </div>
            <ul className="list-disc pl-6 space-y-2 text-sm leading-relaxed">
              {Array.isArray(officialItems) &&
                officialItems.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </section>

          <section className="mb-10">
            <div className="flex items-center gap-2 mb-3">
              <Flag className="h-5 w-5 text-amber-600" aria-hidden="true" />
              <h2 className="text-xl font-semibold text-eac-dark">
                {t("fraud.page.redFlagsHeading")}
              </h2>
            </div>
            <ul className="list-disc pl-6 space-y-2 text-sm leading-relaxed">
              {Array.isArray(redFlagsItems) &&
                redFlagsItems.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </section>

          <section className="mb-10">
            <div className="flex items-center gap-2 mb-3">
              <LifeBuoy className="h-5 w-5 text-eac-primary" aria-hidden="true" />
              <h2 className="text-xl font-semibold text-eac-dark">
                {t("fraud.page.whatToDoHeading")}
              </h2>
            </div>
            <ul className="list-disc pl-6 space-y-2 text-sm leading-relaxed">
              {Array.isArray(whatToDoItems) &&
                whatToDoItems.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-eac-dark mb-3">
              {t("fraud.page.enforcementHeading")}
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {t("fraud.page.enforcementText")}
            </p>
          </section>

          <div className="rounded-lg border border-amber-200 bg-amber-50 p-5 flex items-start gap-3">
            <Mail className="h-5 w-5 text-amber-700 mt-0.5" aria-hidden="true" />
            <div className="text-sm">
              <a
                href="mailto:secretary@chea-taic.be"
                className="font-semibold text-eac-primary hover:underline"
              >
                secretary@chea-taic.be
              </a>
              <div className="mt-1">
                <Link
                  to="/contacts"
                  className="text-eac-primary hover:underline"
                >
                  {t("fraud.page.contactCta")} →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default FraudWarning;
