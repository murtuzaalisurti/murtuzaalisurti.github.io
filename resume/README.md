# Resume

`resume.tex` is compiled to `public/resume-murtuzaali-surti.pdf`, which the site serves at `/resume.pdf` and embeds on `/resume`.

```sh
npm run build:resume   # compile resume.tex -> public/resume-murtuzaali-surti.pdf
npm run verify:resume  # check the PDF's text is extractable (ATS-parsable), needs poppler
npm run dev            # rebuilds the PDF and reloads the browser whenever resume.tex is saved
```

`npm run build` runs both resume steps before building the site.

## Toolchain: pdflatex, TeX Live 2025

The resume is built with **pdflatex from TeX Live 2025**, both locally and in CI, so the local PDF matches the deployed one.

| Where | How TeX Live 2025 is provided |
|---|---|
| CI (`.github/workflows/deploy.yml`) | Runner pinned to `ubuntu-26.04`, whose `apt` TeX Live packages are 2025. A workflow step fails the build if `pdflatex --version` isn't TeX Live 2025. |
| Local (macOS) | BasicTeX 2025 from the TeX Live historic archive, with `tlmgr` pinned to the frozen 2025 repository. |

`scripts/build-resume.mjs` uses `pdflatex` when it's on the PATH and warns if it isn't TeX Live 2025 (`TEXLIVE_YEAR`). Without `pdflatex` it falls back to `tectonic`, which works but renders with different fonts than CI.

### Local setup (macOS)

Homebrew only offers the current TeX Live year, so install 2025 from the archive instead.

1. Download `BasicTeX.pkg` and `BasicTeX.pkg.sha512` from the 2025 MacTeX folder of a [TeX Live historic mirror](https://www.tug.org/historic/), e.g. <https://ftp.math.utah.edu/pub/tex/historic/systems/mactex/2025/>.
2. Verify and install:

   ```sh
   shasum -a 512 BasicTeX.pkg          # must match BasicTeX.pkg.sha512
   pkgutil --check-signature BasicTeX.pkg
   sudo installer -pkg BasicTeX.pkg -target /
   ```

3. Point `tlmgr` at the frozen 2025 repository, update it, and install the packages BasicTeX lacks:

   ```sh
   sudo tlmgr option repository https://ftp.math.utah.edu/pub/tex/historic/systems/texlive/2025/tlnet-final
   sudo tlmgr update --self
   sudo tlmgr install titlesec enumitem marvosym preprint
   ```

4. Open a new terminal so `/Library/TeX/texbin` is on the PATH, then run `npm run build:resume`. It should print `Compiling with pdflatex...` and no TeX Live version warning.

`tlmgr` warns `not verified: valid signature with expired key` for the 2025 repository. That's expected: frozen TeX Live years keep their original signing key, which has since expired.

### Expected warnings

- `Font shape 'OT1/cmr/bx/sc' undefined` / `Some font shapes were not available`: the name in the header asks for bold small caps, which Computer Modern doesn't have, so it renders in plain bold. Harmless.

### Gotcha: bitmap glyphs

CI and BasicTeX don't include `cm-super`, so any glyph from the TS1 text-companion font (e.g. LaTeX's default `\textbullet`) is embedded as a **Type 3 bitmap** with no Unicode mapping: blurry when zoomed and unreadable to ATS parsers. That's why `resume.tex` redefines `\labelitemi` to a math-font bullet. After changes, check:

```sh
pdffonts public/resume-murtuzaali-surti.pdf   # every font should be Type 1, none Type 3
```

## Upgrading TeX Live

Move CI and local together so they keep matching:

1. Pick a runner whose `apt` ships the target year (see `texlive-base` on [packages.ubuntu.com](https://packages.ubuntu.com/search?keywords=texlive-base&searchon=names&exact=1&suite=all&section=all)) and update `runs-on` in `.github/workflows/*.yml`.
2. Update the year in the "Check TeX Live version" step in `deploy.yml` and `TEXLIVE_YEAR` in `scripts/build-resume.mjs`.
3. Install the same year's BasicTeX locally and repeat the `tlmgr` steps with that year's repository.
4. Rebuild, confirm it's still one page, and run `pdffonts` and `npm run verify:resume`.
