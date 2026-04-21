// Route prefetch map: when the user hovers/focuses a nav link,
// we kick off the dynamic import so the chunk is in cache by the time they click.
const prefetchers: Record<string, () => Promise<unknown>> = {
  '/eac/about': () => import('@/pages/eac/About'),
  '/eac/council': () => import('@/pages/eac/Council'),
  '/eac/news': () => import('@/pages/eac/News'),
  '/arbitration/icac': () => import('@/pages/arbitration/ICAC'),
  '/arbitration/rules': () => import('@/pages/arbitration/Rules'),
  '/arbitration/fees': () => import('@/pages/arbitration/FeeRegulations'),
  '/arbitration/calculator': () => import('@/pages/arbitration/CostCalculator'),
  '/arbitration/clause': () => import('@/pages/arbitration/ArbitrationClause'),
  '/expertise/icje': () => import('@/pages/expertise/ICJE'),
  '/expertise/expertiseFields': () => import('@/pages/expertise/ExpertiseFields'),
  '/art-expertise/authentication': () => import('@/pages/artExpertise/ArtAuthentication'),
  '/art-expertise/appraisal': () => import('@/pages/artExpertise/ArtAppraisal'),
  '/art-expertise/passport': () => import('@/pages/artExpertise/ArtPassport'),
  '/gallery': () => import('@/pages/gallery/Gallery'),
  '/membership/benefits': () => import('@/pages/membership/MembershipBenefits'),
  '/membership/join': () => import('@/pages/membership/HowToJoin'),
  '/membership/conductCode': () => import('@/pages/membership/CodeOfConduct'),
  '/contacts': () => import('@/pages/Contacts'),
  '/privacy-policy': () => import('@/pages/policies/PrivacyPolicy'),
  '/cookies-policy': () => import('@/pages/policies/CookiesPolicy'),
  '/terms-of-service': () => import('@/pages/policies/TermsOfService'),
};

const prefetched = new Set<string>();

export const prefetchRoute = (path: string) => {
  if (prefetched.has(path)) return;
  const fn = prefetchers[path];
  if (!fn) return;
  prefetched.add(path);
  fn().catch(() => {
    // Allow retry on next hover if the import failed (e.g., offline)
    prefetched.delete(path);
  });
};
