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

- **Palette:** Film Paper (`#F4F5FA`) and Indigo Ink (`#14172E`) with Cobalt (`#2F43D8`) in light mode, switching to Night Film (`#0E1024`) and Periwinkle (`#9AA8FF`) in dark mode. A Grad-CAM-style heat ramp (red, amber, green) appears only in the hero map, where it follows the pointer or the selected project.
- **Typography:** `Bricolage Grotesque` (display headings and brand) paired with `IBM Plex Sans` (body, controls, tables), plus `IBM Plex Mono` strictly inside the interactive command-line dialog.
- **Interactive capabilities:** Hero Architecture Map with a readable tap-card layout on phones, project workbench, `<dialog>` case studies with Previous/Next navigation, tool-to-project evidence matrix, expandable research notes, `Ctrl/Cmd+K` command line, and a downloadable public résumé plus printable CV dossier.
- **Public résumé:** `assets/maria-kevin-resume.pdf` removes the private phone number, residential locality, and grade metrics while keeping a general Chennai location and public profile links.

---

## Files

```text
index.html            Semantic markup, theme bootstrap, canonical/social metadata, JSON-LD
css/styles.css        Film Paper/Night Film themes, responsive layouts, print CV rules
js/data.js            Profile, capability mappings, projects, and research notes
js/main.js            Hydration, interactive heat map, Evidence Matrix, Case Studies, CLI, Contact
assets/               Public résumé PDF
```
