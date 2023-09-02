import { defineConfig } from 'astro/config';
import million from 'million/compiler';
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  vite: {
    plugins: [million.vite(
      {
        mode: 'react',
        server: true
      }
    )]
  },
  server: {
    port: 3000
  }
});