import { google } from "googleapis";
import type { JWT } from "google-auth-library";

const HOST = "woofdogs.com";
const ENDPOINT =
  "https://indexing.googleapis.com/v3/urlNotifications:publish";
const SCOPE = "https://www.googleapis.com/auth/indexing";

export type GoogleNotificationType = "URL_UPDATED" | "URL_DELETED";

interface ServiceAccountKey {
  client_email: string;
  private_key: string;
}

interface NotifyResult {
  ok: boolean;
  status?: number;
  error?: string;
  skipped?: boolean;
}

let cachedClient: JWT | null = null;
let cachedKeySource: string | null = null;

function loadServiceAccount(): ServiceAccountKey | null {
  const raw = process.env.GOOGLE_INDEXING_SERVICE_ACCOUNT;
  if (!raw || raw.trim().length === 0) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<ServiceAccountKey>;
    if (!parsed.client_email || !parsed.private_key) return null;
    return {
      client_email: parsed.client_email,
      private_key: parsed.private_key.replace(/\\n/g, "\n"),
    };
  } catch (err) {
    console.warn(
      "[google-index] GOOGLE_INDEXING_SERVICE_ACCOUNT is not valid JSON:",
      err instanceof Error ? err.message : err,
    );
    return null;
  }
}

function getAuthClient(): JWT | null {
  const key = loadServiceAccount();
  if (!key) return null;
  const sourceKey = `${key.client_email}:${key.private_key.length}`;
  if (cachedClient && cachedKeySource === sourceKey) return cachedClient;
  cachedClient = new google.auth.JWT({
    email: key.client_email,
    key: key.private_key,
    scopes: [SCOPE],
  });
  cachedKeySource = sourceKey;
  return cachedClient;
}

function normalizeUrl(input: string): string | null {
  if (typeof input !== "string") return null;
  const trimmed = input.trim();
  if (trimmed.length === 0) return null;
  const absolute = trimmed.startsWith("http")
    ? trimmed
    : `https://${HOST}${trimmed.startsWith("/") ? trimmed : `/${trimmed}`}`;
  try {
    const parsed = new URL(absolute);
    if (parsed.host !== HOST) return null;
    return absolute;
  } catch {
    return null;
  }
}

export function isGoogleIndexingConfigured(): boolean {
  return loadServiceAccount() !== null;
}

/**
 * Notify Google's Indexing API about a single URL. Fire-and-forget friendly:
 * never throws, always resolves to a structured result so callers can log
 * without affecting the publish action.
 */
export async function notifyGoogleIndexing(
  url: string,
  type: GoogleNotificationType = "URL_UPDATED",
): Promise<NotifyResult> {
  const client = getAuthClient();
  if (!client) {
    return {
      ok: false,
      skipped: true,
      error: "GOOGLE_INDEXING_SERVICE_ACCOUNT not configured",
    };
  }

  const target = normalizeUrl(url);
  if (!target) {
    return { ok: false, skipped: true, error: "no valid url" };
  }

  let accessToken: string | null = null;
  try {
    const tokenRes = await client.getAccessToken();
    accessToken = typeof tokenRes === "string" ? tokenRes : tokenRes?.token ?? null;
  } catch (err) {
    return {
      ok: false,
      error: `auth failed: ${err instanceof Error ? err.message : String(err)}`,
    };
  }
  if (!accessToken) {
    return { ok: false, error: "auth failed: no access token" };
  }

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ url: target, type }),
    });
    if (res.ok) return { ok: true, status: res.status };
    let detail = "";
    try {
      detail = (await res.text()).slice(0, 300);
    } catch {
      /* ignore */
    }
    return {
      ok: false,
      status: res.status,
      error: detail || `HTTP ${res.status}`,
    };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}
