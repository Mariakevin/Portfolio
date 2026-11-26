# Maria Kevin — Software Developer Portfolio

A single-page, zero-framework portfolio for Maria Kevin, an MCA student in Chennai building applied machine learning, explainable student tools, and native desktop software. Built with semantic HTML5, modern CSS custom properties, and vanilla JavaScript. No build step, no runtime dependencies, no tracking.

---

## Running locally

Open `index.html` directly in a browser, or serve the folder over HTTP:

```bash
python3 -m http.server 4321   # then visit http://localhost:4321
```

Works over `file://`, static hosts, and GitHub Pages.

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

- **Palette:** Cool Chalk (`#F8F9F7`) and Forest Slate (`#122120`) with Precision Teal (`#0B6E68`) in light mode, switching cleanly to Deep Pine (`#0D1717`) and Sea-Glass Teal (`#4CC2B7`) in dark mode.
- **Typography:** `Newsreader` (optical serif for display headings and long-form editorial prose) paired with `IBM Plex Sans` (UI controls, filters, tables, and structured labels), plus `IBM Plex Mono` strictly inside the interactive command-line dialog.
- **Interactive capabilities:** Hero Architecture Map with a readable tap-card layout on phones, project workbench, `<dialog>` case studies with Previous/Next navigation, tool-to-project evidence matrix, expandable research notes, `Ctrl/Cmd+K` command line, and a downloadable public résumé plus printable CV dossier.
- **Public résumé:** `assets/maria-kevin-resume.pdf` removes the private phone number, residential locality, and grade metrics while keeping a general Chennai location and public profile links.

---

## Files

```text
index.html            Semantic markup, FOUC-free theme bootstrap, JSON-LD metadata
css/styles.css        Design tokens, Chalk/Pine themes, responsive layouts, print CV rules
js/data.js            Profile, capability mappings, projects, and research notes
js/main.js            Hydration, Architecture Map, Evidence Matrix, Case Studies, CLI, Contact
assets/               Public résumé PDF
```
