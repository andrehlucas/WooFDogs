# WooF Dogs SEO Launch Checklist

## Before Going Live

### Domain & Technical Setup
- [ ] Point DNS to woofdogs.com (primary domain - without www)
- [x] Set up 301 redirect from www.woofdogs.com to woofdogs.com (configured in next.config.js)
- [ ] Ensure HTTPS is enabled with valid SSL certificate
- [ ] Test site loads correctly on the live domain

### Google Search Console
- [ ] Create/access Google Search Console account
- [ ] Add and verify woofdogs.com property (non-www)
- [ ] Add verification code to `src/app/layout.tsx` (replace `YOUR_GOOGLE_VERIFICATION_CODE`)
- [ ] Submit sitemap: https://woofdogs.com/sitemap.xml
- [ ] Check for any crawl errors or indexing issues

### Google Business Profile
- [ ] Create Google Business Profile at business.google.com
- [ ] Verify business ownership (postcard, phone, or email)
- [ ] Add business information:
  - [ ] Business name: WooF Dogs
  - [ ] Address: 4200 Global Trail, Loxahatchee FL, 33470
  - [ ] Phone: (561) 594-4111
  - [ ] Website: https://woofdogs.com
  - [ ] Business hours
  - [ ] Service categories (Dog Training, Pet Services)
  - [ ] Service areas (Boca Raton, Delray Beach, Wellington, Palm Beach Gardens)
- [ ] Add photos of trainers, facility, training sessions
- [ ] Enable messaging and booking features

### IndexNow (Bing/Yandex/Seznam) Auto-Ping

The site auto-pings IndexNow whenever a blog post is published or updated,
so search engines learn about it within seconds. The shared notifier lives in
`server/services/publishNotifyService.ts` and the IndexNow client is in
`server/services/indexNowService.ts`.

The site has two publish sources, both wired to the same notifier:
- **WordPress CMS at `cms.woofdogs.com`** (current production source). A
  background poller in `server/services/wpPublishWatcher.ts` checks the WP
  REST API (`/wp/v2/posts?orderby=modified`) every 5 minutes and fires pings
  for any post whose `modified_gmt` advanced since the last poll. The poller
  is started from `server/services/blogService.ts` on first import.
  - For instant notification you can additionally configure WordPress to POST
    to `/api/wp/notify` (see "WordPress webhook" below).
- **Local MDX files under `content/blog/`** (legacy). A filesystem watcher
  in `server/services/mdxBlogService.ts` schedules a debounced ping (~1.5s)
  whenever a `.mdx` / `.md` file is created or changed.

Per-slug ping timestamps are persisted to `.local/.indexnow-state.json` so
the same revision is never pinged twice. Failures are logged with the
`[indexnow]` prefix and never block the publish action.

How to test:
1. Make sure the `INDEXNOW_KEY` environment variable is set (the key file
   `<key>.txt` should already be served from the site root).
2. Start the app (`npm run dev`) and watch the server logs. You should see:
   `[wp-publish] polling https://cms.woofdogs.com/wp-json/wp/v2 every 300s ...`
   and (if the legacy MDX folder still exists)
   `[indexnow] watching .../content/blog for blog publish/update events`.
3. Publish or update a post in WordPress. Within ~5 minutes (or instantly
   if the webhook is wired), the logs should show
   `[indexnow] pinged /blog/<slug> (status 200|202)`.
4. Verify the slug's timestamp in `.local/.indexnow-state.json` was updated.
5. To force a manual ping for any URL, POST to `/api/indexnow/notify` with
   `{ "url": "/blog/<slug>" }` and the `x-admin-key` header.

#### Non-blog pages (sitemap diff on deploy)

Updates to non-blog URLs (homepage, service pages, city pages, FAQ, etc.)
are auto-pinged after every deploy. About 15 seconds after server startup,
`startSitemapDiffNotifier()` (wired from `server/services/blogService.ts`)
loads the live `/sitemap.xml`, compares each entry against the previous
snapshot in `.local/.sitemap-snapshot.json`, and POSTs the changed URLs to
IndexNow.

Behavior notes:
- Blog URLs (`/blog/...`) are skipped here — they are already pinged in
  real time by the WP poller and the MDX file watcher.
- `lastmod` is normalized to a calendar date (YYYY-MM-DD) when diffing, so
  static pages whose sitemap entry is `new Date()` ping at most once per
  day even if the server cold-starts repeatedly.
- The snapshot is only persisted on a successful (or no-op) ping, so
  transient IndexNow failures are retried on the next deploy.
- The very first run on an empty snapshot just seeds the file (no pings).
- For pipelines that build but never boot the Node server, run the same
  diff manually:

  ```
  INDEXNOW_KEY=... npx tsx scripts/notify-sitemap-changes.mjs
  ```

  Server logs show `[sitemap-diff] ...` lines listing which URLs were
  submitted and the resulting status. Failures never block the deploy.

#### WordPress webhook (optional, for instant pings)

Configure a WordPress webhook plugin (e.g. WP Webhooks, Hookpress, or a
custom action on `transition_post_status` → `publish`) to POST to:

```
POST https://woofdogs.com/api/wp/notify
Headers: x-admin-key: <ADMIN_API_KEY>
Body:    { "slug": "<post-slug>", "modified_gmt": "<post.modified_gmt>" }
```

