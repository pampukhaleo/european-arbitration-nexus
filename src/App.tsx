import React, { Suspense } from 'react';
import type { RouteRecord } from 'vite-react-ssg';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
// HelmetProvider is provided automatically by vite-react-ssg in both SSR and client.
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

// Pages — imported eagerly so vite-react-ssg can pre-render every route at
// build time. Vite still emits per-route chunks via manualChunks in
// vite.config.ts, so the runtime bundle remains code-split.
import Gallery from '@/pages/gallery/Gallery';
import PaintingDetail from '@/pages/gallery/PaintingDetail';
import PaintingForm from '@/pages/gallery/PaintingForm';
import GalleryManage from '@/pages/gallery/GalleryManage';
import QrCodeGenerator from '@/pages/gallery/QrCodeGenerator';
import TokenManagement from '@/pages/gallery/TokenManagement';
import Auth from '@/pages/Auth';
import Contacts from '@/pages/Contacts';
import NotFound from '@/pages/NotFound';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import Landing from '@/pages/Landing';

import EACAbout from '@/pages/eac/About';

import News from '@/pages/eac/News';
import NewsDetail from '@/pages/eac/NewsDetail';

import ICAC from '@/pages/arbitration/ICAC';
import Rules from '@/pages/arbitration/Rules';
import FeeRegulations from '@/pages/arbitration/FeeRegulations';
import CostCalculator from '@/pages/arbitration/CostCalculator';
import ArbitrationClause from '@/pages/arbitration/ArbitrationClause';

import ICJE from '@/pages/expertise/ICJE';
import ExpertiseFields from '@/pages/expertise/ExpertiseFields';

import ArtAuthentication from '@/pages/artExpertise/ArtAuthentication';
import ArtAppraisal from '@/pages/artExpertise/ArtAppraisal';
import ArtPassport from '@/pages/artExpertise/ArtPassport';

import MembershipBenefits from '@/pages/membership/MembershipBenefits';
import HowToJoin from '@/pages/membership/HowToJoin';
import CodeOfConduct from '@/pages/membership/CodeOfConduct';

import PrivacyPolicy from '@/pages/policies/PrivacyPolicy';
import CookiesPolicy from '@/pages/policies/CookiesPolicy';
import TermsOfService from '@/pages/policies/TermsOfService';

const queryClient = new QueryClient();

/**
 * Root layout — providers shared across the whole app.
 * Rendered both at SSG-time and in the browser.
 */
const RootLayout = () => (
  <QueryClientProvider client={queryClient}>
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
