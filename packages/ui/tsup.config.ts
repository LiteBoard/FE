import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: {
    entry: './src/index.ts',
    compilerOptions: {
      incremental: false,
    },
  },
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom'],
});
