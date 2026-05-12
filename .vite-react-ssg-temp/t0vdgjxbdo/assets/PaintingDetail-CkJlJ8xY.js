import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { S as Seo, b as useUserRole, s as supabase, C as Card, g as CardContent, e as CardHeader, f as CardTitle, h as CardDescription, B as Button, i as useLocalizedNavigate, a as useAuth, u as useLanguage, j as useToast, L as Layout } from "../main.mjs";
import { B as BreadcrumbSeo } from "./BreadcrumbSeo-B43utRgx.js";
import { L as Label } from "./label-CtFE5ecu.js";
import { toast } from "sonner";
import { Loader2, Crown, UserMinus, ArrowLeft, QrCode, Edit, Trash2, Info, Lock, Award, FileText } from "lucide-react";
import { B as Badge } from "./badge-DObGNgcP.js";
import { A as AlertDialog, a as AlertDialogTrigger, b as AlertDialogContent, c as AlertDialogHeader, d as AlertDialogTitle, e as AlertDialogDescription, f as AlertDialogFooter, g as AlertDialogCancel, h as AlertDialogAction } from "./alert-dialog-BgZ0D17S.js";
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
import "@radix-ui/react-alert-dialog";
const PaintingDetailSeo = ({ painting, language, hasToken }) => {
  const { token } = useParams();
  if (!painting) {
    return /* @__PURE__ */ jsx(
      Seo,
      {
        title: "Painting Not Found | Art Gallery - European Arbitration Chamber",
        description: "The requested artwork could not be found in our gallery collection.",
        lang: language,
        robots: "noindex, nofollow"
      }
    );
  }
  const getLocalizedText = (key) => {
    switch (language) {
      case "fr":
        return painting[`${key}_fr`] || painting[`${key}_en`] || "";
      case "ru":
        return painting[`${key}_ru`] || painting[`${key}_en`] || "";
      default:
        return painting[`${key}_en`] || "";
    }
  };
  const title = getLocalizedText("title");
  const artist = getLocalizedText("artist");
  const description = getLocalizedText("description");
  const seoTitle = `${title} by ${artist}${painting.year ? ` (${painting.year})` : ""} | Art Gallery - European Arbitration Chamber`;
  const seoDescription = description ? `${description.substring(0, 150)}${description.length > 150 ? "..." : ""}` : `Discover "${title}" by ${artist}${painting.year ? ` from ${painting.year}` : ""} in the European Arbitration Chamber's authenticated art collection.`;
  const shouldIndex = painting.is_published && !token && !hasToken;
  const robots = shouldIndex ? "index, follow" : "noindex, nofollow";
  const structuredData = shouldIndex ? {
    "@context": "https://schema.org",
    "@type": "VisualArtwork",
    "name": title,
    "creator": {
      "@type": "Person",
      "name": artist
    },
    "dateCreated": painting.year ? painting.year.toString() : void 0,
    "description": description || `Artwork by ${artist}`,
    "image": {
      "@type": "ImageObject",
      "url": painting.public_image_url
    },
    "url": typeof window !== "undefined" ? window.location.href : "",
    "publisher": {
      "@type": "Organization",
      "name": "European Arbitration Chamber",
      "url": "https://chea-taic.be"
    }
  } : void 0;
  return /* @__PURE__ */ jsx(
    Seo,
    {
      title: seoTitle,
      description: seoDescription,
      image: painting.public_image_url || void 0,
      lang: language,
      robots,
      structuredData
    }
  );
};
const PaintingOwnersManager = ({ paintingId }) => {
  const { isAdmin } = useUserRole();
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchOwners();
  }, [paintingId]);
  const fetchOwners = async () => {
    try {
      const { data: poRows, error: poError } = await supabase.from("painting_owners").select("id, owner_id").eq("painting_id", paintingId);
      if (poError) throw poError;
      const ownerIds = (poRows || []).map((r) => r.owner_id);
      if (ownerIds.length === 0) {
        setOwners([]);
        return;
      }
      const { data: profiles, error: profilesError } = await supabase.from("profiles").select("id, email, full_name").in("id", ownerIds);
      if (profilesError) throw profilesError;
      const ownersWithProfiles = (poRows || []).map((row) => ({
        id: row.id,
        owner_id: row.owner_id,
        profiles: (profiles == null ? void 0 : profiles.find((p) => p.id === row.owner_id)) || null
      }));
      setOwners(ownersWithProfiles);
    } catch (error) {
      console.error("Error fetching owners:", error);
      toast.error("Failed to load owners");
    } finally {
      setLoading(false);
    }
  };
  const handleRemoveOwner = async (ownerId) => {
    if (!confirm("Are you sure you want to remove this owner?")) {
      return;
    }
    try {
      const { error } = await supabase.from("painting_owners").delete().eq("id", ownerId);
      if (error) throw error;
      toast.success("Owner removed successfully");
      fetchOwners();
    } catch (error) {
      console.error("Error removing owner:", error);
      toast.error("Failed to remove owner");
    }
  };
  if (!isAdmin) {
    return null;
  }
  if (loading) {
    return /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx(CardContent, { className: "pt-6 flex justify-center", children: /* @__PURE__ */ jsx(Loader2, { className: "h-6 w-6 animate-spin" }) }) });
  }
  return /* @__PURE__ */ jsxs(Card, { children: [
    /* @__PURE__ */ jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(Crown, { className: "h-5 w-5" }),
        "Painting Owners"
      ] }),
      /* @__PURE__ */ jsx(CardDescription, { children: "Manage who can access and edit this painting's private information" })
    ] }),
    /* @__PURE__ */ jsx(CardContent, { className: "space-y-4", children: /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxs(Label, { children: [
        "Current Owners (",
        owners.length,
        ")"
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-2", children: owners.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "No owners assigned yet" }) : owners.map((owner) => {
        var _a, _b;
        return /* @__PURE__ */ jsxs(
          "div",
          {
            className: "flex items-center justify-between p-3 border rounded-lg",
            children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "font-medium", children: ((_a = owner.profiles) == null ? void 0 : _a.email) || "Unknown" }),
                ((_b = owner.profiles) == null ? void 0 : _b.full_name) && /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: owner.profiles.full_name })
              ] }),
              /* @__PURE__ */ jsxs(
                Button,
                {
                  variant: "destructive",
                  size: "sm",
                  onClick: () => handleRemoveOwner(owner.id),
                  disabled: owners.length === 1,
                  title: owners.length === 1 ? "Cannot remove the last owner" : "Remove owner",
                  children: [
                    /* @__PURE__ */ jsx(UserMinus, { className: "h-4 w-4 mr-1" }),
                    "Remove"
                  ]
                }
              )
            ]
          },
          owner.id
        );
      }) })
    ] }) })
  ] });
};
const PaintingDetail = () => {
  const { id, token } = useParams();
  const navigate = useLocalizedNavigate();
  const { user } = useAuth();
  const { language } = useLanguage();
  const { isAdmin, isOwner } = useUserRole();
  const { toast: toast2 } = useToast();
  const [painting, setPainting] = useState(null);
  const [privateData, setPrivateData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [showPrivateInfo, setShowPrivateInfo] = useState(false);
  const [tokenError, setTokenError] = useState(null);
  const [isOwnerOfPainting, setIsOwnerOfPainting] = useState(false);
  useEffect(() => {
    if (id) {
      fetchPainting();
    }
  }, [id]);
  useEffect(() => {
    if (id && token) {
      fetchPrivateData();
    }
  }, [id, token]);
  useEffect(() => {
    if (id && user && painting && !token) {
      checkOwnershipAndFetchPrivate();
    }
  }, [id, user, painting, isAdmin]);
  const fetchPainting = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const { data, error } = await supabase.from("paintings").select("*").eq("id", id).single();
      if (error) throw error;
      setPainting(data);
    } catch (error) {
      toast2({
        title: "Error",
        description: "Failed to fetch painting details",
        variant: "destructive"
      });
      navigate("/gallery");
    } finally {
      setLoading(false);
    }
  };
  const fetchPrivateData = async () => {
    if (!id || !token) return;
    try {
      const { data, error } = await supabase.rpc("get_private_painting_info", {
        token_text: token,
        painting_id_param: id
      });
      if (error) {
        console.error("Error fetching private data:", error);
        setTokenError("Invalid or expired access token");
        toast2({
          title: "Access Denied",
          description: "The access token is invalid or expired",
          variant: "destructive"
        });
        return;
      }
      if (data && data.length > 0) {
        setPrivateData(data[0]);
        setShowPrivateInfo(true);
      } else {
        setTokenError("No private data available");
        toast2({
          title: "No Data",
          description: "No private information available for this token",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error fetching private data:", error);
      setTokenError("Failed to access private information");
      toast2({
        title: "Error",
        description: "Failed to access private information",
        variant: "destructive"
      });
    }
  };
  const checkOwnershipAndFetchPrivate = async () => {
    if (!id || !user || !painting) return;
    try {
      const { data: ownershipData, error: ownershipError } = await supabase.from("painting_owners").select("id").eq("painting_id", id).eq("owner_id", user.id).maybeSingle();
      if (ownershipError) {
        console.error("Error checking ownership:", ownershipError);
      }
      const userIsOwner = !!ownershipData || isAdmin;
      setIsOwnerOfPainting(userIsOwner);
      if (userIsOwner) {
        const { data, error } = await supabase.from("painting_private").select("*").eq("painting_id", id).maybeSingle();
        if (error && error.code !== "PGRST116") {
          throw error;
        }
        if (data) {
          setPrivateData(data);
          setShowPrivateInfo(true);
        }
      }
    } catch (error) {
      console.error("Error fetching private data for owner:", error);
    }
  };
  const handleDelete = async () => {
    if (!painting || !isAdmin) return;
    setDeleting(true);
    try {
      const { error } = await supabase.from("paintings").delete().eq("id", painting.id);
      if (error) throw error;
      toast2({
        title: "Success",
        description: "Painting deleted successfully"
      });
      navigate("/gallery/manage");
    } catch (error) {
      toast2({
        title: "Error",
        description: "Failed to delete painting",
        variant: "destructive"
      });
    } finally {
      setDeleting(false);
    }
  };
  const getLocalizedText = (key) => {
    if (!painting) return "";
    switch (language) {
      case "fr":
        return painting[`${key}_fr`] || "";
      case "ru":
        return painting[`${key}_ru`] || "";
      default:
        return painting[`${key}_en`] || "";
    }
  };
  const breadcrumbItems = painting ? [
    { name: "Home", url: "/" },
    { name: "Gallery", url: "/gallery" },
    { name: getLocalizedText("title"), url: window.location.pathname }
  ] : [];
  const canManage = () => {
    if (!user || !painting) return false;
    return isAdmin || isOwnerOfPainting;
  };
  if (loading) {
    return /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 py-8", children: /* @__PURE__ */ jsx("div", { className: "text-center", children: "Loading..." }) }) });
  }
  if (!painting) {
    return /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 py-8", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold mb-4", children: "Painting Not Found" }),
      /* @__PURE__ */ jsx(Button, { onClick: () => navigate("/gallery"), children: "Back to Gallery" })
    ] }) }) });
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      PaintingDetailSeo,
      {
        painting,
        language,
        hasToken: !!token
      }
    ),
    /* @__PURE__ */ jsx(BreadcrumbSeo, { items: breadcrumbItems }),
    /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 py-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-8", children: [
        /* @__PURE__ */ jsxs(Button, { variant: "outline", onClick: () => navigate("/gallery"), children: [
          /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4 mr-2" }),
          "Back to Gallery"
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: canManage() && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs(
            Button,
            {
              variant: "outline",
              onClick: () => navigate(`/gallery/manage/tokens/${painting.id}`),
              children: [
                /* @__PURE__ */ jsx(QrCode, { className: "h-4 w-4 mr-2" }),
                "QR Codes"
              ]
            }
          ),
          isAdmin && /* @__PURE__ */ jsxs(
            Button,
            {
              variant: "outline",
              onClick: () => navigate(`/gallery/manage/edit/${painting.id}`),
              children: [
                /* @__PURE__ */ jsx(Edit, { className: "h-4 w-4 mr-2" }),
                "Edit"
              ]
            }
          ),
          isAdmin && /* @__PURE__ */ jsxs(AlertDialog, { children: [
            /* @__PURE__ */ jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
              Button,
              {
                variant: "outline",
                disabled: deleting,
                className: "text-destructive hover:text-destructive",
                children: [
                  /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4 mr-2" }),
                  "Delete"
                ]
              }
            ) }),
            /* @__PURE__ */ jsxs(AlertDialogContent, { children: [
              /* @__PURE__ */ jsxs(AlertDialogHeader, { children: [
                /* @__PURE__ */ jsx(AlertDialogTitle, { children: "Delete Painting" }),
                /* @__PURE__ */ jsxs(AlertDialogDescription, { children: [
                  'Are you sure you want to delete "',
                  getLocalizedText("title"),
                  '"? This will permanently delete the painting and all associated data including access tokens and logs. This action cannot be undone.'
                ] })
              ] }),
              /* @__PURE__ */ jsxs(AlertDialogFooter, { children: [
                /* @__PURE__ */ jsx(AlertDialogCancel, { children: "Cancel" }),
                /* @__PURE__ */ jsx(
                  AlertDialogAction,
                  {
                    onClick: handleDelete,
                    className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                    children: "Delete Painting"
                  }
                )
              ] })
            ] })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8", children: [
        /* @__PURE__ */ jsx("div", { className: "space-y-4", children: painting.public_image_url ? /* @__PURE__ */ jsxs("div", { className: "aspect-square overflow-hidden rounded-lg border relative select-none", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: painting.public_image_url,
              alt: getLocalizedText("title"),
              className: "w-full h-full object-contain bg-gray-50 pointer-events-none select-none",
              draggable: "false",
              onContextMenu: (e) => e.preventDefault(),
              onDragStart: (e) => e.preventDefault()
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-transparent pointer-events-none" })
        ] }) : /* @__PURE__ */ jsx("div", { className: "aspect-square bg-gray-100 rounded-lg border flex items-center justify-center", children: /* @__PURE__ */ jsx("p", { className: "text-gray-500", children: "No image available" }) }) }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "flex justify-end w-full mb-2", children: /* @__PURE__ */ jsx(Badge, { variant: painting.is_published ? "default" : "secondary", children: painting.is_published ? "Published" : "Draft" }) }),
            /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold", children: getLocalizedText("title") }),
            /* @__PURE__ */ jsxs("p", { className: "text-xl text-muted-foreground", children: [
              getLocalizedText("artist"),
              painting.artist_dates && ` (${painting.artist_dates})`
            ] }),
            painting.original_title && /* @__PURE__ */ jsxs("p", { className: "text-lg text-muted-foreground italic mt-2", children: [
              '"',
              painting.original_title,
              '"'
            ] })
          ] }),
          /* @__PURE__ */ jsxs(Card, { children: [
            /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Info, { className: "h-5 w-5" }),
              "Basic Information"
            ] }) }),
            /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("dl", { className: "grid grid-cols-1 md:grid-cols-[auto,1fr] gap-x-4 gap-y-2", children: [
              painting.year && /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx("dt", { className: "font-medium text-sm text-muted-foreground md:text-right", children: "Year of creation:" }),
                /* @__PURE__ */ jsx("dd", { className: "text-sm break-words", children: painting.year })
              ] }),
              getLocalizedText("date_place_made") && /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx("dt", { className: "font-medium text-sm text-muted-foreground md:text-right", children: "Place of creation:" }),
                /* @__PURE__ */ jsx("dd", { className: "text-sm break-words", children: getLocalizedText("date_place_made") })
              ] }),
              getLocalizedText("materials") && /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx("dt", { className: "font-medium text-sm text-muted-foreground md:text-right", children: "Materials:" }),
                /* @__PURE__ */ jsx("dd", { className: "text-sm break-words", children: getLocalizedText("materials") })
              ] }),
              painting.dimensions && /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx("dt", { className: "font-medium text-sm text-muted-foreground md:text-right", children: "Dimensions, cm:" }),
                /* @__PURE__ */ jsx("dd", { className: "text-sm break-words", children: painting.dimensions })
              ] }),
              getLocalizedText("genre") && /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx("dt", { className: "font-medium text-sm text-muted-foreground md:text-right", children: "Genre:" }),
                /* @__PURE__ */ jsx("dd", { className: "text-sm break-words", children: getLocalizedText("genre") })
              ] }),
              getLocalizedText("frame") && /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx("dt", { className: "font-medium text-sm text-muted-foreground md:text-right", children: "Frame:" }),
                /* @__PURE__ */ jsx("dd", { className: "text-sm break-words", children: getLocalizedText("frame") })
              ] })
            ] }) })
          ] }),
          showPrivateInfo && privateData && /* @__PURE__ */ jsxs(Card, { className: "border-blue-200 bg-blue-50", children: [
            /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2 text-blue-700", children: [
              /* @__PURE__ */ jsx(Lock, { className: "h-5 w-5" }),
              "Private Information"
            ] }) }),
            /* @__PURE__ */ jsxs(CardContent, { className: "space-y-3", children: [
              privateData.eac_inventory_no && /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsx("span", { className: "font-medium", children: "EAC Inventory No:" }),
                /* @__PURE__ */ jsx("span", { children: privateData.eac_inventory_no })
              ] }),
              privateData.eac_passport_no && /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsx("span", { className: "font-medium", children: "EAC Passport No:" }),
                /* @__PURE__ */ jsx("span", { children: privateData.eac_passport_no })
              ] }),
              privateData.eac_issue_date && /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsx("span", { className: "font-medium", children: "EAC Issue Date:" }),
                /* @__PURE__ */ jsx("span", { children: new Date(privateData.eac_issue_date).toLocaleDateString() })
              ] })
            ] })
          ] }),
          token && tokenError && /* @__PURE__ */ jsx(Card, { className: "border-red-200 bg-red-50", children: /* @__PURE__ */ jsx(CardContent, { className: "p-4 text-center", children: /* @__PURE__ */ jsx("p", { className: "text-red-700", children: tokenError }) }) }),
          painting.certificates && painting.certificates.length > 0 && /* @__PURE__ */ jsxs(Card, { children: [
            /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Award, { className: "h-5 w-5" }),
              "Certificates (",
              painting.certificates.length,
              ")"
            ] }) }),
            /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: painting.certificates.map((cert, index) => /* @__PURE__ */ jsxs("div", { className: "border rounded-lg p-4", children: [
              /* @__PURE__ */ jsx("h4", { className: "font-semibold mb-2", children: cert.name }),
              cert.url && /* @__PURE__ */ jsxs(
                "a",
                {
                  href: cert.url,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "text-blue-600 hover:underline",
                  children: [
                    /* @__PURE__ */ jsx(FileText, { className: "h-4 w-4 inline mr-1" }),
                    "View Certificate"
                  ]
                }
              )
            ] }, index)) }) })
          ] }),
          painting.documents && painting.documents.length > 0 && /* @__PURE__ */ jsxs(Card, { children: [
            /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(FileText, { className: "h-5 w-5" }),
              "Documents (",
              painting.documents.length,
              ")"
            ] }) }),
            /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: painting.documents.map((doc, index) => /* @__PURE__ */ jsxs("div", { className: "border rounded-lg p-4", children: [
              /* @__PURE__ */ jsx("h4", { className: "font-semibold mb-2", children: doc.name }),
              doc.url && /* @__PURE__ */ jsxs(
                "a",
                {
                  href: doc.url,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "text-blue-600 hover:underline",
                  children: [
                    /* @__PURE__ */ jsx(FileText, { className: "h-4 w-4 inline mr-1" }),
                    "View Document"
                  ]
                }
              )
            ] }, index)) }) })
          ] }),
          isAdmin && /* @__PURE__ */ jsx(PaintingOwnersManager, { paintingId: painting.id })
        ] })
      ] })
    ] }) })
  ] });
};
export {
  PaintingDetail as default
};
