// Per-route SEO metadata (title / description / h1) for the localised pages.
// Keys are paths WITHOUT the language prefix:
//   ""              for /<lang>
//   "/eac/about"    for /<lang>/eac/about
//
// Used by <RouteSeo> in <Layout> as a per-route default. Pages that need
// dynamic metadata (news detail, gallery item, etc.) render their own <Seo>
// on top, which overrides the title/description.

type Lang = "en" | "fr" | "ru";
type Localized = Record<Lang, string>;

interface RouteMeta {
  title: Localized;
  description: Localized;
  h1: Localized;
}

const t = (en: string, fr: string, ru: string): Localized => ({ en, fr, ru });

const fallbackDescription: Localized = t(
  "The European Arbitration Chamber (EAC) is an international non-profit association founded in Belgium in 2008 by professionals in commercial arbitration and mediation.",
  "La Chambre d'Arbitrage Européenne (EAC) est une association internationale à but non lucratif fondée en Belgique en 2008 par des professionnels de l'arbitrage commercial et de la médiation.",
  "Европейская арбитражная палата (EAC) — международная некоммерческая ассоциация, основанная в Бельгии в 2008 году профессионалами коммерческого арбитража и медиации."
);

export const ROUTE_META: Record<string, RouteMeta> = {
  "": {
    title: t(
      "European Arbitration Chamber (EAC) | Resolving Disputes",
      "Chambre d'Arbitrage Européenne (EAC) | Résolution des litiges",
      "Европейская арбитражная палата (EAC) | Разрешение споров"
    ),
    description: fallbackDescription,
    h1: t(
      "European Arbitration Chamber (EAC) — Resolving Disputes, Advancing Arbitration",
      "Chambre d'Arbitrage Européenne (EAC) — Résolution des litiges, promotion de l'arbitrage",
      "Европейская арбитражная палата (EAC) — Разрешение споров, развитие арбитража"
    ),
  },

  "/eac/about": {
    title: t(
      "About EAC | European Arbitration Chamber",
      "À propos de l'EAC | Chambre d'Arbitrage Européenne",
      "О EAC | Европейская арбитражная палата"
    ),
    description: t(
      "Learn about the European Arbitration Chamber: history, mission, governance and international activities since 2008.",
      "Découvrez la Chambre d'Arbitrage Européenne : historique, mission, gouvernance et activités internationales depuis 2008.",
      "Узнайте о Европейской арбитражной палате: история, миссия, управление и международная деятельность с 2008 года."
    ),
    h1: t("About the European Arbitration Chamber", "À propos de la Chambre d'Arbitrage Européenne", "О Европейской арбитражной палате"),
  },
  "/eac/news": {
    title: t(
      "News & Events | European Arbitration Chamber",
      "Actualités et Événements | Chambre d'Arbitrage Européenne",
      "Новости и события | Европейская арбитражная палата"
    ),
    description: t(
      "Latest news, announcements and events of the European Arbitration Chamber.",
      "Dernières actualités, annonces et événements de la Chambre d'Arbitrage Européenne.",
      "Последние новости, объявления и события Европейской арбитражной палаты."
    ),
    h1: t("News & Events", "Actualités et Événements", "Новости и события"),
  },

  "/arbitration/icac": {
    title: t(
      "International Court of Arbitration (ICAC) | EAC",
      "Cour Internationale d'Arbitrage Commercial (ICAC) | EAC",
      "Международный коммерческий арбитражный суд (ICAC) | EAC"
    ),
    description: t(
      "The International Court of Arbitration for Commercial Disputes (ICAC) of the European Arbitration Chamber.",
      "La Cour Internationale d'Arbitrage Commercial (ICAC) de la Chambre d'Arbitrage Européenne.",
      "Международный коммерческий арбитражный суд (ICAC) Европейской арбитражной палаты."
    ),
    h1: t("ICAC", "ICAC", "ICAC"),
  },
  "/arbitration/rules": {
    title: t(
      "Arbitration Rules | European Arbitration Chamber",
      "Règlement d'Arbitrage | Chambre d'Arbitrage Européenne",
      "Регламент арбитража | Европейская арбитражная палата"
    ),
    description: t(
      "Official arbitration rules of the European Arbitration Chamber's ICAC.",
      "Règlement officiel d'arbitrage de l'ICAC de la Chambre d'Arbitrage Européenne.",
      "Официальный регламент арбитража ICAC Европейской арбитражной палаты."
    ),
    h1: t("Arbitration Rules", "Règlement d'Arbitrage", "Регламент арбитража"),
  },
  "/arbitration/fees": {
    title: t(
      "Fee Regulations | European Arbitration Chamber",
      "Règlement des Frais | Chambre d'Arbitrage Européenne",
      "Регламент сборов | Европейская арбитражная палата"
    ),
    description: t(
      "Schedule of arbitration fees and cost regulations of the EAC's ICAC.",
      "Barème des frais d'arbitrage et règlement des coûts de l'ICAC de l'EAC.",
      "Шкала арбитражных сборов и регламент расходов ICAC EAC."
    ),
    h1: t("Fee Regulations", "Règlement des Frais", "Регламент сборов"),
  },
  "/arbitration/calculator": {
    title: t(
      "Arbitration Cost Calculator | EAC",
      "Calculateur des Frais d'Arbitrage | EAC",
      "Калькулятор арбитражных расходов | EAC"
    ),
    description: t(
      "Estimate the cost of arbitration proceedings under the EAC's ICAC fee regulations.",
      "Estimez le coût d'une procédure d'arbitrage selon le règlement des frais de l'ICAC de l'EAC.",
      "Оцените стоимость арбитражного разбирательства согласно регламенту сборов ICAC EAC."
    ),
    h1: t("Arbitration Cost Calculator", "Calculateur des Frais d'Arbitrage", "Калькулятор арбитражных расходов"),
  },
  "/arbitration/clause": {
    title: t(
      "Model Arbitration Clause | EAC",
      "Clause d'Arbitrage Type | EAC",
      "Типовая арбитражная оговорка | EAC"
    ),
    description: t(
      "Recommended model arbitration clause for inclusion in commercial contracts.",
      "Clause d'arbitrage type recommandée pour insertion dans les contrats commerciaux.",
      "Рекомендованная типовая арбитражная оговорка для коммерческих договоров."
    ),
    h1: t("Model Arbitration Clause", "Clause d'Arbitrage Type", "Типовая арбитражная оговорка"),
  },

  "/expertise/icje": {
    title: t(
      "ICJE — Independent Council of Judicial Experts | EAC",
      "ICJE — Conseil Indépendant des Experts Judiciaires | EAC",
      "ICJE — Независимый совет судебных экспертов | EAC"
    ),
    description: t(
      "Independent Council of Judicial Experts (ICJE) of the European Arbitration Chamber.",
      "Conseil Indépendant des Experts Judiciaires (ICJE) de la Chambre d'Arbitrage Européenne.",
      "Независимый совет судебных экспертов (ICJE) Европейской арбитражной палаты."
    ),
    h1: t("ICJE", "ICJE", "ICJE"),
  },
  "/expertise/expertiseFields": {
    title: t(
      "Fields of Expertise | EAC",
      "Domaines d'Expertise | EAC",
      "Области экспертизы | EAC"
    ),
    description: t(
      "Fields of judicial expertise covered by the EAC's ICJE.",
      "Domaines d'expertise judiciaire couverts par l'ICJE de l'EAC.",
      "Области судебной экспертизы, охватываемые ICJE EAC."
    ),
    h1: t("Fields of Expertise", "Domaines d'Expertise", "Области экспертизы"),
  },

  "/art-expertise/authentication": {
    title: t(
      "Art Authentication | EAC",
      "Authentification d'Œuvres d'Art | EAC",
      "Аутентификация произведений искусства | EAC"
    ),
    description: t(
      "Independent art authentication services by the European Arbitration Chamber's experts.",
      "Services indépendants d'authentification d'œuvres d'art par les experts de la Chambre d'Arbitrage Européenne.",
      "Независимая аутентификация произведений искусства экспертами Европейской арбитражной палаты."
    ),
    h1: t("Art Authentication", "Authentification d'Œuvres d'Art", "Аутентификация произведений искусства"),
  },
  "/art-expertise/appraisal": {
    title: t(
      "Art Appraisal | EAC",
      "Estimation d'Œuvres d'Art | EAC",
      "Оценка произведений искусства | EAC"
    ),
    description: t(
      "Professional art appraisal and valuation services.",
      "Services professionnels d'estimation et d'évaluation d'œuvres d'art.",
      "Профессиональная оценка и экспертиза произведений искусства."
    ),
    h1: t("Art Appraisal", "Estimation d'Œuvres d'Art", "Оценка произведений искусства"),
  },
  "/art-expertise/passport": {
    title: t(
      "Art Passport | EAC",
      "Passeport d'Œuvre d'Art | EAC",
      "Паспорт произведения искусства | EAC"
    ),
    description: t(
      "Issuance of internationally recognised art passports for authenticated artworks.",
      "Délivrance de passeports d'œuvres d'art internationalement reconnus pour les œuvres authentifiées.",
      "Выпуск международно признанных паспортов для аутентифицированных произведений искусства."
    ),
    h1: t("Art Passport", "Passeport d'Œuvre d'Art", "Паспорт произведения искусства"),
  },

  "/gallery": {
    title: t(
      "Art Gallery | European Arbitration Chamber",
      "Galerie d'Art | Chambre d'Arbitrage Européenne",
      "Галерея | Европейская арбитражная палата"
    ),
    description: t(
      "Authenticated art collection of the European Arbitration Chamber.",
      "Collection d'art authentifiée de la Chambre d'Arbitrage Européenne.",
      "Аутентифицированная коллекция произведений искусства Европейской арбитражной палаты."
    ),
    h1: t("Art Gallery", "Galerie d'Art", "Галерея"),
  },

  "/membership/benefits": {
    title: t(
      "Membership Benefits | EAC",
      "Avantages d'Adhésion | EAC",
      "Преимущества членства | EAC"
    ),
    description: t(
      "Benefits of becoming a member of the European Arbitration Chamber.",
      "Avantages de devenir membre de la Chambre d'Arbitrage Européenne.",
      "Преимущества членства в Европейской арбитражной палате."
    ),
    h1: t("Membership Benefits", "Avantages d'Adhésion", "Преимущества членства"),
  },
  "/membership/join": {
    title: t(
      "How to Join | European Arbitration Chamber",
      "Comment Adhérer | Chambre d'Arbitrage Européenne",
      "Как вступить | Европейская арбитражная палата"
    ),
    description: t(
      "Application procedure to join the European Arbitration Chamber.",
      "Procédure de candidature pour adhérer à la Chambre d'Arbitrage Européenne.",
      "Порядок вступления в Европейскую арбитражную палату."
    ),
    h1: t("How to Join", "Comment Adhérer", "Как вступить"),
  },
  "/membership/conductCode": {
    title: t(
      "Code of Conduct | EAC",
      "Code de Conduite | EAC",
      "Кодекс поведения | EAC"
    ),
    description: t(
      "Code of conduct for members of the European Arbitration Chamber.",
      "Code de conduite des membres de la Chambre d'Arbitrage Européenne.",
      "Кодекс поведения членов Европейской арбитражной палаты."
    ),
    h1: t("Code of Conduct", "Code de Conduite", "Кодекс поведения"),
  },

  "/contacts": {
    title: t(
      "Contacts | European Arbitration Chamber",
      "Contacts | Chambre d'Arbitrage Européenne",
      "Контакты | Европейская арбитражная палата"
    ),
    description: t(
      "Contact the European Arbitration Chamber: addresses, phone numbers and online form.",
      "Contactez la Chambre d'Arbitrage Européenne : adresses, téléphones et formulaire en ligne.",
      "Свяжитесь с Европейской арбитражной палатой: адреса, телефоны и онлайн-форма."
    ),
    h1: t("Contacts", "Contacts", "Контакты"),
  },

  "/privacy-policy": {
    title: t("Privacy Policy | EAC", "Politique de Confidentialité | EAC", "Политика конфиденциальности | EAC"),
    description: t(
      "Privacy policy of the European Arbitration Chamber's website.",
      "Politique de confidentialité du site de la Chambre d'Arbitrage Européenne.",
      "Политика конфиденциальности сайта Европейской арбитражной палаты."
    ),
    h1: t("Privacy Policy", "Politique de Confidentialité", "Политика конфиденциальности"),
  },
  "/cookies-policy": {
    title: t("Cookies Policy | EAC", "Politique des Cookies | EAC", "Политика cookies | EAC"),
    description: t(
      "Cookies policy of the European Arbitration Chamber's website.",
      "Politique des cookies du site de la Chambre d'Arbitrage Européenne.",
      "Политика использования cookies на сайте Европейской арбитражной палаты."
    ),
    h1: t("Cookies Policy", "Politique des Cookies", "Политика cookies"),
  },
  "/terms-of-service": {
    title: t("Terms of Service | EAC", "Conditions d'Utilisation | EAC", "Условия использования | EAC"),
    description: t(
      "Terms of service of the European Arbitration Chamber's website.",
      "Conditions d'utilisation du site de la Chambre d'Arbitrage Européenne.",
      "Условия использования сайта Европейской арбитражной палаты."
    ),
    h1: t("Terms of Service", "Conditions d'Utilisation", "Условия использования"),
  },
};

export function getRouteMeta(pathWithoutLang: string): RouteMeta {
  if (ROUTE_META[pathWithoutLang]) return ROUTE_META[pathWithoutLang];
  if (/^\/eac\/news\/[^/]+$/.test(pathWithoutLang)) {
    return {
      title: t(
        "News | European Arbitration Chamber",
        "Actualité | Chambre d'Arbitrage Européenne",
        "Новость | Европейская арбитражная палата"
      ),
      description: ROUTE_META["/eac/news"].description,
      h1: t("News", "Actualité", "Новость"),
    };
  }
  if (/^\/gallery\/[^/]+/.test(pathWithoutLang)) {
    return ROUTE_META["/gallery"];
  }
  return ROUTE_META[""];
}
