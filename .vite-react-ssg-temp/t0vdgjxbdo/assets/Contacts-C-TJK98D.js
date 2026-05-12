import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { MapPin, Phone, Mail } from "lucide-react";
import { u as useLanguage, S as Seo, L as Layout } from "../main.mjs";
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
import "dompurify";
const InfoBlock = ({
  icon,
  title,
  children
}) => /* @__PURE__ */ jsxs("div", { className: "flex gap-4 items-start", children: [
  /* @__PURE__ */ jsx("div", { className: "rounded-full bg-eac-light p-3 flex-shrink-0 text-eac-primary", children: icon }),
  /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h3", { className: "font-medium text-eac-dark mb-1", children: title }),
    children
  ] })
] });
const Contacts = () => {
  const { language, t } = useLanguage();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      Seo,
      {
        title: t("seo.contacts.title"),
        description: t("seo.contacts.description"),
        lang: language
      }
    ),
    /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 py-8", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl md:text-4xl font-bold mb-6 text-eac-dark border-b pb-3", children: t("contacts.title") || "Contact Us" }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-8 mb-12", children: /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mb-4 text-eac-primary", children: t("contacts.information") || "Address and Email" }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white shadow border rounded-lg p-6 space-y-6", children: [
          /* @__PURE__ */ jsxs(
            InfoBlock,
            {
              icon: /* @__PURE__ */ jsx(MapPin, { className: "h-5 w-5" }),
              title: t("contacts.addressTitle") || "Address",
              children: [
                /* @__PURE__ */ jsx("p", { className: "text-eac-medium", children: t("contacts.addressName") }),
                /* @__PURE__ */ jsx("p", { className: "text-eac-medium", children: t("contacts.address") })
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            InfoBlock,
            {
              icon: /* @__PURE__ */ jsx(Phone, { className: "h-5 w-5" }),
              title: t("contacts.phone") || "Phone",
              children: /* @__PURE__ */ jsx("p", { className: "text-eac-medium", children: "+32 2 808 77 54" })
            }
          ),
          /* @__PURE__ */ jsx(
            InfoBlock,
            {
              icon: /* @__PURE__ */ jsx(Mail, { className: "h-5 w-5" }),
              title: t("contacts.email") || "Email",
              children: /* @__PURE__ */ jsx(
                "a",
                {
                  href: "mailto:secretary@chea-taic.be",
                  className: "text-eac-primary hover:underline",
                  children: "secretary@chea-taic.be"
                }
              )
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-8", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mb-4 text-eac-primary", children: t("contacts.location") || "Our location" }),
          /* @__PURE__ */ jsx("div", { className: "rounded-lg overflow-hidden border border-gray-200 h-[300px]", children: /* @__PURE__ */ jsx(
            "iframe",
            {
              src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2520.0920777766437!2d4.359548512794117!3d50.82945835988326!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3c48b86f05b99%3A0x63064fa3e427c2ba!2sAv.%20Louise%20146%2C%201050%20Bruxelles%2C%20Belgium!5e0!3m2!1sen!2sua!4v1743694026562!5m2!1sen!2sua",
              width: "100%",
              height: "100%",
              style: { border: 0 },
              allowFullScreen: true,
              loading: "lazy",
              referrerPolicy: "no-referrer-when-downgrade",
              title: "EAC Location"
            }
          ) })
        ] })
      ] }) })
    ] }) })
  ] });
};
export {
  Contacts as default
};
