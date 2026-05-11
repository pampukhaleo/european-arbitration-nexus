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
  const meta = getRouteMeta(cleanRest);

  const title = meta.title[lang] ?? meta.title.en;
  const description = meta.description[lang] ?? meta.description.en;
  const h1 = meta.h1[lang] ?? meta.h1.en;

  return (
    <>
      <Seo title={title} description={description} lang={lang} />
      {/* Visually hidden H1 fallback so every route has at least one H1 in the DOM. */}
      <h1 className="sr-only">{h1}</h1>
    </>
  );
};
