
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Seo } from "@/components/Seo.tsx";
import { Download } from "lucide-react";

const RULES_PDFS = {
  en: "/rules-english.pdf", // Replace with the actual path
  ru: "/rules-russian.pdf", // Replace with the actual path
};

const rulesTexts = {
  en: `This is the full English text of the EAC Arbitration Rules. Please read the details carefully before proceeding. The regulations cover the arbitration procedures, requirements for submission, appointment of arbitrators, conduct of proceedings, and other related provisions. Make sure that you understand all obligations and processes prescribed.`,
  ru: `Это полный текст Арбитражных правил ЕАС на русском языке. Пожалуйста, внимательно ознакомьтесь с подробностями перед продолжением. В правилах описаны процедуры арбитража, требования к подаче, назначению арбитров, проведению разбирательств и другие важные положения. Убедитесь, что вы понимаете все предписанные обязанности и процедуры.`,
};

const Rules = () => {
  const { language, t } = useLanguage();
  const [showText, setShowText] = useState<"en" | "ru" | null>(null);

  const handleShowText = (lang: "en" | "ru") => {
    setShowText((prev) => (prev === lang ? null : lang));
  };

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
                variant="outline"
                className="mb-4 border-eac-primary hover:bg-eac-primary/90 hover:!text-white rounded-full"
                onClick={() => handleShowText("en")}
              >
                <span className="flex items-center gap-2">
                  <FileText size={18} />
                  {t("arbitration.rules.englishBtn")}
                </span>
              </Button>

              {showText === "en" && (
                <div className="mb-8 p-6 bg-eac-light/50 rounded-xl shadow border border-eac-primary animate-fade-in">
                  <div className="text-gray-700 text-base leading-relaxed whitespace-pre-line mb-4">
                    {rulesTexts.en}
                  </div>
                  <Button
                    variant="default"
                    className="rounded-full mt-4 flex items-center gap-2"
                    asChild
                  >
                    <a
                      href={RULES_PDFS.en}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Download className="mr-2" size={18} />
                      {t("arbitration.rules.downloadFinalBtn", "Download PDF")}
                    </a>
                  </Button>
                </div>
              )}

              <p className="text-lg font-medium mb-4 mt-8">
                {t("arbitration.rules.translationLabel")}
              </p>
              <Button
                variant="outline"
                className="border-eac-primary hover:bg-eac-primary/90 hover:!text-white rounded-full"
                onClick={() => handleShowText("ru")}
              >
                <span className="flex items-center gap-2">
                  <FileText size={18} />
                  {t("arbitration.rules.russianBtn")}
                </span>
              </Button>

              {showText === "ru" && (
                <div className="mb-8 p-6 bg-eac-light/50 rounded-xl shadow border border-eac-primary animate-fade-in">
                  <div className="text-gray-700 text-base leading-relaxed whitespace-pre-line mb-4">
                    {rulesTexts.ru}
                  </div>
                  <Button
                    variant="default"
                    className="rounded-full mt-4 flex items-center gap-2"
                    asChild
                  >
                    <a
                      href={RULES_PDFS.ru}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Download className="mr-2" size={18} />
                      {t("arbitration.rules.downloadFinalBtn", "Скачать PDF")}
                    </a>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Rules;
