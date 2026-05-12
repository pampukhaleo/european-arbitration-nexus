import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";


export default defineConfig(({ mode }) => ({
  base: "/",
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    // Inject the Lovable in-editor agent only at dev time. Including it in the
    // production HTML breaks vite-react-ssg's SSR pass (Rollup tries to resolve
    // it as an entry module).
    mode === "development" && {
      name: "lovable-gpteng-script",
      transformIndexHtml() {
        return [
          {
            tag: "script",
            attrs: { src: "https://cdn.gpteng.co/gptengineer.js", type: "module", defer: true },
            injectTo: "body" as const,
          },
        ];
      },
    },
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react-helmet-async"],
  },
  // Bundle react-helmet-async into the SSR pass so the app and any helmet
  // consumer share a single module instance — without this, <Helmet> writes
  // to a different React context than the SSR renderer reads, and head tags
  // (title / description / canonical / hreflang) never reach the HTML.
  ssr: {
    noExternal: ["react-helmet-async", "vite-react-ssg"],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;

          if (id.includes("react-router") || id.includes("/react-dom/") || /node_modules\/react\//.test(id)) {
            return "react";
          }
          if (id.includes("@radix-ui")) {
            return "radix";
          }
          if (id.includes("@supabase")) {
            return "supabase";
          }
          if (id.includes("lucide-react")) {
            return "lucide";
          }
          if (
            id.includes("react-hook-form") ||
            id.includes("@hookform") ||
            id.includes("/zod/")
          ) {
            return "forms";
          }
        },
      },
    },
  },
}));
