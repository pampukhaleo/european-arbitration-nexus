
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'fr' | 'ru';

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
    'language.russian': 'RU',
    
    // Menu items
    'menu.eac': 'EAC',
    'menu.about': 'About Us',
    'menu.council': 'EAC Council',
    'menu.news': 'News',
    'menu.events': 'Event Calendar',
    'menu.arbitration': 'Arbitration',
    'menu.icac': 'About the ICAC under the EAC',
    'menu.rules': 'ICAC Rules',
    'menu.fees': 'ICAC Provisions on Arbitration Costs',
    'menu.calculator': 'Cost Calculator',
    'menu.clause': 'Arbitration Clause',
    'menu.arbitrators': 'List of Arbitrators',
    'menu.resources': 'Legal Resources',
    'menu.expertise': 'Expertise',
    'menu.icje': 'About ICJE at EAC',
    'menu.expertiseFields': 'Fields of Expertise',
    'menu.art-expertise': 'Art expertise',
    'menu.authentication': 'Art Authentication',
    'menu.appraisal': 'Art Appraisal',
    'menu.passport': 'Art Passport',
    'menu.register': 'International Register of Artworks',
    'menu.training': 'Training',
    'menu.qualification': 'Qualification Course for Arbitrators',
    'menu.membership': 'Membership',
    'menu.join': 'Join',
    'menu.benefits': 'Membership Benefits',
    'menu.apply': 'Application Form',
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
    'language.russian': 'RU',
    
    // Menu items
    'menu.eac': 'CEA',
    'menu.about': 'À Propos',
    'menu.council': 'Conseil de la CEA',
    'menu.news': 'Actualités',
    'menu.events': 'Calendrier des Événements',
    'menu.arbitration': 'Arbitrage',
    'menu.icac': 'CIAC à la CEA',
    'menu.rules': 'Règlement',
    'menu.fees': 'Règlement des Frais',
    'menu.calculator': 'Calculateur de Coûts',
    'menu.clause': 'Clause d\'Arbitrage',
    'menu.arbitrators': 'Liste des Arbitres',
    'menu.resources': 'Ressources Juridiques',
    'menu.expertise': 'Expertise',
    'menu.icse': 'À Propos du CISE à la CEA',
    'menu.services': 'expertise',
    'menu.art-expertise': 'expertise en Art',
    'menu.authentication': 'Authentification',
    'menu.valuation': 'Évaluation',
    'menu.passport': 'Passeport d\'Art',
    'menu.register': 'Registre International des Œuvres d\'Art',
    'menu.training': 'Formation',
    'menu.qualification': 'Cours de Qualification pour Arbitres',
    'menu.membership': 'Adhésion',
    'menu.join': 'Adhérer',
    'menu.benefits': 'Avantages de l\'Adhésion',
    'menu.apply': 'Formulaire de Demande',
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
  ru: {
    // Common
    'language.english': 'EN',
    'language.french': 'FR',
    'language.russian': 'RU',
    
    // Menu items
    'menu.eac': 'ЕАП',
    'menu.about': 'О Нас',
    'menu.council': 'Совет ЕАП',
    'menu.news': 'Новости',
    'menu.events': 'Календарь мероприятий',
    'menu.arbitration': 'Арбитраж',
    'menu.icac': 'МКАС при ЕАП',
    'menu.rules': 'Правила',
    'menu.fees': 'Положение о сборах',
    'menu.calculator': 'Калькулятор стоимости',
    'menu.clause': 'Арбитражная оговорка',
    'menu.arbitrators': 'Список арбитров',
    'menu.resources': 'Правовые ресурсы',
    'menu.expertise': 'Экспертиза',
    'menu.icse': 'О МКСЭ при ЕАП',
    'menu.services': 'Экспертиза',
    'menu.art-expertise': 'Экспертиза искусства',
    'menu.authentication': 'Аутентификация',
    'menu.valuation': 'Оценка',
    'menu.passport': 'Арт-паспорт',
    'menu.register': 'Международный реестр художественных работ',
    'menu.training': 'Обучение',
    'menu.qualification': 'Квалификационный курс для арбитров',
    'menu.membership': 'Членство',
    'menu.join': 'Вступить',
    'menu.benefits': 'Преимущества членства',
    'menu.apply': 'Форма заявки',
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
