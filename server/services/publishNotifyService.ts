import fs from "fs";
import path from "path";
import { pingIndexNow, getIndexNowKey } from "./indexNowService";
import {
  notifyGoogleIndexing,
  isGoogleIndexingConfigured,
} from "./googleIndexingService";

const STATE_DIR = path.join(process.cwd(), ".local");
const INDEXNOW_STATE_FILE = path.join(STATE_DIR, ".indexnow-state.json");
const GOOGLE_STATE_FILE = path.join(STATE_DIR, ".google-index-state.json");

export interface PingState {
  pings: Record<string, number>;
}

function readStateFile(file: string): PingState {
  try {
    if (!fs.existsSync(file)) return { pings: {} };
    const raw = fs.readFileSync(file, "utf-8");
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" && parsed.pings
      ? (parsed as PingState)
      : { pings: {} };
  } catch {
    return { pings: {} };
  }
}

function writeStateFile(file: string, state: PingState, label: string): void {
  try {
    if (!fs.existsSync(STATE_DIR)) fs.mkdirSync(STATE_DIR, { recursive: true });
    fs.writeFileSync(file, JSON.stringify(state, null, 2), "utf-8");
  } catch (err) {
    console.warn(`[${label}] failed to persist state:`, err);
  }
}

export function readIndexNowState(): PingState {
  return readStateFile(INDEXNOW_STATE_FILE);
}

export function writeIndexNowState(state: PingState): void {
  writeStateFile(INDEXNOW_STATE_FILE, state, "indexnow");
}

export function readGoogleIndexState(): PingState {
  return readStateFile(GOOGLE_STATE_FILE);
}

export function writeGoogleIndexState(state: PingState): void {
  writeStateFile(GOOGLE_STATE_FILE, state, "google-index");
}

/**
 * Ping IndexNow for a URL path and only persist `slug → mtimeMs` to state on
 * success. Transient failures are intentionally left at the prior timestamp
 * so the next change/poll/scan retries the ping. Always fire-and-forget; the
 * underlying client never throws.
 */
export function pingIndexNowAndRecord(
  slug: string,
  urlPath: string,
  mtimeMs: number,
): void {
  pingIndexNow(urlPath)
    .then((result) => {
      if (result.skipped) return;
      if (!result.ok) {
        console.warn(
          `[indexnow] publish ping for ${slug} failed (will retry on next change):`,
          result.error ?? result.status,
        );
        return;
      }
      console.log(`[indexnow] pinged ${urlPath} (status ${result.status})`);
      try {
        const state = readIndexNowState();
        if ((state.pings[slug] || 0) < mtimeMs) {
          state.pings[slug] = mtimeMs;
          writeIndexNowState(state);
        }
      } catch (err) {
        console.warn(
          `[indexnow] failed to record successful ping for ${slug}:`,
          err,
        );
      }
    })
    .catch(() => {
      /* fire-and-forget; pingIndexNow already swallows errors */
    });
}

/**
 * Notify Google's Indexing API for a URL path and only persist `slug → mtimeMs`
 * to state on success, mirroring the IndexNow retry-on-failure behavior.
 * Always fire-and-forget; never throws.
 */
export function notifyGoogleAndRecord(
  slug: string,
  urlPath: string,
  mtimeMs: number,
): void {
  notifyGoogleIndexing(urlPath, "URL_UPDATED")
    .then((result) => {
      if (result.skipped) return;
      if (!result.ok) {
        console.warn(
          `[google-index] publish ping for ${slug} failed (will retry on next change):`,
          result.error ?? result.status,
        );
        return;
      }
      console.log(
        `[google-index] pinged ${urlPath} (status ${result.status})`,
      );
      try {
        const state = readGoogleIndexState();
        if ((state.pings[slug] || 0) < mtimeMs) {
          state.pings[slug] = mtimeMs;
          writeGoogleIndexState(state);
        }
      } catch (err) {
        console.warn(
          `[google-index] failed to record successful ping for ${slug}:`,
          err,
        );
      }
    })
    .catch(() => {
      /* fire-and-forget; notifyGoogleIndexing already swallows errors */
    });
}

/**
 * Notify both IndexNow and Google's Indexing API for a single URL, deduping
 * each channel against its own state file so a successful ping on one channel
 * never silences a retry on the other. `mtimeMs` is the canonical "last
 * modified" timestamp for the URL (file mtime, WP `modified_gmt`, etc.).
 */
export function notifyUrlPublished(
  slug: string,
  urlPath: string,
  mtimeMs: number,
): void {
  try {
    if (getIndexNowKey()) {
      const state = readIndexNowState();
      if ((state.pings[slug] || 0) < mtimeMs) {
        pingIndexNowAndRecord(slug, urlPath, mtimeMs);
      }
    }
    if (isGoogleIndexingConfigured()) {
      const state = readGoogleIndexState();
      if ((state.pings[slug] || 0) < mtimeMs) {
        notifyGoogleAndRecord(slug, urlPath, mtimeMs);
      }
    }
  } catch (err) {
    console.warn(
      `[publish-notify] notifyUrlPublished(${slug}) error:`,
      err,
    );
  }
}

export function isAnyChannelConfigured(): boolean {
  return Boolean(getIndexNowKey()) || isGoogleIndexingConfigured();
}
