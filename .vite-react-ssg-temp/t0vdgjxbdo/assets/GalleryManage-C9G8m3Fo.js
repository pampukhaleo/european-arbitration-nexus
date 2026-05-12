import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { a as useAuth, u as useLanguage, b as useUserRole, i as useLocalizedNavigate, j as useToast, s as supabase, L as Layout, B as Button, C as Card, g as CardContent, e as CardHeader, f as CardTitle, h as CardDescription } from "../main.mjs";
import { B as Badge } from "./badge-DObGNgcP.js";
import { A as AlertDialog, a as AlertDialogTrigger, b as AlertDialogContent, c as AlertDialogHeader, d as AlertDialogTitle, e as AlertDialogDescription, f as AlertDialogFooter, g as AlertDialogCancel, h as AlertDialogAction } from "./alert-dialog-BgZ0D17S.js";
import { ArrowLeft, Plus, Eye, Edit, QrCode, Trash2 } from "lucide-react";
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
import "@radix-ui/react-dialog";
import "@tanstack/react-query";
import "dompurify";
import "@radix-ui/react-alert-dialog";
const GalleryManage = () => {
  var _a;
  const { user, signOut } = useAuth();
  const { t, language } = useLanguage();
  const { role, isAdmin, isOwner, loading: roleLoading } = useUserRole();
  const navigate = useLocalizedNavigate();
  const { toast } = useToast();
  const [paintings, setPaintings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  useEffect(() => {
    if (!roleLoading && role) {
      fetchPaintings();
    }
  }, [role, roleLoading]);
  const fetchPaintings = async () => {
    if (!user) return;
    setLoading(true);
    try {
      let query;
      if (isAdmin) {
        query = supabase.from("paintings").select("*");
      } else {
        const { data: ownershipData, error: ownershipError } = await supabase.from("painting_owners").select("painting_id").eq("owner_id", user.id);
        if (ownershipError) throw ownershipError;
        const paintingIds = (ownershipData == null ? void 0 : ownershipData.map((o) => o.painting_id)) || [];
        if (paintingIds.length === 0) {
          setPaintings([]);
          setLoading(false);
          return;
        }
        query = supabase.from("paintings").select("*").in("id", paintingIds);
      }
      const { data, error } = await query.order("created_at", { ascending: false });
      if (error) throw error;
      setPaintings(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch paintings",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async (paintingId) => {
    if (!isAdmin) return;
    setDeletingId(paintingId);
    try {
      const { error } = await supabase.from("paintings").delete().eq("id", paintingId);
      if (error) throw error;
      toast({
        title: "Success",
        description: "Painting deleted successfully"
      });
      setPaintings((prev) => prev.filter((p) => p.id !== paintingId));
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete painting",
        variant: "destructive"
      });
    } finally {
      setDeletingId(null);
    }
  };
  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };
  const getLocalizedTitle = (painting) => {
    switch (language) {
      case "fr":
        return painting.title_fr;
      case "ru":
        return painting.title_ru;
      default:
        return painting.title_en;
    }
  };
  const getLocalizedArtist = (painting) => {
    switch (language) {
      case "fr":
        return painting.artist_fr;
      case "ru":
        return painting.artist_ru;
      default:
        return painting.artist_en;
    }
  };
  if (roleLoading || loading) {
    return /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 py-8", children: /* @__PURE__ */ jsx("div", { className: "text-center", children: "Loading..." }) }) });
  }
  if (!isAdmin && !isOwner) {
    return /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 py-8", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold mb-4", children: "Access Denied" }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mb-4", children: "You don't have permission to access this page." }),
      /* @__PURE__ */ jsx(Button, { onClick: () => navigate("/gallery"), children: "Back to Gallery" })
    ] }) }) });
  }
  return /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 py-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-8", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-2", children: [
          /* @__PURE__ */ jsxs(Button, { variant: "outline", onClick: () => navigate("/gallery"), children: [
            /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4 mr-2" }),
            "Go to Gallery"
          ] }),
          /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold", children: isAdmin ? "Gallery Administration" : "QR Code Management" })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-muted-foreground", children: [
          "Welcome back, ",
          ((_a = user == null ? void 0 : user.user_metadata) == null ? void 0 : _a.full_name) || (user == null ? void 0 : user.email),
          isAdmin && /* @__PURE__ */ jsx(Badge, { className: "ml-2", children: "Admin" }),
          isOwner && !isAdmin && /* @__PURE__ */ jsx(Badge, { variant: "secondary", className: "ml-2", children: "Owner" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
        isAdmin && /* @__PURE__ */ jsxs(
          Button,
          {
            onClick: () => navigate("/gallery/manage/add"),
            className: "flex items-center gap-2",
            children: [
              /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" }),
              "Add Painting"
            ]
          }
        ),
        /* @__PURE__ */ jsx(Button, { variant: "outline", onClick: handleSignOut, children: "Sign Out" })
      ] })
    ] }),
    loading ? /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ jsxs(Card, { className: "animate-pulse", children: [
      /* @__PURE__ */ jsx("div", { className: "h-48 bg-gray-200 rounded-t-lg" }),
      /* @__PURE__ */ jsxs(CardContent, { className: "p-4", children: [
        /* @__PURE__ */ jsx("div", { className: "h-4 bg-gray-200 rounded mb-2" }),
        /* @__PURE__ */ jsx("div", { className: "h-3 bg-gray-200 rounded mb-4" }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsx("div", { className: "h-8 bg-gray-200 rounded flex-1" }),
          /* @__PURE__ */ jsx("div", { className: "h-8 bg-gray-200 rounded flex-1" })
        ] })
      ] })
    ] }, i)) }) : paintings.length === 0 ? /* @__PURE__ */ jsx(Card, { className: "text-center py-12", children: /* @__PURE__ */ jsxs(CardContent, { children: [
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-2", children: isAdmin ? "No paintings yet" : "No paintings assigned" }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mb-4", children: isAdmin ? "Start building the gallery by adding the first painting." : "You don't have any paintings assigned to you yet." }),
      isAdmin && /* @__PURE__ */ jsxs(Button, { onClick: () => navigate("/gallery/manage/add"), children: [
        /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4 mr-2" }),
        "Add Your First Painting"
      ] })
    ] }) }) : /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: paintings.map((painting) => /* @__PURE__ */ jsxs(Card, { className: "overflow-hidden", children: [
      painting.public_image_url && /* @__PURE__ */ jsx("div", { className: "h-48 overflow-hidden", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: painting.public_image_url,
          alt: getLocalizedTitle(painting),
          className: "w-full h-full object-cover"
        }
      ) }),
      /* @__PURE__ */ jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(CardTitle, { className: "text-lg line-clamp-1", children: getLocalizedTitle(painting) }),
          /* @__PURE__ */ jsxs(CardDescription, { className: "line-clamp-1", children: [
            getLocalizedArtist(painting),
            painting.year && ` (${painting.year})`
          ] })
        ] }),
        /* @__PURE__ */ jsx(Badge, { variant: painting.is_published ? "default" : "secondary", children: painting.is_published ? "Published" : "Draft" })
      ] }) }),
      /* @__PURE__ */ jsxs(CardContent, { className: "pt-0 space-y-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              className: "flex-1",
              onClick: () => navigate(`/gallery/${painting.id}`),
              children: [
                /* @__PURE__ */ jsx(Eye, { className: "h-4 w-4 mr-1" }),
                "View"
              ]
            }
          ),
          isAdmin && /* @__PURE__ */ jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              className: "flex-1",
              onClick: () => navigate(`/gallery/manage/edit/${painting.id}`),
              children: [
                /* @__PURE__ */ jsx(Edit, { className: "h-4 w-4 mr-1" }),
                "Edit"
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              className: "flex-1",
              onClick: () => navigate(`/gallery/manage/tokens/${painting.id}`),
              children: [
                /* @__PURE__ */ jsx(QrCode, { className: "h-4 w-4 mr-1" }),
                "QR"
              ]
            }
          )
        ] }),
        isAdmin && /* @__PURE__ */ jsxs(AlertDialog, { children: [
          /* @__PURE__ */ jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
            Button,
            {
              variant: "destructive",
              size: "sm",
              className: "w-full",
              disabled: deletingId === painting.id,
              children: [
                /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4 mr-2" }),
                "Delete Painting"
              ]
            }
          ) }),
          /* @__PURE__ */ jsxs(AlertDialogContent, { children: [
            /* @__PURE__ */ jsxs(AlertDialogHeader, { children: [
              /* @__PURE__ */ jsx(AlertDialogTitle, { children: "Delete Painting" }),
              /* @__PURE__ */ jsxs(AlertDialogDescription, { children: [
                'Are you sure you want to delete "',
                getLocalizedTitle(painting),
                '"? This will permanently delete the painting and all associated data including access tokens and logs. This action cannot be undone.'
              ] })
            ] }),
            /* @__PURE__ */ jsxs(AlertDialogFooter, { children: [
              /* @__PURE__ */ jsx(AlertDialogCancel, { children: "Cancel" }),
              /* @__PURE__ */ jsx(
                AlertDialogAction,
                {
                  onClick: () => handleDelete(painting.id),
                  className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                  children: "Delete Painting"
                }
              )
            ] })
          ] })
        ] })
      ] })
    ] }, painting.id)) })
  ] }) });
};
export {
  GalleryManage as default
};
