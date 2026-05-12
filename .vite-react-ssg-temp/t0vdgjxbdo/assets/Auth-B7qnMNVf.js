import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import * as React from "react";
import { useState, useEffect } from "react";
import { c as cn, i as useLocalizedNavigate, a as useAuth, u as useLanguage, S as Seo, L as Layout, C as Card, e as CardHeader, f as CardTitle, h as CardDescription, g as CardContent, B as Button } from "../main.mjs";
import { I as Input } from "./input-6XZgwDxx.js";
import { L as Label } from "./label-CtFE5ecu.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-59t4oWUK.js";
import { cva } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import "vite-react-ssg";
import "react-router-dom";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "@radix-ui/react-slot";
import "clsx";
import "tailwind-merge";
import "@supabase/supabase-js";
import "@radix-ui/react-toast";
import "@radix-ui/react-dialog";
import "@tanstack/react-query";
import "dompurify";
import "@radix-ui/react-label";
import "@radix-ui/react-tabs";
const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
const Alert = React.forwardRef(({ className, variant, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    role: "alert",
    className: cn(alertVariants({ variant }), className),
    ...props
  }
));
Alert.displayName = "Alert";
const AlertTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "h5",
  {
    ref,
    className: cn("mb-1 font-medium leading-none tracking-tight", className),
    ...props
  }
));
AlertTitle.displayName = "AlertTitle";
const AlertDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("text-sm [&_p]:leading-relaxed", className),
    ...props
  }
));
AlertDescription.displayName = "AlertDescription";
const Auth = () => {
  const navigate = useLocalizedNavigate();
  const { user, signIn, signUp, loading: authLoading } = useAuth();
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  useEffect(() => {
    if (user && !authLoading) {
      navigate("/gallery/manage");
    }
  }, [user, authLoading, navigate]);
  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    const { error: error2 } = await signIn(email, password);
    if (error2) {
      setError(error2.message);
    }
    setIsLoading(false);
  };
  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");
    if (password !== confirmPassword) {
      setError(t("common.passwordsDoNotMatch"));
      setIsLoading(false);
      return;
    }
    const { error: error2 } = await signUp(email, password, fullName);
    if (error2) {
      setError(error2.message);
    } else {
      setSuccess(t("common.registrationSuccess"));
    }
    setIsLoading(false);
  };
  if (authLoading) {
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        Seo,
        {
          title: "Authentication | European Arbitration Chamber",
          description: "Sign in to access your European Arbitration Chamber account and manage your gallery content.",
          lang: "en",
          robots: "noindex, nofollow"
        }
      ),
      /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center", children: /* @__PURE__ */ jsx(Loader2, { className: "h-8 w-8 animate-spin" }) }) })
    ] });
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      Seo,
      {
        title: "Authentication | European Arbitration Chamber",
        description: "Sign in to access your European Arbitration Chamber account and manage your gallery content.",
        lang: "en",
        robots: "noindex, nofollow"
      }
    ),
    /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs(Card, { className: "w-full max-w-md", children: [
      /* @__PURE__ */ jsxs(CardHeader, { className: "text-center", children: [
        /* @__PURE__ */ jsxs(CardTitle, { className: "text-2xl font-bold", children: [
          t("common.login"),
          " / ",
          t("common.register")
        ] }),
        /* @__PURE__ */ jsx(CardDescription, { children: t("common.galleryManagementPanel") })
      ] }),
      /* @__PURE__ */ jsxs(CardContent, { children: [
        /* @__PURE__ */ jsxs(Tabs, { defaultValue: "signin", className: "w-full", children: [
          /* @__PURE__ */ jsxs(TabsList, { className: "grid w-full grid-cols-2", children: [
            /* @__PURE__ */ jsx(TabsTrigger, { value: "signin", children: t("common.login") }),
            /* @__PURE__ */ jsx(TabsTrigger, { value: "signup", children: t("common.register") })
          ] }),
          /* @__PURE__ */ jsx(TabsContent, { value: "signin", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSignIn, className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "signin-email", children: t("common.email") }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "signin-email",
                  type: "email",
                  value: email,
                  onChange: (e) => setEmail(e.target.value),
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "signin-password", children: t("common.password") }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "signin-password",
                  type: "password",
                  value: password,
                  onChange: (e) => setPassword(e.target.value),
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ jsx(
              Button,
              {
                type: "submit",
                className: "w-full",
                disabled: isLoading,
                children: isLoading ? /* @__PURE__ */ jsxs(Fragment, { children: [
                  /* @__PURE__ */ jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }),
                  t("common.signingIn")
                ] }) : t("common.login")
              }
            )
          ] }) }),
          /* @__PURE__ */ jsx(TabsContent, { value: "signup", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSignUp, className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "signup-name", children: t("common.fullName") }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "signup-name",
                  type: "text",
                  value: fullName,
                  onChange: (e) => setFullName(e.target.value),
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "signup-email", children: t("common.email") }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "signup-email",
                  type: "email",
                  value: email,
                  onChange: (e) => setEmail(e.target.value),
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "signup-password", children: t("common.password") }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "signup-password",
                  type: "password",
                  value: password,
                  onChange: (e) => setPassword(e.target.value),
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "confirm-password", children: t("common.confirmPassword") }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "confirm-password",
                  type: "password",
                  value: confirmPassword,
                  onChange: (e) => setConfirmPassword(e.target.value),
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ jsx(
              Button,
              {
                type: "submit",
                className: "w-full",
                disabled: isLoading,
                children: isLoading ? /* @__PURE__ */ jsxs(Fragment, { children: [
                  /* @__PURE__ */ jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }),
                  t("common.creatingAccount")
                ] }) : t("common.register")
              }
            )
          ] }) })
        ] }),
        error && /* @__PURE__ */ jsx(Alert, { className: "mt-4", variant: "destructive", children: /* @__PURE__ */ jsx(AlertDescription, { children: error }) }),
        success && /* @__PURE__ */ jsx(Alert, { className: "mt-4", children: /* @__PURE__ */ jsx(AlertDescription, { children: success }) })
      ] })
    ] }) }) })
  ] });
};
export {
  Auth as default
};
