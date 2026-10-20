// Compiles the LaTeX resume (resume/resume.tex) into a PDF that Astro serves.
//
// Output: public/resume-murtuzaali-surti.pdf
//   - The endpoint at src/pages/resume.pdf.ts reads this file to serve /resume.pdf
//   - The /resume viewer page embeds it in the browser
//
// Engine: prefers `pdflatex` (used in CI via TeX Live), falls back to `tectonic`.
// CI pins TeX Live 2025 (Ubuntu 26.04); install the same year locally so the
// PDF matches CI. A different TeX Live year or tectonic only produces a warning.
// If neither engine is installed (e.g. a local machine without TeX), the script
// warns and keeps the already-committed PDF so `npm run build` still succeeds.

import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, rmSync, renameSync } from "node:fs";
import path from "node:path";
import process from "node:process";

const ROOT = process.cwd();
const TEX_DIR = path.join(ROOT, "resume");
const TEX_FILE = path.join(TEX_DIR, "resume.tex");
const OUT_DIR = path.join(ROOT, "public");
const JOBNAME = "resume-murtuzaali-surti";
const OUT_PDF = path.join(OUT_DIR, `${JOBNAME}.pdf`);
const TEXLIVE_YEAR = "2025";

function has(cmd) {
    const probe = spawnSync(cmd, ["--version"], { stdio: "ignore" });
    return !probe.error;
}

function warnIfNotPinnedTexLive() {
    const res = spawnSync("pdflatex", ["--version"], { encoding: "utf8" });
    const banner = (res.stdout || "").split("\n")[0];
    if (!banner.includes(`TeX Live ${TEXLIVE_YEAR}`)) {
        console.warn(
            `[build-resume] Expected TeX Live ${TEXLIVE_YEAR} (same as CI), found: ${banner || "unknown"}. ` +
                "The local PDF may differ from the deployed one."
        );
    }
}

function cleanAux() {
    for (const ext of ["aux", "log", "out", "fls", "fdb_latexmk"]) {
        const f = path.join(OUT_DIR, `${JOBNAME}.${ext}`);
        if (existsSync(f)) rmSync(f, { force: true });
    }
}

function run(cmd, args) {
    console.log(`> ${cmd} ${args.join(" ")}`);
    const res = spawnSync(cmd, args, { stdio: "inherit", cwd: ROOT });
    return res.status === 0;
}

function compileWithPdflatex() {
    // Run twice so fancyhdr / hyperref references settle.
    const args = [
        "-interaction=nonstopmode",
        "-halt-on-error",
        `-jobname=${JOBNAME}`,
        `-output-directory=${OUT_DIR}`,
        TEX_FILE,
    ];
    const ok = run("pdflatex", args) && run("pdflatex", args);
    cleanAux();
    return ok;
}

function compileWithTectonic() {
    // tectonic names output after the input file, so produce then rename.
    const ok = run("tectonic", ["--outdir", OUT_DIR, TEX_FILE]);
    const produced = path.join(OUT_DIR, "resume.pdf");
    if (ok && existsSync(produced)) {
        rmSync(OUT_PDF, { force: true });
        renameSync(produced, OUT_PDF);
    }
    cleanAux();
    return ok;
}

function main() {
    if (!existsSync(TEX_FILE)) {
        console.error(`[build-resume] Missing LaTeX source: ${TEX_FILE}`);
        process.exit(1);
    }

    mkdirSync(OUT_DIR, { recursive: true });

    let ok = false;
    if (has("pdflatex")) {
        console.log("[build-resume] Compiling with pdflatex...");
        warnIfNotPinnedTexLive();
        ok = compileWithPdflatex();
    } else if (has("tectonic")) {
        console.log(
            `[build-resume] pdflatex not found, using tectonic. Output will differ from CI (pdflatex, TeX Live ${TEXLIVE_YEAR}).`
        );
        ok = compileWithTectonic();
    } else {
        if (existsSync(OUT_PDF)) {
            console.warn(
                "[build-resume] No LaTeX engine (pdflatex/tectonic) found. " +
                    "Keeping the existing committed PDF. Install TeX to regenerate it."
            );
            return;
        }
        console.error(
            "[build-resume] No LaTeX engine (pdflatex/tectonic) found and no " +
                "existing PDF to fall back to. Install TeX Live / tectonic."
        );
        process.exit(1);
    }

    if (!ok || !existsSync(OUT_PDF)) {
        console.error("[build-resume] Compilation failed.");
        process.exit(1);
    }

    console.log(`[build-resume] Wrote ${path.relative(ROOT, OUT_PDF)}`);
}

main();
