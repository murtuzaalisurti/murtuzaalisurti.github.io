// Verifies the compiled resume PDF is machine-readable / ATS-parsable.
//
// A PDF is "machine readable" when its text can be extracted as real,
// correctly-mapped Unicode (not an image, not garbled glyphs). We extract the
// text with `pdftotext` (poppler) and assert that the expected content is
// present. This catches:
//   - missing/broken text layer (e.g. content rendered as images)
//   - broken glyph->unicode mapping (copy/paste & ATS parsing would produce junk)
//
// Used both locally (`npm run verify:resume`) and in CI. If `pdftotext` isn't
// installed locally, it warns and skips so it doesn't block local builds.

import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";
import process from "node:process";

const ROOT = process.cwd();
const PDF = path.join(ROOT, "public", "resume-murtuzaali-surti.pdf");

// Strings that MUST be extractable from the PDF for it to be considered
// machine-readable. Keep these in sync with resume/resume.tex.
const REQUIRED = [
    "Murtuzaali Surti",
    "hey@murtuzaalisurti.com",
    "Software Engineer",
    "Work Experience",
    "Skills",
    "Education",
    "AWS Certified Cloud Practitioner",
];

function has(cmd) {
    return !spawnSync(cmd, ["-v"], { stdio: "ignore" }).error;
}

function main() {
    if (!existsSync(PDF)) {
        console.error(`[verify-resume] PDF not found: ${PDF}. Run "npm run build:resume" first.`);
        process.exit(1);
    }

    if (!has("pdftotext")) {
        console.warn(
            "[verify-resume] pdftotext (poppler) not found. Skipping verification. " +
                "Install poppler to run it locally (brew install poppler / apt-get install poppler-utils)."
        );
        return;
    }

    // "-layout" keeps reading order sane; "-" writes extracted text to stdout.
    const res = spawnSync("pdftotext", ["-layout", PDF, "-"], { encoding: "utf8" });
    if (res.status !== 0) {
        console.error("[verify-resume] pdftotext failed to extract text:", res.stderr);
        process.exit(1);
    }

    const text = (res.stdout || "").replace(/\s+/g, " ");

    if (text.trim().length < 200) {
        console.error(
            `[verify-resume] Extracted text is suspiciously short (${text.trim().length} chars). ` +
                "The PDF may not have a real text layer."
        );
        process.exit(1);
    }

    const missing = REQUIRED.filter((needle) => !text.includes(needle));
    if (missing.length) {
        console.error("[verify-resume] PDF is not machine-readable. Missing expected text:");
        for (const m of missing) console.error(`  - "${m}"`);
        process.exit(1);
    }

    console.log(`[verify-resume] OK - extracted ${text.trim().length} chars; all ${REQUIRED.length} checks passed.`);
}

main();
