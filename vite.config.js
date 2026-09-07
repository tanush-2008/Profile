import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3000,
    allowedHosts: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(process.cwd(), "src"),
    },
  },
  build: {
    // Never ship source maps to the public — the single biggest code-leak vector.
    sourcemap: false,
    // Terser gives deeper compression + name mangling vs the default esbuild minifier.
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,   // strip all console.* calls
        drop_debugger: true,  // strip debugger statements
        passes: 3,            // multiple compression passes for smaller output
      },
      mangle: {
        // Mangle all identifiers — makes the bundle much harder to read
        toplevel: true,
      },
      format: {
        // Ensure no sourceMappingURL comment is ever written
        source_map: null,
        comments: false,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom", "react-helmet-async"],
          framer: ["framer-motion"],
        },
      },
    },
  },
});