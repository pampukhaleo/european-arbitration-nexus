import Layout from "@/components/Layout";
import CostCalculator from "@/components/arbitration/CostCalculator";
import { useLanguage } from "@/contexts/LanguageContext";
import {Link} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";

const CostCalculatorPage = () => {
  const { t } = useLanguage();

  return (
    <Layout>
      <div className="py-6">
        <h1 className="text-3xl font-bold mb-6 text-eac-dark">{t("arbitration.calculator.title")}</h1>

        <div className="prose max-w-none mb-8">
          <p className="text-lg text-gray-600 mb-4">{t("arbitration.calculator.description")}</p>

          <p className="text-lg text-gray-600 mb-4">{t("arbitration.calculator.registrationFeeTitle")}</p>

          <ul className="list-disc pl-6 mb-4 text-gray-600">
            <li>{t("arbitration.calculator.registrationFee.excludingVat")}</li>
            <li>{t("arbitration.calculator.registrationFee.includingVat")}</li>
          </ul>

          <p className="text-lg text-gray-600">{t("arbitration.calculator.currencyConversion")}</p>
        </div>

        <CostCalculator />

        <div className="py-6">
          {/*<p className="text-lg text-gray-600">*/}
          {/*  {t("arbitration.calculator.exchangeRateLink")}*/}
          {/*  <a href={t("arbitration.calculator.exchangeRateUrl")}><b>{t("arbitration.calculator.exchangeRateUrl")}</b></a>*/}
          {/*</p>*/}
          <Button href={t("arbitration.calculator.exchangeRateUrl")} target="_blank">
            Go to Website
          </Button>
          {/*<a href={t("arbitration.calculator.exchangeRateUrl")}><b>{t("arbitration.calculator.exchangeRateUrl")}</b></a>*/}
        </div>
      </div>
    </Layout>
  );
};

export default CostCalculatorPage;
