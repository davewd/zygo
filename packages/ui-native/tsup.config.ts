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
    'react-native',
    '@zygo/hooks',
    '@zygo/hooks-native',
    '@zygo/libs',
    '@zygo/types',
    "@zygo/typescript-config",
  ],
  esbuildOptions(options) {
    options.conditions = ['module'];
  },
});
