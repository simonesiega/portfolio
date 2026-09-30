# Repository guide for agents

## Working rules

- Preserve visitor-facing copy, project case studies, work descriptions, content ordering, and the existing design unless the task explicitly calls for changing them.
- Start with `git status` and inspect the relevant implementation and tests. Preserve unrelated work; make focused changes rather than broad rewrites.
- Fix the underlying cause and add a regression test when changing behavior. Do not weaken assertions, accessibility checks, security policies, or CI to obtain a passing result.
- Do not commit, push, deploy, change repository settings, or rewrite Git history unless requested. Before handing off, review the diff and report what changed, what was tested, and any remaining limitations.

## Where to make changes

This is a Next.js App Router application using React, TypeScript, Tailwind CSS, local MDX, and Bun. The `@/` alias points to `src/`.

| Area                                                     | Source of truth                                                                  |
| -------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Routes, layouts, metadata endpoints                      | `src/app/`                                                                       |
| Owner, navigation, social links, theme labels, analytics | `src/lib/config/app-config.ts`                                                   |
| Home and system-page copy                                | `src/lib/config/text/home.ts`, `src/lib/config/text/system.ts`                   |
| Project metadata and case-study prose                    | `src/lib/config/text/projects/entries/`, `src/lib/config/text/projects/content/` |
| Work experience                                          | `src/lib/config/text/work/entries/`                                              |
| Route inventory and shared SEO                           | `src/lib/config/site-routes.ts`, `src/lib/metadata.ts`, `src/lib/site-url.ts`    |
| Reusable UI and MDX rendering                            | `src/components/`, `src/mdx-components.tsx`                                      |
| Colors, layout, motion                                   | `src/styles/`, `src/lib/layout-classes.ts`, `src/lib/animation/`                 |
| CSP and other response headers                           | `src/proxy.ts`, `next.config.ts`                                                 |
| Website assets                                           | `public/`                                                                        |
| Repository-only preview assets                           | `.github/assets/`                                                                |

### Content and assets

- When a content change is requested, edit its source rather than duplicating text in a page component.
- Register projects in `projects/project-entries.ts` and work entries in `work/work-entries.ts`, both under `src/lib/config/text/`. Projects sort by pinned status and development period; work sorts by `sortStart`.
- Preserve the `showOnLandingPage` contract and its required fields. The shared registries feed multiple views; project slugs also drive static case-study routes and the sitemap.
- For a new case study, follow a neighboring entry: pair its typed metadata with its MDX component and named exports. Use `src/mdx-components.tsx` for shared presentation rather than embedding page-specific styling in the prose.
- Supply the actual intrinsic `width` and `height` for every gallery image. Do not restore a generic aspect ratio: incorrect dimensions cause layout shifts. Keep alt text and captions aligned with the images.
- `src/lib/config/public-assets.test.ts` checks asset references, decoding, and gallery dimensions. Keep repository screenshots out of `public/` unless they are intended to ship with the website.

### UI behavior to preserve

- Prefer server components; add client boundaries only for browser APIs, state, and interactions. Clean up observers, event listeners, timers, and animation frames.
- Keep colors in `src/styles/tokens.css`, shared layout classes in `src/lib/layout-classes.ts`, and animation timings in `src/lib/animation/animation-timings.ts`.
- Theme handling spans `src/lib/theme.ts`, `src/lib/theme-init.ts`, and `src/components/theme-toggle.tsx`. Keep dark, light, and system preference distinct from the resolved color. Storage reads or writes can fail; the current DOM preference must still work across navigation.
- The native theme script runs before application bundles. Motion initialization in `src/lib/motion-init.ts` deliberately waits for the Next.js runtime so failed bundles do not hide server-rendered content. Preserve that separation and the initial transition suppression.
- Preserve reduced-motion behavior, visible keyboard focus, the skip link, and focus on `#main-content` after client navigation. Links using `scroll={false}` need the custom scroll/focus handling in `src/components/behavior/scroll/`.
- Long MDX code blocks must remain horizontally scrollable and keyboard-focusable without overflowing the page.

## Setup and validation

Use Node from `.node-version` and Bun from the `packageManager` field in `package.json`. Use Bun for dependencies and scripts; do not introduce npm, pnpm, or Yarn lockfiles. Keep `bun.lock` synchronized when dependencies change, and keep `@playwright/test` and `playwright-core` on compatible, aligned versions.

```bash
bun install --frozen-lockfile
bun run dev
```

| Task                                                                 | Command                                                                    |
| -------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Full local checks: format, lint, types, unit tests, production build | `bun run check`                                                            |
| Dependency vulnerability audit                                       | `bun audit`                                                                |
| One unit-test file                                                   | `bun run test src/lib/theme.test.ts`                                       |
| Install browser engines                                              | `bunx playwright install chromium firefox webkit`                          |
| Full cross-browser suite                                             | `bun run test:e2e --workers=2`                                             |
| One browser test file                                                | `bun run test:e2e e2e/theme-reload.spec.ts --project=chromium --workers=2` |
| Production preview                                                   | `bun run build:standalone:local` followed by `bun run start`               |

- On Linux, add `--with-deps` when installing Playwright browsers.
- Unit tests live beside the code as `src/**/*.test.ts` or `.test.tsx`; browser tests live in `e2e/`. Use the sitemap helpers for all-route checks instead of maintaining another route list.
- E2E owns port **3100** and builds its own standalone server with analytics disabled and CSP enforced. Do not run competing builds, development servers, or E2E runs in the same worktree: they share `.next`.
- For application, dependency, or configuration changes, run `bun audit`, `bun run check`, and `bun run test:e2e`. For documentation-only changes, formatting, link/path checks, and `git diff --check` are sufficient. State clearly which checks were run.
- For rendering changes, compare desktop/mobile and light/dark, including narrow screens, keyboard navigation, and reduced motion. Automated accessibility checks do not replace manual inspection.
- Fix only intended files when formatting. Do not edit or commit generated `.next/`, `next-env.d.ts`, `node_modules/`, `tsconfig.tsbuildinfo`, coverage, or browser-test reports.

## Production and repository constraints

- `bun run build:local` supplies the portfolio's canonical origin. Other production builds require `NEXT_PUBLIC_SITE_URL` or `SITE_URL`; the public value takes precedence. Set it at build time because pages and metadata are prerendered.
- Use `.env.example` for configuration names. Never commit credentials: `NEXT_PUBLIC_*` values are public and baked into the client build. Keep analytics disabled in tests; verify any enabled tracker on the deployment target.
- Preserve enforced production CSP, including coverage independent of `Accept` and prefetch headers. HTTPS requests receive `upgrade-insecure-requests`; HTTP previews intentionally do not. A TLS-terminating proxy must overwrite `X-Forwarded-Proto` and prevent direct public access to the app port.
- The current CSP supports static rendering with inline scripts/styles. A nonce-based policy requires revisiting rendering and caching; do not bolt per-request nonces onto cached HTML.
- For container changes, build and smoke-test the final non-root image and run the image vulnerability scan. CI also runs CodeQL. Do not describe either as verified solely because local application tests passed.
- Dependency auto-merge must require GitHub merge checks. Keep that guard, pinned action/image references, and security checks intact.
- Preserve `.gitattributes` filtering GitHub language statistics to TypeScript and MDX, and ownership in `.github/CODEOWNERS`.
- Local checks do not validate production DNS, TLS, redirects, proxy configuration, analytics delivery, or rollback. Report those as unverified until checked on the host.
