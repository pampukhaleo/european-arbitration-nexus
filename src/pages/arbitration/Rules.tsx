import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Seo } from "@/components/Seo.tsx";

const Rules = () => {
  const { language, t } = useLanguage();

  return (
    <>
      <Seo title={t("seo.rules.title")} description={t("seo.rules.description")} lang={language}/>
      <Layout>
        <div className="py-6">
          <h1 className="text-3xl font-bold mb-6 text-eac-dark uppercase">{t("arbitration.rules.title")}</h1>

          <div className="prose max-w-none">
            <p className="mb-6 text-lg text-gray-600">{t("arbitration.rules.description")}</p>

            <div className="my-8">
              <p className="text-lg font-medium mb-4">{t("arbitration.rules.downloadLabel")}</p>
              <Button variant="outline" className="mb-4 border-eac-primary hover:bg-eac-primary/90 hover:!text-white rounded-full" asChild>
                <a href="#" className="flex items-center gap-2">
                  <FileText size={18} />
                  {t("arbitration.rules.englishBtn")}
                </a>
              </Button>

              <p className="text-lg font-medium mb-4 mt-8">{t("arbitration.rules.translationLabel")}</p>
              <Button variant="outline" className="border-eac-primary hover:bg-eac-primary/90 hover:!text-white rounded-full" asChild>
                <a href="#" className="flex items-center gap-2">
                  <FileText size={18} />
                  {t("arbitration.rules.russianBtn")}
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
