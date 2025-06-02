import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  clean: true,
  treeshake: true,
  splitting: true,
  sourcemap: true,
  minify: true,
  external: ['react', 'react-dom', 'react-native', 'clsx', 'tailwind-merge'],
  esbuildOptions(options) {
    options.conditions = ['module'];
  },
});
