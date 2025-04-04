
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { navItems, NavItem } from "@/components/header/NavData";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SectionNavProps {
  sectionKey: string;
}

export default function SectionNav({ sectionKey }: SectionNavProps) {
  const { t } = useLanguage();
  const location = useLocation();
  const currentPath = location.pathname;
  const [showMainMenu, setShowMainMenu] = useState(false);
  
  // Find the current section from navItems based on the sectionKey
  const currentSection = navItems.find(item => item.href.includes(sectionKey));
  
  // If showing main menu, display all main sections
  if (showMainMenu) {
    return (
      <Card className="p-4">
        <h3 className="font-medium text-lg mb-3">{t("menu.sections") || "Sections"}</h3>
        <div className="space-y-2">
          {navItems
            .filter(item => item.children && item.children.length > 0)
            .map((section) => (
              <Link
                key={section.href}
                to={section.children?.[0]?.href || section.href}
                className={cn(
                  "block py-2 px-3 text-sm rounded-md transition-colors",
                  // Fix: Only highlight if the current path starts with this section's path
                  currentPath.startsWith(section.href) 
                    ? "bg-eac-primary text-white font-medium" 
                    : "text-gray-600 hover:bg-gray-100"
                )}
                onClick={() => setShowMainMenu(false)}
              >
                {t(section.translationKey) || section.title}
              </Link>
            ))}
        </div>
      </Card>
    );
  }
  
  // Return null if there's no current section or no children
  if (!currentSection || !currentSection.children || currentSection.children.length === 0) {
    return null;
  }

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-medium text-lg">{t(currentSection.translationKey) || currentSection.title}</h3>
        <Button 
          variant="ghost" 
          size="sm" 
          className="p-1" 
          onClick={() => setShowMainMenu(true)}
          aria-label="Back to main menu"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </div>
      <div className="space-y-2">
        {currentSection.children.map((child) => (
          <Link
            key={child.href}
            to={child.href}
            className={cn(
              "block py-2 px-3 text-sm rounded-md transition-colors",
              currentPath === child.href 
                ? "bg-eac-primary text-white font-medium" 
                : "text-gray-600 hover:bg-gray-100"
            )}
          >
            {t(child.translationKey) || child.title}
          </Link>
        ))}
      </div>
    </Card>
  );
}
