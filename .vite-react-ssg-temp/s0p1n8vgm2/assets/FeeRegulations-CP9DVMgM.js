import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { u as useLanguage, S as Seo, L as Layout, B as Button } from "../main.mjs";
import { Download } from "lucide-react";
import "vite-react-ssg";
import "react";
import "react-router-dom";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@supabase/supabase-js";
import "@radix-ui/react-toast";
import "@radix-ui/react-dialog";
import "@tanstack/react-query";
const FEES_PDFS = {
  en: "/icac-arbitration-costs-2020-11-11-en.pdf",
  ru: "/icac-arbitration-costs-2020-11-11-ru.pdf"
};
const FeeRegulations = () => {
  const { language, t } = useLanguage();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Seo, { title: t("seo.fees.title"), description: t("seo.fees.description"), lang: language }),
    /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsxs("div", { className: "py-6", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold mb-6 text-eac-dark uppercase", children: t("arbitration.fees.title") }),
      /* @__PURE__ */ jsxs("div", { className: "prose max-w-none", children: [
        /* @__PURE__ */ jsx("p", { className: "mb-6 text-lg text-gray-600", children: t("arbitration.fees.description") }),
        /* @__PURE__ */ jsxs("div", { className: "my-8", children: [
          /* @__PURE__ */ jsx("p", { className: "text-lg font-medium mb-4", children: t("arbitration.fees.downloadLabel") }),
          /* @__PURE__ */ jsx(Button, { variant: "default", className: "rounded-full px-6 py-3 w-full sm:w-auto text-center", asChild: true, children: /* @__PURE__ */ jsxs(
            "a",
            {
              href: FEES_PDFS.en,
              download: true,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "text-center whitespace-normal break-words w-full h-full",
              children: [
                /* @__PURE__ */ jsx(Download, { size: 18 }),
                /* @__PURE__ */ jsx("span", { className: "whitespace-normal break-words", children: t("arbitration.fees.englishBtn") })
              ]
            }
          ) }),
          /* @__PURE__ */ jsx("p", { className: "text-lg font-medium mb-4 mt-8", children: t("arbitration.fees.translationLabel") }),
          /* @__PURE__ */ jsx(Button, { variant: "default", className: "rounded-full px-6 py-3 w-full sm:w-auto text-center", asChild: true, children: /* @__PURE__ */ jsxs(
            "a",
            {
              href: FEES_PDFS.ru,
              download: true,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "text-center whitespace-normal break-words w-full h-full",
              children: [
                /* @__PURE__ */ jsx(Download, { size: 18 }),
                /* @__PURE__ */ jsx("span", { className: "whitespace-normal break-words", children: t("arbitration.fees.russianBtn") })
              ]
            }
          ) })
        ] })
      ] })
    ] }) })
  ] });
};
export {
  FeeRegulations as default
};
