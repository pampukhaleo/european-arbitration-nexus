
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLanguage } from "@/contexts/LanguageContext";

const FormSchema = z.object({
  disputeAmount: z.coerce.number().min(1, "Amount must be greater than 0"),
  arbitrators: z.enum(["1", "3"])
});

type FormValues = z.infer<typeof FormSchema>;

export default function CostCalculator() {
  const { t } = useLanguage();
  const [calculationResult, setCalculationResult] = useState<{
    baseAmount: number;
    vatAmount: number;
    totalAmount: number;
  } | null>(null);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      disputeAmount: 0,
      arbitrators: "3"
    }
  });

  const calculateArbitrationFee = (amount: number, arbitrators: string): number => {
    let fee = 0;
    
    if (amount <= 20000) {
      fee = 3000;
    } else if (amount <= 50000) {
      fee = 4500;
    } else if (amount <= 100000) {
      fee = 6500;
    } else if (amount <= 250000) {
      fee = 3200 + (amount * 0.04);
    } else if (amount <= 500000) {
      fee = 7000 + (amount * 0.03);
    } else if (amount <= 1000000) {
      fee = 11500 + (amount * 0.02);
    } else if (amount <= 3000000) {
      fee = 14500 + (amount * 0.01);
    } else if (amount <= 5000000) {
      fee = 17750 + (amount * 0.007);
    } else if (amount <= 10000000) {
      fee = 27500 + (amount * 0.00525);
    } else if (amount <= 50000000) {
      fee = 47500 + (amount * 0.002);
    } else {
      fee = 101500 + (amount * 0.001);
    }
    
    // Apply 20% discount for single arbitrator
    if (arbitrators === "1") {
      fee = fee * 0.8;
    }
    
    return fee;
  };

  const onSubmit = (data: FormValues) => {
    const baseAmount = calculateArbitrationFee(data.disputeAmount, data.arbitrators);
    const vatAmount = baseAmount * 0.21; // 21% VAT
    const totalAmount = baseAmount + vatAmount;
    
    setCalculationResult({
      baseAmount,
      vatAmount,
      totalAmount
    });
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <FormField
                control={form.control}
                name="disputeAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="dispute-amount" className="text-sm font-medium text-gray-700">
                      {t("arbitration.calculator.amount")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="dispute-amount"
                        type="number"
                        min="0"
                        className="w-full"
                        {...field}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            
            <div className="flex items-end">
              <Button 
                type="submit"
                className="w-full bg-eac-primary hover:bg-eac-primary/90 rounded-full"
              >
                {t("arbitration.calculator.submitBtn")}
              </Button>
            </div>
          </div>
          
          <FormField
            control={form.control}
            name="arbitrators"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>{t("arbitration.calculator.composition")}</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1 sm:flex-row sm:space-x-4 sm:space-y-0"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1" id="r1" />
                      <Label htmlFor="r1">{t("arbitration.calculator.oneArbitrator")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="3" id="r3" />
                      <Label htmlFor="r3">{t("arbitration.calculator.threeArbitrators")}</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>

      {calculationResult && (
        <Card className="border-eac-primary">
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">{t("arbitration.calculator.costs")}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500">{t("arbitration.calculator.fee")}</p>
                <p className="font-medium">€{calculationResult.baseAmount.toFixed(2)} {t("arbitration.calculator.exclVAT")}</p>
                <p className="text-sm text-gray-500 mt-3">{t("arbitration.calculator.vat")}</p>
                <p className="font-medium">€{calculationResult.vatAmount.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">{t("arbitration.calculator.total")}</p>
                <p className="font-medium text-lg text-eac-primary">€{calculationResult.totalAmount.toFixed(2)} {t("arbitration.calculator.inclVAT")}</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-500">
              {t("arbitration.calculator.estimate")}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
