import type { Metadata } from "next";
import { blogService } from "../../../../../server/services/blogService";
import { AUTHOR_PROFILES } from "@/lib/blogAuthors";
import AuthorContent from "./AuthorContent";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const profile = AUTHOR_PROFILES[slug];

  let authorName: string;
  let bio: string;

  if (profile) {
    authorName = profile.displayName;
    bio = profile.bio;
  } else {
    try {
      const authors = await blogService.getAuthors();
      const author = authors.find(a => a.slug === slug);
      authorName = author?.name?.replace(" — WooF Dogs", "").replace(" - WooF Dogs", "") || "Author";
      bio = author?.description || `Dog training articles by ${authorName} — practical tips, behavior insights, and trainer notes from WooF Dogs, South Florida's professional dog training team.`;
    } catch {
      authorName = "Author";
      bio = "Dog training articles from the WooF Dogs team — practical tips, behavior insights, and trainer notes from South Florida's professional dog training team.";
    }
  }

  const title = `${authorName} | WooF Dogs Blog`;
  const fallbackBio = `${authorName} writes for WooF Dogs — practical dog training tips, behavior insights, and trainer notes from South Florida's professional training team.`;
  const sourceBio = bio.length >= 80 ? bio : fallbackBio;
  const description =
    sourceBio.length > 160 ? `${sourceBio.slice(0, 157).trimEnd()}…` : sourceBio;
  const url = `https://woofdogs.com/blog/author/${slug}`;

  return {
    title: { absolute: title },
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: "WooF Dogs",
      locale: "en_US",
      type: "profile",
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
  };
}

export default async function AuthorPage({ params }: PageProps) {
  const { slug } = await params;

  const [{ posts: allPosts }, categories] = await Promise.all([
    blogService.getPosts({ limit: 100 }),
    blogService.getCategories(),
  ]);
  const initialPosts = allPosts.filter(p => p.authorSlug === slug);
  const recentPosts = allPosts.slice(0, 5);

  return <AuthorContent slug={slug} initialPosts={initialPosts} initialCategories={categories} initialRecentPosts={recentPosts} />;
}
