import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// The production build is emitted straight into the Spring Boot static resources so the
// backend serves the SPA at http://localhost:8090. In dev, /api is proxied to the backend.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "../backend/src/main/resources/static",
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    proxy: {
      "/api": "http://localhost:8090",
    },
  },
});
