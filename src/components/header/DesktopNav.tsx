
import { NavItem } from "./NavData";
import NavDropdown from "./NavDropdown";
import LanguageSwitcher from "../LanguageSwitcher";

interface DesktopNavProps {
  navItems: NavItem[];
  activeDropdown: string | null;
  toggleDropdown: (title: string) => void;
}

export default function DesktopNav({ 
  navItems, 
  activeDropdown, 
  toggleDropdown 
}: DesktopNavProps) {
  return (
    <nav className="hidden xl:flex space-x-1">
      {navItems.map((item) => (
        <NavDropdown
          key={item.title}
          item={item}
          isActive={activeDropdown === item.title}
          onToggle={toggleDropdown}
        />
      ))}
      <div className="ml-2 flex items-center">
        <LanguageSwitcher />
      </div>
    </nav>
  );
}
