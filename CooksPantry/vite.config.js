import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
  plugins: [react(),
    nodePolyfills()
  ],
  server: {
    port: 5173,
    strictPort: true,
    historyApiFallback: true,
    proxy: {
      "/api": {
        target: "http://localhost:9000",
        changeOrigin: true,
      },
    },
  },
  build: {
    rollupOptions: {
      input: "index.html", // 🔥 Explicitly set the entry file
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom"], // ✅ Ensure dependencies are pre-bundled
  },
});
