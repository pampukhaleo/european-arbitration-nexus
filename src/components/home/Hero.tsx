import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";

export default function Hero() {
  const { t } = useLanguage();
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative">
      {/* Image background with overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <picture>
          <source srcSet="/images/IMG_3070.webp" type="image/webp" />
          <img
            src="/images/IMG_3070.JPG"
            alt="European Arbitration Chamber headquarters building"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            onLoad={() => setLoaded(true)}
            className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-1000 ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
          />
        </picture>
        <div className="absolute inset-0 bg-black/60 z-10" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 py-32 sm:px-6 lg:px-8 lg:py-48 z-20">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">
            {t("home.heroTitle")}
          </h1>
          <p className="mt-6 text-xl text-white">
            {t("home.heroDescription")}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button
              asChild
              variant="outline"
              className="border-white text-eac-primary rounded-full hover:bg-eac-primary hover:text-white"
            >
              <Link to="/eac/about">{t("home.heroBtn")}</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
