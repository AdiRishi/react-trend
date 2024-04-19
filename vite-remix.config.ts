import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { vitePlugin as remix } from '@remix-run/dev';

export default defineConfig({
  publicDir: 'demo-app/public',
  plugins: [
    remix({
      appDirectory: 'demo-app',
      ssr: false,
    }),
    tsconfigPaths(),
  ],
});
