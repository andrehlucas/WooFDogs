import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { blogService } from "../../../../../server/services/blogService";
import { CANONICAL_CATEGORIES, THIN_ARCHIVE_THRESHOLD } from "@/lib/blogCategories";
import CategoryContent from "./CategoryContent";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  // Alias slugs: noindex as a belt-and-suspenders fallback (the page component
  // fires permanentRedirect before rendering, but metadata is generated first).
  const isAlias = slug in CANONICAL_CATEGORIES;

  try {
    const categories = await blogService.getCategories();
    const category = categories.find(c => c.slug === slug);

    if (!category) {
      return {
        title: "Category | WooF Dogs Blog",
        description: "Browse dog training articles by category on the WooF Dogs blog — tips, behavior insights, and trainer notes from South Florida's training team.",
      };
    }

    const { posts } = await blogService.getPosts({ category: slug, limit: 100 });
    const isThin = isAlias || posts.length < THIN_ARCHIVE_THRESHOLD;

    const title = `${category.name} | WooF Dogs Blog`;
    const baseDescription =
      category.description ||
      `Browse every ${category.name.toLowerCase()} article from WooF Dogs — practical training tips, behavior insights, and trainer notes from South Florida's professional dog training team.`;
    const description =
      baseDescription.length > 160
        ? `${baseDescription.slice(0, 157).trimEnd()}…`
        : baseDescription;
    const url = `https://woofdogs.com/blog/category/${slug}`;

    return {
      title: { absolute: title },
      description,
      openGraph: {
        title,
        description,
        url,
        siteName: "WooF Dogs",
        locale: "en_US",
        type: "website",
        images: [{ url: "https://woofdogs.com/trainers.webp", width: 800, height: 600, alt: "WooF Dogs Professional Dog Trainers" }],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
      },
      alternates: {
        canonical: url,
      },
      // Noindex thin archives and alias slugs. `follow: true` lets link equity
      // pass through even though we don't want the archive itself indexed.
      ...(isThin && {
        robots: { index: false, follow: true },
      }),
    };
  } catch {
    return {
      title: "Category | WooF Dogs Blog",
      description: "Browse dog training articles by category on the WooF Dogs blog — tips, behavior insights, and trainer notes from South Florida's training team.",
    };
  }
}

export default async function BlogCategoryPage({ params }: PageProps) {
  const { slug } = await params;

  // Redirect alias slugs to their canonical counterpart with a 308 permanent
  // redirect. Google consolidates link equity to the canonical URL.
  if (slug in CANONICAL_CATEGORIES) {
    permanentRedirect(`/blog/category/${CANONICAL_CATEGORIES[slug]}`);
  }

  const [{ posts }, categories, { posts: recentPosts }] = await Promise.all([
    blogService.getPosts({ category: slug, limit: 100 }),
    blogService.getCategories(),
    blogService.getPosts({ limit: 5 }),
  ]);

  const category = categories.find(c => c.slug === slug) ?? null;

  if (!category && posts.length === 0) {
    notFound();
  }

  return <CategoryContent slug={slug} initialPosts={posts} initialCategory={category} initialCategories={categories} initialRecentPosts={recentPosts} />;
}
