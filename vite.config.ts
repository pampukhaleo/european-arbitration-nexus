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
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
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
