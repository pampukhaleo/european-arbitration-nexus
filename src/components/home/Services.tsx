import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Gavel, Lightbulb, Palette, BookOpen } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Services() {
  const { t } = useLanguage();

  const services = [
    {
      icon: <Gavel className="h-6 w-6 text-white" />,
      titleKey: "home.services.arbitrationTitle",
      descriptionKey: "home.services.arbitrationDesc",
      link: "/arbitration/icac",
    },
    {
      icon: <Lightbulb className="h-6 w-6 text-white" />,
      titleKey: "home.services.expertiseTitle",
      descriptionKey: "home.services.expertiseDesc",
      link: "/expertise/icje",
    },
    {
      icon: <Palette className="h-6 w-6 text-white" />,
      titleKey: "home.services.artTitle",
      descriptionKey: "home.services.artDesc",
      link: "/art-expertise/authentication",
    },
    {
      icon: <BookOpen className="h-6 w-6 text-white" />,
      titleKey: "home.services.membershipTitle",
      descriptionKey: "home.services.membershipDesc",
      link: "/membership/benefits",
    },
  ];

  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-eac-dark mb-2">
            {t("home.services.sectionTitle")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map(({ icon, titleKey, descriptionKey, link }) => (
            <Link
              key={titleKey}
              to={link}
              className="no-underline hover:no-underline"
            >
              <Card
                className="border border-gray-200 rounded-3xl overflow-hidden hover:shadow-md transition cursor-pointer"
              >
                <CardHeader className="bg-eac-light/50 pb-4">
                  <div className="w-12 h-12 bg-eac-primary rounded-full flex items-center justify-center mb-4">
                    {icon}
                  </div>
                  <CardTitle className="text-2xl text-eac-dark">{t(titleKey)}</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <CardDescription className="text-gray-600 text-base mb-6">
                    {t(descriptionKey)}
                  </CardDescription>
                  <Button
                    variant="outline"
                    className="rounded-full border-eac-primary text-eac-primary hover:bg-eac-primary hover:text-white"
                  >
                    {t("home.services.learnMore")}
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
