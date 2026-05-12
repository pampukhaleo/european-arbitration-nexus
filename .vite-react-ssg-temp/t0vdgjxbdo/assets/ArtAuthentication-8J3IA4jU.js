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
const ArtAuthentication = () => {
  const { language, t } = useLanguage();
  const processList = t("artExpertise.authentication.processList");
  const importanceList = t("artExpertise.authentication.importanceList");
  const renderList = (items) => /* @__PURE__ */ jsx("ul", { className: "list-disc pl-6 mb-6 text-lg text-gray-600", children: items.map((item, idx) => /* @__PURE__ */ jsx("li", { className: "mt-2", children: item }, idx)) });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      Seo,
      {
        title: t("seo.authentication.title"),
        description: t("seo.authentication.description"),
        lang: language
      }
    ),
    /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsxs("div", { className: "py-6", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold mb-6 text-eac-dark uppercase text-left", children: t("artExpertise.authentication.title") }),
      /* @__PURE__ */ jsxs("div", { className: "prose max-w-none", children: [
        /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-600 mb-4", children: t("artExpertise.authentication.p1") }),
        /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-600 mb-6", children: t("artExpertise.authentication.p2") }),
        /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-600 font-bold mb-2", children: t("artExpertise.authentication.processTitle") }),
        renderList(processList),
        /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-600 font-bold mb-2", children: t("artExpertise.authentication.importanceTitle") }),
        renderList(importanceList),
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-2", children: t("artExpertise.authentication.certificateTitle") }),
        /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-600 mb-4", children: t("artExpertise.authentication.certificateText") }),
        /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-600", children: t("artExpertise.authentication.closingText") })
      ] })
    ] }) })
  ] });
};
export {
  ArtAuthentication as default
};
