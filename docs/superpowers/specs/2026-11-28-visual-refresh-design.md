# Portfolio visual refresh — "Cool studio"

Date: 2026-11-28
Status: draft for approval

## Intent

The site's structure, content, and grid are working. Its skin is not: warm bone
paper, vermilion signal, an all-caps mono label on nearly every element, hairline
boxes with 2px corners, and a literary serif add up to a 2021-era editorial look.
Maria wants the site to feel current, cool, and light, with the overall design
touched — not just recolored — while keeping the layout, sections, and copy.

The chosen direction is **A — Cool studio**: cool light neutrals, a cobalt
signal, a single contemporary grotesque for display and UI, and a calmer
component language (flat white surfaces, soft borders, 8–10px corners, status as
a dot + label rather than a tinted pill).

## Goals

- Replace the warm palette with a cool, light one that still reads as a
  considered studio, not a generic SaaS template.
- Move typography to a modern grotesque (Geist + Geist Mono) and cut the amount
  of mono and uppercase in the interface.
- Soften the component language: fewer boxes, lighter chrome, restrained radii,
  quieter status treatments, one consistent shadow.
- Keep every accessibility and performance property the current site has:
  WCAG AA, light/dark parity, print, no-JS, reduced motion, CLS 0.
- Keep the no-build, file://-safe, self-hosted setup.

## Non-goals

- No layout, section order, copy, or content changes.
- No new features, pages, or interactions.
- No redesign of the project data model or the command line's behavior.
- No change to the header's masthead → pill transition, only its colors.
- Regenerating the social preview image (`assets/og-card.png`) is not part of
  this pass; note it as a follow-up so the card does not stay warm-toned forever.

## Anti-goals

- A palette that reads as generic dashboard blue-on-white with no character.
- Losing the strong grid, numbering, and dossier/evidence character.
- Retaining beige, cream, vermilion, or warm near-black anywhere visible.
- Adding visual noise to compensate for the bolder type.

## Constraints

- No frameworks, no build step. All CSS and fonts stay in `css/styles.css`;
  fonts remain base64-inlined so `file://` and GitHub Pages match.
- Existing light/dark theme toggle and `prefers-color-scheme` behavior stay.
- The header pill, mobile drawer, scroll progress, command line, and print
  styles must keep working.
- Every text/background pair must pass WCAG AA (4.5:1 normal, 3:1 large).
- CLS must stay at 0 at 320–1440; the font swap must not reflow the hero.

## Approaches considered

**A — Cool studio (chosen).** Cool fog paper, pure white surfaces, cobalt
signal, Geist for display and UI with Geist Mono demoted to numerals and the
command line, 8–10px corners, flat cards with one soft border and shadow, status
as dot + label. Biggest genuine step away from the current look while keeping the
grid; trades away the literary "dossier" voice.

**B — Airy product.** White and pale lavender, violet or teal accent, Sora +
Inter, 14–16px corners, pill chips, layered shadows. Friendly and current but
closest to generic SaaS; rejected as the least distinctive.

**C — Cool editorial.** Cool off-white, signal blue instead of vermilion, keep
Instrument Serif, reduce mono usage, 6px corners. Safest, keeps identity, but the
serif still reads classic rather than modern; rejected because it under-delivers
on the request.

Why A: it changes the two things Maria named (color and type) and the component
language she asked to be refreshed, without touching structure. B would have
made the site look like every other product page; C would not have solved the
"not modern" feeling.

## Decisions

### 1. Palette

Light theme tokens (all pairs verified):

| Token | Value | Notes |
|---|---|---|
| `--bg` | `#F3F5F8` | cool fog paper |
| `--surface` | `#FFFFFF` | cards, panels |
| `--surface-well` | `#E8ECF2` | sunken wells, inputs |
| `--text` | `#0C1220` | 17.1:1 on bg, 18.7:1 on white |
| `--text-2` | `#3D4A60` | 8.2:1 on bg, 9.0:1 on white |
| `--text-3` | `#58657C` | 5.4:1 on bg, 5.9:1 on white, 5.0:1 on well, 4.6:1 on the tinted selected row |
| `--border` | `rgba(12, 18, 32, 0.12)` | |
| `--border-strong` | `rgba(12, 18, 32, 0.24)` | |
| `--border-control` | `rgba(12, 18, 32, 0.42)` | |
| `--accent` | `#1F4FD8` | 6.6:1 on white, 6.1:1 on bg |
| `--accent-hover` | `#173FB0` | 8.8:1 with white text |
| `--accent-soft` | `rgba(31, 79, 216, 0.10)` | |
| `--on-accent` | `#FFFFFF` | 6.6:1 on accent |
| `--status-research` | `#1D4ED8` | cobalt |
| `--status-active` | `#0F766E` | teal |
| `--status-done` | `#2F6B3A` | green |
| `--status-beta` | `#8A5A00` | amber, tiny-area only |
| `--danger` | `#B3261E` | 6.5:1 on white |
| `--success` | `#1F6B45` | 6.5:1 on white |

