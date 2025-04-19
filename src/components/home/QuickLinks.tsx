
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calculator, FileText, Scale } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const quickLinksData = [
  {
    icon: <Scale className="h-10 w-10 text-white mr-4" />,
    titleKey: "home.quickLinks.rulesTitle",
    descriptionKey: "home.quickLinks.rulesDescription",
    buttonKey: "home.quickLinks.rulesBtn",
    link: "/arbitration/rules",
  },
  {
    icon: <FileText className="h-10 w-10 text-white mr-4" />,
    titleKey: "home.quickLinks.clauseTitle",
    descriptionKey: "home.quickLinks.clauseDescription",
    buttonKey: "home.quickLinks.clauseBtn",
    link: "/arbitration/clause",
  },
  {
    icon: <Calculator className="h-10 w-10 text-white mr-4" />,
    titleKey: "home.quickLinks.calculatorTitle",
    descriptionKey: "home.quickLinks.calculatorDescription",
    buttonKey: "home.quickLinks.calculatorBtn",
    link: "/arbitration/calculator",
  },
];

export default function QuickLinks() {
  const { t } = useLanguage();
  
  return (
    <div className="py-12 bg-quickLinks-secondary">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          { quickLinksData.map(({ icon, titleKey, descriptionKey, buttonKey, link }) => (
            <Link
              key={ titleKey }
              to={ link }
              className="no-underline hover:no-underline"
            >
              <Card className="bg-white/10 border-none rounded-3xl overflow-hidden hover:bg-white/15 transition cursor-pointer h-full">
                <CardContent className="p-6 flex items-center h-full">
                  {/* Icon on the left, centered vertically */}
                  <div className="w-15 h-15 flex items-center justify-center mr-4">
                    { icon }
                  </div>

                  {/* Text + Button on the right */ }
                  <div className="flex flex-col justify-between items-start h-full">
                    <div>
                      <h3 className="font-semibold text-white text-lg mb-1">{t(titleKey)}</h3>
                      <p className="text-white/80 text-sm mb-3">{t(descriptionKey)}</p>
                    </div>
                    <Button variant="link" className="p-0 text-white hover:text-white/80">
                      {t(buttonKey)}
                    </Button>
                  </div>
                </CardContent>
              </Card>

            </Link>
          )) }
        </div>
      </div>
    </div>

  );
}
