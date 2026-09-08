# WooF Dogs - Professional Dog Training Website

## Overview

This project is a professional dog training website designed for lead generation and robust data management for dog training businesses. Built with Next.js 16 (App Router), React, TypeScript, and Tailwind CSS, it prioritizes improved PageSpeed and SEO through server-side rendering and comprehensive marketing attribution data. The system aims to be production-ready with flexible CRM integration (HubSpot/Perfex).

## User Preferences

- Preferred communication style: Simple, everyday language
- All code and content must be in English (not Portuguese)
- Production domain: woofdogs.com (canonical, without www - www redirects to non-www)

## System Architecture

### Backend
- **Framework:** Next.js 16 API Routes.
- **Lead Management:** API for lead submission, abstracted CRM integration (HubSpot/Perfex), and client-side traffic source tracking.
- **Validation:** Zod schemas for type-safe request validation.
- **Data Model:** Shared schemas (`shared/schema.ts`) for type consistency.

### Frontend
- **Framework:** Next.js 16 with React 18 and TypeScript.
- **Build Tool:** Next.js with Turbopack.
- **Routing:** Next.js App Router.
- **UI/UX:** `shadcn/ui` based on Radix UI, Tailwind CSS with custom design tokens, HSL color theming, `next-themes` for light/dark mode, Framer Motion for animations, and `class-variance-authority` for component variants. Visuals include radial gradient backgrounds, animated grid patterns, and gradient hover effects.

### Core Features
- **Navigation:** Desktop mega menu and mobile-responsive hamburger menu with accordion navigation.
- **Service Pages:** Dedicated pages for various training services (Obedience, Puppy, Evaluation, etc.), including specific pages for Dog Boarding, Board & Train, and Bootcamp, each with detailed program overviews, modalities, and interactive elements.
  - **Dog Boarding:** `/dog-boarding` with LocalBusiness JSON-LD schema, four accommodation tiers, add-on services, and specific drop-off/pick-up hours.
