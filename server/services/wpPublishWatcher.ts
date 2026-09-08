import {
  notifyUrlPublished,
  isAnyChannelConfigured,
} from "./publishNotifyService";

const WP_API_BASE = "https://cms.woofdogs.com/wp-json/wp/v2";
const POLL_INTERVAL_MS = 5 * 60 * 1000;
const PUBLISH_WINDOW_MS = 14 * 24 * 60 * 60 * 1000;
const PER_PAGE = 30;

let started = false;
let timer: NodeJS.Timeout | null = null;
const seenModifiedBySlug = new Map<string, number>();
let firstPollCompleted = false;

interface WPPostSummary {
  slug: string;
  modified_gmt: string;
  status?: string;
  type?: string;
}

function parseWpDate(modifiedGmt: string): number {
  // WP REST returns "2026-05-04T18:23:11" without the trailing Z; force UTC.
  const iso = /Z$/.test(modifiedGmt) ? modifiedGmt : `${modifiedGmt}Z`;
  const t = new Date(iso).getTime();
  return Number.isNaN(t) ? 0 : t;
}

async function fetchRecentPosts(): Promise<WPPostSummary[] | null> {
  const url = `${WP_API_BASE}/posts?per_page=${PER_PAGE}&orderby=modified&order=desc&status=publish&_fields=slug,modified_gmt,status,type`;
  try {
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
    });
    if (!res.ok) {
      console.warn(`[wp-publish] WP REST returned ${res.status}`);
      return null;
    }
    const data = (await res.json()) as WPPostSummary[];
    return Array.isArray(data) ? data : null;
  } catch (err) {
    console.warn(
      "[wp-publish] failed to fetch recent posts:",
      err instanceof Error ? err.message : err,
    );
    return null;
  }
}

/**
 * Notify IndexNow + Google for a single CMS post slug right now, bypassing
 * the in-memory dedupe so manual webhook calls always re-evaluate against
 * the on-disk per-channel state. Always fire-and-forget.
 */
export function notifyWpPostPublished(
  slug: string,
  modifiedGmt?: string,
): void {
  if (!slug || typeof slug !== "string") return;
  const trimmed = slug.trim().replace(/^\/+|\/+$/g, "");
  if (!trimmed) return;
  const mtimeMs = modifiedGmt ? parseWpDate(modifiedGmt) || Date.now() : Date.now();
  seenModifiedBySlug.set(trimmed, Math.max(seenModifiedBySlug.get(trimmed) ?? 0, mtimeMs));
  notifyUrlPublished(trimmed, `/blog/${trimmed}`, mtimeMs);
}

async function pollOnce(): Promise<void> {
  if (!isAnyChannelConfigured()) return;
  const posts = await fetchRecentPosts();
  if (!posts) return;

  const isFirstPoll = !firstPollCompleted;
  firstPollCompleted = true;
  const now = Date.now();

  for (const post of posts) {
    if (post.status && post.status !== "publish") continue;
    if (post.type && post.type !== "post") continue;
    if (!post.slug || !post.modified_gmt) continue;

    const modMs = parseWpDate(post.modified_gmt);
    if (!modMs) continue;
    const lastSeen = seenModifiedBySlug.get(post.slug) ?? 0;

    if (isFirstPoll) {
      // Seed in-memory baseline so we don't replay the entire feed on boot.
      // Per-channel on-disk state still gates duplicate pings if the process
      // restarts mid-publish.
      seenModifiedBySlug.set(post.slug, modMs);
      continue;
    }

    if (modMs <= lastSeen) continue;
    seenModifiedBySlug.set(post.slug, modMs);

    if (now - modMs > PUBLISH_WINDOW_MS) continue;

    notifyUrlPublished(post.slug, `/blog/${post.slug}`, modMs);
  }
}

/**
 * Start polling cms.woofdogs.com for new/updated posts and fire IndexNow +
 * Google Indexing notifications when something changes. Idempotent — calling
 * it multiple times is safe. Polling runs in the background and never throws.
 */
export function startWpPublishWatcher(): void {
  if (started) return;
  started = true;
  if (!isAnyChannelConfigured()) return;

  console.log(
    `[wp-publish] polling ${WP_API_BASE} every ${Math.round(
      POLL_INTERVAL_MS / 1000,
    )}s for blog publish/update events`,
  );

  // Kick off an initial poll to seed the in-memory baseline, then schedule.
  void pollOnce().catch(() => {
    /* fire-and-forget */
  });
  timer = setInterval(() => {
    void pollOnce().catch(() => {
      /* fire-and-forget */
    });
  }, POLL_INTERVAL_MS);
  if (typeof timer.unref === "function") timer.unref();
}
