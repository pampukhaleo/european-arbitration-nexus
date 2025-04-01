
import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type NavItem = {
  title: string;
  href: string;
  children?: NavItem[];
};

const navItems: NavItem[] = [
  {
    title: "EAC",
    href: "/eac",
    children: [
      { title: "About Us", href: "/eac/about" },
      { title: "EAC Council", href: "/eac/council" },
      { title: "News", href: "/eac/news" },
      { title: "Event Calendar", href: "/eac/events" },
    ],
  },
  {
    title: "Arbitration",
    href: "/arbitration",
    children: [
      { title: "ICAC at EAC", href: "/arbitration/icac" },
      { title: "Rules", href: "/arbitration/rules" },
      { title: "Fee Regulations", href: "/arbitration/fees" },
      { title: "Cost Calculator", href: "/arbitration/calculator" },
      { title: "Arbitration Clause", href: "/arbitration/clause" },
      { title: "List of Arbitrators", href: "/arbitration/arbitrators" },
      { title: "Legal Resources", href: "/arbitration/resources" },
    ],
  },
  {
    title: "Expertise",
    href: "/expertise",
    children: [
      { title: "About ICSE at EAC", href: "/expertise/icse" },
      { title: "Expertise", href: "/expertise/services" },
    ],
  },
  {
    title: "Art Expertise",
    href: "/art-expertise",
    children: [
      { title: "Authentication", href: "/art-expertise/authentication" },
      { title: "Valuation", href: "/art-expertise/valuation" },
      { title: "Art Passport", href: "/art-expertise/passport" },
      { title: "International Register of Artworks", href: "/art-expertise/register" },
    ],
  },
  {
    title: "Training",
    href: "/training",
    children: [
      { title: "Qualification Course for Arbitrators", href: "/training/qualification" },
    ],
  },
  {
    title: "Membership",
    href: "/membership",
    children: [
      { title: "Join", href: "/membership/join" },
      { title: "Membership Benefits", href: "/membership/benefits" },
      { title: "Application Form", href: "/membership/apply" },
    ],
  },
  {
    title: "Contacts",
    href: "/contacts",
  },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

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
                  {item.title}
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
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
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
                  {item.title}
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
