# Pedro Oliveira · Order from complexity

A living blueprint for Pedro’s work: luminous threaded geometry, oversized editorial typography, an interactive work explorer, a connected architecture atlas, and a resume pass that opens a career overview. Both dark and light themes are designed around semantic color tokens.

## Run

Requires Node.js **24**. Local development and CI are pinned to **24.21.0**, and Node typings match the 24 release line.

```sh
nvm install
nvm use
npm ci
npm run dev
```

Open http://localhost:3000.

```sh
npm run typecheck
npm run lint
npm run build
```

## Stack

- Next.js **16.3.8**, App Router, TypeScript
- React **19.3.0**
- Tailwind CSS **4.3.3**, PostCSS
- Motion **13.4.6**, Lucide icons
- Canvas 2D for the procedural point-cloud system (no WebGL dependency)
- Self-hosted Manrope and IBM Plex Mono via `next/font`

## Content and interactions

`lib/content.ts` contains the English professional facts, contact links, work, and skills. `lib/translations.ts` contains the complete English/Portuguese interface dictionary and localized professional content. Content comes from the supplied resume. LinkedIn could not be read automatically; the actual profile is linked without inventing additional information. Professional contributions are identified as such. Diagrams are illustrative, and client source code is not included.

The endpoint comparison uses the resume's verified 26s → 500ms figures (approximately 98% lower latency, 52× faster). The work explorer supports pointer input and arrow-key navigation. Native dialogs handle focus trapping, Escape, and focus restoration. Experience entries expand and contact email can be copied. The resume pass opens a bilingual overview with experience, education, and languages; its download remains the original English PDF, labeled explicitly. The UI uses the spelling "Resume" throughout.

The toolkit’s system atlas lets visitors select four connected layers to explore backend, messaging, architecture, and interface skills. Both the diagram nodes and layer controls are native keyboard-accessible buttons. Its map and explanations are conceptual, based on the capabilities in the resume; they do not depict client infrastructure. A fine reading-progress line and an editorial strip carry the blueprint direction through the page.

Continuous motion can be paused. The sculpture responds to the pointer and switches between connected and scattered points. Canvas work pauses when hidden or outside the viewport, limits pixel density, uses semantic theme colors, and renders a static frame for reduced motion. Native scrolling and keyboard focus are preserved.

Education is shown as in progress where appropriate; employment details reflect the supplied resume rather than a live feed. Update these in the content module when circumstances change. There is no contact backend: email opens the visitor's mail app.

## Theme and language

New visitors start in English and dark mode. Header controls offer English/Portuguese and dark/light themes. Explicit choices persist in local storage; the initial theme is applied before hydration to prevent a color flash. Preferences still work during the current session when storage is unavailable. Language changes update the document language, page title, interface, professional content, dialogs, and accessible labels.

Theme tokens live at the start of `app/globals.css`; preference handling lives in `lib/preferences.ts`. Motion adapts its colors to the selected theme without resetting the sculpture’s rotation. Reduced-motion preferences remain respected in both themes.

## Reusable skill

`docs/development-skill.md` preserves the development skill created for this project. It is also installed at `~/.codex/skills/distinctive-web-experiences/SKILL.md`, with UI metadata. Invoke `$distinctive-web-experiences` in future web projects.

## Deployment

The project uses Next.js static export. `npm run build` produces `out`, including the original resume PDF. Firebase Hosting serves this directory using `firebase.json`; `.firebaserc` selects project `pedrohmirandaoli`. `npm start` is not compatible with static export. Use `npm run dev` for development.

For a manual deployment after logging into Firebase:

```sh
npm run build
firebase deploy --only hosting
```

### Automatic deployment with GitHub Actions

`.github/workflows/firebase-hosting.yml` installs dependencies from the lockfile, checks types, lints, builds, and verifies the exported files. Pull requests targeting `main` run these checks. Pushes and merges to `main` deploy successful builds to the live Firebase Hosting site. The workflow can also be started manually from GitHub's Actions tab on `main`. Production runs are serialized to prevent deployments from finishing out of order.

One-time setup:

1. Push this project to a GitHub repository with `main` as the production branch. This local checkout currently has no Git remote configured.
2. In Google Cloud's IAM & Admin → Service Accounts, select Firebase project `pedrohmirandaoli` and create a dedicated GitHub deployment service account. Give it **Firebase Hosting Admin** (`roles/firebasehosting.admin`) and **API Keys Viewer** (`roles/serviceusage.apiKeysViewer`) for this static, live-only deployment.
3. Create a JSON key for that account. In the GitHub repository, open Settings → Secrets and variables → Actions → New repository secret. Name it **`FIREBASE_SERVICE_ACCOUNT_PEDROHMIRANDAOLI`** and paste the complete JSON as its value. Keep the key outside the repository; never commit it.
4. Push the workflow to `main`. Watch its first run under Actions → Validate and deploy portfolio. Subsequent pushes to `main` deploy automatically after all checks pass.

The credentials are used only for deployment on `main`; pull requests run validation without them. No application Firebase SDK or public environment variables are needed. If you use branch protection, require the **Validate and deploy** check before merging.

See the [official Firebase action service-account guide](https://github.com/FirebaseExtended/action-hosting-deploy/blob/main/docs/service-account.md) for authentication setup. Set a canonical URL in metadata once a public domain is chosen.
