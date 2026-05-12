import { jsx, jsxs } from "react/jsx-runtime";
import { a as useAuth, j as useToast, s as supabase, C as Card, e as CardHeader, f as CardTitle, g as CardContent, B as Button, i as useLocalizedNavigate, b as useUserRole, L as Layout } from "../main.mjs";
import { Shield, UserMinus, Crown, UserPlus, ArrowLeft, Image, Settings, Users } from "lucide-react";
import { useState, useEffect } from "react";
import { B as Badge } from "./badge-DObGNgcP.js";
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
const RoleManagement = () => {
  useAuth();
  const { toast } = useToast();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchUsersWithRoles();
  }, []);
  const fetchUsersWithRoles = async () => {
    try {
      const { data: profiles, error: profilesError } = await supabase.from("profiles").select("id, email, full_name");
      if (profilesError) throw profilesError;
      const { data: userRoles, error: rolesError } = await supabase.from("user_roles").select("user_id, role");
      if (rolesError) throw rolesError;
      const { data: paintingCounts, error: paintingsError } = await supabase.from("paintings").select("owner_id").then(({ data, error }) => {
        if (error) throw error;
        const counts = {};
        data == null ? void 0 : data.forEach((painting) => {
          counts[painting.owner_id] = (counts[painting.owner_id] || 0) + 1;
        });
        return { data: counts, error: null };
      });
      if (paintingsError) throw paintingsError;
      const usersWithRoles = profiles.map((profile) => ({
        ...profile,
        roles: userRoles.filter((role) => role.user_id === profile.id).map((role) => role.role),
        paintingCount: paintingCounts[profile.id] || 0
      }));
      setUsers(usersWithRoles);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast({
        title: "Error",
        description: "Failed to fetch users",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  const assignAdminRole = async (userId) => {
    try {
      const { error } = await supabase.from("user_roles").insert({ user_id: userId, role: "admin" }).select();
      if (error) throw error;
      toast({
        title: "Success",
        description: "Admin role assigned successfully"
      });
      fetchUsersWithRoles();
    } catch (error) {
      console.error("Error assigning admin role:", error);
      toast({
        title: "Error",
        description: "Failed to assign admin role",
        variant: "destructive"
      });
    }
  };
  const removeAdminRole = async (userId) => {
    try {
      const { error } = await supabase.from("user_roles").delete().eq("user_id", userId).eq("role", "admin");
      if (error) throw error;
      toast({
        title: "Success",
        description: "Admin role removed successfully"
      });
      fetchUsersWithRoles();
    } catch (error) {
      console.error("Error removing admin role:", error);
      toast({
        title: "Error",
        description: "Failed to remove admin role",
        variant: "destructive"
      });
    }
  };
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "text-center", children: "Loading users..." });
  }
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsx(CardTitle, { children: "User Role Management" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Manage administrative privileges. Owner status is automatically derived from painting ownership." })
      ] }),
      /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
        users.map((userItem) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-4 border rounded-lg", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsx("h4", { className: "font-medium", children: userItem.full_name || userItem.email }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: userItem.email }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-2 mt-2", children: [
              userItem.roles.includes("admin") && /* @__PURE__ */ jsxs(Badge, { variant: "default", className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsx(Shield, { className: "h-3 w-3" }),
                "Admin",
                /* @__PURE__ */ jsx(
                  UserMinus,
                  {
                    className: "h-3 w-3 cursor-pointer hover:text-red-500",
                    onClick: () => removeAdminRole(userItem.id)
                  }
                )
              ] }),
              userItem.paintingCount > 0 && /* @__PURE__ */ jsxs(Badge, { variant: "secondary", className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsx(Crown, { className: "h-3 w-3" }),
                "Owner (",
                userItem.paintingCount,
                ")"
              ] }),
              userItem.roles.length === 0 && userItem.paintingCount === 0 && /* @__PURE__ */ jsx(Badge, { variant: "outline", children: "No roles" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: !userItem.roles.includes("admin") && /* @__PURE__ */ jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: () => assignAdminRole(userItem.id),
              className: "flex items-center gap-1",
              children: [
                /* @__PURE__ */ jsx(UserPlus, { className: "h-3 w-3" }),
                "Make Admin"
              ]
            }
          ) })
        ] }, userItem.id)),
        users.length === 0 && /* @__PURE__ */ jsx("div", { className: "text-center py-8 text-muted-foreground", children: "No users found" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { className: "text-sm", children: "Role System Explanation" }) }),
      /* @__PURE__ */ jsxs(CardContent, { className: "text-sm text-muted-foreground space-y-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Shield, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxs("span", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Admin:" }),
            " Explicit role with full system access"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Crown, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxs("span", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Owner:" }),
            " Automatically derived from painting ownership"
          ] })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-xs mt-2", children: "Owner status is automatically granted when users have paintings assigned to them and allows QR code management for their paintings." })
      ] })
    ] })
  ] });
};
const AdminDashboard = () => {
  const navigate = useLocalizedNavigate();
  const { isAdmin, loading } = useUserRole();
  if (loading) {
    return /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 py-8", children: /* @__PURE__ */ jsx("div", { className: "text-center", children: "Loading..." }) }) });
  }
  if (!isAdmin) {
    return /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 py-8", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold mb-4", children: "Access Denied" }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mb-4", children: "Only administrators can access this page." }),
      /* @__PURE__ */ jsx(Button, { onClick: () => navigate("/gallery"), children: "Back to Gallery" })
    ] }) }) });
  }
  return /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 py-8 max-w-6xl", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-8", children: [
      /* @__PURE__ */ jsxs(Button, { variant: "outline", onClick: () => navigate("/gallery"), children: [
        /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4 mr-2" }),
        "Back to Gallery"
      ] }),
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold", children: "Admin Dashboard" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-8", children: [
      /* @__PURE__ */ jsxs(Card, { className: "cursor-pointer hover:shadow-lg transition-shadow", onClick: () => navigate("/gallery/manage"), children: [
        /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Image, { className: "h-5 w-5" }),
          "Gallery Management"
        ] }) }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Manage paintings, owners, and content" }) })
      ] }),
      /* @__PURE__ */ jsxs(Card, { className: "cursor-pointer hover:shadow-lg transition-shadow", onClick: () => navigate("/gallery/manage/add"), children: [
        /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Settings, { className: "h-5 w-5" }),
          "Add Painting"
        ] }) }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Add new paintings to the gallery" }) })
      ] }),
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Users, { className: "h-5 w-5" }),
          "User Management"
        ] }) }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Manage user roles and permissions" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx(RoleManagement, {})
  ] }) });
};
export {
  AdminDashboard as default
};
