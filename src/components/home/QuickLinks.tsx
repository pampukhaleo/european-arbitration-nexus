
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calculator, FileText, Scale } from "lucide-react";

export default function QuickLinks() {
  return (
    <div className="py-12 bg-quickLinks-secondary">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white/10 border-none rounded-3xl overflow-hidden hover:bg-white/15 transition">
            <CardContent className="p-6 flex items-center">
              <Scale className="h-10 w-10 text-white mr-4" />
              <div>
                <h3 className="font-semibold text-white text-lg mb-1">Arbitration Rules</h3>
                <p className="text-white/80 text-sm mb-3">Everything you need to know before starting arbitration proceedings in the ICAC</p>
                <Button asChild variant="link" className="p-0 text-white hover:text-white/80">
                  <Link to="/arbitration/rules">View Rules</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-none rounded-3xl overflow-hidden hover:bg-white/15 transition">
            <CardContent className="p-6 flex items-center">
              <FileText className="h-10 w-10 text-white mr-4" />
              <div>
                <h3 className="font-semibold text-white text-lg mb-1">Model Arbitration Clause</h3>
                <p className="text-white/80 text-sm mb-3">ICAC arbitration clause for inclusion in the contract
                  View Clause</p>
                <Button asChild variant="link" className="p-0 text-white hover:text-white/80">
                  <Link to="/arbitration/clause">View Clause</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-none rounded-3xl overflow-hidden hover:bg-white/15 transition">
            <CardContent className="p-6 flex items-center">
              <Calculator className="h-10 w-10 text-white mr-4" />
              <div>
                <h3 className="font-semibold text-white text-lg mb-1">Cost Calculator</h3>
                <p className="text-white/80 text-sm mb-3">Estimate arbitration costs based on dispute value
                  Calculate Costs</p>
                <Button asChild variant="link" className="p-0 text-white hover:text-white/80">
                  <Link to="/arbitration/calculator">Calculate Costs</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
