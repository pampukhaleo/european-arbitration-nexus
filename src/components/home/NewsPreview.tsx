
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CalendarIcon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { newsItems } from "@/data/newsData";

export default function NewsPreview() {
  const { t } = useLanguage();
  
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-eac-dark">{t('home.latestNews')}</h2>
          <Button asChild variant="ghost" className="text-eac-primary hover:text-eac-primary hover:bg-eac-light">
            <Link to="/eac/news">{t('home.viewAllNews')}</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item) => (
            <Card
              key={item.id}
              className="flex flex-col justify-between overflow-hidden border border-gray-200 rounded-2xl hover:shadow-md transition"
            >
              <CardHeader className="pb-2">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {item.date}
                </div>
                <CardTitle className="text-xl">{item.title}</CardTitle>
              </CardHeader>

              <CardContent className="flex flex-col flex-1">
                <CardDescription className="text-gray-600 mb-4">{item.excerpt}</CardDescription>

                {/* Push this button to the bottom */}
                <div className="mt-auto">
                  <Button
                    asChild
                    variant="link"
                    className="p-0 text-eac-primary hover:text-eac-primary/80"
                  >
                    <Link to={`/eac/news/${item.id}`}>{t('home.readMore')}</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