The endpoint also accepts `{ "post": { "slug": "...", "modified_gmt": "...", "status": "publish" } }`
to match common WP webhook payload shapes, or `{ "slugs": ["a", "b"] }` for
batch notifications. Each call notifies both IndexNow and Google Indexing
through the shared `publishNotifyService` (deduped per channel).

### Google Indexing API Auto-Ping

In addition to IndexNow (which Google does **not** consume), the site also
notifies Google's Indexing API whenever a blog post is published or updated.
This closes the loop for the largest search engine so new posts surface in
Search Console within minutes instead of days. The Google-specific helper
lives in `server/services/googleIndexingService.ts` and is wired into the
same shared notifier (`server/services/publishNotifyService.ts`) used by both
the WordPress poller and the legacy MDX watcher.

How it works:
- Reads a service-account JSON key from the `GOOGLE_INDEXING_SERVICE_ACCOUNT`
  environment variable (one-line JSON, with `\n` escapes inside `private_key`).
  The service account must be added as an **Owner** of the
  `https://woofdogs.com/` property in Google Search Console.
- The WordPress poller (`server/services/wpPublishWatcher.ts`) runs every
  5 minutes and fires `URL_UPDATED` for any CMS post whose `modified_gmt`
  advanced since the last poll, as long as the modification is within the
  past 14 days.
- The optional `/api/wp/notify` webhook (see IndexNow section above) also
  triggers an immediate Google ping for the affected slug.
- Per-slug ping timestamps are persisted to `.local/.google-index-state.json`
  (separate from `.local/.indexnow-state.json`) so a successful IndexNow ping
  never silences a Google retry, and vice-versa.
- Failures are logged with the `[google-index]` prefix and never block the
  publish action.

How to test:
1. Set `GOOGLE_INDEXING_SERVICE_ACCOUNT` to the JSON key for a service account
   that owns the Search Console property (alongside `INDEXNOW_KEY`).
2. Start the app (`npm run dev`) and watch the server logs. You should see
   `[wp-publish] polling https://cms.woofdogs.com/wp-json/wp/v2 every 300s ...`.
3. Publish or update a post in WordPress. Within ~5 minutes (or instantly
   via the webhook), the logs should show both
   `[indexnow] pinged /blog/<slug> (status 200|202)` and
   `[google-index] pinged /blog/<slug> (status 200)`.
4. Verify the slug's timestamp in `.local/.google-index-state.json` was
   updated. If a ping fails, the slug is intentionally left at its prior
   timestamp so the next poll/webhook will retry it.
5. Confirm in Google Search Console (URL Inspection) that the post was
   discovered within minutes.

### On-Page SEO (Already Configured)
- [x] Sitemap generated at /sitemap.xml (11 pages)
- [x] Robots.txt configured at /robots.txt
- [x] LocalBusiness structured data (JSON-LD)
- [x] Open Graph tags for social sharing
- [x] Twitter Card meta tags
- [x] Canonical URLs configured
- [x] Meta descriptions on all pages
- [x] Title tags with keyword optimization
- [x] Mobile-responsive design

### Core Web Vitals
- [ ] Run PageSpeed Insights test: https://pagespeed.web.dev/
- [ ] Target scores:
  - [ ] LCP (Largest Contentful Paint) < 2.5 seconds
  - [ ] FID/INP (Interaction to Next Paint) < 100ms
  - [ ] CLS (Cumulative Layout Shift) < 0.1
- [ ] Address any performance recommendations

### Content Review
- [ ] Verify all pages have unique, descriptive content
- [ ] Check for spelling and grammar errors
- [ ] Ensure all images have descriptive alt text
- [ ] Verify internal links work correctly
- [ ] Test contact forms and CTAs

### Local SEO
- [ ] Consistent NAP (Name, Address, Phone) across all pages
- [ ] Add business to local directories:
  - [ ] Yelp
  - [ ] Facebook Business
  - [ ] Nextdoor
  - [ ] Yellow Pages
  - [ ] Better Business Bureau
- [ ] Encourage satisfied customers to leave Google reviews

---

## After Going Live

### Week 1
- [ ] Monitor Google Search Console for indexing status
- [ ] Check for 404 errors or broken links
- [ ] Verify sitemap was successfully processed
- [ ] Monitor site performance in real-world conditions

### Week 2-4
- [ ] Request indexing for important pages in Search Console
- [ ] Monitor keyword rankings (use free tools like Google Search Console)
- [ ] Check Google Business Profile insights
- [ ] Respond to any Google reviews

### Ongoing
- [ ] Add fresh content regularly (blog posts, success stories)
- [ ] Monitor and respond to customer reviews
- [ ] Update business hours for holidays
- [ ] Track organic traffic growth in Google Analytics
- [ ] Build local citations and backlinks

---

## Quick Reference

**Domain:** woofdogs.com (canonical, without www)  
**Sitemap:** https://woofdogs.com/sitemap.xml  
**Robots.txt:** https://woofdogs.com/robots.txt  

**Contact Info (must be consistent everywhere):**
- Address: 4200 Global Trail, Loxahatchee FL, 33470
- Phone: (561) 594-4111
- Email: office@woofdogs.com

**Key Pages to Monitor:**
1. Homepage (/)
2. Obedience Training (/obedience)
3. Puppy Training (/puppy-training)
4. Evaluation (/evaluation)
5. Service Animal Training (/service-animal-training)
