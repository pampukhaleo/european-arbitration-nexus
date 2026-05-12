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
const CodeOfConduct = () => {
  const { language, t } = useLanguage();
  const obligations = t("membership.code.obligations.list");
  const responsibilities = t("membership.code.responsibilities.list");
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Seo, { title: t("seo.conductCode.title"), description: t("seo.conductCode.description"), lang: language }),
    /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsxs("div", { className: "py-6", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold mb-6 text-eac-dark uppercase", children: t("membership.code.title") }),
      /* @__PURE__ */ jsxs("div", { className: "prose max-w-none", children: [
        /* @__PURE__ */ jsx("p", { className: "mb-4 text-lg text-gray-600", children: t("membership.code.intro") }),
        /* @__PURE__ */ jsx("h3", { className: "mb-4 text-lg", children: t("membership.code.obligations.title") }),
        /* @__PURE__ */ jsx("p", { className: "mb-4 text-lg text-gray-600", children: t("membership.code.obligations.description") }),
        /* @__PURE__ */ jsx("ul", { className: "mb-4 text-lg text-gray-600 list-disc pl-5", children: obligations.map((item, i) => /* @__PURE__ */ jsx("li", { className: "ml-5 mt-2", children: item }, i)) }),
        /* @__PURE__ */ jsx("h3", { className: "mb-4 text-lg", children: t("membership.code.responsibilities.title") }),
        /* @__PURE__ */ jsx("p", { className: "mb-4 text-lg text-gray-600", children: t("membership.code.responsibilities.description") }),
        /* @__PURE__ */ jsx("ul", { className: "mb-4 text-lg text-gray-600 list-disc pl-5", children: responsibilities.map((item, i) => /* @__PURE__ */ jsx("li", { className: "ml-5 mt-2", children: item }, i)) }),
        /* @__PURE__ */ jsx("h3", { className: "mb-4 text-lg", children: t("membership.code.sanctions.title") }),
        /* @__PURE__ */ jsx("p", { className: "mb-4 text-lg text-gray-600", children: t("membership.code.sanctions.description") })
      ] })
    ] }) })
  ] });
};
export {
  CodeOfConduct as default
};
