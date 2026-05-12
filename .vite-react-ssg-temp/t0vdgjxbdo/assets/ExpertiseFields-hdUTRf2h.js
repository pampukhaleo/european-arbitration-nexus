import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { u as useLanguage, S as Seo, L as Layout } from "../main.mjs";
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
import "dompurify";
const ExpertiseFields = () => {
  const { language, t } = useLanguage();
  const areas = t("expertise.fields.areas");
  const providedFor = t("expertise.fields.providedFor");
  const renderList = (items) => /* @__PURE__ */ jsx("ul", { className: "list-disc pl-6 mb-6 text-lg text-gray-600", children: items.map((item, idx) => /* @__PURE__ */ jsx("li", { className: "mt-2", children: item }, idx)) });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      Seo,
      {
        title: t("seo.areas.title"),
        description: t("seo.areas.description"),
        lang: language
      }
    ),
    /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsxs("div", { className: "py-6", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold mb-6 text-eac-dark uppercase text-left", children: t("expertise.fields.title") }),
      /* @__PURE__ */ jsxs("div", { className: "prose max-w-none", children: [
        /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-600 mb-6", children: t("expertise.fields.description1") }),
        renderList(areas),
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-4 text-eac-dark text-left", children: t("expertise.fields.subtitle") }),
        renderList(providedFor),
        /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-600", children: t("expertise.fields.finalNote") })
      ] })
    ] }) })
  ] });
};
export {
  ExpertiseFields as default
};
