import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { c as cn, u as useLanguage, S as Seo, L as Layout } from "../main.mjs";
import * as React from "react";
import { useState } from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import "vite-react-ssg";
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
import "@tanstack/react-query";
import "dompurify";
const Dialog = SheetPrimitive.Root;
const DialogPortal = SheetPrimitive.Portal;
const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SheetPrimitive.Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = SheetPrimitive.Overlay.displayName;
const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxs(
    SheetPrimitive.Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxs(SheetPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = SheetPrimitive.Content.displayName;
const DialogHeader = ({
  className,
  ...props
}) => /* @__PURE__ */ jsx(
  "div",
  {
    className: cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    ),
    ...props
  }
);
DialogHeader.displayName = "DialogHeader";
const DialogTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SheetPrimitive.Title,
  {
    ref,
    className: cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    ),
    ...props
  }
));
DialogTitle.displayName = SheetPrimitive.Title.displayName;
const DialogDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SheetPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = SheetPrimitive.Description.displayName;
function CouncilMember({ name, position, description, imageJpg, imageWebp }) {
  const [open, setOpen] = useState(false);
  const initials = name.split(" ").map((n) => n[0]).join("");
  const renderAvatar = (size) => /* @__PURE__ */ jsx("div", { className: `aspect-[3/4] ${size} rounded-lg overflow-hidden bg-transparent`, children: imageWebp || imageJpg ? /* @__PURE__ */ jsxs("picture", { children: [
    imageWebp && /* @__PURE__ */ jsx("source", { srcSet: imageWebp, type: "image/webp" }),
    /* @__PURE__ */ jsx(
      "img",
      {
        src: imageJpg,
        alt: name,
        loading: "lazy",
        decoding: "async",
        className: "w-full h-full object-contain object-top"
      }
    )
  ] }) : /* @__PURE__ */ jsx("div", { className: "w-full h-full flex items-center justify-center text-4xl bg-eac-light text-eac-primary", children: initials }) });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "border border-border rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer bg-card",
        onClick: () => setOpen(true),
        children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row", children: [
          /* @__PURE__ */ jsx("div", { className: "md:w-1/3 lg:w-1/4 flex justify-center p-4", children: renderAvatar("w-full max-w-[160px]") }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 p-6", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold text-eac-dark", children: name }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-eac-gray mt-1", children: position }),
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mt-3 line-clamp-3", children: description })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsx(Dialog, { open, onOpenChange: setOpen, children: /* @__PURE__ */ jsxs(DialogContent, { className: "w-[90vw] max-w-md sm:max-w-2xl", children: [
      /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(DialogTitle, { className: "text-2xl font-bold text-eac-primary", children: name }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-6 items-center", children: [
        renderAvatar("w-60"),
        /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold text-eac-dark mb-2", children: position }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground whitespace-pre-wrap", children: description })
        ] })
      ] })
    ] }) })
  ] });
}
const COUNCIL_MEMBERS = [
  {
    key: "pampukha",
    imageJpg: `${"/"}images/council/pampukha.jpg`,
    imageWebp: `${"/"}images/council/pampukha.webp`
  },
  {
    key: "moja",
    imageJpg: `${"/"}images/council/moja.jpg`,
    imageWebp: `${"/"}images/council/moja.webp`
  },
  {
    key: "marcinkowski",
    imageJpg: `${"/"}images/council/MARCINKOWSKI.jpg`,
    imageWebp: `${"/"}images/council/MARCINKOWSKI.webp`
  },
  {
    key: "billiet",
    imageJpg: `${"/"}images/council/billiet.jpg`,
    imageWebp: `${"/"}images/council/billiet.webp`
  },
  {
    key: "laycock",
    imageJpg: `${"/"}images/council/LAYCOCK.jpg`,
    imageWebp: `${"/"}images/council/LAYCOCK.webp`
  }
];
const Council = () => {
  const { language, t } = useLanguage();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      Seo,
      {
        title: t("seo.council.title"),
        description: t("seo.council.description"),
        lang: language
      }
    ),
    /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 py-12", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold mb-8 text-eac-dark uppercase text-left", children: t("council.title") }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-col space-y-8", children: COUNCIL_MEMBERS.map(({ key, imageJpg, imageWebp }) => /* @__PURE__ */ jsx(
        CouncilMember,
        {
          name: t(`council.members.${key}.name`),
          position: t(`council.members.${key}.position`),
          description: t(`council.members.${key}.description`),
          imageJpg,
          imageWebp
        },
        key
      )) })
    ] }) })
  ] });
};
export {
  Council as default
};
