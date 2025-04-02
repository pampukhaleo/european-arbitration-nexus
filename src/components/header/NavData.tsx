
import { ReactNode } from "react";

export type NavItem = {
  title: string;
  translationKey: string;
  href: string;
  children?: NavItem[];
};

export const navItems: NavItem[] = [
  {
    title: "EAC",
    translationKey: "menu.eac",
    href: "/eac",
    children: [
      { title: "About Us", translationKey: "menu.about", href: "/eac/about" },
      { title: "EAC Council", translationKey: "menu.council", href: "/eac/council" },
      { title: "News", translationKey: "menu.news", href: "/eac/news" },
      { title: "Event Calendar", translationKey: "menu.events", href: "/eac/events" },
    ],
  },
  {
    title: "Arbitration",
    translationKey: "menu.arbitration",
    href: "/arbitration",
    children: [
      { title: "About the ICAC under the EAC", translationKey: "menu.icac", href: "/arbitration/icac" },
      { title: "ICAC Rules ", translationKey: "menu.rules", href: "/arbitration/rules" },
      { title: "ICAC Provisions on Arbitration Costs", translationKey: "menu.fees", href: "/arbitration/fees" },
      { title: "Cost Calculator", translationKey: "menu.calculator", href: "/arbitration/calculator" },
      { title: "Arbitration Clause", translationKey: "menu.clause", href: "/arbitration/clause" },
      { title: "List of Arbitrators", translationKey: "menu.arbitrators", href: "/arbitration/arbitrators" },
      { title: "Legal Resources", translationKey: "menu.resources", href: "/arbitration/resources" },
    ],
  },
  {
    title: "Expertise",
    translationKey: "menu.expertise",
    href: "/expertise",
    children: [
      { title: "About ICSE at EAC", translationKey: "menu.icse", href: "/expertise/icse" },
      { title: "Expertise", translationKey: "menu.services", href: "/expertise/services" },
    ],
  },
  {
    title: "Art Expertise",
    translationKey: "menu.art-expertise",
    href: "/art-expertise",
    children: [
      { title: "Authentication", translationKey: "menu.authentication", href: "/art-expertise/authentication" },
      { title: "Valuation", translationKey: "menu.valuation", href: "/art-expertise/valuation" },
      { title: "Art Passport", translationKey: "menu.passport", href: "/art-expertise/passport" },
      { title: "International Register of Artworks", translationKey: "menu.register", href: "/art-expertise/register" },
    ],
  },
  {
    title: "Training",
    translationKey: "menu.training",
    href: "/training",
    children: [
      { title: "Qualification Course for Arbitrators", translationKey: "menu.qualification", href: "/training/qualification" },
    ],
  },
  {
    title: "Membership",
    translationKey: "menu.membership",
    href: "/membership",
    children: [
      { title: "Join", translationKey: "menu.join", href: "/membership/join" },
      { title: "Membership Benefits", translationKey: "menu.benefits", href: "/membership/benefits" },
      { title: "Application Form", translationKey: "menu.apply", href: "/membership/apply" },
    ],
  },
  {
    title: "Contacts",
    translationKey: "menu.contacts",
    href: "/contacts",
  },
];
