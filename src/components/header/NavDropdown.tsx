import { Link, useLocation } from "react-router-dom";
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
  const location = useLocation();

  const isCurrentPath = (href: string) =>
    href === "/" ? location.pathname === "/" : location.pathname.startsWith(href);

  // If the item doesn't have children, render a simple Link instead of a dropdown
  if (!item.children) {
    const current = isCurrentPath(item.href);
    return (
      <div className={isMobile ? "relative" : "relative group"}>
        <Link
          to={item.href}
          aria-current={current ? "page" : undefined}
          className={cn(
            "flex items-center gap-1 px-3 py-2 text-eac-dark hover:text-eac-primary",
            current && "text-eac-primary font-medium",
            isMobile && "w-full block"
          )}
          onClick={closeMobileMenu}
        >
          {t(item.translationKey) || item.title}
        </Link>
      </div>
    );
  }

  const sectionActive = item.children.some((child) => isCurrentPath(child.href));

  return (
    <div className={isMobile ? "relative" : "relative group"}>
      <Button
        variant="ghost"
        aria-expanded={isMobile ? isActive : undefined}
        aria-haspopup="menu"
        className={cn(
          "flex items-center gap-1 px-3 text-eac-dark hover:text-eac-primary",
          (isActive || sectionActive) && "text-eac-primary",
          isMobile && "w-full justify-between"
        )}
        onClick={() => onToggle(item.title)}
      >
        {t(item.translationKey) || item.title}
        {item.children && <ChevronDown size={16} aria-hidden="true" />}
      </Button>

      {item.children && (isMobile ? isActive : true) && (
        <div
          role="menu"
          className={cn(
            isMobile ? "pl-4 space-y-1 mt-1" : "absolute top-full left-0 hidden group-hover:block bg-white shadow-lg rounded-md overflow-hidden w-64 z-50"
          )}
        >
          <div className={isMobile ? "" : "py-2"}>
            {item.children.map((child) => {
              const current = isCurrentPath(child.href);
              return (
                <Link
                  key={child.title}
                  to={child.href}
                  role="menuitem"
                  aria-current={current ? "page" : undefined}
                  className={cn(
                    isMobile
                      ? "block py-2 text-sm text-gray-700 hover:text-eac-primary"
                      : "block px-4 py-2 text-sm text-gray-700 hover:bg-eac-light hover:text-eac-primary",
                    current && "text-eac-primary font-medium"
                  )}
                  onClick={closeMobileMenu}
                >
                  {t(child.translationKey) || child.title}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
