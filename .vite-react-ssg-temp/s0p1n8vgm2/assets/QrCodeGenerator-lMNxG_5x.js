import { jsx, jsxs } from "react/jsx-runtime";
import { useParams } from "react-router-dom";
import { L as Layout, C as Card, g as CardContent, l as getPublicBaseUrl, e as CardHeader, f as CardTitle } from "../main.mjs";
import { Q as QRCodeGenerator } from "./QRCodeGenerator-CZuy2zUD.js";
import "vite-react-ssg";
import "react";
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
import "react-qr-code";
const QrCodeGenerator = () => {
  const { id } = useParams();
  if (!id) {
    return /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 py-8", children: /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx(CardContent, { className: "p-8 text-center", children: /* @__PURE__ */ jsx("p", { children: "Invalid painting ID" }) }) }) }) });
  }
  const baseUrl = getPublicBaseUrl();
  const paintingUrl = `${baseUrl}/gallery/${id}`;
  return /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 py-8", children: /* @__PURE__ */ jsxs(Card, { children: [
    /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { children: "QR Code Generator" }) }),
    /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx(QRCodeGenerator, { url: paintingUrl }) })
  ] }) }) });
};
export {
  QrCodeGenerator as default
};
