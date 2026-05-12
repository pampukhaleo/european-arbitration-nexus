import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { c as cn, u as useLanguage, a as useAuth, b as useUserRole, s as supabase, S as Seo, L as Layout, d as Link, B as Button, C as Card, e as CardHeader, f as CardTitle, g as CardContent } from "../main.mjs";
import { I as Input } from "./input-6XZgwDxx.js";
import { Loader2, Settings, Plus, QrCode, LogOut, LogIn, Search } from "lucide-react";
import { B as BreadcrumbSeo } from "./BreadcrumbSeo-B43utRgx.js";
import "vite-react-ssg";
import "react-router-dom";
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
import "dompurify";
function Skeleton({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn("animate-pulse rounded-md bg-muted", className),
      ...props
    }
  );
}
const Gallery = () => {
  const { language, t } = useLanguage();
  const { user, signOut } = useAuth();
  const { role, isAdmin, isOwner } = useUserRole();
  const [paintings, setPaintings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  useEffect(() => {
    fetchPaintings();
  }, []);
  const fetchPaintings = async () => {
    try {
      const { data, error } = await supabase.from("public_paintings").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      setPaintings(data || []);
    } catch (error) {
      console.error("Error fetching paintings:", error);
    } finally {
      setLoading(false);
    }
  };
  const getLocalizedText = (item, field) => {
    return item[`${field}_${language}`] || item[`${field}_en`];
  };
  const filteredPaintings = paintings.filter((painting) => {
    var _a;
    const title = getLocalizedText(painting, "title").toLowerCase();
    const artist = getLocalizedText(painting, "artist").toLowerCase();
    const matchesSearch = title.includes(searchTerm.toLowerCase()) || artist.includes(searchTerm.toLowerCase());
    const matchesYear = !yearFilter || ((_a = painting.year) == null ? void 0 : _a.toString()) === yearFilter;
    return matchesSearch && matchesYear;
  });
  const availableYears = [...new Set(paintings.map((p) => p.year).filter(Boolean))].sort((a, b) => b - a);
  if (loading) {
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        Seo,
        {
          title: "Art Gallery | European Arbitration Chamber",
          description: "Explore authenticated artworks with expert analysis and detailed documentation from the European Arbitration Chamber's collection.",
          lang: language
        }
      ),
      /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 py-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold mb-4", children: t("gallery.title") }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-2 text-muted-foreground", children: [
            /* @__PURE__ */ jsx(Loader2, { className: "h-5 w-5 animate-spin", "aria-label": t("common.loading") }),
            /* @__PURE__ */ jsx("span", { children: t("common.loading") })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6", children: Array.from({ length: 8 }).map((_, i) => /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-border overflow-hidden", children: [
          /* @__PURE__ */ jsx(Skeleton, { className: "aspect-square w-full" }),
          /* @__PURE__ */ jsxs("div", { className: "p-4 space-y-2", children: [
            /* @__PURE__ */ jsx(Skeleton, { className: "h-5 w-3/4" }),
            /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-1/2" })
          ] })
        ] }, i)) })
      ] }) })
    ] });
  }
  const breadcrumbItems = [
    { name: t("home.title"), url: "/" },
    { name: t("gallery.title"), url: "/gallery" }
  ];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      Seo,
      {
        title: "Art Gallery | European Arbitration Chamber",
        description: "Explore authenticated artworks with expert analysis and detailed documentation from the European Arbitration Chamber's collection.",
        lang: language,
        structuredData: {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Art Gallery",
          "description": "Explore authenticated artworks with expert analysis and detailed documentation from the European Arbitration Chamber's collection.",
          "url": `${window.location.origin}/gallery`,
          "mainEntity": {
            "@type": "ItemList",
            "numberOfItems": filteredPaintings.length,
            "itemListElement": filteredPaintings.slice(0, 10).map((painting, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "name": getLocalizedText(painting, "title"),
              "url": `${window.location.origin}/gallery/${painting.id}`,
              "image": painting.public_image_url
            }))
          }
        }
      }
    ),
    /* @__PURE__ */ jsx(BreadcrumbSeo, { items: breadcrumbItems }),
    /* @__PURE__ */ jsxs(Layout, { children: [
      /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-2 ml-4", children: user ? /* @__PURE__ */ jsxs(Fragment, { children: [
        isAdmin && /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsx(Link, { to: "/admin/dashboard", children: /* @__PURE__ */ jsxs(Button, { variant: "default", size: "sm", children: [
            /* @__PURE__ */ jsx(Settings, { className: "h-4 w-4 mr-2" }),
            "Admin Dashboard"
          ] }) }),
          /* @__PURE__ */ jsx(Link, { to: "/gallery/manage/add", children: /* @__PURE__ */ jsxs(Button, { variant: "outline", size: "sm", children: [
            /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4 mr-2" }),
            "Add Painting"
          ] }) })
        ] }),
        (isOwner || isAdmin) && /* @__PURE__ */ jsx(Link, { to: "/gallery/manage", children: /* @__PURE__ */ jsxs(Button, { variant: "outline", size: "sm", children: [
          /* @__PURE__ */ jsx(QrCode, { className: "h-4 w-4 mr-2" }),
          isAdmin ? "Gallery Management" : "Manage QR Codes"
        ] }) }),
        /* @__PURE__ */ jsxs(
          Button,
          {
            variant: "ghost",
            size: "sm",
            onClick: signOut,
            children: [
              /* @__PURE__ */ jsx(LogOut, { className: "h-4 w-4 mr-2" }),
              "Sign Out"
            ]
          }
        )
      ] }) : /* @__PURE__ */ jsx(Link, { to: "/auth", children: /* @__PURE__ */ jsxs(Button, { variant: "outline", size: "sm", children: [
        /* @__PURE__ */ jsx(LogIn, { className: "h-4 w-4 mr-2" }),
        "Owner Login"
      ] }) }) }),
      /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 py-8", children: [
        /* @__PURE__ */ jsx("div", { className: "text-center mb-12", children: /* @__PURE__ */ jsx("div", { className: "flex justify-between items-start mb-4", children: /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold mb-4", children: t("gallery.title") }),
          /* @__PURE__ */ jsx("p", { className: "text-lg text-muted-foreground max-w-2xl mx-auto", children: t("gallery.description") })
        ] }) }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row gap-4 mb-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative flex-1", children: [
            /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                placeholder: t("gallery.searchPlaceholder"),
                value: searchTerm,
                onChange: (e) => setSearchTerm(e.target.value),
                className: "pl-10"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxs(
              "select",
              {
                value: yearFilter,
                onChange: (e) => setYearFilter(e.target.value),
                className: "px-3 py-2 border rounded-md bg-background",
                children: [
                  /* @__PURE__ */ jsx("option", { value: "", children: t("gallery.allYears") }),
                  availableYears.map((year) => /* @__PURE__ */ jsx("option", { value: year, children: year }, year))
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              Button,
              {
                variant: "outline",
                onClick: () => {
                  setSearchTerm("");
                  setYearFilter("");
                },
                children: t("gallery.clearFilters")
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6", children: filteredPaintings.map((painting) => /* @__PURE__ */ jsx(Link, { to: `/gallery/${painting.id}`, children: /* @__PURE__ */ jsxs(Card, { className: "hover:shadow-lg transition-shadow cursor-pointer h-full", children: [
          /* @__PURE__ */ jsx("div", { className: "aspect-square overflow-hidden rounded-t-lg select-none", children: painting.public_image_url ? /* @__PURE__ */ jsx(
            "img",
            {
              src: painting.public_image_url,
              alt: getLocalizedText(painting, "title"),
              className: "w-full h-full object-contain bg-muted hover:scale-105 transition-transform duration-300 select-none pointer-events-none",
              loading: "lazy",
              decoding: "async",
              draggable: "false",
              onContextMenu: (e) => e.preventDefault(),
              onDragStart: (e) => e.preventDefault()
            }
          ) : /* @__PURE__ */ jsx("div", { className: "w-full h-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: t("gallery.noImage") }) }) }),
          /* @__PURE__ */ jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsx(CardTitle, { className: "text-lg line-clamp-2", children: getLocalizedText(painting, "title") }) }),
          /* @__PURE__ */ jsxs(CardContent, { className: "pt-0", children: [
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm mb-1", children: getLocalizedText(painting, "artist") }),
            painting.year && /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-xs", children: painting.year })
          ] })
        ] }) }, painting.id)) }),
        filteredPaintings.length === 0 && /* @__PURE__ */ jsx("div", { className: "text-center py-12", children: /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-lg", children: searchTerm || yearFilter ? t("gallery.noResults") : t("gallery.noPaintings") }) })
      ] })
    ] })
  ] });
};
export {
  Gallery as default
};
