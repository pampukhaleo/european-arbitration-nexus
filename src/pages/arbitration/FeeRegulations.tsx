import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const FeeRegulations = () => {
  const { t } = useLanguage();

  return (
    <Layout>
      <div className="py-6">
        <h1 className="text-3xl font-bold mb-6 text-eac-dark uppercase">{t("arbitration.fees.title")}</h1>

        <div className="prose max-w-none">
          <p className="mb-6 text-lg text-gray-600">{t("arbitration.fees.description")}</p>

          <div className="my-8">
            <p className="text-lg font-medium mb-4">{t("arbitration.fees.downloadLabel")}</p>
            <Button variant="outline" className="mb-4 border-eac-primary hover:!text-white hover:bg-eac-primary/90 rounded-full" asChild>
              <a href="#" className="flex items-center gap-2">
                <FileText size={18} />
                {t("arbitration.fees.englishBtn")}
              </a>
            </Button>

            <p className="text-lg font-medium mb-4 mt-8">{t("arbitration.fees.translationLabel")}</p>
            <Button variant="outline" className="border-eac-primary hover:!text-white hover:bg-eac-primary/90 rounded-full" asChild>
              <a href="#" className="flex items-center gap-2">
                <FileText size={18} />
                {t("arbitration.fees.russianBtn")}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FeeRegulations;
