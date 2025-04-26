import { NavItem } from "./NavData";
import NavDropdown from "./NavDropdown";

interface MobileNavProps {
  navItems: NavItem[];
  activeDropdown: string | null;
  toggleDropdown: (title: string) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export default function MobileNav({
  navItems,
  activeDropdown,
  toggleDropdown,
  mobileMenuOpen,
  setMobileMenuOpen
}: MobileNavProps) {
  const closeMobileMenu = () => setMobileMenuOpen(false);
  
  if (!mobileMenuOpen) return null;
  
  return (
    <div className="xl:hidden bg-white shadow-lg">
      <nav className="container mx-auto px-4 py-4 space-y-1">
        {navItems.map((item) => (
          <NavDropdown
            key={item.title}
            item={item}
            isActive={activeDropdown === item.title}
            onToggle={toggleDropdown}
            closeMobileMenu={closeMobileMenu}
            isMobile={true}
          />
        ))}
      </nav>
    </div>
  );
}
