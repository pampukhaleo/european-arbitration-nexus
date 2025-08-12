
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavItems } from "./NavData";
import NavDropdown from "./NavDropdown";

interface DesktopNavProps {
  activeDropdown: string | null;
  toggleDropdown: (title: string) => void;
}

const DesktopNav = ({ activeDropdown, toggleDropdown }: DesktopNavProps) => {
  const { t } = useLanguage();
  const navItems = useNavItems();

  return (
    <nav className="hidden lg:flex items-center space-x-8">
      {navItems.map((item) => (
        item.children && item.children.length > 0 ? (
          <NavDropdown 
            key={item.href} 
            item={item} 
            isActive={activeDropdown === item.title}
            onToggle={toggleDropdown}
          />
        ) : (
          <Link
            key={item.href}
            to={item.href}
            className="text-gray-700 hover:text-eac-primary transition-colors duration-200"
          >
            {t(item.translationKey) || item.title}
          </Link>
        )
      ))}
    </nav>
  );
};

export default DesktopNav;
