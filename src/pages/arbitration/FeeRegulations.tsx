
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Seo } from "@/components/Seo.tsx";
import { Download } from "lucide-react";

const FEES_PDFS = {
  en: "/fees-english.pdf", // Replace with the actual path
  ru: "/fees-russian.pdf", // Replace with the actual path
};

const feesTexts = {
  en: `This is the complete English version of the EAC Fee Regulations. It outlines the fee structure, calculation methods, payment requirements, and terms of service for arbitration cases administered by EAC. Please ensure you familiarize yourself with the fees before proceeding with an application or submission.`,
  ru: `Это полный текст Положения о сборах ЕАС на русском языке. В нем описаны структура сборов, методы расчета, требования к оплате и условия оказания услуг по арбитражным делам, администрируемым ЕАС. Убедитесь, что вы ознакомились с положением о сборах перед подачей заявления или обращения.`,
};

const FeeRegulations = () => {
  const { language, t } = useLanguage();
  const [showText, setShowText] = useState<"en" | "ru" | null>(null);

  const handleShowText = (lang: "en" | "ru") => {
    setShowText((prev) => (prev === lang ? null : lang));
  };

  return (
    <>
      <Seo title={t("seo.fees.title")} description={t("seo.fees.description")} lang={language} />
      <Layout>
        <div className="py-6">
          <h1 className="text-3xl font-bold mb-6 text-eac-dark uppercase">
            {t("arbitration.fees.title")}
          </h1>
          <div className="prose max-w-none">
            <p className="mb-6 text-lg text-gray-600">
              {t("arbitration.fees.description")}
            </p>
            <div className="my-8">
              <p className="text-lg font-medium mb-4">
                {t("arbitration.fees.downloadLabel")}
              </p>
              <Button
                variant="outline"
                className="mb-4 border-eac-primary hover:!text-white hover:bg-eac-primary/90 rounded-full"
                onClick={() => handleShowText("en")}
              >
                <span className="flex items-center gap-2">
                  <FileText size={18} />
                  {t("arbitration.fees.englishBtn")}
                </span>
              </Button>

              {showText === "en" && (
                <div className="mb-8 p-6 bg-eac-light/50 rounded-xl shadow border border-eac-primary animate-fade-in">
                  <div className="text-gray-700 text-base leading-relaxed whitespace-pre-line mb-4">
                    {feesTexts.en}
                  </div>
                  <Button
                    variant="default"
                    className="rounded-full mt-4 flex items-center gap-2"
                    asChild
                  >
                    <a
                      href={FEES_PDFS.en}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Download className="mr-2" size={18} />
                      {t("arbitration.fees.downloadFinalBtn", "Download PDF")}
                    </a>
                  </Button>
                </div>
              )}

              <p className="text-lg font-medium mb-4 mt-8">
                {t("arbitration.fees.translationLabel")}
              </p>
              <Button
                variant="outline"
                className="border-eac-primary hover:!text-white hover:bg-eac-primary/90 rounded-full"
                onClick={() => handleShowText("ru")}
              >
                <span className="flex items-center gap-2">
                  <FileText size={18} />
                  {t("arbitration.fees.russianBtn")}
                </span>
              </Button>

              {showText === "ru" && (
                <div className="mb-8 p-6 bg-eac-light/50 rounded-xl shadow border border-eac-primary animate-fade-in">
                  <div className="text-gray-700 text-base leading-relaxed whitespace-pre-line mb-4">
                    {feesTexts.ru}
                  </div>
                  <Button
                    variant="default"
                    className="rounded-full mt-4 flex items-center gap-2"
                    asChild
                  >
                    <a
                      href={FEES_PDFS.ru}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Download className="mr-2" size={18} />
                      {t("arbitration.fees.downloadFinalBtn", "Скачать PDF")}
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

export default FeeRegulations;
