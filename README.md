# Maria Kevin — Software Developer Portfolio (Engineering Observatory)

A single-page, **zero-framework** Engineering Observatory portfolio for Maria Kevin, an MCA student in Chennai building applied machine learning, explainable product tools, and native systems software. Built with semantic HTML5, modern CSS custom properties, and modular vanilla JavaScript. No build step, no external JS dependencies, no tracking.

---

## Running it

Open `index.html` directly in a browser, or serve the directory over HTTP:

```bash
python3 -m http.server 4321   # then visit http://localhost:4321
```

Works from `file://`, any static host, or GitHub Pages.

---

## Editing your content

All content and structured relationships live in **`js/data.js`** (`window.PORTFOLIO_DATA`):

| Field | What it controls |
|---|---|
| `profile.*` | Header brand, hero copy, location, Chennai clock, email, social links |
| `education` | Academic program card with verified MCA dates (`2025–2027`) |
| `skills[]` | Capability layers and explicit `projects[]` evidence links for the Evidence Graph |
| `projects[]` | Workbench index, sticky Inspector, `Fig. 01` Systems Map, and Autopsy `<dialog>` (`problem`, `architecture`, `stageNotes`, `tradeoffs`, `outcomes`, `failureModes`, `limitations`, `researchId`, `artifacts`) |
| `research[]` | Research Frontier open inquiries, expandable lab notes, and links to autopsies/repos |
| `experience[]` | Core engineering principles practiced across builds |

## Featured projects

- [FundusNet](https://github.com/Mariakevin/FundusNet) — retinal screening research prototype with uncertainty-aware inference and Grad-CAM explanations (`Research prototype`).
- [JobMatch AI](https://github.com/Mariakevin/JobMatchAI) — evidence-backed internship eligibility and fit assistant for students (`Ongoing prototype`).
- [FinAI](https://github.com/Mariakevin/FinAI) — personal finance dashboard with Gemini-generated spending insights via Edge Function (`Completed prototype`).
- [LedgePill](https://github.com/Mariakevin/LedgePill) — native Dynamic Island-style software for Linux (GTK4/D-Bus), Windows (WPF), and Android (Kotlin) (`Platform beta`).

---

## Engineering Observatory Architecture

- **Quick vs. Deep Exploration**: Visitors can scan Maria's academic focus, project status ledger, CV print option, and contact links within 30 seconds, or dive deep into architecture stage breakdowns, failure handling, limitations, and research questions.
- **Interactive `Fig. 01` Systems Map**: Orthographic SVG schematic connecting `FundusNet`, `JobMatch AI`, `FinAI`, and `LedgePill` across Intelligence, Product, and Systems layers with direct autopsy navigation.
- **Workbench & Project Autopsies**: Category filtering, hover-intent sticky Inspector on desktop, visible category/status badges across every breakpoint, Previous/Next modal stepper, and clickable system architecture stages (`stageNotes`).
- **Interactive Evidence Graph**: Cross-filters capabilities and technologies against the exact repositories and research inquiries where they are demonstrated—without arbitrary skill percentage bars.
- **Research Frontier**: Open inquiries derived strictly from documented project limitations, with expandable lab notes and one-click autopsy links.
- **Registers (Paper & Plate)**: Warm bone `#EFEBE2` / carbon ink `#16150F` (`Paper`) and anodized slate `#0F100D` / bone ink `#EEECE2` (`Plate`), with a dynamic Colophon swatch indicator.
- **CLI Terminal (`Ctrl/Cmd+K`)**: Supports `help`, `whoami`, `projects`, `open <id>` (with Tab autocomplete), `research`, `skills`, `evidence <tech>`, `experience`, `contact`, `theme`, `print`, `echo`, `clear`, and `exit`.
- **Printable CV / Dossier**: Dedicated `@media print` styling triggered via `"Print CV / Dossier"`.

---

## Structure

```text
index.html            Semantic markup + inline FOUC-free theme bootstrap + JSON-LD
css/styles.css        Design tokens, Paper/Plate registers, layouts, print CV styles
js/data.js            Structured portfolio, evidence links, and research data
js/main.js            Hydration, Fig. 01 schematic, Evidence Graph, Autopsy dialog, CLI
```
