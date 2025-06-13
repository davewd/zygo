import tailwindcss from '@tailwindcss/vite';
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  esbuild: {
    loader: 'tsx',
    include: [
      // Handle JSX in all JS/TS files
      "**/*.js",
      "**/*.jsx",
      "**/*.ts",
      "**/*.tsx",
    ],
    exclude: [],
    jsxFactory: 'React.createElement',
    jsxFragment: 'React.Fragment',
    target: 'es2020',
    tsconfigRaw: {
      compilerOptions: {
        strict: true,
        target: 'es2020',
        jsx: 'preserve',
      },
    },
  },
  optimizeDeps: {
    include: [
    ],
    exclude: [
    ],
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
        '.ts': 'tsx',
        '.tsx': 'tsx',
      },
      jsx: 'transform',
      jsxFactory: 'React.createElement',
      jsxFragment: 'React.Fragment',
    },
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    extensions: ['.web.js', '.web.ts', '.web.tsx', '.web.jsx', '.mjs', '.js', '.jsx', '.ts', '.tsx', '.json']
  },
  server: {
    host: "::",
    open: true,
    port: 8083,
  }
});
