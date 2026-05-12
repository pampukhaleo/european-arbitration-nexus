import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { u as useLanguage, S as Seo, L as Layout, B as Button, d as Link } from "../main.mjs";
import "vite-react-ssg";
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
const NotFound = () => {
  const location = useLocation();
  const { language } = useLanguage();
  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      Seo,
      {
        title: "Page Not Found | European Arbitration Chamber",
        description: "The page you are looking for could not be found. Return to the European Arbitration Chamber homepage.",
        lang: language,
        robots: "noindex, nofollow"
      }
    ),
    /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsx("div", { className: "min-h-[60vh] flex items-center justify-center bg-gray-50 py-20", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-6xl font-bold text-eac-primary mb-4", children: "404" }),
      /* @__PURE__ */ jsx("p", { className: "text-xl text-gray-600 mb-8", children: "Oops! The page you are looking for does not exist." }),
      /* @__PURE__ */ jsx(Button, { asChild: true, className: "bg-eac-primary hover:bg-eac-primary/90 rounded-full", children: /* @__PURE__ */ jsx(Link, { to: "/", children: "Return to Home" }) })
    ] }) }) })
  ] });
};
export {
  NotFound as default
};
