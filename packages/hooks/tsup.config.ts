import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  treeshake: true,
  splitting: true,
  sourcemap: true,
  minify: true,
  external: ['react', 'react-dom', 'react-native'],
  esbuildOptions(options) {
    options.conditions = ['module'];
  },
});
