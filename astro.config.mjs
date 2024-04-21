import { defineConfig } from 'astro/config';
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://murtuzaalisurti.github.io",
  integrations: [
    sitemap({
      changefreq: "monthly",
      lastmod: new Date(),
      priority: 1.0
    })
  ],
  server: {
    port: 3000
  }
});