# Maria Kevin — Software Developer Portfolio

A single-page, zero-framework portfolio for Maria Kevin, an MCA student in Chennai building applied machine learning, explainable student tools, and native desktop software. Built with semantic HTML5, modern CSS custom properties, and vanilla JavaScript. No build step, no runtime dependencies, no tracking.

---

## Running locally

Open `index.html` directly in a browser, or serve the folder over HTTP:

```bash
python3 -m http.server 4321   # then visit http://localhost:4321
```

Works over `file://`, static hosts, and GitHub Pages.

## Deployment

The live site is [mariakevin.github.io/Portfolio](https://mariakevin.github.io/Portfolio/), published from the `main` branch. GitHub Pages serves this repository as a project site under `/Portfolio/`; the canonical URL and Open Graph URL in `index.html` include that path. The site has no build step. After pushing to `main`, allow GitHub Pages a short time to publish, then check the live home page and résumé link.

---

## Content structure

All portfolio content and structured relationships live in **`js/data.js`** (`window.PORTFOLIO_DATA`):

| Section | Purpose |
|---|---|
| `profile` | Name, bio, college details, location, email, social profiles |
| `education` | MCA program dates and earlier BCA study |
| `experience` | Dated Aestric co-founder role |
| `skills` | Tooling groups with explicit `projects[]` links for the capability matrix |
| `projects` | Case studies (`FundusNet`, `JobMatch AI`, `FinAI`, `LedgePill`) with year, status, problem, architecture, trade-offs, outcomes, failure handling, limitations, and links |
| `research` | Open research questions drawn from documented project limitations, with expandable context notes |
| `principles` | Recurring engineering practices applied across the repositories |

## Design system notes

**Cool Studio** — a technical portfolio presented like a precise engineering index: sharp Swiss grid, hairline rules, numbered sections, oversized contemporary type, and calm metadata.

- **Palette:** Cool fog paper (`#F3F5F8`), pure white surfaces (`#FFFFFF`), a cool sunken well (`#E8ECF2`), deep cool ink (`#0C1220`), and a cobalt signal (`#1F4FD8`) in light mode. Dark mode is cool near-black (`#0A0E15`) with cool light text (`#EDF1F7`) and luminous cobalt (`#7AA2FF`). Status hues stay semantic — cobalt research, teal active, green complete, amber beta — but live in a 6px dot beside a text label rather than a tinted pill. The research spread inverts to a deep cool panel, with a separate slightly lighter band in dark mode. Every text pair meets WCAG AA.
- **Typography:** `Geist` for display headlines, body, and interface copy, with `Geist Mono` demoted to section indices, numerals, code, and the command line. Both faces are subset to latin and embedded as base64 `@font-face` rules in `css/styles.css`, so the exact typography renders over `file://` as well as HTTP with no third-party request. Metric-matched local fallbacks plus `font-display: optional` keep the swap from reflowing the page (CLS stays at 0).
- **Layout language:** 1px rules, 8px controls, 10px surfaces, a full-width masthead that condenses into a floating glass pill once you scroll, numbered section headers (`01`–`05`), an indexed project list with a sticky dossier inspector, a live evidence matrix, and an inverted research spread. Micro-labels are sentence case; only the small status and filter chips stay uppercase.
- **Motion:** Scroll-progress indicator, a live projected 3D architecture map in the hero (canvas-drawn floor grid, orthogonal signal routes, and depth-sorted project cards; idle drift, pointer parallax, and drag-to-orbit settle to a still frame under `prefers-reduced-motion`), pointer-following Grad-CAM-style heat on the map, and `@starting-style` dialog transitions with Previous/Next `ViewTransition` stepping.
- **Interactive capabilities:** Hero Architecture Map with a dependency-free Canvas 2D projection engine (drag to orbit on pointer devices, keyboard-selectable cards, 2x2 plate fallback without JavaScript, readable tap-card layout on phones), project workbench, `<dialog>` case studies, container-query capability evidence matrix, expandable research notes, `Ctrl/Cmd+K` command line (`cv`, `evidence` autocomplete), and a downloadable public résumé.
- **Public résumé:** `assets/maria-kevin-resume.pdf` removes the private phone number, residential locality, and grade metrics while keeping a general Chennai location and public profile links.

---

## Files

```text
index.html            Semantic markup, theme bootstrap, canonical/social metadata, JSON-LD
404.html              Static not-found page sharing the site design tokens
css/styles.css        Embedded fonts, Index/Dossier themes, responsive layouts, motion, print rules
js/data.js            Profile, capability mappings, projects, and research notes
js/main.js            Hydration, projected 3D architecture map, Evidence Matrix, Case Studies, CLI, Contact
robots.txt            Crawl policy and sitemap pointer
sitemap.xml           Single-page sitemap for GitHub Pages
assets/               Résumé PDF, Open Graph card, favicon, Apple touch icon
```

Typography: Instrument Serif, Inter Tight, and JetBrains Mono are used under the SIL Open Font License 1.1. Only the needed glyphs are embedded in `css/styles.css`, so there are no font-file requests.
