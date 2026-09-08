const HOST = "woofdogs.com";
const KEY_LOCATION = `https://${HOST}/${process.env.INDEXNOW_KEY ?? ""}.txt`;
const ENDPOINT = "https://api.indexnow.org/IndexNow";

interface PingResult {
  ok: boolean;
  status?: number;
  error?: string;
  skipped?: boolean;
}

function getKey(): string | null {
  const key = process.env.INDEXNOW_KEY;
  if (!key || key.trim().length < 8) return null;
  return key.trim();
}

function normalizeUrls(input: string | string[]): string[] {
  const arr = Array.isArray(input) ? input : [input];
  return arr
    .map((u) => (typeof u === "string" ? u.trim() : ""))
    .filter((u) => u.length > 0)
    .map((u) => (u.startsWith("http") ? u : `https://${HOST}${u.startsWith("/") ? u : `/${u}`}`))
    .filter((u) => {
      try {
        const parsed = new URL(u);
        return parsed.host === HOST;
      } catch {
        return false;
      }
    });
}

/**
 * Fire-and-forget ping to IndexNow. Never throws; always resolves to a
 * structured result so callers can log without affecting the response.
 */
export async function pingIndexNow(
  urls: string | string[],
): Promise<PingResult> {
  const key = getKey();
  if (!key) {
    return { ok: false, skipped: true, error: "INDEXNOW_KEY not configured" };
  }

  const urlList = normalizeUrls(urls);
  if (urlList.length === 0) {
    return { ok: false, skipped: true, error: "no valid urls" };
  }

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        host: HOST,
        key,
        keyLocation: KEY_LOCATION,
        urlList,
      }),
    });
    return { ok: res.ok, status: res.status };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}

export function getIndexNowKey(): string | null {
  return getKey();
}
