
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

const FeeRegulations = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6 text-eac-dark">Fee Regulations</h1>
        
        <div className="prose max-w-none">
          <p className="mb-6 text-lg text-gray-600">
            A new version of the ICAC Provisions on Arbitration Costs entered into force on November 11, 2020. This version was approved by the Council of the International non-profit association "European Arbitration Chamber". It applies to all proceedings that commenced after November 10, 2020 or will commence in the future. Of all the language versions of the ICAC Provisions on Arbitration Costs, the English version is considered prevailing.
          </p>
          
          <div className="my-8">
            <p className="text-lg font-medium mb-4">You can download the ICAC Provisions on Arbitration Costs here:</p>
            <Button className="mb-4 bg-eac-primary hover:bg-eac-primary/90 rounded-full" asChild>
              <a href="#" className="flex items-center gap-2">
                <FileText size={18} />
                ICAC Provisions on Arbitration Costs as of 11.11.2020 in English
              </a>
            </Button>
            
            <p className="text-lg font-medium mb-4 mt-8">Translation:</p>
            <Button className="bg-eac-primary hover:bg-eac-primary/90 rounded-full" asChild>
              <a href="#" className="flex items-center gap-2">
                <FileText size={18} />
                ICAC Provisions on Arbitration Costs as of 11.11.2020 in Russian
              </a>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FeeRegulations;
