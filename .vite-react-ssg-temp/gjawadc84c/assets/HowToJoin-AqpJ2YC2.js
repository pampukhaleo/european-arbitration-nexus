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
const HowToJoin = () => {
  const { language, t } = useLanguage();
  const steps = t("membership.join.steps");
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Seo, { title: t("seo.join.title"), description: t("seo.join.description"), lang: language }),
    /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsxs("div", { className: "py-6", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold mb-6 text-eac-dark uppercase text-left", children: t("membership.join.title") }),
      /* @__PURE__ */ jsxs("div", { className: "prose max-w-none", children: [
        /* @__PURE__ */ jsx("p", { className: "mb-4 text-lg text-gray-600", children: t("membership.join.description") }),
        /* @__PURE__ */ jsx("ul", { className: "mb-4 text-lg text-gray-600 list-disc pl-5", children: steps.map((step, idx) => /* @__PURE__ */ jsxs("li", { className: "ml-5 mt-2", children: [
          /* @__PURE__ */ jsx("b", { children: step.title }),
          " – ",
          step.description
        ] }, idx)) }),
        /* @__PURE__ */ jsx("p", { className: "mb-4 text-lg text-gray-600", children: t("membership.join.fee") }),
        /* @__PURE__ */ jsxs("p", { className: "mb-4 text-lg text-gray-600", children: [
          t("membership.join.formPrompt"),
          /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("a", { href: t("membership.join.formLink"), children: t("membership.join.formLink") }) })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mb-4 text-lg text-gray-600", children: t("membership.join.followUp") })
      ] })
    ] }) })
  ] });
};
export {
  HowToJoin as default
};
