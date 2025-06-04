import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  clean: true,
  treeshake: true,
  splitting: true,
  sourcemap: true,
  minify: true,
  external: [
    'react',
    'react-dom',
    '@zygo/hooks',
    '@zygo/libs',
    '@zygo/types'
  ],
  esbuildOptions(options) {
    options.conditions = ['module'];
  },
});
