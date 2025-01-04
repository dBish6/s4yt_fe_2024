import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  // root: "/public",
  // mode
  server: {
    port: 3000
  },
  css: {
    modules: {
      localsConvention: "camelCaseOnly",
      // generateScopedName:
      //   mode === "production"
      //     ? "[hash:base64:8]"
      //     : "[local]_[hash:base64:5]"
    }
  },
  plugins: [react(), tsconfigPaths()],
  build: {
    outDir: "build"
  }
});
