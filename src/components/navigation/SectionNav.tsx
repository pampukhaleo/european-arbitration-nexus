
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { navItems, NavItem } from "@/components/header/NavData";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

interface SectionNavProps {
  sectionKey: string;
}

export default function SectionNav({ sectionKey }: SectionNavProps) {
  const { t } = useLanguage();
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Find the current section from navItems based on the sectionKey
  const section = navItems.find(item => item.href.includes(sectionKey));
  
  if (!section || !section.children || section.children.length === 0) {
    return null;
  }

  return (
    <Card className="p-4">
      <h3 className="font-medium text-lg mb-3">{t(section.translationKey) || section.title}</h3>
      <div className="space-y-2">
        {section.children.map((child) => (
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
