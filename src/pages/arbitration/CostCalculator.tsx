import Layout from "@/components/Layout";
import CostCalculator from "@/components/arbitration/CostCalculator";
import { useLanguage } from "@/contexts/LanguageContext";
import {Button} from "@/components/ui/button.tsx";

const CostCalculatorPage = () => {
  const { t } = useLanguage();

  return (
    <Layout>
      <div className="py-6">
        <h1 className="text-3xl font-bold mb-6 text-eac-dark">{t("arbitration.calculator.title")}</h1>

        <div className="prose max-w-none">
          <p className="text-lg text-gray-600 mb-4">{t("arbitration.calculator.description")}</p>

          <p className="text-lg text-gray-600 mb-4">{t("arbitration.calculator.registrationFeeTitle")}</p>

          <ul className="list-disc pl-6 mb-4 text-gray-600">
            <li>{t("arbitration.calculator.registrationFee.excludingVat")}</li>
            <li>{t("arbitration.calculator.registrationFee.includingVat")}</li>
          </ul>

          <p className="text-lg text-gray-600">{t("arbitration.calculator.currencyConversion")}</p>
        </div>
        <div className="py-1 mb-5">
          <Button asChild>
            <a href={t("arbitration.calculator.exchangeRateUrl")} target="_blank" rel="noopener noreferrer">
              {t("arbitration.calculator.exchangeRateLink")}
            </a>
          </Button>
        </div>

        <CostCalculator/>

      </div>
    </Layout>
  );
};

export default CostCalculatorPage;
