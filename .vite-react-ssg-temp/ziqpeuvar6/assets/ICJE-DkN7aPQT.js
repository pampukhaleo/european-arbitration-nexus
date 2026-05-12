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
const ICJE = () => {
  const { language, t } = useLanguage();
  const bullets = t("expertise.icje.description2.examinations");
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Seo, { title: t("seo.icje.title"), description: t("seo.icje.description"), lang: language }),
    /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsxs("div", { className: "py-6", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold mb-6 text-eac-dark uppercase text-left", children: t("expertise.icje.title") }),
      /* @__PURE__ */ jsxs("div", { className: "prose max-w-none", children: [
        /* @__PURE__ */ jsx("p", { className: "mb-6 text-lg text-gray-600", children: t("expertise.icje.description1") }),
        /* @__PURE__ */ jsx("p", { className: "mb-6 text-lg text-gray-600 font-bold", children: t("expertise.icje.description2.text") }),
        /* @__PURE__ */ jsx("ul", { className: "list-disc ml-5 mb-6", children: bullets.map((area, idx) => /* @__PURE__ */ jsx("li", { className: "ml-5 mt-2", children: area }, idx)) }),
        /* @__PURE__ */ jsx("p", { className: "mb-6 text-lg text-gray-600", children: t("expertise.icje.description2.footer") })
      ] })
    ] }) })
  ] });
};
export {
  ICJE as default
};
