
import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { NavItem } from "./NavData";

interface NavDropdownProps {
  item: NavItem;
  isActive: boolean;
  onToggle: (title: string) => void;
  closeMobileMenu?: () => void;
  isMobile?: boolean;
}

export default function NavDropdown({ 
  item, 
  isActive, 
  onToggle, 
  closeMobileMenu,
  isMobile = false 
}: NavDropdownProps) {
  const { t } = useLanguage();
  
  // If the item doesn't have children, render a simple Link instead of a dropdown
  if (!item.children) {
    return (
      <div className={isMobile ? "relative" : "relative group"}>
        <Link
          to={item.href}
          className={cn(
            "flex items-center gap-1 px-3 py-2 text-eac-dark hover:text-eac-primary",
            isMobile && "w-full block"
          )}
          onClick={closeMobileMenu}
        >
          {t(item.translationKey) || item.title}
        </Link>
      </div>
    );
  }
  
  return (
    <div className={isMobile ? "relative" : "relative group"}>
      <Button
        variant="ghost"
        className={cn(
          "flex items-center gap-1 px-3 text-eac-dark hover:text-eac-primary",
          isActive && "text-eac-primary",
          isMobile && "w-full justify-between"
        )}
        onClick={() => onToggle(item.title)}
      >
        {t(item.translationKey) || item.title}
        {item.children && <ChevronDown size={16} />}
      </Button>

      {item.children && (isMobile ? isActive : true) && (
        <div 
          className={cn(
            isMobile ? "pl-4 space-y-1 mt-1" : "absolute top-full left-0 hidden group-hover:block bg-white shadow-lg rounded-md overflow-hidden w-64 z-50"
          )}
        >
          <div className={isMobile ? "" : "py-2"}>
            {item.children.map((child) => (
              <Link
                key={child.title}
                to={child.href}
                className={cn(
                  isMobile ? "block py-2 text-sm text-gray-700 hover:text-eac-primary" : "block px-4 py-2 text-sm text-gray-700 hover:bg-eac-light hover:text-eac-primary"
                )}
                onClick={closeMobileMenu}
              >
                {t(child.translationKey) || child.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
