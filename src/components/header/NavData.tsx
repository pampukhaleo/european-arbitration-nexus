
import { useLanguage } from "@/contexts/LanguageContext";

export const useNavItems = () => {
  const { t } = useLanguage();

  return [
    {
      title: t("nav.eac"),
      items: [
        { title: t("nav.about"), href: "/eac/about" },
        { title: t("nav.council"), href: "/eac/council" },
        { title: t("nav.news"), href: "/eac/news" },
        { title: t("nav.events"), href: "/eac/events" },
      ],
    },
    {
      title: t("nav.arbitration"),
      items: [
        { title: t("nav.icac"), href: "/arbitration/icac" },
        { title: t("nav.rules"), href: "/arbitration/rules" },
        { title: t("nav.fees"), href: "/arbitration/fees" },
        { title: t("nav.calculator"), href: "/arbitration/calculator" },
        { title: t("nav.clause"), href: "/arbitration/clause" },
        { title: t("nav.arbitrators"), href: "/arbitration/arbitrators" },
        { title: t("nav.resources"), href: "/arbitration/resources" },
      ],
    },
    {
      title: t("nav.expertise"),
      items: [
        { title: t("nav.icje"), href: "/expertise/icje" },
        { title: t("nav.expertiseFields"), href: "/expertise/expertiseFields" },
      ],
    },
    {
      title: t("nav.artExpertise"),
      items: [
        { title: t("nav.authentication"), href: "/art-expertise/authentication" },
        { title: t("nav.appraisal"), href: "/art-expertise/appraisal" },
        { title: t("nav.passport"), href: "/art-expertise/passport" },
      ],
    },
    {
      title: t("nav.training"),
      items: [
        { title: t("nav.courses"), href: "/training/courses" },
        { title: t("nav.workshops"), href: "/training/workshops" },
      ],
    },
    {
      title: t("nav.membership"),
      items: [
        { title: t("nav.benefits"), href: "/membership/benefits" },
        { title: t("nav.join"), href: "/membership/join" },
        { title: t("nav.conductCode"), href: "/membership/conductCode" },
      ],
    },
    {
      title: t("gallery.title"), // New gallery item
      href: "/gallery",
    },
    {
      title: t("nav.contacts"),
      href: "/contacts",
    },
  ];
};

export const navItems = [
  {
    title: "nav.eac",
    items: [
      { title: "nav.about", href: "/eac/about" },
      { title: "nav.council", href: "/eac/council" },
      { title: "nav.news", href: "/eac/news" },
      { title: "nav.events", href: "/eac/events" },
    ],
  },
  {
    title: "nav.arbitration",
    items: [
      { title: "nav.icac", href: "/arbitration/icac" },
      { title: "nav.rules", href: "/arbitration/rules" },
      { title: "nav.fees", href: "/arbitration/fees" },
      { title: "nav.calculator", href: "/arbitration/calculator" },
      { title: "nav.clause", href: "/arbitration/clause" },
      { title: "nav.arbitrators", href: "/arbitration/arbitrators" },
      { title: "nav.resources", href: "/arbitration/resources" },
    ],
  },
  {
    title: "nav.expertise",
    items: [
      { title: "nav.icje", href: "/expertise/icje" },
      { title: "nav.expertiseFields", href: "/expertise/expertiseFields" },
    ],
  },
  {
    title: "nav.artExpertise",
    items: [
      { title: "nav.authentication", href: "/art-expertise/authentication" },
      { title: "nav.appraisal", href: "/art-expertise/appraisal" },
      { title: "nav.passport", href: "/art-expertise/passport" },
    ],
  },
  {
    title: "nav.training",
    items: [
      { title: "nav.courses", href: "/training/courses" },
      { title: "nav.workshops", href: "/training/workshops" },
    ],
  },
  {
    title: "nav.membership",
    items: [
      { title: "nav.benefits", href: "/membership/benefits" },
      { title: "nav.join", href: "/membership/join" },
      { title: "nav.conductCode", href: "/membership/conductCode" },
    ],
  },
  {
    title: "gallery.title", // New gallery item
    href: "/gallery",
  },
  {
    title: "nav.contacts",
    href: "/contacts",
  },
];
