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

- `src/data/profile.ts` — name/tagline/bio/tags, plus two separate link groups: `socials` (direct contact — email, phone, Calendly) and `followLinks` (social profile deep-links). `Contact.tsx` renders these as two distinct button groups.
- `src/data/experience.ts`, `src/data/projects.ts` — typed arrays rendered by `Experience.tsx` / `Projects.tsx`.
- `src/data/writing.ts` — blog posts. Each entry stores pre-rendered `contentHtml` (a sanitized-at-authoring-time HTML string), not markdown. It's rendered via `dangerouslySetInnerHTML` in `src/app/blog/[slug]/page.tsx` inside a `.post-content` wrapper whose styles live in `globals.css`. This is safe because the HTML is trusted first-party content baked into the repo, not runtime user input.

  The file's header comment claims content was "synced from a Medium data export" via a `scripts/parse-medium-export` script — **that script does not exist in the repo**; it was a one-off parsing pass done outside the project during content import. To pull in new Medium posts, you'll need to rebuild an equivalent parser (Medium's per-post export HTML has deeply nested `section`/`div` wrappers around real content tags) rather than expect a runnable script.

- Site structure: the homepage (`src/app/page.tsx`) is a single long-scroll page composed of section components (`Hero`, `Experience`, `Projects`, `Contact`), each with a matching `id` (`about`, `experience`, `projects`, `contact`) for anchor navigation. `Nav.tsx` scroll-spies these via `IntersectionObserver` to highlight the active section, and links from other routes back to sections use `/#section-id`. Blog is a separate route (`/blog` index + `/blog/[slug]`), not part of the scroll page.
- Theme: dark-mode-only (no toggle), defined as CSS custom properties in `globals.css` (`--background`, `--foreground`, `--accent`, `--muted`, `--border`, `--surface`) and exposed to Tailwind via `@theme inline`.
- Icons: lucide-react for generic icons, plus hand-rolled SVGs in `src/components/icons.tsx` for brand marks lucide doesn't provide (GitHub, LinkedIn, Instagram, Twitter, Medium).
- Animation: `src/components/Reveal.tsx` is a shared framer-motion wrapper (fade + slide up on scroll into view) used across section and list components for consistent scroll-triggered entrance.
- Dynamic route params are async in this Next.js version — `params` is a `Promise` that must be `await`ed in both `page.tsx` and `generateMetadata`/`generateStaticParams` (see `src/app/blog/[slug]/page.tsx`). See `@AGENTS.md` above: this Next.js version has breaking changes from what training data assumes — check `node_modules/next/dist/docs/` before relying on remembered API shapes.
