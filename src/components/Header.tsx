
import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

type NavItem = {
  title: string;
  translationKey: string;
  href: string;
  children?: NavItem[];
};

const navItems: NavItem[] = [
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
      { title: "ICAC at EAC", translationKey: "menu.icac", href: "/arbitration/icac" },
      { title: "Rules", translationKey: "menu.rules", href: "/arbitration/rules" },
      { title: "Fee Regulations", translationKey: "menu.fees", href: "/arbitration/fees" },
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

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { t } = useLanguage();

  const toggleDropdown = (title: string) => {
    if (activeDropdown === title) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(title);
    }
  };

  return (
    <header className="sticky top-0 w-full bg-white shadow-md z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/1373ca5d-af25-42c9-bb89-5c42a7e6fa2e.png" 
              alt="European Arbitration Chamber Logo" 
              className="h-12 mr-2" 
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-1">
            {navItems.map((item) => (
              <div key={item.title} className="relative group">
                <Button
                  variant="ghost"
                  className={cn(
                    "flex items-center gap-1 px-3 text-eac-dark hover:text-eac-primary",
                    activeDropdown === item.title && "text-eac-primary"
                  )}
                  onClick={() => toggleDropdown(item.title)}
                >
                  {t(item.translationKey)}
                  {item.children && <ChevronDown size={16} />}
                </Button>

                {item.children && (
                  <div className="absolute top-full left-0 hidden group-hover:block bg-white shadow-lg rounded-md overflow-hidden w-64 z-50">
                    <div className="py-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.title}
                          to={child.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-eac-light hover:text-eac-primary"
                        >
                          {child.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div className="ml-2 flex items-center">
              <LanguageSwitcher />
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <LanguageSwitcher mode="compact" />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white shadow-lg">
          <nav className="container mx-auto px-4 py-4 space-y-1">
            {navItems.map((item) => (
              <div key={item.title} className="relative">
                <Button
                  variant="ghost"
                  className="w-full justify-between text-eac-dark hover:text-eac-primary"
                  onClick={() => toggleDropdown(item.title)}
                >
                  {t(item.translationKey)}
                  {item.children && <ChevronDown size={16} />}
                </Button>

                {item.children && activeDropdown === item.title && (
                  <div className="pl-4 space-y-1 mt-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.title}
                        to={child.href}
                        className="block py-2 text-sm text-gray-700 hover:text-eac-primary"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {child.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
