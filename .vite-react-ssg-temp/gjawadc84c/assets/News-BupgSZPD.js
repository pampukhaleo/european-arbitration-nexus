import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { u as useLanguage, S as Seo, L as Layout, o as newsItems, N as NewsItem } from "../main.mjs";
import "vite-react-ssg";
import "react";
import "react-router-dom";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "lucide-react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@supabase/supabase-js";
import "@radix-ui/react-toast";
import "@radix-ui/react-dialog";
import "@tanstack/react-query";
const News = () => {
  const { language, t } = useLanguage();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      Seo,
      {
        title: t("seo.news.title"),
        description: t("seo.news.description"),
        lang: language
      }
    ),
    /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 py-12", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold mb-8 text-eac-dark uppercase", children: t("home.latestNews") }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-col space-y-8", children: newsItems.map((item) => /* @__PURE__ */ jsx(
        NewsItem,
        {
          id: item.id,
          title: item.title,
          date: item.date,
          description: item.description,
          mainImageJpg: item.mainImageJpg,
          mainImageWebp: item.mainImageWebp,
          images: item.images,
          useInlineLayout: true
        },
        item.id
      )) })
    ] }) })
  ] });
};
export {
  News as default
};
