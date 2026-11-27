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

**Index / Dossier** — a technical portfolio presented like a printed engineering report crossed with a studio lookbook. Sharp Swiss grid, hairline rules, numbered sections, oversized editorial type, and mono metadata.

- **Palette:** Warm bone paper (`#F3EEE4`), off-white surface (`#FCF8EF`), sunken well (`#E8E0D2`), warm ink (`#16120D`), and a vermilion signal (`#B0300C`) in light mode. Dark mode is warm near-black (`#0C0B09`) with bone text (`#F3EFE6`) and signal orange (`#FF7A4C`). The palette takes its cues from Swiss Style red/black/grid discipline, Newspaper paper + signal red, a Warm Neutral beige ramp, and the Vermilion color family; every text pair meets WCAG AA. Status hues stay semantic but are aged toward print pigments in dark mode: dusty cobalt for research, sage for active prototypes, moss for completed builds, and ochre for beta. The research spread inverts to a warm ink panel for rhythm and focus.
- **Typography:** `Instrument Serif` for display headlines and section titles, `Inter Tight` for body and interface copy, and `JetBrains Mono` for numbered labels, metadata, buttons, and the command line. The three faces are subset to the glyphs the site uses and embedded as base64 `@font-face` rules in `css/styles.css`, so the exact typography renders over `file://` as well as HTTP with no third-party request. Metric-matched local fallbacks plus `font-display: block` keep the first paint from reflowing when the embedded faces decode.
- **Layout language:** 1px rules and 2px radii, a full-width masthead that condenses into a floating glass pill once you scroll, numbered section headers (`01`–`05`), an indexed project list with a sticky dossier inspector, a live evidence matrix, and an inverted research spread.
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
