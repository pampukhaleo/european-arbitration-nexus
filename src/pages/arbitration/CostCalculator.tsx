
import Layout from "@/components/Layout";
import CostCalculator from "@/components/arbitration/CostCalculator";

const CostCalculatorPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6 text-eac-dark">Cost Calculator</h1>
        
        <div className="prose max-w-none mb-8">
          <p className="text-lg text-gray-600 mb-4">
            Arbitration fee is paid by the parties on each received claim for consideration by the International Commercial Arbitration Court under the INA "European Arbitration Chamber" (Brussels, Belgium) (hereinafter - "the ICAC under the EAC") for the costs of the arbitration. The amount of the arbitration fee is calculated in accordance with the Provisions on arbitration costs of the ICAC under the EAC.
          </p>
          
          <p className="text-lg text-gray-600 mb-4">
            Registration fee is fixed payment, which is paid by the claimant upon filing its Request for Arbitration to the ICAC under the EAC, which amount is:
          </p>
          
          <ul className="list-disc pl-6 mb-4 text-gray-600">
            <li>1.000,00 EUR (excluding VAT)</li>
            <li>1.210,00 EUR (including 21% VAT if applicable).</li>
          </ul>
          
          <p className="text-lg text-gray-600">
            To determine the amount of Arbitration fee in each case, the amount in dispute (unless it is expressed in EUR) must be converted in to EUR currency at the exchange rate of the Belgium National Bank established on the date of filing the Request for Arbitration.
          </p>
        </div>
        
        <CostCalculator />
      </div>
    </Layout>
  );
};

export default CostCalculatorPage;
