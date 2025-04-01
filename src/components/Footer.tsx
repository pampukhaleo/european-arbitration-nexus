
import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Footer() {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-gray-100 border-t border-gray-200">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1 - About */}
          <div>
            <div className="mb-4">
              <img 
                src="/lovable-uploads/1373ca5d-af25-42c9-bb89-5c42a7e6fa2e.png" 
                alt="European Arbitration Chamber Logo" 
                className="h-12 mb-3" 
              />
            </div>
            <p className="text-sm text-gray-600 mb-4">
              {t('footer.about')}
            </p>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-gray-600 hover:text-eac-primary">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-600 hover:text-eac-primary">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                </svg>
              </a>
            </div>
            <div className="mt-4">
              <LanguageSwitcher />
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-eac-dark">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/eac/about" className="text-gray-600 hover:text-eac-primary">About Us</Link></li>
              <li><Link to="/arbitration/rules" className="text-gray-600 hover:text-eac-primary">Arbitration Rules</Link></li>
              <li><Link to="/arbitration/clause" className="text-gray-600 hover:text-eac-primary">Model Arbitration Clause</Link></li>
              <li><Link to="/arbitration/calculator" className="text-gray-600 hover:text-eac-primary">Cost Calculator</Link></li>
              <li><Link to="/membership/join" className="text-gray-600 hover:text-eac-primary">Join EAC</Link></li>
              <li><Link to="/eac/news" className="text-gray-600 hover:text-eac-primary">Latest News</Link></li>
            </ul>
          </div>

          {/* Column 3 - Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-eac-dark">{t('footer.services')}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/arbitration" className="text-gray-600 hover:text-eac-primary">International Commercial Arbitration</Link></li>
              <li><Link to="/expertise" className="text-gray-600 hover:text-eac-primary">Expert Studies</Link></li>
              <li><Link to="/art-expertise" className="text-gray-600 hover:text-eac-primary">Art Authentication</Link></li>
              <li><Link to="/art-expertise/valuation" className="text-gray-600 hover:text-eac-primary">Art Valuation</Link></li>
              <li><Link to="/training" className="text-gray-600 hover:text-eac-primary">Arbitrator Training</Link></li>
            </ul>
          </div>

          {/* Column 4 - Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-eac-dark">{t('footer.contactUs')}</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-eac-primary flex-shrink-0 mt-0.5" />
                <span className="text-gray-600">146 Avenue Louise, B-1050 Brussels, Belgium</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-eac-primary flex-shrink-0" />
                <span className="text-gray-600">+32 (0) 2 808 77 54</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-eac-primary flex-shrink-0" />
                <a href="mailto:info@eac.court" className="text-gray-600 hover:text-eac-primary">info@eac.court</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 mt-8 pt-6">
          <p className="text-sm text-center text-gray-500">
            © {new Date().getFullYear()} European Arbitration Chamber. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
}
