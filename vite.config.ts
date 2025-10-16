import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import svgLoader from "vite-svg-loader";
import path from "node:path";

export default defineConfig({
  plugins: [vue(), svgLoader()],
  base: "/pokedex/",
  server: {
    watch: {
      usePolling: true,
      interval: 100,
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
