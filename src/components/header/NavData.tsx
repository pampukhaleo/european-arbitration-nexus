
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";

export interface NavItem {
  title: string;
  href: string;
  translationKey: string;
  children?: NavItem[];
}

export const navItems: NavItem[] = [
  {
    title: "EAC",
    href: "/eac",
    translationKey: "menu.eac",
    children: [
      { title: "About EAC", href: "/eac/about", translationKey: "menu.about" },
      { title: "Council", href: "/eac/council", translationKey: "menu.council" },
      { title: "News", href: "/eac/news", translationKey: "menu.news" },
    ],
  },
  {
    title: "Arbitration",
    href: "/arbitration",
    translationKey: "menu.arbitration",
    children: [
      { title: "ICAC", href: "/arbitration/icac", translationKey: "menu.icac" },
      { title: "Rules", href: "/arbitration/rules", translationKey: "menu.rules" },
      { title: "Arbitration Clause", href: "/arbitration/clause", translationKey: "menu.clause" },
      { title: "Fee Regulations", href: "/arbitration/fees", translationKey: "menu.fees" },
      { title: "Cost Calculator", href: "/arbitration/calculator", translationKey: "menu.calculator" },
    ],
  },
  {
    title: "Expertise",
    href: "/expertise",
    translationKey: "menu.expertise",
    children: [
      { title: "ICJE", href: "/expertise/icje", translationKey: "menu.icje" },
      { title: "Expertise Fields", href: "/expertise/expertiseFields", translationKey: "menu.expertiseFields" },
    ],
  },
  {
    title: "Art Expertise",
    href: "/art-expertise",
    translationKey: "menu.artExpertise",
    children: [
      { title: "Authentication", href: "/art-expertise/authentication", translationKey: "menu.authentication" },
      { title: "Appraisal", href: "/art-expertise/appraisal", translationKey: "menu.appraisal" },
      { title: "Art Passport", href: "/art-expertise/passport", translationKey: "menu.passport" },
    ],
  },
  {
    title: "Gallery",
    href: "/gallery",
    translationKey: "menu.gallery",
    children: [
      { title: "View Gallery", href: "/gallery", translationKey: "menu.viewGallery" },
    ],
  },
  {
    title: "Membership",
    href: "/membership",
    translationKey: "menu.membership",
    children: [
      { title: "Benefits", href: "/membership/benefits", translationKey: "menu.benefits" },
      { title: "How to Join", href: "/membership/join", translationKey: "menu.join" },
      { title: "Code of Conduct", href: "/membership/conductCode", translationKey: "menu.conductCode" },
    ],
  },
];

// Dynamic function to get nav items including auth-specific items
export const useNavItems = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  const authNavItems = user ? [
    {
      title: "Gallery Management",
      href: "/gallery/manage",
      translationKey: "menu.galleryManage",
      children: [
        { title: "Manage Gallery", href: "/gallery/manage", translationKey: "menu.manageGallery" },
        { title: "Add Painting", href: "/gallery/manage/add", translationKey: "menu.addPainting" },
      ],
    }
  ] : [];

  return [...navItems, ...authNavItems];
};