Status backgrounds become `rgba(<hue>, 0.08)` where a wash is still needed
(selected row, legend).

Dark theme tokens:

| Token | Value |
|---|---|
| `--bg` | `#0A0E15` |
| `--surface` | `#111722` |
| `--surface-well` | `#1A2330` |
| `--text` | `#EDF1F7` (17.1:1 on bg) |
| `--text-2` | `#B7C2D2` (10.7:1) |
| `--text-3` | `#8D9AB0` (6.8:1, 5.6:1 on well) |
| `--border` | `rgba(237, 241, 247, 0.14)` |
| `--border-strong` | `rgba(237, 241, 247, 0.30)` |
| `--border-control` | `rgba(237, 241, 247, 0.44)` |
| `--accent` | `#7AA2FF` (7.8:1 on bg) |
| `--accent-hover` | `#A3BEFF` |
| `--accent-soft` | `rgba(122, 162, 255, 0.14)` |
| `--on-accent` | `#0A0E15` |
| `--status-research` | `#9DBBFF` |
| `--status-active` | `#7FD1C4` |
| `--status-done` | `#9AD2A8` |
| `--status-beta` | `#E8C07C` |
| `--danger` | `#F0A6A0` |
| `--success` | `#8FD0B0` |

Shadows turn cool: light `rgba(12, 18, 32, …)`, dark near-black. Header glass:
light `rgba(255, 255, 255, 0.72)` / `0.90` strong; dark
`rgba(17, 23, 34, 0.62)` / `0.90`. Grid lines, heat map, backdrop, scrollbar,
and selection colors follow the same cool ramp.

Inverse section (research spread) currently overrides the theme tokens with warm
values in `.section-inverse`. Replace that block instead of adding a parallel
system: bg `#0B111C`, surface `rgba(237, 241, 247, 0.055)`, well
`rgba(237, 241, 247, 0.08)`, text `#EDF1F7`, text-2 `#B7C2D2`, text-3
`#8D9AB0`, borders `rgba(237, 241, 247, 0.16 / 0.32 / 0.46)`, accent `#7AA2FF`,
soft `rgba(122, 162, 255, 0.14)`, on-accent `#0A0E15`. The block must also
override the status hues to their dark values (`#9DBBFF`, `#7FD1C4`, `#9AD2A8`,
`#E8C07C`) so any badge inside the spread stays legible in light theme.

Terminal tokens become cool: bg `#0B0F16`, title `#121826`, input `#0E141F`,
text `#E6ECF5`, muted `#93A0B5`, signal `#7AA2FF`, warning `#E8C07C`,
success `#8FD0B0`. The terminal window also hardcodes warm-white chrome
(`rgba(243, 239, 230, …)` borders, dots, close button, quickbar); migrate those
to `rgba(230, 236, 245, …)` or the new tokens.

### 1a. Hardcoded warm values to migrate

These live outside the theme token blocks and will otherwise stay warm:

- `.section-inverse` token override (above).
- Terminal window chrome (above).
- `js/main.js` canvas fallbacks `[176, 48, 12]`, `[125, 119, 106]`,
  `[22, 18, 13]` and the face overlays `rgba(22, 18, 13, 0.13 / 0.07)`; use
  `[31, 79, 216]`, `[61, 74, 96]`, `[12, 18, 32]`, and
  `rgba(12, 18, 32, 0.13 / 0.07)`.
- `theme-color` metas in `index.html` and `404.html`, and the string in
  `js/main.js`.
- `assets/favicon.svg` fill/stroke.

`theme-color` metas (both `index.html` and `404.html`) and the JS theme-color
setter update to `#F3F5F8` / `#0A0E15`. `assets/favicon.svg` flips to cobalt
fill and white mark.

### 2. Typography

Download Geist and Geist Mono (SIL OFL, confirmed on Google Fonts: Geist v5
weights 300–700, Geist Mono v6 weights 400–600; latin woff2 ≈ 29 KB and 23 KB),
inline the latin subsets, and remove Instrument Serif and JetBrains Mono.

- `--font-display` and `--font-sans`: Geist.
- `--font-mono`: Geist Mono, used **only** for section indices, node numbers,
  numeric metadata, code, and the command line. All other micro-labels go sans.
