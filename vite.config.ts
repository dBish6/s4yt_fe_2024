import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "https://localhost:4000",
        changeOrigin: true,
        secure: true,
        // ws: true
      },
      "/socket.io/": {
        target: "http://localhost:4000",
        changeOrigin: true,
        ws: true
      }
    }
  },
  css: {
    modules: {
      localsConvention: "camelCaseOnly",
    }
  },
  plugins: [react(), tsconfigPaths()],
  build: {
    outDir: "build"
  }
});
