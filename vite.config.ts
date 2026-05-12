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
      // The app and vite-react-ssg must share the SAME react-helmet-async
      // instance, otherwise <Helmet> writes to a different context than the
      // SSR renderer reads and head tags never reach the pre-rendered HTML.
      "react-helmet-async": path.resolve(
        __dirname,
        "node_modules/vite-react-ssg/node_modules/react-helmet-async"
      ),
    },
    dedupe: ["react", "react-dom"],
  },
  // react-helmet-async must NOT be bundled (noExternal) — vite-react-ssg's
  // runtime loads its own external copy from node_modules at SSR time, and
  // both must share the exact same module instance for HelmetProvider's
  // context to reach <Helmet>. The alias above ensures the app resolves to
  // the same physical package as vite-react-ssg.
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
