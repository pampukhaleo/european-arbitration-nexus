import { ComponentProps, forwardRef, useCallback } from "react";
import {
  Link as RRLink,
  NavLink as RRNavLink,
  useLocation,
  useNavigate,
  useParams,
  Navigate,
} from "react-router-dom";

export const SUPPORTED_LANGS = ["en", "fr", "ru"] as const;
export type SupportedLang = (typeof SUPPORTED_LANGS)[number];
export const DEFAULT_LANG: SupportedLang = "en";

/** Paths that must NOT receive a language prefix (private/admin/auth). */
const NON_LOCALIZED_PREFIXES = ["/auth", "/admin", "/gallery/manage"];

export const isLocalizable = (path: string): boolean => {
  if (!path.startsWith("/")) return false;
  return !NON_LOCALIZED_PREFIXES.some(
    (p) => path === p || path.startsWith(p + "/") || path.startsWith(p + "?")
  );
};

export const isSupportedLang = (v: unknown): v is SupportedLang =>
  typeof v === "string" && (SUPPORTED_LANGS as readonly string[]).includes(v);

/** Strip leading /en, /fr, /ru from a pathname. Returns "" for /en, /fr, /ru. */
export const stripLangPrefix = (pathname: string): string => {
  const m = pathname.match(/^\/(en|fr|ru)(\/.*)?$/);
  if (!m) return pathname;
  return m[2] || "";
};

/** Prepend /lang to a path (if it's localizable and not already prefixed). */
export const localizePath = (path: string, lang: SupportedLang): string => {
  if (!path.startsWith("/")) return path; // external or hash
  if (!isLocalizable(path)) return path;
  // Already prefixed?
  if (/^\/(en|fr|ru)(\/|$|\?|#)/.test(path)) return path;
  if (path === "/") return `/${lang}`;
  return `/${lang}${path}`;
};

/** Detect language from the current pathname. */
export const langFromPath = (pathname: string): SupportedLang => {
  const m = pathname.match(/^\/(en|fr|ru)(\/|$)/);
  return (m?.[1] as SupportedLang) || DEFAULT_LANG;
};

/** Hook: current language from the URL. */
export const useCurrentLang = (): SupportedLang => {
  const params = useParams<{ lang?: string }>();
  const location = useLocation();
  if (params.lang && isSupportedLang(params.lang)) return params.lang;
  return langFromPath(location.pathname);
};

const localizeTo = <T extends string | { pathname?: string }>(
  to: T,
  lang: SupportedLang
): T => {
  if (typeof to === "string") return localizePath(to, lang) as T;
  if (to && typeof to === "object" && typeof to.pathname === "string") {
    return { ...to, pathname: localizePath(to.pathname, lang) } as T;
  }
  return to;
};

/** Drop-in replacement for react-router's <Link> that prefixes `to` with the current language. */
export const Link = forwardRef<HTMLAnchorElement, ComponentProps<typeof RRLink>>(
  function LocalizedLink({ to, ...rest }, ref) {
    const lang = useCurrentLang();
    return <RRLink ref={ref} to={localizeTo(to as any, lang)} {...rest} />;
  }
);

/** Drop-in replacement for react-router's <NavLink>. */
export const NavLink = forwardRef<HTMLAnchorElement, ComponentProps<typeof RRNavLink>>(
  function LocalizedNavLink({ to, ...rest }, ref) {
    const lang = useCurrentLang();
    return <RRNavLink ref={ref} to={localizeTo(to as any, lang)} {...rest} />;
  }
);

/** Drop-in replacement for useNavigate that auto-prefixes string paths. */
export const useLocalizedNavigate = () => {
  const navigate = useNavigate();
  const lang = useCurrentLang();
  return useCallback(
    (to: any, opts?: any) => {
      if (typeof to === "number") return navigate(to);
      return navigate(localizeTo(to, lang), opts);
    },
    [navigate, lang]
  );
};

/** Detect the user's preferred language from the browser. */
export const detectBrowserLang = (): SupportedLang => {
  if (typeof navigator === "undefined") return DEFAULT_LANG;
  const candidates = [
    ...(navigator.languages || []),
    navigator.language || "",
  ];
  for (const c of candidates) {
    const code = c.slice(0, 2).toLowerCase();
    if (isSupportedLang(code)) return code;
  }
  return DEFAULT_LANG;
};

/** Redirect / to /<detected-or-stored-lang>. */
export const RootLanguageRedirect = () => {
  const stored =
    typeof window !== "undefined" ? localStorage.getItem("eac-lang") : null;
  const target = isSupportedLang(stored) ? stored : detectBrowserLang();
  return <Navigate to={`/${target}`} replace />;
};

/** Redirect /<old-path> to /<lang>/<old-path> (preserves SEO for legacy URLs). */
export const LegacyPathRedirect = () => {
  const location = useLocation();
  const stored =
    typeof window !== "undefined" ? localStorage.getItem("eac-lang") : null;
  const target = isSupportedLang(stored) ? stored : detectBrowserLang();
  return (
    <Navigate
      to={`/${target}${location.pathname}${location.search}${location.hash}`}
      replace
    />
  );
};
