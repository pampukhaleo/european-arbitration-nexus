
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ChevronDown, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavItems, NavItem } from "./NavData";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const MobileNav = () => {
  const { t } = useLanguage();
  const navItems = useNavItems();
  const [openSections, setOpenSections] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleSection = (href: string) => {
    setOpenSections(prev => 
      prev.includes(href) 
        ? prev.filter(section => section !== href)
        : [...prev, href]
    );
  };

  const renderNavItem = (item: NavItem) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = openSections.includes(item.href);

    if (hasChildren) {
      return (
        <Collapsible key={item.href} open={isExpanded} onOpenChange={() => toggleSection(item.href)}>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-between text-left font-normal"
            >
              {t(item.translationKey) || item.title}
              {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="pl-4 space-y-1">
            {item.children.map((child) => (
              <Link
                key={child.href}
                to={child.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-sm text-gray-600 hover:text-eac-primary hover:bg-gray-50 rounded"
              >
                {t(child.translationKey) || child.title}
              </Link>
            ))}
          </CollapsibleContent>
        </Collapsible>
      );
    }

    return (
      <Link
        key={item.href}
        to={item.href}
        onClick={() => setIsOpen(false)}
        className="block px-3 py-2 text-gray-700 hover:text-eac-primary hover:bg-gray-50 rounded"
      >
        {t(item.translationKey) || item.title}
      </Link>
    );
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <nav className="flex flex-col space-y-2 mt-8">
          {navItems.map(renderNavItem)}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
