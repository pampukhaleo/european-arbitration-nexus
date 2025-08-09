
import { useLanguage } from "@/contexts/LanguageContext";

export interface NavItem {
  title: string;
  translationKey: string;
  href: string;
  children?: NavChild[];
}

export interface NavChild {
  title: string;
  translationKey: string;
  href: string;
}

export const useNavItems = () => {
  const { t } = useLanguage();

  return [
    {
      title: t("nav.eac"),
      translationKey: "nav.eac",
      href: "/eac",
      children: [
        { title: t("nav.about"), translationKey: "nav.about", href: "/eac/about" },
        { title: t("nav.council"), translationKey: "nav.council", href: "/eac/council" },
        { title: t("nav.news"), translationKey: "nav.news", href: "/eac/news" },
        { title: t("nav.events"), translationKey: "nav.events", href: "/eac/events" },
      ],
    },
    {
      title: t("nav.arbitration"),
      translationKey: "nav.arbitration",
      href: "/arbitration",
      children: [
        { title: t("nav.icac"), translationKey: "nav.icac", href: "/arbitration/icac" },
        { title: t("nav.rules"), translationKey: "nav.rules", href: "/arbitration/rules" },
        { title: t("nav.fees"), translationKey: "nav.fees", href: "/arbitration/fees" },
        { title: t("nav.calculator"), translationKey: "nav.calculator", href: "/arbitration/calculator" },
        { title: t("nav.clause"), translationKey: "nav.clause", href: "/arbitration/clause" },
        { title: t("nav.arbitrators"), translationKey: "nav.arbitrators", href: "/arbitration/arbitrators" },
        { title: t("nav.resources"), translationKey: "nav.resources", href: "/arbitration/resources" },
      ],
    },
    {
      title: t("nav.expertise"),
      translationKey: "nav.expertise",
      href: "/expertise",
      children: [
        { title: t("nav.icje"), translationKey: "nav.icje", href: "/expertise/icje" },
        { title: t("nav.expertiseFields"), translationKey: "nav.expertiseFields", href: "/expertise/expertiseFields" },
      ],
    },
    {
      title: t("nav.artExpertise"),
      translationKey: "nav.artExpertise",
      href: "/art-expertise",
      children: [
        { title: t("nav.authentication"), translationKey: "nav.authentication", href: "/art-expertise/authentication" },
        { title: t("nav.appraisal"), translationKey: "nav.appraisal", href: "/art-expertise/appraisal" },
        { title: t("nav.passport"), translationKey: "nav.passport", href: "/art-expertise/passport" },
      ],
    },
    {
      title: t("nav.training"),
      translationKey: "nav.training",
      href: "/training",
      children: [
        { title: t("nav.courses"), translationKey: "nav.courses", href: "/training/courses" },
        { title: t("nav.workshops"), translationKey: "nav.workshops", href: "/training/workshops" },
      ],
    },
    {
      title: t("nav.membership"),
      translationKey: "nav.membership",
      href: "/membership",
      children: [
        { title: t("nav.benefits"), translationKey: "nav.benefits", href: "/membership/benefits" },
        { title: t("nav.join"), translationKey: "nav.join", href: "/membership/join" },
        { title: t("nav.conductCode"), translationKey: "nav.conductCode", href: "/membership/conductCode" },
      ],
    },
    {
      title: t("gallery.title"),
      translationKey: "gallery.title",
      href: "/gallery",
    },
    {
      title: t("nav.contacts"),
      translationKey: "nav.contacts",
      href: "/contacts",
    },
  ];
};

export const navItems: NavItem[] = [
  {
    title: "EAC",
    translationKey: "nav.eac",
    href: "/eac",
    children: [
      { title: "About", translationKey: "nav.about", href: "/eac/about" },
      { title: "Council", translationKey: "nav.council", href: "/eac/council" },
      { title: "News", translationKey: "nav.news", href: "/eac/news" },
      { title: "Events", translationKey: "nav.events", href: "/eac/events" },
    ],
  },
  {
    title: "Arbitration",
    translationKey: "nav.arbitration",
    href: "/arbitration",
    children: [
      { title: "ICAC", translationKey: "nav.icac", href: "/arbitration/icac" },
      { title: "Rules", translationKey: "nav.rules", href: "/arbitration/rules" },
      { title: "Fees", translationKey: "nav.fees", href: "/arbitration/fees" },
      { title: "Calculator", translationKey: "nav.calculator", href: "/arbitration/calculator" },
      { title: "Clause", translationKey: "nav.clause", href: "/arbitration/clause" },
      { title: "Arbitrators", translationKey: "nav.arbitrators", href: "/arbitration/arbitrators" },
      { title: "Resources", translationKey: "nav.resources", href: "/arbitration/resources" },
    ],
  },
  {
    title: "Expertise",
    translationKey: "nav.expertise",
    href: "/expertise",
    children: [
      { title: "ICJE", translationKey: "nav.icje", href: "/expertise/icje" },
      { title: "Expertise Fields", translationKey: "nav.expertiseFields", href: "/expertise/expertiseFields" },
    ],
  },
  {
    title: "Art Expertise",
    translationKey: "nav.artExpertise",
    href: "/art-expertise",
    children: [
      { title: "Authentication", translationKey: "nav.authentication", href: "/art-expertise/authentication" },
      { title: "Appraisal", translationKey: "nav.appraisal", href: "/art-expertise/appraisal" },
      { title: "Passport", translationKey: "nav.passport", href: "/art-expertise/passport" },
    ],
  },
  {
    title: "Training",
    translationKey: "nav.training",
    href: "/training",
    children: [
      { title: "Courses", translationKey: "nav.courses", href: "/training/courses" },
      { title: "Workshops", translationKey: "nav.workshops", href: "/training/workshops" },
    ],
  },
  {
    title: "Membership",
    translationKey: "nav.membership",
    href: "/membership",
    children: [
      { title: "Benefits", translationKey: "nav.benefits", href: "/membership/benefits" },
      { title: "Join", translationKey: "nav.join", href: "/membership/join" },
      { title: "Conduct Code", translationKey: "nav.conductCode", href: "/membership/conductCode" },
    ],
  },
  {
    title: "Gallery",
    translationKey: "gallery.title",
    href: "/gallery",
  },
  {
    title: "Contacts",
    translationKey: "nav.contacts",
    href: "/contacts",
  },
];
