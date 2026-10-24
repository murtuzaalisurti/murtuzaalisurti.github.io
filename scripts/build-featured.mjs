// Renders the retro computer that frames the Featured slider (Three.js, path traced).
//
// Output (both committed):
//   public/assets/featured/computer.webp  transparent, cropped to the computer
//   src/data/featured-screen.json         image size + where the CRT sits in it (%),
//                                         used by Featured.astro to place thumbnails
//
// Thumbnails are not baked in; they switch live inside the screen. Re-run only
// after changing scripts/featured-scene.js. Runs locally (needs Google Chrome and
// a GPU; about a minute):
//   npm run build:featured
//   npm run build:featured -- --samples=200   quick low-quality preview

import { mkdirSync, existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { chromium } from "playwright-core";

const ROOT = process.cwd();
const OUT_IMAGE = path.join(ROOT, "public", "assets", "featured", "computer.webp");
const OUT_DATA = path.join(ROOT, "src", "data", "featured-screen.json");
const ORIGIN = "http://featured.local";
const samples = process.argv.find((a) => a.startsWith("--samples="))?.split("=")[1] ?? "";

// browser modules, straight from node_modules
const modules = {
    three: "/three/build/three.module.js",
    "three/addons/": "/three/examples/jsm/",
    "three/examples/jsm/": "/three/examples/jsm/",
    "three-mesh-bvh": "/three-mesh-bvh/build/index.module.js",
    "three-gpu-pathtracer": "/three-gpu-pathtracer/build/index.module.js",
};

// files the headless page may load, served from the repo
const routes = {
    "/": {
        type: "text/html",
        body: `<!doctype html><html><body style="margin:0">
<script type="importmap">${JSON.stringify({ imports: modules })}</script>
<script type="module" src="/scene.js"></script></body></html>`,
    },
    "/scene.js": { file: path.join(ROOT, "scripts", "featured-scene.js") },
};

const browser = await chromium.launch({
    channel: "chrome",
    args: ["--use-angle=metal", "--enable-gpu"],
});
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
page.on("pageerror", (err) => console.error("[build-featured] page:", err.message));
await page.route(`${ORIGIN}/**`, (route) => {
    const { pathname } = new URL(route.request().url());
    const hit = routes[pathname];
    if (hit) {
        return route.fulfill({
            contentType: hit.type || "text/javascript",
            body: hit.body ?? readFileSync(hit.file),
        });
    }
    const file = path.join(ROOT, "node_modules", pathname);
    if (/^\/three(-mesh-bvh|-gpu-pathtracer)?\//.test(pathname) && existsSync(file)) {
        return route.fulfill({ contentType: "text/javascript", body: readFileSync(file) });
    }
    return route.fulfill({ status: 404 });
});
await page.goto(`${ORIGIN}/?samples=${samples}`);
await page.waitForFunction(() => window.sceneReady === true);

const { image, ...layout } = await page.evaluate(() => window.renderComputer());
await browser.close();

mkdirSync(path.dirname(OUT_IMAGE), { recursive: true });
writeFileSync(OUT_IMAGE, Buffer.from(image.split(",")[1], "base64"));
writeFileSync(OUT_DATA, JSON.stringify(layout, null, 4) + "\n");
console.log(`[build-featured] computer.webp ${layout.width}x${layout.height}, screen`, layout.screen);
