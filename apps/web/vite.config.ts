import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  esbuild: {
    loader: 'jsx',
    include: [
      // Handle JSX in all JS/TS files
      "**/*.js",
      "**/*.jsx",
      "**/*.ts",
      "**/*.tsx"
    ],
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "react-native": "react-native-web",
    },
    extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json']
  },
  server: {
    host: "::",
    port: 8083,
  }
});
