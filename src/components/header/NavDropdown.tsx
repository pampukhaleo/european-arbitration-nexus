
import { NavItem } from "./NavData";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { Link, useLocation } from "react-router-dom";

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
  const { user } = useAuth();
  const location = useLocation();

  const handleClick = (href?: string) => {
    if (href) {
      closeMobileMenu?.();
    } else {
      onToggle(item.title);
    }
  };

  const filterAuthItems = (items: NavItem[] | undefined) => {
    if (!items) return [];
    return items.filter(childItem => !childItem.requiresAuth || user);
  };

  const filteredChildren = filterAuthItems(item.children);

  if (filteredChildren.length === 0 && item.children?.length) {
    // If all children require auth and user is not logged in, don't show the item
    if (!user) return null;
  }

  const isCurrentPath = location.pathname === item.href ||
    filteredChildren.some(child => location.pathname === child.href);

  if (!filteredChildren.length) {
    return (
      <Link
        to={item.href}
        className={`
          ${isMobile 
            ? "block px-3 py-2 text-base font-medium border-b border-gray-100" 
            : "px-3 py-2 text-sm font-medium rounded-md"
          }
          ${isCurrentPath
            ? "bg-blue-50 text-blue-700 border-blue-200"
            : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
          }
          transition-colors duration-200
        `}
        onClick={() => handleClick(item.href)}
      >
        {t(item.translationKey)}
      </Link>
    );
  }

  return (
    <div className={isMobile ? "border-b border-gray-100" : "relative"}>
      <button
        onClick={() => handleClick()}
        className={`
          ${isMobile 
            ? "flex items-center justify-between w-full px-3 py-2 text-base font-medium text-left" 
            : "flex items-center px-3 py-2 text-sm font-medium rounded-md"
          }
          ${isCurrentPath
            ? "bg-blue-50 text-blue-700"
            : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
          }
          transition-colors duration-200
        `}
      >
        {t(item.translationKey)}
        <ChevronDown 
          className={`ml-1 h-4 w-4 transform transition-transform duration-200 ${
            isActive ? "rotate-180" : ""
          }`} 
        />
      </button>

      {isActive && (
        <div className={
          isMobile
            ? "bg-gray-50 border-t border-gray-200"
            : "absolute left-0 mt-1 w-56 bg-white rounded-md shadow-lg border border-gray-200 z-50"
        }>
          {filteredChildren.map((child) => (
            <Link
              key={child.href}
              to={child.href}
              className={`
                ${isMobile 
                  ? "block px-6 py-2 text-sm" 
                  : "block px-4 py-2 text-sm"
                }
                ${location.pathname === child.href
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                }
                transition-colors duration-200
              `}
              onClick={() => handleClick(child.href)}
            >
              {t(child.translationKey)}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
