
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function CostCalculator() {
  const [disputeAmount, setDisputeAmount] = useState<number>(0);
  const [calculatedFee, setCalculatedFee] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const calculateArbitrationFee = (amount: number): number => {
    // This is a simplified example of fee calculation
    // Replace with actual calculation based on real fee schedule
    if (amount <= 50000) {
      return 2500;
    } else if (amount <= 100000) {
      return 2500 + (amount - 50000) * 0.03;
    } else if (amount <= 500000) {
      return 4000 + (amount - 100000) * 0.02;
    } else if (amount <= 1000000) {
      return 12000 + (amount - 500000) * 0.01;
    } else {
      return 17000 + (amount - 1000000) * 0.005;
    }
  };

  const handleCalculate = () => {
    if (disputeAmount > 0) {
      const fee = calculateArbitrationFee(disputeAmount);
      setCalculatedFee(fee);
      setShowResult(true);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <label htmlFor="dispute-amount" className="block text-sm font-medium text-gray-700 mb-1">
            Amount in dispute (EUR)
          </label>
          <Input
            id="dispute-amount"
            type="number"
            min="0"
            value={disputeAmount || ""}
            onChange={(e) => setDisputeAmount(Number(e.target.value))}
            className="w-full"
          />
        </div>
        <div className="flex items-end">
          <Button 
            onClick={handleCalculate} 
            className="w-full bg-eac-primary hover:bg-eac-primary/90 rounded-full"
          >
            Calculate
          </Button>
        </div>
      </div>

      {showResult && (
        <Card className="border-eac-primary">
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Estimated arbitration costs:</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Registration fee:</p>
                <p className="font-medium">€1,000.00 (excl. VAT)</p>
                <p className="font-medium">€1,210.00 (incl. 21% VAT if applicable)</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Arbitration fee:</p>
                <p className="font-medium">€{calculatedFee?.toFixed(2)}</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-500">
              * This is an estimate. The final fee may vary based on specific case details.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
