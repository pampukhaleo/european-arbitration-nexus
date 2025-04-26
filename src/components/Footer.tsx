import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Footer() {
  const { t } = useLanguage();

  const quickLinks = [
    { to: "/eac/about", label: t('menu.about') },
    { to: "/arbitration/rules", label: t('menu.rules') },
    { to: "/arbitration/clause", label: t('menu.clause') },
    { to: "/arbitration/calculator", label: t('menu.calculator') },
    { to: "/membership/join", label: t('menu.join') },
    { to: "/eac/news", label: t('home.latestNews') },
  ];

  const services = [
    { to: "/arbitration/icac", label: t('menu.arbitration') },
    { to: "/expertise/icje", label: t('menu.expertise') },
    { to: "/art-expertise/authentication", label: t('menu.authentication') },
    { to: "/art-expertise/appraisal", label: t('menu.appraisal') },
    // { to: "/training", label: "Arbitrator Training" },
  ];

  const bottomLinks = [
    { to: "/privacy", label: "Privacy Policy" },
    { to: "/serviceTerms", label: "Terms of Service" },
    { to: "/cookies", label: "Cookies Policy" },
  ];

  return (
    <footer className="bg-gray-100 border-t border-gray-200">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1 - About */}
          <div>
            <a href={'/'} className="mb-4">
              <img
                src={`${import.meta.env.BASE_URL}logo.png`}
                alt="European Arbitration Chamber Logo"
                className="h-12 mb-3"
              />
            </a>
            <p className="text-sm text-gray-600 mb-4">{t("footer.about")}</p>

            {/* Social Media Icons */}
            <div className="flex items-center space-x-3.5 ml-3">
              {[
                {
                  href: "https://www.linkedin.com/company/european-arbitration-chamber/",
                  label: "LinkedIn",
                  svgPath:
                    "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z",
                },
                {
                  href: "https://www.facebook.com/EuropeanArbitrationChamber",
                  label: "Facebook",
                  svgPath:
                    "M22.675 0h-21.35C.595 0 0 .594 0 1.326v21.348C0 23.405.595 24 1.325 24h11.494v-9.294H9.692v-3.622h3.127V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.464.099 2.795.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.31h3.587l-.467 3.622h-3.12V24h6.116C23.405 24 24 23.405 24 22.674V1.326C24 .594 23.405 0 22.675 0z",
                },
                {
                  href: "https://www.instagram.com/eu_arbitrage/",
                  label: "Instagram",
                  svgPath:
                    "M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm5.25-.75a.75.75 0 1 1 1.5 0 .75.75 0 0 1-1.5 0z",
                },
              ].map(({ href, label, svgPath }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-eac-primary"
                >
                  <span className="sr-only">{label}</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d={svgPath} />
                  </svg>
                </a>
              ))}
            </div>

            <div className="mt-4">
              <LanguageSwitcher />
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-eac-dark">
              {t("footer.quickLinks")}
            </h3>
            <ul className="space-y-2 text-sm">
              {quickLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-gray-600 hover:text-eac-primary">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-eac-dark">
              {t("footer.services")}
            </h3>
            <ul className="space-y-2 text-sm">
              {services.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-gray-600 hover:text-eac-primary">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-eac-dark">
              {t("footer.contactUs")}
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-eac-primary flex-shrink-0 mt-0.5" />
                <span className="text-gray-600">
                  {t('contacts.addressName')} <br />
                  {t("contacts.address")}
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-eac-primary flex-shrink-0" />
                <span className="text-gray-600">+32 2 808 77 54</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-eac-primary flex-shrink-0" />
                <a
                  href="mailto:secretary@chea-taic.be"
                  className="text-gray-600 hover:text-eac-primary"
                >
                  secretary@chea-taic.be
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 mt-8 pt-6">
          <div className="text-sm text-center text-gray-500 mb-2">
            <ul className="space-x-2 text-sm flex justify-center">
              {bottomLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-gray-600 hover:text-eac-primary">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <p className="text-sm text-center text-gray-500">
            © {new Date().getFullYear()} European Arbitration Chamber. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
