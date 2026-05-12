import { jsx, jsxs } from "react/jsx-runtime";
import QRCode from "react-qr-code";
import { j as useToast, C as Card, g as CardContent, B as Button } from "../main.mjs";
import { Copy, ExternalLink } from "lucide-react";
const QRCodeGenerator = ({ url, size = 200 }) => {
  const { toast } = useToast();
  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    toast({
      title: "Copied",
      description: "Link copied to clipboard"
    });
  };
  const openLink = () => {
    window.open(url, "_blank");
  };
  return /* @__PURE__ */ jsx(Card, { className: "w-fit", children: /* @__PURE__ */ jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxs("div", { className: "text-center space-y-4", children: [
    /* @__PURE__ */ jsx("div", { className: "bg-white p-2 rounded border", children: /* @__PURE__ */ jsx(
      QRCode,
      {
        value: url,
        size,
        level: "M"
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "QR Code for Private Access" }),
      /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground break-all max-w-[200px]", children: url }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2 justify-center", children: [
        /* @__PURE__ */ jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: copyToClipboard,
            children: [
              /* @__PURE__ */ jsx(Copy, { className: "h-3 w-3 mr-1" }),
              "Copy"
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: openLink,
            children: [
              /* @__PURE__ */ jsx(ExternalLink, { className: "h-3 w-3 mr-1" }),
              "Open"
            ]
          }
        )
      ] })
    ] })
  ] }) }) });
};
export {
  QRCodeGenerator as Q
};
