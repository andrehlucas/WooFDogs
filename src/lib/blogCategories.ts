/**
 * Canonical category merge map.
 *
 * Keys are alias slugs (WordPress duplicates or misspellings) that should
 * permanently redirect to the value slug. Both sides are WordPress category
 * slugs that live under /blog/category/<slug>.
 *
 * Rules enforced via this map:
 *  - The alias slug receives a permanentRedirect() in BlogCategoryPage.
 *  - The alias slug is excluded from the sitemap.
 *  - The alias slug gets noindex in generateMetadata (as a fallback, in case
 *    the redirect somehow doesn't fire first).
 */
export const CANONICAL_CATEGORIES: Record<string, string> = {
  // WordPress has both "Service Animal" (service-animal) and
  // "Service Animals" (service-animals). Neither has posts yet, but
  // "service-animal" is the shorter, preferred slug.
  'service-animals': 'service-animal',
};

/**
 * Minimum post count for a category archive to be indexed by search engines.
 * Archives with fewer than this many posts receive robots: { index: false }.
 * Also used to filter the sitemap (archives below threshold are excluded).
 */
export const THIN_ARCHIVE_THRESHOLD = 2;
