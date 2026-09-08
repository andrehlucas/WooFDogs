---
name: Blog/content pages must SSR their primary content
description: Why client-only data fetching on content pages causes Google soft 404s and Lighthouse NO_FCP
---

# Content pages must render primary content server-side

Any page that needs SEO (blog posts, blog index, category/author archives) must render its main content in the server HTML. If the page is a `"use client"` component that fetches its content in `useEffect` via `fetch('/api/...')`, the server ships only loading skeletons.

**Why:** Google flags such pages as **Soft 404** ("URL is not available to Google") because the crawled HTML looks empty/thin, and Lighthouse reports **NO_FCP** ("page did not paint any content") for the same reason — nothing paints until JS runs and the API resolves.

**How to apply:** Fetch data in the server component (`page.tsx`) via `blogService` (the same service `generateMetadata` already uses), call `notFound()` when missing (returns a real 404, not a 200 soft-404), and pass results as `initialPost`/`initialAllPosts` props into the client component. The client component initializes its `useState` from those props, derives things like related posts inline, and guards its fallback `fetch` with `if (initialPost) return;`.

**Gotchas when converting a client page to receive SSR props:**
- Image gated behind an `onLoad` opacity flag stays invisible if the browser loads it before hydration — default the loaded flag to `true` when SSR data is present.
- Dates via `toLocaleDateString` drift between server and client timezones (hydration mismatch) — pass `timeZone: "UTC"`.
- JSON-LD `@id`/url must stay the canonical URL; don't feed it a `shareUrl` that a `useEffect` overwrites with `window.location.href` (can carry UTM query params). Use a separate canonical constant for schema.

**All blog pages are now fully SSR'd (June 2026):** `src/app/blog/page.tsx`, `src/app/blog/category/[slug]`, `src/app/blog/author/[slug]`, and `src/app/blog/[slug]` all fetch data in the server component and pass it as initial props. `BlogSidebar` also receives `initialCategories` and `initialRecentPosts` props from the server — when provided it skips the client-side fetch entirely and renders full content in the initial HTML.
