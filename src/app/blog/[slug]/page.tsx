import { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogService } from "../../../../server/services/blogService";
import BlogPostContent from "./BlogPostContent";
import {
  buildBlogPostingSchema,
  buildBreadcrumbSchema,
  extractFaqSchema,
  HOWTO_SCHEMAS,
} from "@/lib/blogSchemas";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await blogService.getPostBySlug(slug);
    if (!post) {
      return {
        title: "Post Not Found | WooF Dogs Blog",
        description: "The post you are looking for could not be found. Browse our latest dog training tips, behavior insights, and trainer notes from South Florida.",
      };
    }

    const cleanTitle = post.title
      .replace(/&#8217;/g, "'")
      .replace(/&#8216;/g, "'")
      .replace(/&#8220;/g, '"')
      .replace(/&#8221;/g, '"')
      .replace(/&amp;/g, "&");

    const rawExcerpt = (post.excerpt || "")
      .replace(/<[^>]*>/g, "")
      .replace(/&#8217;/g, "'")
      .replace(/&amp;/g, "&")
      .replace(/\s+/g, " ")
      .trim();
    const fallbackExcerpt = `${cleanTitle} — practical dog training tips, behavior insights, and trainer notes from WooF Dogs, South Florida's professional dog training team.`;
    let sourceExcerpt = rawExcerpt.length >= 140 ? rawExcerpt : fallbackExcerpt;
    if (sourceExcerpt.length < 140) {
      sourceExcerpt = `${sourceExcerpt} Read more dog training tips and behavior insights from WooF Dogs in South Florida.`;
    }
    const cleanExcerpt =
      sourceExcerpt.length > 160
        ? `${sourceExcerpt.slice(0, 157).trimEnd()}…`
        : sourceExcerpt;

    const ogImage = post.featuredImageUrl || "https://woofdogs.com/trainers.webp";
    const postUrl = `https://woofdogs.com/blog/${slug}`;

    return {
      title: { absolute: `${cleanTitle} | WooF Dogs Blog` },
      description: cleanExcerpt,
      openGraph: {
        title: cleanTitle,
        description: cleanExcerpt,
        url: postUrl,
        siteName: "WooF Dogs",
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: post.featuredImageAlt || cleanTitle,
          },
        ],
        type: "article",
        publishedTime: post.date,
        authors: [post.authorName.replace(" — WooF Dogs", "").replace(" - WooF Dogs", "")],
      },
      twitter: {
        card: "summary_large_image",
        title: cleanTitle,
        description: cleanExcerpt,
        images: [ogImage],
      },
      alternates: {
        canonical: postUrl,
      },
    };
  } catch {
    return {
      title: "WooF Dogs Blog",
      description: "Dog training tips, behavior insights, and trainer notes from WooF Dogs — South Florida's professional dog training team in Palm Beach County.",
    };
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const [post, { posts: allPosts }, categories] = await Promise.all([
    blogService.getPostBySlug(slug),
    blogService.getPosts({ limit: 20 }),
    blogService.getCategories(),
  ]);
  if (!post) {
    notFound();
  }

  const canonicalUrl = `https://woofdogs.com/blog/${slug}`;
  const faqSchema = extractFaqSchema(post.content);
  const howtoSchema = HOWTO_SCHEMAS[post.slug] ? HOWTO_SCHEMAS[post.slug]() : null;

  const recentPosts = allPosts.slice(0, 5);
  return (
    <>
      {/* All JSON-LD rendered server-side so non-JS crawlers receive it in the initial HTML */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBlogPostingSchema(post, canonicalUrl)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumbSchema(post, canonicalUrl)) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      {howtoSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howtoSchema) }}
        />
      )}
      <BlogPostContent
        slug={slug}
        initialPost={post}
        initialAllPosts={allPosts}
        initialCategories={categories}
        initialRecentPosts={recentPosts}
      />
    </>
  );
}
