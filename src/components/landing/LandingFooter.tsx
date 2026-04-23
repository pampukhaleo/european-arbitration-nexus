import { Link } from "react-router-dom";

export default function LandingFooter() {
  return (
    <footer className="w-full border-t border-white/10 bg-eac-dark text-white/80">
      <div className="container mx-auto px-4 py-8 grid gap-6 md:grid-cols-3 text-sm">
        <div>
          <p className="font-semibold text-white mb-2">European Arbitration Chamber</p>
          <p>Av. Louise 146</p>
          <p>1050 Bruxelles, Belgium</p>
        </div>
        <div>
          <p className="font-semibold text-white mb-2">Контакти</p>
          <p>
            Тел.:{" "}
            <a href="tel:+3228087754" className="hover:text-white">
              +32 2 808 77 54
            </a>
          </p>
          <p>
            Email:{" "}
            <a href="mailto:secretary@chea-taic.be" className="hover:text-white">
              secretary@chea-taic.be
            </a>
          </p>
        </div>
        <div>
          <p className="font-semibold text-white mb-2">Документи</p>
          <Link to="/privacy-policy" className="block hover:text-white">
            Політика конфіденційності
          </Link>
          <Link to="/terms-of-service" className="block hover:text-white">
            Умови використання
          </Link>
          <Link to="/cookies-policy" className="block hover:text-white">
            Політика cookies
          </Link>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-4 text-xs text-white/60">
          © {new Date().getFullYear()} European Arbitration Chamber. Всі права захищені.
        </div>
      </div>
    </footer>
  );
}
