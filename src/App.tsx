import React, { lazy, Suspense } from 'react';
import type { RouteRecord } from 'vite-react-ssg';
import { Outlet, Navigate, useLocation, useParams } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Index from '@/pages/Index';
import ProtectedRoute from '@/components/ProtectedRoute';
import AdminRoute from '@/components/AdminRoute';
import ErrorBoundary from '@/components/ErrorBoundary';
import PageLoader from '@/components/ui/PageLoader';
import { ScrollToTop } from '@/components/ui/ScrollToTop';
import { LanguageProvider, Language } from '@/contexts/LanguageContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from '@/components/ui/toaster';
import CookieConsent from '@/components/CookieConsent';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { isSupportedLang, DEFAULT_LANG, SUPPORTED_LANGS } from '@/lib/i18nRouting';
import { newsItems } from '@/data/newsData';

// Lazy-loaded pages
const Gallery = lazy(() => import('@/pages/gallery/Gallery'));
const PaintingDetail = lazy(() => import('@/pages/gallery/PaintingDetail'));
const PaintingForm = lazy(() => import('@/pages/gallery/PaintingForm'));
const GalleryManage = lazy(() => import('@/pages/gallery/GalleryManage'));
const QrCodeGenerator = lazy(() => import('@/pages/gallery/QrCodeGenerator'));
const TokenManagement = lazy(() => import('@/pages/gallery/TokenManagement'));
const Auth = lazy(() => import('@/pages/Auth'));
const Contacts = lazy(() => import('@/pages/Contacts'));
const NotFound = lazy(() => import('@/pages/NotFound'));
const AdminDashboard = lazy(() => import('@/pages/admin/AdminDashboard'));
const Landing = lazy(() => import('@/pages/Landing'));

const EACAbout = lazy(() => import('@/pages/eac/About'));
const Council = lazy(() => import('@/pages/eac/Council'));
const News = lazy(() => import('@/pages/eac/News'));
const NewsDetail = lazy(() => import('@/pages/eac/NewsDetail'));

const ICAC = lazy(() => import('@/pages/arbitration/ICAC'));
const Rules = lazy(() => import('@/pages/arbitration/Rules'));
const FeeRegulations = lazy(() => import('@/pages/arbitration/FeeRegulations'));
const CostCalculator = lazy(() => import('@/pages/arbitration/CostCalculator'));
const ArbitrationClause = lazy(() => import('@/pages/arbitration/ArbitrationClause'));

const ICJE = lazy(() => import('@/pages/expertise/ICJE'));
const ExpertiseFields = lazy(() => import('@/pages/expertise/ExpertiseFields'));

const ArtAuthentication = lazy(() => import('@/pages/artExpertise/ArtAuthentication'));
const ArtAppraisal = lazy(() => import('@/pages/artExpertise/ArtAppraisal'));
const ArtPassport = lazy(() => import('@/pages/artExpertise/ArtPassport'));

const MembershipBenefits = lazy(() => import('@/pages/membership/MembershipBenefits'));
const HowToJoin = lazy(() => import('@/pages/membership/HowToJoin'));
const CodeOfConduct = lazy(() => import('@/pages/membership/CodeOfConduct'));

const PrivacyPolicy = lazy(() => import('@/pages/policies/PrivacyPolicy'));
const CookiesPolicy = lazy(() => import('@/pages/policies/CookiesPolicy'));
const TermsOfService = lazy(() => import('@/pages/policies/TermsOfService'));

const queryClient = new QueryClient();

/**
 * Root layout — providers shared across the whole app.
 * Rendered both at SSG-time and in the browser.
 */
const RootLayout = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <AuthProvider>
        <ErrorBoundary>
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
        <ScrollToTop />
        <Toaster />
        <CookieConsent />
      </AuthProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

/**
 * Per-language layout — provides LanguageProvider with the URL-derived language.
 * Used as the layout component for each /:lang subtree.
 */
const LangLayout = ({ lang }: { lang: Language }) => (
  <LanguageProvider initialLanguage={lang}>
    <Outlet />
  </LanguageProvider>
);

/** Redirect / → /<detected-or-stored-lang>. Client-only. */
const RootRedirect = () => {
  if (typeof window === 'undefined') {
    // SSG render: just emit a meta-refresh-style placeholder. We render an
    // empty container; actual redirect happens on hydration.
    return null;
  }
  let stored: string | null = null;
  try {
    stored = localStorage.getItem('eac-lang');
  } catch {
    /* ignore */
  }
  let target: string = DEFAULT_LANG;
  if (isSupportedLang(stored)) {
    target = stored;
  } else if (typeof navigator !== 'undefined') {
    for (const c of [...(navigator.languages || []), navigator.language || '']) {
      const code = c.slice(0, 2).toLowerCase();
      if (isSupportedLang(code)) {
        target = code;
        break;
      }
    }
  }
  return <Navigate to={`/${target}`} replace />;
};

