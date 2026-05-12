import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { s as supabase, C as Card, g as CardContent, i as useLocalizedNavigate, a as useAuth, u as useLanguage, b as useUserRole, j as useToast, l as getPublicBaseUrl, L as Layout, B as Button, e as CardHeader, f as CardTitle, m as isLovableOrLocalhost, n as setPublicBaseUrl } from "../main.mjs";
import { B as Badge } from "./badge-DObGNgcP.js";
import { I as Input } from "./input-6XZgwDxx.js";
import { L as Label } from "./label-CtFE5ecu.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-70YdplOt.js";
import { Eye, Globe, Clock, AlertTriangle, ArrowLeft, Save, Plus, QrCode, Trash2, Copy, ExternalLink, BarChart3 } from "lucide-react";
import { Q as QRCodeGenerator } from "./QRCodeGenerator-CZuy2zUD.js";
import "vite-react-ssg";
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
import "@radix-ui/react-label";
import "@radix-ui/react-select";
import "react-qr-code";
const AccessStats = ({ paintingId }) => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalAccess: 0,
    successfulAccess: 0,
    failedAccess: 0,
    uniqueIPs: 0
  });
  useEffect(() => {
    fetchAccessLogs();
  }, [paintingId]);
  const fetchAccessLogs = async () => {
    try {
      const { data, error } = await supabase.from("access_logs").select("*").eq("painting_id", paintingId).order("accessed_at", { ascending: false }).limit(50);
      if (error) throw error;
      setLogs(data || []);
      const totalAccess = (data == null ? void 0 : data.length) || 0;
      const successfulAccess = (data == null ? void 0 : data.filter((log) => log.success).length) || 0;
      const failedAccess = totalAccess - successfulAccess;
      const uniqueIPs = new Set(data == null ? void 0 : data.map((log) => log.ip_address).filter(Boolean)).size;
      setStats({
        totalAccess,
        successfulAccess,
        failedAccess,
        uniqueIPs
      });
    } catch (error) {
      console.error("Error fetching access logs:", error);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "text-center py-4", children: "Loading statistics..." });
  }
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
      /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, { className: "p-3 text-center", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-1 mb-1", children: [
          /* @__PURE__ */ jsx(Eye, { className: "h-4 w-4 text-blue-500" }),
          /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground", children: "Total" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "text-lg font-bold", children: stats.totalAccess })
      ] }) }),
      /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, { className: "p-3 text-center", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-1 mb-1", children: [
          /* @__PURE__ */ jsx(Globe, { className: "h-4 w-4 text-green-500" }),
          /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground", children: "Unique" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "text-lg font-bold", children: stats.uniqueIPs })
      ] }) }),
      /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, { className: "p-3 text-center", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-1 mb-1", children: [
          /* @__PURE__ */ jsx(Clock, { className: "h-4 w-4 text-green-500" }),
          /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground", children: "Success" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "text-lg font-bold text-green-600", children: stats.successfulAccess })
      ] }) }),
      /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, { className: "p-3 text-center", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-1 mb-1", children: [
          /* @__PURE__ */ jsx(AlertTriangle, { className: "h-4 w-4 text-red-500" }),
          /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground", children: "Failed" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "text-lg font-bold text-red-600", children: stats.failedAccess })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h4", { className: "font-medium mb-2", children: "Recent Access" }),
      logs.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground text-center py-4", children: "No access attempts yet" }) : /* @__PURE__ */ jsx("div", { className: "space-y-2 max-h-48 overflow-y-auto", children: logs.slice(0, 10).map((log) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-xs p-2 border rounded", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Badge, { variant: log.success ? "default" : "destructive", className: "text-xs", children: log.success ? "✓" : "✗" }),
          /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: new Date(log.accessed_at).toLocaleString() })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
          log.country && /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: log.country }),
          log.ip_address && /* @__PURE__ */ jsxs("span", { className: "font-mono text-xs bg-muted px-1 rounded", children: [
            log.ip_address.slice(-8),
            "..."
          ] })
        ] })
      ] }, log.id)) })
    ] })
  ] });
};
const TokenManagement = () => {
  const { id } = useParams();
  const navigate = useLocalizedNavigate();
  const { user } = useAuth();
  const { language, t } = useLanguage();
  const { isAdmin, isOwner, loading: roleLoading } = useUserRole();
  const { toast } = useToast();
  const [painting, setPainting] = useState(null);
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("24hours");
  const [publicBaseUrl, setPublicBaseUrlState] = useState("");
  const [savingUrl, setSavingUrl] = useState(false);
  useEffect(() => {
    setPublicBaseUrlState(getPublicBaseUrl());
  }, []);
  useEffect(() => {
    if (id && user && !roleLoading) {
      fetchData();
    }
  }, [id, user, roleLoading, isAdmin]);
  const fetchData = async () => {
    if (!id || !user) return;
    try {
      let paintingQuery = supabase.from("paintings").select("id, title_en, title_fr, title_ru, owner_id").eq("id", id);
      if (!isAdmin) {
        paintingQuery = paintingQuery.eq("owner_id", user.id);
      }
      const { data: paintingData, error: paintingError } = await paintingQuery.single();
      if (paintingError) {
        if (paintingError.code === "PGRST116") {
          toast({
            title: "Access Denied",
            description: "You don't have permission to manage tokens for this painting",
            variant: "destructive"
          });
          navigate("/gallery/manage");
          return;
        }
        throw paintingError;
      }
      setPainting(paintingData);
      const { data: tokensData, error: tokensError } = await supabase.from("access_tokens").select("*").eq("painting_id", id).order("created_at", { ascending: false });
      if (tokensError) throw tokensError;
      setTokens(tokensData || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast({
        title: "Error",
        description: "Failed to fetch painting data",
        variant: "destructive"
      });
      navigate("/gallery/manage");
    } finally {
      setLoading(false);
    }
  };
  const generateToken = async () => {
    if (!id || !user || !painting) return;
    setGenerating(true);
    try {
      const { data, error } = await supabase.rpc("generate_access_token", {
        painting_id_param: id,
        template_type_param: selectedTemplate,
        owner_id_param: painting.owner_id
        // Pass the actual owner_id from the painting
      });
      if (error) {
        console.error("Token generation error:", error);
        toast({
          title: "Error",
          description: `Failed to generate access token: ${error.message}`,
          variant: "destructive"
        });
        return;
      }
      toast({
        title: "Success",
        description: "Access token generated successfully"
      });
      fetchData();
    } catch (error) {
      console.error("Unexpected error generating token:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred while generating the token",
        variant: "destructive"
      });
    } finally {
      setGenerating(false);
    }
  };
  const deactivateToken = async (tokenId) => {
    try {
      const { error } = await supabase.from("access_tokens").update({ is_active: false }).eq("id", tokenId);
      if (error) throw error;
      toast({
        title: "Success",
        description: "Token deactivated successfully"
      });
      fetchData();
    } catch (error) {
      console.error("Error deactivating token:", error);
      toast({
        title: "Error",
        description: "Failed to deactivate token",
        variant: "destructive"
      });
    }
  };
  const handleSavePublicBaseUrl = () => {
    setSavingUrl(true);
    try {
      setPublicBaseUrl(publicBaseUrl);
      toast({
        title: "Success",
        description: "Public base URL saved successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save public base URL",
        variant: "destructive"
      });
    } finally {
      setSavingUrl(false);
    }
  };
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: "Link copied to clipboard"
    });
  };
  const getLocalizedTitle = () => {
    if (!painting) return "";
    switch (language) {
      case "fr":
        return painting.title_fr;
      case "ru":
        return painting.title_ru;
      default:
        return painting.title_en;
    }
  };
  const getTemplateLabel = (template) => {
    switch (template) {
      case "1hour":
        return "1 Hour";
      case "24hours":
        return "24 Hours";
      case "7days":
        return "7 Days";
      default:
        return template;
    }
  };
  const formatExpiry = (expiresAt) => {
    const date = new Date(expiresAt);
    const now = /* @__PURE__ */ new Date();
    const isExpired = date < now;
    return {
      formatted: date.toLocaleString(),
      isExpired
    };
  };
  if (loading || roleLoading) {
    return /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 py-8", children: /* @__PURE__ */ jsx("div", { className: "text-center", children: "Loading..." }) }) });
  }
  if (!painting) {
    return /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 py-8", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold mb-4", children: "Painting Not Found" }),
      /* @__PURE__ */ jsxs(Button, { onClick: () => navigate("/gallery/manage"), children: [
        /* @__PURE__ */ jsx(ArrowLeft, { className: "mr-2 h-4 w-4" }),
        "Back to Gallery"
      ] })
    ] }) }) });
  }
  return /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 py-8 max-w-6xl", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-8", children: [
      /* @__PURE__ */ jsxs(Button, { variant: "outline", onClick: () => navigate("/gallery/manage"), children: [
        /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4 mr-2" }),
        "Back to Gallery"
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold mb-2", children: "QR Codes & Access" }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: getLocalizedTitle() })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2 space-y-6", children: [
        /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Globe, { className: "h-5 w-5" }),
            "Public Base URL Configuration"
          ] }) }),
          /* @__PURE__ */ jsx(CardContent, { className: "space-y-4", children: /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "publicBaseUrl", children: "Public Domain for QR Codes" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mb-2", children: "Set your public domain where clients will access the paintings" }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "publicBaseUrl",
                  value: publicBaseUrl,
                  onChange: (e) => setPublicBaseUrlState(e.target.value),
                  placeholder: "https://your-domain.com",
                  className: "flex-1"
                }
              ),
              /* @__PURE__ */ jsxs(
                Button,
                {
                  onClick: handleSavePublicBaseUrl,
                  disabled: savingUrl,
                  size: "sm",
                  children: [
                    /* @__PURE__ */ jsx(Save, { className: "h-4 w-4 mr-2" }),
                    savingUrl ? "Saving..." : "Save"
                  ]
                }
              )
            ] }),
            isLovableOrLocalhost(publicBaseUrl) && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-amber-600 text-sm mt-2", children: [
              /* @__PURE__ */ jsx(AlertTriangle, { className: "h-4 w-4" }),
              'Warning: This domain contains "lovable" or "localhost" and may not work for external clients'
            ] })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Plus, { className: "h-5 w-5" }),
            "Generate New Access Token"
          ] }) }),
          /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "template", children: "Access Duration" }),
              /* @__PURE__ */ jsxs(Select, { value: selectedTemplate, onValueChange: setSelectedTemplate, children: [
                /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsx(SelectItem, { value: "1hour", children: "1 Hour" }),
                  /* @__PURE__ */ jsx(SelectItem, { value: "24hours", children: "24 Hours" }),
                  /* @__PURE__ */ jsx(SelectItem, { value: "7days", children: "7 Days" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs(Button, { onClick: generateToken, disabled: generating, className: "w-full", children: [
              /* @__PURE__ */ jsx(QrCode, { className: "h-4 w-4 mr-2" }),
              generating ? "Generating..." : "Generate Access Token & QR Code"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { children: "Active Access Tokens" }) }),
          /* @__PURE__ */ jsx(CardContent, { children: tokens.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-center py-4", children: "No access tokens generated yet" }) : /* @__PURE__ */ jsx("div", { className: "space-y-4", children: tokens.map((token) => {
            const expiry = formatExpiry(token.expires_at);
            const baseUrl = getPublicBaseUrl();
            const accessUrl = `${baseUrl}/gallery/${id}/access/${token.token}`;
            return /* @__PURE__ */ jsxs("div", { className: "border rounded-lg p-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between mb-3", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                    /* @__PURE__ */ jsx(Badge, { variant: token.is_active && !expiry.isExpired ? "default" : "secondary", children: getTemplateLabel(token.template_type) }),
                    expiry.isExpired && /* @__PURE__ */ jsx(Badge, { variant: "destructive", children: "Expired" }),
                    !token.is_active && /* @__PURE__ */ jsx(Badge, { variant: "secondary", children: "Deactivated" })
                  ] }),
                  /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
                    "Created: ",
                    new Date(token.created_at).toLocaleString()
                  ] }),
                  /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
                    "Expires: ",
                    expiry.formatted
                  ] }),
                  /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
                    "Used: ",
                    token.usage_count,
                    " times"
                  ] })
                ] }),
                token.is_active && !expiry.isExpired && /* @__PURE__ */ jsxs(
                  Button,
                  {
                    variant: "outline",
                    size: "sm",
                    onClick: () => deactivateToken(token.id),
                    children: [
                      /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4 mr-1" }),
                      "Deactivate"
                    ]
                  }
                )
              ] }),
              token.is_active && !expiry.isExpired && /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx(
                    Input,
                    {
                      value: accessUrl,
                      readOnly: true,
                      className: "text-xs"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    Button,
                    {
                      variant: "outline",
                      size: "sm",
                      onClick: () => copyToClipboard(accessUrl),
                      children: /* @__PURE__ */ jsx(Copy, { className: "h-4 w-4" })
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    Button,
                    {
                      variant: "outline",
                      size: "sm",
                      onClick: () => window.open(accessUrl, "_blank"),
                      children: /* @__PURE__ */ jsx(ExternalLink, { className: "h-4 w-4" })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx(QRCodeGenerator, { url: accessUrl })
              ] })
            ] }, token.id);
          }) }) })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(BarChart3, { className: "h-5 w-5" }),
          "Access Statistics"
        ] }) }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx(AccessStats, { paintingId: id }) })
      ] }) })
    ] })
  ] }) });
};
export {
  TokenManagement as default
};
