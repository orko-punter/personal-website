# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # start dev server at localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint     # eslint (flat config: eslint-config-next core-web-vitals + typescript)
npx tsc --noEmit # type-check (no separate script defined; run this directly)
```

There is no test runner configured in this project.

## Deployment

The site is a static export (`output: "export"` in `next.config.ts`) deployed to GitHub Pages, not Vercel — a `.github/workflows/deploy.yml` workflow builds and publishes to Pages on every push to `main` (Pages source is set to "GitHub Actions" on the repo, not a branch). Live at the custom domain `https://anishrajanand.com` (a `public/CNAME` file containing `anishrajanand.com` is copied into the export and tells GitHub Pages which domain to serve; the underlying GitHub Pages URL `https://orko-punter.github.io/personal-website/` still resolves too). Because it's on the domain root now, `next.config.ts` has **no** `basePath` — routes and asset paths are not prefixed.

This has one consequence for future changes:

- **No server features.** No API routes, middleware, Server Actions, ISR, or `next/image`'s default (server-based) loader — GitHub Pages only serves static files. `npm run build` will fail loudly if something incompatible is added; see `node_modules/next/dist/docs/01-app/02-guides/static-exports.md` for the supported/unsupported feature list for this Next.js version. This also rules out real payment processing (server-created Stripe checkout sessions, webhooks) — the "Support my work" button uses a Stripe **Payment Link** instead (a pre-configured hosted checkout URL, no backend required).

## Architecture

This is a single-person portfolio/blog site (Next.js 16, App Router, TypeScript, Tailwind v4). The defining pattern: **all page content lives in typed data files under `src/data/`, not in components**. Components are presentational and map over these arrays; to update site content (bio, experience, projects, blog posts), edit the data file, not the component.

- `src/data/profile.ts` — name/tagline/bio/tags/avatar, a `support` object (label + Stripe Payment Link `href`, rendered by the shared `SupportButton` component in both `Hero.tsx` and `Contact.tsx`), plus two separate link groups: `socials` (direct contact — email, phone, Calendly, rendered as one primary button + lightweight text links) and `followLinks` (social profile deep-links, rendered as icon-only circular buttons). `Contact.tsx` renders these as two visually distinct groups.
- `src/data/nav.ts` — the single `navLinks` array (label + href for About/Experience/Projects/Writing/Contact) shared by `Nav.tsx` (sticky top bar, non-homepage routes) and `Hero.tsx` (the homepage's radial orbit nav). Keep this in sync with `src/app/page.tsx`'s sections and the standalone routes — see the site structure note below.
- `src/data/experience.ts`, `src/data/projects.ts` — typed arrays rendered by `Experience.tsx` / `Projects.tsx`.
- `src/data/writing.ts` — blog posts. Each entry stores pre-rendered `contentHtml` (a sanitized-at-authoring-time HTML string), not markdown. It's rendered via `dangerouslySetInnerHTML` in `src/app/blog/[slug]/page.tsx` inside a `.post-content` wrapper whose styles live in `globals.css`. This is safe because the HTML is trusted first-party content baked into the repo, not runtime user input.

  The file's header comment claims content was "synced from a Medium data export" via a `scripts/parse-medium-export` script — **that script does not exist in the repo**; it was a one-off parsing pass done outside the project during content import. To pull in new Medium posts, you'll need to rebuild an equivalent parser (Medium's per-post export HTML has deeply nested `section`/`div` wrappers around real content tags) rather than expect a runnable script.

- Site structure: the homepage (`src/app/page.tsx`) is `Hero` (black hero with a 3D ring of the latest 12 essays and a Pause button, count-up stats from `stats` in `profile.ts`, the bio as a scroll reveal under id `about`, pastel bento cards linking to each section, latest writing) followed by `Contact` (id `contact`, a rounded black closing band). `Experience` and `Projects` have their own routes (`src/app/experience/page.tsx`, `src/app/projects/page.tsx`). `Nav.tsx` is a pill nav shown on every route (solid black on `/`); on phones it drops to its own row and hides "About". Active state: standalone routes match via `pathname.startsWith(link.href)`.
- `src/components/Avatar.tsx` — reusable photo component with graceful fallback to initials. Supports `shape` (`"circle"` | `"rectangle"`), explicit `width`/`height` (or a single `size` for circles), and a `focalPoint` prop (CSS `object-position`) for tuning the crop on a non-square source photo. The fallback isn't just an `onError` handler: since a 404 on the image can resolve *before* React finishes hydrating, the `onError` listener alone can miss it, so it also checks `img.complete && img.naturalWidth === 0` in a `useEffect` on mount to catch failures that happened pre-hydration.
- Theme: the "lively" style (see the `lively-frontend` skill): cream pages (`--background #f6f5f1`), black stages (`.stage`, `.band`), Inter for body, Inter Tight for display (`.display`), Instrument Serif italic for accent words (`<em>` inside `.display`, or `em.serif`), all loaded with `next/font/google` in `layout.tsx`. Tokens and the shared classes (`.pill`, `.rv`, `.reveal`, `.ring*`, `.bcard`, `.lift`, `.band`) live in `globals.css`. `--accent` (#b8360b) is the text-safe orange on cream; `--accent-fill` is for button fills and `--hl` for serif words on black. Card colours come from `palette` in `profile.ts` (tint + ink pairs). `prefers-reduced-motion` turns every animation off and swaps the ring for a horizontal scroll strip; framer-motion respects it via `MotionConfig reducedMotion="user"` in `PageTransition.tsx`.
- Icons: lucide-react for generic icons, plus hand-rolled SVGs in `src/components/icons.tsx` for brand marks lucide doesn't provide (GitHub, LinkedIn, Instagram, Twitter, Medium).
- `src/components/SupportButton.tsx` — the "Support my work" CTA (coffee icon, accent-outlined pill), shared between `Hero.tsx` and `Contact.tsx`, both driven by the single `support` entry in `profile.ts`. It links straight to a Stripe Payment Link (no checkout logic in the app — see the Deployment section above for why).
- Animation: `src/components/Reveal.tsx` is a shared framer-motion wrapper (fade + slide up on scroll into view, `whileInView` with `once: true`) used across section and list components for consistent scroll-triggered entrance.
- Dynamic route params are async in this Next.js version — `params` is a `Promise` that must be `await`ed in both `page.tsx` and `generateMetadata`/`generateStaticParams` (see `src/app/blog/[slug]/page.tsx`). See `@AGENTS.md` above: this Next.js version has breaking changes from what training data assumes — check `node_modules/next/dist/docs/` before relying on remembered API shapes.
