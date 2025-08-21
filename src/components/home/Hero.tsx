
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Scale, Users, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from '@/contexts/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();
  
  return (
    <section className="relative bg-gradient-to-br from-eac-primary to-eac-secondary text-white overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative container mx-auto px-4 py-24 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            {t('home.hero.title')}
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-white/90 leading-relaxed">
            {t('home.hero.subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Button asChild size="lg" className="bg-white text-eac-primary hover:bg-gray-100 text-lg px-8 py-4">
              <Link to="/arbitration/icac">
                {t('home.hero.cta.arbitration')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-eac-primary text-lg px-8 py-4">
              <Link to="/expertise/icje">
                {t('home.hero.cta.expertise')}
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-full p-4 mb-4">
                <Scale className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('home.hero.features.arbitration.title')}</h3>
              <p className="text-white/80">{t('home.hero.features.arbitration.description')}</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-full p-4 mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('home.hero.features.expertise.title')}</h3>
              <p className="text-white/80">{t('home.hero.features.expertise.description')}</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-full p-4 mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('home.hero.features.community.title')}</h3>
              <p className="text-white/80">{t('home.hero.features.community.description')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
