import { useLocation } from "react-router-dom";
import { Seo } from "@/components/Seo";
import { stripLangPrefix, langFromPath } from "@/lib/i18nRouting";
import { getRouteMeta } from "@/lib/seoMetadata";

/**
 * Default per-route SEO emitted from <Layout>. Picks localized title/description
 * from the route metadata table. Pages that render their own <Seo> override
 * title/description (react-helmet-async — deeper child wins).
 */
export const RouteSeo = () => {
  const location = useLocation();
  const lang = langFromPath(location.pathname);
  const cleanRest = stripLangPrefix(location.pathname).replace(/\/+$/, "");

  // Detail pages render their own <Seo> with per-item title/description.
  // Because <RouteSeo> lives inside <Layout>, it renders *after* the page's
  // own <Seo> and Helmet would let it win — producing identical metadata on
  // every news / painting page. Skip those routes entirely.
  const pageOwnsSeo =
    /^\/eac\/news\/[^/]+$/.test(cleanRest) || /^\/gallery\/[^/]+/.test(cleanRest);
  if (pageOwnsSeo) return null;

  const meta = getRouteMeta(cleanRest);


  const title = meta.title[lang] ?? meta.title.en;
  const description = meta.description[lang] ?? meta.description.en;

  return <Seo title={title} description={description} lang={lang} />;
};
