import { NextRequest, NextResponse } from "next/server";

// ---------------------------------------------------------------------------
// Basic Auth guard for /admin/* and /api/admin/* routes
// ---------------------------------------------------------------------------

function getAdminAuthResponse(request: NextRequest): NextResponse | null {
  const { pathname } = request.nextUrl;
  if (!pathname.startsWith("/admin") && !pathname.startsWith("/api/admin")) {
    return null;
  }

  const expectedUser = process.env.ADMIN_USERNAME;
  const expectedPass = process.env.ADMIN_PASSWORD;

  if (!expectedUser || !expectedPass) {
    return NextResponse.json(
      { error: "Admin credentials not configured" },
      { status: 503 }
    );
  }

  const authHeader = request.headers.get("authorization");
  if (authHeader?.startsWith("Basic ")) {
    const base64 = authHeader.slice("Basic ".length);
    const decoded = Buffer.from(base64, "base64").toString("utf-8");
    const colonIndex = decoded.indexOf(":");
    if (colonIndex !== -1) {
      const user = decoded.slice(0, colonIndex);
      const pass = decoded.slice(colonIndex + 1);
      if (user === expectedUser && pass === expectedPass) {
        return null;
      }
    }
  }

  return new NextResponse("Unauthorized", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="WooF Dogs Admin"' },
  });
}

// ---------------------------------------------------------------------------
// Junk-parameter redirect: must run before any other logic (nonce, CSP, etc.)
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Old-URL redirect: stale slugs found in Google Search Console.
// Handled in middleware (before built-in trailingSlash normaliser) so
// trailing-slash variants reach the final destination in a single hop.
// The matching next.config.mjs entries act as belt-and-suspenders fallbacks.
// ---------------------------------------------------------------------------

const OLD_URL_REDIRECTS: Record<string, string> = {
  "/ask-for-an-evaluation": "/evaluation",
  "/ask-for-an-evaluation/": "/evaluation",
  "/certified-therapy-dog": "/service-animal-training",
  "/certified-therapy-dog/": "/service-animal-training",
};

function getOldUrlRedirect(request: NextRequest): NextResponse | null {
  const dest = OLD_URL_REDIRECTS[request.nextUrl.pathname];
  if (!dest) return null;
  return NextResponse.redirect(new URL(dest, request.url), { status: 308 });
}

// ---------------------------------------------------------------------------

/** Query keys that always indicate crawler spam or WordPress-specific junk. */
const JUNK_PARAMS = new Set(["_g", "wordfence_lh", "hid"]);

/**
 * Spam-path prefixes observed in Google Search Console that appear as raw
 * query strings with no key=value structure (e.g. ?zhHant/product/...).
 * Keep this list explicit and conservative — do not use a broad regex.
 */
const SPAM_PATH_PREFIXES = [
  "product/edit",
  "zhHant/product",
  "toreka",
  "man/kaitori",
  "pcmypage",
  "toiawase",
  "affiliate",
  "recruit",
  "events/",
  "cd.html",
  "pcsp.html",
];

/**
 * Marketing/ad-tracking params that must never trigger a redirect.
 * Any URL whose *only* params are from this set is left untouched.
 */
const TRACKING_PARAMS = new Set([
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "gbraid",
  "wbraid",
  "fbclid",
  "msclkid",
]);

function getJunkRedirect(request: NextRequest): NextResponse | null {
  const { pathname, searchParams } = request.nextUrl;

  // No query string → nothing to check.
  if (!request.nextUrl.search) return null;

  // 1. Denylist branch: any denylisted key present → redirect.
  const hasJunkParam = [...searchParams.keys()].some((k) => JUNK_PARAMS.has(k));

  // 2. Spam-path branch: check decoded param keys against known spam prefixes.
  //    Next.js normalises "?pcmypage" to key="pcmypage", value="" and
  //    URL-decodes slashes so "?product/edit/44811655" → key="product/edit/44811655".
  //    We check only entries whose value is empty (no "=value" part) to stay
  //    conservative and avoid matching real params that happen to share a prefix.
  const isSpamPath = [...searchParams.entries()].some(
    ([key, value]) =>
      value === "" &&
      SPAM_PATH_PREFIXES.some((prefix) => key.startsWith(prefix)),
  );

  if (!hasJunkParam && !isSpamPath) return null;

  // Denylist branch: redirect to the same clean pathname (strip junk params,
  // keep the path). Homepage (pathname="/") → "/".
  // Spam-path branch: always redirect to the homepage ("/") because these
  // crawler-spam patterns are always attached to the homepage in practice.
  const cleanPathname = isSpamPath ? "/" : pathname || "/";
  const destination = new URL(cleanPathname, request.url);
  destination.search = ""; // always strip all query params
  return NextResponse.redirect(destination, { status: 308 });
}

// ---------------------------------------------------------------------------

export function middleware(request: NextRequest) {
  // Admin Basic Auth guard — must run before everything else.
  const adminAuthResponse = getAdminAuthResponse(request);
  if (adminAuthResponse) return adminAuthResponse;

  // Old stale-URL redirect (single-hop, before trailingSlash normaliser).
  const oldUrlRedirect = getOldUrlRedirect(request);
  if (oldUrlRedirect) return oldUrlRedirect;

  // Junk-parameter redirect takes priority over everything else.
  const junkRedirect = getJunkRedirect(request);
  if (junkRedirect) return junkRedirect;

  const isProd = process.env.NODE_ENV === "production";

  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");

  const scriptSrc = isProd
    ? `'self' 'nonce-${nonce}' 'strict-dynamic' https:`
    : `'self' 'nonce-${nonce}' 'strict-dynamic' 'unsafe-eval' https:`;

  const cspHeader = [
    "default-src 'self'",
    `script-src ${scriptSrc}`,
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: blob: https:",
    "font-src 'self' data: https://fonts.gstatic.com",
    "connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://analytics.google.com https://*.analytics.google.com https://www.googletagmanager.com https://*.googletagmanager.com https://*.doubleclick.net https://www.google.com https://www.googleadservices.com https://api.indexnow.org https://www.bing.com",
    "frame-src 'self' https://www.googletagmanager.com https://www.google.com https://*.doubleclick.net",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'self'",
    "upgrade-insecure-requests",
  ]
    .join("; ")
    .replace(/\s{2,}/g, " ")
    .trim();

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", cspHeader);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });
  response.headers.set("Content-Security-Policy", cspHeader);

  return response;
}

export const config = {
  matcher: [
    // Standard page routes (excludes /api, static assets, etc.)
    {
      source:
        "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|woff|woff2|ttf|otf|css|js)).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
    // Explicitly include /api/admin/* so Basic Auth runs on the API too
    "/api/admin/:path*",
  ],
};
