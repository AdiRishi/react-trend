import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { vitePlugin as remix } from '@remix-run/dev';

export default defineConfig({
  publicDir: 'demo-app/public',
  base: '/react-trend/',
  plugins: [
    remix({
      basename: '/react-trend/',
      future: { v3_fetcherPersist: true, v3_relativeSplatPath: true, v3_throwAbortReason: true },
      appDirectory: 'demo-app',
      ssr: false,
    }),
    tsconfigPaths(),
    visualizer({ emitFile: true }),
  ],
});
