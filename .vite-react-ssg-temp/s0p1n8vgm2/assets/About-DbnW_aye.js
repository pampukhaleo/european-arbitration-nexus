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
const About = () => {
  const { language, t } = useLanguage();
  const renderKeyArea = (key) => {
    const [title, description] = t(key).split("–");
    return /* @__PURE__ */ jsxs("li", { className: "mt-2", children: [
      /* @__PURE__ */ jsx("strong", { children: title.trim() }),
      " – ",
      description.trim()
    ] });
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      Seo,
      {
        title: t("seo.eac.title"),
        description: t("seo.eac.description"),
        lang: language
      }
    ),
    /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsxs("div", { className: "py-6", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold mb-6 text-eac-dark uppercase text-left", children: t("aboutEAC.title") }),
      /* @__PURE__ */ jsxs("div", { className: "prose max-w-none text-lg text-gray-600", children: [
        /* @__PURE__ */ jsx("p", { className: "mb-4", children: t("aboutEAC.intro") }),
        /* @__PURE__ */ jsx("p", { className: "mb-4", children: t("aboutEAC.missionText") }),
        /* @__PURE__ */ jsx("p", { className: "mb-4", children: t("aboutEAC.historyText") }),
        /* @__PURE__ */ jsx("p", { className: "mb-4", children: t("aboutEAC.representativesText") }),
        /* @__PURE__ */ jsx("h3", { className: "text-left", children: t("aboutEAC.keyAreasTitle") }),
        /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-6", children: [
          renderKeyArea("aboutEAC.keyAreas.commercial"),
          renderKeyArea("aboutEAC.keyAreas.judicial"),
          renderKeyArea("aboutEAC.keyAreas.education")
        ] })
      ] })
    ] }) })
  ] });
};
export {
  About as default
};
