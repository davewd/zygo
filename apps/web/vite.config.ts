import tailwindcss from '@tailwindcss/vite';
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
      'react-native-web'
    ],
    exclude: [
      'react-native-reanimated',
      'expo-image'
    ],
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
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
      
      // Stub out React Native internals that don't exist in React Native Web
      "react-native/Libraries/ReactNative/ReactFabricPublicInstance/ReactFabricPublicInstance": path.resolve(__dirname, "src/stubs/ReactFabricPublicInstance.js"),
      "react-native/Libraries/Renderer/shims/ReactFabric": path.resolve(__dirname, "src/stubs/ReactFabric.js"),
      "react-native/Libraries/Renderer/shims/ReactNative": path.resolve(__dirname, "src/stubs/ReactNative.js"),
      "react-native/Libraries/Image/resolveAssetSource": path.resolve(__dirname, "src/stubs/resolveAssetSource.js"),
      "react-native/Libraries/Utilities/codegenNativeComponent": path.resolve(__dirname, "src/stubs/codegenNativeComponent.js"),
      "react-native/Libraries/Utilities/codegenNativeCommands": path.resolve(__dirname, "src/stubs/codegenNativeCommands.js"),
      "react-native/Libraries/ReactNative/AppContainer": path.resolve(__dirname, "src/stubs/AppContainer.js"),

      // Alternative approach: Use a custom react-native stub that includes missing exports
      "react-native": path.resolve(__dirname, "src/stubs/react-native-web-extended.js"),
      "react-native-reanimated": path.resolve(__dirname, "src/stubs/react-native-reanimated-web-extended.js"),
    },
    extensions: ['.web.js', '.web.ts', '.web.tsx', '.web.jsx', '.mjs', '.js', '.jsx', '.ts', '.tsx', '.json']
  },
  server: {
    host: "::",
    port: 8083,
  }
});
