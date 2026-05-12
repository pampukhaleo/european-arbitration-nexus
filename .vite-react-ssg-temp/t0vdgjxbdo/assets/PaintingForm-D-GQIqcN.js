import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { c as cn, a as useAuth, j as useToast, B as Button, s as supabase, i as useLocalizedNavigate, u as useLanguage, b as useUserRole, L as Layout, C as Card, e as CardHeader, f as CardTitle, g as CardContent } from "../main.mjs";
import { I as Input } from "./input-6XZgwDxx.js";
import { L as Label } from "./label-CtFE5ecu.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-59t4oWUK.js";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-70YdplOt.js";
import { X, Image, Upload, ArrowLeft, Save } from "lucide-react";
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
import "@radix-ui/react-tabs";
import "@radix-ui/react-select";
const Textarea = React.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "textarea",
      {
        className: cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Textarea.displayName = "Textarea";
const Switch = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SwitchPrimitives.Root,
  {
    className: cn(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className
    ),
    ...props,
    ref,
    children: /* @__PURE__ */ jsx(
      SwitchPrimitives.Thumb,
      {
        className: cn(
          "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
        )
      }
    )
  }
));
Switch.displayName = SwitchPrimitives.Root.displayName;
const ImageUpload = ({
  currentImageUrl,
  onImageUploaded,
  onImageRemoved
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const uploadImage = async (file) => {
    if (!user) return;
    setUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage.from("paintings").upload(fileName, file);
      if (uploadError) throw uploadError;
      const { data } = supabase.storage.from("paintings").getPublicUrl(fileName);
      onImageUploaded(data.publicUrl);
      toast({
        title: "Success",
        description: "Image uploaded successfully"
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };
  const handleFileSelect = (e) => {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "Error",
          description: "File size must be less than 10MB",
          variant: "destructive"
        });
        return;
      }
      uploadImage(file);
    }
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      uploadImage(file);
    }
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };
  const removeImage = () => {
    onImageRemoved();
    toast({
      title: "Success",
      description: "Image removed"
    });
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsx(Label, { children: "Painting Image" }),
    currentImageUrl ? /* @__PURE__ */ jsx("div", { className: "space-y-4", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: currentImageUrl,
          alt: "Painting preview",
          className: "w-full h-64 object-cover rounded-lg border"
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          type: "button",
          variant: "destructive",
          size: "sm",
          className: "absolute top-2 right-2",
          onClick: removeImage,
          children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
        }
      )
    ] }) }) : /* @__PURE__ */ jsxs(
      "div",
      {
        className: `border-2 border-dashed rounded-lg p-8 text-center transition-colors ${dragOver ? "border-primary bg-primary/10" : "border-muted-foreground/25"}`,
        onDrop: handleDrop,
        onDragOver: handleDragOver,
        onDragLeave: handleDragLeave,
        children: [
          /* @__PURE__ */ jsx(Image, { className: "h-12 w-12 mx-auto mb-4 text-muted-foreground" }),
          /* @__PURE__ */ jsx("p", { className: "text-lg font-semibold mb-2", children: "Upload Painting Image" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mb-4", children: "Drag and drop your image here, or click to select" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              type: "file",
              accept: "image/*",
              onChange: handleFileSelect,
              className: "hidden",
              id: "image-upload",
              disabled: uploading
            }
          ),
          /* @__PURE__ */ jsxs(
            Button,
            {
              type: "button",
              variant: "outline",
              onClick: () => {
                var _a;
                return (_a = document.getElementById("image-upload")) == null ? void 0 : _a.click();
              },
              disabled: uploading,
              children: [
                /* @__PURE__ */ jsx(Upload, { className: "h-4 w-4 mr-2" }),
                uploading ? "Uploading..." : "Select Image"
              ]
            }
          ),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground mt-2", children: "Maximum file size: 10MB" })
        ]
      }
    )
  ] });
};
const PaintingForm = () => {
  const { id } = useParams();
  const navigate = useLocalizedNavigate();
  const { user } = useAuth();
  useLanguage();
  const { isAdmin, loading: roleLoading } = useUserRole();
  const { toast } = useToast();
  const isEditing = Boolean(id);
  const [loading, setLoading] = useState(false);
  const [owners, setOwners] = useState([]);
  const [selectedOwnerIds, setSelectedOwnerIds] = useState([]);
  const [selectedOwnerId, setSelectedOwnerId] = useState("");
  const [formData, setFormData] = useState({
    title_en: "",
    title_fr: "",
    title_ru: "",
    artist_en: "",
    artist_fr: "",
    artist_ru: "",
    original_title: "",
    description_en: "",
    description_fr: "",
    description_ru: "",
    artist_dates: "",
    date_place_made_en: "",
    date_place_made_fr: "",
    date_place_made_ru: "",
    materials_en: "",
    materials_fr: "",
    materials_ru: "",
    dimensions: "",
    frame_en: "",
    frame_fr: "",
    frame_ru: "",
    genre_en: "",
    genre_fr: "",
    genre_ru: "",
    year: null,
    public_image_url: "",
    is_published: true,
    owner_id: ""
  });
  const [privateData, setPrivateData] = useState({
    eac_inventory_no: "",
    eac_passport_no: "",
    eac_issue_date: ""
  });
  useEffect(() => {
    if (!roleLoading) {
      if (!isAdmin) {
        navigate("/gallery/manage");
        return;
      }
      fetchOwners();
      if (isEditing && id) {
        fetchPainting();
      }
    }
  }, [id, isEditing, isAdmin, roleLoading]);
  const fetchOwners = async () => {
    try {
      const { data, error } = await supabase.from("profiles").select("id, email, full_name").order("email");
      if (error) throw error;
      setOwners(data || []);
    } catch (error) {
      console.error("Error fetching owners:", error);
    }
  };
  const fetchPainting = async () => {
    if (!id || !user) return;
    setLoading(true);
    try {
      const { data, error } = await supabase.from("paintings").select("*").eq("id", id).single();
      if (error) throw error;
      if (data) {
        setFormData({
          title_en: data.title_en || "",
          title_fr: data.title_fr || "",
          title_ru: data.title_ru || "",
          artist_en: data.artist_en || "",
          artist_fr: data.artist_fr || "",
          artist_ru: data.artist_ru || "",
          original_title: data.original_title || "",
          description_en: data.description_en || "",
          description_fr: data.description_fr || "",
          description_ru: data.description_ru || "",
          artist_dates: data.artist_dates || "",
          date_place_made_en: data.date_place_made_en || "",
          date_place_made_fr: data.date_place_made_fr || "",
          date_place_made_ru: data.date_place_made_ru || "",
          materials_en: data.materials_en || "",
          materials_fr: data.materials_fr || "",
          materials_ru: data.materials_ru || "",
          dimensions: data.dimensions || "",
          frame_en: data.frame_en || "",
          frame_fr: data.frame_fr || "",
          frame_ru: data.frame_ru || "",
          genre_en: data.genre_en || "",
          genre_fr: data.genre_fr || "",
          genre_ru: data.genre_ru || "",
          year: data.year,
          public_image_url: data.public_image_url || "",
          is_published: data.is_published ?? true,
          owner_id: data.owner_id || ""
        });
        const { data: paintingOwners, error: ownersError } = await supabase.from("painting_owners").select("owner_id").eq("painting_id", id);
        if (!ownersError && paintingOwners && paintingOwners.length > 0) {
          setSelectedOwnerIds(paintingOwners.map((po) => po.owner_id));
        } else if (data.owner_id) {
          setSelectedOwnerIds([data.owner_id]);
        }
        const { data: privateDataResult, error: privateError } = await supabase.from("painting_private").select("*").eq("painting_id", id).maybeSingle();
        if (!privateError && privateDataResult) {
          setPrivateData({
            eac_inventory_no: privateDataResult.eac_inventory_no || "",
            eac_passport_no: privateDataResult.eac_passport_no || "",
            eac_issue_date: privateDataResult.eac_issue_date || ""
          });
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch painting",
        variant: "destructive"
      });
      navigate("/gallery/manage");
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !isAdmin) return;
    if (selectedOwnerIds.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one owner for the painting",
        variant: "destructive"
      });
      return;
    }
    setLoading(true);
    const paintingData = {
      ...formData,
      // Set owner_id to the first selected owner for backward compatibility
      owner_id: selectedOwnerIds[0],
      // Auto-populate missing language fields for new paintings
      title_fr: formData.title_fr || formData.title_en,
      title_ru: formData.title_ru || formData.title_en,
      artist_fr: formData.artist_fr || formData.artist_en,
      artist_ru: formData.artist_ru || formData.artist_en,
      description_fr: formData.description_fr || formData.description_en,
      description_ru: formData.description_ru || formData.description_en,
      date_place_made_fr: formData.date_place_made_fr || formData.date_place_made_en,
      date_place_made_ru: formData.date_place_made_ru || formData.date_place_made_en,
      materials_fr: formData.materials_fr || formData.materials_en,
      materials_ru: formData.materials_ru || formData.materials_en,
      frame_fr: formData.frame_fr || formData.frame_en,
      frame_ru: formData.frame_ru || formData.frame_en,
      genre_fr: formData.genre_fr || formData.genre_en,
      genre_ru: formData.genre_ru || formData.genre_en,
      updated_at: (/* @__PURE__ */ new Date()).toISOString()
    };
    let paintingId = id;
    try {
      if (isEditing && id) {
        const { error } = await supabase.from("paintings").update(paintingData).eq("id", id);
        if (error) throw error;
      } else {
        const { data, error } = await supabase.from("paintings").insert([paintingData]).select("id").single();
        if (error) throw error;
        paintingId = data.id;
      }
      if (paintingId) {
        if (isEditing && id) {
          const { data: currentOwners } = await supabase.from("painting_owners").select("owner_id").eq("painting_id", id);
          const currentOwnerIds = (currentOwners == null ? void 0 : currentOwners.map((o) => o.owner_id)) || [];
          const toDelete = currentOwnerIds.filter((oid) => !selectedOwnerIds.includes(oid));
          const toInsert = selectedOwnerIds.filter((oid) => !currentOwnerIds.includes(oid));
          if (toDelete.length > 0) {
            await supabase.from("painting_owners").delete().eq("painting_id", id).in("owner_id", toDelete);
          }
          if (toInsert.length > 0) {
            await supabase.from("painting_owners").insert(toInsert.map((ownerId) => ({
              painting_id: id,
              owner_id: ownerId
            })));
          }
        } else {
          await supabase.from("painting_owners").insert(selectedOwnerIds.map((ownerId) => ({
            painting_id: paintingId,
            owner_id: ownerId
          })));
        }
      }
      if (paintingId && (privateData.eac_inventory_no || privateData.eac_passport_no || privateData.eac_issue_date)) {
        const { error: privateError } = await supabase.from("painting_private").upsert({
          painting_id: paintingId,
          ...privateData,
          eac_issue_date: privateData.eac_issue_date || null
        });
        if (privateError) throw privateError;
      }
      toast({
        title: "Success",
        description: `Painting ${isEditing ? "updated" : "created"} successfully`
      });
      navigate("/gallery/manage");
    } catch (error) {
      console.error("Database error:", error);
      toast({
        title: "Error",
        description: `Failed to ${isEditing ? "update" : "create"} painting`,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const updatePrivateData = (field, value) => {
    setPrivateData((prev) => ({ ...prev, [field]: value }));
  };
  if (roleLoading) {
    return /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 py-8", children: /* @__PURE__ */ jsx("div", { className: "text-center", children: "Loading..." }) }) });
  }
  if (!isAdmin) {
    return /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 py-8", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold mb-4", children: "Access Denied" }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mb-4", children: "Only administrators can add or edit paintings." }),
      /* @__PURE__ */ jsx(Button, { onClick: () => navigate("/gallery/manage"), children: "Back to Gallery Management" })
    ] }) }) });
  }
  return /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 py-8 max-w-4xl", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-8", children: [
      /* @__PURE__ */ jsxs(Button, { variant: "outline", onClick: () => navigate("/gallery/manage"), children: [
        /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4 mr-2" }),
        "Back to Gallery"
      ] }),
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold", children: isEditing ? "Edit Painting" : "Add New Painting" })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { children: "Image" }) }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx(
          ImageUpload,
          {
            currentImageUrl: formData.public_image_url,
            onImageUploaded: (url) => updateFormData("public_image_url", url),
            onImageRemoved: () => updateFormData("public_image_url", "")
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { children: "Owners" }) }),
        /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "owner_select", children: "Add Owner" }),
              /* @__PURE__ */ jsxs(Select, { value: selectedOwnerId, onValueChange: setSelectedOwnerId, children: [
                /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select an owner..." }) }),
                /* @__PURE__ */ jsx(SelectContent, { children: owners.filter((owner) => !selectedOwnerIds.includes(owner.id)).map((owner) => /* @__PURE__ */ jsxs(SelectItem, { value: owner.id, children: [
                  owner.full_name || owner.email,
                  " (",
                  owner.email,
                  ")"
                ] }, owner.id)) })
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex items-end", children: /* @__PURE__ */ jsx(
              Button,
              {
                type: "button",
                onClick: () => {
                  if (selectedOwnerId && !selectedOwnerIds.includes(selectedOwnerId)) {
                    setSelectedOwnerIds([...selectedOwnerIds, selectedOwnerId]);
                    setSelectedOwnerId("");
                  }
                },
                disabled: !selectedOwnerId,
                children: "Add"
              }
            ) })
          ] }),
          selectedOwnerIds.length > 0 && /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { children: "Selected Owners" }),
            /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: selectedOwnerIds.map((ownerId) => {
              const owner = owners.find((o) => o.id === ownerId);
              return /* @__PURE__ */ jsxs(
                "div",
                {
                  className: "flex items-center gap-2 px-3 py-1 bg-secondary rounded-full text-sm",
                  children: [
                    /* @__PURE__ */ jsx("span", { children: (owner == null ? void 0 : owner.full_name) || (owner == null ? void 0 : owner.email) || "Unknown" }),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setSelectedOwnerIds(selectedOwnerIds.filter((id2) => id2 !== ownerId)),
                        className: "hover:text-destructive",
                        children: "×"
                      }
                    )
                  ]
                },
                ownerId
              );
            }) })
          ] }),
          selectedOwnerIds.length === 0 && /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "At least one owner is required" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { children: "Key Facts" }) }),
        /* @__PURE__ */ jsxs(CardContent, { className: "space-y-6", children: [
          isEditing ? /* @__PURE__ */ jsxs(Tabs, { defaultValue: "en", className: "w-full", children: [
            /* @__PURE__ */ jsxs(TabsList, { className: "grid w-full grid-cols-3", children: [
              /* @__PURE__ */ jsx(TabsTrigger, { value: "en", children: "English" }),
              /* @__PURE__ */ jsx(TabsTrigger, { value: "fr", children: "Français" }),
              /* @__PURE__ */ jsx(TabsTrigger, { value: "ru", children: "Русский" })
            ] }),
            /* @__PURE__ */ jsxs(TabsContent, { value: "en", className: "space-y-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: "title_en", children: "Title (English)" }),
                  /* @__PURE__ */ jsx(
                    Input,
                    {
                      id: "title_en",
                      value: formData.title_en,
                      onChange: (e) => updateFormData("title_en", e.target.value),
                      required: true
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: "artist_en", children: "Artist (English)" }),
                  /* @__PURE__ */ jsx(
                    Input,
                    {
                      id: "artist_en",
                      value: formData.artist_en,
                      onChange: (e) => updateFormData("artist_en", e.target.value),
                      required: true
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: "original_title", children: "Original Title" }),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    id: "original_title",
                    value: formData.original_title,
                    onChange: (e) => updateFormData("original_title", e.target.value),
                    placeholder: "Original title of the artwork"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: "description_en", children: "Description (English)" }),
                /* @__PURE__ */ jsx(
                  Textarea,
                  {
                    id: "description_en",
                    value: formData.description_en,
                    onChange: (e) => updateFormData("description_en", e.target.value),
                    rows: 3
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: "date_place_made_en", children: "Date and Place Made" }),
                  /* @__PURE__ */ jsx(
                    Input,
                    {
                      id: "date_place_made_en",
                      value: formData.date_place_made_en,
                      onChange: (e) => updateFormData("date_place_made_en", e.target.value)
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: "materials_en", children: "Materials" }),
                  /* @__PURE__ */ jsx(
                    Input,
                    {
                      id: "materials_en",
                      value: formData.materials_en,
                      onChange: (e) => updateFormData("materials_en", e.target.value)
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-4", children: /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: "frame_en", children: "Frame" }),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    id: "frame_en",
                    value: formData.frame_en,
                    onChange: (e) => updateFormData("frame_en", e.target.value)
                  }
                )
              ] }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: "genre_en", children: "Genre" }),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    id: "genre_en",
                    value: formData.genre_en,
                    onChange: (e) => updateFormData("genre_en", e.target.value)
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs(TabsContent, { value: "fr", className: "space-y-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: "title_fr", children: "Titre (Français)" }),
                  /* @__PURE__ */ jsx(
                    Input,
                    {
                      id: "title_fr",
                      value: formData.title_fr,
                      onChange: (e) => updateFormData("title_fr", e.target.value),
                      required: true
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: "artist_fr", children: "Artiste (Français)" }),
                  /* @__PURE__ */ jsx(
                    Input,
                    {
                      id: "artist_fr",
                      value: formData.artist_fr,
                      onChange: (e) => updateFormData("artist_fr", e.target.value),
                      required: true
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: "description_fr", children: "Description (Français)" }),
                /* @__PURE__ */ jsx(
                  Textarea,
                  {
                    id: "description_fr",
                    value: formData.description_fr,
                    onChange: (e) => updateFormData("description_fr", e.target.value),
                    rows: 3
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: "date_place_made_fr", children: "Date et Lieu de Création" }),
                  /* @__PURE__ */ jsx(
                    Input,
                    {
                      id: "date_place_made_fr",
                      value: formData.date_place_made_fr,
                      onChange: (e) => updateFormData("date_place_made_fr", e.target.value)
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: "materials_fr", children: "Matériaux" }),
                  /* @__PURE__ */ jsx(
                    Input,
                    {
                      id: "materials_fr",
                      value: formData.materials_fr,
                      onChange: (e) => updateFormData("materials_fr", e.target.value)
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-4", children: /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: "frame_fr", children: "Cadre" }),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    id: "frame_fr",
                    value: formData.frame_fr,
                    onChange: (e) => updateFormData("frame_fr", e.target.value)
                  }
                )
              ] }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: "genre_fr", children: "Genre" }),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    id: "genre_fr",
                    value: formData.genre_fr,
                    onChange: (e) => updateFormData("genre_fr", e.target.value)
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs(TabsContent, { value: "ru", className: "space-y-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: "title_ru", children: "Название (Русский)" }),
                  /* @__PURE__ */ jsx(
                    Input,
                    {
                      id: "title_ru",
                      value: formData.title_ru,
                      onChange: (e) => updateFormData("title_ru", e.target.value),
                      required: true
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: "artist_ru", children: "Художник (Русский)" }),
                  /* @__PURE__ */ jsx(
                    Input,
                    {
                      id: "artist_ru",
                      value: formData.artist_ru,
                      onChange: (e) => updateFormData("artist_ru", e.target.value),
                      required: true
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: "description_ru", children: "Описание (Русский)" }),
                /* @__PURE__ */ jsx(
                  Textarea,
                  {
                    id: "description_ru",
                    value: formData.description_ru,
                    onChange: (e) => updateFormData("description_ru", e.target.value),
                    rows: 3
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: "date_place_made_ru", children: "Дата и Место Создания" }),
                  /* @__PURE__ */ jsx(
                    Input,
                    {
                      id: "date_place_made_ru",
                      value: formData.date_place_made_ru,
                      onChange: (e) => updateFormData("date_place_made_ru", e.target.value)
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: "materials_ru", children: "Материалы" }),
                  /* @__PURE__ */ jsx(
                    Input,
                    {
                      id: "materials_ru",
                      value: formData.materials_ru,
                      onChange: (e) => updateFormData("materials_ru", e.target.value)
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-4", children: /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: "frame_ru", children: "Рама" }),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    id: "frame_ru",
                    value: formData.frame_ru,
                    onChange: (e) => updateFormData("frame_ru", e.target.value)
                  }
                )
              ] }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: "genre_ru", children: "Жанр" }),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    id: "genre_ru",
                    value: formData.genre_ru,
                    onChange: (e) => updateFormData("genre_ru", e.target.value)
                  }
                )
              ] })
            ] })
          ] }) : (
            /* English-only form for adding new paintings */
            /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: "title_en", children: "Title" }),
                  /* @__PURE__ */ jsx(
                    Input,
                    {
                      id: "title_en",
                      value: formData.title_en,
                      onChange: (e) => updateFormData("title_en", e.target.value),
                      required: true
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: "artist_en", children: "Artist" }),
                  /* @__PURE__ */ jsx(
                    Input,
                    {
                      id: "artist_en",
                      value: formData.artist_en,
                      onChange: (e) => updateFormData("artist_en", e.target.value),
                      required: true
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: "original_title", children: "Original Title" }),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    id: "original_title",
                    value: formData.original_title,
                    onChange: (e) => updateFormData("original_title", e.target.value),
                    placeholder: "Original title of the artwork"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: "description_en", children: "Description" }),
                /* @__PURE__ */ jsx(
                  Textarea,
                  {
                    id: "description_en",
                    value: formData.description_en,
                    onChange: (e) => updateFormData("description_en", e.target.value),
                    rows: 3
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: "date_place_made_en", children: "Date and Place Made" }),
                  /* @__PURE__ */ jsx(
                    Input,
                    {
                      id: "date_place_made_en",
                      value: formData.date_place_made_en,
                      onChange: (e) => updateFormData("date_place_made_en", e.target.value)
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: "materials_en", children: "Materials" }),
                  /* @__PURE__ */ jsx(
                    Input,
                    {
                      id: "materials_en",
                      value: formData.materials_en,
                      onChange: (e) => updateFormData("materials_en", e.target.value)
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-4", children: /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: "frame_en", children: "Frame" }),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    id: "frame_en",
                    value: formData.frame_en,
                    onChange: (e) => updateFormData("frame_en", e.target.value)
                  }
                )
              ] }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: "genre_en", children: "Genre" }),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    id: "genre_en",
                    value: formData.genre_en,
                    onChange: (e) => updateFormData("genre_en", e.target.value)
                  }
                )
              ] })
            ] })
          ),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4 pt-4 border-t", children: [
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: "artist_dates", children: "Artist Dates" }),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    id: "artist_dates",
                    value: formData.artist_dates,
                    onChange: (e) => updateFormData("artist_dates", e.target.value),
                    placeholder: "e.g., 1881-1973"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: "dimensions", children: "Dimensions" }),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    id: "dimensions",
                    value: formData.dimensions,
                    onChange: (e) => updateFormData("dimensions", e.target.value),
                    placeholder: "e.g., 100 × 80 cm"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: "year", children: "Year" }),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    id: "year",
                    type: "number",
                    value: formData.year || "",
                    onChange: (e) => updateFormData("year", e.target.value ? parseInt(e.target.value) : null)
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
                /* @__PURE__ */ jsx(
                  Switch,
                  {
                    id: "is_published",
                    checked: formData.is_published,
                    onCheckedChange: (checked) => updateFormData("is_published", checked)
                  }
                ),
                /* @__PURE__ */ jsx(Label, { htmlFor: "is_published", children: "Published" })
              ] })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsx(CardTitle, { children: "Private Information (EAC Data)" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "This information is only accessible via QR code tokens or by owners/admins" })
        ] }),
        /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "eac_inventory_no", children: "EAC Inventory No." }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "eac_inventory_no",
                  value: privateData.eac_inventory_no,
                  onChange: (e) => updatePrivateData("eac_inventory_no", e.target.value)
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "eac_passport_no", children: "EAC Passport No." }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "eac_passport_no",
                  value: privateData.eac_passport_no,
                  onChange: (e) => updatePrivateData("eac_passport_no", e.target.value)
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "eac_issue_date", children: "Date of Issue" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "eac_issue_date",
                type: "date",
                value: privateData.eac_issue_date,
                onChange: (e) => updatePrivateData("eac_issue_date", e.target.value)
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
        /* @__PURE__ */ jsxs(Button, { type: "submit", disabled: loading, children: [
          /* @__PURE__ */ jsx(Save, { className: "h-4 w-4 mr-2" }),
          loading ? "Saving..." : isEditing ? "Update Painting" : "Create Painting"
        ] }),
        /* @__PURE__ */ jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: () => navigate("/gallery/manage"),
            children: "Cancel"
          }
        )
      ] })
    ] })
  ] }) });
};
export {
  PaintingForm as default
};
