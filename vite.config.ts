import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    // ① TanStack Router — auto-generates routeTree.gen.ts from src/routes/
    TanStackRouterVite({ routesDirectory: "./src/routes" }),
    // ② React JSX + fast refresh
    react(),
    // ③ Tailwind CSS v4 via Vite plugin (no separate config file needed)
    tailwindcss(),
    // ④ Resolves "@/" path alias from tsconfig.json
    tsConfigPaths(),
  ],
  server: {
    port: 8080,
    host: "0.0.0.0",
  },
  build: {
    outDir: "dist",
    sourcemap: false,
    rollupOptions: {
      output: {
        // Split large chunks for faster page loads
        manualChunks: {
          "react-vendor":  ["react", "react-dom"],
          "router-vendor": ["@tanstack/react-router"],
          "query-vendor":  ["@tanstack/react-query"],
          "radix-vendor":  [
            "@radix-ui/react-tabs",
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-select",
          ],
        },
      },
    },
  },
});