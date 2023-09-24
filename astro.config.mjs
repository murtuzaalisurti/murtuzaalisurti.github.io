import { defineConfig } from 'astro/config';
import million from 'million/compiler';
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://murtuzaalisurti.github.io",
  integrations: [
    react(),
    sitemap({
      changefreq: "monthly",
      lastmod: new Date(),
      priority: 1.0
    })
  ],
  vite: {
    plugins: [
      million.vite({
        mode: 'react',
        server: true
      })
    ]
  },
  server: {
    port: 3000
  }
});