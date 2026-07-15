import { useEffect, useState } from "react";
import { AlertTriangle, X } from "lucide-react";
import { Link } from "@/lib/i18nRouting";
import { useLanguage } from "@/contexts/LanguageContext";

const STORAGE_KEY = "eac-fraud-banner-dismissed-at";
const HIDE_FOR_MS = 24 * 60 * 60 * 1000; // 24h

export default function FraudAlertBanner() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const at = raw ? Number(raw) : 0;
      if (!at || Date.now() - at > HIDE_FOR_MS) {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  const dismiss = () => {
    try {
      localStorage.setItem(STORAGE_KEY, String(Date.now()));
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  return (
    <div
      role="alert"
      className="bg-amber-100 text-amber-900 border-b border-amber-300"
    >
      <div className="container mx-auto px-4 py-2 flex items-center gap-3 text-sm">
        <AlertTriangle className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
        <p className="flex-1 leading-snug">
          <span>{t("fraud.bannerText")}</span>{" "}
          <Link
            to="/fraud-warning"
            className="font-semibold underline underline-offset-2 hover:text-amber-950"
          >
            {t("fraud.bannerCta")}
          </Link>
        </p>
        <button
          type="button"
          onClick={dismiss}
          aria-label={t("common.dismiss")}
          className="rounded p-1 hover:bg-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
