
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Scale, Users, Award, FileText, Palette } from "lucide-react";

const QuickLinks = () => {
  const { t } = useLanguage();

  const links = [
    {
      icon: Scale,
      title: t("quickLinks.arbitration.title"),
      description: t("quickLinks.arbitration.description"),
      href: "/arbitration/icac",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: Award,
      title: t("quickLinks.expertise.title"),
      description: t("quickLinks.expertise.description"),
      href: "/expertise/icje",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: Palette,
      title: t("quickLinks.gallery.title"),
      description: t("quickLinks.gallery.description"),
      href: "/gallery",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      icon: Users,
      title: t("quickLinks.membership.title"),
      description: t("quickLinks.membership.description"),
      href: "/membership/benefits",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      icon: FileText,
      title: t("quickLinks.news.title"),
      description: t("quickLinks.news.description"),
      href: "/eac/news",
      color: "text-gray-600",
      bgColor: "bg-gray-50",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {t("quickLinks.title")}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t("quickLinks.subtitle")}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {links.map((link, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
              <CardHeader className="pb-4">
                <div className={`w-12 h-12 rounded-lg ${link.bgColor} flex items-center justify-center mb-4`}>
                  <link.icon className={`h-6 w-6 ${link.color}`} />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  {link.title}
                </CardTitle>
                <CardDescription className="text-gray-600">
                  {link.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Link to={link.href}>
                  <Button variant="outline" className="w-full">
                    {t("quickLinks.learnMore")}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickLinks;
