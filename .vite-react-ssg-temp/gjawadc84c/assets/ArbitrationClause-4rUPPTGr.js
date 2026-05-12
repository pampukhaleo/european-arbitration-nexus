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
const ArbitrationClause = () => {
  const { language, t } = useLanguage();
  const renderClauseBlock = (section) => {
    return /* @__PURE__ */ jsxs("section", { className: "mb-12", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-4 text-eac-dark", children: t(`arbitration.clause.${section}.title`) }),
      /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-600 mb-4", children: t(`arbitration.clause.${section}.description`) }),
      /* @__PURE__ */ jsx("div", { className: "bg-gray-50 p-6 rounded-lg border border-gray-200 my-6", children: Array.from({ length: 5 }, (_, i) => /* @__PURE__ */ jsx(
        "p",
        {
          className: `text-gray-800 ${i < 4 ? "mb-4" : ""}`,
          children: t(`arbitration.clause.${section}.clause${i + 1}`)
        },
        i
      )) }),
      /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-600", children: t(`arbitration.clause.${section}.note`) })
    ] });
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      Seo,
      {
        title: t("seo.clause.title"),
        description: t("seo.clause.description"),
        lang: language
      }
    ),
    /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 py-12", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold mb-8 text-eac-dark uppercase", children: t("arbitration.clause.title") }),
      /* @__PURE__ */ jsxs("div", { className: "prose max-w-none", children: [
        renderClauseBlock("future"),
        renderClauseBlock("existing")
      ] })
    ] }) })
  ] });
};
export {
  ArbitrationClause as default
};
