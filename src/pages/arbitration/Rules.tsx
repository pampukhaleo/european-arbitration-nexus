
import React from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Seo } from "@/components/Seo.tsx";
import { Download } from "lucide-react";

const RULES_PDFS = {
  en: "/rules-english.pdf", // Replace with the actual path
  ru: "/rules-russian.pdf", // Replace with the actual path
};

const Rules = () => {
  const { language, t } = useLanguage();

  return (
    <>
      <Seo title={t("seo.rules.title")} description={t("seo.rules.description")} lang={language} />
      <Layout>
        <div className="py-6">
          <h1 className="text-3xl font-bold mb-6 text-eac-dark uppercase">
            {t("arbitration.rules.title")}
          </h1>
          <div className="prose max-w-none">
            <p className="mb-6 text-lg text-gray-600">
              {t("arbitration.rules.description")}
            </p>
            <div className="my-8">
              <p className="text-lg font-medium mb-4">
                {t("arbitration.rules.downloadLabel")}
              </p>
              <Button
                variant="default"
                className="mb-4 rounded-full"
                asChild
              >
                <a
                  href={RULES_PDFS.en}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="flex items-center gap-2">
                    <Download size={18} />
                    {t("arbitration.rules.englishBtn")}
                  </span>
                </a>
              </Button>

              <p className="text-lg font-medium mb-4 mt-8">
                {t("arbitration.rules.translationLabel")}
              </p>
              <Button
                variant="default"
                className="rounded-full"
                asChild
              >
                <a
                  href={RULES_PDFS.ru}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="flex items-center gap-2">
                    <Download size={18} />
                    {t("arbitration.rules.russianBtn")}
                  </span>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Rules;
