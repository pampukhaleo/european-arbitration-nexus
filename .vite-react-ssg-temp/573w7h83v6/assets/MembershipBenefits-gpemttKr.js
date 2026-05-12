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
const MembershipBenefits = () => {
  const { language, t } = useLanguage();
  const reasons = t("membership.benefits.reasons");
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Seo, { title: t("seo.benefits.title"), description: t("seo.benefits.description"), lang: language }),
    /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsxs("div", { className: "py-6", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold mb-6 text-eac-dark uppercase text-left", children: t("membership.benefits.title") }),
      /* @__PURE__ */ jsx("ul", { className: "mb-4 text-lg text-gray-600 list-disc pl-5", children: reasons.map((reason, idx) => /* @__PURE__ */ jsxs("li", { className: "ml-5 mt-2", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold", children: reason.title }),
        reason.description
      ] }, idx)) })
    ] }) })
  ] });
};
export {
  MembershipBenefits as default
};
