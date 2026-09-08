import fs from "fs";
import path from "path";
import { pingIndexNow, getIndexNowKey } from "./indexNowService";

const STATE_DIR = path.join(process.cwd(), ".local");
const SNAPSHOT_FILE = path.join(STATE_DIR, ".sitemap-snapshot.json");

interface SitemapSnapshot {
  updatedAt: string;
  entries: Record<string, string>;
}

interface SitemapEntry {
  url: string | URL;
  lastModified?: string | Date;
}

let started = false;

function readSnapshot(): SitemapSnapshot {
  try {
    if (!fs.existsSync(SNAPSHOT_FILE)) {
      return { updatedAt: "", entries: {} };
    }
    const raw = fs.readFileSync(SNAPSHOT_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object" && parsed.entries) {
      return {
        updatedAt: typeof parsed.updatedAt === "string" ? parsed.updatedAt : "",
        entries: parsed.entries as Record<string, string>,
      };
    }
  } catch (err) {
    console.warn(
      "[sitemap-diff] failed to read snapshot:",
      err instanceof Error ? err.message : err,
    );
  }
  return { updatedAt: "", entries: {} };
}

function writeSnapshot(snapshot: SitemapSnapshot): void {
  try {
    if (!fs.existsSync(STATE_DIR)) fs.mkdirSync(STATE_DIR, { recursive: true });
    fs.writeFileSync(SNAPSHOT_FILE, JSON.stringify(snapshot, null, 2), "utf-8");
  } catch (err) {
    console.warn(
      "[sitemap-diff] failed to persist snapshot:",
      err instanceof Error ? err.message : err,
    );
  }
}

/**
 * Normalize a sitemap `lastModified` value to a calendar date (YYYY-MM-DD).
 * Static pages in `src/app/sitemap.ts` use `new Date()` which would otherwise
 * cause every cold start to look like a content change. Truncating to the
 * day means static pages ping at most once per day, while blog posts (which
 * carry real publish dates) still diff exactly.
 */
function normalizeLastMod(value: string | Date | undefined): string {
  if (!value) return "";
  const d = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return d.toISOString().slice(0, 10);
}

function isBlogPath(pathname: string): boolean {
  return pathname.startsWith("/blog/") && pathname !== "/blog/feed.xml";
}

function pathnameOf(input: string | URL): string | null {
  try {
    const u = typeof input === "string" ? new URL(input) : input;
    return u.pathname || "/";
  } catch {
    return null;
  }
}

/**
 * Compare the current sitemap entries against the previous deploy's snapshot
 * and ping IndexNow for any non-blog URL whose `lastmod` advanced. Blog URLs
 * are intentionally skipped — they are already pinged in real time by the
 * WordPress poller and the MDX file watcher.
 *
 * The snapshot is persisted to `.local/.sitemap-snapshot.json` so the diff
 * is accurate across cold starts and deploys. Always fire-and-forget; this
 * function never throws and never blocks the caller.
 */
export async function notifyChangedSitemapUrls(
  entries: SitemapEntry[],
): Promise<void> {
  if (!getIndexNowKey()) {
    console.log("[sitemap-diff] INDEXNOW_KEY not configured, skipping");
    return;
  }

  const previous = readSnapshot();
  const next: Record<string, string> = {};
  const changedUrls: string[] = [];
  const changedPaths: string[] = [];

  for (const entry of entries) {
    const pathname = pathnameOf(entry.url);
    if (!pathname) continue;
    const lastmod = normalizeLastMod(entry.lastModified);
    if (!lastmod) continue;
    next[pathname] = lastmod;

    if (isBlogPath(pathname)) continue;

    const prev = previous.entries[pathname];
    if (prev !== lastmod) {
      const fullUrl =
        typeof entry.url === "string" ? entry.url : entry.url.toString();
      changedUrls.push(fullUrl);
      changedPaths.push(pathname);
    }
  }

  // First run on a fresh environment: seed the snapshot without spamming
  // search engines for every URL the site already had.
  const isFirstRun = Object.keys(previous.entries).length === 0;
  if (isFirstRun) {
    writeSnapshot({ updatedAt: new Date().toISOString(), entries: next });
    console.log(
      `[sitemap-diff] seeded initial snapshot with ${Object.keys(next).length} urls (no pings sent)`,
    );
    return;
  }

  if (changedUrls.length === 0) {
    writeSnapshot({ updatedAt: new Date().toISOString(), entries: next });
    console.log("[sitemap-diff] no non-blog url changes detected");
    return;
  }

  console.log(
    `[sitemap-diff] ${changedUrls.length} non-blog url(s) changed since last deploy:`,
    changedPaths,
  );

  const result = await pingIndexNow(changedUrls);
  if (result.skipped) {
    console.log(`[sitemap-diff] ping skipped: ${result.error ?? "unknown"}`);
    return;
  }
  if (!result.ok) {
    console.warn(
      `[sitemap-diff] ping failed (status ${result.status ?? "n/a"}): ${result.error ?? ""} — snapshot not updated, will retry next run`,
    );
    return;
  }

  console.log(
    `[sitemap-diff] pinged IndexNow for ${changedUrls.length} url(s) (status ${result.status})`,
  );
  writeSnapshot({ updatedAt: new Date().toISOString(), entries: next });
}

async function loadCurrentSitemap(): Promise<SitemapEntry[] | null> {
  try {
    const mod = await import("../../src/app/sitemap");
    const fn = mod.default as () => Promise<SitemapEntry[]>;
    const entries = await fn();
    return Array.isArray(entries) ? entries : null;
  } catch (err) {
    console.warn(
      "[sitemap-diff] failed to load sitemap:",
      err instanceof Error ? err.message : err,
    );
    return null;
  }
}

/**
 * Run the sitemap-diff once after a short delay to let the server warm up.
 * Idempotent per process; the on-disk snapshot prevents duplicate pings
 * across cold starts.
 */
export function startSitemapDiffNotifier(delayMs: number = 15_000): void {
  if (started) return;
  started = true;
  if (!getIndexNowKey()) {
    console.log(
      "[sitemap-diff] INDEXNOW_KEY not configured, notifier disabled",
    );
    return;
  }
  console.log(
    `[sitemap-diff] notifier scheduled to run in ${Math.round(delayMs / 1000)}s`,
  );
  setTimeout(() => {
    void runSitemapDiffOnce();
  }, delayMs).unref?.();
}

export async function runSitemapDiffOnce(): Promise<void> {
  const entries = await loadCurrentSitemap();
  if (!entries) return;
  await notifyChangedSitemapUrls(entries);
}
