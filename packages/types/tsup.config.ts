import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  target: 'es2022',
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
