
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";


export default function Hero() {
  const { t } = useLanguage();
  return (
    <div className="relative bg-eac-primary">
      <div className="container mx-auto px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">
            {t('home.heroTitle')}
          </h1>
          <p className="mt-6 text-xl text-white/90">
            {t('home.heroDescription')}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button 
              asChild 
              variant="outline"
              className="border-white text-eac-primary hover:bg-eac-primary hover:text-white rounded-full"
            >
              <Link to="/eac/about">
                {t('home.heroBtn')}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
