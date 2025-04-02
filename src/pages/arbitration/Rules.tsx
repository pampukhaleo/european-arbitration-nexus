
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

const Rules = () => {
  return (
    <Layout>
      <div className="py-6">
        <h1 className="text-3xl font-bold mb-6 text-eac-dark">Rules</h1>
        
        <div className="prose max-w-none">
          <p className="mb-6 text-lg text-gray-600">
            A new version of the ICAC Rules entered into force on November 11, 2020. This version was approved by the Council of the International non-profit association "European Arbitration Chamber". It applies to all proceedings that commenced after November 10, 2020 or will commence in the future. Of all the language versions of the ICAC Arbitration Rules, the English version is considered prevailing.
          </p>
          
          <div className="my-8">
            <p className="text-lg font-medium mb-4">You can download the ICAC Rules here:</p>
            <Button variant="outline" className="mb-4 border-eac-primary hover:bg-eac-primary/90 hover:!text-white rounded-full" asChild>
              <a href="#" className="flex items-center gap-2">
                <FileText size={18} />
                ICAC Arbitration Rules in English 2020
              </a>
            </Button>
            
            <p className="text-lg font-medium mb-4 mt-8">Translation:</p>
            <Button variant="outline" className="border-eac-primary hover:bg-eac-primary/90 hover:!text-white rounded-full" asChild>
              <a href="#" className="flex items-center gap-2">
                <FileText size={18} />
                ICAC Arbitration Rules in Russian 2020
              </a>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Rules;
