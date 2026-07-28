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

## Architecture

This is a single-person portfolio/blog site (Next.js 16, App Router, TypeScript, Tailwind v4). The defining pattern: **all page content lives in typed data files under `src/data/`, not in components**. Components are presentational and map over these arrays; to update site content (bio, experience, projects, blog posts), edit the data file, not the component.

- `src/data/profile.ts` — name/tagline/bio/tags/avatar, plus two separate link groups: `socials` (direct contact — email, phone, Calendly, rendered as one primary button + lightweight text links) and `followLinks` (social profile deep-links, rendered as icon-only circular buttons). `Contact.tsx` renders these as two visually distinct groups.
- `src/data/experience.ts`, `src/data/projects.ts` — typed arrays rendered by `Experience.tsx` / `Projects.tsx`.
- `src/data/writing.ts` — blog posts. Each entry stores pre-rendered `contentHtml` (a sanitized-at-authoring-time HTML string), not markdown. It's rendered via `dangerouslySetInnerHTML` in `src/app/blog/[slug]/page.tsx` inside a `.post-content` wrapper whose styles live in `globals.css`. This is safe because the HTML is trusted first-party content baked into the repo, not runtime user input.

  The file's header comment claims content was "synced from a Medium data export" via a `scripts/parse-medium-export` script — **that script does not exist in the repo**; it was a one-off parsing pass done outside the project during content import. To pull in new Medium posts, you'll need to rebuild an equivalent parser (Medium's per-post export HTML has deeply nested `section`/`div` wrappers around real content tags) rather than expect a runnable script.

- Site structure: the homepage (`src/app/page.tsx`) is a short scroll page composed of just `Hero` (id `about`) and `Contact` (id `contact`). `Experience` and `Projects` each moved out to their own dedicated routes (`src/app/experience/page.tsx`, `src/app/projects/page.tsx`) — those pages are thin wrappers that just render the shared component (same pattern as how `Nav.tsx` treats `/blog`). `Nav.tsx` scroll-spies the two remaining homepage sections via `IntersectionObserver` (`sectionIds` array) to highlight the active nav item, and links to homepage sections use `/#section-id`; links to standalone routes (`/experience`, `/projects`, `/blog`) are matched active via `pathname.startsWith(link.href)` instead. When adding a new homepage section or moving one in/out of the scroll page, update both `sectionIds` and the corresponding `href` in `Nav.tsx`'s `links` array together.
- `src/components/Avatar.tsx` — reusable photo component with graceful fallback to initials. Supports `shape` (`"circle"` | `"rectangle"`), explicit `width`/`height` (or a single `size` for circles), and a `focalPoint` prop (CSS `object-position`) for tuning the crop on a non-square source photo. The fallback isn't just an `onError` handler: since a 404 on the image can resolve *before* React finishes hydrating, the `onError` listener alone can miss it, so it also checks `img.complete && img.naturalWidth === 0` in a `useEffect` on mount to catch failures that happened pre-hydration.
- Theme: single fixed theme (no toggle) — currently a warm light palette (cream `--background`, white `--surface`, burnt-orange `--accent`), defined as CSS custom properties in `globals.css` (`--background`, `--foreground`, `--accent`, `--muted`, `--border`, `--surface`) and exposed to Tailwind via `@theme inline`. `html`'s `color-scheme` must match (`light`/`dark`) whichever palette is active. The `--accent` value doubles as text color in several places (nav, section labels, tag pills) as well as button backgrounds, so if it's changed, pick a shade that passes WCAG AA 4.5:1 against `--background` as text — not just as a button fill (which only needs 3:1) — or contrast will silently break in the text usages.
- Icons: lucide-react for generic icons, plus hand-rolled SVGs in `src/components/icons.tsx` for brand marks lucide doesn't provide (GitHub, LinkedIn, Instagram, Twitter, Medium).
- Animation: `src/components/Reveal.tsx` is a shared framer-motion wrapper (fade + slide up on scroll into view, `whileInView` with `once: true`) used across section and list components for consistent scroll-triggered entrance.
- Dynamic route params are async in this Next.js version — `params` is a `Promise` that must be `await`ed in both `page.tsx` and `generateMetadata`/`generateStaticParams` (see `src/app/blog/[slug]/page.tsx`). See `@AGENTS.md` above: this Next.js version has breaking changes from what training data assumes — check `node_modules/next/dist/docs/` before relying on remembered API shapes.