- **A/B Testing:** Implemented for the Hero Section with two variants (Bento Grid and Interactive Carousel).
- **Global Booking Evaluation Modal:** Triggerable from any button, manages multiple dogs, uses `react-hook-form` and Zod validation, and protects unsaved data.
- **Container Layout:** Max-width of 1280px with responsive padding.
- **Scroll-Based Navbar:** Smooth hide/show animation.
- **City Landing Pages (Local SEO):** Five city-specific landing pages (`/dog-training-boca-raton`, etc.) using a shared `CityLandingPage` component with localized content, SEO metadata, and strong CTAs.
- **Service Areas Section:** Reusable component (`ServiceAreasSection.tsx`) with full and compact variants, linking to city pages.
- **Internal Linking:** Comprehensive internal linking strategy connecting homepage, service pages, and city pages.
- **SEO & Google Search Optimization:** Automatic XML sitemap, dynamic robots.txt, JSON-LD structured data (LocalBusiness Schema), Open Graph & Twitter Cards, canonical URLs, and meta keywords.
- **LLM-Friendly Documentation:** `/llms.txt` file providing a curated markdown overview for AI/LLM consumption.
- **Lead Collection System:** CRM-first architecture with comprehensive marketing attribution tracking (UTM parameters, ad click IDs, referrer, timestamps) using first-party cookies, supporting first-touch and last-touch attribution. Data is synced to CRM (HubSpot/Perfex).
- **GTM/Google Ads Tracking:** `form_submission` DataLayer event for conversion tracking (GTM-NQBKJVG, AW-998417390).
- **CRM Integration:** Perfex CRM at `https://crm.woofdogs.com`.
- **WordPress CMS Integration:** Blog content fetched from `https://cms.woofdogs.com` via REST API.
- **MDX File-Based Blog:** Drop `.mdx` files into `content/blog/` to publish blog posts. Uses `gray-matter` for frontmatter parsing and `marked` for HTML rendering. Frontmatter fields: title, description, coverImage, coverImageAlt, ogImage, date, lastUpdated, author, tags. Tags map to categories; slug is derived from the filename.
- **Blog Full Experience (March 2026):** Complete blog upgrade including: (1) 5 new SEO-targeted MDX posts (puppy training, leash reactivity, separation anxiety, dog jumping, training costs); (2) Blog index search with client-side filtering; (3) Pagination with "Load More" on the index; (4) Inline CTA component (BlogCta) inserted mid-article and at article end; (5) Sidebar CTA widget on all blog pages; (6) Breadcrumb navigation on single post pages; (7) Dynamic BlogPosting + BreadcrumbList JSON-LD schema per post; (8) Dynamic Open Graph/Twitter Card metadata via server component `generateMetadata`; (9) Author bio card with role-specific descriptions; (10) RSS feed at `/blog/feed.xml`.
- **Nonce-based CSP (May 2026, Task #21):** Per-request CSP nonce is generated in `src/middleware.ts`, propagated to Next.js via the `x-nonce` request header, and applied to all `<Script>` tags in `src/app/layout.tsx` (GTM/GA bootstrap + gtag loader). Production `script-src` no longer includes `'unsafe-inline'` or `'unsafe-eval'` — uses `'nonce-...' 'strict-dynamic'` instead. Static CSP was removed from `next.config.mjs` (other security headers remain). JSON-LD `<script type="application/ld+json">` blocks are CSP3-exempt and unchanged.
- **Homepage LCP/TBT Optimization (May 2026, Task #31):** (1) `WoofDogsLanding` and `HeroVariantA` are now server components. Booking CTAs are extracted as small client islands at `src/components/landing/`: `BookEvalButton` (shadcn Button wrapper used by lead-trainer + contact CTAs), `BookEvalLink` (raw underline-link used inside the six Behavior Issues cards), and `HeroBookEvalButton` (the hero "Book an Evaluation" CTA). All other hero markup — header copy, mobile carousel cards, desktop bento grid, gradient/grid backgrounds — is server-rendered. (2) `Navbar` was split into a server component (`src/components/Navbar.tsx`) that composes the static `<header>` markup + logo and renders two client islands — `<NavbarShell>` (a thin client wrapper that owns the scroll-hide state, since `window`/`useEffect` can't run on the server) and `<NavInteractive>` that owns the desktop menu, mobile sheet, Owner Guides modal, and "Get Started" CTA. The mobile sheet (`MobileNav`) and `OwnerGuidesModal` are now lazy-loaded via `next/dynamic({ ssr: false })`, so their JS (Radix Sheet/Accordion/Dialog) ships only when actually opened. The `useOwnerGuidesModal` hook moved to `src/hooks/useOwnerGuidesModal.ts` so importing it doesn't pull in the modal body. The framer-motion scroll-hide `motion.div` was replaced with a CSS `transform: translateY` transition driven by a tiny scroll listener in `NavbarShell`, dropping framer-motion from the homepage's initial bundle. (3) `src/app/page.tsx` calls `ReactDOM.preload()` for the hero LCP image with `imageSrcSet`/`imageSizes` mirroring the `next/image` candidate set (device widths 640..3840, q=75) and the first `BentoItem`'s `sizes="(max-width: 768px) 100vw, 66vw"`. React/Next 16 hoists this into `<head>` so the browser starts fetching the LCP image before parsing the streamed body, complementing the auto-preload that `next/image` `priority` emits without producing a duplicate fetch (URLs match the `next/image` candidates). (4) `src/app/layout.tsx` now defers GTM until first user interaction (`scroll`/`pointerdown`/`keydown`/`touchstart`, once+capture, with cleanup) OR `requestIdleCallback({timeout:5000})` — fallback `setTimeout(..., 5000)`. Removed the `fonts.googleapis.com`/`fonts.gstatic.com` preconnects (Inter is self-hosted via `next/font`). Nonce on every `<Script>` is preserved (Task #21). LazySection is unchanged (still SSRs children with `content-visibility: auto`, Task #16); `BookingEvaluationModal` stays lazy via providers (Task #16). Lighthouse mobile measurements (to be filled in by the operator after deploying — the Replit dev sandbox runs Next in dev mode and proxies through an iframe, which makes in-environment Lighthouse runs unreliable; the metrics below should be captured against the production `https://woofdogs.com/` URL):

| Metric  | Before (pre-Task #31) | After (post-Task #31) | Delta |
| ------- | --------------------- | --------------------- | ----- |
| Performance score | _TBD_ | _TBD_ | _TBD_ |
| LCP (s) | _TBD_ | _TBD_ | _TBD_ |
| TBT (ms) | _TBD_ | _TBD_ | _TBD_ |
| FCP (s) | _TBD_ | _TBD_ | _TBD_ |
| CLS | _TBD_ | _TBD_ | _TBD_ |

Expected direction: noticeably lower TBT from removing eager framer-motion + Sheet/Accordion/Dialog from the initial JS bundle; faster LCP from interaction-deferred GTM and the explicit hero preload; unchanged FCP/CLS (skeleton heights and SSR markup preserved).
- **Homepage SEO/Perf Audit Fixes (May 2026, Task #16):** (1) Rewrote `LazySection` to render children server-side with CSS `content-visibility: auto` + `contain-intrinsic-size` (replaced IntersectionObserver mount/unmount which hid below-the-fold copy from SSR HTML — word count rose from 492 to 1294); (2) New `WebPageSchema` component emits WebSite (with SearchAction), WebPage, and BreadcrumbList JSON-LD linked to existing LocalBusiness `#organization`; (3) `next.config.mjs` `headers()` adds `s-maxage=3600, stale-while-revalidate=86400` + `Vary: Accept-Encoding` on `/` and `Cache-Control: public, max-age=31536000, immutable` for static image/font assets; (4) `BookingEvaluationModal` lazy-imported via `next/dynamic({ ssr: false })` to defer heavy modal JS; (5) Logo replaced from 822 KB SVG with 13 KB PNG (`woof-dogs-logo.png`); team photo recompressed (153 KB JPG → 43 KB WebP); (6) Strengthened alt text on logos, behavior issue images, team/Shay photos, and blog featured images; added explicit width/height to blog featured img and bumped LazySection skeleton heights to prevent CLS.

### Technical Implementations
- **State Management:** React hooks for local state, `@tanstack/react-query` for server state.
- **Form Handling:** `react-hook-form` with `@hookform/resolvers`.
- **Accessibility:** ARIA labels, keyboard navigation, focus management.
- **Performance:** Code splitting, tree-shaking, CSS purging, asset optimization, LCP optimization, font loading optimization, lazy loading, CLS prevention, GTM deferred loading, preconnects, modern browser targeting, and Next.js Image component with AVIF/WebP.
- **Development Tooling:** TypeScript, ESLint, path aliases.

## External Dependencies

### UI Components
- **@radix-ui/**: Unstyled, accessible component primitives.
- **lucide-react**: Icon library.
- **cmdk**: Command menu component.
- **vaul**: Drawer component.
- **embla-carousel-react**: Carousel functionality.
- **input-otp**: OTP input component.

### Utilities
- **clsx** + **tailwind-merge**: Conditional `className` handling.
- **date-fns**: Date manipulation and formatting.
- **react-day-picker**: Calendar/date picker component.
- **sonner**: Toast notifications.

### Animation
- **framer-motion**: Production-ready animation library.

### Theme Management
- **next-themes**: Dark/light mode toggle.