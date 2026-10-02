# Verification · September 30, 2026

## Passed

- `npm run typecheck`
- `npm run lint` (no errors or warnings)
- `npm run build` (Next.js 16.3.8, statically prerendered homepage)
- Reusable skill validation with the bundled Skill Creator validator
- Browser inspection at 1440 × 900, 390 × 844, and 320 × 740
- No horizontal overflow at checked viewport sizes
- Native case-study dialog opens, closes with Escape, and returns focus to its trigger
- Mobile menu opens and navigates to selected work
- Before/after comparison displays 26 seconds and 500 milliseconds
- Experience accordion expands the selected employer
- Email copy action confirms success
- Scatter/connect and pause/resume controls update accessible state
- Resume served successfully as `application/pdf`
- No new browser errors or warnings after resolving the initial icon import issue

## Review corrections

An independent design-agent source review confirmed the resume claims, and identified low-contrast annotations and an orientation reset on pause. Secondary text was darkened and sculpture rotation now persists across pause/resume.

Reduced-motion handling and lifecycle cleanup were reviewed in source. The browser's OS reduced-motion preference was not changed during verification. No outbound contact messages were sent. No production deployment has been performed.

The desktop preview in `previews/desktop.jpg` was captured from the working site. The development server remains available at http://localhost:3000.


## Version 2 · theme, language, and redesign

Validated after the living-blueprint redesign:

- Type checking, lint, and production build pass.
- First visit uses English and dark mode.
- Light/dark changes affect the complete interface, visualizations, and dialogs.
- English/Portuguese choices translate the interface, case studies, resume overview, and accessibility labels.
- Explicit light + Portuguese preferences survive reload; `html.lang` becomes `pt-BR`.
- Localized browser title is managed by React metadata hoisting.
- Desktop 1440px and mobile 390px/320px checked; no horizontal overflow or out-of-viewport body headings/paragraphs in either language at 320px.
- Work explorer switches with arrow keys and pointer input. Tab orientation follows its desktop/mobile layout.
- Translated case-study dialog opens and closes with Escape.
- Mobile navigation opens the resume viewer; Escape restores focus to the menu control.
- The download link targets the original PDF, which returns HTTP 200 with `application/pdf`.
- Visible app source has no accented spelling of "resume".

Desktop theme previews: `previews/desktop-dark.jpg` and `previews/desktop-light.jpg`. Reduced-motion branches were reviewed in source; the operating-system preference was not changed. No production deployment was performed.


## Version 3 · connected atlas and Node 24 · October 2, 2026

- Node.js 24.21.0 installed through nvm and pinned in `.nvmrc` and `.node-version`. The package engine targets Node 24; GitHub Actions reads the runtime pin. Node typings are aligned to 24.19.1. Next.js remains exactly 16.3.8.
- A clean `npm ci` succeeds with zero reported vulnerabilities. `npm run typecheck`, `npm run lint`, and `npm run build` pass under Node 24.21.0. The generated static export was served locally for browser inspection.
- Desktop (1440 × 900) and mobile (390 × 844, 320 × 740) inspected. English dark and Portuguese light layouts have no horizontal overflow or out-of-viewport headings, paragraphs, atlas selectors, or signal-strip text at the checked narrow sizes.
- Atlas node selection and keyboard activation of layer controls update the highlighted route, title, explanation, skills, and pressed state. All four layers were exercised across desktop and mobile.
- The global motion control pauses the atlas route animation (verified through its computed animation play state) and resumes it. Reduced-motion branches and the CSS media query were reviewed in source; the OS preference was not changed.
- Light + Portuguese choices survive a reload, including `html.lang="pt-BR"`. The new atlas labels, copy, and accessible controls are translated.
- Desktop and mobile Resume dialogs open, close with Escape, and return focus. The original English resume PDF responds with HTTP 200 and `application/pdf`.
- Work tabs respond to arrow keys; the translated field-note dialog opens and closes with Escape, restoring focus to its trigger. Mobile navigation opens the Resume overview.
- No browser warnings or errors observed. Contact and profile destinations remain intact.

The sculpture now draws sparse longitudinal threads using semantic color tokens and 3,072 points (previously 4,480). Canvas visibility, pixel-density limits, lifecycle cleanup, and static reduced-motion rendering remain in place. The atlas is an illustrative map of resume-backed capabilities, not a claim about a client’s production architecture.

New preview captures are in `previews/desktop-v3-dark.jpg`, `previews/atlas-v3-dark.jpg`, and `previews/mobile-v3-light.jpg`. No production deployment or outbound communication was performed.
