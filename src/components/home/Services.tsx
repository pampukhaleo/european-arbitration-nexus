
import { ArrowRight, Gavel, FileSearch, Palette, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const services = [
    {
      icon: <Gavel className="h-8 w-8 text-blue-600" />,
      title: t("services.arbitration.title"),
      description: t("services.arbitration.description"),
      link: "/arbitration",
      buttonText: t("services.arbitration.button"),
    },
    {
      icon: <FileSearch className="h-8 w-8 text-green-600" />,
      title: t("services.expertise.title"),
      description: t("services.expertise.description"),
      link: "/expertise",
      buttonText: t("services.expertise.button"),
    },
    {
      icon: <Palette className="h-8 w-8 text-purple-600" />,
      title: t("services.artExpertise.title"),
      description: t("services.artExpertise.description"),
      link: "/art-expertise",
      buttonText: t("services.artExpertise.button"),
    },
    {
      icon: <Users className="h-8 w-8 text-orange-600" />,
      title: "Art Gallery",
      description: "Discover authenticated artworks with professional analysis and expert reports from our community.",
      link: "/gallery",
      buttonText: "Explore Gallery",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {t("services.title")}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t("services.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-white rounded-full shadow-sm w-fit">
                  {service.icon}
                </div>
                <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                <CardDescription className="text-gray-600">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button
                  variant="outline"
                  className="w-full group"
                  onClick={() => navigate(service.link)}
                >
                  {service.buttonText}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
