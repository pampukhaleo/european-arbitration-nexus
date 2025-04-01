
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'fr' | 'de' | 'ru';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Common
    'language.english': 'EN',
    'language.french': 'FR',
    'language.german': 'DE',
    'language.russian': 'RU',
    
    // Menu items
    'menu.eac': 'EAC',
    'menu.arbitration': 'Arbitration',
    'menu.expertise': 'Expertise',
    'menu.art-expertise': 'Art Expertise',
    'menu.training': 'Training',
    'menu.membership': 'Membership',
    'menu.contacts': 'Contacts',
    
    // Footer sections
    'footer.about': 'An international institution for commercial dispute resolution founded on the initiative of the European Union.',
    'footer.quickLinks': 'Quick Links',
    'footer.services': 'Our Services',
    'footer.contactUs': 'Contact Us',
    'footer.rights': 'All rights reserved.',
    
    // Home page
    'home.latestNews': 'Latest News',
    'home.viewAllNews': 'View All News',
    'home.readMore': 'Read More',
  },
  fr: {
    // Common
    'language.english': 'EN',
    'language.french': 'FR',
    'language.german': 'DE',
    'language.russian': 'RU',
    
    // Menu items
    'menu.eac': 'CEA',
    'menu.arbitration': 'Arbitrage',
    'menu.expertise': 'Expertise',
    'menu.art-expertise': 'Expertise en Art',
    'menu.training': 'Formation',
    'menu.membership': 'Adhésion',
    'menu.contacts': 'Contacts',
    
    // Footer sections
    'footer.about': 'Une institution internationale de résolution des litiges commerciaux fondée à l\'initiative de l\'Union européenne.',
    'footer.quickLinks': 'Liens Rapides',
    'footer.services': 'Nos Services',
    'footer.contactUs': 'Contactez-nous',
    'footer.rights': 'Tous droits réservés.',
    
    // Home page
    'home.latestNews': 'Dernières Actualités',
    'home.viewAllNews': 'Voir Toutes les Actualités',
    'home.readMore': 'Lire Plus',
  },
  de: {
    // Common
    'language.english': 'EN',
    'language.french': 'FR',
    'language.german': 'DE',
    'language.russian': 'RU',
    
    // Menu items
    'menu.eac': 'EAK',
    'menu.arbitration': 'Schiedsverfahren',
    'menu.expertise': 'Fachkenntnisse',
    'menu.art-expertise': 'Kunst-Expertise',
    'menu.training': 'Ausbildung',
    'menu.membership': 'Mitgliedschaft',
    'menu.contacts': 'Kontakte',
    
    // Footer sections
    'footer.about': 'Eine internationale Institution zur Beilegung kommerzieller Streitigkeiten, gegründet auf Initiative der Europäischen Union.',
    'footer.quickLinks': 'Schnellzugriff',
    'footer.services': 'Unsere Dienstleistungen',
    'footer.contactUs': 'Kontaktieren Sie uns',
    'footer.rights': 'Alle Rechte vorbehalten.',
    
    // Home page
    'home.latestNews': 'Neueste Nachrichten',
    'home.viewAllNews': 'Alle Nachrichten anzeigen',
    'home.readMore': 'Mehr lesen',
  },
  ru: {
    // Common
    'language.english': 'EN',
    'language.french': 'FR',
    'language.german': 'DE',
    'language.russian': 'RU',
    
    // Menu items
    'menu.eac': 'ЕАП',
    'menu.arbitration': 'Арбитраж',
    'menu.expertise': 'Экспертиза',
    'menu.art-expertise': 'Экспертиза искусства',
    'menu.training': 'Обучение',
    'menu.membership': 'Членство',
    'menu.contacts': 'Контакты',
    
    // Footer sections
    'footer.about': 'Международное учреждение по разрешению коммерческих споров, созданное по инициативе Европейского Союза.',
    'footer.quickLinks': 'Быстрые ссылки',
    'footer.services': 'Наши услуги',
    'footer.contactUs': 'Связаться с нами',
    'footer.rights': 'Все права защищены.',
    
    // Home page
    'home.latestNews': 'Последние новости',
    'home.viewAllNews': 'Просмотреть все новости',
    'home.readMore': 'Подробнее',
  },
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');
  
  const t = (key: string): string => {
    return translations[language][key] || key;
  };
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
