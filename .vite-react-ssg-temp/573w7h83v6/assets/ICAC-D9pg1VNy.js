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
const ICAC = () => {
  const { language, t } = useLanguage();
  const competenceKeys = [
    "sale",
    "services",
    "exchange",
    "finance",
    "insurance"
  ];
  const featureKeys = [
    "multinational",
    "principles",
    "flexibility",
    "tech",
    "timing",
    "finality"
  ];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      Seo,
      {
        title: t("seo.icac.title"),
        description: t("seo.icac.description"),
        lang: language
      }
    ),
    /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsxs("div", { className: "py-6", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold mb-6 text-eac-dark uppercase text-left", children: t("arbitration.icac.title") }),
      /* @__PURE__ */ jsxs("div", { className: "prose max-w-none text-lg text-gray-600", children: [
        /* @__PURE__ */ jsx("p", { children: t("arbitration.icac.intro") }),
        /* @__PURE__ */ jsx("p", { children: t("arbitration.icac.secretariat") }),
        /* @__PURE__ */ jsx("p", { className: "font-semibold text-eac-dark", children: t("arbitration.icac.competenceTitle") }),
        /* @__PURE__ */ jsx("ul", { className: "list-disc pl-6", children: competenceKeys.map((key) => /* @__PURE__ */ jsx("li", { className: "mt-2", children: t(`arbitration.icac.competenceList.${key}`) }, key)) }),
        /* @__PURE__ */ jsx("h3", { className: "text-2xl font-semibold text-eac-dark text-left mt-8", children: t("arbitration.icac.featuresTitle") }),
        featureKeys.map((key) => /* @__PURE__ */ jsxs("div", { className: "mt-6", children: [
          /* @__PURE__ */ jsx("p", { className: "font-semibold text-eac-dark text-left", children: t(`arbitration.icac.features.${key}Title`) }),
          /* @__PURE__ */ jsx("ul", { className: "list-disc pl-6", children: /* @__PURE__ */ jsx("li", { className: "mt-2", children: t(`arbitration.icac.features.${key}Desc`) }) })
        ] }, key))
      ] })
    ] }) })
  ] });
};
export {
  ICAC as default
};
