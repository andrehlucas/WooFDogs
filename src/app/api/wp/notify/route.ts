import { NextRequest, NextResponse } from "next/server";
import {
  notifyWpPostPublished,
  startWpPublishWatcher,
} from "../../../../../server/services/wpPublishWatcher";
import { isAnyChannelConfigured } from "../../../../../server/services/publishNotifyService";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface NotifyBody {
  slug?: string;
  slugs?: string[];
  modified_gmt?: string;
  // WordPress webhook payloads typically nest the post object.
  post?: { slug?: string; modified_gmt?: string; status?: string };
}

function extractSlugs(body: NotifyBody): Array<{ slug: string; modifiedGmt?: string }> {
  const out: Array<{ slug: string; modifiedGmt?: string }> = [];
  if (typeof body.slug === "string") {
    out.push({ slug: body.slug, modifiedGmt: body.modified_gmt });
  }
  if (Array.isArray(body.slugs)) {
    for (const s of body.slugs) {
      if (typeof s === "string") out.push({ slug: s });
    }
  }
  if (body.post && typeof body.post.slug === "string") {
    if (!body.post.status || body.post.status === "publish") {
      out.push({ slug: body.post.slug, modifiedGmt: body.post.modified_gmt });
    }
  }
  return out;
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

  if (!isAnyChannelConfigured()) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Neither INDEXNOW_KEY nor GOOGLE_INDEXING_SERVICE_ACCOUNT is configured",
      },
      { status: 503 },
    );
  }

  let body: NotifyBody = {};
  try {
    body = (await request.json()) as NotifyBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const targets = extractSlugs(body);
  if (targets.length === 0) {
    return NextResponse.json(
      { error: "Provide `slug`, `slugs`, or a WordPress `post` object" },
      { status: 400 },
    );
  }

  // Ensure the background poller is running too, so future publishes still
  // get caught even without a webhook.
  startWpPublishWatcher();

  for (const t of targets) {
    notifyWpPostPublished(t.slug, t.modifiedGmt);
  }

  return NextResponse.json({
    ok: true,
    notified: targets.map((t) => t.slug),
  });
}
