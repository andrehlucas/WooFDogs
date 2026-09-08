import { NextResponse } from "next/server";
import { blogService } from "../../../../server/services/blogService";

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  try {
    const { posts } = await blogService.getPosts({ limit: 20 });

    const baseUrl = "https://woofdogs.com";

    const items = posts
      .map(post => {
        const title = escapeXml(
          post.title
            .replace(/&#39;/g, "'")
            .replace(/&#x27;/g, "'")
            .replace(/&#8217;/g, "'")
            .replace(/&#8216;/g, "'")
            .replace(/&#8220;/g, '"')
            .replace(/&#8221;/g, '"')
            .replace(/&amp;/g, "&")
        );
        const link = `${baseUrl}/blog/${post.slug}`;
        const description = escapeXml(
          (post.excerpt || "")
            .replace(/<[^>]*>/g, "")
            .replace(/&#39;/g, "'")
            .replace(/&#x27;/g, "'")
            .replace(/&#8217;/g, "'")
            .replace(/&amp;/g, "&")
            .slice(0, 300)
        );
        const pubDate = new Date(post.date).toUTCString();
        const author = escapeXml(
          post.authorName.replace(" — WooF Dogs", "").replace(" - WooF Dogs", "")
        );
        const categories = post.categories
          .map(c => `<category>${escapeXml(c.name)}</category>`)
          .join("\n        ");
        const image = post.featuredImageUrl
          ? `<enclosure url="${escapeXml(post.featuredImageUrl)}" type="image/jpeg" />`
          : "";

        return `
    <item>
      <title>${title}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description>${description}</description>
      <pubDate>${pubDate}</pubDate>
      <author>training@woofdogs.com (${author})</author>
      ${categories}
      ${image}
    </item>`;
      })
      .join("");

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>WooF Dogs Blog — Dog Training Tips &amp; Insights</title>
    <link>${baseUrl}/blog</link>
    <description>Expert dog training tips, behavioral insights, and South Florida dog training advice from WooF Dogs.</description>
    <language>en-us</language>
    <managingEditor>training@woofdogs.com (WooF Dogs)</managingEditor>
    <webMaster>training@woofdogs.com (WooF Dogs)</webMaster>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/blog/feed.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${baseUrl}/logo.png</url>
      <title>WooF Dogs Blog</title>
      <link>${baseUrl}/blog</link>
    </image>${items}
  </channel>
</rss>`;

    return new NextResponse(rss, {
      headers: {
        "Content-Type": "application/rss+xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch {
    return new NextResponse("Failed to generate RSS feed", { status: 500 });
  }
}
