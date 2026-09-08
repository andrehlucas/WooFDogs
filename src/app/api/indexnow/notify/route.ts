import { NextRequest, NextResponse } from "next/server";
import { pingIndexNow, getIndexNowKey } from "../../../../../server/services/indexNowService";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface NotifyBody {
  url?: string;
  urls?: string[];
}

export async function POST(request: NextRequest) {
  const adminKey = process.env.ADMIN_API_KEY;
  if (!adminKey) {
    if (process.env.NODE_ENV === "production") {
      return NextResponse.json(
        { error: "Endpoint disabled: ADMIN_API_KEY not configured" },
        { status: 503 },
      );
    }
  } else {
    const provided = request.headers.get("x-admin-key");
    if (provided !== adminKey) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  if (!getIndexNowKey()) {
    return NextResponse.json(
      { ok: false, error: "INDEXNOW_KEY not configured" },
      { status: 503 },
    );
  }

  let body: NotifyBody = {};
  try {
    body = (await request.json()) as NotifyBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const urls: string[] = [];
  if (typeof body.url === "string") urls.push(body.url);
  if (Array.isArray(body.urls)) {
    for (const u of body.urls) {
      if (typeof u === "string") urls.push(u);
    }
  }

  if (urls.length === 0) {
    return NextResponse.json(
      { error: "Provide `url` or `urls` in the body" },
      { status: 400 },
    );
  }

  const result = await pingIndexNow(urls);
  return NextResponse.json(result, { status: result.ok ? 200 : 502 });
}
