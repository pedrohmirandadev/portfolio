# Portfolio development

Read `docs/development-skill.md` when making substantial visual or interaction changes. Preserve the living blueprint direction and the "order from complexity" concept unless the user requests a redesign.

- Support both dark and light themes through semantic color tokens. Default to dark on a first visit and preserve an explicit theme selection.
- English is the default language; Portuguese is an explicit option. Translate visible text, dialogs, accessibility labels, and feedback in `lib/translations.ts`. Keep the visible spelling **Resume**, without accents, in both languages, as requested by the user.
- The resume opens an accessible career overview; its download is the original English PDF. Do not imply that the PDF itself is translated.

- Treat `lib/content.ts` and the supplied résumé as factual source material. Do not turn professional contributions into fictional public projects, invent benchmarks, or claim availability.
- Keep Next.js pinned to the requested 16.3.8 and preserve the dependency lockfile unless a task requires a change.
- Keep client visuals lightweight, native scrolling intact, motion optional, and reduced-motion preferences respected.
- Validate behavior at a desktop and narrow mobile size after meaningful UI changes. Run `npm run typecheck`, `npm run lint`, and `npm run build` for changes affecting code or configuration.
- Preserve working contact, profile, and résumé links. No outbound communication is authorized by a request to edit this site.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