/** Redirect any unknown top-level URL into the user's lang subtree. */
const LegacyPathRedirect = () => {
  const location = useLocation();
  if (typeof window === 'undefined') return null;
  let stored: string | null = null;
  try {
    stored = localStorage.getItem('eac-lang');
  } catch {
    /* ignore */
  }
  const target = isSupportedLang(stored) ? stored : DEFAULT_LANG;
  return (
    <Navigate
      to={`/${target}${location.pathname}${location.search}${location.hash}`}
      replace
    />
  );
};

/**
 * Build the localised page tree for a single language. Each entry is rendered
 * for /<lang>/<path> at SSG time.
 */
const localisedChildren = (): RouteRecord[] => [
  { index: true, Component: Index },

  { path: 'landing', Component: Landing },

  // EAC
  { path: 'eac', element: <Navigate to="about" replace /> },
  { path: 'eac/about', Component: EACAbout },
  { path: 'eac/council', Component: Council },
  { path: 'eac/news', Component: News },
  {
    path: 'eac/news/:id',
    Component: NewsDetail,
  },

  // Arbitration
  { path: 'arbitration', element: <Navigate to="icac" replace /> },
  { path: 'arbitration/icac', Component: ICAC },
  { path: 'arbitration/rules', Component: Rules },
  { path: 'arbitration/fees', Component: FeeRegulations },
  { path: 'arbitration/calculator', Component: CostCalculator },
  { path: 'arbitration/clause', Component: ArbitrationClause },

  // Expertise
  { path: 'expertise', element: <Navigate to="icje" replace /> },
  { path: 'expertise/icje', Component: ICJE },
  { path: 'expertise/expertiseFields', Component: ExpertiseFields },

  // Art expertise
  { path: 'art-expertise', element: <Navigate to="authentication" replace /> },
  { path: 'art-expertise/authentication', Component: ArtAuthentication },
  { path: 'art-expertise/appraisal', Component: ArtAppraisal },
  { path: 'art-expertise/passport', Component: ArtPassport },

  // Gallery (public, runtime data → SPA-only, no SSG)
  { path: 'gallery', Component: Gallery },
  { path: 'gallery/:id', Component: PaintingDetail },
  { path: 'gallery/:id/access/:token', Component: PaintingDetail },

  // Membership
  { path: 'membership', element: <Navigate to="benefits" replace /> },
  { path: 'membership/benefits', Component: MembershipBenefits },
  { path: 'membership/join', Component: HowToJoin },
  { path: 'membership/conductCode', Component: CodeOfConduct },

  { path: 'contacts', Component: Contacts },

  { path: 'privacy-policy', Component: PrivacyPolicy },
  { path: 'cookies-policy', Component: CookiesPolicy },
  { path: 'cookies', element: <Navigate to="../cookies-policy" replace /> },
  { path: 'terms-of-service', Component: TermsOfService },

  { path: 'about', element: <Navigate to="../eac/about" replace /> },

  { path: '*', Component: NotFound },
];

/**
 * Tag dynamic news routes with getStaticPaths so vite-react-ssg generates
 * one HTML file per news item per language.
 */
const withStaticNewsPaths = (lang: Language) =>
  localisedChildren().map((route) => {
    if (route.path === 'eac/news/:id') {
      return {
        ...route,
        getStaticPaths: () =>
          newsItems.map((n) => `eac/news/${n.id}`),
      };
    }
    return route;
  });

const langSubtree = (lang: Language): RouteRecord => ({
  path: lang,
  element: <LangLayout lang={lang} />,
  children: withStaticNewsPaths(lang),
});

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, Component: RootRedirect },

      // Non-localised utility routes (SPA-only — not pre-rendered).
      { path: 'auth', Component: Auth },
      {
        path: 'admin/dashboard',
        element: (
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        ),
      },
      {
        path: 'gallery/manage',
        element: (
          <ProtectedRoute>
            <GalleryManage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'gallery/manage/add',
        element: (
          <AdminRoute>
            <PaintingForm />
          </AdminRoute>
        ),
      },
      {
        path: 'gallery/manage/edit/:id',
        element: (
          <AdminRoute>
            <PaintingForm />
          </AdminRoute>
        ),
      },
      {
        path: 'gallery/manage/tokens/:id',
        element: (
          <ProtectedRoute>
            <TokenManagement />
          </ProtectedRoute>
        ),
      },
      {
        path: 'gallery/manage/qr/:id',
        element: (
          <ProtectedRoute>
            <QrCodeGenerator />
          </ProtectedRoute>
        ),
      },

      // Per-language subtrees — pre-rendered.
      ...SUPPORTED_LANGS.map((lang) => langSubtree(lang as Language)),

      // Legacy non-prefixed paths → client-side redirect on hydration.
      { path: '*', Component: LegacyPathRedirect },
    ],
  },
];

export default routes;
