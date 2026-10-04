import { defineConfig } from 'astro/config';
import sitemap from "@astrojs/sitemap";
import { spawn } from "node:child_process";
import path from "node:path";

// Dev-only: recompile the LaTeX resume on save and reload the browser.
function resumeLiveReload() {
  return {
    name: "resume-live-reload",
    hooks: {
      "astro:server:setup": ({ server, logger }) => {
        const tex = path.resolve("resume/resume.tex");
        let running = false;
        let queued = false;

        const build = () => {
          if (running) { queued = true; return; }
          running = true;
          // Async so the dev server isn't blocked while TeX compiles.
          const child = spawn(process.execPath, ["scripts/build-resume.mjs"], { stdio: "inherit" });
          child.on("close", (code) => {
            running = false;
            if (code === 0) server.ws.send({ type: "full-reload" });
            else logger.error("Resume build failed; keeping the previous PDF.");
            if (queued) { queued = false; build(); }
          });
        };

        server.watcher.add(tex);
        server.watcher.on("change", (file) => { if (file === tex) build(); });
        build();
      },
    },
  };
}

// https://astro.build/config
export default defineConfig({
  site: "https://murtuzaalisurti.com",
  integrations: [
    resumeLiveReload(),
    sitemap({
      changefreq: "monthly",
      lastmod: new Date(),
      priority: 1.0
    })
  ],
  server: {
    port: 3000
  },
});