- Metric-matched local fallbacks: "Geist Fallback" (Arial/Helvetica at
  `size-adjust: 105.6%`, matching Geist's measured width) and "Geist Mono
  Fallback" (local monospace). Use `font-display: optional` on the embedded
  faces: the inline font is ready before first paint in practice, and if it is
  not, the fallback stays for that load instead of swapping later. This is what
  keeps CLS at 0 while the hero wraps differently between faces.
- Mono subset may be trimmed to digits, punctuation, and CLI glyphs to keep the
  CSS payload in check.

Scale and treatment:

| Role | Current | New |
|---|---|---|
| Hero title | Instrument Serif 400, `clamp(3rem, 6.6vw, 5.9rem)`, -0.025em | Geist 500, `clamp(2.5rem, 4.95vw, 4rem)`, -0.035em, line-height 1.04 |
| Section title | Serif 400, `clamp(2.2rem, 4.4vw, 3.8rem)`, -0.02em | Geist 500, `clamp(1.9rem, 3.6vw, 3rem)`, -0.03em, line-height 1.08 |
| Panel/row title | Serif 400, ~1.6rem | Geist 500, 1.15–1.35rem, -0.015em |
| Body | Inter Tight 16px / 1.55 | Geist 16px / 1.6 |
| Lead | 0.96rem | 1rem / 1.65 |
| Micro-label | mono 0.7rem, 0.1–0.14em, uppercase | Geist 0.68rem, 500 weight, 0.07em, uppercase retained only for status/filter chips |
| Nav link | mono 0.68rem uppercase | Geist 0.78rem sentence case (CSS `text-transform` removed), mono numerals |
| Button | mono 0.7rem uppercase 0.09em | Geist 0.76rem, 500, sentence case, 0.01em |

Because labels are authored in sentence case in the HTML and uppercased by CSS,
removing `text-transform` restores sentence case without copy edits. Keep
uppercase only on the small status/filter chips, at tighter tracking.

The hero measure (currently `6.9em`, tuned for the serif) is retuned to `10em`
for Geist, with a mobile size clamp of `2.3rem–3.2rem`, then verified across
widths for balanced wrapping.

### 3. Component language

- Radii: `--radius-sm: 8px` (controls, chips, buttons), `--radius-surface: 10px`
  (cards, panels, plate), `--radius-pill: 999px` (nav, filter pills, header).
  Replace the many 1px radii on controls and cards; keep 1px only on tick marks
  and rules.
- Surfaces: white cards on fog paper, one `1px var(--border)` line and
  `--shadow-surface: 0 1px 2px rgba(12,18,32,0.04), 0 16px 32px -28px rgba(12,18,32,0.30)`.
  Remove the extra inset sheens and stacked shadows.
- Status: `.status-badge` becomes borderless and transparent — a 6px colored dot
  plus label in `--text-2`; the hue moves entirely into the dot. Tinted washes
  remain only for the selected project row and legend keys.
- Filters: 8px corners, white surface, ink fill when active.
- Buttons: primary stays ink-filled with white text (cool ink now), secondary
  white with border, tertiary text in cobalt. No uppercase.
- Nav: same geometry and header behavior; sans labels, active pill in soft
  cobalt.
- Hero architecture plate: white surface, cool grid, cobalt marks and heat wash,
  node cards at 8px with the standard surface shadow.
- Mobile drawer: follows the same surfaces, radii, and sans labels.

## Files touched

- `css/styles.css` — fonts, tokens, type scale, all component rules, print accent.
- `index.html` — theme-color metas only.
- `404.html` — theme-color metas.
- `js/main.js` — theme-color string, canvas color fallbacks and face overlays.
- `assets/favicon.svg` — cobalt/white mark.
- `README.md` — design-system description (Bone/vermilion → cool studio, font roles).
- `docs/superpowers/specs/` — this document.

## What's left to the builder

- Pick exact Geist weights/instances and confirm the downloaded subsets render
  identically over `file://` and Pages.
- Tune the fallback metrics and the hero measure; verify CLS 0 at 320/390/480/
  600/768/900/1024/1180/1280/1440.
- Adjust individual spacing/line-height where the new type needs it (no layout
  changes).
- Run the verification pass below and fix any contrast misses.

## Verification

- axe-core clean in light, dark, scrolled pill, mobile, and open drawer.
- Contrast spot-check of every token pair and of text on the inverse section.
- CLS 0 at the listed widths, cold load and reload.
- No horizontal overflow 320–1440; anchor targets still clear the header.
- Print: header hidden, black-on-white, blue headings.
- No-JS: masthead, content, email fallback intact.
- Reduced motion: pill still appears, transitions suppressed.
- HTML validator 0 messages; axe 0 violations; live Pages check after push.
