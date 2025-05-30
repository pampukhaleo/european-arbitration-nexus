import React from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Seo } from "@/components/Seo.tsx";
import { Download } from "lucide-react";

const FEES_PDFS = {
  en: "/ICAC Provisions on Arbitration Costs as of November 11, 2020.pdf",
  ru: "/Положение_о_сборах_МКАС_от_11_ноября_2020.pdf",
};

const FeeRegulations = () => {
  const { language, t } = useLanguage();

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
              { t("arbitration.fees.description") }
            </p>

            <div className="my-8">
              <p className="text-lg font-medium mb-4">
                { t("arbitration.fees.downloadLabel") }
              </p>

              <Button variant="default" className="rounded-full px-6 py-3 w-full sm:w-auto text-center" asChild>
                <a
                  href={ FEES_PDFS.en }
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-center whitespace-normal break-words w-full h-full"
                >
                  <Download size={ 18 }/>
                  <span className="whitespace-normal break-words">{ t("arbitration.fees.englishBtn") }</span>
                </a>
              </Button>

              <p className="text-lg font-medium mb-4 mt-8">
                { t("arbitration.fees.translationLabel") }
              </p>

              <Button variant="default" className="rounded-full px-6 py-3 w-full sm:w-auto text-center" asChild>
                <a
                  href={ FEES_PDFS.ru }
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-center whitespace-normal break-words w-full h-full"
                >
                  <Download size={ 18 }/>
                  <span className="whitespace-normal break-words">{ t("arbitration.fees.russianBtn") }</span>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default FeeRegulations;
