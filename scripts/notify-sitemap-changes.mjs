#!/usr/bin/env node
/**
 * Standalone post-deploy hook: diff the current sitemap against the snapshot
 * in `.local/.sitemap-snapshot.json` and ping IndexNow for any non-blog URL
 * whose `lastmod` advanced. Safe to run multiple times — the snapshot is
 * only updated on a successful ping (or no-op).
 *
 * The same logic runs automatically ~15s after server startup via
 * `startSitemapDiffNotifier()` in `server/services/blogService.ts`, so this
 * script is only needed for pipelines that build but never boot the Node
 * server.
 *
 * Usage (requires `tsx` or a similar TS loader on PATH since the source is
 * authored in TypeScript):
 *
 *   INDEXNOW_KEY=... npx tsx scripts/notify-sitemap-changes.mjs
 */
async function main() {
  const mod = await import("../server/services/sitemapDiffService.ts");
  await mod.runSitemapDiffOnce();
}

main().catch((err) => {
  console.error("[sitemap-diff] script failed:", err);
  // Never block the deploy.
  process.exit(0);
});
