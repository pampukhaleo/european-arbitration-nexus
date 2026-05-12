import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { i as useLocalizedNavigate, u as useLanguage, o as newsItems, p as pickText, S as Seo, L as Layout, B as Button, d as Link } from "../main.mjs";
import { ArrowLeft, CalendarIcon, X } from "lucide-react";
import DOMPurify from "dompurify";
import "vite-react-ssg";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@supabase/supabase-js";
import "@radix-ui/react-toast";
import "@radix-ui/react-dialog";
import "@tanstack/react-query";
const NewsDetail = () => {
  var _a;
  const { id } = useParams();
  const navigate = useLocalizedNavigate();
  const { language, t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState(null);
  const newsItem = newsItems.find((item) => item.id === id);
  useEffect(() => {
    if (!newsItem) {
      navigate("/eac/news", { replace: true });
    }
  }, [newsItem, navigate]);
  if (!newsItem) return null;
  const title = pickText(newsItem.title, language);
  const description = pickText(newsItem.description, language);
  const trimmedTitle = title.length > 50 ? `${title.slice(0, 49).trimEnd()}…` : title;
  const seoTitle = `${trimmedTitle} | EAC News`;
  const plainDescription = description.replace(/<[^>]*>/g, "").replace(/\n+/g, " ").trim();
  const seoDescription = plainDescription.length > 160 ? `${plainDescription.substring(0, 157)}...` : plainDescription;
  const isoDate = (() => {
    const d = new Date(newsItem.date);
    return isNaN(d.getTime()) ? newsItem.date : d.toISOString().split("T")[0];
  })();
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": title,
    "datePublished": isoDate,
    "dateModified": isoDate,
    "description": seoDescription,
    "image": newsItem.mainImageJpg || newsItem.mainImageWebp,
    "author": {
      "@type": "Organization",
      "name": "European Arbitration Chamber"
    },
    "publisher": {
      "@type": "Organization",
      "name": "European Arbitration Chamber",
      "url": "https://chea-taic.be",
      "logo": {
        "@type": "ImageObject",
        "url": "https://chea-taic.be/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": typeof window !== "undefined" ? window.location.href : ""
    }
  };
  const formatDescription = (html) => {
    const transformed = html.replace(/\n\n/g, "</p><p>").replace(/\n/g, "<br/>").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\*(.*?)\*/g, "<em>$1</em>");
    if (typeof window === "undefined") {
      return { __html: transformed };
    }
    return {
      __html: DOMPurify.sanitize(transformed, {
        ALLOWED_TAGS: ["p", "br", "strong", "em", "b", "i", "ul", "ol", "li", "h1", "h2", "h3", "h4", "a"],
        ALLOWED_ATTR: ["href", "target", "rel"]
      })
    };
  };
  const handleImageClick = (src) => setSelectedImage(src);
  const closeImagePopup = () => setSelectedImage(null);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      Seo,
      {
        title: seoTitle,
        description: seoDescription,
        image: newsItem.mainImageJpg || newsItem.mainImageWebp,
        lang: language,
        ogType: "article",
        structuredData
      }
    ),
    /* @__PURE__ */ jsxs(Layout, { children: [
      /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 py-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto", children: [
        /* @__PURE__ */ jsx(Button, { variant: "ghost", className: "mb-6", asChild: true, children: /* @__PURE__ */ jsxs(Link, { to: "/eac/news", children: [
          /* @__PURE__ */ jsx(ArrowLeft, { className: "mr-2 h-4 w-4" }),
          t("common.backToNews")
        ] }) }),
        /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold mb-4", children: title }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center text-sm text-muted-foreground mb-6", children: [
          /* @__PURE__ */ jsx(CalendarIcon, { className: "mr-2 h-4 w-4" }),
          newsItem.date
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row gap-6 mb-8", children: [
          (newsItem.mainImageWebp || newsItem.mainImageJpg) && /* @__PURE__ */ jsx("div", { className: "md:w-[300px] flex-shrink-0", children: /* @__PURE__ */ jsxs("picture", { children: [
            newsItem.mainImageWebp && /* @__PURE__ */ jsx("source", { srcSet: newsItem.mainImageWebp, type: "image/webp" }),
            /* @__PURE__ */ jsx(
              "img",
              {
                src: newsItem.mainImageJpg,
                alt: title,
                className: "w-full rounded-lg cursor-pointer hover:opacity-90 transition-opacity",
                onClick: () => handleImageClick(newsItem.mainImageJpg || newsItem.mainImageWebp)
              }
            )
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "flex-grow prose prose-lg max-w-none", children: /* @__PURE__ */ jsx(
            "div",
            {
              className: "news-content",
              dangerouslySetInnerHTML: formatDescription(description)
            }
          ) })
        ] }),
        ((_a = newsItem.images) == null ? void 0 : _a.length) > 0 && /* @__PURE__ */ jsxs("div", { className: "mt-8", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-4", children: t("common.gallery") || "Gallery" }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: newsItem.images.map((image, index) => /* @__PURE__ */ jsx("div", { className: "w-full", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: image,
              alt: `${title} - image ${index + 1}`,
              className: "w-full rounded-lg cursor-pointer hover:opacity-90 transition-opacity",
              onClick: () => handleImageClick(image)
            }
          ) }, index)) })
        ] }),
        (() => {
          const idx = newsItems.findIndex((n) => n.id === id);
          const prev = idx > 0 ? newsItems[idx - 1] : null;
          const next = idx >= 0 && idx < newsItems.length - 1 ? newsItems[idx + 1] : null;
          const related = newsItems.filter((n) => n.id !== id).slice(Math.max(0, idx - 3), Math.max(0, idx - 3) + 6).filter((n) => n.id !== id).slice(0, 6);
          return /* @__PURE__ */ jsxs("nav", { "aria-label": "More news", className: "mt-12 border-t pt-8", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row justify-between gap-4 mb-8", children: [
              prev ? /* @__PURE__ */ jsxs(Link, { to: `/eac/news/${prev.id}`, className: "group flex-1 text-left", children: [
                /* @__PURE__ */ jsxs("div", { className: "text-xs uppercase text-muted-foreground", children: [
                  "← ",
                  t("common.previous") || "Previous"
                ] }),
                /* @__PURE__ */ jsx("div", { className: "font-medium group-hover:underline", children: pickText(prev.title, language) })
              ] }) : /* @__PURE__ */ jsx("div", { className: "flex-1" }),
              next ? /* @__PURE__ */ jsxs(Link, { to: `/eac/news/${next.id}`, className: "group flex-1 text-right", children: [
                /* @__PURE__ */ jsxs("div", { className: "text-xs uppercase text-muted-foreground", children: [
                  t("common.next") || "Next",
                  " →"
                ] }),
                /* @__PURE__ */ jsx("div", { className: "font-medium group-hover:underline", children: pickText(next.title, language) })
              ] }) : /* @__PURE__ */ jsx("div", { className: "flex-1" })
            ] }),
            related.length > 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-4", children: t("common.relatedNews") || "Related news" }),
              /* @__PURE__ */ jsx("ul", { className: "grid grid-cols-1 md:grid-cols-2 gap-3", children: related.map((n) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(Link, { to: `/eac/news/${n.id}`, className: "block p-3 rounded border hover:bg-muted transition-colors", children: [
                /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: n.date }),
                /* @__PURE__ */ jsx("div", { className: "font-medium", children: pickText(n.title, language) })
              ] }) }, n.id)) })
            ] })
          ] });
        })()
      ] }) }),
      selectedImage && /* @__PURE__ */ jsx(
        "div",
        {
          className: "fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4",
          onClick: closeImagePopup,
          children: /* @__PURE__ */ jsxs("div", { className: "relative max-w-4xl max-h-[90vh] w-full", children: [
            /* @__PURE__ */ jsx(
              Button,
              {
                variant: "ghost",
                size: "icon",
                className: "absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white rounded-full z-10",
                onClick: (e) => {
                  e.stopPropagation();
                  closeImagePopup();
                },
                children: /* @__PURE__ */ jsx(X, { className: "h-6 w-6" })
              }
            ),
            /* @__PURE__ */ jsx(
              "img",
              {
                src: selectedImage,
                alt: "Enlarged view",
                className: "max-h-[90vh] max-w-full mx-auto object-contain"
              }
            )
          ] })
        }
      )
    ] })
  ] });
};
export {
  NewsDetail as default
};
