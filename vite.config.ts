import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";
import { fileURLToPath } from "node:url";

const srcDir = fileURLToPath(new URL("./src", import.meta.url));
const isGitHubActions = process.env.GITHUB_ACTIONS === "true";

export default defineConfig({
  // GitHub Pages serves this project from /sf2/.
  base: isGitHubActions ? "/sf2/" : "/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(srcDir),
    },
  },
});
